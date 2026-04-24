# ROADMAP.md

## Şu Anki Faz
**Faz 1 — İç operasyon ve bağlam omurgasını kurma**

Bu fazın amacı, satışı destekleyecek sade ama sağlam bir iç sistem kurmaktır. Önce görünürlük ve düzen, sonra otomasyon.
Kesif / on degerlendirme -> teklif -> teslimat -> bakim cizgisi ilk is akis omurgasidir, ama panel tasariminda tek zorunlu hat degildir.

## Şimdi Odaklandıklarımız
- teklif omurgasını keskinleştirmek
- admin paneli iş akışına göre kurmak
- proje/bağlam dosyalarını yaşayan sisteme dönüştürmek
- operasyonel veri modelini başlatmak
- GPT Pro icin prompt uretim yuzeyini netlestirmek

## 0–30 Gün
### Hedef
İç sistemin ilk çalışan omurgasını ayağa kaldırmak.

### Done
- login + admin panel v1 mevcut
- proje için temel bağlam dosyaları oluşturuldu

### Doing
- ana domain placeholder modundan cikacak yeni tanitim sitesi cizgisini netlestirmek
- proje kayıtlarının standardize edilmesi
- admin panel bilgi mimarisinin netleştirilmesi
- ilk hizmet omurgasının sadeleştirilmesi
- home ekraninin sistem anlatısından aktif is ve kritik aksiyon yuzeyine cekilmesi
- Project OS icinde businesses / audits / offers / delivery hattinin daha net gorunur hale getirilmesi
- operator panelini CRM yonune genisletecek cekirdek nesnelerin sinirini cizmek

### Next
- CRM V1 icin cekirdek nesneleri netlestirmek (`business detail`, `activity`, `note`, `next step`, `task`)
- mevcut `businesses`, `audits`, `offers`, `delivery_projects` omurgasini bu yeni yuzeylere baglamak
- dashboard/home icin aktif is + kritik aksiyon + kompakt hat ozeti
- Project OS icinde asama bazli operasyon gorunumu
- Project OS ile Prompt Uretimi el sikismasini gorunur hale getirmek

## 30–60 Gün
### Hedef
Satıştan operasyona geçişi panelde görünür hale getirmek.

### Öncelikler
- gerçek işletme kayıtlarını tutmak
- on degerlendirme puanlama cercevesi kullanimini netlestirmek
- offer şablonlarını standardize etmek
- delivery takibini panelde işletmek
- kanonik business detail yuzeyini acmak

## 60–90 Gün
### Hedef
Teslimat sonrası canlılık ve tekrar edilebilirlik katmanını eklemek.

### Öncelikler
- bakım / canlılık akışını eklemek
- prompt kayitlarini sade ve tekrar edilebilir hale getirmek
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
1. İşletmeyle ilgili satış, karar veya operasyon akışını daha görünür ve yönetilebilir yapıyor mu?
2. Şu anki faz için gerekli mi?
3. Satılabilirliği veya operasyon görünürlüğünü artırıyor mu?
4. Daha basit bir versiyonla çözülebilir mi?

## Şimdilik Ertelenenler
- ağır AI / RAG katmanları
- bağımsız yatay SaaS tipi genel CRM ürünleşmesi
- çok rollü kullanıcı sistemi
- ileri müşteri portalı
- muhasebe / gelir-gider / stok modülleri
