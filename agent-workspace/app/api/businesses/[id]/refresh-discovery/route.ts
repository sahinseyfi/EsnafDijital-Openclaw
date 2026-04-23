import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { appendBusinessRefreshSnapshot, appendPlaceSnapshot, buildBusinessRefreshEntry } from '@/lib/businesses/discovery'

const execFileAsync = promisify(execFile)
const MANUAL_RUN_DIR = path.resolve(process.cwd(), '..', 'state', 'apify-discovery', 'manual-runs')

export const runtime = 'nodejs'
export const maxDuration = 120

function buildSearchTerms(input: { name: string; district: string }) {
  return Array.from(new Set([
    input.name.trim(),
    `${input.name.trim()} ${input.district.trim()}`.trim(),
  ].filter(Boolean)))
}

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  const business = await prisma.business.findUnique({
    where: { id },
    select: { id: true, name: true, district: true },
  })

  if (!business) {
    return NextResponse.json({ ok: false, message: 'İşletme kaydı bulunamadı.' }, { status: 404 })
  }

  const searchTerms = buildSearchTerms(business)
  const locationQuery = `${business.district}, Istanbul, Turkiye`
  const inputPayload = {
    searchStringsArray: searchTerms,
    locationQuery,
    maxCrawledPlacesPerSearch: 5,
    scrapePlaceDetailPage: true,
    skipClosedPlaces: false,
  }

  const slug = `${business.id}-${Date.now()}`
  const inputPath = path.join(MANUAL_RUN_DIR, `${slug}.input.json`)
  const rawPath = path.join(MANUAL_RUN_DIR, `${slug}.raw.json`)

  try {
    await mkdir(MANUAL_RUN_DIR, { recursive: true })
    await writeFile(inputPath, JSON.stringify(inputPayload, null, 2), 'utf8')

    await execFileAsync('/bin/bash', ['-lc', 'apify call compass/crawler-google-places --input-file "$INPUT_PATH" --output-dataset --silent > "$RAW_PATH"'], {
      env: {
        ...process.env,
        INPUT_PATH: inputPath,
        RAW_PATH: rawPath,
      },
      timeout: 120_000,
      maxBuffer: 10 * 1024 * 1024,
    })

    const raw = await readFile(rawPath, 'utf8')
    const rows = JSON.parse(raw) as Array<Record<string, unknown>>
    const entry = buildBusinessRefreshEntry({
      business,
      rows,
      searchTerms,
      locationQuery,
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
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Apify yenilemesi başarısız oldu.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
