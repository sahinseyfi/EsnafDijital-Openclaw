> Aktif 360 bolum dosyasi.
> Durum: ilk surum karsiliklari karar destek cekirdegiyle hizalandi.

---

# 10. Modüllerin İlk Sürüm Karşılığı

EsnafDigital 360'ta her modülün ilk günden tam otomatik olması gerekmez. İlk sürümün amacı, modülleri sistemde doğru yere koymak ve işletme ajanı üzerinden yönetilebilir hale getirmektir.

Bu yüzden modüller dört seviyede ele alınır:

1. **Çekirdek MVP** — ilk sürümde mutlaka çalışması gereken parçalar.
2. **Karar destek / taslak** — ajan analiz eder, karar notu veya taslak üretir, operasyon veya kurucu kontrol eder.
3. **Manuel operasyon** — sistemde takip edilir, uygulama elle yapılır.
4. **İleri modül** — vizyonda tutulur, MVP'de zorunlu değildir.

## 10.1 Çekirdek MVP

Bunlar olmadan ürünün ajan merkezli farkı zayıflar.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Gerçek OpenClaw İşletme Ajanı | Tek test işletmesi için gerçek agent oluşturulur | Çekirdek runtime |
| Ayrı workspace / agentDir / session | Agent kendi çalışma alanı ve oturum ayrımıyla çalışır | Çekirdek runtime |
| İşletme Ajanı Kaydı | Agent kimliği, runtime ref, izin profili, sağlık ve durum panelde izlenir | Çekirdek veri modeli |
| İşletme Bilgi ve Karar Profili | Temel bilgiler, işletme bağlamı, açık kararlar, eksikler ve aktif modüller tutulur | Çekirdek veri modeli |
| Kanal routing / binding | Pilot kanaldan doğru işletme ajanına yönlendirme test edilir | Kanal + routing |
| EsnafDigital API tool sınırı | Agent yalnızca izinli, tenant-scoped tool'ları kullanır | Güvenlik |
| Audit / approval / kill switch | Tool kararları izlenir, riskli işler onaya düşer, agent durdurulabilir | Güvenlik |
| Eksik bilgi takibi | Ajan eksikleri sorar ve profil/görev akışına bağlar | Ajan destekli |
| Karar destek notu | En az bir gerçek işletme kararını departman bakışıyla değerlendirir | Ajan destekli |
| Görev / sonraki adım | Ajan veya operasyon için açık işler görünür olur | Operasyon yazılımı |

## 10.2 İlk Karar Destek Modülleri

Bu modüller ana ürün değerini gösterir.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Genel yönetim bakışı | Kararın hedef, öncelik ve yön etkisini özetler | Karar destek |
| Finans bakışı | Bütçe, maliyet, geri dönüş ve nakit etkisini sorularla değerlendirir | Karar destek |
| Satış/pazarlama bakışı | Gelir, kampanya, görünürlük ve müşteri kazanımı etkisini değerlendirir | Karar destek |
| Operasyon bakışı | Kapasite, zaman, ekip ve uygulanabilirlik etkisini değerlendirir | Karar destek |
| Satın alma bakışı | tedarikçi, garanti, servis, yedek parça ve toplam maliyeti kontrol eder | Karar destek |
| Müşteri hizmetleri bakışı | Müşteri deneyimi, şikayet, memnuniyet ve yorum etkisini değerlendirir | Karar destek |

İlk MVP'de bu roller ayrı ajan olmak zorunda değildir. Tek işletme ajanı, bu bakışları karar notu formatında kullanır.

## 10.3 İlk Görünür Dijital Taslak Modüller

Bu modüller müşteriye ilk değeri gösterir; ancak ilk MVP'de canlı/published ürün gibi davranmaz.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Web vitrini taslağı | Profil verisinden ilk preview oluşur; yayın onay ister | Taslak / preview |
| Basit hizmet / ürün listesi | İlk 1-3 kalemle hizmet listesi taslağı oluşur | Taslak veri modeli |
| Dinamik kısa link / QR hedef taslağı | Kısa link ve hedef taslağı oluşur; canlı aktivasyon onay ister | Taslak / onaylı çıktı |
| Fotoğraf / içerik toparlama | Müşteri mesajla gönderir; eksikse medya talebi açılır | Yarı otomatik |
| Basit kurulum özeti | Tamamlananlar, karar notları, eksikler ve sıradaki adım kaydedilir | Yarı otomatik |

## 10.4 Yarı Otomatik ve Manuel Operasyon Modülleri

Bu modüllerde ajan süreci başlatır, bilgi toplar ve taslak üretir; son kontrol insanda veya operasyonda kalır.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Dijital görünürlük kontrolü | Ajan bilgi toplar, operasyon kısa kontrol yapar | Yarı otomatik |
| Google / Maps düzeni | Ajan eksikleri çıkarır, gerçek değişiklik operasyon onayıyla yapılır | Manuel + ajan destekli |
| Instagram / sosyal profil düzeni | Ajan öneri üretir, uygulama onayla yapılır | Yarı otomatik |
| Satın alma / ekipman danışmanlığı | Ajan kriter, seçenek ve kontrol listesi çıkarır; satın alma yapmaz | Karar destek |
| Bakım takibi | Ajan hatırlatır, operasyon kontrol eder | Yarı otomatik |
| Özel domain | Operasyon bağlar, sistemde durum takip edilir | Manuel |
| NFC kart / yorum standı | QR hedefi sistemden alınır, fiziksel üretim elle yürür | Manuel / fiziksel |
| Kartvizit / basit logo | Şablonla hazırlanır, teslimat görevi olarak takip edilir | Hizmet |
| Ek fotoğraf / içerik düzenleme | Talep mesajla alınır, görev olarak açılır | Hizmet |
| Düzenli Instagram içerik | Ajan fikir/taslak verir, operasyon uygular | Hizmet |

## 10.5 İleri Modüller

Bu modüller ürün vizyonunda tutulur ama ilk MVP'nin zorunlu parçası değildir.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| İşletmenin kendi WhatsApp hattını ajana bağlama | Ek kanal/modül paketi olarak değerlendirilir | İleri modül |
| WhatsApp Randevu Asistanı | Önce talep toplama ve özetleme seviyesinde düşünülür | İleri modül |
| Gelişmiş müşteri paneli | İlk sürümde mesajlaşma arayüzü yeterli olabilir | İleri yazılım |
| Self-service içerik yönetimi | Mesajla bilgi/fotoğraf gönderme akışından sonra geliştirilir | İleri yazılım |
| Gelişmiş katalog / sipariş / teklif akışı | Basit listeden sonra kademeli eklenir | İleri yazılım |
| Sepet / ödeme / randevu motoru | Onay ve güvenlik modeli netleşmeden açılmaz | İleri modül |
| Gelir / gider | Veri modeli veya fikir havuzu seviyesinde kalır | İleri modül |
| Stok / tahsilat / muhasebe | MVP dışında, entegrasyon alanı bırakılır | İleri modül |
| Gelişmiş entegrasyonlar | API bağlantıları sonraki aşamaya kalır | İleri modül |
| Satış temsilcisi ağı | İlk müşteri doğrulamasından sonra ele alınır | İleri operasyon |

Ana prensip:

> İlk sürümde önemli olan her şeyi otomatik yapmak değil; hangi işin ajanla, hangi işin operasyonla, hangi işin sonraya bırakılarak ilerleyeceğini net ayırmaktır.
