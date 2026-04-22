import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { markDiscoveryImport, readDiscoveryRuntimeState } from '@/lib/discovery/runtime'

type ImportBody = {
  placeId?: string
  name?: string
  segment?: string
  district?: string
  address?: string
  categoryName?: string
  phone?: string
  websiteUrl?: string
  reviewsCount?: number
  score?: number
  matchedSearchTerms?: string[]
}

function mapSegment(value?: string) {
  if (value === 'berber') return 'berber' as const
  if (value === 'guzellik salonu') return 'guzellik' as const
  return 'diger' as const
}

function mapReadiness(input: { phone?: string; websiteUrl?: string; reviewsCount?: number }) {
  if (input.phone?.trim() && input.websiteUrl?.trim()) return 'iyi' as const
  if (input.phone?.trim() || Number(input.reviewsCount) > 0) return 'orta' as const
  return 'dusuk' as const
}

function buildSummary(body: Required<Pick<ImportBody, 'name'>> & ImportBody) {
  const parts = [
    'Apify discovery adayindan acildi.',
    body.categoryName?.trim() ? `Kategori: ${body.categoryName.trim()}.` : null,
    body.address?.trim() ? `Adres: ${body.address.trim()}.` : null,
    body.phone?.trim() ? `Telefon: ${body.phone.trim()}.` : 'Telefon bilgisi eksik.',
    body.websiteUrl?.trim() ? `Website: ${body.websiteUrl.trim()}.` : 'Website bilgisi eksik.',
    Number.isFinite(Number(body.reviewsCount)) ? `Yorum: ${Number(body.reviewsCount)}.` : null,
    Number.isFinite(Number(body.score)) ? `Skor: ${Number(body.score)}.` : null,
    Array.isArray(body.matchedSearchTerms) && body.matchedSearchTerms.length > 0 ? `Yakalayan aramalar: ${body.matchedSearchTerms.join(', ')}.` : null,
  ]

  return parts.filter(Boolean).join(' ')
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as ImportBody
  const placeId = body.placeId?.trim()
  const name = body.name?.trim()

  if (!placeId || !name) {
    return NextResponse.json({ ok: false, message: 'placeId ve isletme adi zorunlu.' }, { status: 400 })
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json({ ok: false, message: 'DATABASE_URL bulunamadi.' }, { status: 500 })
  }

  const state = await readDiscoveryRuntimeState()
  if (state.imports[placeId]) {
    return NextResponse.json({ ok: false, message: 'Bu aday zaten Project OSa aktarildi.', import: state.imports[placeId] }, { status: 409 })
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: {
          name,
          segment: mapSegment(body.segment),
          district: body.district?.trim() || 'Arnavutkoy',
          ownerName: 'Discovery adayi',
          status: 'lead',
        },
      })

      const audit = await tx.audit.create({
        data: {
          businessId: business.id,
          status: 'new',
          channelReadiness: mapReadiness(body),
          summary: buildSummary({ ...body, name }),
        },
      })

      return { business, audit }
    })

    const updated = await markDiscoveryImport(placeId, {
      businessId: result.business.id,
      auditId: result.audit.id,
      importedAt: new Date().toISOString(),
      businessName: result.business.name,
    })

    return NextResponse.json({
      ok: true,
      import: updated.imports[placeId],
      shortlistedPlaceIds: updated.shortlistedPlaceIds,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Discovery import basarisiz oldu.'
    return NextResponse.json({ ok: false, message }, { status: 400 })
  }
}
