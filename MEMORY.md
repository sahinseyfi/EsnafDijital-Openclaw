# MEMORY.md

Bu dosya, EsnafDigital için kalıcı gerçekleri, korunacak karar çizgisini ve kolay değişmemesi gereken yönelimleri tutar.

## 1) Proje Omurgası
- EsnafDigital, küçük işletmelerin dijitalde daha görünür, daha güvenilir, daha kolay ulaşılabilir ve işlerini adım adım dijitale taşıyabilir hale gelmesini hedefleyen hizmet ve operasyon modelidir.
- Esas odak yalnızca site yapmak değil, işletmeyi teknik karmaşa ile boğmadan güven veren dijital kimlik, görünürlük ve temel dijital düzen kurmaktır.
- Uzun vadede amaç, küçük işletmelerin teknik araçlarla boğuşmadan, OpenClaw tabanlı ajan desteği sayesinde dijital işlerini sohbet ederek yönetebileceği sade bir işletme altyapısı kurmaktır.
- İlk iş akış omurgası şudur:
  `Kesif / On degerlendirme -> Teklif -> Teslimat -> Bakim`
- Bu çizgi önemli bir referanstır, ama sistemin kilitli kalacağı tek akış değildir.

## 2) Ilk Pazar ve Ilk Segmentler
- Ilk saha ve erisim avantaji bolgesi: Istanbul Arnavutkoy ve cevresi
- Bu secim, pazarin kesin en dogru bolgesi oldugu varsayimindan degil; kurucunun hizli temas kurabilmesi ve sahada kolay hareket edebilmesi nedeniyle yapildi.
- Ilk saha ve teklif denemesi icin uygun gorulen segmentler:
  - berber
  - guzellik salonu
  - kafe / restoran

## 3) Hizmet Omurgası
### Ana hizmet
- isletmenin dijitalde guven veren, duzenli ve ulasilabilir hale gelmesini saglayan kurulum ve toparlama isi

### Devam hizmeti
- Bakim / Canlilik / Kucuk Guncelleme

### Genisleme alani
- hafif panel ve ajan destekli isletme yonetimi, ana hizmet omurgasinin ustune sonra eklenebilecek genisleme alanidir

Amac, kucuk isletmeler icin sade ama esnek bir hizmet yapisi kurmaktir.
Secenekler anlasilir kalir, kapsam ihtiyaca gore degisir.

## 4) Is Akis Omurgasi
`Kesif / On degerlendirme -> Teklif -> Teslimat -> Bakim`

- Bu akis satis ve operasyon omurgasidir, dogrudan satilan hizmet listesi degildir.
- Dijital gorunurluk kontrolu / on degerlendirme, satilan ana hizmet degil; isletme secimi, onceliklendirme ve teklif hazirligi icin kullanilan ic tarama adimidir.
- Teklif, satilan sey degil; kapsam ve teslimatin nasil yapilacagini netlestiren ara asamadir.
- Teslimat gorunur ve hizli olmalidir.
- Sonrasinda bakim / guncelleme geliriyle devam edilir.

### Satis Destek Araclari
- demo site hazirligi
- ornek ekran / ornek calisma
- hizli mockup / on gosterim
- ajan destegiyle isletme verilerini okuyup satis, teklif ve konumlandirma konusunda destek almak
- Bunlar ana ve kalici olarak garanti edilen hizmetler degil, gerektiginde satis surecini destekleyen araclardir.

## 5) Teknik Cizgi
- Teknik omurga VPS uzerinde kurulur.
- Varsayilan stack: Next.js + Postgres + Prisma
- Sabit baglam dosya tabanli tutulur: Markdown / YAML / JSON
- Kucuk tekrar eden isler icin cron / basit jobs kullanilabilir.
- MVP asamasinda agir AI / RAG / vector DB / mikroservis katmanlari kurulmaz.

