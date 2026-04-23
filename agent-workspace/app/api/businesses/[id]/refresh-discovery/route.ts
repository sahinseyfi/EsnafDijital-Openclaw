import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { appendBusinessRefreshSnapshot, appendPlaceSnapshot, buildBusinessRefreshEntry } from '@/lib/businesses/discovery'

const MANUAL_RUN_DIR = path.resolve(process.cwd(), '..', 'state', 'apify-discovery', 'manual-runs')

export const runtime = 'nodejs'
export const maxDuration = 300

const LIGHT_SOURCES = ['maps-snapshot', 'website-check', 'google-search', 'serp-signals'] as const
const APIFY_SOURCES = ['google-maps', 'yandex', 'apple-maps', 'google-search'] as const

type RefreshMode = 'light' | 'apify'

type RefreshRequestPayload = {
  mode?: RefreshMode
  sources?: string[]
  googleMaps?: {
    details?: boolean
    reviews?: boolean
  }
}

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

async function runApifyManualRefresh(inputPath: string, rawPath: string) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn('/bin/bash', ['-lc', 'apify call compass/crawler-google-places --input-file "$INPUT_PATH" --output-dataset --silent > "$RAW_PATH"'], {
      env: {
        ...process.env,
        INPUT_PATH: inputPath,
        RAW_PATH: rawPath,
      },
      stdio: 'ignore',
    })

    const timeout = setTimeout(() => {
      child.kill('SIGTERM')
      reject(new Error('Apify yenilemesi zaman asimina ugradi.'))
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
        ? `Apify yenilemesi ${signal} ile sonlandi.`
        : `Apify yenilemesi ${code ?? 'bilinmeyen'} koduyla sonlandi.`))
    })
  })
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
  const inputPath = path.join(MANUAL_RUN_DIR, `${slug}.input.json`)
  const rawPath = path.join(MANUAL_RUN_DIR, `${slug}.raw.json`)

  try {
    await mkdir(MANUAL_RUN_DIR, { recursive: true })
    await writeFile(inputPath, JSON.stringify(inputPayload, null, 2), 'utf8')

    await runApifyManualRefresh(inputPath, rawPath)

    const raw = await readFile(rawPath, 'utf8')
    const rows = JSON.parse(raw) as Array<Record<string, unknown>>
    const entry = buildBusinessRefreshEntry({
      business,
      rows,
      searchTerms,
      locationQuery,
      refreshMode: refreshConfig.mode,
      selectedSources: refreshConfig.selectedSources,
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
        searchTerms,
        mode: refreshConfig.mode,
        selectedSources: refreshConfig.selectedSources,
        googleMaps: refreshConfig.googleMaps,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Apify yenilemesi başarısız oldu.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
