import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Search,
  Tag,
  Lightbulb,
  ArrowRight,
  CreditCard,
  FileText
} from 'lucide-react';
import clsx from 'clsx';

// --- Interfaces & Types ---

interface AnalyzedEpisode {
  no: string;
  date: string;
  hospital: string;
  dept: string;
  type: string;
  days: string; // 일수
  category: string; // 5대분류
  code: string;
  diagnosis: string;
  
  // 금액 정보
  costTotal: number;    // 총진료비
  costSalary: number;   // 급여금액
  costSelf: number;     // 본인부담(심평원)
  costHometax: number;  // 홈택스
  costHealth: number;   // 건보

  // 분석 결과
  status: string;       // 상태
  reason: string;       // 청구근거 / 제외사유
  
  detectedKeywords: string[];
}

interface ContractInfo {
  company: string;
  product: string;
  coverages: { name: string; amount: string }[];
}

// --- Constants ---

const INDEMNITY_SPECS = {
  title: "실손 현황",
  subtitle: "2세대 실손 (2009.10~2017.3)",
  hospitalizationRate: "90%",
  deductibleClinic: "10,000원",
  deductibleHospital: "15,000원",
  deductibleGeneral: "20,000원",
  features: [
    "판매시기: 2009.8~2017.3",
    "선택형 10% / 표준형 20% 본인부담",
    "통원 공제: 의원 1만원, 병원 1.5만원, 상급종합 2만원",
    "처방 공제: 8천원",
    "치과/정신과/안경 제외"
  ]
};

const FIXED_CONTRACTS: ContractInfo[] = [
  {
    company: "카카오페이손해보험",
    product: "해외여행보험",
    coverages: [
      { name: "해외여행중 질병사망 및 질병 80%이상 고도후유장해", amount: "50,000,000" },
      { name: "해외여행중 상해사망", amount: "300,000,000" },
      { name: "해외여행중 상해후유장해", amount: "300,000,000" },
      { name: "해외여행중 특정전염병 감염", amount: "300,000" },
      { name: "해외여행중 식중독 입원", amount: "300,000" },
      { name: "항공기납치", amount: "1,400,000" }
    ]
  },
  {
    company: "메리츠화재보험",
    product: "(무) 메리츠 운전자보험 M-Drive2401",
    coverages: [
      { name: "운전자용 교통상해사망", amount: "20,000,000" },
      { name: "대중교통이용중 교통상해사망", amount: "100,000,000" },
      { name: "일반상해후유장해(3~100%)", amount: "20,000,000" },
      { name: "골절(치아파절제외) 진단비Ⅱ", amount: "200,000" },
      { name: "상해흉터복원수술비", amount: "5,000,000" },
      { name: "인공관절수술비", amount: "500,000" },
      { name: "자동차사고성형수술비", amount: "1,000,000" },
      { name: "운전자용 자동차사고부상치료비(1~5급)[기본계약]", amount: "3,000,000" }
    ]
  },
  {
    company: "흥국화재해상보험",
    product: "무배당 행복을 多주는 가족사랑통합보험(1404)",
    coverages: [
      { name: "일반상해사망", amount: "80,000,000" },
      { name: "뇌졸중진단비", amount: "10,000,000" },
      { name: "급성심근경색증진단비", amount: "10,000,000" },
      { name: "암진단비", amount: "50,000,000" },
      { name: "고액치료비암진단비", amount: "50,000,000" },
      { name: "암수술비Ⅱ", amount: "2,000,000" },
      { name: "암직접치료입원비(4일-120일)", amount: "100,000" }
    ]
  },
    {
    company: "메리츠화재보험",
    product: "무배당 알파Plus보장보험1204",
    coverages: [
      { name: "질병사망,고도후유장해", amount: "5,000,000" },
      { name: "일반상해사망", amount: "20,000,000" },
      { name: "7대질병수술비", amount: "2,000,000" },
      { name: "상해수술비", amount: "300,000" },
      { name: "조혈모세포이식수술비", amount: "20,000,000" },
      { name: "5대장기이식수술비", amount: "20,000,000" }
    ]
  }
];

