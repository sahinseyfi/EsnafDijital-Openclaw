import { promises as fs } from 'fs'
import { execFile } from 'child_process'
import net from 'net'
import path from 'path'
import { promisify } from 'util'
import type {
  AuthSessionState,
  CodexProfile,
  DashboardSettings,
  DashboardState,
  DashboardStatusResponse,
  DashboardSummary,
  HealthLevel,
} from '@/lib/codex-dashboard/types'

const execFileAsync = promisify(execFile)
const DATA_DIR = '/opt/esnafdijital/data'
const OVERLAY_FILE = path.join(DATA_DIR, 'codex-dashboard-overlay.json')
const DISCOVERY_HELPER = '/usr/local/bin/esnafdijital-openclaw-discovery'
const DISCOVERY_TTL_MS = 2000

let discoveryCache: {
  value: DiscoveryResult | null
  expiresAt: number
  inflight: Promise<DiscoveryResult> | null
} = {
  value: null,
  expiresAt: 0,
  inflight: null,
}

export function clearDiscoveryCache() {
  discoveryCache = {
    value: null,
    expiresAt: 0,
    inflight: null,
  }
}

type OverlayState = {
  settings: Partial<DashboardSettings>
  authSession: AuthSessionState | null
  managedProfiles: CodexProfile[]
  profileMeta: Record<string, { displayName?: string; note?: string; workspace?: string | null }>
  hiddenProfileIds: string[]
}

type DiscoveryResult = {
  codexCliInstalled: boolean
  config: {
    agents?: {
      defaults?: {
        workspace?: string | null
      }
    }
  } | null
  deviceAuth: {
    hasOperatorToken: boolean
    deviceId: string | null
    updatedAtMs: number | null
  }
  agents: Array<{
    id: string
    workspace: string | null
    hasModels: boolean
    codexProvider: boolean
    providerApiKey: string | null
    firstModelId: string | null
    sessionCount: number
    latestAt: number | null
  }>
  authProfiles: Array<{
    agentId: string
    profileId: string
    provider: string | null
    mode: string | null
    email?: string | null
    accountId?: string | null
    planType?: string | null
    updatedAtMs?: number | null
  }>
  authState: Record<string, { lastUsed?: number; cooldownUntil?: number; disabledUntil?: number; errorCount?: number }>
}

function nowIso() {
  return new Date().toISOString()
}

function addHours(value: number | null | undefined, hours: number) {
  if (!value) return null
  return new Date(value + hours * 60 * 60 * 1000).toISOString()
}

function addDays(value: number | null | undefined, days: number) {
  if (!value) return null
  return new Date(value + days * 24 * 60 * 60 * 1000).toISOString()
}

async function exists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function ensureOverlayFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  if (!(await exists(OVERLAY_FILE))) {
    const initial: OverlayState = {
      settings: {
        autoRouteEnabled: true,
        routingThreshold: 78,
        activeAgentId: 'main',
        autoRefreshSeconds: 20,
        viewFilter: 'all',
      },
      authSession: null,
      managedProfiles: [],
      profileMeta: {},
      hiddenProfileIds: [],
    }
    await fs.writeFile(OVERLAY_FILE, JSON.stringify(initial, null, 2), 'utf8')
  }
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8')) as T
  } catch {
    return null
  }
}

async function writeJson(filePath: string, value: unknown) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8')
}

async function loadOverlay(): Promise<OverlayState> {
  await ensureOverlayFile()
  return (await readJson<OverlayState>(OVERLAY_FILE)) || {
    settings: {},
    authSession: null,
    managedProfiles: [],
    profileMeta: {},
    hiddenProfileIds: [],
  }
}

async function probeTcp(host: string, port: number) {
  return new Promise<boolean>((resolve) => {
    const socket = net.createConnection({ host, port })
    const finalize = (value: boolean) => {
      socket.removeAllListeners()
      socket.destroy()
      resolve(value)
    }
    socket.setTimeout(1200)
    socket.on('connect', () => finalize(true))
    socket.on('timeout', () => finalize(false))
    socket.on('error', () => finalize(false))
  })
}

function emptyDiscoveryResult(): DiscoveryResult {
  return {
    codexCliInstalled: false,
    config: null,
    deviceAuth: { hasOperatorToken: false, deviceId: null, updatedAtMs: null },
    agents: [],
    authProfiles: [],
    authState: {},
  }
}

