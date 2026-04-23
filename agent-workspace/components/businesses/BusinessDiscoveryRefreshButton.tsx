'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function BusinessDiscoveryRefreshButton({
  businessId,
  idleLabel = 'Detaylı işletme verilerini al',
  loadingLabel = 'Yenileniyor...',
  successLabel = 'Dış veri yenilendi',
  helperText,
}: {
  businessId: string
  idleLabel?: string
  loadingLabel?: string
  successLabel?: string
  helperText?: string
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleClick() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/businesses/${businessId}/refresh-discovery`, {
        method: 'POST',
      })

      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Dış veri yenilemesi başarısız oldu.')
      }

      setMessage(successLabel)
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Dış veri yenilemesi başarısız oldu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs" style={{ alignItems: 'flex-end' }}>
      <button type="button" className="button-secondary" onClick={handleClick} disabled={isSubmitting}>
        {isSubmitting ? loadingLabel : idleLabel}
      </button>
      {helperText ? <span className="muted">{helperText}</span> : null}
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
