export type IssuanceSource = 'auto' | 'manual';
export type IssuanceDocUploadStatus = 'pending' | 'uploaded';
export type IssuanceRequestStatus = 'pending' | 'partial' | 'completed';
export type IssuanceRequestFlowStatus = '확정대기' | '전송대기' | '요청전송완료';
export type IssuanceOpsStatus =
  | '미배정'
  | '관리자배정'
  | '직원배정'
  | '방문준비'
  | '업로드중'
  | '예외검토필요'
  | '최종완료';
export type IssuanceSlotStatus =
  | '미업로드'
  | 'OCR처리중'
  | '자동확정가능'
  | '예외검토필요'
  | '확정';
export type IssuancePackStatus =
  | '미생성'
  | '기관 팩 출력완료'
  | '케이스 팩 출력완료'
  | '3종 서류 출력완료';
export type IssuanceAssigneeRole =
  | 'master_issuance'
  | 'manager_issuance'
  | 'staff_issuance';
export type PackScope = 'institution' | 'case';
export type PackKind = 'document-pack' | 'trip-docs';
export type UploadReviewStatus =
  | 'uploaded'
  | 'auto_ready'
  | 'exception'
  | 'confirmed'
  | 'manager_confirmed'
  | 'rejected';
export type SimulatedIssue =
  | 'ocr_low_confidence'
  | 'doc_type_mismatch'
  | 'duplicate_detected'
  | 'manual_reassignment'
  | null;

export interface PdfCoordinatePreset {
  x: number;
  y: number;
}

export interface PersonalizedForm {
  id: string;
  type: 'id-copy' | 'poa' | 'consent';
  title: string;
  fileName: string;
  personalized: boolean;
  contextLine: string;
  signatureSource: string;
  pdfCoordinatePreset: PdfCoordinatePreset;
}

export interface IssuanceDocSlot {
  id: string;
  name: string;
  expectedType: string;
  requiredCount: number;
  confirmedCount: number;
  uploadStatus: IssuanceDocUploadStatus;
  slotStatus: IssuanceSlotStatus;
  confirmedFiles: string[];
  lastUploadName?: string | null;
  visitDates?: string[];
  ocrConfidence?: number | null;
  extractedMeta?: {
    detectedType: string;
    detectedHospital: string;
    detectedDate: string;
  } | null;
  simulatedIssue?: SimulatedIssue;
  reviewNote?: string | null;
}

export interface IssuanceRequest {
  id: string;
  claimId: string;
  customerName: string;
  source: IssuanceSource;
  date: string;
  visitRange: string;
  hospital: string;
  location: string;
  insurer: string;
  docs: IssuanceDocSlot[];
  status: IssuanceRequestStatus;
  requestStatus: IssuanceRequestFlowStatus;
  fileName: string | null;
  opsStatus: IssuanceOpsStatus;
  assignedManagerId?: string;
  assignedStaffId?: string;
  dueAt?: string | null;
  exceptionCount: number;
  packStatus: IssuancePackStatus;
  lastActionAt: string;
  manualReviewReason?: string | null;
  personalizedForms: PersonalizedForm[];
}

export interface IssuanceAssignment {
  id: string;
  requestId: string;
  claimId: string;
  assigneeRole: IssuanceAssigneeRole;
  assigneeId: string;
  assignedBy: string;
  assignedAt: string;
  note?: string;
  transferReason?: string;
}

export interface IssuancePackFile {
  id: string;
  name: string;
  personalizedCount: number;
}

export interface IssuancePack {
  id: string;
  scope: PackScope;
  kind: PackKind;
  requestIds: string[];
  generatedFiles: IssuancePackFile[];
  generatedAt: string;
  downloadedBy?: string;
  downloadedAt?: string;
}

export interface IssuedDocUpload {
  id: string;
  requestId: string;
  docSlotId: string;
  claimId: string;
  visitDate: string;
  uploadedBy: string;
  ocrStatus: IssuanceSlotStatus;
  ocrConfidence: number | null;
  extractedMeta?: {
    detectedType: string;
    detectedHospital: string;
    detectedDate: string;
  } | null;
  reviewStatus: UploadReviewStatus;
  reviewedBy?: string;
}

export interface IssuanceUser {
  id: string;
  name: string;
  role: IssuanceAssigneeRole;
  team: string;
  managerId?: string;
}
