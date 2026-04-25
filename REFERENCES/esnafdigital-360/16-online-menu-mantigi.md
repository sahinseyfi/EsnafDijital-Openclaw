> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

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

## 16.2 İlk Veri Yapısı

İlk sürümde her kayıt basit tutulmalıdır.

Temel alanlar:

- başlık,
- kategori,
- kısa açıklama,
- fiyat veya fiyat notu,
- fotoğraf / görsel,
- aktif / pasif durumu,
- öne çıkarılsın mı bilgisi,
- ek not veya şartlar.

Fiyat her işletme için zorunlu değildir. Bazı sektörlerde "fiyat için iletişime geçin", "teklif alınır" veya "proje bazlı" gibi notlar daha doğru olabilir.

## 16.3 Ajanın Rolü

İşletme ajanı bu bilgileri mesajlaşma üzerinden toplar ve düzenler.

Ajan:

- müşteriden listeyi parça parça ister,
- gelen dağınık bilgiyi kategoriye ayırır,
- eksik açıklama veya fotoğrafı belirtir,
- fiyat bilgisinin zorunlu olup olmadığını sorar,
- web vitrini veya katalog sayfası için kullanılabilir hale getirir,
- gerekirse operasyon görevi açar.

Örnek:

```text
Hizmet/katalog listenizi oluşturalım.
Bana ilk 3 kalemi şu şekilde gönderebilirsiniz:

Başlık:
Kategori:
Kısa açıklama:
Fiyat varsa:
Fotoğraf varsa:
```

## 16.4 İlk MVP Sınırı

İlk MVP'de bu yapı basit liste olarak çalışmalıdır.

İlk aşamada gerekli olmayanlar:

- sepet,
- online ödeme,
- stok takibi,
- gelişmiş varyasyon yönetimi,
- otomatik sipariş onayı,
- karmaşık rezervasyon sistemi.

Bu parçalar ileride sipariş, teklif veya randevu modülleriyle geliştirilebilir.

Ana prensip:

> Menü/katalog/hizmet listesi, işletmenin ne sunduğunu agent'ın topladığı verilerle düzenli ve paylaşılabilir hale getiren temel yapı olmalıdır.

---
