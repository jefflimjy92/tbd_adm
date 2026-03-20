import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Users, 
  Phone, 
  ArrowRightLeft,
  XCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Send,
  AlertCircle,
  PhoneOff,
  UserCheck,
  Briefcase
} from 'lucide-react';
import clsx from 'clsx';

// --- Mock Data ---

const TODAY = '2026-03-07';

// 팀원별 성과 데이터
const TEAM_MEMBERS = [
  { 
    id: 'M1', name: '김상담', role: '팀원',
    allocated: 25, used: 22, remaining: 3,
    firstTM: 18, secondTM: 12, thirdTM: 8,
    handoff: 6, cancel: 3, absent: 4, managing: 2,
    handoffRate: 75.0,
  },
  { 
    id: 'M2', name: '이원이', role: '팀원',
    allocated: 20, used: 18, remaining: 2,
    firstTM: 15, secondTM: 10, thirdTM: 7,
    handoff: 5, cancel: 2, absent: 3, managing: 1,
    handoffRate: 71.4,
  },
  { 
    id: 'M3', name: '박하준', role: '팀원',
    allocated: 22, used: 20, remaining: 2,
    firstTM: 16, secondTM: 9, thirdTM: 6,
    handoff: 4, cancel: 4, absent: 5, managing: 3,
    handoffRate: 66.7,
  },
  { 
    id: 'M4', name: '최주원', role: '수습',
    allocated: 15, used: 12, remaining: 3,
    firstTM: 10, secondTM: 5, thirdTM: 3,
    handoff: 2, cancel: 2, absent: 4, managing: 2,
    handoffRate: 66.7,
  },
];

// 취소 사유별 집계
const CANCEL_REASONS = [
  { reason: '수수료 부담', count: 5, trend: 'up' as const },
  { reason: '단순 변심/무응답', count: 3, trend: 'same' as const },
  { reason: '가족/지인 반대', count: 2, trend: 'down' as const },
  { reason: '기존 설계사 관계', count: 2, trend: 'up' as const },
  { reason: '시간 부족', count: 1, trend: 'same' as const },
];

// 인계 완료 목록
const HANDOFF_LIST = [
  { id: 'H-001', customer: '이영희', type: '3년 환급', manager: '김상담', salesManager: '박영업', meetingDate: '2026-03-09 14:00', location: '서울 강남', estimatedRefund: '2,500,000', status: '확정' },
  { id: 'H-002', customer: '김철수', type: '3년 환급', manager: '이원이', salesManager: '최영업', meetingDate: '2026-03-09 16:00', location: '경기 수원', estimatedRefund: '1,800,000', status: '확정' },
  { id: 'H-003', customer: '박지성', type: '간편 청구', manager: '김상담', salesManager: '박영업', meetingDate: '2026-03-10 10:00', location: '서울 송파', estimatedRefund: '950,000', status: '조율중' },
  { id: 'H-004', customer: '홍길동', type: '3년 환급', manager: '박하준', salesManager: '김영업', meetingDate: '2026-03-10 14:00', location: '부산 해운대', estimatedRefund: '3,200,000', status: '확정' },
];

// 부재건 현황
const ABSENT_STATUS = [
  { id: 'A-001', customer: '최수빈', phone: '010-2323-2342', manager: '김상담', absentCount: 3, lastAttempt: '2026-03-07 11:30', alimtalkSent: true, note: '오후 통화 요청' },
  { id: 'A-002', customer: '오지윤', phone: '010-9191-8923', manager: '박하준', absentCount: 5, lastAttempt: '2026-03-07 10:15', alimtalkSent: true, note: '' },
  { id: 'A-003', customer: '신도윤', phone: '010-2985-9522', manager: '최주원', absentCount: 2, lastAttempt: '2026-03-07 09:45', alimtalkSent: false, note: '내일 재시도' },
  { id: 'A-004', customer: '윤하린', phone: '010-2349-2134', manager: '이원이', absentCount: 4, lastAttempt: '2026-03-06 17:30', alimtalkSent: true, note: '콜백 대기' },
];

// 관리 필요 고객
const MANAGING_CUSTOMERS = [
  { id: 'MG-001', customer: '장진숙', manager: '김상담', reason: '가족 상의 후 재연락 요청', requestedTime: '2026-03-10 오전', status: '대기' },
  { id: 'MG-002', customer: '김민준', manager: '박하준', reason: '지방 거주 - 방문 일정 조율 필요', requestedTime: '미정', status: '조율중' },
  { id: 'MG-003', customer: '이서현', manager: '최주원', reason: '보험증권 확인 후 재상담 희망', requestedTime: '2026-03-08 오후', status: '대기' },
];

