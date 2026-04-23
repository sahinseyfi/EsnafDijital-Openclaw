const promptGenerationLocks = new Set<string>()

export function acquireConsultationPromptLock(consultationId: string) {
  if (promptGenerationLocks.has(consultationId)) {
    return false
  }

  promptGenerationLocks.add(consultationId)
  return true
}

export function releaseConsultationPromptLock(consultationId: string) {
  promptGenerationLocks.delete(consultationId)
}

export function hasConsultationPromptLock(consultationId: string) {
  return promptGenerationLocks.has(consultationId)
}
