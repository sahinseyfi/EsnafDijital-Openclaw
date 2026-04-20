import { prisma } from '@/lib/prisma'
import { projectOsMockData } from '@/lib/project-os/mock-data'
import type { ProjectOsDataset } from '@/lib/project-os/types'

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim())
}

export async function getProjectOsDataset(): Promise<ProjectOsDataset> {
  if (!hasDatabaseUrl()) {
    return projectOsMockData
  }

  try {
    const [businesses, audits, offers, deliveryProjects] = await Promise.all([
      prisma.business.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.audit.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.offer.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.deliveryProject.findMany({
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      businesses: businesses.map((business) => ({
        id: business.id,
        name: business.name,
        segment: business.segment === 'kafe_restoran' ? 'kafe-restoran' : business.segment,
        district: business.district,
        ownerName: business.ownerName,
        status: business.status,
      })),
      audits: audits.map((audit) => ({
        id: audit.id,
        businessId: audit.businessId,
        status: audit.status,
        channelReadiness: audit.channelReadiness,
        summary: audit.summary,
      })),
      offers: offers.map((offer) => ({
        id: offer.id,
        businessId: offer.businessId,
        status: offer.status,
        packageName: offer.packageName,
        amountTry: offer.amountTry,
      })),
      deliveryProjects: deliveryProjects.map((project) => ({
        id: project.id,
        businessId: project.businessId,
        status: project.status,
        scope: project.scope,
      })),
    }
  } catch {
    return projectOsMockData
  }
}