export function DailyReport() {
  const [reportDate, setReportDate] = useState(TODAY);
  const [reportType, setReportType] = useState<'mid' | 'final'>('final');
  const [activeSection, setActiveSection] = useState<'overview' | 'handoff' | 'cancel' | 'absent' | 'manage'>('overview');

  // KPI Summary
  const totalAllocated = TEAM_MEMBERS.reduce((sum, m) => sum + m.allocated, 0);
  const totalUsed = TEAM_MEMBERS.reduce((sum, m) => sum + m.used, 0);
  const totalRemaining = TEAM_MEMBERS.reduce((sum, m) => sum + m.remaining, 0);
  const totalHandoff = TEAM_MEMBERS.reduce((sum, m) => sum + m.handoff, 0);
  const totalCancel = TEAM_MEMBERS.reduce((sum, m) => sum + m.cancel, 0);
  const totalAbsent = TEAM_MEMBERS.reduce((sum, m) => sum + m.absent, 0);
  const totalManaging = TEAM_MEMBERS.reduce((sum, m) => sum + m.managing, 0);
  const usageRate = ((totalUsed / totalAllocated) * 100).toFixed(1);

  const KPI_CARDS = [
    { label: '총 배정 DB', value: totalAllocated, sub: `소진 ${totalUsed} / 잔여 ${totalRemaining}`, icon: Users, accent: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'DB 소진율', value: `${usageRate}%`, sub: `${totalUsed}건 소진`, icon: TrendingUp, accent: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '영업팀 인계', value: `${totalHandoff}건`, sub: `인계율 ${((totalHandoff / totalUsed) * 100).toFixed(1)}%`, icon: ArrowRightLeft, accent: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '취소/불가', value: `${totalCancel}건`, sub: `부재 ${totalAbsent}건`, icon: XCircle, accent: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const sections = [
    { id: 'overview' as const, label: '종합 현황', icon: BarChart3 },
    { id: 'handoff' as const, label: `인계건 (${HANDOFF_LIST.length})`, icon: ArrowRightLeft },
    { id: 'cancel' as const, label: `취소 분석 (${totalCancel})`, icon: XCircle },
    { id: 'absent' as const, label: `부재 관리 (${ABSENT_STATUS.length})`, icon: PhoneOff },
    { id: 'manage' as const, label: `관리 고객 (${MANAGING_CUSTOMERS.length})`, icon: UserCheck },
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="font-bold text-[#1e293b] flex items-center gap-2">
                <BarChart3 size={20} />
                일일 마감 보고
              </h2>
              <p className="text-xs text-slate-500 mt-1">상담팀 일일 성과 및 현황 리포트</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Report Type Toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => setReportType('mid')}
                className={clsx(
                  "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                  reportType === 'mid' ? "bg-white text-[#1e293b] shadow-sm" : "text-slate-500"
                )}
              >
                <Clock size={12} className="inline mr-1" />
                13:00 중간
              </button>
              <button
                onClick={() => setReportType('final')}
                className={clsx(
                  "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                  reportType === 'final' ? "bg-white text-[#1e293b] shadow-sm" : "text-slate-500"
                )}
              >
                <CheckCircle2 size={12} className="inline mr-1" />
                18:30 마감
              </button>
            </div>

            {/* Date Selector */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5">
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={14} /></button>
              <div className="flex items-center gap-1.5 px-2">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-sm font-bold text-[#1e293b]">{reportDate}</span>
              </div>
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={14} /></button>
            </div>

            {/* Actions */}
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">
              <Send size={14} />
              보고서 전송
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
              <Download size={14} />
              엑셀
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3">
        {KPI_CARDS.map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</p>
                <p className={clsx("text-2xl font-bold mt-1", kpi.accent)}>{kpi.value}</p>
                <p className="text-[11px] text-slate-400 mt-1">{kpi.sub}</p>
              </div>
              <div className={clsx("p-2 rounded-lg", kpi.bg)}>
                <kpi.icon size={18} className={kpi.accent} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={clsx(
              "flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all",
              activeSection === section.id
                ? "bg-[#1e293b] text-white"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            )}
          >
            <section.icon size={14} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeSection === 'overview' && <OverviewSection members={TEAM_MEMBERS} reportType={reportType} />}
        {activeSection === 'handoff' && <HandoffSection data={HANDOFF_LIST} />}
        {activeSection === 'cancel' && <CancelSection data={CANCEL_REASONS} />}
        {activeSection === 'absent' && <AbsentSection data={ABSENT_STATUS} />}
        {activeSection === 'manage' && <ManageSection data={MANAGING_CUSTOMERS} />}
      </div>
    </div>
  );
}

// --- Sub-sections ---

function OverviewSection({ members, reportType }: { members: typeof TEAM_MEMBERS, reportType: 'mid' | 'final' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-[#1e293b] text-sm">
            {reportType === 'mid' ? '📊 중간 보고 (13:00)' : '📊 마감 보고 (18:30)'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {reportType === 'mid' 
              ? '담당자별 2차 상담 완료건 현황' 
              : '당일 인계건, 취소건, 부재건, 관리건 종합'}
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          대표님 보고용
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium">담당자</th>
              <th className="px-4 py-3 text-center font-medium">배정 DB</th>
              <th className="px-4 py-3 text-center font-medium">소진</th>
              <th className="px-4 py-3 text-center font-medium">잔여</th>
              <th className="px-4 py-3 text-center font-medium border-l border-slate-200">1차 TM</th>
              <th className="px-4 py-3 text-center font-medium">2차 TM</th>
              <th className="px-4 py-3 text-center font-medium">3차 TM</th>
              <th className="px-4 py-3 text-center font-medium border-l border-slate-200">인계</th>
              <th className="px-4 py-3 text-center font-medium">취소</th>
              <th className="px-4 py-3 text-center font-medium">부재</th>
              <th className="px-4 py-3 text-center font-medium">관리</th>
              <th className="px-4 py-3 text-center font-medium border-l border-slate-200">인계율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {m.name[0]}
                    </div>
                    <div>
                      <span className="font-bold text-[#1e293b]">{m.name}</span>
                      {m.role === '수습' && (
                        <span className="ml-1.5 text-[9px] bg-amber-100 text-amber-700 px-1 py-0.5 rounded font-bold">수습</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-bold text-slate-700">{m.allocated}</td>
                <td className="px-4 py-3 text-center font-bold text-blue-600">{m.used}</td>
                <td className="px-4 py-3 text-center">
                  <span className={clsx(
                    "text-xs font-bold px-1.5 py-0.5 rounded",
                    m.remaining <= 2 ? "bg-rose-50 text-rose-600" : "text-slate-500"
                  )}>
                    {m.remaining}
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-medium text-slate-600 border-l border-slate-100">{m.firstTM}</td>
                <td className="px-4 py-3 text-center font-medium text-slate-600">{m.secondTM}</td>
                <td className="px-4 py-3 text-center font-medium text-slate-600">{m.thirdTM}</td>
                <td className="px-4 py-3 text-center border-l border-slate-100">
                  <span className="font-bold text-emerald-600">{m.handoff}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={clsx("font-bold", m.cancel > 3 ? "text-rose-600" : "text-slate-500")}>{m.cancel}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={clsx("font-bold", m.absent > 4 ? "text-amber-600" : "text-slate-500")}>{m.absent}</span>
                </td>
                <td className="px-4 py-3 text-center text-slate-500 font-medium">{m.managing}</td>
                <td className="px-4 py-3 text-center border-l border-slate-100">
                  <span className={clsx(
                    "font-bold text-xs px-2 py-0.5 rounded",
                    m.handoffRate >= 70 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  )}>
                    {m.handoffRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Footer Totals */}
          <tfoot className="bg-slate-50 border-t-2 border-slate-200">
            <tr className="font-bold text-sm">
              <td className="px-4 py-3 text-[#1e293b]">합계</td>
              <td className="px-4 py-3 text-center">{members.reduce((s, m) => s + m.allocated, 0)}</td>
              <td className="px-4 py-3 text-center text-blue-600">{members.reduce((s, m) => s + m.used, 0)}</td>
              <td className="px-4 py-3 text-center">{members.reduce((s, m) => s + m.remaining, 0)}</td>
              <td className="px-4 py-3 text-center border-l border-slate-200">{members.reduce((s, m) => s + m.firstTM, 0)}</td>
              <td className="px-4 py-3 text-center">{members.reduce((s, m) => s + m.secondTM, 0)}</td>
              <td className="px-4 py-3 text-center">{members.reduce((s, m) => s + m.thirdTM, 0)}</td>
              <td className="px-4 py-3 text-center text-emerald-600 border-l border-slate-200">{members.reduce((s, m) => s + m.handoff, 0)}</td>
              <td className="px-4 py-3 text-center text-rose-600">{members.reduce((s, m) => s + m.cancel, 0)}</td>
              <td className="px-4 py-3 text-center text-amber-600">{members.reduce((s, m) => s + m.absent, 0)}</td>
              <td className="px-4 py-3 text-center">{members.reduce((s, m) => s + m.managing, 0)}</td>
              <td className="px-4 py-3 text-center border-l border-slate-200">
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs">
                  {((members.reduce((s, m) => s + m.handoff, 0) / members.reduce((s, m) => s + m.used, 0)) * 100).toFixed(1)}%
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 광고업체 전달 정보 */}
      <div className="px-6 py-4 border-t border-slate-200 bg-amber-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-amber-600" />
            <span className="text-xs font-bold text-amber-800">광고업체 전달 정보</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-600">당일 DB 소진량: <span className="font-bold text-[#1e293b]">{members.reduce((s, m) => s + m.used, 0)}건</span></span>
            <span className="text-slate-600">잔여 DB: <span className="font-bold text-rose-600">{members.reduce((s, m) => s + m.remaining, 0)}건</span></span>
            <span className="text-slate-600">익일 배정 예정: <span className="font-bold text-blue-600">80건</span></span>
            <button className="px-3 py-1.5 bg-amber-600 text-white rounded text-xs font-bold hover:bg-amber-700 transition-colors">
              광고업체 전달
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HandoffSection({ data }: { data: typeof HANDOFF_LIST }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-[#1e293b] text-sm">영업팀 인계 목록</h3>
        <p className="text-xs text-slate-500 mt-0.5">미팅 스케줄 확정 및 영업팀 배정 현황</p>
      </div>
      <table className="w-full text-sm">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-left font-medium">인계 ID</th>
            <th className="px-4 py-3 text-left font-medium">고객명</th>
            <th className="px-4 py-3 text-left font-medium">유형</th>
            <th className="px-4 py-3 text-left font-medium">상담 담당</th>
            <th className="px-4 py-3 text-left font-medium">영업 담당</th>
            <th className="px-4 py-3 text-left font-medium">미팅 일시</th>
            <th className="px-4 py-3 text-left font-medium">지역</th>
            <th className="px-4 py-3 text-right font-medium">예상 환급액</th>
            <th className="px-4 py-3 text-center font-medium">상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs font-bold text-slate-500">{item.id}</td>
              <td className="px-4 py-3 font-bold text-[#1e293b]">{item.customer}</td>
              <td className="px-4 py-3">
                <span className={clsx(
                  "px-2 py-0.5 rounded text-[10px] font-bold border",
                  item.type === '3년 환급' ? "bg-indigo-50 text-indigo-700 border-indigo-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                )}>
                  {item.type}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{item.manager}</td>
              <td className="px-4 py-3 font-bold text-blue-600">{item.salesManager}</td>
              <td className="px-4 py-3 text-slate-600 text-xs">{item.meetingDate}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{item.location}</td>
              <td className="px-4 py-3 text-right font-bold text-[#1e293b]">₩{item.estimatedRefund}</td>
              <td className="px-4 py-3 text-center">
                <span className={clsx(
                  "px-2 py-0.5 rounded text-[10px] font-bold",
                  item.status === '확정' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                )}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CancelSection({ data }: { data: typeof CANCEL_REASONS }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 사유별 분석 */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-[#1e293b] text-sm">취소 사유 분석</h3>
          <p className="text-xs text-slate-500 mt-0.5">사유별 증감 추이 및 피드백 포인트</p>
        </div>
        <div className="p-4 space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1e293b]">{item.reason}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">{item.count}건</span>
                    <span className={clsx(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                      item.trend === 'up' ? "bg-rose-50 text-rose-600" :
                      item.trend === 'down' ? "bg-emerald-50 text-emerald-600" :
                      "bg-slate-50 text-slate-500"
                    )}>
                      {item.trend === 'up' ? '↑ 증가' : item.trend === 'down' ? '↓ 감소' : '→ 유지'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-[#1e293b] h-2 rounded-full transition-all"
                    style={{ width: `${(item.count / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 원인 규명 & 코칭 포인트 */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-[#1e293b] text-sm">코칭 포인트</h3>
          <p className="text-xs text-slate-500 mt-0.5">관리자 5단계: 취소 원인 규명 및 개선책</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-bold text-amber-800 mb-1">수수료 부담 증가 추세</p>
            <p className="text-[11px] text-amber-700">→ 환급 완료시 후불 수수료 10% 안내 시점 및 방법 재검토 필요. 서비스 가치 설명 강화 스크립트 보완 권장.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs font-bold text-blue-800 mb-1">기존 설계사 관계 건 증가</p>
            <p className="text-[11px] text-blue-700">→ 2차 TM시 설계사 관계 확인 체크포인트 강화. 친인척 관계일 경우 조기 분류하여 불필요한 상담 진행 방지.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <p className="text-xs font-bold text-slate-700 mb-1">최주원 (수습) 개선 필요</p>
            <p className="text-[11px] text-slate-600">→ 인계율 66.7%로 팀 평균 대비 저조. 2차 TM 스크립트 임의 간소화 여부 확인 및 1:1 코칭 진행 권장.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AbsentSection({ data }: { data: typeof ABSENT_STATUS }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-[#1e293b] text-sm">부재건 관리 현황</h3>
          <p className="text-xs text-slate-500 mt-0.5">부재 알림톡 발송 여부 및 재컨택 관리</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] text-white rounded text-xs font-bold hover:bg-slate-800 transition-colors">
          <Send size={12} />
          일괄 알림톡 발송
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-left font-medium">고객명</th>
            <th className="px-4 py-3 text-left font-medium">연락처</th>
            <th className="px-4 py-3 text-left font-medium">담당자</th>
            <th className="px-4 py-3 text-center font-medium">부재 횟수</th>
            <th className="px-4 py-3 text-left font-medium">마지막 시도</th>
            <th className="px-4 py-3 text-center font-medium">알림톡</th>
            <th className="px-4 py-3 text-left font-medium">메모</th>
            <th className="px-4 py-3 text-center font-medium">액션</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-bold text-[#1e293b]">{item.customer}</td>
              <td className="px-4 py-3 text-slate-600 font-mono text-xs">{item.phone}</td>
              <td className="px-4 py-3 text-slate-600">{item.manager}</td>
              <td className="px-4 py-3 text-center">
                <span className={clsx(
                  "font-bold text-xs px-2 py-0.5 rounded",
                  item.absentCount >= 5 ? "bg-rose-50 text-rose-600" :
                  item.absentCount >= 3 ? "bg-amber-50 text-amber-600" :
                  "bg-slate-50 text-slate-600"
                )}>
                  {item.absentCount}회
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{item.lastAttempt}</td>
              <td className="px-4 py-3 text-center">
                {item.alimtalkSent ? (
                  <span className="text-emerald-600 text-xs font-bold">발송완료</span>
                ) : (
                  <span className="text-slate-400 text-xs">미발송</span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{item.note || '-'}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold hover:bg-blue-100 transition-colors">
                    <Phone size={10} className="inline mr-0.5" />재시도
                  </button>
                  {!item.alimtalkSent && (
                    <button className="px-2 py-1 bg-amber-50 text-amber-600 rounded text-[10px] font-bold hover:bg-amber-100 transition-colors">
                      알림톡
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ManageSection({ data }: { data: typeof MANAGING_CUSTOMERS }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-[#1e293b] text-sm">관리 필요 고객</h3>
        <p className="text-xs text-slate-500 mt-0.5">전화 요청 시간 및 기타 요청사항 관리</p>
      </div>
      <table className="w-full text-sm">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-left font-medium">고객명</th>
            <th className="px-4 py-3 text-left font-medium">담당자</th>
            <th className="px-4 py-3 text-left font-medium">사유</th>
            <th className="px-4 py-3 text-left font-medium">요청 시간</th>
            <th className="px-4 py-3 text-center font-medium">상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-bold text-[#1e293b]">{item.customer}</td>
              <td className="px-4 py-3 text-slate-600">{item.manager}</td>
              <td className="px-4 py-3 text-slate-600 text-xs">{item.reason}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{item.requestedTime}</td>
              <td className="px-4 py-3 text-center">
                <span className={clsx(
                  "px-2 py-0.5 rounded text-[10px] font-bold",
                  item.status === '대기' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                )}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