async function runDiscovery(): Promise<DiscoveryResult> {
  const now = Date.now()
  if (discoveryCache.value && discoveryCache.expiresAt > now) {
    return discoveryCache.value
  }
  if (discoveryCache.inflight) {
    return discoveryCache.inflight
  }

  discoveryCache.inflight = (async () => {
    try {
      const { stdout } = await execFileAsync(DISCOVERY_HELPER)
      const parsed = JSON.parse(stdout) as DiscoveryResult
      discoveryCache.value = parsed
      discoveryCache.expiresAt = Date.now() + DISCOVERY_TTL_MS
      return parsed
    } catch {
      const fallback = emptyDiscoveryResult()
      discoveryCache.value = fallback
      discoveryCache.expiresAt = Date.now() + DISCOVERY_TTL_MS
      return fallback
    } finally {
      discoveryCache.inflight = null
    }
  })()

  return discoveryCache.inflight
}

function deriveHealth(profile: CodexProfile, threshold: number): HealthLevel {
  if (profile.probe.status === 'bad') return 'bad'
  if (profile.probe.status === 'idle') return 'idle'
  if (profile.usage.fiveHourPct >= 95 || profile.usage.weekPct >= 95) return 'bad'
  if (profile.usage.fiveHourPct >= threshold || profile.usage.weekPct >= Math.max(80, threshold)) return 'warn'
  if (profile.probe.status === 'warn') return 'warn'
  return 'ok'
}

function uniqueProfiles(profiles: CodexProfile[]) {
  const merged = new Map<string, CodexProfile>()
  for (const profile of profiles) {
    merged.set(profile.profileId, profile)
  }
  return [...merged.values()]
}

