import React, { useState, useCallback } from 'react';
import { Upload, FileBarChart, FileText, X, Check } from 'lucide-react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { CoverageGapFlags } from './CoverageGapFlags';
import {
  MOCK_CONTRACTS,
  MOCK_COVERAGE_ITEMS,
  MOCK_GAP_FLAGS,
  type CoverageContract,
  type CoverageItem,
} from './mockInsuranceAnalysis';

export function InsuranceAnalysisTab() {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; uploadedAt: string }[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState(true); // 목 데이터이므로 기본 true

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(f => ({
      name: f.name,
      size: f.size,
      uploadedAt: new Date().toISOString(),
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 요약 통계
  const totalContracts = MOCK_CONTRACTS.length;
  const activeContracts = MOCK_CONTRACTS.filter(c => c.status === '정상').length;
  const totalPremium = MOCK_CONTRACTS.reduce((sum, c) => sum + c.premium, 0);
  const renewalCount = MOCK_CONTRACTS.filter(c => c.isRenewal).length;
  const detectedGaps = MOCK_GAP_FLAGS.filter(f => f.detected).length;

  return (
    <div className="space-y-6">
      {/* 파일 업로드 영역 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <Upload size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm text-slate-800">보장분석 파일 업로드</h3>
          <span className="text-xs text-slate-400 ml-2">KB / 삼성 보장분석 결과 파일</span>
        </div>

        <div className="p-5">
          <div
            {...getRootProps()}
            className={clsx(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <input {...getInputProps()} />
            <Upload size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500 font-medium">
              {isDragActive ? "파일을 여기에 놓으세요" : "파일을 드래그하거나 클릭하여 업로드"}
            </p>
            <p className="text-xs text-slate-400 mt-1">PDF, 이미지(PNG/JPG), Excel 지원</p>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-blue-500" />
                    <span className="text-sm text-slate-700">{file.name}</span>
                    <span className="text-xs text-slate-400">({(file.size / 1024).toFixed(0)}KB)</span>
                  </div>
                  <button onClick={() => removeFile(i)} className="p-1 hover:bg-slate-200 rounded">
                    <X size={14} className="text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 보험 요약 카드 */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: '전체 계약', value: `${totalContracts}건`, color: 'text-slate-700' },
          { label: '유효 계약', value: `${activeContracts}건`, color: 'text-blue-600' },
          { label: '월 보험료 합계', value: `${totalPremium}만원`, color: 'text-emerald-600' },
          { label: '갱신형', value: `${renewalCount}건`, color: 'text-amber-600' },
          { label: '갭 감지', value: `${detectedGaps}건`, color: detectedGaps > 0 ? 'text-red-600' : 'text-green-600' },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">{card.label}</div>
            <div className={clsx("text-lg font-bold mt-1", card.color)}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 담보 현황 테이블 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <FileBarChart size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm text-slate-800">담보 현황</h3>
          <span className="text-xs text-slate-400 ml-2">{MOCK_COVERAGE_ITEMS.length}개 담보</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase">보험사</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase">상품명</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase">담보명</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase">유형</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase">가입금액</th>
                <th className="text-center px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase">갱신</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_COVERAGE_ITEMS.map((item, i) => {
                const contract = MOCK_CONTRACTS.find(c => c.id === item.contractId);
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-slate-500">{contract?.insurer}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600 font-medium">{contract?.productName}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-700">{item.coverageName}</td>
                    <td className="px-4 py-2.5">
                      <CoverageBadge category={item.category} />
                    </td>
                    <td className="px-4 py-2.5 text-xs text-right font-bold text-slate-700">
                      {item.amount >= 10000 ? `${(item.amount / 10000).toFixed(0)}억` : `${item.amount}만`}원
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {item.isRenewal ? (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">갱신</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">비갱신</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 보장 갭 분석 */}
      <CoverageGapFlags flags={MOCK_GAP_FLAGS} />
    </div>
  );
}

function CoverageBadge({ category }: { category: string }) {
  const config: Record<string, string> = {
    '암': 'bg-red-50 text-red-600',
    '뇌': 'bg-purple-50 text-purple-600',
    '심장': 'bg-pink-50 text-pink-600',
    '상해': 'bg-orange-50 text-orange-600',
    '질병': 'bg-blue-50 text-blue-600',
    '기타': 'bg-slate-100 text-slate-500',
  };
  return (
    <span className={clsx("text-[10px] font-bold px-1.5 py-0.5 rounded-full", config[category] || config['기타'])}>
      {category}
    </span>
  );
}
