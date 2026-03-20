import { parseRegionLevels } from '@/app/issuance/regionUtils';
import type {
  IssuanceLocation,
  IssuanceLocationType,
  IssuanceRequestFlowStatus,
  IssuanceSource,
  IssuanceTask,
  IssuanceTaskStatus,
  IssuanceUser,
  OcrResult,
  RegionSelection,
  RequiredDocument,
  StaffAssignment,
  StaffAssignmentStatus,
} from '@/app/types/issuance';

const TODAY = '2026-03-11';
const SEOUL_MANAGER_ID = 'U-MGR-SEOUL';
const EXTERNAL_MANAGER_ID = 'U-MGR-02';

type ScopeKey = 'seoul' | 'outside_seoul';
type ScenarioBucket = 'in_progress' | 'manager_only' | 'unassigned' | 'completed';
type CompletionBucket = 'today' | 'this_week' | 'this_month' | 'older';

interface RegionArea {
  district: string;
  neighborhoods: string[];
}

interface SeoulCoverageGroup {
  id: string;
  staffId: string;
  staffName: string;
  phone: string;
  areas: RegionArea[];
  roads: string[];
  assignedRegions: RegionSelection[];
}

interface ExternalCoverageGroup {
  id: string;
  staffId: string;
  staffName: string;
  phone: string;
  metros: string[];
}

interface RegionSeed {
  metro: string;
  scope: ScopeKey;
  areas: RegionArea[];
  roads: string[];
}

interface LocationAssignmentSeed {
  staffId: string;
  staffName: string;
  staffPhone?: string;
  assignedByManagerId: string;
  assignedByManagerName: string;
  assignedAt: string;
  status: StaffAssignmentStatus;
  submissionDocsDownloaded: boolean;
  visitedAt?: string;
  completedAt?: string;
  requiredDocs: RequiredDocument[];
}

interface LocationMaterial {
  location: IssuanceLocation;
  assignment?: LocationAssignmentSeed;
}

interface BaseTaskSeed {
  id: string;
  claimId: string;
  customerId: string;
  customerName: string;
  customerSSN: string;
  customerPhone: string;
  customerAddress: string;
  createdAt: string;
  signatureDataUrl: string;
  locations: LocationMaterial[];
}

interface BuiltTaskBundle {
  tasks: IssuanceTask[];
  assignments: StaffAssignment[];
}

const TARGET_COUNTS = {
  total: 3000,
  seoul: {
    total: 1080,
    in_progress: 280,
    manager_only: 60,
    unassigned: 90,
    completed: 650,
  },
  outside_seoul: {
    total: 1920,
    in_progress: 470,
    manager_only: 30,
    unassigned: 70,
    completed: 1350,
  },
} as const;

const TARGET_PROGRESS_STATUS_COUNTS: Record<ScopeKey, Record<StaffAssignmentStatus, number>> = {
  seoul: {
    assigned: 52,
    docs_downloaded: 42,
    visited: 42,
    uploaded: 55,
    ocr_done: 45,
    confirmed: 44,
    in_progress: 0,
    completed: 0,
  },
  outside_seoul: {
    assigned: 88,
    docs_downloaded: 68,
    visited: 68,
    uploaded: 95,
    ocr_done: 75,
    confirmed: 76,
    in_progress: 0,
    completed: 0,
  },
};

const TARGET_COMPLETION_BUCKET_COUNTS: Record<ScopeKey, Record<CompletionBucket, number>> = {
  seoul: {
    today: 40,
    this_week: 120,
    this_month: 220,
    older: 270,
  },
  outside_seoul: {
    today: 80,
    this_week: 260,
    this_month: 480,
    older: 530,
  },
};

export const MOCK_OCR_RESULTS: Record<string, OcrResult> = {
  '진료비 영수증(일자별)': {
    hospitalName: '이사랑치과의원',
    patientName: '이영희',
    visitDate: '2024.10.17',
    totalAmount: 158000,
    confidence: 94,
    rawText: '진료비 영수증\n이사랑치과의원\n환자명: 이영희\n진료일: 2024.10.17\n총액: 158,000원',
  },
  '진료비 세부내역서(일자별)': {
    hospitalName: '이사랑치과의원',
    patientName: '이영희',
    visitDate: '2024.10.17',
    totalAmount: 158000,
    confidence: 88,
    rawText: '진료비 세부내역서\n이사랑치과의원\n환자명: 이영희\n진료일: 2024.10.17',
  },
  '진료확인서 (질병코드 포함)': {
    hospitalName: '이사랑치과의원',
    patientName: '이영희',
    visitDate: '2024.10.17',
    diagnosisCode: 'K04.0',
    confidence: 91,
    rawText: '진료확인서\n이사랑치과의원\n환자명: 이영희\n진단코드: K04.0 치수염',
  },
  수술확인서: {
    hospitalName: '강남세브란스병원',
    patientName: '김철수',
    visitDate: '2025.08.22',
    diagnosisCode: 'H25.0',
    confidence: 96,
    rawText: '수술확인서\n강남세브란스병원\n환자명: 김철수\n수술일: 2025.08.22\n백내장 수술',
  },
  입퇴원확인서: {
    hospitalName: '부산대병원',
    patientName: '정수빈',
    visitDate: '2025.11.01',
    confidence: 93,
    rawText: '입퇴원확인서\n부산대병원\n환자명: 정수빈\n입원: 2025.11.01\n퇴원: 2025.11.18',
  },
  '응급실 기록지': {
    hospitalName: '국립중앙의료원 (응급의학과)',
    patientName: '이영희',
    visitDate: '2023.01.30',
    confidence: 89,
    rawText: '응급실 기록지\n국립중앙의료원 응급의학과\n응급실 내원 기록',
  },
  '처방전(약제비) 영수증': {
    hospitalName: '강남온누리약국',
    patientName: '김철수',
    visitDate: '2025.08.22',
    confidence: 87,
    rawText: '약제비 영수증\n강남온누리약국\n환자명: 김철수',
  },
  처방조제내역서: {
    hospitalName: '강남온누리약국',
    patientName: '김철수',
    visitDate: '2025.08.22',
    confidence: 86,
    rawText: '처방조제내역서\n강남온누리약국\n환자명: 김철수',
  },
};

