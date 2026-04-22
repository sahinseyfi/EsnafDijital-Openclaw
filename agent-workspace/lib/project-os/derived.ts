import type { ProjectOsDataset } from '@/lib/project-os/types'

export type ProjectOsStage = 'intake' | 'audit' | 'offer' | 'delivery' | 'maintenance'

export type ProjectOsQueueAdvanceAction = {
  entityType: 'audit' | 'offer' | 'deliveryProject'
  entityId: string
  nextStatus: 'reviewed' | 'offered' | 'sent' | 'approved' | 'building' | 'live' | 'maintenance'
  label: string
}

export type ProjectOsQueueItem = {
  businessId: string
  businessName: string
  segment: ProjectOsDataset['businesses'][number]['segment']
  district: string
  stage: ProjectOsStage
  stageLabel: string
  statusLabel: string
  nextAction: string
  summary: string
  advanceAction: ProjectOsQueueAdvanceAction | null
}

export type ProjectOsOverview = {
  hotStage: {
    title: string
    text: string
  }
  queue: ProjectOsQueueItem[]
  byStage: Record<ProjectOsStage, ProjectOsQueueItem[]>
}

const stageOrder: ProjectOsStage[] = ['intake', 'audit', 'offer', 'delivery', 'maintenance']

function getStageLabel(stage: ProjectOsStage) {
  if (stage === 'intake') return 'Giriş'
  if (stage === 'audit') return 'Audit'
  if (stage === 'offer') return 'Teklif'
  if (stage === 'delivery') return 'Teslimat'
  return 'Bakım'
}

function getAuditRank(status: string) {
  if (status === 'new') return 0
  if (status === 'reviewed') return 1
  return 2
}

function getOfferRank(status: string) {
  if (status === 'draft') return 0
  if (status === 'sent') return 1
  return 2
}

function getDeliveryRank(status: string) {
  if (status === 'Başlangıç') return 0
  if (status === 'Yapım') return 1
  if (status === 'Yayında') return 2
  return 3
}

function getStagePriority(item: ProjectOsQueueItem) {
  return stageOrder.indexOf(item.stage)
}

function deriveQueueItem(dataset: ProjectOsDataset, business: ProjectOsDataset['businesses'][number]): ProjectOsQueueItem {
  const audit = dataset.audits.find((item) => item.businessId === business.id)
  const offer = dataset.offers.find((item) => item.businessId === business.id)
  const delivery = dataset.deliveryProjects.find((item) => item.businessId === business.id)

  if (!audit) {
    return {
      businessId: business.id,
      businessName: business.name,
      segment: business.segment,
      district: business.district,
      stage: 'intake',
      stageLabel: getStageLabel('intake'),
      statusLabel: 'Audit açılmadı',
      nextAction: 'Audit başlat',
      summary: 'İşletme kaydı var ama operasyon zinciri henüz audit ile başlamadı.',
      advanceAction: null,
    }
  }

  if (audit.status === 'new' || audit.status === 'reviewed') {
    return {
      businessId: business.id,
      businessName: business.name,
      segment: business.segment,
      district: business.district,
      stage: 'audit',
      stageLabel: getStageLabel('audit'),
      statusLabel: audit.status === 'new' ? 'Yeni audit' : 'İncelenen audit',
      nextAction: audit.status === 'new' ? 'Auditi incelemeye al' : 'Teklife geçir',
      summary: `${audit.channelReadiness} hazırlık sinyali var. ${audit.summary}`,
      advanceAction: {
        entityType: 'audit',
        entityId: audit.id,
        nextStatus: audit.status === 'new' ? 'reviewed' : 'offered',
        label: audit.status === 'new' ? 'İncelemeye al' : 'Teklife geçir',
      },
    }
  }

  if (!offer) {
    return {
      businessId: business.id,
      businessName: business.name,
      segment: business.segment,
      district: business.district,
      stage: 'offer',
      stageLabel: getStageLabel('offer'),
      statusLabel: 'Teklif açılmadı',
      nextAction: 'İlk teklifi aç',
      summary: 'Audit teklif aşamasına kadar geldi ama henüz teklif kaydı açılmadı.',
      advanceAction: null,
    }
  }

  if (offer.status === 'draft' || offer.status === 'sent') {
    return {
      businessId: business.id,
      businessName: business.name,
      segment: business.segment,
      district: business.district,
      stage: 'offer',
      stageLabel: getStageLabel('offer'),
      statusLabel: offer.status === 'draft' ? 'Taslak teklif' : 'Gönderilmiş teklif',
      nextAction: offer.status === 'draft' ? 'Teklifi gönder' : 'Teklifi kapat',
      summary: `${offer.packageName} paketi ${offer.amountTry.toLocaleString('tr-TR')} ₺ ile açık duruyor.`,
      advanceAction: {
        entityType: 'offer',
        entityId: offer.id,
        nextStatus: offer.status === 'draft' ? 'sent' : 'approved',
        label: offer.status === 'draft' ? 'Teklifi gönder' : 'Teklifi kapat',
      },
    }
  }

  if (!delivery) {
    return {
      businessId: business.id,
      businessName: business.name,
      segment: business.segment,
      district: business.district,
      stage: 'delivery',
      stageLabel: getStageLabel('delivery'),
      statusLabel: 'Teslimat açılmadı',
      nextAction: 'Teslimat başlat',
      summary: 'Teklif onaylanmış görünüyor, şimdi teslimat zincirini başlatmak gerekiyor.',
      advanceAction: null,
    }
  }

  if (delivery.status === 'kickoff' || delivery.status === 'building' || delivery.status === 'live') {
    return {
      businessId: business.id,
      businessName: business.name,
      segment: business.segment,
      district: business.district,
      stage: 'delivery',
      stageLabel: getStageLabel('delivery'),
      statusLabel: delivery.status === 'kickoff' ? 'Başlangıç' : delivery.status === 'building' ? 'Yapım' : 'Yayında',
      nextAction: delivery.status === 'kickoff' ? 'Yapıma geçir' : delivery.status === 'building' ? 'Yayına al' : 'Bakıma geçir',
      summary: delivery.scope,
      advanceAction: {
        entityType: 'deliveryProject',
        entityId: delivery.id,
        nextStatus: delivery.status === 'kickoff' ? 'building' : delivery.status === 'building' ? 'live' : 'maintenance',
        label: delivery.status === 'kickoff' ? 'Yapıma geçir' : delivery.status === 'building' ? 'Yayına al' : 'Bakıma geçir',
      },
    }
  }

  return {
    businessId: business.id,
    businessName: business.name,
    segment: business.segment,
    district: business.district,
    stage: 'maintenance',
    stageLabel: getStageLabel('maintenance'),
    statusLabel: 'Bakımda',
    nextAction: 'Bakımı sürdür',
    summary: delivery.scope,
    advanceAction: null,
  }
}