## 6) Ic Sistem Karari
Ic sistem uc ana cekirdege gore kurulur:
1. proje yonetimi
2. baglam sistemi ve dokumanlar
3. prompt uretimi, sonra gerekirse ajan destekli isletme akislarina acilabilecek operasyon katmani
- Panel, dar bir operasyon masasi olarak kalmaz; kucuk isletmenin dijital duzene gecisini tasiyabilecek sade bir operasyon sistemi olarak kurulur.
- On degerlendirme, teklif, teslimat ve bakim kayitlari ilk guclu is tipleridir, ama sistem bunlarla sinirli degildir.
- Uzun vadede bu yapi, isletme sahibinin bazi dijital islerini sohbet ederek yonetebilecegi yuzeylere acilabilir.

## 7) Is Bolumu
- Kullanici: satis, saha, yon belirleme, ticari dogrulama
- Ajan: teknik sistem, operasyon omurgasi, baglam duzeni, panel, veri modeli, bakim
- Ilk asamada satisi dogrudan kurucu yapar; teklif dili, saha geri bildirimi ve ticari dogrulama once burada oturur.
- Ileride satis, sahada calisan temsilciler veya yonlendiren kisilerle genisleyebilir.
- Kar payi / paylasimli kazanc modeli, bu operasyonun acik genisleme seceneklerinden biridir.

## 8) Korunacak Calisma Ilkeleri
- once netlik, sonra arac
- once teklif netligi, sonra ekran cogaltma
- once calisan basit cozum, sonra otomasyon
- gereksiz karmasiklik yok
- tum baglam her istege kor bicimde yuklenmez
- kalici kararlar yazili hale getirilir
- bitmis saymak icin gercek cikti ve kisa dogrulama gerekir

## 9) Prompt Uretim Ilkesi
Prompt uretim sistemi, tum dosyalari kaba bicimde birlestiren bir yapi olmayacaktir.
Amac, kullanicinin istegine gore dogru baglami secip net ve guclu prompt uretmektir.

## 10) Hesap Merkezi Yon Karari
- Gercek auth kaydi, gercek hesap/kimligi temsil eder.
- Operatorun gormek istedigi ad, not ve ayrimlar metadata katmaninda tutulur.
- Ayni teknik kimlik tekrar geldiginde operator tarafinda ayri kayit ihtiyaci olabilir; bu, sahte yeni credential uretmekten daha dogru bir operator katmani yaklasimidir.

## 11) Marka ve Tasarım Sistemi Kararı
- EsnafDigital'in kalıcı görsel dili güven veren net mavi (`brand`) + destekleyici turkuaz (`accent`) ekseninde kurulacaktır.
- Arayüz dili steril SaaS değil, sade, güven veren, yüksek okunabilirlikli ve esnaf dostu olacaktır.
- Tek tipografi ailesi `Inter` olarak korunacaktır.
- Geometri çizgisi hafif yuvarlatılmıştır: buton/input `12px`, kart/modal `16px`, badge `pill`.
- İkonografi varsayılan olarak `line-first` kullanılacaktır.
- Mikro metinlerde sade Türkçe, jargon kaçınma ve saygılı `siz` dili zorunludur.
- Site ve admin panel geliştirilirken kullanıcıya görünen yüzeylerde mümkün oldukça İngilizce kelimeler yerine doğal Türkçe karşılıklar tercih edilir.
- Landing ve admin panel için ana referans dosya: `DECISIONS/2026-04-19-brand-design-system.md`
- Bölümlenmiş referans klasörü: `REFERENCES/design-system/`

## 12) Güvenlik ve Bağlam Hijyeni
- Gizli bilgi kuralı için `TOOLS.md` çizgisi geçerlidir.
- `HEARTBEAT.md` aktif durumu, `memory/YYYY-MM-DD.md` tarihlenmiş gelişmeleri, bu dosya ise yalnızca kalıcı çizgiyi taşır.

## 13) Mevcut Operasyonel Gerçekler
- Ana domain: `esnafdijital.com.tr`
- Admin domain: `admin.esnafdijital.com.tr`
- DNS yönetimi: Natro
- İşletme keşfi / veri toplama tarafında Apify CLI tercih edilir.