const SEOUL_COVERAGE_GROUPS: SeoulCoverageGroup[] = [
  {
    id: 'SEOUL-G01',
    staffId: 'U-STF-S-01',
    staffName: '김민수',
    phone: '010-2100-0001',
    areas: [
      { district: '강북구', neighborhoods: ['미아동', '수유동'] },
      { district: '성북구', neighborhoods: ['돈암동', '정릉동'] },
    ],
    roads: ['도봉로', '삼양로', '보문로', '종암로'],
    assignedRegions: [
      { level1: '서울', level2: '강북구' },
      { level1: '서울', level2: '성북구' },
    ],
  },
  {
    id: 'SEOUL-G02',
    staffId: 'U-STF-S-02',
    staffName: '이서연',
    phone: '010-2100-0002',
    areas: [
      { district: '강서구', neighborhoods: ['화곡동', '마곡동'] },
      { district: '양천구', neighborhoods: ['목동', '신정동'] },
    ],
    roads: ['강서로', '공항대로', '목동서로', '신월로'],
    assignedRegions: [
      { level1: '서울', level2: '강서구' },
      { level1: '서울', level2: '양천구' },
    ],
  },
  {
    id: 'SEOUL-G03',
    staffId: 'U-STF-S-03',
    staffName: '박준호',
    phone: '010-2100-0003',
    areas: [
      { district: '구로구', neighborhoods: ['구로동', '오류동'] },
      { district: '금천구', neighborhoods: ['가산동', '독산동'] },
    ],
    roads: ['디지털로', '경인로', '벚꽃로', '시흥대로'],
    assignedRegions: [
      { level1: '서울', level2: '구로구' },
      { level1: '서울', level2: '금천구' },
    ],
  },
  {
    id: 'SEOUL-G04',
    staffId: 'U-STF-S-04',
    staffName: '최하늘',
    phone: '010-2100-0004',
    areas: [
      { district: '도봉구', neighborhoods: ['창동', '방학동'] },
      { district: '노원구', neighborhoods: ['상계동', '공릉동'] },
    ],
    roads: ['노해로', '동일로', '도봉로', '한글비석로'],
    assignedRegions: [
      { level1: '서울', level2: '도봉구' },
      { level1: '서울', level2: '노원구' },
    ],
  },
  {
    id: 'SEOUL-G05',
    staffId: 'U-STF-S-05',
    staffName: '정유진',
    phone: '010-2100-0005',
    areas: [
      { district: '동대문구', neighborhoods: ['장안동', '답십리동'] },
      { district: '성동구', neighborhoods: ['성수동', '행당동'] },
    ],
    roads: ['천호대로', '왕산로', '성수이로', '고산자로'],
    assignedRegions: [
      { level1: '서울', level2: '동대문구' },
      { level1: '서울', level2: '성동구' },
    ],
  },
  {
    id: 'SEOUL-G06',
    staffId: 'U-STF-S-06',
    staffName: '조성민',
    phone: '010-2100-0006',
    areas: [
      { district: '동작구', neighborhoods: ['사당동', '노량진동'] },
      { district: '관악구', neighborhoods: ['봉천동', '신림동'] },
    ],
    roads: ['동작대로', '상도로', '남부순환로', '관악로'],
    assignedRegions: [
      { level1: '서울', level2: '동작구' },
      { level1: '서울', level2: '관악구' },
    ],
  },
  {
    id: 'SEOUL-G07',
    staffId: 'U-STF-S-07',
    staffName: '윤지호',
    phone: '010-2100-0007',
    areas: [
      { district: '마포구', neighborhoods: ['공덕동', '합정동'] },
      { district: '용산구', neighborhoods: ['한남동', '이태원동'] },
    ],
    roads: ['마포대로', '월드컵로', '한남대로', '이태원로'],
    assignedRegions: [
      { level1: '서울', level2: '마포구' },
      { level1: '서울', level2: '용산구' },
    ],
  },
  {
    id: 'SEOUL-G08',
    staffId: 'U-STF-S-08',
    staffName: '장예린',
    phone: '010-2100-0008',
    areas: [
      { district: '서대문구', neighborhoods: ['홍제동', '북가좌동'] },
      { district: '은평구', neighborhoods: ['응암동', '불광동'] },
    ],
    roads: ['통일로', '증가로', '은평로', '가좌로'],
    assignedRegions: [
      { level1: '서울', level2: '서대문구' },
      { level1: '서울', level2: '은평구' },
    ],
  },
  {
    id: 'SEOUL-G09',
    staffId: 'U-STF-S-09',
    staffName: '임도현',
    phone: '010-2100-0009',
    areas: [
      { district: '서초구', neighborhoods: ['서초동', '반포동'] },
      { district: '강남구', neighborhoods: ['역삼동', '대치동'] },
    ],
    roads: ['강남대로', '서초대로', '테헤란로', '논현로'],
    assignedRegions: [
      { level1: '서울', level2: '서초구' },
      { level1: '서울', level2: '강남구' },
    ],
  },
  {
    id: 'SEOUL-G10',
    staffId: 'U-STF-S-10',
    staffName: '한수아',
    phone: '010-2100-0010',
    areas: [
      { district: '송파구', neighborhoods: ['잠실동', '문정동'] },
      { district: '강동구', neighborhoods: ['천호동', '길동'] },
    ],
    roads: ['올림픽로', '송파대로', '천호대로', '양재대로'],
    assignedRegions: [
      { level1: '서울', level2: '송파구' },
      { level1: '서울', level2: '강동구' },
    ],
  },
  {
    id: 'SEOUL-G11',
    staffId: 'U-STF-S-11',
    staffName: '오현우',
    phone: '010-2100-0011',
    areas: [
      { district: '영등포구', neighborhoods: ['영등포동', '문래동', '당산동'] },
      { district: '영등포구', neighborhoods: ['여의도동'] },
    ],
    roads: ['영중로', '선유로', '여의대로', '국제금융로'],
    assignedRegions: [
      { level1: '서울', level2: '영등포구' },
      { level1: '서울', level2: '영등포구', level3: '여의도동' },
    ],
  },
  {
    id: 'SEOUL-G12',
    staffId: 'U-STF-S-12',
    staffName: '서지민',
    phone: '010-2100-0012',
    areas: [
      { district: '종로구', neighborhoods: ['종로1가', '익선동'] },
      { district: '중구', neighborhoods: ['신당동', '을지로'] },
    ],
    roads: ['종로', '삼일대로', '을지로', '퇴계로'],
    assignedRegions: [
      { level1: '서울', level2: '종로구' },
      { level1: '서울', level2: '중구' },
    ],
  },
  {
    id: 'SEOUL-G13',
    staffId: 'U-STF-S-13',
    staffName: '문가은',
    phone: '010-2100-0013',
    areas: [
      { district: '중랑구', neighborhoods: ['면목동', '묵동'] },
      { district: '광진구', neighborhoods: ['자양동', '구의동'] },
    ],
    roads: ['동일로', '용마산로', '아차산로', '능동로'],
    assignedRegions: [
      { level1: '서울', level2: '중랑구' },
      { level1: '서울', level2: '광진구' },
    ],
  },
];

const EXTERNAL_COVERAGE_GROUPS: ExternalCoverageGroup[] = [
  {
    id: 'EXT-SHARED',
    staffId: 'U-STF-EXT-01',
    staffName: '투에이치서비스 공유계정',
    phone: '010-2000-9999',
    metros: [
      '경기도',
      '인천광역시',
      '강원특별자치도',
      '부산광역시',
      '울산광역시',
      '경상남도',
      '대구광역시',
      '경상북도',
      '광주광역시',
      '전라남도',
      '대전광역시',
      '세종특별자치시',
      '충청남도',
      '충청북도',
      '전북특별자치도',
      '제주특별자치도',
    ],
  },
];

