import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import clsx from 'clsx';
import type { GapFlag } from './mockInsuranceAnalysis';

interface CoverageGapFlagsProps {
  flags: GapFlag[];
}

const SEVERITY_CONFIG = {
  high: { label: '높음', color: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500' },
  medium: { label: '보통', color: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-500' },
  low: { label: '낮음', color: 'bg-slate-50 text-slate-500 border-slate-200', dot: 'bg-slate-400' },
};

export function CoverageGapFlags({ flags }: CoverageGapFlagsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const detectedCount = flags.filter(f => f.detected).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-blue-600" />
          <h3 className="font-bold text-sm text-slate-800">보장 갭 분석</h3>
        </div>
        <div className="flex items-center gap-2">
          {detectedCount > 0 && (
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              {detectedCount}건 감지
            </span>
          )}
          {detectedCount === 0 && (
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              양호
            </span>
          )}
        </div>
      </div>

      {/* Flags */}
      <div className="divide-y divide-slate-100">
        {flags.map((flag) => {
          const isExpanded = expandedId === flag.id;
          const severity = SEVERITY_CONFIG[flag.severity];

          return (
            <div key={flag.id}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : flag.id)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {flag.detected ? (
                    <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                  ) : (
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  )}
                  <span className={clsx(
                    "text-sm font-medium",
                    flag.detected ? "text-slate-800" : "text-slate-500"
                  )}>
                    {flag.label}
                  </span>
                  {flag.detected && (
                    <span className={clsx("text-[10px] font-bold px-1.5 py-0.5 rounded-full border", severity.color)}>
                      {severity.label}
                    </span>
                  )}
                </div>
                {isExpanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 animate-in slide-in-from-top-1 duration-200">
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">분석 내용</div>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{flag.detail}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">추천 조치</div>
                      <p className="text-sm text-blue-700 font-medium">{flag.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
