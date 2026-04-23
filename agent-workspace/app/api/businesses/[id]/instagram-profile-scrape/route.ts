import { NextResponse } from 'next/server'

import { getBusinessDiscoverySnapshot } from '@/lib/businesses/discovery'
import { appendBusinessInstagramProfile, generateBusinessInstagramProfile } from '@/lib/businesses/instagram-profile'
import { getProjectOsDataset } from '@/lib/project-os/service'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    const dataset = await getProjectOsDataset()
    const business = dataset.businesses.find((item) => item.id === id)

    if (!business) {
      return NextResponse.json({ ok: false, message: 'İşletme kaydı bulunamadı.' }, { status: 404 })
    }

    const discoverySnapshot = await getBusinessDiscoverySnapshot({ id: business.id, name: business.name, district: business.district })
    const instagramUrl = discoverySnapshot?.candidate.instagramUrl?.trim() || ''

    if (!instagramUrl) {
      return NextResponse.json({ ok: false, message: 'Bilinen Instagram profili yok.' }, { status: 400 })
    }

    const entry = await generateBusinessInstagramProfile(instagramUrl)
    await appendBusinessInstagramProfile(business.id, entry)

    return NextResponse.json({ ok: true, profile: entry })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Instagram profil taramasi basarisiz oldu.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