const NON_SEOUL_REGION_SEEDS: RegionSeed[] = [
  {
    metro: '경기도',
    scope: 'outside_seoul',
    areas: [
      { district: '수원시', neighborhoods: ['영통동', '권선동'] },
      { district: '성남시', neighborhoods: ['분당동', '야탑동'] },
      { district: '고양시', neighborhoods: ['일산동', '화정동'] },
      { district: '화성시', neighborhoods: ['동탄동', '병점동'] },
    ],
    roads: ['권선로', '판교로', '호수로', '동탄대로'],
  },
  {
    metro: '인천광역시',
    scope: 'outside_seoul',
    areas: [
      { district: '연수구', neighborhoods: ['송도동', '동춘동'] },
      { district: '남동구', neighborhoods: ['구월동', '만수동'] },
      { district: '부평구', neighborhoods: ['부평동', '산곡동'] },
      { district: '서구', neighborhoods: ['청라동', '가정동'] },
    ],
    roads: ['센트럴로', '예술로', '부평대로', '청라대로'],
  },
  {
    metro: '부산광역시',
    scope: 'outside_seoul',
    areas: [
      { district: '해운대구', neighborhoods: ['우동', '좌동'] },
      { district: '수영구', neighborhoods: ['광안동', '민락동'] },
      { district: '동래구', neighborhoods: ['사직동', '온천동'] },
      { district: '서구', neighborhoods: ['동대신동', '서대신동'] },
    ],
    roads: ['해운대로', '수영로', '아시아드대로', '구덕로'],
  },
  {
    metro: '대구광역시',
    scope: 'outside_seoul',
    areas: [
      { district: '수성구', neighborhoods: ['범어동', '만촌동'] },
      { district: '달서구', neighborhoods: ['상인동', '이곡동'] },
      { district: '중구', neighborhoods: ['동성로', '남산동'] },
      { district: '북구', neighborhoods: ['칠성동', '태전동'] },
    ],
    roads: ['동대구로', '월배로', '국채보상로', '침산로'],
  },
  {
    metro: '광주광역시',
    scope: 'outside_seoul',
    areas: [
      { district: '서구', neighborhoods: ['치평동', '금호동'] },
      { district: '북구', neighborhoods: ['용봉동', '문흥동'] },
      { district: '광산구', neighborhoods: ['수완동', '월곡동'] },
      { district: '동구', neighborhoods: ['충장로', '지산동'] },
    ],
    roads: ['상무대로', '하서로', '임방울대로', '충장로'],
  },
  {
    metro: '대전광역시',
    scope: 'outside_seoul',
    areas: [
      { district: '서구', neighborhoods: ['둔산동', '탄방동'] },
      { district: '유성구', neighborhoods: ['봉명동', '지족동'] },
      { district: '중구', neighborhoods: ['은행동', '대흥동'] },
      { district: '동구', neighborhoods: ['가양동', '용전동'] },
    ],
    roads: ['대덕대로', '계룡로', '중앙로', '동서대로'],
  },
  {
    metro: '울산광역시',
    scope: 'outside_seoul',
    areas: [
      { district: '남구', neighborhoods: ['삼산동', '달동'] },
      { district: '중구', neighborhoods: ['성남동', '학성동'] },
      { district: '북구', neighborhoods: ['화봉동', '매곡동'] },
      { district: '동구', neighborhoods: ['전하동', '방어동'] },
    ],
    roads: ['삼산로', '번영로', '산업로', '방어진순환도로'],
  },
  {
    metro: '세종특별자치시',
    scope: 'outside_seoul',
    areas: [
      { district: '세종시', neighborhoods: ['어진동', '보람동'] },
      { district: '세종시', neighborhoods: ['다정동', '한솔동'] },
    ],
    roads: ['한누리대로', '절재로', '다정중앙로', '노을길'],
  },
  {
    metro: '강원특별자치도',
    scope: 'outside_seoul',
    areas: [
      { district: '춘천시', neighborhoods: ['퇴계동', '석사동'] },
      { district: '원주시', neighborhoods: ['무실동', '단계동'] },
      { district: '강릉시', neighborhoods: ['교동', '포남동'] },
      { district: '속초시', neighborhoods: ['조양동', '청호동'] },
    ],
    roads: ['안마산로', '능라동길', '강릉대로', '중앙로'],
  },
  {
    metro: '충청북도',
    scope: 'outside_seoul',
    areas: [
      { district: '청주시', neighborhoods: ['복대동', '가경동'] },
      { district: '충주시', neighborhoods: ['연수동', '호암동'] },
      { district: '제천시', neighborhoods: ['하소동', '장락동'] },
      { district: '진천군', neighborhoods: ['덕산읍', '진천읍'] },
    ],
    roads: ['사직대로', '중앙탑길', '내토로', '대하로'],
  },
  {
    metro: '충청남도',
    scope: 'outside_seoul',
    areas: [
      { district: '천안시', neighborhoods: ['불당동', '두정동'] },
      { district: '아산시', neighborhoods: ['탕정동', '배방읍'] },
      { district: '공주시', neighborhoods: ['신관동', '중동'] },
      { district: '서산시', neighborhoods: ['동문동', '예천동'] },
    ],
    roads: ['불당대로', '배방로', '백제문화로', '안견로'],
  },
  {
    metro: '전북특별자치도',
    scope: 'outside_seoul',
    areas: [
      { district: '전주시', neighborhoods: ['효자동', '중화산동'] },
      { district: '군산시', neighborhoods: ['수송동', '나운동'] },
      { district: '익산시', neighborhoods: ['영등동', '모현동'] },
      { district: '정읍시', neighborhoods: ['상동', '시기동'] },
    ],
    roads: ['백제대로', '월명로', '무왕로', '중앙로'],
  },
  {
    metro: '전라남도',
    scope: 'outside_seoul',
    areas: [
      { district: '목포시', neighborhoods: ['상동', '옥암동'] },
      { district: '순천시', neighborhoods: ['조례동', '연향동'] },
      { district: '여수시', neighborhoods: ['학동', '웅천동'] },
      { district: '나주시', neighborhoods: ['빛가람동', '송월동'] },
    ],
    roads: ['백년대로', '순광로', '시청로', '상야로'],
  },
  {
    metro: '경상북도',
    scope: 'outside_seoul',
    areas: [
      { district: '포항시', neighborhoods: ['양덕동', '대잠동'] },
      { district: '구미시', neighborhoods: ['송정동', '형곡동'] },
      { district: '경주시', neighborhoods: ['황성동', '용강동'] },
      { district: '안동시', neighborhoods: ['옥동', '정하동'] },
    ],
    roads: ['포스코대로', '송원동로', '용담로', '경북대로'],
  },
  {
    metro: '경상남도',
    scope: 'outside_seoul',
    areas: [
      { district: '창원시', neighborhoods: ['상남동', '반송동'] },
      { district: '김해시', neighborhoods: ['내동', '외동'] },
      { district: '진주시', neighborhoods: ['충무공동', '평거동'] },
      { district: '양산시', neighborhoods: ['물금읍', '중부동'] },
    ],
    roads: ['원이대로', '분성로', '에나로', '범구로'],
  },
  {
    metro: '제주특별자치도',
    scope: 'outside_seoul',
    areas: [
      { district: '제주시', neighborhoods: ['연동', '이도동'] },
      { district: '서귀포시', neighborhoods: ['중문동', '대정읍'] },
    ],
    roads: ['연북로', '일주서로', '중앙로', '천제연로'],
  },
];

const HOSPITAL_NAME_SEEDS = ['연세', '바른', '미래', '참좋은', '우리', '다온', '한빛', '늘푸른', '서울', '웰', '센트럴', '드림'];
const HOSPITAL_DEPARTMENTS = ['내과의원', '정형외과의원', '치과의원', '한의원', '신경외과의원', '마취통증의학과의원', '피부과의원'];
const PHARMACY_NAME_SEEDS = ['온누리약국', '행복약국', '바다약국', '중앙약국', '참약국', '우리약국', '열린약국', '메디약국'];
const CUSTOMER_LAST_NAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '문'];
const CUSTOMER_FIRST_NAMES = ['민서', '서준', '하준', '지우', '예린', '도현', '서현', '주원', '가은', '현우', '수빈', '은호', '민지', '태윤'];
const INSURERS = ['삼성화재', '메리츠화재', '현대해상', 'DB손해보험', 'KB손해보험', '롯데손해보험'];
const SEOUL_DISTRICT_TO_GROUP = new Map(SEOUL_COVERAGE_GROUPS.flatMap((group) => group.areas.map((area) => [area.district, group] as const)));

function pad(value: number, length = 2) {
  return String(value).padStart(length, '0');
}

function makeCustomerName(index: number) {
  const last = CUSTOMER_LAST_NAMES[index % CUSTOMER_LAST_NAMES.length];
  const first = CUSTOMER_FIRST_NAMES[index % CUSTOMER_FIRST_NAMES.length];
  return `${last}${first}`;
}

function makeCustomerPhone(index: number) {
  const mid = String(1000 + (index * 37) % 9000).padStart(4, '0');
  const tail = String(1000 + (index * 73) % 9000).padStart(4, '0');
  return `010-${mid}-${tail}`;
}

function makeMaskedSSN(index: number) {
  const year = String(70 + (index % 30)).padStart(2, '0');
  const month = String((index % 12) + 1).padStart(2, '0');
  const day = String((index % 27) + 1).padStart(2, '0');
  const gender = index % 2 === 0 ? '1' : '2';
  return `${year}${month}${day}-${gender}******`;
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function formatVisitDate(year: number, month: number, day: number) {
  return `${year}.${pad(month)}.${pad(day)}`;
}

function offsetDate(dateString: string, offsetDays: number) {
  const base = new Date(`${dateString}T00:00:00`);
  base.setDate(base.getDate() + offsetDays);
  return formatDate(base.getFullYear(), base.getMonth() + 1, base.getDate());
}

function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: number) {
  const random = createSeededRandom(seed);
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(random() * (index + 1));
    [result[index], result[nextIndex]] = [result[nextIndex], result[index]];
  }

  return result;
}

function repeat<T>(count: number, createValue: (index: number) => T) {
  return Array.from({ length: count }, (_, index) => createValue(index));
}

function createLocationCountPlan(totalLocations: number, seed: number) {
  const random = createSeededRandom(seed);
  const counts: number[] = [];
  let remaining = totalLocations;

  while (remaining > 0) {
    if (remaining <= 7) {
      counts.push(remaining);
      break;
    }

    const nextCount = 1 + Math.floor(random() * 7);
    counts.push(nextCount);
    remaining -= nextCount;
  }

  return counts;
}

function makeGenericOcrResult(docName: string, locationName: string, customerName: string, visitDate: string, confidence: number): OcrResult {
  return (
    MOCK_OCR_RESULTS[docName] ?? {
      hospitalName: locationName,
      patientName: customerName,
      visitDate,
      confidence,
      rawText: `${docName} OCR 결과`,
    }
  );
}

