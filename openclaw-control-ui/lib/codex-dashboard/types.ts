export type HealthLevel = 'ok' | 'warn' | 'bad' | 'idle'
export type ProfileKind = 'agent' | 'authProfile' | 'managed'

export interface CodexUsage {
  fiveHourPct: number
  weekPct: number
  fiveHourResetAt?: string | null
  weekResetAt?: string | null
}

export interface CodexProbe {
  status: HealthLevel
  latencyMs?: number
  lastOkAt?: string | null
  lastError?: string | null
}

export interface CodexProfile {
  profileId: string
  displayName: string
  note: string
  email: string
  accountId: string
  planType: string
  agentId: string
  workspace: string | null
  provider: string | null
  mode: string | null
  kind: ProfileKind
  sourceProfileId?: string | null
  recentSessionCount: number
  lastUsedAt: string | null
  usage: CodexUsage
  probe: CodexProbe
  health?: HealthLevel
  duplicateAccount?: boolean
  recommended?: boolean
  isCurrentProfile?: boolean
}

export interface AuthSessionState {
  sessionId: string
  authUrl: string
  startedAt: string
  status?: 'starting' | 'running' | 'awaiting_callback' | 'verifying' | 'completed' | 'error' | 'cancelled'
  error?: string | null
  result?: string | null
  profileId?: string | null
  displayName?: string | null
  note?: string | null
  workspace?: string | null
}

export interface DashboardSettings {
  autoRouteEnabled: boolean
  routingThreshold: number
  activeAgentId: string
  activeAgentStatus: 'ready' | 'busy' | 'degraded'
  workspace: string
  currentModel: string
  autoRefreshSeconds: number
  viewFilter: 'all' | 'healthy' | 'attention' | 'problem' | 'recommended' | 'current'
  currentSessionProfileId: string | null
  globalProfileId: string | null
}

export interface DashboardState {
  profiles: CodexProfile[]
  settings: DashboardSettings
  authSession: AuthSessionState | null
  updatedAt: string
}

export interface DashboardSummary {
  totalProfiles: number
  healthyProfiles: number
  currentSessionProfile: string | null
  recommendedProfile: string | null
  activeAgentStatus: string
  workspace: string
  currentModel: string
  activeAgentId: string
  currentSessionUsage?: CodexUsage | null
}

export interface DashboardStatusResponse {
  lastRefreshedAt: string
  summary: DashboardSummary
  profiles: CodexProfile[]
  settings: DashboardSettings
}
