import type { ConsultationContextRef, ConsultationDetail, ConsultationType } from '@/lib/consultation-center/types'

type SuggestionInput = {
  title?: string
  note?: string
  type?: string
}

type SuggestionOutput = {
  title: string
  type: ConsultationType
  summary: string
  decisionQuestion: string
  whyNow: string
  desiredOutput: string
  contextRefs: ConsultationContextRef[]
  businessBrief?: Record<string, string | string[] | null>
  technicalBrief?: Record<string, string | string[] | null>
  sharedBrief?: Record<string, string | string[] | null>
}

function normalizeType(value?: string): ConsultationType {
  if (value === 'sales' || value === 'technical' || value === 'shared') return value
  return 'shared'
}

function normalizeTitle(value?: string) {
  const title = value?.trim()
  return title || 'Yeni danışma konusu'
}

function normalizeNote(value?: string) {
  const note = value?.trim()
  return note || 'Ham not girildi, önce netleştirme gerekiyor.'
}

function baseContextRefs(type: ConsultationType): ConsultationContextRef[] {
  const refs: ConsultationContextRef[] = [
    { kind: 'project', title: 'Proje çizgisi', ref: 'PROJECT.md' },
    { kind: 'heartbeat', title: 'Aktif faz ve öncelik', ref: 'HEARTBEAT.md' },
  ]

  if (type === 'shared') {
    refs.push({ kind: 'project', title: 'Kalıcı karar çizgisi', ref: 'MEMORY.md' })
  }

  return refs
}

export function suggestConsultationBrief(input: SuggestionInput): SuggestionOutput {
  const type = normalizeType(input.type)
  const title = normalizeTitle(input.title)
  const note = normalizeNote(input.note)

  const common = {
    title,
    type,
    summary: note,
    contextRefs: baseContextRefs(type),
  }

  if (type === 'sales') {
    return {
      ...common,
      decisionQuestion: `${title} konusu için sahada en anlaşılır yaklaşım ne olmalı?`,
      whyNow: `${title} konusu satış konuşmasını etkiliyor ve sahada daha net bir dil ihtiyacı var.`,
      desiredOutput: 'Net konuşma önerisi, kısa saha mesajları, itiraz cevapları ve test edilecek 1-2 yaklaşım',
      businessBrief: {
        segment: 'Henüz net değil',
        region: 'Henüz net değil',
        commercialGoal: note,
      },
      sharedBrief: {
        hamNot: note,
      },
    }
  }

  if (type === 'technical') {
    return {
      ...common,
      decisionQuestion: `${title} konusu için en sade teknik yaklaşım ne olmalı?`,
      whyNow: `${title} konusu mevcut akışı etkiliyor ve önce doğru teknik sınırı netleştirmek gerekiyor.`,
      desiredOutput: 'Önerilen teknik yaklaşım, sınırlar, riskler ve ilk uygulama adımları',
      technicalBrief: {
        affectedModule: [title],
        currentProblem: note,
      },
      sharedBrief: {
        hamNot: note,
      },
    }
  }

  return {
    ...common,
    decisionQuestion: `${title} konusu için en doğru karar çerçevesi nasıl kurulmalı?`,
    whyNow: `${title} konusu şu an netleşirse sonraki iş adımları daha temiz ilerler.`,
    desiredOutput: 'Net karar çerçevesi, önerilen yaklaşım, seçenekler ve ilk aksiyonlar',
    sharedBrief: {
      hamNot: note,
      kararCekirdegi: title,
    },
  }
}

export function applySuggestedFields(base: Pick<ConsultationDetail, 'id' | 'dueAt' | 'updatedAt' | 'promptRun' | 'actions'>, suggestion: SuggestionOutput): ConsultationDetail {
  return {
    id: base.id,
    title: suggestion.title,
    type: suggestion.type,
    stage: 'draft',
    route: 'blocked',
    ownerRole: suggestion.type === 'sales' ? 'user' : suggestion.type === 'technical' ? 'tech_agent' : 'shared',
    dueAt: base.dueAt,
    updatedAt: base.updatedAt,
    decisionQuestion: suggestion.decisionQuestion,
    summary: suggestion.summary,
    gptRecommended: false,
    whyNow: suggestion.whyNow,
    desiredOutput: suggestion.desiredOutput,
    missingFields: [],
    contextRefs: suggestion.contextRefs,
    businessBrief: suggestion.businessBrief,
    technicalBrief: suggestion.technicalBrief,
    sharedBrief: suggestion.sharedBrief,
    promptRun: base.promptRun,
    actions: base.actions,
  }
}
