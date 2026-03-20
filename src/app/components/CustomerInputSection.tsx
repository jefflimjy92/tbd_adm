import { User } from 'lucide-react';
import { clsx } from 'clsx';

interface CustomerInputSectionProps {
  customer?: {
    name: string;
    phone: string;
    birth: string;
    address: string;
    job?: string;
    bankAccount?: string;
  };
  consultation?: {
    monthlyPremium?: string;
    insuranceType?: string; // e.g. "가입 (유)" or "미가입"
    utmSource?: string;
  };
}

export function CustomerInputSection({ customer, consultation }: CustomerInputSectionProps) {
  // Fallback data if no props provided (though props should be provided in context)
  const displayData = {
    name: customer?.name || "-",
    phone: customer?.phone || "-",
    idNumber: customer?.birth || "-",
    bankAccount: customer?.bankAccount || "정보 없음",
    region: customer?.address || "-",
    status: "진행 중",
    utmSource: consultation?.utmSource || "UTM없음",
    monthlyInsurance: consultation?.monthlyPremium ? `${consultation.monthlyPremium}만원` : "정보 없음",
    hasRealLossInsurance: consultation?.insuranceType || "-", // Logic can be improved
    job: customer?.job || "미입력"
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-sm text-[#1e293b] flex items-center gap-2">
          <User size={16} className="text-slate-500" />
          고객 입력 사항
        </h3>
      </div>

      {/* Content Grid */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {/* 고객명 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">고객명</span>
            <span className="text-sm font-bold text-[#1e293b]">{displayData.name}</span>
          </div>

          {/* 연락처 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">연락처</span>
            <span className="text-sm text-[#1e293b]">{displayData.phone}</span>
          </div>

          {/* 주민등록번호 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">주민등록번호</span>
            <span className="text-sm text-[#1e293b] font-mono">{displayData.idNumber}</span>
          </div>

          {/* 은행/계좌 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">은행/계좌</span>
            <span className="text-sm text-[#1e293b]">{displayData.bankAccount}</span>
          </div>

          {/* 지역 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">지역</span>
            <span className="text-sm text-[#1e293b]">{displayData.region}</span>
          </div>

          {/* 월 보험금액 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">월 보험금액</span>
            <span className="text-sm text-[#1e293b]">{displayData.monthlyInsurance}</span>
          </div>

          {/* 실손가입여부 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">실손가입여부</span>
            <span className={clsx(
               "inline-flex px-2 py-1 rounded text-xs font-bold border",
               displayData.hasRealLossInsurance.includes("유") || displayData.hasRealLossInsurance.includes("가입") || displayData.hasRealLossInsurance.includes("실손")
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-50 text-slate-500 border-slate-200"
            )}>
              {displayData.hasRealLossInsurance}
            </span>
          </div>

          {/* 직업 */}
          <div className="flex items-center">
            <span className="text-xs font-medium text-slate-500 w-28">직업</span>
            <span className="text-sm text-[#1e293b]">{displayData.job}</span>
          </div>
        </div>
      </div>
    </div>
  );
}