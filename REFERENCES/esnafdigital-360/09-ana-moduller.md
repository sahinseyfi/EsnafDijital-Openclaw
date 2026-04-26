> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; cekirdek, taslak cikti ve ileri moduller ayrildi.

---

# 9. Ana Modüller

EsnafDigital 360 tek tek hizmetlerin toplandığı bir liste gibi düşünülmemelidir. Modüller, işletme ajanının yönettiği dijital operasyon parçaları olarak kurgulanır.

Bu bölümdeki modül grupları ürün mantığını kurmak içindir. Hangi sektörlerde hangi modüllerin daha güçlü olacağı ve paket önceliği daha sonra ayrıca GPT Pro ile değerlendirilecektir.

## 9.1 Çekirdek Agent Altyapısı

Bu grup ürünün temelidir. Bunlar olmadan EsnafDigital 360, klasik dijital hizmet paketine döner.

- gerçek OpenClaw İşletme Ajanı,
- ayrı agent workspace'i,
- ayrı agentDir ve session store,
- İşletme Ajanı Kaydı,
- işletme dijital profili,
- izin/yetki profili,
- tool policy ve sandbox profili,
- kanal allowlist ve explicit binding,
- eksik bilgi takibi,
- görev, onay ve sonraki adım akışı,
- sınırlı EsnafDigital API tool'ları,
- audit log,
- pause / kill switch.

## 9.2 İlk MVP Görünür Çıktı Modülleri

Bu grup, agent'ın topladığı bilginin müşteriye görünür ilk kanıtıdır. İlk MVP'de tam ürün modülü değil, taslak/preview seviyesinde çalışır.

- toparlanmış işletme özeti,
- web vitrini taslağı / preview,
- basit hizmet / ürün listesi,
- dinamik kısa link / QR hedef taslağı,
- fotoğraf ve medya talebi,
- kurulum özeti ve eksik listesi.

Bu çıktılar kusursuz olmak zorunda değildir; işletmenin dijital operasyonunun başladığını göstermelidir.

## 9.3 Dijital Varlık ve Görünürlük Modülleri

Bu grup işletmenin internette güvenilir, güncel ve ulaşılabilir görünmesini sağlar.

- web vitrini,
- Google / Maps görünürlük kontrolü,
- temel işletme bilgileri düzeni,
- yorum linki ve QR akışı,
- Instagram / sosyal profil düzeni,
- fotoğraf ve medya toparlama,
- menü / katalog / hizmet listesi,
- özel domain veya alt alan adı.

İlk MVP'de Google/Maps/Instagram/domain gibi dış etkili işler otomatik yapılmaz; bilgi toplama, taslak, görev veya approval seviyesinde kalır.

## 9.4 İletişim ve Müşteri Aksiyonu Modülleri

Bu grup müşterinin işletmeye daha kolay ulaşmasını ve işletmenin talepleri daha düzenli almasını destekler.

- arama / WhatsApp / yol tarifi bağlantıları,
- talep toplama akışı,
- kısa link / dinamik QR,
- yorum isteme materyalleri,
- müşteriye gönderilecek kısa bilgilendirme/rapor linkleri.

Randevu, rezervasyon, sipariş, ödeme veya işletmenin kendi WhatsApp hattını ajana bağlama gibi hassas akışlar ilk MVP'nin çekirdeği değildir; ileri modül olarak değerlendirilir.

## 9.5 Operasyon ve Bakım Modülleri

Bu grup kurulumdan sonra sistemin canlı kalmasını sağlar.

- aylık bakım takibi,
- eksik bilgi ve güncelleme hatırlatmaları,
- içerik ve fotoğraf güncelleme talepleri,
- basit durum raporu,
- operasyon ekibine görev aktarma,
- yayın/onay bekleyen işlerin takibi,
- işletme profilinin güncel tutulması.

İlk MVP'de bakım modülü tam otomatik değil; görev ve takip mantığını kanıtlayacak kadar hafif tutulur.

## 9.6 İleri Ticari ve Sistem Modülleri

Bu grup sistem vizyonunda tutulur; ancak ilk MVP'nin zorunlu parçası sayılmaz.

- gelişmiş müşteri paneli,
- self-service içerik yönetimi,
- işletmenin kendi WhatsApp hattını ajana bağlama,
- WhatsApp Randevu Asistanı,
- gelişmiş menü/katalog sistemi,
- sipariş veya teklif akışı,
- ödeme, sepet veya stok akışı,
- gelir / gider ekranı,
- tahsilat / muhasebe modülleri,
- gelişmiş entegrasyonlar,
- satış temsilcisi veya yönlendirme modeli.

Ana prensip:

> Modüller ilk günden tek tek tam otomatik olmak zorunda değildir. MVP'de önemli olan, gerçek işletme ajanı modelinin güvenli, izlenebilir, operasyonel ve müşteriye değer üreten şekilde çalıştığını kanıtlamaktır.
