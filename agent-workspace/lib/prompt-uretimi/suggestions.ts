import type { ConsultationContextRef, ConsultationType } from '@/lib/prompt-uretimi/types'

type SuggestionInput = {
  title?: string
  note?: string
  type?: string
  workMode?: string
  targetSurface?: string
  outputType?: string
  targetModel?: string
}

export type SuggestionOutput = {
  title: string
  type: ConsultationType
  summary: string
  decisionQuestion: string
  whyNow: string
  desiredOutput: string
  contextRefs: ConsultationContextRef[]
  businessBrief?: Record<string, string | string[] | null>
  technicalBrief?: Record<string, string | string[] | null>
  sharedBrief?: Record<string, string | string[] | null>
}

type TopicSignals = {
  mobile: boolean
  menu: boolean
  landing: boolean
  offer: boolean
  auth: boolean
  segment: boolean
  flow: boolean
  openclaw: boolean
}

type WorkMode = 'audit' | 'patch' | 'strategy' | 'decision'
type TargetSurface = 'public_vitrine' | 'admin_ops' | 'context_docs' | 'cross'
type OutputType = 'decision_summary' | 'action_plan' | 'patch_plan' | 'gpt_prompt'

function normalizeType(value?: string): ConsultationType {
  if (value === 'sales' || value === 'technical' || value === 'shared') return value
  return 'shared'
}

function normalizeTitle(value?: string, note?: string) {
  const title = value?.trim()
  if (title) return title

  const raw = note?.trim() || ''
  if (!raw) return 'Yeni prompt isteği'

  const firstLine = raw.split('\n')[0]?.trim() || raw
  const shortened = firstLine.length > 72 ? `${firstLine.slice(0, 72).trim()}...` : firstLine
  return shortened || 'Yeni prompt isteği'
}

function normalizeWorkMode(value?: string): WorkMode {
  if (value === 'audit' || value === 'patch' || value === 'strategy' || value === 'decision') return value
  return 'decision'
}

function normalizeTargetSurface(value?: string): TargetSurface {
  if (value === 'public_vitrine' || value === 'admin_ops' || value === 'context_docs' || value === 'cross') return value
  return 'cross'
}

function normalizeOutputType(value?: string): OutputType {
  if (value === 'decision_summary' || value === 'action_plan' || value === 'patch_plan' || value === 'gpt_prompt') return value
  return 'action_plan'
}

function normalizeNote(value?: string) {
  const note = value?.trim()
  return note || 'Ham not girildi, önce netleştirme gerekiyor.'
}

function normalizeText(value: string) {
  return value.toLocaleLowerCase('tr-TR')
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word))
}

function detectSignals(title: string, note: string): TopicSignals {
  const text = normalizeText(`${title} ${note}`)
  return {
    mobile: hasAny(text, ['mobil', 'mobile', 'responsive', 'breakpoint', 'ekran']),
    menu: hasAny(text, ['menu', 'menü', 'nav', 'navbar', 'header']),
    landing: hasAny(text, ['landing', 'hero', 'homepage', 'ana sayfa', 'site', 'sayfa', 'vitrin']),
    offer: hasAny(text, ['teklif', 'paket', 'offer', 'pricing', 'fiyat']),
    auth: hasAny(text, ['auth', 'login', 'giriş', 'giris', 'oturum', 'session', 'token']),
    segment: hasAny(text, ['segment', 'sektör', 'sektor', 'pazar', 'arnavutköy', 'arnavutkoy']),
    flow: hasAny(text, ['audit', 'teklif', 'teslimat', 'bakım', 'bakim', 'operasyon', 'akış', 'akis']),
    openclaw: hasAny(text, ['openclaw', 'gateway', 'telegram', 'whatsapp', 'control ui', 'control-ui', 'session', 'heartbeat', 'runtime']),
  }
}

function mergeContextRefs(...groups: ConsultationContextRef[][]) {
  const seen = new Set<string>()
  const result: ConsultationContextRef[] = []

  for (const group of groups) {
    for (const ref of group) {
      const key = `${ref.kind}:${ref.ref}`
      if (seen.has(key)) continue
      seen.add(key)
      result.push(ref)
    }
  }

  return result
}

