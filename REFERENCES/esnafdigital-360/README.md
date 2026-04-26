# EsnafDigital 360 Başlangıç Dokümanı

Bu klasör, EsnafDigital 360 ürün ve mimari çalışmasının aktif başlangıç noktasıdır.

Ana kural:

> 360 çalışmasına buradan başlanır. Aktif karar ve çalışma dosyaları bu klasördeki numaralı bölüm dosyalarıdır.

## Aktif Çalışma Nerede?

Aktif dosyalar:

- `00-...md` ile `23-...md` arasındaki numaralı bölüm dosyaları
- GPT Pro kontrol notları
- `esnafdigital-360-tek-dosya.md` kolay okuma/aktarım kopyasıdır; karar kaynağı değildir, numaralı dosyalardan yeniden üretilir.

Kök uzun kaynak metin ve ham bölüm dosyaları aktif çalışma alanı değildir; arşive taşınmıştır.

Arşiv:

`ARCHIVE/esnafdigital-360-source-2026-04-25/`

Arşiv karar kaynağı değildir; sadece geri dönüş ve izleme için tutulur.

## Güncel Ana Kararlar

- Hedef: dijital operasyonunu ve işletme kararlarını daha sistemli yönetmek isteyen KOBİ'lere mesajlaşma tabanlı özel işletme yönetim ajanı sunmak.
- Ana ürün: işletme sahibinin CEO olduğu, ajanın sanal işletme ekibi gibi karar destek verdiği özel işletme yönetim ajanı sistemidir.
- Her işletme için gerçek OpenClaw İşletme Ajanı ve ayrı workspace kurulacak.
- **İşletme Ajanı Kaydı**, agent'ın kendisi değil; EsnafDigital panelindeki takip/yönetim kaydıdır.
- Kanal ürün değildir; kanal sadece işletme sahibinin ajana ulaşma yoludur.
- Web vitrini, QR, katalog ve sosyal medya işleri ana ürün değil; sanal işletme ekibinin dijital çıktı modülleridir.
- QR ve NFC sabit hedefli değil, dinamik kısa link üzerinden çalışacaktır.
- Güvenlik, yetki ve onay modeli ürünün temel şartıdır; sonradan eklenecek detay değildir.
- Geliştirme takvime göre değil, doğrulama fazlarına göre ilerleyecektir.
- MVP kabul standardı: teknik, operasyonel, karar destek, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz; P0 bloklayıcı hata sıfır olmadan yeni pilota geçilmez.
- Aktif bölüm dosyaları bu MVP kabul standardıyla hizalanmıştır; segment/paket/modül önceliği ayrıca değerlendirilecektir.

## Çalışma Yöntemi

1. Bu README okunur.
2. İlgili numaralı bölüm dosyası açılır.
3. Bölümün anlam bütünlüğü kontrol edilir.
4. Tekrar, çelişki ve eski terimler temizlenir.
5. Bölüm kabul edilirse, kalıcı karar gerekiyorsa kanonik dosyaya taşınır.
6. Eski kaynaklar ve arşiv dosyaları aktif karar kaynağı gibi kullanılmaz.

## Bölüm Durumları

