import { AlertTriangle, CheckCircle2, FileWarning, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';
import { useJourney } from '@/app/journey/JourneyContext';

export function JourneyRequirementPanel({ requestId, screen, title = '누락 방지 패널' }: { requestId: string; screen?: 'requests' | 'consultation' | 'meeting' | 'documents' | 'handoff' | 'claims'; title?: string; }) {
  const { journey } = useJourney(requestId);

  if (!journey) return null;

  const items = journey.missingRequirements.filter((item) => !screen || !item.screen || item.screen === screen);
  const blockItems = items.filter((item) => item.severity === 'block');
  const warnItems = items.filter((item) => item.severity === 'warn');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
        <div>
          <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert size={15} className="text-slate-500" /> {title}
          </div>
          <div className="text-xs text-slate-500 mt-1">상태 전환 전에 필요한 항목을 화면별로 묶어서 보여줍니다.</div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className={clsx('px-2 py-1 rounded-full border', blockItems.length ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100')}>
            차단 {blockItems.length}
          </span>
          <span className={clsx('px-2 py-1 rounded-full border', warnItems.length ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-100')}>
            경고 {warnItems.length}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-6 text-sm text-emerald-700 flex items-center gap-2 bg-emerald-50/50">
          <CheckCircle2 size={16} /> 현재 화면에서 막히는 누락 항목이 없습니다.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="px-4 py-3 flex items-start gap-3">
              <div className={clsx(
                'mt-0.5 size-8 rounded-lg border flex items-center justify-center shrink-0',
                item.severity === 'block' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
              )}>
                {item.severity === 'block' ? <AlertTriangle size={14} /> : <FileWarning size={14} />}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-800">{item.label}</div>
                <div className="text-xs text-slate-500 mt-1">{item.message}</div>
                {item.statusContext && <div className="mt-2 text-[11px] font-medium text-slate-400">컨텍스트: {item.statusContext}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/70">
        <div className="text-xs font-bold text-slate-500 uppercase mb-2">최근 감사 로그</div>
        <div className="space-y-1.5">
          {journey.auditTrail.slice(0, 3).map((event) => (
            <div key={event.id} className="text-xs text-slate-600 flex items-center justify-between gap-3">
              <span className="truncate">{event.message}</span>
              <span className="text-slate-400 shrink-0">{event.at}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
