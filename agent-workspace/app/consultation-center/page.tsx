import type { ReactNode } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { ActionCreateForm } from '@/components/consultation-center/ActionCreateForm'
import { ActionStatusList } from '@/components/consultation-center/ActionStatusList'
import { ConsultationDetailEditor } from '@/components/consultation-center/ConsultationDetailEditor'
import { ConsultationInboxList } from '@/components/consultation-center/ConsultationInboxList'
import { PromptPreviewCard } from '@/components/consultation-center/PromptPreviewCard'
import { QuickCreateForm } from '@/components/consultation-center/QuickCreateForm'
import { ResponseCaptureForm } from '@/components/consultation-center/ResponseCaptureForm'
import { getConsultationProgress } from '@/lib/consultation-center/progress'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'
import type { ConsultationDetail } from '@/lib/consultation-center/types'
import { getConsultationNextSteps } from '@/lib/consultation-center/workflow'

function stageLabel(value: string) {
  const labels: Record<string, string> = {
    draft: 'Taslak',
    clarifying: 'Netleştiriliyor',
    goal_set: 'Hedef net',
    context_ready: 'Bağlam hazır',
    blocked: 'Önce netleştir',
    internal: 'İçeride çöz',
    external: 'Dış danışma',
    ready_to_send: 'Gönderime hazır',
    answered: 'Cevap geldi',
    actioned: 'Aksiyona döndü',
  }
  return labels[value] || value
}

function routeLabel(value: string) {
  if (value === 'blocked') return 'Önce netleştir'
  if (value === 'internal') return 'İçeride çöz'
  return 'GPT ile netleştir'
}

function routeText(value: string) {
  if (value === 'blocked') return 'Karar sorusu, beklenen çıktı veya bağlam daha net olmalı.'
  if (value === 'internal') return 'Bu kayıt dış danışma istemeden içeride çözülebilir.'
  return 'Bu kayıt GPT ile netleştirmeye uygun.'
}

