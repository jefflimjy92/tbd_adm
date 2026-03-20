/**
 * 상담 단계별 필수값 검증 유틸리티
 *
 * 각 단계 전환 시 필수 입력값이 채워졌는지 확인하고,
 * 미충족 항목에 대해 에러 메시지를 반환합니다.
 */

// ── 타입 정의 ──────────────────────────────
export interface ConsultationFormData {
  // Step 1: 상담 단계
  currentStep: string;
  selectedStatus: string;
  selectedReason: string;

  // Step 2: 보험 정보
  insuranceStatus: string;   // '있음' | '없음'
  insuranceType: string;     // '실손+종합' | '실손' | '종합' | '없음'
  monthlyPremium: string;
  paymentStatus: string;     // '정상' | '미납 중' | '실효됨'
  contractor: string;
  joinPath: string;

  // Step 2: 건강 체크
  trafficAccident: string;   // '있음' | '없음'
  trafficAccidentDetail: string;
  surgery: string;           // '있음' | '없음'
  surgeryOptions: string[];
  surgeryDetail: string;
  criticalDisease: string;   // '있음' | '없음'
  criticalOptions: string[];
  criticalDetail: string;
  medication: string;        // '있음' | '없음'
  medicationDetail: string;

  // Step 2: 동반신청
  companion: string;         // '있음' | '없음'

  // Step 3: 고객 특이사항
  disposition: string;
  trustLevel: string;
  decisionMaker: string;
}

export interface ValidationError {
  field: string;
  message: string;
  section: string;   // 어떤 섹션에 해당하는지 (scroll target)
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// ── 데이터 포맷 검증 ──────────────────────────
export function validatePhoneNumber(phone: string): boolean {
  // 한국 전화번호: 010-0000-0000, 01000000000 등
  const cleaned = phone.replace(/[-\s]/g, '');
  return /^01[016789]\d{7,8}$/.test(cleaned);
}

export function validateAmount(amount: string): boolean {
  // 숫자만 (소수점 포함)
  if (!amount || amount.trim() === '') return false;
  return /^\d+(\.\d+)?$/.test(amount.trim());
}

export function validateNotEmpty(value: string): boolean {
  return value !== undefined && value !== null && value.trim() !== '';
}

export function validateSelected(value: string, excludeDefaults: string[] = []): boolean {
  if (!value || value.trim() === '') return false;
  return !excludeDefaults.includes(value);
}

// ── 단계별 필수값 정의 ──────────────────────────

/**
 * 접수 → 1차 상담 (step1 → step2) 전환 시 필수값
 * - 상담 상태 선택 완료
 * - 사유가 필요한 상태라면 사유도 선택
 */
export function validateStep1ToStep2(data: ConsultationFormData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data.selectedStatus) {
    errors.push({
      field: 'selectedStatus',
      message: '접수 상태를 선택해주세요',
      section: 'stepStage'
    });
  }

