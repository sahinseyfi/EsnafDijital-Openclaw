> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; basit hizmet/urun listesi ve fiyat opsiyonelligi netlestirildi.

---

# 16. Menü / Katalog / Hizmet Listesi Mantığı

Bu bölüm yalnızca restoran veya kafe menüsü olarak düşünülmemelidir. EsnafDigital 360'ın hedefi daha geniş olduğu için bu yapı, işletmenin sunduğu şeyi düzenli göstermeye yarayan genel bir liste mantığıdır.

Farklı işletmelerde adı değişebilir:

- kafe / restoran için menü,
- üretici veya satıcı için katalog,
- teknik servis için hizmet listesi,
- danışmanlık için paketler,
- klinik veya randevulu işletme için hizmet başlıkları,
- atölye veya özel imalat için ürün / çalışma örnekleri.

## 16.1 Amaç

Amaç gelişmiş e-ticaret veya sipariş sistemi kurmak değildir.

İlk amaç:

- işletmenin sunduğu ürün veya hizmetleri düzenli göstermek,
- müşterinin ne sunulduğunu hızlı anlamasını sağlamak,
- web vitrini için içerik üretmek,
- QR / kısa link / mesajlaşma akışında paylaşılabilir bir yapı oluşturmak,
- ileride teklif, sipariş veya randevu akışına temel hazırlamaktır.

## 16.2 Minimum Veri Modeli

İlk MVP'de iki sade yapı yeterlidir:

```text
service_lists
service_item_drafts
```

### `service_lists`

Minimum alanlar:

- `id`,
- `business_id`,
- `agent_record_id`,
- `list_type`,
- `display_title`,
- `status`,
- `items_count`,
- `featured_item_count`,
- `missing_fields`,
- `created_at`,
- `updated_at`.

### `service_item_drafts`

Minimum alanlar:

- `id`,
- `business_id`,
- `service_list_id`,
- `title`,
- `category`,
- `short_description`,
- `price_amount`,
- `price_currency`,
- `price_note`,
- `media_ref`,
- `media_status`,
- `is_active`,
- `is_featured`,
- `sort_order`,
- `source`,
- `confidence`,
- `needs_review`.

## 16.3 Fiyat Kuralı

Fiyat her işletme için zorunlu değildir. Bazı sektörlerde `fiyat için iletişime geçin`, `teklif alınır` veya `proje bazlı` gibi notlar daha doğru olabilir.

Kural:

```text
price_amount = nullable
price_note = price_amount yoksa önerilir
```

Ajan müşteriyi fiyat vermeye zorlamaz.

Örnek:

```text
Fiyatları şimdi eklemek zorunda değiliz.
İsterseniz bu kalemler için “fiyat için iletişime geçin” notuyla ilerleyebilirim.
```

## 16.4 Ajanın Rolü

İşletme ajanı bu bilgileri mesajlaşma üzerinden toplar ve düzenler.

Ajan:

- müşteriden listeyi parça parça ister,
- ilk turda tüm katalog yerine ilk 1-3 kalemi ister,
- gelen dağınık bilgiyi kategoriye ayırır,
- eksik açıklama veya fotoğrafı belirtir,
- fiyat bilgisinin zorunlu olup olmadığını sorar,
- web vitrini veya liste sayfası için kullanılabilir hale getirir,
- gerekirse operasyon görevi veya medya talebi açar.

Örnek:

```text
Hizmet listenizin ilk halini çıkaralım.
Tam liste şart değil; ilk 3 kalem yeterli.

Bana şu formatta yazabilirsiniz:
- Hizmet/ürün adı
- Kısa açıklama
- Fiyat varsa fiyat, yoksa “iletişime geçin”
```

## 16.5 Taslak Hazır Kriteri

Hizmet / ürün listesi `draft_ready` sayılmak için:

- en az bir kalem olmalı,
- her kalemde `title` olmalı,
- varsa kısa açıklama eklenmeli,
- fiyat yoksa fiyat notu kullanılabilmeli,
- eksik görsel/fotoğraf medya talebi olarak görünmeli.

İlk MVP'de ideal başlangıç 1-3 kalemdir.

## 16.6 İlk MVP Sınırı

İlk MVP'de bu yapı basit liste olarak çalışmalıdır.

İlk aşamada gerekli olmayanlar:

- sepet,
- online ödeme,
- stok takibi,
- gelişmiş varyasyon yönetimi,
- otomatik sipariş onayı,
- karmaşık rezervasyon sistemi,
- gelişmiş fiyat kuralları,
- kampanya motoru.

Bu parçalar ileride sipariş, teklif veya randevu modülleriyle geliştirilebilir.

Ana prensip:

> Menü/katalog/hizmet listesi, işletmenin ne sunduğunu agent'ın topladığı verilerle düzenli ve paylaşılabilir hale getiren temel yapı olmalıdır.
