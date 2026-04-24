# MEMORY.md

Bu dosya, EsnafDigital icin kalici gercekleri, korunacak karar cizgisini ve kolay degismemesi gereken yonelimleri tutar.

## 1) Proje Omurgasi
- EsnafDigital, kucuk isletmelerin dijitalde daha gorunur, daha guvenilir, daha kolay ulasilabilir ve islerini adim adim dijitale tasiyabilir hale gelmesini hedefleyen hizmet ve operasyon modelidir.
- Esas odak yalnizca site yapmak degil, isletmeyi teknik karmasa ile bogmadan guven veren dijital kimlik, gorunurluk ve temel dijital duzen kurmaktir.
- Uzun vadede amac, kucuk isletmelerin teknik araclarla bogusmadan, OpenClaw tabanli ajan destegi sayesinde dijital islerini sohbet ederek yonetebilecegi sade bir isletme altyapisi kurmaktir.
- Ilk is akis omurgasi sudur:
  `Aday isletme bulma -> Veri toplama -> On degerlendirme -> Ziyaret hazirligi -> Gorusme -> Teklif -> Teslimat -> Bakim`
- Bu cizgi onemli bir referanstir, ama sistemin kilitli kalacagi tek akis degildir.

## 2) Ilk Pazar ve Ilk Segmentler
- Ilk saha ve erisim avantaji bolgesi: Istanbul Arnavutkoy ve cevresi
- Bu secim, pazarin kesin en dogru bolgesi oldugu varsayimindan degil; kurucunun hizli temas kurabilmesi ve sahada kolay hareket edebilmesi nedeniyle yapildi.
- Ilk saha ve teklif denemesi icin uygun gorulen segmentler:
  - berber
  - guzellik salonu
  - kafe / restoran

## 3) Hizmet Omurgasi
### Ana hizmet
- isletmenin dijitalde guven veren, duzenli ve ulasilabilir hale gelmesini saglayan kurulum ve toparlama isi

### Devam hizmeti
- Bakim / Canlilik / Kucuk Guncelleme

### Genisleme alani
- hafif panel ve ajan destekli isletme yonetimi, ana hizmet omurgasinin ustune sonra eklenebilecek genisleme alanidir

Amac, kucuk isletmeler icin sade ama esnek bir hizmet yapisi kurmaktir.
Secenekler anlasilir kalir, kapsam ihtiyaca gore degisir.

## 4) Is Akis Omurgasi
`Aday isletme bulma -> Veri toplama -> On degerlendirme -> Ziyaret hazirligi -> Gorusme -> Teklif -> Teslimat -> Bakim`

- Bu akis satis ve operasyon omurgasidir, dogrudan satilan hizmet listesi degildir.
- Aday isletme bulma ve veri toplama, satis oncesi hazirligin ilk adimlaridir.
- On degerlendirme, satilan ana hizmet degil; toplanan veriyi okuyup isletmeyi onceliklendirmek ve teklif hazirligini netlestirmek icin kullanilan ic adimdir.
- Ziyaret hazirligi ve gorusme, sahadaki temasin daha hazirlikli ve guven veren sekilde yapilmasini saglar.
- Teklif, satilan sey degil; kapsami ve teslimatin nasil yapilacagini netlestiren ara asamadir.
- Teslimat gorunur ve hizli olmalidir.
- Sonrasinda bakim / guncelleme geliriyle devam edilir.

### Satis Destek Araclari
- ornek site hazirligi
- ornek ekran / ornek calisma
- hizli taslak / on gosterim
- ajan destegiyle isletme verilerini okuyup satis, teklif ve konumlandirma konusunda destek almak
- Bunlar ana ve kalici olarak garanti edilen hizmetler degil, gerektiginde satis surecini destekleyen araclardir.

## 5) Teknik Cizgi
- Teknik omurga VPS uzerinde kurulur.
- Varsayilan yigin: Next.js + Postgres + Prisma
- Sabit baglam dosya tabanli tutulur: Markdown / YAML / JSON
- Kucuk tekrar eden isler icin zamanlayicilar ve basit gorevler kullanilabilir.
- MVP asamasinda agir yapay zeka / RAG / vektor veritabani / mikroservis katmanlari kurulmaz.
- OpenClaw tabanli ajan destegi, ilk teknik omurganin zorunlu parcasi degil; uygun oldugunda isletme yonetimini kolaylastiran genisleme katmani olarak ele alinir.