async function discoverProfiles(overlay: OverlayState, settings: DashboardSettings) {
  const discovery = await runDiscovery()
  const gatewayOk = await probeTcp('127.0.0.1', 18789)
  const hidden = new Set(overlay.hiddenProfileIds || [])
  const agentMap = new Map(discovery.agents.map((agent) => [agent.id, agent]))
  const profiles: CodexProfile[] = []

  for (const agent of discovery.agents) {
    if (hidden.has(agent.id)) continue
    const meta = overlay.profileMeta[agent.id] || {}
    const probeStatus: HealthLevel = gatewayOk && discovery.deviceAuth.hasOperatorToken && agent.codexProvider
      ? 'ok'
      : agent.hasModels || agent.codexProvider
        ? 'warn'
        : 'idle'

    if (settings.activeAgentId === agent.id) {
      settings.workspace = agent.workspace || settings.workspace
      settings.currentModel = agent.firstModelId || settings.currentModel
    }

    if (agent.id === 'main' || agent.codexProvider || agent.hasModels) {
      const lastUsedMs = agent.latestAt ? agent.latestAt * 1000 : null
      profiles.push({
        profileId: agent.id,
        displayName: meta.displayName || (agent.id === 'main' ? 'OpenClaw Main' : `Agent ${agent.id}`),
        note: meta.note || `Ajan görünümü, workspace=${agent.workspace || '—'}, model=${agent.firstModelId || '—'}`,
        email: '—',
        accountId: agent.id,
        planType: agent.codexProvider ? 'Agent + Codex' : 'Agent',
        agentId: agent.id,
        workspace: meta.workspace || agent.workspace,
        provider: agent.codexProvider ? 'openai-codex' : null,
        mode: 'agent',
        kind: 'agent',
        recentSessionCount: agent.sessionCount,
        lastUsedAt: lastUsedMs ? new Date(lastUsedMs).toISOString() : null,
        usage: {
          fiveHourPct: probeStatus === 'ok' ? 10 : probeStatus === 'warn' ? 68 : 0,
          weekPct: probeStatus === 'ok' ? 18 : probeStatus === 'warn' ? 72 : 0,
          fiveHourResetAt: addHours(lastUsedMs, 5),
          weekResetAt: addDays(lastUsedMs, 7),
        },
        probe: {
          status: probeStatus,
          latencyMs: gatewayOk ? 120 : undefined,
          lastOkAt: gatewayOk ? nowIso() : null,
          lastError: gatewayOk ? null : 'Gateway probe başarısız',
        },
        duplicateAccount: false,
        recommended: false,
        isCurrentProfile: false,
        health: probeStatus,
      })
    }
  }

  for (const entry of discovery.authProfiles || []) {
    if (entry.provider !== 'openai-codex') continue
    if (hidden.has(entry.profileId)) continue
    const meta = overlay.profileMeta[entry.profileId] || {}
    const usage = discovery.authState?.[`${entry.agentId}:${entry.profileId}`] || {}
    const profileHealth: HealthLevel = usage.disabledUntil && usage.disabledUntil > Date.now()
      ? 'bad'
      : usage.cooldownUntil && usage.cooldownUntil > Date.now()
        ? 'warn'
        : gatewayOk
          ? 'ok'
          : 'warn'
    const agent = agentMap.get(entry.agentId)
    const lastUsedMs = usage.lastUsed || entry.updatedAtMs || null

    profiles.push({
      profileId: entry.profileId,
      displayName: meta.displayName || entry.email || entry.profileId,
      note: meta.note || `Gerçek auth profile, agent=${entry.agentId}, mode=${entry.mode || 'unknown'}`,
      email: entry.email || '—',
      accountId: entry.accountId || 'bilinmiyor',
      planType: entry.planType || (entry.mode === 'oauth' ? 'OAuth' : entry.mode || 'Auth Profile'),
      agentId: entry.agentId,
      workspace: meta.workspace || agent?.workspace || null,
      provider: entry.provider,
      mode: entry.mode || null,
      kind: 'authProfile',
      recentSessionCount: agent?.sessionCount || 0,
      lastUsedAt: lastUsedMs ? new Date(lastUsedMs).toISOString() : null,
      usage: {
        fiveHourPct: profileHealth === 'ok' ? 0 : 82,
        weekPct: profileHealth === 'ok' ? 0 : 88,
        fiveHourResetAt: usage.cooldownUntil ? new Date(usage.cooldownUntil).toISOString() : addHours(lastUsedMs, 5),
        weekResetAt: usage.disabledUntil ? new Date(usage.disabledUntil).toISOString() : addDays(lastUsedMs, 7),
      },
      probe: {
        status: profileHealth,
        latencyMs: gatewayOk ? 120 : undefined,
        lastOkAt: gatewayOk ? nowIso() : null,
        lastError: profileHealth === 'bad' ? 'Profile disabled/cooldown' : null,
      },
      duplicateAccount: false,
      recommended: false,
      isCurrentProfile: false,
      health: profileHealth,
    })
  }

  const discoveredProfileMap = new Map(profiles.map((profile) => [profile.profileId, profile]))

  const computed = uniqueProfiles([...profiles, ...(overlay.managedProfiles || [])])
    .map((profile) => {
      const sourceProfile = profile.kind === 'managed' && profile.sourceProfileId
        ? discoveredProfileMap.get(profile.sourceProfileId)
        : null

      const mergedProfile: CodexProfile = sourceProfile
        ? {
            ...sourceProfile,
            ...profile,
            profileId: profile.profileId,
            kind: 'managed',
            sourceProfileId: profile.sourceProfileId,
            workspace: profile.workspace,
            displayName: profile.displayName,
            note: profile.note,
          }
        : profile

      return {
        ...mergedProfile,
        displayName: overlay.profileMeta[profile.profileId]?.displayName || mergedProfile.displayName,
        note: overlay.profileMeta[profile.profileId]?.note ?? mergedProfile.note,
        workspace: overlay.profileMeta[profile.profileId]?.workspace ?? mergedProfile.workspace,
        isCurrentProfile: profile.profileId === settings.currentSessionProfileId,
        health: deriveHealth(mergedProfile, settings.routingThreshold),
      }
    })

  const accountCounts = computed.reduce<Record<string, number>>((acc, profile) => {
    if (profile.accountId && profile.accountId !== 'bilinmiyor' && profile.accountId !== profile.agentId) {
      acc[profile.accountId] = (acc[profile.accountId] || 0) + 1
    }
    return acc
  }, {})

  const recommended = [...computed]
    .filter((profile) => profile.health === 'ok' || profile.health === 'warn')
    .sort((a, b) => {
      const kindRank = { authProfile: 0, agent: 1, managed: 2 }
      const healthRank = { ok: 0, warn: 1, idle: 2, bad: 3 }
      if (kindRank[a.kind] !== kindRank[b.kind]) return kindRank[a.kind] - kindRank[b.kind]
      if (healthRank[a.health || 'idle'] !== healthRank[b.health || 'idle']) return healthRank[a.health || 'idle'] - healthRank[b.health || 'idle']
      return (a.usage.fiveHourPct + a.usage.weekPct) - (b.usage.fiveHourPct + b.usage.weekPct)
    })[0]

  return computed.map((profile) => ({
    ...profile,
    duplicateAccount: Boolean(profile.accountId && accountCounts[profile.accountId] > 1),
    recommended: Boolean(recommended && recommended.profileId === profile.profileId),
  }))
}

