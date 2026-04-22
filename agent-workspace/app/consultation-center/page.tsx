import { AdminShell } from '@/components/admin/AdminShell'
import { ConsultationDetailEditor } from '@/components/consultation-center/ConsultationDetailEditor'
import { ConsultationInboxList } from '@/components/consultation-center/ConsultationInboxList'
import { PromptPreparationEffect } from '@/components/consultation-center/PromptPreparationEffect'
import { PromptPreviewCard } from '@/components/consultation-center/PromptPreviewCard'
import { QuickCreateForm } from '@/components/consultation-center/QuickCreateForm'
import { ResponseCaptureForm } from '@/components/consultation-center/ResponseCaptureForm'
import { buildPromptSummary } from '@/lib/consultation-center/prompt'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'

function promptStatusLabel(value: 'preparing' | 'ready' | 'error') {
  if (value === 'ready') return 'Prompt hazır'
  if (value === 'error') return 'Prompt hatası'
  return 'Prompt hazırlanıyor'
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
  const promptSummary = selected ? buildPromptSummary({ title: selected.title, sharedBrief: selected.sharedBrief }) : []

  return (
    <AdminShell
      title="Consultation Center"
      description="Metni yaz, promptu al, GPT cevabını işle, kararı çıkar. Sade V1 akışı budur."
    >
      <section>
        <QuickCreateForm />
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <ConsultationInboxList items={payload.inbox} selectedId={selected?.id} />

        {selected ? (
          <article className="stack-sm">
            <section className="card stack-sm">
              <div>
                <p className="eyebrow">Seçili kayıt</p>
                <h3>{selected.title}</h3>
                <p className="muted">Prompt durumu: {promptStatusLabel(selected.promptStatus)}</p>
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

            <PromptPreparationEffect
              consultationId={selected.id}
              title={selected.title}
              summary={selected.summary}
              targetModel={selected.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'}
              promptStatus={selected.promptStatus}
              promptText={selected.promptRun.promptText}
            />

            <ConsultationDetailEditor consultation={selected} />

            <PromptPreviewCard
              promptText={selected.promptRun.promptText}
              fallbackText="Kayıt açılınca prompt otomatik oluşur. Metni veya modeli değiştirirsen buradaki prompt yeniden kurulur."
              targetModel={selected.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'}
              promptSummary={promptSummary}
              promptStatus={selected.promptStatus}
              promptError={selected.promptError}
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
