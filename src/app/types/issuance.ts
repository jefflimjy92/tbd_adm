export type IssuanceRole = 'master' | 'manager' | 'staff';
export type IssuanceSource = 'auto' | 'manual';
export type IssuanceLocationType = 'hospital' | 'pharmacy';
export type IssuanceDocStatus = 'pending' | 'uploaded' | 'ocr_processing' | 'ocr_done' | 'confirmed';
export type IssuanceTaskStatus = 'unassigned' | 'assigned' | 'in_progress' | 'partial' | 'completed';
export type IssuanceLocationSortKey =
  | 'unassigned_first'
  | 'region_asc'
  | 'hospital_name_asc'
  | 'visit_date_desc'
  | 'visit_date_asc';

export interface RegionSelection {
  level1: string;
  level2?: string;
  level3?: string;
}
export type StaffAssignmentStatus =
  | 'assigned'
  | 'in_progress'
  | 'docs_downloaded'
  | 'visited'
  | 'uploaded'
  | 'ocr_done'
  | 'confirmed'
  | 'completed';
export type IssuanceRequestFlowStatus = '확정대기' | '전송대기' | '요청전송완료';
export type ClaimIssuanceOpsStatus =
  | '미배정'
  | '관리자배정'
  | '직원배정'
  | '방문준비'
  | '업로드중'
  | '예외검토필요'
  | '최종완료';

export interface IssuanceUser {
  id: string;
  name: string;
  role: IssuanceRole;
  company?: string;
  phone?: string;
  managerId?: string;
  assignedRegions?: RegionSelection[];
}

export interface OcrResult {
  hospitalName?: string;
  patientName?: string;
  visitDate?: string;
  diagnosisCode?: string;
  totalAmount?: number;
  confidence: number;
  rawText: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  status: IssuanceDocStatus;
  expectedCount?: number;
  confirmedCount?: number;
  uploadedFile?: string;
  uploadedAt?: string;
  ocrResult?: OcrResult;
  confirmedAt?: string;
  visitDates?: string[];
}

export interface IssuanceLocation {
  id: string;
  source: IssuanceSource;
  type: IssuanceLocationType;
  name: string;
  address: string;
  regionLevel1?: string;
  regionLevel2?: string;
  regionLevel3?: string;
  visitPeriod: string;
  insurer: string;
  requestStatus: IssuanceRequestFlowStatus;
  requiredDocs: RequiredDocument[];
  status: IssuanceTaskStatus;
  assignedManagerId?: string;
  assignedManagerName?: string;
  assignedManagerAt?: string;
}

export interface IssuanceTask {
  id: string;
  claimId: string;
  customerId: string;
  customerName: string;
  customerSSN: string;
  customerPhone: string;
  customerAddress: string;
  signatureDataUrl?: string;
  locations: IssuanceLocation[];
  createdAt: string;
  completedAt?: string;
  assignedManagerId?: string;
  assignedManagerName?: string;
  assignedAt?: string;
  status: IssuanceTaskStatus;
}

export interface StaffAssignment {
  id: string;
  taskId: string;
  locationId: string;
  customerId: string;
  customerName: string;
  locationName: string;
  locationAddress: string;
  regionLevel1?: string;
  regionLevel2?: string;
  regionLevel3?: string;
  locationType: IssuanceLocationType;
  visitPeriod: string;
  staffId: string;
  staffName: string;
  staffPhone?: string;
  assignedByManagerId: string;
  assignedByManagerName: string;
  assignedAt: string;
  status: StaffAssignmentStatus;
  submissionDocsDownloaded: boolean;
  visitedAt?: string;
  completedAt?: string;
  requiredDocs: RequiredDocument[];
}

export interface StaffPerformanceSummary {
  staffId: string;
  staffName: string;
  staffPhone?: string;
  managerId?: string;
  managerName?: string;
  managerCompany?: string;
  managerRegions?: RegionSelection[];
  assignedRegions: RegionSelection[];
  inProgressCount: number;
  inRegionInProgressCount: number;
  outOfRegionInProgressCount: number;
  inProgressBreakdown: Partial<Record<StaffAssignmentStatus, number>>;
  completedToday: number;
  completedThisWeek: number;
  completedThisMonth: number;
  completedThisMonthInRegion: number;
  completedThisMonthOutOfRegion: number;
  completedTotal: number;
  estimatedWeeklyIncentive: number;
  estimatedMonthlyIncentive: number;
  lastCompletedAt?: string;
}

export interface StaffIncentiveRow {
  staffId: string;
  staffName: string;
  staffPhone?: string;
  teamName: string;
  assignedRegions: RegionSelection[];
  completedThisMonth: number;
  incentiveTierLabel: string;
  monthlyIncentive: number;
  lastCompletedAt?: string;
}

export interface AssignableStaffCandidate extends StaffPerformanceSummary {
  regionMatched: boolean;
  matchedLocationCount: number;
  candidateRank: number;
}

export interface AutoAssignmentPlanItem {
  locationId: string;
  locationName: string;
  locationAddress: string;
  staffId: string;
  staffName: string;
  staffPhone?: string;
  managerId: string;
  managerName: string;
  managerCompany?: string;
  regionMatched: boolean;
  fallbackReason?: string;
}

export interface AutoAssignmentPlanGroup {
  id: string;
  name: string;
  company?: string;
  count: number;
}

export interface AutoAssignmentPlan {
  items: AutoAssignmentPlanItem[];
  totalCount: number;
  regionMatchedCount: number;
  fallbackCount: number;
  byStaff: AutoAssignmentPlanGroup[];
  byManager: AutoAssignmentPlanGroup[];
}

export interface BulkPrintItem {
  locationId: string;
  hospitalName: string;
  customerName: string;
  customerSSN: string;
  customerAddress: string;
  requiredDocNames: string[];
  signatureDataUrl?: string;
}

export interface PackResultFile {
  id: string;
  name: string;
  personalizedCount: number;
}

export interface PackResult {
  id: string;
  generatedFiles: PackResultFile[];
  items: BulkPrintItem[];
}

export interface ClaimIssuanceRow {
  id: string;
  taskId: string;
  locationId: string;
  claimId: string;
  customerName: string;
  source: IssuanceSource;
  date: string;
  hospital: string;
  location: string;
  insurer: string;
  requestStatus: IssuanceRequestFlowStatus;
  opsStatus: ClaimIssuanceOpsStatus;
  assignedManagerName?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  assignedStaffPhone?: string;
  docs: RequiredDocument[];
  status: 'pending' | 'partial' | 'completed';
  fileName: string | null;
}
