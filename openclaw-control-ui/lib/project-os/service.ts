import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { readProjectOsMockStore, writeProjectOsMockStore } from '@/lib/project-os/mock-store'
import type { AuditRecord, BusinessRecord, OfferRecord, ProjectOsDataset } from '@/lib/project-os/types'

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
}

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim())
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

function mapDataset(dataset: {
  businesses: Array<{ id: string; name: string; segment: string; district: string; ownerName: string; status: string }>
  audits: Array<{ id: string; businessId: string; status: string; channelReadiness: string; summary: string }>
  offers: Array<{ id: string; businessId: string; status: string; packageName: string; amountTry: number }>
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
    })),
    deliveryProjects: dataset.deliveryProjects.map((project) => ({
      id: project.id,
      businessId: project.businessId,
      status: project.status === 'building' || project.status === 'live' || project.status === 'maintenance' ? project.status : 'kickoff',
      scope: project.scope,
    })),
  }
}

export async function getProjectOsDataset(): Promise<ProjectOsDataset> {
  if (!hasDatabaseUrl()) {
    return readProjectOsMockStore()
  }

  try {
    const [businesses, audits, offers, deliveryProjects] = await Promise.all([
      prisma.business.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.audit.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.offer.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.deliveryProject.findMany({ orderBy: { createdAt: 'desc' } }),
    ])

    return mapDataset({ businesses, audits, offers, deliveryProjects })
  } catch {
    return readProjectOsMockStore()
  }
}

export async function createBusiness(input: BusinessInput): Promise<ProjectOsDataset> {
  const name = input.name?.trim()
  const district = input.district?.trim()
  const ownerName = input.ownerName?.trim()

  if (!name || !district || !ownerName) {
    throw new Error('İşletme adı, ilçe ve işletme sahibi zorunlu.')
  }

  const segment = mapBusinessSegment(input.segment || 'diger')
  const status = mapBusinessStatus(input.status || 'lead')

  if (!hasDatabaseUrl()) {
    const dataset = await readProjectOsMockStore()
    dataset.businesses.unshift({
      id: `biz-${randomUUID().slice(0, 8)}`,
      name,
      segment,
      district,
      ownerName,
      status,
    })
    await writeProjectOsMockStore(dataset)
    return dataset
  }

  try {
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
  } catch {
    const dataset = await readProjectOsMockStore()
    dataset.businesses.unshift({
      id: `biz-${randomUUID().slice(0, 8)}`,
      name,
      segment,
      district,
      ownerName,
      status,
    })
    await writeProjectOsMockStore(dataset)
    return dataset
  }
}

export async function updateBusiness(id: string, input: BusinessInput): Promise<ProjectOsDataset | null> {
  if (!id.trim()) return null

  if (!hasDatabaseUrl()) {
    const dataset = await readProjectOsMockStore()
    const target = dataset.businesses.find((business) => business.id === id)
    if (!target) return null

    target.name = input.name?.trim() || target.name
    target.segment = input.segment ? mapBusinessSegment(input.segment) : target.segment
    target.district = input.district?.trim() || target.district
    target.ownerName = input.ownerName?.trim() || target.ownerName
    target.status = input.status ? mapBusinessStatus(input.status) : target.status

    await writeProjectOsMockStore(dataset)
    return dataset
  }

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

    return getProjectOsDataset()
  } catch {
    const dataset = await readProjectOsMockStore()
    const target = dataset.businesses.find((business) => business.id === id)
    if (!target) return null

    target.name = input.name?.trim() || target.name
    target.segment = input.segment ? mapBusinessSegment(input.segment) : target.segment
    target.district = input.district?.trim() || target.district
    target.ownerName = input.ownerName?.trim() || target.ownerName
    target.status = input.status ? mapBusinessStatus(input.status) : target.status

    await writeProjectOsMockStore(dataset)
    return dataset
  }
}

export async function createAudit(input: AuditInput): Promise<ProjectOsDataset> {
  const businessId = input.businessId?.trim()
  const summary = input.summary?.trim()

  if (!businessId || !summary) {
    throw new Error('İşletme ve audit özeti zorunlu.')
  }

  const status = mapAuditStatus(input.status || 'new')
  const channelReadiness = mapChannelReadiness(input.channelReadiness || 'dusuk')

  if (!hasDatabaseUrl()) {
    const dataset = await readProjectOsMockStore()
    dataset.audits.unshift({
      id: `aud-${randomUUID().slice(0, 8)}`,
      businessId,
      status,
      channelReadiness,
      summary,
    })
    await writeProjectOsMockStore(dataset)
    return dataset
  }

  try {
    await prisma.audit.create({
      data: {
        businessId,
        status,
        channelReadiness,
        summary,
      },
    })

    return getProjectOsDataset()
  } catch {
    const dataset = await readProjectOsMockStore()
    dataset.audits.unshift({
      id: `aud-${randomUUID().slice(0, 8)}`,
      businessId,
      status,
      channelReadiness,
      summary,
    })
    await writeProjectOsMockStore(dataset)
    return dataset
  }
}

