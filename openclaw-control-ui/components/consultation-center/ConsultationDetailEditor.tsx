'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConsultationContextRef, ConsultationDetail, ConsultationStage } from '@/lib/consultation-center/types'

const STAGE_OPTIONS: Array<{ value: ConsultationStage; label: string }> = [
  { value: 'draft', label: 'Taslak' },
  { value: 'clarifying', label: 'Netleştiriliyor' },
  { value: 'goal_set', label: 'Hedef net' },
  { value: 'context_ready', label: 'Bağlam hazır' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'internal', label: 'İçeride çöz' },
  { value: 'external', label: 'Dış danışma' },
  { value: 'ready_to_send', label: 'Gönderime hazır' },
  { value: 'answered', label: 'Cevap geldi' },
  { value: 'actioned', label: 'Aksiyona döndü' },
]

function parseList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function formatList(value?: string | string[] | null) {
  if (Array.isArray(value)) return value.join('\n')
  return value || ''
}

function formatContextRefs(refs: ConsultationContextRef[]) {
  return refs.map((ref) => `${ref.kind} | ${ref.title} | ${ref.ref}`).join('\n')
}

function parseContextRefs(value: string): ConsultationContextRef[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [kindRaw, titleRaw, refRaw] = line.split('|').map((part) => part.trim())
      const kind: ConsultationContextRef['kind'] = kindRaw === 'heartbeat' || kindRaw === 'decision' || kindRaw === 'project' || kindRaw === 'roadmap' ? kindRaw : 'project'
      return {
        kind,
        title: titleRaw || refRaw || 'Ref',
        ref: refRaw || titleRaw || '',
      }
    })
    .filter((item) => item.ref)
}

export function ConsultationDetailEditor({ consultation }: { consultation: ConsultationDetail }) {
  const router = useRouter()
  const [title, setTitle] = useState(consultation.title)
  const [summary, setSummary] = useState(consultation.summary)
  const [decisionQuestion, setDecisionQuestion] = useState(consultation.decisionQuestion)
  const [whyNow, setWhyNow] = useState(consultation.whyNow)
  const [desiredOutput, setDesiredOutput] = useState(consultation.desiredOutput)
  const [stage, setStage] = useState<ConsultationStage>(consultation.stage)
  const [contextRefsText, setContextRefsText] = useState(formatContextRefs(consultation.contextRefs))
  const [segment, setSegment] = useState(String(consultation.businessBrief?.segment || ''))
  const [region, setRegion] = useState(String(consultation.businessBrief?.region || ''))
  const [affectedModule, setAffectedModule] = useState(formatList(consultation.technicalBrief?.affectedModule))
  const [currentProblem, setCurrentProblem] = useState(String(consultation.technicalBrief?.currentProblem || ''))
  const [kararCekirdegi, setKararCekirdegi] = useState(String(consultation.sharedBrief?.kararCekirdegi || ''))
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [successText, setSuccessText] = useState<string | null>(null)

  useEffect(() => {
    setTitle(consultation.title)
    setSummary(consultation.summary)
    setDecisionQuestion(consultation.decisionQuestion)
    setWhyNow(consultation.whyNow)
    setDesiredOutput(consultation.desiredOutput)
    setStage(consultation.stage)
    setContextRefsText(formatContextRefs(consultation.contextRefs))
    setSegment(String(consultation.businessBrief?.segment || ''))
    setRegion(String(consultation.businessBrief?.region || ''))
    setAffectedModule(formatList(consultation.technicalBrief?.affectedModule))
    setCurrentProblem(String(consultation.technicalBrief?.currentProblem || ''))
    setKararCekirdegi(String(consultation.sharedBrief?.kararCekirdegi || ''))
    setErrorText(null)
    setSuccessText(null)
  }, [consultation])

  const handleSuggest = async () => {
    setBusy(true)
    setErrorText(null)
    setSuccessText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, summary }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Akıllı brief önerisi üretilemedi')
      }

      setSuccessText('Akıllı brief önerisi uygulandı')
      router.refresh()
    } catch (error: any) {
      setErrorText(error?.message || 'Akıllı brief önerisi üretilemedi')
    } finally {
      setBusy(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)
    setSuccessText(null)

    try {
      const payload: Record<string, unknown> = {
        title,
        summary,
        decisionQuestion,
        whyNow,
        desiredOutput,
        stage,
        contextRefs: parseContextRefs(contextRefsText),
      }

      if (consultation.type === 'sales') {
        payload.businessBrief = {
          ...(consultation.businessBrief || {}),
          segment: segment.trim(),
          region: region.trim(),
        }
      }

      if (consultation.type === 'technical') {
        payload.technicalBrief = {
          ...(consultation.technicalBrief || {}),
          affectedModule: parseList(affectedModule),
          currentProblem: currentProblem.trim(),
        }
      }

      if (consultation.type === 'shared') {
        payload.sharedBrief = {
          ...(consultation.sharedBrief || {}),
          kararCekirdegi: kararCekirdegi.trim(),
        }
      }

      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Consultation kaydı güncellenemedi')
      }

      setSuccessText('Kaydedildi')
      router.refresh()
    } catch (error: any) {
      setErrorText(error?.message || 'Consultation kaydı güncellenemedi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">Detail editor</p>
        <h3>Brief'i düzenle</h3>
        <p className="muted">Yeni kayıt açılınca sistem ilk brief taslağını önerir. İstersen tek tuşla daha akıllı öneri uygulayıp sonra düzenleyebilirsin.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Başlık</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Özet / ham not</span>
        <textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={3} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Karar sorusu</span>
        <textarea value={decisionQuestion} onChange={(event) => setDecisionQuestion(event.target.value)} rows={3} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Neden şimdi</span>
        <textarea value={whyNow} onChange={(event) => setWhyNow(event.target.value)} rows={3} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Beklenen çıktı</span>
        <textarea value={desiredOutput} onChange={(event) => setDesiredOutput(event.target.value)} rows={3} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Stage</span>
        <select value={stage} onChange={(event) => setStage(event.target.value as ConsultationStage)}>
          {STAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Context pack (her satır: kind | title | ref)</span>
        <textarea value={contextRefsText} onChange={(event) => setContextRefsText(event.target.value)} rows={4} />
      </label>

      {consultation.type === 'sales' ? (
        <>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Segment</span>
            <input value={segment} onChange={(event) => setSegment(event.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Bölge</span>
            <input value={region} onChange={(event) => setRegion(event.target.value)} />
          </label>
        </>
      ) : null}

      {consultation.type === 'technical' ? (
        <>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Etkilenen modül (satır satır)</span>
            <textarea value={affectedModule} onChange={(event) => setAffectedModule(event.target.value)} rows={4} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Mevcut problem</span>
            <textarea value={currentProblem} onChange={(event) => setCurrentProblem(event.target.value)} rows={3} />
          </label>
        </>
      ) : null}

      {consultation.type === 'shared' ? (
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Karar çekirdeği</span>
          <textarea value={kararCekirdegi} onChange={(event) => setKararCekirdegi(event.target.value)} rows={3} />
        </label>
      ) : null}

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {successText ? <p className="muted" style={{ color: 'var(--accent-700)' }}>{successText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" className="button-secondary" disabled={busy || !title.trim()} onClick={handleSuggest}>
          {busy ? 'Çalışıyor...' : 'Akıllı brief geliştir'}
        </button>
        <button type="submit" className="button-primary" disabled={busy}>
          {busy ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  )
}
