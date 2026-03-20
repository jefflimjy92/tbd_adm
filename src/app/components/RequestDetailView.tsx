import React, { useEffect, useRef } from 'react';
import { CustomerInfoCard } from './CustomerInfoCard';
import { History, MapPin, FileText, Clock } from 'lucide-react';
import { ConsultationFeedbackForm } from './ConsultationFeedbackForm';

interface RequestDetailViewProps {
  /** 좌측 액션 패널에 들어갈 컴포넌트 */
  actionPanel: React.ReactNode;
  /** 접수 건 데이터 */
  data: any;
  /** 화면 제목 (예: 송은선 고객 미팅 결과 입력) */
  title: string;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 상단 뱃지 (예: 방문 미팅) */
  badge?: {
    label: string;
    colorClass: string; // e.g., "bg-emerald-50 text-emerald-600"
  };
}

export function RequestDetailView({ actionPanel, data, title, onBack, badge }: RequestDetailViewProps) {
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (centerPanelRef.current) centerPanelRef.current.scrollTop = 0;
    if (leftPanelRef.current) leftPanelRef.current.scrollTop = 0;
  }, [data]); // data가 변경(새로운 항목 조회)되거나 마운트될 때 실행

  return (
    <div className="flex flex-col h-full bg-[#F6F7F9] overflow-hidden -m-4">
      {/* Detail Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            {/* ArrowLeft icon would be passed or imported */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{data.id}</span>
              {badge && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded border border-current opacity-80 ${badge.colorClass}`}>
                  {badge.label}
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-[#1e293b]">{title}</h1>
          </div>
        </div>
        
        {/* 우측 상단 공통 액션 버튼들 (필요 시) */}
        <div className="flex gap-2">
            <button className="px-3 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                <FileText size={14} /> 심평원 PDF
            </button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-auto lg:overflow-hidden">
        
        {/* 1. Left: Action Panel (Injected via props) */}
        <div ref={leftPanelRef} className="w-full lg:flex-[1.5] lg:w-auto lg:min-w-[280px] bg-white lg:border-r border-b lg:border-b-0 border-slate-200 lg:overflow-y-auto shrink-0 flex flex-col custom-scrollbar">
          {actionPanel}
        </div>

        {/* 2. Center: Dashboard (Common Context) */}
        <div ref={centerPanelRef} className="flex-1 lg:flex-[7] lg:overflow-y-auto bg-[#F6F7F9] p-6 custom-scrollbar">
          <div className="w-full space-y-6">
            {/* Meeting Info Header (New) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <MapPin size={20} />
                     </div>
                     <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">미팅 장소</div>
                        <div className="font-bold text-slate-700 text-sm">{data.location || '장소 미정'}</div>
                     </div>
                  </div>
                  <div className="w-px h-8 bg-slate-100" />
                  <div className="flex items-center gap-2">
                     <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Clock size={20} />
                     </div>
                     <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">미팅 시간</div>
                        <div className="font-bold text-slate-700 text-sm">
                           {data.date} {data.time && <span className="text-emerald-600 ml-1">{data.time}</span>}
                        </div>
                     </div>
                  </div>
               </div>
               <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded transition-colors">
                  수정하기
               </button>
            </div>

            <CustomerInfoCard 
                data={data}
            />
            
            {/* Consultation Feedback Form (Script) - 임베디드 */}
            <div id="consultation-script-section" className="scroll-mt-6">
                <ConsultationFeedbackForm meeting={data} isEmbedded={true} />
            </div>

            {/* Map / Location Info */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-[#1e293b] mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-slate-400" /> 방문 장소
                </h3>
                <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-100 mb-3 relative overflow-hidden">
                <div className="text-slate-400 text-sm flex flex-col items-center">
                    <MapPin size={32} className="mb-2 opacity-50" />
                    <span>지도 API 연동 영역</span>
                    <span className="text-xs mt-1 text-slate-300">({data.location})</span>
                </div>
                </div>
                <div className="text-sm text-slate-600 font-bold px-2">
                {data.location}
                </div>
            </div>
          </div>
        </div>

        {/* 3. Right: History (Common Context) */}
        <div className="w-full lg:flex-[1.5] lg:w-auto lg:min-w-[240px] bg-white lg:border-l border-t lg:border-t-0 border-slate-200 overflow-hidden shrink-0 flex flex-col h-[400px] lg:h-full">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-sm text-[#1e293b] flex items-center gap-2">
              <History size={16} /> 히스토리
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {[
                { date: '2026-01-20 13:00', user: '최미팅', action: '출발 확인', desc: '고객에게 출발 문자 발송함' },
                { date: '2026-01-16 14:00', user: '조힘찬', action: '미팅 배정', desc: '2차 상담 완료 후 배정' },
                { date: '2026-01-16 10:20', user: '조힘찬', action: '1차 상담', desc: '통화 완료' },
                { date: '2026-01-15 09:00', user: '시스템', action: '접수', desc: 'DB 유입 확인' },
              ].map((log, idx) => (
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
                placeholder="상담/미팅 관련 메모를 입력하세요..."
              />
            </div>
            <div className="p-2 pt-0">
              <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-100 transition-colors">
                메모 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}