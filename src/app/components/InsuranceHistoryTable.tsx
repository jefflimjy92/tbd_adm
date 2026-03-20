import React, { useMemo } from 'react';
import { Search, AlertCircle, Tag } from 'lucide-react';
import clsx from 'clsx';

// --- Interfaces & Types ---
interface AnalyzedEpisode {
  no: string;
  date: string;
  hospital: string;
  dept: string;
  type: string;
  category: string;
  code: string;
  diagnosis: string;
  costHira: number;
  costHometax: number;
  claimableSalary: number;
  claimableNonSalary: number;
  detectedKeywords: string[];
  status: 'READY' | 'WARNING' | 'EXCLUDED' | 'COMPLETED';
  statusMessage: string;
  isMismatch: boolean;
}

// --- Constants ---
const DETECTION_KEYWORDS = ['골절', '파절', '입원', '응급', '신생물', '용종', '폴립'];

const RAW_DATA_STRING = `1	20251025	365팔팔한의원	한방안·이비인후·피부과	외래	실손(외래/한방)	BH931	(한방)이명	17,000원		34,000원
2	20250909	포도약국	일반의	외래	-	AJ209	(양방)상세불명의 급성 기관지염	5,600원		11,200원
3	20250909	참좋은이비인후과의원	이비인후과	외래	실손(외래/양방)	AJ209	(양방)상세불명의 급성 기관지염	10,100원		10,100원
4	20250812	포도약국	일반의	외래	-	AH901	(양방)한쪽 전음성 청력소실, 반대편 청력은 정상	3,500원		7,000원
5	20250812	참좋은이비인후과의원	이비인후과	외래	실손(외래/양방)	AH901	(양방)한쪽 전음성 청력소실, 반대편 청력은 정상	56,000원		56,000원
6	20250721	포도약국	일반의	외래	-	AJ0390	(양방)재발성으로 명시되어 있지 않은 상세불명의 급성 편도염	5,900원		11,800원
7	20250721	참좋은이비인후과의원	이비인후과	외래	실손(외래/양방)	AJ209	(양방)상세불명의 급성 기관지염	20,900원		20,900원
8	20250429	참좋은이비인후과의원	이비인후과	외래	실손(외래/양방)	AJ219	(양방)상세불명의 급성 세기관지염	3,900원		3,900원
9	20250429	포도약국	일반의	외래	-	AJ209	(양방)상세불명의 급성 기관지염	5,200원		10,400원
10	20250423	참좋은이비인후과의원	이비인후과	외래	실손(외래/양방)	AJ219	(양방)상세불명의 급성 세기관지염	9,600원		9,600원`;

// --- Helpers ---
const parseCurrency = (value: string): number => {
  if (!value) return 0;
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
};

const formatCurrency = (value: number): string => {
  return value.toLocaleString() + '원';
};

const analyzeData = (rawString: string): AnalyzedEpisode[] => {
  const lines = rawString.trim().split('\n');
  
  return lines.map(line => {
    const parts = line.split(/\t/);
    
    const rawDate = parts[1].trim();
    const date = rawDate.length === 8 
      ? `${rawDate.substring(0,4)}.${rawDate.substring(4,6)}.${rawDate.substring(6,8)}`
      : rawDate;
      
    const hospital = parts[2].trim();
    const diagnosis = parts[7].trim();
    const costHira = parseCurrency(parts[8].trim());
    const costHometax = parseCurrency(parts[9]?.trim());

    let claimableSalary = 0;
    let claimableNonSalary = 0;
    let isMismatch = false;

    if (costHira > 0) {
      if (costHometax === 0) {
        claimableSalary = costHira;
        claimableNonSalary = 0;
        isMismatch = true;
      } else if (costHira <= costHometax) {
        claimableSalary = costHira;
        claimableNonSalary = costHometax - costHira;
      } else {
        claimableSalary = costHira;
        claimableNonSalary = 0;
        isMismatch = true;
      }
    } else {
      claimableNonSalary = costHometax;
    }

    const detectedKeywords = DETECTION_KEYWORDS.filter(keyword => 
      diagnosis.includes(keyword)
    );

    let status: 'READY' | 'WARNING' | 'EXCLUDED' | 'COMPLETED' = 'READY';
    let statusMessage = '미청구';

    if (costHira === 0 && costHometax > 0) {
      status = 'WARNING';
      statusMessage = '심평원 누락';
    } else if (costHira > 0 && costHometax === 0) {
      status = 'WARNING';
      statusMessage = '결제내역 없음';
    } else if (isMismatch && costHira > costHometax) {
      status = 'WARNING';
      statusMessage = '금액 역전';
    }

    return {
      no: parts[0].trim(),
      date,
      hospital,
      dept: parts[3].trim(),
      type: parts[4].trim(),
      category: parts[5].trim(),
      code: parts[6].trim(),
      diagnosis,
      costHira,
      costHometax,
      claimableSalary,
      claimableNonSalary,
      detectedKeywords,
      status,
      statusMessage,
      isMismatch
    };
  });
};

