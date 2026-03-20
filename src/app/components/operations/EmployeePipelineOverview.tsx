import React, { useEffect, useMemo, useState } from 'react';
import { BriefcaseBusiness, CheckCircle2, Clock3, ChevronRight, UserRound } from 'lucide-react';
import clsx from 'clsx';

export interface EmployeePipelineItem<T = unknown> {
  id: string;
  customerName: string;
  ownerName: string;
  typeLabel: string;
  dateLabel: string;
  stageLabel: string;
  summaryLabel: string;
  regionLabel?: string;
  completed: boolean;
  original: T;
}

interface EmployeePipelineOverviewProps<T = unknown> {
  items: EmployeePipelineItem<T>[];
  ownerLabel?: string;
  emptyMessage?: string;
  stageColumnLabel?: string;
  summaryColumnLabel?: string;
  dateColumnLabel?: string;
  onSelectItem?: (item: T) => void;
}

interface EmployeeSummary<T = unknown> {
  ownerName: string;
  totalCount: number;
  inProgressCount: number;
  completedCount: number;
  topStages: Array<{ label: string; count: number }>;
  items: EmployeePipelineItem<T>[];
}

function buildEmployeeSummaries<T>(items: EmployeePipelineItem<T>[]) {
  const grouped = new Map<string, EmployeeSummary<T>>();

  items.forEach((item) => {
    const existing =
      grouped.get(item.ownerName) ||
      ({
        ownerName: item.ownerName,
        totalCount: 0,
        inProgressCount: 0,
        completedCount: 0,
        topStages: [],
        items: [],
      } satisfies EmployeeSummary<T>);

    existing.totalCount += 1;
    existing.inProgressCount += item.completed ? 0 : 1;
    existing.completedCount += item.completed ? 1 : 0;
    existing.items.push(item);
    grouped.set(item.ownerName, existing);
  });

  return Array.from(grouped.values())
    .map((summary) => {
      const stageCounts = new Map<string, number>();
      summary.items.forEach((item) => {
        stageCounts.set(item.stageLabel, (stageCounts.get(item.stageLabel) || 0) + 1);
      });

      const topStages = Array.from(stageCounts.entries())
        .sort((a, b) => {
          if (b[1] !== a[1]) {
            return b[1] - a[1];
          }
          return a[0].localeCompare(b[0], 'ko');
        })
        .slice(0, 3)
        .map(([label, count]) => ({ label, count }));

      return {
        ...summary,
        topStages,
        items: [...summary.items].sort((a, b) => b.dateLabel.localeCompare(a.dateLabel)),
      };
    })
    .sort((a, b) => {
      if (b.inProgressCount !== a.inProgressCount) {
        return b.inProgressCount - a.inProgressCount;
      }
      if (b.totalCount !== a.totalCount) {
        return b.totalCount - a.totalCount;
      }
      return a.ownerName.localeCompare(b.ownerName, 'ko');
    });
}

export function EmployeePipelineOverview<T>({
  items,
  ownerLabel = '담당자',
  emptyMessage = '직원 기준으로 확인할 데이터가 없습니다.',
  stageColumnLabel = '현재 단계',
  summaryColumnLabel = '요약',
  dateColumnLabel = '기준일',
  onSelectItem,
}: EmployeePipelineOverviewProps<T>) {
  const summaries = useMemo(() => buildEmployeeSummaries(items), [items]);
  const [selectedOwner, setSelectedOwner] = useState<string | null>(summaries[0]?.ownerName ?? null);

  useEffect(() => {
    if (!summaries.length) {
      setSelectedOwner(null);
      return;
    }

    if (!selectedOwner || !summaries.some((summary) => summary.ownerName === selectedOwner)) {
      setSelectedOwner(summaries[0].ownerName);
    }
  }, [selectedOwner, summaries]);

  const activeSummary = summaries.find((summary) => summary.ownerName === selectedOwner) ?? summaries[0];

  if (!summaries.length) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {summaries.map((summary) => (
          <button
            key={summary.ownerName}
            type="button"
            onClick={() => setSelectedOwner(summary.ownerName)}
            className={clsx(
              'rounded-xl border p-4 text-left transition-colors',
              summary.ownerName === activeSummary?.ownerName
                ? 'border-[#1e293b] bg-[#1e293b]/[0.03]'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-[#1e293b]">{summary.ownerName}</div>
                <div className="mt-1 text-[11px] text-slate-500">
                  {ownerLabel} 기준 고객 {summary.totalCount}명
                </div>
              </div>
              <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                {summary.totalCount}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <Clock3 size={12} /> 진행중
                </div>
                <div className="mt-1 text-xl font-bold text-[#1e293b]">{summary.inProgressCount}</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <CheckCircle2 size={12} /> 완료
                </div>
                <div className="mt-1 text-xl font-bold text-emerald-600">{summary.completedCount}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {summary.topStages.map((stage) => (
                <span
                  key={`${summary.ownerName}-${stage.label}`}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600"
                >
                  {stage.label}
                  <strong className="font-semibold text-slate-800">{stage.count}</strong>
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {activeSummary ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <div>
              <div className="text-base font-bold text-[#1e293b]">{activeSummary.ownerName}</div>
              <div className="mt-1 text-xs text-slate-500">
                진행중 {activeSummary.inProgressCount}명 · 완료 {activeSummary.completedCount}명 · 전체 {activeSummary.totalCount}명
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <UserRound size={14} />
              {ownerLabel}
            </div>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">고객</th>
                  <th className="px-5 py-3 font-medium">유형</th>
                  <th className="px-5 py-3 font-medium">{dateColumnLabel}</th>
                  <th className="px-5 py-3 font-medium">{stageColumnLabel}</th>
                  <th className="px-5 py-3 font-medium">지역</th>
                  <th className="px-5 py-3 font-medium">{summaryColumnLabel}</th>
                  <th className="px-5 py-3 text-right font-medium">열기</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeSummary.items.map((item) => (
                  <tr
                    key={item.id}
                    className={clsx(
                      'transition-colors',
                      onSelectItem ? 'cursor-pointer hover:bg-slate-50' : 'hover:bg-slate-50'
                    )}
                    onClick={() => onSelectItem?.(item.original)}
                  >
                    <td className="px-5 py-4">
                      <div className="font-bold text-[#1e293b]">{item.customerName}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
                        {item.typeLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{item.dateLabel}</td>
                    <td className="px-5 py-4">
                      <span
                        className={clsx(
                          'inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold',
                          item.completed
                            ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                            : 'border-blue-100 bg-blue-50 text-blue-700'
                        )}
                      >
                        {item.stageLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{item.regionLabel || '-'}</td>
                    <td className="px-5 py-4 text-slate-600">{item.summaryLabel}</td>
                    <td className="px-5 py-4 text-right">
                      {onSelectItem ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                          열기 <ChevronRight size={14} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                          보기 <BriefcaseBusiness size={14} />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
