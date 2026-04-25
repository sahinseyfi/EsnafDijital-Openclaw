> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kritik bolum. Guvenlik, yetki ve onay modeli icin ayrica arastirma yapilacak.

---

# 20. Güvenlik ve Onay Kuralları

Bu bölüm EsnafDigital 360'ın en kritik konularından biridir. Çünkü her işletmeye ayrı gerçek agent/workspace açmak güçlü bir modeldir; ancak güvenlik, yetki ve onay sınırları doğru kurulmazsa risk üretir.

Bu nedenle bu bölüm ilk çerçevedir. Nihai güvenlik modeli için ayrıca araştırma yapılacak; OpenClaw agent izolasyonu, sandbox, tool yetki profilleri, API izinleri ve müşteri verisi sınırları ayrı ayrı değerlendirilecektir.

## 20.1 Temel Güvenlik İlkesi

Ajanın temel güvenlik ilkesi şudur:

> Ajan bilgi toplar, öneri üretir, taslak hazırlar ve görev açar. Riskli, dış dünyayı etkileyen veya kalıcı sonuç doğuran işlemler onaysız yapılmaz.

Her işletme agent'ı sadece kendi işletmesi için çalışır.

Ajan:

- başka işletme verisine erişemez,
- EsnafDigital ana workspace'ine erişemez,
- yetki profili dışında tool kullanamaz,
- dış hesaplarda onaysız işlem yapamaz,
- müşteri adına ticari taahhüt veremez.

## 20.2 Ajanın Serbestçe Yapabilecekleri

Ajan düşük riskli işleri kendi yetkisi içinde yapabilir.

Örnekler:

- işletmeden bilgi istemek,
- eksik bilgileri listelemek,
- gelen bilgiyi özetlemek,
- içerik taslağı hazırlamak,
- web vitrini için metin önerisi üretmek,
- menü / katalog / hizmet listesi taslağı oluşturmak,
- QR/NFC hedefi için öneri sunmak,
- basit durum özeti hazırlamak,
- admin panelde görev veya not oluşturmak,
- operasyon ekibine devredilecek işi işaretlemek.

Bu işler müşteriye veya dış sisteme kalıcı etki üretmez.

## 20.3 Onayla Yapılabilecekler

Aşağıdaki işler ancak işletme sahibi, kurucu veya operasyon onayıyla ilerlemelidir:

- web vitrini yayınlamak veya herkese açık içeriği değiştirmek,
- Google / Maps / Instagram gibi dış hesaplarda değişiklik yapmak,
- domain / DNS / yönlendirme değiştirmek,
- müşteri adına dış dünyaya mesaj göndermek,
- sosyal medya paylaşımı yapmak,
- fiyat, ödeme, indirim veya sözleşme ile ilgili karar vermek,
- kesin randevu, rezervasyon, sipariş veya taahhüt oluşturmak,
- dinamik QR/NFC hedefini müşterilerin göreceği şekilde değiştirmek,
- müşteri verisini kalıcı şekilde değiştirmek,
- canlı sistemi etkileyen teknik işlem yapmak.

Bu işlerde ajan yalnızca bilgi toplar, öneri sunar, taslak hazırlar veya onay görevi açar.

## 20.4 Kesin Yapılmaması Gerekenler

Ajan hiçbir koşulda şu işleri kendi başına yapmamalıdır:

- parola, token veya gizli erişim bilgisini istemek ya da kaydetmek,
- gizli bilgiyi workspace dosyalarına yazmak,
- başka işletmenin verisini okumak veya kullanmak,
- EsnafDigital ana workspace'ine müdahale etmek,
- yetki profili dışına çıkmak,
- müşteri adına bağlayıcı ticari karar vermek,
- müşteriye kesin sonuç garantisi vermek,
- yorum, puan, arama sıralaması veya satış sonucu garanti etmek,
- onay gerektiren işlemi onaysız tamamlamak.

## 20.5 Tool ve API Sınırı

İşletme agent'ları EsnafDigital veritabanına doğrudan erişmemelidir.

Doğru sınır:

```text
İşletme Agent'ı
   ↓
Sınırlı tool/plugin
   ↓
EsnafDigital API
   ↓
Veritabanı / operasyon kayıtları
```

Her tool için şu bilgiler net olmalıdır:

- hangi agent kullanabilir?
- hangi işletme üzerinde çalışabilir?
- okuma mı yazma mı yapar?
- onay ister mi?
- işlem kaydı tutulur mu?
- geri alınabilir mi?

## 20.6 Onay Kaydı ve İzlenebilirlik

Onay isteyen işler panelde görünür olmalıdır.

Her onay kaydında en az şunlar tutulmalıdır:

- hangi işletme,
- hangi agent,
- istenen işlem,
- işlem nedeni,
- risk seviyesi,
- kimden onay beklendiği,
- onay durumu,
- zaman bilgisi,
- işlem sonucu.

Bu kayıtlar hem güvenlik hem de operasyon takibi için gereklidir.

## 20.7 Randevu ve Müşteriyle Doğrudan İşleyen Senaryolar

Randevu, sipariş, rezervasyon ve müşteri karşılama gibi işler daha hassastır.

İlk aşamada ajan:

- talep toplar,
- uygun bilgileri sorar,
- işletme sahibine veya operasyona özet çıkarır,
- kesin işlem için onay ister.

Kesin randevu veya sipariş onayı, ancak yetkili onayından sonra oluşmalıdır.

## 20.8 Araştırılacak Konular

Bu bölüm daha sonra ayrıca araştırılmalıdır.

Araştırma başlıkları:

- OpenClaw çoklu agent izolasyonu,
- workspace sandbox sınırları,
- agent başına tool allowlist,
- API bazlı işletme yetki kontrolü,
- agent'ın başka işletme verisine erişmesini engelleme,
- gizli bilgi yönetimi,
- işlem logları ve audit kayıtları,
- onay akışı tasarımı,
- müşteri verisi silme/değiştirme kuralları,
- WhatsApp / dış hesap entegrasyonlarında güvenlik.

Ana prensip:

> EsnafDigital 360'da güvenlik, sonradan eklenecek detay değil; işletme agent modelinin temel şartıdır.

---