function AccordionSection({
  title,
  note,
  defaultOpen = false,
  children,
}: {
  title: string
  note?: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  return (
    <details className="card accordion-card" open={defaultOpen}>
      <summary>
        <div>
          <strong>{title}</strong>
          {note ? <p className="muted">{note}</p> : null}
        </div>
      </summary>
      <div className="stack-sm accordion-body">{children}</div>
    </details>
  )
}

function promptStatus(detail: ConsultationDetail) {
  if (detail.route !== 'external') {
    return {
      showPrompt: false,
      title: 'Şimdilik prompt açma',
      text: 'Önce iç karar veya küçük uygulama adımını netleştir.',
    }
  }

  if (detail.missingFields.length > 0) {
    return {
      showPrompt: false,
      title: 'Şimdilik prompt açma',
      text: `Önce şu alanları kapat: ${detail.missingFields.join(', ')}`,
    }
  }

  return {
    showPrompt: true,
    title: 'Prompt açılabilir',
    text: 'Brief yeterince net. İstersen promptu kopyalayıp GPT oturumuna taşı.',
  }
}

function renderRecord(value: Record<string, unknown> | undefined) {
  if (!value) return null

  return (
    <div className="stack-sm">
      {Object.entries(value).map(([key, entry]) => (
        <div key={key} className="stack-xs">
          <strong>{key}</strong>
          {Array.isArray(entry) ? (
            <ul className="list">
              {entry.map((item, index) => <li key={`${key}-${index}`}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>)}
            </ul>
          ) : entry && typeof entry === 'object' ? (
            <pre className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{JSON.stringify(entry, null, 2)}</pre>
          ) : (
            <p className="muted">{typeof entry === 'string' && entry ? entry : '—'}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default async function ConsultationCenterPage({
  searchParams,
}: {
  searchParams?: Promise<{ selectedId?: string }>
}) {
  const params = await searchParams
  const selectedId = params?.selectedId
  const payload = await getConsultationCenterPayload(selectedId)
  const selected = payload.selected
  const nextSteps = selected ? getConsultationNextSteps(selected) : null
  const progress = selected ? getConsultationProgress(selected) : null
  const selectedPromptStatus = selected ? promptStatus(selected) : null

  return (
    <AdminShell
      title="Consultation Center"
      description="Karar hazırlığı. Konuyu seç, sonraki adımı netleştir, gerekiyorsa prompt aç, sonra sonucu aksiyona çevir."
    >
      <section className="grid-2" style={{ alignItems: 'start' }}>
        <QuickCreateForm />
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Nasıl kullanılır</p>
            <h3>Tek akış</h3>
          </div>
          <ol className="list">
            <li>Soldan kaydı seç</li>
            <li>Karar sorusunu ve sonraki adımı netleştir</li>
            <li>Gerekiyorsa prompt aç, sonra sonucu aksiyona çevir</li>
          </ol>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <ConsultationInboxList items={payload.inbox} selectedId={selected?.id} />

        {selected ? (
          <article className="stack-sm">
            <section className="card stack-sm">
              <div>
                <p className="eyebrow">Seçili kayıt</p>
                <h3>{selected.title}</h3>
                <p className="muted">{selected.decisionQuestion || 'Henüz karar sorusu yazılmadı.'}</p>
              </div>
              <ul className="list">
                <li>Aşama: {stageLabel(selected.stage)}</li>
                <li>Yön: {routeLabel(selected.route)}</li>
                {progress ? <li>İlerleme: %{progress.percent}</li> : null}
              </ul>
              <p className="muted">{routeText(selected.route)}</p>
            </section>

            {nextSteps ? (
              <section className="card stack-sm">
                <h3>Şimdi ne yapıyoruz?</h3>
                <p className="muted">{nextSteps.title}</p>
                <ul className="list">
                  {nextSteps.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="card stack-sm">
              <h3>Kısa karar özeti</h3>
              <ul className="list">
                <li>Özet: {selected.summary || 'Henüz yazılmadı'}</li>
                <li>Neden şimdi: {selected.whyNow || 'Henüz yazılmadı'}</li>
                <li>Beklenen çıktı: {selected.desiredOutput || 'Henüz yazılmadı'}</li>
              </ul>
            </section>

            {selected.missingFields.length > 0 ? (
              <section className="card stack-sm">
                <h3>Eksik olanlar</h3>
                <ul className="list">
                  {selected.missingFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {selectedPromptStatus ? (
              <section className="card stack-sm">
                <h3>{selectedPromptStatus.title}</h3>
                <p className="muted">{selectedPromptStatus.text}</p>
              </section>
            ) : null}

            {selectedPromptStatus?.showPrompt ? (
              <AccordionSection title="Prompt" note="Gerekiyorsa ac, kopyala ve dis oturuma tasi.">
                <PromptPreviewCard
                  promptText={selected.promptRun.promptText}
                  fallbackText={selected.promptRun.responseSummary || routeLabel(selected.route)}
                />
              </AccordionSection>
            ) : null}

            <AccordionSection title="Kaydı düzenle" note="Başlık, karar sorusu ve brief burada düzenlenir." defaultOpen>
              <ConsultationDetailEditor consultation={selected} />
            </AccordionSection>

            <AccordionSection title="Sonuç ve aksiyon" note="Cevabı kaydet, sonra iş çıkar.">
              <ResponseCaptureForm consultation={selected} />

              <section className="card stack-sm">
                <h3>Run durumu</h3>
                <ul className="list">
                  <li>Model: {selected.promptRun.modelName || '—'}</li>
                  <li>Gönderim: {selected.promptRun.sentAt || 'Henüz kaydedilmedi'}</li>
                  <li>Özet: {selected.promptRun.responseSummary || 'Henüz kaydedilmedi'}</li>
                </ul>
              </section>

              <ActionCreateForm consultation={selected} />
              <ActionStatusList consultationId={selected.id} actions={selected.actions} />
            </AccordionSection>

            <AccordionSection title="Bağlam ve brief detayları" note="Gerektiğinde aç. Varsayılan çalışma alanı değil.">
              <div className="stack-sm">
                <div>
                  <strong>Bağlam paketi</strong>
                  <ul className="list">
                    {selected.contextRefs.length > 0 ? selected.contextRefs.map((ref) => (
                      <li key={`${ref.kind}-${ref.ref}`}>{ref.title} ({ref.ref})</li>
                    )) : <li>Henüz bağlam eklenmemiş</li>}
                  </ul>
                </div>

                {renderRecord(selected.businessBrief)}
                {renderRecord(selected.technicalBrief)}
                {renderRecord(selected.sharedBrief)}
              </div>
            </AccordionSection>
          </article>
        ) : (
          <article className="card stack-sm">
            <h3>Bir kayıt seç</h3>
            <p className="muted">Soldan bir consultation seç. Bu alan tek bir kaydın karar hazırlığını göstermek için tasarlandı.</p>
          </article>
        )}
      </section>
    </AdminShell>
  )
}
