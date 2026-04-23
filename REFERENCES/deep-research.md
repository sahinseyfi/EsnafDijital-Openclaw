# Deep Research

Bu referans, EsnafDigital icin deep research kullanim cizgisini netlestirir.
OpenAI `o3-deep-research` ve `o4-mini-deep-research` modellerini baz alir.

## Amac
Deep research, uzun sureli ve cok kaynakli arastirma isleri icin kullanilir.
Hedef, arastirmayi sadece toplamak degil; karar verilebilir ciktiya donusturmektir.

EsnafDigital icin en faydali kullanimlar:
- segment acisi ve satin alma tetigi analizi
- fiyat ve paket benchmark'i
- yerel rakip konumlanma analizi
- local SEO ve Google Business Profile en iyi pratikleri
- audit bulgularini teklif kalemine baglayan ornek modeller

## Ne zaman kullanilir?
Su durumda deep research mantiklidir:
- konu birden fazla kaynak gerektiriyorsa
- pazar, rakip veya fiyat analizi gerekiyorsa
- tek tek elle taramak yerine sentez ihtiyaci varsa
- cikti, teklif veya operasyon kararini etkileyecekse

Su durumda gereksizdir:
- tek bir gercek bilgi aranıyorsa
- dogrudan ic sistem verisi yeterliyse
- hiz, derinlikten daha onemliyse
- hassas ozel veri ile acik web ayni kosuda karistirilacaksa

## Model secimi
### Varsayilan
- `o4-mini-deep-research`
- daha dusuk maliyet, daha hizli donus
- benchmark, rakip tarama, pazar kesfi icin iyi varsayilan

### Daha agir analiz
- `o3-deep-research`
- daha kritik, daha genis, daha zor analizler icin
- daha pahali ve daha yavas

## Arac cizgisi
Deep research kosusunda en az bir veri kaynagi gerekir:
- `web_search`
- `file_search`
- `remote MCP`

Opsiyonel:
- `code_interpreter`, tablo, puanlama, siniflandirma ve karsilastirma icin

EsnafDigital varsayilan cizgisi:
1. once `web_search`
2. gerekiyorsa ikinci asamada `file_search`
3. hassas veya ic veri gerekiyorsa ayri fazda `remote MCP`

## Operasyon cizgisi
### 1) Clarification
Deep research modeli kendi basina soru netlestirmez.
Bu yuzden once kisa netlestirme yapisi kurulur.

Toplanacak minimum bilgiler:
- amac ne
- hangi segment / bolge
- cikti formati ne
- fiyat mi, rakip mi, operasyon mu
- karar hangi iste kullanilacak

### 2) Prompt enrichment
Ham kullanici istegi, arastirmaya hazir bir brief'e cevrilir.
Brief icinde sunlar net olmali:
- is hedefi
- kapsam disi kalanlar
- kaynak onceligi
- beklenen cikti basliklari
- tablo / skor / ozet ihtiyaci
- tarih ve bolge siniri

### 3) Deep research kosusu
Uzun surecegi icin varsayilan olarak background mod kullan.
Ayrica `max_tool_calls` ile maliyet ve latency siniri koy.

### 4) Ciktiyi operasyon diline cevir
Arastirma sonucu ham rapor olarak kalmamali.
Asagidakilerden en az birine inmelidir:
- teklif omurgasi karari
- audit checklist degisimi
- panel alan / veri modeli karari
- segment mesajlasma / satis acisi

## Guvenlik cizgisi
Deep research gucludur ama kontrolsuz birlestirme risklidir.

Temel kurallar:
- sadece guvenilen MCP baglantisi kullan
- file search icin sadece guvenilen dosyalari bagla
- arac cagrilarini logla ve gozden gecir
- inline citation'lari UI'da tiklanabilir goster
- hassas veri ile acik web'i ayni kosuda mumkunse karistirma

### Onerilen iki fazli kullanim
Hassas veri varsa:
1. sadece web ile public research yap
2. ikinci ayri kosuda web kapali, sadece ozel veri kaynagi acik olsun

Bu, prompt injection ve veri sizdirma riskini ciddi azaltir.

## Onerilen varsayilan is akisi

```text
User intent
-> clarification
-> enriched research brief
-> deep research run (background)
-> source/citation review
-> karar ozeti + uygulanabilir aksiyonlar
```

## Onerilen cikti formati
EsnafDigital icin raporun asagidaki basliklarda donmesi iyi varsayilandir:
- yonetici ozeti
- ana bulgular
- segment / rakip / fiyat kirilimi
- pazar sinyalleri
- riskler ve belirsizlikler
- EsnafDigital icin cikarim
- onerilen aksiyonlar
- kaynaklar / citation'lar

## Hazir prompt iskeleti

```text
You are conducting deep research for EsnafDigital, a service business focused on helping small local businesses in Turkey become more visible, trustworthy, and easier to contact online.

Goal:
{goal}

Business context:
- First region: Istanbul Arnavutkoy
- First segments: barber shops, beauty salons, cafes/restaurants
- Core flow: Audit -> Offer -> Delivery -> Maintenance
- We want practical and sellable service decisions, not generic theory

Research requirements:
- Use current web sources
- Prefer Turkish market signals when available
- Separate direct evidence from interpretation
- Highlight patterns that can affect pricing, packaging, service scope, or sales messaging
- Include inline citations

Output format:
1. Executive summary
2. Key findings
3. Evidence table
4. Implications for EsnafDigital
5. Recommended actions in the next 30 days
6. Open questions / uncertainties
```

