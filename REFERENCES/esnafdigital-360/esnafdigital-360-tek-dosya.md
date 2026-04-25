# EsnafDigital 360 - Tek Dosya

Bu dosya, `REFERENCES/esnafdigital-360/` klasöründeki aktif bölüm dosyalarını tek yerde okumak ve paylaşmak için oluşturulmuştur.

> Not: Karar ve çalışma kaynağı hâlâ ayrı numaralı bölüm dosyalarıdır. Bu dosya kolay okuma/aktarım kopyasıdır.

_Oluşturulma: 2026-04-25 23:45 UTC_

## İçindekiler

1. [EsnafDigital 360 + OpenClaw](#esnafdigital-360-openclaw) — `00-giris-ve-mvp-karari.md`
2. [1. Yönetici Özeti](#1-yönetici-özeti) — `01-yonetici-ozeti.md`
3. [2. Ana Ürün Kararı](#2-ana-ürün-kararı) — `02-ana-urun-karari.md`
4. [3. Konumlandırma](#3-konumlandırma) — `03-konumlandirma.md`
5. [4. Hedef Müşteri](#4-hedef-müşteri) — `04-hedef-musteri.md`
6. [5. Ürün Mantığı](#5-ürün-mantığı) — `05-urun-mantigi.md`
7. [6. Kanal Stratejisi](#6-kanal-stratejisi) — `06-kanal-stratejisi.md`
8. [7. OpenClaw Kurulum Kararı](#7-openclaw-kurulum-kararı) — `07-openclaw-kurulum-karari.md`
9. [8. Teknik Mimari](#8-teknik-mimari) — `08-teknik-mimari.md`
10. [9. Ana Modüller](#9-ana-modüller) — `09-ana-moduller.md`
11. [10. Modüllerin İlk Sürüm Karşılığı](#10-modüllerin-ilk-sürüm-karşılığı) — `10-modullerin-ilk-surum-karsiligi.md`
12. [11. İlk MVP Tanımı](#11-ilk-mvp-tanımı) — `11-ilk-mvp-tanimi.md`
13. [12. Müşteri Akışı](#12-müşteri-akışı) — `12-musteri-akisi.md`
14. [13. OpenClaw Ajan Davranışı](#13-openclaw-ajan-davranışı) — `13-openclaw-ajan-davranisi.md`
15. [14. Admin / Operasyon Paneli](#14-admin-operasyon-paneli) — `14-admin-operasyon-paneli.md`
16. [15. Web Vitrini Mantığı](#15-web-vitrini-mantığı) — `15-web-vitrini-mantigi.md`
17. [16. Menü / Katalog / Hizmet Listesi Mantığı](#16-menü-katalog-hizmet-listesi-mantığı) — `16-online-menu-mantigi.md`
18. [17. Dinamik QR / NFC ve Kısa Link Mantığı](#17-dinamik-qr-nfc-ve-kısa-link-mantığı) — `17-qr-ve-dinamik-link-mantigi.md`
19. [18. Paket Yapısı](#18-paket-yapısı) — `18-paket-yapisi.md`
20. [19. Geliştirme ve Uygulama Fazları](#19-geliştirme-ve-uygulama-fazları) — `19-gelistirme-sirasi.md`
21. [19 - Gelistirme ve Uygulama Fazlari GPT Pro Kontrol Notu](#19---gelistirme-ve-uygulama-fazlari-gpt-pro-kontrol-notu) — `19-gelistirme-sirasi-gpt-pro-kontrol-notu.md`
22. [20. Güvenlik ve Onay Kuralları](#20-güvenlik-ve-onay-kuralları) — `20-guvenlik-ve-onay-kurallari.md`
23. [21. Başarı Kriterleri](#21-başarı-kriterleri) — `21-basari-kriterleri.md`
24. [22. Stratejik Riskler](#22-stratejik-riskler) — `22-stratejik-riskler.md`

---


## EsnafDigital 360 + OpenClaw

_Kaynak dosya: `00-giris-ve-mvp-karari.md`_

> Aktif 360 bolum dosyasi.
> Durum: duzeltildi; kurucu onayi icin hazir.

---

## EsnafDigital 360 + OpenClaw
### Ajan Merkezli Dijital İşletme Sistemi

> Not: Bu doküman ilk bilgi metnidir. İçindeki bölümler kurucu onayından geçmeden nihai ürün, MVP veya teknik uygulama kararı sayılmaz. Her bölüm ayrı ayrı `kabul / düzelt / ertele` süzgecinden geçirilecektir.

### MVP için kabul edilen mimari karar

Bu dokümanda geçen "işletmeye özel ajan" ifadesi EsnafDigital 360 MVP için gerçek OpenClaw işletme agent'ı ve ayrı workspace anlamına gelir.

MVP kararı şudur:

> Her işletme için tek OpenClaw Gateway/runtime altında ayrı OpenClaw agent, ayrı workspace, ayrı oturum/hafıza ve ayrı izin profili üretilecek. Bu karmaşa manuel yönetimle değil; iyi başlangıç şablonu, otomatik kurulum ve sıkı tool/yetki sınırıyla kontrol altında tutulacak.

`İşletme Ajanı Kaydı`, EsnafDigital panelinde o işletmenin gerçek OpenClaw agent'ını yöneten takip kaydıdır. Bu kayıt; agent kimliğini, workspace yolunu, şablon sürümünü, izin profilini, oturumlarını, kanal bağlantılarını ve görev durumunu tutar.

> Teknik adlandırma gerekirse ASCII karşılığı `IsletmeAjaniKaydi` / `isletme_ajani_kaydi` olarak tutulur.

Kanal kararı ayrı tutulur: İlk doğrulama Telegram/test kanalıyla yapılabilir; WhatsApp ticari hedef kanaldır. İşletmenin kendi WhatsApp hattını bağlama veya randevu karşılama ek kanal/modül paketi olabilir; ancak ajan mimarisi işletme başına ayrı agent/workspace kararına göre kurulacaktır.

Bu doküman, EsnafDigital 360 projesi için önerilen ürün kararlarını, teknik mimariyi, satış konumlandırmasını, modül yapısını ve ilk uygulama planını taslak olarak toplar.

EsnafDigital 360 artık yalnızca web sitesi, Google düzeni, dinamik QR/NFC yönlendirme sistemi veya bakım hizmeti sunan klasik bir dijital hizmet paketi olarak düşünülmemelidir. Bu metindeki öneriye göre projenin ana omurgası, her işletmeye özel oluşturulan **gerçek OpenClaw işletme agent'ı/workspace'i ve bunu yöneten İşletme Ajanı Kaydı** etrafında kurulmalıdır.

Bu ajan; işletme sahibinden bilgileri toplar, web vitrini üretimini başlatır, Google / Maps / Instagram / yorum / menü / fotoğraf / bakım süreçlerini takip eder, eksikleri hatırlatır, görevleri oluşturur ve gerektiğinde EsnafDigital operasyon ekibine aktarır.

Ana hedef şudur:

> Dijital operasyonunu kurmak veya büyütmek isteyen KOBİ’lere, panel karmaşası olmadan mesajlaşma tabanlı özel işletme ajanı sunmak.

---

---


## 1. Yönetici Özeti

_Kaynak dosya: `01-yonetici-ozeti.md`_

> Aktif 360 bolum dosyasi.
> Durum: duzeltildi; kurucu onayi icin hazir.

---

## 1. Yönetici Özeti

EsnafDigital 360, dijital operasyonunu kurmak veya büyütmek isteyen KOBİ’ler için mesajlaşma tabanlı özel işletme ajanı sistemidir.

Her işletme için ayrı bir OpenClaw işletme agent'ı ve ayrı workspace oluşturulur. EsnafDigital panelinde bu agent, **İşletme Ajanı Kaydı** ile takip edilir. İşletme sahibi teknik panel öğrenmeden; dijital kurulum, görünürlük, içerik, web vitrini, QR, menü/katalog ve bakım süreçlerini mesajlaşma üzerinden yönetir.

Sistem tek bir kanala bağlı tasarlanmaz. İlk doğrulama Telegram/test kanalı veya EsnafDigital pilot hattı ile yapılabilir; ticari hedefte WhatsApp önemli kanal olarak kalır.

OpenClaw, EsnafDigital uygulamasının içine gömülmez. Ayrı bir agent runtime servisi olarak çalışır. İlk MVP’de aynı VPS üzerinde ayrı servis olarak başlayabilir; müşteri sayısı, medya yükü, kanal yoğunluğu veya güvenlik ihtiyacı arttığında ayrı VPS’e taşınır.

Temel ürün cümlesi:

> İşletmeniz için kendi hafızası, çalışma alanı ve yetki sınırları olan özel bir dijital asistan kuruyoruz. Panel karmaşası olmadan; web vitrini, görünürlük, yorum, menü/katalog, içerik ve bakım işlerinizi mesajlaşma üzerinden birlikte ilerletiyoruz.

---

---


## 2. Ana Ürün Kararı

_Kaynak dosya: `02-ana-urun-karari.md`_

> Aktif 360 bolum dosyasi.
> Durum: duzeltildi; kurucu onayi icin hazir.

---

## 2. Ana Ürün Kararı

EsnafDigital 360’ın ana ürün kararı şudur:

> Her işletme için özel bir OpenClaw işletme agent'ı ve ayrı workspace kurulur. EsnafDigital panelindeki **İşletme Ajanı Kaydı**, bu agent'ın kimliğini, workspace yolunu, şablon sürümünü, yetki profilini, oturumlarını, kanal bağlantılarını ve görev durumunu izler. Bu ajan; işletmenin dijital kurulum, görünürlük, içerik, web vitrini, QR, menü/katalog/hizmet listesi ve bakım süreçlerini mesajlaşma tabanlı ilerletir.

Bu karar, projeyi klasik “site yapma” işinden çıkarır ve daha güçlü bir ürün konumuna taşır.

EsnafDigital’in satacağı ana şey yalnızca web sitesi değildir.

Satılacak ana değer:

- işletmeye özel mesajlaşma tabanlı dijital asistan,
- güven veren dijital kimlik,
- Google / Maps ve genel görünürlük düzeni,
- web vitrini,
- yorum toplama ve QR akışı,
- menü / katalog / hizmet listesi,
- içerik, fotoğraf ve bilgi düzeni,
- müşteri iletişimini kolaylaştıran bağlantılar,
- düzenli bakım ve takip.

Bu yapı sayesinde modüller birbirinden kopuk hizmetler olmaktan çıkar; işletmenin dijital operasyonunu kuran veya büyüten tek bir ajan merkezli sistemin parçaları haline gelir.

---

---


## 3. Konumlandırma

_Kaynak dosya: `03-konumlandirma.md`_

> Aktif 360 bolum dosyasi.
> Durum: duzeltildi; kurucu onayi icin hazir.

---

## 3. Konumlandırma

### 3.1 Yanlış Konumlandırma

EsnafDigital 360 şu şekilde anlatılmamalıdır:

- sadece web sitesi yapıyoruz,
- sadece Google Maps düzenliyoruz,
- sadece dinamik QR/NFC sistemi kuruyoruz,
- sadece sosyal medya desteği veriyoruz,
- sadece menü/katalog sayfası yapıyoruz,
- KOBİ'lere hazır yazılım satıyoruz.

Bunlar sistemin parçalarıdır; ancak ana ürün değildir.

### 3.2 Doğru Konumlandırma

Doğru konumlandırma:

> EsnafDigital 360, dijital operasyonunu kurmak veya büyütmek isteyen KOBİ’ler için mesajlaşma tabanlı özel işletme ajanı sistemidir.

Daha sade müşteri cümlesi:

> Panel öğrenmenize gerek yok. İşletmenizin dijital işleri için özel işletme ajanınızla mesajlaşın; web vitrini, görünürlük, yorum, menü/katalog/hizmet listesi, içerik ve bakım işleriniz sistemli şekilde ilerlesin.

Daha satış odaklı cümle:

> İşletmenizin internette güvenilir, güncel ve kolay ulaşılabilir görünmesi için kendi hafızası ve yetki sınırları olan özel bir dijital işletme ajanı kuruyoruz.

---

---


## 4. Hedef Müşteri

_Kaynak dosya: `04-hedef-musteri.md`_

> Aktif 360 bolum dosyasi.
> Durum: duzeltildi; sektor ornekleri daha sonra GPT Pro ile ayrica netlestirilecek.

---

## 4. Hedef Müşteri

İlk hedef müşteri grubu, dijital operasyonunu kurmak veya büyütmek isteyen ve özel işletme ajanından gerçek verim alabilecek KOBİ’lerdir.

Bu aşamada sektör listesi kesinleştirilmez. Uygun sektör örnekleri, ürün planı netleştikten sonra ayrıca GPT Pro ile değerlendirilecektir.

Hedef müşterinin ortak özellikleri:

- dijitalde daha güvenilir, düzenli ve ulaşılabilir görünmek ister,
- müşteri iletişimini daha sistemli hale getirmek ister,
- içerik, fotoğraf, katalog, hizmet listesi, teklif, randevu, bakım veya takip gibi düzenli bilgi akışları vardır ya da bunu kurmak ister,
- büyük ve karmaşık yazılım sistemleriyle uğraşmak istemez,
- teknik panel öğrenmeden mesajlaşma üzerinden ilerlemek ister,
- dijital operasyonu için özel bir ajan fikrinden gerçek fayda görebilecek yapıdadır.

Basit saha/pilot örnekleri olabilir; ancak ana hedef yalnızca berber, kafe, restoran veya güzellik salonu gibi klasik yerel işletmelerle sınırlanmaz.

---

---


## 5. Ürün Mantığı

_Kaynak dosya: `05-urun-mantigi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; ana katman fikri korundu, gelistirilebilecek yerler daha sonra GPT Pro'ya sorulacak.

---

## 5. Ürün Mantığı

EsnafDigital 360, tek tek dijital hizmetlerin yan yana dizildiği bir paket değildir. Ürünün mantığı, işletmeye özel gerçek bir ajan kurmak ve bu ajan üzerinden işletmenin dijital operasyonunu adım adım yönetilebilir hale getirmektir.

Sistem dört ana katmandan oluşur:

1. **İşletme Dijital Profili**
2. **Gerçek OpenClaw İşletme Ajanı ve Workspace**
3. **İşletme Ajanı Kaydı**
4. **Modüler Dijital Hizmet Sistemi**

Bu katmanlar birbirinden ayrı düşünülmez. İşletme ajanı, işletme profilindeki bilgileri ve modülleri kullanarak müşteriyi yönlendirir, eksikleri takip eder ve operasyon işlerini görünür hale getirir.

### 5.1 İşletme Dijital Profili

İşletme Dijital Profili, işletmenin sistemdeki merkezi bilgi kaydıdır.

Bu profil, işletmenin sadece iletişim bilgilerini değil; dijital operasyonunu çalıştırmak için gereken temel verileri de tutar.

Profil alanları şu gruplarda düşünülmelidir:

#### Temel bilgiler

- işletme adı,
- kısa açıklama,
- sektör / faaliyet alanı,
- yetkili kişi,
- telefon,
- mesajlaşma numarası,
- adres,
- çalışma saatleri.

#### Dijital varlıklar

- web vitrini linki,
- Google / Maps linki,
- sosyal profil bağlantıları,
- dinamik QR / NFC kısa linkleri,
- yorum bağlantıları,
- fotoğraf ve medya varlıkları.

#### Sunulan şeyler

- hizmetler,
- ürünler,
- menü / katalog / hizmet listesi,
- fiyat veya fiyat notları,
- öne çıkarılacak işler,
- kampanya veya duyuru bilgileri.

#### Operasyon durumu

- aktif modüller,
- eksik bilgiler,
- açık görevler,
- onay bekleyen işler,
- bakım durumu,
- son güncelleme tarihi,
- ödeme / paket durumu.

Her işletmede tüm alanların dolu olması gerekmez. Ajanın görevlerinden biri, hangi alanların eksik olduğunu anlamak ve bunları adım adım tamamlatmaktır.

### 5.2 Gerçek OpenClaw İşletme Ajanı ve Workspace

Her işletme için gerçek bir OpenClaw İşletme Ajanı ve ayrı workspace oluşturulur.

Bu ajan:

- kendi işletme bağlamıyla çalışır,
- kendi workspace dosyalarını kullanır,
- kendi hafıza ve oturum geçmişine sahiptir,
- kendi yetki profiliyle sınırlandırılır,
- sadece ilgili işletmenin dijital operasyonunu ilerletir.

İşletme ajanının görevi sadece cevap vermek değildir.

Ajanın gerçek görevi:

- bilgi toplamak,
- eksikleri bulmak,
- müşteriyi küçük adımlarla yönlendirmek,
- gelen bilgileri işletme profiline bağlamak,
- içerik ve açıklama taslakları üretmek,
- web vitrini ve katalog verilerini beslemek,
- görev ve sonraki adım oluşturmak,
- bakım sürecini takip etmek,
- riskli işleri onay veya operasyona devretmektir.

### 5.3 İşletme Ajanı Kaydı

İşletme Ajanı Kaydı, agent'ın kendisi değildir.

Bu kayıt, EsnafDigital panelinde gerçek OpenClaw İşletme Ajanı'nı takip eden yönetim kaydıdır.

Bu kayıt şunları tutar:

- agent kimliği,
- workspace yolu,
- şablon sürümü,
- izin / yetki profili,
- bağlı kanal veya test kanalı,
- oturum durumu,
- son aktivite,
- açık eksikler,
- açık görevler,
- onay bekleyen işlemler,
- agent sağlık/durum bilgisi.

Bu ayrım önemlidir:

```text
OpenClaw İşletme Ajanı = çalışan ajan
İşletme Ajanı Kaydı = paneldeki takip/yönetim kaydı
```

### 5.4 Modüler Dijital Hizmet Sistemi

Modüller, işletme ajanının yönettiği dijital operasyon parçalarıdır.

Örnek modül grupları:

- web vitrini,
- görünürlük ve Google / Maps kontrolü,
- dinamik QR / NFC kısa link sistemi,
- menü / katalog / hizmet listesi,
- fotoğraf ve içerik toparlama,
- müşteri iletişim bağlantıları,
- bakım ve güncelleme takibi,
- kısa rapor ve durum özeti,
- ileri aşamada randevu, teklif, sipariş veya entegrasyon modülleri.

Modüllerin hepsi ilk günden tam otomatik olmak zorunda değildir. Bazı modüller yazılımla, bazıları yarı otomatik, bazıları operasyon desteğiyle ilerler.

Ana prensip:

> EsnafDigital 360'ın ürün mantığı, işletme ajanı etrafında işletme profilini, dijital çıktıları, görevleri ve bakım sürecini tek sistemde birleştirmektir.

---

---


## 6. Kanal Stratejisi

_Kaynak dosya: `06-kanal-stratejisi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 6. Kanal Stratejisi

Kanal, EsnafDigital 360'in kendisi degildir. Kanal sadece isletme sahibinin kendi ozel isletme ajanina ulasma yoludur.

Urunun kalbi su parcalardir:

- Isletme Dijital Profili,
- gercek OpenClaw Isletme Ajani,
- Isletme Ajani Kaydi,
- modul sistemi,
- gorev ve takip akisi.

WhatsApp, Telegram, web panel veya baska bir kanal bu cekirdegin uzerine baglanan iletisim kapilaridir. Ajan mantigi kanal icine gomulmez.

### 6.1 Ticari Hedef Kanal

Ticari anlatimda en dogal hedef kanal WhatsApp'tir. Cunku Turkiye'de isletme sahipleri ve ekipleri icin en dusuk surtunmeli iletisim kanali genelde WhatsApp'tir.

Ancak bu, MVP'de her isletmeye hemen ayri WhatsApp hatti acilacagi anlamina gelmez.

Ilk dogrulama su kanallardan biriyle yapilabilir:

- Telegram/test kanali,
- EsnafDigital'e ait pilot WhatsApp hatti,
- webchat veya ic test kanali.

Onemli olan kanal degil, mesajin dogru isletme ajanina yonlenmesi ve ajanin isletme baglamiyla dogru isi ilerletmesidir.

### 6.2 Mesajlasma Uzerinden Yapilacak Isler

Isletme sahibi, panel ogrenmeden mesajlasma uzerinden su isleri ilerletebilmelidir:

- ilk kurulum bilgilerini verme,
- isletme bilgilerini guncelleme,
- fotograf ve icerik gonderme,
- menu / katalog / hizmet bilgisi verme,
- calisma saati veya iletisim bilgisi guncelleme,
- web vitrini guncelleme talebi acma,
- QR / yorum linki alma,
- bakim ihtiyaclarini bildirme,
- kisa durum raporu alma,
- eksik bilgi ve sonraki adimlari gorme.

Musteriye verilecek sade mesaj:

> Panel ogrenmenize gerek yok. Ozel isletme ajaninizla mesajlasin; dijital kurulum, gorunurluk, icerik ve bakim isleriniz sistemli sekilde ilerlesin.

### 6.3 Kanal Bagimsiz Mimari

Sistem WhatsApp'a, Telegram'a veya tek bir kanala bagimli kurulmaz.

Kanalin gorevi sadece sudur:

1. mesaji almak,
2. dogru isletme ajanina yonlendirmek,
3. ajanin cevabini veya istedigi bilgiyi isletme sahibine geri iletmek.

Bu nedenle kanal adaptoru ile ajan mantigi ayridir.

Desteklenebilecek kanallar:

- Telegram,
- WhatsApp,
- web panel / webchat,
- e-posta,
- ileride mobil uygulama.

### 6.4 Ilk MVP Kanal Karari

Ilk MVP'de kanal karari, agent mimarisinden ayri ele alinir.

Cekirdek karar:

> Her isletme icin gercek OpenClaw Isletme Ajani ve ayri workspace olusturulur. Mesaj hangi kanaldan gelirse gelsin, routing/binding ile dogru isletme ajanina gider.

Ilk teknik dogrulama Telegram/test kanaliyla yapilabilir. Ticari hedefte WhatsApp onemli kanal olarak kalir.

Isletmenin kendi WhatsApp hattini ajana baglamak, musteri karsilama veya randevu/siparis akisi gibi daha hassas senaryolar ayri ek kanal/modul paketi olarak ele alinir.

---

---


## 7. OpenClaw Kurulum Kararı

_Kaynak dosya: `07-openclaw-kurulum-karari.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 7. OpenClaw Kurulum Kararı

OpenClaw, EsnafDigital uygulamasının içine gömülmez. Ayrı bir agent runtime katmanı olarak çalışır.

Bu ayrımın amacı şudur:

- EsnafDigital uygulaması işletme verisini, paneli, web vitrini, QR, katalog ve görevleri yönetir.
- OpenClaw runtime işletme ajanlarını, konuşmaları, kanal bağlantılarını ve tool çalıştırma sınırlarını yönetir.
- İki taraf birbiriyle doğrudan veritabanı paylaşarak değil, kontrollü EsnafDigital API ve sınırlı tool/plugin'lar üzerinden konuşur.

### 7.1 MVP Kurulum Modeli

İlk MVP’de ayrı fiziksel sunucu şart değildir. Başlangıçta aynı VPS üzerinde iki ayrı katman bulunabilir:

```text
VPS
│
├─ esnafdigital-app
│  ├─ admin panel
│  ├─ web vitrini
│  ├─ işletme kayıtları
│  ├─ QR / katalog / rapor modülleri
│  └─ database / storage
│
└─ openclaw-runtime
   ├─ OpenClaw Gateway
   ├─ işletme ajanları
   ├─ işletme agent workspace'leri
   ├─ kanal adapterleri
   └─ tool / sandbox / yetki profilleri
```

Buradaki kritik karar Docker olup olmaması değildir. Kritik karar, OpenClaw’ın EsnafDigital app içine karışmaması ve ayrı runtime mantığıyla yönetilmesidir.

### 7.2 İşletme Başına Agent ve Workspace

MVP kararı şudur:

> Her işletme için tek OpenClaw Gateway/runtime altında ayrı OpenClaw İşletme Ajanı ve ayrı workspace oluşturulur.

Bu, her işletme için ayrı VPS veya ayrı Gateway kurulacağı anlamına gelmez. Aynı runtime içinde çoklu izole işletme ajanları çalışır.

Her işletme için tutulacak temel parçalar:

- gerçek OpenClaw İşletme Ajanı,
- ayrı workspace,
- ayrı konuşma oturumu ve hafıza,
- ayrı izin/yetki profili,
- EsnafDigital panelinde İşletme Ajanı Kaydı,
- işletme dijital profili,
- aktif modüller,
- eksik bilgiler,
- açık görevler ve takip durumu.

Örnek mantık:

```text
openclaw-runtime
│
├─ gateway
├─ agent_isletme_001
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
│  └─ yetki-profili
│
├─ agent_isletme_002
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
│  └─ yetki-profili
│
└─ agent_isletme_003
   ├─ workspace
   ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
   └─ yetki-profili
```

Sektör isimleriyle agent adı vermek zorunlu değildir. İlk aşamada standart, sade ve çakışmayan agentId üretimi tercih edilir.

### 7.3 Karmaşayı Kontrol Etme İlkesi

İşletme başına gerçek agent/workspace kararı güçlüdür, ama manuel yönetilirse hızla karmaşıklaşır.

Bu yüzden temel ilke:

> İyi başlangıç şablonu + otomatik kurulum + sıkı yetki sınırı.

Bunun pratik karşılığı:

- agent elle tek tek kurulmaz, şablondan üretilir,
- workspace dosyaları standart başlar,
- İşletme Ajanı Kaydı agent'ın nerede olduğunu ve hangi durumda olduğunu izler,
- tool yetkileri varsayılan olarak sınırlı gelir,
- riskli işlemler onaysız çalışmaz,
- agent başka işletme workspace'lerine veya EsnafDigital ana workspace'ine erişemez,
- şablon sürümü takip edilir; ileride güncelleme gerektiğinde hangi agent'ın hangi şablondan geldiği bilinir.

### 7.4 Ne Zaman Ayrı VPS’e Taşınmalı?

İlk doğrulamada aynı VPS üzerinde ayrı runtime katmanı yeterli olabilir.

OpenClaw runtime şu durumlarda ayrı VPS’e taşınmalıdır:

- işletme agent sayısı belirgin şekilde artarsa,
- medya ve dosya trafiği yükselirse,
- WhatsApp veya başka kanal bağlantıları kritik hale gelirse,
- tool çalıştırma yükü artarsa,
- güvenlik izolasyonu daha önemli hale gelirse,
- agent runtime kaynak kullanımı EsnafDigital uygulamasını etkilemeye başlarsa.

Üretime geçişte hedef yapı:

```text
VPS 1 — EsnafDigital App
- admin panel
- API
- database
- web vitrini
- public website

VPS 2 — OpenClaw Runtime
- OpenClaw Gateway
- işletme ajanları
- agent workspace'leri
- kanal adapterleri
- sandbox / tool execution
```

---

---


## 8. Teknik Mimari

_Kaynak dosya: `08-teknik-mimari.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 8. Teknik Mimari

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

### 8.1 Kanal Katmani

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

### 8.2 OpenClaw Runtime

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

### 8.3 EsnafDigital App

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

### 8.4 EsnafDigital API ve Tool Siniri

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

### 8.5 Skill, Workspace ve Tool Ayrimi

Bu sistemde uc farkli parca karistirilmamalidir:

- **Workspace dosyalari:** isletme agent'inin kim oldugunu, hangi isletme icin calistigini ve hangi sinirlara sahip oldugunu anlatir.
- **Skill / davranis rehberi:** ajanin nasil dusunecegini, nasil soru soracagini ve hangi akisi izleyecegini tarif eder.
- **Tool / plugin:** ajanin EsnafDigital API uzerinde gercek islem yapmasini saglar.

Ajan davranisi dosya/skill tarafinda tarif edilir; gercek sistem islemleri ise yalniz sinirli tool/API katmani uzerinden yapilir.

---

---


## 9. Ana Modüller

_Kaynak dosya: `09-ana-moduller.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; gelistirilebilecek fikirler daha sonra GPT Pro'ya sorulacak.

---

## 9. Ana Modüller

EsnafDigital 360 tek tek hizmetlerin toplandigi bir liste gibi dusunulmemelidir. Moduller, isletme ajaninin yonettigi dijital operasyon parcalari olarak kurgulanir.

Bu bolumdeki modul gruplari ilk urun mantigini kurmak icindir. Hangi sektorlerde hangi modullerin daha guclu olacagi ve gelistirilebilecek yeni fikirler, plan netlestikten sonra GPT Pro'ya ayrica sorulacaktir.

### 9.1 Cekirdek Agent Altyapisi

Bu grup urunun temelidir. Bunlar olmadan EsnafDigital 360, klasik dijital hizmet paketine doner.

- gercek OpenClaw Isletme Ajani,
- ayri agent workspace'i,
- Isletme Ajani Kaydi,
- isletme dijital profili,
- izin/yetki profili,
- eksik bilgi takibi,
- gorev ve sonraki adim akisi,
- sinirli EsnafDigital API tool'lari.

### 9.2 Dijital Varlik ve Gorunurluk Modulleri

Bu grup isletmenin internette guvenilir, guncel ve ulasilabilir gorunmesini saglar.

- web vitrini,
- Google / Maps gorunurluk kontrolu,
- temel isletme bilgileri duzeni,
- yorum linki ve QR akisi,
- Instagram / sosyal profil duzeni,
- fotograf ve medya toparlama,
- menu / katalog / hizmet listesi,
- ozel domain veya alt alan adi.

### 9.3 Iletisim ve Musteri Aksiyonu Modulleri

Bu grup musterinin isletmeye daha kolay ulasmasini ve isletmenin talepleri daha duzenli almasini destekler.

- arama / WhatsApp / yol tarifi baglantilari,
- randevu veya rezervasyon linki,
- talep toplama akisi,
- kisa link / dinamik QR,
- yorum isteme materyalleri,
- NFC yorum karti veya standi,
- musteriye gonderilecek kisa bilgilendirme/rapor linkleri.

### 9.4 Operasyon ve Bakim Modulleri

Bu grup kurulumdan sonra sistemin canli kalmasini saglar.

- aylik bakim takibi,
- eksik bilgi ve guncelleme hatirlatmalari,
- icerik ve fotograf guncelleme talepleri,
- basit durum raporu,
- operasyon ekibine gorev aktarma,
- yayin/onay bekleyen islerin takibi,
- isletme profilinin guncel tutulmasi.

### 9.5 Ileri Ticari ve Sistem Modulleri

Bu grup baslangicta sistem vizyonunda tutulur; ancak ilk MVP'nin zorunlu parcasi sayilmaz.

- gelismis musteri paneli,
- self-service icerik yonetimi,
- WhatsApp Randevu Asistani,
- gelismis menu/katalog sistemi,
- siparis veya teklif akisi,
- gelir / gider ekrani,
- stok / tahsilat / muhasebe modulleri,
- gelismis entegrasyonlar,
- satis temsilcisi veya yonlendirme modeli.

Ana prensip:

> Moduller ilk gunden tek tek tam otomatik olmak zorunda degildir. Onemli olan, her modulun agent merkezli sistemde nereye oturdugunun net olmasidir.

---

---


## 10. Modüllerin İlk Sürüm Karşılığı

_Kaynak dosya: `10-modullerin-ilk-surum-karsiligi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 10. Modüllerin İlk Sürüm Karşılığı

EsnafDigital 360'ta her modülün ilk günden tam otomatik olması gerekmez. İlk sürümün amacı, modülleri sistemde doğru yere koymak ve işletme ajanı üzerinden yönetilebilir hale getirmektir.

Bu yüzden modüller dört seviyede ele alınır:

1. **Çekirdek MVP** — ilk sürümde mutlaka çalışması gereken parçalar.
2. **Yarı otomatik** — ajan bilgi toplar, operasyon veya kurucu kontrol eder.
3. **Manuel operasyon** — sistemde takip edilir, uygulama elle yapılır.
4. **İleri modül** — vizyonda tutulur, MVP'de zorunlu değildir.

### 10.1 Çekirdek MVP

Bunlar olmadan ürünün ajan merkezli farkı zayıflar.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Gerçek OpenClaw İşletme Ajanı | Her işletme için ayrı agent/workspace oluşturulur | Çekirdek yazılım |
| İşletme Ajanı Kaydı | Agent kimliği, workspace, şablon, izin profili ve durum panelde izlenir | Çekirdek yazılım |
| İşletme Dijital Profili | Temel bilgiler, dijital varlıklar, eksikler ve aktif modüller tutulur | Çekirdek veri modeli |
| Eksik bilgi takibi | Ajan eksikleri sorar ve profil/görev akışına bağlar | Ajan destekli |
| Görev / sonraki adım | Ajan veya operasyon için açık işler görünür olur | Operasyon yazılımı |
| Web vitrini taslağı | Profil verisinden ilk sayfa taslağı oluşur | Yazılım |
| QR / yorum linki | Yorum veya hedef link için QR üretimi yapılır | Yazılım / yarı otomatik |
| Mesajlaşma akışı | Pilot kanaldan doğru işletme ajanına yönlendirme test edilir | Kanal + routing |

### 10.2 Yarı Otomatik Modüller

Bu modüllerde ajan süreci başlatır, bilgi toplar ve taslak üretir; son kontrol insanda veya operasyonda kalır.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Dijital görünürlük kontrolü | Ajan bilgi toplar, operasyon kısa kontrol yapar | Yarı otomatik |
| Google / Maps düzeni | Ajan eksikleri çıkarır, gerçek değişiklik operasyon onayıyla yapılır | Manuel + ajan destekli |
| Menü / katalog / hizmet listesi | Ajan bilgileri toplar, basit liste/sayfa oluşturulur | Yarı otomatik |
| Fotoğraf / içerik toparlama | Müşteri mesajla gönderir, profil varlıklarına/göreve bağlanır | Yarı otomatik |
| Instagram / sosyal profil düzeni | Ajan öneri üretir, uygulama onayla yapılır | Yarı otomatik |
| Basit durum raporu | Profil, görev ve checklist verisinden taslak rapor oluşur | Yarı otomatik |
| Bakım takibi | Ajan hatırlatır, operasyon kontrol eder | Yarı otomatik |

### 10.3 Manuel Operasyon Modülleri

Bu modüller sistemde takip edilir; ancak ilk sürümde gerçek uygulama elle yapılır.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Özel domain | Operasyon bağlar, sistemde durum takip edilir | Manuel |
| NFC kart / yorum standı | QR hedefi sistemden alınır, fiziksel üretim elle yürür | Manuel / fiziksel |
| Kartvizit / basit logo | Şablonla hazırlanır, teslimat görevi olarak takip edilir | Hizmet |
| Ek fotoğraf / içerik düzenleme | Talep mesajla alınır, görev olarak açılır | Hizmet |
| Düzenli Instagram içerik | Ajan fikir/taslak verir, operasyon uygular | Hizmet |

### 10.4 İleri Modüller

Bu modüller ürün vizyonunda tutulur ama ilk MVP'nin zorunlu parçası değildir.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| İşletmenin kendi WhatsApp hattını ajana bağlama | Ek kanal/modül paketi olarak değerlendirilir | İleri modül |
| WhatsApp Randevu Asistanı | İlk aşamada talep toplama ve özetleme seviyesinde düşünülür | İleri modül |
| Gelişmiş müşteri paneli | İlk sürümde mesajlaşma arayüzü yeterli olabilir | İleri yazılım |
| Self-service içerik yönetimi | Mesajla bilgi/fotoğraf gönderme akışından sonra geliştirilir | İleri yazılım |
| Gelişmiş katalog / sipariş / teklif akışı | Basit katalogdan sonra kademeli eklenir | İleri yazılım |
| Gelir / gider | Veri modeli veya fikir havuzu seviyesinde kalır | İleri modül |
| Stok / tahsilat / muhasebe | MVP dışında, entegrasyon alanı bırakılır | İleri modül |
| Gelişmiş entegrasyonlar | API bağlantıları sonraki aşamaya kalır | İleri modül |
| Satış temsilcisi ağı | İlk müşteri doğrulamasından sonra ele alınır | İleri operasyon |

Ana prensip:

> İlk sürümde önemli olan her şeyi otomatik yapmak değil; hangi işin ajanla, hangi işin operasyonla, hangi işin sonraya bırakılarak ilerleyeceğini net ayırmaktır.

---

---


## 11. İlk MVP Tanımı

_Kaynak dosya: `11-ilk-mvp-tanimi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 11. İlk MVP Tanımı

EsnafDigital 360 MVP'si yalnızca web vitrini değildir. MVP'nin amacı, bir işletme için özel işletme ajanı kurulumunun ve bu ajan üzerinden dijital operasyon başlatmanın gerçekten çalıştığını göstermektir.

### 11.1 MVP'nin Tek Net Senaryosu

İlk MVP şu senaryoyu çalıştırmalıdır:

> Bir işletme sisteme kaydedilir. Bu işletme için gerçek OpenClaw İşletme Ajanı, ayrı workspace ve İşletme Ajanı Kaydı oluşturulur. İşletme sahibi pilot mesajlaşma kanalı üzerinden kendi işletme ajanına yönlendirilir. Ajan işletmenin temel bilgilerini, eksiklerini, görsellerini, hizmet/katalog bilgisini ve görünürlük ihtiyaçlarını toplar. Sistem bu bilgilerle ilk web vitrini taslağını, iletişim bağlantılarını, QR/yorum akışını, görev listesini ve basit durum özetini oluşturur.

Bu senaryo çalışmadan MVP tamamlanmış sayılmaz.

### 11.2 MVP'de Kesin Olacak Parçalar

MVP'nin çekirdeğinde şu parçalar bulunmalıdır:

- işletme kayıt modeli,
- işletme dijital profili,
- gerçek OpenClaw İşletme Ajanı,
- ayrı agent workspace'i,
- İşletme Ajanı Kaydı,
- agent workspace şablonu,
- otomatik veya yarı otomatik agent kurulum akışı,
- işletme bazlı ayrı oturum ve hafıza,
- sıkı tool/yetki profili,
- pilot mesajlaşma kanalı,
- routing/binding ile doğru işletme ajanına yönlendirme,
- ajan bilgi toplama akışı,
- eksik bilgi takibi,
- admin görev listesi,
- web vitrini taslağı,
- arama / mesajlaşma / yol tarifi bağlantıları,
- QR veya yorum linki üretimi,
- menü / katalog / hizmet listesi için basit yapı,
- fotoğraf ve içerik toplama akışı,
- basit durum raporu veya kurulum özeti.

### 11.3 MVP'de Yarı Otomatik veya Manuel Kalabilecekler

İlk MVP'de şu işler sistemde takip edilir; ancak tamamen otomatik olmak zorunda değildir:

- Google İşletme Profili'nde gerçek değişiklik yapmak,
- Instagram veya sosyal medya hesabında paylaşım yapmak,
- özel domain bağlamak,
- NFC kart veya fiziksel yorum standı hazırlamak,
- profesyonel logo / kartvizit / tasarım çıktıları üretmek,
- düzenli içerik paylaşımı yapmak,
- müşteri adına dış hesaba giriş yapmak,
- kesin randevu veya ticari taahhüt oluşturmak.

Bu işlerde ajan bilgi toplar, taslak üretir veya görev açar; gerçek işlem operasyon veya kurucu onayıyla yapılır.

### 11.4 MVP Dışında Kalacak İleri Parçalar

Şu parçalar ilk MVP'nin zorunlu şartı değildir:

- işletmenin kendi WhatsApp hattını doğrudan ajana bağlamak,
- WhatsApp Randevu Asistanı'nı tam otomatik çalıştırmak,
- gelişmiş müşteri paneli,
- self-service içerik yönetimi,
- gelişmiş katalog / sipariş / teklif akışı,
- gelir / gider sistemi,
- stok / tahsilat / muhasebe modülleri,
- gelişmiş entegrasyonlar,
- satış temsilcisi ağı.

Bu parçaların sistemde yeri olabilir; ancak MVP'yi ağırlaştırmamalıdır.

### 11.5 MVP Bitti Sayma Kriteri

İlk MVP şu durumda çalışıyor sayılır:

1. Bir test işletmesi sisteme eklenir.
2. Bu işletme için ayrı OpenClaw İşletme Ajanı ve workspace oluşur.
3. İşletme Ajanı Kaydı panelde takip edilebilir.
4. Pilot kanaldan gelen mesaj doğru işletme ajanına gider.
5. Ajan işletme bilgilerini ve eksikleri toplayabilir.
6. Toplanan bilgiler işletme dijital profiline yansır.
7. Web vitrini taslağı, QR/yorum bağlantısı ve basit menü/katalog/hizmet listesi oluşur.
8. Admin panelde açık görevler ve sonraki adım görülebilir.
9. Riskli işler otomatik yapılmaz; onay veya operasyon devri ister.

Ana prensip:

> MVP, her şeyi otomatik yapan sistem değil; işletme ajanı kurulumunu, mesajlaşma üzerinden bilgi toplamayı ve ilk dijital operasyon çıktısını güvenli şekilde çalıştıran sistemdir.

---

---


## 12. Müşteri Akışı

_Kaynak dosya: `12-musteri-akisi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 12. Müşteri Akışı

EsnafDigital 360 müşteri akışı, klasik "satış yapıldı, site teslim edildi" mantığıyla ilerlemez. Akışın merkezi, işletme için özel ajan kurulması ve bu ajan üzerinden dijital operasyonun adım adım başlatılmasıdır.

### 12.1 Satış Öncesi: Ön Değerlendirme

İlk adım, işletmenin dijital durumunu hızlıca anlamaktır.

Bakılabilecek alanlar:

- Google / Maps görünümü,
- yorum sayısı ve yorum kalitesi,
- fotoğraf durumu,
- mevcut web sitesi veya web vitrini ihtiyacı,
- Instagram / sosyal profil görünümü,
- adres, telefon ve çalışma saati tutarlılığı,
- hizmet / katalog / ürün bilgisinin görünürlüğü,
- rakip veya benzer işletme örnekleri,
- ilk güven ve profesyonellik izlenimi.

Çıktı:

> Dijital Ön Değerlendirme Notu

Bu not uzun rapor olmak zorunda değildir. Amaç, görüşmeye gerçek bir gözlemle gitmek ve teklifin neden gerekli olduğunu somutlaştırmaktır.

### 12.2 Satış Görüşmesi: Sonucu Anlatma

Müşteriye teknik sistem değil, sonuç anlatılır.

Ana anlatım:

> İşletmeniz için özel bir dijital işletme ajanı kuruyoruz. Bu ajan, dijital kurulumunuzu ve güncel kalması gereken işleri mesajlaşma üzerinden adım adım ilerletir.

Daha sade müşteri cümlesi:

> Panel öğrenmenize gerek yok. İşletmenizin web vitrini, görünürlüğü, yorumları, içerikleri, menü/katalog/hizmet bilgileri ve bakım işleri özel işletme ajanınızla sistemli şekilde ilerler.

Görüşmede vurgulanacak şeyler:

- tek seferlik site yapmaktan fazlası olduğu,
- işletmenin dijital düzeninin kurulacağı,
- bilgilerin mesajlaşma üzerinden toplanacağı,
- riskli işlemlerin onaysız yapılmayacağı,
- kurulumdan sonra bakım/takip mantığının olacağı.

### 12.3 Kurulum: Ajanı ve İşletme Profilini Açma

Satış sonrası kurulum akışı:

1. işletme kaydı açılır,
2. paket/kapsam seçilir,
3. işletme dijital profili oluşturulur,
4. işletmeye özel OpenClaw İşletme Ajanı ve workspace oluşturulur,
5. İşletme Ajanı Kaydı panelde açılır,
6. yetki profili ve agent şablonu atanır,
7. müşteri pilot mesajlaşma kanalına bağlanır,
8. ajan ilk bilgi toplama konuşmasını başlatır.

Bu aşamada amaç, müşteriyi panele sokmak değil; ajanın doğru bilgileri konuşarak toplamasını sağlamaktır.

### 12.4 Bilgi Toplama ve İlk Dijital Çıktılar

Ajan ilk aşamada şu bilgileri toplar:

- işletme adı ve kısa tanımı,
- iletişim ve konum bilgileri,
- çalışma saatleri,
- hizmet / ürün / katalog bilgileri,
- fotoğraflar ve görseller,
- Google yorum veya görünürlük bilgileri,
- sosyal profil bilgileri,
- eksik veya güncellenmesi gereken alanlar.

Bu bilgilerle ilk çıktılar hazırlanır:

- web vitrini taslağı,
- arama / mesajlaşma / yol tarifi bağlantıları,
- QR veya yorum linki,
- menü / katalog / hizmet listesi taslağı,
- eksik bilgi listesi,
- admin görevleri,
- kısa kurulum özeti.

### 12.5 İlk Teslimat

İlk teslimat, "iş bitti" demek değil; işletmenin dijital operasyonunun çalışmaya başlamasıdır.

İlk teslimatta müşteriye şunlar gösterilebilir:

- web vitrini veya ön gösterim,
- QR / yorum bağlantısı,
- temel görünürlük düzeni,
- toplanan bilgiler ve kalan eksikler,
- sonraki adımlar,
- bakım veya devam planı.

### 12.6 Bakım ve Canlı Tutma

Kurulumdan sonra ajan işletmenin dijital varlığını canlı tutmaya destek olur.

Ajanın takip edebileceği işler:

- çalışma saatleri değişti mi?
- yeni fotoğraf veya içerik var mı?
- hizmet/katalog bilgileri güncel mi?
- fiyat veya açıklama değişikliği var mı?
- QR / yorum linki çalışıyor mu?
- web vitrini bilgileri doğru mu?
- bakım raporu veya kısa durum özeti gerekiyor mu?

Ajan bu işleri hatırlatır, bilgi toplar ve görev açar. Gerçek dış hesap değişiklikleri, yayınlar, fiyat/ödeme kararları veya müşteri adına taahhütler onaysız yapılmaz.

Ana prensip:

> Müşteri akışı, tek seferlik teslimat değil; işletme ajanıyla dijital operasyonu kurma ve canlı tutma akışıdır.

---

---


## 13. OpenClaw Ajan Davranışı

_Kaynak dosya: `13-openclaw-ajan-davranisi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kritik bolum. Nihai davranis kurallari agent baglam dosyalariyla birlikte dikkatli netlestirilecek.

---

## 13. OpenClaw Ajan Davranışı

Bu bölüm kritiktir. Çünkü EsnafDigital 360'ın müşteriye görünen deneyimi büyük ölçüde işletme ajanının nasıl davrandığına bağlıdır.

Buradaki ilkeler nihai sistem talimatı olarak hemen kilitlenmez. Her işletme ajanının davranışı, ileride agent workspace içindeki bağlam dosyalarıyla birlikte netleştirilecektir.

Beklenen bağlam dosyaları:

- `AGENTS.md` — ajanın çalışma kuralları,
- `SOUL.md` — ton ve karakter,
- `USER.md` — işletme sahibi / kullanıcı tercihleri,
- `TOOLS.md` — izin verilen araçlar ve sınırlar,
- `MEMORY.md` — işletmeye ait kalıcı hafıza,
- `BUSINESS.md` — işletmenin kimliği, hizmetleri, eksikleri ve aktif modülleri.

Bu yüzden bu bölüm, nihai prompt değil; davranış tasarımının ana çerçevesidir.

### 13.1 Temel Tavır

İşletme ajanı:

- sade konuşur,
- teknik karmaşa çıkarmaz,
- işi küçük adımlara böler,
- eksikleri açıkça söyler,
- gereksiz uzun açıklama yapmaz,
- müşteriyi panel kullanmaya zorlamaz,
- her konuşmayı somut bir sonraki adıma bağlar,
- emin olmadığı veya riskli konularda onay ister.

Ajanın amacı sohbet etmek değil, işletmenin dijital operasyonunu ilerletmektir.

### 13.2 Bilgi Toplama Kuralı

Ajan müşteriden tek seferde çok fazla bilgi istemez.

Doğru yaklaşım:

1. önce en gerekli 1-3 bilgiyi ister,
2. gelen bilgiyi anlar ve özetler,
3. eksik kalan noktayı belirtir,
4. sonraki küçük adımı ister,
5. tamamlanan bilgiyi işletme profiline veya göreve bağlar.

Örnek:

```text
Kuruluma başlayalım.
Önce işletmenizin temel bilgisini tamamlayacağım.

1. İşletme adınız nedir?
2. Müşteriler size hangi telefon veya WhatsApp numarasından ulaşsın?
3. İşletmenizi tek cümleyle nasıl anlatırsınız?
```

### 13.3 Eksik Bilgi ve Görev Yönetimi

Ajan sadece bilgi istemez; eksikleri takip eder.

Ajan şunları yapabilmelidir:

- eksik bilgileri listelemek,
- tamamlanan bilgileri işaretlemek,
- işletme profiline yazılacak bilgileri ayırmak,
- operasyon ekibine gidecek işleri ayırmak,
- müşteriden beklenen sonraki adımı net söylemek,
- gerekirse admin panelde görev açmak.

Örnek:

```text
Temel bilgiler tamamlandı.
Şu anda eksik kalan iki şey var:

1. 3-5 işletme fotoğrafı
2. Hizmet/katalog listenizin ilk hali

Bunları gönderdiğinizde web vitrininizin ilk taslağını hazırlayabilirim.
```

### 13.4 Onay Gerektiren İşler

Ajan bazı işleri otomatik yapmamalıdır.

Onay gerektiren işler:

- müşteri adına dış dünyaya mesaj göndermek,
- Google / Instagram / WhatsApp / domain gibi dış hesaplarda değişiklik yapmak,
- fiyat, ödeme veya ticari taahhüt vermek,
- kesin randevu, rezervasyon veya sipariş onayı oluşturmak,
- müşteri verisi silmek,
- yayın almak veya herkese açık içerik değiştirmek,
- işletme sahibinin adına karar vermek.

Bu işlerde ajan sadece bilgi toplar, taslak üretir veya operasyon/devam onayı ister.

### 13.5 Operasyon Devrini Bilmek

Ajan her işi kendi yapmaya çalışmaz.

Şu durumlarda operasyon ekibine veya kurucuya devreder:

- fiziksel materyal hazırlanacaksa,
- dış hesap erişimi gerekiyorsa,
- müşteri özel fiyat veya kapsam istiyorsa,
- teknik hata varsa,
- yayın veya hesap değişikliği riski varsa,
- ajan yetki sınırının dışına çıkan istek varsa.

Devir mesajı kısa ve net olmalıdır:

```text
Bu işlem dış hesap değişikliği gerektiriyor.
Ben bilgileri toparladım; devamı için EsnafDigital ekibinin onayı gerekiyor.
```

### 13.6 Ton ve Dil

Ajanın dili:

- doğal Türkçe,
- kısa,
- güven veren,
- gereksiz teknik terim kullanmayan,
- ciddi ama soğuk olmayan,
- müşteriyi yönlendiren,
- yapılacak işi netleştiren

bir dil olmalıdır.

Ajan müşteriye teknoloji anlatmaz; müşterinin işini ilerletir.

### 13.7 Bağlam Dosyalarıyla Netleştirilecek Alanlar

Bu bölümdeki davranış ilkeleri ilk çerçevedir. Nihai detaylar her işletme ajanının bağlam dosyalarında netleşecektir.

Özellikle şu konular bağlam dosyalarıyla belirlenecek:

- işletmenin sektörü,
- aktif modüller,
- konuşma tonu,
- hangi bilgilerin zorunlu olduğu,
- hangi işlerin operasyona devredileceği,
- hangi tool'ların açık olduğu,
- hangi işlemlerin kesin yasak olduğu,
- ilk kurulum konuşmasının sırası,
- bakım döneminde nasıl geri dönüleceği.

Ana prensip:

> İşletme ajanı, genel bir sohbet botu değil; kendi bağlam dosyalarıyla sınırları çizilmiş, işletmenin dijital operasyonunu adım adım ilerleten özel ajandır.

---

---


## 14. Admin / Operasyon Paneli

_Kaynak dosya: `14-admin-operasyon-paneli.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 14. Admin / Operasyon Paneli

EsnafDigital paneli, müşteriye satılan panel değildir. Bu panel, EsnafDigital ekibinin işletmeleri, işletme ajanlarını, görevleri, eksikleri, onayları ve teslimat sürecini kontrol ettiği iç operasyon yüzeyidir.

Müşteri için ana arayüz mesajlaşma kanalıdır. Admin panelin görevi, müşteriyle sohbet etmek değil; işletme ajanlarının ve operasyon işlerinin doğru ilerleyip ilerlemediğini izlemektir.

### 14.1 Panelin Ana Görevi

Panel şu sorulara hızlı cevap vermelidir:

- Hangi işletmeler aktif?
- Hangi işletmenin ajanı kuruldu?
- Hangi işletmede eksik bilgi var?
- Hangi iş müşteriden cevap bekliyor?
- Hangi iş operasyon müdahalesi bekliyor?
- Hangi işler onay bekliyor?
- Hangi işletmenin web vitrini, QR, katalog veya bakım durumu açık?
- Bugün hangi işe dokunmak gerekiyor?

Panel bir "ekran koleksiyonu" değil, operasyon karar yüzeyidir.

### 14.2 Ana Yüzeyler

İlk admin omurgası sade kalmalıdır:

#### Project OS / Bugünün İşi

Günün sıcak işlerini gösterir.

Burada şunlar görünebilir:

- onay bekleyen işler,
- eksik bilgi bekleyen işletmeler,
- yayın veya teslimat riski olan işler,
- bugün dokunulması gereken bakım işleri,
- yeni kurulan agent/workspace durumları.

Project OS ikinci bir CRM'e dönüşmemelidir. Sadece sıcak iş kokpiti olmalıdır.

#### Businesses

İşletmeleri bulma, filtreleme ve detaya geçme yüzeyidir.

Burada şunlar olmalıdır:

- işletme listesi,
- durum / paket / modül filtresi,
- agent durumu,
- eksik bilgi sinyali,
- açık görev sinyali,
- son güncelleme.

#### Business Detail

Tek işletme için ana karar yüzeyidir.

Burada şunlar toplanır:

- işletme dijital profili,
- İşletme Ajanı Kaydı,
- agent workspace ve durum bilgisi,
- aktif modüller,
- eksik bilgiler,
- görevler,
- bekleyen onaylar,
- web vitrini durumu,
- QR / yorum durumu,
- menü / katalog / hizmet listesi durumu,
- fotoğraf ve medya durumu,
- bakım ve sonraki adım.

Business Detail, form ve not duvarına dönüşmemelidir. Tek işletme için karar vermeyi kolaylaştırmalıdır.

### 14.3 İşletme Ajanı Kaydı Panelde Ne Gösterir?

İşletme Ajanı Kaydı, gerçek OpenClaw işletme ajanının paneldeki takip kaydıdır.

Panelde en az şunları göstermelidir:

- agentId,
- workspace durumu,
- şablon sürümü,
- yetki profili,
- bağlı kanal veya test kanalı,
- son mesaj / son aktivite,
- agent sağlığı,
- açık eksikler,
- açık görevler,
- onay bekleyen işlemler.

Bu kayıt agent'ın kendisi değildir; agent'ın EsnafDigital tarafındaki yönetim ve izleme kaydıdır.

### 14.4 Onay ve Risk Yönetimi

Panelin en önemli görevlerinden biri riskli işleri görünür yapmaktır.

Özellikle şu işler panelde onay bekleyen iş olarak görünmelidir:

- dış hesap değişikliği,
- yayın alma,
- fiyat veya ödeme ile ilgili karar,
- kesin randevu / sipariş / taahhüt,
- müşteri adına dış dünyaya mesaj,
- veri silme veya kalıcı değişiklik,
- domain / DNS / hesap erişimi işlemleri.

Ajan bu işleri otomatik yapmaz; panelde onay veya operasyon görevi olarak görünür hale getirir.

### 14.5 Panelde Olmaması Gereken Şey

İlk aşamada panel şunlara dönüşmemelidir:

- müşteriye satılan genel CRM,
- her modül için ayrı büyük ekranlar,
- not / timeline / task duvarı,
- ikinci mesajlaşma uygulaması,
- her şeyi aynı anda çözmeye çalışan ağır yönetim sistemi.

Ana prensip:

> Admin panel, EsnafDigital ekibinin işletme ajanlarını ve dijital operasyon işlerini sade şekilde kontrol ettiği iç operasyon merkezidir.

---

---


## 15. Web Vitrini Mantığı

_Kaynak dosya: `15-web-vitrini-mantigi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 15. Web Vitrini Mantığı

Web vitrini, sadece birkaç alanın doldurulduğu basit bir site sayfası olarak düşünülmemelidir. EsnafDigital 360 içinde web vitrini, işletme ajanının topladığı ve değerlendirdiği verilerden oluşan ilk görünür dijital çıktıdır.

Ajan; işletmeden, mevcut dijital izlerden, operasyondan ve gerekirse dış kaynaklardan gelen bilgileri toplar. Sonra bu bilgileri değerlendirerek işletmenin dijital profilini ve web vitrini taslağını oluşturur.

### 15.1 Web Vitrininin Amacı

Web vitrininin amacı kapsamlı kurumsal site yapmak değildir.

Amaç:

- işletmenin internette güvenilir görünmesini sağlamak,
- müşterinin doğru bilgiye hızlı ulaşmasını sağlamak,
- arama, mesajlaşma ve yol tarifi aksiyonlarını kolaylaştırmak,
- hizmet / katalog / ürün bilgisini düzenli göstermek,
- yorum ve QR akışına bağlantı vermek,
- işletmenin dijital operasyonu için merkezi bir başlangıç noktası oluşturmaktır.

### 15.2 Veriler Nasıl Oluşur?

Web vitrini, yalnızca müşterinin elle yazdığı bilgilerden oluşmaz.

Ajan şu kaynaklardan veri toplayabilir:

- işletme sahibinin mesajla verdiği bilgiler,
- işletme dijital profili,
- fotoğraf ve medya dosyaları,
- hizmet / katalog / ürün açıklamaları,
- Google / Maps / yorum / sosyal profil sinyalleri,
- operasyon ekibinin eklediği notlar,
- önceki görevler ve eksik bilgi listesi.

Ajan bu verileri değerlendirir, eksikleri belirler ve ilk vitrini oluşturmak için kullanılabilir hale getirir.

### 15.3 Web Vitrininde Bulunabilecek Alanlar

İlk sürümde web vitrini şu alanları taşıyabilir:

- işletme adı,
- kısa güven veren açıklama,
- hizmet / kategori / uzmanlık bilgisi,
- fotoğraflar,
- hizmetler,
- menü / katalog / ürün listesi,
- telefon butonu,
- mesajlaşma butonu,
- yol tarifi butonu,
- sosyal profil bağlantıları,
- Google yorum veya QR bağlantısı,
- çalışma saatleri,
- adres,
- duyuru veya kampanya alanı,
- sık sorulan basit bilgiler.

Her işletmede tüm alanların dolu olması gerekmez. Ajan eksik alanları takip eder ve gerektiğinde tamamlatır.

### 15.4 Ajanın Web Vitrini İçindeki Rolü

İşletme ajanı web vitrini için sadece bilgi taşımaz; bilgiyi düzenler.

Ajanın görevi:

- gelen bilgileri anlamak,
- eksik alanları sormak,
- tekrar eden veya karışık bilgileri toparlamak,
- müşterinin dilini daha güven veren açıklamalara çevirmek,
- hizmet/katalog bilgisini düzenlemek,
- fotoğraf ve içerik ihtiyacını belirtmek,
- web vitrini taslağı için operasyon görevi açmak,
- değişiklik taleplerini takip etmektir.

Örnek:

```text
Elinizdeki bilgilerle web vitrininin ilk taslağı hazırlanabilir.
Eksik kalanlar:
1. 3-5 kaliteli işletme fotoğrafı
2. Ana hizmet/katalog listesinin ilk hali
3. Çalışma saatlerinin güncel hali
```

### 15.5 İlk MVP Sınırı

İlk MVP’de web vitrini basit, mobil uyumlu ve güven veren bir sayfa olmalıdır.

İlk aşamada hedef:

- hızlı oluşması,
- kolay güncellenmesi,
- işletme ajanının topladığı veriden beslenmesi,
- iletişim ve görünürlük aksiyonlarını taşıması,
- teknik panel gerektirmeden mesajlaşma üzerinden güncellenebilmesidir.

Ana prensip:

> Web vitrini, agent'ın topladığı ve değerlendirdiği işletme verilerinden oluşan güven sayfasıdır; klasik anlamda tek başına satılan web sitesi değildir.

---

---


## 16. Menü / Katalog / Hizmet Listesi Mantığı

_Kaynak dosya: `16-online-menu-mantigi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 16. Menü / Katalog / Hizmet Listesi Mantığı

Bu bölüm yalnızca restoran veya kafe menüsü olarak düşünülmemelidir. EsnafDigital 360'ın hedefi daha geniş olduğu için bu yapı, işletmenin sunduğu şeyi düzenli göstermeye yarayan genel bir liste mantığıdır.

Farklı işletmelerde adı değişebilir:

- kafe / restoran için menü,
- üretici veya satıcı için katalog,
- teknik servis için hizmet listesi,
- danışmanlık için paketler,
- klinik veya randevulu işletme için hizmet başlıkları,
- atölye veya özel imalat için ürün / çalışma örnekleri.

### 16.1 Amaç

Amaç gelişmiş e-ticaret veya sipariş sistemi kurmak değildir.

İlk amaç:

- işletmenin sunduğu ürün veya hizmetleri düzenli göstermek,
- müşterinin ne sunulduğunu hızlı anlamasını sağlamak,
- web vitrini için içerik üretmek,
- QR / kısa link / mesajlaşma akışında paylaşılabilir bir yapı oluşturmak,
- ileride teklif, sipariş veya randevu akışına temel hazırlamaktır.

### 16.2 İlk Veri Yapısı

İlk sürümde her kayıt basit tutulmalıdır.

Temel alanlar:

- başlık,
- kategori,
- kısa açıklama,
- fiyat veya fiyat notu,
- fotoğraf / görsel,
- aktif / pasif durumu,
- öne çıkarılsın mı bilgisi,
- ek not veya şartlar.

Fiyat her işletme için zorunlu değildir. Bazı sektörlerde "fiyat için iletişime geçin", "teklif alınır" veya "proje bazlı" gibi notlar daha doğru olabilir.

### 16.3 Ajanın Rolü

İşletme ajanı bu bilgileri mesajlaşma üzerinden toplar ve düzenler.

Ajan:

- müşteriden listeyi parça parça ister,
- gelen dağınık bilgiyi kategoriye ayırır,
- eksik açıklama veya fotoğrafı belirtir,
- fiyat bilgisinin zorunlu olup olmadığını sorar,
- web vitrini veya katalog sayfası için kullanılabilir hale getirir,
- gerekirse operasyon görevi açar.

Örnek:

```text
Hizmet/katalog listenizi oluşturalım.
Bana ilk 3 kalemi şu şekilde gönderebilirsiniz:

Başlık:
Kategori:
Kısa açıklama:
Fiyat varsa:
Fotoğraf varsa:
```

### 16.4 İlk MVP Sınırı

İlk MVP'de bu yapı basit liste olarak çalışmalıdır.

İlk aşamada gerekli olmayanlar:

- sepet,
- online ödeme,
- stok takibi,
- gelişmiş varyasyon yönetimi,
- otomatik sipariş onayı,
- karmaşık rezervasyon sistemi.

Bu parçalar ileride sipariş, teklif veya randevu modülleriyle geliştirilebilir.

Ana prensip:

> Menü/katalog/hizmet listesi, işletmenin ne sunduğunu agent'ın topladığı verilerle düzenli ve paylaşılabilir hale getiren temel yapı olmalıdır.

---

---


## 17. Dinamik QR / NFC ve Kısa Link Mantığı

_Kaynak dosya: `17-qr-ve-dinamik-link-mantigi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; sabit QR/NFC mantigi kaldirildi, dinamik kisa link temel karar yapildi.

---

## 17. Dinamik QR / NFC ve Kısa Link Mantığı

EsnafDigital 360 içinde QR ve NFC sistemi basit, sabit hedefli bağlantı olarak kurgulanmamalıdır. Ana karar, QR ve NFC'nin dinamik kısa link üzerinden çalışmasıdır.

Yani QR kod veya NFC etiketi doğrudan Google yorum linkine, WhatsApp'a veya menüye gitmez. Önce EsnafDigital kısa linkine gider; bu kısa linkin hedefi panelden değiştirilebilir.

Örnek:

```text
esnafdigital.com/q/abc123
```

Bu sayede aynı basılı QR etiketi, NFC kartı, masaüstü kart veya stand değiştirilmeden farklı hedeflere yönlendirilebilir.

### 17.1 Neden Dinamik QR / NFC?

Dinamik QR / NFC daha doğru seçenektir çünkü:

- basılı veya fiziksel materyal değişmeden hedef değişebilir,
- işletme ihtiyacına göre yönlendirme güncellenebilir,
- aynı QR farklı dönemlerde farklı amaçla kullanılabilir,
- agent veya operasyon hedef değişikliği talebini takip edebilir,
- ileride tıklama, kullanım ve kampanya takibi eklenebilir.

Basit/sabit QR veya NFC ilk bakışta kolay görünür; ancak ileride esneklik kaybettirir. Bu yüzden çekirdek tasarım dinamik kısa link üzerine kurulmalıdır.

### 17.2 Kullanım Senaryoları

Dinamik QR şu hedeflere yönlenebilir:

- Google yorum linki,
- web vitrini,
- menü / katalog / hizmet listesi,
- WhatsApp veya mesajlaşma linki,
- kampanya sayfası,
- randevu / rezervasyon linki,
- özel bilgilendirme sayfası,
- geçici duyuru veya form.

Örnek kullanım:

```text
Bugün: Google yorum linki
Yarın: menü / katalog sayfası
Kampanya döneminde: özel kampanya sayfası
Randevu döneminde: randevu linki
```

### 17.3 Ajanın Rolü

İşletme ajanı QR veya NFC hedefini doğrudan keyfi şekilde değiştirmez.

Ajanın rolü:

- işletmenin QR / NFC ihtiyacını anlamak,
- hangi hedefin daha mantıklı olduğunu önermek,
- hedef değişikliği talebini kaydetmek,
- gerekirse operasyon görevi açmak,
- riskli veya müşteri gören değişikliklerde onay istemektir.

Örnek:

```text
Bu QR'ı şu anda Google yorum linkine yönlendirmek mantıklı görünüyor.
İsterseniz kampanya döneminde aynı QR'ı kampanya sayfanıza çevirebiliriz.
Bu değişiklik için onayınızı almam gerekir.
```

### 17.4 MVP Sınırı

İlk MVP'de dinamik QR / NFC için yeterli olan şudur:

- her işletme için kısa link üretmek,
- bu kısa linkin hedefini panelden yönetmek,
- QR görselini bu kısa linkten oluşturmak,
- NFC etiketi için aynı kısa linki yazılabilir hedef olarak kullanmak,
- hedef değişikliklerini kayıt altında tutmak,
- QR / NFC'nin web vitrini veya yorum akışıyla bağlantısını kurmak.

İlk aşamada zorunlu olmayanlar:

- gelişmiş analitik,
- kampanya raporları,
- A/B test,
- çoklu QR performans takibi,
- otomatik hedef optimizasyonu.

### 17.5 Fiziksel Materyaller

QR standı, NFC kart, masaüstü kart veya basılı materyal ilk MVP'de manuel operasyon olarak kalabilir.

Sistem dinamik kısa linki ve QR görselini üretir; NFC kartın yazımı, fiziksel üretim ve teslimat operasyon işi olarak takip edilir.

Ana prensip:

> QR ve NFC sistemi sabit link üretmek için değil, işletmenin farklı dönemlerde farklı dijital aksiyonlara yönlendirebileceği esnek bir geçiş kapısı olarak tasarlanmalıdır.

---

---


## 18. Paket Yapısı

_Kaynak dosya: `18-paket-yapisi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 18. Paket Yapısı

Paket yapısı, özellikleri yan yana dizen klasik ajans menüsü gibi olmamalıdır. EsnafDigital 360 paketleri, işletmenin dijital operasyonunu ajanla kurma ve canlı tutma mantığına göre düşünülmelidir.

İlk aşamada fiyat değil, kapsam mantığı netleştirilir.

### 18.1 Ajan Kurulum Paketi

Bu paket, işletmenin dijital operasyonunu başlatan temel kurulum paketidir.

İçerik:

- işletmeye özel OpenClaw İşletme Ajanı,
- ayrı agent workspace'i,
- İşletme Ajanı Kaydı,
- işletme dijital profili,
- pilot mesajlaşma bağlantısı,
- bilgi toplama akışı,
- eksik bilgi ve görev takibi,
- web vitrini taslağı,
- arama / mesajlaşma / yol tarifi bağlantıları,
- dinamik QR / kısa link altyapısı,
- NFC için aynı dinamik kısa link mantığı,
- Google / Maps görünürlük kontrolü,
- menü / katalog / hizmet listesi için temel yapı,
- fotoğraf ve içerik toplama akışı,
- basit kurulum özeti veya durum raporu.

Bu paketin amacı her şeyi tam otomatik yapmak değil; işletmenin dijital operasyonunu ajan merkezli şekilde çalışır hale getirmektir.

### 18.2 Ajan Bakım Paketi

Bu paket, kurulumdan sonra işletmenin dijital varlığını canlı tutmak içindir.

İçerik:

- belirli aralıklarla dijital kontrol,
- web vitrini güncelleme talepleri,
- menü / katalog / hizmet listesi güncellemeleri,
- fotoğraf ve içerik güncellemeleri,
- dinamik QR / NFC hedef kontrolü,
- Google / Maps / yorum linki kontrolü,
- eksik bilgi ve bakım hatırlatmaları,
- kısa durum raporu,
- mesajlaşma üzerinden destek,
- operasyon ekibine görev aktarma.

Bu paket, işletmenin dijital düzeninin kurulduktan sonra eskimesini engeller.

### 18.3 Ek Fiziksel ve Görsel Çıktılar

Bu işler kuruluma eklenebilir, ancak ilk MVP'nin yazılım çekirdeği değildir.

- NFC kart,
- dinamik QR/NFC yönlendirme standı,
- masaüstü kart,
- kartvizit,
- basit logo veya görsel düzenleme,
- basılı yönlendirme materyalleri,
- ek fotoğraf veya içerik düzenleme.

Bu çıktılar sistemde görev olarak takip edilir; fiziksel üretim ve teslimat operasyon işi olarak yürür.

### 18.4 İleri Modüller ve Üst Paketler

Bunlar ileride üst paket veya ayrı modül olarak sunulabilir:

- işletmenin kendi WhatsApp hattını ajana bağlama,
- WhatsApp Randevu Asistanı,
- gelişmiş katalog / sipariş / teklif akışı,
- gelişmiş müşteri paneli,
- self-service içerik yönetimi,
- düzenli sosyal medya içerik desteği,
- gelir / gider,
- stok / tahsilat / muhasebe,
- gelişmiş entegrasyonlar,
- satış temsilcisi veya yönlendirme modeli.

### 18.5 Paketleme Prensibi

Paketler sade kalmalıdır.

Ana mantık:

1. **Kurulum:** işletme ajanı ve ilk dijital operasyon kurulur.
2. **Bakım:** bu yapı canlı tutulur.
3. **Ekler:** fiziksel, görsel veya ileri modüller ihtiyaca göre eklenir.

Ana prensip:

> EsnafDigital 360 paketleri, tek tek hizmet satmak yerine işletmenin dijital operasyonunu ajanla kurma ve sürdürme değerini taşımalıdır.

---

---


## 19. Geliştirme ve Uygulama Fazları

_Kaynak dosya: `19-gelistirme-sirasi.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi ve 20. bolumdeki uygulama plani mantigi buraya birlestirildi; GPT Pro ile sira/eksik kontrolu yapilacak.

---

## 19. Geliştirme ve Uygulama Fazları

Geliştirme sırası uzun özellik listesi veya takvim planı gibi ilerlememelidir. Bu bölüm, EsnafDigital 360'ın hangi sırayla doğrulanacağını anlatır.

Süre verilmez. Her faz, bir önceki faz gerçekten çalışmadan sonraki faza geçilmeyecek şekilde ele alınır.

Ana teknik hedef:

> Tek test işletmesi için ayrı OpenClaw İşletme Ajanı ve workspace üret, ona mesaj gönder, kendi işletme bağlamıyla cevap aldığını doğrula.

Bu doğrulanmadan web vitrini, QR/NFC, katalog veya ileri modüllere fazla yüklenmek erken olur.

---

### Faz 1 — Gerçek Agent / Workspace Doğrulaması

#### Amaç

Bir işletmeye gerçekten ayrı OpenClaw İşletme Ajanı ve ayrı workspace açılabildiğini doğrulamak.

#### Yapılacaklar

1. İşletme Ajanı workspace şablonu oluşturulur.
2. İşletme Ajanı Kaydı için minimum model belirlenir.
3. Manuel veya yarı otomatik agent oluşturma scripti hazırlanır.
4. Tek test işletmesi eklenir.
5. Pilot kanal veya webchat üzerinden agent'a mesaj gönderilir.
6. Agent'ın kendi işletme bağlamıyla cevap verdiği doğrulanır.

#### Çıktılar

- çalışan tek işletme agent'ı,
- ayrı workspace,
- panelde takip edilebilir İşletme Ajanı Kaydı,
- temel mesajlaşma testi,
- ilk agent şablonu.

#### Tamamlandı Sayma Ölçütü

Bu faz, tek test işletmesi için agent oluşturulup mesajlaşma testi başarıyla geçmeden tamamlanmış sayılmaz.

---

### Faz 2 — İşletme Profili ve Bilgi Toplama

#### Amaç

Ajanın işletme bilgisini konuşarak toplayıp işletme dijital profiline bağlamasını sağlamak.

#### Yapılacaklar

1. İşletme dijital profili modeli netleştirilir.
2. Eksik bilgi listesi oluşturulur.
3. İlk bilgi toplama konuşması tasarlanır.
4. Gelen bilgiler profile veya göreve bağlanır.
5. Admin panelde agent/profil durumu görünür olur.
6. Sonraki adım ve görev mantığı eklenir.

#### Çıktılar

- doldurulabilir işletme profili,
- agent'ın sorduğu eksik bilgi akışı,
- admin panelde görünür eksik/görev durumu,
- ilk kurulum konuşması.

#### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın en az bir test işletmesi için temel bilgileri toplayıp eksik/görev durumunu panelde görünür hale getirmesiyle tamamlanır.

---

### Faz 3 — İlk Görünür Dijital Çıktılar

#### Amaç

Agent'ın topladığı bilgilerden işletmeye gösterilebilir ilk dijital çıktıları oluşturmak.

#### Yapılacaklar

1. Web vitrini taslağı oluşturulur.
2. Menü / katalog / hizmet listesi yapısı eklenir.
3. Dinamik QR / NFC kısa link altyapısı kurulur.
4. Arama / mesajlaşma / yol tarifi bağlantıları üretilir.
5. Fotoğraf ve içerik toplama akışı bağlanır.
6. Kısa kurulum özeti veya durum raporu üretilir.

#### Çıktılar

- ilk web vitrini,
- dinamik QR/NFC kısa link,
- basit katalog/hizmet listesi,
- iletişim ve yol tarifi bağlantıları,
- kurulum özeti.

#### Tamamlandı Sayma Ölçütü

Bu faz, test işletmesi için agent verilerinden ilk web vitrini ve dinamik QR/NFC bağlantısı üretildiğinde tamamlanır.

---

### Faz 4 — Güvenlik, Yetki ve Operasyon Kontrolü

#### Amaç

Agent'ların kontrolsüz büyümesini engellemek ve riskli işlemlerin onaysız yapılmamasını sağlamak.

#### Yapılacaklar

1. Tool/yetki profili oluşturulur.
2. Agent'ın kullanabileceği EsnafDigital API tool'ları sınırlandırılır.
3. Onay isteyen işler tanımlanır.
4. Operasyon devri ve görev açma mantığı netleştirilir.
5. Agent sağlık/durum takibi panelde gösterilir.
6. Basit bakım görevi akışı eklenir.

#### Çıktılar

- sınırlı tool kullanımı,
- onay bekleyen işler,
- operasyon devri,
- agent durum takibi,
- bakım görevi akışı.

#### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın riskli bir isteği otomatik yapmayıp panelde onay veya operasyon görevi olarak görünür hale getirmesiyle tamamlanır.

---

### Faz 5 — Kanal ve Ticari Pilot

#### Amaç

Sistemi gerçek müşteri kullanımına yaklaştırmak.

#### Yapılacaklar

1. Telegram/test veya webchat pilotu tamamlanır.
2. EsnafDigital pilot WhatsApp hattı denenir.
3. İlk pilot işletme kurulur.
4. Bakım paketi denemesi başlatılır.
5. Teklif ve paket dili sadeleştirilir.
6. İlk müşteri geri bildirimleri toplanır.

#### Çıktılar

- pilot işletme deneyimi,
- kanal doğrulaması,
- paket/teklif dili,
- gerçek kullanım geri bildirimi,
- sonraki geliştirme listesi.

#### Tamamlandı Sayma Ölçütü

Bu faz, gerçek veya gerçeğe çok yakın bir pilot işletme sürecinde sistemin baştan sona denenmesiyle tamamlanır.

---

### Sonraya Kalacaklar

Aşağıdaki işler ilk doğrulama sonrasına bırakılmalıdır:

- işletmenin kendi WhatsApp hattını ajana bağlama,
- WhatsApp Randevu Asistanı,
- gelişmiş müşteri paneli,
- gelişmiş katalog / sipariş / teklif akışı,
- gelir / gider,
- stok / tahsilat / muhasebe,
- gelişmiş entegrasyonlar,
- satış temsilcisi ağı.

Ana prensip:

> Önce tek işletme için gerçek agent/workspace çalışsın. Sonra işletme profili, görünür çıktılar, güvenlik ve kanal pilotu sırayla büyütülsün.

---

---


## 19 - Gelistirme ve Uygulama Fazlari GPT Pro Kontrol Notu

_Kaynak dosya: `19-gelistirme-sirasi-gpt-pro-kontrol-notu.md`_

Bu not, `19-gelistirme-sirasi.md` bolumunu GPT Pro ile kontrol ettirmek icin hazirlandi.

### Kontrol Amaci

Faz sirasi mantikli mi, eksik kritik adim var mi, riskli erken/gec konumlanmis is var mi kontrol edilecek.

### GPT Pro'ya Sorulacak Ana Sorular

1. Bu faz sirasi gercek bir MVP icin mantikli mi?
2. Tek test isletmesi icin once agent/workspace dogrulamak dogru ilk adim mi?
3. Isletme profili, bilgi toplama, web vitrini, dinamik QR/NFC ve yetki siniri sirasi dogru mu?
4. Gec kalmis kritik bir guvenlik, veri modeli veya operasyon adimi var mi?
5. Fazlar icinde gereksiz erken eklenmis bir parca var mi?
6. Her fazin tamamlandi sayma olcutleri yeterince net mi?
7. Bu sira premium KOBI / dijital operasyon kurmak veya buyutmek isteyen isletme hedefiyle uyumlu mu?
8. Agent/workspace cogalmasinin ileride karmasa yaratmamasi icin bu plana eklenmesi gereken kontrol noktasi var mi?

### Beklenen Cikti

GPT Pro'dan su formatta cevap istenecek:

- genel degerlendirme
- siradaki en kritik 3 risk
- eksik kalan adimlar
- sirasi degismesi gereken adimlar
- daha iyi faz basliklari varsa oneriler
- nihai onerilen faz sirasi

### Not

Bu kontrol yapilmadan 19. bolum nihai teknik uygulama sirasi olarak kilitlenmemelidir.

---


## 20. Güvenlik ve Onay Kuralları

_Kaynak dosya: `20-guvenlik-ve-onay-kurallari.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kritik bolum. Guvenlik, yetki ve onay modeli icin ayrica arastirma yapilacak.

---

## 20. Güvenlik ve Onay Kuralları

Bu bölüm EsnafDigital 360'ın en kritik konularından biridir. Çünkü her işletmeye ayrı gerçek agent/workspace açmak güçlü bir modeldir; ancak güvenlik, yetki ve onay sınırları doğru kurulmazsa risk üretir.

Bu nedenle bu bölüm ilk çerçevedir. Nihai güvenlik modeli için ayrıca araştırma yapılacak; OpenClaw agent izolasyonu, sandbox, tool yetki profilleri, API izinleri ve müşteri verisi sınırları ayrı ayrı değerlendirilecektir.

### 20.1 Temel Güvenlik İlkesi

Ajanın temel güvenlik ilkesi şudur:

> Ajan bilgi toplar, öneri üretir, taslak hazırlar ve görev açar. Riskli, dış dünyayı etkileyen veya kalıcı sonuç doğuran işlemler onaysız yapılmaz.

Her işletme agent'ı sadece kendi işletmesi için çalışır.

Ajan:

- başka işletme verisine erişemez,
- EsnafDigital ana workspace'ine erişemez,
- yetki profili dışında tool kullanamaz,
- dış hesaplarda onaysız işlem yapamaz,
- müşteri adına ticari taahhüt veremez.

### 20.2 Ajanın Serbestçe Yapabilecekleri

Ajan düşük riskli işleri kendi yetkisi içinde yapabilir.

Örnekler:

- işletmeden bilgi istemek,
- eksik bilgileri listelemek,
- gelen bilgiyi özetlemek,
- içerik taslağı hazırlamak,
- web vitrini için metin önerisi üretmek,
- menü / katalog / hizmet listesi taslağı oluşturmak,
- QR/NFC hedefi için öneri sunmak,
- basit durum özeti hazırlamak,
- admin panelde görev veya not oluşturmak,
- operasyon ekibine devredilecek işi işaretlemek.

Bu işler müşteriye veya dış sisteme kalıcı etki üretmez.

### 20.3 Onayla Yapılabilecekler

Aşağıdaki işler ancak işletme sahibi, kurucu veya operasyon onayıyla ilerlemelidir:

- web vitrini yayınlamak veya herkese açık içeriği değiştirmek,
- Google / Maps / Instagram gibi dış hesaplarda değişiklik yapmak,
- domain / DNS / yönlendirme değiştirmek,
- müşteri adına dış dünyaya mesaj göndermek,
- sosyal medya paylaşımı yapmak,
- fiyat, ödeme, indirim veya sözleşme ile ilgili karar vermek,
- kesin randevu, rezervasyon, sipariş veya taahhüt oluşturmak,
- dinamik QR/NFC hedefini müşterilerin göreceği şekilde değiştirmek,
- müşteri verisini kalıcı şekilde değiştirmek,
- canlı sistemi etkileyen teknik işlem yapmak.

Bu işlerde ajan yalnızca bilgi toplar, öneri sunar, taslak hazırlar veya onay görevi açar.

### 20.4 Kesin Yapılmaması Gerekenler

Ajan hiçbir koşulda şu işleri kendi başına yapmamalıdır:

- parola, token veya gizli erişim bilgisini istemek ya da kaydetmek,
- gizli bilgiyi workspace dosyalarına yazmak,
- başka işletmenin verisini okumak veya kullanmak,
- EsnafDigital ana workspace'ine müdahale etmek,
- yetki profili dışına çıkmak,
- müşteri adına bağlayıcı ticari karar vermek,
- müşteriye kesin sonuç garantisi vermek,
- yorum, puan, arama sıralaması veya satış sonucu garanti etmek,
- onay gerektiren işlemi onaysız tamamlamak.

### 20.5 Tool ve API Sınırı

İşletme agent'ları EsnafDigital veritabanına doğrudan erişmemelidir.

Doğru sınır:

```text
İşletme Agent'ı
   ↓
Sınırlı tool/plugin
   ↓
EsnafDigital API
   ↓
Veritabanı / operasyon kayıtları
```

Her tool için şu bilgiler net olmalıdır:

- hangi agent kullanabilir?
- hangi işletme üzerinde çalışabilir?
- okuma mı yazma mı yapar?
- onay ister mi?
- işlem kaydı tutulur mu?
- geri alınabilir mi?

### 20.6 Onay Kaydı ve İzlenebilirlik

Onay isteyen işler panelde görünür olmalıdır.

Her onay kaydında en az şunlar tutulmalıdır:

- hangi işletme,
- hangi agent,
- istenen işlem,
- işlem nedeni,
- risk seviyesi,
- kimden onay beklendiği,
- onay durumu,
- zaman bilgisi,
- işlem sonucu.

Bu kayıtlar hem güvenlik hem de operasyon takibi için gereklidir.

### 20.7 Randevu ve Müşteriyle Doğrudan İşleyen Senaryolar

Randevu, sipariş, rezervasyon ve müşteri karşılama gibi işler daha hassastır.

İlk aşamada ajan:

- talep toplar,
- uygun bilgileri sorar,
- işletme sahibine veya operasyona özet çıkarır,
- kesin işlem için onay ister.

Kesin randevu veya sipariş onayı, ancak yetkili onayından sonra oluşmalıdır.

### 20.8 Araştırılacak Konular

Bu bölüm daha sonra ayrıca araştırılmalıdır.

Araştırma başlıkları:

- OpenClaw çoklu agent izolasyonu,
- workspace sandbox sınırları,
- agent başına tool allowlist,
- API bazlı işletme yetki kontrolü,
- agent'ın başka işletme verisine erişmesini engelleme,
- gizli bilgi yönetimi,
- işlem logları ve audit kayıtları,
- onay akışı tasarımı,
- müşteri verisi silme/değiştirme kuralları,
- WhatsApp / dış hesap entegrasyonlarında güvenlik.

Ana prensip:

> EsnafDigital 360'da güvenlik, sonradan eklenecek detay değil; işletme agent modelinin temel şartıdır.

---

---


## 21. Başarı Kriterleri

_Kaynak dosya: `21-basari-kriterleri.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

## 21. Başarı Kriterleri

İlk aşamada başarı, tüm modüllerin tam otomatik olmasıyla ölçülmemelidir. MVP'nin başarısı, işletme agent modelinin gerçekten çalışıp çalışmadığıyla ölçülmelidir.

Başarı kriterleri üç grupta ele alınır:

1. teknik başarı,
2. operasyonel başarı,
3. ürün / müşteri değeri başarısı.

### 21.1 Teknik Başarı Kriterleri

MVP teknik olarak başarılı sayılmak için şunları göstermelidir:

- bir işletme sisteme eklenebiliyor,
- işletmeye özel OpenClaw İşletme Ajanı oluşuyor,
- ayrı agent workspace'i oluşuyor,
- İşletme Ajanı Kaydı panelde görünüyor,
- işletme bazlı oturum ve hafıza ayrımı çalışıyor,
- pilot mesajlaşma kanalından gelen mesaj doğru işletme ajanına gidiyor,
- agent kendi işletme bağlamıyla cevap veriyor,
- agent yalnızca izin verilen tool/API sınırı içinde işlem yapıyor,
- başka işletme verisine veya ana workspace'e erişim olmuyor.

### 21.2 Operasyonel Başarı Kriterleri

MVP operasyonel olarak başarılı sayılmak için şunları göstermelidir:

- ajan temel işletme bilgilerini toplayabiliyor,
- eksik bilgiler görünür hale geliyor,
- toplanan bilgiler işletme dijital profiline bağlanıyor,
- admin panelde açık görevler görünüyor,
- onay gerektiren işler otomatik yapılmıyor,
- operasyon ekibine devredilecek işler ayrılıyor,
- bakım veya güncelleme ihtiyacı görev olarak takip edilebiliyor,
- agent durumu ve son aktivite panelden izlenebiliyor.

### 21.3 İlk Dijital Çıktı Başarı Kriterleri

MVP, işletmeye görünür bir ilk değer üretmelidir.

Başarı için en az şunlar oluşmalıdır:

- web vitrini taslağı,
- arama / mesajlaşma / yol tarifi bağlantıları,
- dinamik QR / NFC kısa link,
- menü / katalog / hizmet listesi için basit yapı,
- fotoğraf veya içerik toplama akışı,
- kısa kurulum özeti veya durum raporu.

Bu çıktılar kusursuz olmak zorunda değildir; ama işletmenin dijital operasyonunun başladığını göstermelidir.

### 21.4 Ürün / Müşteri Değeri Başarı Kriterleri

MVP, müşteri açısından şu değeri göstermelidir:

- işletme sahibi panel öğrenmeden sürece katılabiliyor,
- mesajlaşma üzerinden bilgi verebiliyor,
- ajan ne istediğini açık ve kısa şekilde anlatabiliyor,
- işletme sahibi hangi bilgilerin eksik olduğunu görebiliyor,
- kurulum süreci tek seferlik site tesliminden daha düzenli hissediliyor,
- işletme için özel ajan fikri anlaşılır ve değerli görünüyor.

### 21.5 Başarı Sayılmayan Şeyler

Aşağıdakiler tek başına başarı sayılmaz:

- sadece web sitesi taslağı çıkarmak,
- sadece QR üretmek,
- sadece Telegram botu çalıştırmak,
- her modülü yarım yamalak açmak,
- müşteriye çok sayıda ekran göstermek,
- agent olmadan klasik manuel operasyon yapmak,
- güvenlik ve onay sınırlarını kurmadan otomasyon yapmak.

### 21.6 MVP Doğru Yolda Sayılırsa

Aşağıdaki sorulara evet cevabı alınabiliyorsa MVP doğru yoldadır:

1. Tek bir işletme için gerçek agent/workspace çalışıyor mu?
2. Ajan kendi işletme bağlamıyla konuşuyor mu?
3. İşletme sahibi mesajlaşma üzerinden bilgi verebiliyor mu?
4. Bilgiler profile, göreve ve ilk dijital çıktılara dönüşüyor mu?
5. Riskli işler onaysız yapılmadan panelde görünür oluyor mu?
6. Web vitrini, dinamik QR/NFC ve basit katalog/hizmet yapısı üretilebiliyor mu?
7. Sistem ileride WhatsApp veya başka kanala taşınabilecek kadar ayrık mı?

Ana prensip:

> Başarı, her şeyi otomatik yapmak değil; gerçek işletme ajanı modelinin güvenli, izlenebilir ve müşteriye değer üreten şekilde çalıştığını kanıtlamaktır.

---

---


## 22. Stratejik Riskler

_Kaynak dosya: `22-stratejik-riskler.md`_

> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; risk analizi proje ilerledikce guncellenecek ve GPT Pro ile ayrica kontrol edilecek.

---

## 22. Stratejik Riskler

Bu bölüm sabit ve bir kere yazılıp kapanacak bir liste değildir. EsnafDigital 360 geliştikçe riskler değişecektir.

Bu nedenle risk analizi:

- her önemli karar sonrası güncellenmeli,
- ilk pilotlardan sonra tekrar ele alınmalı,
- GPT Pro ile ayrıca kontrol edilmeli,
- teknik, operasyonel ve ticari riskler ayrı ayrı değerlendirilmelidir.

### 22.1 Kapsam Şişmesi

Risk:

Tüm modülleri aynı anda kurmaya veya otomatikleştirmeye çalışmak projeyi yavaşlatır.

Belirti:

- çok fazla ekran açılması,
- her modül için ayrı sistem tasarlama isteği,
- ilk agent/workspace doğrulaması yapılmadan web, QR, katalog, WhatsApp, randevu, muhasebe gibi alanlara yayılmak.

Kontrol:

> Önce tek işletme için gerçek agent/workspace çalışsın. Sonra modüller sırayla eklenir.

### 22.2 Yanlış Hedef Segment

Risk:

Ürün, özel işletme ajanından gerçek verim alamayacak işletmelere anlatılırsa değer anlaşılmaz.

Belirti:

- müşteri sadece ucuz web sitesi ister,
- bilgi paylaşmaya istekli değildir,
- mesajlaşma üzerinden ilerlemeyi kullanmaz,
- dijital operasyon kurma veya büyütme ihtiyacı yoktur.

Kontrol:

> Hedef, dijital operasyonunu kurmak veya büyütmek isteyen ve ajandan gerçek fayda görebilecek KOBİ'lerdir. Sektör listesi daha sonra ayrıca netleştirilmelidir.

### 22.3 Premium Vaat ile MVP Gerçeği Arasındaki Gerilim

Risk:

Ürün premium anlatılırken MVP'nin ilk hali yarı otomatik ve kontrollü olacak. Bu fark yanlış anlatılırsa müşteri beklentisi fazla yükselir.

Belirti:

- müşteri ajanın her şeyi otomatik yapacağını sanır,
- dış hesaplarda anında işlem bekler,
- randevu, ödeme, sipariş, paylaşım gibi riskli işlerde otomatiklik bekler.

Kontrol:

> Müşteriye sonuç anlatılır; ancak riskli işlemlerin onayla ilerlediği baştan net tutulur.

### 22.4 Agent / Workspace Çoğalmasının Karmaşası

Risk:

Her işletmeye gerçek agent/workspace açmak güçlüdür; fakat otomasyon ve şablon olmadan manuel karmaşa doğurur.

Belirti:

- agent'lar elle kurulmaya başlanır,
- workspace dosyaları farklılaşır ve izlenemez,
- hangi agent'ın hangi şablondan geldiği bilinmez,
- yetki profilleri tutarsız olur.

Kontrol:

> İyi başlangıç şablonu, otomatik kurulum, şablon sürümü takibi ve sıkı yetki sınırı zorunludur.

### 22.5 Güvenlik ve İzolasyon Hatası

Risk:

Bir işletme agent'ı başka işletme verisine, ana workspace'e veya yetki dışı tool'lara erişirse ciddi güvenlik sorunu oluşur.

Belirti:

- agent'lar ortak workspace kullanır,
- tool allowlist net değildir,
- API işletme bazlı yetki kontrolü yapmaz,
- gizli bilgiler workspace'e yazılır.

Kontrol:

> Agent başına workspace, izin profili, API yetki kontrolü ve audit log zorunlu tasarım konusu olmalıdır.

### 22.6 Tek Kanala Bağımlılık

Risk:

Sistem sadece Telegram veya sadece WhatsApp mantığıyla kurulursa ileride taşımak zorlaşır.

Belirti:

- ajan mantığı kanal adapterine yazılır,
- routing/binding kanaldan bağımsız tasarlanmaz,
- WhatsApp ticari hedef olduğu için erken teknik kilitlenme oluşur.

Kontrol:

> Kanal sadece giriş/çıkış kapısıdır. Ajan mantığı kanal bağımsız kalmalıdır.

### 22.7 OpenClaw’ın Ana Uygulamaya Gömülmesi

Risk:

OpenClaw runtime EsnafDigital app içine gömülürse bakım, güvenlik ve ölçekleme zorlaşır.

Belirti:

- agent runtime ile app kodu iç içe geçer,
- servis ayrımı bulanıklaşır,
- tool çalıştırma ve sandbox sınırı kaybolur.

Kontrol:

> OpenClaw ayrı runtime katmanı olarak kalmalıdır. Başta aynı VPS olabilir; ancak mantıksal ayrım korunmalıdır.

### 22.8 Manuel Operasyonun Gizli Maliyeti

Risk:

MVP yarı otomatik ilerlerken operasyon yükü görünmez kalırsa paket fiyatı ve teslimat süresi yanlış hesaplanır.

Belirti:

- agent bilgi toplar ama operasyon işleri birikir,
- fiziksel materyal, domain, sosyal medya, dış hesap işleri çok zaman alır,
- bakım paketi kârlı olmaktan çıkar.

Kontrol:

> Her manuel iş görev olarak izlenmeli; kurulum ve bakım maliyeti zamanla ölçülmelidir.

### 22.9 Bağlam Dosyalarının Dağılması

Risk:

Her işletme agent'ının kendi dosyaları olacağı için bağlam hijyeni bozulabilir.

Belirti:

- AGENTS/SOUL/TOOLS/MEMORY/BUSINESS dosyaları her işletmede farklı mantığa kayar,
- tekrar eden veya çelişen talimatlar çoğalır,
- güvenlik sınırları dosyadan dosyaya değişir.

Kontrol:

> Workspace şablonu standart olmalı; işletmeye özel değişiklikler sınırlı ve izlenebilir yapılmalıdır.

### 22.10 Yanlış Yapay Zeka Algısı

Risk:

Müşteri "her şeyi yapan yapay zeka" beklentisine girerse ürün yanlış anlaşılır.

Belirti:

- müşteri ajanın dış hesaplara kendiliğinden müdahale etmesini bekler,
- kesin sonuç garantisi bekler,
- Google sıralaması, yorum sayısı veya satış artışı garantisi ister.

Kontrol:

> Ürün, her şeyi otomatik yapan yapay zeka değil; işletmenin dijital operasyonunu mesajlaşma üzerinden sistemli ilerleten özel işletme ajanı olarak anlatılmalıdır.

### 22.11 Risk Analizinin Güncellenmesi

Bu bölüm proje ilerledikçe güncellenmelidir.

Özellikle şu anlarda tekrar ele alınmalıdır:

- ilk test işletmesi agent'ı oluşturulduğunda,
- ilk web vitrini / QR / katalog çıktısı üretildiğinde,
- ilk müşteri veya pilot işletme denendiğinde,
- WhatsApp pilot hattı devreye alındığında,
- yeni tool/API yetkisi eklendiğinde,
- dış hesap veya ödeme/randevu gibi hassas modüller gündeme geldiğinde.

GPT Pro'ya ayrıca şu sorulmalıdır:

- Bu risk listesinde eksik kritik risk var mı?
- Hangi riskler MVP'de en önce kontrol edilmeli?
- Hangi riskler ürünü/paketi yeniden konumlandırmayı gerektirir?
- Agent/workspace çoğalması için hangi güvenlik ve operasyon kontrol noktaları eklenmeli?

Ana prensip:

> Risk analizi, belgeyi tamamlamak için değil; proje büyüdükçe yön kaymasını ve güvenlik hatalarını erken görmek için kullanılmalıdır.

---

---