export async function readDashboardState(): Promise<DashboardState> {
  const overlay = await loadOverlay()
  const discovery = await runDiscovery()
  const defaultWorkspace = discovery.config?.agents?.defaults?.workspace || '—'
  const settings: DashboardSettings = {
    autoRouteEnabled: overlay.settings.autoRouteEnabled ?? true,
    routingThreshold: overlay.settings.routingThreshold ?? 78,
    activeAgentId: overlay.settings.activeAgentId ?? 'main',
    activeAgentStatus: 'ready',
    workspace: overlay.settings.workspace ?? defaultWorkspace,
    currentModel: overlay.settings.currentModel ?? 'openai-codex/gpt-5.4',
    autoRefreshSeconds: overlay.settings.autoRefreshSeconds ?? 20,
    viewFilter: overlay.settings.viewFilter ?? 'all',
    currentSessionProfileId: overlay.settings.currentSessionProfileId ?? null,
    globalProfileId: overlay.settings.globalProfileId ?? null,
  }

  const profiles = await discoverProfiles(overlay, settings)
  if (!profiles.some((profile) => profile.profileId === settings.currentSessionProfileId)) {
    settings.currentSessionProfileId = profiles[0]?.profileId || null
  }

  return {
    profiles: profiles.map((profile) => ({
      ...profile,
      isCurrentProfile: profile.profileId === settings.currentSessionProfileId,
    })),
    settings,
    authSession: overlay.authSession,
    updatedAt: nowIso(),
  }
}

async function persistOverlay(state: DashboardState) {
  const overlay = await loadOverlay()
  const discovery = await runDiscovery()
  const discoveredIds = new Set([
    ...(discovery.agents || []).map((agent) => agent.id),
    ...(discovery.authProfiles || []).map((profile) => profile.profileId),
  ])
  const nextOverlay: OverlayState = {
    settings: {
      ...overlay.settings,
      autoRouteEnabled: state.settings.autoRouteEnabled,
      routingThreshold: state.settings.routingThreshold,
      activeAgentId: state.settings.activeAgentId,
      workspace: state.settings.workspace,
      currentModel: state.settings.currentModel,
      autoRefreshSeconds: state.settings.autoRefreshSeconds,
      viewFilter: state.settings.viewFilter,
      currentSessionProfileId: state.settings.currentSessionProfileId,
      globalProfileId: state.settings.globalProfileId,
    },
    authSession: state.authSession,
    managedProfiles: state.profiles.filter((profile) => !discoveredIds.has(profile.profileId)),
    profileMeta: {
      ...overlay.profileMeta,
      ...Object.fromEntries(state.profiles.map((profile) => [profile.profileId, { displayName: profile.displayName, note: profile.note, workspace: profile.workspace }])),
    },
    hiddenProfileIds: overlay.hiddenProfileIds || [],
  }
  await writeJson(OVERLAY_FILE, nextOverlay)
}

export async function writeDashboardState(state: DashboardState) {
  await persistOverlay(state)
  return readDashboardState()
}

export async function updateDashboardState(mutator: (state: DashboardState) => DashboardState | Promise<DashboardState>) {
  const current = await readDashboardState()
  const next = await mutator(current)
  return writeDashboardState(next)
}

export async function hideProfile(profileId: string) {
  const overlay = await loadOverlay()
  const hidden = new Set(overlay.hiddenProfileIds || [])
  hidden.add(profileId)
  await writeJson(OVERLAY_FILE, {
    ...overlay,
    hiddenProfileIds: [...hidden],
  })
  return readDashboardState()
}

export function buildSummary(state: DashboardState): DashboardSummary {
  const recommended = state.profiles.find((profile) => profile.recommended)
  const current = state.profiles.find((profile) => profile.isCurrentProfile)
  return {
    totalProfiles: state.profiles.length,
    healthyProfiles: state.profiles.filter((profile) => profile.health === 'ok').length,
    currentSessionProfile: current?.displayName || null,
    recommendedProfile: recommended?.displayName || null,
    activeAgentStatus: state.settings.activeAgentStatus,
    workspace: state.settings.workspace,
    currentModel: state.settings.currentModel,
    activeAgentId: state.settings.activeAgentId,
  }
}

export async function getDashboardStatus(): Promise<DashboardStatusResponse> {
  const state = await readDashboardState()
  return {
    lastRefreshedAt: nowIso(),
    summary: buildSummary(state),
    profiles: state.profiles,
    settings: state.settings,
  }
}
