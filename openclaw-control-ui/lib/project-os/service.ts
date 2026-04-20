import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { readProjectOsMockStore, writeProjectOsMockStore } from '@/lib/project-os/mock-store'
import type { BusinessRecord, ProjectOsDataset } from '@/lib/project-os/types'

type BusinessInput = {
  name?: string
  segment?: BusinessRecord['segment']
  district?: string
  ownerName?: string
  status?: BusinessRecord['status']
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
      status: audit.status === 'reviewed' || audit.status === 'offered' ? audit.status : 'new',
      channelReadiness: audit.channelReadiness === 'orta' || audit.channelReadiness === 'iyi' ? audit.channelReadiness : 'dusuk',
      summary: audit.summary,
    })),
    offers: dataset.offers.map((offer) => ({
      id: offer.id,
      businessId: offer.businessId,
      status: offer.status === 'sent' || offer.status === 'approved' ? offer.status : 'draft',
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
