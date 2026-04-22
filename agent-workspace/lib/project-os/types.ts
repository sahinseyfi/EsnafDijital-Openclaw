export type ProjectStage = 'audit' | 'offer' | 'delivery' | 'maintenance'

export interface BusinessRecord {
  id: string
  name: string
  segment: 'berber' | 'guzellik' | 'kafe-restoran' | 'diger'
  district: string
  ownerName: string
  status: 'lead' | 'active' | 'paused'
}

export interface AuditRecord {
  id: string
  businessId: string
  status: 'new' | 'reviewed' | 'offered'
  channelReadiness: 'dusuk' | 'orta' | 'iyi'
  summary: string
}

export type OfferDomainPreference = 'subdomain' | 'custom-domain'

export interface OfferRecord {
  id: string
  businessId: string
  status: 'draft' | 'sent' | 'approved'
  packageName: string
  amountTry: number
  addonKeys: string[]
  domainPreference: OfferDomainPreference
  customDomain: string
}

export interface DeliveryProjectRecord {
  id: string
  businessId: string
  status: 'kickoff' | 'building' | 'live' | 'maintenance'
  scope: string
}

export interface ProjectOsDataset {
  businesses: BusinessRecord[]
  audits: AuditRecord[]
  offers: OfferRecord[]
  deliveryProjects: DeliveryProjectRecord[]
}