function cloneDocs(docs: RequiredDocument[]) {
  return docs.map((doc) => ({
    ...doc,
    ocrResult: doc.ocrResult ? { ...doc.ocrResult } : undefined,
  }));
}

function createHospitalDocs(docPrefix: string, variantIndex: number) {
  const docs: RequiredDocument[] = [
    { id: `${docPrefix}-1`, name: '진료비 영수증(일자별)', status: 'pending', expectedCount: 1, confirmedCount: 0 },
    { id: `${docPrefix}-2`, name: '진료비 세부내역서(일자별)', status: 'pending', expectedCount: 1, confirmedCount: 0 },
    {
      id: `${docPrefix}-3`,
      name: variantIndex % 3 === 0 ? '진료확인서 (질병코드 포함)' : '수술확인서',
      status: 'pending',
      expectedCount: 1,
      confirmedCount: 0,
    },
  ];

  if (variantIndex % 5 === 0) {
    docs.push({ id: `${docPrefix}-4`, name: '입퇴원확인서', status: 'pending', expectedCount: 1, confirmedCount: 0 });
  }

  if (variantIndex % 11 === 0) {
    docs.push({ id: `${docPrefix}-5`, name: '응급실 기록지', status: 'pending', expectedCount: 1, confirmedCount: 0 });
  }

  return docs.slice(0, Math.min(4, docs.length));
}

function createPharmacyDocs(docPrefix: string, variantIndex: number) {
  const docs: RequiredDocument[] = [
    { id: `${docPrefix}-1`, name: '처방전(약제비) 영수증', status: 'pending', expectedCount: 1, confirmedCount: 0 },
    { id: `${docPrefix}-2`, name: '처방조제내역서', status: 'pending', expectedCount: 1, confirmedCount: 0 },
  ];

  if (variantIndex % 7 === 0) {
    docs.push({ id: `${docPrefix}-3`, name: '약제비 계산서', status: 'pending', expectedCount: 1, confirmedCount: 0 });
  }

  return docs;
}

function createVisitPeriod(index: number) {
  const year = 2023 + (index % 3);
  const month = (index % 12) + 1;
  const day = (index % 27) + 1;

  if (index % 8 === 0) {
    const endDay = Math.min(day + 6, 28);
    return `${formatVisitDate(year, month, day)} ~ ${formatVisitDate(year, month, endDay)}`;
  }

  return formatVisitDate(year, month, day);
}

function createDisplayLocationName(type: IssuanceLocationType, district: string, index: number) {
  const districtLabel = district.replace(/시$|군$|구$/g, '');
  if (type === 'pharmacy') {
    return `${districtLabel}${PHARMACY_NAME_SEEDS[index % PHARMACY_NAME_SEEDS.length]}`;
  }

  return `${HOSPITAL_NAME_SEEDS[index % HOSPITAL_NAME_SEEDS.length]}${districtLabel}${HOSPITAL_DEPARTMENTS[index % HOSPITAL_DEPARTMENTS.length]}`;
}

function makeLocationStatus(assignmentStatus: StaffAssignmentStatus | undefined, docs: RequiredDocument[], hasManager: boolean): IssuanceTaskStatus {
  if (docs.length > 0 && docs.every((doc) => doc.status === 'confirmed')) {
    return 'completed';
  }

  if (!assignmentStatus) {
    return hasManager ? 'assigned' : 'unassigned';
  }

  if (assignmentStatus === 'uploaded' || assignmentStatus === 'ocr_done' || assignmentStatus === 'confirmed') {
    return 'partial';
  }

  if (assignmentStatus === 'docs_downloaded' || assignmentStatus === 'visited' || assignmentStatus === 'in_progress') {
    return 'in_progress';
  }

  return 'assigned';
}

function makeTaskStatus(locations: IssuanceLocation[]) {
  const statuses = locations.map((location) => location.status);
  if (statuses.length > 0 && statuses.every((status) => status === 'completed')) {
    return 'completed';
  }
  if (statuses.some((status) => status === 'partial')) {
    return 'partial';
  }
  if (statuses.some((status) => status === 'in_progress')) {
    return 'in_progress';
  }
  if (statuses.some((status) => status === 'assigned')) {
    return 'assigned';
  }
  return 'unassigned';
}

function createLifecycleDocs(
  baseDocs: RequiredDocument[],
  lifecycle: StaffAssignmentStatus | 'manager_only' | 'unassigned',
  locationName: string,
  customerName: string,
  visitPeriod: string,
  referenceDate: string,
  index: number
) {
  return baseDocs.map((doc, docIndex) => {
    if (lifecycle === 'unassigned' || lifecycle === 'manager_only' || lifecycle === 'assigned' || lifecycle === 'docs_downloaded') {
      return { ...doc };
    }

    if (lifecycle === 'visited') {
      return { ...doc };
    }

    if (lifecycle === 'uploaded') {
      if (docIndex === 0 || docIndex < Math.ceil(baseDocs.length / 2)) {
        return {
          ...doc,
          status: 'uploaded',
          uploadedFile: `${locationName}_${docIndex + 1}.pdf`,
          uploadedAt: referenceDate,
        };
      }
      return { ...doc };
    }

    if (lifecycle === 'ocr_done') {
      if (docIndex === 0) {
        return {
          ...doc,
          status: 'ocr_done',
          uploadedFile: `${locationName}_${docIndex + 1}.pdf`,
          uploadedAt: referenceDate,
          ocrResult: makeGenericOcrResult(doc.name, locationName, customerName, visitPeriod, 84 + (index % 10)),
        };
      }

      if (docIndex < Math.ceil(baseDocs.length / 2)) {
        return {
          ...doc,
          status: 'uploaded',
          uploadedFile: `${locationName}_${docIndex + 1}.pdf`,
          uploadedAt: referenceDate,
        };
      }

      return { ...doc };
    }

    if (lifecycle === 'confirmed') {
      return {
        ...doc,
        status: docIndex === baseDocs.length - 1 ? 'uploaded' : 'confirmed',
        confirmedCount: docIndex === baseDocs.length - 1 ? 0 : doc.expectedCount ?? 1,
        uploadedFile: `${locationName}_${docIndex + 1}.pdf`,
        uploadedAt: referenceDate,
        confirmedAt: docIndex === baseDocs.length - 1 ? undefined : referenceDate,
        ocrResult:
          docIndex === baseDocs.length - 1
            ? undefined
            : makeGenericOcrResult(doc.name, locationName, customerName, visitPeriod, 90 + (index % 8)),
      };
    }

    if (lifecycle === 'completed') {
      return {
        ...doc,
        status: 'confirmed',
        confirmedCount: doc.expectedCount ?? 1,
        uploadedFile: `${locationName}_${docIndex + 1}.pdf`,
        uploadedAt: referenceDate,
        confirmedAt: referenceDate,
        ocrResult: makeGenericOcrResult(doc.name, locationName, customerName, visitPeriod, 92 + (index % 6)),
      };
    }

    return { ...doc };
  });
}

function createInternalUsers() {
  return SEOUL_COVERAGE_GROUPS.map<IssuanceUser>((group) => ({
    id: group.staffId,
    name: group.staffName,
    role: 'staff',
    managerId: SEOUL_MANAGER_ID,
    phone: group.phone,
    assignedRegions: group.assignedRegions,
  }));
}

function createExternalUsers() {
  return EXTERNAL_COVERAGE_GROUPS.map<IssuanceUser>((group) => ({
    id: group.staffId,
    name: group.staffName,
    role: 'staff',
    managerId: EXTERNAL_MANAGER_ID,
    phone: group.phone,
    assignedRegions: buildExternalAssignedRegions(group.metros),
  }));
}

function buildExternalAssignedRegions(metros: string[]) {
  return NON_SEOUL_REGION_SEEDS
    .filter((seed) => metros.includes(seed.metro))
    .flatMap((seed) =>
      seed.areas.map<RegionSelection>((area) => ({
        level1: parseRegionLevels(seed.metro).regionLevel1,
        level2: area.district,
      }))
    );
}

export const ISSUANCE_USERS: IssuanceUser[] = [
  { id: 'U-MASTER', name: '최성현', role: 'master', phone: '010-0000-0001' },
  { id: SEOUL_MANAGER_ID, name: '최성현', role: 'manager', company: '더바다', phone: '010-1000-0099' },
  { id: EXTERNAL_MANAGER_ID, name: '박관리', role: 'manager', company: '투에이치서비스', phone: '010-1000-0002' },
  ...createInternalUsers(),
  ...createExternalUsers(),
];

