'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConsultationAction, ConsultationOwnerRole } from '@/lib/consultation-center/types'
import { getConsultationClientMessage } from '@/lib/consultation-center/messages'

function ownerLabel(value: ConsultationOwnerRole) {
  if (value === 'user') return 'Kullanıcı işi'
  if (value === 'tech_agent') return 'Teknik ajan işi'
  return 'Ortak karar'
}

function statusLabel(value: 'open' | 'done') {
  return value === 'done' ? 'tamamlandı' : 'açık'
}

export function ActionStatusList({ consultationId, actions }: { consultationId: string; actions: ConsultationAction[] }) {
  const router = useRouter()
  const [busyId, setBusyId] = useState<string | null>(null)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleToggle = async (actionId: string, status: 'open' | 'done') => {
    setBusyId(actionId)
    setErrorText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultationId)}/actions/${encodeURIComponent(actionId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      const json = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(json.message || 'Aksiyon güncellenemedi')
      }
      router.refresh()
    } catch (error: unknown) {
      setErrorText(getConsultationClientMessage(error, 'Aksiyon güncellenemedi'))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="card stack-sm">
      <h3>Sonuçtan çıkan aksiyonlar</h3>
      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      <ul className="list">
        {actions.map((action) => {
          const nextStatus = action.status === 'done' ? 'open' : 'done'
          const buttonText = action.status === 'done' ? 'Yeniden aç' : 'Tamamlandı olarak işaretle'
          return (
            <li key={action.id}>
              <div className="stack-xs">
                <strong>{action.title}</strong>
                <span className="muted">{ownerLabel(action.ownerRole)} / {statusLabel(action.status)}</span>
                <div>
                  <button type="button" className="button-secondary" disabled={busyId === action.id} onClick={() => handleToggle(action.id, nextStatus)}>
                    {busyId === action.id ? 'Güncelleniyor...' : buttonText}
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
