# MEMORY.md

Bu dosya, EsnafDigital için kalıcı gerçekleri, korunacak karar çizgisini ve kolay değişmemesi gereken yönelimleri tutar.

## 1) Proje Omurgası
- EsnafDigital, küçük işletmelerin dijitalde daha görünür, daha güvenilir, daha kolay ulaşılabilir ve işlerini adım adım dijitale taşıyabilir hale gelmesini hedefleyen hizmet ve operasyon modelidir.
- Esas odak yalnızca site yapmak değil, işletmeyi teknik karmaşa ile boğmadan güven veren dijital kimlik, görünürlük ve temel dijital düzen kurmaktır.
- Uzun vadede amaç, küçük işletmelerin teknik araçlarla boğuşmadan, OpenClaw tabanlı ajan desteği sayesinde dijital işlerini sohbet ederek yönetebileceği sade bir işletme altyapısı kurmaktır.
- İlk iş akış omurgası şudur:
  `Aday işletme bulma -> Veri toplama -> Ön değerlendirme -> Ziyaret hazırlığı -> Görüşme -> Teklif -> Teslimat -> Bakım`
- Bu çizgi önemli bir referanstır, ama sistemin kilitli kalacağı tek akış değildir.

## 2) İlk Pazar ve İlk Segmentler
- İlk saha ve erişim avantajı bölgesi: İstanbul Arnavutköy ve çevresi
- Bu seçim, pazarın kesin en doğru bölgesi olduğu varsayımından değil; kurucunun hızlı temas kurabilmesi ve sahada kolay hareket edebilmesi nedeniyle yapıldı.
- İlk saha ve teklif denemesi için uygun görülen segmentler:
  - berber
  - güzellik salonu
  - kafe / restoran

## 3) Hizmet Omurgası
### Ana hizmet
- işletmenin dijitalde güven veren, düzenli ve ulaşılabilir hale gelmesini sağlayan kurulum ve toparlama işi

### Devam hizmeti
- Bakım / Canlılık / Küçük Güncelleme

### Genişleme alanı
- hafif panel ve ajan destekli işletme yönetimi, ana hizmet omurgasının üstüne sonra eklenebilecek genişleme alanıdır

Amaç, küçük işletmeler için sade ama esnek bir hizmet yapısı kurmaktır.
Seçenekler anlaşılır kalır, kapsam ihtiyaca göre değişir.

## 4) İş Akış Omurgası
`Aday işletme bulma -> Veri toplama -> Ön değerlendirme -> Ziyaret hazırlığı -> Görüşme -> Teklif -> Teslimat -> Bakım`

- Bu akış satış ve operasyon omurgasıdır, doğrudan satılan hizmet listesi değildir.
- Aday işletme bulma ve veri toplama, satış öncesi hazırlığın ilk adımlarıdır.
- Ön değerlendirme, satılan ana hizmet değil; toplanan veriyi okuyup işletmeyi önceliklendirmek ve teklif hazırlığını netleştirmek için kullanılan iç adımdır.
- Ziyaret hazırlığı ve görüşme, sahadaki temasın daha hazırlıklı ve güven veren şekilde yapılmasını sağlar.
- Teklif, satılan şey değil; kapsamı ve teslimatın nasıl yapılacağını netleştiren ara aşamadır.
- Teslimat görünür ve hızlı olmalıdır.
- Sonrasında bakım / güncelleme geliriyle devam edilir.

### Satış Destek Araçları
- örnek site hazırlığı
- örnek ekran / örnek çalışma
- hızlı taslak / ön gösterim
- ajan desteğiyle işletme verilerini okuyup satış, teklif ve konumlandırma konusunda destek almak
- Bunlar ana ve kalıcı olarak garanti edilen hizmetler değil, gerektiğinde satış sürecini destekleyen araçlardır.

## 5) Teknik Çizgi
- Teknik omurga VPS üzerinde kurulur.
- Varsayılan yığın: Next.js + Postgres + Prisma
- Sabit bağlam dosya tabanlı tutulur: Markdown / YAML / JSON
- Küçük tekrar eden işler için zamanlayıcılar ve basit görevler kullanılabilir.
- MVP aşamasında ağır yapay zekâ / RAG / vektör veritabanı / mikroservis katmanları kurulmaz.
- OpenClaw tabanlı ajan desteği, ilk teknik omurganın zorunlu parçası değil; uygun olduğunda işletme yönetimini kolaylaştıran genişleme katmanı olarak ele alınır.

