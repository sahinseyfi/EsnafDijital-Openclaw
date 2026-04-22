import type { Consultation, ConsultationAction, ConsultationBrief, ConsultationRun } from '@prisma/client'
import { evaluateConsultation } from '@/lib/consultation-center/evaluator'
import { inferConsultationStage } from '@/lib/consultation-center/stage'
import { prisma } from '@/lib/prisma'
import { addMockConsultationAction, addMockConsultationRun, createMockConsultation, deleteMockConsultation, getConsultationCenterPayload as getMockConsultationCenterPayload, getConsultationDetail as getMockConsultationDetail, updateMockConsultation, updateMockConsultationActionStatus } from '@/lib/consultation-center/mock'
import { suggestConsultationBrief } from '@/lib/consultation-center/suggestions'
import type { ConsultationCenterPayload, ConsultationContextRef, ConsultationDetail, ConsultationInboxItem, ConsultationOwnerRole, ConsultationPromptStatus, ConsultationRoute, ConsultationStage, ConsultationTargetModel, ConsultationType } from '@/lib/consultation-center/types'

type ConsultationUpdateInput = {
  title?: string
  decisionQuestion?: string
  whyNow?: string
  desiredOutput?: string
  summary?: string
  stage?: ConsultationStage
  dueAt?: string | null
  targetModel?: ConsultationTargetModel
  businessBrief?: Record<string, string | string[] | null>
  technicalBrief?: Record<string, string | string[] | null>
  sharedBrief?: Record<string, string | string[] | null>
  contextRefs?: ConsultationContextRef[]
}

type ConsultationActionInput = {
  title?: string
  ownerRole?: ConsultationOwnerRole
  linkedEntityType?: 'project_os' | 'context_center'
  linkedEntityId?: string
}

type ConsultationRunInput = {
  modelName?: ConsultationTargetModel
  promptText?: string
  responseSummary?: string
}

type ConsultationActionStatusInput = {
  status: 'open' | 'done'
}

function mapActionType(input: ConsultationActionInput) {
  if (input.linkedEntityType === 'context_center') return 'decision_note' as const
  if (input.linkedEntityType === 'project_os') return 'project_task' as const
  return 'followup' as const
}

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

function mapTargetModel(value?: string | null): ConsultationTargetModel {
  return value === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'
}

function mapPromptStatus(value?: string | null, promptText?: string | null): ConsultationPromptStatus {
  if (value === 'preparing' || value === 'ready' || value === 'error') return value
  return promptText?.trim() ? 'ready' : 'preparing'
}

function getPreparedPromptText(sharedBrief?: Record<string, string | string[] | null>, latestPromptText?: string | null) {
  const latest = latestPromptText?.trim() || ''
  if (latest) return latest

  return typeof sharedBrief?.preparedPromptText === 'string' ? sharedBrief.preparedPromptText.trim() : ''
}

