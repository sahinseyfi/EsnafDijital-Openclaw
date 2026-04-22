import { execFile } from 'child_process'
import { randomUUID } from 'crypto'
import { readFileSync } from 'fs'
import path from 'path'
import { promisify } from 'util'
import type { ConsultationContextRef, ConsultationDetail } from '@/lib/consultation-center/types'

const execFileAsync = promisify(execFile)
const CONSULTATION_PROMPT_SKILL_DIR = path.resolve(process.cwd(), '../skills/consultation-prompt-builder')
const CONSULTATION_PROMPT_SKILL_PATH = path.join(CONSULTATION_PROMPT_SKILL_DIR, 'SKILL.md')
const CONSULTATION_PROMPTING_REFERENCE_PATH = path.join(CONSULTATION_PROMPT_SKILL_DIR, 'references/prompting-principles.md')
const CONSULTATION_GROUNDING_REFERENCE_PATH = path.join(CONSULTATION_PROMPT_SKILL_DIR, 'references/grounding-checklist.md')

function getConsultationPromptAgentId() {
  const agentId = process.env.CONSULTATION_PROMPT_AGENT_ID?.trim()

  if (!agentId) {
    throw new Error('CONSULTATION_PROMPT_AGENT_ID tanimli degil')
  }

  return agentId
}

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

function readRequiredReference(filePath: string, label: string) {
  try {
    const content = readFileSync(filePath, 'utf8').trim()

    if (!content) {
      throw new Error(`${label} bos`)
    }

    return content
  } catch (error: any) {
    throw new Error(`${label} okunamadi: ${filePath} (${error?.message || 'bilinmeyen hata'})`)
  }
}

function getPromptSkillContext() {
  return {
    skillMd: readRequiredReference(CONSULTATION_PROMPT_SKILL_PATH, 'Consultation prompt skill dosyasi'),
    promptingReference: readRequiredReference(CONSULTATION_PROMPTING_REFERENCE_PATH, 'Consultation prompting referansi'),
    groundingChecklist: readRequiredReference(CONSULTATION_GROUNDING_REFERENCE_PATH, 'Consultation grounding checklist'),
  }
}

function buildPrompt(consultation: ConsultationDetail) {
  const skillContext = getPromptSkillContext()

  return [
    'Bu gorev workspace skilli `consultation-prompt-builder` cizgisine net uyar.',
    'Asagidaki skill dosyalarini dogrudan calisma kurali kabul et ve skill mantigina gore promptu uret.',
    '',
    'Skill dosyalari:',
    `- SKILL.md | ${CONSULTATION_PROMPT_SKILL_PATH}`,
    `- Prompting principles | ${CONSULTATION_PROMPTING_REFERENCE_PATH}`,
    `- Grounding checklist | ${CONSULTATION_GROUNDING_REFERENCE_PATH}`,
    '',
    'Skill ana dosyasi:',
    skillContext.skillMd,
    '',
    'Prompting principles:',
    skillContext.promptingReference,
    '',
    'Grounding checklist:',
    skillContext.groundingChecklist,
    '',
    'Sen EsnafDigital icin consultation brief hazirlayan ajansin.',
    'Gorevin mevcut consultation kaydindan, hedef modele gerekli baglami dogrudan iceren hazir bir prompt cikarmak.',
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
    '- finalPromptText icinde repo referanslari acikca yer alsin. En az su iki linki uygun yerde ver: https://github.com/sahinseyfi/EsnafDijital-Openclaw ve https://github.com/openclaw/openclaw',
    '- Oturum hafizasi veya baglam eksigiyle ilgili meta aciklama yazma. Gerekli baglami dogrudan finalPromptText icine yerlestir.',
    '- finalPromptText uygun yerde teknik olmayan kisa ozet istegini de acikca eklesin.',
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
    'Zorunlu repo referanslari:',
    '- Uygulama reposu | https://github.com/sahinseyfi/EsnafDijital-Openclaw',
    '- OpenClaw upstream | https://github.com/openclaw/openclaw',
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
    '- finalPromptText icinde repo linklerini acik referans olarak gecir',
    '- Yerel prompting referansindaki cizgiyi uygula: kisa, yapilandirilmis, gorev odakli, repo-gercegine bagli kal',
    '- Oturum hafizasi veya baglam eksigiyle ilgili meta cumleleri final prompta tasima',
    '- finalPromptText icinde teknik olmayan kisa ozet istegi de bulunsun',
    '- finalPromptText, hedef modele gerekli baglami dogrudan vererek hazir olmali',
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
  const agentId = getConsultationPromptAgentId()

  const { stdout } = await execFileAsync(
    'openclaw',
    [
      'agent',
      '--agent', agentId,
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
