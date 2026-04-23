import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { appendBusinessRefreshSnapshot, appendPlaceSnapshot, buildBusinessRefreshEntry, normalizeDiscoveryText, type DiscoverySummaryEntry } from '@/lib/businesses/discovery'

const MANUAL_RUN_DIR = path.resolve(process.cwd(), '..', 'state', 'apify-discovery', 'manual-runs')

export const runtime = 'nodejs'
export const maxDuration = 300

const LIGHT_SOURCES = ['maps-snapshot', 'website-check', 'google-search', 'serp-signals'] as const
const APIFY_SOURCES = ['google-maps', 'yandex', 'apple-maps', 'google-search', 'instagram'] as const

type RefreshMode = 'light' | 'apify'

type RefreshRequestPayload = {
  mode?: RefreshMode
  sources?: string[]
  googleMaps?: {
    details?: boolean
    reviews?: boolean
  }
}

type InstagramSignal = NonNullable<DiscoverySummaryEntry['source']['instagramSignal']>

function buildSearchTerms(input: { name: string; district: string }) {
  return Array.from(new Set([
    input.name.trim(),
    `${input.name.trim()} ${input.district.trim()}`.trim(),
  ].filter(Boolean)))
}

function normalizeRefreshRequest(payload: RefreshRequestPayload | null | undefined) {
  const mode: RefreshMode = payload?.mode === 'apify' ? 'apify' : 'light'
  const allowedSources = mode === 'apify' ? APIFY_SOURCES : LIGHT_SOURCES
  const requestedSources = Array.isArray(payload?.sources) ? payload.sources : []
  const filteredSources = requestedSources.filter((item): item is string => typeof item === 'string' && allowedSources.includes(item as never))
  const selectedSources = filteredSources.length > 0 ? filteredSources : [...allowedSources]
  const googleMapsSelected = selectedSources.includes('google-maps')
  const requestedGoogleMaps = payload?.googleMaps

  return {
    mode,
    selectedSources,
    googleMaps: {
      details: googleMapsSelected && (requestedGoogleMaps?.details === true || requestedGoogleMaps?.reviews === true),
      reviews: googleMapsSelected && requestedGoogleMaps?.reviews === true,
    },
  }
}

async function runApifyActor({ actorId, inputPath, rawPath, errorLabel }: { actorId: string; inputPath: string; rawPath: string; errorLabel: string }) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn('/bin/bash', ['-lc', 'apify call "$ACTOR_ID" --input-file "$INPUT_PATH" --output-dataset --silent > "$RAW_PATH"'], {
      env: {
        ...process.env,
        ACTOR_ID: actorId,
        INPUT_PATH: inputPath,
        RAW_PATH: rawPath,
      },
      stdio: 'ignore',
    })

    const timeout = setTimeout(() => {
      child.kill('SIGTERM')
      reject(new Error(`${errorLabel} zaman asimina ugradi.`))
    }, 300_000)

    child.on('error', (error) => {
      clearTimeout(timeout)
      reject(error)
    })

    child.on('close', (code, signal) => {
      clearTimeout(timeout)
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(signal
        ? `${errorLabel} ${signal} ile sonlandi.`
        : `${errorLabel} ${code ?? 'bilinmeyen'} koduyla sonlandi.`))
    })
  })
}

function parseApifyRows(raw: string) {
  const parsed = JSON.parse(raw) as unknown
  return Array.isArray(parsed) ? parsed as Array<Record<string, unknown>> : []
}

function buildInstagramSearchQuery(business: { name: string; district: string }) {
  return Array.from(new Set([
    `${business.name.trim()} ${business.district.trim()}`.trim(),
    `${business.name.trim()} Istanbul`.trim(),
    business.name.trim(),
  ].filter(Boolean))).join(', ')
}

function scoreInstagramCandidate(row: Record<string, unknown>, business: { name: string; district: string }) {
  const businessName = normalizeDiscoveryText(business.name)
  const businessDistrict = normalizeDiscoveryText(business.district)
  const businessTokens = businessName.split(' ').filter(Boolean)
  const haystack = normalizeDiscoveryText([
    row.username,
    row.fullName,
    row.bio,
    row.businessCategory,
    row.city,
    row.address,
  ].map((item) => String(item || '')).join(' '))

  let score = 0
  if (haystack.includes(businessName)) score += 4

  const sharedTokenCount = businessTokens.filter((token) => haystack.includes(token)).length
  score += sharedTokenCount * 2

  if (businessDistrict && haystack.includes(businessDistrict)) score += 2
  if (row.isBusinessAccount === true) score += 1
  if (row.isVerified === true) score += 1
  if (typeof row.businessCategory === 'string' && row.businessCategory.trim()) score += 1

  return score
}

