import React, { useMemo, useState } from 'react';
import { Search, Calendar, ChevronDown, Filter, Download, Plus } from 'lucide-react';
import clsx from 'clsx';
import { ListPeriodControls } from '@/app/components/ListPeriodControls';
import {
  filterRowsByPeriodAndType,
  getPerformancePeriodRange,
  getRowsDateBoundsByType,
  type PerformancePeriodPreset,
} from '@/app/issuance/performancePeriodUtils';
import { CustomerDetail } from './CustomerDetail';

// Mock Data
const LEADS = [
  { id: 1, type: '가망', inflow: '메타환급', name: '신하윤', phone: '010-1234-5678', dob: '1993.12.31', manager: '한유준', insurance: 'N', regDate: '2026.03.17', lastVisit: '2026.03.17' },
  { id: 2, type: '유효', inflow: '틱톡10', name: '김서윤', phone: '010-2345-8789', dob: '1994.01.10', manager: '최주원', insurance: 'N', regDate: '2026.03.15', lastVisit: '2026.03.15' },
  { id: 3, type: '계약', inflow: '틱톡10', name: '김지윤', phone: '010-1234-5433', dob: '1993.10.20', manager: '김지안', insurance: 'Y', regDate: '2026.03.12', lastVisit: '2026.03.11' },
  { id: 4, type: '계약', inflow: '환급 소개', name: '최수빈', phone: '010-2323-2342', dob: '1993.11.21', manager: '한유준', insurance: 'Y', regDate: '2026.03.09', lastVisit: '2026.03.08' },
  { id: 5, type: '종결', inflow: '네이버 블로그', name: '윤하린', phone: '010-2349-2134', dob: '1993.11.29', manager: '김서윤', insurance: 'N', regDate: '2026.02.28', lastVisit: '2026.02.27' },
  { id: 6, type: '종결', inflow: '메타환급', name: '이하윤', phone: '010-8912-2345', dob: '1993.08.25', manager: '신서윤', insurance: 'Y', regDate: '2026.02.19', lastVisit: '2026.02.18' },
  { id: 7, type: '종결', inflow: '메타3년', name: '김지윤', phone: '010-2849-2930', dob: '1993.10.26', manager: '이하윤', insurance: 'Y', regDate: '2026.01.26', lastVisit: '2026.01.25' },
  { id: 8, type: '계약', inflow: '메타강사', name: '박서현', phone: '010-8932-2345', dob: '1993.11.05', manager: '신서윤', insurance: 'Y', regDate: '2026.01.14', lastVisit: '2026.01.12' },
  { id: 9, type: '가망', inflow: '틱톡20', name: '오지윤', phone: '010-9191-8923', dob: '1993.11.16', manager: '박하준', insurance: 'Y', regDate: '2025.12.22', lastVisit: '2025.12.20' },
  { id: 10, type: '가망', inflow: '틱톡11', name: '신도윤', phone: '010-2985-9522', dob: '1993.09.25', manager: '박서현', insurance: 'Y', regDate: '2025.11.30', lastVisit: '2025.11.28' },
  { id: 11, type: '유효', inflow: '검색', name: '조하늘', phone: '010-8821-3344', dob: '1992.05.11', manager: '한유준', insurance: 'Y', regDate: '2025.10.21', lastVisit: '2025.10.19' },
  { id: 12, type: '계약', inflow: '소개', name: '배민지', phone: '010-7001-2211', dob: '1991.07.03', manager: '김지안', insurance: 'Y', regDate: '2024.03.23', lastVisit: '2024.03.12' },
];

