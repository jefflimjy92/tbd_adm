import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Headphones, 
  CalendarDays, 
  FileCheck, 
  Files, 
  Settings,
  Menu,
  Bell,
  Search,
  User,
  ListTodo,
  PieChart,
  Briefcase,
  ScrollText,
  ChevronDown,
  ChevronRight,
  Database,
  ArrowRightLeft,
  BarChart3,
  Stamp
} from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { Customers } from './pages/Customers';
import { Requests } from './pages/Requests';
import { Consultation } from './pages/Consultation';
import { MeetingSchedule } from './pages/MeetingSchedule';
import { MeetingExecution } from './pages/MeetingExecution';
import { ContractList } from './pages/ContractList';
import { Claims } from './pages/Claims';
import { IssuanceOperations } from './pages/IssuanceOperations';
import { IssuanceMaster } from './pages/IssuanceMaster';
import { IssuanceStaff } from './pages/IssuanceStaff';
import { DropOffLogs } from './pages/DropOffLogs';
import { Documents } from './pages/Documents';
import { SystemSettings } from './pages/Settings';
import { Leads } from './pages/Leads';
import { Handoff } from './pages/Handoff';
import { DailyReport } from './pages/DailyReport';
import clsx from 'clsx';
import { Toaster } from 'sonner';
import { JourneyProvider } from '@/app/journey/JourneyContext';
import { IssuanceProvider } from '@/app/issuance/IssuanceContext';

