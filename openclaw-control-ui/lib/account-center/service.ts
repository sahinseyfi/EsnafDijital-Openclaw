import { promises as fs } from 'fs'
import path from 'path'
import { readDashboardState } from '@/lib/codex-dashboard/store'
import type { AccountCenterPayload, AccountCenterProfile, AccountCenterState } from '@/lib/account-center/types'

type PersistedCredential = {
  provider?: string
  email?: string | null
  access?: string | null
}

type AuthProfilesFile = {
  profiles?: Record<string, PersistedCredential>
}

type OverlayFile = {
  profileMeta?: Record<string, { displayName?: string; note?: string; workspace?: string | null }>
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

function sortProfiles(a: AccountCenterProfile, b: AccountCenterProfile) {
  if (a.current && !b.current) return -1
  if (!a.current && b.current) return 1
  return a.displayName.localeCompare(b.displayName, 'tr')
}

export async function getAccountCenterState(): Promise<AccountCenterState> {
  const [authProfilesFile, overlayFile, sessionsFile] = await Promise.all([
    readJson<AuthProfilesFile>(AUTH_PROFILES_PATH),
    readJson<OverlayFile>(OVERLAY_PATH),
    readJson<SessionsFile>(SESSIONS_PATH),
  ])

  const currentProfileId = sessionsFile?.['agent:main:main']?.authProfileOverride || null
  const meta = overlayFile?.profileMeta || {}
  const profiles = Object.entries(authProfilesFile?.profiles || {}).map(([profileId, credential]) => {
    const payload = parseJwtPayload(credential.access)
    const auth = payload?.['https://api.openai.com/auth'] || {}
    const profileMeta = meta[profileId] || {}
    const displayName = profileMeta.displayName?.trim() || profileMeta.workspace?.trim() || credential.email || profileId

    return {
      profileId,
      displayName,
      note: profileMeta.note?.trim() || 'Gerçek auth kaydı',
      email: credential.email || null,
      accountId: auth.chatgpt_account_id || null,
      provider: credential.provider || null,
      planType: auth.chatgpt_plan_type || null,
      current: profileId === currentProfileId,
      workspaceLabel: inferWorkspaceLabel(profileId, profileMeta.workspace),
    } satisfies AccountCenterProfile
  }).sort(sortProfiles)

  const currentProfile = profiles.find((profile) => profile.current) || null

  return {
    currentProfileId,
    currentDisplayName: currentProfile?.displayName || null,
    totalProfiles: profiles.length,
    profiles,
  }
}

export async function getAccountCenterPayload(): Promise<AccountCenterPayload> {
  const [state, dashboard] = await Promise.all([
    getAccountCenterState(),
    readDashboardState(),
  ])

  return {
    state,
    authSession: dashboard.authSession,
  }
}
