import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'

const execFileAsync = promisify(execFile)
const USAGE_HELPER = '/usr/local/bin/esnafdijital-openclaw-usage'
const TIMEOUT_MS = 10_000

function mapUsageToLimits(usage?: {
  windows?: Array<{ label?: string; usedPercent?: number; resetAt?: number }>
} | null) {
  if (!usage?.windows?.length) return null

  const fiveHour = usage.windows.find((window) => window.label?.toLowerCase() === '5h')
  const week = usage.windows.find((window) => window.label?.toLowerCase() === 'week')

  return {
    fiveHourLeftPct: typeof fiveHour?.usedPercent === 'number' ? Math.max(0, 100 - Math.round(fiveHour.usedPercent)) : null,
    weekLeftPct: typeof week?.usedPercent === 'number' ? Math.max(0, 100 - Math.round(week.usedPercent)) : null,
    fiveHourResetAt: fiveHour?.resetAt ? new Date(fiveHour.resetAt).toISOString() : null,
    weekResetAt: week?.resetAt ? new Date(week.resetAt).toISOString() : null,
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId.trim() : ''

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  try {
    let stdout = ''

    try {
      const result = await execFileAsync(USAGE_HELPER, ['main', profileId], {
        maxBuffer: 1024 * 1024,
        timeout: TIMEOUT_MS,
        killSignal: 'SIGKILL',
      })
      stdout = result.stdout
    } catch (error: any) {
      stdout = typeof error?.stdout === 'string' ? error.stdout : ''
      if (!stdout.trim()) {
        return NextResponse.json({ ok: false, message: error?.message || 'Limit verisi alınamadı' }, { status: 500 })
      }
    }

    const payload = JSON.parse(stdout) as {
      ok?: boolean
      usage?: {
        windows?: Array<{ label?: string; usedPercent?: number; resetAt?: number }>
      } | null
    }

    const limits = payload.ok ? mapUsageToLimits(payload.usage || null) : null
    return NextResponse.json({ ok: true, profileId, limits })
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || 'Limit verisi alınamadı' }, { status: 500 })
  }
}
