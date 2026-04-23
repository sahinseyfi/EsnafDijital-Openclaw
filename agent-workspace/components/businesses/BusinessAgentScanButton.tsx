'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function BusinessAgentScanButton({
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
      const response = await fetch(`/api/businesses/${businessId}/agent-scan`, {
        method: 'POST',
      })

      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Ajan tarama başarısız oldu.')
      }

      setMessage('Ajan tarama tamamlandı')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Ajan tarama başarısız oldu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs" style={{ alignItems: 'flex-end' }}>
      <button type="button" className="button-secondary" onClick={handleClick} disabled={isSubmitting}>
        {isSubmitting ? 'Ajan tarama çalışıyor...' : 'Ajan taramayı başlat'}
      </button>
      <span className="muted">Skill çizgisine göre tek işletme için kısa operasyon özeti üretir.</span>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
