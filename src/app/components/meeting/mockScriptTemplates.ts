// 영업 스크립트 목 데이터

export interface ScriptTemplate {
  id: string;
  topicId: string;
  source: 'hira' | 'coverage';
  label: string;
  defaultText: string;
  savedVersions: { id: string; text: string; savedAt: string; label: string }[];
}

export interface HiraDiseaseRecord {
  code: string;
  name: string;
  visitCount: number;
  lastVisitDate: string;
  scriptTemplate: string;
}

// ━━━ 심평원 진료내역 참조 데이터 (토픽별) ━━━

export interface HiraReferenceRecord {
  date: string;
  hospital: string;
  department: string;
  diagnosis: string;
  diseaseCode: string;
  treatmentType: string;
  details: string;
}

export interface HiraTopicReference {
  topicId: string;
  records: HiraReferenceRecord[];
  summary: string;
}

// 토픽별 심평원 진료내역 목 데이터
export const HIRA_TOPIC_REFERENCES: Record<string, HiraTopicReference> = {
  'hira-hospitalization': {
    topicId: 'hospitalization',
    summary: '최근 3년간 입원 이력 2건 확인',
    records: [
      { date: '2025-06-12', hospital: '서울대병원', department: '소화기내과', diagnosis: '급성 위염', diseaseCode: 'K29', treatmentType: '입원', details: '입원 5일 / 내시경 검사 포함' },
      { date: '2024-09-03', hospital: '분당차병원', department: '정형외과', diagnosis: '요추 추간판탈출증', diseaseCode: 'M51', treatmentType: '입원', details: '입원 7일 / 시술(신경차단술)' },
    ],
  },
  'hira-emergency': {
    topicId: 'emergency',
    summary: '최근 3년간 응급실 방문 1건',
    records: [
      { date: '2025-02-14', hospital: '아주대병원', department: '응급의학과', diagnosis: '복통 (급성 위염 의심)', diseaseCode: 'R10', treatmentType: '응급', details: 'CT 촬영 / 수액 치료 / 당일 퇴원' },
    ],
  },
  'hira-chronic': {
    topicId: 'chronic',
    summary: '본태성 고혈압 진료 지속 중 (24회)',
    records: [
      { date: '2026-03-01', hospital: '동탄내과', department: '내과', diagnosis: '본태성 고혈압', diseaseCode: 'I10', treatmentType: '외래', details: '아믈로디핀 5mg 처방 (30일)' },
      { date: '2026-02-01', hospital: '동탄내과', department: '내과', diagnosis: '본태성 고혈압', diseaseCode: 'I10', treatmentType: '외래', details: '아믈로디핀 5mg 처방 (30일)' },
      { date: '2026-01-02', hospital: '동탄내과', department: '내과', diagnosis: '본태성 고혈압', diseaseCode: 'I10', treatmentType: '외래', details: '아믈로디핀 5mg 처방 (30일) / 혈액검사' },
    ],
  },
  'hira-same-disease': {
    topicId: 'same-disease',
    summary: '동일 상병 반복 진료 Top 5',
    records: [
      { date: '-', hospital: '-', department: '-', diagnosis: '본태성 고혈압', diseaseCode: 'I10', treatmentType: '외래', details: '24회 (2024.03 ~ 현재)' },
      { date: '-', hospital: '-', department: '-', diagnosis: '등통증(요통)', diseaseCode: 'M54', treatmentType: '외래', details: '15회 (2024.06 ~ 2026.01)' },
      { date: '-', hospital: '-', department: '-', diagnosis: '급성 상기도감염', diseaseCode: 'J06', treatmentType: '외래', details: '12회 (2024.01 ~ 2026.02)' },
      { date: '-', hospital: '-', department: '-', diagnosis: '위궤양', diseaseCode: 'K25', treatmentType: '외래', details: '8회 (2024.11 ~ 2025.11)' },
      { date: '-', hospital: '-', department: '-', diagnosis: '아래팔 골절', diseaseCode: 'S52', treatmentType: '외래', details: '3회 (2025.07 ~ 2025.09)' },
    ],
  },
  'hira-polyp': {
    topicId: 'polyp',
    summary: '용종 관련 진료 1건 (위 용종 제거)',
    records: [
      { date: '2025-06-12', hospital: '서울대병원', department: '소화기내과', diagnosis: '위의 용종', diseaseCode: 'K31', treatmentType: '시술', details: '위내시경 + 용종절제술 / 조직검사: 선종(양성)' },
    ],
  },
  'hira-traffic': {
    topicId: 'traffic',
    summary: '교통사고 관련 진료 1건',
    records: [
      { date: '2025-07-15', hospital: '분당차병원', department: '정형외과', diagnosis: '아래팔 골절', diseaseCode: 'S52', treatmentType: '입원+수술', details: '교통사고 / 골절 정복술 / 입원 3일 / 깁스 6주' },
      { date: '2025-08-10', hospital: '동탄재활의학과', department: '재활의학과', diagnosis: '골절 후 재활', diseaseCode: 'S52', treatmentType: '외래', details: '물리치료 10회 / 통원' },
    ],
  },
  'hira-orthopedic': {
    topicId: 'orthopedic',
    summary: '정형외과 진료 총 18회',
    records: [
      { date: '2026-01-15', hospital: '동탄정형외과', department: '정형외과', diagnosis: '등통증(요통)', diseaseCode: 'M54', treatmentType: '외래', details: '도수치료 + 물리치료' },
      { date: '2025-12-20', hospital: '동탄정형외과', department: '정형외과', diagnosis: '등통증(요통)', diseaseCode: 'M54', treatmentType: '외래', details: '도수치료 + 물리치료 / MRI 촬영' },
      { date: '2025-07-15', hospital: '분당차병원', department: '정형외과', diagnosis: '아래팔 골절', diseaseCode: 'S52', treatmentType: '수술', details: '골절 정복술 시행' },
      { date: '2024-09-03', hospital: '분당차병원', department: '정형외과', diagnosis: '요추 추간판탈출증', diseaseCode: 'M51', treatmentType: '입원', details: '신경차단술 / 입원 7일' },
    ],
  },
};

