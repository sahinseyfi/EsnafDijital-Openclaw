import { AdminShell } from '@/components/admin/AdminShell'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'

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

export default async function ConsultationCenterPage() {
  const payload = await getConsultationCenterPayload()
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
        <article className="card">
          <div className="stack-sm">
            <div>
              <p className="eyebrow">Consultation Inbox</p>
              <h3>Açık kayıtlar</h3>
            </div>
            <div className="stack-sm">
              {payload.inbox.map((item) => (
                <div key={item.id} className="card" style={{ padding: 16, borderStyle: selected?.id === item.id ? 'solid' : 'dashed' }}>
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
                </div>
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
                <h3>Brief</h3>
                {renderRecord(selected.businessBrief)}
                {renderRecord(selected.technicalBrief)}
                {renderRecord(selected.sharedBrief)}
              </div>
              <div className="card stack-sm">
                <h3>Prompt / sonuç</h3>
                <p className="muted">{selected.promptRun.responseSummary || routeLabel(selected.route)}</p>
                {selected.promptRun.promptText ? (
                  <pre className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{selected.promptRun.promptText}</pre>
                ) : (
                  <p className="muted">Bu kayıt için GPT Pro prompt'u gerekmiyor.</p>
                )}
              </div>
            </section>

            <section className="card stack-sm">
              <h3>Sonuçtan çıkan aksiyonlar</h3>
              <ul className="list">
                {selected.actions.map((action) => (
                  <li key={action.id}>{action.title} ({ownerLabel(action.ownerRole)} / {action.status})</li>
                ))}
              </ul>
            </section>
          </article>
        ) : null}
      </section>
    </AdminShell>
  )
}