const usersById = Object.fromEntries(ISSUANCE_USERS.map((user) => [user.id, user] as const));

function buildLocationMaterial(options: {
  id: string;
  source: IssuanceSource;
  type: IssuanceLocationType;
  name: string;
  address: string;
  visitPeriod: string;
  insurer: string;
  requestStatus: IssuanceRequestFlowStatus;
  assignmentStatus?: StaffAssignmentStatus;
  completedAt?: string;
  assignedManagerId?: string;
  assignedManagerName?: string;
  assignedManagerAt?: string;
  assignedStaffId?: string;
  customerName: string;
  docIndexSeed: number;
}) {
  const { regionLevel1, regionLevel2, regionLevel3 } = parseRegionLevels(options.address);
  const baseDocs = options.type === 'pharmacy' ? createPharmacyDocs(`DOC-${options.id}`, options.docIndexSeed) : createHospitalDocs(`DOC-${options.id}`, options.docIndexSeed);
  const lifecycle =
    options.assignmentStatus === 'completed'
      ? 'completed'
      : options.assignmentStatus ?? (options.assignedManagerId ? 'manager_only' : 'unassigned');
  const referenceDate = options.completedAt ?? options.assignedManagerAt ?? TODAY;
  const requiredDocs = createLifecycleDocs(
    baseDocs,
    lifecycle,
    options.name,
    options.customerName,
    options.visitPeriod,
    referenceDate,
    options.docIndexSeed
  );
  const locationStatus = makeLocationStatus(options.assignmentStatus, requiredDocs, Boolean(options.assignedManagerId));
  const location: IssuanceLocation = {
    id: options.id,
    source: options.source,
    type: options.type,
    name: options.name,
    address: options.address,
    regionLevel1,
    regionLevel2,
    regionLevel3,
    visitPeriod: options.visitPeriod,
    insurer: options.insurer,
    requestStatus: options.requestStatus,
    requiredDocs,
    status: locationStatus,
    assignedManagerId: options.assignedManagerId,
    assignedManagerName: options.assignedManagerName,
    assignedManagerAt: options.assignedManagerAt,
  };

  if (!options.assignmentStatus || !options.assignedStaffId) {
    return { location };
  }

  const staff = usersById[options.assignedStaffId];
  const manager = options.assignedManagerId ? usersById[options.assignedManagerId] : undefined;
  const assignedAt = options.completedAt
    ? offsetDate(options.completedAt, -2 - (options.docIndexSeed % 3))
    : options.assignedManagerAt ?? TODAY;
  const visitedAt =
    options.assignmentStatus === 'visited' ||
    options.assignmentStatus === 'uploaded' ||
    options.assignmentStatus === 'ocr_done' ||
    options.assignmentStatus === 'confirmed' ||
    options.assignmentStatus === 'completed'
      ? options.completedAt
        ? offsetDate(options.completedAt, -1)
        : TODAY
      : undefined;

  return {
    location,
    assignment: {
      staffId: staff?.id ?? options.assignedStaffId,
      staffName: staff?.name ?? '미지정',
      staffPhone: staff?.phone,
      assignedByManagerId: options.assignedManagerId ?? '',
      assignedByManagerName: manager?.name ?? options.assignedManagerName ?? '',
      assignedAt,
      status: options.assignmentStatus,
      submissionDocsDownloaded:
        options.assignmentStatus === 'docs_downloaded' ||
        options.assignmentStatus === 'visited' ||
        options.assignmentStatus === 'uploaded' ||
        options.assignmentStatus === 'ocr_done' ||
        options.assignmentStatus === 'confirmed' ||
        options.assignmentStatus === 'completed',
      visitedAt,
      completedAt: options.assignmentStatus === 'completed' ? options.completedAt : undefined,
      requiredDocs: cloneDocs(requiredDocs),
    },
  };
}

const BASE_TASK_SEEDS: BaseTaskSeed[] = [
  {
    id: 'IT-2026-001',
    claimId: 'R-2026-001',
    customerId: 'C-1024',
    customerName: '이영희',
    customerSSN: '880101-2******',
    customerPhone: '010-9876-5432',
    customerAddress: '서울특별시 중구 청구로 70',
    createdAt: '2026-03-04',
    signatureDataUrl: 'data:image/png;base64,MOCK_SIGNATURE_1',
    locations: [
      buildLocationMaterial({
        id: 'LOC-001',
        source: 'auto',
        type: 'hospital',
        name: '이사랑치과의원',
        address: '서울특별시 중구 청구로 70 신진빌딩 2층',
        visitPeriod: '2024.10.17',
        insurer: '메리츠화재',
        requestStatus: '요청전송완료',
        assignmentStatus: 'uploaded',
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-05',
        assignedStaffId: 'U-STF-S-12',
        customerName: '이영희',
        docIndexSeed: 1,
      }),
      buildLocationMaterial({
        id: 'LOC-002',
        source: 'auto',
        type: 'hospital',
        name: '신당청구역마취통증의학과의원',
        address: '서울특별시 중구 다산로 185 신흥빌딩 3층 302호',
        visitPeriod: '2024.10.02',
        insurer: '메리츠화재',
        requestStatus: '요청전송완료',
        assignmentStatus: 'assigned',
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-05',
        assignedStaffId: 'U-STF-S-12',
        customerName: '이영희',
        docIndexSeed: 2,
      }),
      buildLocationMaterial({
        id: 'LOC-003',
        source: 'auto',
        type: 'hospital',
        name: '더드림산부인과의원',
        address: '서울특별시 중구 다산로36길 11',
        visitPeriod: '2024.06.14',
        insurer: '메리츠화재',
        requestStatus: '요청전송완료',
        assignmentStatus: 'docs_downloaded',
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-06',
        assignedStaffId: 'U-STF-S-12',
        customerName: '이영희',
        docIndexSeed: 3,
      }),
      buildLocationMaterial({
        id: 'LOC-004',
        source: 'manual',
        type: 'hospital',
        name: '국립중앙의료원 (응급의학과)',
        address: '서울특별시 중구 을지로 245 국립중앙의료원',
        visitPeriod: '2023.01.30',
        insurer: '메리츠화재',
        requestStatus: '요청전송완료',
        assignmentStatus: 'completed',
        completedAt: '2026-03-06',
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-04',
        assignedStaffId: 'U-STF-S-12',
        customerName: '이영희',
        docIndexSeed: 4,
      }),
    ],
  },
  {
    id: 'IT-2026-002',
    claimId: 'R-2026-002',
    customerId: 'C-1025',
    customerName: '김철수',
    customerSSN: '900505-1******',
    customerPhone: '010-1234-5678',
    customerAddress: '서울특별시 강남구 언주로 211',
    createdAt: '2026-03-05',
    signatureDataUrl: 'data:image/png;base64,MOCK_SIGNATURE_2',
    locations: [
      buildLocationMaterial({
        id: 'LOC-005',
        source: 'auto',
        type: 'hospital',
        name: '강남세브란스병원',
        address: '서울특별시 강남구 언주로 211',
        visitPeriod: '2025.08.22',
        insurer: '삼성화재',
        requestStatus: '요청전송완료',
        assignmentStatus: 'uploaded',
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-06',
        assignedStaffId: 'U-STF-S-09',
        customerName: '김철수',
        docIndexSeed: 5,
      }),
      buildLocationMaterial({
        id: 'LOC-006',
        source: 'auto',
        type: 'pharmacy',
        name: '강남온누리약국',
        address: '서울특별시 강남구 언주로 213',
        visitPeriod: '2025.08.22 ~ 2025.09.10',
        insurer: '삼성화재',
        requestStatus: '요청전송완료',
        assignmentStatus: 'completed',
        completedAt: TODAY,
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-06',
        assignedStaffId: 'U-STF-S-09',
        customerName: '김철수',
        docIndexSeed: 6,
      }),
    ],
  },
  {
    id: 'IT-2026-003',
    claimId: 'R-2026-004',
    customerId: 'C-1026',
    customerName: '최지우',
    customerSSN: '810225-2******',
    customerPhone: '010-6654-2211',
    customerAddress: '서울특별시 송파구 올림픽로 300',
    createdAt: '2026-03-07',
    signatureDataUrl: 'data:image/png;base64,MOCK_SIGNATURE_3',
    locations: [
      buildLocationMaterial({
        id: 'LOC-007',
        source: 'auto',
        type: 'hospital',
        name: '서울아산병원',
        address: '서울특별시 송파구 올림픽로43길 88',
        visitPeriod: '2020.05.10',
        insurer: '현대해상',
        requestStatus: '요청전송완료',
        assignmentStatus: 'completed',
        completedAt: '2026-03-10',
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-08',
        assignedStaffId: 'U-STF-S-10',
        customerName: '최지우',
        docIndexSeed: 7,
      }),
      buildLocationMaterial({
        id: 'LOC-008',
        source: 'auto',
        type: 'hospital',
        name: '송파내과',
        address: '서울특별시 송파구 올림픽로 350',
        visitPeriod: '2020.08.15 ~ 현재',
        insurer: '현대해상',
        requestStatus: '요청전송완료',
        assignmentStatus: 'visited',
        assignedManagerId: SEOUL_MANAGER_ID,
        assignedManagerName: '최성현',
        assignedManagerAt: '2026-03-08',
        assignedStaffId: 'U-STF-S-10',
        customerName: '최지우',
        docIndexSeed: 8,
      }),
    ],
  },
  {
    id: 'IT-2026-004',
    claimId: 'R-2026-005',
    customerId: 'C-1027',
    customerName: '정수빈',
    customerSSN: '960822-2******',
    customerPhone: '010-7123-9090',
    customerAddress: '부산광역시 서구 구덕로 179',
    createdAt: '2026-03-08',
    signatureDataUrl: 'data:image/png;base64,MOCK_SIGNATURE_4',
    locations: [
      buildLocationMaterial({
        id: 'LOC-009',
        source: 'auto',
        type: 'hospital',
        name: '부산대병원',
        address: '부산광역시 서구 구덕로 179',
        visitPeriod: '2025.11.01',
        insurer: 'DB손해보험',
        requestStatus: '요청전송완료',
        assignmentStatus: 'confirmed',
        assignedManagerId: EXTERNAL_MANAGER_ID,
        assignedManagerName: '박관리',
        assignedManagerAt: '2026-03-09',
        assignedStaffId: 'U-STF-03',
        customerName: '정수빈',
        docIndexSeed: 9,
      }),
    ],
  },
];

