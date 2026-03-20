import React, { useEffect, useMemo, useState } from 'react';
import { FileText, MapPin, Search, UserPlus } from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useIssuanceOperations } from '@/app/issuance/IssuanceContext';
import { ListPeriodControls } from '@/app/components/ListPeriodControls';
import { RegionMultiSelect } from '@/app/components/issuance/RegionMultiSelect';
import { StaffPerformanceBoard } from '@/app/components/issuance/StaffPerformanceBoard';
import { StaffPerformanceTable } from '@/app/components/issuance/StaffPerformanceTable';
import { AssignmentStatusBadge, TaskStatusBadge } from '@/app/components/issuance/IssuanceStatusBadge';
import {
  applyPerformancePeriodToRows,
  getDefaultCustomPeriodRange,
  getPerformanceCompletedLabel,
  getPerformancePeriodRange,
  getRowsDateBounds,
  type PerformancePeriodPreset,
} from '@/app/issuance/performancePeriodUtils';
import { compareBySortKey, matchesRegionSelections, summarizeRegionSelections, UNCLASSIFIED_REGION } from '@/app/issuance/regionUtils';
import type { AutoAssignmentPlan, IssuanceLocationSortKey, IssuanceTaskStatus, RegionSelection, StaffAssignmentStatus } from '@/app/types/issuance';

type ManagerFilter = 'all' | 'unassigned' | 'in_progress' | 'completed';
type AssignmentMode = 'auto' | 'manual';
type StaffViewLayout = 'table' | 'board';

interface ManagerLocationRow {
  taskId: string;
  claimId: string;
  customerName: string;
  customerPhone: string;
  locationId: string;
  locationName: string;
  locationAddress: string;
  regionLevel1?: string;
  regionLevel2?: string;
  regionLevel3?: string;
  visitPeriod: string;
  type: 'hospital' | 'pharmacy';
  requiredDocCount: number;
  staffId?: string;
  staffName?: string;
  staffPhone?: string;
  assignmentStatus?: StaffAssignmentStatus;
  status: IssuanceTaskStatus;
  boardStatus: ManagerFilter;
}

interface IssuanceManagerProps {
  onNavigate?: (target: string) => void;
}

