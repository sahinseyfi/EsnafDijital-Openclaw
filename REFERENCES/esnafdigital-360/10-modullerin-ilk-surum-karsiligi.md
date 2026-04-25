> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

# 10. Modüllerin İlk Sürüm Karşılığı

EsnafDigital 360'ta her modülün ilk günden tam otomatik olması gerekmez. İlk sürümün amacı, modülleri sistemde doğru yere koymak ve işletme ajanı üzerinden yönetilebilir hale getirmektir.

Bu yüzden modüller dört seviyede ele alınır:

1. **Çekirdek MVP** — ilk sürümde mutlaka çalışması gereken parçalar.
2. **Yarı otomatik** — ajan bilgi toplar, operasyon veya kurucu kontrol eder.
3. **Manuel operasyon** — sistemde takip edilir, uygulama elle yapılır.
4. **İleri modül** — vizyonda tutulur, MVP'de zorunlu değildir.

## 10.1 Çekirdek MVP

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

## 10.2 Yarı Otomatik Modüller

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

## 10.3 Manuel Operasyon Modülleri

Bu modüller sistemde takip edilir; ancak ilk sürümde gerçek uygulama elle yapılır.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Özel domain | Operasyon bağlar, sistemde durum takip edilir | Manuel |
| NFC kart / yorum standı | QR hedefi sistemden alınır, fiziksel üretim elle yürür | Manuel / fiziksel |
| Kartvizit / basit logo | Şablonla hazırlanır, teslimat görevi olarak takip edilir | Hizmet |
| Ek fotoğraf / içerik düzenleme | Talep mesajla alınır, görev olarak açılır | Hizmet |
| Düzenli Instagram içerik | Ajan fikir/taslak verir, operasyon uygular | Hizmet |

## 10.4 İleri Modüller

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
