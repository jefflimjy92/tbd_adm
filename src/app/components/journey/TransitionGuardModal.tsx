import clsx from 'clsx';
import { AlertTriangle, ChevronLeft, ChevronRight, XCircle } from 'lucide-react';
import type { RequirementAlert } from '@/app/journey/types';

interface TransitionGuardModalProps {
  open: boolean;
  items: RequirementAlert[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
  onClose: () => void;
}

export function TransitionGuardModal({
  open,
  items,
  currentIndex,
  onPrev,
  onNext,
  onJump,
  onClose,
}: TransitionGuardModalProps) {
  if (!open) return null;

  const current = items[currentIndex];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-500" />
              필수값 누락으로 상태 변경 불가
            </h3>
            <p className="text-xs text-slate-500 mt-1">누락 항목을 순서대로 확인하고 입력한 뒤 다시 상태를 반영하세요.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-white hover:text-slate-600 transition-colors">
            <XCircle size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
            <div className="text-xs font-bold text-rose-700">{current?.label || '누락 항목'}</div>
            <div className="text-xs text-rose-600 mt-1">{current?.message || '누락 항목을 먼저 입력해 주세요.'}</div>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="max-h-52 overflow-y-auto divide-y divide-slate-100">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => onJump(index)}
                  className={clsx(
                    'w-full text-left px-3 py-2.5 transition-colors',
                    index === currentIndex ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'
                  )}
                >
                  <div className="text-xs font-bold text-slate-700">{item.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.message}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500">{items.length > 0 ? `${currentIndex + 1} / ${items.length}` : '0 / 0'}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={14} />
              이전
            </button>
            <button
              onClick={onNext}
              className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              다음
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => onJump(currentIndex)}
              className="px-3 py-2 rounded-lg bg-[#1e293b] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              해당 항목으로 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
