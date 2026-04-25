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

### Ic CRM omurgasi
- EsnafDigital'in kendi paneli operasyonel CRM olarak dusunulur; isletme, kisi, gorusme, teklif, teslimat, bakim, not ve sonraki adim takibini tek yerde toplar.
- Bu CRM omurgasi EsnafDigital'in hizmet teslimini, satis takibini ve bakim surecini yonetmek icindir.
- Hizmet verilen isletmelere satilan ana urun CRM yazilimi degil; guven veren dijital kimlik, gorunurluk, kurulum/toparlama ve devam bakim hizmetidir.
- Sinir, EsnafDigital'in kendi operasyon CRM'i ile hizmet verilen isletmelere satilan yatay/genel CRM urununu net ayirmaktir.

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
- EsnafDigital 360 OpenClaw ajan destegi ana urun fikrinin parcasi olarak ele alinir; MVP mimari karari her isletme icin tek OpenClaw Gateway/runtime altinda ayri OpenClaw agent, ayri workspace, ayri oturum/hafiza ve ayri izin profili uretmektir.
- Isletme ajani icin kullaniciya gorunen kayit adi `Isletme Ajani Kaydi` olacak; teknik ASCII ad gerekirse `IsletmeAjaniKaydi` / `isletme_ajani_kaydi` kullanilir. Bu kayit agent degil; EsnafDigital tarafinda gercek isletme agent'ini, workspace yolunu, sablon surumunu, izin profilini, oturumlarini, kanal baglarini ve gorev durumunu izler.
- Bu karmasa manuel yonetimle degil; iyi baslangic sablonu, otomatik agent kurulumu, sablon surumu takibi ve siki tool/yetki siniri ile kontrol altina alinacaktir.
- WhatsApp ticari hedef kanal olarak kalir; teknik dogrulama Telegram/test kanali veya EsnafDigital pilot hatti ile baslayabilir. Isletmenin kendi WhatsApp hattini ajana baglama ve randevu karsilama ek kanal/modul paketi olarak ele alinir.

## 6) Ic Sistem Karari
- Ic sistemin zorunlu cekirdegi EsnafDigital'in kendi operasyon CRM'i ile baglam sistemi ve dokumanlardir.
- Operasyon CRM'i, hizmet verilen isletmeleri satis oncesinden teklif, teslimat ve bakima kadar izlemek icindir; musteriye satilan ayri bir CRM urunu olarak konumlanmaz.
- On degerlendirme, teklif, teslimat ve bakim kayitlari ilk guclu is tipleridir, ama sistem bunlarla sinirli degildir.
- Istem uretimi, satis destek araclari ve ajan destekli akislar bu cekirdegin ustune eklenen yardimci katmanlardir.
- Istem uretimi ve benzeri yardimci katmanlarda surekli arka plan ajanlari yerine istege bagli, tek-seferlik ve deterministik akislar tercih edilir.
- EsnafDigital ajan davranis rehberi skill ile, gercek sistem islemleri ise EsnafDigital API uzerinden sinirli OpenClaw tool/plugin'lari ile yurutulur.

## 7) Korunacak Calisma Ilkeleri
- once netlik, sonra arac
- kurucunun verdigi yeni fikirleri once yapilabilirlik, risk ve MVP etkisi acisindan degerlendir; sonra 2-3 uygulanabilir yol ve onerilen yolu kisa sekilde sun
- once calisan basit cozum
- gereksiz karmasiklik kurma
- teklif netlesmeden ekran cogaltma
- dosya, kapsam, MVP veya yon degisikliginde kurucu onayi almadan ilerleme
- bir mesajda dosya degistirildiyse, mesajin sonunda degistirilen her dosyayi listele
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
- Tekrar eden otomatik wake, follow-through heartbeat ve token tuketen surekli cron mantigi varsayilan calisma bicimi degildir; yalniz net fayda varsa kullanilir.
- `MEMORY.md` yalnizca kalici cizgiyi tasir; gunluk not, gecici durum ve bitmis is burada tutulmaz.
- `memory/YYYY-MM-DD.md` ve konu dosyalari tarihlenmis gelismeleri tasir; kalici kararin yeri degildir.
- `DECISIONS/` tekil ve kalici kararlar icindir; gunluk ilerleme oraya yazilmaz.
- Ayrintili baglam hijyeni ve yonlendirme kurallari `AGENTS.md` ile ilgili checklist/playbook cizgisinde tutulur.

## 10) Mevcut Operasyonel Gercekler
- Ana alan adi: `esnafdijital.com.tr`
- Yonetim paneli alan adi: `admin.esnafdijital.com.tr`
- DNS yonetimi: Natro