function buildHotStage(byStage: Record<ProjectOsStage, ProjectOsQueueItem[]>) {
  if (byStage.intake.length > 0) {
    return {
      title: 'Audit açılmamış işletmeler var',
      text: `${byStage.intake.length} işletme henüz audit ile başlatılmadı. Önce bu kayıtları zincire sokmak en net başlangıç.`,
    }
  }

  if (byStage.audit.length > 0) {
    return {
      title: 'Audit hattı sıcak',
      text: `${byStage.audit.length} kayıt teklif öncesi netleşmeyi bekliyor. Audit tarafını kapatmadan teklif hattı sağlıklı ilerlemez.`,
    }
  }

  if (byStage.offer.length > 0) {
    return {
      title: 'Teklif hattı sıcak',
      text: `${byStage.offer.length} kayıt teklif kapanışı bekliyor. Bugün en görünür ticari ilerleme burada.`,
    }
  }

  if (byStage.delivery.length > 0) {
    return {
      title: 'Teslimat hattı sıcak',
      text: `${byStage.delivery.length} kayıt canlı teslimat takibi istiyor. Yayın ve bakıma geçiş ana dikkat noktası.`,
    }
  }

  return {
    title: 'Bakım dönemi',
    text: `${byStage.maintenance.length} kayıt bakımda görünüyor. Hat sakin, ama tamamen kapanmış değil.`,
  }
}

export function deriveProjectOsOverview(dataset: ProjectOsDataset): ProjectOsOverview {
  const queue = dataset.businesses.map((business) => deriveQueueItem(dataset, business)).sort((left, right) => {
    const stageDelta = getStagePriority(left) - getStagePriority(right)
    if (stageDelta !== 0) return stageDelta

    if (left.stage === 'audit' && right.stage === 'audit') {
      const leftAuditStatus = left.statusLabel === 'Yeni audit' ? 'new' : left.statusLabel === 'İncelenen audit' ? 'reviewed' : 'offered'
      const rightAuditStatus = right.statusLabel === 'Yeni audit' ? 'new' : right.statusLabel === 'İncelenen audit' ? 'reviewed' : 'offered'
      const auditDelta = getAuditRank(leftAuditStatus) - getAuditRank(rightAuditStatus)
      if (auditDelta !== 0) return auditDelta
    }

    if (left.stage === 'offer' && right.stage === 'offer') {
      const leftOfferStatus = left.statusLabel === 'Taslak teklif' ? 'draft' : left.statusLabel === 'Gönderilmiş teklif' ? 'sent' : 'approved'
      const rightOfferStatus = right.statusLabel === 'Taslak teklif' ? 'draft' : right.statusLabel === 'Gönderilmiş teklif' ? 'sent' : 'approved'
      const offerDelta = getOfferRank(leftOfferStatus) - getOfferRank(rightOfferStatus)
      if (offerDelta !== 0) return offerDelta
    }

    if (left.stage === 'delivery' && right.stage === 'delivery') {
      const deliveryDelta = getDeliveryRank(left.statusLabel) - getDeliveryRank(right.statusLabel)
      if (deliveryDelta !== 0) return deliveryDelta
    }

    return left.businessName.localeCompare(right.businessName, 'tr')
  })

  const byStage: Record<ProjectOsStage, ProjectOsQueueItem[]> = {
    intake: queue.filter((item) => item.stage === 'intake'),
    audit: queue.filter((item) => item.stage === 'audit'),
    offer: queue.filter((item) => item.stage === 'offer'),
    delivery: queue.filter((item) => item.stage === 'delivery'),
    maintenance: queue.filter((item) => item.stage === 'maintenance'),
  }

  return {
    hotStage: buildHotStage(byStage),
    queue,
    byStage,
  }
}