function buildTasksFromSeeds(taskSeeds: BaseTaskSeed[]): BuiltTaskBundle {
  const tasks: IssuanceTask[] = taskSeeds.map((taskSeed) => {
    const status = makeTaskStatus(taskSeed.locations.map((item) => item.location));
    const allCompleted = taskSeed.locations.every((item) => item.location.status === 'completed');
    const assignedManagers = taskSeed.locations.map((item) => item.location.assignedManagerId).filter(Boolean);

    return {
      id: taskSeed.id,
      claimId: taskSeed.claimId,
      customerId: taskSeed.customerId,
      customerName: taskSeed.customerName,
      customerSSN: taskSeed.customerSSN,
      customerPhone: taskSeed.customerPhone,
      customerAddress: taskSeed.customerAddress,
      signatureDataUrl: taskSeed.signatureDataUrl,
      createdAt: taskSeed.createdAt,
      completedAt: allCompleted ? taskSeed.locations.flatMap((item) => (item.assignment?.completedAt ? [item.assignment.completedAt] : [])).sort().at(-1) : undefined,
      assignedManagerId: assignedManagers[0],
      assignedManagerName: assignedManagers[0] ? usersById[assignedManagers[0]]?.name : undefined,
      assignedAt: taskSeed.locations.flatMap((item) => (item.location.assignedManagerAt ? [item.location.assignedManagerAt] : [])).sort().at(0),
      status,
      locations: taskSeed.locations.map((item) => item.location),
    };
  });

  const assignments: StaffAssignment[] = taskSeeds.flatMap((taskSeed) =>
    taskSeed.locations.flatMap((item) =>
      item.assignment
        ? [
            {
              id: `SA-${item.location.id}`,
              taskId: taskSeed.id,
              locationId: item.location.id,
              customerId: taskSeed.customerId,
              customerName: taskSeed.customerName,
              locationName: item.location.name,
              locationAddress: item.location.address,
              regionLevel1: item.location.regionLevel1,
              regionLevel2: item.location.regionLevel2,
              regionLevel3: item.location.regionLevel3,
              locationType: item.location.type,
              visitPeriod: item.location.visitPeriod,
              staffId: item.assignment.staffId,
              staffName: item.assignment.staffName,
              staffPhone: item.assignment.staffPhone,
              assignedByManagerId: item.assignment.assignedByManagerId,
              assignedByManagerName: item.assignment.assignedByManagerName,
              assignedAt: item.assignment.assignedAt,
              status: item.assignment.status,
              submissionDocsDownloaded: item.assignment.submissionDocsDownloaded,
              visitedAt: item.assignment.visitedAt,
              completedAt: item.assignment.completedAt,
              requiredDocs: cloneDocs(item.assignment.requiredDocs),
            },
          ]
        : []
    )
  );

  return { tasks, assignments };
}

const baseBundle = buildTasksFromSeeds(BASE_TASK_SEEDS);

function flattenBaseLocationMaterials(taskSeeds: BaseTaskSeed[]) {
  return taskSeeds.flatMap((task) =>
    task.locations.map((material) => {
      const scope: ScopeKey = material.location.regionLevel1 === '서울' ? 'seoul' : 'outside_seoul';
      const bucket: ScenarioBucket =
        material.assignment?.status === 'completed'
          ? 'completed'
          : material.assignment
            ? 'in_progress'
            : material.location.assignedManagerId
              ? 'manager_only'
              : 'unassigned';

      const completionBucket =
        material.assignment?.status === 'completed' && material.assignment.completedAt
          ? getCompletionBucket(material.assignment.completedAt)
          : undefined;

      return {
        scope,
        bucket,
        assignmentStatus: material.assignment?.status,
        completionBucket,
      };
    })
  );
}

function getCompletionBucket(date: string): CompletionBucket {
  if (date === TODAY) {
    return 'today';
  }

  if (['2026-03-09', '2026-03-10'].includes(date)) {
    return 'this_week';
  }

  if (date.startsWith('2026-03-')) {
    return 'this_month';
  }

  return 'older';
}

const baseLocationMeta = flattenBaseLocationMaterials(BASE_TASK_SEEDS);

function subtractCounts<T extends string>(target: Record<T, number>, usedEntries: T[]) {
  const remaining = { ...target };
  usedEntries.forEach((entry) => {
    remaining[entry] -= 1;
  });
  return remaining;
}

function buildRemainingScenarioCounts() {
  const usedBucketsByScope: Record<ScopeKey, ScenarioBucket[]> = { seoul: [], outside_seoul: [] };
  const usedProgressStatusesByScope: Record<ScopeKey, StaffAssignmentStatus[]> = { seoul: [], outside_seoul: [] };
  const usedCompletionBucketsByScope: Record<ScopeKey, CompletionBucket[]> = { seoul: [], outside_seoul: [] };

  baseLocationMeta.forEach((item) => {
    usedBucketsByScope[item.scope].push(item.bucket);
    if (item.assignmentStatus && item.assignmentStatus !== 'completed') {
      usedProgressStatusesByScope[item.scope].push(item.assignmentStatus);
    }
    if (item.completionBucket) {
      usedCompletionBucketsByScope[item.scope].push(item.completionBucket);
    }
  });

  return {
    scenarioCounts: {
      seoul: subtractCounts(TARGET_COUNTS.seoul, usedBucketsByScope.seoul),
      outside_seoul: subtractCounts(TARGET_COUNTS.outside_seoul, usedBucketsByScope.outside_seoul),
    },
    progressCounts: {
      seoul: subtractCounts(TARGET_PROGRESS_STATUS_COUNTS.seoul, usedProgressStatusesByScope.seoul),
      outside_seoul: subtractCounts(TARGET_PROGRESS_STATUS_COUNTS.outside_seoul, usedProgressStatusesByScope.outside_seoul),
    },
    completionCounts: {
      seoul: subtractCounts(TARGET_COMPLETION_BUCKET_COUNTS.seoul, usedCompletionBucketsByScope.seoul),
      outside_seoul: subtractCounts(TARGET_COMPLETION_BUCKET_COUNTS.outside_seoul, usedCompletionBucketsByScope.outside_seoul),
    },
  };
}

