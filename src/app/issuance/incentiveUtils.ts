export const MONTHLY_INCENTIVE_TIERS = [
  { min: 0, max: 259, incentive: 0 },
  { min: 260, max: 269, incentive: 100000 },
  { min: 270, max: 279, incentive: 200000 },
  { min: 280, max: 289, incentive: 300000 },
  { min: 290, max: 299, incentive: 400000 },
  { min: 300, max: null, incentive: 500000 },
] as const;

export function getMonthlyIncentiveByCompletedCount(count: number) {
  const tier =
    MONTHLY_INCENTIVE_TIERS.find((item) => count >= item.min && (item.max === null || count <= item.max)) ??
    MONTHLY_INCENTIVE_TIERS[0];
  return tier.incentive;
}

export function getMonthlyIncentiveTierLabel(count: number) {
  const tier =
    MONTHLY_INCENTIVE_TIERS.find((item) => count >= item.min && (item.max === null || count <= item.max)) ??
    MONTHLY_INCENTIVE_TIERS[0];

  if (tier.max === null) {
    return `${tier.min}건 이상`;
  }

  return `${tier.min}~${tier.max}건`;
}

export function formatCurrency(value: number) {
  return `${value.toLocaleString('ko-KR')}원`;
}
