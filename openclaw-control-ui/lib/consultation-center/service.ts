import type { Consultation, ConsultationAction, ConsultationBrief, ConsultationRun } from '@prisma/client'
import { evaluateConsultation } from '@/lib/consultation-center/evaluator'
import { buildConsultationPrompt } from '@/lib/consultation-center/prompt'
import { prisma } from '@/lib/prisma'
import { createMockConsultation, getConsultationCenterPayload as getMockConsultationCenterPayload, getConsultationDetail as getMockConsultationDetail } from '@/lib/consultation-center/mock'
import type { ConsultationCenterPayload, ConsultationDetail, ConsultationInboxItem, ConsultationOwnerRole, ConsultationRoute, ConsultationStage, ConsultationType } from '@/lib/consultation-center/types'

type ConsultationRecord = Consultation & {
  brief: ConsultationBrief | null
  runs: ConsultationRun[]
  actions: ConsultationAction[]
}

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim())
}

function mapConsultationType(value: string): ConsultationType {
  if (value === 'sales' || value === 'technical' || value === 'shared') return value
  return 'shared'
}

function mapConsultationStage(value: string): ConsultationStage {
  const stages = new Set<ConsultationStage>(['draft', 'clarifying', 'goal_set', 'context_ready', 'blocked', 'internal', 'external', 'ready_to_send', 'answered', 'actioned'])
  return stages.has(value as ConsultationStage) ? (value as ConsultationStage) : 'draft'
}

function mapConsultationRoute(value?: string | null): ConsultationRoute {
  if (value === 'blocked' || value === 'internal' || value === 'external') return value
  return 'internal'
}

function mapOwnerRole(value?: string | null): ConsultationOwnerRole {
  if (value === 'user' || value === 'tech_agent' || value === 'shared') return value
  return 'shared'
}

function buildSummary(record: ConsultationRecord) {
  const brief = record.brief?.sharedJson as Record<string, unknown> | null
  const summary = typeof brief?.hamNot === 'string' && brief.hamNot.trim()
    ? brief.hamNot.trim()
    : record.goal?.trim() || record.whyNow?.trim() || 'Özet henüz yazılmadı'
  return summary
}

function mapRecordToInboxItem(record: ConsultationRecord): ConsultationInboxItem {
  const businessBrief = (record.brief?.businessJson as Record<string, string | string[] | null> | null) || undefined
  const technicalBrief = (record.brief?.technicalJson as Record<string, string | string[] | null> | null) || undefined
  const sharedBrief = (record.brief?.sharedJson as Record<string, string | string[] | null> | null) || undefined
  const contextRefs = (record.brief?.contextRefsJson as ConsultationDetail['contextRefs'] | null) || []
  const evaluation = evaluateConsultation({
    type: mapConsultationType(record.type),
    decisionQuestion: record.decisionQuestion,
    whyNow: record.whyNow,
    desiredOutput: record.goal,
    contextRefs,
    businessBrief,
    technicalBrief,
    sharedBrief,
  })

  return {
    id: record.id,
    title: record.title,
    type: mapConsultationType(record.type),
    stage: mapConsultationStage(record.stage),
    route: evaluation.route,
    ownerRole: evaluation.ownerRole,
    dueAt: record.dueAt ? record.dueAt.toISOString() : null,
    updatedAt: record.updatedAt.toISOString(),
    decisionQuestion: record.decisionQuestion || 'Karar sorusu henüz yazılmadı',
    summary: buildSummary(record),
    gptRecommended: evaluation.gptRecommended,
  }
}