export async function updateAudit(id: string, input: AuditInput): Promise<ProjectOsDataset | null> {
  if (!id.trim()) return null

  if (!hasDatabaseUrl()) {
    const dataset = await readProjectOsMockStore()
    const target = dataset.audits.find((audit) => audit.id === id)
    if (!target) return null

    target.businessId = input.businessId?.trim() || target.businessId
    target.status = input.status ? mapAuditStatus(input.status) : target.status
    target.channelReadiness = input.channelReadiness ? mapChannelReadiness(input.channelReadiness) : target.channelReadiness
    target.summary = input.summary?.trim() || target.summary

    await writeProjectOsMockStore(dataset)
    return dataset
  }

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

    return getProjectOsDataset()
  } catch {
    const dataset = await readProjectOsMockStore()
    const target = dataset.audits.find((audit) => audit.id === id)
    if (!target) return null

    target.businessId = input.businessId?.trim() || target.businessId
    target.status = input.status ? mapAuditStatus(input.status) : target.status
    target.channelReadiness = input.channelReadiness ? mapChannelReadiness(input.channelReadiness) : target.channelReadiness
    target.summary = input.summary?.trim() || target.summary

    await writeProjectOsMockStore(dataset)
    return dataset
  }
}

export async function createOffer(input: OfferInput): Promise<ProjectOsDataset> {
  const businessId = input.businessId?.trim()
  const packageName = input.packageName?.trim()
  const amountTry = Number(input.amountTry)

  if (!businessId || !packageName || !Number.isFinite(amountTry) || amountTry <= 0) {
    throw new Error('İşletme, paket adı ve geçerli teklif tutarı zorunlu.')
  }

  const status = mapOfferStatus(input.status || 'draft')

  if (!hasDatabaseUrl()) {
    const dataset = await readProjectOsMockStore()
    dataset.offers.unshift({
      id: `off-${randomUUID().slice(0, 8)}`,
      businessId,
      status,
      packageName,
      amountTry,
    })
    await writeProjectOsMockStore(dataset)
    return dataset
  }

  try {
    await prisma.offer.create({
      data: {
        businessId,
        status,
        packageName,
        amountTry,
      },
    })

    return getProjectOsDataset()
  } catch {
    const dataset = await readProjectOsMockStore()
    dataset.offers.unshift({
      id: `off-${randomUUID().slice(0, 8)}`,
      businessId,
      status,
      packageName,
      amountTry,
    })
    await writeProjectOsMockStore(dataset)
    return dataset
  }
}

export async function updateOffer(id: string, input: OfferInput): Promise<ProjectOsDataset | null> {
  if (!id.trim()) return null

  if (!hasDatabaseUrl()) {
    const dataset = await readProjectOsMockStore()
    const target = dataset.offers.find((offer) => offer.id === id)
    if (!target) return null

    target.businessId = input.businessId?.trim() || target.businessId
    target.status = input.status ? mapOfferStatus(input.status) : target.status
    target.packageName = input.packageName?.trim() || target.packageName
    if (Number.isFinite(Number(input.amountTry)) && Number(input.amountTry) > 0) {
      target.amountTry = Number(input.amountTry)
    }

    await writeProjectOsMockStore(dataset)
    return dataset
  }

  try {
    await prisma.offer.update({
      where: { id },
      data: {
        businessId: input.businessId?.trim(),
        status: input.status ? mapOfferStatus(input.status) : undefined,
        packageName: input.packageName?.trim(),
        amountTry: Number.isFinite(Number(input.amountTry)) && Number(input.amountTry) > 0 ? Number(input.amountTry) : undefined,
      },
    })

    return getProjectOsDataset()
  } catch {
    const dataset = await readProjectOsMockStore()
    const target = dataset.offers.find((offer) => offer.id === id)
    if (!target) return null

    target.businessId = input.businessId?.trim() || target.businessId
    target.status = input.status ? mapOfferStatus(input.status) : target.status
    target.packageName = input.packageName?.trim() || target.packageName
    if (Number.isFinite(Number(input.amountTry)) && Number(input.amountTry) > 0) {
      target.amountTry = Number(input.amountTry)
    }

    await writeProjectOsMockStore(dataset)
    return dataset
  }
}
