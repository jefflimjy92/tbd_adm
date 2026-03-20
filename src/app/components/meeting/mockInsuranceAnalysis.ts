// 보험 분석 목 데이터

export interface CoverageContract {
  id: string;
  insurer: string;
  productName: string;
  contractType: '실손' | '종합' | '정기' | '종신' | '변액';
  premium: number;
  startDate: string;
  endDate: string;
  isRenewal: boolean;
  status: '정상' | '만기' | '해지';
  contractor: string;
  insuredPerson: string;
}

export interface CoverageItem {
  contractId: string;
  coverageName: string;
  coverageType: '사망' | '진단' | '수술' | '입원' | '실손' | '후유장해';
  amount: number;
  category: '암' | '뇌' | '심장' | '상해' | '질병' | '기타';
  isRenewal: boolean;
}

export interface GapFlag {
  id: string;
  label: string;
  detected: boolean;
  severity: 'high' | 'medium' | 'low';
  detail: string;
  recommendation: string;
}

// 목 계약 데이터
export const MOCK_CONTRACTS: CoverageContract[] = [
  {
    id: 'C-001',
    insurer: '삼성생명',
    productName: '뉴 종합건강보험',
    contractType: '종합',
    premium: 18,
    startDate: '2019-05-15',
    endDate: '2049-05-15',
    isRenewal: false,
    status: '정상',
    contractor: '임준영',
    insuredPerson: '임준영',
  },
  {
    id: 'C-002',
    insurer: 'KB손해보험',
    productName: 'KB 더블보장 건강보험',
    contractType: '종합',
    premium: 12,
    startDate: '2020-08-01',
    endDate: '2050-08-01',
    isRenewal: true,
    status: '정상',
    contractor: '임준영',
    insuredPerson: '임준영',
  },
  {
    id: 'C-003',
    insurer: '한화생명',
    productName: '한화 실손의료보험',
    contractType: '실손',
    premium: 5,
    startDate: '2021-03-10',
    endDate: '2036-03-10',
    isRenewal: true,
    status: '정상',
    contractor: '임준영',
    insuredPerson: '임준영',
  },
  {
    id: 'C-004',
    insurer: '교보생명',
    productName: '교보 정기보험',
    contractType: '정기',
    premium: 8,
    startDate: '2018-01-20',
    endDate: '2038-01-20',
    isRenewal: false,
    status: '정상',
    contractor: '임준영',
    insuredPerson: '임준영',
  },
  {
    id: 'C-005',
    insurer: 'DB손해보험',
    productName: '참좋은 운전자보험',
    contractType: '종합',
    premium: 3,
    startDate: '2022-11-05',
    endDate: '2032-11-05',
    isRenewal: false,
    status: '정상',
    contractor: '임준영',
    insuredPerson: '임준영',
  },
];

