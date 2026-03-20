import React, { useState, useMemo } from 'react';
import { FileText, Clipboard, Check, Activity, Shield, Code, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { ScriptTopicItem, type ReferenceData } from './ScriptTopicItem';
import {
  HIRA_SCRIPT_TOPICS,
  COVERAGE_SCRIPT_TOPICS,
  MOCK_HIRA_DISEASE_RECORDS,
  HIRA_TOPIC_REFERENCES,
  COVERAGE_TOPIC_REFERENCES,
} from './mockScriptTemplates';
import {
  MOCK_CONTRACTS,
  MOCK_COVERAGE_ITEMS,
  MOCK_GAP_FLAGS,
} from './mockInsuranceAnalysis';
import { toast } from 'sonner';

interface TopicState {
  isActive: boolean;
  templateId: string | null;
  text: string;
}

function formatReferenceForScript(referenceData?: ReferenceData): string {
  if (!referenceData) return '';

  const lines: string[] = [`참조 요약: ${referenceData.summary}`];

  if (referenceData.type === 'hira' && referenceData.hiraRecords?.length) {
    referenceData.hiraRecords.slice(0, 3).forEach((record) => {
      lines.push(
        `- ${record.date} / ${record.hospital} / ${record.diagnosis}(${record.diseaseCode}) / ${record.treatmentType} / ${record.details}`
      );
    });
    if (referenceData.hiraRecords.length > 3) {
      lines.push(`- 외 ${referenceData.hiraRecords.length - 3}건 추가 진료내역`);
    }
  }

  if (referenceData.type === 'coverage') {
    if (referenceData.coverageItems?.length) {
      referenceData.coverageItems.slice(0, 3).forEach((item) => {
        lines.push(
          `- ${item.insurer} / ${item.coverageName} / ${item.amount >= 10000 ? `${(item.amount / 10000).toFixed(0)}억` : `${item.amount}만`}원 / ${item.isRenewal ? '갱신형' : '비갱신형'}`
        );
      });
      if (referenceData.coverageItems.length > 3) {
        lines.push(`- 외 ${referenceData.coverageItems.length - 3}개 담보 추가`);
      }
    }
    if (referenceData.gapDetail) {
      lines.push(`- 갭 분석: ${referenceData.gapDetail}`);
    }
    if (referenceData.gapRecommendation) {
      lines.push(`- 제안 포인트: ${referenceData.gapRecommendation}`);
    }
  }

  return lines.join('\n');
}

function composeTopicBlock(label: string, state: TopicState | undefined, defaultText: string, referenceData?: ReferenceData): string | null {
  if (!state?.isActive) return null;

  const referenceText = formatReferenceForScript(referenceData);
  const scriptText = state.text.trim() || defaultText.trim();
  const body = [referenceText, scriptText].filter(Boolean).join('\n\n');

  if (!body) return null;
  return `【${label}】\n${body}`;
}

// 심평원 토픽 → 참조 데이터 빌드
function buildHiraReference(topicId: string): ReferenceData | undefined {
  const ref = HIRA_TOPIC_REFERENCES[topicId];
  if (!ref || ref.records.length === 0) return undefined;
  return {
    type: 'hira',
    summary: ref.summary,
    hiraRecords: ref.records,
  };
}

// 보장분석 토픽 → 참조 데이터 빌드
function buildCoverageReference(topicId: string): ReferenceData | undefined {
  const ref = COVERAGE_TOPIC_REFERENCES[topicId];
  if (!ref) return undefined;

  const gapFlag = MOCK_GAP_FLAGS.find(f => f.id === ref.gapFlagId);

  // 관련 담보 아이템 조회
  const coverageItems = MOCK_COVERAGE_ITEMS
    .filter(item => ref.relatedCoverageNames.includes(item.coverageName))
    .map(item => {
      const contract = MOCK_CONTRACTS.find(c => c.id === item.contractId);
      return {
        coverageName: item.coverageName,
        insurer: contract?.insurer || '',
        amount: item.amount,
        category: item.category,
        isRenewal: item.isRenewal,
      };
    });

  return {
    type: 'coverage',
    summary: ref.summary,
    coverageItems,
    gapDetected: gapFlag?.detected,
    gapSeverity: gapFlag?.severity,
    gapDetail: gapFlag?.detail,
    gapRecommendation: gapFlag?.recommendation,
  };
}

// 상병코드 → 관련 심평원 레코드 빌드
function buildDiseaseReference(code: string, name: string, visitCount: number, lastVisitDate: string): ReferenceData {
  // 모든 토픽 레퍼런스에서 해당 상병코드가 포함된 진료내역 수집
  const allRecords = Object.values(HIRA_TOPIC_REFERENCES)
    .flatMap(t => t.records)
    .filter(r => r.diseaseCode === code);

  return {
    type: 'hira',
    summary: `${name}(${code}) / 총 ${visitCount}회 진료 / 최종: ${lastVisitDate}`,
    hiraRecords: allRecords.length > 0 ? allRecords : [
      {
        date: lastVisitDate,
        hospital: '-',
        department: '-',
        diagnosis: name,
        diseaseCode: code,
        treatmentType: '외래',
        details: `총 ${visitCount}회 진료`,
      },
    ],
  };
}

export function SalesScriptTab() {
  // 심평원 기반 토픽 상태
  const [hiraStates, setHiraStates] = useState<Record<string, TopicState>>(() => {
    const initial: Record<string, TopicState> = {};
    HIRA_SCRIPT_TOPICS.forEach(t => {
      initial[t.id] = { isActive: false, templateId: null, text: '' };
    });
    return initial;
  });

  // 보장분석 기반 토픽 상태
  const [coverageStates, setCoverageStates] = useState<Record<string, TopicState>>(() => {
    const initial: Record<string, TopicState> = {};
    COVERAGE_SCRIPT_TOPICS.forEach(t => {
      initial[t.id] = { isActive: false, templateId: null, text: '' };
    });
    return initial;
  });

  // 상병코드별 스크립트 상태
  const [diseaseStates, setDiseaseStates] = useState<Record<string, TopicState>>(() => {
    const initial: Record<string, TopicState> = {};
    MOCK_HIRA_DISEASE_RECORDS.forEach(d => {
      initial[d.code] = { isActive: false, templateId: null, text: '' };
    });
    return initial;
  });

  // 섹션 접기/펼치기
  const [expandedSections, setExpandedSections] = useState({
    hira: true,
    coverage: true,
    disease: true,
    preview: true,
  });

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 참조 데이터 캐시 (useMemo)
  const hiraReferences = useMemo(() => {
    const refs: Record<string, ReferenceData | undefined> = {};
    HIRA_SCRIPT_TOPICS.forEach(t => {
      refs[t.id] = buildHiraReference(t.id);
    });
    return refs;
  }, []);

  const coverageReferences = useMemo(() => {
    const refs: Record<string, ReferenceData | undefined> = {};
    COVERAGE_SCRIPT_TOPICS.forEach(t => {
      refs[t.id] = buildCoverageReference(t.id);
    });
    return refs;
  }, []);

  const diseaseReferences = useMemo(() => {
    const refs: Record<string, ReferenceData> = {};
    MOCK_HIRA_DISEASE_RECORDS.forEach(d => {
      refs[d.code] = buildDiseaseReference(d.code, d.name, d.visitCount, d.lastVisitDate);
    });
    return refs;
  }, []);

  // 최종 스크립트 합산
  const composedScript = useMemo(() => {
    const parts: string[] = [];

    HIRA_SCRIPT_TOPICS.forEach(t => {
      const state = hiraStates[t.id];
      const block = composeTopicBlock(t.label, state, t.defaultText, hiraReferences[t.id]);
      if (block) parts.push(block);
    });

    MOCK_HIRA_DISEASE_RECORDS.forEach(d => {
      const state = diseaseStates[d.code];
      const block = composeTopicBlock(`상병코드: ${d.code} - ${d.name}`, state, d.scriptTemplate, diseaseReferences[d.code]);
      if (block) parts.push(block);
    });

    COVERAGE_SCRIPT_TOPICS.forEach(t => {
      const state = coverageStates[t.id];
      const block = composeTopicBlock(t.label, state, t.defaultText, coverageReferences[t.id]);
      if (block) parts.push(block);
    });

    return parts.join('\n\n---\n\n');
  }, [hiraStates, coverageStates, diseaseStates, hiraReferences, coverageReferences, diseaseReferences]);

  const [copied, setCopied] = useState(false);
  const handleCopyAll = () => {
    navigator.clipboard.writeText(composedScript);
    setCopied(true);
    toast.success('전체 스크립트가 복사되었습니다.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    toast.success('스크립트가 저장되었습니다.');
  };

  const activeCount = Object.values(hiraStates).filter(s => s.isActive).length
    + Object.values(coverageStates).filter(s => s.isActive).length
    + Object.values(diseaseStates).filter(s => s.isActive).length;

  return (
    <div className="space-y-6">
      {/* 요약 헤더 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-600" />
            <span className="font-bold text-sm text-slate-800">영업 스크립트 빌더</span>
          </div>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs text-slate-500">
            활성 토픽 <span className="font-bold text-blue-600">{activeCount}</span>개
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
          >
            저장
          </button>
        </div>
      </div>

      {/* 섹션 A: 심평원 기반 */}
      <SectionHeader
        icon={<Activity size={16} />}
        title="A. 심평원 진료내역 기반"
        subtitle={`${HIRA_SCRIPT_TOPICS.length}개 토픽`}
        expanded={expandedSections.hira}
        onToggle={() => toggleSection('hira')}
        color="indigo"
      />
      {expandedSections.hira && (
        <div className="space-y-2">
          {HIRA_SCRIPT_TOPICS.map(topic => (
            <ScriptTopicItem
              key={topic.id}
              label={topic.label}
              source={topic.source}
              isActive={hiraStates[topic.id]?.isActive ?? false}
              defaultExpanded={!!hiraReferences[topic.id]}
              text={hiraStates[topic.id]?.text ?? ''}
              defaultText={topic.defaultText}
              savedVersions={topic.savedVersions}
              referenceData={hiraReferences[topic.id]}
              onToggle={() => setHiraStates(prev => ({
                ...prev,
                [topic.id]: { ...prev[topic.id], isActive: !prev[topic.id].isActive }
              }))}
              onChange={(text) => setHiraStates(prev => ({
                ...prev,
                [topic.id]: { ...prev[topic.id], text }
              }))}
              onLoadTemplate={(text) => setHiraStates(prev => ({
                ...prev,
                [topic.id]: { ...prev[topic.id], text, isActive: true }
              }))}
            />
          ))}
        </div>
      )}

      {/* 상병코드별 스크립트 */}
      <SectionHeader
        icon={<Code size={16} />}
        title="심평원 상병코드별 스크립트"
        subtitle={`${MOCK_HIRA_DISEASE_RECORDS.length}개 상병코드`}
        expanded={expandedSections.disease}
        onToggle={() => toggleSection('disease')}
        color="violet"
      />
      {expandedSections.disease && (
        <div className="space-y-2">
          {MOCK_HIRA_DISEASE_RECORDS.map(record => (
            <ScriptTopicItem
              key={record.code}
              label={`${record.code} - ${record.name} (${record.visitCount}회)`}
              source="hira"
              isActive={diseaseStates[record.code]?.isActive ?? false}
              defaultExpanded={!!diseaseReferences[record.code]}
              text={diseaseStates[record.code]?.text ?? ''}
              defaultText={record.scriptTemplate}
              savedVersions={[]}
              referenceData={diseaseReferences[record.code]}
              onToggle={() => setDiseaseStates(prev => ({
                ...prev,
                [record.code]: { ...prev[record.code], isActive: !prev[record.code].isActive }
              }))}
              onChange={(text) => setDiseaseStates(prev => ({
                ...prev,
                [record.code]: { ...prev[record.code], text }
              }))}
              onLoadTemplate={(text) => setDiseaseStates(prev => ({
                ...prev,
                [record.code]: { ...prev[record.code], text, isActive: true }
              }))}
            />
          ))}
        </div>
      )}

      {/* 섹션 B: 보장분석 기반 */}
      <SectionHeader
        icon={<Shield size={16} />}
        title="B. 보장분석 기반"
        subtitle={`${COVERAGE_SCRIPT_TOPICS.length}개 토픽`}
        expanded={expandedSections.coverage}
        onToggle={() => toggleSection('coverage')}
        color="amber"
      />
      {expandedSections.coverage && (
        <div className="space-y-2">
          {COVERAGE_SCRIPT_TOPICS.map(topic => (
            <ScriptTopicItem
              key={topic.id}
              label={topic.label}
              source={topic.source}
              isActive={coverageStates[topic.id]?.isActive ?? false}
              defaultExpanded={!!coverageReferences[topic.id]}
              text={coverageStates[topic.id]?.text ?? ''}
              defaultText={topic.defaultText}
              savedVersions={topic.savedVersions}
              referenceData={coverageReferences[topic.id]}
              onToggle={() => setCoverageStates(prev => ({
                ...prev,
                [topic.id]: { ...prev[topic.id], isActive: !prev[topic.id].isActive }
              }))}
              onChange={(text) => setCoverageStates(prev => ({
                ...prev,
                [topic.id]: { ...prev[topic.id], text }
              }))}
              onLoadTemplate={(text) => setCoverageStates(prev => ({
                ...prev,
                [topic.id]: { ...prev[topic.id], text, isActive: true }
              }))}
            />
          ))}
        </div>
      )}

      {/* 최종 스크립트 미리보기 */}
      <SectionHeader
        icon={<FileText size={16} />}
        title="최종 스크립트 미리보기"
        subtitle={composedScript ? `${composedScript.length}자` : '작성된 스크립트 없음'}
        expanded={expandedSections.preview}
        onToggle={() => toggleSection('preview')}
        color="blue"
      />
      {expandedSections.preview && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {composedScript ? (
            <>
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={handleCopyAll}
                  className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  {copied ? <Check size={12} /> : <Clipboard size={12} />}
                  {copied ? '복사됨' : '전체 복사'}
                </button>
              </div>
              <div className="p-5">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
                  {composedScript}
                </pre>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <FileText size={32} className="mx-auto text-slate-200 mb-3" />
              <p className="text-sm text-slate-400">위 토픽을 활성화하고 스크립트를 작성하면 여기에 합산됩니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  expanded,
  onToggle,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    indigo: 'text-indigo-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    violet: 'text-violet-600',
  };

  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between bg-white rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className={colorMap[color] || 'text-slate-600'}>{icon}</span>
        <span className="font-bold text-sm text-slate-800">{title}</span>
        <span className="text-xs text-slate-400 ml-1">{subtitle}</span>
      </div>
      {expanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
    </button>
  );
}
