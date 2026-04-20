import { NextRequest, NextResponse } from 'next/server'
import { evaluateConsultation } from '@/lib/consultation-center/evaluator'
import type { ConsultationContextRef, ConsultationType } from '@/lib/consultation-center/types'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    type?: ConsultationType
    decisionQuestion?: string | null
    whyNow?: string | null
    desiredOutput?: string | null
    contextRefs?: ConsultationContextRef[]
    businessBrief?: Record<string, string | string[] | null>
    technicalBrief?: Record<string, string | string[] | null>
    sharedBrief?: Record<string, string | string[] | null>
  }

  const result = evaluateConsultation({
    type: body.type === 'sales' || body.type === 'technical' || body.type === 'shared' ? body.type : 'shared',
    decisionQuestion: body.decisionQuestion,
    whyNow: body.whyNow,
    desiredOutput: body.desiredOutput,
    contextRefs: body.contextRefs || [],
    businessBrief: body.businessBrief,
    technicalBrief: body.technicalBrief,
    sharedBrief: body.sharedBrief,
  })

  return NextResponse.json({ ok: true, result })
}
