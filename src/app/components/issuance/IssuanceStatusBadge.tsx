import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Loader2,
  Upload,
  UserCheck,
} from 'lucide-react';
import clsx from 'clsx';
import type { IssuanceDocStatus, IssuanceTaskStatus, StaffAssignmentStatus } from '@/app/types/issuance';

const TASK_STYLES: Record<IssuanceTaskStatus, { bg: string; icon: React.ReactNode; label: string }> = {
  unassigned: { bg: 'bg-slate-100 text-slate-600 border-slate-200', icon: <Clock size={12} />, label: '미배정' },
  assigned: { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: <UserCheck size={12} />, label: '배정완료' },
  in_progress: { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Loader2 size={12} />, label: '진행중' },
  partial: { bg: 'bg-orange-50 text-orange-700 border-orange-200', icon: <AlertCircle size={12} />, label: '부분완료' },
  completed: { bg: 'bg-green-50 text-green-700 border-green-200', icon: <CheckCircle2 size={12} />, label: '완료' },
};

const DOC_STYLES: Record<IssuanceDocStatus, { bg: string; icon: React.ReactNode; label: string }> = {
  pending: { bg: 'bg-slate-100 text-slate-600 border-slate-200', icon: <Clock size={12} />, label: '대기' },
  uploaded: { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Upload size={12} />, label: '업로드됨' },
  ocr_processing: {
    bg: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: <Loader2 size={12} className="animate-spin" />,
    label: 'OCR 처리중',
  },
  ocr_done: { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Eye size={12} />, label: 'OCR 완료' },
  confirmed: { bg: 'bg-green-50 text-green-700 border-green-200', icon: <CheckCircle2 size={12} />, label: '확인완료' },
};

const ASSIGNMENT_STYLES: Record<StaffAssignmentStatus, { bg: string; label: string }> = {
  assigned: { bg: 'bg-blue-50 text-blue-700 border-blue-200', label: '배정됨' },
  in_progress: { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: '진행중' },
  docs_downloaded: { bg: 'bg-cyan-50 text-cyan-700 border-cyan-200', label: '서류다운' },
  visited: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', label: '방문완료' },
  uploaded: { bg: 'bg-orange-50 text-orange-700 border-orange-200', label: '업로드됨' },
  ocr_done: { bg: 'bg-purple-50 text-purple-700 border-purple-200', label: 'OCR완료' },
  confirmed: { bg: 'bg-teal-50 text-teal-700 border-teal-200', label: '확인완료' },
  completed: { bg: 'bg-green-50 text-green-700 border-green-200', label: '최종완료' },
};

export function TaskStatusBadge({ status }: { status: IssuanceTaskStatus }) {
  const style = TASK_STYLES[status];
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded border px-2.5 py-0.5 text-xs font-bold', style.bg)}>
      {style.icon}
      {style.label}
    </span>
  );
}

export function DocStatusBadge({ status }: { status: IssuanceDocStatus }) {
  const style = DOC_STYLES[status];
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-bold', style.bg)}>
      {style.icon}
      {style.label}
    </span>
  );
}

export function AssignmentStatusBadge({ status }: { status: StaffAssignmentStatus }) {
  const style = ASSIGNMENT_STYLES[status];
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-bold', style.bg)}>
      {style.label}
    </span>
  );
}
