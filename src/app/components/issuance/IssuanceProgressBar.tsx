import React from 'react';
import clsx from 'clsx';

interface IssuanceProgressBarProps {
  completed: number;
  total: number;
  size?: 'sm' | 'md';
}

export function IssuanceProgressBar({ completed, total, size = 'sm' }: IssuanceProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex items-center gap-2">
      <div className={clsx('flex-1 overflow-hidden rounded-full bg-slate-100', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500',
            percentage === 100 ? 'bg-green-500' : percentage > 0 ? 'bg-amber-500' : 'bg-slate-200'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span
        className={clsx(
          'shrink-0 font-bold tabular-nums',
          size === 'sm' ? 'text-[11px] text-slate-500' : 'text-xs text-slate-600'
        )}
      >
        {completed}/{total}
      </span>
    </div>
  );
}
