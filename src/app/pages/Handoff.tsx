import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Search,
  Filter,
  Lock,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  X,
  BadgeCheck,
  Check,
  FileCheck,
  ClipboardList,
  MessageSquareText,
  Users,
  MapPin,
  CalendarDays
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { JourneyHeader } from '@/app/components/journey/JourneyHeader';
import { JourneyRequirementPanel } from '@/app/components/journey/JourneyRequirementPanel';
import { useJourneyStore } from '@/app/journey/JourneyContext';
import { BASE_MEETING_SCHEDULE, buildMeetingAssignmentItems, buildJourneyScheduleItems, buildMeetingStaffLoads, formatShortAddress, parseAddressRegion, TEAM_LIST, TEAM_REGION_CONFIG } from '@/app/meeting/meetingOpsShared';

// 미팅 후 업무 서류 (3종 서류)
const POST_MEETING_DOCS = [
  { key: 'resultReport', label: '결과 보고 (미팅 끝나자 마자)' },
  { key: 'statusChange', label: '처리상태 변경 (팀장)' },
  { key: 'contractInfo', label: '계약정보 반영 (팀장)' },
  { key: 'threeDocSubmit', label: '3종 서류 제출 (마감 시)' },
];

// 청구팀 인계 체크리스트
const CLAIM_HANDOFF_CHECKLIST = [
  { key: 'insuranceCert', label: '증권 사본 확보' },
  { key: 'paymentHistory', label: '지급내역서 확보' },
  { key: 'claimAgreement', label: '청구대행 약정서' },
  { key: 'medicalRecord', label: '진료기록 동의서' },
  { key: 'refundCalc', label: '환급 예상액 산출 완료' },
  { key: 'customerNotice', label: '고객 안내 완료 (환급액/일정)' },
];

// Mock Data - Enhanced
const HANDOFF_QUEUE = [
  {
    id: 'H-001', requestId: 'R-2026-002', customer: '신하윤', status: '검토 중', completeness: 95,
    missing: [], grade: 'A', owner: '김매니저', type: '미팅팀',
    postMeetingDone: 3, claimDone: 0, referralDB: false
  },
  {
    id: 'H-002', requestId: 'R-2026-001', customer: '이민호', status: '작성 중', completeness: 70,
    missing: ['병력사항', '동의서'], grade: '-', owner: '이담당', type: '미팅팀',
    postMeetingDone: 1, claimDone: 0, referralDB: false
  },
  {
    id: 'H-003', requestId: 'R-TBDH18720260313', customer: '박영희', status: '전송됨', completeness: 100,
    missing: [], grade: 'B', owner: '최담당', type: '청구팀',
    postMeetingDone: 4, claimDone: 6, referralDB: true
  },
  {
    id: 'H-004', requestId: 'R-2026-005', customer: '정소개', status: '소개DB', completeness: 40,
    missing: ['보장분석', '스케줄'], grade: '-', owner: '박담당', type: '소개DB',
    postMeetingDone: 0, claimDone: 0, referralDB: true
  },
  {
    id: 'H-005', requestId: 'R-2026-006', customer: '윤서하', status: '미팅 미확정', completeness: 82,
    missing: ['미팅 배정'], grade: 'A', owner: '김상담', type: '미팅팀',
    postMeetingDone: 0, claimDone: 0, referralDB: false
  },
  {
    id: 'H-006', requestId: 'R-2026-007', customer: '오민재', status: '미팅 배정중', completeness: 88,
    missing: ['시간 확정'], grade: 'A', owner: '최미팅', type: '미팅팀',
    postMeetingDone: 0, claimDone: 0, referralDB: false
  },
  {
    id: 'H-007', requestId: 'R-2026-008', customer: '한지우', status: '미팅 미확정', completeness: 80,
    missing: ['미팅 배정'], grade: 'A', owner: '김상담', type: '미팅팀',
    postMeetingDone: 0, claimDone: 0, referralDB: false
  },
  {
    id: 'H-008', requestId: 'R-2026-009', customer: '서다은', status: '미팅 미확정', completeness: 84,
    missing: ['미팅 배정'], grade: 'A', owner: '김상담', type: '미팅팀',
    postMeetingDone: 0, claimDone: 0, referralDB: false
  },
];

interface HandoffProps {
  onNavigate?: (path: string) => void;
}

function getAssignmentBadgeClass(status: string) {
  if (status === '배정완료') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (status === '배정중') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-slate-50 text-slate-600 border-slate-200';
}

