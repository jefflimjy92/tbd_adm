import { matchesRegionSelection, UNCLASSIFIED_REGION } from '@/app/issuance/regionUtils';
import type { RegionSelection, StaffAssignment, StaffPerformanceSummary } from '@/app/types/issuance';

export type PerformancePeriodPreset = 'all' | '7d' | '14d' | '30d' | 'this_month' | 'custom';
export type ListPeriodPreset = PerformancePeriodPreset;

export interface PerformancePeriodRange {
  mode: 'all' | 'bounded';
  startDate: string;
  endDate: string;
}

export interface ListPeriodDateTypeOption {
  key: string;
  label: string;
}

function toLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(base: Date, diff: number) {
  const next = new Date(base);
  next.setDate(next.getDate() + diff);
  return next;
}

export function normalizePeriodDateValue(value?: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().replace(/\./g, '-');
  const matched = normalized.match(/\d{4}-\d{2}-\d{2}/);
  return matched ? matched[0] : null;
}

export function getDefaultCustomPeriodRange(): PerformancePeriodRange {
  const today = new Date();
  return {
    mode: 'bounded',
    startDate: toLocalDateString(addDays(today, -29)),
    endDate: toLocalDateString(today),
  };
}

export function getThisMonthRange(referenceDate = new Date()): PerformancePeriodRange {
  const start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  return {
    mode: 'bounded',
    startDate: toLocalDateString(start),
    endDate: toLocalDateString(referenceDate),
  };
}

export interface PerformanceDateBounds {
  startDate: string;
  endDate: string;
}

export function getDateBoundsFromValues(
  values: Array<string | null | undefined>,
  fallback = getDefaultCustomPeriodRange()
): PerformanceDateBounds {
  const dates = values
    .map((value) => normalizePeriodDateValue(value))
    .filter((value): value is string => Boolean(value))
    .sort();

  if (!dates.length) {
    return {
      startDate: fallback.startDate,
      endDate: fallback.endDate,
    };
  }

  return {
    startDate: dates[0],
    endDate: dates[dates.length - 1],
  };
}

export function getRowsDateBounds<T>(
  rows: T[],
  getRowDate: (row: T) => string | null | undefined,
  fallback = getDefaultCustomPeriodRange()
): PerformanceDateBounds {
  return getDateBoundsFromValues(rows.map((row) => getRowDate(row)), fallback);
}

export function getRowsDateBoundsByType<T>(
  rows: T[],
  selectedDateType: string,
  resolvers: Record<string, (row: T) => string | null | undefined>,
  fallback = getDefaultCustomPeriodRange()
): PerformanceDateBounds {
  const resolver = resolvers[selectedDateType];
  if (!resolver) {
    return {
      startDate: fallback.startDate,
      endDate: fallback.endDate,
    };
  }

  return getRowsDateBounds(rows, resolver, fallback);
}

export function getPerformancePeriodRange(
  preset: PerformancePeriodPreset,
  customStartDate?: string,
  customEndDate?: string,
  referenceDate = new Date(),
  allRange?: PerformanceDateBounds
): PerformancePeriodRange {
  if (preset === 'all') {
    const fallback = getDefaultCustomPeriodRange();
    return {
      mode: 'all',
      startDate: allRange?.startDate || fallback.startDate,
      endDate: allRange?.endDate || fallback.endDate,
    };
  }

  if (preset === 'custom') {
    const fallback = getDefaultCustomPeriodRange();
    return {
      mode: 'bounded',
      startDate: customStartDate || fallback.startDate,
      endDate: customEndDate || fallback.endDate,
    };
  }

  if (preset === 'this_month') {
    return getThisMonthRange(referenceDate);
  }

  const days = preset === '7d' ? 6 : preset === '14d' ? 13 : 29;
  return {
    mode: 'bounded',
    startDate: toLocalDateString(addDays(referenceDate, -days)),
    endDate: toLocalDateString(referenceDate),
  };
}

