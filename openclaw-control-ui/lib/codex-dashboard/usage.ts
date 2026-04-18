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

const usageCache = new Map<string, { expiresAt: number; value: RealUsageSnapshot | null; inflight?: Promise<RealUsageSnapshot | null> }>()

export async function fetchRealCodexUsage(agentId: string, profileId: string): Promise<RealUsageSnapshot | null> {
  const sharedProfileId = profileId.includes('__ws_') ? profileId.split('__ws_')[0] || profileId : profileId
  const key = `${agentId}:${sharedProfileId}`
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
      const { stdout } = await execFileAsync(USAGE_HELPER, [agentId, profileId], { maxBuffer: 1024 * 1024 })
      const payload = JSON.parse(stdout) as { ok?: boolean; usage?: RealUsageSnapshot | null }
      const value = payload.ok ? (payload.usage || null) : null
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
