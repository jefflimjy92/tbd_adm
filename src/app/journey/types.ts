export type JourneyType = 'refund' | 'simple' | 'intro' | 'family';
export type JourneyStage = 'request' | 'consultation' | 'meeting' | 'handoff' | 'claims' | 'closed';
export type RequirementSeverity = 'block' | 'warn';
export type RequirementKind = 'field' | 'document' | 'integration' | 'schedule' | 'note';
export type VerificationState = 'missing' | 'sent' | 'received' | 'verified' | 'waived';
export type DocumentSource = 'gloSign' | 'easyPaper' | 'upload' | 'generated' | 'manual';
export type IntegrationProvider = 'hira' | 'gloSign' | 'easyPaper' | 'script' | 'kakao' | 'claims';
export type IntegrationState = 'idle' | 'requested' | 'sent' | 'received' | 'verified' | 'failed';
export type DocumentPackCode = 'base_consent_pack' | 'refund_claim_pack' | 'sales_contract_pack' | 'family_pack' | 'referral_pack';
export type DbCategory = '' | 'possible' | 'compensation' | 'intro' | 'companion';
export type AssignmentSource = 'manual' | 'scheduled_auto' | 'urgent_auto';
export type NotificationState = 'pending' | 'sent' | 'failed' | 'verified';
export type ExcludeState = 'active' | 'excluded';

export interface RequirementAlert {
  id: string;
  label: string;
  message: string;
  severity: RequirementSeverity;
  kind: RequirementKind;
  screen?: 'requests' | 'consultation' | 'meeting' | 'documents' | 'handoff' | 'claims';
  statusContext?: string;
}

export interface RequirementRule {
  id: string;
  appliesTo: {
    stage?: JourneyStage[];
    status?: string[];
    journeyType?: JourneyType[];
  };
  severity: RequirementSeverity;
  kind: RequirementKind;
  predicate: string;
  errorMessage: string;
}

