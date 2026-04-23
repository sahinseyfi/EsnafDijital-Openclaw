import { execFile } from 'child_process'
import { randomUUID } from 'crypto'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)
const AGENT_SCAN_DIR = path.resolve(process.cwd(), '..', 'state', 'agent-scans')
const AGENT_SCAN_SKILL_DIR = path.resolve(process.cwd(), '../skills/esnafdijital-agent-scan')
const AGENT_SCAN_SKILL_PATH = path.join(AGENT_SCAN_SKILL_DIR, 'SKILL.md')
const AGENT_SCAN_CONTRACT_PATH = path.join(AGENT_SCAN_SKILL_DIR, 'references/scan-contract.md')

export type BusinessAgentScanResult = {
  createdAt: string
  skillName: string
  status: 'net' | 'supheli eslesme' | 'sinirli veri'
  summary: string
  findings: string[]
  risks: string[]
  nextStep: string
}

type GenerateBusinessAgentScanInput = {
  business: {
    id: string
    name: string
    district: string
    ownerName: string
    status: string
  }
  discovery: {
    address: string
    phone: string
    websiteUrl: string
    instagramUrl: string
    mapsUrl: string
    categoryName: string
    rating: number | null
    reviewsCount: number
    isClosed: boolean
    searchCoverageNote: string
  }
  auditSummary: string
}

function scanFilePath(businessId: string) {
  return path.join(AGENT_SCAN_DIR, `${businessId}.json`)
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const content = await readFile(filePath, 'utf8')
    return JSON.parse(content) as T
  } catch {
    return fallback
  }
}

async function readRequiredReference(filePath: string, label: string) {
  try {
    const content = await readFile(filePath, 'utf8')
    const trimmed = content.trim()
    if (!trimmed) throw new Error('bos')
    return trimmed
  } catch (error: any) {
    throw new Error(`${label} okunamadi: ${filePath} (${error?.message || 'bilinmeyen hata'})`)
  }
}

function formatBusinessPayload(input: GenerateBusinessAgentScanInput) {
  return [
    `- businessId: ${input.business.id}`,
    `- name: ${input.business.name}`,
    `- district: ${input.business.district}`,
    `- ownerName: ${input.business.ownerName}`,
    `- businessStatus: ${input.business.status}`,
    `- categoryName: ${input.discovery.categoryName || '—'}`,
    `- address: ${input.discovery.address || '—'}`,
    `- phone: ${input.discovery.phone || '—'}`,
    `- websiteUrl: ${input.discovery.websiteUrl || '—'}`,
    `- instagramUrl: ${input.discovery.instagramUrl || '—'}`,
    `- mapsUrl: ${input.discovery.mapsUrl || '—'}`,
    `- rating: ${typeof input.discovery.rating === 'number' ? input.discovery.rating : '—'}`,
    `- reviewsCount: ${input.discovery.reviewsCount || 0}`,
    `- isClosed: ${input.discovery.isClosed ? 'true' : 'false'}`,
    `- searchCoverageNote: ${input.discovery.searchCoverageNote || '—'}`,
    `- latestAuditSummary: ${input.auditSummary || '—'}`,
  ].join('\n')
}

function buildPrompt(input: GenerateBusinessAgentScanInput, skillMd: string, scanContract: string) {
  return [
    'SKILL.md:',
    skillMd,
    '',
    'Scan contract:',
    scanContract,
    '',
    'Business payload:',
    formatBusinessPayload(input),
    '',
    'Gorev:',
    '- Bu isletme icin ajan tarama sonucu uret.',
    '- Gerekiyorsa web_fetch kullanarak website veya maps ipucunu kontrol et.',
    '- Belirsiz noktada tahmin uretme.',
    '- Cevabi sadece JSON obje olarak ver.',
    '- JSON semasi:',
    '{',
    '  "status": "net | supheli eslesme | sinirli veri",',
    '  "summary": "kisa ozet",',
    '  "findings": ["bulgu 1", "bulgu 2"],',
    '  "risks": ["risk 1"],',
    '  "nextStep": "tek sonraki adim"',
    '}',
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

function parseAgentScan(raw: string): Omit<BusinessAgentScanResult, 'createdAt' | 'skillName'> {
  const parsed = JSON.parse(stripCodeFence(raw)) as {
    status?: string
    summary?: string
    findings?: string[]
    risks?: string[]
    nextStep?: string
  }

  const status = parsed.status?.trim()
  if (status !== 'net' && status !== 'supheli eslesme' && status !== 'sinirli veri') {
    throw new Error('Ajan tarama durumu gecersiz dondu')
  }

  if (!parsed.summary?.trim() || !parsed.nextStep?.trim()) {
    throw new Error('Ajan tarama zorunlu alanlari doldurmadi')
  }

  return {
    status,
    summary: parsed.summary.trim(),
    findings: Array.isArray(parsed.findings) ? parsed.findings.map((item) => String(item).trim()).filter(Boolean).slice(0, 6) : [],
    risks: Array.isArray(parsed.risks) ? parsed.risks.map((item) => String(item).trim()).filter(Boolean).slice(0, 6) : [],
    nextStep: parsed.nextStep.trim(),
  }
}

export async function getBusinessAgentScanHistory(businessId: string) {
  return readJsonFile<BusinessAgentScanResult[]>(scanFilePath(businessId), [])
}

export async function getLatestBusinessAgentScan(businessId: string) {
  const history = await getBusinessAgentScanHistory(businessId)
  return history[history.length - 1] || null
}

export async function appendBusinessAgentScan(businessId: string, entry: BusinessAgentScanResult) {
  await mkdir(AGENT_SCAN_DIR, { recursive: true })
  const history = await getBusinessAgentScanHistory(businessId)
  const nextHistory = [...history, entry]
  await writeFile(scanFilePath(businessId), JSON.stringify(nextHistory, null, 2), 'utf8')
  return nextHistory
}

export async function generateBusinessAgentScan(input: GenerateBusinessAgentScanInput) {
  const skillMd = await readRequiredReference(AGENT_SCAN_SKILL_PATH, 'Agent scan skill dosyasi')
  const scanContract = await readRequiredReference(AGENT_SCAN_CONTRACT_PATH, 'Agent scan contract dosyasi')

  const { stdout } = await execFileAsync(
    'openclaw',
    [
      'agent',
      '--session-id', `business-agent-scan-${input.business.id}-${randomUUID()}`,
      '--message', buildPrompt(input, skillMd, scanContract),
      '--thinking', 'medium',
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
    throw new Error('Ajan tarama bos dondu')
  }

  const parsed = parseAgentScan(assistantText)
  return {
    createdAt: new Date().toISOString(),
    skillName: 'esnafdijital-agent-scan',
    ...parsed,
  } satisfies BusinessAgentScanResult
}
