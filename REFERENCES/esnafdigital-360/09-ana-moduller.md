> Aktif 360 bolum dosyasi.
> Durum: moduller sanal isletme ekibi / karar destek cekirdegiyle hizalandi.

---

# 9. Ana Modüller

EsnafDigital 360 tek tek hizmetlerin toplandığı bir liste gibi düşünülmemelidir. Modüller, işletme ajanının yönettiği karar destek, operasyon ve dijital çıktı parçaları olarak kurgulanır.

Bu bölümdeki modül grupları ürün mantığını kurmak içindir. Hangi sektörlerde hangi modüllerin daha güçlü olacağı ve paket önceliği daha sonra ayrıca GPT Pro ile değerlendirilecektir.

## 9.1 Çekirdek Agent Altyapısı

Bu grup ürünün temelidir. Bunlar olmadan EsnafDigital 360, klasik dijital hizmet paketine döner.

- gerçek OpenClaw İşletme Ajanı,
- ayrı agent workspace'i,
- ayrı agentDir ve session store,
- İşletme Ajanı Kaydı,
- işletme bilgi ve karar profili,
- izin/yetki profili,
- tool policy ve sandbox profili,
- kanal allowlist ve explicit binding,
- eksik bilgi takibi,
- görev, onay ve sonraki adım akışı,
- karar destek notları,
- sınırlı EsnafDigital API tool'ları,
- audit log,
- pause / kill switch.

## 9.2 Sanal İşletme Ekibi / Karar Destek Modülleri

Bu grup ana ürün değeridir.

İlk MVP'de tek ajan içinde şu bakışlar yeterlidir:

- genel yönetim / CEO danışmanı,
- finans,
- satış ve pazarlama,
- operasyon,
- satın alma,
- müşteri hizmetleri.

Ajan bu rollerle şunları üretir:

- karar sorusunu sınıflandırma,
- eksik bilgi listesi,
- departman bazlı kısa değerlendirme,
- 2-3 seçenek,
- riskler,
- maliyet/fayda notu,
- öneri,
- onay gereken noktalar,
- sıradaki görevler.

İleri aşamada İK, hukuk/uyum, BT/dijital, kalite, proje yönetimi ve kurumsal iletişim rolleri eklenebilir.

## 9.3 İlk MVP Görünür Çıktı Modülleri

Bu grup, agent'ın topladığı bilginin ve karar desteğinin müşteriye görünür ilk kanıtıdır. İlk MVP'de tam ürün modülü değil, taslak/preview seviyesinde çalışır.

- toparlanmış işletme özeti,
- karar destek notu,
- açık karar / görev / eksik listesi,
- web vitrini taslağı / preview,
- basit hizmet / ürün listesi,
- dinamik kısa link / QR hedef taslağı,
- fotoğraf ve medya talebi,
- kurulum özeti ve eksik listesi.

Bu çıktılar kusursuz olmak zorunda değildir; işletmenin yönetim ve dijital operasyonunun başladığını göstermelidir.

## 9.4 Dijital Varlık ve Görünürlük Modülleri

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

## 9.5 İletişim ve Müşteri Aksiyonu Modülleri

Bu grup müşterinin işletmeye daha kolay ulaşmasını ve işletmenin talepleri daha düzenli almasını destekler.

- arama / WhatsApp / yol tarifi bağlantıları,
- talep toplama akışı,
- kısa link / dinamik QR,
- yorum isteme materyalleri,
- müşteriye gönderilecek kısa bilgilendirme/rapor linkleri.

Randevu, rezervasyon, sipariş, ödeme veya işletmenin kendi WhatsApp hattını ajana bağlama gibi hassas akışlar ilk MVP'nin çekirdeği değildir; ileri modül olarak değerlendirilir.

## 9.6 Operasyon ve Bakım Modülleri

Bu grup kurulumdan sonra sistemin canlı kalmasını sağlar.

- aylık bakım takibi,
- eksik bilgi ve güncelleme hatırlatmaları,
- açık kararların takip edilmesi,
- içerik ve fotoğraf güncelleme talepleri,
- kısa durum raporu,
- operasyon ekibine görev aktarma,
- yayın/onay bekleyen işlerin takibi,
- işletme profilinin güncel tutulması.

İlk MVP'de bakım modülü tam otomatik değil; görev, eksik, karar ve takip mantığını kanıtlayacak kadar hafif tutulur.

## 9.7 İleri Ticari ve Sistem Modülleri

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

> Modüller ilk günden tek tek tam otomatik olmak zorunda değildir. MVP'de önemli olan, gerçek işletme ajanı modelinin işletmeyi anlayan, güvenli, izlenebilir, karar destekli ve müşteriye değer üreten şekilde çalıştığını kanıtlamaktır.
