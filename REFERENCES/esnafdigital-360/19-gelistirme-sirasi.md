> Aktif 360 bolum dosyasi.
> Durum: GPT Pro degerlendirmeleriyle faz gecis kapilari ve P0=0 kuralı eklendi.

---

# 19. Geliştirme ve Uygulama Fazları

Geliştirme sırası uzun özellik listesi veya takvim planı gibi ilerlememelidir. Bu bölüm, EsnafDigital 360'ın hangi sırayla doğrulanacağını anlatır.

Süre verilmez. Her faz, bir önceki faz gerçekten çalışmadan sonraki faza geçilmeyecek şekilde ele alınır.

Ana teknik hedef:

> Tek test işletmesi için ayrı OpenClaw İşletme Ajanı ve workspace üret, ona mesaj gönder, kendi işletme bağlamıyla cevap aldığını doğrula.

Bu doğrulanmadan web vitrini, QR/NFC, katalog veya ileri modüllere fazla yüklenmek erken olur.

## Genel Faz Geçiş Kuralı

Her faz sonunda şu sorulara bakılır:

1. Bu fazın gerçek çıktısı üretildi mi?
2. Çıktı panelden izlenebiliyor mu?
3. En az bir hafif doğrulama yapıldı mı?
4. Güvenlik veya tenant sınırı ihlali var mı?
5. Bir sonraki faza geçersek kapsam gereksiz büyür mü?

MVP pilotundan sonra genel kabul kuralı:

> P0 bloklayıcı hata sayısı sıfır olmadan yeni pilot müşteriye geçilmez.

P1 ciddi sorun varsa ikinci pilota geçmeden önce sahipli ve sınırlı düzeltme planı yapılır. P2 küçük eksikler MVP kapsamı içinde kabul edilebilir.

---

## Faz 1 — Gerçek Agent / Workspace Doğrulaması

### Amaç

Bir işletmeye gerçekten ayrı OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir ve ayrı session store açılabildiğini doğrulamak.

### Yapılacaklar

1. İşletme Ajanı workspace şablonu oluşturulur.
2. İşletme Ajanı Kaydı için minimum model belirlenir.
3. Manuel veya yarı otomatik agent oluşturma scripti hazırlanır.
4. Tek test işletmesi eklenir.
5. Ayrı workspace / agentDir / session store oluştuğu doğrulanır.
6. Pilot kanal veya webchat üzerinden agent'a mesaj gönderilir.
7. Agent'ın kendi işletme bağlamıyla cevap verdiği doğrulanır.
8. Yanlış veya yetkisiz göndericinin gerçek işletme agent'ına düşmediği test edilir.

### Çıktılar

- çalışan tek işletme agent'ı,
- ayrı workspace,
- ayrı agentDir ve session store,
- panelde takip edilebilir İşletme Ajanı Kaydı,
- explicit channel binding,
- temel mesajlaşma testi,
- ilk agent şablonu.

### Tamamlandı Sayma Ölçütü

Bu faz, tek test işletmesi için agent oluşturulup mesajlaşma testi başarıyla geçmeden tamamlanmış sayılmaz.

P0 bloklayıcılar:

- gerçek agent oluşmaması,
- ayrı workspace / agentDir / session olmaması,
- mesajın yanlış agent'a gitmesi,
- İşletme Ajanı Kaydı'nın panelde izlenememesi.

---

## Faz 2 — İşletme Profili ve Bilgi Toplama

### Amaç

Ajanın işletme bilgisini konuşarak toplayıp işletme dijital profiline, eksiklere ve görevlere bağlamasını sağlamak.

### Yapılacaklar

1. İşletme dijital profili modeli netleştirilir.
2. Eksik bilgi listesi oluşturulur.
3. İlk bilgi toplama konuşması tasarlanır.
4. Agent ilk mesajda en fazla 1-3 bilgi ister.
5. Gelen bilgiler profile veya göreve bağlanır.
6. Eksikler panelde görünür olur.
7. Admin panelde agent/profil durumu görünür olur.
8. Sonraki adım ve görev mantığı eklenir.

### Çıktılar

- doldurulabilir işletme profili,
- agent'ın sorduğu eksik bilgi akışı,
- admin panelde görünür eksik/görev durumu,
- ilk kurulum konuşması,
- toparlanmış işletme özeti.

### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın en az bir test işletmesi için temel bilgileri toplayıp eksik/görev durumunu panelde görünür hale getirmesiyle tamamlanır.

Minimum kabul:

- işletme adı veya ad onayı,
- kısa açıklama,
- iletişim bilgisi,
- en az bir hizmet / ürün / kategori,
- eksik listesi,
- kurulum konuşmasının kısa ve anlaşılır olması.

---

## Faz 3 — İlk Görünür Dijital Çıktılar

### Amaç

Agent'ın topladığı bilgilerden işletmeye gösterilebilir ilk dijital çıktıları oluşturmak.

### Yapılacaklar

