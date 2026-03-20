import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  MessageSquare, 
  CheckSquare, 
  FileText,
  Activity,
  Briefcase,
  CheckCircle2,
  CreditCard,
  CalendarClock,
  Coins,
  Pencil,
  Check,
  X
} from 'lucide-react';
import clsx from 'clsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"

// Type definitions could be moved to a types file, but kept here for simplicity
interface CustomerInfoProps {
  data: any;
}

const PROFILE_CHECKLIST = [
  { label: '나이', key: 'age' },
  { label: '성별', key: 'gender' },
  { label: '지역', key: 'address' },
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

export function CustomerInfoCard({ data: initialData }: CustomerInfoProps) {
  // Local state for data to support editing
  const [localData, setLocalData] = useState(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<{ key: string, label: string, value: any, section?: string } | null>(null);
  const [tempValue, setTempValue] = useState('');

  // Update local state when props change
  useEffect(() => {
    setLocalData(initialData);
  }, [initialData]);

  // Merge default data with props/local state
  const info = {
    customer: localData.customer || '김고객',
    phone: localData.phone || '010-0000-0000',
    birth: localData.birth || '800101-1******', // 주민번호 앞자리 + 뒷자리 1
    type: localData.type || '3년 환급',
    date: localData.date || '2026-01-19 14:00',
    status: localData.status || '대기',
    manager: localData.manager || '김실무',
    address: localData.address || '서울시 강남구 테헤란로 123',
    bank: localData.bank || '신협 137-014-394953',
    refundEstimate: localData.refundEstimate || '150', // 만원 단위
    visitDate: localData.visitDate || '01.20 (화) 10:30',
    tags: localData.tags || ['통화선호'],
    ...localData
  };

  const handleEditClick = (item: { key: string, label: string, value: any, section?: string }) => {
    if (!isEditMode) return;
    setEditingItem(item);
    setTempValue(String(item.value || ''));
  };

  const handleSave = () => {
    if (!editingItem) return;

    if (editingItem.section === 'consultation') {
      setLocalData((prev: any) => ({
        ...prev,
        consultation: {
          ...prev.consultation,
          [editingItem.key]: tempValue
        }
      }));
    } else {
      setLocalData((prev: any) => ({
        ...prev,
        [editingItem.key]: tempValue
      }));
    }
    setEditingItem(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">


      <div className="p-5 space-y-4">
        
        {/* Row 0: Customer Profile Checklist */}
        <div className="space-y-2">
           <div className="flex justify-between items-center">
             <label className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <CheckSquare size={14} className="text-slate-400"/> 고객 프로필 요약
             </label>
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditMode(!isEditMode)}
                className={clsx("h-6 px-2 text-xs", isEditMode ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-slate-400 hover:text-slate-600")}
             >
                {isEditMode ? (
                   <>
                     <Check size={12} className="mr-1" /> 완료
                   </>
                ) : (
                   <>
                     <Pencil size={12} className="mr-1" /> 수정
                   </>
                )}
             </Button>
           </div>
           
           <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {PROFILE_CHECKLIST.map((item, idx) => {
                 let value = info[item.key] || localData[item.key];
                 // Data synchronization with CustomerDetail page analysis structure
                 if (!value && localData.analysis) {
                    const map: any = {
                       'age': localData.age,
                       'gender': localData.gender,
                       'address': localData.region,
                       'history_3m': localData.analysis.recentMedical ? '있음' : '없음',
                       'diff_contractor': localData.analysis.contractMatch,
                       'history_5y_critical': localData.analysis.criticalIllness ? '있음' : '없음',
                       'planner_rel': localData.analysis.plannerRelation,
                       'insurance_amount': localData.analysis.premium ? `${localData.analysis.premium.toLocaleString()}원` : undefined,
                       'type': localData.analysis.insuranceType,
                       'refundEstimate': localData.analysis.refundAmount ? (localData.analysis.refundAmount / 10000).toFixed(0) : undefined,
                       'dispute': localData.analysis.dispute ? '있음' : '없음',
                       'decision_maker': localData.analysis.decisionMaker,
                       'family_count': localData.analysis.familyCount,
                       'family_history': localData.analysis.familyHistory,
                       'marriage': localData.analysis.maritalStatus,
                       'cancel_history': localData.analysis.cancellationHistory,
                       'surgery_history': localData.analysis.surgeryHistory,
                       'legal_exp': localData.analysis.legalService ? '있음' : '없음',
                    };
                    value = map[item.key];
                 }

                 // Region Categorization Logic (Only for display)
                 if (item.key === 'address' && typeof value === 'string' && value) {
                    const addr = value.trim();
                    if (addr.startsWith('서울')) value = '서울';
                    else if (addr.startsWith('부산')) value = '부산';
                    else if (addr.startsWith('대구')) value = '대구';
                    else if (addr.startsWith('인천')) value = '인천';
                    else if (addr.startsWith('광주')) value = '광주';
                    else if (addr.startsWith('대전')) value = '대전';
                    else if (addr.startsWith('울산')) value = '울산';
                    else if (addr.startsWith('세종')) value = '세종';
                    else if (addr.startsWith('제주')) value = '제주';
                    else if (addr.startsWith('강원')) value = '강원';
                    else if (addr.match(/충(청)?북/)) value = '충북';
                    else if (addr.match(/충(청)?남/)) value = '충남';
                    else if (addr.match(/전(라)?북/)) value = '전북';
                    else if (addr.match(/전(라)?남/)) value = '전남';
                    else if (addr.match(/경(상)?북/)) value = '경북';
                    else if (addr.match(/경(상)?남/)) value = '경남';
                    else if (addr.startsWith('경기')) {
                       const northCities = ['고양', '파주', '의정부', '양주', '동두천', '포천', '연천', '가평', '남양주', '구리'];
                       const isNorth = northCities.some(city => addr.includes(city));
                       value = isNorth ? '경기 (북부)' : '경기 (남부)';
                    }
                 }
                 
                 return (
                   <div 
                      key={idx} 
                      className={clsx(
                        "flex flex-col border-l-2 pl-2 transition-all rounded-sm",
                        isEditMode 
                          ? "border-blue-300 bg-white cursor-pointer hover:bg-blue-50 hover:shadow-sm ring-1 ring-transparent hover:ring-blue-200" 
                          : "border-slate-200"
                      )}
                      onClick={() => handleEditClick({ key: item.key, label: item.label, value: info[item.key] || localData[item.key] })} // Pass original value for editing
                   >
                      <span className="text-[10px] text-slate-400 mb-0.5 truncate leading-none" title={item.label}>{item.label}</span>
                      <span className={clsx("text-xs font-bold truncate min-h-[1rem]", isEditMode ? "text-blue-700" : "text-slate-700")}>
                         {value || '-'}
                      </span>
                   </div>
                 );
              })}
           </div>
        </div>

        <div className="h-px bg-slate-100 my-2"></div>
        
        {/* Important: Refund & Visit Info (Highlighted) */}
        <div className="grid grid-cols-2 gap-4 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
          <Field 
            label="환급 예상 금액" 
            value={`${info.refundEstimate}만원`} 
            icon={<Coins size={14} className="text-emerald-600"/>} 
            highlight 
            className="text-emerald-800 text-lg"
          />
          <Field 
            label="방문 예약 정보" 
            value={info.visitDate} 
            icon={<CalendarClock size={14} className="text-emerald-600"/>}
            className="text-emerald-800 font-bold"
          />
        </div>

        {/* Row 1: Basic Info Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field label="접수 유형" value={info.type} />
          <Field label="접수 일자" value={info.date} />
          <Field label="처리 상태" value={info.status} highlight={info.status !== '대기'} />
          <Field label="담당자" value={info.manager} />
        </div>

        <div className="h-px bg-slate-100 my-2"></div>

        {/* Row 2: Customer Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Field label="고객명" value={info.customer} icon={<User size={14} className="text-slate-400"/>} bold />
          <div className="space-y-1">
             <label className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Phone size={14} className="text-slate-400"/> 연락처
             </label>
             <div className="flex gap-2">
                <div className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm font-bold text-[#1e293b]">
                   {info.phone}
                </div>
                <button className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-bold rounded flex items-center gap-1 transition-colors">
                   <MessageSquare size={12} />
                </button>
             </div>
          </div>
          <Field label="주민등록번호" value={info.birth} />
          <Field label="은행/계좌" value={info.bank} icon={<CreditCard size={14} className="text-slate-400"/>} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Field label="주소(방문지역)" value={info.address} icon={<MapPin size={14} className="text-slate-400"/>} />
        </div>

        {/* --- LIVE ACTION RECORD SECTION --- */}
        {(localData.consultation || localData.meeting || localData.claim) && (
           <div className="mt-4 border-t border-slate-200 pt-4 bg-slate-50/50 -mx-5 px-5 py-4">
              <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                 <Activity size={14} className="text-blue-600"/> 실시간 상담/업무 기록 (Live)
              </h4>
              
              {/* Consultation Data (Updated for new fields) */}
              {localData.consultation && (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    {[
                       { key: 'insuranceType', label: '실손/종합', active: true },
                       { key: 'monthlyPremium', label: '월 보험료' },
                       { key: 'paymentStatus', label: '미납/실효' },
                       { key: 'contractRelation', label: '계약/납입' },
                       { key: 'divider' },
                       { key: 'medicalHistory', label: '병력(3년)' },
                       { key: 'criticalDisease', label: '3대질환' },
                       { key: 'medication', label: '투약여부' },
                       { key: 'companion', label: '동반신청' },
                    ].map((field: any, idx) => {
                       if (field.key === 'divider') {
                          return <div key="div" className="col-span-2 md:col-span-4 h-px bg-slate-200 my-1"/>;
                       }
                       
                       const val = localData.consultation[field.key];
                       
                       return (
                          <div 
                            key={field.key}
                            onClick={() => handleEditClick({ key: field.key, label: field.label, value: val, section: 'consultation' })}
                            className={clsx(
                               "p-2 rounded border transition-all h-full flex flex-col", 
                               field.active ? "bg-white border-blue-200 shadow-sm" : "bg-slate-100 border-transparent text-slate-500",
                               isEditMode && "cursor-pointer hover:bg-blue-50 hover:border-blue-300 ring-1 ring-transparent hover:ring-blue-200"
                            )}
                          >
                             <div className="text-[10px] text-slate-400 mb-0.5">{field.label}</div>
                             <div className={clsx("break-words whitespace-pre-wrap", field.active ? "text-blue-700" : "text-slate-600", isEditMode && "text-blue-800")}>
                                {val ? (
                                   String(val).includes(':') ? (
                                      String(val).split(/([,\|]\s+)/).map((part, i) => {
                                         if (part.match(/^[,\|]\s+$/)) return <span key={i} className="font-normal opacity-50">{part}</span>;
                                         if (part.includes(':')) {
                                            const cIdx = part.indexOf(':');
                                            return (
                                               <span key={i}>
                                                  <span className="font-normal opacity-80">{part.substring(0, cIdx + 1)}</span>
                                                  <span className="font-bold">{part.substring(cIdx + 1)}</span>
                                               </span>
                                            );
                                         }
                                         return <span key={i} className="font-bold">{part}</span>;
                                      })
                                   ) : (
                                      <span className="font-bold">{val}</span>
                                   )
                                ) : (
                                   <span className="font-bold">-</span>
                                )}
                             </div>
                          </div>
                       );
                    })}
                 </div>
              )}
           </div>
        )}

        {/* Row 7: Inquiry Content */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="UTM 구분" value={info.utm || 'UTM없음'} />
              <Field label="월 보험금액" value="10-20만원" />
              <Field label="실손가입여부" value="가입 (유)" highlight />
              <Field label="직업" value={info.job || '직업없음'} />
           </div>

           <div className="space-y-2">
              <label className="text-xs text-slate-500 font-medium flex items-center gap-1">
                 <FileText size={14} className="text-slate-400"/> 메모 (전체 공유)
              </label>
              <textarea
                 className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors custom-scrollbar placeholder:text-slate-400"
                 placeholder="등록된 메모가 없습니다. 내용을 입력하세요."
                 value={localData.memo || ''}
                 onChange={(e) => setLocalData((prev: any) => ({ ...prev, memo: e.target.value }))}
              />
           </div>
        </div>

      </div>

      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>정보 수정</DialogTitle>
            <DialogDescription>
              {editingItem?.label} 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-value" className="text-right">
                {editingItem?.label}
              </Label>
              <Input
                id="edit-value"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>취소</Button>
            <Button type="submit" onClick={handleSave}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, value, icon, highlight, bold, className }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-500 font-medium flex items-center gap-1">
        {icon} {label}
      </label>
      <div className={clsx(
         "text-sm truncate",
         highlight ? "text-[#0f766e] font-bold" : "text-[#1e293b]",
         bold && "font-bold",
         className
      )}>
        {value || '-'}
      </div>
    </div>
  );
}

function LiveField({ label, value, active, isEditMode, onClick }: any) {
   return (
      <div 
        onClick={onClick}
        className={clsx(
           "p-2 rounded border transition-all", 
           active ? "bg-white border-blue-200 shadow-sm" : "bg-slate-100 border-transparent text-slate-500",
           isEditMode && "cursor-pointer hover:bg-blue-50 hover:border-blue-300 ring-1 ring-transparent hover:ring-blue-200"
        )}
      >
         <div className="text-[10px] text-slate-400 mb-0.5">{label}</div>
         <div className={clsx("font-bold truncate", active ? "text-blue-700" : "text-slate-600", isEditMode && active && "text-blue-800")}>{value || '-'}</div>
      </div>
   )
}