export function Handoff({ onNavigate }: HandoffProps) {
  const { journeys, appendAudit, assignMeetingStaff } = useJourneyStore();
  const [selectedHandoff, setSelectedHandoff] = useState<any>(null);
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | ''>('');
  const [evidences, setEvidences] = useState<string[]>([]);
  const [actions, setActions] = useState(['', '', '']);
  const [activeTab, setActiveTab] = useState<'all' | 'meeting' | 'claim' | 'referral'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState<'queue' | 'assignment'>('queue');
  const [selectedBoardTeam, setSelectedBoardTeam] = useState('all');
  const [selectedBoardRegion, setSelectedBoardRegion] = useState('all');
  const [selectedBoardTime, setSelectedBoardTime] = useState('all');
  const [selectedAssignmentRequestId, setSelectedAssignmentRequestId] = useState('');

  // 미팅 후 업무 체크
  const [postMeetingChecks, setPostMeetingChecks] = useState({
    resultReport: false,
    statusChange: false,
    contractInfo: false,
    threeDocSubmit: false,
  });

  // 청구팀 인계 체크
  const [claimChecks, setClaimChecks] = useState({
    insuranceCert: false,
    paymentHistory: false,
    claimAgreement: false,
    medicalRecord: false,
    refundCalc: false,
    customerNotice: false,
  });

  // 소개DB 메모
  const [referralNote, setReferralNote] = useState('');

  const enrichedQueue = useMemo(() => (
    HANDOFF_QUEUE.map((item) => {
      const journey = item.requestId ? journeys[item.requestId] : undefined;
      const blockItems = journey?.missingRequirements.filter((entry) => entry.severity === 'block') || [];
      return {
        ...item,
        customer: journey?.customerName || item.customer,
        owner: journey?.owner || item.owner,
        status: journey?.status || item.status,
        completeness: journey ? Math.max(0, 100 - (blockItems.length * 12)) : item.completeness,
        missing: journey ? blockItems.map((entry) => entry.label).slice(0, 3) : item.missing,
      };
    })
  ), [journeys]);
  const scheduleMeetings = useMemo(() => (
    [...BASE_MEETING_SCHEDULE, ...buildJourneyScheduleItems(journeys)]
  ), [journeys]);
  const assignmentItems = useMemo(() => buildMeetingAssignmentItems(journeys), [journeys]);
  const regionOptions = useMemo(() => (
    Array.from(new Set(assignmentItems.map((item) => `${item.regionLevel1} ${item.regionLevel2}`)))
  ), [assignmentItems]);
  const timeOptions = useMemo(() => (
    Array.from(new Set(assignmentItems.map((item) => item.preferredTime || '미정')))
  ), [assignmentItems]);
  const filteredAssignmentItems = useMemo(() => (
    assignmentItems.filter((item) => {
      const matchesSearch = !searchQuery || [item.customerName, item.rawAddress, item.assignedStaff, item.owner].some((value) => value?.toLowerCase().includes(searchQuery.toLowerCase()));
      const regionKey = `${item.regionLevel1} ${item.regionLevel2}`;
      const matchesTeam = selectedBoardTeam === 'all'
        || item.assignedTeam === selectedBoardTeam
        || (!item.assignedTeam && (TEAM_REGION_CONFIG[selectedBoardTeam] || []).includes(regionKey));
      const matchesRegion = selectedBoardRegion === 'all' || regionKey === selectedBoardRegion;
      const matchesTime = selectedBoardTime === 'all' || (item.preferredTime || '미정') === selectedBoardTime;
      return matchesSearch && matchesTeam && matchesRegion && matchesTime;
    })
  ), [assignmentItems, searchQuery, selectedBoardTeam, selectedBoardRegion, selectedBoardTime]);
  const selectedAssignmentItem = filteredAssignmentItems.find((item) => item.requestId === selectedAssignmentRequestId) || filteredAssignmentItems[0] || null;
  const recommendedStaff = useMemo(() => (
    selectedAssignmentItem ? buildMeetingStaffLoads(selectedAssignmentItem, scheduleMeetings) : []
  ), [selectedAssignmentItem, scheduleMeetings]);
  const regionSummaryCards = useMemo(() => (
    regionOptions.map((regionKey) => {
      const regionItems = assignmentItems.filter((item) => `${item.regionLevel1} ${item.regionLevel2}` === regionKey);
      const todayMeetingCount = scheduleMeetings.filter((meeting) => `${meeting.regionLevel1} ${meeting.regionLevel2}` === regionKey && meeting.date === new Date().toISOString().slice(0, 10) && meeting.status !== 'cancelled').length;
      return {
        regionKey,
        regionLevel1: regionItems[0]?.regionLevel1 || '미분류',
        regionLevel2: regionItems[0]?.regionLevel2 || regionKey,
        unassignedCount: regionItems.filter((item) => item.assignmentStatus === 'unassigned').length,
        assignedCount: regionItems.filter((item) => item.assignmentStatus === 'assigned').length,
        todayMeetingCount,
      };
    })
  ), [assignmentItems, regionOptions, scheduleMeetings]);

  useEffect(() => {
    if (!filteredAssignmentItems.length) {
      setSelectedAssignmentRequestId('');
      return;
    }

    if (!filteredAssignmentItems.some((item) => item.requestId === selectedAssignmentRequestId)) {
      setSelectedAssignmentRequestId(filteredAssignmentItems[0].requestId);
    }
  }, [filteredAssignmentItems, selectedAssignmentRequestId]);

  const handleOpenDrawer = (item: any) => {
    setSelectedHandoff(item);
    setGrade(item.grade === '-' ? '' : item.grade);
    setEvidences([]);
    setActions(['', '', '']);
    setPostMeetingChecks({ resultReport: false, statusChange: false, contractInfo: false, threeDocSubmit: false });
    setClaimChecks({ insuranceCert: false, paymentHistory: false, claimAgreement: false, medicalRecord: false, refundCalc: false, customerNotice: false });
    setReferralNote('');
  };

  const toggleEvidence = (tag: string) => {
    setEvidences(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const updateAction = (index: number, val: string) => {
    const newActions = [...actions];
    newActions[index] = val;
    setActions(newActions);
  };

  // Filter by tab
  const filteredQueue = enrichedQueue.filter(item => {
    const matchesSearch = !searchQuery || [item.customer, item.owner, item.status].some((value: string) => value?.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'meeting') return item.type === '미팅팀';
    if (activeTab === 'claim') return item.type === '청구팀';
    if (activeTab === 'referral') return item.type === '소개DB';
    return true;
  });

  const postMeetingCount = Object.values(postMeetingChecks).filter(Boolean).length;
  const claimCheckCount = Object.values(claimChecks).filter(Boolean).length;
  const selectedJourney = selectedHandoff?.requestId ? journeys[selectedHandoff.requestId] : undefined;
  const selectedBlockCount = selectedJourney?.missingRequirements.filter((entry) => entry.severity === 'block').length || 0;

  // 인계 Gate 조건
  const canHandoff = useMemo(() => {
    if (!selectedHandoff) return false;
    if (selectedBlockCount > 0) return false;
    if (selectedHandoff.type === '미팅팀') {
      return postMeetingCount === POST_MEETING_DOCS.length;
    }
    if (selectedHandoff.type === '청구팀') {
      return postMeetingCount === POST_MEETING_DOCS.length && claimCheckCount === CLAIM_HANDOFF_CHECKLIST.length;
    }
    if (selectedHandoff.type === '소개DB') {
      return referralNote.trim().length > 0;
    }
    return true;
  }, [selectedHandoff, selectedBlockCount, postMeetingCount, claimCheckCount, referralNote]);

  const handoffBlockReason = useMemo(() => {
    if (!selectedHandoff) return '';
    const reasons: string[] = [];
    if (selectedBlockCount > 0) reasons.push(`필수 요건 ${selectedBlockCount}건 미충족`);
    if (postMeetingCount < POST_MEETING_DOCS.length) reasons.push(`미팅 후 업무 ${POST_MEETING_DOCS.length - postMeetingCount}건 미완료`);
    if (selectedHandoff.type === '청구팀' && claimCheckCount < CLAIM_HANDOFF_CHECKLIST.length) {
      reasons.push(`청구 인계 ${CLAIM_HANDOFF_CHECKLIST.length - claimCheckCount}건 미완료`);
    }
    if (selectedHandoff.type === '소개DB' && !referralNote.trim()) {
      reasons.push('소개DB 메모 미입력');
    }
    return reasons.join(' · ');
  }, [selectedHandoff, selectedBlockCount, postMeetingCount, claimCheckCount, referralNote]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="font-bold text-[#1e293b]">이관(Handoff) 관리</h2>
          <p className="text-xs text-slate-500 mt-1">DB 가공, 미팅팀/청구팀 전달, 소개DB 관리</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="고객명/주소 검색..." className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#0f766e]" />
          </div>
        </div>
      </div>

      {/* Tab Filter */}
      <div className="px-6 py-2 border-b border-slate-100 flex gap-2">
        {([
          { value: 'all', label: '전체', count: enrichedQueue.length },
          { value: 'meeting', label: '미팅팀 이관', count: enrichedQueue.filter(h => h.type === '미팅팀').length },
          { value: 'claim', label: '청구팀 이관', count: enrichedQueue.filter(h => h.type === '청구팀').length },
          { value: 'referral', label: '소개DB', count: enrichedQueue.filter(h => h.type === '소개DB').length },
        ] as const).map(({ value, label, count }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5",
              activeTab === value
                ? "bg-[#1e293b] text-white border-[#1e293b]"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            )}
          >
            {label}
            <span className={clsx(
              "text-[9px] px-1.5 py-0.5 rounded-full",
              activeTab === value ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
            )}>{count}</span>
          </button>
        ))}
      </div>

      <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setDisplayMode('queue')}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
              displayMode === 'queue' ? "bg-[#1e293b] text-white border-[#1e293b]" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            )}
          >
            이관 큐
          </button>
          <button
            onClick={() => {
              setDisplayMode('assignment');
              setActiveTab('meeting');
            }}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
              displayMode === 'assignment' ? "bg-[#1e293b] text-white border-[#1e293b]" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            )}
          >
            미팅 배분
          </button>
        </div>
        {displayMode === 'assignment' && (
          <div className="text-xs text-slate-500">
            미확정 <span className="font-bold text-slate-800">{assignmentItems.filter((item) => item.assignmentStatus === 'unassigned').length}건</span> · 배정중 <span className="font-bold text-slate-800">{assignmentItems.filter((item) => item.assignmentStatus === 'assigned').length}건</span>
          </div>
        )}
      </div>

      {displayMode === 'queue' ? (
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 font-medium">고객명</th>
                <th className="px-6 py-3 font-medium">유형</th>
                <th className="px-6 py-3 font-medium">상태</th>
                <th className="px-6 py-3 font-medium">데이터 완결성</th>
                <th className="px-6 py-3 font-medium">누락 필드</th>
                <th className="px-6 py-3 font-medium">목표 등급</th>
                <th className="px-6 py-3 font-medium">처리자</th>
                <th className="px-6 py-3 font-medium text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueue.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => handleOpenDrawer(item)}
                >
                  <td className="px-6 py-4 font-bold text-[#1e293b]">{item.customer}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-bold border",
                      item.type === '미팅팀' ? "bg-blue-50 text-blue-700 border-blue-100" :
                      item.type === '청구팀' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      "bg-purple-50 text-purple-700 border-purple-100"
                    )}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={clsx(
                        "px-2 py-1 rounded text-xs font-bold border",
                        item.status === '전송됨' ? "bg-slate-100 text-slate-500 border-slate-200" :
                        item.status === '작성 중' ? "bg-amber-50 text-amber-700 border-amber-200" :
                        item.status === '소개DB' ? "bg-purple-50 text-purple-700 border-purple-200" :
                        "bg-blue-50 text-blue-700 border-blue-200"
                     )}>
                        {item.status}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                           <div className={clsx("h-full",
                              item.completeness === 100 ? "bg-green-500" :
                              item.completeness > 80 ? "bg-[#0f766e]" : "bg-amber-500"
                           )} style={{ width: `${item.completeness}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{item.completeness}%</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     {item.missing.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                           {item.missing.map((m: string) => (
                              <span key={m} className="px-1.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded text-[10px] font-medium">{m}</span>
                           ))}
                        </div>
                     ) : (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle2 size={12}/> 완료(Ready)</span>
                     )}
                  </td>
                  <td className="px-6 py-4">
                     {item.grade !== '-' && <span className="size-6 flex items-center justify-center rounded bg-slate-100 font-bold text-slate-700 border border-slate-200 text-xs">{item.grade}</span>}
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
      ) : (
        <div className="flex-1 min-h-0 grid grid-cols-[320px_minmax(0,1fr)_360px] divide-x divide-slate-200">
          <div className="flex min-h-0 flex-col bg-slate-50/60">
            <div className="border-b border-slate-200 p-4 space-y-3">
              <div className="text-sm font-bold text-[#1e293b]">미확정 미팅 리스트</div>
              <div className="grid grid-cols-2 gap-2">
                <select value={selectedBoardTeam} onChange={(e) => setSelectedBoardTeam(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none">
                  {TEAM_LIST.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <select value={selectedBoardRegion} onChange={(e) => setSelectedBoardRegion(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none">
                  <option value="all">전체 지역</option>
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select value={selectedBoardTime} onChange={(e) => setSelectedBoardTime(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none col-span-2">
                  <option value="all">전체 희망 시간</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3 space-y-2">
              {filteredAssignmentItems.map((item) => (
                <button
                  key={item.requestId}
                  onClick={() => setSelectedAssignmentRequestId(item.requestId)}
                  className={clsx(
                    "w-full rounded-xl border px-3 py-3 text-left transition-all",
                    selectedAssignmentItem?.requestId === item.requestId ? "border-[#0f766e] bg-white shadow-sm ring-2 ring-[#0f766e]/10" : "border-slate-200 bg-white hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700">{item.dbType}</span>
                      <span className="text-sm font-bold text-slate-900">{item.customerName}</span>
                    </div>
                    <span className={clsx("rounded-full border px-2 py-0.5 text-[10px] font-bold", getAssignmentBadgeClass(item.statusLabel))}>
                      {item.statusLabel}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin size={12} />
                    <span className="truncate">{formatShortAddress(item.rawAddress)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><CalendarDays size={12} /> {item.preferredDate || '일정 미정'} / {item.preferredTime || '미정'}</span>
                    <span>{item.assignedStaff || '미배정'}</span>
                  </div>
                </button>
              ))}
              {filteredAssignmentItems.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-slate-400">
                  현재 조건에 맞는 미팅 미확정건이 없습니다.
                </div>
              )}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto bg-white p-4">
            <div className="rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_top,#f8fafc,white_55%)] p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#1e293b]">권역 배분 보드</div>
                  <div className="mt-1 text-xs text-slate-500">시/구 권역 기준으로 미확정건과 오늘 미팅 밀도를 함께 봅니다.</div>
                </div>
                {selectedAssignmentItem && (
                  <div className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold text-white">
                    선택 지역 {selectedAssignmentItem.regionLevel1} {selectedAssignmentItem.regionLevel2}
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {['서울', '경기', '인천'].map((regionLevel1) => (
                  <div key={regionLevel1} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-bold text-slate-800">{regionLevel1}</div>
                      <div className="text-[10px] text-slate-400">{regionSummaryCards.filter((card) => card.regionLevel1 === regionLevel1).length}개 권역</div>
                    </div>
                    <div className="space-y-2">
                      {regionSummaryCards.filter((card) => card.regionLevel1 === regionLevel1).map((card) => {
                        const isSelected = selectedAssignmentItem && `${selectedAssignmentItem.regionLevel1} ${selectedAssignmentItem.regionLevel2}` === card.regionKey;
                        return (
                          <button
                            key={card.regionKey}
                            onClick={() => setSelectedBoardRegion(card.regionKey)}
                            className={clsx(
                              "w-full rounded-xl border px-3 py-2 text-left transition-all",
                              isSelected || selectedBoardRegion === card.regionKey ? "border-[#0f766e] bg-teal-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                            )}
                          >
                            <div className="text-xs font-bold text-slate-800">{card.regionLevel2}</div>
                            <div className="mt-1 grid grid-cols-3 gap-1 text-[10px] text-slate-500">
                              <span>미확정 {card.unassignedCount}</span>
                              <span>배정중 {card.assignedCount}</span>
                              <span>오늘 {card.todayMeetingCount}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-col bg-slate-50/40">
            <div className="border-b border-slate-200 p-4">
              <div className="text-sm font-bold text-[#1e293b]">설계사 추천 패널</div>
              <div className="mt-1 text-xs text-slate-500">같은 시/구 우선, 그다음 당일 미팅 수가 적은 설계사를 위로 정렬합니다.</div>
            </div>
            {selectedAssignmentItem ? (
              <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-slate-900">{selectedAssignmentItem.customerName}</div>
                      <div className="mt-1 text-xs text-slate-500">{selectedAssignmentItem.dbType}</div>
                    </div>
                    <span className={clsx("rounded-full border px-2.5 py-1 text-[11px] font-bold", getAssignmentBadgeClass(selectedAssignmentItem.statusLabel))}>
                      {selectedAssignmentItem.statusLabel}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {selectedAssignmentItem.rawAddress}</div>
                    <div className="flex items-center gap-2"><CalendarDays size={14} className="text-slate-400" /> {selectedAssignmentItem.preferredDate || '일정 미정'} / {selectedAssignmentItem.preferredTime || '미정'}</div>
                  </div>
                  {selectedAssignmentItem.assignedStaff && (
                    <button
                      onClick={() => onNavigate?.('meeting-schedule')}
                      className="mt-4 w-full rounded-lg border border-slate-200 bg-slate-900 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                    >
                      배정된 스케줄 보러가기
                    </button>
                  )}
                </div>

                {recommendedStaff.map((staff) => {
                  const isAssigned = selectedAssignmentItem.assignedStaff === staff.staffName;
                  return (
                    <div key={staff.staffId} className={clsx(
                      "rounded-2xl border p-4 shadow-sm transition-all",
                      isAssigned ? "border-emerald-200 bg-emerald-50/70" : "border-slate-200 bg-white"
                    )}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">{staff.team}</span>
                            <div className="text-base font-bold text-slate-900">{staff.staffName}</div>
                          </div>
                          <div className="mt-2 space-y-1 text-xs text-slate-500">
                            <div>같은 권역 점수 {staff.regionMatches}/2</div>
                            <div>오늘 미팅 {staff.scheduledCountToday}건</div>
                            <div>이번 주 미팅 {staff.scheduledCountWeek}건</div>
                            <div>다음 가능 시간 {staff.nextAvailableSlot}</div>
                          </div>
                        </div>
                        {staff.regionMatches >= 2 && (
                          <span className="rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700">권역 최적</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const parsed = parseAddressRegion(selectedAssignmentItem.rawAddress);
                          assignMeetingStaff(selectedAssignmentItem.requestId, {
                            meetingLocation: selectedAssignmentItem.rawAddress,
                            assignedTeam: staff.team,
                            assignedStaff: staff.staffName,
                            assignmentStatus: 'assigned',
                            regionLevel1: parsed.regionLevel1,
                            regionLevel2: parsed.regionLevel2,
                          }, '이관관리');
                          toast.success(`${staff.team} ${staff.staffName}에게 배정했습니다.`);
                        }}
                        disabled={isAssigned}
                        className={clsx(
                          "mt-4 w-full rounded-lg px-3 py-2 text-sm font-bold transition-colors",
                          isAssigned ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-[#0f766e] text-white hover:bg-[#0d6b63]"
                        )}
                      >
                        {isAssigned ? '현재 배정됨' : '배정하기'}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
                배정할 고객을 선택해 주세요.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {selectedHandoff && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedHandoff(null)}
          />
          <div className="relative w-full max-w-xl bg-white shadow-2xl h-full flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-[#1e293b]">이관 패킷 생성</h2>
                <div className="text-sm text-slate-500">
                  전달 대상: <span className="font-semibold text-slate-900">{selectedHandoff.customer}</span>
                  <span className={clsx(
                    "ml-2 px-2 py-0.5 rounded text-[10px] font-bold border",
                    selectedHandoff.type === '미팅팀' ? "bg-blue-50 text-blue-700 border-blue-100" :
                    selectedHandoff.type === '청구팀' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                    "bg-purple-50 text-purple-700 border-purple-100"
                  )}>
                    {selectedHandoff.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedHandoff(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-[#1e293b]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50">
               {selectedHandoff.requestId && (
                  <>
                    <JourneyHeader requestId={selectedHandoff.requestId} />
                    <JourneyRequirementPanel requestId={selectedHandoff.requestId} screen="handoff" title="이관 게이트 패널" />
                  </>
               )}

               {/* 1. Grade Assignment */}
               <section>
                  <h3 className="text-sm font-bold text-[#1e293b] mb-3 flex items-center gap-2">
                     <span className="flex items-center justify-center size-5 bg-slate-200 rounded-full text-[10px]">1</span>
                     DB 가공 품질 등급
                  </h3>
                  <div className="flex gap-4">
                     {['A', 'B', 'C'].map((g) => (
                        <button
                           key={g}
                           onClick={() => setGrade(g as any)}
                           className={clsx(
                              "flex-1 py-4 rounded-xl border-2 text-lg font-bold transition-all",
                              grade === g
                                 ? "border-[#0f766e] bg-teal-50 text-[#0f766e] shadow-sm"
                                 : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                           )}
                        >
                           {g}
                        </button>
                     ))}
                  </div>
               </section>

               {/* 2. Evidence Tags */}
               <section>
                  <h3 className="text-sm font-bold text-[#1e293b] mb-3 flex items-center gap-2">
                     <span className="flex items-center justify-center size-5 bg-slate-200 rounded-full text-[10px]">2</span>
                     확보된 증거 자료 (다중 선택)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                     {['지역 검증됨', '결정권자 확인됨', '보험내역 확인됨', '동의서 서명완료', '병력사항 체크됨', '증권 사본 확보', '지급내역서 확보'].map((tag) => (
                        <button
                           key={tag}
                           onClick={() => toggleEvidence(tag)}
                           className={clsx(
                              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                              evidences.includes(tag)
                                 ? "bg-[#0f766e] text-white border-[#0f766e]"
                                 : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                           )}
                        >
                           {tag}
                        </button>
                     ))}
                  </div>
               </section>

               {/* 3. 미팅 후 업무 체크리스트 (from Notion) */}
               <section>
                  <h3 className="text-sm font-bold text-[#1e293b] mb-3 flex items-center gap-2">
                     <span className="flex items-center justify-center size-5 bg-slate-200 rounded-full text-[10px]">3</span>
                     미팅 후 업무 체크
                     <span className={clsx(
                       "text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto",
                       postMeetingCount === POST_MEETING_DOCS.length ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                     )}>
                       {postMeetingCount}/{POST_MEETING_DOCS.length}
                     </span>
                  </h3>
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                     {POST_MEETING_DOCS.map(({ key, label }) => (
                        <div
                           key={key}
                           onClick={() => setPostMeetingChecks(prev => ({ ...prev, [key]: !prev[key as keyof typeof postMeetingChecks] }))}
                           className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                           <span className="text-xs text-slate-600">{label}</span>
                           <div className={clsx(
                              "size-4 rounded border flex items-center justify-center transition-colors",
                              postMeetingChecks[key as keyof typeof postMeetingChecks]
                                 ? "bg-emerald-600 border-emerald-600"
                                 : "bg-white border-slate-300"
                           )}>
                              {postMeetingChecks[key as keyof typeof postMeetingChecks] && <Check size={12} className="text-white" />}
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               {/* 4. 청구팀 인계 체크리스트 */}
               {(selectedHandoff.type === '청구팀' || activeTab === 'claim') && (
                  <section>
                     <h3 className="text-sm font-bold text-[#1e293b] mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center size-5 bg-emerald-100 text-emerald-700 rounded-full text-[10px]">4</span>
                        청구팀 인계 체크리스트
                        <span className={clsx(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto",
                          claimCheckCount === CLAIM_HANDOFF_CHECKLIST.length ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                        )}>
                          {claimCheckCount}/{CLAIM_HANDOFF_CHECKLIST.length}
                        </span>
                     </h3>
                     <div className="bg-white rounded-lg border border-emerald-200 overflow-hidden">
                        {CLAIM_HANDOFF_CHECKLIST.map(({ key, label }) => (
                           <div
                              key={key}
                              onClick={() => setClaimChecks(prev => ({ ...prev, [key]: !prev[key as keyof typeof claimChecks] }))}
                              className="flex items-center justify-between px-3 py-2.5 border-b border-emerald-100 last:border-b-0 hover:bg-emerald-50/50 cursor-pointer transition-colors"
                           >
                              <span className="text-xs text-slate-600">{label}</span>
                              <div className={clsx(
                                 "size-4 rounded border flex items-center justify-center transition-colors",
                                 claimChecks[key as keyof typeof claimChecks]
                                    ? "bg-emerald-600 border-emerald-600"
                                    : "bg-white border-slate-300"
                              )}>
                                 {claimChecks[key as keyof typeof claimChecks] && <Check size={12} className="text-white" />}
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded text-[10px] text-amber-700">
                        청구완료 알림톡 수신 시, 고객에게 환급액 설명 및 지인 소개 유도 필수
                     </div>
                  </section>
               )}

               {/* 5. 소개DB 처리 */}
               {selectedHandoff.referralDB && (
                  <section>
                     <h3 className="text-sm font-bold text-[#1e293b] mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center size-5 bg-purple-100 text-purple-700 rounded-full text-[10px]">5</span>
                        소개DB 처리
                     </h3>
                     <div className="bg-white rounded-lg border border-purple-200 p-3 space-y-2">
                        <div className="text-[11px] text-slate-500">
                           소개건은 홈페이지 신청 안내 후 추가 통화 약속을 잡고,
                           신규DB 통화 루틴과 동일하게 미팅 스케줄을 조율합니다.
                        </div>
                        <textarea
                           value={referralNote}
                           onChange={(e) => setReferralNote(e.target.value)}
                           className="w-full p-2 text-xs border border-slate-200 rounded min-h-[60px] resize-none focus:outline-none focus:ring-1 focus:ring-purple-400 placeholder:text-slate-300"
                           placeholder="소개 경위, 고객 관계 등 메모..."
                        />
                     </div>
                  </section>
               )}

               {/* 6. Next Actions */}
               <section>
                  <h3 className="text-sm font-bold text-[#1e293b] mb-3 flex items-center gap-2">
                     <span className="flex items-center justify-center size-5 bg-slate-200 rounded-full text-[10px]">
                        {selectedHandoff.referralDB ? '6' : selectedHandoff.type === '청구팀' ? '5' : '4'}
                     </span>
                     필수 이행 항목 (Next Actions)
                  </h3>
                  <div className="space-y-3">
                     {[0, 1, 2].map((idx) => (
                        <div key={idx} className="flex items-center gap-3">
                           <span className="text-xs font-bold text-slate-400 w-4">#{idx + 1}</span>
                           <input
                              type="text"
                              value={actions[idx]}
                              onChange={(e) => updateAction(idx, e.target.value)}
                              placeholder={`수행해야 할 액션 ${idx + 1}...`}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                           />
                        </div>
                     ))}
                  </div>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                     <button onClick={() => updateAction(0, "병력 세부사항 재확인")} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600 whitespace-nowrap hover:bg-slate-200">+ 병력 확인</button>
                     <button onClick={() => updateAction(1, "계약자/피보험자 관계 검증")} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600 whitespace-nowrap hover:bg-slate-200">+ 관계 검증</button>
                     <button onClick={() => updateAction(2, "증권/지급내역서 독촉")} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600 whitespace-nowrap hover:bg-slate-200">+ 서류 독촉</button>
                  </div>
               </section>

               {/* Preview Card */}
               <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">핸드오프 패킷 미리보기</span>
                     <BadgeCheck size={16} className="text-slate-400" />
                  </div>
                  <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="font-bold text-[#1e293b] text-lg">{selectedHandoff.customer}</div>
                           <div className="text-xs text-slate-500">ID: {selectedHandoff.id} · {selectedHandoff.type}</div>
                        </div>
                        {grade && <div className="size-10 flex items-center justify-center rounded-lg bg-[#0f766e] text-white font-bold text-xl">{grade}</div>}
                     </div>
                     <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                           <ClipboardList size={12} />
                           <span>미팅 후 업무: {postMeetingCount}/{POST_MEETING_DOCS.length} 완료</span>
                        </div>
                        {selectedHandoff.type === '청구팀' && (
                           <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <FileCheck size={12} />
                              <span>청구 인계: {claimCheckCount}/{CLAIM_HANDOFF_CHECKLIST.length} 완료</span>
                           </div>
                        )}
                     </div>
                     <div className="space-y-2 border-t border-slate-100 pt-3">
                        {actions.filter(a => a).map((a, i) => (
                           <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                              <div className="size-1.5 rounded-full bg-slate-300"></div>
                              {a}
                           </div>
                        ))}
                        {actions.every(a => !a) && <span className="text-sm text-slate-400 italic">지정된 액션 없음...</span>}
                     </div>
                  </div>
               </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3">
               <button
                  onClick={() => setSelectedHandoff(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
               >
                  임시 저장
               </button>
               {selectedHandoff.status === '전송됨' ? (
                  <button disabled className="px-6 py-2 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium flex items-center gap-2 cursor-not-allowed border border-slate-200">
                     <Lock size={16} /> 전송 완료됨(잠김)
                  </button>
               ) : (
                  <div className="flex flex-col items-end gap-1">
                     {!canHandoff && handoffBlockReason && (
                        <span className="text-[10px] text-rose-500 font-medium">{handoffBlockReason}</span>
                     )}
                     <button
                        disabled={!canHandoff}
                        onClick={() => {
                           if (selectedHandoff.requestId) {
                              appendAudit(selectedHandoff.requestId, {
                                 id: `handoff-${Date.now()}`,
                                 type: 'handoff',
                                 actor: '이관관리',
                                 at: new Date().toISOString().slice(0, 16).replace('T', ' '),
                                 message: `${selectedHandoff.type} 인계 패킷을 전송했습니다. (등급: ${grade || '-'}, 미팅후업무: ${postMeetingCount}/${POST_MEETING_DOCS.length}${selectedHandoff.type === '청구팀' ? `, 청구인계: ${claimCheckCount}/${CLAIM_HANDOFF_CHECKLIST.length}` : ''})`,
                                 tone: 'success',
                              });
                           }
                           toast.success(`${selectedHandoff.type === '청구팀' ? '청구팀' : selectedHandoff.type === '소개DB' ? '소개DB' : '미팅팀'} 전송을 기록했습니다.`);
                           setSelectedHandoff(null);
                        }}
                        className={clsx(
                           "px-6 py-2 text-white rounded-lg text-sm font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed",
                           selectedHandoff.type === '청구팀'
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-[#0f766e] hover:bg-[#0d6b63]"
                        )}
                     >
                        <Send size={16} /> {!canHandoff ? '인계 조건 미충족' : selectedHandoff.type === '청구팀' ? '청구팀으로 인계' : selectedHandoff.type === '소개DB' ? '소개DB 등록' : '미팅팀으로 전송'}
                     </button>
                  </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
