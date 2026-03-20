import type { IssuanceLocationSortKey, IssuanceTaskStatus, RegionSelection } from '@/app/types/issuance';

export const UNCLASSIFIED_REGION = '미분류';
const SEOUL_FULL_LEVEL2 = [
  '강북구',
  '성북구',
  '강서구',
  '양천구',
  '구로구',
  '금천구',
  '도봉구',
  '노원구',
  '동대문구',
  '성동구',
  '동작구',
  '관악구',
  '마포구',
  '용산구',
  '서대문구',
  '은평구',
  '서초구',
  '강남구',
  '송파구',
  '강동구',
  '영등포구',
  '종로구',
  '중구',
  '중랑구',
  '광진구',
] as const;

const SEOUL_GROUP_LABELS = [
  { label: '서울 > 강북구 · 성북구', keys: ['서울::강북구::', '서울::성북구::'] },
  { label: '서울 > 강서구 · 양천구', keys: ['서울::강서구::', '서울::양천구::'] },
  { label: '서울 > 구로구 · 금천구', keys: ['서울::구로구::', '서울::금천구::'] },
  { label: '서울 > 도봉구 · 노원구', keys: ['서울::도봉구::', '서울::노원구::'] },
  { label: '서울 > 동대문구 · 성동구', keys: ['서울::동대문구::', '서울::성동구::'] },
  { label: '서울 > 동작구 · 관악구', keys: ['서울::동작구::', '서울::관악구::'] },
  { label: '서울 > 마포구 · 용산구', keys: ['서울::마포구::', '서울::용산구::'] },
  { label: '서울 > 서대문구 · 은평구', keys: ['서울::서대문구::', '서울::은평구::'] },
  { label: '서울 > 서초구 · 강남구', keys: ['서울::서초구::', '서울::강남구::'] },
  { label: '서울 > 송파구 · 강동구', keys: ['서울::송파구::', '서울::강동구::'] },
  { label: '서울 > 영등포구 · 여의도동', keys: ['서울::영등포구::', '서울::영등포구::여의도동'] },
  { label: '서울 > 종로구 · 중구', keys: ['서울::종로구::', '서울::중구::'] },
  { label: '서울 > 중랑구 · 광진구', keys: ['서울::중랑구::', '서울::광진구::'] },
] as const;

const LEVEL1_ALIASES: Record<string, string> = {
  서울: '서울',
  서울특별시: '서울',
  부산: '부산',
  부산광역시: '부산',
  대구: '대구',
  대구광역시: '대구',
  인천: '인천',
  인천광역시: '인천',
  광주: '광주',
  광주광역시: '광주',
  대전: '대전',
  대전광역시: '대전',
  울산: '울산',
  울산광역시: '울산',
  세종: '세종',
  세종특별자치시: '세종',
  경기: '경기',
  경기도: '경기',
  강원: '강원',
  강원도: '강원',
  강원특별자치도: '강원',
  충북: '충북',
  충청북도: '충북',
  충남: '충남',
  충청남도: '충남',
  전북: '전북',
  전라북도: '전북',
  전북특별자치도: '전북',
  전남: '전남',
  전라남도: '전남',
  경북: '경북',
  경상북도: '경북',
  경남: '경남',
  경상남도: '경남',
  제주: '제주',
  제주특별자치도: '제주',
};

export interface ParsedRegionLevels {
  regionLevel1: string;
  regionLevel2: string;
  regionLevel3: string;
}

export interface RegionComparable {
  regionLevel1?: string;
  regionLevel2?: string;
  regionLevel3?: string;
}

function cleanToken(token: string) {
  return token.replace(/[(),]/g, '').trim();
}

function normalizeLevel1(token?: string) {
  if (!token) {
    return UNCLASSIFIED_REGION;
  }

  return LEVEL1_ALIASES[token] ?? UNCLASSIFIED_REGION;
}

function isLevel2(token: string) {
  return /(?:시|군|구)$/.test(token) && !(token in LEVEL1_ALIASES);
}

function isLevel3(token: string) {
  return /(?:동|읍|면|가|리)$/.test(token);
}

export function parseRegionLevels(address?: string): ParsedRegionLevels {
  if (!address?.trim()) {
    return {
      regionLevel1: UNCLASSIFIED_REGION,
      regionLevel2: UNCLASSIFIED_REGION,
      regionLevel3: UNCLASSIFIED_REGION,
    };
  }

  const tokens = address
    .split(/\s+/)
    .map(cleanToken)
    .filter(Boolean);

  const regionLevel1 =
    normalizeLevel1(tokens[0]) !== UNCLASSIFIED_REGION
      ? normalizeLevel1(tokens[0])
      : normalizeLevel1(tokens.find((token) => token in LEVEL1_ALIASES));

  const regionLevel2 = tokens.find((token) => isLevel2(token)) ?? UNCLASSIFIED_REGION;
  const regionLevel3 = tokens.find((token) => isLevel3(token)) ?? UNCLASSIFIED_REGION;

  return {
    regionLevel1,
    regionLevel2,
    regionLevel3,
  };
}

export function parseVisitPeriodValue(visitPeriod: string) {
  const match = visitPeriod.match(/(\d{4})[.\-/](\d{2})[.\-/](\d{2})/);
  if (!match) {
    return 0;
  }

  const [, year, month, day] = match;
  return Number(`${year}${month}${day}`);
}

