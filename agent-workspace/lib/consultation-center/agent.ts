import { execFile } from 'child_process'
import { randomUUID } from 'crypto'
import { promisify } from 'util'
import type { ConsultationContextRef, ConsultationDetail } from '@/lib/consultation-center/types'

const execFileAsync = promisify(execFile)
const CONSULTATION_PROMPT_AGENT_ID = process.env.CONSULTATION_PROMPT_AGENT_ID?.trim() || 'esnafdijital'

type AgentSuggestion = {
  title?: string
  summary?: string
  decisionQuestion: string
  whyNow: string
  desiredOutput: string
  finalPromptText: string
  contextRefs: ConsultationContextRef[]
  businessBrief?: Record<string, string | string[] | null>
  technicalBrief?: Record<string, string | string[] | null>
  sharedBrief?: Record<string, string | string[] | null>
}

function formatBriefRecord(value?: Record<string, string | string[] | null>) {
  if (!value || Object.keys(value).length === 0) return '- yok'

  return Object.entries(value)
    .map(([key, entry]) => {
      if (Array.isArray(entry)) return `- ${key}: ${entry.join(', ')}`
      return `- ${key}: ${entry || '—'}`
    })
    .join('\n')
}

function formatContextRefs(refs: ConsultationContextRef[]) {
  if (!refs.length) return '- yok'
  return refs.map((ref) => `- ${ref.kind} | ${ref.title} | ${ref.ref}`).join('\n')
}

function buildPrompt(consultation: ConsultationDetail) {
  return [
    'Sen EsnafDigital icin consultation brief hazirlayan ajansin.',
    'Gorevin mevcut consultation kaydini sifir hafizali GPT oturumuna gidecek kadar netlestirmek.',
    'Ayrica gereksiz teori verme, kisa ve uygulanabilir kal.',
    'Mevcut baglami oku, eksikleri mantikli sekilde tamamla, ama gereksiz yeni alan uretme.',
    '',
    'Kesin kurallar:',
    '- Sadece gecerli JSON don.',
    '- Markdown, aciklama, kod fence, onsoz, sonsoz donme.',
    '- Context refleri en fazla 4 adet tut.',
    '- Output Turkce olsun.',
    '- Kucuk isletme, sade MVP ve dusuk operasyon yuku cizgisini koru.',
    '- Promptun sonucunun VPS uzerinde calisan OpenClaw ajanina yon verecegini unutma.',
    '- finalPromptText alanini sen dogrudan uret. Son promptu ayri bir kod/template katmani kurmayacak.',
    '- finalPromptText icinde abartili veya dar domain role uydurma. Sabit ve sade bir rol kullan: "Sen, EsnafDigital icin VPS uzerinde calisan OpenClaw uygulama ajaniyla calisacak kidemli urun ve teknik dusunme partnerisin."',
    '',
    'Beklenen JSON sekli:',
    '{',
    '  "title": "string",',
    '  "summary": "string",',
    '  "decisionQuestion": "string",',
    '  "whyNow": "string",',
    '  "desiredOutput": "string",',
    '  "finalPromptText": "string",',
    '  "contextRefs": [{ "kind": "project|heartbeat|decision|roadmap", "title": "string", "ref": "string" }],',
    '  "businessBrief": { ... } | null,',
    '  "technicalBrief": { ... } | null,',
    '  "sharedBrief": { ... } | null',
    '}',
    '',
    'Consultation kaydi:',
    `- targetModel: ${consultation.promptRun.modelName || 'gpt-5-pro'}`,
    `- title: ${consultation.title}`,
    `- type: ${consultation.type}`,
    `- summary: ${consultation.summary}`,
    `- decisionQuestion: ${consultation.decisionQuestion}`,
    `- whyNow: ${consultation.whyNow}`,
    `- desiredOutput: ${consultation.desiredOutput}`,
    '',
    'Mevcut context refs:',
    formatContextRefs(consultation.contextRefs),
    '',
    'Mevcut businessBrief:',
    formatBriefRecord(consultation.businessBrief),
    '',
    'Mevcut technicalBrief:',
    formatBriefRecord(consultation.technicalBrief),
    '',
    'Mevcut sharedBrief:',
    formatBriefRecord(consultation.sharedBrief),
    '',
    'Odak:',
    '- karar sorusunu tek cumlede keskinlestir',
    '- neden simdiyi is degeri uzerinden netlestir',
    '- beklenen ciktiyi kullanilabilir deliverable listesine cevir',
    '- gerekirse context refleri iyilestir',
    '- brief alanlarini bu consultation turune gore doldur',
    '- finalPromptText alaninda kullaniciya verilecek son promptu sen yaz',
    '- finalPromptText, sifir hafizali baska bir GPT oturumuna gonderilmeye hazir olmali',
  ].join('\n')
}

function extractAssistantText(payload: any) {
  const fromPayloads = Array.isArray(payload?.result?.payloads)
    ? payload.result.payloads
        .map((item: any) => (typeof item?.text === 'string' ? item.text : ''))
        .join('\n')
        .trim()
    : ''

  return fromPayloads
    || payload?.result?.finalAssistantVisibleText
    || payload?.result?.finalAssistantRawText
    || payload?.finalAssistantVisibleText
    || payload?.finalAssistantRawText
    || ''
}

function stripCodeFence(value: string) {
  const trimmed = value.trim()
  if (!trimmed.startsWith('```')) return trimmed
  return trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()
}

function parseAgentJson(raw: string): AgentSuggestion {
  const cleaned = stripCodeFence(raw)
  const parsed = JSON.parse(cleaned) as AgentSuggestion

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('AI cevabi gecerli obje degil')
  }

  if (!parsed.decisionQuestion?.trim() || !parsed.whyNow?.trim() || !parsed.desiredOutput?.trim() || !parsed.finalPromptText?.trim()) {
    throw new Error('AI cevabi zorunlu alanlari doldurmadi')
  }

  return {
    title: parsed.title?.trim(),
    summary: parsed.summary?.trim(),
    decisionQuestion: parsed.decisionQuestion.trim(),
    whyNow: parsed.whyNow.trim(),
    desiredOutput: parsed.desiredOutput.trim(),
    finalPromptText: parsed.finalPromptText.trim(),
    contextRefs: Array.isArray(parsed.contextRefs) ? parsed.contextRefs.slice(0, 4) : [],
    businessBrief: parsed.businessBrief || undefined,
    technicalBrief: parsed.technicalBrief || undefined,
    sharedBrief: parsed.sharedBrief || undefined,
  }
}

export async function generateConsultationBriefWithAgent(consultation: ConsultationDetail) {
  const { stdout } = await execFileAsync(
    'openclaw',
    [
      'agent',
      '--agent', CONSULTATION_PROMPT_AGENT_ID,
      '--session-id', randomUUID(),
      '--message', buildPrompt(consultation),
      '--thinking', 'high',
      '--timeout', '180',
      '--json',
    ],
    {
      cwd: '/root/.openclaw/workspace',
      maxBuffer: 1024 * 1024 * 2,
    },
  )

  const payload = JSON.parse(stdout)
  const assistantText = extractAssistantText(payload)

  if (!assistantText.trim()) {
    throw new Error('AI cevabi bos dondu')
  }

  return parseAgentJson(assistantText)
}
