> Aktif 360 bolum dosyasi.
> Durum: GPT Pro degerlendirmeleriyle daraltildi; MVP cekirdegi ve kapsam disi sinirlar netlestirildi.

---

# 11. İlk MVP Tanımı

EsnafDigital 360 MVP'si yalnızca web vitrini, QR üretimi veya çalışan bir sohbet botu değildir. MVP'nin amacı, bir işletme için özel işletme ajanı kurulumunun ve bu ajan üzerinden dijital operasyon başlatmanın gerçekten çalıştığını göstermektir.

MVP'nin ana kabul cümlesi şudur:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı modeli güvenli, izlenebilir, operasyonel ve müşteriye görünür ilk değer üretecek şekilde baştan sona çalışmalıdır.

## 11.1 MVP'nin Tek Net Senaryosu

İlk MVP şu senaryoyu çalıştırmalıdır:

> Bir test işletmesi sisteme kaydedilir. Bu işletme için gerçek OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir/session ve İşletme Ajanı Kaydı oluşturulur. İşletme sahibi pilot mesajlaşma kanalı üzerinden doğru işletme ajanına yönlendirilir. Ajan kısa konuşmalarla işletmenin temel bilgilerini toplar. Toplanan bilgiler işletme dijital profiline, eksik listesine, görevlere, onay kayıtlarına ve ilk görünür dijital çıktılara dönüşür. Riskli işler otomatik yapılmaz; onay veya operasyon devrine düşer.

Bu senaryo çalışmadan MVP tamamlanmış sayılmaz.

## 11.2 MVP'nin Çekirdeğinde Kesin Olacak Parçalar

MVP'nin çekirdeğinde şu parçalar bulunmalıdır:

- tek gerçek veya gerçeğe çok yakın test işletmesi,
- işletme kayıt modeli,
- işletme dijital profili,
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
- web vitrini taslağı,
- basit hizmet / ürün listesi taslağı,
- dinamik kısa link / QR hedef taslağı,
- fotoğraf ve içerik toplama akışı,
- kısa kurulum özeti veya durum raporu.

## 11.3 İlk Görünür Çıktıların Sınırı

İlk MVP'de görünür çıktılar tam ürün modülü gibi değil, agent'ın topladığı bilginin görünür kanıtı olarak ele alınmalıdır.

Minimum görünür çıktı sırası:

1. toparlanmış işletme özeti,
2. ilk hizmet / ürün listesi,
3. web vitrini taslağı,
4. dinamik kısa link / QR hedef taslağı,
5. kurulum özeti ve eksik listesi.

Bu çıktılar için sınır şudur:

- Web vitrini **preview / taslak** olarak üretilebilir; otomatik canlı yayın yapılmaz.
- Fotoğraf yoksa web vitrini taslağı yine oluşabilir; fotoğraf eksikliği medya talebi olarak izlenir.
- Hizmet / ürün listesi tam katalog değildir; ilk 1-3 kalem bile taslak için yeterli olabilir.
- Fiyat zorunlu değildir; gerekirse `fiyat için iletişime geçin`, `teklif alınır` veya `proje bazlı` notu kullanılabilir.
- Dinamik kısa link / QR hedefi taslak olarak oluşturulur; canlı hedef aktivasyonu onay ister.
- Kurulum özeti, tamamlananları, eksikleri ve sıradaki adımı açıkça göstermelidir.

## 11.4 MVP'de Yarı Otomatik veya Manuel Kalabilecekler

İlk MVP'de şu işler sistemde takip edilir; ancak tamamen otomatik olmak zorunda değildir:

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

Bu işlerde ajan bilgi toplar, taslak üretir, görev açar veya onay kaydı oluşturur; gerçek işlem operasyon veya kurucu onayıyla yapılır.

## 11.5 MVP Dışında Kalacak İleri Parçalar

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

## 11.6 MVP Bitti Sayma Kriteri

İlk MVP şu durumda çalışıyor sayılır:

1. Bir test işletmesi sisteme eklenir.
2. Bu işletme için gerçek OpenClaw İşletme Ajanı oluşur.
3. Ayrı workspace, ayrı agentDir ve ayrı session store kullanılır.
4. İşletme Ajanı Kaydı panelde takip edilebilir.
5. Pilot kanaldan gelen mesaj doğru işletme ajanına gider.
6. Yetkisiz veya yanlış kullanıcı gerçek işletme ajanına ulaşamaz.
7. Ajan kendi işletme bağlamıyla bilgi toplayabilir.
8. Toplanan bilgiler işletme dijital profiline, eksiklere, görevlere ve taslak çıktılara dönüşür.
9. Web vitrini taslağı, basit hizmet / ürün listesi, dinamik kısa link / QR hedef taslağı ve kurulum özeti oluşur.
10. Admin panelde durum, görev, eksik, onay, audit ve sıradaki adım görülebilir.
11. Riskli işler otomatik yapılmaz; approval veya operasyon devrine düşer.
12. Ajan başka işletme verisine, ana workspace'e, secret'lara veya izin dışı tool'lara erişemez.
13. Pause / kill switch çalışır.
14. İşletme sahibi panel öğrenmeden sürece katılıp ilk değeri anlayabilir.

Ana prensip:

> MVP, her şeyi otomatik yapan sistem değil; gerçek işletme ajanı modelinin güvenli, izlenebilir, operasyonel ve müşteriye değer üreten şekilde çalıştığını kanıtlayan sistemdir.
