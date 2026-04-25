> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi ve 20. bolumdeki uygulama plani mantigi buraya birlestirildi; GPT Pro ile sira/eksik kontrolu yapilacak.

---

# 19. Geliştirme ve Uygulama Fazları

Geliştirme sırası uzun özellik listesi veya takvim planı gibi ilerlememelidir. Bu bölüm, EsnafDigital 360'ın hangi sırayla doğrulanacağını anlatır.

Süre verilmez. Her faz, bir önceki faz gerçekten çalışmadan sonraki faza geçilmeyecek şekilde ele alınır.

Ana teknik hedef:

> Tek test işletmesi için ayrı OpenClaw İşletme Ajanı ve workspace üret, ona mesaj gönder, kendi işletme bağlamıyla cevap aldığını doğrula.

Bu doğrulanmadan web vitrini, QR/NFC, katalog veya ileri modüllere fazla yüklenmek erken olur.

---

## Faz 1 — Gerçek Agent / Workspace Doğrulaması

### Amaç

Bir işletmeye gerçekten ayrı OpenClaw İşletme Ajanı ve ayrı workspace açılabildiğini doğrulamak.

### Yapılacaklar

1. İşletme Ajanı workspace şablonu oluşturulur.
2. İşletme Ajanı Kaydı için minimum model belirlenir.
3. Manuel veya yarı otomatik agent oluşturma scripti hazırlanır.
4. Tek test işletmesi eklenir.
5. Pilot kanal veya webchat üzerinden agent'a mesaj gönderilir.
6. Agent'ın kendi işletme bağlamıyla cevap verdiği doğrulanır.

### Çıktılar

- çalışan tek işletme agent'ı,
- ayrı workspace,
- panelde takip edilebilir İşletme Ajanı Kaydı,
- temel mesajlaşma testi,
- ilk agent şablonu.

### Tamamlandı Sayma Ölçütü

Bu faz, tek test işletmesi için agent oluşturulup mesajlaşma testi başarıyla geçmeden tamamlanmış sayılmaz.

---

## Faz 2 — İşletme Profili ve Bilgi Toplama

### Amaç

Ajanın işletme bilgisini konuşarak toplayıp işletme dijital profiline bağlamasını sağlamak.

### Yapılacaklar

1. İşletme dijital profili modeli netleştirilir.
2. Eksik bilgi listesi oluşturulur.
3. İlk bilgi toplama konuşması tasarlanır.
4. Gelen bilgiler profile veya göreve bağlanır.
5. Admin panelde agent/profil durumu görünür olur.
6. Sonraki adım ve görev mantığı eklenir.

### Çıktılar

- doldurulabilir işletme profili,
- agent'ın sorduğu eksik bilgi akışı,
- admin panelde görünür eksik/görev durumu,
- ilk kurulum konuşması.

### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın en az bir test işletmesi için temel bilgileri toplayıp eksik/görev durumunu panelde görünür hale getirmesiyle tamamlanır.

---

## Faz 3 — İlk Görünür Dijital Çıktılar

### Amaç

Agent'ın topladığı bilgilerden işletmeye gösterilebilir ilk dijital çıktıları oluşturmak.

### Yapılacaklar

1. Web vitrini taslağı oluşturulur.
2. Menü / katalog / hizmet listesi yapısı eklenir.
3. Dinamik QR / NFC kısa link altyapısı kurulur.
4. Arama / mesajlaşma / yol tarifi bağlantıları üretilir.
5. Fotoğraf ve içerik toplama akışı bağlanır.
6. Kısa kurulum özeti veya durum raporu üretilir.

### Çıktılar

- ilk web vitrini,
- dinamik QR/NFC kısa link,
- basit katalog/hizmet listesi,
- iletişim ve yol tarifi bağlantıları,
- kurulum özeti.

### Tamamlandı Sayma Ölçütü

Bu faz, test işletmesi için agent verilerinden ilk web vitrini ve dinamik QR/NFC bağlantısı üretildiğinde tamamlanır.

---

## Faz 4 — Güvenlik, Yetki ve Operasyon Kontrolü

### Amaç

Agent'ların kontrolsüz büyümesini engellemek ve riskli işlemlerin onaysız yapılmamasını sağlamak.

### Yapılacaklar

1. Tool/yetki profili oluşturulur.
2. Agent'ın kullanabileceği EsnafDigital API tool'ları sınırlandırılır.
3. Onay isteyen işler tanımlanır.
4. Operasyon devri ve görev açma mantığı netleştirilir.
5. Agent sağlık/durum takibi panelde gösterilir.
6. Basit bakım görevi akışı eklenir.

### Çıktılar

- sınırlı tool kullanımı,
- onay bekleyen işler,
- operasyon devri,
- agent durum takibi,
- bakım görevi akışı.

### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın riskli bir isteği otomatik yapmayıp panelde onay veya operasyon görevi olarak görünür hale getirmesiyle tamamlanır.

---

## Faz 5 — Kanal ve Ticari Pilot

### Amaç

Sistemi gerçek müşteri kullanımına yaklaştırmak.

### Yapılacaklar

1. Telegram/test veya webchat pilotu tamamlanır.
2. EsnafDigital pilot WhatsApp hattı denenir.
3. İlk pilot işletme kurulur.
4. Bakım paketi denemesi başlatılır.
5. Teklif ve paket dili sadeleştirilir.
6. İlk müşteri geri bildirimleri toplanır.

### Çıktılar

- pilot işletme deneyimi,
- kanal doğrulaması,
- paket/teklif dili,
- gerçek kullanım geri bildirimi,
- sonraki geliştirme listesi.

### Tamamlandı Sayma Ölçütü

Bu faz, gerçek veya gerçeğe çok yakın bir pilot işletme sürecinde sistemin baştan sona denenmesiyle tamamlanır.

---

## Sonraya Kalacaklar

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
