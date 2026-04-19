import { AdminShell } from '@/components/admin/AdminShell'
import { ActionCreateForm } from '@/components/consultation-center/ActionCreateForm'
import { ConsultationDetailEditor } from '@/components/consultation-center/ConsultationDetailEditor'
import { PromptPreviewCard } from '@/components/consultation-center/PromptPreviewCard'
import { QuickCreateForm } from '@/components/consultation-center/QuickCreateForm'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'
import Link from 'next/link'

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

  return (
    <AdminShell
      title="Consultation Center"
      description="Karar brief'i, danışma filtresi ve sonuç route katmanı. Context Center hafıza, Project OS uygulama, burası karar hazırlığı."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Karar hazırlama katmanı</p>
          <h1>Consultation Center v1</h1>
          <p className="muted">Dağınık notu karar brief'ine çevir, gerekirse GPT Pro prompt'u üret, sonucu tekrar işe bağla.</p>
        </div>
      </section>

      <section className="grid-3">
        <article className="card">
          <h3>Inbox</h3>
          <strong>{payload.inbox.length}</strong>
          <p className="muted">Açık consultation kaydı</p>
        </article>
        <article className="card">
          <h3>GPT Pro açılabilir</h3>
          <strong>{payload.inbox.filter((item) => item.gptRecommended).length}</strong>
          <p className="muted">Minimum brief'i tamamlanmış ve dış danışmaya uygun kayıt</p>
        </article>
        <article className="card">
          <h3>İçeride çözülecek</h3>
          <strong>{payload.inbox.filter((item) => item.route === 'internal').length}</strong>
          <p className="muted">Doğrudan teknik veya operasyon işi olarak ilerleyebilecek kayıt</p>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <QuickCreateForm />
        <article className="card">
          <p className="eyebrow">Route mantığı</p>
          <h3>Bu ekran ne yapıyor?</h3>
          <ul className="list">
            <li>Dağınık konuyu karar brief'ine çevirir</li>
            <li>Blocked / internal / external filtresi uygular</li>
            <li>Gerekirse GPT Pro prompt'u üretir</li>
            <li>Sonucu kullanıcı işi, teknik iş veya ortak karara bağlar</li>
          </ul>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card">
          <div className="stack-sm">
            <div>
              <p className="eyebrow">Consultation Inbox</p>
              <h3>Açık kayıtlar</h3>
            </div>
            <div className="stack-sm">
              {payload.inbox.map((item) => (
                <Link key={item.id} href={`/consultation-center?selectedId=${encodeURIComponent(item.id)}`} className="card" style={{ padding: 16, borderStyle: selected?.id === item.id ? 'solid' : 'dashed', display: 'block' }}>
                  <div className="stack-xs">
                    <strong>{item.title}</strong>
                    <p className="muted">{item.summary}</p>
                  </div>
                  <div className="stack-xs muted" style={{ marginTop: 10 }}>
                    <span>Tip: {sectionTitle(item.type)}</span>
                    <span>Stage: {stageLabel(item.stage)}</span>
                    <span>Route: {routeLabel(item.route)}</span>
                    <span>Sahiplik: {ownerLabel(item.ownerRole)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>

        {selected ? (
          <article className="card stack-sm">
            <div>
              <p className="eyebrow">Consultation Detail</p>
              <h3>{selected.title}</h3>
              <p className="muted">{selected.decisionQuestion}</p>
            </div>

            <section className="grid-2">
              <div className="card">
                <h3>Karar çekirdeği</h3>
                <ul className="list">
                  <li>Tip: {sectionTitle(selected.type)}</li>
                  <li>Stage: {stageLabel(selected.stage)}</li>
                  <li>Route: {routeLabel(selected.route)}</li>
                  <li>Sahiplik: {ownerLabel(selected.ownerRole)}</li>
                  <li>Beklenen çıktı: {selected.desiredOutput}</li>
                </ul>
              </div>
              <div className="card">
                <h3>Bağlam paketi</h3>
                <ul className="list">
                  {selected.contextRefs.map((ref) => (
                    <li key={`${ref.kind}-${ref.ref}`}>{ref.title} ({ref.ref})</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid-2">
              <div className="card stack-sm">
                <h3>Route kararı</h3>
                <strong>{routeLabel(selected.route)}</strong>
                <p className="muted">{routeText(selected.route)}</p>
              </div>
              <div className="card stack-sm">
                <h3>Eksik alan kontrolü</h3>
                {selected.missingFields.length > 0 ? (
                  <ul className="list">
                    {selected.missingFields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="muted">Minimum brief tamam. Bu kayıt karar üretimine hazır.</p>
                )}
              </div>
            </section>

            <section className="grid-2">
              <ConsultationDetailEditor consultation={selected} />
              <PromptPreviewCard
                promptText={selected.promptRun.promptText}
                fallbackText={selected.promptRun.responseSummary || routeLabel(selected.route)}
              />
            </section>

            <section className="card stack-sm">
              <h3>Mevcut brief görünümü</h3>
              {renderRecord(selected.businessBrief)}
              {renderRecord(selected.technicalBrief)}
              {renderRecord(selected.sharedBrief)}
            </section>

            <section className="grid-2">
              <ActionCreateForm consultation={selected} />
              <div className="card stack-sm">
                <h3>Sonuçtan çıkan aksiyonlar</h3>
                <ul className="list">
                  {selected.actions.map((action) => (
                    <li key={action.id}>{action.title} ({ownerLabel(action.ownerRole)} / {action.status})</li>
                  ))}
                </ul>
              </div>
            </section>
          </article>
        ) : null}
      </section>
    </AdminShell>
  )
}
