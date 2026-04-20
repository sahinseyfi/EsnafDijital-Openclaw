import { NextResponse } from 'next/server'
import { getAccountCenterPayload } from '@/lib/account-center/service'

export async function GET() {
  const payload = await getAccountCenterPayload()
  return NextResponse.json(payload)
}
