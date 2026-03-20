import React from 'react';
import { formatCurrency } from '@/app/issuance/incentiveUtils';
import { summarizeRegionSelections } from '@/app/issuance/regionUtils';
import type { StaffIncentiveRow } from '@/app/types/issuance';

interface StaffIncentiveTableProps {
  rows: StaffIncentiveRow[];
  emptyMessage?: string;
}

export function StaffIncentiveTable({
  rows,
  emptyMessage = '표시할 인센티브 데이터가 없습니다.',
}: StaffIncentiveTableProps) {
  if (rows.length === 0) {
    return <div className="px-4 py-12 text-center text-sm text-slate-400">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-[980px] w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">직원명</th>
            <th className="px-4 py-3 font-medium">팀명</th>
            <th className="px-4 py-3 font-medium">담당지역</th>
            <th className="px-4 py-3 font-medium">월간 완료</th>
            <th className="px-4 py-3 font-medium">인센티브 구간</th>
            <th className="px-4 py-3 font-medium">월 확정 인센티브</th>
            <th className="px-4 py-3 font-medium">최근 완료일</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.staffId}>
              <td className="px-4 py-4">
                <div className="font-semibold text-[#1e293b]">{row.staffName}</div>
                <div className="mt-0.5 text-xs text-slate-400">{row.staffPhone ?? '-'}</div>
              </td>
              <td className="px-4 py-4 font-medium text-slate-600">{row.teamName}</td>
              <td className="px-4 py-4">
                <div className="font-medium text-[#1e293b]">{summarizeRegionSelections(row.assignedRegions)}</div>
              </td>
              <td className="px-4 py-4 font-semibold text-slate-700">{row.completedThisMonth}건</td>
              <td className="px-4 py-4 text-slate-600">{row.incentiveTierLabel}</td>
              <td className="px-4 py-4 font-semibold text-[#1e293b]">{formatCurrency(row.monthlyIncentive)}</td>
              <td className="px-4 py-4 text-xs text-slate-500">{row.lastCompletedAt ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
