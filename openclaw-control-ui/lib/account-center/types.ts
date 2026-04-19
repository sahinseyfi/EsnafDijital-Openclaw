import type { AuthSessionState } from '@/lib/codex-dashboard/types'

export type AccountCenterLimits = {
  fiveHourLeftPct: number | null
  weekLeftPct: number | null
  fiveHourResetAt: string | null
  weekResetAt: string | null
}

export type AccountCenterProfile = {
  profileId: string
  displayName: string
  note: string
  email: string | null
  accountId: string | null
  provider: string | null
  planType: string | null
  current: boolean
  workspaceLabel: string | null
  limits: AccountCenterLimits | null
  canonicalProfileId: string | null
  lastUsedAt: string | null
}

export type AccountCenterDuplicateGroup = {
  canonicalProfileId: string
  accountId: string | null
  planType: string | null
  profiles: Array<{
    profileId: string
    displayName: string
  }>
}

export type AccountCenterState = {
  currentProfileId: string | null
  currentDisplayName: string | null
  totalProfiles: number
  profiles: AccountCenterProfile[]
  duplicateGroups: AccountCenterDuplicateGroup[]
}

export type AccountCenterPayload = {
  state: AccountCenterState
  authSession: AuthSessionState | null
}