export function getStatusSortWeight(status: IssuanceTaskStatus) {
  switch (status) {
    case 'unassigned':
      return 0;
    case 'assigned':
      return 1;
    case 'in_progress':
      return 2;
    case 'partial':
      return 3;
    case 'completed':
      return 4;
    default:
      return 5;
  }
}

export function compareText(left?: string, right?: string) {
  return (left ?? UNCLASSIFIED_REGION).localeCompare(right ?? UNCLASSIFIED_REGION, 'ko');
}

export function normalizeRegionSelection(selection: RegionSelection): RegionSelection {
  return {
    level1: selection.level1 || UNCLASSIFIED_REGION,
    ...(selection.level2 ? { level2: selection.level2 } : {}),
    ...(selection.level3 ? { level3: selection.level3 } : {}),
  };
}

export function getRegionSelectionKey(selection: RegionSelection) {
  const normalized = normalizeRegionSelection(selection);
  return [normalized.level1, normalized.level2 ?? '', normalized.level3 ?? ''].join('::');
}

export function isSameRegionSelection(left: RegionSelection, right: RegionSelection) {
  return getRegionSelectionKey(left) === getRegionSelectionKey(right);
}

export function getRegionSelectionLabel(selection: RegionSelection) {
  const normalized = normalizeRegionSelection(selection);
  if (normalized.level3) {
    return `${normalized.level1}>${normalized.level2 ?? UNCLASSIFIED_REGION}>${normalized.level3}`;
  }

  if (normalized.level2) {
    return `${normalized.level1}>${normalized.level2}`;
  }

  return normalized.level1;
}

export function summarizeRegionSelections(selections?: RegionSelection[]) {
  if (!selections?.length) {
    return null;
  }

  const normalized = selections.map((selection) => normalizeRegionSelection(selection));
  const level1Set = new Set(normalized.map((selection) => selection.level1));
  const selectionKeys = normalized.map((selection) => getRegionSelectionKey(selection)).sort();

  if (level1Set.size === 1 && normalized[0]?.level1 === '서울') {
    const coveredLevel2 = new Set(
      normalized
        .map((selection) => selection.level2)
        .filter((level2): level2 is string => Boolean(level2 && level2 !== UNCLASSIFIED_REGION))
    );
    const coversAllSeoul = SEOUL_FULL_LEVEL2.every((district) => coveredLevel2.has(district));
    if (coversAllSeoul) {
      return '서울 전체';
    }

    const matchedGroup = SEOUL_GROUP_LABELS.find((group) => {
      const sortedKeys = [...group.keys].sort();
      return sortedKeys.length === selectionKeys.length && sortedKeys.every((key, index) => key === selectionKeys[index]);
    });

    if (matchedGroup) {
      return matchedGroup.label;
    }
  }

  if (!level1Set.has('서울') && level1Set.size > 1) {
    const level1Labels = Array.from(new Set(normalized.map((selection) => selection.level1)));
    return `${level1Labels.slice(0, 2).join(' ')} 등`;
  }

  const labels = normalized.map((selection) => getRegionSelectionLabel(selection));
  return labels.length > 1 ? `${labels[0]} 외 ${labels.length - 1}개` : labels[0];
}

export function matchesRegionSelection<T extends RegionComparable>(row: T, selection: RegionSelection) {
  const normalizedSelection = normalizeRegionSelection(selection);
  const rowLevel1 = row.regionLevel1 ?? UNCLASSIFIED_REGION;
  const rowLevel2 = row.regionLevel2 ?? UNCLASSIFIED_REGION;
  const rowLevel3 = row.regionLevel3 ?? UNCLASSIFIED_REGION;

  if (rowLevel1 !== normalizedSelection.level1) {
    return false;
  }

  if (normalizedSelection.level2 && rowLevel2 !== normalizedSelection.level2) {
    return false;
  }

  if (normalizedSelection.level3 && rowLevel3 !== normalizedSelection.level3) {
    return false;
  }

  return true;
}

export function matchesRegionSelections<T extends RegionComparable>(row: T, selections: RegionSelection[]) {
  if (selections.length === 0) {
    return true;
  }

  return selections.some((selection) => matchesRegionSelection(row, selection));
}

export function compareBySortKey<T extends {
  status: IssuanceTaskStatus;
  regionLevel1?: string;
  regionLevel2?: string;
  regionLevel3?: string;
  locationName: string;
  visitPeriod: string;
}>(
  left: T,
  right: T,
  sortKey: IssuanceLocationSortKey
) {
  if (sortKey === 'hospital_name_asc') {
    return compareText(left.locationName, right.locationName);
  }

  if (sortKey === 'visit_date_desc') {
    return parseVisitPeriodValue(right.visitPeriod) - parseVisitPeriodValue(left.visitPeriod);
  }

  if (sortKey === 'visit_date_asc') {
    return parseVisitPeriodValue(left.visitPeriod) - parseVisitPeriodValue(right.visitPeriod);
  }

  const regionCompare =
    compareText(left.regionLevel1, right.regionLevel1) ||
    compareText(left.regionLevel2, right.regionLevel2) ||
    compareText(left.regionLevel3, right.regionLevel3) ||
    compareText(left.locationName, right.locationName);

  if (sortKey === 'region_asc') {
    return regionCompare;
  }

  return (
    getStatusSortWeight(left.status) - getStatusSortWeight(right.status) ||
    regionCompare
  );
}
