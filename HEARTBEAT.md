# HEARTBEAT.md

Bu dosya kalıcı gerçekleri değil, **şu anki operasyon nabzını** tutar.

## Mevcut Faz
**Faz 1 — İç operasyon ve bağlam omurgasını kurma**

## Şu Anki Ana Hedef
Proje yönetimi, bağlam merkezi ve prompt üretim merkezini aynı admin panel mantığında birleştiren sade bir iç sistem kurmak.

## Şu Anda Öncelikli Konular
1. teklif omurgasını netleştirmek
2. admin paneli iş akışına göre toparlamak
3. operasyonel veri modelini başlatmak
4. Project OS + Context Center + Consultation Center ekranlarını tanımlamak
5. canlı admin panelini gerçek operasyon ekranlarıyla genişletmek

## Aktif Yapılanlar
- yaşayan proje dosyalarını standardize etme
- admin panel bilgi mimarisini netleştirme
- audit -> teklif -> teslimat akışını görünür hale getirme
- eski canlı siteyi yayından alıp yeniden kurulum için zemini temizleme
- `admin.esnafdijital.com.tr` altında gerçek Next.js admin uygulamasını yayına alma
- `/codex-profilleri` ekranı ile çoklu OpenClaw/Codex auth profili yönetimini canlıya alma
- eski codex ekranından ayrı `/hesap-merkezi` V2 çekirdeğini açma
- yeni hesap sistemini sadece gerçek auth kaydı + operator adı + teknik kimlik ilişkisini net gösterecek şekilde başlatma
- `/hesap-merkezi` içine yeni auth başlatma, current switch, ad/not güncelleme ve silme aksiyonlarını bağlama
- `/hesap-merkezi` auth akışını eski route'lardan ayırıp kendi V2 API yüzeyine taşıma
- `/hesap-merkezi` auth kaydetme mantığını operator kullanımına daha uygun hale getirme; aynı hesap tekrar gelse bile yeni kayıt açabilen çizgiyi kurma
- `/hesap-merkezi` status/payload yüklemesini hafifletme, auth session bilgisini hafif overlay okumasıyla verme
- V2 auth save akışını kontrollü simülasyonla doğrulama, aynı teknik hesaptan ayrı kayıt açıldığını test etme
- V2 için yerel/prod doğrulama helper'ı ekleme ve çalıştırma
- V2 prod deploy için build + restart + verify yapan tek komut helper'ı ekleme
- `Project OS`, `Context Center` ve `Consultation Center` için ilk admin ekran iskeletlerini açma
- `Project OS` ekranını ilk typed operasyon veri modeliyle beslemeye başlama

## Sıradaki Somut Adımlar
- Postgres + Prisma kurulumu
- `businesses`, `audits`, `offers`, `delivery_projects` şemaları
- Project OS ekranını Prisma/veritabanı katmanına bağlama
- Context Center ekranını dosya/veritabanı ayrımı karar yüzeyine çevirme
- GPT Pro Consultation Center v1 akışını prompt üretimiyle bağlama
- normal oturumda `npm run deploy:hesap-merkezi-v2` ile V2 build'ini prod servise taşıyıp gerçek canlı doğrulama alma
- eski `/codex-profilleri` ekranını ancak V2 prod doğrulaması tamamlanınca emekliye ayırma
- Project OS, Context Center ve Consultation Center ekranlarını gerçek veri/akışla bağlama

## Mevcut Blokajlar
- ilk teklif paketinin detayları tam keskin değil
- operasyonel kayıtlar henüz tam veritabanına taşınmadı
- hangi bilgilerin dosyada, hangilerinin veritabanında tutulacağı netleşme aşamasında
- yeni web vitrini henüz kurulmadığı için ana domain şu an placeholder modunda

## Dikkat Edilecek Riskler
- MVP'nin genel CRM'e kayması
- bağlam dosyalarının kontrolsüz büyümesi
- prompt üretiminde tüm dosyaları kör biçimde içeri basmak
- teklif netleşmeden ekran çoğaltmak

## Güncelleme Kuralı
Aşağıdakiler değiştiğinde bu dosya güncellenir:
- aktif odak
- doing / next listesi
- blokajlar
- kritik riskler

## Son Güncelleme
2026-04-19
