import { NextResponse } from 'next/server'
import { getAccountCenterState } from '@/lib/account-center/service'

export async function GET() {
  const state = await getAccountCenterState()
  return NextResponse.json(state)
}
