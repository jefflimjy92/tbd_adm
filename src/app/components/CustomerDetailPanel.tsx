import React, { useEffect, useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Download,
  Users,
  Clock,
  PlayCircle,
  CheckSquare,
  ShieldCheck,
  UserPlus,
  FileText,
  Paperclip,
  ExternalLink,
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { InsuranceMainView } from '@/app/components/InsuranceMainView';

// Profile Checklist - 18 essential customer data points
const PROFILE_CHECKLIST = [
  { label: '나이', key: 'age' },
  { label: '성별', key: 'gender' },
  { label: '지역', key: 'region' },
  { label: '3개월 내 병력', key: 'history_3m' },
  { label: '계약자 피보험자 상이', key: 'diff_contractor' },
  { label: '5년 이내 3대질환 병력', key: 'history_5y_critical' },
  { label: '설계사 관계', key: 'planner_rel' },
  { label: '보험가입금액', key: 'insurance_amount' },
  { label: '보험가입 종류', key: 'type' },
  { label: '환급 가능 금액', key: 'refundEstimate' },
  { label: '보험분쟁 유무', key: 'dispute' },
  { label: '결정권자 여부', key: 'decision_maker' },
  { label: '가족 연동 수', key: 'family_count' },
  { label: '가족력', key: 'family_history' },
  { label: '혼인여부', key: 'marriage' },
  { label: '보험 해지이력', key: 'cancel_history' },
  { label: '수술 이력', key: 'surgery_history' },
  { label: '법률 서비스 경험 유무', key: 'legal_exp' },
];

const CONTRACT_DATA = [
  { id: 1, company: '현대해상', product: '무배당 실손보험', policyNo: '2024-1234-5678', status: '정상', premium: 55000, contractDate: '2023-03-15' },
  { id: 2, company: '삼성생명', product: '종합건강보험', policyNo: '2023-9876-5432', status: '정상', premium: 120000, contractDate: '2022-11-20' },
  { id: 3, company: 'KB손해보험', product: '자동차보험', policyNo: '2024-1111-2222', status: '만기예정', premium: 85000, contractDate: '2024-01-10' },
];

const FAMILY_DATA = [
  {
    id: 'F-001', relation: '배우자', name: '김철수', age: 38, phone: '010-9876-****',
    appInstalled: true, isJoined: true, insuranceLinked: true, healthInsuranceLinked: true, hometaxLinked: false,
    insuranceCount: 3, managedCount: 1, refundStatus: '조회완료', refundAmount: 450000, lastLogin: '2025.12.28'
  },
  {
    id: 'F-002', relation: '자녀', name: '김미소', age: 8, phone: '010-****-****',
    appInstalled: false, isJoined: false, insuranceLinked: false, healthInsuranceLinked: false, hometaxLinked: false,
    insuranceCount: 1, managedCount: 0, refundStatus: '미조회', refundAmount: 0, lastLogin: '-'
  }
];

const INTRODUCER_DATA = {
  name: '박지성', phone: '010-7777-8888', relation: '지인', manager: '김상담', joinDate: '2024-05-20'
};

const INTRODUCTION_DATA = [
  { id: 'I-001', name: '최민수', phone: '010-3333-****', relation: '직장동료', manager: '김상담', introDate: '2026-01-10', joinDate: null },
  { id: 'I-002', name: '강하나', phone: '010-4444-****', relation: '지인', manager: '김상담', introDate: '2025-12-28', joinDate: '2026-01-05' }
];

interface CustomerDetailPanelProps {
  customerName: string;
  customerId?: string;
  customer?: any;
  insuranceType?: string;
  monthlyPremium?: string;
  insuranceStatus?: string;
  contractor?: string;
  joinPath?: string;
  criticalDisease?: string;
  criticalOptions?: string[];
  surgery?: string;
  surgeryDetail?: string;
  decisionMaker?: string;
  refundEstimate?: string;
}

type ProfileValueMap = Record<string, string>;

function InfoField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-slate-400">{label}</span>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={clsx(
      "inline-flex px-2 py-0.5 rounded text-xs font-bold border",
      status === '완료' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
      status === '진행 중' ? "bg-blue-50 text-blue-700 border-blue-100" :
      "bg-slate-50 text-slate-600 border-slate-200"
    )}>
      {status}
    </span>
  );
}

