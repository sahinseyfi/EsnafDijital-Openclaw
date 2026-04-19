import { evaluateConsultation } from '@/lib/consultation-center/evaluator'
import type { ConsultationCenterPayload, ConsultationDetail, ConsultationInboxItem } from '@/lib/consultation-center/types'

const consultations: ConsultationDetail[] = [
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

  return {
    id: consultation.id,
    title: consultation.title,
    type: consultation.type,
    stage: consultation.stage,
    route: evaluation.route,
    ownerRole: evaluation.ownerRole,
    dueAt: consultation.dueAt,
    updatedAt: consultation.updatedAt,
    decisionQuestion: consultation.decisionQuestion,
    summary: consultation.summary,
    gptRecommended: evaluation.gptRecommended,
  }
}

export function getConsultationInbox(): ConsultationInboxItem[] {
  return consultations.map(toInboxItem)
}

export function getConsultationDetail(id: string): ConsultationDetail | null {
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

  return {
    ...item,
    route: evaluation.route,
    ownerRole: evaluation.ownerRole,
    gptRecommended: evaluation.gptRecommended,
    missingFields: evaluation.missingFields,
  }
}

export function getConsultationCenterPayload(selectedId?: string): ConsultationCenterPayload {
  const inbox = getConsultationInbox()
  const selected = getConsultationDetail(selectedId || inbox[0]?.id || '')
  return { inbox, selected }
}

export function createMockConsultation(input: { title?: string; type?: string; note?: string }) {
  const id = `consult_${Date.now()}`
  const item: ConsultationDetail = {
    id,
    title: input.title?.trim() || 'Yeni danışma konusu',
    type: input.type === 'sales' || input.type === 'technical' || input.type === 'shared' ? input.type : 'shared',
    stage: 'draft',
    route: 'blocked',
    ownerRole: 'shared',
    dueAt: null,
    updatedAt: new Date().toISOString(),
    decisionQuestion: 'Karar sorusu henüz net değil',
    summary: input.note?.trim() || 'Ham not girildi, önce netleştirme gerekiyor.',
    gptRecommended: false,
    whyNow: 'Henüz yazılmadı',
    desiredOutput: 'Henüz seçilmedi',
    missingFields: ['karar sorusu', 'neden şimdi', 'beklenen çıktı', 'bağlam', 'karar çekirdeği'],
    sharedBrief: {
      hamNot: input.note?.trim() || '',
    },
    contextRefs: [],
    promptRun: {
      modelName: null,
      sentAt: null,
      responseSummary: null,
      promptText: '',
    },
    actions: [],
  }

  consultations.unshift(item)
  return item
}