// ━━━ 보장분석 참조 데이터 매핑 (토픽별 → 관련 담보) ━━━

export interface CoverageTopicReference {
  topicId: string;
  summary: string;
  relatedCoverageNames: string[];  // mockInsuranceAnalysis의 coverageName과 매칭
  gapFlagId: string;               // mockInsuranceAnalysis의 GapFlag.id와 매칭
}

export const COVERAGE_TOPIC_REFERENCES: Record<string, CoverageTopicReference> = {
  'cov-cancer-brain-heart': {
    topicId: 'cancer-brain-heart',
    summary: '암 3,000만 / 뇌출혈 2,000만 / 급성심근경색 2,000만 (범위 협소)',
    relatedCoverageNames: ['일반암 진단비', '뇌출혈 진단비', '급성심근경색 진단비'],
    gapFlagId: 'gap-cancer-brain-heart',
  },
  'cov-disability-80': {
    topicId: 'disability-80',
    summary: '상해 후유장해 1억 (질병 후유장해 없음)',
    relatedCoverageNames: ['상해 후유장해(80%)'],
    gapFlagId: 'gap-disability-80',
  },
  'cov-injury-only': {
    topicId: 'injury-only',
    summary: 'KB 더블보장: 상해 위주 / 질병 수술비 100만, 입원일당 5만 (부족)',
    relatedCoverageNames: ['상해 수술비', '상해 입원일당', '상해 후유장해(80%)', '골절 진단비', '상해 사망', '질병 수술비', '질병 입원일당'],
    gapFlagId: 'gap-injury-only',
  },
  'cov-high-amount': {
    topicId: 'high-amount',
    summary: '담보 가입금액 적정 수준 (이상 없음)',
    relatedCoverageNames: ['사망보험금'],
    gapFlagId: 'gap-high-amount',
  },
  'cov-duplicate': {
    topicId: 'duplicate',
    summary: '질병 입원 담보 중복: 삼성(입원일당 5만) + 한화(실손 입원의료비)',
    relatedCoverageNames: ['질병 입원일당', '질병 입원의료비'],
    gapFlagId: 'gap-duplicate',
  },
  'cov-essential-missing': {
    topicId: 'essential-missing',
    summary: '유사암·경계성종양·제자리암 진단비 없음 / 뇌혈관질환 범위 협소 / 질병 후유장해 없음',
    relatedCoverageNames: ['일반암 진단비', '뇌출혈 진단비', '급성심근경색 진단비'],
    gapFlagId: 'gap-essential-missing',
  },
  'cov-renewal': {
    topicId: 'renewal',
    summary: '갱신형 2건: KB 더블보장(월 12만) + 한화 실손(월 5만)',
    relatedCoverageNames: ['상해 수술비', '상해 입원일당', '상해 후유장해(80%)', '골절 진단비', '상해 사망', '질병 입원의료비', '질병 통원의료비', '상해 입원의료비', '상해 통원의료비'],
    gapFlagId: 'gap-renewal',
  },
};

