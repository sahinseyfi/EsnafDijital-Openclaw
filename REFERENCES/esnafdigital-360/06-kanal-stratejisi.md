> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; pilot kanal, allowlist ve sanal isletme ekibi mesaji netlestirildi.

---

# 6. Kanal Stratejisi

Kanal, EsnafDigital 360'ın kendisi değildir. Kanal sadece işletme sahibinin kendi özel işletme ajanına ulaşma yoludur.

Ürünün kalbi şu parçalardır:

- İşletme Dijital Profili,
- gerçek OpenClaw İşletme Ajanı,
- İşletme Ajanı Kaydı,
- modül sistemi,
- açık karar ve karar destek notu akışı,
- görev, onay ve takip akışı.

WhatsApp, Telegram, webchat veya başka bir kanal bu çekirdeğin üzerine bağlanan iletişim kapılarıdır. Ajan mantığı kanal içine gömülmez.

## 6.1 Ticari Hedef Kanal

Ticari anlatımda en doğal hedef kanal WhatsApp'tır. Çünkü Türkiye'de işletme sahipleri ve ekipleri için en düşük sürtünmeli iletişim kanalı genelde WhatsApp'tır.

Ancak bu, MVP'de her işletmeye hemen ayrı WhatsApp hattı açılacağı veya işletmenin kendi WhatsApp hattının ajana bağlanacağı anlamına gelmez.

İlk doğrulama şu kanallardan biriyle yapılabilir:

- Telegram/test kanalı,
- webchat veya iç test kanalı,
- EsnafDigital'e ait pilot WhatsApp hattı.

Önemli olan kanal değil, mesajın doğru işletme ajanına yönlenmesi ve ajanın işletme bağlamıyla doğru işi ilerletmesidir.

## 6.2 Kanal Güvenliği

İlk MVP'de kanal güvenliği basit ama sert olmalıdır:

- yetkili gönderici allowlist veya pairing ile sınırlandırılır,
- explicit binding kullanılır,
- yanlış veya yetkisiz gönderici gerçek işletme ajanına düşmez,
- fallback varsa no-tool / quarantine mantığında çalışır,
- kanal routing hatası P0 bloklayıcı sayılır.

Kanal binding, işletme ajanı izolasyonunun önemli parçasıdır; tek başına güvenlik sınırı değildir ama yanlış kurgulanırsa veri karışması riski doğurur.

## 6.3 Mesajlaşma Üzerinden Yapılacak İşler

İşletme sahibi, panel öğrenmeden mesajlaşma üzerinden şu işleri ilerletebilmelidir:

- ilk kurulum bilgilerini verme,
- işletme bilgilerini güncelleme talebi açma,
- fotoğraf ve içerik gönderme,
- menü / katalog / hizmet bilgisi verme,
- çalışma saati veya iletişim bilgisi güncelleme,
- web vitrini güncelleme talebi açma,
- QR / yorum linki taslağını görme,
- bakım ihtiyaçlarını bildirme,
- karar sorusu sorma ve karar destek notu alma,
- kısa durum raporu alma,
- eksik bilgi ve sonraki adımları görme.

Müşteriye verilecek sade mesaj:

> Panel öğrenmenize gerek yok. Özel işletme ajanınızla mesajlaşın; karar sorularınız, dijital kurulum, görünürlük, içerik ve bakım işleriniz sistemli şekilde ilerlesin.

## 6.4 Kanal Bağımsız Mimari

Sistem WhatsApp'a, Telegram'a veya tek bir kanala bağımlı kurulmaz.

Kanalın görevi sadece şudur:

1. mesajı almak,
2. göndereni ve bağlı işletmeyi anlamak,
3. doğru işletme ajanına yönlendirmek,
4. ajanın cevabını veya istediği bilgiyi işletme sahibine geri iletmek.

Desteklenebilecek kanallar:

- Telegram,
- WhatsApp,
- webchat,
- e-posta,
- ileride mobil uygulama.

## 6.5 İlk MVP Kanal Kararı

İlk MVP'de kanal kararı, agent mimarisinden ayrı ele alınır.

Çekirdek karar:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı, ayrı workspace/agentDir/session ve explicit routing/binding çalışacaktır. Mesaj hangi kanaldan gelirse gelsin, doğru işletme ajanına gider.

İlk teknik doğrulama Telegram/test kanalı veya webchat ile yapılabilir. Ticari hedefte WhatsApp önemli kanal olarak kalır.

İşletmenin kendi WhatsApp hattını ajana bağlamak, müşteri karşılama, randevu veya sipariş akışı gibi daha hassas senaryolar ayrı ek kanal/modül paketi olarak ele alınır.
