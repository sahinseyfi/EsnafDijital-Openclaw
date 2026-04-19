import { promises as fs } from 'fs'
import path from 'path'

type PersistedCredential = Record<string, unknown> & {
  type?: string
  provider?: string
  access?: string
  refresh?: string | null
  expires?: number | null
  email?: string | null
  idToken?: string | null
}

type PersistedAuthProfiles = {
  version?: number
  profiles?: Record<string, PersistedCredential>
}

type PersistedAuthState = {
  version?: number
  order?: Record<string, string[]>
  lastGood?: Record<string, string>
  usageStats?: Record<string, Record<string, unknown>>
}

export type CanonicalProfileIdentity = {
  providerId: string
  principalKey: string
  accountId: string | null
  email: string | null
  stableSubject: string | null
  canonicalProfileId: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'workspace'
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

function normalizeAccountId(accountId?: string | null) {
  const value = typeof accountId === 'string' ? accountId.trim().toLowerCase() : ''
  return value || null
}

function extractProfileSuffix(profileId: string) {
  const index = profileId.indexOf(':')
  return index === -1 ? profileId : profileId.slice(index + 1)
}

function extractIdentityFromCredential(profileId: string, credential: PersistedCredential): CanonicalProfileIdentity {
  const providerId = typeof credential.provider === 'string' && credential.provider.trim()
    ? credential.provider.trim()
    : profileId.split(':')[0] || 'openai-codex'
  const accessPayload = parseJwtPayload(credential.access)
  const idPayload = parseJwtPayload(credential.idToken)
  const authPayload = accessPayload?.['https://api.openai.com/auth'] || {}
  const profilePayload = accessPayload?.['https://api.openai.com/profile'] || {}

  const email = normalizeEmail(
    credential.email
    || profilePayload?.email
    || idPayload?.email
    || null,
  )
  const stableSubject = (
    authPayload?.chatgpt_account_user_id
    || authPayload?.chatgpt_user_id
    || authPayload?.user_id
    || accessPayload?.sub
    || idPayload?.sub
    || null
  ) as string | null
  const accountId = normalizeAccountId(authPayload?.chatgpt_account_id || credential.accountId || null)
  const principalKey = normalizePrincipalKey(email, stableSubject)

  return {
    providerId,
    principalKey,
    accountId,
    email,
    stableSubject,
    canonicalProfileId: buildCanonicalAuthProfileId({ providerId, principalKey, accountId }),
  }
}

function remapAuthStateProfileId(authState: PersistedAuthState, sourceProfileId: string, targetProfileId: string) {
  authState.order = Object.fromEntries(
    Object.entries(authState.order || {}).map(([provider, ids]) => {
      const nextIds = (ids || []).map((id) => (id === sourceProfileId ? targetProfileId : id)).filter(Boolean)
      return [provider, [...new Set(nextIds)]]
    }),
  )

  authState.lastGood = Object.fromEntries(
    Object.entries(authState.lastGood || {}).map(([provider, id]) => [provider, id === sourceProfileId ? targetProfileId : id]),
  )

  if (authState.usageStats?.[sourceProfileId]) {
    authState.usageStats[targetProfileId] = authState.usageStats[sourceProfileId]
    delete authState.usageStats[sourceProfileId]
  }
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

export function buildCanonicalAuthProfileId(params: {
  providerId: string
  principalKey: string
  accountId?: string | null
}) {
  return params.accountId
    ? `${params.providerId}:${params.principalKey}__acct_${params.accountId}`
    : `${params.providerId}:${params.principalKey}`
}

export async function getCanonicalIdentityForStoredProfile(params: { agentId: string; profileId: string }) {
  const store = await loadAuthProfiles(params.agentId)
  const credential = (store.profiles || {})[params.profileId]

  if (!credential) {
    throw new Error('Auth profili auth-profiles.json içinde bulunamadı')
  }

  return extractIdentityFromCredential(params.profileId, credential)
}

export async function canonicalizeAuthProfile(params: { agentId: string; profileId: string }) {
  const store = await loadAuthProfiles(params.agentId)
  const profiles = store.profiles || {}
  const sourceCredential = profiles[params.profileId]

  if (!sourceCredential) {
    throw new Error('Kaynak auth profile auth-profiles.json içinde bulunamadı')
  }

  const identity = extractIdentityFromCredential(params.profileId, sourceCredential)
  const canonicalProfileId = identity.canonicalProfileId
  const existingCredential = profiles[canonicalProfileId]
  const existedCanonical = Boolean(existingCredential)

  profiles[canonicalProfileId] = JSON.parse(JSON.stringify(existingCredential || sourceCredential))
  profiles[canonicalProfileId] = {
    ...profiles[canonicalProfileId],
    ...JSON.parse(JSON.stringify(sourceCredential)),
    provider: identity.providerId,
    email: identity.email || sourceCredential.email || null,
  }

  if (params.profileId !== canonicalProfileId) {
    delete profiles[params.profileId]
  }

  store.profiles = profiles
  await saveAuthProfiles(params.agentId, store)

  const authState = await loadAuthState(params.agentId).catch(() => null)
  if (authState && params.profileId !== canonicalProfileId) {
    remapAuthStateProfileId(authState, params.profileId, canonicalProfileId)
    await saveAuthState(params.agentId, authState)
  }

  return {
    ...identity,
    previousProfileId: params.profileId,
    canonicalProfileId,
    existedCanonical,
  }
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

export function inferWorkspaceAuthProfileIdDisplay(profileId: string) {
  const suffix = extractProfileSuffix(profileId)
  return suffix
}