function workModeLabel(value: WorkMode) {
  if (value === 'audit') return 'audit'
  if (value === 'patch') return 'küçük patch'
  if (value === 'strategy') return 'strateji'
  return 'karar'
}

function targetSurfaceLabel(value: TargetSurface) {
  if (value === 'public_vitrine') return 'public vitrin'
  if (value === 'admin_ops') return 'admin / operasyon'
  if (value === 'context_docs') return 'context / docs'
  return 'çapraz'
}

function outputTypeLabel(value: OutputType) {
  if (value === 'decision_summary') return 'karar özeti'
  if (value === 'patch_plan') return 'patch planı'
  if (value === 'gpt_prompt') return 'GPT promptu'
  return 'aksiyon planı'
}

function desiredOutputFromMeta(value: OutputType) {
  if (value === 'decision_summary') return 'Net karar özeti, kısa gerekçe ve sonraki adımlar'
  if (value === 'patch_plan') return 'Küçük patch planı, bakılacak alanlar, riskler ve kabul kriterleri'
  if (value === 'gpt_prompt') return 'Doğrudan kullanılabilir net GPT promptu ve seçili bağlam paketi'
  return 'Uygulanabilir aksiyon planı, sahiplikler ve ilk çalışma sırası'
}

function appendMeta(sharedBrief: Record<string, string | string[] | null> | undefined, input: SuggestionInput) {
  const workMode = normalizeWorkMode(input.workMode)
  const targetSurface = normalizeTargetSurface(input.targetSurface)
  const outputType = normalizeOutputType(input.outputType)
  const targetModel = input.targetModel === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro'

  return {
    ...(sharedBrief || {}),
    workMode,
    targetSurface,
    outputType,
    targetModel,
    workModeLabel: workModeLabel(workMode),
    targetSurfaceLabel: targetSurfaceLabel(targetSurface),
    outputTypeLabel: outputTypeLabel(outputType),
    targetModelLabel: targetModel === 'gpt-5-pro' ? 'GPT-5 Pro' : 'GPT-5',
  }
}

function baseContextRefs(_type: ConsultationType): ConsultationContextRef[] {
  return [
    { kind: 'project', title: 'Proje çizgisi', ref: 'PROJECT.md' },
    { kind: 'heartbeat', title: 'Aktif faz ve öncelik', ref: 'HEARTBEAT.md' },
    { kind: 'project', title: 'Kalıcı karar çizgisi', ref: 'MEMORY.md' },
  ]
}

function topicContextRefs(signals: TopicSignals): ConsultationContextRef[] {
  const refs: ConsultationContextRef[] = []

  if (signals.offer) {
    refs.push({ kind: 'project', title: 'Teklif omurgası', ref: 'OFFERS.md' })
  }

  if (signals.segment) {
    refs.push({ kind: 'project', title: 'Segment öncelikleri', ref: 'SEGMENTS.md' })
  }

  if (signals.flow || signals.offer || signals.segment) {
    refs.push({ kind: 'roadmap', title: 'İnceleme -> Teklif -> Teslimat akışı', ref: 'PLAYBOOKS/audit-offer-delivery.md' })
  }

  if (signals.openclaw) {
    refs.push({ kind: 'roadmap', title: 'OpenClaw runtime davranışı', ref: 'AGENTS.md' })
  }

  return refs
}

