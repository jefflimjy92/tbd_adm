import React, { useMemo, useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  X, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  Megaphone,
  User,
  MapPin,
  Calendar,
  ArrowRight
} from 'lucide-react';
import clsx from 'clsx';
import { ListPeriodControls } from '@/app/components/ListPeriodControls';
import {
  filterRowsByPeriod,
  getDefaultCustomPeriodRange,
  getPerformancePeriodRange,
  getRowsDateBounds,
  type PerformancePeriodPreset,
} from '@/app/issuance/performancePeriodUtils';

// Mock Data
const LEADS = [
  { id: 'L-2026-001', date: '2026-03-12 09:30', channel: '인스타그램 광고 #4', name: '김지우', age: 29, region: '서울 강남', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정' },
  { id: 'L-2026-002', date: '2026-03-11 10:15', channel: '구글 검색', name: '이민수', age: 45, region: '경기 수원', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '박담당', next_action: '전화' },
  { id: 'L-2026-003', date: '2026-03-09 11:00', channel: '틱톡', name: '최아라', age: 24, region: '부산', marketing_consent: false, terms_consent: true, status: '부적격', owner: '시스템', next_action: '-' },
  { id: 'L-2026-004', date: '2026-03-07 16:45', channel: '지인 소개', name: '박준호', age: 33, region: '인천', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '김담당', next_action: '팔로업' },
  { id: 'L-2026-005', date: '2026-03-03 13:20', channel: '네이버 블로그', name: '윤서연', age: 31, region: '서울 마포', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정' },
  { id: 'L-2026-006', date: '2026-02-28 09:10', channel: '카카오 채널', name: '오태윤', age: 41, region: '대전 유성', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '이담당', next_action: '전화' },
  { id: 'L-2026-007', date: '2026-02-22 15:00', channel: '구글 검색', name: '한수진', age: 36, region: '인천 연수', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '박담당', next_action: '팔로업' },
  { id: 'L-2026-008', date: '2026-02-16 14:40', channel: '지인 소개', name: '서지민', age: 34, region: '서울 종로', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '김담당', next_action: '상담' },
  { id: 'L-2026-009', date: '2026-02-11 10:50', channel: '유튜브 광고', name: '임도현', age: 38, region: '서울 서초', marketing_consent: false, terms_consent: true, status: '부적격', owner: '시스템', next_action: '-' },
  { id: 'L-2026-010', date: '2026-01-26 17:05', channel: '페이스북 리타겟팅', name: '문가은', age: 27, region: '서울 중랑', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '문담당', next_action: '미팅' },
  { id: 'L-2026-011', date: '2026-01-14 08:55', channel: '구글 검색', name: '최하늘', age: 33, region: '서울 도봉', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '최담당', next_action: '전화' },
  { id: 'L-2026-012', date: '2025-12-20 12:10', channel: '네이버 카페', name: '조민호', age: 39, region: '경기 화성', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '김담당', next_action: '재접촉' },
];

export function Leads() {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const defaultCustomPeriodRange = useMemo(() => getDefaultCustomPeriodRange(), []);
  const [periodPreset, setPeriodPreset] = useState<PerformancePeriodPreset>('this_month');
  const [customPeriodStartDate, setCustomPeriodStartDate] = useState(defaultCustomPeriodRange.startDate);
  const [customPeriodEndDate, setCustomPeriodEndDate] = useState(defaultCustomPeriodRange.endDate);
  const allRange = useMemo(
    () => getRowsDateBounds(LEADS, (lead) => lead.date, defaultCustomPeriodRange),
    [defaultCustomPeriodRange]
  );
  
  // Drawer state
  const [memo, setMemo] = useState('');
  const [regionScore, setRegionScore] = useState(85);

  const handleOpenDrawer = (lead: any) => {
    setSelectedLead(lead);
    setMemo('');
  };

  const periodRange = useMemo(
    () => getPerformancePeriodRange(periodPreset, customPeriodStartDate, customPeriodEndDate, new Date(), allRange),
    [allRange, customPeriodEndDate, customPeriodStartDate, periodPreset]
  );

  const filteredLeads = useMemo(
    () => filterRowsByPeriod(LEADS, periodRange, (lead) => lead.date),
    [periodRange]
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="font-bold text-[#1e293b]">신청(DB) 유입 관리</h2>
          <p className="text-xs text-slate-500 mt-1">인바운드 신청 내역 및 담당자 배정</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <ListPeriodControls
            preset={periodPreset}
            range={periodRange}
            onPresetChange={setPeriodPreset}
            onStartDateChange={setCustomPeriodStartDate}
            onEndDateChange={setCustomPeriodEndDate}
          />
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50 cursor-pointer">
            <Filter size={16} /> 필터
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#1e293b] text-white rounded text-sm hover:bg-slate-800">
            <Plus size={16} /> 수기 등록
          </button>
        </div>
      </div>

      {/* List Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0">
            <tr>
              <th className="px-6 py-3 font-medium">신청ID / 일시</th>
              <th className="px-6 py-3 font-medium">유입 채널</th>
              <th className="px-6 py-3 font-medium">고객명</th>
              <th className="px-6 py-3 font-medium">나이</th>
              <th className="px-6 py-3 font-medium">지역(추정)</th>
              <th className="px-6 py-3 font-medium">동의여부</th>
              <th className="px-6 py-3 font-medium">상태</th>
              <th className="px-6 py-3 font-medium">담당자</th>
              <th className="px-6 py-3 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleOpenDrawer(item)}
              >
                <td className="px-6 py-4">
                  <div className="font-mono text-xs font-medium text-slate-600">{item.id}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.date}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs border border-slate-200">
                    <Megaphone size={10} /> {item.channel}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-[#1e293b]">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    item.age >= 27 ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {item.age}세
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{item.region}</td>
                <td className="px-6 py-4">
                   <div className="flex gap-1">
                      <span className={clsx("size-2 rounded-full", item.marketing_consent ? "bg-green-500" : "bg-slate-300")} title="마케팅 동의"></span>
                      <span className={clsx("size-2 rounded-full", item.terms_consent ? "bg-green-500" : "bg-slate-300")} title="약관 동의"></span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4 text-slate-600">{item.owner}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-[#1e293b]">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-start bg-white z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <StatusBadge status={selectedLead.status} />
                   <span className="text-xs font-mono text-slate-500">{selectedLead.id}</span>
                </div>
                <h2 className="text-xl font-bold text-[#1e293b]">{selectedLead.name} 고객님</h2>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-[#1e293b]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              
              {/* Automated Checks */}
              {selectedLead.age < 27 && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3 text-rose-800">
                   <AlertCircle size={18} className="shrink-0 mt-0.5" />
                   <div>
                      <h4 className="font-bold text-sm">부적격 경고 (나이 미달)</h4>
                      <p className="text-xs mt-1">고객 연령이 27세 미만입니다. 배정 전 관리자 승인이 필요합니다.</p>
                   </div>
                </div>
              )}

              {/* Basic Info Card */}
              <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-4">
                 <h3 className="text-sm font-bold text-[#1e293b] flex items-center gap-2">
                    <User size={16} /> 고객 프로필
                 </h3>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                       <label className="text-xs text-slate-500 block">나이</label>
                       <div className="font-medium">{selectedLead.age}세</div>
                    </div>
                    <div>
                       <label className="text-xs text-slate-500 block">연락처</label>
                       <div className="font-medium text-slate-900">010-****-**** <span className="text-xs text-slate-400">(마스킹됨)</span></div>
                    </div>
                    <div>
                       <label className="text-xs text-slate-500 block">지역 (추정)</label>
                       <div className="font-medium flex items-center gap-2">
                          {selectedLead.region}
                          <span className={clsx("text-[10px] px-1.5 py-0.5 rounded", regionScore > 80 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                             정확도 {regionScore}%
                          </span>
                       </div>
                    </div>
                    <div>
                       <label className="text-xs text-slate-500 block">유입 채널</label>
                       <div className="font-medium">{selectedLead.channel}</div>
                    </div>
                 </div>
              </section>

              {/* Consent Status */}
              <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                 <h3 className="text-sm font-bold text-[#1e293b] flex items-center gap-2 mb-3">
                    <CheckCircle2 size={16} /> 동의 현황
                 </h3>
                 <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded border border-slate-100 bg-slate-50">
                       <span className="text-sm text-slate-600">마케팅 활용 동의</span>
                       {selectedLead.marketing_consent 
                         ? <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> 동의함</span>
                         : <span className="text-xs font-bold text-slate-400">미동의</span>
                       }
                    </div>
                    <div className="flex items-center justify-between p-2 rounded border border-slate-100 bg-slate-50">
                       <span className="text-sm text-slate-600">서비스 이용 약관</span>
                       {selectedLead.terms_consent 
                         ? <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> 동의함</span>
                         : <span className="text-xs font-bold text-rose-500">누락됨</span>
                       }
                    </div>
                 </div>
              </section>

              {/* Memo */}
              <section>
                 <h3 className="text-sm font-bold text-[#1e293b] mb-2">담당자 메모</h3>
                 <textarea 
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="배정 전 특이사항이나 내부 메모를 입력하세요..."
                    className="w-full h-24 p-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e] resize-none"
                 />
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex justify-between gap-3 items-center">
               <button className="text-slate-500 text-xs hover:underline">
                  전체 이력 보기
               </button>
               <div className="flex gap-2">
                  <button 
                     className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                     반려 / 보류
                  </button>
                  <button 
                     className="px-6 py-2 bg-[#0f766e] text-white rounded-lg text-sm font-medium hover:bg-[#0d6b63] shadow-sm flex items-center gap-2 transition-colors"
                  >
                     상담 배정하기 <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    '신규(New)': 'bg-blue-50 text-blue-700 border-blue-200',
    '배정됨': 'bg-purple-50 text-purple-700 border-purple-200',
    '연락완료': 'bg-amber-50 text-amber-700 border-amber-200',
    '부적격': 'bg-rose-50 text-rose-700 border-rose-200',
  };
  
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border", styles[status as keyof typeof styles] || styles['신규(New)'])}>
      {status}
    </span>
  );
}
