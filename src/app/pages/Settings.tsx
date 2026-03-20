import React from 'react';
import { 
  Users, 
  Shield, 
  Database, 
  Activity, 
  Save, 
  Plus,
  Trash2,
  Edit2,
  CheckCircle2
} from 'lucide-react';
import clsx from 'clsx';

export function SystemSettings() {
  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1e293b]">시스템 설정 (System Settings)</h1>
        <p className="text-slate-500 text-sm">사용자 관리, 사유 코드(Code), 필수 입력 규칙(Validation)을 관리합니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Management */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-[#1e293b] flex items-center gap-2">
               <Users size={18} /> 사용자 관리
            </h3>
            <button className="text-xs bg-[#1e293b] text-white px-3 py-1.5 rounded font-medium flex items-center gap-1 hover:bg-slate-800">
               <Plus size={12} /> 사용자 추가
            </button>
          </div>
          <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
                <tr>
                   <th className="px-6 py-3">이름</th>
                   <th className="px-6 py-3">역할</th>
                   <th className="px-6 py-3">이메일</th>
                   <th className="px-6 py-3">상태</th>
                   <th className="px-6 py-3 text-right">관리</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {[
                   { name: '김관리', role: '관리자(Admin)', email: 'admin@thebada.com', status: '활성' },
                   { name: '이상담', role: '상담팀', email: 'lee@thebada.com', status: '활성' },
                   { name: '박청구', role: '청구팀', email: 'park@thebada.com', status: '활성' },
                   { name: '최마케터', role: '마케팅', email: 'choi@thebada.com', status: '비활성' },
                ].map((u, i) => (
                   <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-[#1e293b]">{u.name}</td>
                      <td className="px-6 py-4">
                         <span className={clsx("px-2 py-0.5 rounded text-xs border font-medium", 
                            u.role === '관리자(Admin)' ? "bg-slate-100 border-slate-200 text-slate-700" :
                            "bg-white border-slate-200 text-slate-600"
                         )}>
                            {u.role}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{u.email}</td>
                      <td className="px-6 py-4">
                         <span className={clsx("size-2 rounded-full inline-block mr-2", u.status === '활성' ? "bg-green-500" : "bg-slate-300")}></span>
                         {u.status}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                         <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"><Edit2 size={14} /></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>

        {/* Validation Rules Info */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
           <div className="flex items-center gap-2 mb-4 text-[#1e293b] font-bold">
              <Shield size={18} /> 필수 검증 규칙 (Validation)
           </div>
           <p className="text-xs text-slate-500 mb-4">데이터 누락 방지를 위해 시스템이 강제하는 규칙입니다.</p>
           <div className="space-y-3">
              <RuleItem title="상담 - 부재/취소" desc="상세 사유 코드 및 메모 입력 필수" />
              <RuleItem title="상담 - 부적격" desc="부적격 사유(Under 27 등) 선택 필수" />
              <RuleItem title="미팅 - 취소/노쇼" desc="귀책 사유 및 메모 입력 필수" />
              <RuleItem title="청구 - 차액 발생" desc="지급액 != 예상액인 경우 차액 사유 필수" />
              <RuleItem title="이관 - 필수 액션" desc="다음 단계(미팅팀) 액션 3개 지정 필수" />
           </div>
        </div>

         {/* Reason Code Management */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
               <h3 className="font-bold text-[#1e293b] flex items-center gap-2">
                  <Database size={18} /> 사유 코드 관리
               </h3>
               <button className="text-xs text-slate-500 hover:text-[#1e293b]">관리</button>
            </div>
            <div className="p-4 space-y-4">
               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">상담 이탈 사유</label>
                  <div className="flex flex-wrap gap-2">
                     {['신뢰 부족', '비용 부담', '가족 반대', '관심 없음', '시기 상조'].map(t => (
                        <span key={t} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600">{t}</span>
                     ))}
                     <button className="px-2 py-1 border border-dashed border-slate-300 rounded text-xs text-slate-400 hover:border-slate-400 hover:text-slate-600">+ 추가</button>
                  </div>
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">부적격 사유</label>
                   <div className="flex flex-wrap gap-2">
                     {['27세 미만', '무보험', '판매 금지 직군'].map(t => (
                        <span key={t} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600">{t}</span>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Audit Logs */}
         <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
               <h3 className="font-bold text-[#1e293b] flex items-center gap-2">
                  <Activity size={18} /> 감사 로그 (Audit Log)
               </h3>
            </div>
            <div className="max-h-60 overflow-y-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200 sticky top-0">
                     <tr>
                        <th className="px-6 py-2">시간</th>
                        <th className="px-6 py-2">사용자</th>
                        <th className="px-6 py-2">활동(Action)</th>
                        <th className="px-6 py-2">대상</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {[
                        { time: '2026-01-19 14:30', user: '김관리', action: '핸드오프 생성', target: '신하윤' },
                        { time: '2026-01-19 14:15', user: '박청구', action: '청구 상태 변경', target: 'CL-002' },
                        { time: '2026-01-19 13:45', user: '시스템', action: '리드 자동 배정', target: 'L-2026-002' },
                        { time: '2026-01-19 11:20', user: '이상담', action: '상담 결과 기록', target: 'C-003' },
                     ].map((l, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                           <td className="px-6 py-2 font-mono text-xs text-slate-500">{l.time}</td>
                           <td className="px-6 py-2 text-[#1e293b]">{l.user}</td>
                           <td className="px-6 py-2 text-slate-600">{l.action}</td>
                           <td className="px-6 py-2 font-mono text-xs text-slate-500">{l.target}</td>
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

function RuleItem({ title, desc }: { title: string, desc: string }) {
   return (
      <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
         <CheckCircle2 size={16} className="text-[#0f766e] shrink-0 mt-0.5" />
         <div>
            <div className="text-xs font-bold text-[#1e293b]">{title}</div>
            <div className="text-xs text-slate-500">{desc}</div>
         </div>
      </div>
   )
}