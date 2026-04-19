import type { ConsultationAction, ConsultationStage } from '@/lib/consultation-center/types'

type InferStageInput = {
  currentStage?: ConsultationStage
  decisionQuestion?: string | null
  whyNow?: string | null
  desiredOutput?: string | null
  missingFields: string[]
  route: 'blocked' | 'internal' | 'external'
  promptText?: string | null
  sentAt?: string | null
  responseSummary?: string | null
  actions?: ConsultationAction[]
}

function hasText(value?: string | null) {
  return Boolean(value && value.trim())
}

export function inferConsultationStage(input: InferStageInput): ConsultationStage {
  const actions = input.actions || []

  if (actions.length > 0 && actions.every((action) => action.status === 'done')) {
    return 'actioned'
  }

  if (hasText(input.responseSummary) || hasText(input.sentAt)) {
    return 'answered'
  }

  if (input.missingFields.length > 0) {
    const hasCore = hasText(input.decisionQuestion) || hasText(input.whyNow) || hasText(input.desiredOutput)
    return hasCore ? 'clarifying' : 'draft'
  }

  if (input.route === 'internal') {
    return 'internal'
  }

  if (input.route === 'external') {
    if (hasText(input.promptText)) return 'ready_to_send'
    return 'context_ready'
  }

  return input.currentStage || 'goal_set'
}
