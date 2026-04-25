# 11. İlk MVP Tanımı

Bu projede MVP yalnızca web vitrini değildir.

MVP şu akışı çalıştırmalıdır:

> Bir işletme sisteme kaydedildiğinde ona özel OpenClaw işletme agent'ı, ayrı workspace, `BusinessAgent` takip kaydı, konuşma oturumu, bağlam ve görev listesi oluşur. İşletme sahibi ilk aşamada Telegram veya test kanalı üzerinden kendi işletme agent'ına yönlendirilir. Ajan kendi işletme hafızası ve izin profiliyle işletme bilgilerini toplar. Sistem bu bilgilerle web vitrini, iletişim butonları, QR yorum linki, basit menü ve görev listesini oluşturur. Mimari WhatsApp’a taşınabilecek şekilde kurulmuş olur.

## 11.1 MVP’de Olması Gerekenler

MVP’nin çalışıyor sayılması için şu parçalar hazır olmalıdır:

- işletme kayıt modeli,
- işletme profili,
- işletmeye özel gerçek OpenClaw agent/workspace,
- `BusinessAgent` takip kaydı,
- işletme bazlı ayrı oturum, bağlam ve hafıza,
- agent workspace şablonu,
- otomatik agent kurulum akışı,
- sıkı tool/yetki profili,
- Telegram test bağlantısı,
- routing/binding ile doğru işletme agent'ına yönlendirme,
- kanal bağımsız mesaj işleme yapısı,
- ajan bilgi toplama akışı,
- web vitrini taslağı,
- WhatsApp / arama / yol tarifi bağlantıları,
- Google yorum linki alanı,
- QR üretim akışı,
- basit online menü yapısı,
- fotoğraf toplama akışı,
- admin görev listesi,
- bakım görevi oluşturma,
- basit durum raporu taslağı.

## 11.2 MVP’de Tam Otomatik Olması Gerekmeyenler

İlk MVP’de şu işler manuel veya yarı otomatik kalabilir:

- Google İşletme Profili’nde gerçek değişiklik yapmak,
- Instagram’da paylaşım yapmak,
- özel domain bağlamak,
- NFC kart basmak,
- yorum standı hazırlamak,
- gelir / gider sistemi,
- stok ve muhasebe modülleri,
- gelişmiş müşteri paneli,
- tüm WhatsApp otomasyonları,
- işletmenin kendi WhatsApp hattını ajana bağlama ve randevu karşılama modülü.

Bu işler sistemde modül olarak temsil edilmeli; ancak ilk gün tam otomasyon zorunlu olmamalıdır.

---
