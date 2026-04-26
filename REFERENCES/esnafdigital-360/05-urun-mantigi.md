> Aktif 360 bolum dosyasi.
> Durum: urun mantigi sanal isletme ekibi, isletme hafizasi ve karar destek katmaniyla hizalandi.

---

# 5. Ürün Mantığı

EsnafDigital 360, tek tek dijital hizmetlerin yan yana dizildiği bir paket değildir. Ürünün mantığı, işletmeye özel gerçek bir ajan kurmak ve bu ajan üzerinden işletmenin kararlarını, dijital operasyonunu ve takip işlerini adım adım yönetilebilir hale getirmektir.

Sistem beş ana katmandan oluşur:

1. **İşletme Bilgi ve Karar Profili**
2. **Sanal İşletme Ekibi / Departman Bakışları**
3. **Gerçek OpenClaw İşletme Ajanı ve Workspace**
4. **İşletme Ajanı Kaydı**
5. **Modüler Dijital ve Operasyonel Hizmet Sistemi**

Bu katmanlar birbirinden ayrı düşünülmez. İşletme ajanı; işletme profilindeki bilgileri, açık kararları, departman bakışlarını ve modülleri kullanarak müşteriyi yönlendirir, eksikleri takip eder, karar notu üretir ve operasyon işlerini görünür hale getirir.

## 5.1 İşletme Bilgi ve Karar Profili

İşletme Bilgi ve Karar Profili, işletmenin sistemdeki merkezi bilgi kaydıdır.

Bu profil yalnızca iletişim ve web vitrini alanlarından oluşmaz. Ajanın işletmeyi danışman gibi anlayabilmesi için işletmenin iç yapısını, hedeflerini, kararlarını ve operasyon durumunu da taşır.

Profil alanları şu gruplarda düşünülmelidir:

### Temel bilgiler

- işletme adı,
- kısa açıklama,
- sektör / faaliyet alanı,
- yetkili kişi / işletme sahibi,
- telefon,
- mesajlaşma numarası,
- adres veya hizmet bölgesi,
- çalışma saatleri.

### İşletme yönetim bağlamı

- işletme sahibinin öncelikleri,
- büyüme hedefi,
- risk toleransı,
- açık kararlar,
- bekleyen yatırımlar,
- bekleyen satın almalar,
- ertelenen kararlar,
- aylık / dönemsel odaklar.

### Finans ve ticari bağlam

- ortalama ciro veya güvenli aralık bilgisi,
- ana gider kalemleri,
- yatırım bütçesi,
- nakit akışı hassasiyeti,
- fiyatlama yaklaşımı,
- en çok satan ve en kârlı ürün/hizmetler.

### Operasyon ve ekip bağlamı

- personel sayısı,
- roller,
- yoğun saatler,
- kapasite sınırları,
- mevcut ekipmanlar,
- darboğazlar,
- eğitim ihtiyaçları.

### Müşteri ve pazarlama bağlamı

- hedef müşteri,
- sık sorulan sorular,
- sık gelen şikayetler,
- yorum/memnuniyet durumu,
- kampanyalar,
- marka dili,
- satış kanalları.

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
- karar destek notları,
- onay bekleyen işler,
- bakım durumu,
- son güncelleme tarihi.

Paket, ödeme, fatura, stok, randevu veya sipariş gibi alanlar ilk MVP'de bu profilin içine yığılmaz; gerekiyorsa ayrı modül/kayıt olarak sonradan ele alınır.

## 5.2 Sanal İşletme Ekibi / Departman Bakışları

Ajan tek kişiyle konuşur; ancak içeride çoklu departman bakışıyla düşünür.

İlk MVP için yeterli roller:

1. **Genel Yönetim:** hedef, öncelik, karar özeti.
2. **Finans:** bütçe, maliyet, geri dönüş, nakit akışı riski.
3. **Satış ve Pazarlama:** gelir etkisi, kampanya, görünürlük, müşteri kazanımı.
4. **Operasyon:** uygulanabilirlik, kapasite, darboğaz, günlük iş akışı.
5. **Satın Alma:** tedarikçi, garanti, servis, yedek parça, toplam sahip olma maliyeti.
6. **Müşteri Hizmetleri:** müşteri deneyimi, şikayet, yorum, memnuniyet etkisi.

İleri aşamada İK, hukuk/uyum, BT/dijital, kalite, proje yönetimi ve kurumsal iletişim gibi roller eklenebilir.

Ajan gerçek departmanların yerine geçmez; bu bakışları karar desteği için kullanır.

## 5.3 Gerçek OpenClaw İşletme Ajanı ve Workspace

Her işletme için gerçek bir OpenClaw İşletme Ajanı ve ayrı workspace modeli hedeflenir. İlk MVP'de bu model tek test işletmesiyle doğrulanır.

Bu ajan:

- kendi işletme bağlamıyla çalışır,
- kendi workspace dosyalarını kullanır,
- ayrı agentDir ve session store'a sahiptir,
- kendi hafıza ve oturum geçmişine sahiptir,
- kendi yetki profiliyle sınırlandırılır,
- sadece ilgili işletmenin bilgi/karar/dijital operasyonunu ilerletir,
- EsnafDigital veritabanına doğrudan değil, sınırlı API tool'ları üzerinden erişir.

Workspace tek başına güvenlik sınırı değildir. Güvenlik; kanal allowlist/binding, sandbox/tool policy, API tenant kontrolü, audit/onay ve kill switch ile kurulur.

Ajanın gerçek görevi:

- işletmeyi tanımak,
- bilgi toplamak,
- açık kararları ve eksikleri bulmak,
- departman bakışlarıyla analiz yapmak,
- karar destek notu üretmek,
- müşteriyi küçük adımlarla yönlendirmek,
- gelen bilgileri işletme profiline bağlamak,
- içerik ve açıklama taslakları üretmek,
- web vitrini ve hizmet listesi taslaklarını beslemek,
- görev ve sonraki adım oluşturmak,
- bakım sürecini takip etmek,
- riskli işleri onay veya operasyona devretmektir.

## 5.4 İşletme Ajanı Kaydı

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
- açık kararlar,
- karar destek notları,
- onay bekleyen işlemler,
- agent sağlık/durum bilgisi,
- pause / kill switch bilgisi,
- son audit veya approval referansı.

Bu kayıt agent hafızası, transcript, secret, profil verisinin tamamı veya CRM geçmişi deposu değildir.

```text
OpenClaw İşletme Ajanı = çalışan ajan
İşletme Ajanı Kaydı = paneldeki takip/yönetim kaydı
```

## 5.5 Modüler Dijital ve Operasyonel Hizmet Sistemi

Modüller, işletme ajanının yönettiği operasyon parçalarıdır.

Örnek modül grupları:

- sanal işletme ekibi / karar destek,
- açık karar ve görev takibi,
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

- işletme özeti,
- en az bir karar destek notu,
- görev/eksik listesi,
- web vitrini taslağı,
- basit hizmet / ürün listesi,
- dinamik kısa link / QR hedef taslağı,
- kurulum özeti.

Canlı yayın, QR hedef aktivasyonu, dış hesap değişikliği, müşteri adına mesaj, ödeme, randevu veya sipariş gibi işlemler agent tarafından otomatik yapılmaz; approval veya operasyon devrine düşer.

Ana prensip:

> EsnafDigital 360'ın ürün mantığı, işletme ajanı etrafında işletme bilgisini, karar destek notlarını, dijital çıktıları, görevleri, onayları ve bakım sürecini tek sistemde birleştirmektir.
