import type { ConsultationContextRef, ConsultationDetail } from '@/lib/consultation-center/types'

function roleLabel(type: ConsultationDetail['type']) {
  if (type === 'sales') return 'küçük işletme saha satış stratejisti'
  if (type === 'technical') return 'yalın iç operasyon sistemleri kuran ürün/teknik mimar'
  return 'KOBİ teklif ve ürün tasarımı danışmanı'
}

function formatContextRefs(refs: ConsultationContextRef[]) {
  if (!refs.length) return '- Bağlam seçilmedi'
  return refs.map((ref) => `- ${ref.title}: ${ref.ref}`).join('\n')
}

function formatBriefBlock(title: string, value?: Record<string, string | string[] | null>) {
  if (!value) return ''

  const lines = Object.entries(value)
    .map(([key, entry]) => {
      if (Array.isArray(entry)) return `- ${key}: ${entry.join(', ')}`
      return `- ${key}: ${entry || '—'}`
    })
    .join('\n')

  return lines ? `${title}:\n${lines}` : ''
}

export function buildConsultationPrompt(detail: Pick<ConsultationDetail, 'type' | 'title' | 'decisionQuestion' | 'whyNow' | 'desiredOutput' | 'contextRefs' | 'businessBrief' | 'technicalBrief' | 'sharedBrief'>) {
  const blocks = [
    `Rolün: ${roleLabel(detail.type)}.`,
    '',
    'Bağlam:',
    '- Proje: EsnafDigital',
    '- Amaç: küçük işletmeler için güven veren dijital görünürlük ve operasyon sistemi kurmak',
    `- Konu: ${detail.title}`,
    `- Karar sorusu: ${detail.decisionQuestion}`,
    `- Neden şimdi: ${detail.whyNow}`,
    `- Beklenen çıktı: ${detail.desiredOutput}`,
    '',
    'Seçili context pack:',
    formatContextRefs(detail.contextRefs),
    '',
    formatBriefBlock('İş / saha brief', detail.businessBrief),
    formatBriefBlock('Teknik brief', detail.technicalBrief),
    formatBriefBlock('Ortak karar brief', detail.sharedBrief),
    '',
    'İstenen çıktı:',
    '1. Problemi 1 cümlede yeniden tanımla',
    '2. 2-4 seçenek üret',
    '3. Seçenekleri etki / hız / risk / operasyon yükü açısından karşılaştır',
    '4. En güçlü öneriyi ver',
    '5. İlk aksiyonları kullanıcı / teknik ajan / ortak olarak ayır',
    '6. Eksik kritik veri varsa açıkça söyle',
    '',
    'Kurallar:',
    '- Türkçe yaz',
    '- Gereksiz teori verme',
    '- Düşük operasyon yükünü önemse',
    '- Emin olmadığın yerde varsayımı açık yaz',
  ].filter(Boolean)

  return blocks.join('\n')
}
