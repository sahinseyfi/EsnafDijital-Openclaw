import { AdminShell } from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'
import { ConsultationDetailEditor } from '@/components/consultation-center/ConsultationDetailEditor'
import { ConsultationInboxList } from '@/components/consultation-center/ConsultationInboxList'
import { PromptPreparationEffect } from '@/components/consultation-center/PromptPreparationEffect'
import { PromptPreviewCard } from '@/components/consultation-center/PromptPreviewCard'
import { QuickCreateForm } from '@/components/consultation-center/QuickCreateForm'
import { buildPromptSummary } from '@/lib/consultation-center/prompt'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'

function promptStatusLabel(value: 'preparing' | 'ready' | 'error') {
  if (value === 'ready') return 'Prompt hazır'
  if (value === 'error') return 'Promptta sorun var'
  return 'Prompt hazırlanıyor'
}

export default async function PromptUretimiPage({
  searchParams,
}: {
  searchParams?: Promise<{ selectedId?: string }>
}) {
  const params = await searchParams
  const selectedId = params?.selectedId
  const payload = await getConsultationCenterPayload(selectedId)
  const selected = payload.selected
  const promptSummary = selected ? buildPromptSummary({ title: selected.title, sharedBrief: selected.sharedBrief }) : []
  const primaryTask = typeof selected?.sharedBrief?.primaryTask === 'string' ? selected.sharedBrief.primaryTask : ''
  const whyPrimaryNow = typeof selected?.sharedBrief?.whyPrimaryNow === 'string' ? selected.sharedBrief.whyPrimaryNow : ''
  const promptStrategy = selected?.sharedBrief?.promptStrategy === 'split_recommended' ? 'split_recommended' : 'single_prompt'
  const secondaryTasks = Array.isArray(selected?.sharedBrief?.secondaryTasks)
    ? selected.sharedBrief.secondaryTasks.filter((item): item is string => Boolean(item))
    : []
  const parkedQuestions = Array.isArray(selected?.sharedBrief?.parkedQuestions)
    ? selected.sharedBrief.parkedQuestions.filter((item): item is string => Boolean(item))
    : []

  return (
    <AdminShell
      title="Prompt Üretimi"
      description="Metni yaz, doğru bağlamla promptu al. Bu ekranın tek işi budur."
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
              <p className="muted">Bu kayıt sadece prompt üretmek için tutulur. Cevap yapıştırma veya karar işleme bu yüzeyin parçası değil.</p>
            </section>

            <PromptPreparationEffect
              consultationId={selected.id}
              title={selected.title}
              summary={selected.summary}
              targetModel={selected.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'}
              promptStatus={selected.promptStatus}
              promptText={selected.promptRun.promptText}
            />

            <ConsultationDetailEditor
              key={`detail:${selected.id}:${selected.title.length}:${selected.title.slice(0, 40)}:${selected.summary.length}:${selected.summary.slice(0, 80)}:${selected.promptRun.modelName || ''}`}
              consultation={selected}
            />

            <PromptPreviewCard
              key={`prompt:${selected.id}:${selected.promptStatus}:${selected.promptRun.promptText.length}:${selected.promptRun.promptText.slice(0, 80)}:${selected.promptError || ''}`}
              consultationId={selected.id}
              title={selected.title}
              summary={selected.summary}
              promptText={selected.promptRun.promptText}
              fallbackText="Kayıt açılınca prompt otomatik hazırlanır. Metni, modeli ya da değişiklik isteğini güncellerseniz buradaki prompt yeniden kurulur."
              targetModel={selected.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'}
              promptSummary={promptSummary}
              promptStatus={selected.promptStatus}
              promptError={selected.promptError}
              primaryTask={primaryTask}
              whyPrimaryNow={whyPrimaryNow}
              promptStrategy={promptStrategy}
              secondaryTasks={secondaryTasks}
              parkedQuestions={parkedQuestions}
            />
          </article>
        ) : (
          <article className="card stack-sm">
            <h3>Bir kayıt seç</h3>
            <p className="muted">Soldan bir prompt kaydı seçin ya da yukarıdan yeni bir metin girerek başlayın.</p>
          </article>
        )}
      </section>
    </AdminShell>
  )
}
