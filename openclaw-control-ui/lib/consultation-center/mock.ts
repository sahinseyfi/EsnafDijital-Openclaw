import { evaluateConsultation } from '@/lib/consultation-center/evaluator'
import { buildConsultationPrompt } from '@/lib/consultation-center/prompt'
import { inferConsultationStage } from '@/lib/consultation-center/stage'
import { readMockStore, writeMockStore } from '@/lib/consultation-center/mock-store'
import { suggestConsultationBrief } from '@/lib/consultation-center/suggestions'
import type { ConsultationCenterPayload, ConsultationContextRef, ConsultationDetail, ConsultationInboxItem } from '@/lib/consultation-center/types'

type ConsultationUpdateInput = {
  title?: string
  decisionQuestion?: string
  whyNow?: string
  desiredOutput?: string
  summary?: string
  stage?: ConsultationDetail['stage']
  dueAt?: string | null
  businessBrief?: Record<string, string | string[] | null>
  technicalBrief?: Record<string, string | string[] | null>
  sharedBrief?: Record<string, string | string[] | null>
  contextRefs?: ConsultationContextRef[]
}

type ConsultationActionInput = {
  title?: string
  ownerRole?: ConsultationDetail['ownerRole']
  linkedEntityType?: 'project_os' | 'context_center'
  linkedEntityId?: string
}

type ConsultationRunInput = {
  modelName?: string
  promptText?: string
  responseSummary?: string
}

type ConsultationActionStatusInput = {
  status: 'open' | 'done'
}

