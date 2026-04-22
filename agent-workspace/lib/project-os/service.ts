import { prisma } from '@/lib/prisma'
import type { AuditRecord, BusinessRecord, DeliveryProjectRecord, OfferRecord, ProjectOsDataset } from '@/lib/project-os/types'

type BusinessInput = {
  name?: string
  segment?: BusinessRecord['segment']
  district?: string
  ownerName?: string
  status?: BusinessRecord['status']
}

type AuditInput = {
  businessId?: string
  status?: AuditRecord['status']
  channelReadiness?: AuditRecord['channelReadiness']
  summary?: string
}

type OfferInput = {
  businessId?: string
  status?: OfferRecord['status']
  packageName?: string
  amountTry?: number
  addonKeys?: string[]
  domainPreference?: OfferRecord['domainPreference']
  customDomain?: string
}

type DeliveryProjectInput = {
  businessId?: string
  status?: DeliveryProjectRecord['status']
  scope?: string
}

function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error('DATABASE_URL bulunamadi.')
  }
}

function mapBusinessSegment(value: string): BusinessRecord['segment'] {
  if (value === 'berber' || value === 'guzellik' || value === 'kafe-restoran' || value === 'diger') return value
  return 'diger'
}

function mapBusinessStatus(value: string): BusinessRecord['status'] {
  if (value === 'lead' || value === 'active' || value === 'paused') return value
  return 'lead'
}

function mapAuditStatus(value: string): AuditRecord['status'] {
  if (value === 'reviewed' || value === 'offered') return value
  return 'new'
}

function mapChannelReadiness(value: string): AuditRecord['channelReadiness'] {
  if (value === 'orta' || value === 'iyi') return value
  return 'dusuk'
}

function mapOfferStatus(value: string): OfferRecord['status'] {
  if (value === 'sent' || value === 'approved') return value
  return 'draft'
}

function mapOfferDomainPreference(value: string | undefined): OfferRecord['domainPreference'] {
  if (value === 'custom-domain' || value === 'custom_domain') return 'custom-domain'
  return 'subdomain'
}

function mapDeliveryProjectStatus(value: string): DeliveryProjectRecord['status'] {
  if (value === 'building' || value === 'live' || value === 'maintenance') return value
  return 'kickoff'
}

function mapDataset(dataset: {
  businesses: Array<{ id: string; name: string; segment: string; district: string; ownerName: string; status: string }>
  audits: Array<{ id: string; businessId: string; status: string; channelReadiness: string; summary: string }>
  offers: Array<{ id: string; businessId: string; status: string; packageName: string; amountTry: number; addonKeys: string[]; domainPreference: string; customDomain: string | null }>
  deliveryProjects: Array<{ id: string; businessId: string; status: string; scope: string }>
}): ProjectOsDataset {
  return {
    businesses: dataset.businesses.map((business) => ({
      id: business.id,
      name: business.name,
      segment: business.segment === 'kafe_restoran' ? 'kafe-restoran' : mapBusinessSegment(business.segment),
      district: business.district,
      ownerName: business.ownerName,
      status: mapBusinessStatus(business.status),
    })),
    audits: dataset.audits.map((audit) => ({
      id: audit.id,
      businessId: audit.businessId,
      status: mapAuditStatus(audit.status),
      channelReadiness: mapChannelReadiness(audit.channelReadiness),
      summary: audit.summary,
    })),
    offers: dataset.offers.map((offer) => ({
      id: offer.id,
      businessId: offer.businessId,
      status: mapOfferStatus(offer.status),
      packageName: offer.packageName,
      amountTry: offer.amountTry,
      addonKeys: Array.isArray(offer.addonKeys) ? offer.addonKeys : [],
      domainPreference: mapOfferDomainPreference(offer.domainPreference),
      customDomain: offer.customDomain || '',
    })),
    deliveryProjects: dataset.deliveryProjects.map((project) => ({
      id: project.id,
      businessId: project.businessId,
      status: mapDeliveryProjectStatus(project.status),
      scope: project.scope,
    })),
  }
}

export async function getProjectOsDataset(): Promise<ProjectOsDataset> {
  ensureDatabaseUrl()

  const [businesses, audits, offers, deliveryProjects] = await Promise.all([
    prisma.business.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.audit.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.offer.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.deliveryProject.findMany({ orderBy: { createdAt: 'desc' } }),
  ])

  return mapDataset({ businesses, audits, offers, deliveryProjects })
}

export async function createBusiness(input: BusinessInput): Promise<ProjectOsDataset> {
  const name = input.name?.trim()
  const district = input.district?.trim()
  const ownerName = input.ownerName?.trim()

  if (!name || !district || !ownerName) {
    throw new Error('İşletme adı, ilçe ve işletme sahibi zorunlu.')
  }

  ensureDatabaseUrl()

  const segment = mapBusinessSegment(input.segment || 'diger')
  const status = mapBusinessStatus(input.status || 'lead')

  await prisma.business.create({
    data: {
      name,
      segment: segment === 'kafe-restoran' ? 'kafe_restoran' : segment,
      district,
      ownerName,
      status,
    },
  })

  return getProjectOsDataset()
}

