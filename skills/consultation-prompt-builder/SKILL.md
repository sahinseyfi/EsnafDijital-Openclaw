---
name: consultation-prompt-builder
description: Build, revise, or quality-check EsnafDigital Prompt Uretimi prompts from a prompt record. Use when a raw prompt request, decision question, or draft prompt must be turned into a ready-to-send GPT prompt, when a prompt is too generic, when repo/runtime grounding is missing, or when prompt quality must be checked before marking it ready. Triggers on requests like 'promptu uret', 'bu kayit icin GPT promptu yaz', 'promptu duzelt', 'prompt neden fazla genel', or 'repo/runtime referanslarini ekle'.
---

# Prompt Uretimi Prompt Builder

Bu skill, EsnafDigital icin hazir kullanilabilir dis GPT/ajan promptlari uretir. Ana hedef: tek isi netlestirmek, dogru baglami secmek, gereksiz dosya dump'i yapmadan uygulanabilir prompt vermek.

## Temel akis

1. Ham notu parcala.
   - Tek `primaryTask` sec.
   - Bu turda prompta girmeyecek isleri `secondaryTasks` ve `parkedQuestions` alanlarina ayir.
   - Iki ayri is tek promptu bozacaksa `promptStrategy = split_recommended` yap; yine de sadece `primaryTask` icin tek prompt uret.

2. Hedefi netlestir.
   - `decisionQuestion`, `whyNow`, `desiredOutput` alanlari `primaryTask` etrafinda yazilsin.
   - Hedef tek cumlede yazilamiyorsa once hedefi daralt.

3. Baglami sec.
   - Once kisa cekirdek ozet kur.
   - Sonra gorev tipine gore ikincil kaynak sec.
   - Sadece exact wording, dosya cakismasi veya repo analizi gerekiyorsa ham dosya oku.
   - Tum memory, tum repo veya tum gecmisi otomatik prompta basma.

4. Rol ve gorevi kur.
   - Rol sabit olmayacak; `primaryTask` turune gore ozellesecek.
   - EsnafDigital baglami korunacak.
   - OpenClaw/VPS baglami sadece gorevi etkiliyorsa role veya baglama eklenecek.

5. Cikti kontratini yaz.
   - Beklenen cikti tipini acik belirt: karar raporu, JSON, plan, diff onerisi, teklif metni vb.
   - Dosya-seti degerlendirmelerinde once karar iste: `keep / trim / rewrite / merge / archive`.
   - Tum dosyalari otomatik rewrite ettiren dil kullanma.

6. Fail-closed kontrol yap.
   - Repo/runtime baglami gerekiyorsa ama yoksa acik bosluk yazdir.
   - Gorev fazla genelse veya cikti tipi belirsizse promptu hazir sayma.

## Rol secme kurali

`finalPromptText` ilk cumlesi ise ozel rol tasimali. Sabit rol kullanma.

Rol kalibi:
`Sen, EsnafDigital icin [ise ozel uzman rol] olarak calisiyorsun. Gerekiyorsa VPS uzerinde calisan OpenClaw ajaniyla birlikte calisacaksin.`

Ornek rol eslestirmeleri:
- Repo / context / ajan dosyalari denetimi: `kidemli repo hijyeni ve ajan calisma sistemi denetcisi`
- Prompt kalitesi: `prompt kalite denetcisi ve baglam secimi uzmani`
- UI / UX / sayfa akisi: `urun tasarimi ve arayuz elestirmeni`
- Teklif / paket / hizmet dili: `kucuk isletme hizmet paketleme danismani`
- Teknik uygulama: `Next.js, Postgres ve Prisma uygulama mimari`
- Saha / isletme inceleme: `kucuk isletme dijital gorunurluk analisti`

Rol secilemediyse genel role dus:
`EsnafDigital icin urun ve teknik dusunme partneri`.

## Repo ve runtime baglami

- Repo analizi, dosya denetimi, teknik uygulama veya mevcut duruma dayali karar gerekiyorsa final promptta su repo linkini ver: `https://github.com/sahinseyfi/EsnafDijital-Openclaw`
- OpenClaw runtime, upstream davranisi, ajan yetenegi veya skill davranisi gorevi etkiliyorsa su linki de ver: `https://github.com/openclaw/openclaw`
- Basit metin, teklif veya dil revizyonunda repo linkini otomatik ekleme; sadece gerekiyorsa ekle.
- Dis GPT oturumunda repo analizi isteniyorsa, final prompt dis GPT'ye repo icerigini gercekten incelemesini soylesin.

## Zorunlu kurallar

- Kisa, yapilandirilmis ve gorev odakli yaz.
- Varsayilan olarak tek prompt uret.
- `finalPromptText` sadece `primaryTask` icin yazilsin.
- Eksik kritik bilgiyi uydurma; `acik bosluk`, `varsayim` veya `dogrulanacak nokta` olarak yazdir.
- Kucuk isletme, sade MVP ve dusuk operasyon yuku cizgisini bozma.
- EsnafDigital icin guncel CRM ayrimini koru: EsnafDigital kendi operasyon CRM'ini kurar; musterilerine CRM yazilimi satmaz.
- Citation, footnote, kaynakca, markdown reference link veya `[1]` stili kullanma. Link gerekiyorsa dogrudan URL ver.
- Final prompt dogrudan kullanilabilir olsun; yarim template gibi kalmasin.
- Teknik olmayan kisa ozet gerekiyorsa JSON icine gommek yerine ayri bolum olarak iste.

## Uygulama entegrasyon kontrati

Bu skill Prompt Uretimi icinden cagirildiginda sadece gecerli JSON don.

JSON alanlari en az sunlari icersin:
- `title`
- `summary`
- `primaryTask`
- `secondaryTasks`
- `parkedQuestions`
- `whyPrimaryNow`
- `promptStrategy`
- `decisionQuestion`
- `whyNow`
- `desiredOutput`
- `finalPromptText`
- `contextRefs`
- `businessBrief`
- `technicalBrief`
- `sharedBrief`

Kurallar:
- `secondaryTasks` ve `parkedQuestions` array olmali.
- `promptStrategy` yalnizca `single_prompt` veya `split_recommended` olmali.
- `contextRefs` en fazla 4 oge olmali.
- Cikti dili Turkce olmali.

## Referanslari ne zaman oku?

- Baglam secimi ve ham dosya okuma karari gerekiyorsa: `references/context-injection-policy.md`
- Rol secimi, prompt omurgasi ve kalite kontrol gerekiyorsa: `references/prompting-principles.md`

## Hazir sayma kontrolu

Prompt ancak su durumda hazir sayilir:
- tek `primaryTask` var
- rol ise ozel secildi
- baglam goreve yetecek kadar var ama sismemis
- repo/runtime linkleri sadece gerektiginde var
- beklenen cikti ve basari kosulu net
- final prompt dogrudan kullanilabilir