## 6) Ic Sistem Karari
- Ic sistemin zorunlu cekirdegi proje / operasyon yonetimi ile baglam sistemi ve dokumanlardir.
- On degerlendirme, teklif, teslimat ve bakim kayitlari ilk guclu is tipleridir, ama sistem bunlarla sinirli degildir.
- Istem uretimi, satis destek araclari ve ajan destekli akislar bu cekirdegin ustune eklenen yardimci katmanlardir.

## 7) Korunacak Calisma Ilkeleri
- once netlik, sonra arac
- once calisan basit cozum
- gereksiz karmasiklik kurma
- teklif netlesmeden ekran cogaltma
- baglami gereksiz yere buyutme
- kalici kararlari yazili hale getir
- bitmis saymak icin gercek cikti ve kisa dogrulama gerekir

## 8) Marka ve Tasarim Sistemi Karari
- EsnafDigital'in gorsel dili sade, guven veren ve esnaf dostu olacaktir.
- Arayuz ve icerik dilinde dogal Turkce kullanilir; Ingilizce terimler yerine mumkun olan en yakin Turkce karsiliklar tercih edilir.
- Turkce metinlerde mumkun oldukca Turkce karakterler korunur.
- Tanitim sitesi ve yonetim paneli icin detayli tasarim sistemi referansi: `DECISIONS/2026-04-19-brand-design-system.md`
- Bolumlenmis referans klasoru: `REFERENCES/design-system/`
- Bu referanslar nihai kabul olarak gorulmez; UX/UI tarafinda memnuniyetsizlik varsa yeniden ele alinip degistirilebilir.

## 9) Guvenlik ve Baglam Hijyeni
- Gizli bilgi kurali icin `TOOLS.md` cizgisi gecerlidir; parola, anahtar, ham baglanti ve benzeri hassas bilgiler calisma alanina yazilmaz.
- `HEARTBEAT.md` sadece aktif durumu, blokaji ve siradaki somut adimi tasir.
- `MEMORY.md` yalnizca kalici cizgiyi tasir; gunluk not, gecici durum ve bitmis is burada tutulmaz.
- `memory/YYYY-MM-DD.md` ve konu dosyalari tarihlenmis gelismeleri tasir; kalici kararin yeri degildir.
- `DECISIONS/` tekil ve kalici kararlar icindir; gunluk ilerleme oraya yazilmaz.
- Ayrintili baglam hijyeni ve yonlendirme kurallari `AGENTS.md` ile ilgili checklist/playbook cizgisinde tutulur.

## 10) Mevcut Operasyonel Gercekler
- Ana alan adi: `esnafdijital.com.tr`
- Yonetim paneli alan adi: `admin.esnafdijital.com.tr`
- DNS yonetimi: Natro

## Promoted From Short-Term Memory (2026-04-24)

