import React from 'react';
import { 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Target,
  PieChart as PieChartIcon,
  Activity,
  UserX,
  CreditCard,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  ComposedChart,
  Legend,
  Area
} from 'recharts';
import clsx from 'clsx';

// --- Mock Data ---

// 1. Acquisition Channels
const CHANNEL_DATA = [
  { name: '인스타그램', value: 45, fill: '#1e293b' }, // Dark slate
  { name: '네이버 블로그', value: 25, fill: '#475569' },
  { name: '지인 추천', value: 15, fill: '#64748b' },
  { name: '검색 광고', value: 10, fill: '#94a3b8' },
  { name: '기타', value: 5, fill: '#cbd5e1' },
];

// 2. Funnel Data
const FUNNEL_DATA = [
  { stage: '접수', count: 1250, conversion: 100, fill: '#cbd5e1' },
  { stage: '상담 완료', count: 980, conversion: 78.4, fill: '#94a3b8' },
  { stage: '미팅 진행', count: 650, conversion: 66.3, fill: '#64748b' },
  { stage: '계약 체결', count: 420, conversion: 64.6, fill: '#334155' },
  { stage: '청구 완료', count: 380, conversion: 90.5, fill: '#0f766e' },
];

// 3. Weekly Trends (Leads vs Contracts)
// Keep zero-inflow days visible in the tooltip while breaking the inflow line itself.
const WEEKLY_TRENDS = [
  { date: '1/19', leads: 45, contracts: 12, leadsLine: 45 },
  { date: '1/20', leads: 52, contracts: 15, leadsLine: 52 },
  { date: '1/21', leads: 0, contracts: 10, leadsLine: null },
  { date: '1/22', leads: 65, contracts: 18, leadsLine: 65 },
  { date: '1/23', leads: 48, contracts: 14, leadsLine: 48 },
  { date: '1/24', leads: 0, contracts: 20, leadsLine: null },
  { date: '1/25', leads: 42, contracts: 11, leadsLine: 42 },
];

// 4. Customer Segments
const CUSTOMER_SEGMENTS = [
  { name: '개인 (근로소득)', value: 65, fill: '#1e293b' },
  { name: '개인사업자', value: 25, fill: '#475569' },
  { name: '법인', value: 10, fill: '#94a3b8' },
];

