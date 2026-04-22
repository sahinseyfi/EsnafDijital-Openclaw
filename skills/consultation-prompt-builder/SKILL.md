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
   - Sifir-hafiza varsayimini ic kural olarak kullan, ama bunu final promptta meta cumle olarak yazma. Ihtiyac olan baglami dogrudan promptun icine koy.

4. Cikti kontratini netlestir.
   - Beklenen cikti tipini acik yaz: karar cercevesi, JSON, plan, teklif vb.
   - Belirsiz yumusak dil kullanma.
   - Ilk kisimda amac, sonra secili baglam, sonra gorev, sonra sinirlar, sonra beklenen cikti ver.
   - Uygunsa final prompt icinde teknik olmayan kisa ozet istegini de acikca ekle.

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
- `Bu oturum sifir hafizali kabul edilsin` gibi meta cumleleri final prompta koyma.
- Prompt kullanicinin degil, promptu okuyacak GPT/ajanin hemen uygulayacagi sekilde yazilsin.

## Referanslari ne zaman oku?

- GPT-5 prompt yazim cizgisi gerekiyorsa `references/prompting-principles.md` oku.
- Repo/runtime grounding, fail-closed kontrol veya hazirlik kriteri gerekiyorsa `references/grounding-checklist.md` oku.

## Cikti stili

- once kullanilacak promptu uret
- sonra kisa bir kalite notu ver: tamam / eksik
- eksikse neyin eksik oldugunu tek tek yaz
