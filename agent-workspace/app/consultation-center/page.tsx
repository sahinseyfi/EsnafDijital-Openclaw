import { AdminShell } from '@/components/admin/AdminShell'
import { ConsultationDetailEditor } from '@/components/consultation-center/ConsultationDetailEditor'
import { ConsultationInboxList } from '@/components/consultation-center/ConsultationInboxList'
import { PromptPreviewCard } from '@/components/consultation-center/PromptPreviewCard'
import { QuickCreateForm } from '@/components/consultation-center/QuickCreateForm'
import { ResponseCaptureForm } from '@/components/consultation-center/ResponseCaptureForm'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'

function stageLabel(value: string) {
  const labels: Record<string, string> = {
    draft: 'Taslak',
    clarifying: 'Netleşiyor',
    goal_set: 'Hazırlanıyor',
    context_ready: 'Prompt hazır',
    blocked: 'Eksik var',
    internal: 'İçeride çöz',
    external: 'GPT ile düşün',
    ready_to_send: 'Gönderime hazır',
    answered: 'Cevap geldi',
    actioned: 'Karar çıktı',
  }
  return labels[value] || value
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
  const decisionNote = String(selected?.sharedBrief?.kararNotu || '')

  return (
    <AdminShell
      title="Consultation Center"
      description="Metni yaz, promptu al, GPT cevabını işle, kararı çıkar."
    >
      <section className="grid-2" style={{ alignItems: 'start' }}>
        <QuickCreateForm />
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Akış</p>
            <h3>Bu sayfa artık tek iş yapıyor</h3>
          </div>
          <ol className="list">
            <li>Yapmak istediğin değişikliği düz metin yaz</li>
            <li>Sistem bunu GPT-5 promptuna çevirsin</li>
            <li>Gelen cevabı yapıştır ve çıkan kararı kaydet</li>
          </ol>
          <p className="muted">Başka meta akış, route yorumu ve gereksiz panel yok.</p>
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
                <p className="muted">Durum: {stageLabel(selected.stage)}</p>
              </div>
              {decisionNote ? (
                <div className="card stack-xs">
                  <strong>Son karar</strong>
                  <p className="muted">{decisionNote}</p>
                </div>
              ) : (
                <p className="muted">Henüz karar kaydedilmedi.</p>
              )}
            </section>

            <ConsultationDetailEditor consultation={selected} />

            <PromptPreviewCard
              promptText={selected.promptRun.promptText}
              fallbackText="Metni kaydet ve promptu yenile. Sistem burada GPT-5 için kullanıma hazır prompt gösterecek."
            />

            <ResponseCaptureForm consultation={selected} />
          </article>
        ) : (
          <article className="card stack-sm">
            <h3>Bir kayıt seç</h3>
            <p className="muted">Soldan bir kayıt seç veya yukarıdan yeni bir metin girerek başla.</p>
          </article>
        )}
      </section>
    </AdminShell>
  )
}
