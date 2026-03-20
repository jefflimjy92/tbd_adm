import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, MapPinned, RotateCcw, Search, X } from 'lucide-react';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { cn } from '@/app/components/ui/utils';
import {
  compareText,
  getRegionSelectionKey,
  getRegionSelectionLabel,
  isSameRegionSelection,
  normalizeRegionSelection,
  UNCLASSIFIED_REGION,
} from '@/app/issuance/regionUtils';
import type { RegionSelection } from '@/app/types/issuance';

interface RegionLikeRow {
  regionLevel1?: string;
  regionLevel2?: string;
  regionLevel3?: string;
}

interface RegionOption {
  key: string;
  selection: RegionSelection;
  label: string;
  secondaryLabel?: string;
  count: number;
  searchableText: string;
}

interface RegionMultiSelectProps<T extends RegionLikeRow> {
  rows: T[];
  value: RegionSelection[];
  onApply: (nextSelections: RegionSelection[]) => void;
  className?: string;
}

const LEVEL1_PRIORITY = ['서울', '경기', '인천'];

function buildLevel1Options<T extends RegionLikeRow>(rows: T[]) {
  const counts = new Map<string, number>();

  rows.forEach((row) => {
    const level1 = row.regionLevel1 ?? UNCLASSIFIED_REGION;
    counts.set(level1, (counts.get(level1) ?? 0) + 1);
  });

  return [...counts.entries()]
    .sort(([leftName, leftCount], [rightName, rightCount]) => {
      const leftPriority = LEVEL1_PRIORITY.indexOf(leftName);
      const rightPriority = LEVEL1_PRIORITY.indexOf(rightName);

      if (leftPriority !== -1 || rightPriority !== -1) {
        if (leftPriority === -1) return 1;
        if (rightPriority === -1) return -1;
        return leftPriority - rightPriority;
      }

      return rightCount - leftCount || compareText(leftName, rightName);
    })
    .map(([level1, count]) => ({
      key: level1,
      selection: { level1 },
      label: level1,
      count,
      searchableText: level1,
    }));
}

function buildLevel2Options<T extends RegionLikeRow>(rows: T[], level1Scope: Set<string>) {
  const filteredRows = level1Scope.size
    ? rows.filter((row) => level1Scope.has(row.regionLevel1 ?? UNCLASSIFIED_REGION))
    : rows;
  const counts = new Map<string, RegionOption>();
  const parentCounts = new Map<string, number>();

  filteredRows.forEach((row) => {
    const level1 = row.regionLevel1 ?? UNCLASSIFIED_REGION;
    const level2 = row.regionLevel2 ?? UNCLASSIFIED_REGION;
    const key = `${level1}::${level2}`;
    parentCounts.set(level1, (parentCounts.get(level1) ?? 0) + 1);
    const existing = counts.get(key);

    if (existing) {
      existing.count += 1;
      return;
    }

    counts.set(key, {
      key,
      selection: { level1, level2 },
      label: level2,
      secondaryLabel: level1,
      count: 1,
      searchableText: `${level1} ${level2}`,
    });
  });

  const scopedAllOptions = [...parentCounts.entries()]
    .sort(([left], [right]) => compareText(left, right))
    .map(([level1, count]) => ({
    key: `${level1}::__all__`,
    selection: { level1 },
    label: `${level1} 전체`,
    secondaryLabel: '광역시도 전체 선택',
    count,
    searchableText: `${level1} 전체`,
    }));

  const childOptions = [...counts.values()].sort(
    (left, right) => compareText(left.selection.level1, right.selection.level1) || compareText(left.label, right.label)
  );

  return [...scopedAllOptions, ...childOptions];
}

