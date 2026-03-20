import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  FileText, 
  CheckSquare, 
  CreditCard,
  MessageSquare,
  ChevronRight,
  Upload,
  Trash2,
  Edit2,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  Save,
  Send,
  History,
  Download,
  PlayCircle,
  ArrowLeft,
  LayoutList,
  AlertTriangle,
  X
} from 'lucide-react';
import clsx from 'clsx';

// Mock Data: Consultation Clients
const CLIENTS = [
  { 
    id: 1, 
    name: '이혜영', 
    status: '1차 상담 완료', 
    step: 'Counseling', 
    time: '2025-12-23 13:50', 
    manager: '이원이',
    phone: '010-5313-3171',
    region: '경기도 김포시',
    birth: '731114'
  },
  { 
    id: 2, 
    name: '김철수', 
    status: '미팅 일정 완료', 
    step: 'Meeting', 
    time: '2025-12-23 11:30', 
    manager: '박미팅',
    phone: '010-1234-5678',
    region: '서울 강남구',
    birth: '800101'
  },
  { 
    id: 3, 
    name: '이영희', 
    status: '미팅 인계 완료', 
    step: 'HandedOff', 
    time: '2025-12-23 13:00', 
    manager: '최상담',
    phone: '010-9876-5432',
    region: '부산 해운대구',
    birth: '850505'
  },
  { 
    id: 4, 
    name: '박민수', 
    status: '2차 상담 완료', 
    step: 'Counseling', 
    time: '2025-12-22 14:20', 
    manager: '김상담',
    phone: '010-5555-4444',
    region: '인천 연수구',
    birth: '901212'
  },
  { 
    id: 5, 
    name: '최지우', 
    status: '1차 후 부재', 
    step: 'Counseling', 
    time: '2025-12-22 15:45', 
    manager: '임준영',
    phone: '010-1111-2222',
    region: '서울 송파구',
    birth: '880808'
  },
];

// 상담 관리 상태값 정의
const CONSULTATION_STATUSES = [
  { value: '신규 접수', category: 'initial', color: 'blue' },
  { value: '카드 상담', category: 'initial', color: 'blue' },
  { value: '1차 상담 시도', category: 'first', color: 'cyan' },
  { value: '1차 상담 완료', category: 'first', color: 'teal' },
  { value: '1차 후 부재', category: 'first', color: 'amber' },
  { value: '1차 상담 취소', category: 'first', color: 'red' },
  { value: '2차 상담 시도', category: 'second', color: 'cyan' },
  { value: '2차 상담 완료', category: 'second', color: 'teal' },
  { value: '2차 상담 취소', category: 'second', color: 'red' },
  { value: '미팅 일정 완료', category: 'meeting', color: 'orange' },
  { value: '미팅 인계 완료', category: 'meeting', color: 'green' },
  { value: '상담 보류', category: 'pending', color: 'slate' },
  { value: '상담 거부', category: 'rejected', color: 'red' },
  { value: '관심 없음', category: 'rejected', color: 'slate' },
  { value: '부재중', category: 'pending', color: 'amber' },
  { value: '대기', category: 'pending', color: 'slate' },
];

