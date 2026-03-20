import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  AutoAssignmentPlan,
  AutoAssignmentPlanGroup,
  AutoAssignmentPlanItem,
  AssignableStaffCandidate,
  ClaimIssuanceOpsStatus,
  ClaimIssuanceRow,
  IssuanceRequestFlowStatus,
  IssuanceTask,
  IssuanceUser,
  OcrResult,
  PackResult,
  RegionSelection,
  RequiredDocument,
  StaffPerformanceSummary,
  StaffAssignment,
  StaffAssignmentStatus,
} from '@/app/types/issuance';
import {
  INITIAL_STAFF_ASSIGNMENTS,
  ISSUANCE_TASKS,
  ISSUANCE_USERS,
  MOCK_OCR_RESULTS,
} from '@/app/mockData/issuanceMock';
import { getMonthlyIncentiveByCompletedCount } from '@/app/issuance/incentiveUtils';
import { matchesRegionSelection, parseRegionLevels, UNCLASSIFIED_REGION } from '@/app/issuance/regionUtils';

interface IssuanceContextValue {
  tasks: IssuanceTask[];
  assignments: StaffAssignment[];
  users: IssuanceUser[];
  managers: IssuanceUser[];
  staffMembers: IssuanceUser[];
  ocrMocks: Record<string, OcrResult>;
  getUserName: (userId?: string) => string;
  getUserPhone: (userId?: string) => string;
  getTaskByClaimId: (claimId: string) => IssuanceTask | null;
  getManagerTasks: (managerId: string) => IssuanceTask[];
  getAssignmentsByStaff: (staffId: string) => StaffAssignment[];
  getStaffPerformanceSummary: (staffId: string, referenceDate?: string) => StaffPerformanceSummary;
  getStaffPerformanceRows: (managerId?: string, referenceDate?: string) => StaffPerformanceSummary[];
  getAssignableStaffCandidates: (
    locationIds: string[],
    managerId?: string,
    referenceDate?: string
  ) => AssignableStaffCandidate[];
  getAutoAssignmentPlan: (locationIds: string[], managerId?: string, referenceDate?: string) => AutoAssignmentPlan | null;
  getLocationAssignment: (locationId: string) => StaffAssignment | undefined;
  getClaimIssuanceRows: (claimId: string) => ClaimIssuanceRow[];
  addManualRequest: (claimId: string, customerName: string) => void;
  deleteLocation: (locationId: string) => void;
  sendToOps: (locationIds: string[]) => void;
  assignManagerToLocations: (locationIds: string[], managerId: string, assignedById: string) => void;
  assignStaffToLocations: (locationIds: string[], staffId: string, assignedByManagerId: string) => void;
  assignAuto: (locationIds: string[], managerId?: string, referenceDate?: string) => AutoAssignmentPlan | null;
  downloadSubmissionDocs: (assignmentId: string) => void;
  printTripDocuments: (locationIds: string[], generatedBy: string) => PackResult | null;
  uploadRequiredDocument: (assignmentId: string, docId: string, fileName: string) => void;
  runMockOcr: (assignmentId: string, docId: string) => void;
  confirmRequiredDocument: (assignmentId: string, docId: string) => void;
  finalizeAssignment: (assignmentId: string) => boolean;
}

const IssuanceContext = createContext<IssuanceContextValue | null>(null);

const today = () => new Date().toISOString().split('T')[0];
const EMPTY_BREAKDOWN: Partial<Record<StaffAssignmentStatus, number>> = {
  assigned: 0,
  in_progress: 0,
  docs_downloaded: 0,
  visited: 0,
  uploaded: 0,
  ocr_done: 0,
  confirmed: 0,
};

function cloneDocs(docs: RequiredDocument[]) {
  return docs.map((doc) => ({ ...doc, ocrResult: doc.ocrResult ? { ...doc.ocrResult } : undefined }));
}

function withRegion(location: IssuanceTask['locations'][number]) {
  return {
    ...location,
    ...parseRegionLevels(location.address),
  };
}

function hydrateTask(task: IssuanceTask) {
  return {
    ...task,
    locations: task.locations.map((location) => withRegion({ ...location, requiredDocs: cloneDocs(location.requiredDocs) })),
  };
}

function hydrateAssignment(assignment: StaffAssignment, tasks: IssuanceTask[]) {
  const task = tasks.find((item) => item.id === assignment.taskId || item.locations.some((location) => location.id === assignment.locationId));
  const location = task?.locations.find((item) => item.id === assignment.locationId);

  return {
    ...assignment,
    taskId: task?.id ?? assignment.taskId,
    locationName: assignment.locationName || location?.name || '',
    locationAddress: assignment.locationAddress || location?.address || '',
    locationType: assignment.locationType ?? location?.type ?? 'hospital',
    visitPeriod: assignment.visitPeriod || location?.visitPeriod || '',
    regionLevel1: assignment.regionLevel1 ?? location?.regionLevel1 ?? UNCLASSIFIED_REGION,
    regionLevel2: assignment.regionLevel2 ?? location?.regionLevel2 ?? UNCLASSIFIED_REGION,
    regionLevel3: assignment.regionLevel3 ?? location?.regionLevel3 ?? UNCLASSIFIED_REGION,
    requiredDocs: cloneDocs(assignment.requiredDocs ?? location?.requiredDocs ?? []),
  };
}