## Hazir deep research basliklari

### 1) Segment acisi ve satin alma tetikleri

```text
Research the real digital pain points, trust gaps, and buying triggers of small local businesses in Istanbul Arnavutkoy, focusing on barber shops, beauty salons, and cafes/restaurants.

I need practical findings that can help shape EsnafDigital's entry offer, sales language, and audit checklist.

Focus on:
- What business owners complain about most in digital presence
- What makes them trust or distrust service providers
- What they are willing to pay for first
- Which outcomes feel urgent to them
- Differences between the three segments

Return:
- segment-by-segment findings
- recurring patterns
- concrete sales implications
- citations
```

### 2) Paket ve fiyat benchmark'i

```text
Research pricing and package benchmarks in Turkey for services comparable to EsnafDigital's offer.

Focus on:
- digital audit / visibility audit
- one-page small business websites
- Google Business Profile optimization
- small monthly maintenance / update retainers

I need:
- price bands (low / mid / high)
- what is usually included or excluded
- where providers create ambiguity or scope creep
- how freelancers differ from small agencies
- implications for creating a simple, sellable 3-part offer

Prefer Turkish providers and Turkish market signals where possible.
Include inline citations.
```

### 3) Yerel rakip ve alternatif analiz

```text
Research how local Turkish agencies, freelancers, and small service providers position simple website + Google presence + social/profile setup offers for small local businesses.

Focus on:
- promise structure
- pricing visibility
- offer packaging
- trust elements
- weak points and gaps in positioning

I need the result to help EsnafDigital differentiate clearly without turning into a generic CRM or full digital agency.

Return:
- competitor pattern clusters
- repeated offer shapes
- gaps we can own
- positioning recommendations
- citations
```

### 4) Local SEO ve Google Business best practices

```text
Research the most practical local SEO and Google Business Profile best practices for small local service businesses and food/beverage businesses in Turkey.

Focus on:
- what clearly affects visibility
- profile completeness and trust signals
- reviews and reputation loops
- website elements that support map/profile performance
- mistakes frequently made by small businesses

I need recommendations that can directly feed:
- audit scoring
- delivery checklist
- maintenance service scope

Return:
- prioritized best practices
- what is high impact vs low impact
- what can be productized into audit / offer / maintenance
- citations
```

## Onerilen arama kural seti
- mumkunse once Turkiye kaynaklari
- sonra global best practice kaynaklari
- forum ve yoruma dayali dusuk sinyalli kaynaklari ikinci plana at
- tek kaynaga dayali iddialari ayri isaretle
- veri ve gorusu birbirine karistirma

## Onerilen kod akis iskeleti
Asagidaki akis, dokumandaki clarification + prompt enrichment + deep research mantigini sade bicimde uygular.

```ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runDeepResearch(userRequest: string) {
  const clarification = await client.responses.create({
    model: "gpt-5.4",
    input: [
      {
        role: "system",
        content:
          "Clarify the user's research request. Return concise JSON with goal, scope, geography, segments, exclusions, and expected_output."
      },
      {
        role: "user",
        content: userRequest
      }
    ]
  });

  const clarified = clarification.output_text;

  const enriched = await client.responses.create({
    model: "gpt-5.4",
    input: [
      {
        role: "system",
        content:
          "Rewrite the clarified request into a strong deep research brief. Make it specific, practical, and citation-friendly."
      },
      {
        role: "user",
        content: clarified
      }
    ]
  });

  const researchBrief = enriched.output_text;

  return client.responses.create({
    model: "o4-mini-deep-research",
    background: true,
    max_tool_calls: 24,
    tools: [
      { type: "web_search" }
    ],
    input: researchBrief
  });
}
```

## Ozel veri gerekiyorsa
Ic veri ile public web birlikte kullanilacaksa tek kosu yerine iki asama tercih et:

### Faz 1
- model: `o4-mini-deep-research`
- tools: `web_search`
- amac: public pazar ve rakip taramasi

### Faz 2
- model: `o4-mini-deep-research` veya `o3-deep-research`
- tools: `file_search` veya guvenilen `remote MCP`
- amac: ic veriyle eslestirme, ama web kapali

## MCP cizgisi
Deep research ile kullanilan MCP sunucusu:
- `search` arayuzu vermeli
- `fetch` arayuzu vermeli
- read-only olmali
- `require_approval: never` cizgisine uygun olmali

Not: Her MCP uygun degildir. Deep research, genel arac cagri modeli gibi davranmaz.

## UI ve raporlama notu
- inline citation'lari gorunur ve tiklanabilir tut
- sadece final metni degil, gerekiyorsa kullanilan kaynak listesini de sakla
- buyuk raporu bir de kisa karar ozeti olarak indir

## EsnafDigital icin ilk uygulanacak 4 konu
1. Arnavutkoy segment acilari ve satin alma tetikleri
2. Turkiye fiyat ve paket benchmark'i
3. yerel rakip konumlanma analizi
4. local SEO + Google Business best practice ozetleri

## Karar cizgisi
Deep research bir rapor makinesi olarak degil, teklif ve operasyon karar motoru olarak kullanilmali.
Cikti sonunda su soru cevaplanmiyorsa arastirma eksik sayilir:

```text
Bu bulgudan sonra EsnafDigital neyi degistirecek?
```
