import { AlertTriangle, CheckCircle2, Clock3, FileCheck2, Link2, ShieldCheck, User2 } from 'lucide-react';
import clsx from 'clsx';
import { useJourney } from '@/app/journey/JourneyContext';
import { getDocumentProgress, getIntegrationProgress } from '@/app/journey/rules';

const stageLabelMap = {
  request: '접수',
  consultation: '상담',
  meeting: '미팅',
  handoff: '이관',
  claims: '청구',
  closed: '종결',
} as const;

export function JourneyHeader({ requestId }: { requestId: string }) {
  const { journey } = useJourney(requestId);

  if (!journey) return null;

  const missingBlocks = journey.missingRequirements.filter((item) => item.severity === 'block').length;
  const missingWarns = journey.missingRequirements.filter((item) => item.severity === 'warn').length;
  const docs = getDocumentProgress(journey);
  const integrations = getIntegrationProgress(journey.integrationTasks);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80 flex flex-wrap items-center gap-3 justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
            <span className="rounded-full bg-white border border-slate-200 px-2 py-1">{requestId}</span>
            <span>{journey.customerName}</span>
            <span className="text-slate-300">/</span>
            <span>{stageLabelMap[journey.stage]}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-white px-2.5 py-1 text-xs font-bold">
              <ShieldCheck size={12} /> {journey.currentStageStatus.statusLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 text-xs font-bold">
              <Clock3 size={12} /> {journey.slaLabel}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-slate-400 font-semibold uppercase">다음 필수 액션</div>
          <div className="mt-1 text-sm font-bold text-slate-700 max-w-[360px]">{journey.nextAction}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-slate-100">
        <MetricCard icon={<AlertTriangle size={14} />} label="누락 항목" value={`${missingBlocks}개 차단`} sub={missingWarns ? `경고 ${missingWarns}개` : '경고 없음'} tone={missingBlocks > 0 ? 'danger' : 'safe'} />
        <MetricCard icon={<FileCheck2 size={14} />} label="문서 완결률" value={`${docs.verifiedCount}/${docs.total}`} sub={`${docs.percent}% 완료`} tone={docs.percent === 100 ? 'safe' : 'pending'} />
        <MetricCard icon={<Link2 size={14} />} label="외부 연동" value={`${integrations.verifiedCount}/${integrations.total}`} sub={integrations.failedCount ? `실패 ${integrations.failedCount}건` : '실패 없음'} tone={integrations.failedCount ? 'danger' : integrations.verifiedCount === integrations.total ? 'safe' : 'pending'} />
        <MetricCard icon={<User2 size={14} />} label="담당자 / 예정" value={journey.owner} sub={journey.nextDueAt} tone="neutral" />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub, tone }: { icon: React.ReactNode; label: string; value: string; sub: string; tone: 'safe' | 'pending' | 'danger' | 'neutral'; }) {
  return (
    <div className="bg-white px-4 py-3">
      <div className={clsx(
        'inline-flex items-center gap-1 text-[11px] font-bold uppercase',
        tone === 'safe' && 'text-emerald-700',
        tone === 'pending' && 'text-amber-700',
        tone === 'danger' && 'text-rose-700',
        tone === 'neutral' && 'text-slate-500',
      )}>
        {icon}
        {label}
      </div>
      <div className="mt-2 text-lg font-bold text-slate-800">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