function getMobileWebsiteSuggestion(title: string, note: string): SuggestionOutput {
  return {
    title,
    type: 'shared',
    summary: note,
    decisionQuestion: 'Küçük işletme vitrini üretirken mobilde sayfa gereksiz uzamasın, menü sade kalsın ve ana CTA erken görünsün diye üretim promptunu nasıl kurmalıyız?',
    whyNow: 'Üretilen sayfalar masaüstünde idare etse de mobilde section sayısı, içerik yoğunluğu ve üst alan yükü yüzünden akış zayıflıyor. Bunu kod sonrasında toplamak yerine prompt seviyesinde baştan sınırlamak gerekiyor.',
    desiredOutput: 'Mobile-first ana prompt, section sayısı sınırı, menü kuralları, CTA yerleşim ilkeleri, içerik yoğunluğu guardrail listesi ve kısa responsive QA checklisti',
    contextRefs: mergeContextRefs(
      baseContextRefs('shared'),
      [{ kind: 'decision', title: 'Marka ve tasarım sistemi', ref: 'DECISIONS/2026-04-19-brand-design-system.md' }],
    ),
    sharedBrief: {
      hamNot: note,
      kararCekirdegi: 'Mobilde daha kısa, daha hızlı taranan ve CTA’sı erken gelen küçük işletme vitrini promptu',
      anaSorunlar: [
        'mobilde section sayısının gereksiz artması',
        'menü ve üst alanın fazla yer kaplaması',
        'ana CTA’nın çok aşağı düşmesi',
        'kart ve metin bloklarının üst üste birikmesi',
      ],
      hedef: [
        'mobile-first kurgu',
        'kısa ve net section akışı',
        'ilk ekrana yakın CTA',
        'sade menü mantığı',
      ],
      guardrails: [
        'mobilde gereksiz section çoğaltma',
        'hero altında erken CTA zorunlu olsun',
        'menü öğeleri minimumda kalsın',
        'metin blokları kısa taranabilir parçalara bölünsün',
      ],
    },
  }
}

function getOfferSuggestion(title: string, note: string, type: ConsultationType): SuggestionOutput {
  if (type === 'sales') {
    return {
      title,
      type,
      summary: note,
      decisionQuestion: `${title} konusu için sahada kolay anlatılan teklif yapısını nasıl kurmalıyız?`,
      whyNow: 'Teklif dili sahada karışırsa görüşme açmak zorlaşıyor ve teslimat beklentisi baştan bulanıklaşıyor.',
      desiredOutput: 'Kısa satış dili, paket sınırı, itiraz cevapları ve sahada test edilecek net teklif çerçevesi',
      contextRefs: baseContextRefs(type),
      businessBrief: {
        segment: 'Henüz net değil',
        region: 'Henüz net değil',
        commercialGoal: 'Teklifi kısa, net ve satılabilir hale getirmek',
      },
      sharedBrief: {
        hamNot: note,
      },
    }
  }

  return {
    title,
    type: 'shared',
    summary: note,
    decisionQuestion: `${title} konusu için en sade teklif/paket yapısını nasıl kurmalıyız?`,
    whyNow: 'Teklif yapısı netleşmeden satış dili ve teslimat sınırı dağınık kalıyor.',
    desiredOutput: 'Paket yapısı, kapsam sınırı, hariçler, yükseltme mantığı ve kısa satış anlatımı',
    contextRefs: mergeContextRefs(
      baseContextRefs('shared'),
      [{ kind: 'roadmap', title: 'Orta vadeli yön', ref: 'ROADMAP.md' }],
    ),
    sharedBrief: {
      hamNot: note,
      kararCekirdegi: 'Az seçenekli, kolay anlatılan, teslimat yükü taşınabilir teklif yapısı',
      hedef: [
        'paket sayısını düşürmek',
        'kapsam sınırını netleştirmek',
        'saha anlatımını sadeleştirmek',
      ],
    },
  }
}

function getAuthSuggestion(title: string, note: string): SuggestionOutput {
  return {
    title,
    type: 'technical',
    summary: note,
    decisionQuestion: `${title} konusu için en sade ve güvenli auth akışını nasıl kurmalıyız?`,
    whyNow: 'Auth tarafı bozuk kaldığında giriş, oturum devamlılığı ve kullanıcı güveni doğrudan etkileniyor.',
    desiredOutput: 'Önerilen auth yaklaşımı, etkilenen modüller, hata kaynakları, acceptance criteria ve ilk düzeltme adımları',
    contextRefs: baseContextRefs('technical'),
    technicalBrief: {
      affectedModule: ['Auth', 'Session', 'Login'],
      currentProblem: note,
      acceptanceCriteria: [
        'giriş akışı tutarlı çalışmalı',
        'oturum durumu net görünmeli',
        'yenilemede kullanıcı düşmemeli',
      ],
    },
    sharedBrief: {
      hamNot: note,
    },
  }
}