function buildInstagramSignal(rows: Array<Record<string, unknown>>, business: { name: string; district: string }, query: string): InstagramSignal {
  const ranked = rows
    .map((row) => ({ row, score: scoreInstagramCandidate(row, business) }))
    .sort((left, right) => right.score - left.score)

  const best = ranked[0]
  const profileUrl = typeof best?.row.profileUrl === 'string' && best.row.profileUrl.trim()
    ? best.row.profileUrl.trim()
    : typeof best?.row.url === 'string' && best.row.url.trim()
      ? best.row.url.trim()
      : ''

  return {
    searched: true,
    query,
    candidateCount: rows.length,
    matchedUsername: typeof best?.row.username === 'string' ? best.row.username.trim() : '',
    matchedProfileUrl: best && best.score >= 4 ? profileUrl : '',
    matchReason: best && best.score >= 4 ? `search-user skoru ${best.score}` : 'guclu aday bulunamadi',
    followersCount: typeof best?.row.followersCount === 'number' ? best.row.followersCount : Number(best?.row.followersCount || 0) || null,
    isVerified: best?.row.isVerified === true,
    isBusinessAccount: best?.row.isBusinessAccount === true,
    businessCategory: typeof best?.row.businessCategory === 'string' ? best.row.businessCategory.trim() : '',
  }
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const requestPayload = await request.json().catch(() => null) as RefreshRequestPayload | null

  const business = await prisma.business.findUnique({
    where: { id },
    select: { id: true, name: true, district: true },
  })

  if (!business) {
    return NextResponse.json({ ok: false, message: 'İşletme kaydı bulunamadı.' }, { status: 404 })
  }

  const refreshConfig = normalizeRefreshRequest(requestPayload)
  const searchTerms = buildSearchTerms(business)
  const locationQuery = `${business.district}, Istanbul, Turkiye`
  const inputPayload = {
    searchStringsArray: searchTerms,
    locationQuery,
    maxCrawledPlacesPerSearch: refreshConfig.mode === 'apify' ? 8 : 3,
    scrapePlaceDetailPage: refreshConfig.mode === 'light' ? true : refreshConfig.googleMaps.details,
    maxReviews: refreshConfig.mode === 'apify' && refreshConfig.googleMaps.reviews ? 99999 : 0,
    reviewsOrigin: 'all',
    skipClosedPlaces: false,
  }

  const slug = `${business.id}-${Date.now()}`
  const inputPath = path.join(MANUAL_RUN_DIR, `${slug}.maps.input.json`)
  const rawPath = path.join(MANUAL_RUN_DIR, `${slug}.maps.raw.json`)
  const instagramInputPath = path.join(MANUAL_RUN_DIR, `${slug}.instagram.input.json`)
  const instagramRawPath = path.join(MANUAL_RUN_DIR, `${slug}.instagram.raw.json`)

  try {
    await mkdir(MANUAL_RUN_DIR, { recursive: true })
    await writeFile(inputPath, JSON.stringify(inputPayload, null, 2), 'utf8')

    await runApifyActor({
      actorId: 'compass/crawler-google-places',
      inputPath,
      rawPath,
      errorLabel: 'Apify yenilemesi',
    })

    const raw = await readFile(rawPath, 'utf8')
    const rows = parseApifyRows(raw)
    let instagramSignal: InstagramSignal | undefined

    if (refreshConfig.mode === 'apify' && refreshConfig.selectedSources.includes('instagram')) {
      const instagramQuery = buildInstagramSearchQuery(business)
      const instagramInputPayload = {
        search: instagramQuery,
        searchType: 'user',
        searchLimit: 10,
      }

      await writeFile(instagramInputPath, JSON.stringify(instagramInputPayload, null, 2), 'utf8')

      try {
        await runApifyActor({
          actorId: 'apify/instagram-search-scraper',
          inputPath: instagramInputPath,
          rawPath: instagramRawPath,
          errorLabel: 'Instagram taramasi',
        })

        const instagramRaw = await readFile(instagramRawPath, 'utf8')
        const instagramRows = parseApifyRows(instagramRaw)
        instagramSignal = buildInstagramSignal(instagramRows, business, instagramQuery)
      } catch (error) {
        instagramSignal = {
          searched: true,
          query: instagramQuery,
          candidateCount: 0,
          matchReason: error instanceof Error ? error.message : 'instagram taramasi basarisiz oldu',
        }
      }
    }

    const entry = buildBusinessRefreshEntry({
      business,
      rows,
      searchTerms,
      locationQuery,
      refreshMode: refreshConfig.mode,
      selectedSources: refreshConfig.selectedSources,
      googleMapsOptions: refreshConfig.googleMaps,
      instagramSignal,
    })

    if (!entry) {
      return NextResponse.json({ ok: false, message: 'İşletme için güvenilir eşleşme bulunamadı.' }, { status: 404 })
    }

    await appendBusinessRefreshSnapshot(business.id, entry)
    await appendPlaceSnapshot(entry)

    return NextResponse.json({
      ok: true,
      snapshot: entry,
      run: {
        inputPath,
        rawPath,
        instagramInputPath: refreshConfig.selectedSources.includes('instagram') ? instagramInputPath : null,
        instagramRawPath: refreshConfig.selectedSources.includes('instagram') ? instagramRawPath : null,
        searchTerms,
        mode: refreshConfig.mode,
        selectedSources: refreshConfig.selectedSources,
        googleMaps: refreshConfig.googleMaps,
        instagramSignal: entry.source.instagramSignal || null,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Apify yenilemesi başarısız oldu.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