function getLatestAssignment(assignments: StaffAssignment[], locationId: string) {
  return assignments
    .filter((assignment) => assignment.locationId === locationId)
    .sort((left, right) => left.assignedAt.localeCompare(right.assignedAt))
    .at(-1);
}

function areAllDocsConfirmed(docs: RequiredDocument[]) {
  return docs.length > 0 && docs.every((doc) => doc.status === 'confirmed');
}

function hasAnyUploadProgress(docs: RequiredDocument[]) {
  return docs.some((doc) => doc.status !== 'pending');
}

function hasExceptionCandidate(docs: RequiredDocument[]) {
  return docs.some((doc) => (doc.ocrResult?.confidence ?? 100) < 80);
}

function deriveLocationStatus(task: IssuanceTask, locationIndex: number, assignment?: StaffAssignment) {
  const location = task.locations[locationIndex];
  const docs = assignment?.requiredDocs ?? location.requiredDocs;

  if (areAllDocsConfirmed(docs)) {
    return 'completed' as const;
  }

  if (
    assignment &&
    ['in_progress', 'docs_downloaded', 'visited', 'uploaded', 'ocr_done', 'confirmed'].includes(assignment.status)
  ) {
    return hasAnyUploadProgress(docs) ? ('partial' as const) : ('in_progress' as const);
  }

  if (assignment) {
    return 'assigned' as const;
  }

  if (location.assignedManagerId) {
    return 'assigned' as const;
  }

  return 'unassigned' as const;
}

function deriveTaskStatus(task: IssuanceTask) {
  const statuses = task.locations.map((location) => location.status);

  if (statuses.length > 0 && statuses.every((status) => status === 'completed')) {
    return 'completed' as const;
  }

  if (statuses.some((status) => status === 'partial')) {
    return 'partial' as const;
  }

  if (statuses.some((status) => status === 'in_progress')) {
    return 'in_progress' as const;
  }

  if (statuses.some((status) => status === 'assigned')) {
    return 'assigned' as const;
  }

  return 'unassigned' as const;
}

function syncTasksWithAssignments(tasks: IssuanceTask[], assignments: StaffAssignment[]) {
  return tasks.map((task) => {
    const locations = task.locations.map((location, index) => {
      const assignment = getLatestAssignment(assignments, location.id);
      return {
        ...location,
        status: deriveLocationStatus(task, index, assignment),
      };
    });

    const nextTask = {
      ...task,
      locations,
    };

    const status = deriveTaskStatus(nextTask);

    return {
      ...nextTask,
      status,
      completedAt: status === 'completed' ? task.completedAt ?? today() : undefined,
    };
  });
}

function deriveClaimOpsStatus(
  rowStatus: ClaimIssuanceRow['status'],
  requestStatus: IssuanceRequestFlowStatus,
  location: IssuanceTask['locations'][number],
  docs: RequiredDocument[],
  assignment?: StaffAssignment
): ClaimIssuanceOpsStatus {
  if (rowStatus === 'completed') {
    return '최종완료';
  }

  if (hasExceptionCandidate(docs)) {
    return '예외검토필요';
  }

  if (hasAnyUploadProgress(docs) || assignment?.status === 'uploaded' || assignment?.status === 'ocr_done') {
    return '업로드중';
  }

  if (assignment?.submissionDocsDownloaded || assignment?.status === 'docs_downloaded' || assignment?.status === 'visited') {
    return '방문준비';
  }

  if (assignment) {
    return '직원배정';
  }

  if (location.assignedManagerId) {
    return '관리자배정';
  }

  return '미배정';
}

function buildPackResult(tasks: IssuanceTask[], locationIds: string[], generatedBy: string): PackResult | null {
  const items = tasks.flatMap((task) =>
    task.locations
      .filter((location) => locationIds.includes(location.id))
      .map((location) => ({
        locationId: location.id,
        hospitalName: location.name,
        customerName: task.customerName,
        customerSSN: task.customerSSN,
        customerAddress: task.customerAddress,
        requiredDocNames: location.requiredDocs.map((doc) => doc.name),
        signatureDataUrl: task.signatureDataUrl,
      }))
  );

  if (items.length === 0) {
    return null;
  }

  return {
    id: `PACK-${Date.now()}`,
    items,
    generatedFiles: [
      {
        id: `PACKFILE-${Date.now()}`,
        name: `${generatedBy}_${items.length}개소_3종서류.zip`,
        personalizedCount: items.length * 3,
      },
    ],
  };
}

