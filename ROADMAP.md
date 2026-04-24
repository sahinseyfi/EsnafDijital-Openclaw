# ROADMAP.md

## Su Anki Faz
**Faz 1 - Ic operasyon ve baglam omurgasini kurma**

Bu fazin amaci, satisi destekleyecek sade ama saglam bir ic sistem kurmaktir. Once gorunurluk ve duzen, sonra otomasyon.
`Aday isletme bulma -> Veri toplama -> On degerlendirme -> Ziyaret hazirligi -> Gorusme -> Teklif -> Teslimat -> Bakim` cizgisi ilk is akis omurgasidir, ama panel tasariminda tek zorunlu hat degildir.

## Simdi Odaklandiklarimiz
- hizmet omurgasini satilan kisim ile ic akis arasinda netlestirmek
- admin paneli is akisina gore kurmak
- proje / baglam dosyalarini yasayan sisteme donusturmek
- operasyonel veri modelini baslatmak
- istem uretimi yuzeyini yardimci katman olarak netlestirmek

## 0-30 Gun
### Hedef
Ic sistemin ilk calisan omurgasini ayaga kaldirmak.

### Done
- login + admin panel v1 mevcut
- proje icin temel baglam dosyalari olusturuldu

### Doing
- ana domain placeholder modundan cikacak yeni tanitim sitesi cizgisini netlestirmek
- proje kayitlarinin standardize edilmesi
- admin panel bilgi mimarisinin netlestirilmesi
- ilk hizmet omurgasinin sadelestirilmesi
- home ekranini sistem anlatisindan aktif is ve kritik aksiyon yuzeyine cekmek
- Project OS icinde isletmeler / on degerlendirmeler / teklifler / teslimat hattini daha net gorunur hale getirmek
- operator panelini yatay urune savurmadan cekirdek nesnelerin sinirini cizmek

### Next
- operator paneli icin cekirdek nesneleri netlestirmek (`isletme detay`, `aktivite`, `not`, `sonraki adim`, `gorev`)
- mevcut `businesses`, `offers`, `delivery_projects` omurgasini bu yeni yuzeylere baglamak ve `on degerlendirme` kaydini kanoniklestirmek
- dashboard / home icin aktif is + kritik aksiyon + kompakt hat ozeti
- Project OS icinde asama bazli operasyon gorunumu
- Project OS ile Istem Uretimi el sikismasini gorunur hale getirmek

## 30-60 Gun
### Hedef
Satistan teslimata gecisi panelde gorunur hale getirmek.

### Oncelikler
- gercek isletme kayitlarini tutmak
- on degerlendirme cercevesi kullanimini netlestirmek
- teklif sablonlarini standardize etmek
- teslimat takibini panelde isletmek
- kanonik isletme detay yuzeyini acmak

## 60-90 Gun
### Hedef
Teslimat sonrasi canlilik ve tekrar edilebilirlik katmanini eklemek.

### Oncelikler
- bakim / canlilik akislarini eklemek
- istem kayitlarini sade ve tekrar edilebilir hale getirmek
- saha geri bildirimine gore teklifleri daraltmak
- operasyon playbook'larini tamamlamak

## Oncelik Sirasi
1. teklif netligi
2. operasyon gorunurlugu
3. veri modeli
4. teslimat akisi
5. kucuk otomasyonlar

## Karar Kurali
Yeni bir fikir geldiginde su sorularla filtrelenir:
1. Isletmeyle ilgili satis, karar veya operasyon akisini daha gorunur ve yonetilebilir yapiyor mu?
2. Su anki faz icin gerekli mi?
3. Satilabilirligi veya operasyon gorunurlugunu artiriyor mu?
4. Daha basit bir versiyonla cozulebilir mi?

## Simdilik Ertelenenler
- agir AI / RAG katmanlari
- bagimsiz yatay SaaS tipi genel CRM urunlesmesi
- cok rollu kullanici sistemi
- ileri musteri portali
- muhasebe / gelir-gider / stok modulleri
