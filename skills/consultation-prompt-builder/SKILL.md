---
name: consultation-prompt-builder
description: Build, revise, or audit EsnafDigital Consultation Center prompts from a consultation record. Use when a raw consultation note, decision question, or draft prompt must be turned into a ready-to-send GPT prompt, when a prompt is too generic, when repo/runtime grounding is missing, or when prompt quality must be checked before marking it ready. Triggers on requests like 'consultation promptu uret', 'bu kayit icin GPT promptu yaz', 'promptu duzelt', 'prompt neden fazla genel', or 'repo/runtime referanslarini ekle'.
---

# Consultation Prompt Builder

Bu skill, EsnafDigital Consultation Center icin prompt uretirken sade MVP cizgisini ve repo/runtime gercegini korur.

## Workflow

1. Consultation kaydindan tek anlik hedefi cikar.
   - Prompt tek is istesin.
   - Hedef tek cumlede yazilamiyorsa once onu netlestir.

2. Sadece gorevi degistiren baglami sec.
   - Tum kaydi, tum tarihi veya tum dosyalari prompta basma.
   - En fazla 3-5 baglam ogesi sec.
   - Isletme gercegi, mevcut faz, kritik sinir ve beklenen ciktiyi one al.

3. Promptu repo ve runtime gercegine bagla.
   - Gerekliyse uygulama reposu ve OpenClaw upstream referanslarini acik ver.
   - VPS uzerinde calisan OpenClaw ajani baglamini unutma.
   - Genel teori yerine mevcut akis icinde uygulanacak gorevi yaz.
   - Hedef modelin baglam ihtiyacini ic kural olarak dusun, ama bunu final promptta oturum hafizasi veya baglam eksigi meta cumlesi olarak yazma. Ihtiyac olan baglami dogrudan promptun icine koy.

4. Cikti kontratini netlestir.
   - Beklenen cikti tipini acik yaz: karar cercevesi, JSON, plan, teklif vb.
   - Belirsiz yumusak dil kullanma.
   - Ilk kisimda amac, sonra secili baglam, sonra gorev, sonra sinirlar, sonra beklenen cikti ver.
   - Teknik olmayan kisa ozet gerekiyorsa bunu JSON icinde alan olarak isteme. Final promptta JSON disinda ayri bir ikinci bolum olarak iste.

5. Promptu fail-closed kontrol et.
   - Repo/runtime baglami yoksa
   - Gorev hala cok genelse
   - Beklenen cikti tipi net degilse
   - Promptu hazir sayma, duzelt.

## Zorunlu kurallar

- Kisa, yapilandirilmis ve gorev odakli yaz.
- Tek promptta birden fazla farkli is isteme.
- Eksik kritik bilgi varsa uydurma, acik bosluk veya varsayim olarak etiketle.
- Kucuk isletme, sade MVP ve dusuk operasyon yuku cizgisini bozma.
- Genel framework veya pazarlama dili yazma.
- Oturum hafizasi veya baglam eksigiyle ilgili meta cumleleri final prompta koyma.
- Prompt kullanicinin degil, promptu okuyacak GPT/ajanin hemen uygulayacagi sekilde yazilsin.
- finalPromptText alanini dogrudan yaz; ayri kod/template katmani son promptu tekrar kurmayacak varsay.
- finalPromptText icinde sabit ve sade rol kullan: `Sen, EsnafDigital icin VPS uzerinde calisan OpenClaw uygulama ajaniyla calisacak kidemli urun ve teknik dusunme partnerisin.`
- finalPromptText icinde su repo referanslarini acikca gecir: `https://github.com/sahinseyfi/EsnafDijital-Openclaw` ve `https://github.com/openclaw/openclaw`.
- finalPromptText icinde teknik olmayan kisa ozeti JSON disinda, ayri ve sade bir ikinci bolum olarak acikca iste.

## Uygulama entegrasyon kontrati

Bu skill Consultation Center icinden cagirildiginda:
- Sadece gecerli JSON don.
- Markdown, kod fence, onsoz, sonsoz veya ek aciklama donme.
- JSON alanlari en az su alanlari icermeli: `title`, `summary`, `decisionQuestion`, `whyNow`, `desiredOutput`, `finalPromptText`, `contextRefs`, `businessBrief`, `technicalBrief`, `sharedBrief`.
- `contextRefs` en fazla 4 oge olmali.
- Cikti dili Turkce olmali.

## Referanslari ne zaman oku?

- GPT-5 prompt yazim cizgisi gerekiyorsa `references/prompting-principles.md` oku.
- Repo/runtime grounding, fail-closed kontrol veya hazirlik kriteri gerekiyorsa `references/grounding-checklist.md` oku.

## Cikti stili

- once kullanilacak promptu uret
- prompt Consultation Center kaydina dogrudan yazilabilecek kadar hazir olsun
- kalite notu ayrica serbest metin olarak degil, gerekiyorsa JSON alanlari icindeki net icerikle yansisin