function getPromptError(sharedBrief?: Record<string, string | string[] | null>) {
  return typeof sharedBrief?.promptError === 'string' && sharedBrief.promptError.trim()
    ? sharedBrief.promptError.trim()
    : null
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
  const latestRun = [...record.runs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
  const promptText = getPreparedPromptText(sharedBrief, latestRun?.promptText || null)
  const promptStatus = mapPromptStatus(sharedBrief?.promptStatus as string | undefined, promptText)
  const promptError = getPromptError(sharedBrief)
  const actions: ConsultationDetail['actions'] = record.actions.map((action) => ({
    id: action.id,
    ownerRole: mapOwnerRole(action.ownerRole),
    title: action.title,
    status: action.status === 'done' ? 'done' : 'open',
    linkedEntityType: action.linkedEntityType === 'project_os' || action.linkedEntityType === 'context_center' ? action.linkedEntityType : undefined,
    linkedEntityId: action.linkedEntityId || undefined,
  }))
  const stage = inferConsultationStage({
    currentStage: mapConsultationStage(record.stage),
    decisionQuestion: record.decisionQuestion,
    whyNow: record.whyNow,
    desiredOutput: record.goal,
    missingFields: evaluation.missingFields,
    route: evaluation.route,
    promptText: promptText || null,
    sentAt: latestRun?.sentAt?.toISOString() || null,
    responseSummary: latestRun?.responseSummary || null,
    actions,
  })

  return {
    id: record.id,
    title: record.title,
    type: mapConsultationType(record.type),
    stage,
    route: evaluation.route,
    ownerRole: evaluation.ownerRole,
    dueAt: record.dueAt ? record.dueAt.toISOString() : null,
    updatedAt: record.updatedAt.toISOString(),
    decisionQuestion: record.decisionQuestion || 'Karar sorusu henüz yazılmadı',
    summary: buildSummary(record),
    gptRecommended: evaluation.gptRecommended,
    promptStatus,
    promptError,
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
  const targetModel = mapTargetModel(latestRun?.modelName || (sharedBrief?.targetModel as string | undefined))
  const promptText = getPreparedPromptText(sharedBrief, latestRun?.promptText || null)
  const actions: ConsultationDetail['actions'] = record.actions.map((action) => ({
    id: action.id,
    ownerRole: mapOwnerRole(action.ownerRole),
    title: action.title,
    status: action.status === 'done' ? 'done' : 'open',
    linkedEntityType: action.linkedEntityType === 'project_os' || action.linkedEntityType === 'context_center' ? action.linkedEntityType : undefined,
    linkedEntityId: action.linkedEntityId || undefined,
  }))
  const stage = inferConsultationStage({
    currentStage: inbox.stage,
    decisionQuestion: record.decisionQuestion,
    whyNow: record.whyNow,
    desiredOutput: record.goal,
    missingFields: evaluation.missingFields,
    route: evaluation.route,
    promptText,
    sentAt: latestRun?.sentAt?.toISOString() || null,
    responseSummary: latestRun?.responseSummary || null,
    actions,
  })

  return {
    ...inbox,
    stage,
    whyNow: record.whyNow || 'Henüz yazılmadı',
    desiredOutput: record.goal || 'Henüz seçilmedi',
    missingFields: evaluation.missingFields,
    businessBrief,
    technicalBrief,
    sharedBrief,
    contextRefs,
    promptStatus: mapPromptStatus(sharedBrief?.promptStatus as string | undefined, promptText),
    promptError: getPromptError(sharedBrief),
    promptRun: {
      modelName: targetModel,
      promptText,
      sentAt: latestRun?.sentAt?.toISOString() || null,
      responseSummary: latestRun?.responseSummary || null,
    },
    actions,
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

export async function createConsultation(input: {
  title?: string
  type?: string
  note?: string
  workMode?: string
  targetSurface?: string
  outputType?: string
  targetModel?: ConsultationTargetModel
}) {
  if (!hasDatabaseUrl()) {
    const created = await createMockConsultation(input)
    return {
      created,
      payload: await getMockConsultationCenterPayload(created.id),
    }
  }

  try {
    const suggestion = suggestConsultationBrief(input)
    const created = await prisma.consultation.create({
      data: {
        title: suggestion.title,
        type: mapConsultationType(suggestion.type),
        stage: 'draft',
        status: 'open',
        ownerRole: suggestion.type === 'sales' ? 'user' : suggestion.type === 'technical' ? 'tech_agent' : 'shared',
        consultRoute: 'blocked',
        decisionQuestion: suggestion.decisionQuestion,
        goal: suggestion.desiredOutput,
        whyNow: suggestion.whyNow,
        brief: {
          create: {
            businessJson: suggestion.businessBrief,
            technicalJson: suggestion.technicalBrief,
            sharedJson: {
              ...(suggestion.sharedBrief || {}),
              targetModel: mapTargetModel(input.targetModel),
              promptStatus: 'preparing',
              promptError: null,
              preparedPromptText: '',
            },
            contextRefsJson: suggestion.contextRefs,
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
    const created = await createMockConsultation(input)
    return {
      created,
      payload: await getMockConsultationCenterPayload(created.id),
    }
  }
}

export async function updateConsultation(id: string, input: ConsultationUpdateInput) {
  if (!hasDatabaseUrl()) {
    const updated = await updateMockConsultation(id, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }

  try {
    const current = await prisma.consultation.findUnique({
      where: { id },
      include: {
        brief: true,
      },
    })

    const currentSharedBrief = (current?.brief?.sharedJson as Record<string, string | string[] | null> | null) || {}
    const nextSharedBrief = {
      ...currentSharedBrief,
      ...(input.sharedBrief || {}),
      ...(input.summary?.trim() ? { hamNot: input.summary.trim() } : {}),
      ...(input.targetModel ? { targetModel: mapTargetModel(input.targetModel) } : {}),
    }

    const updated = await prisma.consultation.update({
      where: { id },
      data: {
        title: input.title?.trim(),
        decisionQuestion: input.decisionQuestion?.trim(),
        whyNow: input.whyNow?.trim(),
        goal: input.desiredOutput?.trim(),
        stage: input.stage,
        dueAt: input.dueAt === undefined ? undefined : (input.dueAt ? new Date(input.dueAt) : null),
        brief: {
          upsert: {
            create: {
              businessJson: input.businessBrief,
              technicalJson: input.technicalBrief,
              sharedJson: nextSharedBrief,
              contextRefsJson: input.contextRefs,
            },
            update: {
              businessJson: input.businessBrief,
              technicalJson: input.technicalBrief,
              sharedJson: nextSharedBrief,
              contextRefsJson: input.contextRefs,
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
      updated: mapRecordToDetail(updated),
      payload: await getConsultationCenterPayload(id),
    }
  } catch {
    const updated = await updateMockConsultation(id, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }
}

export async function addConsultationAction(id: string, input: ConsultationActionInput) {
  if (!hasDatabaseUrl()) {
    const updated = await addMockConsultationAction(id, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }

  try {
    await prisma.consultationAction.create({
      data: {
        consultationId: id,
        ownerRole: input.ownerRole || 'shared',
        actionType: mapActionType(input),
        title: input.title?.trim() || 'Yeni aksiyon',
        linkedEntityType: input.linkedEntityType,
        linkedEntityId: input.linkedEntityId?.trim() || null,
      },
    })

    const updated = await getConsultationDetail(id)
    return updated ? { updated, payload: await getConsultationCenterPayload(id) } : null
  } catch {
    const updated = await addMockConsultationAction(id, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }
}

export async function addConsultationRun(id: string, input: ConsultationRunInput) {
  if (!hasDatabaseUrl()) {
    const updated = await addMockConsultationRun(id, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }

  try {
    const current = await getConsultationDetail(id)
    const promptText = input.promptText?.trim() || current?.promptRun.promptText || ''

    await prisma.consultationRun.create({
      data: {
        consultationId: id,
        modelName: mapTargetModel(input.modelName || current?.promptRun.modelName),
        promptText,
        sentAt: new Date(),
        responseSummary: input.responseSummary?.trim() || null,
      },
    })

    await prisma.consultation.update({
      where: { id },
      data: {
        stage: 'answered',
        brief: {
          update: {
            sharedJson: {
              ...((current?.sharedBrief || {}) as Record<string, string | string[] | null>),
              promptStatus: 'ready',
              promptError: null,
            },
          },
        },
      },
    })

    const updated = await getConsultationDetail(id)
    return updated ? { updated, payload: await getConsultationCenterPayload(id) } : null
  } catch {
    const updated = await addMockConsultationRun(id, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }
}

export async function deleteConsultation(id: string) {
  if (!hasDatabaseUrl()) {
    const deleted = await deleteMockConsultation(id)
    return deleted ? { payload: await getMockConsultationCenterPayload() } : null
  }

  try {
    await prisma.consultationAction.deleteMany({ where: { consultationId: id } })
    await prisma.consultationRun.deleteMany({ where: { consultationId: id } })
    await prisma.consultationBrief.deleteMany({ where: { consultationId: id } })
    await prisma.consultation.delete({ where: { id } })
    return { payload: await getConsultationCenterPayload() }
  } catch {
    const deleted = await deleteMockConsultation(id)
    return deleted ? { payload: await getMockConsultationCenterPayload() } : null
  }
}

export async function updateConsultationActionStatus(id: string, actionId: string, input: ConsultationActionStatusInput) {
  if (!hasDatabaseUrl()) {
    const updated = await updateMockConsultationActionStatus(id, actionId, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }

  try {
    await prisma.consultationAction.update({
      where: { id: actionId },
      data: {
        status: input.status === 'done' ? 'done' : 'open',
      },
    })

    const actionRows = await prisma.consultationAction.findMany({
      where: { consultationId: id },
      select: { status: true },
    })

    await prisma.consultation.update({
      where: { id },
      data: {
        stage: actionRows.length > 0 && actionRows.every((action) => action.status === 'done') ? 'actioned' : undefined,
      },
    })

    const updated = await getConsultationDetail(id)
    return updated ? { updated, payload: await getConsultationCenterPayload(id) } : null
  } catch {
    const updated = await updateMockConsultationActionStatus(id, actionId, input)
    return updated ? { updated, payload: await getMockConsultationCenterPayload(id) } : null
  }
}
