import React from 'react';
import { History } from 'lucide-react';

export interface HistoryItem {
  date: string;
  user: string;
  action: string;
  desc: string;
}

interface HistoryPanelProps {
  logs: HistoryItem[];
}

export function HistoryPanel({ logs }: HistoryPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white border-l border-t lg:border-t-0 border-slate-200">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-sm text-[#1e293b] flex items-center gap-2">
          <History size={16} /> 히스토리
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar h-[300px] lg:h-auto">
        {logs.map((log, idx) => (
          <div key={idx} className="relative pl-4 border-l border-slate-200 pb-2 last:pb-0">
            <div className="absolute -left-1.5 top-0 size-3 rounded-full bg-slate-300 ring-4 ring-white"></div>
            <div className="text-[10px] text-slate-400 mb-0.5">{log.date}</div>
            <div className="font-bold text-xs text-[#1e293b]">{log.action}</div>
            <div className="text-xs text-slate-500 mt-0.5">{log.desc}</div>
          </div>
        ))}
      </div>
      
      {/* Memo Section */}
      <div className="h-2/5 min-h-[200px] border-t border-slate-200 bg-slate-50 flex flex-col">
        <div className="px-4 py-2 border-b border-slate-200 flex justify-between items-center">
          <span className="font-bold text-xs text-slate-500">간편 메모</span>
        </div>
        <div className="flex-1 p-2">
          <textarea 
            className="w-full h-full p-2 text-xs bg-white border border-slate-200 rounded resize-none focus:outline-none focus:border-slate-400 overflow-y-auto"
            placeholder="상담 관련 메모를 입력하세요..."
          />
        </div>
        <div className="p-2 pt-0">
          <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-100 transition-colors">
            메모 저장
          </button>
        </div>
      </div>
    </div>
  );
}
