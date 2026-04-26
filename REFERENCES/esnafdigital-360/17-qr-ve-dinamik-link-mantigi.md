> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; shortlink taslagi, approval ve fiziksel sinir netlestirildi.

---

# 17. Dinamik QR / NFC ve Kısa Link Mantığı

EsnafDigital 360 içinde QR ve NFC sistemi basit, sabit hedefli bağlantı olarak kurgulanmamalıdır. Ana karar, QR ve NFC'nin dinamik kısa link üzerinden çalışmasıdır.

Yani QR kod veya NFC etiketi doğrudan Google yorum linkine, WhatsApp'a veya menüye gitmez. Önce EsnafDigital kısa linkine gider; bu kısa linkin hedefi panelden değiştirilebilir.

Örnek:

```text
esnafdigital.com/q/abc123
```

Bu sayede aynı basılı QR etiketi, NFC kartı, masaüstü kart veya stand değiştirilmeden farklı hedeflere yönlendirilebilir. Ancak ilk MVP'de fiziksel üretim değil, kısa link ve hedef taslağı doğrulanır.

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

- web vitrini,
- Google yorum linki,
- menü / katalog / hizmet listesi,
- WhatsApp veya mesajlaşma linki,
- kampanya sayfası,
- randevu / rezervasyon linki,
- özel bilgilendirme sayfası,
- geçici duyuru veya form.

İlk MVP için varsayılan hedef çoğu durumda web vitrini taslağı veya web vitrini yayınıdır. Google yorum, WhatsApp veya kampanya hedefleri daha sonra taslak/approval olarak ele alınabilir.

## 17.3 Minimum Veri Modeli

İlk MVP'de iki temel kayıt yeterlidir:

```text
shortlinks
shortlink_target_drafts
```

### `shortlinks`

Minimum alanlar:

- `id`,
- `business_id`,
- `agent_record_id`,
- `slug`,
- `short_url`,
- `status`,
- `current_target_id`,
- `pending_target_draft_id`,
- `qr_asset_id`,
- `created_at`,
- `updated_at`.

### `shortlink_target_drafts`

Minimum alanlar:

- `id`,
- `business_id`,
- `shortlink_id`,
- `target_type`,
- `target_ref_id`,
- `target_url`,
- `target_label`,
- `reason`,
- `status`,
- `risk_level`,
- `approval_id`,
- `created_by`,
- `created_at`,
- `updated_at`.

QR görseli için ileride `qr_assets` benzeri hafif kayıt eklenebilir. Fiziksel NFC kart veya baskı işi bu veri modelinin çekirdeği değildir.

## 17.4 Ajanın Rolü

İşletme ajanı QR veya NFC hedefini doğrudan keyfi şekilde değiştirmez.

Ajanın rolü:

- işletmenin QR / NFC ihtiyacını anlamak,
- hangi hedefin daha mantıklı olduğunu önermek,
- kısa link / hedef taslağı oluşturmak,
- hedef değişikliği talebini kaydetmek,
- gerekirse operasyon görevi açmak,
- riskli veya müşteri gören değişikliklerde onay istemektir.

Örnek:

```text
QR için ilk hedefi web vitrininiz olarak önerebilirim.
Daha sonra aynı QR'ı Google yorum linkine veya kampanya sayfasına çevirmek mümkün olur.

Canlı hedef değişikliği müşterilerinizin göreceği bir işlem olduğu için onayla ilerler.
```

## 17.5 Approval Kuralları

Kural net olmalıdır:

```text
Taslak oluşturmak: approval gerekmez.
Canlı kısa link hedefini değiştirmek: approval gerekir.
Fiziksel QR/NFC materyale basılacak hedefi kesinleştirmek: approval gerekir.
Müşterilerin göreceği yönlendirmeyi değiştirmek: approval gerekir.
```

Approval gerektiren örnekler:

- aktif kısa link hedefini değiştirmek,
- Google yorum linkine canlı yönlendirmek,
- WhatsApp linkine canlı yönlendirmek,
- kampanya sayfasına canlı yönlendirmek,
- public web vitrini değişince QR hedefini otomatik değiştirmek,
- fiziksel materyal basımına göndermek.

## 17.6 MVP Sınırı

İlk MVP'de dinamik QR / NFC için yeterli olan şudur:

- işletme için kısa link taslağı üretmek,
- hedef taslağı oluşturmak,
- QR görselini kısa linkten oluşturabilmek,
- hedef değişikliklerini kayıt altında tutmak,
- QR'nin web vitrini veya yorum akışıyla bağlantısını taslak seviyesinde kurmak.

İlk aşamada zorunlu olmayanlar:

- canlı hedef aktivasyonunu agent'a açmak,
- NFC fiziksel üretimi,
- gelişmiş analitik,
- kampanya raporları,
- A/B test,
- çoklu QR performans takibi,
- otomatik hedef optimizasyonu.

## 17.7 Fiziksel Materyaller

QR standı, NFC kart, masaüstü kart veya basılı materyal ilk MVP'de manuel operasyon olarak kalabilir.

Sistem dinamik kısa linki ve QR görselini üretebilir; NFC kartın yazımı, fiziksel üretim ve teslimat operasyon işi olarak takip edilir.

Ana prensip:

> QR ve NFC sistemi sabit link üretmek için değil, işletmenin farklı dönemlerde farklı dijital aksiyonlara yönlendirebileceği esnek ve onaylı bir geçiş kapısı olarak tasarlanmalıdır.
