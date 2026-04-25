> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

# 8. Teknik Mimari

EsnafDigital 360, tek parca bir uygulama gibi degil; gorevi ayrilmis katmanlar halinde kurulmalıdır.

Temel akis:

```text
Isletme sahibi
   ↓
Mesajlasma kanali
   ↓
Kanal adapteri / routing
   ↓
Ilgili OpenClaw Isletme Ajani
   ↓
Sinirli EsnafDigital API tool'lari
   ↓
EsnafDigital App / Database / Web Vitrini / QR / Katalog / Gorevler / Raporlar
```

Bu mimaride musteri kanali, ajan runtime'i ve EsnafDigital uygulamasi birbirine karismadan calisir.

## 8.1 Kanal Katmani

Kanal katmani, isletme sahibinin ajana ulasma yoludur.

Ornek kanallar:

- Telegram,
- WhatsApp,
- webchat / web panel,
- e-posta,
- ileride mobil uygulama.

Kanal katmaninin gorevi sadece sudur:

1. mesaji almak,
2. gondereni ve bagli isletmeyi anlamak,
3. mesaji dogru OpenClaw Isletme Ajani'na yonlendirmek,
4. ajanin cevabini ayni kanaldan geri iletmek.

Kanal katmani is kurallarini tasimaz. Ajan mantigi WhatsApp veya Telegram icine yazilmaz.

## 8.2 OpenClaw Runtime

OpenClaw Runtime, isletme ajanlarinin calistigi katmandir.

Bu katmanda:

- her isletmenin ayri OpenClaw Isletme Ajani vardir,
- her agent'in ayri workspace'i vardir,
- her agent'in ayri hafizasi, oturumu ve yetki profili vardir,
- agent mesajlasma uzerinden bilgi toplar,
- eksikleri takip eder,
- icerik veya rapor taslagi uretir,
- gerekiyorsa EsnafDigital API tool'larini cagirir,
- riskli islerde onay ister.

OpenClaw Runtime, EsnafDigital veritabanina dogrudan erismez.

## 8.3 EsnafDigital App

EsnafDigital App, urunun veri ve operasyon merkezidir.

Burada tutulacak ana alanlar:

- isletme kayitlari,
- Isletme Ajani Kayitlari,
- musteri / yetkili kisi bilgileri,
- aktif paket ve moduller,
- web vitrini verileri,
- menu / katalog / hizmet listesi verileri,
- QR ve kisa link verileri,
- fotograf ve medya varliklari,
- gorevler,
- bakim takipleri,
- raporlar,
- odeme ve paket durumu,
- admin panel.

Musteri paneli ilk MVP'nin zorunlu parcasi degildir. Ilk asamada musteri arayuzu mesajlasma kanali olabilir.

## 8.4 EsnafDigital API ve Tool Siniri

OpenClaw isletme ajanlari veritabanina direkt baglanmaz.

Dogru baglanti:

```text
OpenClaw Isletme Ajani
   ↓
Sinirli tool/plugin
   ↓
EsnafDigital API
   ↓
Database / operasyon kayitlari
```

Bu sinir guvenlik ve kontrol icin zorunludur.

Ilk tool/API islemleri sunlar olabilir:

- isletme profilini getir,
- eksik bilgi listesini getir,
- isletme bilgisi guncelle,
- fotograf veya dosya ekleme talebi olustur,
- menu / katalog / hizmet bilgisi ekle,
- QR veya yorum linki olustur,
- gorev ac,
- bakim notu ekle,
- musteri talebi kaydet,
- kisa rapor taslagi olustur.

Riskli islemler dogrudan calismaz; onay veya operasyon devri ister.

## 8.5 Skill, Workspace ve Tool Ayrimi

Bu sistemde uc farkli parca karistirilmamalidir:

- **Workspace dosyalari:** isletme agent'inin kim oldugunu, hangi isletme icin calistigini ve hangi sinirlara sahip oldugunu anlatir.
- **Skill / davranis rehberi:** ajanin nasil dusunecegini, nasil soru soracagini ve hangi akisi izleyecegini tarif eder.
- **Tool / plugin:** ajanin EsnafDigital API uzerinde gercek islem yapmasini saglar.

Ajan davranisi dosya/skill tarafinda tarif edilir; gercek sistem islemleri ise yalniz sinirli tool/API katmani uzerinden yapilir.

---