export function getPerformancePeriodLabel(preset: PerformancePeriodPreset) {
  switch (preset) {
    case 'all':
      return '전체 기간';
    case '7d':
      return '최근 7일';
    case '14d':
      return '최근 14일';
    case '30d':
      return '최근 30일';
    case 'this_month':
      return '이번 1달';
    case 'custom':
      return '기간 선택';
    default:
      return '기간';
  }
}

export function getPerformanceCompletedLabel(preset: PerformancePeriodPreset) {
  return `${getPerformancePeriodLabel(preset)} 완료`;
}

export function getPerformancePeriodDescription(range: PerformancePeriodRange) {
  if (range.mode === 'all') {
    return '전체 기간';
  }
  return `${range.startDate} ~ ${range.endDate}`;
}

export function getAdjustedCustomPeriodRange(
  currentRange: PerformancePeriodRange,
  field: 'startDate' | 'endDate',
  value: string
) {
  const nextRange = {
    ...currentRange,
    [field]: value,
  };

  if (nextRange.endDate < nextRange.startDate) {
    if (field === 'startDate') {
      nextRange.endDate = value;
    } else {
      nextRange.startDate = value;
    }
  }

  return nextRange;
}

function isDateWithinRange(target?: string, range?: PerformancePeriodRange) {
  if (!target || !range) {
    return false;
  }

  if (range.mode === 'all') {
    return true;
  }

  return target >= range.startDate && target <= range.endDate;
}

function locationMatchesAssignedRegions(
  assignedRegions: RegionSelection[] | undefined,
  assignment: Pick<StaffAssignment, 'regionLevel1' | 'regionLevel2' | 'regionLevel3'>
) {
  if (!assignedRegions?.length) {
    return false;
  }

  return assignedRegions.some((region) =>
    matchesRegionSelection(assignment, {
      level1: region.level1,
      level2: region.level2 ?? UNCLASSIFIED_REGION,
      ...(region.level3 ? { level3: region.level3 } : {}),
    })
  );
}

export function filterRowsByPeriod<T>(
  rows: T[],
  range: PerformancePeriodRange,
  getRowDate: (row: T) => string | null | undefined
) {
  return rows.filter((row) => {
    const target = normalizePeriodDateValue(getRowDate(row));
    return isDateWithinRange(target ?? undefined, range);
  });
}

export function filterRowsByPeriodAndType<T>(
  rows: T[],
  range: PerformancePeriodRange,
  selectedDateType: string,
  resolvers: Record<string, (row: T) => string | null | undefined>
) {
  const resolver = resolvers[selectedDateType];
  if (!resolver) {
    return rows;
  }

  return filterRowsByPeriod(rows, range, resolver);
}

export function applyPerformancePeriodToRows(
  rows: StaffPerformanceSummary[],
  assignments: StaffAssignment[],
  range: PerformancePeriodRange
) {
  return rows
    .map((row) => {
      const completedAssignmentsInRange = assignments.filter(
        (assignment) =>
          assignment.staffId === row.staffId &&
          assignment.status === 'completed' &&
          isDateWithinRange(assignment.completedAt, range)
      );
      const completedInRegion = completedAssignmentsInRange.filter((assignment) =>
        locationMatchesAssignedRegions(row.assignedRegions, assignment)
      ).length;
      const completedOutOfRegion = completedAssignmentsInRange.length - completedInRegion;

      return {
        ...row,
        completedThisMonth: completedAssignmentsInRange.length,
        completedThisMonthInRegion: completedInRegion,
        completedThisMonthOutOfRegion: completedOutOfRegion,
      };
    })
    .sort(
      (left, right) =>
        right.completedThisMonth - left.completedThisMonth ||
        left.inProgressCount - right.inProgressCount ||
        left.staffName.localeCompare(right.staffName, 'ko')
    );
}
