import type { ConsultationContextRef, ConsultationOwnerRole, ConsultationRoute, ConsultationType } from '@/lib/prompt-uretimi/types'

type BriefRecord = Record<string, string | string[] | null> | undefined

type EvaluateConsultationInput = {
  type: ConsultationType
  decisionQuestion?: string | null
  whyNow?: string | null
  desiredOutput?: string | null
  contextRefs?: ConsultationContextRef[] | null
  businessBrief?: BriefRecord
  technicalBrief?: BriefRecord
  sharedBrief?: BriefRecord
}

export type ConsultationEvaluation = {
  route: ConsultationRoute
  ownerRole: ConsultationOwnerRole
  gptRecommended: boolean
  missingFields: string[]
}

function hasText(value?: string | null) {
  return Boolean(value && value.trim())
}

function hasArrayValue(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) return value.length > 0
  return hasText(value)
}

function hasContextRefs(value?: ConsultationContextRef[] | null) {
  return Boolean(value && value.length > 0)
}

function inferOwnerRole(type: ConsultationType): ConsultationOwnerRole {
  if (type === 'sales') return 'user'
  if (type === 'technical') return 'tech_agent'
  return 'shared'
}

function inferTypeSpecificMissing(input: EvaluateConsultationInput): string[] {
  if (input.type === 'sales') {
    return [
      !hasArrayValue(input.businessBrief?.segment) ? 'segment' : null,
      !hasArrayValue(input.businessBrief?.region) ? 'bölge' : null,
    ].filter(Boolean) as string[]
  }

  if (input.type === 'technical') {
    return [
      !hasArrayValue(input.technicalBrief?.affectedModule) ? 'etkilenen modül' : null,
      !hasArrayValue(input.technicalBrief?.currentProblem) ? 'mevcut problem' : null,
    ].filter(Boolean) as string[]
  }

  return [
    !hasArrayValue(input.sharedBrief?.kararCekirdegi) ? 'karar çekirdeği' : null,
  ].filter(Boolean) as string[]
}

function shouldStayInternal(input: EvaluateConsultationInput) {
  if (input.type !== 'technical') return false
  const desiredOutput = input.desiredOutput?.toLowerCase() || ''
  const technicalSignals = ['veri modeli', 'schema', 'api', 'route', 'migration', 'ekran yapısı', 'status akışı']
  return technicalSignals.some((signal) => desiredOutput.includes(signal)) || hasArrayValue(input.technicalBrief?.affectedModule)
}

export function evaluateConsultation(input: EvaluateConsultationInput): ConsultationEvaluation {
  const missingFields = [
    !hasText(input.decisionQuestion) ? 'karar sorusu' : null,
    !hasText(input.whyNow) ? 'neden şimdi' : null,
    !hasText(input.desiredOutput) ? 'beklenen çıktı' : null,
    !hasContextRefs(input.contextRefs) ? 'bağlam' : null,
    ...inferTypeSpecificMissing(input),
  ].filter(Boolean) as string[]

  if (missingFields.length > 0) {
    return {
      route: 'blocked',
      ownerRole: inferOwnerRole(input.type),
      gptRecommended: false,
      missingFields,
    }
  }

  if (shouldStayInternal(input)) {
    return {
      route: 'internal',
      ownerRole: inferOwnerRole(input.type),
      gptRecommended: false,
      missingFields: [],
    }
  }

  return {
    route: 'external',
    ownerRole: inferOwnerRole(input.type),
    gptRecommended: true,
    missingFields: [],
  }
}