function parseLocalDate(value?: string) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function isSameDay(target?: string, referenceDate = today()) {
  return !!target && target === referenceDate;
}

function isSameMonth(target?: string, referenceDate = today()) {
  const targetDate = parseLocalDate(target);
  const reference = parseLocalDate(referenceDate);
  if (!targetDate || !reference) {
    return false;
  }

  return (
    targetDate.getFullYear() === reference.getFullYear() &&
    targetDate.getMonth() === reference.getMonth()
  );
}

function isSameWeek(target?: string, referenceDate = today()) {
  const targetDate = parseLocalDate(target);
  const reference = parseLocalDate(referenceDate);
  if (!targetDate || !reference) {
    return false;
  }

  const referenceStart = new Date(reference);
  const referenceDay = (referenceStart.getDay() + 6) % 7;
  referenceStart.setDate(referenceStart.getDate() - referenceDay);
  referenceStart.setHours(0, 0, 0, 0);

  const referenceEnd = new Date(referenceStart);
  referenceEnd.setDate(referenceStart.getDate() + 6);
  referenceEnd.setHours(23, 59, 59, 999);

  return targetDate >= referenceStart && targetDate <= referenceEnd;
}

function formatDateWeight(value?: string) {
  return value ? Number(value.replaceAll('-', '')) : 0;
}

function locationMatchesStaffRegions(
  assignedRegions: RegionSelection[] | undefined,
  location: { regionLevel1?: string; regionLevel2?: string; regionLevel3?: string }
) {
  if (!assignedRegions?.length) {
    return false;
  }

  return assignedRegions.some((region) => {
    const scopedRegion: RegionSelection = {
      level1: region.level1,
      level2: region.level2 ?? UNCLASSIFIED_REGION,
      ...(region.level3 ? { level3: region.level3 } : {}),
    };

    return matchesRegionSelection(location, scopedRegion);
  });
}

function summarizePlanGroups(
  items: AutoAssignmentPlanItem[],
  key: 'staffId' | 'managerId'
): AutoAssignmentPlanGroup[] {
  const grouped = new Map<string, AutoAssignmentPlanGroup>();

  items.forEach((item) => {
    const id = item[key];
    const name = key === 'staffId' ? item.staffName : item.managerName;
    const company = key === 'staffId' ? item.managerCompany : item.managerCompany;
    const current = grouped.get(id);

    if (current) {
      current.count += 1;
      return;
    }

    grouped.set(id, {
      id,
      name,
      company,
      count: 1,
    });
  });

  return [...grouped.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, 'ko'));
}

