import type { MeetingContractSnapshot } from '@/app/journey/types';

export type SupportedPasteCarrier = '삼성화재' | 'KB손해보험' | '기타';

export interface ParsedContractResult {
  contract: Partial<MeetingContractSnapshot>;
  warnings: string[];
  detectedCarrier: string;
  detectedFormat: MeetingContractSnapshot['sourceFormat'];
  parseStatus: NonNullable<MeetingContractSnapshot['parseStatus']>;
}

const BANK_NAMES = [
  '국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  '농협은행',
  '농협',
  '기업은행',
  '카카오뱅크',
  '토스뱅크',
  'SC제일은행',
  '새마을금고',
  '우체국',
  '수협은행',
  '경남은행',
  '광주은행',
  '부산은행',
  '전북은행',
  '제주은행',
];

const CARD_NAMES = [
  '삼성카드',
  '현대카드',
  '신한카드',
  '국민카드',
  'KB국민카드',
  '롯데카드',
  '우리카드',
  '하나카드',
  '농협카드',
  'BC카드',
];

function cleanText(text: string) {
  return text.replace(/\u00a0/g, ' ').replace(/\r/g, '').trim();
}

function cleanValue(value?: string | null) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

export function sanitizeContractAddress(value?: string | null) {
  return cleanValue(value)
    .replace(/\[(?:자택|직장|회사)\]/g, '')
    .replace(/\b(?:자택|직장|회사|발송지)\b\s*(?:[|/])?/g, '')
    .replace(/\((\d{5})\)/g, '$1')
    .replace(/[|/]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalizeMoney(value?: string | null) {
  return cleanValue(value).replace(/[^0-9]/g, '');
}

function matchValue(text: string, pattern: RegExp) {
  const matched = text.match(pattern);
  return cleanValue(matched?.[1]);
}

function matchName(text: string, pattern: RegExp) {
  return cleanValue(matchValue(text, pattern).split('|')[0]);
}

function normalizeStatusLabel(label: string) {
  if (!label) return '';
  if (label.includes('정상')) return '정상';
  if (label.includes('대기') || label.includes('심사')) return '심사대기';
  if (label.includes('해지')) return '해지';
  if (label.includes('실효')) return '실효';
  return label;
}

function mapContractStatus(label: string): MeetingContractSnapshot['status'] {
  const normalized = normalizeStatusLabel(label);
  if (!normalized) return 'draft';
  if (normalized.includes('정상')) return 'active';
  if (normalized.includes('대기') || normalized.includes('심사')) return 'pending';
  return 'draft';
}

function inferProductType(productName: string) {
  const name = productName.replace(/\s+/g, '');
  if (!name) return '종합보험';
  if (name.includes('자동차')) return '자동차보험';
  if (name.includes('운전자') || name.includes('상해')) return '운전자/상해보험';
  if (name.includes('실손')) return '실손의료보험';
  if (name.includes('암') || name.includes('건강')) return '건강/암보험';
  if (name.includes('치아')) return '치아보험';
  if (name.includes('화재') || name.includes('재물')) return '화재/재물보험';
  if (name.includes('연금') || name.includes('저축')) return '연금/저축보험';
  if (name.includes('종신') || name.includes('정기')) return '종신/정기보험';
  return '종합보험';
}

function inferPaymentCycle(text: string, fallback: string) {
  const matched = text.match(/(월납|연납|일시납|3개월납|6개월납)/);
  return cleanValue(matched?.[1]) || fallback || '월납';
}

function extractPeriod(text: string) {
  const matched = text.match(/보험기간\s*(\d{4}-\d{2}-\d{2})\s*[~〜-]\s*(\d{4}-\d{2}-\d{2})/);
  return {
    startDate: matched?.[1] || '',
    endDate: matched?.[2] || '',
  };
}

function extractFirstPhone(text: string) {
  const matched = text.match(/(01[0-9]-\d{3,4}-\d{4})/);
  return cleanValue(matched?.[1]);
}

function parsePaymentDetails(rawValue?: string | null) {
  const cleaned = cleanValue(rawValue)
    .replace(/[?]/g, '')
    .replace(/,\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\|\s*/g, '|')
    .trim();

  const method =
    cleanValue(cleaned.match(/(자동이체|카드|가상계좌|즉시이체|현금|일시납)/)?.[1]) ||
    cleanValue(cleaned.split('|')[0]);
  const withdrawDay = cleanValue(cleaned.match(/\((\d{1,2}일)\)/)?.[1]);
  const detailSource = cleaned
    .replace(method, '')
    .replace(/\(\d{1,2}일\)/, '')
    .replace(/^[\s|]+/, '')
    .trim();

  let paymentAccountHolder = '';
  let paymentBankName = '';
  let paymentAccountNumber = '';
  let paymentCardCompany = '';
  let paymentCardNumber = '';
  let paymentCardHolder = '';

  if (method === '카드') {
    const cardName = CARD_NAMES.find((candidate) => detailSource.includes(candidate));
    if (cardName) {
      paymentCardCompany = cardName;
      const cardIndex = detailSource.indexOf(cardName);
      paymentCardHolder = cleanValue(detailSource.slice(0, cardIndex));
      paymentCardNumber = cleanValue(detailSource.slice(cardIndex + cardName.length)).replace(/[^0-9-*]/g, '');
    } else {
      paymentCardHolder = detailSource;
    }
  } else {
    const bankName = BANK_NAMES.find((candidate) => detailSource.includes(candidate));
    if (bankName) {
      paymentBankName = bankName;
      const bankIndex = detailSource.indexOf(bankName);
      paymentAccountHolder = cleanValue(detailSource.slice(0, bankIndex));
      paymentAccountNumber = cleanValue(detailSource.slice(bankIndex + bankName.length)).replace(/[^0-9-]/g, '');
    } else if (detailSource) {
      paymentAccountHolder = detailSource;
    }
  }

  return {
    paymentMethod: method,
    paymentWithdrawDay: withdrawDay,
    paymentAccountHolder,
    paymentBankName,
    paymentAccountNumber,
    paymentCardCompany,
    paymentCardNumber,
    paymentCardHolder,
  };
}

function extractSamsung(text: string): ParsedContractResult {
  const period = extractPeriod(text);
  const statusLabel = normalizeStatusLabel(matchValue(text, /\n(정상|실효|해지)\n/) || matchValue(text, /계약상태\s*([^\n]+)/));
  const paymentInfo = parsePaymentDetails(matchValue(text, /입금정보\s*([^\n]+)/) || matchValue(text, /수금방법\s*([^\n]+)/));
  const contractorPhone =
    matchValue(text, /계약자정보[\s\S]*?전화번호\s*(01[0-9]-\d{3,4}-\d{4})/) || extractFirstPhone(text);
  const insuredPhone =
    matchValue(text, /주피보험자정보[\s\S]*?전화번호\s*(01[0-9]-\d{3,4}-\d{4})/) || contractorPhone;
  const contractorAddress = sanitizeContractAddress(
    matchValue(text, /계약자정보[\s\S]*?주소\s*([^\n]+)/) || matchValue(text, /주소\s*([^\n]+)/),
  );
  const insuredAddress = sanitizeContractAddress(
    matchValue(text, /주피보험자정보[\s\S]*?주소\s*([^\n]+)/) || contractorAddress,
  );
  const productName = matchValue(text, /상품명\s*([^\n]+)/);
  const contract: Partial<MeetingContractSnapshot> = {
    insurer: '삼성화재',
    productName,
    productType: inferProductType(productName),
    contractType: '신규',
    policyNumber: matchValue(text, /계약번호\s*([0-9-]+)/),
    contractor: matchName(text, /계약자\s*([^\n]+)/),
    insuredPerson: matchName(text, /주피보험자\s*([^\n]+)/),
    paymentCycle: inferPaymentCycle(text, '월납'),
    premium: normalizeMoney(matchValue(text, /1회보험료\s*([0-9,]+)\s*원/)),
    startDate: period.startDate || matchValue(text, /청약일\s*(\d{4}-\d{2}-\d{2})/),
    endDate: period.endDate,
    status: mapContractStatus(statusLabel),
    contractStatusLabel: statusLabel || '정상',
    ...paymentInfo,
    contractorPhone,
    insuredPhone,
    contractorAddress,
    insuredAddress,
  };

  const warnings = getWarnings(contract);
  return {
    contract,
    warnings,
    detectedCarrier: '삼성화재',
    detectedFormat: 'samsung_contract_detail',
    parseStatus: resolveParseStatus(contract, warnings),
  };
}

function extractKb(text: string): ParsedContractResult {
  const period = extractPeriod(text);
  const statusLabel = normalizeStatusLabel(matchValue(text, /계약상태\s*([^\n]+?)\s*발생일/));
  const policyFront = matchValue(text, /증권번호\s*([0-9-]+)/);
  const policyTail = matchValue(text, /증권번호\s*[0-9-]+\s*([0-9]{3})\s*취급자/);
  const contractorLine = cleanValue(matchValue(text, /계약자\s*([^\n]+)/));
  const contractorName = cleanValue(contractorLine.split('/')[0]);
  const contractorPhone = matchValue(text, /계약자[\s\S]*?\((01[0-9]-\d{3,4}-\d{4})\)/) || extractFirstPhone(text);
  const addressMatch = text.match(/발송지\s*([^\n/]+)\s*\/\s*([0-9]{5})\s*([^\n]+)/);
  const paymentCycle = inferPaymentCycle(text, '월납');
  const paymentInfo = parsePaymentDetails(
    text.includes('자동이체')
      ? '자동이체'
      : matchValue(text, /납입주기[\s\S]*?(자동이체|카드|가상계좌)/),
  );
  const productName = matchValue(text, /상품명\s*([^\n]+)/);
  const contract: Partial<MeetingContractSnapshot> = {
    insurer: 'KB손해보험',
    productName,
    productType: inferProductType(productName),
    contractType: '신규',
    policyNumber: cleanValue(`${policyFront}${policyTail}`),
    contractor: contractorName,
    insuredPerson: contractorName || matchValue(text, /목적물\s*1\s*피보험자\s*([^\n]+)/),
    paymentCycle,
    premium:
      normalizeMoney(matchValue(text, /납입보험료\s*([0-9,]+)/)) ||
      normalizeMoney(matchValue(text, /총납입보험료\s*([0-9,]+)/)) ||
      normalizeMoney(matchValue(text, /보장보험료\s*([0-9,]+)/)),
    startDate: period.startDate || matchValue(text, /발생일\s*(\d{4}-\d{2}-\d{2})/),
    endDate: period.endDate,
    status: mapContractStatus(statusLabel),
    contractStatusLabel: statusLabel || '정상/납입정상',
    ...paymentInfo,
    contractorPhone,
    insuredPhone: contractorPhone,
    contractorAddress: sanitizeContractAddress(addressMatch ? `${addressMatch[1]} ${addressMatch[2]} ${addressMatch[3]}` : ''),
    insuredAddress: sanitizeContractAddress(addressMatch ? `${addressMatch[1]} ${addressMatch[2]} ${addressMatch[3]}` : ''),
  };

  const warnings = getWarnings(contract);
  return {
    contract,
    warnings,
    detectedCarrier: 'KB손해보험',
    detectedFormat: 'kb_contract_detail',
    parseStatus: resolveParseStatus(contract, warnings),
  };
}

function extractGeneric(text: string, carrierHint: string): ParsedContractResult {
  const period = extractPeriod(text);
  const productName = matchValue(text, /상품명\s*([^\n]+)/);
  const policyNumber =
    matchValue(text, /계약번호\s*([0-9-]+)/) ||
    matchValue(text, /증권번호\s*([0-9-]+)/) ||
    matchValue(text, /청약번호\s*([A-Z0-9-]+)/);
  const contractor =
    matchName(text, /계약자\s*([^\n]+)/) ||
    matchName(text, /계약자명\s*([^\n]+)/);
  const insuredPerson =
    matchName(text, /피보험자\s*([^\n]+)/) ||
    matchName(text, /주피보험자\s*([^\n]+)/) ||
    contractor;
  const statusLabel = normalizeStatusLabel(matchValue(text, /계약상태\s*([^\n]+)/));
  const address = sanitizeContractAddress(matchValue(text, /주소\s*([^\n]+)/));
  const phone = extractFirstPhone(text);
  const paymentInfo = parsePaymentDetails(matchValue(text, /(자동이체|카드|가상계좌|즉시이체)/));
  const contract: Partial<MeetingContractSnapshot> = {
    insurer: carrierHint === '기타' ? '기타' : carrierHint || '기타',
    productName,
    productType: inferProductType(productName),
    contractType: '신규',
    policyNumber,
    contractor,
    insuredPerson,
    paymentCycle: inferPaymentCycle(text, '월납'),
    premium:
      normalizeMoney(matchValue(text, /납입보험료\s*([0-9,]+)/)) ||
      normalizeMoney(matchValue(text, /1회보험료\s*([0-9,]+)/)) ||
      normalizeMoney(matchValue(text, /보험료\s*([0-9,]+)/)),
    startDate:
      period.startDate ||
      matchValue(text, /청약일\s*(\d{4}-\d{2}-\d{2})/) ||
      matchValue(text, /발생일\s*(\d{4}-\d{2}-\d{2})/),
    endDate: period.endDate,
    status: mapContractStatus(statusLabel),
    contractStatusLabel: statusLabel,
    ...paymentInfo,
    contractorPhone: phone,
    insuredPhone: phone,
    contractorAddress: address,
    insuredAddress: address,
  };

  const warnings = getWarnings(contract);
  return {
    contract,
    warnings,
    detectedCarrier: contract.insurer || '기타',
    detectedFormat: 'generic',
    parseStatus: resolveParseStatus(contract, warnings),
  };
}

function getWarnings(contract: Partial<MeetingContractSnapshot>) {
  const warnings: string[] = [];
  if (!contract.policyNumber) warnings.push('계약/증권번호를 확인해주세요.');
  if (!contract.productName) warnings.push('상품명을 확인해주세요.');
  if (!contract.contractor) warnings.push('계약자 이름을 확인해주세요.');
  if (!contract.insuredPerson) warnings.push('피보험자 이름을 확인해주세요.');
  if (!contract.premium) warnings.push('보험료를 확인해주세요.');
  if (!contract.startDate || !contract.endDate) warnings.push('보험기간을 확인해주세요.');
  return warnings;
}

function resolveParseStatus(contract: Partial<MeetingContractSnapshot>, warnings: string[]) {
  const extractedFieldCount = [
    contract.policyNumber,
    contract.productName,
    contract.contractor,
    contract.insuredPerson,
    contract.premium,
    contract.startDate,
    contract.endDate,
  ].filter(Boolean).length;

  if (extractedFieldCount <= 1) return 'manual';
  if (warnings.length > 0) return 'partial';
  return 'parsed';
}

function detectCarrier(text: string, carrierHint: SupportedPasteCarrier) {
  if (text.includes('GA전용') || text.includes('증권번호') || text.includes('휴대폰서명')) {
    return 'KB손해보험';
  }
  if (text.includes('계약상세') || text.includes('주피보험자') || text.includes('1회보험료')) {
    return '삼성화재';
  }
  return carrierHint;
}

export function parsePastedContract(text: string, carrierHint: SupportedPasteCarrier = '기타'): ParsedContractResult {
  const cleaned = cleanText(text);
  const detectedCarrier = detectCarrier(cleaned, carrierHint);

  if (!cleaned) {
    return {
      contract: {},
      warnings: ['붙여넣은 원문이 비어 있습니다. 보험사 전산 화면 텍스트를 그대로 붙여넣어주세요.'],
      detectedCarrier: carrierHint === '기타' ? '기타' : carrierHint,
      detectedFormat: 'manual',
      parseStatus: 'manual',
    };
  }

  if (detectedCarrier === '삼성화재') {
    return extractSamsung(cleaned);
  }

  if (detectedCarrier === 'KB손해보험') {
    return extractKb(cleaned);
  }

  return extractGeneric(cleaned, carrierHint);
}
