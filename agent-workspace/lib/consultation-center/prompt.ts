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

function formatRepoRefs(detail: Pick<ConsultationDetail, 'title' | 'decisionQuestion' | 'desiredOutput' | 'technicalBrief' | 'sharedBrief'>) {
  const projectRepo = 'https://github.com/sahinseyfi/EsnafDijital-Openclaw'
  const openclawRepo = 'https://github.com/openclaw/openclaw'
  const haystack = [
    detail.title,
    detail.decisionQuestion,
    detail.desiredOutput,
    ...Object.values(detail.technicalBrief || {}),
    ...Object.values(detail.sharedBrief || {}),
  ]
    .flatMap((value) => Array.isArray(value) ? value : [value])
    .filter((value): value is string => Boolean(value))
    .join(' ')
    .toLocaleLowerCase('tr-TR')

  const needsOpenclawRef = containsAny(haystack, [
    'openclaw',
    'gateway',
    'telegram',
    'whatsapp',
    'heartbeat',
    'session',
    'pairing',
    'control ui',
    'control-ui',
    'runtime',
    'channel',
  ])

  return [
    'Repo referansları:',
    `- Çalışılan repo: ${projectRepo}`,
    needsOpenclawRef ? `- OpenClaw upstream referansı (gerektiğinde): ${openclawRepo}` : '',
  ].filter(Boolean).join('\n')
}

export function buildConsultationPrompt(detail: Pick<ConsultationDetail, 'type' | 'title' | 'decisionQuestion' | 'whyNow' | 'desiredOutput' | 'contextRefs' | 'businessBrief' | 'technicalBrief' | 'sharedBrief'>) {
  const rawRequest = typeof detail.sharedBrief?.hamNot === 'string' && detail.sharedBrief.hamNot.trim()
    ? detail.sharedBrief.hamNot.trim()
    : 'Ham istek metni yok.'

  const blocks = [
    '<role>',
    `Sen ${roleLabel(detail)} olarak hareket et.`,
    '</role>',
    '',
    '<goal>',
    'Aşağıdaki değişiklik isteğini değerlendir, karar vermeyi kolaylaştıracak net bir cevap üret ve gereksiz teoriye kaçma.',
    '</goal>',
    '',
    '<task>',
    '- Önce isteği doğru anla ve 1 cümlede yeniden yaz.',
    '- Gerekirse makul varsayımlarla ilerle, ama varsayımları açık işaretle.',
    '- Çözüm önerilerini mevcut repo ve ürün çizgisiyle uyumlu tut.',
    '- Amaç, karar vermeyi kolaylaştırmak; gereksiz seçenek çoğaltmak değil.',
    '</task>',
    '',
    '<context>',
    '- Proje: EsnafDigital',
    '- Amaç: küçük işletmeler için güven veren dijital görünürlük ve operasyon sistemi kurmak',
    '- Ana akış: Audit -> Teklif -> Teslimat -> Bakım',
    `- Konu: ${detail.title}`,
    `- Ham değişiklik isteği: ${rawRequest}`,
    `- Karar sorusu: ${detail.decisionQuestion}`,
    `- Neden şimdi: ${detail.whyNow}`,
    `- Beklenen çıktı: ${detail.desiredOutput}`,
    '</context>',
    '',
    '<selected_context_pack>',
    formatContextRefs(detail.contextRefs),
    '</selected_context_pack>',
    '',
    '<repo_references>',
    formatRepoRefs(detail),
    '</repo_references>',
    '',
    '<brief_details>',
    formatBriefBlock('İş / saha brief', detail.businessBrief),
    formatBriefBlock('Teknik brief', detail.technicalBrief),
    formatBriefBlock('Ortak karar brief', detail.sharedBrief),
    '</brief_details>',
    '',
    '<constraints>',
    '- Türkçe yaz.',
    '- Kısa, net ve uygulanabilir ol.',
    '- Düşük operasyon yükünü önemse.',
    '- Mümkünse mevcut yapıya uyumlu ilerle; sırf yeni sistem önermek için yeni sistem önerme.',
    '- Eksik veri varsa en fazla 3 maddede yaz ve geri kalanında makul varsayımlarla devam et.',
    '- Kod veya repo referansı gerekiyorsa önce verilen repo linklerini temel al.',
    '</constraints>',
    '',
    '<output_format>',
    'Yanıtı tam olarak şu başlıklarla üret:',
    '1. İsteğin yeniden yazımı',
    '2. Varsayımlar / belirsizlikler',
    '3. Seçenekler',
    '4. Karşılaştırma (etki / hız / risk / operasyon yükü)',
    '5. En güçlü öneri',
    '6. Net karar',
    '7. İlk adımlar',
    '</output_format>',
  ].filter(Boolean)

  return blocks.join('\n')
}