// 5. Churn Reasons
const CHURN_REASONS = [
  { reason: '수수료 부담', count: 145 },
  { reason: '단순 변심/무응답', count: 89 },
  { reason: '타 업체 계약', count: 65 },
  { reason: '가족/지인 반대', count: 42 },
  { reason: '서비스 불만족', count: 12 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b] tracking-tight">플랫폼 인사이트 (Platform Insights)</h1>
          <p className="text-slate-500 mt-1 text-sm">고객 유입부터 계약 전환까지의 전체 흐름 분석</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
             <Download size={14} /> 리포트 다운로드
          </button>
          <div className="text-xs font-medium bg-slate-800 text-white px-3 py-1.5 rounded shadow-sm flex items-center gap-1">
            <Activity size={12} className="text-emerald-400" /> Live Updated
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard 
          title="총 유입 고객 (Total Leads)" 
          value="1,250" 
          unit="명"
          trend="+12.5%" 
          trendUp={true}
          icon={<Users size={20} className="text-slate-600" />}
        />
        <KPICard 
          title="계약 체결율 (Conversion)" 
          value="33.6" 
          unit="%"
          trend="+2.1%" 
          trendUp={true}
          icon={<Target size={20} className="text-blue-600" />}
        />
        <KPICard 
          title="이탈률 (Churn Rate)" 
          value="18.2" 
          unit="%"
          trend="-1.5%" 
          trendUp={true} // Lower churn is good, displayed as green
          inverseTrend={true}
          icon={<UserX size={20} className="text-rose-500" />}
        />
        <KPICard 
          title="예상 매��액 (Revenue)" 
          value="4.2" 
          unit="억"
          trend="+5.8%" 
          trendUp={true}
          icon={<CreditCard size={20} className="text-emerald-600" />}
        />
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Acquisition Channels (Pie Chart) - Span 4 */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-[#1e293b] flex items-center gap-2">
              <PieChartIcon size={16} className="text-slate-400" /> 유입 채널 분석
            </h3>
            <p className="text-xs text-slate-400 mt-1">가장 많은 고객이 유입된 경로</p>
          </div>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <PieChart>
                <Pie
                  data={CHANNEL_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CHANNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#334155' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-medium text-slate-500 ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
              <div className="text-2xl font-bold text-[#1e293b]">45%</div>
              <div className="text-[10px] text-slate-400 font-medium">Instagram</div>
            </div>
          </div>
        </div>

        {/* 2. Funnel Analysis (Bar Chart) - Span 8 */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-[#1e293b] flex items-center gap-2">
                <TrendingUp size={16} className="text-slate-400" /> 단계별 전환 퍼널 (Funnel)
              </h3>
              <p className="text-xs text-slate-400 mt-1">접수부터 청구 완료까지의 단계별 전환율</p>
            </div>
            <div className="text-xs font-medium px-2 py-1 bg-slate-50 text-slate-500 rounded border border-slate-100">
              전체 평균 전환율: <span className="text-[#1e293b] font-bold">30.4%</span>
            </div>
          </div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={FUNNEL_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-lg">
                          <p className="text-xs font-bold text-slate-800 mb-1">{data.stage}</p>
                          <p className="text-sm text-[#1e293b]">건수: {data.count}건</p>
                          <p className="text-xs text-blue-600 font-medium mt-1">전환율: {data.conversion}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {FUNNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 3. Weekly Trends (Composed Chart) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="font-bold text-[#1e293b]">주간 유입 및 계약 추이</h3>
            <p className="text-xs text-slate-400 mt-1">최근 7일간의 신규 유입 대비 계약 성사 건수</p>
          </div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <ComposedChart data={WEEKLY_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#475569' }}
                  domain={[0, 'dataMax + 4']}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  domain={[0, 'dataMax + 10']}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value, name, item) => {
                    if (name === 'leads') {
                      return [`${item?.payload?.leads ?? 0}건`, '신규 유입'];
                    }
                    return [`${value}건`, '계약 체결'];
                  }}
                />
                <Legend iconType="circle" formatter={(value) => <span className="text-xs font-medium text-slate-500">{value === 'leads' ? '신규 유입' : '계약 체결'}</span>} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="leadsLine"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#cbd5e1' }}
                  activeDot={{ r: 6 }}
                  connectNulls={false}
                  name="leads"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="contracts"
                  stroke="#1e293b"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#1e293b' }}
                  activeDot={{ r: 6 }}
                  name="contracts"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Customer Segments & Churn (Mixed) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Segments */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-[#1e293b] text-sm mb-4">고객 유형 분포</h3>
            <div className="flex-1 flex flex-col justify-center gap-4">
              {CUSTOMER_SEGMENTS.map((seg, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-600">{seg.name}</span>
                    <span className="font-bold text-[#1e293b]">{seg.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${seg.value}%`, backgroundColor: seg.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Churn Reasons */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-[#1e293b] text-sm mb-4">주요 이탈 사유 (Top 3)</h3>
            <div className="flex-1 space-y-3">
              {CHURN_REASONS.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-700 truncate">{item.reason}</div>
                    <div className="text-[10px] text-slate-400">{item.count}건</div>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 py-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-50 rounded border border-slate-100 transition-colors">
                전체 사유 보기
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function KPICard({ title, value, unit, trend, trendUp, inverseTrend, icon }: any) {
  // inverseTrend: true means "Lower is Better" (e.g. Churn Rate)
  // trendUp: true means the number increased numerically.
  
  // Display Logic:
  // If inverseTrend is false (default): Increase = Green (Good), Decrease = Red (Bad)
  // If inverseTrend is true (e.g. Churn): Increase = Red (Bad), Decrease = Green (Good)

  let isPositive = false;
  if (inverseTrend) {
    isPositive = !trend.startsWith('+'); // If churn went down (-), it's positive
  } else {
    isPositive = trend.startsWith('+'); // If revenue went up (+), it's positive
  }

  const trendColor = isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50';
  const TrendIcon = trend.startsWith('+') ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-[120px]">
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className={`p-1.5 rounded-lg bg-slate-50`}>{icon}</div>
      </div>
      <div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold text-[#1e293b] tracking-tight">{value}</span>
          {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className={clsx("text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5", trendColor)}>
            <TrendIcon size={12} /> {trend}
          </span>
          <span className="text-[10px] text-slate-400">vs 지난달</span>
        </div>
      </div>
    </div>
  );
}
