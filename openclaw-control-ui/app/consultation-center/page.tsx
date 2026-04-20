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
import { getConsultationNextSteps } from '@/lib/consultation-center/workflow'

function sectionTitle(value: string) {
  if (value === 'sales') return 'Saha / satış'
  if (value === 'technical') return 'Teknik'
  return 'Ortak karar'
}

function stageLabel(value: string) {
  const labels: Record<string, string> = {
    draft: 'Taslak',
    clarifying: 'Netleştiriliyor',
    goal_set: 'Hedef net',
    context_ready: 'Bağlam hazır',
    blocked: 'Blocked',
    internal: 'İçeride çöz',
    external: 'Dış danışma',
    ready_to_send: 'Gönderime hazır',
    answered: 'Cevap geldi',
    actioned: 'Aksiyona döndü',
  }
  return labels[value] || value
}

function routeLabel(value: string) {
  if (value === 'blocked') return 'Önce içeride netleştir'
  if (value === 'internal') return 'GPT Pro gerekmez'
  return 'GPT Pro aç'
}

function routeText(value: string) {
  if (value === 'blocked') return 'Bu konu henüz dış danışmaya hazır değil. Önce karar sorusu, bağlam ve beklenen çıktı netleşmeli.'
  if (value === 'internal') return 'Bu kayıt için dış danışma şart değil. Doğrudan iç aksiyon veya teknik uygulama açılabilir.'
  return 'Bu kayıt dış danışmaya uygun. Prompt preview hazırlandıktan sonra GPT Pro akışına gönderilebilir.'
}

function ownerLabel(value: string) {
  if (value === 'user') return 'Kullanıcı işi'
  if (value === 'tech_agent') return 'Teknik ajan işi'
  return 'Ortak karar'
}

function renderRecord(value: Record<string, string | string[] | null> | undefined) {
  if (!value) return null

  return (
    <div className="stack-sm">
      {Object.entries(value).map(([key, entry]) => (
        <div key={key} className="stack-xs">
          <strong>{key}</strong>
          {Array.isArray(entry) ? (
            <ul className="list">
              {entry.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : (
            <p className="muted">{entry || '—'}</p>
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
  const payload = await getConsultationCenterPayload(params?.selectedId)
  const selected = payload.selected
  const nextSteps = selected ? getConsultationNextSteps(selected) : null
  const progress = selected ? getConsultationProgress(selected) : null

  return (
    <AdminShell
      title="Consultation Center"
      description="Karar brief'i, danışma filtresi ve sonuç route katmanı. Context Center hafıza, Project OS uygulama, burası karar hazırlığı."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Karar hazırlama katmanı</p>
          <h1>Consultation Center</h1>
          <p className="muted">Önce konu seç, sonra brief'i netleştir, gerekiyorsa prompt üret ve sonucu aksiyona çevir.</p>
        </div>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <QuickCreateForm />
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Kısa özet</p>
            <h3>Bu ekranda tek akış var</h3>
          </div>
          <ul className="list">
            <li>{payload.inbox.length} açık kayıt</li>
            <li>{payload.inbox.filter((item) => item.gptRecommended).length} kayıt GPT Pro için hazır</li>
            <li>{payload.inbox.filter((item) => item.route === 'internal').length} kayıt içeride çözülebilir</li>
          </ul>
          <p className="muted">Mantık sade: seç, netleştir, gönder, sonucu işle.</p>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <ConsultationInboxList items={payload.inbox} selectedId={selected?.id} />

        {selected ? (
          <article className="card stack-sm">
            <div>
              <p className="eyebrow">Consultation Detail</p>
              <h3>{selected.title}</h3>
              <p className="muted">{selected.decisionQuestion}</p>
            </div>

            <section className="card stack-sm">
              <h3>Durum özeti</h3>
              <ul className="list">
                <li>Tip: {sectionTitle(selected.type)}</li>
                <li>Stage: {stageLabel(selected.stage)}</li>
                <li>Route: {routeLabel(selected.route)}</li>
                <li>Sahiplik: {ownerLabel(selected.ownerRole)}</li>
                <li>Beklenen çıktı: {selected.desiredOutput}</li>
                {progress ? <li>İlerleme: %{progress.percent} ({progress.completedSteps}/{progress.totalSteps})</li> : null}
              </ul>
              <p className="muted">{routeText(selected.route)}</p>
            </section>

            {selected.missingFields.length > 0 ? (
              <section className="card stack-sm">
                <h3>Önce tamamlanacaklar</h3>
                <ul className="list">
                  {selected.missingFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {nextSteps ? (
              <section className="card stack-sm">
                <h3>{nextSteps.title}</h3>
                <ul className="list">
                  {nextSteps.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <ConsultationDetailEditor consultation={selected} />

            <section className="card stack-sm">
              <h3>Bağlam paketi</h3>
              <ul className="list">
                {selected.contextRefs.length > 0 ? selected.contextRefs.map((ref) => (
                  <li key={`${ref.kind}-${ref.ref}`}>{ref.title} ({ref.ref})</li>
                )) : <li>Henüz bağlam eklenmemiş</li>}
              </ul>
            </section>

            <PromptPreviewCard
              promptText={selected.promptRun.promptText}
              fallbackText={selected.promptRun.responseSummary || routeLabel(selected.route)}
            />

            <ResponseCaptureForm consultation={selected} />

            <section className="card stack-sm">
              <h3>Run durumu</h3>
              <ul className="list">
                <li>Model: {selected.promptRun.modelName || '—'}</li>
                <li>Gönderim: {selected.promptRun.sentAt || 'Henüz kaydedilmedi'}</li>
                <li>Özet: {selected.promptRun.responseSummary || 'Henüz kaydedilmedi'}</li>
              </ul>
            </section>

            <section className="card stack-sm">
              <h3>Mevcut brief</h3>
              {renderRecord(selected.businessBrief)}
              {renderRecord(selected.technicalBrief)}
              {renderRecord(selected.sharedBrief)}
            </section>

            <ActionCreateForm consultation={selected} />
            <ActionStatusList consultationId={selected.id} actions={selected.actions} />
          </article>
        ) : null}
      </section>
    </AdminShell>
  )
}