// 목 담보 데이터
export const MOCK_COVERAGE_ITEMS: CoverageItem[] = [
  // 삼성생명 종합건강보험
  { contractId: 'C-001', coverageName: '일반암 진단비', coverageType: '진단', amount: 3000, category: '암', isRenewal: false },
  { contractId: 'C-001', coverageName: '뇌출혈 진단비', coverageType: '진단', amount: 2000, category: '뇌', isRenewal: false },
  { contractId: 'C-001', coverageName: '급성심근경색 진단비', coverageType: '진단', amount: 2000, category: '심장', isRenewal: false },
  { contractId: 'C-001', coverageName: '질병 수술비', coverageType: '수술', amount: 100, category: '질병', isRenewal: false },
  { contractId: 'C-001', coverageName: '질병 입원일당', coverageType: '입원', amount: 5, category: '질병', isRenewal: false },
  { contractId: 'C-001', coverageName: '사망보험금', coverageType: '사망', amount: 10000, category: '기타', isRenewal: false },

  // KB 더블보장 건강보험 (갱신형)
  { contractId: 'C-002', coverageName: '상해 수술비', coverageType: '수술', amount: 200, category: '상해', isRenewal: true },
  { contractId: 'C-002', coverageName: '상해 입원일당', coverageType: '입원', amount: 5, category: '상해', isRenewal: true },
  { contractId: 'C-002', coverageName: '상해 후유장해(80%)', coverageType: '후유장해', amount: 10000, category: '상해', isRenewal: true },
  { contractId: 'C-002', coverageName: '골절 진단비', coverageType: '진단', amount: 50, category: '상해', isRenewal: true },
  { contractId: 'C-002', coverageName: '상해 사망', coverageType: '사망', amount: 5000, category: '상해', isRenewal: true },

  // 한화 실손의료보험
  { contractId: 'C-003', coverageName: '질병 입원의료비', coverageType: '입원', amount: 5000, category: '질병', isRenewal: true },
  { contractId: 'C-003', coverageName: '질병 통원의료비', coverageType: '실손', amount: 30, category: '질병', isRenewal: true },
  { contractId: 'C-003', coverageName: '상해 입원의료비', coverageType: '입원', amount: 5000, category: '상해', isRenewal: true },
  { contractId: 'C-003', coverageName: '상해 통원의료비', coverageType: '실손', amount: 30, category: '상해', isRenewal: true },

  // 교보 정기보험
  { contractId: 'C-004', coverageName: '사망보험금', coverageType: '사망', amount: 20000, category: '기타', isRenewal: false },

  // DB 운전자보험
  { contractId: 'C-005', coverageName: '교통사고 처리비', coverageType: '진단', amount: 3000, category: '상해', isRenewal: false },
  { contractId: 'C-005', coverageName: '자동차사고 부상치료비', coverageType: '수술', amount: 1000, category: '상해', isRenewal: false },
  { contractId: 'C-005', coverageName: '벌금', coverageType: '진단', amount: 2000, category: '기타', isRenewal: false },
];

// 7개 보장 갭 분석 플래그
export const MOCK_GAP_FLAGS: GapFlag[] = [
  {
    id: 'gap-cancer-brain-heart',
    label: '암·뇌·심 치료비 없음',
    detected: false,
    severity: 'high',
    detail: '암 진단비 3,000만원, 뇌출혈 2,000만원, 급성심근경색 2,000만원 확인됨. 다만 뇌혈관/심장질환 범위가 좁음 (뇌출혈·급성심근경색만 보장).',
    recommendation: '뇌혈관질환·허혈성심장질환 범위로 확대 필요',
  },
  {
    id: 'gap-disability-80',
    label: '80% 이상 후유장해',
    detected: true,
    severity: 'high',
    detail: 'C-002 계약에서 상해 후유장해(80%) 1억원 가입되어 있으나, 질병 후유장해 담보 없음.',
    recommendation: '질병 후유장해 80% 담보 추가 검토',
  },
  {
    id: 'gap-injury-only',
    label: '질병 아닌 상해 위주',
    detected: true,
    severity: 'medium',
    detail: 'C-002 KB 더블보장은 상해 위주 구성. 질병 수술비·입원일당은 C-001에만 존재하며, 금액이 낮음 (수술비 100만원, 입원일당 5만원).',
    recommendation: '질병 수술비·입원일당 보강 필요',
  },
  {
    id: 'gap-high-amount',
    label: '담보별 가입금액 과다',
    detected: false,
    severity: 'low',
    detail: '전체 담보 가입금액이 적정 수준으로 판단됨.',
    recommendation: '현재 수준 유지',
  },
  {
    id: 'gap-duplicate',
    label: '중복 담보',
    detected: true,
    severity: 'medium',
    detail: 'C-001(삼성)과 C-003(한화) 모두 질병 입원 담보 보유. C-001 입원일당 5만원 + C-003 실손 입원의료비 중복 가입.',
    recommendation: '실손보험 외 입원일당 필요성 재검토',
  },
  {
    id: 'gap-essential-missing',
    label: '필수담보 누락',
    detected: true,
    severity: 'high',
    detail: '3대 진단비(유사암, 경계성종양, 제자리암) 누락. 뇌혈관질환 범위 협소. 질병 후유장해 없음.',
    recommendation: '유사암·경계성종양 진단비 + 뇌혈관질환 진단비 + 질병 후유장해 추가',
  },
  {
    id: 'gap-renewal',
    label: '갱신형',
    detected: true,
    severity: 'medium',
    detail: 'C-002(KB 더블보장)과 C-003(한화 실손) 2건이 갱신형. 향후 보험료 인상 가능성 있음.',
    recommendation: '갱신형 → 비갱신형 전환 또는 갱신 주기 확인',
  },
];