| No | Bölüm | Durum | Dosya |
|---|---|---|---|
| 00 | Giriş ve MVP kararı | Sanal işletme ekibi / karar destek eksenine çekildi | `00-giris-ve-mvp-karari.md` |
| 01 | Yönetici Özeti | Sanal işletme ekibi / karar destek eksenine çekildi | `01-yonetici-ozeti.md` |
| 02 | Ana Ürün Kararı | Ana ürün web asistanı değil işletme yönetim ajanı olarak netleşti | `02-ana-urun-karari.md` |
| 03 | Konumlandırma | Sanal işletme ekibi dili eklendi | `03-konumlandirma.md` |
| 04 | Hedef Müşteri | Karar destek değerinden fayda görecek KOBİ çizgisi eklendi | `04-hedef-musteri.md` |
| 05 | Ürün Mantığı | İşletme bilgi/karar profili ve departman bakışları eklendi | `05-urun-mantigi.md` |
| 06 | Kanal Stratejisi | Karar sorusu ve karar notu mesajlaşma işi olarak eklendi | `06-kanal-stratejisi.md` |
| 07 | OpenClaw Kurulum Kararı | MVP kabul standardıyla hizalandı | `07-openclaw-kurulum-karari.md` |
| 08 | Teknik Mimari | Karar notu ve save_decision_note tool sınırı eklendi | `08-teknik-mimari.md` |
| 09 | Ana Modüller | Karar destek modülleri çekirdeğe alındı | `09-ana-moduller.md` |
| 10 | Modüllerin İlk Sürüm Karşılığı | Karar destek ilk sürüm karşılıkları eklendi | `10-modullerin-ilk-surum-karsiligi.md` |
| 11 | İlk MVP Tanımı | MVP karar destek kanıtıyla güncellendi | `11-ilk-mvp-tanimi.md` |
| 12 | Müşteri Akışı | Karar destek ve ilk dijital çıktı akışıyla güncellendi | `12-musteri-akisi.md` |
| 13 | OpenClaw Ajan Davranışı | Departman bazlı karar destek davranışı eklendi | `13-openclaw-ajan-davranisi.md` |
| 14 | Admin / Operasyon Paneli | Açık karar ve karar notu görünürlüğü eklendi | `14-admin-operasyon-paneli.md` |
| 15 | Web Vitrini Mantığı | MVP kabul standardıyla hizalandı | `15-web-vitrini-mantigi.md` |
| 16 | Menü / Katalog / Hizmet Listesi Mantığı | MVP kabul standardıyla hizalandı | `16-online-menu-mantigi.md` |
| 17 | Dinamik QR / NFC ve Kısa Link Mantığı | MVP kabul standardıyla hizalandı; canlı hedef onay sınırı netleşti | `17-qr-ve-dinamik-link-mantigi.md` |
| 18 | Paket Yapısı | Paket ana değeri sanal işletme ekibi olarak güncellendi | `18-paket-yapisi.md` |
| 19 | Geliştirme ve Uygulama Fazları | Karar destek fazı eklendi | `19-gelistirme-sirasi.md` |
| 20 | Güvenlik ve Onay Kuralları | Karar destek sınırları ve save_decision_note allowlist eklendi | `20-guvenlik-ve-onay-kurallari.md` |
| 21 | Başarı Kriterleri | Karar destek başarı kriterleri ve checklist eklendi | `21-basari-kriterleri.md` |
| 22 | Stratejik Riskler | Web asistanına daralma ve departman yerine geçme riskleri eklendi | `22-stratejik-riskler.md` |
| 23 | Sanal İşletme Ekibi ve Karar Destek | Yeni ana karar dosyası eklendi | `23-sanal-isletme-ekibi-ve-karar-destek.md` |

## GPT Pro / Araştırma Durumu

Tamamlanan değerlendirme turları:

- MVP çekirdeği ve kapsam sınırı.
- Güvenlik / tenant izolasyonu / tool sınırı.
- İşletme Ajanı Kaydı ve API tool sözleşmesi.
- İlk kurulum konuşma akışı.
- Web vitrini, hizmet listesi ve shortlink minimum çıktı şeması.
- Admin operasyon paneli minimum ekranları.
- MVP başarı metrikleri ve kabul standardı.
- Tüm aktif 360 bölüm dosyalarının MVP kabul standardına göre hizalanması.
- Sanal işletme ekibi / karar destek yön değişikliği ve `23-sanal-isletme-ekibi-ve-karar-destek.md` ana karar dosyası.

Bekleyen başlıklar:

- Sanal işletme ekibi yönü için ilk pilot karar sorusu ve bilgi modeli detayları.
- 04: uygun sektör örnekleri ve hedef segment netliği.
- 05 / 18: ürün mantığı ve paketleme dili.
- 09 / 10: modül grupları ve modül önceliği.
- 22: stratejik risk listesinin segment/paket kararları sonrası tekrar kontrolü.
- Üretimleşme öncesi: çok müşteri, ayrı Gateway / ayrı OS user / ayrı VPS eşikleri için ek güvenlik araştırması.

GPT Pro kontrol notu:

- `19-gelistirme-sirasi-gpt-pro-kontrol-notu.md`

## Tutarlılık Kuralları

- Kullanıcıya görünen kayıt adı: **İşletme Ajanı Kaydı**.
- Teknikte gerekirse ASCII: `IsletmeAjaniKaydi` / `isletme_ajani_kaydi`.
- Eski İngilizce agent kayıt adı yeni aktif metinlerde kullanılmamalı.
- `online menü` yerine genel ifade: **menü / katalog / hizmet listesi**.
- `QR yorum sistemi` yerine genel ifade: **dinamik QR / NFC kısa link sistemi**.
- `küçük işletme` dili ana hedef olarak tek başına kullanılmamalı; hedef **dijital operasyonunu ve işletme kararlarını sistemli yönetmek isteyen KOBİ** çizgisidir.
- WhatsApp ticari hedef kanal olabilir; ama mimari kanal bağımsız kalmalıdır.

## Son Not

Bu README, EsnafDigital 360 çalışmasının aktif başlangıç dokümanıdır.
