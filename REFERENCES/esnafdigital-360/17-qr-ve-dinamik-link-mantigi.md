> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; sabit QR/NFC mantigi kaldirildi, dinamik kisa link temel karar yapildi.

---

# 17. Dinamik QR / NFC ve Kısa Link Mantığı

EsnafDigital 360 içinde QR ve NFC sistemi basit, sabit hedefli bağlantı olarak kurgulanmamalıdır. Ana karar, QR ve NFC'nin dinamik kısa link üzerinden çalışmasıdır.

Yani QR kod veya NFC etiketi doğrudan Google yorum linkine, WhatsApp'a veya menüye gitmez. Önce EsnafDigital kısa linkine gider; bu kısa linkin hedefi panelden değiştirilebilir.

Örnek:

```text
esnafdigital.com/q/abc123
```

Bu sayede aynı basılı QR etiketi, NFC kartı, masaüstü kart veya stand değiştirilmeden farklı hedeflere yönlendirilebilir.

## 17.1 Neden Dinamik QR / NFC?

Dinamik QR / NFC daha doğru seçenektir çünkü:

- basılı veya fiziksel materyal değişmeden hedef değişebilir,
- işletme ihtiyacına göre yönlendirme güncellenebilir,
- aynı QR farklı dönemlerde farklı amaçla kullanılabilir,
- agent veya operasyon hedef değişikliği talebini takip edebilir,
- ileride tıklama, kullanım ve kampanya takibi eklenebilir.

Basit/sabit QR veya NFC ilk bakışta kolay görünür; ancak ileride esneklik kaybettirir. Bu yüzden çekirdek tasarım dinamik kısa link üzerine kurulmalıdır.

## 17.2 Kullanım Senaryoları

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

## 17.3 Ajanın Rolü

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

## 17.4 MVP Sınırı

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

## 17.5 Fiziksel Materyaller

QR standı, NFC kart, masaüstü kart veya basılı materyal ilk MVP'de manuel operasyon olarak kalabilir.

Sistem dinamik kısa linki ve QR görselini üretir; NFC kartın yazımı, fiziksel üretim ve teslimat operasyon işi olarak takip edilir.

Ana prensip:

> QR ve NFC sistemi sabit link üretmek için değil, işletmenin farklı dönemlerde farklı dijital aksiyonlara yönlendirebileceği esnek bir geçiş kapısı olarak tasarlanmalıdır.

---
