export function extractMessage(input: unknown) {
  if (typeof input === 'string') return input.trim()
  if (input instanceof Error) return input.message.trim()

  if (typeof input === 'object' && input !== null && 'message' in input) {
    const message = (input as { message?: unknown }).message
    return typeof message === 'string' ? message.trim() : ''
  }

  return ''
}

export function humanizeConsultationMessage(input: unknown, fallback: string) {
  const raw = extractMessage(input)
  if (!raw) return fallback

  const normalized = raw.toLowerCase()

  if (normalized.includes('gateway timeout')) {
    return 'Prompt hazırlanırken süre doldu. Biraz sonra yeniden deneyin.'
  }

  if (normalized.includes('session file locked')) {
    return 'Prompt hazırlama oturumu şu anda meşgul. Birkaç saniye sonra yeniden deneyin.'
  }

  if (normalized.includes('connection refused')) {
    return 'Servise şu anda ulaşılamıyor. Kısa süre sonra yeniden deneyin.'
  }

  if (normalized.includes('database_url')) {
    return 'Veritabanı bağlantısı eksik görünüyor. Sistem ayarı kontrol edilmeli.'
  }

  if (normalized === 'unknown error') {
    return fallback
  }

  return raw
}

export function getConsultationClientMessage(error: unknown, fallback: string) {
  if (error instanceof SyntaxError) {
    return 'Sunucudan beklenmeyen bir cevap geldi. Sayfayı yenileyip tekrar deneyin.'
  }

  if (typeof error === 'object' && error !== null && 'name' in error && (error as { name?: unknown }).name === 'TypeError') {
    return 'Sunucuya ulaşılamadı. Bağlantı ya da servis geçici olarak düşmüş olabilir.'
  }

  return humanizeConsultationMessage(error, fallback)
}
