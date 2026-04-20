import type { ConsultationContextRef, ConsultationDetail } from '@/lib/consultation-center/types'

function containsAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword))
}

function roleLabel(detail: Pick<ConsultationDetail, 'type' | 'title' | 'decisionQuestion' | 'desiredOutput' | 'businessBrief' | 'technicalBrief' | 'sharedBrief'>) {
  const haystack = [
    detail.title,
    detail.decisionQuestion,
    detail.desiredOutput,
    ...Object.values(detail.businessBrief || {}),
    ...Object.values(detail.technicalBrief || {}),
    ...Object.values(detail.sharedBrief || {}),
  ]
    .flatMap((value) => Array.isArray(value) ? value : [value])
    .filter((value): value is string => Boolean(value))
    .join(' ')
    .toLocaleLowerCase('tr-TR')

  if (containsAny(haystack, ['mobil', 'mobile', 'responsive', 'hero', 'cta', 'landing', 'vitrin', 'menü', 'menu'])) {
    return 'küçük işletmeler için mobile-first vitrin kurgusu, CTA yerleşimi ve prompt standardı tasarlayan dönüşüm odaklı dijital vitrin stratejisti'
  }

  if (containsAny(haystack, ['teklif', 'paket', 'fiyatlama', 'konumlandırma', 'ürünleştirme'])) {
    return 'küçük işletmeler için teklif yapısı ve hizmet ürünleştirme danışmanı'
  }

  if (detail.type === 'sales') return 'küçük işletme saha satış stratejisti'
  if (detail.type === 'technical') return 'yalın iç operasyon sistemleri kuran ürün/teknik mimar'
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
    `Rolün: ${roleLabel(detail)}.`,
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
