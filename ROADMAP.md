# ROADMAP.md

## Şu Anki Faz
**Faz 1 — İç operasyon ve bağlam omurgasını kurma**

Bu fazın amacı, satışı destekleyecek sade ama sağlam bir iç sistem kurmaktır. Önce görünürlük ve düzen, sonra otomasyon.

## Şimdi Odaklandıklarımız
- teklif omurgasını keskinleştirmek
- admin paneli iş akışına göre kurmak
- proje/bağlam dosyalarını yaşayan sisteme dönüştürmek
- operasyonel veri modelini başlatmak
- GPT Pro consultation / prompt üretim merkezini tanımlamak

## 0–30 Gün
### Hedef
İç sistemin ilk çalışan omurgasını ayağa kaldırmak.

### Done
- ilk tanıtım sitesi yayında
- login + admin panel v1 mevcut
- proje için temel bağlam dosyaları oluşturuldu

### Doing
- proje kayıtlarının standardize edilmesi
- admin panel bilgi mimarisinin netleştirilmesi
- teklif ve audit omurgasının sadeleştirilmesi
- home ekraninin sistem anlatısından aktif is ve kritik aksiyon yuzeyine cekilmesi
- Project OS icinde businesses / audits / offers / delivery hattinin daha net gorunur hale getirilmesi

### Next
- Postgres + Prisma kurulumu
- `businesses`, `audits`, `offers`, `delivery_projects` tabloları
- dashboard/home icin aktif is + kritik aksiyon + kompakt hat ozeti
- Project OS icinde asama bazli operasyon gorunumu
- Project OS ile Consultation / Context el sikismasini gorunur hale getirmek

## 30–60 Gün
### Hedef
Audit -> teklif -> teslimat akışını panelde görünür hale getirmek.

### Öncelikler
- gerçek işletme kayıtlarını tutmak
- audit scorecard kullanımını netleştirmek
- offer şablonlarını standardize etmek
- delivery takibini panelde işletmek
- kanonik business detail yuzeyini acmak

## 60–90 Gün
### Hedef
Teslimat sonrası canlılık ve tekrar edilebilirlik katmanını eklemek.

### Öncelikler
- bakım / canlılık akışını eklemek
- consultation kayıtlarını düzenli hale getirmek
- saha geri bildirimine göre teklifleri daraltmak
- operasyon playbook'larını tamamlamak

## Öncelik Sırası
1. offer clarity
2. operasyon görünürlüğü
3. veri modeli
4. teslimat akışı
5. küçük otomasyonlar

## Karar Kuralı
Yeni bir fikir geldiğinde şu sorularla filtrelenir:
1. Audit -> teklif -> teslimat -> bakım akışına hizmet ediyor mu?
2. Şu anki faz için gerekli mi?
3. Satılabilirliği veya operasyon görünürlüğünü artırıyor mu?
4. Daha basit bir versiyonla çözülebilir mi?

## Şimdilik Ertelenenler
- ağır AI / RAG katmanları
- genel CRM özellikleri
- çok rollü kullanıcı sistemi
- ileri müşteri portalı
- muhasebe / gelir-gider / stok modülleri