// 심평원 기반 스크립트 토픽 7개
export const HIRA_SCRIPT_TOPICS: ScriptTemplate[] = [
  {
    id: 'hira-hospitalization',
    topicId: 'hospitalization',
    source: 'hira',
    label: '1. 입원',
    defaultText: '고객님, 심평원 진료내역 확인 결과 입원 이력이 확인되었습니다.\n\n입원 기간과 진단명을 기준으로 보험금 청구 가능 여부를 안내드리겠습니다.\n\n▸ 입원일수: ___일\n▸ 진단명: ___\n▸ 청구 가능 담보: 입원일당, 수술비 (해당 시)',
    savedVersions: [
      { id: 'v1', label: '장기입원 케이스', text: '고객님, 14일 이상 장기입원 이력이 확인됩니다. 장기입원의 경우 입원일당뿐 아니라 실손의료비에서도 상당 금액 환급이 가능합니다.', savedAt: '2026-03-10' },
    ],
  },
  {
    id: 'hira-emergency',
    topicId: 'emergency',
    source: 'hira',
    label: '2. 응급',
    defaultText: '고객님, 응급실 이용 내역이 확인되었습니다.\n\n응급실 방문 시 발생한 비용 중 보험금 청구가 가능한 항목을 안내드리겠습니다.\n\n▸ 방문일: ___\n▸ 진단명: ___\n▸ 응급의료관리료 청구 가능 여부 확인',
    savedVersions: [],
  },
  {
    id: 'hira-chronic',
    topicId: 'chronic',
    source: 'hira',
    label: '3. 고혈압·고지혈증·당뇨·통풍',
    defaultText: '고객님, 만성질환 관련 진료내역이 확인되었습니다.\n\n만성질환은 보험 가입 시 고지의무와 관련이 있으며, 현재 보유 보험의 보장 범위를 확인해 드리겠습니다.\n\n▸ 해당 질환: ___\n▸ 최초 진단일: ___\n▸ 현재 복용 약물: ___\n\n※ 기존 계약의 면책/감액 해당 여부 확인 필요',
    savedVersions: [
      { id: 'v1', label: '당뇨 고지의무', text: '당뇨 진단 이력이 있으신 경우, 가입 당시 고지 여부가 중요합니다. 고지하셨다면 정상 보장되며, 미고지 시에도 2년 경과 후 보장 가능한 경우가 있습니다.', savedAt: '2026-03-08' },
    ],
  },
  {
    id: 'hira-same-disease',
    topicId: 'same-disease',
    source: 'hira',
    label: '4. 동일 상병 진료 횟수',
    defaultText: '고객님, 동일 상병으로 반복 진료를 받으신 내역이 확인됩니다.\n\n반복 진료 시 통원의료비 청구가 가능하며, 횟수에 따라 환급 금액이 달라질 수 있습니다.\n\n▸ 상병명: ___\n▸ 진료 횟수: ___회\n▸ 기간: ___ ~ ___',
    savedVersions: [],
  },
  {
    id: 'hira-polyp',
    topicId: 'polyp',
    source: 'hira',
    label: '5. 용종',
    defaultText: '고객님, 용종 관련 진료 내역이 확인되었습니다.\n\n용종 제거 시술은 수술비 청구 대상이 될 수 있으며, 조직검사 결과에 따라 추가 진단비 청구도 가능합니다.\n\n▸ 시술일: ___\n▸ 용종 위치: ___\n▸ 조직검사 결과: 양성 / 경계성 / 악성\n▸ 청구 가능 담보: 수술비, (경계성종양/제자리암 진단비)',
    savedVersions: [
      { id: 'v1', label: '대장 용종 기본', text: '대장내시경에서 용종이 발견되어 제거하셨습니다. 용종절제술은 대부분의 보험에서 수술비 청구 대상입니다. 조직검사 결과 선종(양성)인 경우에도 수술비는 지급됩니다.', savedAt: '2026-03-12' },
    ],
  },
  {
    id: 'hira-traffic',
    topicId: 'traffic',
    source: 'hira',
    label: '6. 교통사고 진료 내역',
    defaultText: '고객님, 교통사고 관련 진료내역이 확인되었습니다.\n\n교통사고의 경우 자동차보험 외에도 상해보험에서 추가 보험금 청구가 가능할 수 있습니다.\n\n▸ 사고일: ___\n▸ 진단명: ___\n▸ 치료기간: ___\n▸ 자동차보험 처리 여부: ___\n▸ 추가 청구 가능 담보: 골절진단비, 상해수술비, 상해입원일당',
    savedVersions: [],
  },
  {
    id: 'hira-orthopedic',
    topicId: 'orthopedic',
    source: 'hira',
    label: '7. 정형외과 진료내역',
    defaultText: '고객님, 정형외과 진료 내역이 확인되었습니다.\n\n정형외과 진료는 골절, 인대 손상, 수술 등 다양한 보험금 청구 사유에 해당할 수 있습니다.\n\n▸ 진료일: ___\n▸ 진단명: ___\n▸ 수술 여부: ___\n▸ 청구 가능 담보: 골절진단비, 상해수술비, 깁스치료비',
    savedVersions: [],
  },
];

