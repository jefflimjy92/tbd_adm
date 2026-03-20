import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  Search,
  Filter,
  MoreHorizontal,
  CreditCard,
  Calendar
} from 'lucide-react';
import clsx from 'clsx';

export function InsuranceMainView() {
  const [activeTab, setActiveTab] = useState('contracts');

  // Mock Data for Summary Cards
  const summaryCards = [
    { label: '전체 보험 계약', count: 22, color: 'bg-white', text: 'text-slate-800' },
    { label: '유효 계약', count: 7, color: 'bg-green-50', text: 'text-green-600' },
    { label: '직접 체결', count: 5, color: 'bg-blue-50', text: 'text-blue-600' },
    { label: '타인 체결', count: 2, color: 'bg-slate-50', text: 'text-slate-600' },
    { label: '유효하지 않음', count: 15, color: 'bg-orange-50', text: 'text-orange-600' },
  ];

  // Mock Data for Contracts Table
  const contracts = [
    {
      contractor: '임준영',
      product: '운전자보험',
      company: '삼성화재',
      period: '03년',
      premium: '287,240원',
      status: '정상',
      dateRange: '2025.07.11 ~ 2028.07.11'
    },
    {
      contractor: '삼*****',
      product: '삼성 5대재해골절보장보험(2404)(무배당)',
      company: '삼성생명',
      period: '00년',
      premium: '1,800원',
      status: '정상',
      dateRange: '2025.01.08 ~ 2028.01.08'
    },
    {
      contractor: '임준영',
      product: '참좋은라이더+보험2204_TM',
      company: 'DB손해보험',
      period: '15년',
      premium: '18,800원',
      status: '정상',
      dateRange: '2022.04.29 ~ 2037.04.29'
    },
    {
      contractor: '임준영',
      product: '무배당 삼성화재 다이렉트 치아보험(2101.6)(자동갱신형)',
      company: '삼성화재',
      period: '10년',
      premium: '18,597원',
      status: '정상',
      dateRange: '2022.03.22 ~ 2032.03.22'
    },
    {
      contractor: '임준영',
      product: '무배당굿앤굿어린이스타종합보험(Hi2110)2종(해지환급금미지급형I)',
      company: '현대해상',
      period: '20년',
      premium: '130,240원',
      status: '정상',
      dateRange: '2021.11.19 ~ 2092.11.19'
    },
    {
      contractor: '전*자',
      product: '(무)수호천사 실속하나로암보험(순수보장형-실속형)',
      company: '동양생명',
      period: '30년',
      premium: '10,800원',
      status: '정상',
      dateRange: '2021.11.04 ~ 2051.11.04'
    },
    {
      contractor: '임준영',
      product: '무배당삼성화재 통합보험NEW수퍼플러스(1404)라이프+',
      company: '삼성화재',
      period: '20년',
      premium: '41,756원',
      status: '정상',
      dateRange: '2014.07.04 ~ 2092.07.04'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={clsx("p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-1 shadow-sm transition-transform hover:-translate-y-0.5", card.color)}>
             <span className="text-xs font-medium text-slate-500">{card.label}</span>
             <div className="flex items-baseline gap-1">
                <span className={clsx("text-2xl font-bold", card.text)}>{card.count}</span>
                <span className="text-xs text-slate-400">건</span>
             </div>
          </div>
        ))}
      </div>

      {/* 2. Tabs Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
           {[
             { id: 'contracts', label: '계약 현황 (Contracts)' },
             { id: 'payout', label: '지급 내역 (Payout History)' },
             { id: 'analysis', label: '보장 분석 (Analysis)' }
           ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "pb-3 text-sm font-bold border-b-2 transition-colors",
                  activeTab === tab.id 
                    ? "border-slate-800 text-slate-800" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                 {tab.label}
              </button>
           ))}
        </div>
      </div>

      {/* 3. Tab Content Area */}
      <div className="min-h-[400px]">
         {activeTab === 'contracts' && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
               {/* Table Toolbar */}
               <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="text-slate-400" size={18} />
                     <h3 className="font-bold text-slate-700 text-sm">정액형 보장 정보</h3>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                        <Search size={16} />
                     </button>
                     <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                        <Filter size={16} />
                     </button>
                  </div>
               </div>

               {/* Table */}
               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                     <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                           <th className="px-5 py-3 font-medium">계약자</th>
                           <th className="px-5 py-3 font-medium w-1/3">상품명</th>
                           <th className="px-5 py-3 font-medium">기간</th>
                           <th className="px-5 py-3 font-medium">납입금액</th>
                           <th className="px-5 py-3 font-medium text-center">상태</th>
                           <th className="px-5 py-3 font-medium">기간(시작~종료)</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {contracts.map((item, idx) => (
                           <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-4 text-slate-600">{item.contractor}</td>
                              <td className="px-5 py-4">
                                 <div className="font-bold text-slate-700 mb-0.5">{item.product}</div>
                                 <div className="text-xs text-slate-400">{item.company}</div>
                              </td>
                              <td className="px-5 py-4 text-slate-600">{item.period}</td>
                              <td className="px-5 py-4 font-mono font-medium text-slate-700">{item.premium}</td>
                              <td className="px-5 py-4 text-center">
                                 <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                    {item.status}
                                 </span>
                              </td>
                              <td className="px-5 py-4 font-mono text-xs text-slate-500">{item.dateRange}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         )}

         {activeTab === 'payout' && (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500">
               <CreditCard size={48} className="mb-4 text-slate-300" />
               <p className="font-medium">지급 내역 데이터가 없습니다.</p>
               <p className="text-xs text-slate-400 mt-1">보험금 지급 내역이 연동되면 이곳에 표시됩니다.</p>
            </div>
         )}

         {activeTab === 'analysis' && (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500">
               <Calendar size={48} className="mb-4 text-slate-300" />
               <p className="font-medium">보장 분석 리포트 준비중</p>
               <p className="text-xs text-slate-400 mt-1">AI 보장 분석이 진행 중입니다.</p>
            </div>
         )}
      </div>
    </div>
  );
}
