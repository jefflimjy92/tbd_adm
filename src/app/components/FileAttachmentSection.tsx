import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Paperclip, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface FileAttachmentSectionProps {
  initialFiles?: FileAttachment[];
  onFilesChange?: (files: FileAttachment[]) => void;
}

export function FileAttachmentSection({ initialFiles, onFilesChange }: FileAttachmentSectionProps = {}) {
  const [files, setFiles] = useState<FileAttachment[]>(initialFiles || []);

  // Sync files to parent
  React.useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles(currentFiles => 
          currentFiles.map(f => {
            if (f.id === file.id) {
              const newProgress = Math.min(progress, 100);
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? 'completed' : 'uploading'
              };
            }
            return f;
          })
        );

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 300);
    });
  }, []);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-bold text-[#62748e] tracking-[0.06px] uppercase flex items-center gap-2">
        <Paperclip size={12} />
        첨부 파일 (Evidence)
      </p>

      <div 
        {...getRootProps()} 
        className={clsx(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive 
            ? "border-blue-400 bg-blue-50" 
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <Upload size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-700">
              파일을 드래그하거나 클릭하여 업로드
            </p>
            <p className="text-[10px] text-slate-400">
              이미지(JPG, PNG), PDF, 문서 파일 (최대 10MB)
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 group hover:border-slate-300 transition-colors">
              <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <FileText size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{formatSize(file.size)}</p>
              </div>

              <button 
                onClick={() => removeFile(file.id)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Supabase Storage Recommendation Note (Hidden for UI only, but ready for backend integration) */}
      {/* <div className="text-[10px] text-slate-400 flex items-center gap-1.5 px-1">
        <AlertCircle size={10} />
        <span>Files will be securely stored in Supabase Storage</span>
      </div> */}
    </div>
  );
}