# EsnafDigital 360 Başlangıç Dokümanı

Bu klasör, EsnafDigital 360 ürün ve mimari çalışmasının aktif başlangıç noktasıdır.

Ana kural:

> 360 çalışmasına buradan başlanır. Aktif karar ve çalışma dosyaları bu klasördeki numaralı bölüm dosyalarıdır.

## Aktif Çalışma Nerede?

Aktif dosyalar:

- `00-...md` ile `22-...md` arasındaki numaralı bölüm dosyaları
- GPT Pro kontrol notları

Kök uzun kaynak metin ve ham bölüm dosyaları aktif çalışma alanı değildir; arşive taşınmıştır.

Arşiv:

`ARCHIVE/esnafdigital-360-source-2026-04-25/`

Arşiv karar kaynağı değildir; sadece geri dönüş ve izleme için tutulur.

## Güncel Ana Kararlar

- Hedef: dijital operasyonunu kurmak veya büyütmek isteyen KOBİ'lere mesajlaşma tabanlı özel işletme ajanı sunmak.
- Her işletme için gerçek OpenClaw İşletme Ajanı ve ayrı workspace kurulacak.
- **İşletme Ajanı Kaydı**, agent'ın kendisi değil; EsnafDigital panelindeki takip/yönetim kaydıdır.
- Kanal ürün değildir; kanal sadece işletme sahibinin ajana ulaşma yoludur.
- QR ve NFC sabit hedefli değil, dinamik kısa link üzerinden çalışacaktır.
- Güvenlik, yetki ve onay modeli ürünün temel şartıdır; sonradan eklenecek detay değildir.
- Geliştirme takvime göre değil, doğrulama fazlarına göre ilerleyecektir.
- MVP kabul standardı: teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz; P0 bloklayıcı hata sıfır olmadan yeni pilota geçilmez.

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
| 00 | Giriş ve MVP kararı | Düzenlendi | `00-giris-ve-mvp-karari.md` |
| 01 | Yönetici Özeti | Düzenlendi | `01-yonetici-ozeti.md` |
| 02 | Ana Ürün Kararı | Düzenlendi | `02-ana-urun-karari.md` |
| 03 | Konumlandırma | Düzenlendi | `03-konumlandirma.md` |
| 04 | Hedef Müşteri | Düzenlendi; sektör örnekleri GPT Pro ile netleşecek | `04-hedef-musteri.md` |
| 05 | Ürün Mantığı | Baştan yazıldı; geliştirme fikirleri GPT Pro'ya sorulacak | `05-urun-mantigi.md` |
| 06 | Kanal Stratejisi | Baştan yazıldı | `06-kanal-stratejisi.md` |
| 07 | OpenClaw Kurulum Kararı | Baştan yazıldı | `07-openclaw-kurulum-karari.md` |
| 08 | Teknik Mimari | Baştan yazıldı | `08-teknik-mimari.md` |
| 09 | Ana Modüller | Baştan yazıldı; geliştirme fikirleri GPT Pro'ya sorulacak | `09-ana-moduller.md` |
| 10 | Modüllerin İlk Sürüm Karşılığı | Baştan yazıldı | `10-modullerin-ilk-surum-karsiligi.md` |
| 11 | İlk MVP Tanımı | GPT Pro ile daraltıldı; MVP çekirdeği ve kapsam dışı sınırlar netleşti | `11-ilk-mvp-tanimi.md` |
| 12 | Müşteri Akışı | Baştan yazıldı | `12-musteri-akisi.md` |
| 13 | OpenClaw Ajan Davranışı | Baştan yazıldı; bağlam dosyalarıyla dikkatli netleşecek | `13-openclaw-ajan-davranisi.md` |
| 14 | Admin / Operasyon Paneli | Baştan yazıldı | `14-admin-operasyon-paneli.md` |
| 15 | Web Vitrini Mantığı | Baştan yazıldı | `15-web-vitrini-mantigi.md` |
| 16 | Menü / Katalog / Hizmet Listesi Mantığı | Baştan yazıldı | `16-online-menu-mantigi.md` |
| 17 | Dinamik QR / NFC ve Kısa Link Mantığı | Baştan yazıldı; sabit QR/NFC kaldırıldı | `17-qr-ve-dinamik-link-mantigi.md` |
| 18 | Paket Yapısı | Baştan yazıldı | `18-paket-yapisi.md` |
| 19 | Geliştirme ve Uygulama Fazları | Faz geçiş kapıları ve P0=0 kuralı eklendi | `19-gelistirme-sirasi.md` |
| 20 | Güvenlik ve Onay Kuralları | MVP güvenlik sınırı, tool allow/deny, tenant kontrolü ve kill switch netleşti | `20-guvenlik-ve-onay-kurallari.md` |
| 21 | Başarı Kriterleri | MVP kabul standardı, P0/P1/P2 ayrımı ve tamamlandı checklist'i netleşti | `21-basari-kriterleri.md` |
| 22 | Stratejik Riskler | Baştan yazıldı; proje ilerledikçe ve GPT Pro ile güncellenecek | `22-stratejik-riskler.md` |

## GPT Pro / Araştırma Durumu

Tamamlanan değerlendirme turları:

- MVP çekirdeği ve kapsam sınırı.
- Güvenlik / tenant izolasyonu / tool sınırı.
- İşletme Ajanı Kaydı ve API tool sözleşmesi.
- İlk kurulum konuşma akışı.
- Web vitrini, hizmet listesi ve shortlink minimum çıktı şeması.
- Admin operasyon paneli minimum ekranları.
- MVP başarı metrikleri ve kabul standardı.

Bekleyen başlıklar:

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
- `küçük işletme` dili ana hedef olarak kullanılmamalı; hedef **dijital operasyonunu kurmak veya büyütmek isteyen KOBİ** çizgisidir.
- WhatsApp ticari hedef kanal olabilir; ama mimari kanal bağımsız kalmalıdır.

## Son Not

Bu README, EsnafDigital 360 çalışmasının aktif başlangıç dokümanıdır.
