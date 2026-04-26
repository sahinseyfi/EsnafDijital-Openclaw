> Aktif 360 bolum dosyasi.
> Durum: MVP tanimi sanal isletme ekibi / karar destek kanitiyla guncellendi.

---

# 11. İlk MVP Tanımı

EsnafDigital 360 MVP'si yalnızca web vitrini, QR üretimi veya çalışan bir sohbet botu değildir. MVP'nin amacı, bir işletme için özel işletme ajanı kurulumunun ve bu ajan üzerinden işletme yönetimi, karar destek ve dijital operasyon başlangıcının gerçekten çalıştığını göstermektir.

MVP'nin ana kabul cümlesi şudur:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı modeli güvenli, izlenebilir, operasyonel, karar destekli ve müşteriye görünür ilk değer üretecek şekilde baştan sona çalışmalıdır.

## 11.1 MVP'nin Tek Net Senaryosu

İlk MVP şu senaryoyu çalıştırmalıdır:

> Bir test işletmesi sisteme kaydedilir. Bu işletme için gerçek OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir/session ve İşletme Ajanı Kaydı oluşturulur. İşletme sahibi pilot mesajlaşma kanalı üzerinden doğru işletme ajanına yönlendirilir. Ajan kısa konuşmalarla işletmenin temel bilgilerini ve bir gerçek karar sorusunu toplar. Toplanan bilgiler işletme bilgi/karar profiline, eksik listesine, görevlere, karar destek notuna, onay kayıtlarına ve ilk görünür dijital çıktılara dönüşür. Riskli işler otomatik yapılmaz; onay veya operasyon devrine düşer.

Bu senaryo çalışmadan MVP tamamlanmış sayılmaz.

## 11.2 MVP'nin Çekirdeğinde Kesin Olacak Parçalar

MVP'nin çekirdeğinde şu parçalar bulunmalıdır:

- tek gerçek veya gerçeğe çok yakın test işletmesi,
- işletme kayıt modeli,
- işletme bilgi ve karar profili,
- gerçek OpenClaw İşletme Ajanı,
- ayrı agent workspace'i,
- ayrı agentDir ve session store,
- İşletme Ajanı Kaydı,
- agent workspace şablonu,
- otomatik veya yarı otomatik agent kurulum akışı,
- işletme bazlı ayrı oturum ve hafıza,
- sıkı tool/yetki profili,
- pilot mesajlaşma kanalı,
- explicit routing/binding ile doğru işletme ajanına yönlendirme,
- kanal allowlist veya pairing,
- sınırlı EsnafDigital API tool'ları,
- EsnafDigital API tarafında tenant/business yetki kontrolü,
- audit log,
- onay kuyruğu,
- pause / kill switch,
- admin görev ve eksik bilgi görünürlüğü,
- en az bir karar destek notu,
- web vitrini taslağı,
- basit hizmet / ürün listesi taslağı,
- dinamik kısa link / QR hedef taslağı,
- fotoğraf ve içerik toplama akışı,
- kısa kurulum özeti veya durum raporu.

## 11.3 İlk Karar Destek Kanıtı

MVP'de agent en az bir gerçek işletme kararını ele almalıdır.

Örnek karar soruları:

- Bu ekipmanı almalı mıyım?
- Bu ay hangi ürünü/hizmeti öne çıkarmalıyım?
- Fiyat artırmam doğru olur mu?
- Bu kampanya kârlı olur mu?
- Yeni personel almam gerekiyor mu?
- Google yorumlarım düşük, ne yapmalıyım?

Karar destek çıktısı en az şu yapıyı taşımalıdır:

1. kararın konusu,
2. eksik bilgiler,
3. ilgili departman bakışları,
4. 2-3 seçenek,
5. riskler,
6. öneri,
7. onay/uzman kontrolü gerektiren noktalar,
8. sıradaki görevler.

İlk MVP'de finans, hukuk, vergi veya satın alma gibi alanlarda kesin karar verilmez; yalnız ön değerlendirme ve karar desteği sağlanır.

## 11.4 İlk Görünür Dijital Çıktıların Sınırı

İlk MVP'de görünür dijital çıktılar tam ürün modülü gibi değil, agent'ın topladığı bilginin görünür kanıtı olarak ele alınmalıdır.

Minimum görünür çıktı sırası:

1. toparlanmış işletme özeti,
2. karar destek notu,
3. ilk hizmet / ürün listesi,
4. web vitrini taslağı,
5. dinamik kısa link / QR hedef taslağı,
6. kurulum özeti ve eksik listesi.

Bu çıktılar için sınır şudur:

- Web vitrini **preview / taslak** olarak üretilebilir; otomatik canlı yayın yapılmaz.
- Fotoğraf yoksa web vitrini taslağı yine oluşabilir; fotoğraf eksikliği medya talebi olarak izlenir.
- Hizmet / ürün listesi tam katalog değildir; ilk 1-3 kalem bile taslak için yeterli olabilir.
- Fiyat zorunlu değildir; gerekirse `fiyat için iletişime geçin`, `teklif alınır` veya `proje bazlı` notu kullanılabilir.
- Dinamik kısa link / QR hedefi taslak olarak oluşturulur; canlı hedef aktivasyonu onay ister.
- Kurulum özeti, tamamlananları, karar notlarını, eksikleri ve sıradaki adımı açıkça göstermelidir.

## 11.5 MVP'de Yarı Otomatik veya Manuel Kalabilecekler

İlk MVP'de şu işler sistemde takip edilir; ancak tamamen otomatik olmak zorunda değildir:

- satın alma veya ekipman kararı uygulamak,
- ödeme, para transferi veya sözleşme işlemi yapmak,
- vergi, hukuk, ruhsat veya resmi başvuru işi yapmak,
- Google İşletme Profili'nde gerçek değişiklik yapmak,
- Instagram veya sosyal medya hesabında paylaşım yapmak,
- özel domain bağlamak,
- NFC kart veya fiziksel yorum standı hazırlamak,
- profesyonel logo / kartvizit / tasarım çıktıları üretmek,
- düzenli içerik paylaşımı yapmak,
- müşteri adına dış hesaba giriş yapmak,
- kesin randevu veya ticari taahhüt oluşturmak,
- web vitrini yayını almak,
- QR hedefini canlıya almak.

Bu işlerde ajan bilgi toplar, taslak üretir, karar notu hazırlar, görev açar veya onay kaydı oluşturur; gerçek işlem operasyon veya kurucu/onay sahibi kararıyla yapılır.

## 11.6 MVP Dışında Kalacak İleri Parçalar

Şu parçalar ilk MVP'nin zorunlu şartı değildir:

- işletmenin kendi WhatsApp hattını doğrudan ajana bağlamak,
- WhatsApp Randevu Asistanı'nı tam otomatik çalıştırmak,
- gelişmiş müşteri paneli,
- self-service içerik yönetimi,
- gelişmiş katalog / sipariş / teklif akışı,
- sepet, ödeme, stok, varyasyon ve otomatik sipariş akışı,
- randevu motoru,
- gelir / gider sistemi,
- stok / tahsilat / muhasebe modülleri,
- gelişmiş QR analitiği,
- A/B test,
- kampanya motoru,
- gelişmiş entegrasyonlar,
- satış temsilcisi ağı.

Bu parçaların sistemde ileride yeri olabilir; ancak MVP'yi ağırlaştırmamalıdır.

## 11.7 MVP Bitti Sayma Kriteri

İlk MVP şu durumda çalışıyor sayılır:

1. Bir test işletmesi sisteme eklenir.
2. Bu işletme için gerçek OpenClaw İşletme Ajanı oluşur.
3. Ayrı workspace, ayrı agentDir ve ayrı session store kullanılır.
4. İşletme Ajanı Kaydı panelde takip edilebilir.
5. Pilot kanaldan gelen mesaj doğru işletme ajanına gider.
6. Yetkisiz veya yanlış kullanıcı gerçek işletme ajanına ulaşamaz.
7. Ajan kendi işletme bağlamıyla bilgi toplayabilir.
8. Toplanan bilgiler işletme bilgi/karar profiline, eksiklere, görevlere, karar notuna ve taslak çıktılara dönüşür.
9. En az bir karar destek notu oluşur.
10. Web vitrini taslağı, basit hizmet / ürün listesi, dinamik kısa link / QR hedef taslağı ve kurulum özeti oluşur.
11. Admin panelde durum, görev, açık karar, karar notu, eksik, onay, audit ve sıradaki adım görülebilir.
12. Riskli işler otomatik yapılmaz; approval veya operasyon devrine düşer.
13. Ajan başka işletme verisine, ana workspace'e, secret'lara veya izin dışı tool'lara erişemez.
14. Pause / kill switch çalışır.
15. İşletme sahibi panel öğrenmeden sürece katılıp ilk karar destek değerini ve dijital çıktıyı anlayabilir.

Ana prensip:

> MVP, her şeyi otomatik yapan sistem değil; gerçek işletme ajanı modelinin güvenli, izlenebilir, operasyonel, karar destekli ve müşteriye değer üreten şekilde çalıştığını kanıtlayan sistemdir.
