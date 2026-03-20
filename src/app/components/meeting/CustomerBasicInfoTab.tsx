import React from 'react';
import { MapPin, Clock, User, Phone, Briefcase, Heart, Shield, MessageSquare, Users } from 'lucide-react';
import clsx from 'clsx';

interface CustomerBasicInfoTabProps {
  // Meeting info
  item: any;
  // Customer profile summary props
  customerProfileProps: any;
  // Contract info props
  contractInfoProps: any;
  // Customer input props
  customerInputProps: any;
  // 상담팀 확인사항
  consultationCheckData: {
    disposition: string;
    trustLevel: string;
    bestTime: string;
    decisionMaker: string;
    traitNote: string;
    companion: string;
    insuranceType: string;
    monthlyPremium: string;
    paymentStatus: string;
    contractor: string;
    joinPath: string;
    trafficAccident: string;
    surgery: string;
    criticalDisease: string;
    medication: string;
  };
  // Component renderers (to avoid importing heavy components)
  renderProfileSummary: () => React.ReactNode;
  renderContractInfo: () => React.ReactNode;
  renderCustomerInput: () => React.ReactNode;
  renderHealthCheck?: () => React.ReactNode;
}

export function CustomerBasicInfoTab({
  item,
  consultationCheckData,
  renderProfileSummary,
  renderContractInfo,
  renderCustomerInput,
  renderHealthCheck,
}: CustomerBasicInfoTabProps) {
  return (
    <div className="space-y-6">
      {/* Meeting Info Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">미팅 장소</div>
              <div className="font-bold text-slate-700 text-sm">{item.location}</div>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">미팅 시간</div>
              <div className="font-bold text-slate-700 text-sm">{item.date}</div>
            </div>
          </div>
        </div>
        <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded transition-colors">
          수정하기
        </button>
      </div>

      {/* Customer Profile Summary */}
      {renderProfileSummary()}

      {/* 상담팀 확인사항 */}
      <ConsultationCheckCard data={consultationCheckData} />

      {/* Health Check Section */}
      {renderHealthCheck && renderHealthCheck()}

      {/* Customer Input Section */}
      {renderCustomerInput()}

      {/* Contract Info Section */}
      {renderContractInfo()}
    </div>
  );
}

// 상담팀 확인사항 읽기전용 카드
function ConsultationCheckCard({ data }: { data: CustomerBasicInfoTabProps['consultationCheckData'] }) {
  const traitRows = [
    {
      label: '성향',
      options: ['긍정적', '중립적', '부정적'],
      selected: data.disposition ? `${data.disposition}적` : '',
    },
    {
      label: '신뢰도',
      options: ['형성', '보통', '의심'],
      selected: data.trustLevel || '',
    },
  ];

  const preferredTimeValue = data.bestTime || '-';
  const bestTimeDisplay = preferredTimeValue === '무관' ? '무관' : preferredTimeValue === '-' ? '-' : '있음';
  const bestTimeDetail = preferredTimeValue !== '-' && preferredTimeValue !== '무관' ? preferredTimeValue : '';

  const checkItems = [
    { label: '보험 종류', value: data.insuranceType, icon: <Shield size={14} /> },
    { label: '월 보험료', value: data.monthlyPremium ? `${data.monthlyPremium}만원` : '-', icon: <Briefcase size={14} /> },
    { label: '납입 상태', value: data.paymentStatus || '-', icon: <Briefcase size={14} /> },
    { label: '계약자', value: data.contractor || '-', icon: <User size={14} /> },
    { label: '가입 경로', value: data.joinPath || '-', icon: <Briefcase size={14} /> },
    { label: '교통사고(3년)', value: data.trafficAccident || '-', icon: <Heart size={14} /> },
    { label: '수술/시술', value: data.surgery || '-', icon: <Heart size={14} /> },
    { label: '중대질환', value: data.criticalDisease || '-', icon: <Heart size={14} /> },
    { label: '복용 약물', value: data.medication || '-', icon: <Heart size={14} /> },
    { label: '동행자', value: data.companion || '-', icon: <User size={14} /> },
    { label: '선호 시간', value: preferredTimeValue, icon: <Phone size={14} /> },
    { label: '결정 권한', value: data.decisionMaker || '-', icon: <User size={14} /> },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <MessageSquare size={18} className="text-emerald-600" />
        <h3 className="font-bold text-sm text-slate-800">상담팀 확인사항</h3>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full ml-auto">읽기전용</span>
      </div>

      <div className="p-4 border-b border-slate-100 bg-slate-50/70">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Users size={16} />
            <h4 className="text-sm font-bold">고객 특이사항 (TRAITS)</h4>
          </div>

          <div className="mt-4 space-y-3">
            {traitRows.map((row) => (
              <div key={row.label} className="grid gap-3 sm:grid-cols-[84px_minmax(0,1fr)] sm:items-center">
                <span className="text-sm font-bold text-slate-500">{row.label}</span>
                <div className={clsx(
                  "grid gap-2",
                  row.options.length === 3 ? "grid-cols-3" : "grid-cols-2",
                )}>
                  {row.options.map((option) => {
                    const isActive = row.selected === option;

                    return (
                      <div
                        key={option}
                        className={clsx(
                          "rounded-xl border px-4 py-3 text-center text-sm font-bold transition-colors",
                          isActive
                            ? "border-slate-300 bg-slate-200 text-slate-800"
                            : "border-slate-200 bg-white text-slate-300",
                        )}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="grid gap-3 sm:grid-cols-[84px_minmax(0,1fr)] sm:items-start">
              <span className="pt-3 text-sm font-bold text-slate-500">선호 시간</span>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {['무관', '있음'].map((option) => {
                    const isActive = bestTimeDisplay === option;

                    return (
                      <div
                        key={option}
                        className={clsx(
                          "rounded-xl border px-4 py-3 text-center text-sm font-bold transition-colors",
                          isActive
                            ? "border-indigo-200 bg-indigo-100 text-indigo-700"
                            : "border-slate-200 bg-white text-slate-300",
                        )}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
                {bestTimeDetail ? (
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
                    {bestTimeDetail}
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-400">
                    {preferredTimeValue}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[84px_minmax(0,1fr)] sm:items-center">
              <span className="text-sm font-bold text-slate-500">결정 권한</span>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                {data.decisionMaker || '-'}
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 min-h-[104px]">
              {data.traitNote || '기록된 특이사항 메모가 없습니다.'}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-b border-slate-100">
        <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">상담팀 체크 정보</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {checkItems.map((item, i) => (
          <div key={i} className={clsx(
            "px-4 py-3 flex items-start gap-2 border-b border-r border-slate-50",
            i % 2 === 1 && "sm:border-r-0 lg:border-r",
            i % 3 === 2 && "lg:border-r-0"
          )}>
            <span className="text-slate-400 mt-0.5 shrink-0">{item.icon}</span>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</div>
              <div className="text-sm text-slate-700 font-medium truncate">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
