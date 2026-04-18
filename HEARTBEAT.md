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

## Aktif Yapılanlar
- yaşayan proje dosyalarını standardize etme
- admin panel bilgi mimarisini netleştirme
- audit -> teklif -> teslimat akışını görünür hale getirme

## Sıradaki Somut Adımlar
- Postgres + Prisma kurulumu
- `businesses`, `audits`, `offers`, `delivery_projects` şemaları
- Project OS ekranı
- Context Center ekranı
- GPT Pro Consultation Center v1

## Mevcut Blokajlar
- ilk teklif paketinin detayları tam keskin değil
- operasyonel kayıtlar henüz tam veritabanına taşınmadı
- hangi bilgilerin dosyada, hangilerinin veritabanında tutulacağı netleşme aşamasında

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
