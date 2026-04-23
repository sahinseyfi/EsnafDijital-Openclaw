import type { ConsultationAction, ConsultationStage } from '@/lib/prompt-uretimi/types'

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
  const hasDecisionQuestion = hasText(input.decisionQuestion)
  const hasWhyNow = hasText(input.whyNow)
  const hasDesiredOutput = hasText(input.desiredOutput)
  const hasCore = hasDecisionQuestion && hasWhyNow && hasDesiredOutput

  if (actions.length > 0 && actions.every((action) => action.status === 'done')) {
    return 'actioned'
  }

  if (hasText(input.responseSummary) || hasText(input.sentAt)) {
    return 'answered'
  }

  if (input.missingFields.length > 0) {
    if (hasCore) {
      return 'goal_set'
    }

    if (hasDecisionQuestion || hasWhyNow || hasDesiredOutput) {
      return 'clarifying'
    }

    return 'draft'
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
