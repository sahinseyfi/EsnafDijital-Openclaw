import { promises as fs } from 'fs'
import path from 'path'
import type { AuthSessionState } from '@/lib/codex-dashboard/types'
import { readDashboardState } from '@/lib/codex-dashboard/store'
import { fetchLiveStatusCodexUsage, fetchRealCodexUsage, type RealUsageSnapshot } from '@/lib/codex-dashboard/usage'
import type { AccountCenterDuplicateGroup, AccountCenterPayload, AccountCenterProfile, AccountCenterState } from '@/lib/account-center/types'

type PersistedCredential = {
  provider?: string
  email?: string | null
  access?: string | null
}

type AuthProfilesFile = {
  profiles?: Record<string, PersistedCredential>
}

type OverlayFile = {
  authSession?: AuthSessionState | null
  profileMeta?: Record<string, { displayName?: string; note?: string; workspace?: string | null; lastUsedAt?: string | null }>
}

type SessionsFile = Record<string, { authProfileOverride?: string | null }>

const AUTH_PROFILES_PATH = '/root/.openclaw/agents/main/agent/auth-profiles.json'
const OVERLAY_PATH = '/opt/esnafdijital/data/codex-dashboard-overlay.json'
const SESSIONS_PATH = '/root/.openclaw/agents/main/sessions/sessions.json'

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8')) as T
  } catch {
    return null
  }
}

function parseJwtPayload(token?: string | null) {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    return JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as Record<string, any>
  } catch {
    return null
  }
}

function inferWorkspaceLabel(profileId: string, metaWorkspace?: string | null) {
  const direct = typeof metaWorkspace === 'string' ? metaWorkspace.trim() : ''
  if (direct) return direct
  const marker = '__ws_'
  const index = profileId.indexOf(marker)
  if (index === -1) return null
  return profileId.slice(index + marker.length).replace(/-/g, ' ') || null
}

function normalizeEmail(email?: string | null) {
  const value = typeof email === 'string' ? email.trim().toLowerCase() : ''
  return value || null
}

function normalizePrincipalKey(email?: string | null, stableSubject?: string | null) {
  const normalizedEmail = normalizeEmail(email)
  if (normalizedEmail) return normalizedEmail
  const normalizedSubject = typeof stableSubject === 'string' ? stableSubject.trim() : ''
  if (!normalizedSubject) return 'id-unknown'
  return `id-${Buffer.from(normalizedSubject).toString('base64url')}`
}

function buildCanonicalAuthProfileId(params: { providerId: string; principalKey: string; accountId?: string | null }) {
  return params.accountId
    ? `${params.providerId}:${params.principalKey}__acct_${params.accountId}`
    : `${params.providerId}:${params.principalKey}`
}

function extractCanonicalProfileId(profileId: string, credential: PersistedCredential) {
  const providerId = typeof credential.provider === 'string' && credential.provider.trim()
    ? credential.provider.trim()
    : profileId.split(':')[0] || 'openai-codex'
  const accessPayload = parseJwtPayload(credential.access)
  const idPayload = parseJwtPayload((credential as PersistedCredential & { idToken?: string | null }).idToken)
  const authPayload = accessPayload?.['https://api.openai.com/auth'] || {}
  const profilePayload = accessPayload?.['https://api.openai.com/profile'] || {}
  const email = normalizeEmail(credential.email || profilePayload?.email || idPayload?.email || null)
  const stableSubject = (
    authPayload?.chatgpt_account_user_id
    || authPayload?.chatgpt_user_id
    || authPayload?.user_id
    || accessPayload?.sub
    || idPayload?.sub
    || null
  ) as string | null
  const principalKey = normalizePrincipalKey(email, stableSubject)
  const accountId = typeof authPayload?.chatgpt_account_id === 'string' ? authPayload.chatgpt_account_id.trim().toLowerCase() : null
  return buildCanonicalAuthProfileId({ providerId, principalKey, accountId })
}

function mapUsageToLimits(usage: RealUsageSnapshot | null) {
  if (!usage) return null
  const fiveHour = usage.windows.find((window) => window.label === '5h')
  const week = usage.windows.find((window) => window.label === 'Week')

  return {
    fiveHourLeftPct: typeof fiveHour?.usedPercent === 'number' ? Math.max(0, 100 - Math.round(fiveHour.usedPercent)) : null,
    weekLeftPct: typeof week?.usedPercent === 'number' ? Math.max(0, 100 - Math.round(week.usedPercent)) : null,
    fiveHourResetAt: fiveHour?.resetAt ? new Date(fiveHour.resetAt).toISOString() : null,
    weekResetAt: week?.resetAt ? new Date(week.resetAt).toISOString() : null,
  }
}