export function IssuanceManager({ onNavigate }: IssuanceManagerProps) {
  const {
    managers,
    assignments,
    getManagerTasks,
    staffMembers,
    getStaffPerformanceRows,
    getAssignableStaffCandidates,
    getAutoAssignmentPlan,
    assignStaffToLocations,
    getLocationAssignment,
    getUserName,
  } = useIssuanceOperations();
  const availableManagers = useMemo(
    () => managers.filter((user) => user.role === 'manager'),
    [managers]
  );
  const [currentManagerId, setCurrentManagerId] = useState(
    availableManagers.find((manager) => manager.id === 'U-MGR-SEOUL')?.id ?? availableManagers[0]?.id ?? ''
  );
  const currentManager = useMemo(
    () => availableManagers.find((manager) => manager.id === currentManagerId) ?? null,
    [availableManagers, currentManagerId]
  );
  const myTasks = useMemo(
    () => (currentManagerId ? getManagerTasks(currentManagerId) : []),
    [currentManagerId, getManagerTasks]
  );
  const myStaff = useMemo(
    () => staffMembers.filter((user) => user.managerId === currentManagerId),
    [currentManagerId, staffMembers]
  );

  const [activeFilter, setActiveFilter] = useState<ManagerFilter>('unassigned');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'locations' | 'people'>('locations');
  const defaultCustomPeriodRange = useMemo(() => getDefaultCustomPeriodRange(), []);
  const [staffViewLayout, setStaffViewLayout] = useState<StaffViewLayout>('board');
  const [performancePeriodPreset, setPerformancePeriodPreset] = useState<PerformancePeriodPreset>('this_month');
  const [customPeriodStartDate, setCustomPeriodStartDate] = useState(defaultCustomPeriodRange.startDate);
  const [customPeriodEndDate, setCustomPeriodEndDate] = useState(defaultCustomPeriodRange.endDate);
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [assignmentMode, setAssignmentMode] = useState<AssignmentMode | null>(null);
  const [assignStaffId, setAssignStaffId] = useState('');
  const [selectedAutoStaffIds, setSelectedAutoStaffIds] = useState<string[]>([]);
  const [regionSelections, setRegionSelections] = useState<RegionSelection[]>([]);
  const [sortKey, setSortKey] = useState<IssuanceLocationSortKey>('unassigned_first');

  const regionLabelSummary = (regions?: RegionSelection[]) => {
    return summarizeRegionSelections(regions);
  };

  const staffRegionsById = useMemo(
    () => new Map(staffMembers.map((staff) => [staff.id, staff.assignedRegions ?? []] as const)),
    [staffMembers]
  );

  const currentManagerRegionSummary = useMemo(() => {
    const teamRegions = Array.from(
      new Map(
        myStaff.flatMap((staff) =>
          (staff.assignedRegions ?? []).map((region) => [
            `${region.level1}-${region.level2 ?? ''}-${region.level3 ?? ''}`,
            region,
          ] as const)
        )
      ).values()
    );

    return regionLabelSummary(teamRegions);
  }, [myStaff]);

  const rows = useMemo<ManagerLocationRow[]>(
    () =>
      myTasks.flatMap((task) =>
        task.locations.map((location) => {
          const assignment = getLocationAssignment(location.id);
          const boardStatus: ManagerFilter = !assignment
            ? 'unassigned'
            : assignment.status === 'completed' || location.status === 'completed'
              ? 'completed'
              : 'in_progress';

          return {
            taskId: task.id,
            claimId: task.claimId,
            customerName: task.customerName,
            customerPhone: task.customerPhone,
            locationId: location.id,
            locationName: location.name,
            locationAddress: location.address,
            regionLevel1: location.regionLevel1,
            regionLevel2: location.regionLevel2,
            regionLevel3: location.regionLevel3,
            visitPeriod: location.visitPeriod,
            type: location.type,
            requiredDocCount: location.requiredDocs.length,
            staffId: assignment?.staffId,
            staffName: assignment?.staffName,
            staffPhone: assignment?.staffPhone,
            assignmentStatus: assignment?.status,
            status: location.status,
            boardStatus,
          };
        })
      ),
    [getLocationAssignment, myTasks]
  );

  const stats = useMemo(
    () => ({
      total: rows.length,
      unassigned: rows.filter((row) => row.boardStatus === 'unassigned').length,
      inProgress: rows.filter((row) => row.boardStatus === 'in_progress').length,
      completed: rows.filter((row) => row.boardStatus === 'completed').length,
    }),
    [rows]
  );

  const baseFilteredRows = useMemo(() => {
    let result = rows;

    if (activeFilter !== 'all') {
      result = result.filter((row) => row.boardStatus === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((row) =>
        [
          row.customerName,
          row.claimId,
          row.locationName,
          row.locationAddress,
          row.regionLevel1,
          row.regionLevel2,
          row.regionLevel3,
          row.staffName,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      );
    }

    return result;
  }, [activeFilter, rows, searchQuery]);

  const filteredRows = useMemo(() => {
    const result = baseFilteredRows.filter((row) => matchesRegionSelections(row, regionSelections));

    return [...result].sort((left, right) =>
      compareBySortKey(
        {
          ...left,
          status: left.boardStatus === 'unassigned' ? 'unassigned' : left.status,
        },
        {
          ...right,
          status: right.boardStatus === 'unassigned' ? 'unassigned' : right.status,
        },
        sortKey
      )
    );
  }, [baseFilteredRows, regionSelections, sortKey]);

  const staffPerformanceRows = useMemo(() => {
    const rows = getStaffPerformanceRows(currentManagerId);
    if (!searchQuery.trim()) {
      return rows;
    }

    const query = searchQuery.trim().toLowerCase();
    return rows.filter((row) =>
      [
        row.staffName,
        row.staffPhone,
        ...row.assignedRegions.map((region) => [region.level1, region.level2, region.level3].filter(Boolean).join(' ')),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [currentManagerId, getStaffPerformanceRows, searchQuery]);

  const performancePeriodRange = useMemo(
    () =>
      getPerformancePeriodRange(
        performancePeriodPreset,
        customPeriodStartDate,
        customPeriodEndDate,
        new Date(),
        getRowsDateBounds(
          assignments.filter((assignment) => myStaff.some((staff) => staff.id === assignment.staffId)),
          (assignment) => assignment.completedAt,
          defaultCustomPeriodRange
        )
      ),
    [assignments, customPeriodEndDate, customPeriodStartDate, defaultCustomPeriodRange, myStaff, performancePeriodPreset]
  );

  const performanceCompletedLabel = useMemo(
    () => getPerformanceCompletedLabel(performancePeriodPreset),
    [performancePeriodPreset]
  );

  const displayStaffPerformanceRows = useMemo(
    () => applyPerformancePeriodToRows(staffPerformanceRows, assignments, performancePeriodRange),
    [assignments, performancePeriodRange, staffPerformanceRows]
  );

  const assignableStaffCandidates = useMemo(
    () => getAssignableStaffCandidates(selectedLocationIds, currentManagerId),
    [currentManagerId, getAssignableStaffCandidates, selectedLocationIds]
  );

  const autoAssignmentPlan = useMemo<AutoAssignmentPlan | null>(
    () => (assignmentMode === 'auto' ? getAutoAssignmentPlan(selectedLocationIds, currentManagerId) : null),
    [assignmentMode, currentManagerId, getAutoAssignmentPlan, selectedLocationIds]
  );

  const filteredAutoAssignmentPlan = useMemo<AutoAssignmentPlan | null>(() => {
    if (!autoAssignmentPlan) {
      return null;
    }

    const items = autoAssignmentPlan.items.filter((item) => selectedAutoStaffIds.includes(item.staffId));
    const byStaffMap = new Map<string, { id: string; name: string; company?: string; count: number }>();
    const byManagerMap = new Map<string, { id: string; name: string; company?: string; count: number }>();

    items.forEach((item) => {
      const staff = byStaffMap.get(item.staffId);
      if (staff) {
        staff.count += 1;
      } else {
        byStaffMap.set(item.staffId, { id: item.staffId, name: item.staffName, company: item.managerCompany, count: 1 });
      }

      const manager = byManagerMap.get(item.managerId);
      if (manager) {
        manager.count += 1;
      } else {
        byManagerMap.set(item.managerId, { id: item.managerId, name: item.managerName, company: item.managerCompany, count: 1 });
      }
    });

    return {
      ...autoAssignmentPlan,
      items,
      totalCount: items.length,
      regionMatchedCount: items.filter((item) => item.regionMatched).length,
      fallbackCount: items.filter((item) => !item.regionMatched).length,
      byStaff: [...byStaffMap.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, 'ko')),
      byManager: [...byManagerMap.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, 'ko')),
    };
  }, [autoAssignmentPlan, selectedAutoStaffIds]);

  const selectedLocationCount = selectedLocationIds.length;
  const selectedAutoAssignedCount = filteredAutoAssignmentPlan?.totalCount ?? 0;
  const selectedAutoRegionMatchedCount = filteredAutoAssignmentPlan?.regionMatchedCount ?? 0;
  const selectedAutoUnassignedCount = Math.max(0, selectedLocationCount - selectedAutoAssignedCount);
  const selectedAutoUnmatchedCount = Math.max(0, selectedLocationCount - selectedAutoRegionMatchedCount);

  useEffect(() => {
    if (autoAssignmentPlan) {
      setSelectedAutoStaffIds(autoAssignmentPlan.byStaff.map((group) => group.id));
      return;
    }

    setSelectedAutoStaffIds([]);
  }, [autoAssignmentPlan]);

  const allFilteredSelected = useMemo(
    () => filteredRows.length > 0 && filteredRows.every((row) => selectedLocationIds.includes(row.locationId)),
    [filteredRows, selectedLocationIds]
  );

  const toggleSelect = (locationId: string) => {
    setSelectedLocationIds((prev) =>
      prev.includes(locationId) ? prev.filter((item) => item !== locationId) : [...prev, locationId]
    );
  };

  const toggleFilteredSelection = () => {
    if (allFilteredSelected) {
      setSelectedLocationIds([]);
      return;
    }

    setSelectedLocationIds(filteredRows.map((row) => row.locationId));
  };

  const handleAssignStaff = () => {
    if (!assignStaffId || selectedLocationIds.length === 0) return;
    const staff = myStaff.find((user) => user.id === assignStaffId);
    if (!staff) return;

    assignStaffToLocations(selectedLocationIds, assignStaffId, currentManagerId);
    toast.success(`${selectedLocationIds.length}개 방문지가 ${staff.name}에게 배정되었습니다.`);
    setSelectedLocationIds([]);
    setShowAssignDialog(false);
    setAssignStaffId('');
  };

  const closeAssignDialog = () => {
    setShowAssignDialog(false);
    setAssignmentMode(null);
    setAssignStaffId('');
    setSelectedAutoStaffIds([]);
  };

  const openAssignDialog = () => {
    setShowAssignDialog(true);
    setAssignmentMode(null);
    setAssignStaffId('');
    setSelectedAutoStaffIds([]);
  };

  const handleAutoAssign = () => {
    if (selectedLocationIds.length === 0) return;
    if (!filteredAutoAssignmentPlan || filteredAutoAssignmentPlan.items.length === 0) return;

    const grouped = new Map<string, { staffId: string; managerId: string; locationIds: string[] }>();
    filteredAutoAssignmentPlan.items.forEach((item) => {
      const key = `${item.staffId}::${item.managerId}`;
      const current = grouped.get(key);
      if (current) {
        current.locationIds.push(item.locationId);
        return;
      }

      grouped.set(key, {
        staffId: item.staffId,
        managerId: item.managerId,
        locationIds: [item.locationId],
      });
    });

    grouped.forEach((group) => {
      assignStaffToLocations(group.locationIds, group.staffId, group.managerId);
    });

    toast.success(
      `총 ${selectedLocationCount}건 중 ${selectedAutoAssignedCount}개 배정 (직원 ${filteredAutoAssignmentPlan.byStaff.length}명), ${selectedAutoUnassignedCount}개 미배정`
    );
    setSelectedLocationIds([]);
    closeAssignDialog();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1e293b]">서류 발급 대행 - 팀별 리스트</h2>
            <p className="mt-1 text-xs text-slate-400">{getUserName(currentManagerId)} 팀 기준 방문지 리스트입니다.</p>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('locations')}
                className={clsx(
                  'rounded-full px-3 py-1.5 text-xs font-bold transition-colors',
                  viewMode === 'locations' ? 'bg-slate-100 text-[#1e293b]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                )}
              >
                방문지 목록
              </button>
              <button
                type="button"
                onClick={() => setViewMode('people')}
                className={clsx(
                  'rounded-full px-3 py-1.5 text-xs font-bold transition-colors',
                  viewMode === 'people' ? 'bg-slate-100 text-[#1e293b]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                )}
              >
                직원 현황
              </button>
            </div>
          </div>

          <div className="w-full max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder={viewMode === 'locations' ? '고객명, 청구ID, 병원/약국 검색' : '직원명, 연락처, 담당지역 검색'}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200"
            />
          </div>
        </div>
        {availableManagers.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">조회 팀</span>
            <select
              value={currentManagerId}
              onChange={(event) => {
                setCurrentManagerId(event.target.value);
                setSelectedLocationIds([]);
                setShowAssignDialog(false);
                setAssignStaffId('');
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600"
            >
              {availableManagers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}{manager.company ? ` · ${manager.company}` : ' · 내부팀'}
                </option>
              ))}
            </select>
            {currentManager && (
              <span className="text-xs text-slate-400">
                {currentManager.company ? `${currentManager.company} 소속` : '서울 내부 운영팀'}
              </span>
            )}
          </div>
        )}
      </div>

      {viewMode === 'locations' ? (
      <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {([
            { key: 'all', label: '전체', count: stats.total, minWidth: 'min-w-[76px]' },
            { key: 'unassigned', label: '직원 미배정', count: stats.unassigned, minWidth: 'min-w-[116px]' },
            { key: 'in_progress', label: '진행중', count: stats.inProgress, minWidth: 'min-w-[88px]' },
            { key: 'completed', label: '완료', count: stats.completed, minWidth: 'min-w-[76px]' },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={clsx(
                'inline-flex items-center justify-between gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors',
                tab.minWidth,
                activeFilter === tab.key ? 'bg-slate-100 text-[#1e293b] shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              )}
            >
              <span>{tab.label}</span>
              <span className="min-w-[3ch] text-right tabular-nums">{tab.count}</span>
            </button>
          ))}
          <span className="ml-2 text-xs font-medium text-slate-400">필터 결과 {filteredRows.length}개소</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <RegionMultiSelect
            rows={baseFilteredRows}
            value={regionSelections}
            onApply={(nextSelections) => {
              setRegionSelections(nextSelections);
              setSelectedLocationIds([]);
            }}
          />
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as IssuanceLocationSortKey)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-200"
          >
            <option value="unassigned_first">미배정 우선</option>
            <option value="region_asc">지역순</option>
            <option value="hospital_name_asc">기관명순</option>
            <option value="visit_date_desc">내원일 최신순</option>
            <option value="visit_date_asc">내원일 오래된순</option>
          </select>
          <button
            onClick={toggleFilteredSelection}
            disabled={filteredRows.length === 0}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            {allFilteredSelected ? '선택 해제' : '필터 결과 전체 선택'}
          </button>
          {selectedLocationIds.length > 0 && (
            <button
              onClick={openAssignDialog}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f766e] px-3 py-2 text-xs font-bold text-white hover:bg-[#0d6560]"
            >
              <UserPlus size={14} />
              직원 배정 ({selectedLocationIds.length}개소)
            </button>
          )}
        </div>
      </div>
      ) : (
        <div className="border-b border-slate-100 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-[#1e293b]">
              직원 현황 {displayStaffPerformanceRows.length}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setStaffViewLayout('table')}
                  className={clsx(
                    'rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors',
                    staffViewLayout === 'table'
                      ? 'bg-slate-100 text-[#1e293b]'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  )}
                >
                  표 보기
                </button>
                <button
                  type="button"
                  onClick={() => setStaffViewLayout('board')}
                  className={clsx(
                    'rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors',
                    staffViewLayout === 'board'
                      ? 'bg-slate-100 text-[#1e293b]'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  )}
                >
                  칸반 보기
                </button>
              </div>
              <ListPeriodControls
                preset={performancePeriodPreset}
                range={performancePeriodRange}
                onPresetChange={setPerformancePeriodPreset}
                onStartDateChange={setCustomPeriodStartDate}
                onEndDateChange={setCustomPeriodEndDate}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {viewMode === 'locations' ? (
        <table className="min-w-[1420px] w-full table-fixed text-left text-sm">
          <colgroup>
            <col className="w-12" />
            <col className="w-[150px]" />
            <col className="w-[180px]" />
            <col className="w-[120px]" />
            <col className="w-[470px]" />
            <col className="w-[90px]" />
            <col className="w-[100px]" />
            <col className="w-[150px]" />
            <col className="w-[150px]" />
          </colgroup>
          <thead className="sticky top-0 border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={() =>
                    setSelectedLocationIds(
                      allFilteredSelected
                        ? []
                        : filteredRows.map((row) => row.locationId)
                    )
                  }
                  className="rounded border-slate-300"
                />
              </th>
              <th className="px-4 py-3 font-medium">청구 ID</th>
              <th className="px-4 py-3 font-medium">고객명</th>
              <th className="px-4 py-3 font-medium">지역</th>
              <th className="px-4 py-3 font-medium">방문지</th>
              <th className="px-4 py-3 font-medium">유형</th>
              <th className="px-4 py-3 font-medium">서류 수</th>
              <th className="px-4 py-3 font-medium">배정 직원</th>
              <th className="px-4 py-3 font-medium">진행 상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRows.map((row) => (
              <tr
                key={row.locationId}
                className={clsx(
                  'transition-colors hover:bg-slate-50',
                  selectedLocationIds.includes(row.locationId) && 'bg-blue-50/50'
                )}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedLocationIds.includes(row.locationId)}
                    onChange={() => toggleSelect(row.locationId)}
                    className="rounded border-slate-300"
                  />
                </td>
                <td className="px-4 py-4 font-mono text-xs text-slate-500">{row.claimId}</td>
                <td className="px-4 py-4">
                  <div className="font-bold text-[#1e293b]">{row.customerName}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{row.customerPhone}</div>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  <div>{row.regionLevel1 ?? UNCLASSIFIED_REGION}</div>
                  <div className="mt-0.5">{row.regionLevel2 ?? UNCLASSIFIED_REGION}</div>
                  <div className="mt-0.5">{row.regionLevel3 ?? UNCLASSIFIED_REGION}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-bold text-[#1e293b]">{row.locationName}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} />
                    <span className="truncate">{row.locationAddress}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">내원 기간: {row.visitPeriod}</div>
                </td>
                <td className="px-4 py-4 text-slate-600">{row.type === 'pharmacy' ? '약국' : '병원'}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                    <FileText size={12} className="text-slate-400" />
                    {row.requiredDocCount}건
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {row.staffName ? (
                    <div>
                      {row.staffId && onNavigate ? (
                        <button
                          type="button"
                          onClick={() => onNavigate(`issuance-staff:${row.staffId}`)}
                          className="text-sm font-medium text-[#1e293b] hover:text-[#0f766e] hover:underline"
                        >
                          {row.staffName}
                        </button>
                      ) : (
                        <div className="text-sm font-medium text-[#1e293b]">{row.staffName}</div>
                      )}
                      {row.staffPhone && <div className="mt-0.5 text-xs text-slate-400">{row.staffPhone}</div>}
                      <div className="mt-0.5 text-xs text-slate-400">
                        {row.staffId ? regionLabelSummary(staffRegionsById.get(row.staffId)) ?? '담당 지역 미설정' : '담당 지역 미설정'}
                      </div>
                      {row.assignmentStatus && (
                        <div className="mt-2">
                          <AssignmentStatusBadge status={row.assignmentStatus} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">미배정</span>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <TaskStatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          staffViewLayout === 'table' ? (
            <StaffPerformanceTable
              rows={displayStaffPerformanceRows}
              completedLabel={performanceCompletedLabel}
              onNavigateToStaff={(staffId) => onNavigate?.(`issuance-staff:${staffId}`)}
              emptyMessage="표시할 직원 현황이 없습니다."
            />
          ) : (
            <StaffPerformanceBoard
              rows={displayStaffPerformanceRows}
              completedLabel={performanceCompletedLabel}
              onNavigateToStaff={(staffId) => onNavigate?.(`issuance-staff:${staffId}`)}
              emptyMessage="표시할 직원 현황이 없습니다."
            />
          )
        )}
      </div>

      {showAssignDialog && (
        <div className="fixed inset-0 z-[60] overflow-y-auto px-4 py-6">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={closeAssignDialog} />
          <div className="relative flex min-h-full items-start justify-center">
            <div className="my-4 flex w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl max-h-[calc(100vh-32px)]">
            <div className="shrink-0 border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#1e293b]">
                    {assignmentMode === null
                      ? '배정 방식 선택'
                      : assignmentMode === 'auto'
                        ? '자동 배정(지역 기준)'
                        : '수동 배정'}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {assignmentMode === null
                      ? `선택한 방문지 ${selectedLocationCount}개소의 배정 방식을 선택합니다.`
                      : assignmentMode === 'auto'
                        ? `선택한 방문지 ${selectedLocationCount}개소를 ${getUserName(currentManagerId)} 팀 기준으로 자동 배정합니다.`
                        : `선택한 방문지 ${selectedLocationCount}개소를 ${getUserName(currentManagerId)} 팀 직원에게 직접 배정합니다.`}
                  </p>
                </div>
                {assignmentMode !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setAssignmentMode(null);
                      setAssignStaffId('');
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                  >
                    방식 다시 선택
                  </button>
                )}
              </div>
            </div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {assignmentMode === null ? (
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setAssignmentMode('auto')}
                    className="rounded-xl border border-slate-200 p-5 text-left transition-colors hover:border-[#0f766e] hover:bg-emerald-50/40"
                  >
                    <div className="text-sm font-bold text-[#1e293b]">자동 배정(지역 기준)</div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      현재 관리자 팀 직원 중 지역 우선, 진행량 분산 기준으로 자동 배정합니다.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssignmentMode('manual')}
                    className="rounded-xl border border-slate-200 p-5 text-left transition-colors hover:border-[#0f766e] hover:bg-emerald-50/40"
                  >
                    <div className="text-sm font-bold text-[#1e293b]">수동 배정</div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      직원 후보를 직접 보고 선택해 배정합니다.
                    </p>
                  </button>
                </div>
              ) : assignmentMode === 'auto' ? (
                filteredAutoAssignmentPlan ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                        <div className="text-xs font-semibold text-slate-400">총 선택 건수</div>
                        <div className="mt-2 text-2xl font-bold text-[#1e293b]">{selectedLocationCount}</div>
                        <div className="mt-1 text-xs text-slate-400">체크한 방문지 전체 기준</div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                        <div className="text-xs font-semibold text-slate-400">지역 매치</div>
                        <div className="mt-2 text-2xl font-bold text-emerald-700">{selectedAutoRegionMatchedCount}</div>
                        <div className="mt-1 text-xs text-slate-400">선택 직원 기준 매칭 가능</div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                        <div className="text-xs font-semibold text-slate-400">매치 불가</div>
                        <div className="mt-2 text-2xl font-bold text-amber-600">{selectedAutoUnmatchedCount}</div>
                        <div className="mt-1 text-xs text-slate-400">선택 직원 기준 미매칭</div>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-[#1e293b]">
                          <span>직원별 배정 예정</span>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAutoStaffIds(
                                selectedAutoStaffIds.length === autoAssignmentPlan.byStaff.length
                                  ? []
                                  : autoAssignmentPlan.byStaff.map((group) => group.id)
                              )
                            }
                            className="text-[11px] text-slate-500 hover:text-slate-700"
                          >
                            {selectedAutoStaffIds.length === autoAssignmentPlan.byStaff.length ? '전체 해제' : '전체 선택'}
                          </button>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {autoAssignmentPlan.byStaff.map((group) => (
                            <label key={group.id} className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm hover:bg-slate-50">
                              <div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedAutoStaffIds.includes(group.id)}
                                    onChange={() =>
                                      setSelectedAutoStaffIds((prev) =>
                                        prev.includes(group.id) ? prev.filter((id) => id !== group.id) : [...prev, group.id]
                                      )
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                  />
                                  <span className="font-semibold text-[#1e293b]">{group.name}</span>
                                </div>
                                <div className="mt-0.5 text-xs text-slate-400">
                                  {regionLabelSummary(staffRegionsById.get(group.id)) ?? '담당 지역 미설정'}
                                </div>
                              </div>
                              <div className="font-bold text-[#1e293b]">{group.count}건</div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-[#1e293b]">
                          관리자/팀별 배정 예정
                        </div>
                        <div className="divide-y divide-slate-100">
                          {filteredAutoAssignmentPlan.byManager.map((group) => (
                            <div key={group.id} className="flex items-center justify-between px-4 py-3 text-sm">
                              <div>
                                <div className="font-semibold text-[#1e293b]">{group.name}</div>
                                <div className="mt-0.5 text-xs text-slate-400">
                                  {currentManagerRegionSummary ?? group.company ?? '내부팀'}
                                </div>
                              </div>
                              <div className="font-bold text-[#1e293b]">{group.count}건</div>
                            </div>
                          ))}
                          {filteredAutoAssignmentPlan.byManager.length === 0 && (
                            <div className="px-4 py-8 text-center text-sm text-slate-400">선택된 배정 팀이 없습니다.</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      현재 체크한 {selectedLocationCount}건 중 <span className="font-semibold text-[#1e293b]">{selectedAutoAssignedCount}건</span>은 선택 직원에게 배정되고,
                      <span className="ml-1 font-semibold text-amber-600">{selectedAutoUnassignedCount}건</span>은 미배정으로 남습니다.
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-12 text-center text-sm text-slate-400">
                    자동 배정 가능한 직원 후보가 없습니다.
                  </div>
                )
              ) : (
                <div className="space-y-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    표에서 직원을 선택하면 바로 배정할 수 있습니다.
                  </div>
                  <div className="rounded-lg border border-slate-200">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-[#1e293b]">
                      직원 선택
                    </div>
                    <StaffPerformanceTable
                      rows={assignableStaffCandidates}
                      variant="candidate"
                      selectable
                      selectedStaffId={assignStaffId}
                      onSelect={setAssignStaffId}
                      emptyMessage="선택 가능한 직원 후보가 없습니다."
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="shrink-0 flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
              <button
                onClick={closeAssignDialog}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                취소
              </button>
              {assignmentMode !== null && (
                <button
                  onClick={assignmentMode === 'auto' ? handleAutoAssign : handleAssignStaff}
                  disabled={assignmentMode === 'auto' ? !filteredAutoAssignmentPlan || filteredAutoAssignmentPlan.items.length === 0 : !assignStaffId}
                  className="rounded-lg bg-[#1e293b] px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {assignmentMode === 'auto' ? '자동 배정 완료' : '배정 완료'}
                </button>
              )}
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
