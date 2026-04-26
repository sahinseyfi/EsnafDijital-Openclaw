> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; draft_ready / approved_for_publish ayrimi netlestirildi.

---

# 15. Web Vitrini Mantığı

Web vitrini, sadece birkaç alanın doldurulduğu basit bir site sayfası olarak düşünülmemelidir. EsnafDigital 360 içinde web vitrini, işletme ajanının topladığı ve değerlendirdiği verilerden oluşan ilk görünür dijital çıktıdır.

Ajan; işletmeden, mevcut dijital izlerden, operasyondan ve gerekirse dış kaynaklardan gelen bilgileri toplar. Sonra bu bilgileri değerlendirerek işletmenin dijital profilini ve web vitrini taslağını oluşturur.

## 15.1 Web Vitrininin Amacı

Web vitrininin amacı kapsamlı kurumsal site yapmak değildir.

Amaç:

- işletmenin internette güvenilir görünmesini sağlamak,
- müşterinin doğru bilgiye hızlı ulaşmasını sağlamak,
- arama, mesajlaşma ve yol tarifi aksiyonlarını kolaylaştırmak,
- hizmet / katalog / ürün bilgisini düzenli göstermek,
- yorum ve QR akışına bağlantı vermek,
- işletmenin dijital operasyonu için merkezi bir başlangıç noktası oluşturmaktır.

## 15.2 Veriler Nasıl Oluşur?

Web vitrini, yalnızca müşterinin elle yazdığı bilgilerden oluşmaz.

Ajan şu kaynaklardan veri toplayabilir:

- işletme sahibinin mesajla verdiği bilgiler,
- işletme dijital profili,
- fotoğraf ve medya dosyaları,
- hizmet / katalog / ürün açıklamaları,
- Google / Maps / yorum / sosyal profil sinyalleri,
- operasyon ekibinin eklediği notlar,
- önceki görevler ve eksik bilgi listesi.

Ajan bu verileri değerlendirir, eksikleri belirler ve ilk vitrini oluşturmak için kullanılabilir hale getirir.

## 15.3 Web Vitrininde Bulunabilecek Alanlar

İlk sürümde web vitrini şu alanları taşıyabilir:

- işletme adı,
- kısa güven veren açıklama,
- hizmet / kategori / uzmanlık bilgisi,
- fotoğraflar veya fotoğraf eksikliği durumu,
- hizmetler,
- menü / katalog / ürün listesi,
- telefon butonu,
- mesajlaşma butonu,
- yol tarifi butonu,
- sosyal profil bağlantıları,
- Google yorum veya QR bağlantısı,
- çalışma saatleri,
- adres veya hizmet bölgesi,
- duyuru veya kampanya alanı,
- sık sorulan basit bilgiler.

Her işletmede tüm alanların dolu olması gerekmez. Ajan eksik alanları takip eder ve gerektiğinde tamamlatır.

## 15.4 Minimum Veri Modeli

İlk MVP'de web vitrini ayrı bir CMS gibi tasarlanmamalı. `web_vitrine_drafts` benzeri sade bir kayıt yeterlidir.

Minimum alanlar:

- `id`,
- `business_id`,
- `agent_record_id`,
- `status`,
- `template_key`,
- `template_version`,
- `business_display_name`,
- `short_description`,
- `category_label`,
- `hero_message`,
- `primary_phone`,
- `whatsapp_or_message_link`,
- `address_text`,
- `directions_link`,
- `opening_hours_note`,
- `service_list_id`,
- `featured_service_item_ids`,
- `media_slots_summary`,
- `social_links`,
- `review_link_ref`,
- `shortlink_draft_id`,
- `preview_url`,
- `public_url`,
- `missing_fields`,
- `quality_flags`,
- `approval_id`.

`public_url` ilk MVP'de boş kalabilir. Agent'ın ana çıktısı preview/taslak üretmektir.

## 15.5 Taslak Hazır Kriteri

`draft_ready`, yayına alınabilir demek değildir. Sadece ilk görünür önizlemenin üretilebildiğini gösterir.

Taslak hazır olmak için minimum:

- işletme adı veya gösterilecek ad,
- kısa açıklama,
- en az bir iletişim aksiyonu,
- en az bir hizmet / ürün / kategori,
- preview üretilebilirliği,
- eksik alan listesinin oluşması.

Fotoğraf, tam adres, çalışma saatleri, Google yorum linki veya sosyal medya linkleri taslak için zorunlu değildir.

## 15.6 Yayına Hazır Kriteri

`approved_for_publish` eşiği daha yüksektir.

Yayına hazır olmak için minimum:

- işletme adı doğrulanmış,
- kısa açıklama kabul edilebilir,
- telefon veya mesajlaşma bağlantısı test edilmiş,
- adres veya hizmet bölgesi netleşmiş,
- en az 1-3 hizmet / ürün / kategori var,
- yanıltıcı fiyat, garanti veya iddia yok,
- public görünüm admin tarafından kontrol edilmiş,
- müşteri/kurucu/operasyon onayı alınmış,
- approval kaydı tamamlanmış.

İlk MVP'de web vitrini otomatik yayına alınmaz. Agent yalnızca `generate_web_preview` ile önizleme üretir. Yayın işi manuel admin aksiyonu veya ileride ayrı güvenli executor işi olmalıdır.

## 15.7 Ajanın Web Vitrini İçindeki Rolü

İşletme ajanı web vitrini için sadece bilgi taşımaz; bilgiyi düzenler.

Ajanın görevi:

- gelen bilgileri anlamak,
- eksik alanları sormak,
- tekrar eden veya karışık bilgileri toparlamak,
- müşterinin dilini daha güven veren açıklamalara çevirmek,
- hizmet/katalog bilgisini düzenlemek,
- fotoğraf ve içerik ihtiyacını belirtmek,
- web vitrini taslağı için preview üretmek veya operasyon görevi açmak,
- canlı yayın veya public değişiklik için approval istemektir.

Örnek:

```text
Elinizdeki bilgilerle web vitrininizin ilk taslağı hazırlanabilir.
Eksik kalanlar:
1. 3-5 kaliteli işletme fotoğrafı
2. Ana hizmet/katalog listesinin ilk hali
3. Çalışma saatlerinin güncel hali
```

## 15.8 İlk MVP Sınırı

İlk MVP'de web vitrini basit, mobil uyumlu ve güven veren bir preview/taslak olmalıdır.

İlk aşamada hedef:

- hızlı oluşması,
- kolay güncellenmesi,
- işletme ajanının topladığı veriden beslenmesi,
- iletişim ve görünürlük aksiyonlarını taşıması,
- teknik panel gerektirmeden mesajlaşma üzerinden güncellenebilmesidir.

İlk MVP'de gerekli olmayanlar:

- çok sayfalı kurumsal site,
- gelişmiş CMS / sayfa builder,
- blog / haber yönetimi,
- gelişmiş SEO paneli,
- çoklu dil,
- otomatik domain/DNS bağlama,
- otomatik Google/Maps güncelleme,
- gelişmiş form/lead yönetimi.

Ana prensip:

> Web vitrini, agent'ın topladığı ve değerlendirdiği işletme verilerinden oluşan güven sayfasıdır; klasik anlamda tek başına satılan web sitesi değildir.
