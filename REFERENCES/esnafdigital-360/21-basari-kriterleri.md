> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

# 21. Başarı Kriterleri

İlk aşamada başarı, tüm modüllerin tam otomatik olmasıyla ölçülmemelidir. MVP'nin başarısı, işletme agent modelinin gerçekten çalışıp çalışmadığıyla ölçülmelidir.

Başarı kriterleri üç grupta ele alınır:

1. teknik başarı,
2. operasyonel başarı,
3. ürün / müşteri değeri başarısı.

## 21.1 Teknik Başarı Kriterleri

MVP teknik olarak başarılı sayılmak için şunları göstermelidir:

- bir işletme sisteme eklenebiliyor,
- işletmeye özel OpenClaw İşletme Ajanı oluşuyor,
- ayrı agent workspace'i oluşuyor,
- İşletme Ajanı Kaydı panelde görünüyor,
- işletme bazlı oturum ve hafıza ayrımı çalışıyor,
- pilot mesajlaşma kanalından gelen mesaj doğru işletme ajanına gidiyor,
- agent kendi işletme bağlamıyla cevap veriyor,
- agent yalnızca izin verilen tool/API sınırı içinde işlem yapıyor,
- başka işletme verisine veya ana workspace'e erişim olmuyor.

## 21.2 Operasyonel Başarı Kriterleri

MVP operasyonel olarak başarılı sayılmak için şunları göstermelidir:

- ajan temel işletme bilgilerini toplayabiliyor,
- eksik bilgiler görünür hale geliyor,
- toplanan bilgiler işletme dijital profiline bağlanıyor,
- admin panelde açık görevler görünüyor,
- onay gerektiren işler otomatik yapılmıyor,
- operasyon ekibine devredilecek işler ayrılıyor,
- bakım veya güncelleme ihtiyacı görev olarak takip edilebiliyor,
- agent durumu ve son aktivite panelden izlenebiliyor.

## 21.3 İlk Dijital Çıktı Başarı Kriterleri

MVP, işletmeye görünür bir ilk değer üretmelidir.

Başarı için en az şunlar oluşmalıdır:

- web vitrini taslağı,
- arama / mesajlaşma / yol tarifi bağlantıları,
- dinamik QR / NFC kısa link,
- menü / katalog / hizmet listesi için basit yapı,
- fotoğraf veya içerik toplama akışı,
- kısa kurulum özeti veya durum raporu.

Bu çıktılar kusursuz olmak zorunda değildir; ama işletmenin dijital operasyonunun başladığını göstermelidir.

## 21.4 Ürün / Müşteri Değeri Başarı Kriterleri

MVP, müşteri açısından şu değeri göstermelidir:

- işletme sahibi panel öğrenmeden sürece katılabiliyor,
- mesajlaşma üzerinden bilgi verebiliyor,
- ajan ne istediğini açık ve kısa şekilde anlatabiliyor,
- işletme sahibi hangi bilgilerin eksik olduğunu görebiliyor,
- kurulum süreci tek seferlik site tesliminden daha düzenli hissediliyor,
- işletme için özel ajan fikri anlaşılır ve değerli görünüyor.

## 21.5 Başarı Sayılmayan Şeyler

Aşağıdakiler tek başına başarı sayılmaz:

- sadece web sitesi taslağı çıkarmak,
- sadece QR üretmek,
- sadece Telegram botu çalıştırmak,
- her modülü yarım yamalak açmak,
- müşteriye çok sayıda ekran göstermek,
- agent olmadan klasik manuel operasyon yapmak,
- güvenlik ve onay sınırlarını kurmadan otomasyon yapmak.

## 21.6 MVP Doğru Yolda Sayılırsa

Aşağıdaki sorulara evet cevabı alınabiliyorsa MVP doğru yoldadır:

1. Tek bir işletme için gerçek agent/workspace çalışıyor mu?
2. Ajan kendi işletme bağlamıyla konuşuyor mu?
3. İşletme sahibi mesajlaşma üzerinden bilgi verebiliyor mu?
4. Bilgiler profile, göreve ve ilk dijital çıktılara dönüşüyor mu?
5. Riskli işler onaysız yapılmadan panelde görünür oluyor mu?
6. Web vitrini, dinamik QR/NFC ve basit katalog/hizmet yapısı üretilebiliyor mu?
7. Sistem ileride WhatsApp veya başka kanala taşınabilecek kadar ayrık mı?

Ana prensip:

> Başarı, her şeyi otomatik yapmak değil; gerçek işletme ajanı modelinin güvenli, izlenebilir ve müşteriye değer üreten şekilde çalıştığını kanıtlamaktır.

---
