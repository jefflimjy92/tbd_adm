import React, { useMemo } from 'react';
import { ClipboardList, Edit2, FileText, Plus, Trash2 } from 'lucide-react';
import clsx from 'clsx';

import type { MeetingContractSnapshot } from '@/app/journey/types';

export type ContractData = MeetingContractSnapshot;

interface ContractInfoSectionProps {
  data: ContractData[];
  onEdit: (contract: ContractData, index: number) => void;
  onDelete: (index: number) => void;
  onCreate: () => void;
}

function parsePremium(value: string) {
  const parsed = Number.parseInt(value.replace(/[^0-9]/g, ''), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatPremium(value: string) {
  return `${parsePremium(value).toLocaleString('ko-KR')}원`;
}

function formatRegisteredAt(value?: string) {
  if (!value) return '-';
  return value;
}

function getPaymentInfoSummary(contract: ContractData) {
  if (contract.paymentMethod === '카드') {
    return [contract.paymentMethod, contract.paymentCardCompany, contract.paymentCardNumber].filter(Boolean).join(' · ');
  }
  if (contract.paymentMethod === '현금' || contract.paymentMethod === '일시납') {
    return [contract.paymentMethod, contract.paymentNote].filter(Boolean).join(' · ');
  }
  return [contract.paymentMethod, contract.paymentWithdrawDay, contract.paymentBankName].filter(Boolean).join(' · ');
}

function getStatusMeta(status: ContractData['status']) {
  if (status === 'active') {
    return { label: '정상', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  }
  if (status === 'pending') {
    return { label: '대기', className: 'bg-amber-100 text-amber-700 border-amber-200' };
  }
  return { label: '임시', className: 'bg-slate-100 text-slate-600 border-slate-200' };
}

function getEntryMethodMeta(contract: ContractData) {
  if (contract.entryMethod === 'pasted') {
    return { label: '복붙', className: 'bg-sky-100 text-sky-700 border-sky-200' };
  }
  return { label: '수기', className: 'bg-slate-100 text-slate-600 border-slate-200' };
}

export function ContractInfoSection({ data, onEdit, onDelete, onCreate }: ContractInfoSectionProps) {
  const summary = useMemo(() => {
    const totalPremium = data.reduce((sum, contract) => sum + parsePremium(contract.premium), 0);
    const premiumManwon = totalPremium / 10000;
    const premiumText = Number.isInteger(premiumManwon)
      ? premiumManwon.toLocaleString('ko-KR')
      : premiumManwon.toLocaleString('ko-KR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });

    const latestContract = [...data].sort((a, b) => {
      const aTime = a.registeredAt || '';
      const bTime = b.registeredAt || '';
      return bTime.localeCompare(aTime);
    })[0];

    return {
      count: data.length,
      premiumText,
      latestLabel: latestContract ? `${latestContract.insurer} · ${latestContract.productName}` : '-',
    };
  }, [data]);

  if (!data.length) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-slate-50 p-3 text-slate-400">
            <ClipboardList size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-700">등록된 계약 정보가 없습니다</h3>
            <p className="mt-0.5 text-xs text-slate-500">삼성화재, KB손해보험 계약 상세를 복사해 붙여넣거나 직접 입력으로 단건 등록할 수 있습니다.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          <Plus size={14} />
          계약 등록
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">계약 현황</h3>
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            <Plus size={14} />
            계약 추가
          </button>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
            <p className="text-[11px] font-semibold text-slate-500">등록 건수</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{summary.count}건</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
            <p className="text-[11px] font-semibold text-slate-500">합산 보험료</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{summary.premiumText}만원</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
            <p className="text-[11px] font-semibold text-slate-500">최근 등록 계약</p>
            <p className="mt-1 truncate text-sm font-bold text-slate-900" title={summary.latestLabel}>
              {summary.latestLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">보험사</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">상품명</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">계약자</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">피보험자</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">계약/증권번호</th>
              <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-500">보험료</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">납입주기</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">보험기간</th>
              <th className="px-4 py-3 text-center text-[11px] font-bold text-slate-500">상태</th>
              <th className="px-4 py-3 text-center text-[11px] font-bold text-slate-500">등록방식</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500">등록시각</th>
              <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-500">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((contract, index) => {
              const statusMeta = getStatusMeta(contract.status);
              const entryMeta = getEntryMethodMeta(contract);
              return (
                <tr key={contract.id || `${contract.policyNumber}-${index}`} className="align-top hover:bg-slate-50/80">
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-slate-900">{contract.insurer}</span>
                      <div className="text-[11px] text-slate-500">{contract.productType}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-w-[220px] space-y-2">
                      <p className="truncate text-sm font-bold text-slate-900" title={contract.productName}>
                        {contract.productName}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {contract.rawPasteText && (
                          <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            원문 있음
                          </span>
                        )}
                        {Boolean(contract.parseWarnings?.length) && (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                            경고 {contract.parseWarnings?.length}건
                          </span>
                        )}
                        {contract.memo && (
                          <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                            메모
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800">{contract.contractor || '-'}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800">{contract.insuredPerson || '-'}</td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-semibold text-slate-800">{contract.policyNumber || '-'}</p>
                      <p className="text-[11px] text-slate-500">{contract.contractType}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900">{formatPremium(contract.premium)}</p>
                      {getPaymentInfoSummary(contract) && <p className="text-[11px] text-slate-500">{getPaymentInfoSummary(contract)}</p>}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{contract.paymentCycle || '-'}</td>
                  <td className="px-4 py-4">
                    <div className="space-y-1 text-sm text-slate-700">
                      <p>{contract.startDate || '-'}</p>
                      <p className="text-[11px] text-slate-400">~ {contract.endDate || '-'}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={clsx('inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold', statusMeta.className)}>
                      {contract.contractStatusLabel || statusMeta.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={clsx('inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold', entryMeta.className)}>
                      {entryMeta.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{formatRegisteredAt(contract.registeredAt)}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(contract, index)}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        title="수정"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('정말 이 계약 정보를 삭제하시겠습니까?')) {
                            onDelete(index);
                          }
                        }}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                        title="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