const DETECTION_KEYWORDS = ['골절', '파절', '입원', '응급', '신생물', '용종', '폴립'];

// Index | Date | Hospital | Dept | Type | Days | Category | Code | Diagnosis | Total | Salary | Self | Hometax | Health | Status | Reason
const RAW_DATA_STRING = `1	20251125	서울올럽피부과의원	피부과	외래	1	-	AL5080	(양방)만성 두드러기	22,800	16,000	6,800	6,800	6,800	청구가능	2세대: 6,800원 - 10,000원 × 90% = 0원
2	20251125	건국약국	일반의	외래	1	-	AL5080	(양방)만성 두드러기	22,200	15,600	6,600	13,200	13,200	청구가능	2세대: 13,200원 - 8,000원 × 90% = 4,680원
3	20251105	안녕이비인후과의원	이비인후과	외래	1	-	AJ0390	(양방)재발성으로 명시되어 있지 않은 상세불명...	22,210	15,610	6,600	-	6,600	청구가능	2세대: 6,600원 - 10,000원 × 90% = 0원
4	20251105	셑메드 오늘약국	일반의	외래	1	-	-	해당없음	61,640	43,240	18,400	36,800	36,800	청구가능	2세대: 36,800원 - 8,000원 × 90% = 25,920원
5	20251015	포도약국	일반의	외래	1	-	AJ0390	(양방)재발성으로 명시되어 있지 않은 상세불명...	22,200	15,600	6,600	6,600	6,600	미청구	2세대: 6,600원 - 8,000원 × 90% = 0원
6	20251015	참좋은이비인후과의원	이비인후과	외래	1	-	AJ209	(양방)상세불명의 급성 기관지염	10,900	7,900	3,000	3,000	3,000	미청구	2세대: 3,000원 - 10,000원 × 90% = 0원`;

// --- Helpers ---

const parseCurrency = (value: string): number => {
  if (!value || value === '-') return 0;
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
};

const formatCurrency = (value: number): string => {
  return value.toLocaleString() + '원';
};

const analyzeData = (rawString: string): AnalyzedEpisode[] => {
  const lines = rawString.trim().split('\n');
  
  return lines.map(line => {
    const parts = line.split(/\t/);
    
    // 파싱
    const rawDate = parts[1]?.trim() || '';
    const date = rawDate.length === 8 
      ? `${rawDate.substring(0,4)}.${rawDate.substring(4,6)}.${rawDate.substring(6,8)}`
      : rawDate;
      
    const diagnosis = parts[8]?.trim() || '';
    
    const detectedKeywords = DETECTION_KEYWORDS.filter(keyword => 
      diagnosis.includes(keyword)
    );

    return {
      no: parts[0]?.trim() || '',
      date,
      hospital: parts[2]?.trim() || '',
      dept: parts[3]?.trim() || '',
      type: parts[4]?.trim() || '',
      days: parts[5]?.trim() || '1',
      category: parts[6]?.trim() || '-',
      code: parts[7]?.trim() || '',
      diagnosis,
      
      costTotal: parseCurrency(parts[9]),
      costSalary: parseCurrency(parts[10]),
      costSelf: parseCurrency(parts[11]),
      costHometax: parseCurrency(parts[12]),
      costHealth: parseCurrency(parts[13]),
      
      status: parts[14]?.trim() || '',
      reason: parts[15]?.trim() || '',
      
      detectedKeywords
    };
  });
};

