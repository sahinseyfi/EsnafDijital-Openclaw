import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { appendBusinessRefreshSnapshot, appendPlaceSnapshot, buildBusinessRefreshEntry, normalizeDiscoveryText, type DiscoverySourceRun } from '@/lib/businesses/discovery'

const MANUAL_RUN_DIR = path.resolve(process.cwd(), '..', 'state', 'apify-discovery', 'manual-runs')

export const runtime = 'nodejs'
export const maxDuration = 300

const LIGHT_SOURCES = ['maps-snapshot', 'website-check', 'google-search', 'serp-signals'] as const
const APIFY_SOURCES = ['google-maps', 'yandex', 'apple-maps', 'google-search'] as const

const GOOGLE_MAPS_ACTOR = 'compass/crawler-google-places'
const GOOGLE_SEARCH_ACTOR = 'apify/google-search-scraper'
const YANDEX_MAPS_ACTOR = 'm_mamaev/yandex-maps-places-scraper'
const APPLE_MAPS_ACTOR = 'alizarin_refrigerator-owner/apple-maps-business-listings-scraper'

type RefreshMode = 'light' | 'apify'
type ApifySource = typeof APIFY_SOURCES[number]
type DiscoveryRow = Record<string, unknown>

type RefreshRequestPayload = {
  mode?: RefreshMode
  sources?: string[]
  googleMaps?: {
    details?: boolean
    reviews?: boolean
  }
}

type SourceRunResult = DiscoverySourceRun & {
  rows: DiscoveryRow[]
}

type SourceRunSpec = {
  source: ApifySource
  actorId: string
  inputPath: string
  rawPath: string
  input: Record<string, unknown>
  errorLabel: string
  normalizeRows: (rows: DiscoveryRow[]) => DiscoveryRow[]
}

function summarizeSourceResult(result: SourceRunResult): DiscoverySourceRun {
  return {
    source: result.source,
    actorId: result.actorId,
    status: result.status,
    rawCount: result.rawCount,
    inputPath: result.inputPath,
    rawPath: result.rawPath,
    error: result.error,
  }
}

