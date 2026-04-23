import { execFile } from 'child_process'
import { randomUUID } from 'crypto'
import { readFileSync } from 'fs'
import path from 'path'
import { promisify } from 'util'
import type { ConsultationContextRef, ConsultationDetail } from '@/lib/prompt-uretimi/types'

const execFileAsync = promisify(execFile)
const CONSULTATION_PROMPT_SKILL_DIR = path.resolve(process.cwd(), '../skills/consultation-prompt-builder')
const CONSULTATION_PROMPT_SKILL_PATH = path.join(CONSULTATION_PROMPT_SKILL_DIR, 'SKILL.md')
const CONSULTATION_CONTEXT_POLICY_PATH = path.join(CONSULTATION_PROMPT_SKILL_DIR, 'references/context-injection-policy.md')
const CONSULTATION_PROMPTING_REFERENCE_PATH = path.join(CONSULTATION_PROMPT_SKILL_DIR, 'references/prompting-principles.md')

function getConsultationPromptAgentId() {
  const agentId = process.env.CONSULTATION_PROMPT_AGENT_ID?.trim()

  if (!agentId) {
    throw new Error('CONSULTATION_PROMPT_AGENT_ID tanimli degil')
  }

  return agentId
}

type PromptStrategy = 'single_prompt' | 'split_recommended'

type AgentSuggestion = {
  title?: string
  summary?: string
  primaryTask?: string
  secondaryTasks?: string[]
  parkedQuestions?: string[]
  whyPrimaryNow?: string
  promptStrategy?: PromptStrategy
  decisionQuestion: string
  whyNow: string
  desiredOutput: string
  finalPromptText: string
  contextRefs: ConsultationContextRef[]
  businessBrief?: Record<string, string | string[] | null>
  technicalBrief?: Record<string, string | string[] | null>
  sharedBrief?: Record<string, string | string[] | null>
}

type GeneratePromptOptions = {
  changeRequest?: string
}

function getAgentRuntimeConfig(consultation: ConsultationDetail) {
  const targetModel = consultation.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'

  if (targetModel === 'gpt-5') {
    return {
      thinking: 'medium' as const,
      timeoutSeconds: 600,
    }
  }

  return {
    thinking: 'high' as const,
    timeoutSeconds: 1800,
  }
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
  if (!refs.length) return ''
  return refs.map((ref) => `- ${ref.kind} | ${ref.title} | ${ref.ref}`).join('\n')
}

function formatConsultationPayload(consultation: ConsultationDetail) {
  const lines = [
    `- targetModel: ${consultation.promptRun.modelName || 'gpt-5-pro'}`,
    `- title: ${consultation.title || '—'}`,
    `- summary: ${consultation.summary || '—'}`,
    `- decisionQuestion: ${consultation.decisionQuestion || '—'}`,
    `- whyNow: ${consultation.whyNow || '—'}`,
    `- desiredOutput: ${consultation.desiredOutput || '—'}`,
  ]

  const contextRefs = formatContextRefs(consultation.contextRefs)
  if (contextRefs) {
    lines.push('', 'Context refs:', contextRefs)
  }

  const businessBrief = formatBriefRecord(consultation.businessBrief)
  if (businessBrief !== '- yok') {
    lines.push('', 'Business brief:', businessBrief)
  }

  const technicalBrief = formatBriefRecord(consultation.technicalBrief)
  if (technicalBrief !== '- yok') {
    lines.push('', 'Technical brief:', technicalBrief)
  }

  const sharedBrief = formatBriefRecord(consultation.sharedBrief)
  if (sharedBrief !== '- yok') {
    lines.push('', 'Shared brief:', sharedBrief)
  }

  return lines.join('\n')
}

function readRequiredReference(filePath: string, label: string) {
  try {
    const content = readFileSync(filePath, 'utf8').trim()

    if (!content) {
      throw new Error(`${label} bos`)
    }

    return content
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'bilinmeyen hata'
    throw new Error(`${label} okunamadi: ${filePath} (${message})`)
  }
}

