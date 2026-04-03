import React, { useMemo, useState } from 'react';
import {
  Filter,
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Megaphone,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { ListPeriodControls } from '@/app/components/ListPeriodControls';
import {
  filterRowsByPeriod,
  getDefaultCustomPeriodRange,
  getPerformancePeriodRange,
  getRowsDateBounds,
  type PerformancePeriodPreset,
} from '@/app/issuance/performancePeriodUtils';

// Mock Data
type DbCategory = 'possible' | 'compensation' | 'referral' | 'intro';

const DB_CATEGORY_LABEL: Record<DbCategory, string> = {
  possible: '일반DB',
  compensation: '일반DB',
  referral: '소개DB',
  intro: '일반DB',
};

const DB_CATEGORY_STYLE: Record<DbCategory, string> = {
  possible: 'bg-blue-50 text-blue-700 border-blue-200',
  compensation: 'bg-blue-50 text-blue-700 border-blue-200',
  referral: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  intro: 'bg-blue-50 text-blue-700 border-blue-200',
};

const DB_FILTER_TABS = [
  { key: 'all' as const, label: '전체' },
  { key: 'unassigned' as const, label: '미배정' },
  { key: 'normal' as const, label: '일반DB' },
  { key: 'referral' as const, label: '소개DB' },
];

const MOCK_ASSIGNEES = [
  { name: '박담당', currentCount: 22 },
  { name: '김담당', currentCount: 28 },
  { name: '이담당', currentCount: 15 },
  { name: '최담당', currentCount: 31 },
  { name: '문담당', currentCount: 19 },
];

const MOCK_CALL_MEMBERS = [
  { id: 'cm1', name: '김상담', currentCount: 5 },
  { id: 'cm2', name: '이상담', currentCount: 3 },
  { id: 'cm3', name: '박상담', currentCount: 4 },
  { id: 'cm4', name: '최상담', currentCount: 7 },
  { id: 'cm5', name: '정상담', currentCount: 2 },
  { id: 'cm6', name: '한상담', currentCount: 6 },
  { id: 'cm7', name: '오상담', currentCount: 8 },
  { id: 'cm8', name: '서상담', currentCount: 1 },
  { id: 'cm9', name: '윤상담', currentCount: 5 },
  { id: 'cm10', name: '임상담', currentCount: 3 },
  { id: 'cm11', name: '문상담', currentCount: 4 },
  { id: 'cm12', name: '조상담', currentCount: 6 },
  { id: 'cm13', name: '노상담', currentCount: 2 },
  { id: 'cm14', name: '권상담', currentCount: 7 },
  { id: 'cm15', name: '황상담', currentCount: 3 },
  { id: 'cm16', name: '신상담', currentCount: 5 },
  { id: 'cm17', name: '백상담', currentCount: 4 },
  { id: 'cm18', name: '유상담', currentCount: 1 },
  { id: 'cm19', name: '장상담', currentCount: 6 },
  { id: 'cm20', name: '송상담', currentCount: 2 },
];


const LEADS = [
  { id: 'L-2026-001', date: '2026-03-12 09:30', channel: '인스타그램 광고 #4', name: '김지우', age: 29, region: '서울 강남', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-002', date: '2026-03-11 10:15', channel: '구글 검색', name: '이민수', age: 45, region: '경기 수원', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '박담당', next_action: '전화', dbCategory: 'compensation' as DbCategory },
  { id: 'L-2026-003', date: '2026-03-09 11:00', channel: '틱톡', name: '최아라', age: 24, region: '부산', marketing_consent: false, terms_consent: true, status: '부적격', owner: '시스템', next_action: '-', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-004', date: '2026-03-07 16:45', channel: '지인 소개', name: '박준호', age: 33, region: '인천', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '김담당', next_action: '팔로업', dbCategory: 'referral' as DbCategory },
  { id: 'L-2026-005', date: '2026-03-03 13:20', channel: '네이버 블로그', name: '윤서연', age: 31, region: '서울 마포', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-006', date: '2026-02-28 09:10', channel: '카카오 채널', name: '오태윤', age: 41, region: '대전 유성', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '이담당', next_action: '전화', dbCategory: 'compensation' as DbCategory },
  { id: 'L-2026-007', date: '2026-02-22 15:00', channel: '구글 검색', name: '한수진', age: 36, region: '인천 연수', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '박담당', next_action: '팔로업', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-008', date: '2026-02-16 14:40', channel: '지인 소개', name: '서지민', age: 34, region: '서울 종로', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '김담당', next_action: '상담', dbCategory: 'referral' as DbCategory },
  { id: 'L-2026-009', date: '2026-02-11 10:50', channel: '유튜브 광고', name: '임도현', age: 38, region: '서울 서초', marketing_consent: false, terms_consent: true, status: '부적격', owner: '시스템', next_action: '-', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-010', date: '2026-01-26 17:05', channel: '페이스북 리타겟팅', name: '문가은', age: 27, region: '서울 중랑', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '문담당', next_action: '미팅', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-011', date: '2026-01-14 08:55', channel: '구글 검색', name: '최하늘', age: 33, region: '서울 도봉', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '최담당', next_action: '전화', dbCategory: 'compensation' as DbCategory },
  { id: 'L-2026-012', date: '2025-12-20 12:10', channel: '네이버 카페', name: '조민호', age: 39, region: '경기 화성', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '김담당', next_action: '재접촉', dbCategory: 'possible' as DbCategory },
  // 가능DB 추가
  { id: 'L-2026-013', date: '2026-03-25 10:05', channel: '인스타그램 광고 #7', name: '노지현', age: 32, region: '서울 은평', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-014', date: '2026-03-24 14:30', channel: '유튜브 광고', name: '권도훈', age: 41, region: '대구 수성', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '박담당', next_action: '전화', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-015', date: '2026-03-22 11:20', channel: '구글 검색', name: '임채원', age: 28, region: '서울 강서', marketing_consent: false, terms_consent: true, status: '부적격', owner: '시스템', next_action: '-', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-016', date: '2026-03-20 09:45', channel: '네이버 블로그', name: '황지영', age: 35, region: '경기 안양', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '이담당', next_action: '팔로업', dbCategory: 'possible' as DbCategory },
  { id: 'L-2026-017', date: '2026-03-18 16:00', channel: '카카오 채널', name: '신현우', age: 43, region: '부산 해운대', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '최담당', next_action: '상담', dbCategory: 'possible' as DbCategory },
  // 보상DB 추가
  { id: 'L-2026-018', date: '2026-03-26 09:15', channel: '카카오 채널', name: '백승호', age: 52, region: '서울 노원', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정', dbCategory: 'compensation' as DbCategory },
  { id: 'L-2026-019', date: '2026-03-23 13:40', channel: '구글 검색', name: '유정아', age: 47, region: '인천 부평', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '문담당', next_action: '전화', dbCategory: 'compensation' as DbCategory },
  { id: 'L-2026-020', date: '2026-03-19 10:30', channel: '네이버 블로그', name: '장민철', age: 55, region: '경기 성남', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '이담당', next_action: '미팅', dbCategory: 'compensation' as DbCategory },
  { id: 'L-2026-021', date: '2026-03-15 15:20', channel: '유튜브 광고', name: '송혜교', age: 39, region: '서울 송파', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '박담당', next_action: '팔로업', dbCategory: 'compensation' as DbCategory },
  { id: 'L-2026-022', date: '2026-03-10 11:00', channel: '인스타그램 광고 #5', name: '오정현', age: 48, region: '대전 서구', marketing_consent: false, terms_consent: true, status: '부적격', owner: '시스템', next_action: '-', dbCategory: 'compensation' as DbCategory },
  // 소개DB 추가
  { id: 'L-2026-023', date: '2026-03-27 10:00', channel: '지인 소개', name: '전세훈', age: 36, region: '서울 강동', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정', dbCategory: 'referral' as DbCategory },
  { id: 'L-2026-024', date: '2026-03-24 14:10', channel: '지인 소개', name: '김미란', age: 44, region: '경기 용인', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '김담당', next_action: '상담', dbCategory: 'referral' as DbCategory },
  { id: 'L-2026-025', date: '2026-03-21 09:50', channel: '지인 소개', name: '이상훈', age: 31, region: '서울 마포', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '최담당', next_action: '미팅', dbCategory: 'referral' as DbCategory },
  { id: 'L-2026-026', date: '2026-03-17 16:30', channel: '지인 소개', name: '박소연', age: 27, region: '인천 연수', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '문담당', next_action: '팔로업', dbCategory: 'referral' as DbCategory },
  { id: 'L-2026-027', date: '2026-03-13 11:45', channel: '지인 소개', name: '조현민', age: 50, region: '부산 남구', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '이담당', next_action: '재접촉', dbCategory: 'referral' as DbCategory },
  // 인트로DB
  { id: 'L-2026-028', date: '2026-03-28 09:00', channel: '세미나/이벤트', name: '강태양', age: 38, region: '서울 중구', marketing_consent: true, terms_consent: true, status: '신규(New)', owner: '-', next_action: '배정', dbCategory: 'intro' as DbCategory },
  { id: 'L-2026-029', date: '2026-03-26 15:00', channel: '세미나/이벤트', name: '윤민준', age: 45, region: '경기 수원', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '박담당', next_action: '전화', dbCategory: 'intro' as DbCategory },
  { id: 'L-2026-030', date: '2026-03-22 10:20', channel: '제휴사 연계', name: '한나라', age: 33, region: '서울 서초', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '김담당', next_action: '상담', dbCategory: 'intro' as DbCategory },
  { id: 'L-2026-031', date: '2026-03-18 14:00', channel: '제휴사 연계', name: '정재원', age: 42, region: '대구 달서', marketing_consent: true, terms_consent: true, status: '배정됨', owner: '이담당', next_action: '팔로업', dbCategory: 'intro' as DbCategory },
  { id: 'L-2026-032', date: '2026-03-14 11:30', channel: '세미나/이벤트', name: '류수빈', age: 29, region: '서울 강남', marketing_consent: false, terms_consent: true, status: '부적격', owner: '시스템', next_action: '-', dbCategory: 'intro' as DbCategory },
  { id: 'L-2026-033', date: '2026-03-10 09:30', channel: '제휴사 연계', name: '방준혁', age: 55, region: '경기 화성', marketing_consent: true, terms_consent: true, status: '연락완료', owner: '최담당', next_action: '미팅', dbCategory: 'intro' as DbCategory },
];

export function Leads({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [leadsData, setLeadsData] = useState(LEADS);
  const defaultCustomPeriodRange = useMemo(() => getDefaultCustomPeriodRange(), []);
  const [periodPreset, setPeriodPreset] = useState<PerformancePeriodPreset>('all');
  const [customPeriodStartDate, setCustomPeriodStartDate] = useState(defaultCustomPeriodRange.startDate);
  const [customPeriodEndDate, setCustomPeriodEndDate] = useState(defaultCustomPeriodRange.endDate);
  const [dbFilter, setDbFilter] = useState<'all' | 'unassigned' | 'normal' | 'referral'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(new Set());
  const [showDistributionPreview, setShowDistributionPreview] = useState(false);
  const [distributionPanelCollapsed, setDistributionPanelCollapsed] = useState(false);
  const [distributionConsentFilter, setDistributionConsentFilter] = useState<'all' | 'agreed' | 'not_agreed'>('all');
  const allRange = useMemo(
    () => getRowsDateBounds(leadsData, (lead) => lead.date, defaultCustomPeriodRange),
    [defaultCustomPeriodRange, leadsData]
  );


  const periodRange = useMemo(
    () => getPerformancePeriodRange(periodPreset, customPeriodStartDate, customPeriodEndDate, new Date(), allRange),
    [allRange, customPeriodEndDate, customPeriodStartDate, periodPreset]
  );

  const periodFiltered = useMemo(
    () => filterRowsByPeriod(leadsData, periodRange, (lead) => lead.date),
    [leadsData, periodRange]
  );

  const filteredLeads = useMemo(() => {
    let result: typeof periodFiltered;
    switch (dbFilter) {
      case 'all':
        result = periodFiltered;
        break;
      case 'unassigned':
        result = periodFiltered.filter(l => l.owner === '-');
        break;
      case 'normal':
        result = periodFiltered.filter(l => l.dbCategory !== 'referral');
        break;
      case 'referral':
        result = periodFiltered.filter(l => l.dbCategory === 'referral');
        break;
      default:
        result = periodFiltered;
    }
    if (selectMode && distributionConsentFilter !== 'all') {
      result = result.filter(l =>
        distributionConsentFilter === 'agreed' ? l.marketing_consent : !l.marketing_consent
      );
    }
    return result;
  }, [dbFilter, periodFiltered, selectMode, distributionConsentFilter]);

  const dbCounts = useMemo(() => ({
    all: periodFiltered.length,
    unassigned: periodFiltered.filter(l => l.owner === '-').length,
    normal: periodFiltered.filter(l => l.dbCategory !== 'referral').length,
    referral: periodFiltered.filter(l => l.dbCategory === 'referral').length,
  }), [periodFiltered]);

  const isReferralTab = dbFilter === 'referral';

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const unassignedLeads = useMemo(
    () => filteredLeads.filter(l => l.owner === '-'),
    [filteredLeads]
  );

  const toggleSelectAll = () => {
    if (selectedIds.size === unassignedLeads.length && unassignedLeads.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(unassignedLeads.map(l => l.id)));
    }
  };


  const toggleSelectMode = () => {
    if (selectMode) {
      setSelectMode(false);
      setSelectedIds(new Set());
      setSelectedMemberIds(new Set());
      setShowDistributionPreview(false);
      setDistributionConsentFilter('all');
      return;
    }

    setSelectMode(true);
  };

  const toggleMemberSelect = (id: string) => {
    setSelectedMemberIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectedLeadRows = useMemo(
    () => Array.from(selectedIds).map((id) => leadsData.find((lead) => lead.id === id)).filter(Boolean) as typeof LEADS,
    [leadsData, selectedIds]
  );

  const selectedCallMembers = useMemo(
    () => MOCK_CALL_MEMBERS.filter((member) => selectedMemberIds.has(member.id)),
    [selectedMemberIds]
  );

  const distributionPreview = useMemo(() => {
    if (selectedLeadRows.length === 0 || selectedCallMembers.length === 0) return [];

    const perPerson = Math.floor(selectedLeadRows.length / selectedCallMembers.length);
    const remainder = selectedLeadRows.length % selectedCallMembers.length;
    let startIndex = 0;

    return selectedCallMembers.map((member, index) => {
      const assignedCount = perPerson + (index < remainder ? 1 : 0);
      const assignedLeads = selectedLeadRows.slice(startIndex, startIndex + assignedCount);
      startIndex += assignedCount;

      return {
        memberId: member.id,
        memberName: member.name,
        assignedCount,
        leadIds: assignedLeads.map((lead) => lead.id),
      };
    });
  }, [selectedCallMembers, selectedLeadRows]);

  const handlePreviewDistribution = () => {
    if (selectedLeadRows.length === 0 || selectedCallMembers.length === 0) {
      toast.error('접수건과 콜팀원을 먼저 선택해주세요.');
      return;
    }

    setShowDistributionPreview(true);
  };

  const handleConfirmDistribution = () => {
    if (distributionPreview.length === 0) {
      toast.error('배분 미리보기를 먼저 확인해주세요.');
      return;
    }

    const ownerMap = new Map<string, string>();
    distributionPreview.forEach((row) => {
      row.leadIds.forEach((leadId) => ownerMap.set(leadId, row.memberName));
    });

    setLeadsData((current) => current.map((lead) => (
      ownerMap.has(lead.id)
        ? { ...lead, owner: ownerMap.get(lead.id)!, status: '배정됨', next_action: '전화' }
        : lead
    )));
    setSelectMode(false);
    setSelectedIds(new Set());
    setSelectedMemberIds(new Set());
    setShowDistributionPreview(false);
    toast.success('균등 배분이 완료되었습니다.');
  };

  const handleReferralHandoff = () => {
    toast.success('소개DB: 소개자 동일 영업직원에게 미팅 인계됨');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="font-bold text-[#1e293b]">신청(DB) 유입 관리</h2>
          <p className="text-xs text-slate-500 mt-1">인바운드 신청 내역 및 담당자 배정</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <ListPeriodControls
            preset={periodPreset}
            range={periodRange}
            onPresetChange={setPeriodPreset}
            onStartDateChange={setCustomPeriodStartDate}
            onEndDateChange={setCustomPeriodEndDate}
          />
          {isReferralTab ? (
            <Button variant="outline" onClick={handleReferralHandoff}>
              미팅 인계
            </Button>
          ) : (
            <Button variant="outline" onClick={toggleSelectMode}>
              {selectMode ? '선택 취소' : '상담원 배정'}
            </Button>
          )}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50 cursor-pointer">
            <Filter size={16} /> 필터
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#1e293b] text-white rounded text-sm hover:bg-slate-800">
            <Plus size={16} /> 수기 등록
          </button>
        </div>
      </div>

      {/* DB Type Filter Tabs */}
      <div className="px-6 pt-3 pb-0 border-b border-slate-200 bg-white flex gap-1">
        {DB_FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              setDbFilter(tab.key);
              setSelectedIds(new Set());
              setSelectedMemberIds(new Set());
              setShowDistributionPreview(false);
              if (tab.key === 'referral') {
                setSelectMode(false);
              }
            }}
            className={clsx(
              'px-4 py-2 text-xs font-bold rounded-t border-b-2 transition-colors',
              dbFilter === tab.key
                ? 'text-[#1e293b] border-[#1e293b] bg-slate-50'
                : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50'
            )}
          >
            {tab.label}
            <span className={clsx(
              'ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]',
              dbFilter === tab.key ? 'bg-[#1e293b] text-white' : 'bg-slate-100 text-slate-400'
            )}>
              {dbCounts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {selectMode && !isReferralTab && (
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDistributionPanelCollapsed(!distributionPanelCollapsed)}
                className="p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors"
              >
                {distributionPanelCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
              <div>
                <div className="text-sm font-bold text-[#1e293b]">균등 배분 모드</div>
                <div className="mt-0.5 text-xs text-slate-500">{selectedIds.size}건 선택됨 · 팀원 {selectedMemberIds.size}명</div>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <span className="text-xs text-slate-500">마케팅 동의:</span>
                {([
                  { key: 'all' as const, label: '전체' },
                  { key: 'agreed' as const, label: '동의' },
                  { key: 'not_agreed' as const, label: '미동의' },
                ] as const).map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setDistributionConsentFilter(opt.key)}
                    className={clsx(
                      'px-2 py-0.5 rounded text-xs font-medium border transition-colors',
                      distributionConsentFilter === opt.key
                        ? 'bg-[#1e293b] text-white border-[#1e293b]'
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handlePreviewDistribution}>
                배분 미리보기
              </Button>
              <Button onClick={handleConfirmDistribution} disabled={distributionPreview.length === 0}>
                배분 확정
              </Button>
            </div>
          </div>

          <div className={clsx(
            "mt-3 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] overflow-hidden transition-all duration-200",
            distributionPanelCollapsed ? "max-h-0 mt-0 opacity-0" : "max-h-52 opacity-100"
          )}>
            <div className="rounded-xl border border-slate-200 bg-white p-3 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-2 shrink-0">
                <div className="text-xs font-bold text-slate-600">콜팀원 선택 <span className="text-slate-400 font-normal">({selectedMemberIds.size}/{MOCK_CALL_MEMBERS.length}명)</span></div>
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-800">
                  <input
                    type="checkbox"
                    checked={selectedMemberIds.size === MOCK_CALL_MEMBERS.length}
                    onChange={() => {
                      if (selectedMemberIds.size === MOCK_CALL_MEMBERS.length) {
                        setSelectedMemberIds(new Set());
                      } else {
                        setSelectedMemberIds(new Set(MOCK_CALL_MEMBERS.map(m => m.id)));
                      }
                    }}
                    className="rounded border-slate-300"
                  />
                  <span className="font-medium">{selectedMemberIds.size === MOCK_CALL_MEMBERS.length ? '전체 해제' : '전체 선택'}</span>
                </label>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {MOCK_CALL_MEMBERS.map((member) => (
                  <label key={member.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedMemberIds.has(member.id)}
                        onChange={() => toggleMemberSelect(member.id)}
                        className="rounded border-slate-300"
                      />
                      <span className="font-medium">{member.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">현재 {member.currentCount}건</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 overflow-hidden flex flex-col">
              <div className="text-xs font-bold text-slate-600 mb-2 shrink-0">배분 미리보기</div>
              {showDistributionPreview && distributionPreview.length > 0 ? (
                <div className="overflow-auto rounded-lg border border-slate-200 flex-1">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-xs text-slate-500 sticky top-0">
                      <tr>
                        <th className="px-3 py-1.5 text-left font-medium">팀원명</th>
                        <th className="px-3 py-1.5 text-left font-medium">배정 건수</th>
                        <th className="px-3 py-1.5 text-left font-medium">배정될 접수ID 목록</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {distributionPreview.map((row) => (
                        <tr key={row.memberId}>
                          <td className="px-3 py-2 font-medium text-slate-700">{row.memberName}</td>
                          <td className="px-3 py-2 text-slate-600">{row.assignedCount}건</td>
                          <td className="px-3 py-2 text-slate-600">{row.leadIds.join(', ') || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-400">
                  접수건과 팀원을 선택한 뒤 배분 미리보기를 실행하세요.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* List Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0">
            <tr>
              {selectMode && (
                <th className="px-3 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === unassignedLeads.length && unassignedLeads.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300"
                  />
                </th>
              )}
              <th className="px-6 py-3 font-medium">신청ID / 일시</th>
              <th className="px-6 py-3 font-medium">유입 채널</th>
              <th className="px-6 py-3 font-medium">고객명</th>
              <th className="px-6 py-3 font-medium">DB유형</th>
              <th className="px-6 py-3 font-medium">나이</th>
              <th className="px-6 py-3 font-medium">지역(추정)</th>
              <th className="px-6 py-3 font-medium">동의여부</th>
              <th className="px-6 py-3 font-medium">상태</th>
              <th className="px-6 py-3 font-medium">담당자</th>
              <th className="px-6 py-3 font-medium text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((item) => (
              <tr
                key={item.id}
                className={clsx("hover:bg-slate-50 transition-colors cursor-pointer", selectedIds.has(item.id) && "bg-blue-50/50")}
                onClick={() => onNavigate?.('consultation:' + item.id)}
              >
                {selectMode && (
                  <td className="px-3 py-4" onClick={e => e.stopPropagation()}>
                    {item.owner === '-' ? (
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-slate-300"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        disabled
                        checked={false}
                        className="rounded border-slate-200 opacity-30 cursor-not-allowed"
                        title="이미 배정된 건입니다"
                      />
                    )}
                  </td>
                )}
                <td className="px-6 py-4">
                  <div className="font-mono text-xs font-medium text-slate-600">{item.id}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.date}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs border border-slate-200">
                    <Megaphone size={10} /> {item.channel}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-[#1e293b]">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={clsx("inline-flex px-2 py-0.5 rounded text-xs font-bold border", DB_CATEGORY_STYLE[item.dbCategory])}>
                    {DB_CATEGORY_LABEL[item.dbCategory]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    item.age >= 27 ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {item.age}세
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{item.region}</td>
                <td className="px-6 py-4">
                   <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className={clsx("size-1.5 rounded-full shrink-0", item.marketing_consent ? "bg-green-500" : "bg-slate-300")}></span>
                        <span className={clsx("text-xs", item.marketing_consent ? "text-slate-700" : "text-slate-400")}>마케팅</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={clsx("size-1.5 rounded-full shrink-0", item.terms_consent ? "bg-green-500" : "bg-slate-300")}></span>
                        <span className={clsx("text-xs", item.terms_consent ? "text-slate-700" : "text-slate-400")}>약관</span>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4 text-slate-600">{item.owner}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-[#1e293b]">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    '신규(New)': 'bg-blue-50 text-blue-700 border-blue-200',
    '배정됨': 'bg-purple-50 text-purple-700 border-purple-200',
    '연락완료': 'bg-amber-50 text-amber-700 border-amber-200',
    '부적격': 'bg-rose-50 text-rose-700 border-rose-200',
  };
  
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border", styles[status as keyof typeof styles] || styles['신규(New)'])}>
      {status}
    </span>
  );
}
