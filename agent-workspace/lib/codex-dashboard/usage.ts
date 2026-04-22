import { execFile } from 'child_process'
import { promisify } from 'util'

export type RealUsageWindow = {
  label: string
  usedPercent: number
  resetAt?: number
}

export type RealUsageSnapshot = {
  plan?: string
  error?: string
  windows: RealUsageWindow[]
}

const execFileAsync = promisify(execFile)
const USAGE_HELPER = '/usr/local/bin/esnafdijital-openclaw-usage'
const CACHE_TTL_MS = 60_000
const USAGE_HELPER_TIMEOUT_MS = 2_500
const LIVE_STATUS_TIMEOUT_MS = 10_000

const usageCache = new Map<string, { expiresAt: number; value: RealUsageSnapshot | null; inflight?: Promise<RealUsageSnapshot | null> }>()
let liveStatusUsageCache: { expiresAt: number; value: RealUsageSnapshot | null; inflight?: Promise<RealUsageSnapshot | null> } | null = null

function parseUsagePayload(stdout?: string | null) {
  if (!stdout?.trim()) return null
  const payload = JSON.parse(stdout) as { ok?: boolean; usage?: RealUsageSnapshot | null }
  return payload.ok ? (payload.usage || null) : null
}

export async function fetchRealCodexUsage(agentId: string, profileId: string, timeoutMs = USAGE_HELPER_TIMEOUT_MS): Promise<RealUsageSnapshot | null> {
  const key = `${agentId}:${profileId}`
  const cached = usageCache.get(key)
  const now = Date.now()

  if (cached?.value && cached.expiresAt > now) {
    return cached.value
  }

  if (cached?.inflight) {
    return cached.inflight
  }

  const inflight = (async () => {
    try {
      let value: RealUsageSnapshot | null = null

      try {
        const { stdout } = await execFileAsync(USAGE_HELPER, [agentId, profileId], {
          maxBuffer: 1024 * 1024,
          timeout: timeoutMs,
          killSignal: 'SIGKILL',
        })
        value = parseUsagePayload(stdout)
      } catch (error: any) {
        value = parseUsagePayload(typeof error?.stdout === 'string' ? error.stdout : '')
        if (!value) throw error
      }

      usageCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS })
      return value
    } catch {
      usageCache.set(key, { value: null, expiresAt: Date.now() + 10_000 })
      return null
    }
  })()

  usageCache.set(key, { value: cached?.value || null, expiresAt: 0, inflight })
  return inflight
}

export async function fetchLiveStatusCodexUsage(): Promise<RealUsageSnapshot | null> {
  const now = Date.now()
  if (liveStatusUsageCache?.value && liveStatusUsageCache.expiresAt > now) {
    return liveStatusUsageCache.value
  }
  if (liveStatusUsageCache?.inflight) {
    return liveStatusUsageCache.inflight
  }

  const inflight = (async () => {
    try {
      const { stdout } = await execFileAsync('openclaw', ['status', '--json', '--usage'], {
        maxBuffer: 1024 * 1024,
        timeout: LIVE_STATUS_TIMEOUT_MS,
        killSignal: 'SIGKILL',
      })
      const payload = JSON.parse(stdout) as {
        usage?: {
          providers?: Array<{
            provider?: string
            plan?: string
            windows?: RealUsageWindow[]
          }>
        }
      }
      const provider = payload.usage?.providers?.find((entry) => entry.provider === 'openai-codex') || payload.usage?.providers?.[0]
      const value = provider ? { plan: provider.plan, windows: provider.windows || [] } : null
      liveStatusUsageCache = { value, expiresAt: Date.now() + 15_000 }
      return value
    } catch {
      liveStatusUsageCache = { value: null, expiresAt: Date.now() + 10_000 }
      return null
    }
  })()

  liveStatusUsageCache = { value: liveStatusUsageCache?.value || null, expiresAt: 0, inflight }
  return inflight
}
