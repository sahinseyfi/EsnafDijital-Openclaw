import type { ConsultationContextRef, ConsultationDetail, ConsultationTargetModel } from '@/lib/consultation-center/types'

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

function resolveTargetModel(sharedBrief?: Record<string, string | string[] | null>) {
  const raw = typeof sharedBrief?.targetModel === 'string' ? sharedBrief.targetModel.trim().toLowerCase() : ''
  return raw === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'
}

function targetModelLabel(model: ConsultationTargetModel) {
  return model === 'gpt-5-pro' ? 'GPT-5 Pro' : 'GPT-5'
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

export function buildPromptSummary(detail: Pick<ConsultationDetail, 'title' | 'sharedBrief'>) {
  const targetModel = resolveTargetModel(detail.sharedBrief)
  const primaryTask = typeof detail.sharedBrief?.primaryTask === 'string' ? detail.sharedBrief.primaryTask.trim() : ''
  const promptStrategy = typeof detail.sharedBrief?.promptStrategy === 'string' ? detail.sharedBrief.promptStrategy.trim() : 'single_prompt'
  const parkedQuestions = Array.isArray(detail.sharedBrief?.parkedQuestions) ? detail.sharedBrief.parkedQuestions.filter((item): item is string => Boolean(item)) : []

  return [
    `Bu prompt, ${detail.title} konusu için hazırlanıyor ve sonucu VPS'te çalışan OpenClaw ajanına yön vermek için kullanılacak.`,
    primaryTask ? `Bu turda tek odak: ${primaryTask}.` : '',
    promptStrategy === 'split_recommended'
      ? 'Not çok parçalı görüldüğü için sistem tek ana prompt kurdu, kalan başlıkları ayrı takip için park etti.'
      : 'Varsayılan çizgi korundu, sistem tek ana prompt kurdu ve diğer başlıkları prompta taşırmadı.',
    parkedQuestions.length > 0 ? `Bu tur dışında bırakılan ${parkedQuestions.length} soru ayrıca park edildi.` : '',
    'Karşı GPT oturumunun hiçbir hafızası olmadığı varsayılıyor, bu yüzden gerekli proje bağlamı promptun içine taşınıyor.',
    targetModel === 'gpt-5-pro'
      ? 'GPT-5 Pro seçili olduğu için prompt daha dikkatli, daha eksiksiz ve daha iyi düşünülmüş kuruluyor. Cevap daha geç gelebilir.'
      : 'GPT-5 seçili olduğu için prompt daha kompakt tutuluyor ama yine de kritik bağlam korunuyor.',
    'Karşı taraftan teknik önerinin yanında, teknik olmayan kısa bir özet de isteniyor.',
  ].filter(Boolean)
}

export function buildConsultationPrompt(detail: Pick<ConsultationDetail, 'type' | 'title' | 'decisionQuestion' | 'whyNow' | 'desiredOutput' | 'contextRefs' | 'businessBrief' | 'technicalBrief' | 'sharedBrief'>) {
  const rawRequest = typeof detail.sharedBrief?.hamNot === 'string' && detail.sharedBrief.hamNot.trim()
    ? detail.sharedBrief.hamNot.trim()
    : 'Ham istek metni yok.'
  const targetModel = resolveTargetModel(detail.sharedBrief)

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
    '- Çalışma ortamı: website bir VPS üzerinde çalışıyor.',
    '- Uygulama modeli: kullanıcı bu değişikliği VPS üzerinde çalışan OpenClaw ajanına yaptırıyor.',
    '- Kullanım şekli: bu promptun çıktısı, ajanı yönlendirmek için kullanılacak.',
    '- Hafıza varsayımı: karşı GPT oturumu projeyi ilk kez görüyor, önceki konuşmaları ve kararları bilmiyor.',
    `- Hedef model: ${targetModelLabel(targetModel)}`,
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
    '- Bu promptun okuyucusunun sıfır hafızalı yeni bir GPT oturumu olduğunu unutma; kritik bağlamı dışarıda bırakma.',
    targetModel === 'gpt-5-pro'
      ? '- GPT-5 Pro için yazıyorsun. Cevap geç gelebileceği için hızdan çok doğruluk, eksiksizlik ve düşünülmüş yapı öncelikli olsun.'
      : '- GPT-5 için yazıyorsun. Promptu gereksiz uzatmadan net ve yük taşıyan cümlelerle kur.',
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
    '8. Teknik olmayan kısa özet (3-5 madde, sade Türkçe)',
    '</output_format>',
  ].filter(Boolean)

  return blocks.join('\n')
}