function getManagerRegions(users: IssuanceUser[], managerId?: string) {
  if (!managerId) {
    return [];
  }

  const regions = users
    .filter((user) => user.role === 'staff' && user.managerId === managerId)
    .flatMap((user) => user.assignedRegions ?? []);
  const seen = new Set<string>();

  return regions.filter((region) => {
    const key = `${region.level1}::${region.level2 ?? ''}::${region.level3 ?? ''}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function IssuanceProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<IssuanceTask[]>(() => {
    const hydratedTasks = ISSUANCE_TASKS.map((task) => hydrateTask(task));
    const hydratedAssignments = INITIAL_STAFF_ASSIGNMENTS.map((assignment) => hydrateAssignment(assignment, hydratedTasks));
    return syncTasksWithAssignments(hydratedTasks, hydratedAssignments);
  });
  const [assignments, setAssignments] = useState<StaffAssignment[]>(() => {
    const hydratedTasks = ISSUANCE_TASKS.map((task) => hydrateTask(task));
    return INITIAL_STAFF_ASSIGNMENTS.map((assignment) => hydrateAssignment(assignment, hydratedTasks));
  });

  const users = ISSUANCE_USERS;
  const managers = useMemo(() => users.filter((user) => user.role === 'manager' || user.role === 'master'), [users]);
  const staffMembers = useMemo(() => users.filter((user) => user.role === 'staff'), [users]);
  const ocrMocks = MOCK_OCR_RESULTS;
  const usersById = useMemo(() => Object.fromEntries(users.map((user) => [user.id, user])), [users]);
  const locationById = useMemo(
    () =>
      new Map(
        tasks.flatMap((task) =>
          task.locations.map((location) => [
            location.id,
            {
              ...location,
              taskId: task.id,
              customerId: task.customerId,
              customerName: task.customerName,
            },
          ])
        )
      ),
    [tasks]
  );

  const getUserName = (userId?: string) => (userId ? usersById[userId]?.name ?? '미지정' : '미배정');
  const getUserPhone = (userId?: string) => (userId ? usersById[userId]?.phone ?? '-' : '-');

  const getTaskByClaimId = (claimId: string) => tasks.find((task) => task.claimId === claimId) ?? null;
  const getManagerTasks = (managerId: string) =>
    tasks
      .map((task) => {
        const locations = task.locations.filter((location) => {
          const assignment = getLatestAssignment(assignments, location.id);
          return location.assignedManagerId === managerId || assignment?.assignedByManagerId === managerId;
        });

        if (locations.length === 0) {
          return null;
        }

        const scopedTask = { ...task, locations };
        return {
          ...scopedTask,
          status: deriveTaskStatus(scopedTask),
        };
      })
      .filter((task): task is IssuanceTask => task !== null);
  const getAssignmentsByStaff = (staffId: string) => assignments.filter((assignment) => assignment.staffId === staffId);

  const getStaffPerformanceSummary = (staffId: string, referenceDate = today()): StaffPerformanceSummary => {
    const staff = usersById[staffId];
    const manager = staff?.managerId ? usersById[staff.managerId] : undefined;
    const ownAssignments = assignments.filter((assignment) => assignment.staffId === staffId);
    const completedAssignments = ownAssignments.filter(
      (assignment) => assignment.status === 'completed' && assignment.completedAt
    );
    const inProgressAssignments = ownAssignments.filter((assignment) => assignment.status !== 'completed');

    const inProgressBreakdown = inProgressAssignments.reduce<Partial<Record<StaffAssignmentStatus, number>>>(
      (acc, assignment) => ({
        ...acc,
        [assignment.status]: (acc[assignment.status] ?? 0) + 1,
      }),
      { ...EMPTY_BREAKDOWN }
    );
    const inRegionInProgressCount = inProgressAssignments.filter((assignment) =>
      locationMatchesStaffRegions(staff?.assignedRegions, assignment)
    ).length;
    const outOfRegionInProgressCount = inProgressAssignments.length - inRegionInProgressCount;

    const completedToday = completedAssignments.filter((assignment) =>
      isSameDay(assignment.completedAt, referenceDate)
    ).length;
    const completedThisWeek = completedAssignments.filter((assignment) =>
      isSameWeek(assignment.completedAt, referenceDate)
    ).length;
    const completedThisMonth = completedAssignments.filter((assignment) =>
      isSameMonth(assignment.completedAt, referenceDate)
    ).length;
    const completedThisMonthAssignments = completedAssignments.filter((assignment) =>
      isSameMonth(assignment.completedAt, referenceDate)
    );
    const completedThisMonthInRegion = completedThisMonthAssignments.filter((assignment) =>
      locationMatchesStaffRegions(staff?.assignedRegions, assignment)
    ).length;
    const completedThisMonthOutOfRegion = completedThisMonthAssignments.length - completedThisMonthInRegion;
    const lastCompletedAt = [...completedAssignments]
      .sort((left, right) => formatDateWeight(right.completedAt) - formatDateWeight(left.completedAt))
      .at(0)?.completedAt;

    return {
      staffId,
      staffName: staff?.name ?? '미지정',
      staffPhone: staff?.phone,
      managerId: manager?.id,
      managerName: manager?.name,
      managerCompany: manager?.company,
      managerRegions: getManagerRegions(users, manager?.id),
      assignedRegions: staff?.assignedRegions ?? [],
      inProgressCount: inProgressAssignments.length,
      inRegionInProgressCount,
      outOfRegionInProgressCount,
      inProgressBreakdown,
      completedToday,
      completedThisWeek,
      completedThisMonth,
      completedThisMonthInRegion,
      completedThisMonthOutOfRegion,
      completedTotal: completedAssignments.length,
      estimatedWeeklyIncentive: 0,
      estimatedMonthlyIncentive: getMonthlyIncentiveByCompletedCount(completedThisMonth),
      lastCompletedAt,
    };
  };

  const getStaffPerformanceRows = (managerId?: string, referenceDate = today()) =>
    staffMembers
      .filter((staff) => !managerId || staff.managerId === managerId)
      .map((staff) => getStaffPerformanceSummary(staff.id, referenceDate))
      .sort(
        (left, right) =>
          right.completedThisMonth - left.completedThisMonth ||
          left.inProgressCount - right.inProgressCount ||
          left.staffName.localeCompare(right.staffName, 'ko')
      );

  const getAssignableStaffCandidates = (
    locationIds: string[],
    managerId?: string,
    referenceDate = today()
  ): AssignableStaffCandidate[] => {
    const selectedLocations = locationIds
      .map((locationId) => locationById.get(locationId))
      .filter((location): location is NonNullable<typeof location> => Boolean(location));

    return getStaffPerformanceRows(managerId, referenceDate)
      .map((summary) => {
        const matchedLocationCount = selectedLocations.reduce(
          (count, location) =>
            count + (locationMatchesStaffRegions(summary.assignedRegions, location) ? 1 : 0),
          0
        );

        return {
          ...summary,
          regionMatched: matchedLocationCount > 0,
          matchedLocationCount,
          candidateRank: 0,
        };
      })
      .sort(
        (left, right) =>
          right.matchedLocationCount - left.matchedLocationCount ||
          left.inProgressCount - right.inProgressCount ||
          right.completedThisMonth - left.completedThisMonth ||
          left.staffName.localeCompare(right.staffName, 'ko')
      )
      .map((candidate, index) => ({
        ...candidate,
        candidateRank: index + 1,
      }));
  };

  const getAutoAssignmentPlan = (
    locationIds: string[],
    managerId?: string,
    referenceDate = today()
  ): AutoAssignmentPlan | null => {
    const selectedLocations = locationIds
      .map((locationId) => locationById.get(locationId))
      .filter((location): location is NonNullable<typeof location> => Boolean(location));

    if (selectedLocations.length === 0) {
      return null;
    }

    const allPerformanceRows = getStaffPerformanceRows(managerId, referenceDate);
    const simulatedLoads = new Map<string, number>();
    const items: AutoAssignmentPlanItem[] = [];

    selectedLocations.forEach((location) => {
      const baseCandidates = allPerformanceRows.filter((summary) => {
        if (managerId) {
          return summary.managerId === managerId;
        }

        const isSeoulLocation = location.regionLevel1 === '서울';
        const isSeoulStaff = summary.assignedRegions.some((region) => region.level1 === '서울');
        return isSeoulLocation ? isSeoulStaff : !isSeoulStaff;
      });

      const candidateSource = baseCandidates.length > 0 ? baseCandidates : allPerformanceRows;
      const rankedCandidates = candidateSource
        .map((summary) => {
          const regionMatched = locationMatchesStaffRegions(summary.assignedRegions, location);
          const simulatedInProgress = summary.inProgressCount + (simulatedLoads.get(summary.staffId) ?? 0);

          return {
            ...summary,
            regionMatched,
            simulatedInProgress,
          };
        })
        .sort(
          (left, right) =>
            Number(right.regionMatched) - Number(left.regionMatched) ||
            left.simulatedInProgress - right.simulatedInProgress ||
            right.completedThisMonth - left.completedThisMonth ||
            left.staffName.localeCompare(right.staffName, 'ko')
        );

      const selectedCandidate = rankedCandidates[0];
      if (!selectedCandidate || !selectedCandidate.managerId) {
        return;
      }

      simulatedLoads.set(selectedCandidate.staffId, (simulatedLoads.get(selectedCandidate.staffId) ?? 0) + 1);

      items.push({
        locationId: location.id,
        locationName: location.name,
        locationAddress: location.address,
        staffId: selectedCandidate.staffId,
        staffName: selectedCandidate.staffName,
        staffPhone: selectedCandidate.staffPhone,
        managerId: selectedCandidate.managerId,
        managerName: selectedCandidate.managerName ?? getUserName(selectedCandidate.managerId),
        managerCompany: selectedCandidate.managerCompany,
        regionMatched: selectedCandidate.regionMatched,
        fallbackReason: selectedCandidate.regionMatched ? undefined : '담당 지역 미매치',
      });
    });

    if (items.length === 0) {
      return null;
    }

    return {
      items,
      totalCount: items.length,
      regionMatchedCount: items.filter((item) => item.regionMatched).length,
      fallbackCount: items.filter((item) => !item.regionMatched).length,
      byStaff: summarizePlanGroups(items, 'staffId'),
      byManager: summarizePlanGroups(items, 'managerId'),
    };
  };

  const getLocationAssignment = (locationId: string) => getLatestAssignment(assignments, locationId);

  const getClaimIssuanceRows = (claimId: string): ClaimIssuanceRow[] => {
    const task = getTaskByClaimId(claimId);
    if (!task) return [];

    return task.locations.map((location) => {
      const assignment = getLocationAssignment(location.id);
      const docs = cloneDocs(assignment?.requiredDocs ?? location.requiredDocs);
      const rowStatus = areAllDocsConfirmed(docs)
        ? 'completed'
        : hasAnyUploadProgress(docs)
          ? 'partial'
          : 'pending';

      return {
        id: location.id,
        taskId: task.id,
        locationId: location.id,
        claimId: task.claimId,
        customerName: task.customerName,
        source: location.source,
        date: location.visitPeriod,
        hospital: location.name,
        location: location.address,
        insurer: location.insurer,
        requestStatus: location.requestStatus,
        opsStatus: deriveClaimOpsStatus(rowStatus, location.requestStatus, location, docs, assignment),
        assignedManagerName: location.assignedManagerName,
        assignedStaffId: assignment?.staffId,
        assignedStaffName: assignment?.staffName,
        assignedStaffPhone: assignment?.staffPhone ?? getUserPhone(assignment?.staffId),
        docs,
        status: rowStatus,
        fileName: rowStatus === 'completed' ? `${location.name}_통합.zip` : null,
      };
    });
  };

  const setSyncedTasks = (
    taskUpdater: (previousTasks: IssuanceTask[]) => IssuanceTask[],
    nextAssignments?: StaffAssignment[]
  ) => {
    setTasks((previousTasks) => {
      const updatedTasks = taskUpdater(previousTasks);
      return syncTasksWithAssignments(updatedTasks, nextAssignments ?? assignments);
    });
  };

  const setSyncedAssignments = (assignmentUpdater: (previousAssignments: StaffAssignment[]) => StaffAssignment[]) => {
    setAssignments((previousAssignments) => {
      const nextAssignments = assignmentUpdater(previousAssignments);
      setTasks((previousTasks) => syncTasksWithAssignments(previousTasks, nextAssignments));
      return nextAssignments;
    });
  };

  const addManualRequest = (claimId: string, customerName: string) => {
    const id = `LOC-MANUAL-${Date.now()}`;

    setSyncedTasks((previousTasks) => {
      const existingTask = previousTasks.find((task) => task.claimId === claimId);

      if (!existingTask) {
        return [
          ...previousTasks,
          {
            id: `IT-${Date.now()}`,
            claimId,
            customerId: `C-${Date.now()}`,
            customerName,
            customerSSN: '직접입력',
            customerPhone: '',
            customerAddress: '직접 입력 예정',
            createdAt: today(),
            status: 'unassigned',
            locations: [
              {
                id,
                source: 'manual',
                type: 'hospital',
                name: '수기 입력 병원',
                address: '주소 미입력',
                ...parseRegionLevels(''),
                visitPeriod: today(),
                insurer: '직접 입력',
                requestStatus: '확정대기',
                status: 'unassigned',
                requiredDocs: [
                  { id: `${id}-1`, name: '진료비 영수증(일자별)', status: 'pending', expectedCount: 1, confirmedCount: 0 },
                  { id: `${id}-2`, name: '진료비 세부내역서(일자별)', status: 'pending', expectedCount: 1, confirmedCount: 0 },
                ],
              },
            ],
          },
        ];
      }

      return previousTasks.map((task) =>
        task.claimId === claimId
          ? {
              ...task,
              locations: [
                ...task.locations,
                {
                  id,
                  source: 'manual',
                  type: 'hospital',
                  name: '수기 입력 병원',
                  address: '주소 미입력',
                  ...parseRegionLevels(''),
                  visitPeriod: today(),
                  insurer: task.locations[0]?.insurer ?? '직접 입력',
                  requestStatus: '확정대기',
                  status: 'unassigned',
                  requiredDocs: [
                    { id: `${id}-1`, name: '진료비 영수증(일자별)', status: 'pending', expectedCount: 1, confirmedCount: 0 },
                    { id: `${id}-2`, name: '진료비 세부내역서(일자별)', status: 'pending', expectedCount: 1, confirmedCount: 0 },
                  ],
                },
              ],
            }
          : task
      );
    });
  };

  const deleteLocation = (locationId: string) => {
    const nextAssignments = assignments.filter((assignment) => assignment.locationId !== locationId);
    setAssignments(nextAssignments);
    setSyncedTasks((previousTasks) =>
      previousTasks
        .map((task) => ({
          ...task,
          locations: task.locations.filter((location) => location.id !== locationId),
        }))
        .filter((task) => task.locations.length > 0)
    , nextAssignments);
  };

  const sendToOps = (locationIds: string[]) => {
    setSyncedTasks((previousTasks) =>
      previousTasks.map((task) => ({
        ...task,
        locations: task.locations.map((location) =>
          locationIds.includes(location.id)
            ? {
                ...location,
                requestStatus: '요청전송완료',
              }
            : location
        ),
      }))
    );
  };

  const assignManagerToLocations = (locationIds: string[], managerId: string, _assignedById: string) => {
    const manager = usersById[managerId];
    if (!manager) return;

    setSyncedTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.locations.some((location) => locationIds.includes(location.id))
          ? {
              ...task,
              locations: task.locations.map((location) => ({
                ...(locationIds.includes(location.id)
                  ? {
                      ...location,
                      assignedManagerId: manager.id,
                      assignedManagerName: manager.company ? `${manager.name}` : manager.name,
                      assignedManagerAt: today(),
                      requestStatus:
                        location.requestStatus === '확정대기' ? '전송대기' : location.requestStatus,
                    }
                  : location),
              })),
            }
          : task
      )
    );
  };

  const assignStaffToLocations = (locationIds: string[], staffId: string, assignedByManagerId: string) => {
    const staff = usersById[staffId];
    const manager = usersById[assignedByManagerId];
    if (!staff || !manager) return;

    setSyncedAssignments((previousAssignments) => {
      const remainingAssignments = previousAssignments.filter((assignment) => !locationIds.includes(assignment.locationId));
      const nextAssignments = [
        ...remainingAssignments,
        ...locationIds.map((locationId) => {
          const task = tasks.find((item) => item.locations.some((location) => location.id === locationId));
          const location = task?.locations.find((item) => item.id === locationId);
          const previous = previousAssignments.find((assignment) => assignment.locationId === locationId);

          return {
            id: previous?.id ?? `SA-${Date.now()}-${locationId}`,
            taskId: task?.id ?? previous?.taskId ?? '',
            locationId,
            customerId: task?.customerId ?? previous?.customerId ?? '',
            customerName: task?.customerName ?? previous?.customerName ?? '',
            locationName: location?.name ?? '',
            locationAddress: location?.address ?? '',
            regionLevel1: location?.regionLevel1 ?? previous?.regionLevel1,
            regionLevel2: location?.regionLevel2 ?? previous?.regionLevel2,
            regionLevel3: location?.regionLevel3 ?? previous?.regionLevel3,
            locationType: location?.type ?? 'hospital',
            visitPeriod: location?.visitPeriod ?? '',
            staffId: staff.id,
            staffName: staff.name,
            staffPhone: staff.phone,
            assignedByManagerId,
            assignedByManagerName: manager.name,
            assignedAt: today(),
            status: previous?.status === 'completed' ? 'completed' : 'assigned',
            submissionDocsDownloaded: previous?.submissionDocsDownloaded ?? false,
            visitedAt: previous?.visitedAt,
            completedAt: previous?.completedAt,
            requiredDocs: cloneDocs(previous?.requiredDocs ?? location?.requiredDocs ?? []),
          };
        }),
      ];

      setSyncedTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.locations.some((location) => locationIds.includes(location.id))
            ? {
                ...item,
                locations: item.locations.map((location) =>
                  locationIds.includes(location.id)
                    ? {
                        ...location,
                        assignedManagerId: manager.id,
                        assignedManagerName: manager.name,
                        assignedManagerAt: today(),
                      }
                    : location
                ),
              }
            : item
        ),
        nextAssignments
      );

      return nextAssignments;
    });
  };

  const assignAuto = (locationIds: string[], managerId?: string, referenceDate = today()) => {
    const plan = getAutoAssignmentPlan(locationIds, managerId, referenceDate);
    if (!plan) {
      return null;
    }

    const planByLocationId = new Map(plan.items.map((item) => [item.locationId, item]));

    setSyncedAssignments((previousAssignments) => {
      const remainingAssignments = previousAssignments.filter((assignment) => !planByLocationId.has(assignment.locationId));
      const nextAssignments = [
        ...remainingAssignments,
        ...plan.items.map((item) => {
          const task = tasks.find((taskItem) => taskItem.locations.some((location) => location.id === item.locationId));
          const location = task?.locations.find((locationItem) => locationItem.id === item.locationId);
          const previous = previousAssignments.find((assignment) => assignment.locationId === item.locationId);

          return {
            id: previous?.id ?? `SA-${Date.now()}-${item.locationId}`,
            taskId: task?.id ?? previous?.taskId ?? '',
            locationId: item.locationId,
            customerId: task?.customerId ?? previous?.customerId ?? '',
            customerName: task?.customerName ?? previous?.customerName ?? '',
            locationName: location?.name ?? item.locationName,
            locationAddress: location?.address ?? item.locationAddress,
            regionLevel1: location?.regionLevel1 ?? previous?.regionLevel1,
            regionLevel2: location?.regionLevel2 ?? previous?.regionLevel2,
            regionLevel3: location?.regionLevel3 ?? previous?.regionLevel3,
            locationType: location?.type ?? previous?.locationType ?? 'hospital',
            visitPeriod: location?.visitPeriod ?? previous?.visitPeriod ?? '',
            staffId: item.staffId,
            staffName: item.staffName,
            staffPhone: item.staffPhone,
            assignedByManagerId: item.managerId,
            assignedByManagerName: item.managerName,
            assignedAt: today(),
            status: previous?.status === 'completed' ? 'completed' : 'assigned',
            submissionDocsDownloaded: previous?.submissionDocsDownloaded ?? false,
            visitedAt: previous?.visitedAt,
            completedAt: previous?.completedAt,
            requiredDocs: cloneDocs(previous?.requiredDocs ?? location?.requiredDocs ?? []),
          } satisfies StaffAssignment;
        }),
      ];

      setSyncedTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.locations.some((location) => planByLocationId.has(location.id))
            ? {
                ...task,
                locations: task.locations.map((location) => {
                  const planItem = planByLocationId.get(location.id);
                  if (!planItem) {
                    return location;
                  }

                  return {
                    ...location,
                    assignedManagerId: planItem.managerId,
                    assignedManagerName: planItem.managerName,
                    assignedManagerAt: today(),
                  };
                }),
              }
            : task
        ),
        nextAssignments
      );

      return nextAssignments;
    });

    return plan;
  };

  const downloadSubmissionDocs = (assignmentId: string) => {
    setSyncedAssignments((previousAssignments) =>
      previousAssignments.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              submissionDocsDownloaded: true,
              status: assignment.status === 'assigned' ? 'docs_downloaded' : assignment.status,
            }
          : assignment
      )
    );
  };

  const printTripDocuments = (locationIds: string[], generatedBy: string) => {
    const result = buildPackResult(tasks, locationIds, generatedBy);
    if (!result) return null;

    setSyncedAssignments((previousAssignments) =>
      previousAssignments.map((assignment) =>
        locationIds.includes(assignment.locationId)
          ? {
              ...assignment,
              submissionDocsDownloaded: true,
              status: assignment.status === 'assigned' ? 'docs_downloaded' : assignment.status,
            }
          : assignment
      )
    );

    return result;
  };

  const uploadRequiredDocument = (assignmentId: string, docId: string, fileName: string) => {
    setSyncedAssignments((previousAssignments) =>
      previousAssignments.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              status: 'uploaded',
              requiredDocs: assignment.requiredDocs.map((doc) =>
                doc.id === docId
                  ? {
                      ...doc,
                      status: 'uploaded',
                      uploadedFile: fileName,
                      uploadedAt: today(),
                    }
                  : doc
              ),
            }
          : assignment
      )
    );
  };

  const runMockOcr = (assignmentId: string, docId: string) => {
    setSyncedAssignments((previousAssignments) =>
      previousAssignments.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              status: 'ocr_done',
              requiredDocs: assignment.requiredDocs.map((doc) => {
                if (doc.id !== docId) return doc;
                return {
                  ...doc,
                  status: 'ocr_done',
                  ocrResult: ocrMocks[doc.name] ?? {
                    hospitalName: assignment.locationName,
                    patientName: assignment.customerName,
                    visitDate: assignment.visitPeriod,
                    confidence: 76,
                    rawText: `${doc.name} OCR 결과`,
                  },
                };
              }),
            }
          : assignment
      )
    );
  };

  const confirmRequiredDocument = (assignmentId: string, docId: string) => {
    setSyncedAssignments((previousAssignments) =>
      previousAssignments.map((assignment) => {
        if (assignment.id !== assignmentId) return assignment;
        const requiredDocs = assignment.requiredDocs.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                status: 'confirmed',
                confirmedAt: today(),
                confirmedCount: doc.expectedCount ?? 1,
              }
            : doc
        );

        return {
          ...assignment,
          status: areAllDocsConfirmed(requiredDocs) ? 'confirmed' : assignment.status,
          requiredDocs,
        };
      })
    );
  };

  const finalizeAssignment = (assignmentId: string) => {
    const target = assignments.find((assignment) => assignment.id === assignmentId);
    if (!target || !areAllDocsConfirmed(target.requiredDocs)) {
      return false;
    }

    setSyncedAssignments((previousAssignments) =>
      previousAssignments.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              status: 'completed',
              completedAt: today(),
            }
          : assignment
      )
    );

    return true;
  };

  const value = useMemo<IssuanceContextValue>(
    () => ({
      tasks,
      assignments,
      users,
      managers,
      staffMembers,
      ocrMocks,
      getUserName,
      getUserPhone,
      getTaskByClaimId,
      getManagerTasks,
      getAssignmentsByStaff,
      getStaffPerformanceSummary,
      getStaffPerformanceRows,
      getAssignableStaffCandidates,
      getAutoAssignmentPlan,
      getLocationAssignment,
      getClaimIssuanceRows,
      addManualRequest,
      deleteLocation,
      sendToOps,
      assignManagerToLocations,
      assignStaffToLocations,
      assignAuto,
      downloadSubmissionDocs,
      printTripDocuments,
      uploadRequiredDocument,
      runMockOcr,
      confirmRequiredDocument,
      finalizeAssignment,
    }),
    [tasks, assignments, users, managers, staffMembers, ocrMocks, locationById]
  );

  return <IssuanceContext.Provider value={value}>{children}</IssuanceContext.Provider>;
}

export function useIssuanceOperations() {
  const context = useContext(IssuanceContext);

  if (!context) {
    throw new Error('useIssuanceOperations must be used within IssuanceProvider');
  }

  return context;
}
