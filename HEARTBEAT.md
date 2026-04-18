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
- aynı email altında ayrı business/workspace auth profili açma mantığını geri getirme
- `Project OS`, `Context Center` ve `Consultation Center` için ilk admin ekran iskeletlerini açma
- `Project OS` ekranını ilk typed operasyon veri modeliyle beslemeye başlama

## Sıradaki Somut Adımlar
- Postgres + Prisma kurulumu
- `businesses`, `audits`, `offers`, `delivery_projects` şemaları
- Project OS ekranını Prisma/veritabanı katmanına bağlama
- Context Center ekranını dosya/veritabanı ayrımı karar yüzeyine çevirme
- GPT Pro Consultation Center v1 akışını prompt üretimiyle bağlama
- codex panelindeki profil/limit mantığını daha gerçek usage verileriyle iyileştirme
- workspace bazlı auth profillerinde kullanım/veri ayrımını daha görünür hale getirme

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
2026-04-18
