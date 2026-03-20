import React from 'react';
import { CalendarCheck2, Coins, MapPinned, Phone } from 'lucide-react';
import { formatCurrency } from '@/app/issuance/incentiveUtils';
import { getRegionSelectionLabel, summarizeRegionSelections } from '@/app/issuance/regionUtils';
import type { StaffPerformanceSummary } from '@/app/types/issuance';

function getTeamName(row: StaffPerformanceSummary) {
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

interface StaffPerformanceBoardProps {
  rows: StaffPerformanceSummary[];
  completedLabel?: string;
  onNavigateToStaff?: (staffId: string) => void;
  emptyMessage?: string;
}

export function StaffPerformanceBoard({
  rows,
  completedLabel = '월 누적 완료',
  onNavigateToStaff,
  emptyMessage = '표시할 직원 현황이 없습니다.',
}: StaffPerformanceBoardProps) {
  if (rows.length === 0) {
    return <div className="px-4 py-12 text-center text-sm text-slate-400">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-auto px-4 py-4">
      <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {rows.map((row) => (
          <article
            key={row.staffId}
            className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {onNavigateToStaff ? (
                  <button
                    type="button"
                    onClick={() => onNavigateToStaff(row.staffId)}
                    className="text-left text-sm font-bold text-[#1e293b] hover:text-[#0f766e] hover:underline"
                  >
                    {row.staffName}
                  </button>
                ) : (
                  <div className="text-sm font-bold text-[#1e293b]">{row.staffName}</div>
                )}
                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                  <Phone size={11} />
                  <span>{row.staffPhone ?? '-'}</span>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                {getTeamName(row)}
              </span>
            </div>

            <div className="mt-2.5 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                <MapPinned size={11} />
                담당지역
              </div>
              <div className="mt-1.5">{renderRegions(row.assignedRegions)}</div>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-[#dbeafe] bg-[#f8fbff] px-2.5 py-2">
                <div className="text-[10px] font-semibold text-slate-400">진행중</div>
                <div className="mt-1.5 text-lg font-bold tracking-tight text-[#1e293b] tabular-nums">
                  {row.inProgressCount}
                </div>
                <div className="mt-1.5 text-right text-[10px] leading-4 text-slate-500">
                  <div>
                    내 <span className="font-semibold text-emerald-700 tabular-nums">{row.inRegionInProgressCount}</span>
                  </div>
                  <div>
                    외 <span className="font-semibold text-amber-600 tabular-nums">{row.outOfRegionInProgressCount}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2">
                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <CalendarCheck2 size={11} />
                  {completedLabel}
                </div>
                <div className="mt-1.5 text-[15px] font-bold text-[#1e293b] tabular-nums">{row.completedThisMonth}건</div>
                <div className="mt-1.5 text-right text-[10px] leading-4 text-slate-500">
                  <div>
                    내 <span className="font-semibold text-emerald-700 tabular-nums">{row.completedThisMonthInRegion}</span>
                  </div>
                  <div>
                    외 <span className="font-semibold text-amber-600 tabular-nums">{row.completedThisMonthOutOfRegion}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2">
                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <Coins size={11} />
                  월 인센티브
                </div>
                <div className="mt-1.5 text-[13px] font-bold leading-5 text-[#1e293b] break-keep">{formatCurrency(row.estimatedMonthlyIncentive)}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
