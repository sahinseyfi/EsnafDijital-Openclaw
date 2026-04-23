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
   - Eger is bir dosya setini, skill'i veya baglam omurgasini degerlendirmekse varsayilan mod `once degerlendir, sonra sadece gerekeni degistir` olsun.

2. Gorevi guvenle kurmak icin gereken baglami sec.
   - Tum kaydi, tum tarihi veya tum dosyalari otomatik olarak prompta basma.
   - Dosya sayisini yapay olarak sinirlama, ama gereksiz sisirme de yapma.
   - Karari etkilemeyen tekrarları prompta tasima.
   - Once cekirdek baglam ozetini kur, sonra goreve gore ikincil kaynak sec, sadece gerekirse ham dosya oku.
   - Eger hedef dis GPT oturumuysa ve gorev repo analizi gerektiriyorsa, final promptu okuyacak dis GPT'yi repo icerigini gercekten incelemeye yonlendir. Bu da mumkun degilse blokaji acik yazdir.

3. Promptu repo ve runtime gercegine bagla.
   - `https://github.com/sahinseyfi/EsnafDijital-Openclaw` referansi finalPromptText icinde her zaman gecsin.
   - `https://github.com/openclaw/openclaw` referansini runtime, upstream davranisi veya OpenClaw siniri gercekten gorevi etkiliyorsa ekle.
   - VPS uzerinde calisan OpenClaw ajani baglamini unutma.
   - Genel teori yerine mevcut akis icinde uygulanacak gorevi yaz.

4. Cikti kontratini netlestir.
   - Beklenen cikti tipini acik yaz: karar cercevesi, JSON, plan, teklif vb.
   - Ilk kisimda amac, sonra secili baglam, sonra gorev, sonra sinirlar, sonra beklenen cikti ver.
   - Teknik olmayan kisa ozet gerekiyorsa bunu JSON icinde alan olarak isteme. Final promptta JSON disinda ayri bir ikinci bolum olarak iste.
   - Eger gorev dosya seti degerlendirmesi ise cikti kontratina `decision` ve `why` benzeri karar alanlari ekle; guclu olan parcayi rewrite'a zorlama.

5. Promptu fail-closed kontrol et.
   - Repo/runtime baglami yoksa
   - Gorev hala cok genelse
   - Beklenen cikti tipi net degilse
   - Promptu hazir sayma, duzelt.

## Zorunlu kurallar

- Kisa, yapilandirilmis ve gorev odakli yaz.
- Tek promptta birden fazla farkli is isteme.
- Eksik kritik bilgi varsa uydurma, acik bosluk veya varsayim olarak etiketle.
- Dis GPT oturumunda repo analizi gerekiyorsa, final promptta repo inceleme gorevini bizim ajana degil dis GPT'ye ver.
- Dosya-seti veya skill degerlendirmelerinde varsayilan karar `keep` olsun, ancak net gerekce varsa `trim` veya `rewrite` oner.
- Dosya-seti degerlendirmelerinde tum dosyalari otomatik rewrite ettiren dil kurma.
- Kucuk isletme, sade MVP ve dusuk operasyon yuku cizgisini bozma.
- Genel framework veya pazarlama dili yazma.
- Citation, footnote, kaynakca, markdown reference link veya `[1]`, `[2]`, `([GitHub][1])` benzeri atif stili kullanma.
- Link gerekiyorsa dogrudan URL olarak yaz.
- Oturum hafizasi veya baglam eksigiyle ilgili meta cumleleri final prompta koyma.
- Prompt kullanicinin degil, promptu okuyacak GPT/ajanin hemen uygulayacagi sekilde yazilsin.
- finalPromptText alanini dogrudan yaz, ayri kod/template katmani son promptu tekrar kurmayacak varsay.
- finalPromptText icinde sabit ve sade rol kullan: `Sen, EsnafDigital icin VPS uzerinde calisan OpenClaw uygulama ajaniyla calisacak kidemli urun ve teknik dusunme partnerisin.`
- finalPromptText icinde teknik olmayan kisa ozeti JSON disinda, ayri ve sade bir ikinci bolum olarak acikca iste.
- Eger prompt dosya-seti degerlendirmesi uretiyorsa `finalContent` benzeri alanlari sadece `trim` veya `rewrite` kararinda doldurt, `keep` kararinda bos birak veya isteme.

## Uygulama entegrasyon kontrati

Bu skill Consultation Center icinden cagirildiginda:
- Sadece gecerli JSON don.
- Markdown, kod fence, onsoz, sonsoz veya ek aciklama donme.
- JSON alanlari en az su alanlari icermeli: `title`, `summary`, `decisionQuestion`, `whyNow`, `desiredOutput`, `finalPromptText`, `contextRefs`, `businessBrief`, `technicalBrief`, `sharedBrief`.
- `contextRefs` en fazla 4 oge olmali, ama bu okunan baglamin ust siniri degildir, yalnizca promptu belirleyen ana kaynaklarin kisa kaydidir.
- Cikti dili Turkce olmali.

## Referanslari ne zaman oku?

- Baglamin nasil secilecegi, gorev tipine gore hangi kaynaklarin alinacagi ve ham dosyanin ne zaman okunacagi icin `references/context-injection-policy.md` oku.
- Prompt omurgasi, fail-closed son kontrol ve yazim cizgisi icin `references/prompting-principles.md` oku.

## Cikti stili

- once kullanilacak promptu uret
- prompt Consultation Center kaydina dogrudan yazilabilecek kadar hazir olsun
- kalite notu ayri serbest metin olarak degil, gerekiyorsa JSON alanlari icindeki net icerikle yansisin