export function LeadManagement() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [periodPreset, setPeriodPreset] = useState<PerformancePeriodPreset>('this_month');
  const [customPeriodStartDate, setCustomPeriodStartDate] = useState('');
  const [customPeriodEndDate, setCustomPeriodEndDate] = useState('');
  const [dateType, setDateType] = useState<'regDate' | 'lastVisit'>('regDate');

  const allRange = useMemo(
    () =>
      getRowsDateBoundsByType(
        LEADS,
        dateType,
        {
          regDate: (lead) => lead.regDate,
          lastVisit: (lead) => lead.lastVisit,
        },
        undefined
      ),
    [dateType]
  );

  const periodRange = useMemo(
    () => getPerformancePeriodRange(periodPreset, customPeriodStartDate, customPeriodEndDate, new Date(), allRange),
    [allRange, customPeriodEndDate, customPeriodStartDate, periodPreset]
  );

  const filteredLeads = useMemo(
    () =>
      filterRowsByPeriodAndType(
        LEADS,
        periodRange,
        dateType,
        {
          regDate: (lead) => lead.regDate,
          lastVisit: (lead) => lead.lastVisit,
        }
      ),
    [dateType, periodRange]
  );

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedLead(null);
  };

  // If in detail view, show CustomerDetail
  if (viewMode === 'detail' && selectedLead) {
    return <CustomerDetail lead={selectedLead} onBack={handleBackToList} />;
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Title */}
      <h1 className="text-xl font-bold text-slate-900">고객 리스트</h1>

      {/* Filters Area */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-sm">
        {/* Row 1: Filters */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {/* Customer Type */}
          <div className="flex items-center gap-2">
            <span className="font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">고객 구분</span>
            <div className="flex gap-2">
              {['가망 고객', '유효 고객', '계약 고객', '종결 고객', '재방문 고객'].map((label) => (
                <label key={label} className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded">
                  <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                  <span className="text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Date & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm border-t border-slate-100 pt-4">
          <ListPeriodControls
            preset={periodPreset}
            range={periodRange}
            onPresetChange={setPeriodPreset}
            onStartDateChange={setCustomPeriodStartDate}
            onEndDateChange={setCustomPeriodEndDate}
            dateType={dateType}
            dateTypeOptions={[
              { key: 'regDate', label: '가입일자' },
              { key: 'lastVisit', label: '최근 방문일' },
            ]}
            onDateTypeChange={(nextDateType) => setDateType(nextDateType as 'regDate' | 'lastVisit')}
            align="left"
            className="min-w-0"
          />

          <div className="flex items-center gap-2 ml-auto">
            <span className="font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">검색</span>
            <div className="flex items-center border border-slate-300 rounded px-2 py-1 gap-2 w-64 bg-white focus-within:ring-1 focus-within:ring-teal-500">
              <select className="outline-none text-slate-600 bg-transparent text-xs">
                <option>고객명</option>
                <option>전화번호</option>
              </select>
              <input type="text" className="outline-none text-slate-600 flex-1" placeholder="검색어 입력" />
              <Search size={14} className="text-slate-400" />
            </div>
            <button className="px-3 py-1 bg-slate-800 text-white rounded text-xs hover:bg-slate-700">검색</button>
            <button className="px-3 py-1 border border-slate-300 text-slate-600 rounded text-xs hover:bg-slate-50">초기화</button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          고객 목록 (전체 <span className="font-bold text-slate-900">{filteredLeads.length}</span>개 / 총 {LEADS.length}개)
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
            <Download size={14} />
            엑셀 다운로드
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            <Plus size={14} />
            고객 등록
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 font-medium text-center">고객 구분</th>
                <th className="px-6 py-3 font-medium text-center">최초 유입</th>
                <th className="px-6 py-3 font-medium text-center">고객명</th>
                <th className="px-6 py-3 font-medium text-center">전화번호</th>
                <th className="px-6 py-3 font-medium text-center">생년월일</th>
                <th className="px-6 py-3 font-medium text-center">보험 담당자</th>
                <th className="px-6 py-3 font-medium text-center">보험 연동</th>
                <th className="px-6 py-3 font-medium text-center">최초 등록일</th>
                <th className="px-6 py-3 font-medium text-center">최근 방문일</th>
                <th className="px-6 py-3 font-medium text-center">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-center font-medium text-slate-900">{lead.type}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{lead.inflow}</td>
                  <td className="px-6 py-4 text-center font-bold text-slate-900">{lead.name}</td>
                  <td className="px-6 py-4 text-center text-slate-600 font-mono">{lead.phone}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{lead.dob}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{lead.manager}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      lead.insurance === 'Y' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {lead.insurance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-500 text-xs">{lead.regDate}</td>
                  <td className="px-6 py-4 text-center text-slate-500 text-xs">{lead.lastVisit}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 text-xs transition-colors" onClick={() => handleLeadClick(lead)}>
                      관리
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination (Mock) */}
      <div className="flex justify-center py-2">
        <div className="flex gap-1">
          <button className="size-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50">&lt;</button>
          <button className="size-8 flex items-center justify-center bg-teal-600 text-white rounded font-medium">1</button>
          <button className="size-8 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
          <button className="size-8 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50">3</button>
          <button className="size-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50">&gt;</button>
        </div>
      </div>
    </div>
  );
}