export function InsuranceHistoryTable() {
  const analyzedData = useMemo(() => analyzeData(RAW_DATA_STRING), []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
       {/* Toolbar */}
       <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
             <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Search size={16} className="text-slate-400"/>
                3년 미청구 환급 분석
             </h2>
             <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                총 {analyzedData.length}건
             </span>
          </div>
       </div>

       {/* Table */}
       <div className="overflow-x-auto relative custom-scrollbar">
          <table className="w-full text-xs text-left border-collapse min-w-[800px]">
             <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 whitespace-nowrap">
                <tr>
                   <th className="px-3 py-2 w-20 pl-4">방문일자</th>
                   <th className="px-3 py-2 w-32">병원/약국</th>
                   <th className="px-3 py-2">상병명 (진단)</th>
                   
                   <th className="px-3 py-2 text-right bg-slate-100/50 border-l border-slate-200 w-24">
                      <span className="text-slate-400 font-normal block text-[9px]">심평원</span>
                      본인부담금
                   </th>
                   <th className="px-3 py-2 text-right bg-slate-100/50 w-24 border-r border-slate-200">
                      <span className="text-slate-400 font-normal block text-[9px]">국세청</span>
                      결제내역
                   </th>

                   <th className="px-3 py-2 text-right bg-blue-50/30 w-24 text-blue-900">
                      급여 청구액
                   </th>
                   <th className="px-3 py-2 text-right bg-purple-50/30 w-24 text-purple-900 border-r border-slate-200">
                      비급여 청구액
                   </th>

                   <th className="px-3 py-2 text-center w-20">상태</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {analyzedData.map((item, idx) => (
                   <tr key={`${item.no}-${idx}`} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 pl-4 font-mono text-slate-500 align-top">
                         {item.date}
                      </td>
                      <td className="px-3 py-2 align-top">
                         <div className="font-bold text-slate-700 truncate max-w-[120px]" title={item.hospital}>{item.hospital}</div>
                         <div className="text-[9px] text-slate-400 mt-0.5">{item.category}</div>
                      </td>
                      <td className="px-3 py-2 align-top">
                         <div className="text-slate-700 mb-1 flex flex-wrap gap-1 items-center">
                            <span className="truncate max-w-[150px]" title={item.diagnosis}>{item.diagnosis}</span>
                            {item.code && <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">{item.code}</span>}
                         </div>
                         {item.detectedKeywords.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                               {item.detectedKeywords.map((k, i) => (
                                  <span key={i} className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-orange-100 text-orange-700 text-[9px] font-bold border border-orange-200">
                                     <Tag size={8} /> {k}
                                  </span>
                               ))}
                            </div>
                         )}
                      </td>

                      <td className="px-3 py-2 text-right font-mono text-slate-600 bg-slate-50/30 border-l border-slate-100 align-top">
                         {item.costHira > 0 ? formatCurrency(item.costHira) : <span className="text-slate-300">-</span>}
                      </td>
                      <td className={clsx(
                         "px-3 py-2 text-right font-mono bg-slate-50/30 border-r border-slate-100 align-top",
                         item.isMismatch ? "text-red-500 font-bold" : "text-slate-600"
                      )}>
                         {item.costHometax > 0 ? formatCurrency(item.costHometax) : <span className="text-slate-300">-</span>}
                      </td>

                      <td className="px-3 py-2 text-right font-mono font-bold text-blue-600 bg-blue-50/10 align-top">
                         {item.claimableSalary > 0 ? formatCurrency(item.claimableSalary) : <span className="text-slate-300">-</span>}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-purple-600 bg-purple-50/10 border-r border-slate-100 align-top">
                         {item.claimableNonSalary > 0 ? formatCurrency(item.claimableNonSalary) : <span className="text-slate-300">-</span>}
                      </td>

                      <td className="px-3 py-2 text-center align-top">
                         {item.status === 'READY' ? (
                            <button className="px-1.5 py-0.5 rounded bg-slate-800 text-white text-[9px] font-bold hover:bg-slate-700 transition-colors w-full">
                               미청구
                            </button>
                         ) : item.status === 'WARNING' ? (
                            <button className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200 text-[9px] font-bold hover:bg-amber-200 transition-colors w-full flex items-center justify-center gap-1">
                               <AlertCircle size={8} />
                               {item.statusMessage}
                            </button>
                         ) : (
                            <span className="text-slate-400 text-[9px]">-</span>
                         )}
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}