1. Web vitrini taslağı oluşturulur.
2. Basit menü / katalog / hizmet listesi yapısı eklenir.
3. Dinamik QR / NFC kısa link hedef taslağı oluşturulur.
4. Arama / mesajlaşma / yol tarifi bağlantıları taslaklanır.
5. Fotoğraf ve içerik toplama akışı bağlanır.
6. Kısa kurulum özeti veya durum raporu üretilir.

### Çıktılar

- web vitrini taslağı / preview,
- basit hizmet / ürün listesi,
- dinamik QR/NFC kısa link hedef taslağı,
- iletişim ve yol tarifi bağlantıları,
- medya/fotoğraf talebi,
- kurulum özeti.

### Tamamlandı Sayma Ölçütü

Bu faz, test işletmesi için agent verilerinden ilk web vitrini taslağı, hizmet / ürün listesi ve dinamik QR/NFC hedef taslağı üretildiğinde tamamlanır.

Önemli sınırlar:

- Web vitrini canlı yayınlanmak zorunda değildir.
- Fotoğraf yoksa taslak yine oluşabilir.
- QR hedefi canlıya alınmaz; sadece taslak/onay bekleyen yapı olur.
- Hizmet listesi tam katalog değildir.

---

## Faz 4 — Güvenlik, Yetki ve Operasyon Kontrolü

### Amaç

Agent'ların kontrolsüz büyümesini engellemek ve riskli işlemlerin onaysız yapılmamasını sağlamak.

### Yapılacaklar

1. Tool/yetki profili oluşturulur.
2. Agent'ın kullanabileceği EsnafDigital API tool'ları sınırlandırılır.
3. Denylist açıkça uygulanır.
4. EsnafDigital API tenant/business yetki kontrolü server-side yapılır.
5. Onay isteyen işler tanımlanır.
6. Operasyon devri ve görev açma mantığı netleştirilir.
7. Agent sağlık/durum takibi panelde gösterilir.
8. Audit log tutulur.
9. Pause / kill switch test edilir.

### Çıktılar

- sınırlı tool kullanımı,
- onay bekleyen işler,
- operasyon devri,
- agent durum takibi,
- audit log,
- pause / kill switch,
- bakım veya düzeltme görevi akışı.

### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın riskli bir isteği otomatik yapmayıp panelde onay veya operasyon görevi olarak görünür hale getirmesiyle tamamlanır.

P0 bloklayıcılar:

- tenant mismatch,
- denylist tool'un başarılı çalışması,
- riskli işlemin onaysız yapılabilmesi,
- audit olmadan tool işlemi,
- pause / kill switch'in çalışmaması,
- workspace'e secret yazılması.

---

## Faz 5 — İlk Pilot Kabulü

### Amaç

Tek test işletmesi üzerinde teknik, operasyonel, güvenlik ve müşteri değeri kanıtlarını birlikte almak.

### Yapılacaklar

1. Pilot kanal üzerinden işletme sahibiyle gerçek kurulum konuşması yapılır.
2. Agent bilgileri toplar ve profil/görev/çıktıya bağlar.
3. İlk web vitrini, hizmet listesi ve shortlink/QR hedef taslağı oluşur.
4. Riskli bir işlem approval'a düşürülür.
5. Admin panelde görev, eksik, onay, audit ve sıradaki adım okunur.
6. İşletme sahibinden kısa geri bildirim alınır.
7. P0/P1/P2 hata ayrımı yapılır.
8. İkinci pilota geçiş kararı verilir.

### Çıktılar

- pilot işletme deneyimi,
- teknik doğrulama,
- operasyonel doğrulama,
- güvenlik doğrulama,
- müşteri değeri doğrulama,
- geri bildirim,
- sonraki geliştirme listesi.

### Tamamlandı Sayma Ölçütü

Bu faz, tek test işletmesi için sistemin baştan sona denenmesi ve P0 bloklayıcı hata kalmamasıyla tamamlanır.

Karar seçenekleri:

- geçti — aynı kapsamla ikinci pilota geç,
- kısmi geçti — önce küçük düzeltme yap,
- teknik geçti ama müşteri değeri zayıf — akış/çıktı/konumlandırma düzelt,
- müşteri değeri var ama güvenlik eksik — büyütme, güvenliği düzelt,
- operasyon çok ağır — kapsam/paket/fiyatı daralt,
- başarısız — çekirdeği yeniden tasarla.

---

## Sonraya Kalacaklar

Aşağıdaki işler ilk doğrulama sonrasına bırakılmalıdır:

- işletmenin kendi WhatsApp hattını ajana bağlama,
- WhatsApp Randevu Asistanı,
- gelişmiş müşteri paneli,
- gelişmiş katalog / sipariş / teklif akışı,
- sepet, ödeme, stok, tahsilat ve muhasebe,
- gelişmiş QR analitiği,
- kampanya motoru,
- gelişmiş entegrasyonlar,
- satış temsilcisi ağı.

Ana prensip:

> Önce tek işletme için gerçek agent/workspace çalışsın. Sonra işletme profili, görünür çıktılar, güvenlik ve kanal pilotu sırayla büyütülsün.