function buildSearchTerms(input: { name: string; district: string }) {
  const name = input.name.trim()
  const district = input.district.trim()
  const normalizedName = normalizeDiscoveryText(name)
  const normalizedDistrict = normalizeDiscoveryText(district)

  return Array.from(new Set([
    `${name} ${district}`.trim(),
    `${name} ${district} Istanbul`.trim(),
    name,
    `${normalizedName} ${normalizedDistrict}`.trim(),
    normalizedName,
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
  return Array.isArray(parsed) ? parsed as DiscoveryRow[] : []
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function toCleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function firstString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = toCleanString(record[key])
    if (value) return value
  }

  return ''
}

function firstNumber(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = Number(record[key])
    if (Number.isFinite(value)) return value
  }

  return null
}

function extractPhoneFromText(value: string) {
  const match = value.match(/(\+?\d[\d\s().-]{7,}\d)/)
  return match ? match[1].trim() : ''
}

function normalizeUrlCandidate(value: unknown) {
  const raw = toCleanString(value)
  if (!raw) return ''
  if (/^https?:\/\//i.test(raw)) return raw
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) return `https://${raw}`
  return ''
}

function resolveSearchString(row: Record<string, unknown>, fallback = '') {
  const direct = firstString(row, ['searchString', 'query', 'searchQuery', 'term'])
  if (direct) return direct

  if (isRecord(row.searchQuery)) {
    const nested = firstString(row.searchQuery, ['term', 'query'])
    if (nested) return nested
  }

  return fallback
}

function normalizeGoogleSearchRows(rows: DiscoveryRow[]) {
  const normalized: DiscoveryRow[] = []

  for (const row of rows) {
    if (!isRecord(row)) continue
    const searchString = resolveSearchString(row)
    const organicResults = Array.isArray(row.organicResults)
      ? row.organicResults
      : Array.isArray(row.organic)
        ? row.organic
        : []

    for (const item of organicResults) {
      if (!isRecord(item)) continue
      const title = firstString(item, ['title'])
      const url = normalizeUrlCandidate(firstString(item, ['url', 'link', 'displayedUrl']))
      const description = firstString(item, ['description', 'snippet'])
      const rating = firstNumber(item, ['rating', 'ratingValue', 'reviewRating'])
      const reviewsCount = firstNumber(item, ['reviewsCount', 'reviewCount'])
      if (!title && !url) continue

      normalized.push({
        title: title || url,
        address: description,
        website: url,
        websiteUrl: url,
        phone: extractPhoneFromText(description),
        totalScore: rating ?? undefined,
        reviewsCount: reviewsCount ?? undefined,
        searchString,
        url,
        webResults: [{ title, url, description }],
        scrapedAt: new Date().toISOString(),
      })
    }
  }

  return normalized
}

function normalizeAppleMapsRows(rows: DiscoveryRow[]) {
  const normalized: DiscoveryRow[] = []

  for (const row of rows) {
    if (!isRecord(row)) continue
    const location = isRecord(row.location)
      ? row.location
      : isRecord(row.coordinates)
        ? row.coordinates
        : {}
    const website = normalizeUrlCandidate(firstString(row, ['website', 'websiteUrl']))
    const address = firstString(row, ['address', 'fullAddress'])
    const categoryName = firstString(row, ['categoryName', 'category'])

    normalized.push({
      title: firstString(row, ['title', 'name', 'businessName']),
      categoryName,
      categories: Array.isArray(row.categories) ? row.categories : categoryName ? [categoryName] : [],
      address,
      city: firstString(row, ['city', 'locality']),
      state: firstString(row, ['state', 'region']),
      phone: firstString(row, ['phone', 'phoneNumber']) || extractPhoneFromText(firstString(row, ['description'])),
      website,
      websiteUrl: website,
      totalScore: firstNumber(row, ['rating', 'ratingValue', 'appleRating']) ?? undefined,
      reviewsCount: firstNumber(row, ['reviewsCount', 'reviewCount', 'ratingsCount']) ?? undefined,
      openingHours: row.openingHours || row.hours || row.hoursText || undefined,
      location: {
        lat: Number(location.lat ?? location.latitude ?? 0) || undefined,
        lng: Number(location.lng ?? location.longitude ?? 0) || undefined,
      },
      url: normalizeUrlCandidate(firstString(row, ['url', 'appleMapsUrl'])),
      searchString: resolveSearchString(row),
      scrapedAt: new Date().toISOString(),
    })
  }

  return normalized.filter((row) => toCleanString(row.title))
}

function normalizeYandexRows(rows: DiscoveryRow[]) {
  const normalized: DiscoveryRow[] = []

  for (const row of rows) {
    if (!isRecord(row)) continue
    const location = isRecord(row.location) ? row.location : {}
    const categoryName = firstString(row, ['categoryName'])
    const website = normalizeUrlCandidate(firstString(row, ['website']))

    normalized.push({
      title: firstString(row, ['title', 'shortTitle']),
      categoryName,
      categories: Array.isArray(row.categories) ? row.categories : categoryName ? [categoryName] : [],
      address: firstString(row, ['address', 'fullAddress']),
      city: firstString(row, ['state', 'city']),
      state: firstString(row, ['state']),
      phone: firstString(row, ['phone', 'phoneUnformatted']),
      website,
      websiteUrl: website,
      totalScore: firstNumber(row, ['totalScore']) ?? undefined,
      reviewsCount: firstNumber(row, ['reviewsCount', 'ratingCount']) ?? undefined,
      openingHours: row.workingHours || row.openingHoursText || row.statusText || undefined,
      location: {
        lat: Number(location.lat ?? 0) || undefined,
        lng: Number(location.lng ?? 0) || undefined,
      },
      url: normalizeUrlCandidate(firstString(row, ['url'])),
      searchString: resolveSearchString(row),
      scrapedAt: firstString(row, ['scrapedAt']) || new Date().toISOString(),
    })
  }

  return normalized.filter((row) => toCleanString(row.title))
}

function buildGoogleMapsInput(searchTerms: string[], locationQuery: string, refreshConfig: ReturnType<typeof normalizeRefreshRequest>) {
  return {
    searchStringsArray: searchTerms,
    locationQuery,
    maxCrawledPlacesPerSearch: refreshConfig.mode === 'apify' ? 8 : 3,
    scrapePlaceDetailPage: refreshConfig.mode === 'light' ? true : refreshConfig.googleMaps.details,
    maxReviews: refreshConfig.mode === 'apify' && refreshConfig.googleMaps.reviews ? 99999 : 0,
    reviewsOrigin: 'all',
    skipClosedPlaces: false,
  }
}

function buildGoogleSearchInput(searchTerms: string[]) {
  return {
    queries: searchTerms.join('\n'),
    maxPagesPerQuery: 1,
    countryCode: 'tr',
    languageCode: 'tr',
    mobileResults: false,
    includeUnfilteredResults: false,
    saveHtml: false,
    saveHtmlToKeyValueStore: false,
  }
}

function buildYandexInput(searchTerm: string, locationQuery: string, includeReviews: boolean) {
  return {
    query: searchTerm,
    locations: [locationQuery],
    language: 'turkish',
    maxItems: 8,
    maxReviews: includeReviews ? 50 : 0,
    maxPhotos: 0,
  }
}

function buildAppleMapsInput(searchTerms: string[]) {
  return {
    demoMode: false,
    searchQueries: searchTerms,
    maxResults: 8,
  }
}

function buildSourceSpecs({
  slug,
  searchTerms,
  locationQuery,
  refreshConfig,
}: {
  slug: string
  searchTerms: string[]
  locationQuery: string
  refreshConfig: ReturnType<typeof normalizeRefreshRequest>
}): SourceRunSpec[] {
  if (refreshConfig.mode !== 'apify') {
    return [
      {
        source: 'google-maps',
        actorId: GOOGLE_MAPS_ACTOR,
        inputPath: path.join(MANUAL_RUN_DIR, `${slug}.maps.input.json`),
        rawPath: path.join(MANUAL_RUN_DIR, `${slug}.maps.raw.json`),
        input: buildGoogleMapsInput(searchTerms, locationQuery, refreshConfig),
        errorLabel: 'Google Maps taramasi',
        normalizeRows: (rows) => rows,
      },
    ]
  }

  const specs: SourceRunSpec[] = []

  for (const source of refreshConfig.selectedSources as ApifySource[]) {
    if (source === 'google-maps') {
      specs.push({
        source,
        actorId: GOOGLE_MAPS_ACTOR,
        inputPath: path.join(MANUAL_RUN_DIR, `${slug}.maps.input.json`),
        rawPath: path.join(MANUAL_RUN_DIR, `${slug}.maps.raw.json`),
        input: buildGoogleMapsInput(searchTerms, locationQuery, refreshConfig),
        errorLabel: 'Google Maps taramasi',
        normalizeRows: (rows) => rows,
      })
      continue
    }

    if (source === 'google-search') {
      specs.push({
        source,
        actorId: GOOGLE_SEARCH_ACTOR,
        inputPath: path.join(MANUAL_RUN_DIR, `${slug}.google-search.input.json`),
        rawPath: path.join(MANUAL_RUN_DIR, `${slug}.google-search.raw.json`),
        input: buildGoogleSearchInput(searchTerms),
        errorLabel: 'Google Search taramasi',
        normalizeRows: normalizeGoogleSearchRows,
      })
      continue
    }

    if (source === 'yandex') {
      specs.push({
        source,
        actorId: YANDEX_MAPS_ACTOR,
        inputPath: path.join(MANUAL_RUN_DIR, `${slug}.yandex.input.json`),
        rawPath: path.join(MANUAL_RUN_DIR, `${slug}.yandex.raw.json`),
        input: buildYandexInput(searchTerms[0] || locationQuery, locationQuery, refreshConfig.googleMaps.reviews),
        errorLabel: 'Yandex taramasi',
        normalizeRows: normalizeYandexRows,
      })
      continue
    }

    if (source === 'apple-maps') {
      specs.push({
        source,
        actorId: APPLE_MAPS_ACTOR,
        inputPath: path.join(MANUAL_RUN_DIR, `${slug}.apple-maps.input.json`),
        rawPath: path.join(MANUAL_RUN_DIR, `${slug}.apple-maps.raw.json`),
        input: buildAppleMapsInput(searchTerms),
        errorLabel: 'Apple Maps taramasi',
        normalizeRows: normalizeAppleMapsRows,
      })
    }
  }

  return specs
}

async function runSourceActor(spec: SourceRunSpec): Promise<SourceRunResult> {
  await writeFile(spec.inputPath, JSON.stringify(spec.input, null, 2), 'utf8')

  try {
    await runApifyActor({
      actorId: spec.actorId,
      inputPath: spec.inputPath,
      rawPath: spec.rawPath,
      errorLabel: spec.errorLabel,
    })

    const raw = await readFile(spec.rawPath, 'utf8')
    const actorRows = parseApifyRows(raw)
    const rows = spec.normalizeRows(actorRows)

    return {
      source: spec.source,
      actorId: spec.actorId,
      status: 'success',
      rawCount: actorRows.length,
      inputPath: spec.inputPath,
      rawPath: spec.rawPath,
      rows,
    }
  } catch (error) {
    return {
      source: spec.source,
      actorId: spec.actorId,
      status: 'error',
      rawCount: 0,
      inputPath: spec.inputPath,
      rawPath: spec.rawPath,
      error: error instanceof Error ? error.message : `${spec.errorLabel} basarisiz oldu.`,
      rows: [],
    }
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
  const slug = `${business.id}-${Date.now()}`

  try {
    await mkdir(MANUAL_RUN_DIR, { recursive: true })
    const sourceSpecs = buildSourceSpecs({ slug, searchTerms, locationQuery, refreshConfig })
    const sourceResults = await Promise.all(sourceSpecs.map((spec) => runSourceActor(spec)))
    const successfulRows = sourceResults.flatMap((result) => result.rows)

    if (successfulRows.length === 0) {
      const failedSources = sourceResults.filter((item) => item.status === 'error')
      const message = failedSources.length > 0
        ? failedSources.map((item) => `${item.source}: ${item.error}`).join(' | ')
        : 'Hiçbir kaynaktan veri alınamadı.'
      return NextResponse.json({ ok: false, message }, { status: 500 })
    }

    const entry = buildBusinessRefreshEntry({
      business,
      rows: successfulRows,
      searchTerms,
      locationQuery,
      refreshMode: refreshConfig.mode,
      selectedSources: refreshConfig.selectedSources,
      googleMapsOptions: refreshConfig.googleMaps,
      sourceRuns: sourceResults.map(summarizeSourceResult),
    })

    if (!entry) {
      return NextResponse.json({
        ok: false,
        message: 'İşletme için güvenilir eşleşme bulunamadı.',
        run: {
          searchTerms,
          mode: refreshConfig.mode,
          selectedSources: refreshConfig.selectedSources,
          googleMaps: refreshConfig.googleMaps,
          sources: sourceResults.map(summarizeSourceResult),
        },
      }, { status: 404 })
    }

    await appendBusinessRefreshSnapshot(business.id, entry)
    await appendPlaceSnapshot(entry)

    return NextResponse.json({
      ok: true,
      snapshot: entry,
      run: {
        searchTerms,
        mode: refreshConfig.mode,
        selectedSources: refreshConfig.selectedSources,
        googleMaps: refreshConfig.googleMaps,
        sources: sourceResults.map(summarizeSourceResult),
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Apify yenilemesi başarısız oldu.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
