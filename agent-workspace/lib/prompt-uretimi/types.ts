export type ConsultationType = 'sales' | 'technical' | 'shared'
export type ConsultationStage = 'draft' | 'clarifying' | 'goal_set' | 'context_ready' | 'blocked' | 'internal' | 'external' | 'ready_to_send' | 'answered' | 'actioned'
export type ConsultationRoute = 'blocked' | 'internal' | 'external'
export type ConsultationOwnerRole = 'user' | 'tech_agent' | 'shared'
export type ConsultationTargetModel = 'gpt-5' | 'gpt-5-pro'
export type ConsultationPromptStatus = 'preparing' | 'ready' | 'error'

export type ConsultationInboxItem = {
  id: string
  title: string
  type: ConsultationType
  stage: ConsultationStage
  route: ConsultationRoute
  ownerRole: ConsultationOwnerRole
  dueAt: string | null
  updatedAt: string
  decisionQuestion: string
  summary: string
  gptRecommended: boolean
  promptStatus: ConsultationPromptStatus
  promptError: string | null
}

export type ConsultationContextRef = {
  kind: 'heartbeat' | 'decision' | 'project' | 'roadmap'
  title: string
  ref: string
}

export type ConsultationAction = {
  id: string
  ownerRole: ConsultationOwnerRole
  title: string
  status: 'open' | 'done'
  linkedEntityType?: 'project_os' | 'context_center'
  linkedEntityId?: string
}

export type ConsultationPromptRun = {
  modelName: ConsultationTargetModel | null
  promptText: string
  sentAt: string | null
  responseSummary: string | null
}

export type ConsultationDetail = ConsultationInboxItem & {
  whyNow: string
  desiredOutput: string
  missingFields: string[]
  businessBrief?: Record<string, string | string[] | null>
  technicalBrief?: Record<string, string | string[] | null>
  sharedBrief?: Record<string, string | string[] | null>
  contextRefs: ConsultationContextRef[]
  promptRun: ConsultationPromptRun
  actions: ConsultationAction[]
}

export type ConsultationCenterPayload = {
  inbox: ConsultationInboxItem[]
  selected: ConsultationDetail | null
}