// 보장분석 기반 스크립트 토픽 7개
export const COVERAGE_SCRIPT_TOPICS: ScriptTemplate[] = [
  {
    id: 'cov-cancer-brain-heart',
    topicId: 'cancer-brain-heart',
    source: 'coverage',
    label: '1. 암·뇌·심 치료비 없음',
    defaultText: '고객님, 현재 보유하신 보험에서 3대 질환(암·뇌·심장) 관련 보장을 확인해 보았습니다.\n\n현재 가입된 진단비 범위가 좁아 실제 발생 가능성이 높은 질환에 대한 보장이 부족합니다.\n\n▸ 현재 보장: ___\n▸ 부족한 부분: ___\n▸ 추천: 뇌혈관질환·허혈성심장질환 범위 진단비 추가',
    savedVersions: [
      { id: 'v1', label: '3대질환 미가입 케이스', text: '고객님, 현재 보유 보험에 암·뇌·심장 관련 진단비가 전혀 없습니다. 통계적으로 3명 중 1명이 암 진단을 받고, 뇌·심장질환은 사망원인 2,3위입니다. 최소한의 진단비 확보를 추천드립니다.', savedAt: '2026-03-05' },
    ],
  },
  {
    id: 'cov-disability-80',
    topicId: 'disability-80',
    source: 'coverage',
    label: '2. 80% 이상 후유장해',
    defaultText: '고객님, 후유장해 보장을 확인해 보았습니다.\n\n80% 이상 후유장해는 사실상 일상생활이 불가능한 상태로, 충분한 보장금액이 필요합니다.\n\n▸ 현재 보장: 상해 후유장해 ___만원\n▸ 질병 후유장해: 미가입\n▸ 추천: 질병 후유장해 담보 추가 (최소 1억)',
    savedVersions: [],
  },
  {
    id: 'cov-injury-only',
    topicId: 'injury-only',
    source: 'coverage',
    label: '3. 질병 아닌 상해 위주',
    defaultText: '고객님, 보장 구성을 분석해 보니 상해(사고) 위주로 구성되어 있습니다.\n\n실제 보험금 청구의 70% 이상은 질병 관련인데, 현재 질병 보장이 부족합니다.\n\n▸ 상해 보장: 수술비, 입원일당, 후유장해 등 충분\n▸ 질병 보장: 수술비 ___만원, 입원일당 ___만원 (부족)\n▸ 추천: 질병 수술비·입원일당 보강',
    savedVersions: [],
  },
  {
    id: 'cov-high-amount',
    topicId: 'high-amount',
    source: 'coverage',
    label: '4. 담보별 가입금액 과다',
    defaultText: '고객님, 일부 담보의 가입금액이 필요 이상으로 높게 설정되어 있습니다.\n\n과다 가입은 보험료 부담을 높이며, 적정 수준으로 조정 시 보험료 절감이 가능합니다.\n\n▸ 해당 담보: ___\n▸ 현재 가입금액: ___만원\n▸ 적정 수준: ___만원\n▸ 절감 가능 보험료: 월 ___만원',
    savedVersions: [],
  },
  {
    id: 'cov-duplicate',
    topicId: 'duplicate',
    source: 'coverage',
    label: '5. 중복 담보',
    defaultText: '고객님, 여러 보험에 동일한 담보가 중복 가입되어 있습니다.\n\n중복 담보는 보험금 청구 시 비례보상되어 실질적 혜택이 줄어들 수 있습니다.\n\n▸ 중복 담보: ___\n▸ 가입 보험사: ___, ___\n▸ 추천: 중복 정리 후 부족 담보 보강',
    savedVersions: [
      { id: 'v1', label: '실손 중복 케이스', text: '실손의료보험이 2건 이상 가입되어 있습니다. 실손보험은 실제 의료비만 보장하므로 중복 가입 시 비례보상됩니다. 1건만 유지하시고 절감된 보험료로 진단비를 보강하시는 것을 추천드립니다.', savedAt: '2026-03-07' },
    ],
  },
  {
    id: 'cov-essential-missing',
    topicId: 'essential-missing',
    source: 'coverage',
    label: '6. 필수담보 누락',
    defaultText: '고객님, 보장분석 결과 필수적으로 가입해야 할 담보가 누락되어 있습니다.\n\n필수담보는 발생 빈도와 치료비 규모를 고려했을 때 반드시 준비해야 하는 보장입니다.\n\n▸ 누락 담보:\n  - 유사암·경계성종양 진단비\n  - 뇌혈관질환 진단비\n  - 질병 후유장해\n▸ 추천 가입금액: 각 ___만원 이상',
    savedVersions: [],
  },
  {
    id: 'cov-renewal',
    topicId: 'renewal',
    source: 'coverage',
    label: '7. 갱신형',
    defaultText: '고객님, 현재 보유 보험 중 갱신형 계약이 확인되었습니다.\n\n갱신형은 초기 보험료가 저렴하지만, 갱신 시마다 보험료가 인상됩니다.\n\n▸ 갱신형 계약: ___건\n▸ 다음 갱신 예정일: ___\n▸ 예상 인상률: 약 ___~___%\n▸ 추천: 핵심 담보는 비갱신형으로 전환 검토',
    savedVersions: [
      { id: 'v1', label: '갱신형 보험료 인상', text: '현재 갱신형 보험은 3년/5년마다 보험료가 인상됩니다. 50대 이후에는 초기 대비 3~5배까지 인상될 수 있어, 지금 비갱신형으로 전환하시는 것이 장기적으로 유리합니다.', savedAt: '2026-03-09' },
    ],
  },
];

