# MEMORY.md

Bu dosya, EsnafDigital için kalıcı gerçekleri, korunacak karar çizgisini ve kolay değişmemesi gereken yönelimleri tutar.

## 1) Proje Omurgası
- EsnafDigital, küçük işletmelerin dijitalde daha görünür, daha güvenilir, daha kolay ulaşılabilir ve işlerini adım adım dijitale taşıyabilir hale gelmesini hedefleyen hizmet ve operasyon modelidir.
- Esas odak yalnızca site yapmak değil, işletmeyi teknik karmaşa ile boğmadan güven veren dijital kimlik, görünürlük ve temel dijital düzen kurmaktır.
- Uzun vadede amaç, küçük işletmelerin teknik araçlarla boğuşmadan, OpenClaw tabanlı ajan desteği sayesinde dijital işlerini sohbet ederek yönetebileceği sade bir işletme altyapısı kurmaktır.
- İlk iş akış omurgası şudur:
  `Kesif / On degerlendirme -> Teklif -> Teslimat -> Bakim`
- Bu çizgi önemli bir referanstır, ama sistemin kilitli kalacağı tek akış değildir.

## 2) İlk Pazar ve İlk Segmentler
- İlk hedef bölge: İstanbul Arnavutköy
- İlk öncelikli segmentler:
  - berber
  - güzellik salonu
  - kafe / restoran

## 3) Hizmet Omurgası
### Ana hizmet
- isletmenin dijitalde guven veren, duzenli ve ulasilabilir hale gelmesini saglayan kurulum ve toparlama isi

### Devam hizmeti
- Bakim / Canlilik / Kucuk Guncelleme

### Genisleme alani
- hafif panel ve ajan destekli isletme yonetimi, ana hizmet omurgasinin ustune sonra eklenebilecek genisleme alanidir

Amac, cok secenekli paket karmasasi degil, anlasilir ve satilabilir bir hizmet cizgisi kurmaktir.

## 4) Is Akis Omurgasi
`Kesif / On degerlendirme -> Teklif -> Teslimat -> Bakim`

- Bu akis satis ve operasyon omurgasidir, dogrudan satilan urun listesi degildir.
- Dijital gorunurluk kontrolu / audit, satilan ana urun degil; isletme secimi, onceliklendirme ve teklif hazirligi icin kullanilan ic tarama adimidir.
- Teklif, satilan urun degil; kapsam ve teslimatin nasil yapilacagini netlestiren ara asamadir.
- Teslimat gorunur ve hizli olmalidir.
- Sonrasinda bakim / guncelleme geliriyle devam edilir.

### Satis Destek Araclari
- demo site hazirligi
- ornek ekran / ornek calisma
- hizli mockup / on gosterim
- ajan destegiyle isletme verilerini okuyup satis, teklif ve konumlandirma konusunda destek almak
- Bunlar ana ve kalici olarak garanti edilen hizmetler degildir; gerektiginde teklif ve karar surecini destekleyen satis araclaridir.

## 5) Teknik Çizgi
- Teknik omurga VPS üzerinde kurulur.
- Varsayılan stack: Next.js + Postgres + Prisma
- Sabit bağlam dosya tabanlı tutulur: Markdown / YAML / JSON
- Küçük tekrar eden işler için cron / basit jobs kullanılabilir.
- MVP aşamasında ağır AI / RAG / vector DB / mikroservis katmanları kurulmaz.

## 6) İç Sistem Kararı
İç sistem üç ana çekirdeğe göre kurulur:
1. proje yönetimi
2. baglam sistemi ve dokuman merkezi
3. prompt uretimi ve ileride ajan destekli isletme akislarina acilabilecek operasyon katmani
- Panel, dar bir operasyon masası değil, EsnafDigital için CRM-evrilebilir ve küçük işletmenin dijital düzene geçişini taşıyabilecek bir operasyon sistemi olarak kurulur.
- Audit, teklif, teslimat ve bakım kayıtları bu yapının ilk güçlü iş tipleridir, sistem sınırı değildir.
- Uzun vadede bu yapı, işletme sahibinin teknik araçlarla uğraşmadan bazı dijital işlerini sohbet ederek yönetebileceği ajan destekli yüzeylere açılabilir.

## 7) İş Bölümü
- Kullanıcı: satış, saha, yön belirleme, ticari doğrulama
- Ajan: teknik sistem, operasyon omurgası, bağlam düzeni, panel, veri modeli, bakım
- Ilk asamada satisi dogrudan kurucu yapar; teklif dili, saha geri bildirimi ve ticari dogrulama once buradan oturur.
- Ileride satis, sahada calisan temsilciler veya yonlendiren kisilerle genisleyebilir; bu yapida kar payi / paylasimli kazanc modeli operasyonun dogal genisleme seceneklerinden biridir.

## 8) Korunacak Çalışma İlkeleri
- önce netlik, sonra araç
- önce teklif netliği, sonra ekran çoğaltma
- önce çalışan basit çözüm, sonra otomasyon
- gereksiz karmaşıklık yok
- tüm bağlam her isteğe kör biçimde yüklenmez
- kalıcı kararlar yazılı hale getirilir
- bitmiş saymak için gerçek çıktı ve kısa doğrulama gerekir

## 9) Prompt Üretim İlkesi
Prompt üretim sistemi, tüm dosyaları kaba biçimde birleştiren bir yapı olmayacaktır.
Amaç, kullanıcının isteğine göre doğru bağlamı seçip net ve güçlü prompt üretmektir.

## 10) Hesap Merkezi Yön Kararı
- Gerçek auth kaydı, gerçek hesap/kimliği temsil eder.
- Operatörün görmek istediği ad, not ve ayrımlar metadata katmanında tutulur.
- Aynı teknik kimlik tekrar geldiğinde operatör tarafında ayrı kayıt ihtiyacı olabilir; bu, sahte yeni credential üretmekten daha doğru bir operatör katmanı yaklaşımıdır.

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
