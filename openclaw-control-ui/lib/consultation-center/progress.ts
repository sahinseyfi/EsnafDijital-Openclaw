import type { ConsultationDetail } from '@/lib/consultation-center/types'

export function getConsultationProgress(detail: ConsultationDetail) {
  const totalSteps = 4
  const completedSteps = [
    detail.missingFields.length === 0,
    detail.route !== 'blocked',
    Boolean(detail.promptRun.sentAt || detail.promptRun.responseSummary || detail.route === 'internal'),
    detail.actions.length > 0 && detail.actions.every((action) => action.status === 'done'),
  ].filter(Boolean).length

  return {
    completedSteps,
    totalSteps,
    percent: Math.round((completedSteps / totalSteps) * 100),
  }
}
