'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function BusinessYzReportButton({
  businessId,
  idleLabel = 'Rapor oluştur',
  loadingLabel = 'Y.Z raporu hazırlanıyor...',
  successLabel = 'Y.Z raporu hazır',
  helperText = 'Ajan tarama, Apify tarama ve notları birleştirip kısa rapor üretir.',
  buttonClassName = 'button-secondary',
  align = 'flex-end',
}: {
  businessId: string
  idleLabel?: string
  loadingLabel?: string
  successLabel?: string
  helperText?: string
  buttonClassName?: string
  align?: 'flex-start' | 'flex-end'
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleClick() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/businesses/${businessId}/yz-report`, {
        method: 'POST',
      })

      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Y.Z raporu oluşturulamadı.')
      }

      setMessage(successLabel)
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Y.Z raporu oluşturulamadı.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs" style={{ alignItems: align }}>
      <button type="button" className={buttonClassName} onClick={handleClick} disabled={isSubmitting}>
        {isSubmitting ? loadingLabel : idleLabel}
      </button>
      <span className="muted">{helperText}</span>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