  // 사유가 필요한 상태인데 사유 미선택
  const reasonRequiredStatuses = [
    'impossible', 'cancel', '1st-cancel', '2nd-cancel',
    'rural-waiting', '2nd-exception', '2nd-planner-relation'
  ];
  if (data.selectedStatus && reasonRequiredStatuses.includes(data.selectedStatus) && !data.selectedReason) {
    errors.push({
      field: 'selectedReason',
      message: '사유를 선택해주세요',
      section: 'stepStage'
    });
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * 1차 상담 완료 시 필수값 (step2에서 FACT CHECK 완료)
 * - 보험 가입 여부 확인
 * - 보험 있을 경우: 유형/월납/미납여부/계약자
 * - 건강 체크 4개 항목 모두 확인 (있음/없음 선택)
 * - '있음' 선택 시 상세 입력
 */
export function validateFactCheck(data: ConsultationFormData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // ── 보험 정보 ──
  if (!data.insuranceStatus || (data.insuranceStatus !== '있음' && data.insuranceStatus !== '없음')) {
    errors.push({
      field: 'insuranceStatus',
      message: '보험 가입 여부를 선택해주세요',
      section: 'insurance'
    });
  }

  if (data.insuranceStatus === '있음') {
    if (!data.insuranceType || data.insuranceType === '없음') {
      errors.push({
        field: 'insuranceType',
        message: '보험 유형을 선택해주세요 (실손+종합/실손/종합)',
        section: 'insurance'
      });
    }
    if (!validateAmount(data.monthlyPremium)) {
      errors.push({
        field: 'monthlyPremium',
        message: '월납 총액을 입력해주세요 (숫자)',
        section: 'insurance'
      });
    }
    if (!data.paymentStatus) {
      errors.push({
        field: 'paymentStatus',
        message: '미납/실효 여부를 선택해주세요',
        section: 'insurance'
      });
    }
    if (!data.contractor) {
      errors.push({
        field: 'contractor',
        message: '계약자/납입인을 선택해주세요',
        section: 'insurance'
      });
    }
  }

  // ── 건강 체크: 교통사고 ──
  if (!data.trafficAccident || (data.trafficAccident !== '있음' && data.trafficAccident !== '없음')) {
    errors.push({
      field: 'trafficAccident',
      message: '교통사고 여부를 확인해주세요',
      section: 'trafficAccident'
    });
  }
  if (data.trafficAccident === '있음' && !validateNotEmpty(data.trafficAccidentDetail)) {
    errors.push({
      field: 'trafficAccidentDetail',
      message: '교통사고 상세 내용을 입력해주세요',
      section: 'trafficAccident'
    });
  }

  // ── 건강 체크: 수술/시술/골절 ──
  if (!data.surgery || (data.surgery !== '있음' && data.surgery !== '없음')) {
    errors.push({
      field: 'surgery',
      message: '용종/수술·시술/골절 여부를 확인해주세요',
      section: 'surgery'
    });
  }
  if (data.surgery === '있음') {
    if (data.surgeryOptions.length === 0) {
      errors.push({
        field: 'surgeryOptions',
        message: '수술/시술/골절 상세 항목을 하나 이상 선택해주세요',
        section: 'surgery'
      });
    }
  }

  // ── 건강 체크: 중대질환 ──
  if (!data.criticalDisease || (data.criticalDisease !== '있음' && data.criticalDisease !== '없음')) {
    errors.push({
      field: 'criticalDisease',
      message: '중대질환(암/뇌/심) 여부를 확인해주세요',
      section: 'criticalDisease'
    });
  }
  if (data.criticalDisease === '있음') {
    if (data.criticalOptions.length === 0) {
      errors.push({
        field: 'criticalOptions',
        message: '중대질환 상세 항목을 하나 이상 선택해주세요',
        section: 'criticalDisease'
      });
    }
  }

  // ── 건강 체크: 복용 약물 ──
  if (!data.medication || (data.medication !== '있음' && data.medication !== '없음')) {
    errors.push({
      field: 'medication',
      message: '복용 약물 여부를 확인해주세요',
      section: 'medication'
    });
  }
  if (data.medication === '있음' && !validateNotEmpty(data.medicationDetail)) {
    errors.push({
      field: 'medicationDetail',
      message: '복용 약물 상세 내용을 입력해주세요',
      section: 'medication'
    });
  }

  // ── 동반신청고객 ──
  if (!data.companion || (data.companion !== '있음' && data.companion !== '없음')) {
    warnings.push({
      field: 'companion',
      message: '동반신청고객 여부를 확인해주세요',
      section: 'companion'
    });
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * 2차 상담 완료 시 필수값 (step3 → step4 전환)
 * - 1차 상담 필수값 전부 +
 * - 고객 특이사항 (성향, 신뢰도, 결정권한)
 */
export function validateStep3ToStep4(data: ConsultationFormData): ValidationResult {
  const factCheckResult = validateFactCheck(data);
  const errors = [...factCheckResult.errors];
  const warnings = [...factCheckResult.warnings];

  // ── 고객 특이사항 ──
  if (!data.disposition) {
    errors.push({
      field: 'disposition',
      message: '고객 성향을 선택해주세요 (긍정/중립/부정)',
      section: 'traits'
    });
  }
  if (!data.trustLevel) {
    errors.push({
      field: 'trustLevel',
      message: '신뢰도를 선택해주세요 (형성/보통/의심)',
      section: 'traits'
    });
  }
  if (!data.decisionMaker) {
    errors.push({
      field: 'decisionMaker',
      message: '결정 권한자를 선택해주세요',
      section: 'traits'
    });
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * 미팅 인계 완료 (성공) 시 필수값
 * - 2차 상담 필수값 전부 +
 * - 상태가 meeting-handover인지 확인
 */
export function validateMeetingHandover(data: ConsultationFormData): ValidationResult {
  const step3Result = validateStep3ToStep4(data);
  const errors = [...step3Result.errors];
  const warnings = [...step3Result.warnings];

  if (data.selectedStatus !== 'meeting-handover') {
    errors.push({
      field: 'selectedStatus',
      message: '미팅 인계 완료 상태로 선택해주세요',
      section: 'stepStage'
    });
  }

  return { isValid: errors.length === 0, errors, warnings };
}

// ── 통합 검증: 현재 시도하는 단계에 따라 적절한 검증 실행 ──

export type StepId = 'step1' | 'step2' | 'step3' | 'step4';

/**
 * 특정 단계로 전환하려 할 때 이전 단계 필수값이 충족되었는지 확인
 */
export function validateStepTransition(targetStep: StepId, data: ConsultationFormData): ValidationResult {
  switch (targetStep) {
    case 'step1':
      // 접수 단계는 항상 가능
      return { isValid: true, errors: [], warnings: [] };

    case 'step2':
      return validateStep1ToStep2(data);

    case 'step3':
      return validateFactCheck(data);

    case 'step4':
      return validateStep3ToStep4(data);

    default:
      return { isValid: true, errors: [], warnings: [] };
  }
}

/**
 * 저장 시 현재 단계의 필수값이 모두 충족되었는지 확인
 */
export function validateCurrentStep(currentStep: StepId, data: ConsultationFormData): ValidationResult {
  switch (currentStep) {
    case 'step1':
      return validateStep1ToStep2(data);
    case 'step2':
      return validateFactCheck(data);
    case 'step3':
      return validateStep3ToStep4(data);
    case 'step4':
      return validateMeetingHandover(data);
    default:
      return { isValid: true, errors: [], warnings: [] };
  }
}

/**
 * 필드가 에러 목록에 포함되어 있는지 확인 (UI에서 빨간 테두리 등에 활용)
 */
export function hasFieldError(errors: ValidationError[], fieldName: string): boolean {
  return errors.some(e => e.field === fieldName);
}

/**
 * 특정 섹션에 에러가 있는지 확인
 */
export function hasSectionError(errors: ValidationError[], sectionName: string): boolean {
  return errors.some(e => e.section === sectionName);
}

/**
 * 에러 목록에서 특정 필드의 에러 메시지 추출
 */
export function getFieldErrorMessage(errors: ValidationError[], fieldName: string): string | undefined {
  return errors.find(e => e.field === fieldName)?.message;
}