## 6) İç Sistem Kararı
- İç sistemin zorunlu çekirdeği proje / operasyon yönetimi ile bağlam sistemi ve dokümanlardır.
- Ön değerlendirme, teklif, teslimat ve bakım kayıtları ilk güçlü iş tipleridir, ama sistem bunlarla sınırlı değildir.
- İstem üretimi, satış destek araçları ve ajan destekli akışlar bu çekirdeğin üstüne eklenen yardımcı katmanlardır.

## 7) İş Bölümü
- Kullanıcı: satış, saha, yön belirleme, ticari doğrulama
- Ajan: teknik sistem, operasyon omurgası, bağlam düzeni, panel, veri modeli, bakım
- İlk aşamada satışı doğrudan kurucu yapar; teklif dili, saha geri bildirimi ve ticari doğrulama önce burada oturur.
- İleride satış, sahada çalışan temsilciler veya yönlendiren kişilerle genişleyebilir.
- Kâr payı / paylaşımlı kazanç modeli, bu operasyonun açık genişleme seçeneklerinden biridir.

## 8) Korunacak Çalışma İlkeleri
- önce netlik, sonra araç
- önce teklif netliği, sonra ekran çoğaltma
- önce çalışan basit çözüm, sonra otomasyon
- gereksiz karmaşıklık yok
- tüm bağlam her isteğe kör biçimde yüklenmez
- kalıcı kararlar yazılı hale getirilir
- bitmiş saymak için gerçek çıktı ve kısa doğrulama gerekir

## 9) İstem Üretim İlkesi
İstem üretim sistemi, tüm dosyaları kaba biçimde birleştiren bir yapı olmayacaktır.
Amaç, kullanıcının isteğine göre doğru bağlamı seçip net ve güçlü istem üretmektir.

## 10) Hesap Merkezi Yön Kararı
- Gerçek kimlik doğrulama kaydı, gerçek hesap/kimliği temsil eder.
- Operatörün görmek istediği ad, not ve ayrımlar üst veri katmanında tutulur.
- Aynı teknik kimlik tekrar geldiğinde operatör tarafında ayrı kayıt ihtiyacı olabilir; bu, sahte yeni kimlik üretmekten daha doğru bir operatör katmanı yaklaşımıdır.

## 11) Marka ve Tasarım Sistemi Kararı
- EsnafDigital'in kalıcı görsel dili güven veren net mavi (`brand`) + destekleyici turkuaz (`accent`) ekseninde kurulacaktır.
- Arayüz dili steril SaaS değil, sade, güven veren, yüksek okunabilirlikli ve esnaf dostu olacaktır.
- Tek tipografi ailesi `Inter` olarak korunacaktır.
- Geometri çizgisi hafif yuvarlatılmıştır: düğme/girdi `12px`, kart/pencere `16px`, rozet `pill`.
- İkonografi varsayılan olarak çizgi ağırlıklı olacaktır.
- Mikro metinlerde sade Türkçe, jargon kaçınma ve saygılı `siz` dili zorunludur.
- Site ve yönetim paneli geliştirilirken kullanıcıya görünen yüzeylerde İngilizce terimler yerine mümkün olan en yakın ve doğal Türkçe karşılıklar kullanılır.
- Türkçe metinlerde mümkün oldukça Türkçe karakterler korunur; ASCII'ye kaçan yazım kalıcı tercih değildir.
- Tanıtım sitesi ve yönetim paneli için ana referans dosya: `DECISIONS/2026-04-19-brand-design-system.md`
- Bölümlenmiş referans klasörü: `REFERENCES/design-system/`

## 12) Güvenlik ve Bağlam Hijyeni
- Gizli bilgi kuralı için `TOOLS.md` çizgisi geçerlidir.
- `HEARTBEAT.md` aktif durumu, `memory/YYYY-MM-DD.md` tarihlenmiş gelişmeleri, bu dosya ise yalnızca kalıcı çizgiyi taşır.

## 13) Mevcut Operasyonel Gerçekler
- Ana alan adı: `esnafdijital.com.tr`
- Yönetim paneli alan adı: `admin.esnafdijital.com.tr`
- DNS yönetimi: Natro
- İşletme keşfi / veri toplama tarafında Apify komut satırı aracı tercih edilir.
