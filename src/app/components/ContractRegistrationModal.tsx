import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Building2,
  ClipboardPaste,
  CreditCard,
  FileSearch,
  RefreshCcw,
  Save,
  Search,
  User,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';

import { parsePastedContract, sanitizeContractAddress, type SupportedPasteCarrier } from '@/app/contracts/contractPasteParser';
import type { MeetingContractSnapshot } from '@/app/journey/types';
import { MOCK_DATA } from '@/app/mockData';

type ContractFormState = MeetingContractSnapshot;
type InputMode = 'paste' | 'manual';

interface ContractRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ContractFormState) => void;
  prefilledData?: {
    customerName?: string;
    customerPhone?: string;
    meetingDate?: string;
    consultantName?: string;
  };
  initialData?: ContractFormState;
}

const INSURER_OPTIONS = ['삼성화재', 'KB손해보험', '현대해상', 'DB손해보험', '메리츠화재', '한화손해보험', '기타'];
const PASTE_CARRIER_OPTIONS: SupportedPasteCarrier[] = ['삼성화재', 'KB손해보험', '기타'];
const CONTRACT_TYPE_OPTIONS = ['신규', '배서(증액)', '배서(감액)', '부활', '갱신'];
const PRODUCT_TYPE_OPTIONS = [
  '종합보험',
  '건강/암보험',
  '실손의료보험',
  '운전자/상해보험',
  '자녀보험',
  '화재/재물보험',
  '자동차보험',
  '연금/저축보험',
  '종신/정기보험',
  '치아보험',
];
const PAYMENT_CYCLE_OPTIONS = ['월납', '3개월납', '6개월납', '연납', '일시납'];
const STATUS_OPTIONS: Array<{ value: ContractFormState['status']; label: string }> = [
  { value: 'active', label: '정상' },
  { value: 'pending', label: '대기' },
  { value: 'draft', label: '임시' },
];

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function formatCurrentTimestamp(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function createRandomPolicyNumber() {
  return `TMP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}

function createDefaultFormState(prefilledData?: ContractRegistrationModalProps['prefilledData']): ContractFormState {
  const today = new Date().toISOString().split('T')[0];
  const fallbackName = prefilledData?.customerName || '';
  const fallbackPhone = prefilledData?.customerPhone || '';

  return {
    insurer: '삼성화재',
    contractType: '신규',
    productType: '종합보험',
    productName: '',
    policyNumber: createRandomPolicyNumber(),
    contractor: fallbackName,
    insuredPerson: fallbackName,
    paymentCycle: '월납',
    premium: '',
    startDate: today,
    endDate: '',
    status: 'active',
    memo: '',
    entryMethod: 'manual',
    sourceCarrier: '삼성화재',
    sourceFormat: 'manual',
    rawPasteText: '',
    parseStatus: 'manual',
    parseWarnings: [],
    registeredAt: formatCurrentTimestamp(),
    contractStatusLabel: '',
    paymentMethod: '',
    paymentWithdrawDay: '',
    paymentAccountHolder: '',
    paymentBankName: '',
    paymentAccountNumber: '',
    paymentCardCompany: '',
    paymentCardNumber: '',
    paymentCardHolder: '',
    paymentNote: '',
    contractorPhone: fallbackPhone,
    insuredPhone: fallbackPhone,
    contractorAddress: '',
    insuredAddress: '',
  };
}

function getInputClass(hasError = false, muted = false) {
  return clsx(
    'w-full rounded-lg border px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2',
    muted ? 'bg-slate-50 text-slate-600' : 'bg-white text-slate-900',
    hasError
      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/10'
      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10',
  );
}

function getStatusMeta(status: ContractFormState['status']) {
  if (status === 'active') {
    return { label: '정상', className: 'bg-emerald-100 text-emerald-700' };
  }
  if (status === 'pending') {
    return { label: '대기', className: 'bg-amber-100 text-amber-700' };
  }
  return { label: '임시', className: 'bg-slate-100 text-slate-600' };
}

export function ContractRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  prefilledData,
  initialData,
}: ContractRegistrationModalProps) {
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const defaultForm = useMemo(() => createDefaultFormState(prefilledData), [prefilledData]);
  const [formData, setFormData] = useState<ContractFormState>(defaultForm);
  const [inputMode, setInputMode] = useState<InputMode>('paste');
  const [pasteCarrier, setPasteCarrier] = useState<SupportedPasteCarrier>('삼성화재');
  const [pasteText, setPasteText] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSamePerson, setIsSamePerson] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<typeof MOCK_DATA.customers>([]);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        ...createDefaultFormState(prefilledData),
        ...initialData,
        contractorAddress: sanitizeContractAddress(initialData.contractorAddress),
        insuredAddress: sanitizeContractAddress(initialData.insuredAddress),
        parseWarnings: initialData.parseWarnings || [],
        registeredAt: initialData.registeredAt || formatCurrentTimestamp(),
      });
      setPasteText(initialData.rawPasteText || '');
      setPasteCarrier(
        initialData.sourceCarrier === '삼성화재' || initialData.sourceCarrier === 'KB손해보험'
          ? initialData.sourceCarrier
          : '기타',
      );
      setInputMode(initialData.entryMethod === 'manual' && !initialData.rawPasteText ? 'manual' : 'paste');
      setIsSamePerson((initialData.contractor || '') === (initialData.insuredPerson || ''));
      setSearchTerm(initialData.contractor || '');
    } else {
      const nextDefault = createDefaultFormState(prefilledData);
      setFormData(nextDefault);
      setPasteText('');
      setPasteCarrier('삼성화재');
      setInputMode('paste');
      setIsSamePerson((nextDefault.contractor || '') === (nextDefault.insuredPerson || ''));
      setSearchTerm(nextDefault.contractor || '');
    }

    setValidationErrors([]);
    setIsSearching(false);
  }, [initialData, isOpen, prefilledData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleContractorSearchChange = (value: string) => {
    setSearchTerm(value);
    setFormData((current) => ({
      ...current,
      contractor: value,
      insuredPerson: isSamePerson ? value : current.insuredPerson,
    }));

    if (!value.trim()) {
      setIsSearching(false);
      setFilteredCustomers([]);
      return;
    }

    const filtered = MOCK_DATA.customers.filter((customer) => customer.name.includes(value) || customer.phone.includes(value));
    setFilteredCustomers(filtered);
    setIsSearching(true);
  };

  const selectCustomer = (customer: (typeof MOCK_DATA.customers)[0]) => {
    setSearchTerm(customer.name);
    setFormData((current) => ({
      ...current,
      contractor: customer.name,
      insuredPerson: isSamePerson ? customer.name : current.insuredPerson,
      contractorPhone: current.contractorPhone || customer.phone,
      insuredPhone: isSamePerson ? current.insuredPhone || customer.phone : current.insuredPhone,
      contractorAddress: current.contractorAddress || sanitizeContractAddress(customer.address),
      insuredAddress: isSamePerson ? current.insuredAddress || sanitizeContractAddress(customer.address) : current.insuredAddress,
    }));
    setIsSearching(false);
  };

  const handleParse = () => {
    if (!pasteText.trim()) {
      toast.error('보험사 전산 화면의 계약 상세 텍스트를 먼저 붙여넣어주세요.');
      return;
    }

    const result = parsePastedContract(pasteText, pasteCarrier);
    const nextFormData: ContractFormState = {
      ...formData,
      ...result.contract,
      insurer: result.contract.insurer || result.detectedCarrier || formData.insurer,
      entryMethod: result.parseStatus === 'manual' ? 'manual' : 'pasted',
      sourceCarrier: result.detectedCarrier,
      sourceFormat: result.detectedFormat,
      rawPasteText: pasteText,
      parseStatus: result.parseStatus,
      parseWarnings: result.warnings,
      contractType: result.contract.contractType || formData.contractType || '신규',
      productType: result.contract.productType || formData.productType || '종합보험',
      paymentCycle: result.contract.paymentCycle || formData.paymentCycle || '월납',
      status: result.contract.status || formData.status || 'active',
      registeredAt: formData.registeredAt || formatCurrentTimestamp(),
      memo: formData.memo,
    };

    setFormData(nextFormData);
    setSearchTerm(nextFormData.contractor || '');
    setIsSamePerson((nextFormData.contractor || '') === (nextFormData.insuredPerson || ''));
    setValidationErrors([]);
    if (result.detectedCarrier === '삼성화재' || result.detectedCarrier === 'KB손해보험') {
      setPasteCarrier(result.detectedCarrier);
    } else {
      setPasteCarrier('기타');
    }

    if (result.parseStatus === 'parsed') {
      toast.success(`${result.detectedCarrier} 계약 상세를 파싱했습니다.`);
    } else if (result.parseStatus === 'partial') {
      toast.info(`일부 필드를 자동 채웠습니다. 경고 ${result.warnings.length}건을 확인해주세요.`);
    } else {
      toast.warning('자동 인식이 제한적입니다. 아래 검수 폼에서 직접 보정해주세요.');
    }
  };

  const handleResetParsed = () => {
    const nextDefault = createDefaultFormState(prefilledData);
    setFormData(nextDefault);
    setPasteText('');
    setSearchTerm(nextDefault.contractor || '');
    setPasteCarrier('삼성화재');
    setInputMode('paste');
    setValidationErrors([]);
    setIsSamePerson((nextDefault.contractor || '') === (nextDefault.insuredPerson || ''));
    toast.success('파싱값을 초기화했습니다.');
  };

  const handleManualMode = () => {
    setInputMode('manual');
    setFormData((current) => ({
      ...current,
      entryMethod: 'manual',
      parseStatus: current.rawPasteText ? current.parseStatus : 'manual',
      sourceFormat: current.rawPasteText ? current.sourceFormat : 'manual',
      sourceCarrier: current.rawPasteText ? current.sourceCarrier : current.insurer,
    }));
  };

  const validate = () => {
    const requiredFields: Record<string, string> = {
      insurer: formData.insurer,
      productName: formData.productName,
      policyNumber: formData.policyNumber,
      contractor: formData.contractor,
      insuredPerson: formData.insuredPerson,
      premium: formData.premium,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    const missing = Object.entries(requiredFields)
      .filter(([, value]) => !String(value || '').trim())
      .map(([key]) => key);

    setValidationErrors(missing);
    if (missing.length) {
      toast.error('핵심 필드를 확인해주세요. 누락 항목을 강조했습니다.');
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const payload: ContractFormState = {
      ...formData,
      premium: formData.premium.replace(/[^0-9]/g, ''),
      entryMethod: inputMode === 'paste' && pasteText.trim() ? 'pasted' : formData.entryMethod || 'manual',
      sourceCarrier: inputMode === 'paste' ? formData.sourceCarrier || pasteCarrier : formData.insurer,
      sourceFormat: inputMode === 'paste' ? formData.sourceFormat || 'generic' : 'manual',
      rawPasteText: inputMode === 'paste' ? pasteText.trim() : formData.rawPasteText || '',
      parseStatus: inputMode === 'paste' ? formData.parseStatus || 'partial' : 'manual',
      parseWarnings: formData.parseWarnings || [],
      registeredAt: formData.registeredAt || formatCurrentTimestamp(),
      contractStatusLabel: formData.contractStatusLabel || getStatusMeta(formData.status).label,
      contractor: formData.contractor.trim(),
      insuredPerson: formData.insuredPerson.trim(),
      contractorPhone: formData.contractorPhone?.trim() || '',
      insuredPhone: formData.insuredPhone?.trim() || '',
      contractorAddress: sanitizeContractAddress(formData.contractorAddress?.trim() || ''),
      insuredAddress: sanitizeContractAddress(formData.insuredAddress?.trim() || ''),
      paymentMethod: formData.paymentMethod?.trim() || '',
      paymentWithdrawDay: formData.paymentWithdrawDay?.trim() || '',
      paymentAccountHolder: formData.paymentAccountHolder?.trim() || '',
      paymentBankName: formData.paymentBankName?.trim() || '',
      paymentAccountNumber: formData.paymentAccountNumber?.trim() || '',
      paymentCardCompany: formData.paymentCardCompany?.trim() || '',
      paymentCardNumber: formData.paymentCardNumber?.trim() || '',
      paymentCardHolder: formData.paymentCardHolder?.trim() || '',
      paymentNote: formData.paymentNote?.trim() || '',
      memo: formData.memo?.trim() || '',
    };

    onSubmit?.(payload);
    toast.success(initialData ? '계약 정보가 수정되었습니다.' : '계약이 등록되었습니다.');
    onClose();
  };

  const parseMeta = formData.parseStatus || 'manual';
  const paymentMethod = formData.paymentMethod || '';
  const isCardPayment = paymentMethod === '카드';
  const isAccountPayment = paymentMethod === '자동이체' || paymentMethod === '가상계좌' || paymentMethod === '즉시이체';
  const needsDayField = paymentMethod === '자동이체' || paymentMethod === '카드' || paymentMethod === '가상계좌' || paymentMethod === '즉시이체';
  const dayFieldLabel =
    paymentMethod === '카드'
      ? '결제일'
      : paymentMethod === '가상계좌'
        ? '입금기한'
        : paymentMethod === '즉시이체'
          ? '처리일'
          : '출금일';
  const noteFieldLabel = paymentMethod === '현금' ? '수납 메모' : '납입 메모';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <ClipboardPaste size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{initialData ? '계약 정보 수정' : '단건 계약 등록'}</h3>
              <p className="text-xs text-slate-500">보험사 전산의 계약 상세 텍스트를 복사해 붙여넣으면 요약 필드를 채우고, 아래에서 바로 검수 후 저장합니다.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar overflow-y-auto px-6 py-5">
          <form id="contract-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">입력 방식</p>
                  <p className="mt-1 text-xs text-slate-500">v1은 단건 등록만 지원합니다. 삼성화재, KB손해보험은 정식 파서로 읽고 다른 보험사는 일부 필드만 시도 파싱합니다.</p>
                </div>
                <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setInputMode('paste')}
                    className={clsx(
                      'rounded-md px-3 py-1.5 text-xs font-bold transition-colors',
                      inputMode === 'paste' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50',
                    )}
                  >
                    복붙 등록
                  </button>
                  <button
                    type="button"
                    onClick={handleManualMode}
                    className={clsx(
                      'rounded-md px-3 py-1.5 text-xs font-bold transition-colors',
                      inputMode === 'manual' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50',
                    )}
                  >
                    직접 입력
                  </button>
                </div>
              </div>

              {inputMode === 'paste' && (
                <div className="mt-4 space-y-4">
                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">보험사 소스</label>
                      <select
                        value={pasteCarrier}
                        onChange={(event) => setPasteCarrier(event.target.value as SupportedPasteCarrier)}
                        className={getInputClass(false)}
                      >
                        {PASTE_CARRIER_OPTIONS.map((carrier) => (
                          <option key={carrier} value={carrier}>
                            {carrier}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end gap-2">
                      <button
                        type="button"
                        onClick={handleParse}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                      >
                        <FileSearch size={16} />
                        파싱하기
                      </button>
                      <button
                        type="button"
                        onClick={handleResetParsed}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        <RefreshCcw size={15} />
                        파싱값 초기화
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-500">원문 붙여넣기</label>
                    <textarea
                      value={pasteText}
                      onChange={(event) => setPasteText(event.target.value)}
                      placeholder="보험사 전산 화면의 계약 상세 텍스트를 그대로 붙여넣어주세요. 이미지 OCR은 지원하지 않습니다."
                      className="min-h-[220px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] leading-6 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                    />
                    <p className="mt-2 text-[11px] text-slate-400">담보/특약 상세 라인은 이번 버전에서 구조화하지 않고 원문만 저장합니다.</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                      <p className="text-[11px] font-semibold text-slate-500">등록 방식</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{formData.entryMethod === 'pasted' ? '복붙' : '수기'}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                      <p className="text-[11px] font-semibold text-slate-500">감지 포맷</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{formData.sourceFormat || 'manual'}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                      <p className="text-[11px] font-semibold text-slate-500">파싱 상태</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {parseMeta === 'parsed' ? '파싱 완료' : parseMeta === 'partial' ? '부분 파싱' : '수기 입력'}
                      </p>
                    </div>
                  </div>

                  {Boolean(formData.parseWarnings?.length) && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <div className="flex items-center gap-2 text-amber-800">
                        <AlertCircle size={16} />
                        <p className="text-sm font-bold">검수 필요 항목</p>
                      </div>
                      <ul className="mt-2 space-y-1 text-xs text-amber-700">
                        {(formData.parseWarnings || []).map((warning) => (
                          <li key={warning}>- {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">파싱 결과 검수</h4>
                  <p className="mt-1 text-xs text-slate-500">자동 입력된 값은 언제든 바로 수정할 수 있습니다. 저장 전 핵심 필드만 확인합니다.</p>
                </div>
                <span
                  className={clsx(
                    'rounded-full px-2 py-0.5 text-[11px] font-bold',
                    parseMeta === 'parsed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : parseMeta === 'partial'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600',
                  )}
                >
                  {parseMeta === 'parsed' ? '자동 채움 완료' : parseMeta === 'partial' ? '부분 자동 채움' : '직접 입력'}
                </span>
              </div>

              <div className="mt-4 space-y-6">
                <section>
                  <h5 className="mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2 text-xs font-bold text-slate-900">
                    <Building2 size={14} className="text-blue-500" /> 기본 정보
                  </h5>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">보험사</label>
                      <select
                        value={formData.insurer}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            insurer: event.target.value,
                            sourceCarrier: current.entryMethod === 'manual' ? event.target.value : current.sourceCarrier,
                          }))
                        }
                        className={getInputClass(validationErrors.includes('insurer'))}
                      >
                        {INSURER_OPTIONS.map((insurer) => (
                          <option key={insurer} value={insurer}>
                            {insurer}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">계약 종류</label>
                      <select
                        value={formData.contractType}
                        onChange={(event) => setFormData((current) => ({ ...current, contractType: event.target.value }))}
                        className={getInputClass(false)}
                      >
                        {CONTRACT_TYPE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">상품 종류</label>
                      <select
                        value={formData.productType}
                        onChange={(event) => setFormData((current) => ({ ...current, productType: event.target.value }))}
                        className={getInputClass(false)}
                      >
                        {PRODUCT_TYPE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">계약/증권번호</label>
                      <input
                        type="text"
                        value={formData.policyNumber}
                        onChange={(event) => setFormData((current) => ({ ...current, policyNumber: event.target.value }))}
                        className={getInputClass(validationErrors.includes('policyNumber'))}
                        placeholder="계약번호 또는 증권번호"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">상품명</label>
                      <input
                        type="text"
                        value={formData.productName}
                        onChange={(event) => setFormData((current) => ({ ...current, productName: event.target.value }))}
                        className={getInputClass(validationErrors.includes('productName'))}
                        placeholder="상품명 전체 입력"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">계약 상태 라벨</label>
                      <input
                        type="text"
                        value={formData.contractStatusLabel || ''}
                        onChange={(event) => setFormData((current) => ({ ...current, contractStatusLabel: event.target.value }))}
                        className={getInputClass(false)}
                        placeholder="정상 / 심사대기 등"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">내부 상태</label>
                      <select
                        value={formData.status}
                        onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as ContractFormState['status'] }))}
                        className={getInputClass(false)}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <h5 className="mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2 text-xs font-bold text-slate-900">
                    <User size={14} className="text-purple-500" /> 계약자 / 피보험자
                  </h5>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative" ref={searchWrapperRef}>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">계약자</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(event) => handleContractorSearchChange(event.target.value)}
                          onFocus={() => {
                            if (searchTerm.trim()) setIsSearching(true);
                          }}
                          className={getInputClass(validationErrors.includes('contractor'))}
                          placeholder="고객 이름 검색..."
                          autoComplete="off"
                        />
                        <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>

                      {isSearching && filteredCustomers.length > 0 && (
                        <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                          {filteredCustomers.map((customer) => (
                            <button
                              key={customer.id}
                              type="button"
                              onClick={() => selectCustomer(customer)}
                              className="flex w-full flex-col border-b border-slate-50 px-3 py-2 text-left text-sm hover:bg-slate-50 last:border-0"
                            >
                              <span className="font-bold text-slate-800">{customer.name}</span>
                              <span className="text-xs text-slate-500">
                                {customer.phone} · {customer.address}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {isSearching && filteredCustomers.length === 0 && (
                        <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white p-3 text-center text-xs text-slate-500 shadow-lg">
                          검색 결과가 없습니다.
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-500">피보험자</label>
                        <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                          <input
                            type="checkbox"
                            checked={isSamePerson}
                            onChange={(event) => {
                              const checked = event.target.checked;
                              setIsSamePerson(checked);
                              if (checked) {
                                setFormData((current) => ({
                                  ...current,
                                  insuredPerson: current.contractor,
                                  insuredPhone: current.contractorPhone,
                                  insuredAddress: current.contractorAddress,
                                }));
                              }
                            }}
                            className="size-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          계약자와 동일
                        </label>
                      </div>
                      <input
                        type="text"
                        value={formData.insuredPerson}
                        onChange={(event) => {
                          const value = event.target.value;
                          setFormData((current) => ({ ...current, insuredPerson: value }));
                          if (isSamePerson && value !== formData.contractor) {
                            setIsSamePerson(false);
                          }
                        }}
                        className={getInputClass(validationErrors.includes('insuredPerson'), isSamePerson)}
                        placeholder="피보험자 이름"
                        readOnly={isSamePerson}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">계약자 연락처</label>
                      <input
                        type="text"
                        value={formData.contractorPhone || ''}
                        onChange={(event) => setFormData((current) => ({ ...current, contractorPhone: event.target.value }))}
                        className={getInputClass(false)}
                        placeholder="010-0000-0000"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">피보험자 연락처</label>
                      <input
                        type="text"
                        value={formData.insuredPhone || ''}
                        onChange={(event) => setFormData((current) => ({ ...current, insuredPhone: event.target.value }))}
                        className={getInputClass(false, isSamePerson)}
                        placeholder="010-0000-0000"
                        readOnly={isSamePerson}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">계약자 주소</label>
                      <input
                        type="text"
                        value={formData.contractorAddress || ''}
                        onChange={(event) => setFormData((current) => ({ ...current, contractorAddress: sanitizeContractAddress(event.target.value) }))}
                        className={getInputClass(false)}
                        placeholder="계약자 주소"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">피보험자 주소</label>
                      <input
                        type="text"
                        value={formData.insuredAddress || ''}
                        onChange={(event) => setFormData((current) => ({ ...current, insuredAddress: sanitizeContractAddress(event.target.value) }))}
                        className={getInputClass(false, isSamePerson)}
                        placeholder="피보험자 주소"
                        readOnly={isSamePerson}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h5 className="mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2 text-xs font-bold text-slate-900">
                    <CreditCard size={14} className="text-emerald-500" /> 납입 및 보험기간
                  </h5>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">납입 주기</label>
                      <select
                        value={formData.paymentCycle}
                        onChange={(event) => setFormData((current) => ({ ...current, paymentCycle: event.target.value }))}
                        className={getInputClass(false)}
                      >
                        {PAYMENT_CYCLE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">납입 방법</label>
                      <select
                        value={formData.paymentMethod || ''}
                        onChange={(event) =>
                          setFormData((current) => {
                            const nextMethod = event.target.value;
                            const resetAccountFields =
                              nextMethod === '자동이체' || nextMethod === '가상계좌' || nextMethod === '즉시이체'
                                ? {}
                                : {
                                    paymentAccountHolder: '',
                                    paymentBankName: '',
                                    paymentAccountNumber: '',
                                  };
                            const resetCardFields =
                              nextMethod === '카드'
                                ? {}
                                : {
                                    paymentCardCompany: '',
                                    paymentCardNumber: '',
                                    paymentCardHolder: '',
                                  };
                            const resetNoteField =
                              nextMethod === '현금' || nextMethod === '일시납'
                                ? {}
                                : {
                                    paymentNote: '',
                                  };
                            return {
                              ...current,
                              paymentMethod: nextMethod,
                              paymentWithdrawDay: nextMethod === current.paymentMethod ? current.paymentWithdrawDay : '',
                              ...resetAccountFields,
                              ...resetCardFields,
                              ...resetNoteField,
                            };
                          })
                        }
                        className={getInputClass(false)}
                      >
                        <option value="">선택</option>
                        <option value="자동이체">자동이체</option>
                        <option value="카드">카드</option>
                        <option value="가상계좌">가상계좌</option>
                        <option value="즉시이체">즉시이체</option>
                        <option value="일시납">일시납</option>
                        <option value="현금">현금</option>
                      </select>
                    </div>
                    {needsDayField && (
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-500">{dayFieldLabel}</label>
                        <input
                          type="text"
                          value={formData.paymentWithdrawDay || ''}
                          onChange={(event) => setFormData((current) => ({ ...current, paymentWithdrawDay: event.target.value }))}
                          className={getInputClass(false)}
                          placeholder={paymentMethod === '카드' ? '매월 15일' : '05일'}
                        />
                      </div>
                    )}
                    {isAccountPayment && (
                      <>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-500">예금주</label>
                          <input
                            type="text"
                            value={formData.paymentAccountHolder || ''}
                            onChange={(event) => setFormData((current) => ({ ...current, paymentAccountHolder: event.target.value }))}
                            className={getInputClass(false)}
                            placeholder="예금주"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-500">은행명</label>
                          <input
                            type="text"
                            value={formData.paymentBankName || ''}
                            onChange={(event) => setFormData((current) => ({ ...current, paymentBankName: event.target.value }))}
                            className={getInputClass(false)}
                            placeholder="국민은행"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-500">{paymentMethod === '가상계좌' ? '가상계좌번호' : '계좌번호'}</label>
                          <input
                            type="text"
                            value={formData.paymentAccountNumber || ''}
                            onChange={(event) => setFormData((current) => ({ ...current, paymentAccountNumber: event.target.value.replace(/[^0-9-]/g, '') }))}
                            className={getInputClass(false)}
                            placeholder="01380204093943"
                          />
                        </div>
                      </>
                    )}
                    {isCardPayment && (
                      <>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-500">카드사</label>
                          <input
                            type="text"
                            value={formData.paymentCardCompany || ''}
                            onChange={(event) => setFormData((current) => ({ ...current, paymentCardCompany: event.target.value }))}
                            className={getInputClass(false)}
                            placeholder="삼성카드"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-500">카드번호</label>
                          <input
                            type="text"
                            value={formData.paymentCardNumber || ''}
                            onChange={(event) => setFormData((current) => ({ ...current, paymentCardNumber: event.target.value.replace(/[^0-9-* -]/g, '') }))}
                            className={getInputClass(false)}
                            placeholder="1234-****-****-5678"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-500">카드 명의자</label>
                          <input
                            type="text"
                            value={formData.paymentCardHolder || ''}
                            onChange={(event) => setFormData((current) => ({ ...current, paymentCardHolder: event.target.value }))}
                            className={getInputClass(false)}
                            placeholder="카드 명의자"
                          />
                        </div>
                      </>
                    )}
                    {(paymentMethod === '현금' || paymentMethod === '일시납') && (
                      <div className="md:col-span-2">
                        <label className="mb-1.5 block text-xs font-bold text-slate-500">{noteFieldLabel}</label>
                        <input
                          type="text"
                          value={formData.paymentNote || ''}
                          onChange={(event) => setFormData((current) => ({ ...current, paymentNote: event.target.value }))}
                          className={getInputClass(false)}
                          placeholder="수납 메모 또는 결제 비고"
                        />
                      </div>
                    )}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">보험료</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.premium ? Number(formData.premium).toLocaleString('ko-KR') : ''}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              premium: event.target.value.replace(/[^0-9]/g, ''),
                            }))
                          }
                          className={clsx(getInputClass(validationErrors.includes('premium')), 'pr-8 text-right font-bold')}
                          placeholder="0"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">원</span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">등록 시각</label>
                      <input
                        type="text"
                        value={formData.registeredAt || ''}
                        readOnly
                        className={getInputClass(false, true)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">보험 시작일</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(event) => setFormData((current) => ({ ...current, startDate: event.target.value }))}
                        className={getInputClass(validationErrors.includes('startDate'))}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-500">보험 종료일</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(event) => setFormData((current) => ({ ...current, endDate: event.target.value }))}
                        className={getInputClass(validationErrors.includes('endDate'))}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <label className="mb-1.5 block text-xs font-bold text-slate-500">관리 메모</label>
                  <textarea
                    value={formData.memo || ''}
                    onChange={(event) => setFormData((current) => ({ ...current, memo: event.target.value }))}
                    className="min-h-[90px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                    placeholder="특이사항이나 메모를 입력하세요."
                  />
                </section>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 text-amber-700" />
                <div className="text-xs text-amber-800">
                  <p className="font-bold">저장 전 체크</p>
                  <p className="mt-1">등록 즉시 계약 현황 집계에 반영됩니다. v1에서는 담보/특약 상세를 분리 저장하지 않고, 붙여넣은 원문만 함께 보관합니다.</p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            취소
          </button>
          <button
            type="submit"
            form="contract-form"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
          >
            <Save size={16} />
            {initialData ? '수정 저장' : '계약 저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
