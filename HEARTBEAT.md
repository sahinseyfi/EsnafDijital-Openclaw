# HEARTBEAT.md

Bu dosya kalıcı gerçekleri değil, şu anki operasyon nabzını tutar.

## Mevcut Faz
**Faz 1 - iç operasyon ve bağlam omurgasını kurma**

## Şu Anki Ana Hedef
Teklif omurgası, veri temeli ve admin operasyon ekranlarını aynı sade sistemde toplamak.

## Bu Hafta Öncelik
1. ilk teklif omurgasını keskinleştirmek
2. Project OS / Context Center / Consultation Center akışlarını gerçek veriyle bağlamak
3. Postgres + Prisma temelini başlatmak
4. Hesap Merkezi V2'yi prod doğrulamayla kapatmak

## Aktif Yapılanlar
- `hesap-merkezi` V2 yerel akış ve API yüzeyi tamamlandı
- Project OS ilk typed operasyon modeliyle ilerliyor
- Consultation Center v1 rol ayrımı netleşti: karar hazırlama, danışma filtresi ve sonuç route katmanı olarak tanımlandı
- Consultation Center icin Prisma schema, dummy veri ve ilk API / ekran akışı iskeleti bağlandı
- Consultation Center icin Prisma client, `.env.example` ve mock-or-db service katmanı eklendi; gerçek DB'ye geçiş yolu açıldı
- Consultation Center ekranina quick create formu ve seçili kayıt akışı bağlandı; inbox'tan kayıt seçme ve yeni consultation açma çalışır hale geldi
- workspace bağlamı sadeleştirildi, görev kapatma ve bağlam hijyeni netleştirildi
- tasarım sistemi + marka kimliği kararları kalıcı bağlama alındı
- OOM sonrası 8G swap açıldı ve admin servis için memory guard eklendi

## Sıradaki Somut Adımlar
- Postgres + Prisma kurulumu
- `businesses`, `audits`, `offers`, `delivery_projects` şemaları
- Project OS ekranını veritabanı katmanına bağlamak
- Context Center'i dosya / veritabanı karar yüzeyine çevirmek
- Consultation Center v1 spec'ini ekran + veri modeli + route akışına bağlamak
- normal oturumda V2 prod deploy + doğrulama almak

## Heartbeat Çalışma Talimatı
- Saat başı tetiklenen heartbeat, öncelikle Consultation Center için alınan GPT çıktısını ürüne çevirmeye devam etsin.
- Her wake'de bir somut teknik adım ilerletsin: veri modeli, API, ekran akışı, route mantığı veya gerçek veritabanı bağlantısı.
- Aynı wake içinde yeni daha kritik bir blokaj veya karar ihtiyacı çıkmazsa başka iş akışına dağılmasın.
- Görünür kullanıcı mesajı ancak gerçekten önemli gelişme, net blokaj veya karar ihtiyacı varsa gönderilsin.
- Consultation Center follow-through işi bu faz için yeterli noktaya geldiğinde saatlik heartbeat cron'u kapatılsın; iş bitince gereksiz tekrar etmesin.

## Mevcut Blokajlar
- ilk teklif paketinin detayları hâlâ tam keskin değil
- operasyonel kayıtlar henüz tam veritabanına taşınmadı
- prod doğrulama için normal oturum yetkisi gerekiyor
- yeni web vitrini henüz kurulmadığı için ana domain placeholder modunda

## Dikkat Edilecek Riskler
- MVP'nin genel CRM'e kayması
- bağlam dosyalarının tekrar ve çöp ile büyümesi
- teklif netleşmeden ekran çoğaltmak

## Bu Fazın Done Tanımı
- teklif omurgası netleşmiş olacak
- temel veri modeli çalışıyor olacak
- admin tarafında ana akışların nerede yaşadığı netleşmiş olacak

## Son Güncelleme
2026-04-19
