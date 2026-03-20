import { useState } from 'react';
import { 
  getGenderFromSSN, 
  getBirthDateFromSSN, 
  calculateKoreanAge, 
  calculateInsuranceAge, 
  formatRegion 
} from '@/app/utils/customerUtils';
import { X, Edit2 } from 'lucide-react';

interface CustomerProfileSummaryProps {
  customerName?: string;
  ssn?: string;
  address?: string;
  threeMonthHistory?: string;
  editable?: boolean;
  // 5. 계약자 피보험자 상이
  contractor?: string;
  // 6. 5년 이내 3대질환 병력
  criticalDisease?: string;
  criticalOptions?: string[];
  criticalDetail?: string;
  // 7. 설계사 관계
  designerRelation?: string;
  // 8. 보험가입금액/종류
  insuranceType?: string;
  monthlyPremium?: string;
  insuranceStatus?: string;
  // 9. 환급 가능 금액
  refundAmount?: string;
  // 가족 연동 수
  familyConnectionCount?: number;
  // 수술 이력
  surgery?: string;
  surgeryOptions?: string[];
  surgeryDetail?: string;
  // 결정권자 상태 연동
  decisionMaker?: string;
  onDecisionMakerChange?: (value: string) => void;
}

export function CustomerProfileSummary({
  customerName = "이영희",
  ssn = "921103-2******",
  address = "경기도 화성시 동탄대로 550",
  threeMonthHistory = "",
  editable = true,
  contractor = "본인/본인",
  criticalDisease = "없음",
  criticalOptions = [],
  criticalDetail = "",
  designerRelation = "선택 안함",
  insuranceType = "실손+종합",
  monthlyPremium = "",
  insuranceStatus = "있음",
  refundAmount = "150",
  familyConnectionCount = 0,
  surgery = "없음",
  surgeryOptions = [],
  surgeryDetail = "",
  decisionMaker = "-",
  onDecisionMakerChange,
}: CustomerProfileSummaryProps) {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCriticalModal, setShowCriticalModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSurgeryModal, setShowSurgeryModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // 수기 입력 필드 상태
  const [insuranceDispute, setInsuranceDispute] = useState("-");
  // decisionMaker 상태 제거 (Props로 이동)
  const [familyHistory, setFamilyHistory] = useState("-");
  const [maritalStatus, setMaritalStatus] = useState("-");
  const [insuranceCancellation, setInsuranceCancellation] = useState("-");
  const [legalServiceExperience, setLegalServiceExperience] = useState("-");
  
  // 추가 편집 가능 필드 상태
  const [editAge, setEditAge] = useState("-");
  const [editGender, setEditGender] = useState("-");
  const [editRegion, setEditRegion] = useState("-");
  const [editInsuranceType, setEditInsuranceType] = useState("-");
  const [editInsuranceAmount, setEditInsuranceAmount] = useState("-");
  const [editDesignerRelation, setEditDesignerRelation] = useState("-");
  const [editContractorDifference, setEditContractorDifference] = useState("-");
  const [editFamilyConnection, setEditFamilyConnection] = useState("0");
  const [editRefundableAmount, setEditRefundableAmount] = useState("-");
  const [editFiveYearHistory, setEditFiveYearHistory] = useState("-");
  const [editSurgeryHistory, setEditSurgeryHistory] = useState("-");
  const [editThreeMonthHistory, setEditThreeMonthHistory] = useState("-");
  
  // 계산된 값들
  const birthDate = getBirthDateFromSSN(ssn);
  const koreanAge = calculateKoreanAge(birthDate);
  const insuranceAge = calculateInsuranceAge(birthDate);
  const gender = getGenderFromSSN(ssn);
  const region = formatRegion(address);
  
  const ageDisplay = koreanAge > 0 ? `보험${insuranceAge}세 / 만${koreanAge}세` : '-';
  const historyDisplay = threeMonthHistory && threeMonthHistory.length > 20 
    ? `${threeMonthHistory.substring(0, 20)}...` 
    : threeMonthHistory || '-';
  
  const hasLongHistory = threeMonthHistory && threeMonthHistory.length > 20;

  // 5. 계약자 피보험자 상이 - "본인/본인"이면 "일치", 아니면 "상이"
  const contractorDisplay = contractor === "본인/본인" ? "일치" : contractor === "선택 안함" ? "-" : "상이";

  // 6. 5년 이내 3대질환 병력 - 있으면 옵션 표시, 길면 모달
  let criticalDisplay = "-";
  let hasCriticalHistory = false;
  if (criticalDisease === "있음") {
    if (criticalOptions && criticalOptions.length > 0) {
      const optionsText = criticalOptions.join(", ");
      hasCriticalHistory = optionsText.length > 15 || !!criticalDetail;
      criticalDisplay = optionsText.length > 15 ? `${optionsText.substring(0, 15)}...` : optionsText;
    } else if (criticalDetail) {
      hasCriticalHistory = criticalDetail.length > 15;
      criticalDisplay = criticalDetail.length > 15 ? `${criticalDetail.substring(0, 15)}...` : criticalDetail;
    } else {
      criticalDisplay = "있음";
    }
  }

  // 7. 설계사 관계 - "선택 안함"이면 "-"로 표시
  const designerDisplay = designerRelation === "선택 안함" ? "-" : designerRelation;

  // 8. 보험가입금액/종류 - 보험 상태에 따라 다르게 표시
  const insuranceAmountDisplay = insuranceStatus === "없음" ? "-" : monthlyPremium ? `${monthlyPremium}만원` : "-";
  const insuranceTypeDisplay = insuranceStatus === "없음" ? "-" : insuranceType;

  // 수술 이력 - 있으면 옵션 표시, 길면 모달
  let surgeryDisplay = "-";
  let hasSurgeryHistory = false;
  if (surgery === "있음") {
    if (surgeryOptions && surgeryOptions.length > 0) {
      const optionsText = surgeryOptions.join(", ");
      hasSurgeryHistory = optionsText.length > 15 || !!surgeryDetail;
      surgeryDisplay = optionsText.length > 15 ? `${optionsText.substring(0, 15)}...` : optionsText;
    } else if (surgeryDetail) {
      hasSurgeryHistory = surgeryDetail.length > 15;
      surgeryDisplay = surgeryDetail.length > 15 ? `${surgeryDetail.substring(0, 15)}...` : surgeryDetail;
    } else {
      surgeryDisplay = "있음";
    }
  }
  
  const profileData = {
    age: ageDisplay,
    gender: gender,
    region: region,
    threeMonthHistory: historyDisplay,
    contractorDifference: contractorDisplay,
    fiveYearHistory: criticalDisplay,
    designerRelation: designerDisplay,
    insuranceAmount: insuranceAmountDisplay,
    insuranceType: insuranceTypeDisplay,
    refundableAmount: `${refundAmount}만원`,
    insuranceDispute: insuranceDispute,
    decisionMaker: decisionMaker,
    familyConnection: `${familyConnectionCount}명`,
    familyHistory: familyHistory,
    maritalStatus: maritalStatus,
    insuranceCancellation: insuranceCancellation,
    surgeryHistory: surgeryDisplay,
    legalServiceExperience: legalServiceExperience
  };

  const fields = [
    { label: "나이", value: profileData.age, bold: true, editable: true, fieldKey: "age" },
    { label: "성별", value: profileData.gender, bold: true, editable: true, fieldKey: "gender" },
    { label: "지역", value: profileData.region, bold: true, editable: true, fieldKey: "region" },
    { label: "보험가입 종류", value: profileData.insuranceType, bold: true, editable: true, fieldKey: "insuranceType" },
    { label: "보험가입금액", value: profileData.insuranceAmount, bold: true, editable: true, fieldKey: "insuranceAmount" },
    { label: "설계사 관계", value: profileData.designerRelation, bold: true, editable: true, fieldKey: "designerRelation" },
    
    { label: "계약자 피보험자 상이", value: profileData.contractorDifference, bold: true, editable: true, fieldKey: "contractorDifference" },
    { label: "결정권자 여부", value: profileData.decisionMaker, bold: true, editable: true, fieldKey: "decisionMaker" },
    { label: "가족 연동 수", value: profileData.familyConnection, bold: true, editable: true, fieldKey: "familyConnection" },
    { label: "혼인여부", value: profileData.maritalStatus, bold: true, editable: true, fieldKey: "maritalStatus" },
    { label: "가족력", value: profileData.familyHistory, bold: true, editable: true, fieldKey: "familyHistory" },
    { label: "환급 가능 금액", value: profileData.refundableAmount, bold: true, editable: true, fieldKey: "refundableAmount" },
    
    { label: "5년 이내 3대질환 병력", value: profileData.fiveYearHistory, bold: true, editable: true, fieldKey: "fiveYearHistory", clickable: hasCriticalHistory, onClick: () => setShowCriticalModal(true) },
    { label: "시술/수술 이력", value: profileData.surgeryHistory, bold: true, editable: true, fieldKey: "surgeryHistory", clickable: hasSurgeryHistory, onClick: () => setShowSurgeryModal(true) },
    { label: "3개월 내 병력", value: profileData.threeMonthHistory, bold: true, editable: true, fieldKey: "threeMonthHistory", clickable: hasLongHistory, onClick: () => setShowHistoryModal(true) },
    { label: "보험 해지이력", value: profileData.insuranceCancellation, bold: true, editable: true, fieldKey: "insuranceCancellation" },
    { label: "보험분쟁 유무", value: profileData.insuranceDispute, bold: true, editable: true, fieldKey: "insuranceDispute" },
    { label: "법률 서비스 경험 유무", value: profileData.legalServiceExperience, bold: true, editable: true, fieldKey: "legalServiceExperience" },
  ];

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1e293b] flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
            </svg>
            고객 프로필 요약
          </h3>
          {editable && (
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`transition-colors flex items-center gap-1 px-2 py-1 rounded ${
                isEditMode 
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Edit2 size={14} />
              <span className="text-xs font-medium">{isEditMode ? '완료' : '수정하기'}</span>
            </button>
          )}
        </div>

        {/* Content Grid */}
        <div className="p-5">
          <div className="bg-[#f8fafc] rounded-lg border border-slate-200 p-4">
            <div className="grid grid-cols-6 gap-x-4 gap-y-3">
              {fields.map((field, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-[10px] font-medium text-slate-500 mb-1 tracking-wide">
                    {field.label}
                  </span>
                  {editable && isEditMode && field.editable ? (
                    <button
                      onClick={() => {
                        setEditingField(field.fieldKey || null);
                        setShowEditModal(true);
                      }}
                      className={`text-xs text-left ${field.bold ? 'font-bold' : ''} cursor-pointer px-2 py-1.5 -mx-2 -my-1 rounded transition-colors text-slate-700 bg-white border border-slate-200 hover:border-slate-400 hover:text-slate-900`}
                    >
                      {field.value}
                    </button>
                  ) : field.clickable && !isEditMode ? (
                    <button
                      onClick={field.onClick}
                      className={`text-xs text-left ${field.bold ? 'font-bold text-[#314158]' : 'text-[#314158]'} hover:text-blue-600 underline cursor-pointer`}
                    >
                      {field.value}
                    </button>
                  ) : (
                    <span className={`text-xs ${field.bold ? 'font-bold text-[#314158]' : 'text-[#314158]'}`}>
                      {field.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3개월 내 병력 모달 */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-lg text-[#1e293b]">3개월 내 병력 상세</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {threeMonthHistory || '기록된 병력이 없습니다.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 bg-[#0f766e] text-white rounded-lg hover:bg-[#0d6560] transition-colors font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5년 이내 3대질환 병력 모달 */}
      {showCriticalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-lg text-[#1e293b]">5년 이내 3대질환 병력 상세</h3>
              <button
                onClick={() => setShowCriticalModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {criticalDetail || '기록된 병력이 없습니다.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setShowCriticalModal(false)}
                className="px-4 py-2 bg-[#0f766e] text-white rounded-lg hover:bg-[#0d6560] transition-colors font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 수술 이력 모달 */}
      {showSurgeryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-lg text-[#1e293b]">수술 이력 상세</h3>
              <button
                onClick={() => setShowSurgeryModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {surgeryDetail || '기록된 수술 이력이 없습니다.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setShowSurgeryModal(false)}
                className="px-4 py-2 bg-[#0f766e] text-white rounded-lg hover:bg-[#0d6560] transition-colors font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 수기입력 편집 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-slate-50">
              <div>
                <h3 className="font-bold text-lg text-[#1e293b] flex items-center gap-2">
                  <Edit2 size={18} className="text-blue-600" />
                  고객 프로필 수기 입력
                </h3>
                <p className="text-xs text-slate-500 mt-1">추가 정보를 직접 입력하여 프로필을 완성하세요</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                {/* 나이 */}
                {editingField === "age" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      나이
                    </label>
                    <input
                      type="text"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      placeholder="예: 보험32세 / 만31세"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 성별 */}
                {editingField === "gender" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      성별
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['-', '남', '여'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setEditGender(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            editGender === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 지역 */}
                {editingField === "region" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      지역
                    </label>
                    <input
                      type="text"
                      value={editRegion}
                      onChange={(e) => setEditRegion(e.target.value)}
                      placeholder="예: 경기 화성"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 보험가입 종류 */}
                {editingField === "insuranceType" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      보험가입 종류
                    </label>
                    <input
                      type="text"
                      value={editInsuranceType}
                      onChange={(e) => setEditInsuranceType(e.target.value)}
                      placeholder="예: 실손+종합"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 보험가입금액 */}
                {editingField === "insuranceAmount" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      보험가입금액
                    </label>
                    <input
                      type="text"
                      value={editInsuranceAmount}
                      onChange={(e) => setEditInsuranceAmount(e.target.value)}
                      placeholder="예: 50만원"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 설계사 관계 */}
                {editingField === "designerRelation" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      설계사 관계
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['-', '지인', '친척', '가족', '기타'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setEditDesignerRelation(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            editDesignerRelation === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 계약자 피보험자 상이 */}
                {editingField === "contractorDifference" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      계약자 피보험자 상이
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['-', '일치', '상이'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setEditContractorDifference(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            editContractorDifference === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 결정권자 여부 */}
                {editingField === "decisionMaker" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      결정권자 여부
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['-', '본인', '배우자', '부모', '자녀', '기타'].map((option) => (
                        <button
                          key={option}
                          onClick={() => onDecisionMakerChange && onDecisionMakerChange(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            decisionMaker === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 가족 연동 수 */}
                {editingField === "familyConnection" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      가족 연동 수
                    </label>
                    <input
                      type="number"
                      value={editFamilyConnection}
                      onChange={(e) => setEditFamilyConnection(e.target.value)}
                      placeholder="예: 3"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 가족력 */}
                {editingField === "familyHistory" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      가족력
                    </label>
                    <input
                      type="text"
                      value={familyHistory}
                      onChange={(e) => setFamilyHistory(e.target.value)}
                      placeholder="예: 당뇨(부), 고혈압(모)"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 혼인여부 */}
                {editingField === "maritalStatus" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      혼인여부
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['-', '미혼', '기혼', '이혼', '사별'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setMaritalStatus(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            maritalStatus === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 환급 가능 금액 */}
                {editingField === "refundableAmount" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      환급 가능 금액
                    </label>
                    <input
                      type="text"
                      value={editRefundableAmount}
                      onChange={(e) => setEditRefundableAmount(e.target.value)}
                      placeholder="예: 150만원"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 5년 이내 3대질환 병력 */}
                {editingField === "fiveYearHistory" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      5년 이내 3대질환 병력
                    </label>
                    <textarea
                      value={editFiveYearHistory}
                      onChange={(e) => setEditFiveYearHistory(e.target.value)}
                      placeholder="예: 고혈압, 당뇨"
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 시술/수술 이력 */}
                {editingField === "surgeryHistory" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      시술/수술 이력
                    </label>
                    <textarea
                      value={editSurgeryHistory}
                      onChange={(e) => setEditSurgeryHistory(e.target.value)}
                      placeholder="예: 맹장수술, 편도수술"
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 3개월 내 병력 */}
                {editingField === "threeMonthHistory" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      3개월 내 병력
                    </label>
                    <textarea
                      value={editThreeMonthHistory}
                      onChange={(e) => setEditThreeMonthHistory(e.target.value)}
                      placeholder="예: 감기, 위염"
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}

                {/* 보험 해지이력 */}
                {editingField === "insuranceCancellation" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      보험 해지이력
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['-', '없음', '있음'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setInsuranceCancellation(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            insuranceCancellation === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 보험분쟁 유무 */}
                {editingField === "insuranceDispute" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      보험분쟁 유무
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['-', '없음', '있음'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setInsuranceDispute(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            insuranceDispute === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 법률 서비스 경험 유무 */}
                {editingField === "legalServiceExperience" && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      법률 서비스 경험 유무
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['-', '없음', '있음'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setLegalServiceExperience(option)}
                          className={`py-2 px-4 rounded-lg border transition-colors text-sm font-medium ${
                            legalServiceExperience === option
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Edit2 size={16} />
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
