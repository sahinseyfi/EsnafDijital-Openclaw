'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConsultationDetail } from '@/lib/consultation-center/types'
import { getConsultationClientMessage } from '@/lib/consultation-center/messages'

export function ActionCreateForm({ consultation }: { consultation: ConsultationDetail }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [ownerRole, setOwnerRole] = useState<ConsultationDetail['ownerRole']>(consultation.ownerRole)
  const [linkedEntityType, setLinkedEntityType] = useState<'project_os' | 'context_center'>('project_os')
  const [linkedEntityId, setLinkedEntityId] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)

    try {
      const response = await fetch(`/api/prompt-uretimi/${encodeURIComponent(consultation.id)}/actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          ownerRole,
          linkedEntityType,
          linkedEntityId,
        }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Aksiyon eklenemedi')
      }

      setTitle('')
      setLinkedEntityId('')
      router.refresh()
    } catch (error: unknown) {
      setErrorText(getConsultationClientMessage(error, 'Aksiyon eklenemedi'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">Sonuçtan aksiyon üret</p>
        <h3>Yeni aksiyon</h3>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Aksiyon başlığı</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Örn: teklif v1 paket sınırlarını yaz" />
      </label>

      <div className="grid-2">
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Sahiplik</span>
          <select value={ownerRole} onChange={(event) => setOwnerRole(event.target.value as ConsultationDetail['ownerRole'])}>
            <option value="shared">Ortak karar</option>
            <option value="user">Kullanıcı işi</option>
            <option value="tech_agent">Teknik ajan işi</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Yazılacağı yer</span>
          <select value={linkedEntityType} onChange={(event) => setLinkedEntityType(event.target.value as 'project_os' | 'context_center')}>
            <option value="project_os">İşletmeler</option>
            <option value="context_center">Bağlam Merkezi</option>
          </select>
        </label>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Hedef kayıt kimliği (isteğe bağlı)</span>
        <input value={linkedEntityId} onChange={(event) => setLinkedEntityId(event.target.value)} placeholder="Örn: offer-v1" />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-secondary" disabled={busy || !title.trim()}>
          {busy ? 'Ekleniyor...' : 'Aksiyon ekle'}
        </button>
      </div>
    </form>
  )
}
