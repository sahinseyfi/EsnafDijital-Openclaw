> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; katmanlar korundu, MVP minimumu ve ileri moduller ayrildi.

---

# 5. Ürün Mantığı

EsnafDigital 360, tek tek dijital hizmetlerin yan yana dizildiği bir paket değildir. Ürünün mantığı, işletmeye özel gerçek bir ajan kurmak ve bu ajan üzerinden işletmenin dijital operasyonunu adım adım yönetilebilir hale getirmektir.

Sistem dört ana katmandan oluşur:

1. **İşletme Dijital Profili**
2. **Gerçek OpenClaw İşletme Ajanı ve Workspace**
3. **İşletme Ajanı Kaydı**
4. **Modüler Dijital Hizmet Sistemi**

Bu katmanlar birbirinden ayrı düşünülmez. İşletme ajanı, işletme profilindeki bilgileri ve modülleri kullanarak müşteriyi yönlendirir, eksikleri takip eder ve operasyon işlerini görünür hale getirir.

## 5.1 İşletme Dijital Profili

İşletme Dijital Profili, işletmenin sistemdeki merkezi bilgi kaydıdır.

Bu profil, işletmenin sadece iletişim bilgilerini değil; dijital operasyonunu çalıştırmak için gereken temel verileri de tutar.

Profil alanları şu gruplarda düşünülmelidir:

### Temel bilgiler

- işletme adı,
- kısa açıklama,
- sektör / faaliyet alanı,
- yetkili kişi,
- telefon,
- mesajlaşma numarası,
- adres veya hizmet bölgesi,
- çalışma saatleri.

### Dijital varlıklar

- web vitrini taslağı veya yayın linki,
- Google / Maps linki,
- sosyal profil bağlantıları,
- dinamik QR / NFC kısa linkleri,
- yorum bağlantıları,
- fotoğraf ve medya varlıkları.

### Sunulan şeyler

- hizmetler,
- ürünler,
- menü / katalog / hizmet listesi,
- fiyat veya fiyat notları,
- öne çıkarılacak işler,
- kampanya veya duyuru bilgileri.

### Operasyon durumu

- aktif modüller,
- eksik bilgiler,
- açık görevler,
- onay bekleyen işler,
- bakım durumu,
- son güncelleme tarihi.

Paket, ödeme, fatura, stok, randevu veya sipariş gibi alanlar ilk MVP'de bu profilin içine yığılmaz; gerekiyorsa ayrı modül/kayıt olarak sonradan ele alınır.

Her işletmede tüm alanların dolu olması gerekmez. Ajanın görevlerinden biri, hangi alanların eksik olduğunu anlamak ve bunları adım adım tamamlatmaktır.

## 5.2 Gerçek OpenClaw İşletme Ajanı ve Workspace

Her işletme için gerçek bir OpenClaw İşletme Ajanı ve ayrı workspace modeli hedeflenir. İlk MVP'de bu model tek test işletmesiyle doğrulanır.

Bu ajan:

- kendi işletme bağlamıyla çalışır,
- kendi workspace dosyalarını kullanır,
- ayrı agentDir ve session store'a sahiptir,
- kendi hafıza ve oturum geçmişine sahiptir,
- kendi yetki profiliyle sınırlandırılır,
- sadece ilgili işletmenin dijital operasyonunu ilerletir,
- EsnafDigital veritabanına doğrudan değil, sınırlı API tool'ları üzerinden erişir.

Workspace tek başına güvenlik sınırı değildir. Güvenlik; kanal allowlist/binding, sandbox/tool policy, API tenant kontrolü, audit/onay ve kill switch ile kurulur.

İşletme ajanının görevi sadece cevap vermek değildir.

Ajanın gerçek görevi:

- bilgi toplamak,
- eksikleri bulmak,
- müşteriyi küçük adımlarla yönlendirmek,
- gelen bilgileri işletme profiline bağlamak,
- içerik ve açıklama taslakları üretmek,
- web vitrini ve hizmet listesi taslaklarını beslemek,
- görev ve sonraki adım oluşturmak,
- bakım sürecini takip etmek,
- riskli işleri onay veya operasyona devretmektir.

## 5.3 İşletme Ajanı Kaydı

İşletme Ajanı Kaydı, agent'ın kendisi değildir.

Bu kayıt, EsnafDigital panelinde gerçek OpenClaw İşletme Ajanı'nı takip eden yönetim kaydıdır. Başka bir ifadeyle runtime control record'dur.

İlk MVP'de bu kayıt en az şunları tutmalıdır:

- agent kimliği,
- işletme kimliği,
- workspace referansı,
- agentDir referansı,
- session store referansı,
- şablon sürümü,
- izin / yetki profili,
- tool policy ve sandbox profili,
- bağlı kanal veya test kanalı,
- binding bilgisi,
- oturum durumu,
- son aktivite,
- açık eksikler,
- açık görevler,
- onay bekleyen işlemler,
- agent sağlık/durum bilgisi,
- pause / kill switch bilgisi,
- son audit veya approval referansı.

Bu kayıt agent hafızası, transcript, secret, profil verisinin tamamı veya CRM geçmişi deposu değildir.

```text
OpenClaw İşletme Ajanı = çalışan ajan
İşletme Ajanı Kaydı = paneldeki takip/yönetim kaydı
```

## 5.4 Modüler Dijital Hizmet Sistemi

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

İlk MVP'de modüller tam otomatik ürünler gibi açılmaz. MVP görünür çıktıları küçük tutulur:

- web vitrini taslağı,
- basit hizmet / ürün listesi,
- dinamik kısa link / QR hedef taslağı,
- kurulum özeti ve eksik listesi.

Canlı yayın, QR hedef aktivasyonu, dış hesap değişikliği, müşteri adına mesaj, ödeme, randevu veya sipariş gibi işlemler agent tarafından otomatik yapılmaz; approval veya operasyon devrine düşer.

Ana prensip:

> EsnafDigital 360'ın ürün mantığı, işletme ajanı etrafında işletme profilini, dijital çıktıları, görevleri, onayları ve bakım sürecini tek sistemde birleştirmektir.