const remainingCounts = buildRemainingScenarioCounts();

function createScenarioList(scope: ScopeKey, counts: Record<ScenarioBucket, number>, seed: number) {
  return seededShuffle(
    [
      ...repeat(counts.in_progress, () => ({ scope, bucket: 'in_progress' as const })),
      ...repeat(counts.manager_only, () => ({ scope, bucket: 'manager_only' as const })),
      ...repeat(counts.unassigned, () => ({ scope, bucket: 'unassigned' as const })),
      ...repeat(counts.completed, () => ({ scope, bucket: 'completed' as const })),
    ],
    seed
  );
}

function createProgressStatusList(counts: Record<StaffAssignmentStatus, number>, seed: number) {
  return seededShuffle(
    [
      ...repeat(counts.assigned, () => 'assigned' as const),
      ...repeat(counts.docs_downloaded, () => 'docs_downloaded' as const),
      ...repeat(counts.visited, () => 'visited' as const),
      ...repeat(counts.uploaded, () => 'uploaded' as const),
      ...repeat(counts.ocr_done, () => 'ocr_done' as const),
      ...repeat(counts.confirmed, () => 'confirmed' as const),
    ],
    seed
  );
}

function createCompletionDateList(counts: Record<CompletionBucket, number>, seed: number) {
  const dates = [
    ...repeat(counts.today, () => TODAY),
    ...repeat(counts.this_week, (index) => (index % 2 === 0 ? '2026-03-10' : '2026-03-09')),
    ...repeat(counts.this_month, (index) => formatDate(2026, 3, 1 + (index % 8))),
    ...repeat(counts.older, (index) => formatDate(2026, 2, 1 + (index % 28))),
  ];

  return seededShuffle(dates, seed);
}

function pickSeoulCoverageGroup(index: number) {
  return SEOUL_COVERAGE_GROUPS[index % SEOUL_COVERAGE_GROUPS.length];
}

function pickSeoulArea(group: SeoulCoverageGroup, index: number) {
  const area = group.areas[index % group.areas.length];
  const neighborhood = area.neighborhoods[index % area.neighborhoods.length];
  const road = group.roads[index % group.roads.length];
  return {
    metro: '서울특별시',
    district: area.district,
    neighborhood,
    road,
    managerId: SEOUL_MANAGER_ID,
    managerName: '최성현',
    staffId: group.staffId,
    staffName: group.staffName,
    staffPhone: group.phone,
  };
}

function pickExternalRegion(index: number) {
  const regionSeed = NON_SEOUL_REGION_SEEDS[index % NON_SEOUL_REGION_SEEDS.length];
  const area = regionSeed.areas[index % regionSeed.areas.length];
  const neighborhood = area.neighborhoods[index % area.neighborhoods.length];
  const road = regionSeed.roads[index % regionSeed.roads.length];
  const eligibleGroups = EXTERNAL_COVERAGE_GROUPS.filter((group) => group.metros.includes(regionSeed.metro));
  const selectedGroup = eligibleGroups[index % eligibleGroups.length] ?? EXTERNAL_COVERAGE_GROUPS[index % EXTERNAL_COVERAGE_GROUPS.length];
  const staff = usersById[selectedGroup.staffId];
  return {
    metro: regionSeed.metro,
    district: area.district,
    neighborhood,
    road,
    managerId: EXTERNAL_MANAGER_ID,
    managerName: '박관리',
    staffId: selectedGroup.staffId,
    staffName: staff?.name ?? selectedGroup.staffName,
    staffPhone: staff?.phone ?? selectedGroup.phone,
  };
}

function buildGeneratedLocationMaterials(scope: ScopeKey, countSeed: number, locationIdStart: number) {
  const scenarioList = createScenarioList(scope, remainingCounts.scenarioCounts[scope], countSeed);
  const progressStatusList = createProgressStatusList(remainingCounts.progressCounts[scope], countSeed + 11);
  const completionDates = createCompletionDateList(remainingCounts.completionCounts[scope], countSeed + 29);
  let progressCursor = 0;
  let completionCursor = 0;

  return scenarioList.map((scenario, index) => {
    const absoluteIndex = locationIdStart + index;
    const regionInfo =
      scope === 'seoul'
        ? pickSeoulArea(pickSeoulCoverageGroup(index), absoluteIndex)
        : pickExternalRegion(absoluteIndex);
    const type: IssuanceLocationType = absoluteIndex % 5 === 0 ? 'pharmacy' : 'hospital';
    const buildingNumber = 11 + (absoluteIndex % 190);
    const floor = (absoluteIndex % 8) + 1;
    const address = `${regionInfo.metro} ${regionInfo.district} ${regionInfo.neighborhood} ${regionInfo.road} ${buildingNumber} ${floor}층`;
    const assignmentStatus =
      scenario.bucket === 'in_progress'
        ? progressStatusList[progressCursor++]
        : scenario.bucket === 'completed'
          ? 'completed'
          : undefined;
    const completedAt = scenario.bucket === 'completed' ? completionDates[completionCursor++] : undefined;
    const assignedManagerId = scenario.bucket === 'unassigned' ? undefined : regionInfo.managerId;
    const assignedManagerName = scenario.bucket === 'unassigned' ? undefined : regionInfo.managerName;
    const assignedManagerAt =
      scenario.bucket === 'unassigned'
        ? undefined
        : completedAt
          ? offsetDate(completedAt, -3)
          : `2026-03-${pad((absoluteIndex % 9) + 1)}`;
    const assignedStaffId = scenario.bucket === 'in_progress' || scenario.bucket === 'completed' ? regionInfo.staffId : undefined;
    const source: IssuanceSource = absoluteIndex % 19 === 0 ? 'manual' : 'auto';
    const requestStatus: IssuanceRequestFlowStatus =
      scenario.bucket === 'unassigned'
        ? absoluteIndex % 6 === 0
          ? '확정대기'
          : absoluteIndex % 3 === 0
            ? '전송대기'
            : '요청전송완료'
        : scenario.bucket === 'manager_only' && absoluteIndex % 9 === 0
          ? '전송대기'
          : '요청전송완료';

    return buildLocationMaterial({
      id: `LOC-DUMMY-${pad(absoluteIndex + 1, 5)}`,
      source,
      type,
      name: createDisplayLocationName(type, regionInfo.district, absoluteIndex),
      address,
      visitPeriod: createVisitPeriod(absoluteIndex),
      insurer: INSURERS[absoluteIndex % INSURERS.length],
      requestStatus,
      assignmentStatus,
      completedAt,
      assignedManagerId,
      assignedManagerName,
      assignedManagerAt,
      assignedStaffId,
      customerName: '',
      docIndexSeed: absoluteIndex,
    });
  });
}

