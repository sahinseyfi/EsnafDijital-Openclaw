import { promises as fs } from 'fs'
import path from 'path'
import type { DiscoveryBucket, DiscoveryOwnershipStatus, DiscoverySegment, DiscoverySummaryRow } from '@/lib/discovery/types'

export type DiscoverySortKey = 'segment' | 'score' | 'reviews' | 'contact' | 'ownership' | 'coverage' | 'decision' | 'actions'
export type DiscoverySortDirection = 'asc' | 'desc'

const SUMMARY_PATH = path.join(process.cwd(), '..', 'state', 'apify-discovery', 'summary', 'candidates-summary.json')
const SNAPSHOT_DIR = path.join(process.cwd(), '..', 'state', 'apify-discovery', 'snapshots')

export type DiscoveryFilters = {
  segment?: string
  bucket?: string
  q?: string
  sort?: string
  dir?: string
}

export async function readDiscoverySummary(): Promise<DiscoverySummaryRow[]> {
  const content = await fs.readFile(SUMMARY_PATH, 'utf8')
  return JSON.parse(content) as DiscoverySummaryRow[]
}

export async function readDiscoveryRow(placeId: string): Promise<DiscoverySummaryRow | null> {
  const rows = await readDiscoverySummary()
  return rows.find((row) => row.candidate.placeId === placeId) || null
}

export type DiscoverySnapshot = {
  capturedAt: string
  placeId: string
  name: string
  address: string
  phone: string
  websiteUrl: string
  hasWebsite: boolean
  rating: number | null
  reviewsCount: number
  hasOpeningHours: boolean
  isClosed: boolean
  ownershipStatus: DiscoveryOwnershipStatus
  matchedSearchTerms: string[]
  missingSearchTerms: string[]
  matchedSearchTermCount: number
  searchCoverageNote: string
  rawRecordCount: number
  score: number
  bucket: string
}

export async function readDiscoverySnapshots(placeId: string): Promise<DiscoverySnapshot[]> {
  const snapshotPath = path.join(SNAPSHOT_DIR, `${placeId}.json`)
  try {
    const content = await fs.readFile(snapshotPath, 'utf8')
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed as DiscoverySnapshot[] : []
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

export function normalizeDiscoveryFilters(filters: DiscoveryFilters) {
  const segment = filters.segment === 'berber' || filters.segment === 'guzellik salonu' ? (filters.segment as DiscoverySegment) : 'all'
  const bucket = filters.bucket === 'shortlist' || filters.bucket === 'review' || filters.bucket === 'skip' ? (filters.bucket as DiscoveryBucket) : 'all'
  const q = filters.q?.trim() || ''
  const sort = filters.sort === 'segment' || filters.sort === 'score' || filters.sort === 'reviews' || filters.sort === 'contact' || filters.sort === 'ownership' || filters.sort === 'coverage' || filters.sort === 'decision' || filters.sort === 'actions'
    ? (filters.sort as DiscoverySortKey)
    : 'score'
  const dir = filters.dir === 'asc' || filters.dir === 'desc' ? (filters.dir as DiscoverySortDirection) : 'desc'

  return { segment, bucket, q, sort, dir }
}

export function filterDiscoveryRows(rows: DiscoverySummaryRow[], filters: DiscoveryFilters) {
  const normalized = normalizeDiscoveryFilters(filters)
  const query = normalized.q.toLocaleLowerCase('tr')

  return rows.filter((row) => {
    if (normalized.segment !== 'all' && row.source.segment !== normalized.segment) return false
    if (normalized.bucket !== 'all' && row.scoring.bucket !== normalized.bucket) return false
    if (!query) return true

    const haystack = [
      row.candidate.name,
      row.candidate.categoryName,
      row.candidate.address,
      row.candidate.phone,
      row.candidate.websiteUrl,
      row.source.matchedSearchTerms.join(' '),
      row.scoring.reasons.join(' '),
    ].join(' ').toLocaleLowerCase('tr')

    return haystack.includes(query)
  })
}

function compareText(left: string, right: string) {
  return left.localeCompare(right, 'tr')
}

function compareNumber(left: number, right: number) {
  return left - right
}

function getBucketRank(bucket: DiscoveryBucket) {
  if (bucket === 'shortlist') return 0
  if (bucket === 'review') return 1
  return 2
}

function getOwnershipRank(status: DiscoveryOwnershipStatus) {
  if (status === 'unclaimed') return 0
  if (status === 'unknown') return 1
  return 2
}

export function sortDiscoveryRows(
  rows: DiscoverySummaryRow[],
  filters: DiscoveryFilters,
  runtime?: {
    shortlistedPlaceIds?: string[]
    imports?: Record<string, unknown>
  },
) {
  const normalized = normalizeDiscoveryFilters(filters)
  const shortlisted = new Set(runtime?.shortlistedPlaceIds || [])
  const imports = runtime?.imports || {}

  const sorted = [...rows].sort((left, right) => {
    const leftImported = Boolean(imports[left.candidate.placeId])
    const rightImported = Boolean(imports[right.candidate.placeId])
    const leftShortlisted = shortlisted.has(left.candidate.placeId)
    const rightShortlisted = shortlisted.has(right.candidate.placeId)

    let result = 0

    switch (normalized.sort) {
      case 'segment':
        result = compareText(left.source.segment, right.source.segment)
        if (result === 0) result = compareText(left.candidate.district || '', right.candidate.district || '')
        break
      case 'score':
        result = compareNumber(left.scoring.score, right.scoring.score)
        if (result === 0) result = compareNumber(left.candidate.reviewsCount, right.candidate.reviewsCount)
        break
      case 'reviews':
        result = compareNumber(left.candidate.reviewsCount, right.candidate.reviewsCount)
        if (result === 0) result = compareNumber(left.candidate.rating || 0, right.candidate.rating || 0)
        break
      case 'contact':
        result = compareNumber(Number(left.candidate.hasWebsite) + Number(Boolean(left.candidate.phone.trim())), Number(right.candidate.hasWebsite) + Number(Boolean(right.candidate.phone.trim())))
        if (result === 0) result = compareText(left.candidate.phone || '', right.candidate.phone || '')
        break
      case 'ownership':
        result = compareNumber(getOwnershipRank(left.candidate.ownershipStatus), getOwnershipRank(right.candidate.ownershipStatus))
        break
      case 'coverage':
        result = compareNumber(left.source.matchedSearchTermCount, right.source.matchedSearchTermCount)
        if (result === 0) result = compareText(left.scoring.searchCoverageSignal, right.scoring.searchCoverageSignal)
        break
      case 'decision':
        result = compareNumber(getBucketRank(left.scoring.bucket), getBucketRank(right.scoring.bucket))
        if (result === 0) result = compareNumber(Number(leftShortlisted), Number(rightShortlisted))
        break
      case 'actions':
        result = compareNumber(Number(leftImported), Number(rightImported))
        if (result === 0) result = compareNumber(Number(leftShortlisted), Number(rightShortlisted))
        break
      default:
        result = compareNumber(left.scoring.score, right.scoring.score)
        if (result === 0) result = compareNumber(left.candidate.reviewsCount, right.candidate.reviewsCount)
        break
    }

    if (result === 0) {
      result = compareText(left.candidate.name, right.candidate.name)
    }

    return normalized.dir === 'asc' ? result : result * -1
  })

  return sorted
}