<!-- openclaw-memory-promotion:memory:memory/2026-04-20.md:37:56 -->
- - Project OS veri omurgasi mock/db cizgisinden gercek veritabani kurulumuna tasinmali. ## Ilgili topic dosyalari - `2026-04-20-page-error.md` - `2026-04-20-repo-structure.md` # 2026-04-20 ## Bugun ne degisti - Kullanici Consultation Center icin tekrar eden heartbeat/cron takibini durdurmamizi istedi; follow-through heartbeat kapatildi ve tekrar eden otomatik wake istenmiyor. - Kullanici heartbeat tekrarinin ve token tuketiminin fazla olmasindan endiseli oldugunu belirtti; daha sessiz, gereksiz gorunur yanit uretmeyen cizgi benimsendi. - Consultation Center icin iki kalici teknik duzeltme yapildi: - yeni kayit olusunca secili detay/navigation akisi saglamlastirildi - mock moddaki consultation kayitlari artik dosyaya kalici yaziliyor; restart sonrasi kaybolmuyor (`openclaw-control-ui/.data/consultation-center-mock.json`) - Bu oturumda atilan ilgili commitler: - `2f76978` Stop consultation center heartbeat follow-up - `5b2399d` Simplify consultation center layout - `fc8c72b` Stabilize consultation detail navigation - `010322d` Persist consultation center mock records - Admin UI menusu ekran-adi odakli yapi yerine is akisi odakli gruplara sadelestirildi; `Ana akis / Sistem / Eski ekran` ayrimi ve daha dogal Turkce etiketler tercih edildi. - Consultation Center brief onerisi arka plan cron'u olmadan create/update aninda uretilen deterministik bir katman olarak tutuluyor; token tuketen surekli ajan mantigi istenmiyor. [score=0.988 recalls=11 avg=1.000 source=memory/2026-04-20.md:37-56]
<!-- openclaw-memory-promotion:memory:memory/2026-04-20.md:55:62 -->
- - Admin UI menusu ekran-adi odakli yapi yerine is akisi odakli gruplara sadelestirildi; `Ana akis / Sistem / Eski ekran` ayrimi ve daha dogal Turkce etiketler tercih edildi. - Consultation Center brief onerisi arka plan cron'u olmadan create/update aninda uretilen deterministik bir katman olarak tutuluyor; token tuketen surekli ajan mantigi istenmiyor. - Consultation Center icin `openclaw-control-ui/lib/consultation-center/suggestions.ts` dosyasinda daha akilli brief onerisi mantigi eklendi; baslik ve ham not icinden mobil/menu/landing, teklif/paket ve auth/login sinyalleri okunup daha spesifik taslak uretilebiliyor. - Consultation brief taslagini mevcut kayit uzerinde yeniden hesaplamak icin `openclaw-control-ui/app/api/consultation-center/[id]/suggest/route.ts` endpoint'i eklendi; amac arka plan job degil, istege bagli tek-seferlik zenginlestirme akisi. - Consultation Inbox mobil kirilmasi duzeltildi; kart aksiyonu mobilde ayri satira iniyor ve canli deploy sonrasi saglik kontrolleri gecti. - Consultation prompt role secimi type tabanli kaba default yerine konu sinyallerine gore daha spesifik hale getirildi. - Project OS icin `businesses`, `audits`, `offers`, `delivery_projects` Prisma modelleri eklendi; temel veri omurgasi schema seviyesinde acildi (`e7ef15b`). - Project OS icin `openclaw-control-ui/lib/project-os/service.ts` eklendi; ekran artik Prisma varsa veritabani, yoksa mock veri ile beslenen db-or-mock okuma katmani kullaniyor. [score=0.964 recalls=8 avg=1.000 source=memory/2026-04-20.md:55-62]
<!-- openclaw-memory-promotion:memory:memory/2026-04-20.md:1:16 -->
- # 2026-04-20 ## Bugun ne degisti - Kullanici Consultation Center icin tekrar eden heartbeat/cron takibini durdurmamizi istedi; follow-through heartbeat kapatildi ve tekrar eden otomatik wake istenmiyor. - Kullanici heartbeat tekrarinin ve token tuketiminin fazla olmasindan endiseli oldugunu belirtti; daha sessiz, gereksiz gorunur yanit uretmeyen cizgi benimsendi. - Consultation Center icin iki kalici teknik duzeltme yapildi: - yeni kayit olusunca secili detay/navigation akisi saglamlastirildi - mock moddaki consultation kayitlari artik dosyaya kalici yaziliyor; restart sonrasi kaybolmuyor (`openclaw-control-ui/.data/consultation-center-mock.json`) - Bu oturumda atilan ilgili commitler: [score=0.956 recalls=14 avg=1.000 source=memory/2026-04-20.md:1-9]
<!-- openclaw-memory-promotion:memory:memory/2026-04-20.md:15:22 -->
- - Consultation Center brief onerisi arka plan cron'u olmadan create/update aninda uretilen deterministik bir katman olarak tutuluyor; token tuketen surekli ajan mantigi istenmiyor. - Consultation Center icin `openclaw-control-ui/lib/consultation-center/suggestions.ts` dosyasinda daha akilli brief onerisi mantigi eklendi; baslik ve ham not icinden mobil/menu/landing, teklif/paket ve auth/login sinyalleri okunup daha spesifik taslak uretilebiliyor. - Consultation brief taslagini mevcut kayit uzerinde yeniden hesaplamak icin `openclaw-control-ui/app/api/consultation-center/[id]/suggest/route.ts` endpoint'i eklendi; amac arka plan job degil, istege bagli tek-seferlik zenginlestirme akisi. - Consultation Inbox mobil kirilmasi duzeltildi; kart aksiyonu mobilde ayri satira iniyor ve canli deploy sonrasi saglik kontrolleri gecti. - Consultation prompt role secimi type tabanli kaba default yerine konu sinyallerine gore daha spesifik hale getirildi. - Project OS icin `businesses`, `audits`, `offers`, `delivery_projects` Prisma modelleri eklendi; temel veri omurgasi schema seviyesinde acildi (`e7ef15b`). - Project OS icin `openclaw-control-ui/lib/project-os/service.ts` eklendi; ekran artik Prisma varsa veritabani, yoksa mock veri ile beslenen db-or-mock okuma katmani kullaniyor. - Project OS icin `.data/project-os-mock.json` kaliciligi, `createBusiness` / `updateBusiness` servisleri, `/api/project-os/businesses` route'lari ve hizli isletme acma formu eklendi; ilk create/update akisi calisir hale geldi. [score=0.952 recalls=10 avg=1.000 source=memory/2026-04-20.md:15-22]
<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:404:412 -->
- - Bu turda ana admin yuzeyleri DB runtime davranisini korumak icin dynamic cizgiye alindi; build-time sahte veri yerine runtime Supabase verisi esas aliniyor. - Deploy ve smoke testler tekrar gecti; `/api/project-os/*`, `/api/consultation-center`, `/project-os`, `/consultation-center` ve `/context-center` Supabase tabanli akista dogrulandi. - Bu degisiklik workspace'te `e4e62a5` commit'i ile tutuldu: `Keep DB-backed admin pages dynamic`. ## Gece flush ek notu - Project OS icin kullaniciya net cizgi tekrar anlatildi: burasi genel CRM degil, isletme -> audit -> teklif -> teslimat -> bakim hattinda "simdi ne hareket etmeli" sorusunu gosteren operasyon masasi. - Project OS kuyrugunda status ilerletme sonrasi ilgili business'i ustte odakta tutan ve guncellenen satiri/banneri gosteren hafif UX iyilestirmesi canliya alindi; gercek pilot audit ileri-geri patch smoke testiyle dogrulandi. Commit: `2af3e3b` (`Highlight updated Project OS records after advance`). - Discovery hattinda sonraki scrape'ler icin sahiplik sinyali kalici hale getirildi: Apify `claimThisBusiness` alani summary pipeline'a tasindi, turetilmis `ownershipStatus = claimed | unclaimed | unknown` eklendi ve Discovery ekranina `Sahiplik` kolonu + bu alana gore siralama getirildi. Commit: `f749090` (`Track discovery ownership status`). - Project OS teklif kaydi gercek operasyon girdisine biraz daha yaklastirildi: offer modeline `addonKeys`, `domainPreference` ve `customDomain` alanlari eklendi, Prisma migration Supabase'a uygulandi. [score=0.927 recalls=10 avg=1.000 source=memory/2026-04-22.md:404-412]
<!-- openclaw-memory-promotion:memory:memory/2026-04-18.md:1:13 -->
- # 2026-04-18 - `admin.esnafdijital.com.tr` tarafi, basic auth arkasinda calisan gercek Next.js admin uygulamasina yonlendirildi; ana operator yuzeyi `/codex-profilleri` oldu. - Admin uygulama kaynak yolu `/root/.openclaw/workspace/openclaw-control-ui`, servis adi `esnafdijital-admin.service`, uygulama ici port `3012` olarak netlesti. - Codex profilleri paneline auth link uretme, callback/code kaydetme, profil listeleme, current switch, global auth sirasi, not/gizleme ve gateway restart akislarinin cekirdegi baglandi. - Bu yuzey icin `esnafdijital-openclaw-auth` ve `esnafdijital-openclaw-discovery` yardimcilari eklendi. - Kalici panel overlay/state dosyasi `/opt/esnafdijital/data/codex-dashboard-overlay.json` olarak kullanilmaya baslandi. - PTY/EIO kaynakli `verifying` takilma durumu icin self-heal mantigi eklendi; terminal sonucu log/result uzerinden toparlanir hale getirildi. - Ayni hesapla yeniden auth oldugunda operator gorunurlugunu iyilestiren kaydetme duzenlemesi yapildi. - Ayni teknik hesap altinda farkli operator/workspace beklentisinin oldugu netlesince, yerel clone mantigi ile native auth gercegi arasindaki fark acik sekilde goruldu. - OpenClaw kaynak incelemesi, auth tarafinda cekirdegin gercek hesap kimligini merkeze aldigini; workspace ayriminin operator metadata katmaninda modellenmesinin daha temiz oldugunu gosterdi. - Kullanim tarafinda dogru veri kaynagi olarak provider-usage hattinin esas alinmasi gerektigi not edildi. [score=0.927 recalls=7 avg=1.000 source=memory/2026-04-18.md:1-13]
<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:429:435 -->
- - Yeni detail route acildi: `agent-workspace/app/businesses/[slugAndId]/page.tsx`; sayfa discovery detail iskeletini baz alip temel profil, operasyon ozeti, son teklif/teslimat ve alt kayit tablolarini gosteriyor. - `Project OS` kuyruk kartlari ve isletme tablosu yeni business detail route'una baglandi. `npm run build` gecti. - Business sayfasi icin ayri tasarim plani yazildi: `REFERENCES/businesses-page-plan.md`. Bu plan Project OS ile rol ayrimini, V1 bilgi mimarisini ve `next step -> timeline -> ic not -> task` acilis sirasini netlestiriyor. - Ardindan business detail icinde gorunmesi istenen tum audit / teklif / teslim basliklari varsayimsiz kirildi: `REFERENCES/businesses-page-capability-breakdown.md`. Bu dokuman her baslik icin neyin gosterilecegini, tam olarak ne yapilacagini, hangi verinin gerektigini ve hangi kararlarin henuz acik oldugunu ayri ayri yaziyor. - Kurucu bu kirilimdaki bazi acik sorulari netlestirdi: dis veri discovery snapshot uzerinden okunacak, business detail sayfasinda `Detayli isletme verilerini al` butonu olacak ve bu buton Apify CLI ile detay verileri / yorumlari yenileyecek. - Operatorun tum business bilgilerini duzenleyebilmesi kabul edildi; dis kaynaklar sinyal katmani olacak, kanonik ic kayit operator tarafinda duzeltilebilecek. - Paket seciminin son karari operatora ait olacak; demo website skill ile isletmeye ozel uretilecek, manuel acilacak ve surekli acik kalmayan durumda sureli yayin mantigi sonra netlestirilecek. [score=0.926 recalls=12 avg=1.000 source=memory/2026-04-22.md:429-435]
<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:434:441 -->
- - Operatorun tum business bilgilerini duzenleyebilmesi kabul edildi; dis kaynaklar sinyal katmani olacak, kanonik ic kayit operator tarafinda duzeltilebilecek. - Paket seciminin son karari operatora ait olacak; demo website skill ile isletmeye ozel uretilecek, manuel acilacak ve surekli acik kalmayan durumda sureli yayin mantigi sonra netlestirilecek. - Website kontrol yontemi, Instagram scrape cizgisi ve Yandex / Apple Maps scrape edilebilirligi ise acik arastirma konusu olarak korunuyor; capability breakdown dokumani buna gore guncellendi. - HEARTBEAT'teki bir sonraki somut adim da ilerletildi: business detail sayfasina `activity timeline` katmani eklendi. Timeline su an business, audit, teklif ve teslimat kayitlarinin `createdAt / updatedAt` hareketlerinden turetiliyor. - Bunun icin `agent-workspace/lib/project-os/types.ts` ve `agent-workspace/lib/project-os/service.ts` tarafinda kayit tiplerine zaman alanlari tasindi; `agent-workspace/app/businesses/[slugAndId]/page.tsx` icinde son hareketler karti acildi. - `npm run build` tekrar gecti. - Sonraki adim icin veri kontrati da yazildi: `REFERENCES/business-detail-data-contract-v1.md`. Bu dokuman kanonik operator verisi, dis veri snapshot'i, audit snapshot, activity timeline ve operator notu katmanlarini ayni business detail yuzeyinde nasil baglayacagimizi netlestiriyor. - Business detail icindeki ilk gercek CRM katmani da acildi: ustte ayri `Next Step` karti eklendi, mevcut queue item bilgisini ve varsa durum ilerletme aksiyonunu detail sayfada dogrudan kullanir hale geldi. [score=0.926 recalls=11 avg=1.000 source=memory/2026-04-22.md:434-441]
<!-- openclaw-memory-promotion:memory:memory/2026-04-19.md:1:15 -->
- # 2026-04-19 ## Bugun ne degisti - Hesap Merkezi mimarisinde native auth kimligini koruyan cizgiye gecis baslatildi; gercek kimlik ile operator gorunurlugu ayrildi. - Yeni rota `/hesap-merkezi`, gercek auth kaydi, current profil, operator gorunen adi ve teknik kimlik iliskisini net gostermek icin acildi. - V2 tarafinda yeni auth baslatma, callback ile kaydetme, current switch, ad/not guncelleme ve profil silme akislarini kapsayan yuzey baglandi. - V2 icin ayri API yuzeyi acildi: `/api/hesap-merkezi/status`, `/switch`, `/meta`, `/delete`, `/auth/start`, `/auth/submit`, `/auth/status`, `/auth/cancel`. - Canli dogrulamada current-switch akisinin calistigi goruldu. - Strict canonical overwrite yaklasimi gevsetildi; ayni teknik kimlik tekrar geldiginde operator tarafinda ayri kayit acabilen cizgi eklendi. - Workspace operating model'i sadelestirildi: gorev kapatma standardi netlesti, baglam temizligi checklist'e baglandi ve hassas bilgiler memory'den temizlendi. - `openclaw-control-ui` admin arayuzu yeni marka/tasarim sistemine gore acik zeminli, Inter tipografili, brand mavi + accent turkuaz tokenlariyla ortak bir UI diline tasindi. - Ortak `AdminShell` yenilendi; `/`, `/hesap-merkezi`, `/project-os`, `/context-center`, `/consultation-center` ve `/codex-profilleri` ayni navigasyon, topbar, kart ve form dili uzerinde birlestirildi. - Eski `/codex-profilleri` operator ekrani kaldirilmadi; yeni tasarim diliyle ayni shell icine alinip erisim surduruldu. ## Kararlar / onemli notlar [score=0.923 recalls=9 avg=0.934 source=memory/2026-04-19.md:1-15]
<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:423:430 -->
- - Kurucu urun yonunde yeni karar verdi: panel dar operasyon masasi olarak kalmayacak, EsnafDigital icin genisleyen operasyonel CRM yonunde ilerleyecek. - Buna gore `genel CRM` reddi yatay SaaS urunu anlamina cekildi; business detail, activity timeline, ic not, next step ve gorev takibi gibi CRM yuzeyleri panel kapsamina alinabilir hale geldi. Kalici karar dosyasi: `DECISIONS/2026-04-22-crm-expansion-direction.md`. - Business detail route formati da netlestirildi: URL okunur slug + stabil id cizgisinde olacak, format `/businesses/<slug>--<businessId>` olarak tutulacak. - Slug tarafinda Turkce karakterler ASCII karsiligina normalize edilecek (`c/c`, `g/g`, `i/i`, `o/o`, `s/s`, `u/u`); boylece `xenia-beauty-guzellik-salonu-34555--cma8k2p9` benzeri route okunur ama sistem icin stabil kalacak. - Bu cizgi icin kalici karar dosyasi acildi: `DECISIONS/2026-04-22-business-detail-route-slug.md`. - Karar dogrudan koda indirildi: `agent-workspace/lib/businesses/route.ts` icinde `slugifyTr()`, slug/id cozumleme ve business detail href helper'lari eklendi. - Yeni detail route acildi: `agent-workspace/app/businesses/[slugAndId]/page.tsx`; sayfa discovery detail iskeletini baz alip temel profil, operasyon ozeti, son teklif/teslimat ve alt kayit tablolarini gosteriyor. - `Project OS` kuyruk kartlari ve isletme tablosu yeni business detail route'una baglandi. `npm run build` gecti. [score=0.919 recalls=12 avg=1.000 source=memory/2026-04-22.md:423-430]
