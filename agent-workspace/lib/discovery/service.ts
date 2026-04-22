import { promises as fs } from 'fs'
import path from 'path'
import type { DiscoveryBucket, DiscoverySegment, DiscoverySummaryRow } from '@/lib/discovery/types'

const SUMMARY_PATH = path.join(process.cwd(), '..', 'state', 'apify-discovery', 'summary', 'candidates-summary.json')

export type DiscoveryFilters = {
  segment?: string
  bucket?: string
  q?: string
}

export async function readDiscoverySummary(): Promise<DiscoverySummaryRow[]> {
  const content = await fs.readFile(SUMMARY_PATH, 'utf8')
  const rows = JSON.parse(content) as DiscoverySummaryRow[]

  return [...rows].sort((left, right) => {
    const scoreDelta = right.scoring.score - left.scoring.score
    if (scoreDelta !== 0) return scoreDelta

    const reviewDelta = right.candidate.reviewsCount - left.candidate.reviewsCount
    if (reviewDelta !== 0) return reviewDelta

    return left.candidate.name.localeCompare(right.candidate.name, 'tr')
  })
}

export function normalizeDiscoveryFilters(filters: DiscoveryFilters) {
  const segment = filters.segment === 'berber' || filters.segment === 'guzellik salonu' ? (filters.segment as DiscoverySegment) : 'all'
  const bucket = filters.bucket === 'shortlist' || filters.bucket === 'review' || filters.bucket === 'skip' ? (filters.bucket as DiscoveryBucket) : 'all'
  const q = filters.q?.trim() || ''

  return { segment, bucket, q }
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
