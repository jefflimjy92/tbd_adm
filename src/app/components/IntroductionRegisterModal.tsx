import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Users, 
  User, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { InsuranceHistoryTable } from './InsuranceHistoryTable';

interface IntroductionRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export function IntroductionRegisterModal({ isOpen, onClose, onSubmit }: IntroductionRegisterModalProps) {
  const defaultFormState = {
    // Introducer
    introducerName: '',
    introducerPhone: '',
    introducerRelation: '지인',
    
    // Customer (Lead)
    customerName: '',
    customerPhone: '',
    customerBirth: '',
    customerGender: 'M',
    customerAddress: '',
    
    // Details
    introType: '3년환급',
    interest: '보장분석',
    note: ''
  };

  const [formData, setFormData] = useState(defaultFormState);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(defaultFormState);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.customerName || !formData.customerPhone) {
      toast.error('고객명과 연락처는 필수 입력 항목입니다.');
      return;
    }
    
    // Simulate API call
    console.log('Submitting DB:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    toast.success('소개 DB가 성공적으로 등록되었습니다.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-bold text-[#1e293b] text-lg flex items-center gap-2">
              <UserPlus className="text-blue-600" size={20} />
              소개 DB 등록
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              신규 잠재 고객(DB)을 등록합니다.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors">
             <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 bg-[#F8FAFC] custom-scrollbar">
          <form id="intro-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Introducer Info */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
                <Users size={16} className="text-blue-500" />
                소개자 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">소개자명</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="introducerName"
                      value={formData.introducerName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="홍길동"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">연락처</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="introducerPhone"
                      value={formData.introducerPhone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">관계</label>
                  <select
                    name="introducerRelation"
                    value={formData.introducerRelation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="가족">가족</option>
                    <option value="지인">지인</option>
                    <option value="직장동료">직장동료</option>
                    <option value="기존고객">기존고객</option>
                    <option value="협력사">협력사</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Customer Info */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
                <User size={16} className="text-emerald-500" />
                피소개자(고객) 정보 <span className="text-rose-500 text-xs">* 필수</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    고객명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="이름 입력"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    연락처 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">생년월일</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="customerBirth"
                      value={formData.customerBirth}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">성별</label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="customerGender"
                        value="M"
                        checked={formData.customerGender === 'M'}
                        onChange={handleChange}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-slate-700">남성</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="customerGender"
                        value="F"
                        checked={formData.customerGender === 'F'}
                        onChange={handleChange}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-slate-700">여성</span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">주소</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="주소 입력"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Consultation Info */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
                <FileText size={16} className="text-amber-500" />
                상담 기초 정보
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">소개 유형</label>
                  <select
                    name="introType"
                    value={formData.introType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="3년환급">3년 환급금 고객에 대한 소개</option>
                    <option value="회생">회생에 대한 소개</option>
                    <option value="관리중">관리 중 소개</option>
                    <option value="청구중">청구 중 소개</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">관심 분야</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="3년환급금">3년 환급금</option>
                    <option value="보상담당자">보상 담당자</option>
                    <option value="법률및손해사정">법률 및 손해사정</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">메모 / 특이사항</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors h-24 resize-none"
                    placeholder="소개 내용이나 고객의 주요 요청사항을 입력하세요."
                  />
                </div>
              </div>
            </div>



          </form>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50 shrink-0 rounded-b-xl">
           <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
           >
              취소
           </button>
           <button 
              type="submit"
              form="intro-form"
              className="px-6 py-2 bg-[#1e293b] text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2"
           >
              <Save size={18} />
              소개 DB 등록하기
           </button>
        </div>
      </div>
    </div>
  );
}
