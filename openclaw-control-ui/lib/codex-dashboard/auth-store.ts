import { promises as fs } from 'fs'
import path from 'path'

type PersistedAuthProfiles = {
  version?: number
  profiles?: Record<string, Record<string, unknown>>
}

type PersistedAuthState = {
  version?: number
  order?: Record<string, string[]>
  lastGood?: Record<string, string>
  usageStats?: Record<string, Record<string, unknown>>
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'workspace'
}

export function buildWorkspaceAuthProfileId(sourceProfileId: string, workspace: string, displayName?: string | null) {
  return `${sourceProfileId}__ws_${slugify(workspace || displayName || 'workspace')}`
}

export async function buildUniqueWorkspaceAuthProfileId(params: {
  agentId: string
  sourceProfileId: string
  workspace: string
  displayName?: string | null
}) {
  const store = await loadAuthProfiles(params.agentId)
  const profiles = store.profiles || {}
  const baseId = buildWorkspaceAuthProfileId(params.sourceProfileId, params.workspace, params.displayName)

  if (!profiles[baseId]) {
    return baseId
  }

  let index = 2
  while (profiles[`${baseId}-${index}`]) {
    index += 1
  }

  return `${baseId}-${index}`
}

function authProfilesPath(agentId: string) {
  return path.join('/root/.openclaw/agents', agentId, 'agent', 'auth-profiles.json')
}

function authStatePath(agentId: string) {
  return path.join('/root/.openclaw/agents', agentId, 'agent', 'auth-state.json')
}

async function loadAuthProfiles(agentId: string): Promise<PersistedAuthProfiles> {
  const filePath = authProfilesPath(agentId)
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as PersistedAuthProfiles
}

async function saveAuthProfiles(agentId: string, value: PersistedAuthProfiles) {
  const filePath = authProfilesPath(agentId)
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8')
}

async function loadAuthState(agentId: string): Promise<PersistedAuthState> {
  const filePath = authStatePath(agentId)
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as PersistedAuthState
}

async function saveAuthState(agentId: string, value: PersistedAuthState) {
  const filePath = authStatePath(agentId)
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8')
}

export async function cloneAuthProfile(params: { agentId: string; sourceProfileId: string; targetProfileId: string }) {
  const store = await loadAuthProfiles(params.agentId)
  const profiles = store.profiles || {}
  const source = profiles[params.sourceProfileId]

  if (!source) {
    throw new Error('Kaynak auth profile auth-profiles.json içinde bulunamadı')
  }

  profiles[params.targetProfileId] = JSON.parse(JSON.stringify(source))
  store.profiles = profiles
  await saveAuthProfiles(params.agentId, store)
}

export async function deleteAuthProfile(params: { agentId: string; profileId: string }) {
  const store = await loadAuthProfiles(params.agentId)
  const profiles = store.profiles || {}

  if (!profiles[params.profileId]) {
    throw new Error('Auth profili auth-profiles.json içinde bulunamadı')
  }

  delete profiles[params.profileId]
  store.profiles = profiles
  await saveAuthProfiles(params.agentId, store)

  const authState = await loadAuthState(params.agentId).catch(() => null)
  if (!authState) return

  authState.order = Object.fromEntries(
    Object.entries(authState.order || {}).map(([provider, ids]) => [provider, (ids || []).filter((id) => id !== params.profileId)]),
  )

  authState.lastGood = Object.fromEntries(
    Object.entries(authState.lastGood || {}).filter(([, id]) => id !== params.profileId),
  )

  if (authState.usageStats) {
    delete authState.usageStats[params.profileId]
  }

  await saveAuthState(params.agentId, authState)
}