export function CustomerDetailPanel({
  customerName,
  customerId,
  customer,
  insuranceType = '종합+실손',
  monthlyPremium = '55,000',
  insuranceStatus = '있음',
  contractor = '본인/본인',
  joinPath = '모름',
  criticalDisease = '없음',
  criticalOptions = [],
  surgery = '있음',
  surgeryDetail = '',
  decisionMaker = '본인',
  refundEstimate = '150',
}: CustomerDetailPanelProps) {
  const [activeTab, setActiveTab] = useState('접수이력');
  const [isCredit4ULinked] = useState(true);
  const [isProfileEditMode, setIsProfileEditMode] = useState(false);
  const [savedProfileOverrides, setSavedProfileOverrides] = useState<ProfileValueMap>({});
  const [draftProfileOverrides, setDraftProfileOverrides] = useState<ProfileValueMap>({});

  const customerNo = customerId || 'C-20251230-0001';
  const phone = customer?.phone || '010-9275-5449';
  const idNumber = customer?.birth || '890703-2******';
  const age = 36;
  const gender = '여';
  const region = customer?.address?.split(' ').slice(0, 2).join(' ') || '서울 마포구';
  const manager = customer?.manager || '김동현';

  const CUSTOMER_REQUESTS = [
    { id: 'R-2026-001', type: '3년 환급', customer: customerName, date: '2026-01-19', stage: '상담', status: '진행 중', team: '상담팀', manager: '김상담' },
    { id: 'R-2025-088', type: '간편 청구', customer: customerName, date: '2025-12-15', stage: '청구', status: '완료', team: '청구팀', manager: '최청구' },
  ];

  const tabs = ['접수이력', '계약현황', '보험 내역 연동', '가족연동', '소개내역', '첨부파일'];
  const tabCounts: { [key: string]: number | string } = {
    '접수이력': CUSTOMER_REQUESTS.length,
    '계약현황': CONTRACT_DATA.length,
    '보험 내역 연동': isCredit4ULinked ? '연동' : '미연동',
    '가족연동': FAMILY_DATA.length,
    '소개내역': INTRODUCTION_DATA.length,
    '첨부파일': 3,
  };

  const baseProfileValues: ProfileValueMap = {
    age, gender, region,
    history_3m: '없음',
    diff_contractor: contractor === '본인/본인' ? '동일' : '상이',
    history_5y_critical: criticalDisease === '있음' ? '있음' : '없음',
    planner_rel: joinPath,
    insurance_amount: `${monthlyPremium}원`,
    type: insuranceType,
    refundEstimate: refundEstimate ? `${refundEstimate}` : '-',
    dispute: '없음',
    decision_maker: decisionMaker,
    family_count: 2,
    family_history: '고혈압(부)',
    marriage: '미혼',
    cancel_history: '1회 - 창상봉합술',
    surgery_history: surgery === '있음' ? '1회 - 창상봉합⚫⚫' : '없음',
    legal_exp: '없음',
  };

  const profileStorageKey = `customer-profile-overrides:${customerNo}`;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(profileStorageKey);
      const parsed = saved ? JSON.parse(saved) : {};
      setSavedProfileOverrides(parsed);
      setDraftProfileOverrides(parsed);
    } catch {
      setSavedProfileOverrides({});
      setDraftProfileOverrides({});
    }
  }, [profileStorageKey]);

  const profileValues: ProfileValueMap = {
    ...baseProfileValues,
    ...(isProfileEditMode ? draftProfileOverrides : savedProfileOverrides),
  };

  const updateOverrides = (
    source: ProfileValueMap,
    key: string,
    value: string,
  ): ProfileValueMap => {
    const normalizedValue = value.trim();
    if (normalizedValue === String(baseProfileValues[key] ?? '')) {
      const { [key]: _removed, ...rest } = source;
      return rest;
    }

    return {
      ...source,
      [key]: value,
    };
  };

  const handleProfileValueChange = (key: string, value: string) => {
    setDraftProfileOverrides((current) => updateOverrides(current, key, value));
  };

  const persistProfileChanges = (nextOverrides: ProfileValueMap, shouldExitEditMode = false) => {
    try {
      window.localStorage.setItem(profileStorageKey, JSON.stringify(nextOverrides));
      setSavedProfileOverrides(nextOverrides);
      setDraftProfileOverrides(nextOverrides);
      if (shouldExitEditMode) {
        setIsProfileEditMode(false);
      }
      toast.success('고객 프로필 요약이 저장되었습니다.');
    } catch {
      toast.error('고객 프로필 요약을 저장하지 못했습니다.');
    }
  };

  const handleHeaderSave = () => {
    if (isProfileEditMode) {
      persistProfileChanges(draftProfileOverrides);
      return;
    }

    toast.info('저장할 변경사항이 없습니다.');
  };

  const handleProfileEditAction = () => {
    if (isProfileEditMode) {
      persistProfileChanges(draftProfileOverrides, true);
      return;
    }

    setDraftProfileOverrides(savedProfileOverrides);
    setIsProfileEditMode(true);
  };

  const renderProfileEditor = (key: string, value: string) => {
    const commonClassName = 'w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-xs font-bold text-slate-700 focus:border-teal-500 focus:outline-none';

    if (['gender', 'diff_contractor', 'history_5y_critical', 'planner_rel', 'type', 'dispute', 'decision_maker', 'marriage', 'legal_exp'].includes(key)) {
      const options: Record<string, string[]> = {
        gender: ['여', '남'],
        diff_contractor: ['동일', '상이'],
        history_5y_critical: ['없음', '있음'],
        planner_rel: ['관계 없음', '가족', '지인', '모름'],
        type: ['실손+종합', '실손', '종합', '없음'],
        dispute: ['없음', '있음'],
        decision_maker: ['본인', '배우자', '부모', '자녀', '기타'],
        marriage: ['미혼', '기혼', '기타'],
        legal_exp: ['없음', '있음'],
      };

      return (
        <select
          value={value}
          onChange={(e) => handleProfileValueChange(key, e.target.value)}
          className={commonClassName}
        >
          {options[key].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleProfileValueChange(key, e.target.value)}
        className={commonClassName}
      />
    );
  };

  return (
    <div className="space-y-0">
      {/* Top Header Bar */}
      <div className="bg-white rounded-t-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-3.5 flex items-center justify-between">
          <h1 className="text-base font-bold text-slate-800 flex items-baseline gap-2">
            {customerName} 상세 페이지
            <span className="text-xs font-normal text-slate-400 font-mono">{customerNo}</span>
          </h1>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs font-medium hover:bg-slate-900 flex items-center gap-1">
              <Activity size={14} /> 분석 리포트
            </button>
            <button className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1">
              <Download size={14} /> 내보내기
            </button>
            <button
              type="button"
              onClick={handleHeaderSave}
              className="px-3 py-1.5 bg-teal-600 text-white rounded text-xs font-medium hover:bg-teal-700 flex items-center gap-1"
            >
              <Save size={14} /> 저장
            </button>
          </div>
        </div>
      </div>

      {/* Customer Basic Info Grid */}
      <div className="bg-white border-x border-slate-200 px-5 py-4">
        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-sm">
            <InfoField
              label="고객등급"
              value={
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">
                  ★ VIP
                </span>
              }
            />
            <InfoField label="고객명" value={<span className="font-bold text-slate-800">{customerName}</span>} />
            <InfoField label="휴대폰" value={<span className="font-mono text-slate-700 font-medium">{phone}</span>} />
            <InfoField label="주민번호" value={<span className="font-mono text-slate-500">{idNumber}</span>} />

            <InfoField label="나이" value={<span className="text-slate-700">만 {age}세</span>} />
            <InfoField label="성별" value={<span className="text-slate-700">{gender}</span>} />
            <InfoField label="지역" value={<span className="text-slate-700">{region}</span>} />
            <InfoField label="담당자" value={<span className="font-bold text-slate-700">{manager}</span>} />

            <InfoField
              label="유입경로 (UTM)"
              value={
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-white shadow-sm">틱톡</span>
                  <span className="text-[11px] text-slate-500">환급금조회</span>
                </div>
              }
            />
            <InfoField label="등록일" value={<span className="font-mono text-slate-500">2025.12.30</span>} />
            <InfoField label="최근방문" value={<span className="font-mono text-slate-600">2025-12-30</span>} />
            <InfoField
              label="마케팅동의"
              value={
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-blue-50 text-blue-600 border-blue-100">
                  동의함
                </span>
              }
            />

            <InfoField label="앱 설치" value={<span className="text-slate-400 text-xs">미설치</span>} />
            <InfoField
              label="건강보험"
              value={
                <div className="flex flex-col">
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 size={12} /> 연동완료
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono ml-4">2025.12.30</span>
                </div>
              }
            />
            <InfoField label="홈택스" value={<span className="text-slate-400 text-xs">미연동</span>} />
            <InfoField
              label="크레딧포유"
              value={
                isCredit4ULinked ? (
                  <div className="flex flex-col">
                    <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 size={12} /> 연동완료
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono ml-4">2025.12.30</span>
                  </div>
                ) : (
                  <span className="text-slate-400 text-xs">미연동</span>
                )
              }
            />
          </div>
        </div>

        {/* Customer Profile Summary - 18 Essential Data Points */}
        <div className="mt-4 border-t border-slate-200 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <label className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <CheckSquare size={14} className="text-slate-400" /> 고객 프로필 요약 (18개 핵심 데이터)
            </label>
            <button
              type="button"
              onClick={handleProfileEditAction}
              className={clsx(
                'rounded border px-3 py-1.5 text-[11px] font-bold transition-colors',
                isProfileEditMode
                  ? 'border-teal-600 bg-teal-600 text-white hover:bg-teal-700'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              )}
            >
              {isProfileEditMode ? '완료' : '수정하기'}
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
            {PROFILE_CHECKLIST.map((item, idx) => {
              const value = profileValues[item.key];
              return (
                <div key={idx} className="flex flex-col border-l-2 border-slate-300 pl-2">
                  <span className="text-[10px] text-slate-400 mb-0.5 truncate leading-none" title={item.label}>
                    {item.label}
                  </span>
                  {isProfileEditMode ? (
                    renderProfileEditor(item.key, value || '')
                  ) : (
                    <span className="text-xs font-bold text-slate-700 truncate min-h-[1rem]">
                      {value || '-'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-x border-slate-200">
        <div className="flex border-b border-slate-200 px-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-5 py-2.5 text-xs font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <span>{tab}</span>
              <span className={clsx(
                "ml-1.5 text-xs font-bold",
                activeTab === tab ? "text-teal-600" : "text-slate-400",
                tab === '보험 내역 연동' && (tabCounts[tab] === '연동' ? "text-emerald-600" : "text-slate-400")
              )}>
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-xl border-x border-b border-slate-200 p-5">
        {/* 접수이력 */}
        {activeTab === '접수이력' && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
              <h4 className="font-bold text-slate-700 text-sm">고객 접수 현황 ({CUSTOMER_REQUESTS.length}건)</h4>
              <button className="px-3 py-1.5 bg-[#1e293b] text-white rounded text-xs font-medium hover:bg-slate-800 flex items-center gap-1">
                <PlayCircle size={14} /> 신규 접수 등록
              </button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5 font-medium">접수 ID</th>
                  <th className="px-4 py-2.5 font-medium">접수 유형</th>
                  <th className="px-4 py-2.5 font-medium">고객명</th>
                  <th className="px-4 py-2.5 font-medium">접수일</th>
                  <th className="px-4 py-2.5 font-medium">현재 단계</th>
                  <th className="px-4 py-2.5 font-medium">담당팀</th>
                  <th className="px-4 py-2.5 font-medium">상태</th>
                  <th className="px-4 py-2.5 font-medium text-right">상세</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CUSTOMER_REQUESTS.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-600">{req.id}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-sm">
                        {req.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#1e293b]">{req.customer}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{req.date}</td>
                    <td className="px-4 py-3">
                      <span className={clsx("font-bold text-xs",
                        req.stage === '상담' ? "text-blue-600" :
                        req.stage === '미팅' ? "text-purple-600" :
                        req.stage === '청구' ? "text-[#0f766e]" : "text-slate-400"
                      )}>
                        {req.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{req.team}</td>
                    <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-slate-400 hover:text-[#1e293b] p-1 rounded hover:bg-slate-100">
                        <ArrowLeft size={14} className="rotate-180" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 계약현황 */}
        {activeTab === '계약현황' && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">No.</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">보험사</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">상품명</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">증권번호</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">계약상태</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">보험료</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">계약일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CONTRACT_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{item.id}</td>
                    <td className="px-4 py-3 text-slate-800 font-bold">{item.company}</td>
                    <td className="px-4 py-3 text-slate-700">{item.product}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{item.policyNo}</td>
                    <td className="px-4 py-3">
                      <span className={clsx(
                        "px-2 py-1 rounded text-xs font-medium",
                        item.status === '정상' ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-800 font-bold">{item.premium.toLocaleString()}원</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{item.contractDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 보험 내역 연동 */}
        {activeTab === '보험 내역 연동' && (
          <InsuranceMainView />
        )}

        {/* 가족연동 */}
        {activeTab === '가족연동' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 border border-slate-200 rounded-lg">
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                  <Users size={16} className="text-teal-600" />
                  연동된 가족 목록
                  <span className="text-xs font-normal text-slate-500 ml-1">총 {FAMILY_DATA.length}명</span>
                </h4>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 border border-teal-200 rounded text-xs font-bold hover:bg-teal-100 transition-colors">
                <Users size={14} /> 가족 초대하기
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {FAMILY_DATA.map((member) => (
                <div key={member.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-base">
                        {member.relation === '배우자' ? '👩‍❤️‍👨' : member.relation === '자녀' ? '👶' : '👤'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{member.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{member.relation}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">만 {member.age}세 · {member.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 rounded-lg p-3 mb-3 grid grid-cols-3 gap-y-3 gap-x-2">
                    {[
                      { label: '서비스 가입', linked: member.isJoined, text: '가입' },
                      { label: '앱 설치', linked: member.appInstalled, text: '설치' },
                      { label: '3년 환급', linked: member.refundStatus === '조회완료', text: '조회' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <span className="text-[10px] text-slate-400 mb-1">{item.label}</span>
                        {item.linked ? (
                          <div className="flex items-center gap-1 text-slate-900">
                            <CheckCircle2 size={12} />
                            <span className="text-xs font-medium">{item.text}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300">미{item.text}</span>
                        )}
                      </div>
                    ))}

                    <div className="col-span-3 h-px bg-slate-100" />

                    {[
                      { label: '내보험다보여', linked: member.insuranceLinked },
                      { label: '건강보험공단', linked: member.healthInsuranceLinked },
                      { label: '국세청 홈택스', linked: member.hometaxLinked },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <span className="text-[10px] text-slate-400 mb-1">{item.label}</span>
                        {item.linked ? (
                          <div className="flex items-center gap-1 text-slate-900">
                            <CheckCircle2 size={12} />
                            <span className="text-xs font-medium">연동</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300">미연동</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-3 grid grid-cols-2 divide-x divide-slate-100">
                    <div className="pr-3">
                      <div className="text-xs text-slate-400 mb-0.5">총 보험 수</div>
                      <div className="font-bold text-slate-900 flex items-baseline">
                        {member.insuranceCount}
                        <span className="text-xs font-normal text-slate-400 ml-0.5">건</span>
                      </div>
                    </div>
                    <div className="pl-3">
                      <div className="text-xs text-slate-400 mb-0.5">예상 환급금</div>
                      <div className={clsx("font-bold", member.refundAmount > 0 ? "text-slate-900" : "text-slate-300")}>
                        {member.refundAmount > 0 ? member.refundAmount.toLocaleString() : '0'}
                        <span className="text-xs font-normal text-slate-400 ml-0.5">원</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 소개내역 */}
        {activeTab === '소개내역' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 mb-0.5">나를 소개해준 사람</div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{INTRODUCER_DATA.name}</span>
                    <span className="text-xs text-slate-500 border-l border-slate-200 pl-2">{INTRODUCER_DATA.relation}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-0.5">가입일</div>
                <div className="text-xs font-medium text-slate-700 font-mono">{INTRODUCER_DATA.joinDate}</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  내가 소개한 고객
                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs">{INTRODUCTION_DATA.length}</span>
                </h4>
                <button className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1">
                  <UserPlus size={14} /> 소개 등록
                </button>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">이름</th>
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">연락처</th>
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">관계</th>
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">소개일</th>
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-600">가입일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INTRODUCTION_DATA.map((intro) => (
                      <tr key={intro.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-slate-800">{intro.name}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-600">{intro.phone}</td>
                        <td className="px-4 py-3 text-slate-600 text-xs">{intro.relation}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-600">{intro.introDate}</td>
                        <td className="px-4 py-3">
                          {intro.joinDate ? (
                            <span className="font-mono text-xs text-emerald-600 font-bold">{intro.joinDate}</span>
                          ) : (
                            <span className="text-xs text-slate-400">미가입</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 첨부파일 */}
        {activeTab === '첨부파일' && (
          <div className="space-y-3">
            {[
              { name: '가족관계증명서.pdf', size: '450KB', type: 'PDF', date: '2025-12-30' },
              { name: '보험증권_메리츠.jpg', size: '2.5MB', type: 'Image', date: '2025-12-29' },
              { name: '건강검진결과서.pdf', size: '5.1MB', type: 'PDF', date: '2025-12-28' },
            ].map((file, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    "size-8 rounded flex items-center justify-center text-xs font-bold",
                    file.type === 'PDF' ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
                  )}>
                    {file.type === 'PDF' ? <FileText size={16} /> : <Paperclip size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{file.name}</p>
                    <p className="text-[10px] text-slate-400">{file.size} · {file.date}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-700 p-1">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