function buildLevel3Options<T extends RegionLikeRow>(
  rows: T[],
  level1Scope: Set<string>,
  level2Scope: Set<string>
) {
  const filteredRows = level2Scope.size
    ? rows.filter((row) =>
        level2Scope.has(`${row.regionLevel1 ?? UNCLASSIFIED_REGION}::${row.regionLevel2 ?? UNCLASSIFIED_REGION}`)
      )
    : level1Scope.size
      ? rows.filter((row) => level1Scope.has(row.regionLevel1 ?? UNCLASSIFIED_REGION))
      : rows;
  const counts = new Map<string, RegionOption>();
  const parentCounts = new Map<string, RegionOption>();

  filteredRows.forEach((row) => {
    const level1 = row.regionLevel1 ?? UNCLASSIFIED_REGION;
    const level2 = row.regionLevel2 ?? UNCLASSIFIED_REGION;
    const level3 = row.regionLevel3 ?? UNCLASSIFIED_REGION;
    const key = `${level1}::${level2}::${level3}`;
    const parentKey = `${level1}::${level2}`;
    const existing = counts.get(key);
    const existingParent = parentCounts.get(parentKey);

    if (existingParent) {
      existingParent.count += 1;
    } else {
      parentCounts.set(parentKey, {
        key: `${parentKey}::__all__`,
        selection: { level1, level2 },
        label: `${level2} 전체`,
        secondaryLabel: `${level1} · 시군구 전체 선택`,
        count: 1,
        searchableText: `${level1} ${level2} 전체`,
      });
    }

    if (existing) {
      existing.count += 1;
      return;
    }

    counts.set(key, {
      key,
      selection: { level1, level2, level3 },
      label: level3,
      secondaryLabel: `${level1} · ${level2}`,
      count: 1,
      searchableText: `${level1} ${level2} ${level3}`,
    });
  });

  const scopedAllOptions = [...parentCounts.values()].sort(
    (left, right) =>
      compareText(left.selection.level1, right.selection.level1) ||
      compareText(left.selection.level2, right.selection.level2)
  );

  const childOptions = [...counts.values()].sort(
    (left, right) =>
      compareText(left.selection.level1, right.selection.level1) ||
      compareText(left.selection.level2, right.selection.level2) ||
      compareText(left.label, right.label)
  );

  return [...scopedAllOptions, ...childOptions];
}

function filterOptions(options: RegionOption[], query: string) {
  if (!query.trim()) {
    return options;
  }

  const normalized = query.trim().toLowerCase();
  return options.filter((option) => option.searchableText.toLowerCase().includes(normalized));
}

