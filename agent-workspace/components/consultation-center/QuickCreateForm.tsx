'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function QuickCreateForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'sales' | 'technical' | 'shared'>('shared')
  const [workMode, setWorkMode] = useState<'audit' | 'patch' | 'strategy' | 'decision'>('decision')
  const [targetSurface, setTargetSurface] = useState<'public_vitrine' | 'admin_ops' | 'context_docs' | 'cross'>('cross')
  const [outputType, setOutputType] = useState<'decision_summary' | 'action_plan' | 'patch_plan' | 'gpt_prompt'>('action_plan')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)

    try {
      const response = await fetch('/api/consultation-center', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, type, note, workMode, targetSurface, outputType }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Consultation oluşturulamadı')
      }

      const createdId = json?.created?.id
      if (!createdId) {
        throw new Error('Yeni kayıt id dönmedi')
      }

      setTitle('')
      setNote('')
      router.replace(`/consultation-center?selectedId=${encodeURIComponent(createdId)}`)
      router.refresh()
    } catch (error: any) {
      setErrorText(error?.message || 'Consultation oluşturulamadı')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
      <div>
        <p className="eyebrow">Quick create</p>
        <h3>Yeni consultation aç</h3>
        <p className="muted">Başlığı, ham notu ve mini brief yönünü bırak. Sistem ilk taslağı biraz daha net kursun, istersen detay ekranında güçlendir.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Başlık</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Örn: İlk teklif paketlerini sadeleştir" />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Tip</span>
        <select value={type} onChange={(event) => setType(event.target.value as 'sales' | 'technical' | 'shared')}>
          <option value="shared">Ortak karar</option>
          <option value="sales">Saha / satış</option>
          <option value="technical">Teknik</option>
        </select>
      </label>

      <div className="grid-3" style={{ gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>İş modu</span>
          <select value={workMode} onChange={(event) => setWorkMode(event.target.value as 'audit' | 'patch' | 'strategy' | 'decision')}>
            <option value="decision">Karar</option>
            <option value="audit">Audit</option>
            <option value="patch">Küçük patch</option>
            <option value="strategy">Strateji</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Hedef yüzey</span>
          <select value={targetSurface} onChange={(event) => setTargetSurface(event.target.value as 'public_vitrine' | 'admin_ops' | 'context_docs' | 'cross')}>
            <option value="cross">Çapraz</option>
            <option value="public_vitrine">Public vitrin</option>
            <option value="admin_ops">Admin / operasyon</option>
            <option value="context_docs">Context / docs</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Çıktı tipi</span>
          <select value={outputType} onChange={(event) => setOutputType(event.target.value as 'decision_summary' | 'action_plan' | 'patch_plan' | 'gpt_prompt')}>
            <option value="action_plan">Aksiyon planı</option>
            <option value="decision_summary">Karar özeti</option>
            <option value="patch_plan">Patch planı</option>
            <option value="gpt_prompt">GPT promptu</option>
          </select>
        </label>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Ham not</span>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={5} placeholder="Dağınık notu bırak, sonra netleştir." />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-primary" disabled={busy}>
          {busy ? 'Oluşturuluyor...' : 'Consultation oluştur'}
        </button>
      </div>
    </form>
  )
}
