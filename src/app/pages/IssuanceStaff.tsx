import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Loader2,
  MapPin,
  Search,
  Printer,
  Upload,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { useIssuanceOperations } from '@/app/issuance/IssuanceContext';
import { ListPeriodControls } from '@/app/components/ListPeriodControls';
import { AssignmentStatusBadge, DocStatusBadge } from '@/app/components/issuance/IssuanceStatusBadge';
import { IssuanceProgressBar } from '@/app/components/issuance/IssuanceProgressBar';
import { StaffPerformanceBoard } from '@/app/components/issuance/StaffPerformanceBoard';
import { StaffPerformanceTable } from '@/app/components/issuance/StaffPerformanceTable';
import { formatCurrency, getMonthlyIncentiveTierLabel } from '@/app/issuance/incentiveUtils';
import {
  applyPerformancePeriodToRows,
  getDefaultCustomPeriodRange,
  getPerformanceCompletedLabel,
  getPerformancePeriodRange,
  getRowsDateBounds,
  type PerformancePeriodPreset,
} from '@/app/issuance/performancePeriodUtils';
import { UNCLASSIFIED_REGION } from '@/app/issuance/regionUtils';

const CURRENT_STAFF_ID = 'U-STF-03';

interface IssuanceStaffProps {
  initialStaffId?: string | null;
  onNavigate?: (target: string) => void;
}