export async function updateBusiness(id: string, input: BusinessInput): Promise<ProjectOsDataset | null> {
  if (!id.trim()) return null

  ensureDatabaseUrl()

  try {
    await prisma.business.update({
      where: { id },
      data: {
        name: input.name?.trim(),
        segment: input.segment ? (input.segment === 'kafe-restoran' ? 'kafe_restoran' : input.segment) : undefined,
        district: input.district?.trim(),
        ownerName: input.ownerName?.trim(),
        status: input.status ? mapBusinessStatus(input.status) : undefined,
      },
    })
  } catch {
    return null
  }

  return getProjectOsDataset()
}

export async function createAudit(input: AuditInput): Promise<ProjectOsDataset> {
  const businessId = input.businessId?.trim()
  const summary = input.summary?.trim()

  if (!businessId || !summary) {
    throw new Error('İşletme ve audit özeti zorunlu.')
  }

  ensureDatabaseUrl()

  await prisma.audit.create({
    data: {
      businessId,
      status: mapAuditStatus(input.status || 'new'),
      channelReadiness: mapChannelReadiness(input.channelReadiness || 'dusuk'),
      summary,
    },
  })

  return getProjectOsDataset()
}

export async function updateAudit(id: string, input: AuditInput): Promise<ProjectOsDataset | null> {
  if (!id.trim()) return null

  ensureDatabaseUrl()

  try {
    await prisma.audit.update({
      where: { id },
      data: {
        businessId: input.businessId?.trim(),
        status: input.status ? mapAuditStatus(input.status) : undefined,
        channelReadiness: input.channelReadiness ? mapChannelReadiness(input.channelReadiness) : undefined,
        summary: input.summary?.trim(),
      },
    })
  } catch {
    return null
  }

  return getProjectOsDataset()
}

export async function createOffer(input: OfferInput): Promise<ProjectOsDataset> {
  const businessId = input.businessId?.trim()
  const packageName = input.packageName?.trim()
  const amountTry = Number(input.amountTry)
  const addonKeys = Array.isArray(input.addonKeys) ? input.addonKeys.map((item) => String(item).trim()).filter(Boolean) : []
  const domainPreference = mapOfferDomainPreference(input.domainPreference)
  const customDomain = input.customDomain?.trim()

  if (!businessId || !packageName || !Number.isFinite(amountTry) || amountTry <= 0) {
    throw new Error('İşletme, paket adı ve geçerli teklif tutarı zorunlu.')
  }

  ensureDatabaseUrl()

  await prisma.offer.create({
    data: {
      businessId,
      status: mapOfferStatus(input.status || 'draft'),
      packageName,
      amountTry,
      addonKeys,
      domainPreference: domainPreference === 'custom-domain' ? 'custom_domain' : 'subdomain',
      customDomain: domainPreference === 'custom-domain' ? (customDomain || null) : null,
    },
  })

  return getProjectOsDataset()
}

export async function updateOffer(id: string, input: OfferInput): Promise<ProjectOsDataset | null> {
  if (!id.trim()) return null

  ensureDatabaseUrl()

  try {
    await prisma.offer.update({
      where: { id },
      data: {
        businessId: input.businessId?.trim(),
        status: input.status ? mapOfferStatus(input.status) : undefined,
        packageName: input.packageName?.trim(),
        amountTry: Number.isFinite(Number(input.amountTry)) && Number(input.amountTry) > 0 ? Number(input.amountTry) : undefined,
        addonKeys: Array.isArray(input.addonKeys) ? input.addonKeys.map((item) => String(item).trim()).filter(Boolean) : undefined,
        domainPreference: input.domainPreference ? (mapOfferDomainPreference(input.domainPreference) === 'custom-domain' ? 'custom_domain' : 'subdomain') : undefined,
        customDomain: input.customDomain === undefined
          ? undefined
          : (input.domainPreference && mapOfferDomainPreference(input.domainPreference) !== 'custom-domain')
            ? null
            : (input.customDomain.trim() || null),
      },
    })
  } catch {
    return null
  }

  return getProjectOsDataset()
}

export async function createDeliveryProject(input: DeliveryProjectInput): Promise<ProjectOsDataset> {
  const businessId = input.businessId?.trim()
  const scope = input.scope?.trim()

  if (!businessId || !scope) {
    throw new Error('İşletme ve teslimat kapsamı zorunlu.')
  }

  ensureDatabaseUrl()

  await prisma.deliveryProject.create({
    data: {
      businessId,
      status: mapDeliveryProjectStatus(input.status || 'kickoff'),
      scope,
    },
  })

  return getProjectOsDataset()
}

export async function updateDeliveryProject(id: string, input: DeliveryProjectInput): Promise<ProjectOsDataset | null> {
  if (!id.trim()) return null

  ensureDatabaseUrl()

  try {
    await prisma.deliveryProject.update({
      where: { id },
      data: {
        businessId: input.businessId?.trim(),
        status: input.status ? mapDeliveryProjectStatus(input.status) : undefined,
        scope: input.scope?.trim(),
      },
    })
  } catch {
    return null
  }

  return getProjectOsDataset()
}