export interface DocumentRequirement {
  docCode: string;
  label: string;
  pack: DocumentPackCode;
  source: DocumentSource;
  requiredWhen: string;
  verificationState: VerificationState;
  note?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface IntegrationTask {
  taskCode: string;
  label: string;
  provider: IntegrationProvider;
  state: IntegrationState;
  externalId?: string;
  requestedAt?: string;
  verifiedAt?: string;
  reviewedBy?: string;
  lastError?: string;
}

export interface AuditEvent {
  id: string;
  type: 'draft_saved' | 'status_changed' | 'document_updated' | 'integration_updated' | 'override' | 'handoff' | 'claim' | 'note';
  message: string;
  actor: string;
  at: string;
  tone?: 'default' | 'success' | 'warning';
}

export interface StageStatus {
  stageId: JourneyStage;
  statusCode: string;
  statusLabel: string;
  enteredAt: string;
  enteredBy: string;
  exitBlocked?: boolean;
  overrideReason?: string;
  overrideApprovedBy?: string;
}

export interface ConsultationDraft {
  currentStep: string;
  selectedStatus: string;
  selectedReason: string;
  insuranceStatus: string;
  insuranceType: string;
  monthlyPremium: string;
  paymentStatus: string;
  contractor: string;
  joinPath: string;
  trafficAccident: string;
  trafficAccidentDetail: string;
  surgery: string;
  surgeryOptions: string[];
  surgeryDetail: string;
  criticalDisease: string;
  criticalOptions: string[];
  criticalDetail: string;
  medication: string;
  medicationDetail: string;
  companion: string;
  disposition: string;
  trustLevel: string;
  decisionMaker: string;
  bestTime: string;
  traitNote: string;
  contactAttempts: string;
  lastContactChannel: string;
  lastContactAt: string;
  nextRetryAt: string;
  holdReason: string;
  holdUntil: string;
  holdOwner: string;
  scriptExecuted: boolean;
  scriptQaChecked: boolean;
  customerReaction: string;
  customerSummary: string;
  objectionSummary: string;
  meetingFit: string;
  handoffNote: string;
  cautionNote: string;
  callRecordLink: string;
  transcriptAttached: boolean;
  reentryEligible: string;
  hiraReviewedBy: string;
  hiraReviewedAt: string;
  needMedicalDocs: string;
  claimOpportunityNote: string;
  simpleHandlingMode: string;
  existingContractGoal: string;
  designNeed: string;
  referralName: string;
  referralRelationship: string;
  referralBenefitExplained: boolean;
}

export interface MeetingContractSnapshot {
  id?: string;
  insurer: string;
  contractType: string;
  productType: string;
  productName: string;
  policyNumber: string;
  contractor: string;
  insuredPerson: string;
  paymentCycle: string;
  premium: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'pending';
  memo?: string;
  entryMethod?: 'manual' | 'pasted';
  sourceCarrier?: string;
  sourceFormat?: 'samsung_contract_detail' | 'kb_contract_detail' | 'generic' | 'manual';
  rawPasteText?: string;
  parseStatus?: 'parsed' | 'partial' | 'manual';
  parseWarnings?: string[];
  registeredAt?: string;
  contractStatusLabel?: string;
  paymentMethod?: string;
  paymentWithdrawDay?: string;
  paymentAccountHolder?: string;
  paymentBankName?: string;
  paymentAccountNumber?: string;
  paymentCardCompany?: string;
  paymentCardNumber?: string;
  paymentCardHolder?: string;
  paymentNote?: string;
  contractorPhone?: string;
  insuredPhone?: string;
  contractorAddress?: string;
  insuredAddress?: string;
}

export interface MeetingReferralContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export type MeetingAssignmentStatus = 'unassigned' | 'assigned' | 'confirmed';

export interface AssignmentDemand {
  team: string;
  targetDate: string;
  neededCount: number;
  cutoffAt: string;
}

export interface MeetingAssignmentItem {
  requestId: string;
  customerName: string;
  dbType: string;
  rawAddress: string;
  regionLevel1: string;
  regionLevel2: string;
  preferredDate: string;
  preferredTime: string;
  assignedTeam: string;
  assignedStaff: string;
  assignmentStatus: MeetingAssignmentStatus;
  assignmentDemand?: AssignmentDemand;
  assignmentSource?: AssignmentSource;
  meetingConfirmed: boolean;
  owner: string;
  notificationState?: NotificationState;
  excludeState?: ExcludeState;
  excludeReason?: string;
  statusLabel: string;
}

export interface MeetingStaffLoad {
  staffId: string;
  staffName: string;
  team: string;
  regionMatches: number;
  scheduledCountToday: number;
  scheduledCountWeek: number;
  nextAvailableSlot: string;
}

export interface MeetingDraft {
  selectedGroup: string;
  selectedDetail: string;
  selectedSubDetail: string;
  meetingTime: string;
  meetingLocation: string;
  meetingConfirmed: boolean;
  companions: string[];
  authCodeReceived: boolean;
  insuranceSystemRegistered: boolean;
  statusInputDone: boolean;
  dbCategory: DbCategory;
  meetingCallFormDone: boolean;
  designRequested: boolean;
  preMeetingDocReminderDone: boolean;
  preMeetingStrategyDone: boolean;
  preMeetingTomorrowNoticeSent: boolean;
  preMeetingReferralPushSent: boolean;
  preMeetingCancellationNoticeSent: boolean;
  onSiteEasyPaperDone: boolean;
  onSiteAppLinked: boolean;
  onSitePolicyCollected: boolean;
  onSitePaymentStatementCollected: boolean;
  onSiteInstitutionLinked: boolean;
  onSiteClaimAgreementDone: boolean;
  onSiteReferralPrompted: boolean;
  preCallDone: boolean;
  preCallNote: string;
  preCallScheduledAt: string;
  preCallLocationConfirmed: boolean;
  companionGuideDone: boolean;
  analysisFileUploaded: boolean;
  analysisAgenda: string;
  scriptReady: boolean;
  hiraSummary: string;
  meetingStarted: boolean;
  recordingStarted: boolean;
  ssnVerified: boolean;
  attendeeConfirmed: boolean;
  meetingPurposeChecked: boolean;
  coverageSummary: string;
  customerUnderstandingNote: string;
  designReviewStatus: 'pending' | 'reviewing' | 'approved' | 'rejected';
  designReviewNote: string;
  redesignAction: string;
  contractData: MeetingContractSnapshot[];
  contractDataCount: number;
  contractExpectedPaymentDate: string;
  contractOwner: string;
  claimHandoffMemo: string;
  claimTransferRequested: boolean;
  claimTransferReason: string;
  claimTransferAt: string;
  followupDate: string;
  followupLocation: string;
  followupPurpose: string;
  arrivalChecked: boolean;
  callAttemptLog: string;
  alternativeProposal: string;
  withdrawalAt: string;
  postMeetingNote: string;
  referralAsked: boolean;
  memberSignupCompleted: boolean;
  hometaxLinked: boolean;
  hiraLinked: boolean;
  nhisLinked: boolean;
  c4uLinked: boolean;
  referralCount: number;
  referralContacts: MeetingReferralContact[];
  cxActionsCount: number;
  assignmentStatus: MeetingAssignmentStatus;
  assignmentSource?: AssignmentSource;
  assignedTeam: string;
  assignedStaff: string;
  regionLevel1: string;
  regionLevel2: string;
  notificationState?: NotificationState;
  excludeState?: ExcludeState;
  excludeReason?: string;
  customerErrorReportedAt?: string;
  customerErrorReportedBy?: string;
  // --- 외부시스템 연동 상태 ---
  gloSignRequested: boolean;
  gloSignSigned: boolean;
  easyPaperRequested: boolean;
  claimAgreementRequested: boolean;
  // --- 미팅 후 업무 체크 ---
  postResultReported: boolean;
  postStatusChanged: boolean;
  postContractInfoSaved: boolean;
  postThreeDocSubmitted: boolean;
}

/** 미팅 5단계 완료 조건 - Step Gate에서 사용 */
export type MeetingStepNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface RequestJourney {
  requestId: string;
  customerName: string;
  journeyType: JourneyType;
  owner: string;
  stage: JourneyStage;
  status: string;
  slaLabel: string;
  nextDueAt: string;
  nextAction: string;
  currentStageStatus: StageStatus;
  missingRequirements: RequirementAlert[];
  documentRequirements: DocumentRequirement[];
  integrationTasks: IntegrationTask[];
  auditTrail: AuditEvent[];
  excludeState?: ExcludeState;
  excludeReason?: string;
  customerErrorReportedAt?: string;
  customerErrorReportedBy?: string;
  notificationState?: NotificationState;
  consultationDraft: ConsultationDraft;
  meetingDraft: MeetingDraft;
}

export interface JourneyComputation {
  missingRequirements: RequirementAlert[];
  nextAction: string;
}
