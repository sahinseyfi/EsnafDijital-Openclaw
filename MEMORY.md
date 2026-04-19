# MEMORY.md

Bu dosya, EsnafDigital için kalıcı gerçekleri, korunacak karar çizgisini ve kolay değişmemesi gereken yönelimleri tutar.

## 1) Proje Omurgası
- EsnafDigital, küçük işletmelerin dijitalde daha görünür, daha güvenilir ve daha kolay ulaşılabilir hale gelmesini hedefleyen hizmet ve operasyon modelidir.
- Esas odak yalnızca site yapmak değil, güven veren dijital kimlik ve görünürlük oluşturmaktır.
- Çekirdek akış her zaman şunu destekler:
  `Audit -> Teklif -> Teslimat -> Bakım`

## 2) İlk Pazar ve İlk Segmentler
- İlk hedef bölge: İstanbul Arnavutköy
- İlk öncelikli segmentler:
  - berber
  - güzellik salonu
  - kafe / restoran

## 3) Ürün Omurgası
### Giriş ürünü
Dijital Görünürlük Kontrolü / Audit

### Ana ürün
Güven Veren Dijital Vitrin

### Devam ürünü
Bakım / Canlılık / Küçük Güncelleme

Amaç, çok seçenekli paket karmaşası değil, anlaşılır ve satılabilir bir üçlü omurgadır.

## 4) İş Modeli Çizgisi
- Düşük bariyerli giriş ürünü ile temas kurulur.
- Audit, teklifin temel girdisi olarak çalışır.
- Teslimat görünür ve hızlı olmalıdır.
- Sonrasında bakım / güncelleme geliriyle devam edilir.

## 5) Teknik Çizgi
- Teknik omurga VPS üzerinde kurulur.
- Varsayılan stack: Next.js + Postgres + Prisma
- Sabit bağlam dosya tabanlı tutulur: Markdown / YAML / JSON
- Küçük tekrar eden işler için cron / basit jobs kullanılabilir.
- MVP aşamasında ağır AI / RAG / vector DB / mikroservis katmanları kurulmaz.

## 6) İç Sistem Kararı
İç sistem üç ana çekirdeğe göre kurulur:
1. proje yönetimi
2. bağlam / doküman merkezi
3. GPT Pro consultation hazırlığı / prompt üretimi

## 7) İş Bölümü
- Kullanıcı: satış, saha, yön belirleme, ticari doğrulama
- Ajan: teknik sistem, operasyon omurgası, bağlam düzeni, panel, veri modeli, bakım

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