function OptionColumn({
  title,
  options,
  selections,
  onToggle,
  onActivate,
  activeKey,
  emptyMessage,
  disabled = false,
}: {
  title: string;
  options: RegionOption[];
  selections: RegionSelection[];
  onToggle: (selection: RegionSelection) => void;
  onActivate?: (selection: RegionSelection) => void;
  activeKey?: string | null;
  emptyMessage: string;
  disabled?: boolean;
}) {
  return (
    <div className={cn('min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50/60', disabled && 'opacity-60')}>
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="text-xs font-semibold text-slate-500">{title}</div>
      </div>
      <ScrollArea className="h-64">
        <div className="space-y-1 p-2">
          {disabled ? (
            <div className="px-3 py-8 text-center text-xs text-slate-400">{emptyMessage}</div>
          ) : options.length === 0 ? (
            <div className="px-3 py-8 text-center text-xs text-slate-400">{emptyMessage}</div>
          ) : (
            options.map((option) => {
              const checked = selections.some((selection) => isSameRegionSelection(selection, option.selection));
              const active = activeKey === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => onActivate?.(option.selection)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                    active
                      ? 'border-blue-200 bg-blue-50 text-[#1d4ed8]'
                      : checked
                        ? 'border-slate-200 bg-white text-[#1e293b]'
                        : 'border-transparent text-slate-700 hover:bg-white'
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => onToggle(option.selection)}
                    onClick={(event) => event.stopPropagation()}
                    className="mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{option.label}</div>
                    {option.secondaryLabel && (
                      <div className="mt-0.5 truncate text-[11px] text-slate-400">{option.secondaryLabel}</div>
                    )}
                  </div>
                  <div className="shrink-0 text-xs font-semibold text-slate-400">{option.count}</div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export function RegionMultiSelect<T extends RegionLikeRow>({
  rows,
  value,
  onApply,
  className,
}: RegionMultiSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [draftSelections, setDraftSelections] = useState<RegionSelection[]>(value);
  const [activeLevel1, setActiveLevel1] = useState<string | null>(null);
  const [activeLevel2Key, setActiveLevel2Key] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDraftSelections(value);
      const firstLevel1 = value[0]?.level1 ?? null;
      const firstLevel2 = value.find((selection) => selection.level2);
      setActiveLevel1(firstLevel1);
      setActiveLevel2Key(firstLevel2 ? `${firstLevel2.level1}::${firstLevel2.level2 ?? UNCLASSIFIED_REGION}` : null);
    }
  }, [open, value]);

  const normalizedSelections = useMemo(
    () => draftSelections.map((selection) => normalizeRegionSelection(selection)),
    [draftSelections]
  );

  const selectedLevel1Scope = useMemo(
    () => new Set(activeLevel1 ? [activeLevel1] : []),
    [activeLevel1]
  );

  const selectedLevel2Scope = useMemo(
    () => new Set(activeLevel2Key ? [activeLevel2Key] : []),
    [activeLevel2Key]
  );

  const level1Options = useMemo(() => filterOptions(buildLevel1Options(rows), query), [rows, query]);
  const level2Options = useMemo(
    () => filterOptions(buildLevel2Options(rows, selectedLevel1Scope), query),
    [query, rows, selectedLevel1Scope]
  );
  const level3Options = useMemo(
    () => filterOptions(buildLevel3Options(rows, selectedLevel1Scope, selectedLevel2Scope), query),
    [query, rows, selectedLevel1Scope, selectedLevel2Scope]
  );

  const selectedLabels = useMemo(
    () =>
      normalizedSelections
        .map((selection) => ({
          key: getRegionSelectionKey(selection),
          label: getRegionSelectionLabel(selection),
          selection,
        }))
        .sort((left, right) => compareText(left.label, right.label)),
    [normalizedSelections]
  );

  const triggerLabel = useMemo(() => {
    if (value.length === 0) {
      return '지역 전체';
    }

    if (value.length === 1) {
      return getRegionSelectionLabel(value[0]);
    }

    return `지역 ${value.length}개 선택`;
  }, [value]);

  const toggleSelection = (selection: RegionSelection) => {
    setDraftSelections((prev) => {
      const normalized = normalizeRegionSelection(selection);
      if (prev.some((item) => isSameRegionSelection(item, normalized))) {
        return prev.filter((item) => !isSameRegionSelection(item, normalized));
      }

      return [...prev, normalized];
    });
  };

  const handleApply = () => {
    onApply(normalizedSelections);
    setOpen(false);
    setQuery('');
  };

  const handleReset = () => {
    setDraftSelections([]);
    setActiveLevel1(null);
    setActiveLevel2Key(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery('');
      setActiveLevel1(null);
      setActiveLevel2Key(null);
    }
  };

  const activateLevel1 = (selection: RegionSelection) => {
    setActiveLevel1(selection.level1);
    setActiveLevel2Key(null);
  };

  const activateLevel2 = (selection: RegionSelection) => {
    setActiveLevel1(selection.level1);
    if (selection.level2) {
      setActiveLevel2Key(`${selection.level1}::${selection.level2}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex min-w-[180px] items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50',
            className
          )}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <MapPinned size={14} className="text-slate-400" />
            <span className="truncate">{triggerLabel}</span>
          </span>
          <ChevronDown size={14} className={cn('text-slate-400 transition-transform', open && 'rotate-180')} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="w-[840px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 p-0 shadow-xl">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-sm font-bold text-[#1e293b]">지역 선택</div>
              <div className="mt-1 text-xs text-slate-400">여러 지역을 한 번에 선택해 방문지를 필터링하고 일괄 배정할 수 있습니다.</div>
            </div>
            <div className="relative w-full lg:max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="지역명 검색"
                className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-4 lg:grid-cols-3">
          <OptionColumn
            title={`광역시도 ${buildLevel1Options(rows).length}개`}
            options={level1Options}
            selections={normalizedSelections}
            onToggle={toggleSelection}
            onActivate={activateLevel1}
            activeKey={activeLevel1}
            emptyMessage="선택 가능한 광역시도가 없습니다."
          />
          <OptionColumn
            title={`시군구 ${buildLevel2Options(rows, selectedLevel1Scope).length}개`}
            options={level2Options}
            selections={normalizedSelections}
            onToggle={toggleSelection}
            onActivate={activateLevel2}
            activeKey={activeLevel2Key}
            emptyMessage={activeLevel1 ? '선택 가능한 시군구가 없습니다.' : '광역시도를 먼저 눌러 시군구를 선택하세요.'}
            disabled={!activeLevel1}
          />
          <OptionColumn
            title={`행정동 ${buildLevel3Options(rows, selectedLevel1Scope, selectedLevel2Scope).length}개`}
            options={level3Options}
            selections={normalizedSelections}
            onToggle={toggleSelection}
            emptyMessage={activeLevel2Key ? '선택 가능한 행정동이 없습니다.' : '시군구를 먼저 눌러 행정동을 선택하세요.'}
            disabled={!activeLevel2Key}
          />
        </div>

        <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-slate-400">선택된 지역</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedLabels.length === 0 ? (
                  <span className="text-xs text-slate-400">전체 지역이 조회됩니다.</span>
                ) : (
                  selectedLabels.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleSelection(item.selection)}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200"
                    >
                      {item.label}
                      <X size={12} className="text-slate-400" />
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-white"
              >
                <RotateCcw size={13} />
                초기화
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="rounded-lg bg-[#1e293b] px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
