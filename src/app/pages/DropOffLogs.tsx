import React from 'react';
import { 
  Filter, 
  Calendar, 
  Download, 
  Search,
  PieChart as PieChartIcon,
  ArrowUpRight,
  TrendingUp,
  Users,
  AlertCircle,
  CalendarRange,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import clsx from 'clsx';

// --- Mock Data ---

const KPI_STATS = [
  { 
    label: '총 이탈 고객', 
    value: '645', 
    change: '+12.5%', 
    trend: 'up', 
    icon: Users,
    color: 'bg-slate-100 text-slate-600'
  },
  { 
    label: '이번 달 이탈률', 
    value: '24.8%', 
    change: '-2.1%', 
    trend: 'down', 
    icon: TrendingUp, // Down is good for churn
    color: 'bg-rose-50 text-rose-600' 
  },
  { 
    label: '주요 이탈 단계', 
    value: '상담 단계', 
    subtext: '전체의 65%', 
    icon: AlertCircle,
    color: 'bg-amber-50 text-amber-600'
  },
  { 
    label: '평균 이탈 소요일', 
    value: '3.2일', 
    change: '-0.5일', 
    trend: 'down',
    icon: CalendarRange,
    color: 'bg-blue-50 text-blue-600'
  }
];

const REASON_DISTRIBUTION = [
  { name: '부재/무응답', value: 350, color: '#94a3b8' },
  { name: '신뢰 부족', value: 120, color: '#64748b' },
  { name: '비용 부담', value: 80, color: '#475569' },
  { name: '가족 반대', value: 45, color: '#334155' },
  { name: '관심 없음', value: 30, color: '#1e293b' },
];

const STAGE_COMPARISON = [
  { stage: '접수', dropoff: 20, conversion: 95 },
  { stage: '상담', dropoff: 450, conversion: 60 },
  { stage: '미팅', dropoff: 210, conversion: 45 },
  { stage: '심사', dropoff: 80, conversion: 85 },
  { stage: '청구', dropoff: 40, conversion: 98 },
];

const DROP_OFF_TREND = [
  { date: '1/15', value: 12 },
  { date: '1/16', value: 18 },
  { date: '1/17', value: 15 },
  { date: '1/18', value: 25 },
  { date: '1/19', value: 22 },
  { date: '1/20', value: 30 },
  { date: '1/21', value: 28 },
  { date: '1/22', value: 20 },
  { date: '1/23', value: 15 },
  { date: '1/24', value: 10 },
];

const LOGS = [
  { id: 'L-001', customer: '김철수', stage: '상담(Consult)', reason: '부재/무응답', detail: '3회 통화 시도했으나 받지 않음', date: '2026-01-19', staff: '박미팅', amount: '1,200,000원' },
  { id: 'L-002', customer: '박영희', stage: '상담(Consult)', reason: '신뢰 부족', detail: '수수료 구조에 의문 제기', date: '2026-01-18', staff: '최상담', amount: '850,000원' },
  { id: 'L-003', customer: '이민호', stage: '미팅(Meeting)', reason: '노쇼', detail: '약속 시간 잊음 (연락 두절)', date: '2026-01-18', staff: '한유준', amount: '3,500,000원' },
  { id: 'L-004', customer: '정수진', stage: '심사(Review)', reason: '서류 미비', detail: '필수 위임장 제출 거부', date: '2026-01-17', staff: '김심사', amount: '2,100,000원' },
  { id: 'L-005', customer: '최성민', stage: '상담(Consult)', reason: '단순 변심', detail: '나중에 다시 진행하겠다고 함', date: '2026-01-17', staff: '이영업', amount: '-' },
  { id: 'L-006', customer: '강다니엘', stage: '미팅(Meeting)', reason: '가족 반대', detail: '배우자가 진행 원치 않음', date: '2026-01-16', staff: '박미팅', amount: '4,200,000원' },
];

export function DropOffLogs() {
  return (
    <div className="flex flex-col h-full space-y-6 overflow-y-auto pb-10 custom-scrollbar">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">이탈/취소 분석 (Drop-off Analysis)</h1>
          <p className="text-slate-500 text-sm">고객 이탈 원인을 심층 분석하고 전환율을 개선하기 위한 인사이트를 제공합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar size={16} />
            <span>2026.01.01 - 2026.01.31</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
            <Download size={16} /> 리포트 다운로드
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_STATS.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={clsx("p-2.5 rounded-lg", stat.color)}>
                <stat.icon size={20} />
              </div>
              {stat.change && (
                <span className={clsx(
                  "text-xs font-bold px-2 py-0.5 rounded-full",
                  stat.trend === 'up' && stat.label.includes('이탈') ? "bg-rose-50 text-rose-600" :
                  stat.trend === 'down' && stat.label.includes('이탈') ? "bg-emerald-50 text-emerald-600" :
                  "bg-slate-100 text-slate-600"
                )}>
                  {stat.change}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              {stat.subtext && <p className="text-xs text-slate-400 mt-1">{stat.subtext}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trend Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">일별 이탈 추이</h3>
                <p className="text-xs text-slate-400 mt-1">최근 10일간의 이탈 고객 수 변화</p>
              </div>
              <div className="flex gap-2">
                {['일간', '주간', '월간'].map(t => (
                  <button key={t} className={clsx("px-3 py-1 text-xs font-medium rounded-full transition-colors", t === '일간' ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200")}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DROP_OFF_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8' }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#475569" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stage Breakdown Bar Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6">단계별 이탈 현황</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STAGE_COMPARISON} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="stage" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Bar dataKey="dropoff" name="이탈 수" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Reason Distribution */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
            <h3 className="font-bold text-slate-900 text-lg mb-2">이탈 사유 상세 분포</h3>
            <p className="text-xs text-slate-400 mb-6">전체 이탈 건수 중 사유별 비중</p>
            
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={REASON_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {REASON_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xs text-slate-400">최다 사유</div>
                <div className="text-lg font-bold text-slate-700">부재</div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {REASON_DISTRIBUTION.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-900 font-bold">{item.value}건</span>
                    <span className="text-xs text-slate-400 w-8 text-right">
                      {Math.round((item.value / REASON_DISTRIBUTION.reduce((a, b) => a + b.value, 0)) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">상세 이탈 로그</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs font-bold">128건</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-600 cursor-pointer hover:bg-slate-50">
               <Filter size={14} />
               필터
             </div>
             <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                   type="text" 
                   placeholder="고객명, 담당자, 사유 검색..." 
                   className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">로그 ID</th>
                <th className="px-6 py-3 font-medium">일시</th>
                <th className="px-6 py-3 font-medium">고객 정보</th>
                <th className="px-6 py-3 font-medium">예상 환급액</th>
                <th className="px-6 py-3 font-medium">이탈 단계</th>
                <th className="px-6 py-3 font-medium">사유</th>
                <th className="px-6 py-3 font-medium">상세 내용</th>
                <th className="px-6 py-3 font-medium">담당자</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{log.id}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{log.date}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{log.customer}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600">{log.amount}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "inline-flex px-2 py-0.5 rounded text-xs font-medium border",
                      log.stage.includes('상담') ? "bg-blue-50 text-blue-700 border-blue-100" :
                      log.stage.includes('미팅') ? "bg-purple-50 text-purple-700 border-purple-100" :
                      "bg-slate-50 text-slate-600 border-slate-200"
                    )}>
                      {log.stage.split('(')[0]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="font-medium text-slate-700">{log.reason}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs max-w-xs truncate" title={log.detail}>{log.detail}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="size-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                        {log.staff[0]}
                      </div>
                      <span className="text-slate-600 text-xs">{log.staff}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>총 128개 항목 중 1-6 표시</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>이전</button>
            <button className="px-2 py-1 bg-slate-900 text-white border border-slate-900 rounded">1</button>
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
            <span className="px-1">...</span>
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}