const seedConsultations: ConsultationDetail[] = [
  {
    id: 'consult_shared_offer_v1',
    title: 'İlk teklif omurgasını 3 pakete düşürme',
    type: 'shared',
    stage: 'ready_to_send',
    route: 'external',
    ownerRole: 'shared',
    dueAt: '2026-04-22T18:00:00.000Z',
    updatedAt: '2026-04-19T12:20:00.000Z',
    decisionQuestion: 'Audit sonrası teklif yapısını 3 sade pakete nasıl düşürelim?',
    summary: 'Teklif dili hem saha tarafında kolay anlatılmalı hem teknik teslimat yükünü taşınabilir tutmalı.',
    gptRecommended: true,
    whyNow: 'İlk teklif omurgası hâlâ tam keskin değil ve bu karar hem satış konuşmasını hem teslimat standardını etkiliyor.',
    desiredOutput: '3 paket yapısı, ne var/ne yok sınırı, geçiş cümleleri ve ilk uygulama sırası',
    missingFields: [],
    sharedBrief: {
      kararCekirdegi: 'Audit -> teklif geçişinde sade ve satılabilir paket seti',
      ticariKatman: ['Arnavutköy küçük işletme gerçekliği', 'Düşük bariyerli giriş', 'Anlaşılır fiyat mantığı'],
      teknikKatman: ['Teslimat kapsamı net olmalı', 'Bakım yükü kontrol edilmeli', 'MVP ağır CRM olmamalı'],
      beklenenCevap: 'Öneri + seçenek karşılaştırması + ilk aksiyonlar',
    },
    contextRefs: [
      { kind: 'project', title: 'Project omurgası', ref: 'PROJECT.md' },
      { kind: 'roadmap', title: 'Faz 1 odakları', ref: 'ROADMAP.md' },
      { kind: 'heartbeat', title: 'Aktif blokaj ve hedef', ref: 'HEARTBEAT.md' },
    ],
    promptRun: {
      modelName: 'gpt-pro',
      sentAt: null,
      responseSummary: null,
      promptText: 'Rolün: KOBİ teklif ve ürün tasarımı danışmanı. Karar sorusu: Audit sonrası teklif yapısını 3 sade pakete nasıl düşürelim?...',
    },
    actions: [
      { id: 'action_offer_spec', ownerRole: 'shared', title: 'Paket sınırlarını netleştir', status: 'open', linkedEntityType: 'project_os', linkedEntityId: 'offer-v1' },
      { id: 'action_consult_note', ownerRole: 'tech_agent', title: 'Karar notunu Context Center içine yaz', status: 'open', linkedEntityType: 'context_center', linkedEntityId: 'offer-packages' },
    ],
  },
  {
    id: 'consult_sales_audit_pitch',
    title: 'Berber segmentinde audit giriş konuşması',
    type: 'sales',
    stage: 'context_ready',
    route: 'external',
    ownerRole: 'user',
    dueAt: '2026-04-21T12:00:00.000Z',
    updatedAt: '2026-04-19T11:55:00.000Z',
    decisionQuestion: 'Audit’i ilk görüşmede hangi dille anlatırsak randevu açmak kolaylaşır?',
    summary: 'Saha tarafında güven bariyeri yüksek. Kısa ve anlaşılır giriş cümlesi gerekiyor.',
    gptRecommended: true,
    whyNow: 'Saha konuşmaları başladı ve ilk temas cümlesi henüz standardize değil.',
    desiredOutput: 'Açılış cümleleri, itiraz cevapları, 1 haftalık saha testi',
    missingFields: [],
    businessBrief: {
      segment: 'berber',
      region: 'İstanbul Arnavutköy',
      stage: 'audit',
      fieldSignals: ['Siteye gerek yok deniyor', 'Instagram yeterli sanılıyor', 'Güven bariyeri yüksek'],
      commercialGoal: 'İlk görüşmeden randevu almak',
    },
    contextRefs: [
      { kind: 'project', title: 'İlk segmentler', ref: 'PROJECT.md' },
      { kind: 'heartbeat', title: 'Haftalık öncelik', ref: 'HEARTBEAT.md' },
    ],
    promptRun: {
      modelName: 'gpt-pro',
      sentAt: null,
      responseSummary: null,
      promptText: 'Rolün: küçük işletme saha satış stratejisti. Karar sorusu: Audit’i ilk görüşmede hangi dille anlatırsak randevu açmak kolaylaşır?...',
    },
    actions: [],
  },
  {
    id: 'consult_technical_data_model',
    title: 'Consultation Center v1 veri modeli',
    type: 'technical',
    stage: 'internal',
    route: 'internal',
    ownerRole: 'tech_agent',
    dueAt: null,
    updatedAt: '2026-04-19T12:22:00.000Z',
    decisionQuestion: 'Consultation Center v1 için minimum tablo ve API sınırı ne olmalı?',
    summary: 'Önce iskelet lazım, sonra gerçek Postgres bağlantısı gelecek.',
    gptRecommended: false,
    whyNow: 'Consultation Center v1 spec yazıldı. Bunu repo içinde çalışan iskelete çevirmek gerekiyor.',
    desiredOutput: 'Prisma schema, dummy API, ilk ekran akışı',
    missingFields: [],
    technicalBrief: {
      affectedModule: ['Consultation Center', 'Context Center', 'Project OS'],
      currentProblem: 'Henüz sadece statik sayfa var',
      technicalConstraints: ['MVP sade kalmalı', 'Önce dummy veriyle akış görünmeli'],
      acceptanceCriteria: 'Inbox, detail, prompt preview ve action list görünür olmalı',
    },
    contextRefs: [
      { kind: 'decision', title: 'Consultation Center v1 spec', ref: 'DECISIONS/2026-04-19-consultation-center-v1.md' },
      { kind: 'heartbeat', title: 'Sıradaki somut adımlar', ref: 'HEARTBEAT.md' },
    ],
    promptRun: {
      modelName: null,
      sentAt: null,
      responseSummary: 'Bu konu iç uygulama işi, GPT Pro şart değil.',
      promptText: '',
    },
    actions: [
      { id: 'action_prisma', ownerRole: 'tech_agent', title: 'Prisma schema dosyasını ekle', status: 'done', linkedEntityType: 'project_os', linkedEntityId: 'consultation-schema' },
      { id: 'action_api', ownerRole: 'tech_agent', title: 'Dummy API route’larını aç', status: 'open', linkedEntityType: 'project_os', linkedEntityId: 'consultation-api' },
    ],
  },
]

async function loadConsultations() {
  return readMockStore(seedConsultations)
}

