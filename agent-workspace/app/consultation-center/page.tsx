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
      title: 'Prompt gerekmiyor',
      text: 'Bu kayıt için önce iç aksiyon veya küçük patch hattı daha doğru görünüyor.',
    }
  }

  if (detail.missingFields.length > 0) {
    return {
      showPrompt: false,
      title: 'Prompt için henüz erken',
      text: `Önce şu alanları kapat: ${detail.missingFields.join(', ')}`,
    }
  }

  return {
    showPrompt: true,
    title: 'Prompt hazır',
    text: 'Brief ve bağlam yeterince net. İstersen promptu gözden geçirip GPT Pro oturumuna taşı.',
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

  const routeStats = {
    blocked: payload.inbox.filter((item) => item.route === 'blocked').length,
    internal: payload.inbox.filter((item) => item.route === 'internal').length,
    external: payload.inbox.filter((item) => item.route === 'external').length,
  }

  const stageStats = {
    readyToSend: payload.inbox.filter((item) => item.stage === 'ready_to_send').length,
    answered: payload.inbox.filter((item) => item.stage === 'answered').length,
    actioned: payload.inbox.filter((item) => item.stage === 'actioned').length,
  }

  return (
    <AdminShell
      title="Consultation Center"
      description="Karar brief’i, danışma filtresi ve sonuç route katmanı. Context Center hafıza, Project OS uygulama, burası karar hazırlığı."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Karar hazırlama katmanı</p>
          <h1>Consultation Center</h1>
          <p className="muted">Önce konu seç, sonra brief’i netleştir, gerekiyorsa prompt üret ve sonucu aksiyona çevir.</p>
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

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{routeStats.blocked}</strong>
          <p className="muted">önce netleşmesi gereken kayıt</p>
        </article>
        <article className="card stat-card">
          <strong>{routeStats.internal}</strong>
          <p className="muted">içeride çözülebilir kayıt</p>
        </article>
        <article className="card stat-card">
          <strong>{routeStats.external}</strong>
          <p className="muted">dış danışmaya uygun kayıt</p>
        </article>
        <article className="card stat-card">
          <strong>{stageStats.readyToSend + stageStats.answered + stageStats.actioned}</strong>
          <p className="muted">gönderim sonrası ilerleyen kayıt</p>
        </article>
      </section>

      <section className="grid-3">
        <article className="card">
          <h3>Route akışı</h3>
          <ul className="list">
            <li>Blocked: brief veya bağlam eksik</li>
            <li>Internal: dış danışma gerekmeden içeride çözülebilir</li>
            <li>External: prompt üretip GPT Pro akışına gönderilebilir</li>
          </ul>
        </article>
        <article className="card">
          <h3>Gönderim hattı</h3>
          <ul className="list">
            <li>{stageStats.readyToSend} kayıt gönderime hazır</li>
            <li>{stageStats.answered} kayıt cevap aldı</li>
            <li>{stageStats.actioned} kayıt aksiyona döndü</li>
          </ul>
        </article>
        <article className="card">
          <h3>Kırmızı çizgi</h3>
          <ul className="list">
            <li>Consultation Center not çöplüğü değildir</li>
            <li>Prompt üretimi amaç değil, doğru route amaç</li>
            <li>İş çıkarsa Project OS veya Context Center’a bağlanır</li>
          </ul>
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

            <section className="card stack-sm">
              <h3>Karar özeti</h3>
              <ul className="list">
                <li>Özet: {selected.summary || 'Henüz özet yok'}</li>
                <li>Karar sorusu: {selected.decisionQuestion || 'Henüz yazılmadı'}</li>
                <li>Neden şimdi: {selected.whyNow || 'Henüz yazılmadı'}</li>
                <li>İstenen çıktı: {selected.desiredOutput || 'Henüz yazılmadı'}</li>
              </ul>
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

            <AccordionSection title="Detayı düzenle" note="Başlık, brief ve alanları düzenlemek için aç.">
              <ConsultationDetailEditor consultation={selected} />
            </AccordionSection>

            <AccordionSection title="Bağlam paketi" note="Sadece gerektiğinde aç, önce karar ve sonraki adımı netleştir.">
              <ul className="list">
                {selected.contextRefs.length > 0 ? selected.contextRefs.map((ref) => (
                  <li key={`${ref.kind}-${ref.ref}`}>{ref.title} ({ref.ref})</li>
                )) : <li>Henüz bağlam eklenmemiş</li>}
              </ul>
            </AccordionSection>

            {selectedPromptStatus ? (
              <section className="card stack-sm">
                <h3>{selectedPromptStatus.title}</h3>
                <p className="muted">{selectedPromptStatus.text}</p>
              </section>
            ) : null}

            {selectedPromptStatus?.showPrompt ? (
              <AccordionSection title="Prompt preview" note="Varsayılan kapalı. Önce karar özeti ve sonraki adımı kontrol et.">
                <PromptPreviewCard
                  promptText={selected.promptRun.promptText}
                  fallbackText={selected.promptRun.responseSummary || routeLabel(selected.route)}
                />
              </AccordionSection>
            ) : null}

            <AccordionSection title="Sonuç kaydı" note="Cevap geldiyse aç, kısa özetle işle.">
              <ResponseCaptureForm consultation={selected} />

              <section className="card stack-sm">
                <h3>Run durumu</h3>
                <ul className="list">
                  <li>Model: {selected.promptRun.modelName || '—'}</li>
                  <li>Gönderim: {selected.promptRun.sentAt || 'Henüz kaydedilmedi'}</li>
                  <li>Özet: {selected.promptRun.responseSummary || 'Henüz kaydedilmedi'}</li>
                </ul>
              </section>
            </AccordionSection>

            <AccordionSection title="Mevcut brief" note="Ham brief alanlarını görmek için aç.">
              {renderRecord(selected.businessBrief)}
              {renderRecord(selected.technicalBrief)}
              {renderRecord(selected.sharedBrief)}
            </AccordionSection>

            <AccordionSection title="Aksiyonlar" note="Sonuçtan iş üretmek veya açık aksiyonları takip etmek için aç.">
              <ActionCreateForm consultation={selected} />
              <ActionStatusList consultationId={selected.id} actions={selected.actions} />
            </AccordionSection>
          </article>
        ) : null}
      </section>
    </AdminShell>
  )
}
