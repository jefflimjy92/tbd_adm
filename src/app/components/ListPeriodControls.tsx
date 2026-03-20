import clsx from 'clsx';
import type { ListPeriodDateTypeOption, PerformancePeriodPreset, PerformancePeriodRange } from '@/app/issuance/performancePeriodUtils';
import { getAdjustedCustomPeriodRange } from '@/app/issuance/performancePeriodUtils';

interface ListPeriodControlsProps {
  preset: PerformancePeriodPreset;
  range: PerformancePeriodRange;
  onPresetChange: (preset: PerformancePeriodPreset) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  dateType?: string;
  dateTypeOptions?: ListPeriodDateTypeOption[];
  onDateTypeChange?: (dateType: string) => void;
  align?: 'left' | 'right';
  className?: string;
}

export function ListPeriodControls({
  preset,
  range,
  onPresetChange,
  onStartDateChange,
  onEndDateChange,
  dateType,
  dateTypeOptions,
  onDateTypeChange,
  align = 'right',
  className,
}: ListPeriodControlsProps) {
  const isCustom = preset === 'custom';
  const hasDateTypeOptions = Boolean(dateTypeOptions && dateTypeOptions.length > 1 && dateType && onDateTypeChange);

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center gap-2',
        align === 'right' ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {hasDateTypeOptions ? (
        <select
          value={dateType}
          onChange={(event) => onDateTypeChange?.(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-200"
        >
          {dateTypeOptions?.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}
      <select
        value={preset}
        onChange={(event) => onPresetChange(event.target.value as PerformancePeriodPreset)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-200"
      >
        <option value="all">전체 기간</option>
        <option value="7d">최근 7일</option>
        <option value="14d">최근 14일</option>
        <option value="30d">최근 30일</option>
        <option value="this_month">이번 1달</option>
        <option value="custom">기간 선택</option>
      </select>
      <input
        type="date"
        value={range.startDate}
        onChange={(event) => {
          const nextRange = getAdjustedCustomPeriodRange(range, 'startDate', event.target.value);
          onStartDateChange(nextRange.startDate);
          if (nextRange.endDate !== range.endDate) {
            onEndDateChange(nextRange.endDate);
          }
        }}
        disabled={!isCustom}
        className={clsx(
          'rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1',
          isCustom
            ? 'border-slate-200 bg-white text-slate-600 focus:ring-slate-200'
            : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
        )}
      />
      <span className="text-xs text-slate-400">~</span>
      <input
        type="date"
        value={range.endDate}
        onChange={(event) => {
          const nextRange = getAdjustedCustomPeriodRange(range, 'endDate', event.target.value);
          if (nextRange.startDate !== range.startDate) {
            onStartDateChange(nextRange.startDate);
          }
          onEndDateChange(nextRange.endDate);
        }}
        disabled={!isCustom}
        className={clsx(
          'rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1',
          isCustom
            ? 'border-slate-200 bg-white text-slate-600 focus:ring-slate-200'
            : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
        )}
      />
    </div>
  );
}
