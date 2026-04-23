'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function BusinessYzReportButton({
  businessId,
}: {
  businessId: string
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

      setMessage('Y.Z raporu hazır')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Y.Z raporu oluşturulamadı.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs" style={{ alignItems: 'flex-end' }}>
      <button type="button" className="button-secondary" onClick={handleClick} disabled={isSubmitting}>
        {isSubmitting ? 'Y.Z raporu hazırlanıyor...' : 'Rapor oluştur'}
      </button>
      <span className="muted">Ajan tarama, Apify tarama ve notları birleştirip kısa rapor üretir.</span>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
