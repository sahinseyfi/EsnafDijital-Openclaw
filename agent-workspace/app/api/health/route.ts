import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'

export async function GET() {
  const checks = {
    discoveryHelper: false,
    authHelper: false,
  }

  try {
    await fs.access('/usr/local/bin/esnafdijital-openclaw-discovery')
    checks.discoveryHelper = true
  } catch {}

  try {
    await fs.access('/usr/local/bin/esnafdijital-openclaw-auth')
    checks.authHelper = true
  } catch {}

  return NextResponse.json({ ok: checks.discoveryHelper && checks.authHelper, checks })
}
