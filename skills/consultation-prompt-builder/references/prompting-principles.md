# Prompting Principles

Bu dosya, Prompt Uretimi promptlarinin nasil yazilacagini belirler. Baglam secimi icin `context-injection-policy.md` kullanilir.

## Ana ilkeler

1. Tek `primaryTask` sec.
2. Varsayilan olarak tek prompt uret.
3. Bagimsiz ikinci is varsa `split_recommended` de, ama ikinci promptu otomatik yazma.
4. Rol, `primaryTask` turune gore ozellestirilsin.
5. Cekirdek baglam kisa olsun; dosya dump'i yapma.
6. Beklenen cikti tipi net olsun.
7. Dosya degerlendirmelerinde once karar ver, sonra sadece gereken degisikligi oner.
8. Repo analizi gerekiyorsa dis GPT'ye repo icerigini gercekten incelet.
9. Eksik kritik bilgiyi uydurma.
10. Final prompt dogrudan kullanilabilir olsun.

## Rol secimi

Sabit rol kullanma. Rol, isin dogasina gore secilir.

Rol kalibi:
`Sen, EsnafDigital icin [ise ozel uzman rol] olarak calisiyorsun.`

Gerekiyorsa ikinci cumle:
`VPS uzerinde calisan OpenClaw ajaniyla birlikte calisacak ve repo/runtime gercegine gore dusuneceksin.`

Rol ornekleri:
- Repo / context / ajan dosyalari: `kidemli repo hijyeni ve ajan calisma sistemi denetcisi`
- Skill veya prompt kalitesi: `prompt kalite denetcisi ve baglam secimi uzmani`
- UI / UX / sayfa akisi: `urun tasarimi ve arayuz elestirmeni`
- Teklif / paket / hizmet dili: `kucuk isletme hizmet paketleme danismani`
- Teknik uygulama: `Next.js, Postgres ve Prisma uygulama mimari`
- Saha / isletme inceleme: `kucuk isletme dijital gorunurluk analisti`
- Strateji / yon karari: `sade MVP ve operasyon modeli danismani`

Rol secilemediyse:
`EsnafDigital icin urun ve teknik dusunme partneri`

## Tercih edilen prompt omurgasi

1. Rol
2. Amac
3. Secili baglam
4. Gorev
5. Sinirlar
6. Beklenen cikti
7. Gerekirse teknik olmayan kisa ozet bolumu

## Repo ve link kurali

- `https://github.com/sahinseyfi/EsnafDijital-Openclaw` sadece repo, dosya, kod, runtime veya karar baglami gerekiyorsa final prompta girer.
- `https://github.com/openclaw/openclaw` sadece OpenClaw runtime, upstream davranisi, ajan yetenegi veya skill sistemi gorevi etkiliyorsa girer.
- Linkler dogrudan URL olarak yazilir; citation, footnote veya markdown reference link kullanilmaz.

## Decomposition cizgisi

- Notta ayri isler var mi kontrol et.
- Bu turda cozulecek isi `primaryTask` yap.
- Prompt disinda kalacak ama kaybolmamasi gerekenleri `secondaryTasks` alanina yaz.
- Sonraya birakilacak sorulari `parkedQuestions` alanina yaz.
- `whyPrimaryNow` alaninda neden bu isin one alindigini acikla.
- `finalPromptText` sadece `primaryTask` icin yazilsin.

## Final prompt checklist

Hazir saymadan once kontrol et:
- Tek is mi istiyor?
- Rol ise ozel mi?
- `primaryTask` net mi?
- Baglam yeterli ama sismemis mi?
- Repo/runtime linkleri sadece gerektiginde mi var?
- Beklenen cikti tipi acik mi?
- Sinirlar ve basari kosulu yazili mi?
- Dosya degerlendirme gorevi tum dosyalari rewrite etmeye zorlamiyor mu?
- Teknik olmayan ozet gerekiyorsa ayri bolum olarak istenmis mi?
- Final prompt dogrudan kullanilacak kadar tamam mi?
- `contextRefs` en fazla 4 oge mi?

## Hazir saymama durumlari

- Prompt fazla genel kaldiysa
- Rol sabit veya ise uygunsuzsa
- Repo/runtime baglami gerekirken eksikse
- Cikti bicimi belirsizse
- Kritik kaynaklar disarida kaldiysa
- Gereksiz teori promptu sisirdiyse
- Eksik bilgi saklaniyorsa
- `primaryTask` disindaki isler final prompta sizdiysa
- Repo incelemeden repo hakkinda kesin karar istiyorsa

## Anti-patternler

- Her promptu ayni rol cumlesiyle baslatmak
- Genel strateji yazip uygulamaya inmemek
- Tum prompt kaydi gecmisini basmak
- Tek promptta birden fazla is istemek
- Decomposition yapmadan genis notu prompta cevirmek
- Dosya degerlendirme gorevini butun dosyalari rewrite etmeye zorlamak
- Repo linklerini veya runtime gercegini ima edip acik yazmamak
- Dis GPT oturumunda repo analizi isterken repo icerigini inceletmemek
- Son prompt yerine yarim template uretmek