function cleanProfileNote(value?: string | null) {
  const note = typeof value === 'string' ? value.trim() : ''
  if (!note) return ''
  if (note === 'Gerçek auth kaydı') return ''
  if (/^Gerçek auth profile, agent=.*mode=oauth$/i.test(note)) return ''
  return note
}

function sortProfiles(a: AccountCenterProfile, b: AccountCenterProfile) {
  if (a.current && !b.current) return -1
  if (!a.current && b.current) return 1
  return a.displayName.localeCompare(b.displayName, 'tr')
}

export async function getAccountCenterState(): Promise<AccountCenterState> {
  const [authProfilesFile, overlayFile, sessionsFile, liveCurrentUsage, dashboardState] = await Promise.all([
    readJson<AuthProfilesFile>(AUTH_PROFILES_PATH),
    readJson<OverlayFile>(OVERLAY_PATH),
    readJson<SessionsFile>(SESSIONS_PATH),
    fetchLiveStatusCodexUsage(),
    readDashboardState().catch(() => null),
  ])

  const currentProfileId = sessionsFile?.['agent:main:main']?.authProfileOverride || null
  const meta = overlayFile?.profileMeta || {}
  const dashboardProfileMap = new Map((dashboardState?.profiles || []).map((profile) => [profile.profileId, profile]))
  const now = new Date().toISOString()
  const rawProfiles = Object.entries(authProfilesFile?.profiles || {})
  const usageEntries = await Promise.all(
    rawProfiles.map(async ([profileId, credential]) => {
      const usage = credential.provider === 'openai-codex'
        ? await fetchRealCodexUsage('main', profileId)
        : null
      return [profileId, usage] as const
    }),
  )
  const usageMap = new Map(usageEntries)

  const profiles = rawProfiles.map(([profileId, credential]) => {
    const payload = parseJwtPayload(credential.access)
    const auth = payload?.['https://api.openai.com/auth'] || {}
    const profileMeta = meta[profileId] || {}
    const displayName = profileMeta.displayName?.trim() || profileMeta.workspace?.trim() || credential.email || profileId
    const limits = profileId === currentProfileId
      ? mapUsageToLimits(liveCurrentUsage || usageMap.get(profileId) || null)
      : mapUsageToLimits(usageMap.get(profileId) || null)

    return {
      profileId,
      displayName,
      note: cleanProfileNote(profileMeta.note),
      email: credential.email || null,
      accountId: auth.chatgpt_account_id || null,
      provider: credential.provider || null,
      planType: auth.chatgpt_plan_type || null,
      current: profileId === currentProfileId,
      workspaceLabel: inferWorkspaceLabel(profileId, profileMeta.workspace),
      limits,
      canonicalProfileId: extractCanonicalProfileId(profileId, credential),
      lastUsedAt: profileId === currentProfileId
        ? now
        : profileMeta.lastUsedAt || dashboardProfileMap.get(profileId)?.lastUsedAt || null,
    } satisfies AccountCenterProfile
  }).sort(sortProfiles)

  const currentProfile = profiles.find((profile) => profile.current) || null
  const duplicateGroupsMap = new Map<string, AccountCenterDuplicateGroup>()

  for (const profile of profiles) {
    if (!profile.canonicalProfileId) continue
    const group: AccountCenterDuplicateGroup = duplicateGroupsMap.get(profile.canonicalProfileId) || {
      canonicalProfileId: profile.canonicalProfileId,
      accountId: profile.accountId,
      planType: profile.planType,
      profiles: [],
    }

    group.profiles.push({
      profileId: profile.profileId,
      displayName: profile.displayName,
    })

    duplicateGroupsMap.set(profile.canonicalProfileId, group)
  }

  const duplicateGroups = [...duplicateGroupsMap.values()]
    .filter((group) => group.profiles.length > 1)
    .sort((a, b) => b.profiles.length - a.profiles.length || a.canonicalProfileId.localeCompare(b.canonicalProfileId, 'tr'))

  return {
    currentProfileId,
    currentDisplayName: currentProfile?.displayName || null,
    totalProfiles: profiles.length,
    profiles,
    duplicateGroups,
  }
}

export async function getAccountCenterPayload(): Promise<AccountCenterPayload> {
  const [state, overlay] = await Promise.all([
    getAccountCenterState(),
    readJson<OverlayFile>(OVERLAY_PATH),
  ])

  return {
    state,
    authSession: overlay?.authSession || null,
  }
}
