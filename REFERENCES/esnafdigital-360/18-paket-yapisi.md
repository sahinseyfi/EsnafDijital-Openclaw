> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; paketleme taslak/kurulum/bakim/ek modul siniriyla netlestirildi. Segment ve fiyat dili daha sonra GPT Pro ile degerlendirilecek.

---

# 18. Paket Yapısı

Paket yapısı, özellikleri yan yana dizen klasik ajans menüsü gibi olmamalıdır. EsnafDigital 360 paketleri, işletmenin dijital operasyonunu ajanla kurma ve canlı tutma mantığına göre düşünülmelidir.

İlk aşamada fiyat değil, kapsam mantığı netleştirilir. Segment, fiyatlandırma ve paket isimleri ayrıca değerlendirilecektir.

## 18.1 Ajan Kurulum Paketi

Bu paket, işletmenin dijital operasyonunu başlatan temel kurulum paketidir.

İlk MVP'de içerik şu çekirdeğe dayanır:

- işletmeye özel OpenClaw İşletme Ajanı,
- ayrı workspace,
- ayrı agentDir / session,
- İşletme Ajanı Kaydı,
- işletme dijital profili,
- pilot mesajlaşma bağlantısı,
- kanal allowlist / explicit binding,
- sınırlı EsnafDigital API tool'ları,
- audit / onay / kill switch,
- bilgi toplama akışı,
- eksik bilgi ve görev takibi,
- web vitrini taslağı,
- arama / mesajlaşma / yol tarifi bağlantıları,
- dinamik kısa link / QR hedef taslağı,
- menü / katalog / hizmet listesi için temel yapı,
- fotoğraf ve içerik toplama akışı,
- basit kurulum özeti veya durum raporu.

Bu paketin amacı her şeyi tam otomatik yapmak değil; işletmenin dijital operasyonunu ajan merkezli şekilde çalışır hale getirmektir.

## 18.2 Ajan Bakım Paketi

Bu paket, kurulumdan sonra işletmenin dijital varlığını canlı tutmak içindir.

İçerik:

- belirli aralıklarla dijital kontrol,
- web vitrini güncelleme talepleri,
- menü / katalog / hizmet listesi güncellemeleri,
- fotoğraf ve içerik güncellemeleri,
- dinamik QR / NFC hedef kontrolü,
- Google / Maps / yorum linki kontrolü,
- eksik bilgi ve bakım hatırlatmaları,
- kısa durum raporu,
- mesajlaşma üzerinden destek,
- operasyon ekibine görev aktarma.

Bu paket, işletmenin dijital düzeninin kurulduktan sonra eskimesini engeller.

## 18.3 Ek Fiziksel ve Görsel Çıktılar

Bu işler kuruluma eklenebilir, ancak ilk MVP'nin yazılım çekirdeği değildir.

- NFC kart,
- dinamik QR/NFC yönlendirme standı,
- masaüstü kart,
- kartvizit,
- basit logo veya görsel düzenleme,
- basılı yönlendirme materyalleri,
- ek fotoğraf veya içerik düzenleme.

Bu çıktılar sistemde görev olarak takip edilir; fiziksel üretim ve teslimat operasyon işi olarak yürür.

## 18.4 İleri Modüller ve Üst Paketler

Bunlar ileride üst paket veya ayrı modül olarak sunulabilir:

- işletmenin kendi WhatsApp hattını ajana bağlama,
- WhatsApp Randevu Asistanı,
- gelişmiş katalog / sipariş / teklif akışı,
- gelişmiş müşteri paneli,
- self-service içerik yönetimi,
- düzenli sosyal medya içerik desteği,
- ödeme, randevu veya rezervasyon modülleri,
- gelir / gider,
- stok / tahsilat / muhasebe,
- gelişmiş entegrasyonlar,
- satış temsilcisi veya yönlendirme modeli.

Bu parçalar MVP kabul standardı geçmeden ana pakete taşınmamalıdır.

## 18.5 Paketleme Prensibi

Paketler sade kalmalıdır.

Ana mantık:

1. **Kurulum:** işletme ajanı ve ilk dijital operasyon kurulur.
2. **Bakım:** bu yapı canlı tutulur.
3. **Ekler:** fiziksel, görsel veya ileri modüller ihtiyaca göre eklenir.

Satış dilinde dikkat edilecek sınır:

- “Her şeyi otomatik yapan yapay zeka” denmez.
- “Sadece web sitesi paketi” gibi anlatılmaz.
- Canlı yayın, QR hedef aktivasyonu ve dış hesap değişikliği onaylı/operasyonel iş olarak anlatılır.
- Web vitrini, hizmet listesi ve QR/kısa link ilk aşamada agent'ın topladığı bilginin görünür çıktılarıdır.

Ana prensip:

> EsnafDigital 360 paketleri, tek tek hizmet satmak yerine işletmenin dijital operasyonunu ajanla kurma ve sürdürme değerini taşımalıdır.
