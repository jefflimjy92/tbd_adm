import svgPaths from "./svg-0jj4wjtzhr";
import { ClipboardList } from 'lucide-react';

interface LiveRecordSectionProps {
  insuranceType?: string;
  monthlyPremium?: string;
  paymentStatus?: string;
  contractor?: string;
  joinPath?: string;
  trafficAccident?: string;
  surgery?: string;
  surgeryDetail?: string;
  criticalDisease?: string;
  medication?: string;
  companion?: string;
  onCardClick?: (sectionId: string) => void;
  disposition?: string;
  trustLevel?: string;
  bestTime?: string;
  decisionMaker?: string;
  traitNote?: string;
  attachments?: any[];
}

function Icon() {
  return (
    <ClipboardList 
      className="absolute left-0 top-[1.99px] text-[#155DFC]" 
      size={16} 
      strokeWidth={1.5}
    />
  );
}

function Heading() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon />
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-[24px] not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">상담팀 확인 사항</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[52.682px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b-[0.693px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[0.693px] pt-[15.998px] px-[19.992px] relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Container20({ insuranceType, monthlyPremium, paymentStatus, contractor, joinPath, trafficAccident, surgery, surgeryDetail, criticalDisease, medication, companion, onCardClick, disposition, trustLevel, bestTime, decisionMaker, traitNote, attachments }: LiveRecordSectionProps) {
  return (
    <div className="min-h-[402.999px] h-auto relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[11.993px] items-start pt-[19.992px] px-[19.992px] pb-[19.992px] relative size-full overflow-auto">
        {/* 첫 번째 줄 */}
        <div className="flex gap-[11.993px] w-full">
          {/* 보험 가입 현황 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('insuranceType')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">보험 가입 현황</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{insuranceType}</p>
          </div>

          {/* 월납 총액 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('monthlyPremium')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">월납 총액</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{insuranceType === '없음' ? '-' : monthlyPremium}</p>
          </div>

          {/* 미납/실효 여부 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('paymentStatus')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">미납/실효 여부</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{insuranceType === '없음' ? '-' : paymentStatus}</p>
          </div>
        </div>

        {/* 두 번째 줄 */}
        <div className="flex gap-[11.993px] w-full">
          {/* 계약자/납입인 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('contractor')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">계약자/납입인</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{insuranceType === '없음' ? '-' : contractor}</p>
          </div>

          {/* 기존 설계사 관계 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('joinPath')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">기존 설계사 관계</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{joinPath}</p>
          </div>

          {/* 교통사고 (3년내) */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('trafficAccident')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">교통사고 (3년내)</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{trafficAccident}</p>
          </div>
        </div>

        {/* 세 번째 줄 */}
        <div className="flex gap-[11.993px] w-full">
          {/* 수술/시술/골절 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('surgery')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">수술/시술/골절</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{surgery === '없음' || !surgery ? '없음' : (surgeryDetail ? `${surgery} (${surgeryDetail})` : surgery)}</p>
          </div>

          {/* 중대질환 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('criticalDisease')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">중대질환</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{criticalDisease}</p>
          </div>

          {/* 복용 약물 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('medication')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">복용 약물</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{medication}</p>
          </div>
        </div>

        {/* 네 번째 줄 */}
        <div className="flex gap-[11.993px] w-full">
          {/* 동반신청고객 */}
          <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[3.994px] h-[63.993px] justify-center pl-[12.686px] pr-[0.693px] py-[0.693px] relative rounded-[4px] shrink-0 flex-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('companion')}>
            <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] not-italic text-[#90a1b9] text-[10px] tracking-[0.1172px]">동반신청고객</p>
            <p className="css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic text-[#314158] text-[12px]">{companion}</p>
          </div>

          {/* 빈칸 */}
          <div className="flex-1"></div>
          
          {/* 빈칸 */}
          <div className="flex-1"></div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-slate-100 my-4" />

        {/* 고객 특이사항 */}
        <div className="w-full">
           <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-bold text-slate-700">고객 특이사항</p>
           </div>
           
           <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="bg-slate-50 p-2 rounded border border-slate-100 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('disposition')}>
                 <p className="text-[10px] text-slate-400 mb-1">성향</p>
                 <p className="text-xs font-bold text-slate-700">{disposition || '-'}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('trustLevel')}>
                 <p className="text-[10px] text-slate-400 mb-1">신뢰도</p>
                 <p className="text-xs font-bold text-slate-700">{trustLevel || '-'}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('bestTime')}>
                 <p className="text-[10px] text-slate-400 mb-1">선호 시간</p>
                 <p className="text-xs font-bold text-slate-700">{bestTime || '-'}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100 cursor-pointer hover:scale-105 transition-transform" onClick={() => onCardClick?.('decisionMaker')}>
                 <p className="text-[10px] text-slate-400 mb-1">결정 권한</p>
                 <p className="text-xs font-bold text-slate-700">{decisionMaker || '-'}</p>
              </div>
           </div>
           
           {traitNote && (
              <div className="bg-blue-50/50 p-3 rounded border border-blue-100 text-xs text-slate-600 leading-relaxed cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => onCardClick?.('traitNote')}>
                 <span className="font-bold text-blue-700 mr-1">Memo:</span> {traitNote}
              </div>
           )}
        </div>
        
        {/* 구분선 */}
        <div className="w-full h-px bg-slate-100 my-4" />
        
        {/* 첨부파일 */}
        <div className="w-full">
           <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-bold text-slate-700">첨부파일 <span className="text-slate-400 font-normal">({attachments?.length || 0})</span></p>
           </div>
           
           {attachments && attachments.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                 {attachments.map((file: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
                       <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                             <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                             <polyline points="14 2 14 8 20 8" />
                          </svg>
                       </div>
                       <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-700 truncate">{file.name}</p>
                          <p className="text-[10px] text-slate-400">{file.size ? (file.size / 1024).toFixed(1) + ' KB' : ''}</p>
                       </div>
                    </div>
                 ))}
              </div>
           ) : (
              <div className="text-center py-4 bg-slate-50 rounded border border-dashed border-slate-200 text-xs text-slate-400">
                 첨부된 파일이 없습니다.
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

export default function Container21(props: LiveRecordSectionProps) {
  return (
    <div className="bg-white relative rounded-[14px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.693px] relative rounded-[inherit] size-full">
        <Container />
        <Container20 {...props} />
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}