function mapRecordToDetail(record: ConsultationRecord): ConsultationDetail {
  const inbox = mapRecordToInboxItem(record)
  const brief = record.brief
  const latestRun = [...record.runs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
  const businessBrief = (brief?.businessJson as Record<string, string | string[] | null> | null) || undefined
  const technicalBrief = (brief?.technicalJson as Record<string, string | string[] | null> | null) || undefined
  const sharedBrief = (brief?.sharedJson as Record<string, string | string[] | null> | null) || undefined
  const contextRefs = (brief?.contextRefsJson as ConsultationDetail['contextRefs'] | null) || []
  const evaluation = evaluateConsultation({
    type: inbox.type,
    decisionQuestion: record.decisionQuestion,
    whyNow: record.whyNow,
    desiredOutput: record.goal,
    contextRefs,
    businessBrief,
    technicalBrief,
    sharedBrief,
  })
  const promptText = latestRun?.promptText || (evaluation.route === 'external'
    ? buildConsultationPrompt({
        type: inbox.type,
        title: record.title,
        decisionQuestion: record.decisionQuestion || 'Karar sorusu henüz yazılmadı',
        whyNow: record.whyNow || 'Henüz yazılmadı',
        desiredOutput: record.goal || 'Henüz seçilmedi',
        contextRefs,
        businessBrief,
        technicalBrief,
        sharedBrief,
      })
    : '')

  return {
    ...inbox,
    whyNow: record.whyNow || 'Henüz yazılmadı',
    desiredOutput: record.goal || 'Henüz seçilmedi',
    missingFields: evaluation.missingFields,
    businessBrief,
    technicalBrief,
    sharedBrief,
    contextRefs,
    promptRun: {
      modelName: latestRun?.modelName || null,
      promptText,
      sentAt: latestRun?.sentAt?.toISOString() || null,
      responseSummary: latestRun?.responseSummary || null,
    },
    actions: record.actions.map((action) => ({
      id: action.id,
      ownerRole: mapOwnerRole(action.ownerRole),
      title: action.title,
      status: action.status === 'done' ? 'done' : 'open',
      linkedEntityType: action.linkedEntityType === 'project_os' || action.linkedEntityType === 'context_center' ? action.linkedEntityType : undefined,
      linkedEntityId: action.linkedEntityId || undefined,
    })),
  }
}

async function readConsultationsFromDb(): Promise<ConsultationRecord[]> {
  return prisma.consultation.findMany({
    include: {
      brief: true,
      runs: true,
      actions: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export async function getConsultationCenterPayload(selectedId?: string): Promise<ConsultationCenterPayload> {
  if (!hasDatabaseUrl()) {
    return getMockConsultationCenterPayload(selectedId)
  }

  try {
    const records = await readConsultationsFromDb()
    if (records.length === 0) {
      return getMockConsultationCenterPayload(selectedId)
    }

    const inbox = records.map(mapRecordToInboxItem)
    const selectedRecord = records.find((record) => record.id === selectedId) || records[0] || null

    return {
      inbox,
      selected: selectedRecord ? mapRecordToDetail(selectedRecord) : null,
    }
  } catch {
    return getMockConsultationCenterPayload(selectedId)
  }
}

export async function getConsultationDetail(id: string): Promise<ConsultationDetail | null> {
  if (!hasDatabaseUrl()) {
    return getMockConsultationDetail(id)
  }

  try {
    const record = await prisma.consultation.findUnique({
      where: { id },
      include: {
        brief: true,
        runs: true,
        actions: true,
      },
    })

    return record ? mapRecordToDetail(record) : null
  } catch {
    return getMockConsultationDetail(id)
  }
}

export async function createConsultation(input: { title?: string; type?: string; note?: string }) {
  if (!hasDatabaseUrl()) {
    const created = createMockConsultation(input)
    return {
      created,
      payload: getMockConsultationCenterPayload(created.id),
    }
  }

  try {
    const created = await prisma.consultation.create({
      data: {
        title: input.title?.trim() || 'Yeni danışma konusu',
        type: mapConsultationType(input.type || 'shared'),
        stage: 'draft',
        status: 'open',
        ownerRole: 'shared',
        consultRoute: 'blocked',
        decisionQuestion: 'Karar sorusu henüz net değil',
        goal: 'Henüz seçilmedi',
        whyNow: 'Henüz yazılmadı',
        brief: {
          create: {
            sharedJson: {
              hamNot: input.note?.trim() || '',
            },
          },
        },
      },
      include: {
        brief: true,
        runs: true,
        actions: true,
      },
    })

    return {
      created: mapRecordToDetail(created),
      payload: await getConsultationCenterPayload(created.id),
    }
  } catch {
    const created = createMockConsultation(input)
    return {
      created,
      payload: getMockConsultationCenterPayload(created.id),
    }
  }
}