function getGenericSalesSuggestion(title: string, note: string): SuggestionOutput {
  return {
    title,
    type: 'sales',
    summary: note,
    decisionQuestion: `${title} konusu için sahada en anlaşılır yaklaşım ne olmalı?`,
    whyNow: `${title} konusu satış konuşmasını etkiliyor ve sahada daha net bir dil ihtiyacı var.`,
    desiredOutput: 'Net konuşma önerisi, kısa saha mesajları, itiraz cevapları ve test edilecek 1-2 yaklaşım',
    contextRefs: baseContextRefs('sales'),
    businessBrief: {
      segment: 'Henüz net değil',
      region: 'Henüz net değil',
      commercialGoal: note,
    },
    sharedBrief: {
      hamNot: note,
    },
  }
}

function getGenericTechnicalSuggestion(title: string, note: string): SuggestionOutput {
  return {
    title,
    type: 'technical',
    summary: note,
    decisionQuestion: `${title} konusu için en sade teknik yaklaşım ne olmalı?`,
    whyNow: `${title} konusu mevcut akışı etkiliyor ve önce doğru teknik sınırı netleştirmek gerekiyor.`,
    desiredOutput: 'Önerilen teknik yaklaşım, sınırlar, riskler ve ilk uygulama adımları',
    contextRefs: baseContextRefs('technical'),
    technicalBrief: {
      affectedModule: [title],
      currentProblem: note,
    },
    sharedBrief: {
      hamNot: note,
    },
  }
}

function getGenericSharedSuggestion(title: string, note: string): SuggestionOutput {
  return {
    title,
    type: 'shared',
    summary: note,
    decisionQuestion: `${title} konusu için en doğru karar çerçevesi nasıl kurulmalı?`,
    whyNow: `${title} konusu şu an netleşirse sonraki iş adımları daha temiz ilerler.`,
    desiredOutput: 'Net karar çerçevesi, önerilen yaklaşım, seçenekler ve ilk aksiyonlar',
    contextRefs: baseContextRefs('shared'),
    sharedBrief: {
      hamNot: note,
      kararCekirdegi: title,
    },
  }
}

export function suggestConsultationBrief(input: SuggestionInput): SuggestionOutput {
  const type = normalizeType(input.type)
  const title = normalizeTitle(input.title, input.note)
  const note = normalizeNote(input.note)
  const signals = detectSignals(title, note)
  const workMode = normalizeWorkMode(input.workMode)
  const targetSurface = normalizeTargetSurface(input.targetSurface)
  const outputType = normalizeOutputType(input.outputType)

  const finalize = (suggestion: SuggestionOutput): SuggestionOutput => ({
    ...suggestion,
    whyNow: `${suggestion.whyNow} İlk girişte iş modu ${workModeLabel(workMode)}, hedef yüzey ${targetSurfaceLabel(targetSurface)} ve çıktı tipi ${outputTypeLabel(outputType)} olarak işaretlendi.`,
    desiredOutput: outputType === 'action_plan' ? suggestion.desiredOutput : desiredOutputFromMeta(outputType),
    contextRefs: mergeContextRefs(suggestion.contextRefs, topicContextRefs(signals)),
    sharedBrief: appendMeta(suggestion.sharedBrief, input),
  })

  if ((signals.mobile || signals.menu) && signals.landing) {
    return finalize(getMobileWebsiteSuggestion(title, note))
  }

  if (signals.offer) {
    return finalize(getOfferSuggestion(title, note, type))
  }

  if (type === 'technical' && signals.auth) {
    return finalize(getAuthSuggestion(title, note))
  }

  if (type === 'sales') return finalize(getGenericSalesSuggestion(title, note))
  if (type === 'technical') return finalize(getGenericTechnicalSuggestion(title, note))
  return finalize(getGenericSharedSuggestion(title, note))
}
