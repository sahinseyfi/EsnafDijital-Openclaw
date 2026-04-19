# MEMORY.md

Bu dosya, EsnafDigital için **kalıcı gerçekleri, karar çizgisini ve unutulmaması gereken operasyonel doğruları** tutar.

## 1) Kullanım Kuralı
Buraya şunlar yazılır:
- kolay değişmeyen proje gerçekleri
- alınmış önemli kararlar
- iş modeli omurgası
- teknik varsayımlar
- korunacak çalışma çizgisi

Buraya şunlar yazılmaz:
- günlük yapılacak listesi
- geçici blokajlar
- anlık durum raporu
- kısa ömürlü notlar

Geçici şeyler `HEARTBEAT.md` içinde tutulur.

## 2) Proje Tanımı
- EsnafDigital, küçük işletmelerin dijitalde daha görünür, daha güvenilir ve daha erişilebilir hale gelmesini hedefleyen hizmet ve operasyon modelidir.
- Esas odak yalnızca site yapmak değil; güven veren dijital kimlik ve görünürlük oluşturmaktır.
- İşletmeye somut iyileştirme gösteren sade, hızlı ve tekrar edilebilir bir sistem kurulacaktır.

## 3) Ana Problem Çerçevesi
- Birçok küçük işletme dijitalde eksik, dağınık veya güven vermeyen şekilde temsil ediliyor.
- Sorun çoğu zaman görünürlük + güven + dönüşüm hazırlığı eksenindedir.
- Soyut ajans dili yerine, işletmenin mevcut dijital durumunu somut gösteren yaklaşım daha uygundur.

## 4) Çekirdek Akış
Bu projenin ana akışı:
`Audit -> Teklif -> Teslimat -> Bakım`

Yeni modüller ve ekranlar bu akışa hizmet ettiği ölçüde anlamlıdır.

## 5) İlk Pazar Odağı
- İlk hedef bölge: İstanbul Arnavutköy
- İlk öncelikli segmentler:
  - berber
  - güzellik salonu
  - kafe / restoran

İlk mimari ve teklif dili bu segmentlere göre optimize edilecektir.

## 6) Ürün Omurgası
### Giriş ürünü
Dijital Görünürlük Kontrolü / Audit

### Ana ürün
Güven Veren Dijital Vitrin

### Devam ürünü
Bakım / Canlılık / Küçük Güncelleme

Amaç, çok seçenekli karmaşık paketler değil; anlaşılır ve satılabilir bir üçlü omurga oluşturmaktır.

## 7) İş Modeli Çizgisi
- Düşük bariyerli giriş ürünü ile temas kurulur.
- Audit, teklifin temel girdisi olarak çalışır.
- Teslimat görünür ve hızlı olmalıdır.
- Sonrasında bakım / güncelleme geliriyle devamlılık sağlanır.

## 8) Teknik Çizgi
- Teknik omurga VPS üzerinde kurulacaktır.
- Varsayılan stack: Next.js + Postgres + Prisma
- Sabit bağlam dosya tabanlı tutulacaktır: Markdown / YAML / JSON
- Küçük tekrar eden işler için cron / basit jobs kullanılabilir.
- MVP aşamasında ağır AI / RAG / vector DB / mikroservis katmanları kurulmayacaktır.

## 9) İç Sistem Kararı
İç sistem üç ana çekirdeğe göre kurulacaktır:
1. proje yönetimi
2. bağlam / doküman merkezi
3. GPT Pro consultation hazırlığı / prompt üretimi

## 10) İş Bölümü
- Kullanıcı: satış, saha, yön belirleme, ticari doğrulama
- Ajan: teknik sistem, operasyon omurgası, bağlam düzeni, panel, veri modeli, bakım

## 11) Mevcut Operasyonel Gerçekler
- Ana domain: `esnafdijital.com.tr`
- DNS yönetimi: Natro
- İlk web sitesi Next.js ile kuruldu ve Caddy üzerinden yayınlanıyor
- Web app service adı: `esnafdijital-web.service`
- İşletme keşfi / veri toplama tarafında Apify CLI tercih edilir

## 12) Korunacak Çalışma İlkeleri
- önce netlik, sonra araç
- önce teklif netliği, sonra ekran çoğaltma
- önce çalışan basit çözüm, sonra otomasyon
- gereksiz karmaşıklık yok
- tüm bağlam her prompta kör biçimde yüklenmez
- kalıcı kararlar yazılı hale getirilir

## 13) Prompt Üretim İlkesi
Prompt üretim sistemi, tüm dosyaları kaba biçimde birleştiren bir yapı olmayacaktır.
Amaç, kullanıcının isteğine göre doğru bağlamı seçip net ve güçlü prompt üretmektir.

## 14) Marka ve Tasarım Sistemi Kararı
- EsnafDigital'in kalıcı görsel dili güven veren net mavi (`brand`) + destekleyici turkuaz (`accent`) ekseninde kurulacaktır.
- Arayüz dili steril SaaS değil; sade, güven veren, yüksek okunabilirlikli ve esnaf dostu olacaktır.
- Tek tipografi ailesi `Inter` olarak korunacaktır.
- Geometri çizgisi hafif yuvarlatılmıştır: buton/input `12px`, kart/modal `16px`, badge `pill`.
- İkonografi varsayılan olarak `line-first` kullanılacaktır.
- Mikro metinlerde sade Türkçe, jargon kaçınma ve saygılı `siz` dili zorunludur.
- Landing ve admin panel için ana referans dosya: `DECISIONS/2026-04-19-brand-design-system.md`
- Kaynak metnin tam kopyası: `REFERENCES/2026-04-19-tasarim-sistemi-ve-marka-kimligi-source.txt`