// 심평원 상병코드별 목 데이터
export const MOCK_HIRA_DISEASE_RECORDS: HiraDiseaseRecord[] = [
  {
    code: 'K25',
    name: '위궤양',
    visitCount: 8,
    lastVisitDate: '2025-11-20',
    scriptTemplate: '위궤양(K25) 진료 8회 확인. 내시경 검사 시 용종 발견 여부 확인 필요. 수술비·입원일당 청구 가능성 검토.',
  },
  {
    code: 'M54',
    name: '등통증(요통)',
    visitCount: 15,
    lastVisitDate: '2026-01-15',
    scriptTemplate: '등통증/요통(M54) 반복 진료 15회. 정형외과·재활의학과 통원비 청구 가능. MRI 촬영 시 실손 청구 대상.',
  },
  {
    code: 'J06',
    name: '급성 상기도감염',
    visitCount: 12,
    lastVisitDate: '2026-02-28',
    scriptTemplate: '급성 상기도감염(J06) 12회 진료. 일반적인 감기 진료로 통원의료비 청구 가능하나 금액이 소액.',
  },
  {
    code: 'S52',
    name: '아래팔 골절',
    visitCount: 3,
    lastVisitDate: '2025-09-10',
    scriptTemplate: '아래팔 골절(S52) 진료 3회. 골절진단비 + 깁스치료비 + 상해수술비(수술 시) 청구 가능. 교통사고 관련 시 자동차보험 외 추가 청구 검토.',
  },
  {
    code: 'I10',
    name: '본태성 고혈압',
    visitCount: 24,
    lastVisitDate: '2026-03-01',
    scriptTemplate: '고혈압(I10) 지속 관리 중. 보험 가입 시 고지의무 해당. 기존 계약 면책/감액 여부 확인. 합병증(뇌출혈, 심근경색) 발생 시 진단비 청구 가능.',
  },
];
