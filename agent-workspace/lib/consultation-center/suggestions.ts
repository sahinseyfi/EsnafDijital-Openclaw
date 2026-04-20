import type { ConsultationContextRef, ConsultationType } from '@/lib/consultation-center/types'

type SuggestionInput = {
  title?: string
  note?: string
  type?: string
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
}

function normalizeType(value?: string): ConsultationType {
  if (value === 'sales' || value === 'technical' || value === 'shared') return value
  return 'shared'
}

function normalizeTitle(value?: string) {
  const title = value?.trim()
  return title || 'Yeni danışma konusu'
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

function baseContextRefs(type: ConsultationType): ConsultationContextRef[] {
  const refs: ConsultationContextRef[] = [
    { kind: 'project', title: 'Proje çizgisi', ref: 'PROJECT.md' },
    { kind: 'heartbeat', title: 'Aktif faz ve öncelik', ref: 'HEARTBEAT.md' },
  ]

  if (type === 'shared') {
    refs.push({ kind: 'project', title: 'Kalıcı karar çizgisi', ref: 'MEMORY.md' })
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
  const title = normalizeTitle(input.title)
  const note = normalizeNote(input.note)
  const signals = detectSignals(title, note)

  if ((signals.mobile || signals.menu) && signals.landing) {
    return getMobileWebsiteSuggestion(title, note)
  }

  if (signals.offer) {
    return getOfferSuggestion(title, note, type)
  }

  if (type === 'technical' && signals.auth) {
    return getAuthSuggestion(title, note)
  }

  if (type === 'sales') return getGenericSalesSuggestion(title, note)
  if (type === 'technical') return getGenericTechnicalSuggestion(title, note)
  return getGenericSharedSuggestion(title, note)
}
