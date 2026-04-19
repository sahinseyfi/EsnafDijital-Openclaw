import type { AuthSessionState } from '@/lib/codex-dashboard/types'

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
}

export type AccountCenterState = {
  currentProfileId: string | null
  currentDisplayName: string | null
  totalProfiles: number
  profiles: AccountCenterProfile[]
}

export type AccountCenterPayload = {
  state: AccountCenterState
  authSession: AuthSessionState | null
}