// Type for navigation items
type NavItem = 
  | 'dashboard' 
  | 'customers' 
  | 'leads'
  | 'requests' 
  | 'consultation' // 단일 메뉴로 복귀
  | 'handoff'
  | 'meeting-schedule' 
  | 'meeting-all'      // 미팅 전체
  | 'meeting-refund'   // 3년 환급 미팅
  | 'meeting-simple'   // 간편 청구 미팅
  | 'contracts' 
  | 'claims-all'       // 청구 전체
  | 'claims-refund'    // 3년 환급 청구
  | 'claims-simple'    // 간편 청구 
  | 'claims-issuance'  // 서류 발급 운영
  | 'issuance-master'
  | 'issuance-manager'
  | 'issuance-staff'
  | 'dropoff' 
  | 'daily-report'
  | 'documents' 
  | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('requests');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState('관리자(Admin)');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [targetRequestId, setTargetRequestId] = useState<string | null>(null);

  const goToTab = (tab: NavItem) => {
    setSelectedCustomerId(null);
    setTargetRequestId(null);
    setActiveTab(tab);
  };

  // Enhanced navigation handler that supports customer ID and Request ID linkage
  const handleNavigate = (target: string) => {
    // 1. Customer Deep Link: "customers:ID"
    if (target.startsWith('customers:')) {
      const customerId = target.split(':')[1];
      setSelectedCustomerId(customerId);
      setTargetRequestId(null);
      setActiveTab('customers');
    } 
    // 2. Request Deep Link (for Team Processing): "consultation:REQ_ID"
    else if (target.includes(':')) {
      const [path, id] = target.split(':');
      setTargetRequestId(id);
      setSelectedCustomerId(null);
      
      // Map path to tab
      if (path === 'consultation') setActiveTab('consultation');
      else if (path === 'consultation-v2') setActiveTab('consultation');
      else if (path === 'meeting-all') setActiveTab('meeting-all');
      else if (path === 'claims-all') setActiveTab('claims-all');
      else setActiveTab(path as NavItem);
    }
    // 3. Simple Navigation
    else {
      setSelectedCustomerId(null);
      setTargetRequestId(null);
      // Fallback mapping
      if (target === 'consultation') setActiveTab('consultation');
      else if (target === 'consultation-v2') setActiveTab('consultation');
      else if (target === 'meeting-execution') setActiveTab('meeting-all');
      else if (target === 'claims') setActiveTab('claims-all');
      else setActiveTab(target as NavItem);
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'customers': return <Customers initialCustomerId={selectedCustomerId} onNavigate={handleNavigate} />;
      case 'leads': return <Leads />;
      case 'requests': return <Requests onNavigate={handleNavigate} />;
      
      case 'consultation': return <Consultation initialRequestId={targetRequestId} />; // 전체 (type undefined)
      case 'handoff': return <Handoff onNavigate={handleNavigate} />;
      
      case 'meeting-schedule': return <MeetingSchedule onNavigate={handleNavigate} />;
      
      // Meeting Execution
      case 'meeting-all': return <MeetingExecution onNavigate={handleNavigate} initialRequestId={targetRequestId} />;
      case 'meeting-refund': return <MeetingExecution onNavigate={handleNavigate} type="refund" initialRequestId={targetRequestId} />;
      case 'meeting-simple': return <MeetingExecution onNavigate={handleNavigate} type="simple" initialRequestId={targetRequestId} />;
      
      case 'contracts': return <ContractList />;
      
      // Claims
      case 'claims-all': return <Claims initialRequestId={targetRequestId} onNavigate={handleNavigate} />;
      case 'claims-refund': return <Claims type="refund" initialRequestId={targetRequestId} onNavigate={handleNavigate} />;
      case 'claims-simple': return <Claims type="simple" initialRequestId={targetRequestId} onNavigate={handleNavigate} />;
      case 'claims-issuance': return <IssuanceOperations initialClaimId={targetRequestId} />;
      case 'issuance-master': return <IssuanceMaster initialClaimId={targetRequestId} onNavigate={handleNavigate} />;
      case 'issuance-manager': return <IssuanceMaster initialClaimId={targetRequestId} onNavigate={handleNavigate} />;
      case 'issuance-staff': return <IssuanceStaff initialStaffId={targetRequestId} onNavigate={handleNavigate} />;
      
      case 'dropoff': return <DropOffLogs />;
      case 'daily-report': return <DailyReport />;
      case 'documents': return <Documents />;
      case 'settings': return <SystemSettings />;
      default: return <Dashboard />;
    }
  };

  // Helper to get header title
  const getHeaderTitle = () => {
    switch(activeTab) {
      case 'dashboard': return '데이터 건전성 대시보드';
      case 'customers': return '고객 관리 ';
      case 'leads': return 'DB 배정 관리 (신청 유입)';
      case 'requests': return '접수 현황 (전체)';
      case 'consultation': return '상담 리스트 (전체)';
      case 'handoff': return '이관(Handoff) 관리';
      case 'meeting-schedule': return '미팅 스케줄 관리';
      case 'meeting-all': return '미팅 리스트 (전체)';
      case 'meeting-refund': return '3년 환급 미팅 리스트';
      case 'meeting-simple': return '간편 청구 관리 리스트';
      case 'contracts': return '계약 체결 및 관리';
      case 'claims-all': return '청구 리스트 (전체)';
      case 'claims-refund': return '3년 환급 심사 (Claims Analysis)';
      case 'claims-simple': return '간편 청구 접수 (Simple Claims)';
      case 'claims-issuance': return '서류 발급 대행 - 전체 리스트';
      case 'issuance-master': return '서류 발급 대행 - 전체 리스트';
      case 'issuance-manager': return '서류 발급 대행 - 전체 리스트';
      case 'issuance-staff': return '서류 발급 대행 - 직원별 리스트';
      case 'dropoff': return '이탈 사유 분석 (Read-only)';
      case 'daily-report': return '일일 보고서';
      case 'documents': return '서류 및 동의서 관리';
      case 'settings': return '시스템 설정';
      default: return '';
    }
  };

  return (
    <JourneyProvider>
      <IssuanceProvider>
      <div className="flex h-screen w-full bg-[#F6F7F9] font-sans text-slate-900 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={clsx(
            "flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-20 shrink-0",
            isSidebarOpen ? "w-60" : "w-16"
          )}
        >
          {/* Logo Area */}
          <div className={clsx("flex items-center h-16 border-b border-slate-100 transition-all", isSidebarOpen ? "px-6" : "justify-center px-0")}>
            <div className="size-8 rounded bg-[#1e293b] flex items-center justify-center font-bold text-white shrink-0">
              TB
            </div>
            {isSidebarOpen && (
              <span className="ml-3 font-bold text-lg tracking-tight text-[#1e293b] whitespace-nowrap">더바다 Ops</span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar">
            <ul className="space-y-0.5 px-3">
            {/* <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label="대시보드" 
              isActive={activeTab === 'dashboard'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('dashboard')} 
            /> */}
            
            {/* <div className="my-2" /> */}

             <SidebarItem 
              icon={<Users size={20} />} 
              label="고객 관리" 
              isActive={activeTab === 'customers'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('customers')} 
            />
            <SidebarItem 
              icon={<Database size={20} />} 
              label="DB 배정 관리" 
              isActive={activeTab === 'leads'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('leads')} 
            />
            <SidebarItem 
              icon={<ListTodo size={20} />} 
              label="접수 현황" 
              isActive={activeTab === 'requests'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('requests')} 
            />
            
            <div className="my-2" />
            
            <SidebarItem 
              icon={<Headphones size={20} />} 
              label="상담 리스트" 
              isActive={activeTab === 'consultation'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('consultation')} 
            />
            <SidebarItem 
              icon={<ArrowRightLeft size={20} />} 
              label="이관 관리" 
              isActive={activeTab === 'handoff'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('handoff')} 
            />

            <SidebarItem 
              icon={<CalendarDays size={20} />} 
              label="미팅 스케줄" 
              isActive={activeTab === 'meeting-schedule'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('meeting-schedule')} 
            />

            {/* 미팅 리스트 Group */}
            <SidebarGroup 
              icon={<Briefcase size={20} />}
              label="미팅 리스트"
              isOpen={isSidebarOpen}
              activeIds={['meeting-all', 'meeting-refund', 'meeting-simple']}
              currentTab={activeTab}
              onParentClick={() => goToTab('meeting-all')}
              onToggle={() => setIsSidebarOpen(true)}
            >
               <SidebarSubItem 
                label="3년 환급 미팅" 
                isActive={activeTab === 'meeting-refund'} 
                onClick={() => goToTab('meeting-refund')} 
              />
              <SidebarSubItem 
                label="간편 청구 관리" 
                isActive={activeTab === 'meeting-simple'} 
                onClick={() => goToTab('meeting-simple')} 
              />
            </SidebarGroup>

            <SidebarItem 
              icon={<ScrollText size={20} />} 
              label="계약 관리" 
              isActive={activeTab === 'contracts'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('contracts')} 
            />

            {/* 청구 리스트 Group */}
            <SidebarGroup 
              icon={<FileCheck size={20} />}
              label="청구 리스트"
              isOpen={isSidebarOpen}
              activeIds={['claims-all', 'claims-refund', 'claims-simple']}
              currentTab={activeTab}
              onParentClick={() => goToTab('claims-all')}
              onToggle={() => setIsSidebarOpen(true)}
            >
               <SidebarSubItem 
                label="3년 환급 심사" 
                isActive={activeTab === 'claims-refund'} 
                onClick={() => goToTab('claims-refund')} 
              />
              <SidebarSubItem 
                label="간편 청구 접수" 
                isActive={activeTab === 'claims-simple'} 
                onClick={() => goToTab('claims-simple')} 
              />
            </SidebarGroup>

            <SidebarGroup
              icon={<Stamp size={20} />}
              label="서류 발급 대행"
              isOpen={isSidebarOpen}
              activeIds={['issuance-master', 'issuance-manager', 'issuance-staff', 'claims-issuance']}
              currentTab={activeTab}
              onParentClick={() => goToTab('issuance-master')}
              onToggle={() => setIsSidebarOpen(true)}
            >
              <SidebarSubItem
                label="전체 리스트"
                isActive={activeTab === 'issuance-master' || activeTab === 'claims-issuance'}
                onClick={() => goToTab('issuance-master')}
              />
              <SidebarSubItem
                label="직원별 리스트"
                isActive={activeTab === 'issuance-staff'}
                onClick={() => goToTab('issuance-staff')}
              />
            </SidebarGroup>

             <div className="my-2" />
            <SidebarItem 
              icon={<PieChart size={20} />} 
              label="이탈/취소 분석" 
              isActive={activeTab === 'dropoff'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('dropoff')} 
            />
            <SidebarItem 
              icon={<BarChart3 size={20} />} 
              label="일일 보고서" 
              isActive={activeTab === 'daily-report'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('daily-report')} 
            />
            <SidebarItem 
              icon={<Files size={20} />} 
              label="서류/동의 관리" 
              isActive={activeTab === 'documents'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('documents')} 
            />
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="시스템 설정" 
              isActive={activeTab === 'settings'} 
              isOpen={isSidebarOpen}
              onClick={() => goToTab('settings')} 
            />
            </ul>
          </nav>

          {/* Footer Toggle */}
          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
            <div className="flex items-center text-slate-500 text-sm">
              <span className="font-bold text-[#1e293b] text-lg">
                {getHeaderTitle()}
              </span>
              <span className="mx-3 text-slate-300">|</span>
              <span className="text-slate-500 font-medium">Ops System #1 (Request Centric)</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="접수ID, 고객명, 연락처 검색..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:bg-white transition-all"
                />
              </div>

              <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors group">
                <Bell size={20} className="group-hover:text-[#0f766e]" />
                <span className="absolute top-2 right-2 size-2 bg-amber-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="h-8 w-px bg-slate-200"></div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-[#1e293b]">김실무 매니저</div>
                  <div className="text-xs text-white bg-[#0f766e] px-1.5 py-0.5 rounded inline-block font-medium mt-0.5">{userRole}</div>
                </div>
                <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 cursor-pointer hover:bg-slate-200">
                  <User size={18} />
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto bg-[#F6F7F9] relative">
            <div className="p-8 min-w-[1000px] h-full">
              {renderContent()}
            </div>
          </div>
        </main>
        <Toaster richColors position="top-right" />
      </div>
      </IssuanceProvider>
    </JourneyProvider>
  );
}

// Minimal Sidebar Item (No Blue Accent)
function SidebarItem({ 
  icon, 
  label, 
  isActive, 
  isOpen, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  isActive: boolean, 
  isOpen: boolean, 
  onClick: () => void
}) {
  return (
    <li className="mb-0.5">
      <button
        onClick={onClick}
        className={clsx(
          "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group relative",
          isActive 
            ? "bg-slate-100 text-[#1e293b] font-bold" // Active: Light Grey bg + Dark Text
            : "text-slate-500 hover:bg-slate-50 hover:text-[#1e293b]", // Inactive
          !isOpen && "justify-center"
        )}
      >
        <span className={clsx("shrink-0", isActive ? "text-[#1e293b]" : "text-slate-400 group-hover:text-[#1e293b]")}>
          {icon}
        </span>
        
        {isOpen && (
          <span className="ml-3 truncate text-sm whitespace-nowrap">{label}</span>
        )}
        
        {!isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e293b] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
            {label}
          </div>
        )}
      </button>
    </li>
  );
}

