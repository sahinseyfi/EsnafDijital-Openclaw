import { NextResponse } from 'next/server'
import { getDashboardStatus } from '@/lib/codex-dashboard/store'

export async function GET() {
  const status = await getDashboardStatus()
  return NextResponse.json(status)
}