function toInboxItem(consultation: ConsultationDetail): ConsultationInboxItem {
  const evaluation = evaluateConsultation({
    type: consultation.type,
    decisionQuestion: consultation.decisionQuestion,
    whyNow: consultation.whyNow,
    desiredOutput: consultation.desiredOutput,
    contextRefs: consultation.contextRefs,
    businessBrief: consultation.businessBrief,
    technicalBrief: consultation.technicalBrief,
    sharedBrief: consultation.sharedBrief,
  })
  const stage = inferConsultationStage({
    currentStage: consultation.stage,
    decisionQuestion: consultation.decisionQuestion,
    whyNow: consultation.whyNow,
    desiredOutput: consultation.desiredOutput,
    missingFields: evaluation.missingFields,
    route: evaluation.route,
    promptText: consultation.promptRun.promptText,
    sentAt: consultation.promptRun.sentAt,
    responseSummary: consultation.promptRun.responseSummary,
    actions: consultation.actions,
  })

  return {
    id: consultation.id,
    title: consultation.title,
    type: consultation.type,
    stage,
    route: evaluation.route,
    ownerRole: evaluation.ownerRole,
    dueAt: consultation.dueAt,
    updatedAt: consultation.updatedAt,
    decisionQuestion: consultation.decisionQuestion,
    summary: consultation.summary,
    gptRecommended: evaluation.gptRecommended,
  }
}

export async function getConsultationInbox(): Promise<ConsultationInboxItem[]> {
  const consultations = await loadConsultations()
  return consultations.map(toInboxItem)
}

export async function getConsultationDetail(id: string): Promise<ConsultationDetail | null> {
  const consultations = await loadConsultations()
  const item = consultations.find((entry) => entry.id === id)
  if (!item) return null

  const evaluation = evaluateConsultation({
    type: item.type,
    decisionQuestion: item.decisionQuestion,
    whyNow: item.whyNow,
    desiredOutput: item.desiredOutput,
    contextRefs: item.contextRefs,
    businessBrief: item.businessBrief,
    technicalBrief: item.technicalBrief,
    sharedBrief: item.sharedBrief,
  })

  const promptText = item.promptRun.promptText || (evaluation.route === 'external'
    ? buildConsultationPrompt({
        type: item.type,
        title: item.title,
        decisionQuestion: item.decisionQuestion,
        whyNow: item.whyNow,
        desiredOutput: item.desiredOutput,
        contextRefs: item.contextRefs,
        businessBrief: item.businessBrief,
        technicalBrief: item.technicalBrief,
        sharedBrief: item.sharedBrief,
      })
    : '')
  const stage = inferConsultationStage({
    currentStage: item.stage,
    decisionQuestion: item.decisionQuestion,
    whyNow: item.whyNow,
    desiredOutput: item.desiredOutput,
    missingFields: evaluation.missingFields,
    route: evaluation.route,
    promptText,
    sentAt: item.promptRun.sentAt,
    responseSummary: item.promptRun.responseSummary,
    actions: item.actions,
  })

  return {
    ...item,
    stage,
    route: evaluation.route,
    ownerRole: evaluation.ownerRole,
    gptRecommended: evaluation.gptRecommended,
    missingFields: evaluation.missingFields,
    promptRun: {
      ...item.promptRun,
      promptText,
    },
  }
}

export async function getConsultationCenterPayload(selectedId?: string): Promise<ConsultationCenterPayload> {
  const inbox = await getConsultationInbox()
  const selected = await getConsultationDetail(selectedId || inbox[0]?.id || '')
  return { inbox, selected }
}