// Minimal Sidebar Group (No Blue Accent)
function SidebarGroup({
  icon,
  label,
  isOpen,
  activeIds,
  currentTab,
  children,
  onParentClick,
  onToggle
}: {
  icon: React.ReactNode,
  label: string,
  isOpen: boolean,
  activeIds: string[],
  currentTab: string,
  children: React.ReactNode,
  onParentClick: () => void,
  onToggle: () => void
}) {
  const isActiveGroup = activeIds.includes(currentTab);
  const [expanded, setExpanded] = useState(isActiveGroup);

  useEffect(() => {
    if (isActiveGroup) setExpanded(true);
  }, [isActiveGroup]);

  const handleExpandClick = (e: React.MouseEvent) => {
     e.stopPropagation();
     if (!isOpen) onToggle();
     setExpanded(!expanded);
  };

  const handleMainClick = () => {
     onParentClick();
     if (!isOpen) {
        onToggle();
        setExpanded(true);
     }
  };

  return (
    <li className="mb-0.5">
      <div 
         className={clsx(
            "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group relative cursor-pointer",
            isActiveGroup
              ? "bg-slate-100 text-[#1e293b] font-bold" 
              : "text-slate-500 hover:bg-slate-50 hover:text-[#1e293b]"
         )}
         onClick={handleMainClick}
      >
        <span className={clsx("shrink-0", isActiveGroup ? "text-[#1e293b]" : "text-slate-400 group-hover:text-[#1e293b]")}>
          {icon}
        </span>
        
        {isOpen && (
          <>
            <span className="ml-3 truncate text-sm whitespace-nowrap flex-1 text-left">{label}</span>
            <button 
               onClick={handleExpandClick}
               className="shrink-0 text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200/50"
            >
               {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          </>
        )}
        
        {!isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e293b] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
            {label}
          </div>
        )}
      </div>

      {/* Children Container - Minimal (No Indent Lines) */}
      <div 
        className={clsx(
          "overflow-hidden transition-all duration-300 ease-in-out",
          (expanded && isOpen) ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
         <ul className="mt-0.5 space-y-0.5">
            {children}
         </ul>
      </div>
    </li>
  );
}

// Minimal Sub Item (No Dots, No Lines)
function SidebarSubItem({
   label,
   isActive,
   onClick
}: {
   label: string,
   isActive: boolean,
   onClick: () => void
}) {
   return (
      <li>
         <button
            onClick={(e) => {
               e.stopPropagation();
               onClick();
            }}
            className={clsx(
               "w-full flex items-center pl-11 pr-3 py-2 text-xs transition-colors rounded-lg",
               isActive 
                  ? "text-[#1e293b] font-bold bg-slate-50" // Active: Dark text + Subtle bg
                  : "text-slate-500 hover:text-[#1e293b] hover:bg-slate-50" // Inactive
            )}
         >
            <span className="truncate">{label}</span>
         </button>
      </li>
   );
}