export function Qualification() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  
  // Lifted Form State with Recovered Fields
  const [formData, setFormData] = useState({
    // Original Fields
    missed: { value: 'no', detail: '' },
    premium: '45',
    planner: { value: 'no', detail: '' },
    accident: { value: 'yes', detail: '작년' },
    polyp: { value: 'no', detail: '' },
    surgery: { value: 'no', detail: '' },
    fracture: { value: 'no', detail: '' },
    critical: { value: 'no', detail: '' }, 
    medication: { value: 'no', detail: '' },
    companion: { value: 'no', detail: '' },
    region: '경기도 김포시',
    
    // Recovered Missing Fields (Personal & Insurance)
    job: '주부',
    maritalStatus: '기혼',
    insuranceCompany: '', // 보험사
    insuranceProduct: '', // 상품명
    refundAmount: '',     // 예상 환급금
    memo: '호의적이고 누락된 보험금이 있을거 같아 적극함. 상담태도 양호함. 통화가능시간: 1-3시는 피해달라함'
  });

  const handleClientClick = (client: any) => {
    setSelectedClient(client);
    
    // Reset form with mock data logic
    if(client.id === 1) {
       setFormData({
         missed: { value: 'no', detail: '' },
         premium: '45',
         planner: { value: 'no', detail: '' },
         accident: { value: 'yes', detail: '작년' },
         polyp: { value: 'no', detail: '' },
         surgery: { value: 'no', detail: '' },
         fracture: { value: 'no', detail: '' },
         critical: { value: 'no', detail: '' },
         medication: { value: 'no', detail: '' },
         companion: { value: 'no', detail: '' },
         region: '경기도 김포시',
         job: '주부',
         maritalStatus: '기혼',
         insuranceCompany: '삼성화재',
         insuranceProduct: '무배당 삼성화재 다이렉트 실손의료비보험',
         refundAmount: '150,000',
         memo: '호의적이고 누락된 보험금이 있을거 같아 적극함. 상담태도 양호함. 통화가능시간: 1-3시는 피해달라함'
       });
    } else {
      setFormData({
         missed: { value: 'no', detail: '' },
         premium: '',
         planner: { value: 'no', detail: '' },
         accident: { value: 'no', detail: '' },
         polyp: { value: 'no', detail: '' },
         surgery: { value: 'no', detail: '' },
         fracture: { value: 'no', detail: '' },
         critical: { value: 'no', detail: '' },
         medication: { value: 'no', detail: '' },
         companion: { value: 'no', detail: '' },
         region: client.region || '',
         job: '',
         maritalStatus: '미혼',
         insuranceCompany: '',
         insuranceProduct: '',
         refundAmount: '',
         memo: ''
       });
    }
  };

  const handleCloseDrawer = () => {
    setSelectedClient(null);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Derived Risks Logic
  const getDetectedRisks = () => {
    const risks = [];
    if (formData.critical.value === 'yes') risks.push('5년이내 6대질병');
    if (parseInt(formData.premium || '0') < 10 && formData.premium !== '') risks.push('무일푼자');
    if (selectedClient && parseInt(selectedClient.birth.substring(0,2)) > 90) risks.push('저연령자');
    if (formData.missed.value === 'yes') risks.push('미납/실효');
    if (formData.region.includes('지방')) risks.push('지방건');
    return risks;
  };

  const detectedRisks = getDetectedRisks();

  return (
    <div className="relative h-full flex flex-col bg-white overflow-hidden">
      {/* ----------------- Table View (Always Visible) ----------------- */}
      <div className="h-full flex flex-col min-w-0">
        {/* List Header */}
        <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-white shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">상담 관리 (Counseling)</h1>
            <p className="text-slate-500 text-sm">배정된 상담 고객을 조회하고 관리합니다.</p>
          </div>
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="고객명, 연락처 검색" 
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-teal-500 outline-none"
                />
             </div>
             <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">전체 상태</option>
                <optgroup label="초기 단계">
                  {CONSULTATION_STATUSES.filter(s => s.category === 'initial').map(status => (
                    <option key={status.value} value={status.value}>{status.value}</option>
                  ))}
                </optgroup>
                <optgroup label="1차 상담">
                  {CONSULTATION_STATUSES.filter(s => s.category === 'first').map(status => (
                    <option key={status.value} value={status.value}>{status.value}</option>
                  ))}
                </optgroup>
                <optgroup label="2차 상담">
                  {CONSULTATION_STATUSES.filter(s => s.category === 'second').map(status => (
                    <option key={status.value} value={status.value}>{status.value}</option>
                  ))}
                </optgroup>
                <optgroup label="미팅 단계">
                  {CONSULTATION_STATUSES.filter(s => s.category === 'meeting').map(status => (
                    <option key={status.value} value={status.value}>{status.value}</option>
                  ))}
                </optgroup>
             </select>
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 text-sm font-medium">
                <Plus size={16} /> 상담 등록
             </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-auto p-8 bg-[#f8fafc]">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             {/* Table Header */}
             <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-1 text-center">No</div>
                <div className="col-span-1">상태</div>
                <div className="col-span-2">고객명 (생년월일)</div>
                <div className="col-span-2">연락처</div>
                <div className="col-span-2">지역</div>
                <div className="col-span-2">담당자</div>
                <div className="col-span-2 text-right">신청일시</div>
             </div>

             {/* Table Rows */}
             <div className="divide-y divide-slate-100">
                {CLIENTS.map((client) => {
                   const statusConfig = CONSULTATION_STATUSES.find(s => s.value === client.status);
                   const statusColor = statusConfig?.color || 'slate';
                   
                   return (
                   <div 
                      key={client.id} 
                      onClick={() => handleClientClick(client)}
                      className={clsx(
                        "grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer transition-colors group",
                        selectedClient?.id === client.id ? "bg-teal-50 border-teal-100" : "hover:bg-slate-50"
                      )}
                   >
                      <div className="col-span-1 text-center text-slate-500 text-sm">{client.id}</div>
                      <div className="col-span-1">
                         <span className={clsx(
                            "px-2.5 py-1 rounded-full text-xs font-medium border",
                            statusColor === 'blue' ? "bg-blue-50 text-blue-700 border-blue-100" :
                            statusColor === 'cyan' ? "bg-cyan-50 text-cyan-700 border-cyan-100" :
                            statusColor === 'teal' ? "bg-teal-50 text-teal-700 border-teal-100" :
                            statusColor === 'green' ? "bg-green-50 text-green-700 border-green-100" :
                            statusColor === 'orange' ? "bg-orange-50 text-orange-700 border-orange-100" :
                            statusColor === 'amber' ? "bg-amber-50 text-amber-700 border-amber-100" :
                            statusColor === 'red' ? "bg-red-50 text-red-700 border-red-100" :
                            "bg-slate-100 text-slate-500 border-slate-200"
                         )}>
                            {client.status}
                         </span>
                      </div>
                      <div className="col-span-2">
                         <div className="font-bold text-slate-800 text-sm group-hover:text-teal-600 transition-colors">{client.name}</div>
                         <div className="text-xs text-slate-400">{client.birth}</div>
                      </div>
                      <div className="col-span-2 text-sm text-slate-600">{client.phone}</div>
                      <div className="col-span-2 text-sm text-slate-600">{client.region}</div>
                      <div className="col-span-2">
                         <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                               <User size={12} />
                            </div>
                            {client.manager}
                         </div>
                      </div>
                      <div className="col-span-2 text-right text-xs text-slate-500 font-mono">
                         {client.time}
                      </div>
                   </div>
                )})}</div>
          </div>
        </div>
      </div>

      {/* ----------------- Slide-over Drawer (Overlay) ----------------- */}
      
      {/* Backdrop */}
      {selectedClient && (
        <div 
           className="fixed inset-0 bg-slate-900/20 z-40 transition-opacity backdrop-blur-sm"
           onClick={handleCloseDrawer}
        />
      )}

      {/* Drawer Panel */}
      <div 
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-[90%] max-w-7xl bg-[#f1f5f9] shadow-2xl transform transition-transform duration-300 ease-in-out flex",
          selectedClient ? "translate-x-0" : "translate-x-full"
        )}
      >
         {selectedClient && (
           <>
            {/* Center: Main Workspace */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-r border-slate-200">
              {/* Drawer Header */}
              <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
                 <div className="flex items-center gap-4">
                    <button 
                       onClick={handleCloseDrawer}
                       className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
                    >
                       <X size={20} />
                    </button>
                    <div>
                       <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-800">{selectedClient.name} 고객님</h2>
                          <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-medium">
                             {selectedClient.status}
                          </span>
                       </div>
                       <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{selectedClient.phone}</span>
                          <span className="w-px h-3 bg-slate-300"></span>
                          <span>{selectedClient.time} 접수</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Risk Tags Display */}
                 <div className="flex items-center gap-2">
                   <span className="text-xs font-bold text-slate-600 mr-1">주요 체크:</span>
                   {detectedRisks.length > 0 ? (
                     <div className="flex flex-wrap gap-1.5 max-w-md">
                       {detectedRisks.map((risk) => (
                         <div key={risk} className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                           <AlertTriangle size={10} className="text-red-500" />
                           <span className="text-xs text-red-700 font-bold">{risk}</span>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <span className="text-xs text-slate-400">특이사항 없음</span>
                   )}
                 </div>
              </div>

              {/* Scrollable Form Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                
                {/* SECTION 1: 기본 정보 + Personal (Restored) */}
                <Section title="기본 정보 (Basic Info)" color="blue">
                   <div className="grid grid-cols-2 gap-x-8 gap-y-0 border border-slate-200 rounded-lg overflow-hidden bg-white text-sm">
                      <FormRow label="고객명">{selectedClient.name}</FormRow>
                      <FormRow label="생년월일">{selectedClient.birth}-2******</FormRow>
                      <FormRow label="연락처">
                         <div className="flex gap-2 items-center">
                            <span className="font-bold">{selectedClient.phone}</span>
                            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded border">SKT</span>
                            <button className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-100">알림톡 발송</button>
                         </div>
                      </FormRow>
                      
                      {/* Restored Personal Details */}
                      <FormRow label="직업">
                         <input 
                           type="text" 
                           value={formData.job} 
                           onChange={(e) => updateField('job', e.target.value)}
                           className="w-full outline-none bg-transparent"
                           placeholder="직업 입력"
                         />
                      </FormRow>
                      <FormRow label="결혼 유무">
                         <select 
                           value={formData.maritalStatus} 
                           onChange={(e) => updateField('maritalStatus', e.target.value)}
                           className="outline-none bg-transparent w-full"
                         >
                           <option value="기혼">기혼</option>
                           <option value="미혼">미혼</option>
                           <option value="기타">기타</option>
                         </select>
                      </FormRow>

                      <FormRow label="계좌정보">신한은행 110-028-******</FormRow>
                      <FormRow label="마케팅동의"><span className="text-teal-600 font-bold">동의함</span></FormRow>
                   </div>
                </Section>

                {/* SECTION 2: 상담 내용 */}
                <Section title="상담 상세 내역 (Consultation Detail)" color="green">
                  <div className="space-y-4">
                    {/* Header Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 mb-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">상담 구분</span>
                        <span className="font-bold text-slate-800">홈페이지신청건</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">상담 담당자</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">상담본부 1팀 {selectedClient.manager}</span>
                          <button className="text-[10px] bg-white border border-slate-300 px-1.5 py-0.5 rounded text-slate-600 hover:bg-slate-100">변경</button>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Q&A Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 rounded-lg overflow-hidden text-sm bg-white shadow-sm">
                      <FormRow label="1. 실손/종합 유무" fullWidth>
                        <div className="flex gap-8 w-full">
                           <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-teal-600" /> 실손보험 (유)</label>
                           <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-teal-600" /> 종합보험 (유)</label>
                        </div>
                      </FormRow>
                      
                      {/* Restored Insurance Info */}
                      <FormRow label="보험사 (가입)">
                        <input 
                           type="text" 
                           value={formData.insuranceCompany} 
                           onChange={(e) => updateField('insuranceCompany', e.target.value)}
                           className="w-full outline-none bg-transparent"
                           placeholder="예: 삼성화재"
                         />
                      </FormRow>
                      <FormRow label="상품명">
                        <input 
                           type="text" 
                           value={formData.insuranceProduct} 
                           onChange={(e) => updateField('insuranceProduct', e.target.value)}
                           className="w-full outline-none bg-transparent"
                           placeholder="가입 상품명 입력"
                         />
                      </FormRow>

                      <FormRow label="2. 미납/실효 여부">
                        <ConditionalRadioInput 
                           name="missed" 
                           placeholder="미납/실효 사유 입력" 
                           value={formData.missed}
                           onChange={(v: any) => updateField('missed', v)}
                        />
                      </FormRow>
                      
                      <FormRow label="3. 월 납입 보험료">
                         <div className="flex items-center gap-2">
                            <input 
                               type="number" 
                               className="w-24 bg-white border border-slate-200 rounded px-2 h-8 text-right outline-none focus:border-teal-500" 
                               value={formData.premium}
                               onChange={(e) => updateField('premium', e.target.value)}
                            />
                            <span className="text-slate-600">만원</span>
                            <span className="text-xs text-slate-400 ml-2">(10만원 미만 시 '무일푼자' 태그)</span>
                         </div>
                      </FormRow>
                      
                      <FormRow label="4. 설계사 관계">
                         <ConditionalRadioInput 
                           name="planner" 
                           placeholder="특이사항 입력 (예: 지인)"
                           value={formData.planner}
                           onChange={(v: any) => updateField('planner', v)}
                         />
                      </FormRow>
                      
                      <FormRow label="5. 교통사고 (3년)">
                         <ConditionalRadioInput 
                           name="accident" 
                           placeholder="상세 내용 (예: 작년 경미한 접촉사고)"
                           value={formData.accident}
                           onChange={(v: any) => updateField('accident', v)}
                         />
                      </FormRow>
                      
                      <FormRow label="6. 수술/시술 (3년)">
                         <div className="flex flex-col gap-2 w-full py-2">
                            <div className="flex items-start gap-4 text-xs">
                               <span className="w-16 text-slate-500 pt-1.5">용종</span>
                               <ConditionalRadioInput 
                                 name="polyp" 
                                 placeholder="상세 내용"
                                 value={formData.polyp}
                                 onChange={(v: any) => updateField('polyp', v)}
                               />
                            </div>
                            <div className="flex items-start gap-4 text-xs">
                               <span className="w-16 text-slate-500 pt-1.5">수술/시술</span>
                               <ConditionalRadioInput 
                                 name="surgery" 
                                 placeholder="수술/시술 내용"
                                 value={formData.surgery}
                                 onChange={(v: any) => updateField('surgery', v)}
                               />
                            </div>
                            <div className="flex items-start gap-4 text-xs">
                               <span className="w-16 text-slate-500 pt-1.5">골절</span>
                               <ConditionalRadioInput 
                                 name="fracture" 
                                 placeholder="골절 내용"
                                 value={formData.fracture}
                                 onChange={(v: any) => updateField('fracture', v)}
                               />
                            </div>
                         </div>
                      </FormRow>
                      
                      <FormRow label="7. 중대질환 유무">
                         <ConditionalRadioInput 
                           name="critical" 
                           placeholder="질환명 및 발병시기"
                           value={formData.critical}
                           onChange={(v: any) => updateField('critical', v)}
                         />
                      </FormRow>
                      
                      <FormRow label="8. 복용 약물">
                         <ConditionalRadioInput 
                           name="medication" 
                           placeholder="복용중인 약물"
                           value={formData.medication}
                           onChange={(v: any) => updateField('medication', v)}
                         />
                      </FormRow>
                      
                      <FormRow label="9. 동반 신청">
                         <ConditionalRadioInput 
                           name="companion" 
                           placeholder="이름, 전화번호"
                           value={formData.companion}
                           onChange={(v: any) => updateField('companion', v)}
                         />
                      </FormRow>
                      
                      <FormRow label="상담 특이사항" fullWidth>
                        <textarea 
                           className="w-full h-24 py-2 bg-transparent outline-none resize-none text-slate-600 leading-relaxed" 
                           value={formData.memo}
                           onChange={(e) => updateField('memo', e.target.value)}
                        />
                      </FormRow>
                    </div>
                  </div>
                </Section>

                {/* SECTION 3: 미팅/일정 */}
                <Section title="미팅 일정 및 장소 (Meeting Info)" color="orange">
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden text-sm shadow-sm">
                     <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 text-center py-2">
                        <div>지역</div>
                        <div>날짜</div>
                        <div>시간</div>
                        <div>장소 (비고)</div>
                     </div>
                     <div className="grid grid-cols-4 items-center border-b border-slate-100 py-3 px-2 text-center">
                        <input type="text" className="text-center bg-white border border-slate-200 rounded h-8 w-full text-xs" defaultValue="경기 김포시" />
                        <input type="date" className="text-center bg-white border border-slate-200 rounded h-8 w-full text-xs mx-1" defaultValue="2025-12-30" />
                        <div className="flex justify-center gap-1">
                           <input type="text" className="w-12 text-center bg-white border border-slate-200 rounded h-8 text-xs" defaultValue="12" />
                           <span className="self-center">:</span>
                           <input type="text" className="w-12 text-center bg-white border border-slate-200 rounded h-8 text-xs" defaultValue="00" />
                        </div>
                        <input type="text" className="text-left px-2 bg-white border border-slate-200 rounded h-8 w-full text-xs" defaultValue="메가커피 고촌수기마을점" />
                     </div>
                  </div>
                </Section>

                {/* SECTION 5: 청구/환급 내용 (Recovered Refund Field) */}
                <Section title="청구 및 환급 (Billing & Refund)" color="amber">
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden text-sm shadow-sm">
                       {/* Recovered Refund Amount Field */}
                       <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-yellow-50/50">
                          <span className="text-sm font-bold text-slate-700">예상 환급금:</span>
                          <div className="flex items-center gap-2">
                             <input 
                               type="text" 
                               value={formData.refundAmount}
                               onChange={(e) => updateField('refundAmount', e.target.value)}
                               className="w-32 bg-white border border-slate-300 rounded px-3 py-1.5 text-right font-bold text-slate-800 outline-none focus:border-teal-500"
                               placeholder="0"
                             />
                             <span className="text-slate-600 font-medium">원</span>
                          </div>
                          <span className="text-xs text-slate-400 ml-2">* 누락된 환급금 복구 필드</span>
                       </div>

                       {/* File Attachments */}
                       <div className="p-4 bg-white">
                           <div className="flex justify-between items-center mb-3">
                              <span className="text-xs font-bold text-slate-500">관련 첨부 파일</span>
                              <button className="text-xs flex items-center gap-1 text-slate-600 bg-white border border-slate-300 px-2 py-1 rounded hover:bg-slate-50">
                                 <Plus size={12} /> 파일 추가
                              </button>
                           </div>
                           <div className="space-y-2">
                              <FileItem name={`심평원진료내역 ${selectedClient.name}.pdf`} type="pdf" />
                              <FileItem name={`${selectedClient.name}환급금.pdf`} type="pdf" />
                              <FileItem name={`${selectedClient.name} 녹취1.mp3`} type="audio" />
                           </div>
                       </div>
                    </div>
                </Section>
              </div>
            </div>

            {/* Right Sidebar: Status & Comments */}
            <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 z-10 shadow-lg">
              {/* Progress Widget */}
              <div className="bg-slate-800 text-white p-5">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-sm">진행 단계 (Status)</h3>
                 </div>
                 
                 {/* Status Selector (Logic Requirement) */}
                 <div className="mb-4">
                    <select 
                      className="w-full bg-slate-700 border border-slate-600 text-white text-sm rounded px-2 py-2 outline-none focus:border-teal-500"
                      value={selectedClient.status}
                      // In a real app, this would update state. For now just visual.
                      onChange={() => {}}
                    >
                      {CONSULTATION_STATUSES.map(s => (
                        <option key={s.value} value={s.value}>{s.value}</option>
                      ))}
                    </select>
                 </div>

                 <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-600 -z-0"></div>
                    <StepIndicator label="접수" completed />
                    <StepIndicator label="상담" completed />
                    <StepIndicator label="미팅" active={selectedClient.step === 'Meeting'} />
                    <StepIndicator label="계약" completed={selectedClient.step === 'Contract'} />
                 </div>
              </div>

              {/* Comment Stream */}
              <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4">
                <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex justify-between items-center">
                   <span>History & Comments</span>
                </div>
                
                <div className="text-center py-8 text-slate-400 text-xs">
                   <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                   등록된 댓글이 없습니다.
                </div>
              </div>

              {/* Action Panel */}
              <div className="p-4 border-t border-slate-200 bg-white space-y-3">
                <div className="relative">
                   <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-teal-500 resize-none h-20" placeholder="댓글 내용을 입력하세요..." />
                   <button className="absolute right-2 bottom-2 text-slate-400 hover:text-teal-600 bg-white p-1 rounded"><Send size={16} /></button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                   <button className="flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 text-sm font-medium transition-colors shadow-sm">
                      <Save size={16} /> 저장
                   </button>
                   <button className="flex items-center justify-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 py-2 rounded hover:bg-slate-200 text-sm font-medium transition-colors">
                      <History size={16} /> 이력
                   </button>
                </div>
              </div>
            </div>
           </>
         )}
      </div>
    </div>
  );
}

/* --- Reusable Components --- */

function Section({ title, color, children }: any) {
  const colorMap: any = {
    blue: 'border-t-blue-500',
    green: 'border-t-teal-500',
    orange: 'border-t-orange-500',
    amber: 'border-t-amber-500'
  };

  return (
    <div className={clsx(
       "bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all duration-300",
       "ring-2 ring-teal-500/10"
    )}>
      <div className={clsx("px-5 py-3 border-b border-slate-100 font-bold text-slate-800 border-t-4 flex justify-between items-center bg-slate-50/30", colorMap[color])}>
        <span>{title}</span>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

function ConditionalRadioInput({ name, placeholder, value, onChange }: any) {
  const [localValue, setLocalValue] = useState<'yes' | 'no'>('no');
  const isControlled = value !== undefined && onChange !== undefined;
  const currentStatus = isControlled ? value.value : localValue;
  const currentDetail = isControlled ? value.detail : '';

  const handleRadioChange = (status: 'yes' | 'no') => {
    if (isControlled) {
      onChange({ ...value, value: status });
    } else {
      setLocalValue(status);
    }
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      onChange({ ...value, detail: e.target.value });
    }
  };

  return (
    <div className="w-full py-1">
      <div className="flex items-center gap-6 mb-2">
         <label className="flex items-center gap-1.5 cursor-pointer group">
            <input 
               type="radio" 
               name={name}
               checked={currentStatus === 'no'} 
               onChange={() => handleRadioChange('no')} 
               className="accent-teal-600 w-3.5 h-3.5" 
            />
            <span className="text-xs text-slate-600 group-hover:text-slate-800">없음</span>
         </label>
         <label className="flex items-center gap-1.5 cursor-pointer group">
            <input 
               type="radio" 
               name={name}
               checked={currentStatus === 'yes'} 
               onChange={() => handleRadioChange('yes')} 
               className="accent-teal-600 w-3.5 h-3.5" 
            />
            <span className="text-xs text-slate-600 group-hover:text-slate-800">있음</span>
         </label>
      </div>
      {currentStatus === 'yes' && (
        <input 
          type="text" 
          className="w-full bg-slate-50 border-b border-slate-200 text-xs px-2 py-1.5 outline-none focus:border-teal-500 transition-colors rounded-t" 
          placeholder={placeholder} 
          value={currentDetail}
          onChange={handleDetailChange}
          autoFocus
        />
      )}
    </div>
  )
}

function FormRow({ label, children, fullWidth }: { label: string, children: React.ReactNode, fullWidth?: boolean }) {
  return (
    <div className={clsx(
      "flex items-stretch min-h-[52px] border-b border-slate-200 last:border-b-0",
      fullWidth ? "col-span-1 md:col-span-2" : ""
    )}>
      <div className="w-32 bg-slate-50 flex items-center px-4 border-r border-slate-200 shrink-0">
        <span className="text-xs font-medium text-slate-500 leading-tight">{label}</span>
      </div>
      <div className="flex-1 px-4 flex items-center bg-white text-slate-800 text-sm py-2">
        {children}
      </div>
    </div>
  );
}

function StepIndicator({ label, active, completed }: { label: string, active?: boolean, completed?: boolean }) {
   return (
      <div className="relative z-10 flex flex-col items-center gap-1">
         <div className={clsx(
            "w-3 h-3 rounded-full border-2",
            completed ? "bg-orange-500 border-orange-500" : 
            active ? "bg-white border-orange-500" : "bg-slate-800 border-slate-600"
         )} />
         <span className={clsx("text-[10px] font-medium", active || completed ? "text-orange-400" : "text-slate-500")}>{label}</span>
      </div>
   )
}

function FileItem({ name, type }: { name: string, type: 'pdf' | 'audio' }) {
   return (
      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100 transition-colors group">
         <div className="flex items-center gap-3 overflow-hidden">
            <div className={clsx("p-1.5 rounded", type === 'pdf' ? "bg-red-100 text-red-600" : "bg-purple-100 text-purple-600")}>
               {type === 'pdf' ? <FileText size={14} /> : <PlayCircle size={14} />}
            </div>
            <span className="text-xs text-slate-700 truncate">{name}</span>
         </div>
         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-white rounded text-slate-500"><Download size={12} /></button>
            <button className="p-1 hover:bg-white rounded text-red-500"><Trash2 size={12} /></button>
         </div>
      </div>
   )
}