export async function createMockConsultation(input: { title?: string; type?: string; note?: string }) {
  const consultations = await loadConsultations()
  const suggestion = suggestConsultationBrief(input)
  const id = `consult_${Date.now()}`
  const item: ConsultationDetail = {
    id,
    title: suggestion.title,
    type: suggestion.type,
    stage: 'draft',
    route: 'blocked',
    ownerRole: suggestion.type === 'sales' ? 'user' : suggestion.type === 'technical' ? 'tech_agent' : 'shared',
    dueAt: null,
    updatedAt: new Date().toISOString(),
    decisionQuestion: suggestion.decisionQuestion,
    summary: suggestion.summary,
    gptRecommended: false,
    whyNow: suggestion.whyNow,
    desiredOutput: suggestion.desiredOutput,
    missingFields: [],
    businessBrief: suggestion.businessBrief,
    technicalBrief: suggestion.technicalBrief,
    sharedBrief: suggestion.sharedBrief,
    contextRefs: suggestion.contextRefs,
    promptRun: {
      modelName: null,
      sentAt: null,
      responseSummary: null,
      promptText: '',
    },
    actions: [],
  }

  consultations.unshift(item)
  await writeMockStore(consultations)
  return item
}

export async function deleteMockConsultation(id: string) {
  const consultations = await loadConsultations()
  const next = consultations.filter((entry) => entry.id !== id)
  if (next.length === consultations.length) return false
  await writeMockStore(next)
  return true
}

export async function updateMockConsultation(id: string, input: ConsultationUpdateInput) {
  const consultations = await loadConsultations()
  const index = consultations.findIndex((entry) => entry.id === id)
  if (index === -1) return null

  const current = consultations[index]
  const next: ConsultationDetail = {
    ...current,
    title: input.title?.trim() || current.title,
    decisionQuestion: input.decisionQuestion?.trim() || current.decisionQuestion,
    whyNow: input.whyNow?.trim() || current.whyNow,
    desiredOutput: input.desiredOutput?.trim() || current.desiredOutput,
    summary: input.summary?.trim() || current.summary,
    stage: input.stage || current.stage,
    dueAt: input.dueAt === undefined ? current.dueAt : input.dueAt,
    businessBrief: input.businessBrief || current.businessBrief,
    technicalBrief: input.technicalBrief || current.technicalBrief,
    sharedBrief: input.sharedBrief || current.sharedBrief,
    contextRefs: input.contextRefs || current.contextRefs,
    updatedAt: new Date().toISOString(),
  }

  consultations[index] = next
  await writeMockStore(consultations)
  return getConsultationDetail(id)
}

export async function addMockConsultationAction(id: string, input: ConsultationActionInput) {
  const consultations = await loadConsultations()
  const index = consultations.findIndex((entry) => entry.id === id)
  if (index === -1) return null

  const current = consultations[index]
  current.actions.unshift({
    id: `action_${Date.now()}`,
    ownerRole: input.ownerRole || current.ownerRole,
    title: input.title?.trim() || 'Yeni aksiyon',
    status: 'open',
    linkedEntityType: input.linkedEntityType,
    linkedEntityId: input.linkedEntityId?.trim() || undefined,
  })
  current.updatedAt = new Date().toISOString()
  consultations[index] = current
  await writeMockStore(consultations)
  return getConsultationDetail(id)
}

export async function addMockConsultationRun(id: string, input: ConsultationRunInput) {
  const consultations = await loadConsultations()
  const index = consultations.findIndex((entry) => entry.id === id)
  if (index === -1) return null

  const current = consultations[index]
  current.promptRun = {
    modelName: input.modelName?.trim() || current.promptRun.modelName,
    promptText: input.promptText?.trim() || current.promptRun.promptText,
    sentAt: new Date().toISOString(),
    responseSummary: input.responseSummary?.trim() || current.promptRun.responseSummary,
  }
  current.updatedAt = new Date().toISOString()
  current.stage = 'answered'
  consultations[index] = current
  await writeMockStore(consultations)
  return getConsultationDetail(id)
}

export async function updateMockConsultationActionStatus(id: string, actionId: string, input: ConsultationActionStatusInput) {
  const consultations = await loadConsultations()
  const index = consultations.findIndex((entry) => entry.id === id)
  if (index === -1) return null

  const current = consultations[index]
  current.actions = current.actions.map((action) => (
    action.id === actionId
      ? { ...action, status: input.status }
      : action
  ))
  current.updatedAt = new Date().toISOString()
  if (current.actions.every((action) => action.status === 'done') && current.actions.length > 0) {
    current.stage = 'actioned'
  }
  consultations[index] = current
  await writeMockStore(consultations)
  return getConsultationDetail(id)
}