function getPromptSkillContext() {
  return {
    skillMd: readRequiredReference(CONSULTATION_PROMPT_SKILL_PATH, 'Consultation prompt skill dosyasi'),
    contextInjectionPolicy: readRequiredReference(CONSULTATION_CONTEXT_POLICY_PATH, 'Consultation context injection policy'),
    promptingReference: readRequiredReference(CONSULTATION_PROMPTING_REFERENCE_PATH, 'Consultation prompting referansi'),
  }
}

function buildPrompt(consultation: ConsultationDetail, options?: GeneratePromptOptions) {
  const skillContext = getPromptSkillContext()
  const changeRequest = options?.changeRequest?.trim()
  const currentPromptText = consultation.promptRun.promptText?.trim()

  return [
    'SKILL.md:',
    skillContext.skillMd,
    '',
    'Context injection policy:',
    skillContext.contextInjectionPolicy,
    '',
    'Prompting principles:',
    skillContext.promptingReference,
    '',
    'Consultation payload:',
    formatConsultationPayload(consultation),
    ...(changeRequest ? [
      '',
      'Prompt degisiklik istegi:',
      `- ${changeRequest}`,
      '- Mevcut promptu bu istege gore yeniden duzenle.',
      '- Istenen degisiklik disinda ise yarayan grounding ve cikti cizgisini koru.',
    ] : []),
    ...(changeRequest && currentPromptText ? [
      '',
      'Mevcut prompt:',
      currentPromptText,
    ] : []),
  ].join('\n')
}

type OpenClawAgentPayload = {
  result?: {
    payloads?: Array<{ text?: string }>
    finalAssistantVisibleText?: string
    finalAssistantRawText?: string
  }
  finalAssistantVisibleText?: string
  finalAssistantRawText?: string
}

function extractAssistantText(payload: unknown) {
  const data = (payload || {}) as OpenClawAgentPayload
  const fromPayloads = Array.isArray(data.result?.payloads)
    ? data.result.payloads
        .map((item) => (typeof item?.text === 'string' ? item.text : ''))
        .join('\n')
        .trim()
    : ''

  return fromPayloads
    || data.result?.finalAssistantVisibleText
    || data.result?.finalAssistantRawText
    || data.finalAssistantVisibleText
    || data.finalAssistantRawText
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

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
}

function normalizePromptStrategy(value: unknown): PromptStrategy {
  return value === 'split_recommended' ? 'split_recommended' : 'single_prompt'
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

  const primaryTask = parsed.primaryTask?.trim() || parsed.decisionQuestion.trim()
  const secondaryTasks = normalizeStringArray(parsed.secondaryTasks)
  const parkedQuestions = normalizeStringArray(parsed.parkedQuestions)
  const whyPrimaryNow = parsed.whyPrimaryNow?.trim() || parsed.whyNow.trim()
  const promptStrategy = normalizePromptStrategy(parsed.promptStrategy)

  return {
    title: parsed.title?.trim(),
    summary: parsed.summary?.trim(),
    primaryTask,
    secondaryTasks,
    parkedQuestions,
    whyPrimaryNow,
    promptStrategy,
    decisionQuestion: parsed.decisionQuestion.trim(),
    whyNow: parsed.whyNow.trim(),
    desiredOutput: parsed.desiredOutput.trim(),
    finalPromptText: parsed.finalPromptText.trim(),
    contextRefs: Array.isArray(parsed.contextRefs) ? parsed.contextRefs.slice(0, 4) : [],
    businessBrief: parsed.businessBrief || undefined,
    technicalBrief: parsed.technicalBrief || undefined,
    sharedBrief: {
      ...(parsed.sharedBrief || {}),
      primaryTask,
      secondaryTasks,
      parkedQuestions,
      whyPrimaryNow,
      promptStrategy,
    },
  }
}

export async function generateConsultationBriefWithAgent(consultation: ConsultationDetail, options?: GeneratePromptOptions) {
  const agentId = getConsultationPromptAgentId()
  const runtimeConfig = getAgentRuntimeConfig(consultation)

  const { stdout } = await execFileAsync(
    'openclaw',
    [
      'agent',
      '--agent', agentId,
      '--session-id', randomUUID(),
      '--message', buildPrompt(consultation, options),
      '--thinking', runtimeConfig.thinking,
      '--timeout', String(runtimeConfig.timeoutSeconds),
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
