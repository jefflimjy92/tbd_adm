import React from 'react';
import clsx from 'clsx';
import { formatCurrency } from '@/app/issuance/incentiveUtils';
import { getRegionSelectionLabel, summarizeRegionSelections } from '@/app/issuance/regionUtils';
import type { AssignableStaffCandidate, StaffAssignmentStatus, StaffPerformanceSummary } from '@/app/types/issuance';

const BREAKDOWN_LABELS: Record<Exclude<StaffAssignmentStatus, 'completed'>, string> = {
  assigned: '배정',
  in_progress: '진행',
  docs_downloaded: '서류',
  visited: '방문',
  uploaded: '업로드',
  ocr_done: 'OCR',
  confirmed: '확인',
};

function getTeamName(row: StaffPerformanceSummary | AssignableStaffCandidate) {
  if (row.managerCompany?.trim()) {
    return row.managerCompany;
  }

  if (row.managerName?.trim()) {
    return `${row.managerName} 팀`;
  }

  return '미지정 팀';
}

function renderRegions(regions: StaffPerformanceSummary['assignedRegions']) {
  if (!regions.length) {
    return <span className="text-xs text-slate-400">미설정</span>;
  }

  const summary = summarizeRegionSelections(regions);
  const labels = regions.map((region) => getRegionSelectionLabel(region));
  const isCondensedSummary = !!summary && summary !== labels[0] && !summary.includes('외 ');

  if (summary && (!summary.includes('>') || isCondensedSummary)) {
    return <div className="text-sm font-medium text-[#1e293b]">{summary}</div>;
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-[#1e293b]">{summary ?? labels[0]}</div>
      {labels.length > 1 && (
        <div className="text-[11px] text-slate-400">
          {labels.slice(1, 3).join(' · ')}
          {labels.length > 3 ? ` 외 ${labels.length - 3}개` : ''}
        </div>
      )}
    </div>
  );
}

function renderBreakdown(summary: StaffPerformanceSummary) {
  const parts = Object.entries(summary.inProgressBreakdown)
    .filter(([status, count]) => status !== 'completed' && (count ?? 0) > 0)
    .map(([status, count]) => `${BREAKDOWN_LABELS[status as Exclude<StaffAssignmentStatus, 'completed'>]} ${count}`);

  if (!parts.length) {
    return <span className="text-[11px] text-slate-400">진행중 없음</span>;
  }

  return <span className="text-[11px] text-slate-400">{parts.join(' · ')}</span>;
}

interface StaffPerformanceTableProps {
  rows: (StaffPerformanceSummary | AssignableStaffCandidate)[];
  showManagerColumn?: boolean;
  selectable?: boolean;
  variant?: 'default' | 'candidate';
  completedLabel?: string;
  selectedStaffId?: string;
  onSelect?: (staffId: string) => void;
  onNavigateToStaff?: (staffId: string) => void;
  emptyMessage?: string;
}

export function StaffPerformanceTable({
  rows,
  showManagerColumn = false,
  selectable = false,
  variant = 'default',
  completedLabel = '월간 완료',
  selectedStaffId,
  onSelect,
  onNavigateToStaff,
  emptyMessage = '표시할 인력 현황이 없습니다.',
}: StaffPerformanceTableProps) {
  const isCandidateVariant = variant === 'candidate';
  const displayRows =
    isCandidateVariant && selectedStaffId
      ? [...rows].sort((left, right) => {
          const leftSelected = left.staffId === selectedStaffId ? 1 : 0;
          const rightSelected = right.staffId === selectedStaffId ? 1 : 0;
          return rightSelected - leftSelected;
        })
      : rows;
  const hasRegionMatch = rows.some((row) => 'regionMatched' in row);

  if (displayRows.length === 0) {
    return <div className="px-4 py-12 text-center text-sm text-slate-400">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-auto">
      <table className={clsx('w-full text-left text-sm', isCandidateVariant && 'min-w-[1180px] table-fixed')}>
        {isCandidateVariant && (
          <colgroup>
            {selectable && <col className="w-16" />}
            <col className="w-[180px]" />
            <col className="w-[180px]" />
            {hasRegionMatch && <col className="w-[120px]" />}
            <col className="w-[220px]" />
            <col className="w-[130px]" />
            <col className="w-[100px]" />
            <col className="w-[150px]" />
          </colgroup>
        )}
        <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
          <tr>
            {selectable && <th className="w-14 px-4 py-3 font-medium">선택</th>}
            <th className="px-4 py-3 font-medium">직원</th>
            <th className="px-4 py-3 font-medium">담당지역</th>
            {showManagerColumn && <th className="px-4 py-3 font-medium">팀명</th>}
            {hasRegionMatch && <th className="px-4 py-3 font-medium">지역매치</th>}
            <th className="px-4 py-3 font-medium">현재 진행중</th>
            <th className="px-4 py-3 font-medium">{completedLabel}</th>
            <th className="px-4 py-3 font-medium">월 예상 인센티브</th>
            {!isCandidateVariant && <th className="px-4 py-3 font-medium">누적 완료</th>}
            {!isCandidateVariant && <th className="px-4 py-3 font-medium">최근 완료일</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {displayRows.map((row) => {
            const candidate = 'regionMatched' in row ? (row as AssignableStaffCandidate) : null;
            const isSelected = selectedStaffId === row.staffId;

            return (
              <tr key={row.staffId} className={clsx(isSelected && 'bg-emerald-50/60')}>
                {selectable && (
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelect?.(row.staffId)}
                      className="h-4 w-4 rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                    />
                  </td>
                )}
                <td className={clsx('px-4 py-4', isCandidateVariant && 'align-top')}>
                  {onNavigateToStaff ? (
                    <button
                      type="button"
                      onClick={() => onNavigateToStaff(row.staffId)}
                      className="font-semibold text-[#1e293b] hover:text-[#0f766e] hover:underline"
                    >
                      {row.staffName}
                    </button>
                  ) : (
                    <div className="font-semibold text-[#1e293b]">{row.staffName}</div>
                  )}
                  <div className="mt-0.5 text-xs text-slate-400">{row.staffPhone ?? '-'}</div>
                </td>
                <td className={clsx('px-4 py-4', isCandidateVariant && 'align-top')}>{renderRegions(row.assignedRegions)}</td>
                {showManagerColumn && (
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-600">{getTeamName(row)}</div>
                  </td>
                )}
                {hasRegionMatch && (
                  <td className={clsx('px-4 py-4', isCandidateVariant && 'align-top')}>
                    {candidate?.regionMatched ? (
                      <div>
                        <div className="font-semibold text-emerald-700">우선지역</div>
                        <div className="mt-0.5 text-[11px] text-slate-400">{candidate.matchedLocationCount}개소 매치</div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">비매치</span>
                    )}
                  </td>
                )}
                <td className={clsx('px-4 py-4', isCandidateVariant && 'align-top')}>
                  <div className="font-semibold text-[#1e293b]">{row.inProgressCount}건</div>
                  {!isCandidateVariant && <div className="mt-1">{renderBreakdown(row)}</div>}
                </td>
                <td className="px-4 py-4 font-semibold text-slate-600">{row.completedThisMonth}</td>
                <td className="px-4 py-4">
                  <div className="font-semibold text-[#1e293b]">{formatCurrency(row.estimatedMonthlyIncentive)}</div>
                </td>
                {!isCandidateVariant && <td className="px-4 py-4 font-semibold text-slate-600">{row.completedTotal}</td>}
                {!isCandidateVariant && <td className="px-4 py-4 text-xs text-slate-500">{row.lastCompletedAt ?? '-'}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