function buildGeneratedTasksAndAssignments(): BuiltTaskBundle {
  const seoulMaterials = buildGeneratedLocationMaterials('seoul', 20260311, 10);
  const nonSeoulMaterials = buildGeneratedLocationMaterials('outside_seoul', 20260377, 10 + seoulMaterials.length);
  const bundles = [
    { scope: 'seoul' as const, materials: seoulMaterials, countPlan: createLocationCountPlan(seoulMaterials.length, 1101) },
    { scope: 'outside_seoul' as const, materials: nonSeoulMaterials, countPlan: createLocationCountPlan(nonSeoulMaterials.length, 2207) },
  ];

  let taskSequence = 6;
  let customerSequence = 1030;
  const tasks: IssuanceTask[] = [];
  const assignments: StaffAssignment[] = [];

  bundles.forEach(({ materials, countPlan }) => {
    let cursor = 0;
    countPlan.forEach((locationCount) => {
      const slice = materials.slice(cursor, cursor + locationCount);
      cursor += locationCount;
      const customerName = makeCustomerName(customerSequence);
      const customerPhone = makeCustomerPhone(customerSequence);
      const customerId = `C-DUMMY-${pad(customerSequence, 5)}`;
      const taskId = `IT-DUMMY-${pad(taskSequence, 5)}`;
      const claimId = `R-DUMMY-${pad(taskSequence, 5)}`;
      const locations = slice.map((item, index) => {
        const docs = cloneDocs(
          createLifecycleDocs(
            item.location.requiredDocs,
            item.assignment?.status ?? (item.location.assignedManagerId ? 'manager_only' : 'unassigned'),
            item.location.name,
            customerName,
            item.location.visitPeriod,
            item.assignment?.completedAt ?? item.assignment?.assignedAt ?? TODAY,
            taskSequence * 10 + index
          )
        );
        const status = makeLocationStatus(item.assignment?.status, docs, Boolean(item.location.assignedManagerId));
        return {
          ...item.location,
          requiredDocs: docs,
          status,
        };
      });

      const taskStatus = makeTaskStatus(locations);
      const task: IssuanceTask = {
        id: taskId,
        claimId,
        customerId,
        customerName,
        customerSSN: makeMaskedSSN(customerSequence),
        customerPhone,
        customerAddress: locations[0]?.address ?? '',
        signatureDataUrl: `data:image/png;base64,DUMMY_SIGNATURE_${taskSequence}`,
        createdAt: `2026-03-${pad((taskSequence % 10) + 1)}`,
        completedAt:
          taskStatus === 'completed'
            ? locations
                .flatMap((location) =>
                  location.requiredDocs.flatMap((doc) => (doc.confirmedAt ? [doc.confirmedAt] : []))
                )
                .sort()
                .at(-1)
            : undefined,
        assignedManagerId: locations[0]?.assignedManagerId,
        assignedManagerName: locations[0]?.assignedManagerName,
        assignedAt: locations[0]?.assignedManagerAt,
        status: taskStatus,
        locations,
      };

      tasks.push(task);

      slice.forEach((item, index) => {
        if (!item.assignment) {
          return;
        }

        const location = locations[index];
        assignments.push({
          id: `SA-${location.id}`,
          taskId,
          locationId: location.id,
          customerId,
          customerName,
          locationName: location.name,
          locationAddress: location.address,
          regionLevel1: location.regionLevel1,
          regionLevel2: location.regionLevel2,
          regionLevel3: location.regionLevel3,
          locationType: location.type,
          visitPeriod: location.visitPeriod,
          staffId: item.assignment.staffId,
          staffName: item.assignment.staffName,
          staffPhone: item.assignment.staffPhone,
          assignedByManagerId: item.assignment.assignedByManagerId,
          assignedByManagerName: item.assignment.assignedByManagerName,
          assignedAt: item.assignment.assignedAt,
          status: item.assignment.status,
          submissionDocsDownloaded: item.assignment.submissionDocsDownloaded,
          visitedAt: item.assignment.visitedAt,
          completedAt: item.assignment.completedAt,
          requiredDocs: cloneDocs(location.requiredDocs),
        });
      });

      taskSequence += 1;
      customerSequence += 1;
    });
  });

  return { tasks, assignments };
}

const generatedBundle = buildGeneratedTasksAndAssignments();

export const ISSUANCE_TASKS: IssuanceTask[] = [...baseBundle.tasks, ...generatedBundle.tasks];
export const INITIAL_STAFF_ASSIGNMENTS: StaffAssignment[] = [...baseBundle.assignments, ...generatedBundle.assignments];

function validateMockDistribution() {
  const locations = ISSUANCE_TASKS.flatMap((task) => task.locations);
  const assignmentsByLocationId = new Map(INITIAL_STAFF_ASSIGNMENTS.map((assignment) => [assignment.locationId, assignment]));

  const locationScope = (location: IssuanceLocation): ScopeKey => (location.regionLevel1 === '서울' ? 'seoul' : 'outside_seoul');
  const isCompleted = (location: IssuanceLocation) => {
    const assignment = assignmentsByLocationId.get(location.id);
    return assignment?.status === 'completed';
  };
  const isManagerOnly = (location: IssuanceLocation) => {
    const assignment = assignmentsByLocationId.get(location.id);
    return !assignment && Boolean(location.assignedManagerId);
  };
  const isUnassigned = (location: IssuanceLocation) => {
    const assignment = assignmentsByLocationId.get(location.id);
    return !assignment && !location.assignedManagerId;
  };
  const isInProgress = (location: IssuanceLocation) => {
    const assignment = assignmentsByLocationId.get(location.id);
    return Boolean(assignment && assignment.status !== 'completed');
  };

  const total = locations.length;
  const inProgress = locations.filter(isInProgress).length;
  const managerOnly = locations.filter(isManagerOnly).length;
  const unassigned = locations.filter(isUnassigned).length;
  const completed = locations.filter(isCompleted).length;
  const seoulLocations = locations.filter((location) => locationScope(location) === 'seoul').length;
  const outsideSeoulLocations = locations.filter((location) => locationScope(location) === 'outside_seoul').length;

  if (total !== TARGET_COUNTS.total) {
    throw new Error(`ISSUANCE_TASKS total mismatch: expected ${TARGET_COUNTS.total}, received ${total}`);
  }
  if (inProgress !== TARGET_COUNTS.seoul.in_progress + TARGET_COUNTS.outside_seoul.in_progress) {
    throw new Error(`in_progress mismatch: expected 750, received ${inProgress}`);
  }
  if (managerOnly !== TARGET_COUNTS.seoul.manager_only + TARGET_COUNTS.outside_seoul.manager_only) {
    throw new Error(`manager_only mismatch: expected 90, received ${managerOnly}`);
  }
  if (unassigned !== TARGET_COUNTS.seoul.unassigned + TARGET_COUNTS.outside_seoul.unassigned) {
    throw new Error(`unassigned mismatch: expected 160, received ${unassigned}`);
  }
  if (completed !== TARGET_COUNTS.seoul.completed + TARGET_COUNTS.outside_seoul.completed) {
    throw new Error(`completed mismatch: expected 2000, received ${completed}`);
  }
  if (seoulLocations !== TARGET_COUNTS.seoul.total) {
    throw new Error(`seoul total mismatch: expected ${TARGET_COUNTS.seoul.total}, received ${seoulLocations}`);
  }
  if (outsideSeoulLocations !== TARGET_COUNTS.outside_seoul.total) {
    throw new Error(`outside seoul total mismatch: expected ${TARGET_COUNTS.outside_seoul.total}, received ${outsideSeoulLocations}`);
  }

  const assignments = INITIAL_STAFF_ASSIGNMENTS;
  const completedAssignments = assignments.filter((assignment) => assignment.status === 'completed');
  const inProgressAssignments = assignments.filter((assignment) => assignment.status !== 'completed');
  if (completedAssignments.length !== 2000) {
    throw new Error(`completed assignments mismatch: expected 2000, received ${completedAssignments.length}`);
  }
  if (inProgressAssignments.length !== 750) {
    throw new Error(`in-progress assignments mismatch: expected 750, received ${inProgressAssignments.length}`);
  }

  const completionBuckets = completedAssignments.reduce<Record<CompletionBucket, number>>(
    (acc, assignment) => {
      const bucket = getCompletionBucket(assignment.completedAt ?? TODAY);
      acc[bucket] += 1;
      return acc;
    },
    { today: 0, this_week: 0, this_month: 0, older: 0 }
  );
  if (
    completionBuckets.today !== 120 ||
    completionBuckets.this_week !== 380 ||
    completionBuckets.this_month !== 700 ||
    completionBuckets.older !== 800
  ) {
    throw new Error(
      `completion bucket mismatch: ${JSON.stringify(completionBuckets)}`
    );
  }

  const seoulAssignments = assignments.filter((assignment) => assignment.regionLevel1 === '서울');
  const outsideAssignments = assignments.filter((assignment) => assignment.regionLevel1 !== '서울');
  const invalidSeoulManager = seoulAssignments.some((assignment) => assignment.assignedByManagerId !== SEOUL_MANAGER_ID);
  const invalidOutsideManager = outsideAssignments.some((assignment) => assignment.assignedByManagerId !== EXTERNAL_MANAGER_ID);
  if (invalidSeoulManager || invalidOutsideManager) {
    throw new Error('assignment manager scope mismatch');
  }

  const internalStaffIds = new Set(SEOUL_COVERAGE_GROUPS.map((group) => group.staffId));
  const internalPerformance = Array.from(internalStaffIds).map((staffId) =>
    assignments.filter((assignment) => assignment.staffId === staffId).length
  );
  if (internalPerformance.some((count) => count < 40)) {
    throw new Error(`some seoul staff received fewer than 40 assignments: ${internalPerformance.join(', ')}`);
  }
}

validateMockDistribution();
