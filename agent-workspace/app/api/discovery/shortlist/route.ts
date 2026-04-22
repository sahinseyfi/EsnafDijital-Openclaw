import { NextRequest, NextResponse } from 'next/server'
import { readDiscoveryRuntimeState, setDiscoveryShortlist } from '@/lib/discovery/runtime'

export async function GET() {
  const state = await readDiscoveryRuntimeState()
  return NextResponse.json({ ok: true, shortlistedPlaceIds: state.shortlistedPlaceIds, imports: state.imports })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    placeId?: string
    shortlisted?: boolean
  }

  const placeId = body.placeId?.trim()
  if (!placeId) {
    return NextResponse.json({ ok: false, message: 'placeId zorunlu.' }, { status: 400 })
  }

  const state = await setDiscoveryShortlist(placeId, Boolean(body.shortlisted))
  return NextResponse.json({ ok: true, shortlistedPlaceIds: state.shortlistedPlaceIds })
}