export function IssuanceStaff({ initialStaffId, onNavigate }: IssuanceStaffProps) {
  const {
    assignments: allAssignments,
    getAssignmentsByStaff,
    getStaffPerformanceSummary,
    getStaffPerformanceRows,
    getUserName,
    downloadSubmissionDocs,
    printTripDocuments,
    uploadRequiredDocument,
    runMockOcr,
    confirmRequiredDocument,
    finalizeAssignment,
  } = useIssuanceOperations();
  const [searchQuery, setSearchQuery] = useState('');
  const defaultCustomPeriodRange = useMemo(() => getDefaultCustomPeriodRange(), []);
  const [staffViewLayout, setStaffViewLayout] = useState<'table' | 'board'>('board');
  const [performancePeriodPreset, setPerformancePeriodPreset] = useState<PerformancePeriodPreset>('this_month');
  const [customPeriodStartDate, setCustomPeriodStartDate] = useState(defaultCustomPeriodRange.startDate);
  const [customPeriodEndDate, setCustomPeriodEndDate] = useState(defaultCustomPeriodRange.endDate);
  const currentStaffId = initialStaffId || null;
  const currentStaffName = currentStaffId ? getUserName(currentStaffId) : null;

  const staffRows = useMemo(() => {
    const rows = getStaffPerformanceRows();
    if (!searchQuery.trim()) {
      return rows;
    }

    const query = searchQuery.trim().toLowerCase();
    return rows.filter((row) =>
      [
        row.staffName,
        row.staffPhone,
        row.managerName,
        row.managerCompany,
        ...row.assignedRegions.map((region) => [region.level1, region.level2, region.level3].filter(Boolean).join(' ')),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [getStaffPerformanceRows, searchQuery]);

  const performancePeriodRange = useMemo(
    () =>
      getPerformancePeriodRange(
        performancePeriodPreset,
        customPeriodStartDate,
        customPeriodEndDate,
        new Date(),
        getRowsDateBounds(
          allAssignments.filter((assignment) => assignment.status === 'completed'),
          (assignment) => assignment.completedAt,
          defaultCustomPeriodRange
        )
      ),
    [allAssignments, customPeriodEndDate, customPeriodStartDate, defaultCustomPeriodRange, performancePeriodPreset]
  );

  const performanceCompletedLabel = useMemo(
    () => getPerformanceCompletedLabel(performancePeriodPreset),
    [performancePeriodPreset]
  );

  const displayStaffRows = useMemo(
    () => applyPerformancePeriodToRows(staffRows, allAssignments, performancePeriodRange),
    [allAssignments, performancePeriodRange, staffRows]
  );

  if (!currentStaffId) {
    return (
      <div className="flex flex-col h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1e293b]">서류 발급 대행 - 직원별 리스트</h2>
              <p className="mt-1 text-xs text-slate-400">직원별 현재 진행과 완료 성과를 확인하고 개별 작업 화면으로 이동합니다.</p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="직원명, 연락처, 팀명 검색"
                className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200"
              />
            </div>
          </div>
        </div>
        <div className="border-b border-slate-100 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-[#1e293b]">
              직원별 현황 {displayStaffRows.length}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setStaffViewLayout('table')}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
                    staffViewLayout === 'table'
                      ? 'bg-slate-100 text-[#1e293b]'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  표 보기
                </button>
                <button
                  type="button"
                  onClick={() => setStaffViewLayout('board')}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
                    staffViewLayout === 'board'
                      ? 'bg-slate-100 text-[#1e293b]'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
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
        <div className="flex-1 overflow-auto">
          {staffViewLayout === 'table' ? (
            <StaffPerformanceTable
              rows={displayStaffRows}
              showManagerColumn
              completedLabel={performanceCompletedLabel}
              onNavigateToStaff={(staffId) => onNavigate?.(`issuance-staff:${staffId}`)}
              emptyMessage="표시할 직원 현황이 없습니다."
            />
          ) : (
            <StaffPerformanceBoard
              rows={displayStaffRows}
              completedLabel={performanceCompletedLabel}
              onNavigateToStaff={(staffId) => onNavigate?.(`issuance-staff:${staffId}`)}
              emptyMessage="표시할 직원 현황이 없습니다."
            />
          )}
        </div>
      </div>
    );
  }

  const assignments = useMemo(() => getAssignmentsByStaff(currentStaffId), [currentStaffId, getAssignmentsByStaff]);
  const performance = useMemo(
    () => getStaffPerformanceSummary(currentStaffId),
    [currentStaffId, getStaffPerformanceSummary]
  );
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [ocrLoadingDocId, setOcrLoadingDocId] = useState<string | null>(null);
  const [showBulkPrint, setShowBulkPrint] = useState(false);

  const selectedAssignment = useMemo(
    () => assignments.find((assignment) => assignment.id === selectedAssignmentId) ?? null,
    [assignments, selectedAssignmentId]
  );

  const incompleteAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.status !== 'completed'),
    [assignments]
  );
  const completedAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.status === 'completed'),
    [assignments]
  );

  const handleOcr = (assignmentId: string, docId: string) => {
    setOcrLoadingDocId(docId);
    window.setTimeout(() => {
      runMockOcr(assignmentId, docId);
      setOcrLoadingDocId(null);
      toast.success('OCR 분석 완료');
    }, 1200);
  };

  const handleFinalSubmit = (assignmentId: string) => {
    if (!finalizeAssignment(assignmentId)) {
      toast.error('모든 서류를 확인 완료한 뒤 최종 제출할 수 있습니다.');
      return;
    }

    toast.success('모든 서류가 최종 제출되었습니다.');
    setSelectedAssignmentId(null);
  };

  const handleBulkPrint = () => {
    const result = printTripDocuments(
      incompleteAssignments.map((assignment) => assignment.locationId),
      '직원'
    );
    if (!result) return;
    toast.success(`미완료 ${incompleteAssignments.length}개 방문지의 3종 서류가 생성되었습니다.`);
    setShowBulkPrint(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1e293b]">서류 발급 대행 - 직원별 리스트</h2>
          <p className="mt-0.5 text-xs text-slate-500">{currentStaffName} 직원의 배정 방문지 서류와 성과를 확인합니다.</p>
        </div>
        <button
          onClick={() => setShowBulkPrint(true)}
          disabled={incompleteAssignments.length === 0}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
        >
          <Printer size={16} />
          미완료 3종 서류 일괄출력
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <section className="mb-6">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-7">
            {[
              { label: '현재 진행중', value: `${performance.inProgressCount}건`, tone: 'text-amber-600' },
              { label: '오늘 완료', value: `${performance.completedToday}건`, tone: 'text-emerald-600' },
              { label: '주간 완료', value: `${performance.completedThisWeek}건`, tone: 'text-slate-700' },
              { label: '월간 완료', value: `${performance.completedThisMonth}건`, tone: 'text-slate-700' },
              { label: '누적 완료', value: `${performance.completedTotal}건`, tone: 'text-slate-700' },
              { label: '월 예상 인센티브', value: formatCurrency(performance.estimatedMonthlyIncentive), tone: 'text-[#1e293b]' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-semibold text-slate-400">{item.label}</div>
                <div className={`mt-2 text-lg font-bold ${item.tone}`}>{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-400">월간 완료 구간 기준 인센티브가 자동 반영됩니다.</div>
        </section>

        {assignments.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">배정된 방문지가 없습니다.</div>
        ) : (
          <>
            {incompleteAssignments.length > 0 && (
              <section className="mb-6">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1e293b]">진행중 ({incompleteAssignments.length})</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {incompleteAssignments.map((assignment) => {
                    const completedDocs = assignment.requiredDocs.filter((doc) => doc.status === 'confirmed').length;
                    return (
                      <button
                        key={assignment.id}
                        onClick={() => setSelectedAssignmentId(assignment.id)}
                        className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-[#0f766e] hover:shadow-md"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{assignment.locationType === 'pharmacy' ? '💊' : '🏥'}</span>
                            <div>
                              <div className="text-sm font-bold text-[#1e293b] transition-colors group-hover:text-[#0f766e]">{assignment.locationName}</div>
                              <div className="text-[11px] text-slate-500">{assignment.customerName}</div>
                            </div>
                          </div>
                          <AssignmentStatusBadge status={assignment.status} />
                        </div>
                        <div className="mb-3 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} />
                          <span className="truncate">{assignment.locationAddress}</span>
                        </div>
                        <IssuanceProgressBar completed={completedDocs} total={assignment.requiredDocs.length} size="md" />
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                          <span>{assignment.requiredDocs.length}건 서류</span>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-[#0f766e]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {completedAssignments.length > 0 && (
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1e293b]">완료 ({completedAssignments.length})</h3>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">완료일</th>
                        <th className="px-4 py-3 font-medium">기관명</th>
                        <th className="px-4 py-3 font-medium">지역</th>
                        <th className="px-4 py-3 font-medium">문서수</th>
                        <th className="px-4 py-3 font-medium">월 인센티브 기준</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {completedAssignments.map((assignment) => (
                        <tr
                          key={assignment.id}
                          className="cursor-pointer transition-colors hover:bg-slate-50"
                          onClick={() => setSelectedAssignmentId(assignment.id)}
                        >
                          <td className="px-4 py-4 text-sm font-medium text-emerald-700">{assignment.completedAt ?? '-'}</td>
                          <td className="px-4 py-4">
                            <div className="font-semibold text-[#1e293b]">{assignment.locationName}</div>
                            <div className="mt-0.5 text-xs text-slate-400">{assignment.customerName}</div>
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-500">
                            {[assignment.regionLevel1 ?? UNCLASSIFIED_REGION, assignment.regionLevel2 ?? UNCLASSIFIED_REGION, assignment.regionLevel3 ?? UNCLASSIFIED_REGION].join(' / ')}
                          </td>
                          <td className="px-4 py-4 font-semibold text-slate-600">{assignment.requiredDocs.length}건</td>
                          <td className="px-4 py-4">
                            <div className="font-semibold text-[#1e293b]">
                              {getMonthlyIncentiveTierLabel(performance.completedThisMonth)}
                            </div>
                            <div className="mt-0.5 text-xs text-slate-400">
                              {formatCurrency(performance.estimatedMonthlyIncentive)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setSelectedAssignmentId(null)} />
          <div className="relative flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-[#1e293b]">{selectedAssignment.locationName}</h2>
                <div className="mt-1 text-xs text-slate-500">{selectedAssignment.customerName} · {selectedAssignment.visitPeriod}</div>
              </div>
              <button onClick={() => setSelectedAssignmentId(null)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-auto p-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#1e293b]">제출 준비 서류</div>
                    <div className="mt-1 text-xs text-slate-500">신분증 사본, 진료기록위임장, 동의서 3종을 내려받습니다.</div>
                  </div>
                  <button
                    onClick={() => {
                      downloadSubmissionDocs(selectedAssignment.id);
                      toast.success('3종 서류를 다운로드했습니다.');
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-white"
                  >
                    <Download size={14} />
                    3종 서류 다운로드
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-[#1e293b]">발급 서류 업로드</div>
                <div className="divide-y divide-slate-100">
                  {selectedAssignment.requiredDocs.map((doc) => (
                    <div key={doc.id} className="px-4 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium text-[#1e293b]">{doc.name}</div>
                          <div className="mt-1 text-xs text-slate-500">
                            {doc.uploadedFile ? `${doc.uploadedFile} / ${doc.uploadedAt ?? '-'}` : '아직 업로드되지 않았습니다.'}
                          </div>
                          {doc.ocrResult && (
                            <div className="mt-2 rounded bg-slate-50 px-2 py-1 text-[11px] text-slate-500">
                              OCR: {doc.ocrResult.hospitalName ?? '-'} / confidence {doc.ocrResult.confidence}
                            </div>
                          )}
                        </div>
                        <DocStatusBadge status={doc.status} />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                          <Upload size={14} />
                          파일 업로드
                          <input
                            type="file"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              uploadRequiredDocument(selectedAssignment.id, doc.id, file.name);
                              toast.success(`${file.name} 업로드 완료`);
                            }}
                          />
                        </label>
                        <button
                          onClick={() => handleOcr(selectedAssignment.id, doc.id)}
                          disabled={doc.status === 'pending' || doc.status === 'ocr_processing' || ocrLoadingDocId === doc.id}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                          {ocrLoadingDocId === doc.id ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}
                          OCR 실행
                        </button>
                        <button
                          onClick={() => {
                            confirmRequiredDocument(selectedAssignment.id, doc.id);
                            toast.success('서류 확인 완료');
                          }}
                          disabled={doc.status !== 'ocr_done'}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#1e293b] px-3 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                        >
                          <CheckCircle2 size={14} />
                          확인 완료
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => handleFinalSubmit(selectedAssignment.id)}
                className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                최종 제출
              </button>
            </div>
          </div>
        </div>
      )}

      {showBulkPrint && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setShowBulkPrint(false)} />
          <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-200 px-6 py-4">
              <h3 className="font-bold text-[#1e293b]">미완료 3종 서류 일괄출력</h3>
              <p className="mt-1 text-xs text-slate-500">현재 미완료 방문지 기준으로 신분증 사본, 위임장, 동의서를 생성합니다.</p>
            </div>
            <div className="px-6 py-5 text-sm text-slate-600">
              총 {incompleteAssignments.length}개 방문지 대상입니다.
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setShowBulkPrint(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                취소
              </button>
              <button
                onClick={handleBulkPrint}
                className="rounded-lg bg-[#1e293b] px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
              >
                출력하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
