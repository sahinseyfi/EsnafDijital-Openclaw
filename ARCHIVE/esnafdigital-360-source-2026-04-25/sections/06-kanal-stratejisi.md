# 6. Kanal Stratejisi

Bu sistemde kanal, ürünün kendisi değildir. Kanal sadece müşterinin ajana ulaşma yoludur.

## 6.1 Ticari Hedef Kanal: WhatsApp

Türkiye’de küçük işletme sahibi için en doğal kanal WhatsApp’tır.

Bu yüzden ticari ürün anlatımında hedef kanal WhatsApp olmalıdır. Ancak MVP’de her işletmeye ayrı WhatsApp hattı açılması zorunlu değildir; önce Telegram/test kanalı veya EsnafDigital’e ait pilot WhatsApp hattı üzerinden doğru işletme agent'ına yönlendirme doğrulanacaktır.

Buradaki pilot WhatsApp hattı, işletmelere hemen ayrı numara vermek değil; EsnafDigital’in kişisel numaradan bağımsız kullanacağı kontrollü test hattıdır.

WhatsApp üzerinden yapılacak işler:

- müşteriyle ilk temas,
- bilgi toplama,
- fotoğraf alma,
- menü bilgisi alma,
- çalışma saati güncelleme,
- web vitrini güncelleme talebi,
- QR / yorum linki gönderimi,
- bakım hatırlatmaları,
- kısa rapor paylaşımı,
- destek konuşmaları.

Müşteri vaadi:

> Panel öğrenmenize gerek yok. WhatsApp’tan yazın, dijital asistanınız sizi yönlendirsin.

İşletmenin kendi müşterilerine gösterilecek WhatsApp butonu ise ilk aşamada işletmenin kendi numarasına gider. İşletmenin kendi WhatsApp hattını ajana bağlamak, randevu ve karşılama amaçlı ileri modül olarak ayrıca değerlendirilir.

## 6.2 İlk Teknik MVP Kanalı: Telegram

İlk teknik geliştirme için Telegram daha hızlı ve esnek olabilir.

Telegram şu amaçla kullanılmalıdır:

- iç test,
- hızlı bot prototipi,
- demo müşteri denemesi,
- ajan konuşma akışı geliştirme,
- bilgi toplama senaryolarını doğrulama,
- OpenClaw runtime davranışını test etme.

Telegram, ticari kanal olarak zorunlu tutulmamalıdır. Müşteriye “Telegram kullanmalısın” demek satışta sürtünme oluşturabilir.

## 6.3 Doğru Mimari: Kanal Bağımsız Sistem

Sistemin kalbi WhatsApp veya Telegram olmamalıdır.

Sistemin kalbi:

> Business Profile + Business Agent + Module System + Task Engine

Kanal adaptörleri ayrı tutulmalıdır.

Desteklenecek kanallar:

- Telegram,
- WhatsApp,
- web panel,
- e-posta,
- ileride mobil uygulama.

Önemli kural:

> Ajanın mantığı kanalın içine yazılmayacak. Kanal sadece mesajı alacak, ajana iletecek ve ajan cevabını müşteriye geri gönderecek.

MVP kanal kararı:

> Kanal, agent mimarisinden ayrı yönetilir. İlk doğrulamada Telegram/test kanalı veya EsnafDigital pilot hattı kullanılabilir; mesaj routing/binding ile doğru işletme agent'ına yönlendirilir. WhatsApp ticari hedef kanal olarak kalır.

İleri opsiyon:

> İşletmenin kendi WhatsApp hattını ajana bağlama veya randevu karşılama ek kanal/modül paketi olabilir; ancak işletme başına gerçek agent/workspace kararı çekirdek mimaridir.

---