export function UnclaimedAnalysisView() {
  const [indemnityExpanded, setIndemnityExpanded] = useState(false);
  
  // 데이터 분석 수행
  const analyzedData = useMemo(() => analyzeData(RAW_DATA_STRING), []);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
      
        {/* 1. 보험 가입 현황 (Collapsible) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div 
            className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => setIndemnityExpanded(!indemnityExpanded)}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-slate-600" size={18} />
              <h2 className="font-bold text-slate-800 text-sm">실손 및 보험 가입 현황</h2>
              <span className="text-xs text-slate-500 font-medium ml-2">2세대 실손 보유 · 정액담보 4건</span>
            </div>
            {indemnityExpanded ? <ChevronUp className="text-slate-400" size={18} /> : <ChevronDown className="text-slate-400" size={18} />}
          </div>
          
          {indemnityExpanded && (
          <div className="p-5 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
            {/* 실손 스펙 */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-emerald-800 bg-emerald-50 inline-block px-2 py-1 rounded mb-3 border border-emerald-100">
                실손 상세 스펙 (2009.10~2017.03)
              </h3>
              <div className="grid grid-cols-4 gap-4 mb-4 text-center">
                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">입원 보장률</div>
                  <div className="text-lg font-bold text-emerald-600">{INDEMNITY_SPECS.hospitalizationRate}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">통원 공제(의원)</div>
                  <div className="text-lg font-bold text-slate-700">{INDEMNITY_SPECS.deductibleClinic}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">통원 공제(병원)</div>
                  <div className="text-lg font-bold text-slate-700">{INDEMNITY_SPECS.deductibleHospital}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">통원 공제(상급)</div>
                  <div className="text-lg font-bold text-slate-700">{INDEMNITY_SPECS.deductibleGeneral}</div>
                </div>
              </div>
            </div>

            {/* 정액 담보 */}
            <div>
              <h3 className="text-xs font-bold text-orange-800 bg-orange-50 inline-block px-2 py-1 rounded mb-3 border border-orange-100">
                주요 정액 담보 (종합보험)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {FIXED_CONTRACTS.slice(0, 2).map((contract, i) => (
                    <div key={i} className="border border-orange-100 bg-orange-50/30 rounded-lg p-3">
                       <div className="font-bold text-xs text-slate-500 mb-1">{contract.company}</div>
                       <div className="font-bold text-sm text-slate-800 mb-2">{contract.product}</div>
                       <div className="flex gap-2 flex-wrap">
                          {contract.coverages.slice(0,3).map((cov, j) => (
                             <span key={j} className="text-[10px] bg-white border border-orange-200 px-1.5 py-0.5 rounded text-slate-600">
                                {cov.name}
                             </span>
                          ))}
                          {contract.coverages.length > 3 && <span className="text-[10px] text-slate-400 self-center">+더보기</span>}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          </div>
          )}
        </div>

        {/* 2. 3년 환급 분석 테이블 (Compact & Combined) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
           {/* Toolbar */}
           <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2">
                 <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <Search size={20} className="text-slate-400"/>
                    3년 미청구 환급 분석
                 </h2>
                 <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    총 {analyzedData.length}건
                 </span>
              </div>
           </div>

           {/* Table */}
           <div className="flex-1 overflow-auto relative">
              <table className="w-full text-xs text-left border-collapse min-w-[1000px]">
                 <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 whitespace-nowrap sticky top-0 z-10 shadow-sm h-10">
                    <tr>
                       <th className="px-4 py-2 w-10 text-center"><input type="checkbox" /></th>
                       <th className="px-4 py-2 w-64">진료 정보</th>
                       <th className="px-4 py-2 w-64">상병 정보</th>
                       <th className="px-4 py-2 w-72">진료비 및 결제 내역</th>
                       <th className="px-4 py-2 w-auto">분석 결과 및 근거</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {analyzedData.map((item, idx) => (
                       <tr key={`${item.no}-${idx}`} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-4 py-4 text-center align-top"><input type="checkbox" className="mt-1" /></td>
                          
                          {/* 1. 진료 정보 (Combined) */}
                          <td className="px-4 py-4 align-top">
                             <div className="font-bold text-[#1e293b] text-sm mb-1">{item.hospital}</div>
                             <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                                <span>{item.date}</span>
                                <span className="w-px h-3 bg-slate-200"></span>
                                <span>{item.dept}</span>
                                <span className="w-px h-3 bg-slate-200"></span>
                                <span>{item.type}</span>
                             </div>
                             <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500 font-medium">
                                <FileText size={10} />
                                진료일수: {item.days}일
                             </div>
                          </td>

                          {/* 2. 상병 정보 (Combined) */}
                          <td className="px-4 py-4 align-top">
                             <div className="font-medium text-[#1e293b] mb-1.5 line-clamp-2" title={item.diagnosis}>
                                {item.diagnosis}
                             </div>
                             <div className="flex flex-wrap gap-1.5 items-center">
                                {item.code && (
                                   <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono border border-slate-200">
                                      {item.code}
                                   </span>
                                )}
                                <span className="text-[10px] text-slate-400">{item.category}</span>
                             </div>
                             {item.detectedKeywords.length > 0 && (
                                <div className="flex gap-1 flex-wrap mt-2">
                                   {item.detectedKeywords.map((k, i) => (
                                      <span key={i} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-bold border border-orange-100">
                                         <Tag size={10} /> {k}
                                      </span>
                                   ))}
                                </div>
                             )}
                          </td>

                          {/* 3. 진료비 및 결제 내역 (Compact Grid) */}
                          <td className="px-4 py-4 align-top">
                             <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-2 w-full max-w-[280px]">
                                {/* Primary Costs (Self & Hometax) */}
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200 border-dashed">
                                   <div className="flex flex-col">
                                      <span className="text-[10px] text-slate-400 mb-0.5">본인부담금 (심평원)</span>
                                      <span className="font-bold text-orange-600">{formatCurrency(item.costSelf)}</span>
                                   </div>
                                   <div className="flex flex-col items-end">
                                      <span className="text-[10px] text-slate-400 mb-0.5">홈택스 결제</span>
                                      <span className={clsx("font-bold", item.costHometax > 0 ? "text-blue-600" : "text-slate-300")}>
                                         {item.costHometax > 0 ? formatCurrency(item.costHometax) : '-'}
                                      </span>
                                   </div>
                                </div>
                                
                                {/* Secondary Costs (Total, Salary, Health) */}
                                <div className="grid grid-cols-3 gap-2 text-[10px]">
                                   <div>
                                      <div className="text-slate-400">총진료비</div>
                                      <div className="font-medium text-slate-700">{formatCurrency(item.costTotal)}</div>
                                   </div>
                                   <div className="text-center border-l border-slate-200 pl-2">
                                      <div className="text-slate-400">급여</div>
                                      <div className="font-medium text-slate-700">{formatCurrency(item.costSalary)}</div>
                                   </div>
                                   <div className="text-right border-l border-slate-200 pl-2">
                                      <div className="text-slate-400">건보공단</div>
                                      <div className="font-medium text-slate-700">{item.costHealth > 0 ? formatCurrency(item.costHealth) : '-'}</div>
                                   </div>
                                </div>
                             </div>
                          </td>

                          {/* 4. 분석 결과 (Combined Status & Reason) */}
                          <td className="px-4 py-4 align-top">
                             <div className="flex items-center gap-2 mb-2">
                                <span className={clsx(
                                   "px-2 py-0.5 rounded text-[11px] font-bold border",
                                   item.status.includes('청구가능') 
                                      ? "bg-amber-50 text-amber-700 border-amber-100" 
                                      : "bg-slate-100 text-slate-500 border-slate-200"
                                )}>
                                   {item.status}
                                </span>
                             </div>
                             <div className={clsx(
                                "text-[11px] leading-relaxed p-2 rounded-lg border",
                                item.status.includes('청구가능') 
                                   ? "bg-amber-50/50 border-amber-100 text-slate-700" 
                                   : "bg-slate-50 border-slate-100 text-slate-400"
                             )}>
                                <div className="flex gap-1.5">
                                   <Lightbulb size={14} className={clsx("shrink-0 mt-0.5", item.status.includes('청구가능') ? "text-amber-500" : "text-slate-300")} />
                                   <span>{item.reason}</span>
                                </div>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}