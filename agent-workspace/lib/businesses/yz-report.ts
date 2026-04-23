import { execFile } from 'child_process'
import { randomUUID } from 'crypto'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { promisify } from 'util'

import type { BusinessAgentScanResult } from '@/lib/businesses/agent-scan'
import type { DiscoverySummaryEntry } from '@/lib/businesses/discovery'

const execFileAsync = promisify(execFile)
const YZ_REPORT_DIR = path.resolve(process.cwd(), '..', 'state', 'yz-reports')
const YZ_REPORT_SKILL_DIR = path.resolve(process.cwd(), '../skills/esnafdijital-yz-report')
const YZ_REPORT_SKILL_PATH = path.join(YZ_REPORT_SKILL_DIR, 'SKILL.md')
const YZ_REPORT_CONTRACT_PATH = path.join(YZ_REPORT_SKILL_DIR, 'references/report-contract.md')

export type BusinessYzReport = {
  createdAt: string
  skillName: string
  status: 'net gorunum' | 'gelisime acik' | 'supheli eslesme' | 'veri yetersiz'
  summary: string
  strengths: string[]
  weaknesses: string[]
  visibilitySummary: string
  nextAction: string
}

type GenerateBusinessYzReportInput = {
  business: {
    id: string
    name: string
    district: string
    ownerName: string
    status: string
    segment: string
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
  latestAgentScan: BusinessAgentScanResult | null
  latestApifyScan: DiscoverySummaryEntry | null
  auditSummary: string
}

function reportFilePath(businessId: string) {
  return path.join(YZ_REPORT_DIR, `${businessId}.json`)
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

function formatAgentScan(value: BusinessAgentScanResult | null) {
  if (!value) return '- yok'

  return [
    `- status: ${value.status}`,
    `- summary: ${value.summary}`,
    `- findings: ${value.findings.join(' | ') || '—'}`,
    `- risks: ${value.risks.join(' | ') || '—'}`,
    `- nextStep: ${value.nextStep}`,
  ].join('\n')
}

function formatApifyScan(value: DiscoverySummaryEntry | null) {
  if (!value) return '- yok'

  return [
    `- collectedAt: ${value.source.collectedAt}`,
    `- refreshMode: ${value.source.refreshMode || '—'}`,
    `- selectedSources: ${(value.source.selectedSources || []).join(', ') || '—'}`,
    `- googleMapsDetails: ${value.source.googleMapsOptions?.details ? 'true' : 'false'}`,
    `- googleMapsReviews: ${value.source.googleMapsOptions?.reviews ? 'true' : 'false'}`,
    `- rating: ${typeof value.candidate.rating === 'number' ? value.candidate.rating : '—'}`,
    `- reviewsCount: ${value.candidate.reviewsCount || 0}`,
    `- hasWebsite: ${value.candidate.hasWebsite ? 'true' : 'false'}`,
    `- searchCoverageNote: ${value.source.searchCoverageNote || '—'}`,
    `- scoringReasons: ${value.scoring.reasons.join(' | ') || '—'}`,
  ].join('\n')
}

function formatPayload(input: GenerateBusinessYzReportInput) {
  return [
    `- businessId: ${input.business.id}`,
    `- name: ${input.business.name}`,
    `- district: ${input.business.district}`,
    `- ownerName: ${input.business.ownerName}`,
    `- businessStatus: ${input.business.status}`,
    `- segment: ${input.business.segment}`,
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
    `- auditSummary: ${input.auditSummary || '—'}`,
  ].join('\n')
}

function buildPrompt(input: GenerateBusinessYzReportInput, skillMd: string, reportContract: string) {
  return [
    'SKILL.md:',
    skillMd,
    '',
    'Report contract:',
    reportContract,
    '',
    'Business payload:',
    formatPayload(input),
    '',
    'Latest agent scan:',
    formatAgentScan(input.latestAgentScan),
    '',
    'Latest Apify scan:',
    formatApifyScan(input.latestApifyScan),
    '',
    'Gorev:',
    '- Bu isletme icin kisa operator odakli Y.Z raporu uret.',
    '- Supheli eslesme varsa en basta bunu koru.',
    '- Ham tarama metnini kopyalama.',
    '- Cevabi sadece JSON obje olarak ver.',
    '- JSON semasi:',
    '{',
    '  "status": "net gorunum | gelisime acik | supheli eslesme | veri yetersiz",',
    '  "summary": "1-2 cumlelik genel durum",',
    '  "strengths": ["guclu sinyal 1"],',
    '  "weaknesses": ["zayif sinyal 1"],',
    '  "visibilitySummary": "kisa dijital gorunum ozeti",',
    '  "nextAction": "tek oncelikli aksiyon"',
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

function parseYzReport(raw: string): Omit<BusinessYzReport, 'createdAt' | 'skillName'> {
  const parsed = JSON.parse(stripCodeFence(raw)) as {
    status?: string
    summary?: string
    strengths?: string[]
    weaknesses?: string[]
    visibilitySummary?: string
    nextAction?: string
  }

  const status = parsed.status?.trim()
  if (status !== 'net gorunum' && status !== 'gelisime acik' && status !== 'supheli eslesme' && status !== 'veri yetersiz') {
    throw new Error('Y.Z raporu durumu gecersiz dondu')
  }

  if (!parsed.summary?.trim() || !parsed.visibilitySummary?.trim() || !parsed.nextAction?.trim()) {
    throw new Error('Y.Z raporu zorunlu alanlari doldurmadi')
  }

  return {
    status,
    summary: parsed.summary.trim(),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.map((item) => String(item).trim()).filter(Boolean).slice(0, 4) : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.map((item) => String(item).trim()).filter(Boolean).slice(0, 4) : [],
    visibilitySummary: parsed.visibilitySummary.trim(),
    nextAction: parsed.nextAction.trim(),
  }
}

export async function getBusinessYzReportHistory(businessId: string) {
  return readJsonFile<BusinessYzReport[]>(reportFilePath(businessId), [])
}

export async function getLatestBusinessYzReport(businessId: string) {
  const history = await getBusinessYzReportHistory(businessId)
  return history[history.length - 1] || null
}

export async function appendBusinessYzReport(businessId: string, entry: BusinessYzReport) {
  await mkdir(YZ_REPORT_DIR, { recursive: true })
  const history = await getBusinessYzReportHistory(businessId)
  const nextHistory = [...history, entry]
  await writeFile(reportFilePath(businessId), JSON.stringify(nextHistory, null, 2), 'utf8')
  return nextHistory
}

export async function generateBusinessYzReport(input: GenerateBusinessYzReportInput) {
  const skillMd = await readRequiredReference(YZ_REPORT_SKILL_PATH, 'Y.Z report skill dosyasi')
  const reportContract = await readRequiredReference(YZ_REPORT_CONTRACT_PATH, 'Y.Z report contract dosyasi')

  const { stdout } = await execFileAsync(
    'openclaw',
    [
      'agent',
      '--session-id', `business-yz-report-${input.business.id}-${randomUUID()}`,
      '--message', buildPrompt(input, skillMd, reportContract),
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
    throw new Error('Y.Z raporu bos dondu')
  }

  const parsed = parseYzReport(assistantText)
  return {
    createdAt: new Date().toISOString(),
    skillName: 'esnafdijital-yz-report',
    ...parsed,
  } satisfies BusinessYzReport
}
