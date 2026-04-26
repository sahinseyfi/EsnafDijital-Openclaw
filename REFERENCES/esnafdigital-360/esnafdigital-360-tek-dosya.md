# EsnafDigital 360 - Tek Dosya Aktarım Kopyası
> Otomatik üretildi: 2026-04-26 00:04 UTC
> Not: Karar kaynağı numaralı bölüm dosyalarıdır. Bu dosya kolay okuma/GPT aktarımı için yeniden üretilmiş kopyadır.
---


<!-- SOURCE: REFERENCES/esnafdigital-360/README.md -->

# EsnafDigital 360 Başlangıç Dokümanı

Bu klasör, EsnafDigital 360 ürün ve mimari çalışmasının aktif başlangıç noktasıdır.

Ana kural:

> 360 çalışmasına buradan başlanır. Aktif karar ve çalışma dosyaları bu klasördeki numaralı bölüm dosyalarıdır.

## Aktif Çalışma Nerede?

Aktif dosyalar:

- `00-...md` ile `22-...md` arasındaki numaralı bölüm dosyaları
- GPT Pro kontrol notları
- `esnafdigital-360-tek-dosya.md` kolay okuma/aktarım kopyasıdır; karar kaynağı değildir, numaralı dosyalardan yeniden üretilir.

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
| 00 | Giriş ve MVP kararı | MVP kabul standardıyla hizalandı | `00-giris-ve-mvp-karari.md` |
| 01 | Yönetici Özeti | MVP kabul standardıyla hizalandı | `01-yonetici-ozeti.md` |
| 02 | Ana Ürün Kararı | MVP kabul standardıyla hizalandı | `02-ana-urun-karari.md` |
| 03 | Konumlandırma | MVP kabul standardıyla hizalandı | `03-konumlandirma.md` |
| 04 | Hedef Müşteri | MVP kabul standardıyla hizalandı; segment GPT Pro ile netleşecek | `04-hedef-musteri.md` |
| 05 | Ürün Mantığı | MVP kabul standardıyla hizalandı; paket/ürün dili ayrıca netleşecek | `05-urun-mantigi.md` |
| 06 | Kanal Stratejisi | MVP kabul standardıyla hizalandı | `06-kanal-stratejisi.md` |
| 07 | OpenClaw Kurulum Kararı | MVP kabul standardıyla hizalandı | `07-openclaw-kurulum-karari.md` |
| 08 | Teknik Mimari | MVP kabul standardıyla hizalandı | `08-teknik-mimari.md` |
| 09 | Ana Modüller | MVP kabul standardıyla hizalandı; modül önceliği ayrıca netleşecek | `09-ana-moduller.md` |
| 10 | Modüllerin İlk Sürüm Karşılığı | MVP kabul standardıyla hizalandı | `10-modullerin-ilk-surum-karsiligi.md` |
| 11 | İlk MVP Tanımı | GPT Pro ile daraltıldı; MVP çekirdeği ve kapsam dışı sınırlar netleşti | `11-ilk-mvp-tanimi.md` |
| 12 | Müşteri Akışı | MVP kabul standardıyla hizalandı | `12-musteri-akisi.md` |
| 13 | OpenClaw Ajan Davranışı | MVP kabul standardıyla hizalandı; bağlam dosyalarıyla netleşecek | `13-openclaw-ajan-davranisi.md` |
| 14 | Admin / Operasyon Paneli | MVP kabul standardıyla hizalandı | `14-admin-operasyon-paneli.md` |
| 15 | Web Vitrini Mantığı | MVP kabul standardıyla hizalandı | `15-web-vitrini-mantigi.md` |
| 16 | Menü / Katalog / Hizmet Listesi Mantığı | MVP kabul standardıyla hizalandı | `16-online-menu-mantigi.md` |
| 17 | Dinamik QR / NFC ve Kısa Link Mantığı | MVP kabul standardıyla hizalandı; canlı hedef onay sınırı netleşti | `17-qr-ve-dinamik-link-mantigi.md` |
| 18 | Paket Yapısı | MVP kabul standardıyla hizalandı; paket dili ayrıca netleşecek | `18-paket-yapisi.md` |
| 19 | Geliştirme ve Uygulama Fazları | Faz geçiş kapıları ve P0=0 kuralı eklendi | `19-gelistirme-sirasi.md` |
| 20 | Güvenlik ve Onay Kuralları | MVP güvenlik sınırı, tool allow/deny, tenant kontrolü ve kill switch netleşti | `20-guvenlik-ve-onay-kurallari.md` |
| 21 | Başarı Kriterleri | MVP kabul standardı, P0/P1/P2 ayrımı ve tamamlandı checklist'i netleşti | `21-basari-kriterleri.md` |
| 22 | Stratejik Riskler | MVP kabul standardıyla hizalandı; segment/paket sonrası tekrar kontrol edilecek | `22-stratejik-riskler.md` |

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


<!-- SOURCE: REFERENCES/esnafdigital-360/00-giris-ve-mvp-karari.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; teknik cekirdek ve pilot siniri net.

---

# EsnafDigital 360 + OpenClaw
## Ajan Merkezli Dijital İşletme Sistemi

Bu doküman, EsnafDigital 360 projesinin aktif ürün ve mimari çalışma metnidir. Bölümler karar adayı taşır; uygulamaya dönüşecek her kritik kapsam, MVP veya yön değişikliği kurucu onayından geçmelidir.

## MVP için Kabul Edilen Mimari Çizgi

Bu dokümanda geçen **işletmeye özel ajan**, EsnafDigital 360 MVP için gerçek OpenClaw İşletme Ajanı ve ayrı çalışma alanı anlamına gelir.

MVP çekirdeği şudur:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir/session, İşletme Ajanı Kaydı, pilot kanal routing/binding, sınırlı EsnafDigital API tool'ları, audit/onay ve kill switch ile baştan sona çalışacaktır.

İşletme Ajanı Kaydı, agent'ın kendisi değildir. EsnafDigital panelinde o işletmenin gerçek OpenClaw agent'ını izleyen ve yöneten kayıttır. Bu kayıt; agent kimliğini, workspace/agentDir/session referanslarını, şablon sürümünü, izin profilini, kanal bağlantılarını, sağlık durumunu, görevleri, eksikleri ve onay durumunu takip eder.

Teknik adlandırma gerekirse ASCII karşılığı `IsletmeAjaniKaydi` / `isletme_ajani_kaydi` olarak tutulur.

## Kanal Kararı

Kanal ürün değildir. İlk doğrulama Telegram/test kanalı, webchat veya EsnafDigital pilot hattı ile yapılabilir. WhatsApp ticari hedef kanal olarak kalır; ancak işletmenin kendi WhatsApp hattını bağlamak, randevu/sipariş karşılamak veya dış hesapları yönetmek MVP çekirdeği değildir.

## Güvenlik Sınırı

Ayrı workspace tek başına güvenlik sınırı sayılmaz. MVP güvenlik sınırı şu birleşimle kurulur:

- kanal allowlist / pairing,
- explicit binding,
- sandbox/tool policy,
- EsnafDigital API tarafında tenant/business yetki kontrolü,
- audit log,
- onay kuyruğu,
- pause / kill switch.

## Ana Hedef

EsnafDigital 360 yalnızca web sitesi, Google düzeni, dinamik QR/NFC yönlendirme sistemi veya bakım hizmeti sunan klasik bir dijital hizmet paketi değildir.

Ana hedef şudur:

> Dijital operasyonunu kurmak veya büyütmek isteyen KOBİ'lere, panel karmaşası olmadan mesajlaşma tabanlı özel işletme ajanı sunmak.

MVP tamamlandı sayılması için yalnızca botun cevap vermesi yetmez. Teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmalı; P0 bloklayıcı hata sıfır olmadan yeni pilota geçilmemelidir.


<!-- SOURCE: REFERENCES/esnafdigital-360/01-yonetici-ozeti.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; ozet artik taslak cikti, onay ve pilot sinirini vurgular.

---

# 1. Yönetici Özeti

EsnafDigital 360, dijital operasyonunu kurmak veya büyütmek isteyen KOBİ'ler için mesajlaşma tabanlı özel işletme ajanı sistemidir.

Her işletme için gerçek bir OpenClaw İşletme Ajanı ve ayrı çalışma alanı modeli hedeflenir. İlk MVP'de bu model tek test işletmesiyle doğrulanır: ayrı workspace, ayrı agentDir/session, İşletme Ajanı Kaydı, pilot kanal routing/binding, sınırlı EsnafDigital API tool'ları, audit/onay ve kill switch birlikte çalışmalıdır.

EsnafDigital panelindeki **İşletme Ajanı Kaydı**, agent'ın kendisi değildir; agent'ın kimliğini, çalışma alanını, şablon sürümünü, yetki profilini, kanal bağlarını, görevlerini, eksiklerini, sağlık durumunu ve onaylarını izleyen runtime control kaydıdır.

İşletme sahibi teknik panel öğrenmeden; dijital kurulum, görünürlük, içerik, web vitrini, QR, menü/katalog/hizmet listesi ve bakım süreçlerini mesajlaşma üzerinden ilerletir. Ancak ilk MVP'de bu çıktılar tam otomatik ürünler değil, agent'ın topladığı bilginin güvenli ve izlenebilir taslaklarıdır.

Sistem tek bir kanala bağlı tasarlanmaz. İlk doğrulama Telegram/test kanalı, webchat veya EsnafDigital pilot hattı ile yapılabilir; ticari hedefte WhatsApp önemli kanal olarak kalır. İşletmenin kendi WhatsApp hattını bağlamak ve randevu/sipariş gibi hassas akışları çalıştırmak ileri modül olarak ele alınır.

OpenClaw, EsnafDigital uygulamasının içine gömülmez. Ayrı bir agent runtime servisi olarak çalışır. İlk MVP'de aynı VPS üzerinde başlayabilir; gerçek müşteri sayısı, dış hesap bağlantıları, tool etkisi veya güvenlik ihtiyacı arttığında ayrı OS user, ayrı Gateway veya ayrı VPS eşikleri tekrar değerlendirilir.

Temel ürün cümlesi:

> İşletmeniz için kendi hafızası, çalışma alanı ve yetki sınırları olan özel bir dijital işletme ajanı kuruyoruz. Panel karmaşası olmadan; web vitrini, görünürlük, yorum, menü/katalog/hizmet listesi, içerik ve bakım işlerinizi mesajlaşma üzerinden güvenli ve adım adım ilerletiyoruz.

MVP kabul standardı:

> Teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz.


<!-- SOURCE: REFERENCES/esnafdigital-360/02-ana-urun-karari.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; ana urun karari taslak cikti ve onay siniriyla netlestirildi.

---

# 2. Ana Ürün Kararı

EsnafDigital 360'ın ana ürün kararı şudur:

> Dijital operasyonunu kurmak veya büyütmek isteyen işletme için özel bir OpenClaw İşletme Ajanı kurulur. Bu ajan, işletme dijital profili ve sınırlı EsnafDigital API tool'ları üzerinden bilgi toplar, eksikleri görünür yapar, taslak çıktılar üretir, görev açar ve riskli işleri onay/operasyon devrine bırakır.

Bu karar, projeyi klasik “site yapma” işinden çıkarır ve daha güçlü bir ürün konumuna taşır.

EsnafDigital'in satacağı ana şey yalnızca web sitesi değildir.

Satılacak ana değer:

- işletmeye özel mesajlaşma tabanlı dijital işletme ajanı,
- güven veren dijital kimlik,
- işletme dijital profili,
- web vitrini taslağı ve gerektiğinde yayın süreci,
- yorum toplama ve dinamik QR / kısa link akışı,
- menü / katalog / hizmet listesi taslağı,
- içerik, fotoğraf ve bilgi düzeni,
- müşteri iletişimini kolaylaştıran bağlantılar,
- görev, eksik ve onay takibi,
- düzenli bakım ve canlı tutma desteği.

## MVP Açısından Ana Karar

İlk MVP'de ana ürün kararı şu şekilde daraltılır:

- tek test işletmesiyle gerçek agent/workspace modeli doğrulanır,
- ayrı workspace, ayrı agentDir/session ve İşletme Ajanı Kaydı çalışır,
- pilot kanal mesajı doğru işletme ajanına gider,
- agent düşük riskli bilgileri profile ve taslak çıktılara dönüştürür,
- web vitrini, hizmet listesi ve QR/kısa link **taslak** olarak oluşur,
- canlı yayın, QR hedef aktivasyonu, dış hesap değişikliği, müşteri adına mesaj, randevu/sipariş/ödeme gibi işlemler agent tarafından otomatik yapılmaz,
- riskli işler approval veya operasyon görevi olarak panelde görünür.

Bu yapı sayesinde modüller birbirinden kopuk hizmetler olmaktan çıkar; işletmenin dijital operasyonunu kuran veya büyüten tek bir ajan merkezli sistemin parçaları haline gelir.


<!-- SOURCE: REFERENCES/esnafdigital-360/03-konumlandirma.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; konumlandirma otomasyon vaadi ve web sitesi paketi riskinden arindirildi.

---

# 3. Konumlandırma

## 3.1 Yanlış Konumlandırma

EsnafDigital 360 şu şekilde anlatılmamalıdır:

- sadece web sitesi yapıyoruz,
- sadece Google Maps düzenliyoruz,
- sadece dinamik QR/NFC sistemi kuruyoruz,
- sadece sosyal medya desteği veriyoruz,
- sadece menü/katalog sayfası yapıyoruz,
- her şeyi otomatik yapan yapay zeka satıyoruz,
- işletme sahibinin kendi WhatsApp hattını hemen ajana bağlıyoruz,
- KOBİ'lere hazır yazılım veya genel CRM satıyoruz.

Bunlar sistemin parçası veya ilerideki modülü olabilir; ancak ana ürün değildir.

## 3.2 Doğru Konumlandırma

Doğru konumlandırma:

> EsnafDigital 360, dijital operasyonunu kurmak veya büyütmek isteyen KOBİ'ler için mesajlaşma tabanlı özel işletme ajanı sistemidir.

Müşteriye anlatılacak sade cümle:

> Panel öğrenmenize gerek yok. İşletmenizin dijital işleri için özel işletme ajanınızla mesajlaşın; web vitrini, görünürlük, yorum, menü/katalog/hizmet listesi, içerik ve bakım işleriniz güvenli ve sistemli şekilde ilerlesin.

Daha satış odaklı cümle:

> İşletmenizin internette güvenilir, güncel ve kolay ulaşılabilir görünmesi için kendi hafızası, çalışma alanı ve yetki sınırları olan özel bir dijital işletme ajanı kuruyoruz.

## 3.3 MVP Anlatım Sınırı

İlk MVP anlatılırken şu sınır açık tutulmalıdır:

- web vitrini, hizmet listesi ve QR/kısa link ilk aşamada taslak/preview olarak oluşabilir,
- canlı yayın ve müşteri gören hedef değişiklikleri onay ister,
- dış hesap, ödeme, randevu, sipariş ve ticari taahhüt otomatik yapılmaz,
- ilk değer, işletme bilgilerinin toparlanması, ilk taslakların oluşması ve sıradaki adımın netleşmesidir.

Ana prensip:

> Ürün, otomasyon miktarıyla değil; özel işletme ajanı modelinin güvenli, izlenebilir ve müşteriye değer üreten şekilde çalışmasıyla konumlandırılmalıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/04-hedef-musteri.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; segment karari halen GPT Pro ile netlestirilecek.

---

# 4. Hedef Müşteri

İlk hedef müşteri grubu, dijital operasyonunu kurmak veya büyütmek isteyen ve özel işletme ajanından gerçek verim alabilecek KOBİ'lerdir.

Bu aşamada sektör listesi kesinleştirilmez. Uygun sektör örnekleri, paketleme dili ve modül öncelikleri ayrıca GPT Pro ile değerlendirilecektir.

## Hedef Müşterinin Ortak Özellikleri

Hedef müşteri şu özelliklerden birkaçını taşır:

- dijitalde daha güvenilir, düzenli ve ulaşılabilir görünmek ister,
- müşteri iletişimini daha sistemli hale getirmek ister,
- içerik, fotoğraf, katalog, hizmet listesi, teklif, bakım veya takip gibi düzenli bilgi akışları vardır ya da bunu kurmak ister,
- büyük ve karmaşık yazılım sistemleriyle uğraşmak istemez,
- teknik panel öğrenmeden mesajlaşma üzerinden ilerlemek ister,
- dijital operasyonu için özel bir ajan fikrinden gerçek fayda görebilecek yapıdadır,
- ilk taslakları ve eksik listelerini hızlıca anlayıp geri bildirim verebilir.

## İlk Pilot İçin Ek Uygunluk Kriteri

İlk MVP pilotu için işletme seçerken sadece sektör değil, doğrulama kalitesi önemlidir.

Uygun pilot işletme:

- gerçek işletme bilgisi paylaşabilir,
- mesajlaşma üzerinden 1-3 soruya cevap verebilir,
- en az bir hizmet / ürün / kategori sunar,
- web vitrini taslağından değer görebilir,
- fotoğraf veya görsel ihtiyacı varsa bunu görev olarak kabul eder,
- riskli işlerde onaylı ilerlemeyi sorun etmez,
- ilk çıktıları kusursuz teslimat değil, dijital operasyon başlangıcı olarak değerlendirebilir.

## Şimdilik Dikkat Edilecek Müşteri Tipleri

Şu işletmeler ilk pilot için zayıf olabilir:

- yalnızca ucuz web sitesi isteyenler,
- bilgi paylaşmaya istekli olmayanlar,
- mesajlaşma üzerinden ilerlemeye açık olmayanlar,
- özel işletme ajanından gerçek fayda görmeyecek kadar basit veya düzensiz işleyenler,
- ilk görüşmede ödeme, randevu, sipariş, dış hesap veya tam otomasyon beklentisini ana şart yapanlar.

Basit saha/pilot örnekleri olabilir; ancak ana hedef yalnızca berber, kafe, restoran veya güzellik salonu gibi klasik yerel işletmelerle sınırlanmaz.


<!-- SOURCE: REFERENCES/esnafdigital-360/05-urun-mantigi.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; katmanlar korundu, MVP minimumu ve ileri moduller ayrildi.

---

# 5. Ürün Mantığı

EsnafDigital 360, tek tek dijital hizmetlerin yan yana dizildiği bir paket değildir. Ürünün mantığı, işletmeye özel gerçek bir ajan kurmak ve bu ajan üzerinden işletmenin dijital operasyonunu adım adım yönetilebilir hale getirmektir.

Sistem dört ana katmandan oluşur:

1. **İşletme Dijital Profili**
2. **Gerçek OpenClaw İşletme Ajanı ve Workspace**
3. **İşletme Ajanı Kaydı**
4. **Modüler Dijital Hizmet Sistemi**

Bu katmanlar birbirinden ayrı düşünülmez. İşletme ajanı, işletme profilindeki bilgileri ve modülleri kullanarak müşteriyi yönlendirir, eksikleri takip eder ve operasyon işlerini görünür hale getirir.

## 5.1 İşletme Dijital Profili

İşletme Dijital Profili, işletmenin sistemdeki merkezi bilgi kaydıdır.

Bu profil, işletmenin sadece iletişim bilgilerini değil; dijital operasyonunu çalıştırmak için gereken temel verileri de tutar.

Profil alanları şu gruplarda düşünülmelidir:

### Temel bilgiler

- işletme adı,
- kısa açıklama,
- sektör / faaliyet alanı,
- yetkili kişi,
- telefon,
- mesajlaşma numarası,
- adres veya hizmet bölgesi,
- çalışma saatleri.

### Dijital varlıklar

- web vitrini taslağı veya yayın linki,
- Google / Maps linki,
- sosyal profil bağlantıları,
- dinamik QR / NFC kısa linkleri,
- yorum bağlantıları,
- fotoğraf ve medya varlıkları.

### Sunulan şeyler

- hizmetler,
- ürünler,
- menü / katalog / hizmet listesi,
- fiyat veya fiyat notları,
- öne çıkarılacak işler,
- kampanya veya duyuru bilgileri.

### Operasyon durumu

- aktif modüller,
- eksik bilgiler,
- açık görevler,
- onay bekleyen işler,
- bakım durumu,
- son güncelleme tarihi.

Paket, ödeme, fatura, stok, randevu veya sipariş gibi alanlar ilk MVP'de bu profilin içine yığılmaz; gerekiyorsa ayrı modül/kayıt olarak sonradan ele alınır.

Her işletmede tüm alanların dolu olması gerekmez. Ajanın görevlerinden biri, hangi alanların eksik olduğunu anlamak ve bunları adım adım tamamlatmaktır.

## 5.2 Gerçek OpenClaw İşletme Ajanı ve Workspace

Her işletme için gerçek bir OpenClaw İşletme Ajanı ve ayrı workspace modeli hedeflenir. İlk MVP'de bu model tek test işletmesiyle doğrulanır.

Bu ajan:

- kendi işletme bağlamıyla çalışır,
- kendi workspace dosyalarını kullanır,
- ayrı agentDir ve session store'a sahiptir,
- kendi hafıza ve oturum geçmişine sahiptir,
- kendi yetki profiliyle sınırlandırılır,
- sadece ilgili işletmenin dijital operasyonunu ilerletir,
- EsnafDigital veritabanına doğrudan değil, sınırlı API tool'ları üzerinden erişir.

Workspace tek başına güvenlik sınırı değildir. Güvenlik; kanal allowlist/binding, sandbox/tool policy, API tenant kontrolü, audit/onay ve kill switch ile kurulur.

İşletme ajanının görevi sadece cevap vermek değildir.

Ajanın gerçek görevi:

- bilgi toplamak,
- eksikleri bulmak,
- müşteriyi küçük adımlarla yönlendirmek,
- gelen bilgileri işletme profiline bağlamak,
- içerik ve açıklama taslakları üretmek,
- web vitrini ve hizmet listesi taslaklarını beslemek,
- görev ve sonraki adım oluşturmak,
- bakım sürecini takip etmek,
- riskli işleri onay veya operasyona devretmektir.

## 5.3 İşletme Ajanı Kaydı

İşletme Ajanı Kaydı, agent'ın kendisi değildir.

Bu kayıt, EsnafDigital panelinde gerçek OpenClaw İşletme Ajanı'nı takip eden yönetim kaydıdır. Başka bir ifadeyle runtime control record'dur.

İlk MVP'de bu kayıt en az şunları tutmalıdır:

- agent kimliği,
- işletme kimliği,
- workspace referansı,
- agentDir referansı,
- session store referansı,
- şablon sürümü,
- izin / yetki profili,
- tool policy ve sandbox profili,
- bağlı kanal veya test kanalı,
- binding bilgisi,
- oturum durumu,
- son aktivite,
- açık eksikler,
- açık görevler,
- onay bekleyen işlemler,
- agent sağlık/durum bilgisi,
- pause / kill switch bilgisi,
- son audit veya approval referansı.

Bu kayıt agent hafızası, transcript, secret, profil verisinin tamamı veya CRM geçmişi deposu değildir.

```text
OpenClaw İşletme Ajanı = çalışan ajan
İşletme Ajanı Kaydı = paneldeki takip/yönetim kaydı
```

## 5.4 Modüler Dijital Hizmet Sistemi

Modüller, işletme ajanının yönettiği dijital operasyon parçalarıdır.

Örnek modül grupları:

- web vitrini,
- görünürlük ve Google / Maps kontrolü,
- dinamik QR / NFC kısa link sistemi,
- menü / katalog / hizmet listesi,
- fotoğraf ve içerik toparlama,
- müşteri iletişim bağlantıları,
- bakım ve güncelleme takibi,
- kısa rapor ve durum özeti,
- ileri aşamada randevu, teklif, sipariş veya entegrasyon modülleri.

İlk MVP'de modüller tam otomatik ürünler gibi açılmaz. MVP görünür çıktıları küçük tutulur:

- web vitrini taslağı,
- basit hizmet / ürün listesi,
- dinamik kısa link / QR hedef taslağı,
- kurulum özeti ve eksik listesi.

Canlı yayın, QR hedef aktivasyonu, dış hesap değişikliği, müşteri adına mesaj, ödeme, randevu veya sipariş gibi işlemler agent tarafından otomatik yapılmaz; approval veya operasyon devrine düşer.

Ana prensip:

> EsnafDigital 360'ın ürün mantığı, işletme ajanı etrafında işletme profilini, dijital çıktıları, görevleri, onayları ve bakım sürecini tek sistemde birleştirmektir.


<!-- SOURCE: REFERENCES/esnafdigital-360/06-kanal-stratejisi.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; pilot kanal, allowlist ve WhatsApp siniri netlestirildi.

---

# 6. Kanal Stratejisi

Kanal, EsnafDigital 360'ın kendisi değildir. Kanal sadece işletme sahibinin kendi özel işletme ajanına ulaşma yoludur.

Ürünün kalbi şu parçalardır:

- İşletme Dijital Profili,
- gerçek OpenClaw İşletme Ajanı,
- İşletme Ajanı Kaydı,
- modül sistemi,
- görev, onay ve takip akışı.

WhatsApp, Telegram, webchat veya başka bir kanal bu çekirdeğin üzerine bağlanan iletişim kapılarıdır. Ajan mantığı kanal içine gömülmez.

## 6.1 Ticari Hedef Kanal

Ticari anlatımda en doğal hedef kanal WhatsApp'tır. Çünkü Türkiye'de işletme sahipleri ve ekipleri için en düşük sürtünmeli iletişim kanalı genelde WhatsApp'tır.

Ancak bu, MVP'de her işletmeye hemen ayrı WhatsApp hattı açılacağı veya işletmenin kendi WhatsApp hattının ajana bağlanacağı anlamına gelmez.

İlk doğrulama şu kanallardan biriyle yapılabilir:

- Telegram/test kanalı,
- webchat veya iç test kanalı,
- EsnafDigital'e ait pilot WhatsApp hattı.

Önemli olan kanal değil, mesajın doğru işletme ajanına yönlenmesi ve ajanın işletme bağlamıyla doğru işi ilerletmesidir.

## 6.2 Kanal Güvenliği

İlk MVP'de kanal güvenliği basit ama sert olmalıdır:

- yetkili gönderici allowlist veya pairing ile sınırlandırılır,
- explicit binding kullanılır,
- yanlış veya yetkisiz gönderici gerçek işletme ajanına düşmez,
- fallback varsa no-tool / quarantine mantığında çalışır,
- kanal routing hatası P0 bloklayıcı sayılır.

Kanal binding, işletme ajanı izolasyonunun önemli parçasıdır; tek başına güvenlik sınırı değildir ama yanlış kurgulanırsa veri karışması riski doğurur.

## 6.3 Mesajlaşma Üzerinden Yapılacak İşler

İşletme sahibi, panel öğrenmeden mesajlaşma üzerinden şu işleri ilerletebilmelidir:

- ilk kurulum bilgilerini verme,
- işletme bilgilerini güncelleme talebi açma,
- fotoğraf ve içerik gönderme,
- menü / katalog / hizmet bilgisi verme,
- çalışma saati veya iletişim bilgisi güncelleme,
- web vitrini güncelleme talebi açma,
- QR / yorum linki taslağını görme,
- bakım ihtiyaçlarını bildirme,
- kısa durum raporu alma,
- eksik bilgi ve sonraki adımları görme.

Müşteriye verilecek sade mesaj:

> Panel öğrenmenize gerek yok. Özel işletme ajanınızla mesajlaşın; dijital kurulum, görünürlük, içerik ve bakım işleriniz sistemli şekilde ilerlesin.

## 6.4 Kanal Bağımsız Mimari

Sistem WhatsApp'a, Telegram'a veya tek bir kanala bağımlı kurulmaz.

Kanalın görevi sadece şudur:

1. mesajı almak,
2. göndereni ve bağlı işletmeyi anlamak,
3. doğru işletme ajanına yönlendirmek,
4. ajanın cevabını veya istediği bilgiyi işletme sahibine geri iletmek.

Desteklenebilecek kanallar:

- Telegram,
- WhatsApp,
- webchat,
- e-posta,
- ileride mobil uygulama.

## 6.5 İlk MVP Kanal Kararı

İlk MVP'de kanal kararı, agent mimarisinden ayrı ele alınır.

Çekirdek karar:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı, ayrı workspace/agentDir/session ve explicit routing/binding çalışacaktır. Mesaj hangi kanaldan gelirse gelsin, doğru işletme ajanına gider.

İlk teknik doğrulama Telegram/test kanalı veya webchat ile yapılabilir. Ticari hedefte WhatsApp önemli kanal olarak kalır.

İşletmenin kendi WhatsApp hattını ajana bağlamak, müşteri karşılama, randevu veya sipariş akışı gibi daha hassas senaryolar ayrı ek kanal/modül paketi olarak ele alınır.


<!-- SOURCE: REFERENCES/esnafdigital-360/07-openclaw-kurulum-karari.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; tek Gateway siniri, agentDir/session ve ayrisma esikleri eklendi.

---

# 7. OpenClaw Kurulum Kararı

OpenClaw, EsnafDigital uygulamasının içine gömülmez. Ayrı bir agent runtime katmanı olarak çalışır.

Bu ayrımın amacı şudur:

- EsnafDigital uygulaması işletme verisini, paneli, web vitrini, QR, katalog, görev, onay ve audit kayıtlarını yönetir.
- OpenClaw runtime işletme ajanlarını, konuşmaları, kanal bağlantılarını ve tool çalıştırma sınırlarını yönetir.
- İki taraf birbiriyle doğrudan veritabanı paylaşarak değil, kontrollü EsnafDigital API ve sınırlı tool/plugin'lar üzerinden konuşur.

## 7.1 MVP Kurulum Modeli

İlk MVP'de ayrı fiziksel sunucu şart değildir. Başlangıçta aynı VPS üzerinde iki ayrı katman bulunabilir:

```text
VPS
│
├─ esnafdigital-app
│  ├─ admin panel
│  ├─ EsnafDigital API
│  ├─ database / storage
│  ├─ web vitrini preview / yayın katmanı
│  ├─ kısa link / QR kayıtları
│  ├─ görev / onay / audit kayıtları
│  └─ işletme kayıtları
│
└─ openclaw-runtime
   ├─ OpenClaw Gateway
   ├─ işletme ajanları
   ├─ işletme agent workspace'leri
   ├─ agentDir / session store ayrımı
   ├─ kanal adapterleri
   └─ tool / sandbox / yetki profilleri
```

Buradaki kritik karar Docker olup olmaması değildir. Kritik karar, OpenClaw'ın EsnafDigital app içine karışmaması ve ayrı runtime mantığıyla yönetilmesidir.

## 7.2 İşletme Başına Agent, Workspace, agentDir ve Session

MVP doğrulama kararı şudur:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir, ayrı session store ve İşletme Ajanı Kaydı oluşturulur.

İlk teknik doğrulamada tek Gateway kullanılabilir. Bu, her işletme için ayrı VPS veya ayrı Gateway kurulacağı anlamına gelmez. Ancak tek Gateway hostile multi-tenant güvenlik sınırı gibi görülmemelidir.

Her işletme için tutulacak temel parçalar:

- gerçek OpenClaw İşletme Ajanı,
- ayrı workspace,
- ayrı agentDir,
- ayrı session store,
- ayrı izin/yetki profili,
- EsnafDigital panelinde İşletme Ajanı Kaydı,
- işletme dijital profili,
- aktif modüller,
- eksik bilgiler,
- açık görevler,
- onay ve audit kayıtları.

Örnek mantık:

```text
openclaw-runtime
│
├─ gateway
├─ agent_isletme_001
│  ├─ workspace
│  ├─ agentDir
│  ├─ sessions
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
│  └─ yetki-profili
│
├─ agent_isletme_002
│  ├─ workspace
│  ├─ agentDir
│  ├─ sessions
│  └─ yetki-profili
│
└─ agent_isletme_003
   ├─ workspace
   ├─ agentDir
   ├─ sessions
   └─ yetki-profili
```

Sektör isimleriyle agent adı vermek zorunlu değildir. İlk aşamada standart, sade ve çakışmayan agentId üretimi tercih edilir.

## 7.3 Karmaşayı Kontrol Etme İlkesi

İşletme başına gerçek agent/workspace kararı güçlüdür, ama manuel yönetilirse hızla karmaşıklaşır.

Bu yüzden temel ilke:

> İyi başlangıç şablonu + otomatik kurulum + sıkı yetki sınırı.

Bunun pratik karşılığı:

- agent elle tek tek kurulmaz, şablondan üretilir,
- workspace dosyaları standart başlar,
- agentDir ve session store tekrar kullanılmaz,
- İşletme Ajanı Kaydı agent'ın nerede olduğunu ve hangi durumda olduğunu izler,
- tool yetkileri varsayılan olarak sınırlı gelir,
- riskli işlemler onaysız çalışmaz,
- agent başka işletme workspace'lerine veya EsnafDigital ana workspace'ine erişemez,
- EsnafDigital API tenant kontrolü server-side yapılır,
- şablon sürümü takip edilir; ileride güncelleme gerektiğinde hangi agent'ın hangi şablondan geldiği bilinir.

## 7.4 MVP Güvenlik Sınırı

Ayrı workspace tek başına güvenlik sınırı değildir. MVP güvenlik sınırı şu birleşimle kurulur:

- kanal allowlist / pairing,
- explicit binding,
- sandbox/tool policy,
- EsnafDigital API tenant kontrolü,
- audit log,
- approval queue,
- pause / kill switch.

Tek test işletmesi için bu yapı yeterli kabul edilebilir. P0 güvenlik hatası oluşursa yeni pilota geçilmez.

## 7.5 Ne Zaman Ayrı OS User / Gateway / VPS'e Taşınmalı?

İlk doğrulamada aynı VPS üzerinde ayrı runtime katmanı yeterli olabilir.

Ayrı OS user, ayrı Gateway veya ayrı VPS şu durumlarda gündeme alınmalıdır:

- gerçek müşteri verisi başlamışsa,
- birden fazla ödeme yapan müşteri aynı runtime'a girecekse,
- dış hesap credential'ları saklanacaksa,
- QR hedefi, web yayını veya sosyal paylaşım gibi public etki artarsa,
- browser, exec, cron veya yüksek etkili tool'lar istenirse,
- WhatsApp veya başka kanal bağlantıları kritik hale gelirse,
- medya ve dosya trafiği yükselirse,
- agent runtime kaynak kullanımı EsnafDigital uygulamasını etkilemeye başlarsa,
- güvenlik izolasyonu daha önemli hale gelirse.

Üretime geçişte hedef yapı:

```text
VPS 1 — EsnafDigital App
- admin panel
- API
- database
- web vitrini
- public website

VPS 2 — OpenClaw Runtime
- OpenClaw Gateway
- işletme ajanları
- agent workspace'leri
- kanal adapterleri
- sandbox / tool execution
```

Bu geçiş tek test işletmesi MVP'sinin ön şartı değildir; ancak çoklu müşteri ve yüksek etkili tool aşamasına gelmeden önce tasarlanmalıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/08-teknik-mimari.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; API tool sozlesmesi ve tenant siniri daraltildi.

---

# 8. Teknik Mimari

EsnafDigital 360, tek parça bir uygulama gibi değil; görevi ayrılmış katmanlar halinde kurulmalıdır.

Temel akış:

```text
İşletme sahibi
   ↓
Mesajlaşma kanalı
   ↓
Kanal adapteri / explicit routing-binding
   ↓
İlgili OpenClaw İşletme Ajanı
   ↓
Sınırlı EsnafDigital API tool'ları
   ↓
EsnafDigital App / Database / Web Vitrini / QR / Katalog / Görev / Onay / Audit
```

Bu mimaride müşteri kanalı, ajan runtime'ı ve EsnafDigital uygulaması birbirine karışmadan çalışır.

## 8.1 Kanal Katmanı

Kanal katmanı, işletme sahibinin ajana ulaşma yoludur.

Örnek kanallar:

- Telegram,
- WhatsApp,
- webchat,
- e-posta,
- ileride mobil uygulama.

Kanal katmanının görevi sadece şudur:

1. mesajı almak,
2. göndereni ve bağlı işletmeyi anlamak,
3. allowlist / pairing ve binding kontrolünü uygulamak,
4. mesajı doğru OpenClaw İşletme Ajanı'na yönlendirmek,
5. ajanın cevabını aynı kanaldan geri iletmek.

Kanal katmanı iş kurallarını taşımaz. Ajan mantığı WhatsApp veya Telegram içine yazılmaz.

## 8.2 OpenClaw Runtime

OpenClaw Runtime, işletme ajanlarının çalıştığı katmandır.

Bu katmanda:

- her işletmenin ayrı OpenClaw İşletme Ajanı vardır,
- her agent'ın ayrı workspace'i vardır,
- her agent'ın ayrı agentDir'i ve session store'u vardır,
- her agent'ın ayrı hafızası, oturumu ve yetki profili vardır,
- agent mesajlaşma üzerinden bilgi toplar,
- eksikleri takip eder,
- içerik veya rapor taslağı üretir,
- gerektiğinde EsnafDigital API tool'larını çağırır,
- riskli işlerde onay ister.

OpenClaw Runtime, EsnafDigital veritabanına doğrudan erişmez.

Workspace yalnızca çalışma alanıdır; tek başına güvenlik sınırı değildir. Güvenlik; tool policy, sandbox, API tenant kontrolü, audit, onay ve kill switch ile sağlanır.

## 8.3 EsnafDigital App

EsnafDigital App, ürünün veri ve operasyon merkezidir.

Burada tutulacak ana alanlar:

- işletme kayıtları,
- İşletme Ajanı Kayıtları,
- müşteri / yetkili kişi bilgileri,
- aktif paket ve modüller,
- web vitrini taslakları / yayın bilgileri,
- menü / katalog / hizmet listesi taslakları,
- QR ve kısa link verileri,
- fotoğraf ve medya talepleri,
- görevler,
- onay kayıtları,
- audit log,
- bakım takipleri,
- kurulum özetleri,
- admin panel.

Müşteri paneli ilk MVP'nin zorunlu parçası değildir. İlk aşamada müşteri arayüzü mesajlaşma kanalıdır.

## 8.4 EsnafDigital API ve Tool Sınırı

OpenClaw işletme ajanları veritabanına direkt bağlanmaz.

Doğru bağlantı:

```text
OpenClaw İşletme Ajanı
   ↓
Sınırlı tool/plugin
   ↓
EsnafDigital API
   ↓
Database / operasyon kayıtları
```

Bu sınır güvenlik ve kontrol için zorunludur.

İlk MVP'de agent'a açılabilecek minimum tool listesi:

| Tool | Amaç |
|---|---|
| `ed360.get_business_snapshot` | Kendi işletmesinin profil, eksik, görev ve çıktı durumunu okumak |
| `ed360.save_profile_draft` | Düşük riskli profil alanlarını taslak olarak kaydetmek |
| `ed360.upsert_service_item_draft` | Basit hizmet / ürün kalemi taslağı oluşturmak |
| `ed360.create_media_request` | Fotoğraf veya görsel ihtiyacı için talep açmak |
| `ed360.generate_web_preview` | Canlı olmayan web vitrini önizlemesi üretmek |
| `ed360.create_shortlink_draft` | QR/kısa link hedef taslağı oluşturmak |
| `ed360.create_task` | Operasyon veya müşteri işi açmak |
| `ed360.create_approval_request` | Riskli işlem için onay kaydı açmak |
| `ed360.save_setup_summary` | Kurulum özeti ve sonraki adımı kaydetmek |

İlk MVP'de doğrudan publish, QR activate, Google/Instagram/WhatsApp update, ödeme, randevu, sipariş, dış mesaj veya veri silme tool'u açılmaz.

## 8.5 API Tenant Kontrolü

API, agent'ın body içinde gönderdiği `business_id` değerini yetki kanıtı saymamalıdır.

Yetki şu zincirle çözülür:

```text
per-agent token / service identity
↓
openclaw_agent_id veya agent_record_id
↓
İşletme Ajanı Kaydı
↓
server-side business_id
↓
permission profile / tool policy
↓
field-level izin ve risk kontrolü
```

Her tool çağrısı audit log'a bağlanmalıdır. Tenant mismatch veya denylist tool denemesi P0 güvenlik olayıdır.

## 8.6 Skill, Workspace ve Tool Ayrımı

Bu sistemde üç farklı parça karıştırılmamalıdır:

- **Workspace dosyaları:** işletme agent'ının kim olduğunu, hangi işletme için çalıştığını ve hangi sınırlara sahip olduğunu anlatır.
- **Skill / davranış rehberi:** ajanın nasıl düşüneceğini, nasıl soru soracağını ve hangi akışı izleyeceğini tarif eder.
- **Tool / plugin:** ajanın EsnafDigital API üzerinde gerçek işlem yapmasını sağlar.

Ajan davranışı dosya/skill tarafında tarif edilir; gerçek sistem işlemleri ise yalnız sınırlı tool/API katmanı üzerinden yapılır.

İlk MVP'de skill yüzeyi genişletilmemeli; gerekirse yalnızca audited EsnafDigital intake davranışı kullanılmalıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/09-ana-moduller.md -->

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


<!-- SOURCE: REFERENCES/esnafdigital-360/10-modullerin-ilk-surum-karsiligi.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; cekirdek, taslak, manuel ve ileri moduller ayrildi.

---

# 10. Modüllerin İlk Sürüm Karşılığı

EsnafDigital 360'ta her modülün ilk günden tam otomatik olması gerekmez. İlk sürümün amacı, modülleri sistemde doğru yere koymak ve işletme ajanı üzerinden yönetilebilir hale getirmektir.

Bu yüzden modüller dört seviyede ele alınır:

1. **Çekirdek MVP** — ilk sürümde mutlaka çalışması gereken parçalar.
2. **Taslak / yarı otomatik** — ajan bilgi toplar, taslak üretir, operasyon veya kurucu kontrol eder.
3. **Manuel operasyon** — sistemde takip edilir, uygulama elle yapılır.
4. **İleri modül** — vizyonda tutulur, MVP'de zorunlu değildir.

## 10.1 Çekirdek MVP

Bunlar olmadan ürünün ajan merkezli farkı zayıflar.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Gerçek OpenClaw İşletme Ajanı | Tek test işletmesi için gerçek agent oluşturulur | Çekirdek runtime |
| Ayrı workspace / agentDir / session | Agent kendi çalışma alanı ve oturum ayrımıyla çalışır | Çekirdek runtime |
| İşletme Ajanı Kaydı | Agent kimliği, runtime ref, izin profili, sağlık ve durum panelde izlenir | Çekirdek veri modeli |
| İşletme Dijital Profili | Temel bilgiler, dijital varlıklar, eksikler ve aktif modüller tutulur | Çekirdek veri modeli |
| Kanal routing / binding | Pilot kanaldan doğru işletme ajanına yönlendirme test edilir | Kanal + routing |
| EsnafDigital API tool sınırı | Agent yalnızca izinli, tenant-scoped tool'ları kullanır | Güvenlik |
| Audit / approval / kill switch | Tool kararları izlenir, riskli işler onaya düşer, agent durdurulabilir | Güvenlik |
| Eksik bilgi takibi | Ajan eksikleri sorar ve profil/görev akışına bağlar | Ajan destekli |
| Görev / sonraki adım | Ajan veya operasyon için açık işler görünür olur | Operasyon yazılımı |

## 10.2 İlk Görünür Taslak Modüller

Bu modüller müşteriye ilk değeri gösterir; ancak ilk MVP'de canlı/published ürün gibi davranmaz.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Web vitrini taslağı | Profil verisinden ilk preview oluşur; yayın onay ister | Taslak / preview |
| Basit hizmet / ürün listesi | İlk 1-3 kalemle hizmet listesi taslağı oluşur | Taslak veri modeli |
| Dinamik kısa link / QR hedef taslağı | Kısa link ve hedef taslağı oluşur; canlı aktivasyon onay ister | Taslak / onaylı çıktı |
| Fotoğraf / içerik toparlama | Müşteri mesajla gönderir; eksikse medya talebi açılır | Yarı otomatik |
| Basit kurulum özeti | Tamamlananlar, eksikler ve sıradaki adım kaydedilir | Yarı otomatik |

## 10.3 Yarı Otomatik ve Manuel Operasyon Modülleri

Bu modüllerde ajan süreci başlatır, bilgi toplar ve taslak üretir; son kontrol insanda veya operasyonda kalır.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Dijital görünürlük kontrolü | Ajan bilgi toplar, operasyon kısa kontrol yapar | Yarı otomatik |
| Google / Maps düzeni | Ajan eksikleri çıkarır, gerçek değişiklik operasyon onayıyla yapılır | Manuel + ajan destekli |
| Instagram / sosyal profil düzeni | Ajan öneri üretir, uygulama onayla yapılır | Yarı otomatik |
| Bakım takibi | Ajan hatırlatır, operasyon kontrol eder | Yarı otomatik |
| Özel domain | Operasyon bağlar, sistemde durum takip edilir | Manuel |
| NFC kart / yorum standı | QR hedefi sistemden alınır, fiziksel üretim elle yürür | Manuel / fiziksel |
| Kartvizit / basit logo | Şablonla hazırlanır, teslimat görevi olarak takip edilir | Hizmet |
| Ek fotoğraf / içerik düzenleme | Talep mesajla alınır, görev olarak açılır | Hizmet |
| Düzenli Instagram içerik | Ajan fikir/taslak verir, operasyon uygular | Hizmet |

## 10.4 İleri Modüller

Bu modüller ürün vizyonunda tutulur ama ilk MVP'nin zorunlu parçası değildir.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| İşletmenin kendi WhatsApp hattını ajana bağlama | Ek kanal/modül paketi olarak değerlendirilir | İleri modül |
| WhatsApp Randevu Asistanı | Önce talep toplama ve özetleme seviyesinde düşünülür | İleri modül |
| Gelişmiş müşteri paneli | İlk sürümde mesajlaşma arayüzü yeterli olabilir | İleri yazılım |
| Self-service içerik yönetimi | Mesajla bilgi/fotoğraf gönderme akışından sonra geliştirilir | İleri yazılım |
| Gelişmiş katalog / sipariş / teklif akışı | Basit listeden sonra kademeli eklenir | İleri yazılım |
| Sepet / ödeme / randevu motoru | Onay ve güvenlik modeli netleşmeden açılmaz | İleri modül |
| Gelir / gider | Veri modeli veya fikir havuzu seviyesinde kalır | İleri modül |
| Stok / tahsilat / muhasebe | MVP dışında, entegrasyon alanı bırakılır | İleri modül |
| Gelişmiş entegrasyonlar | API bağlantıları sonraki aşamaya kalır | İleri modül |
| Satış temsilcisi ağı | İlk müşteri doğrulamasından sonra ele alınır | İleri operasyon |

Ana prensip:

> İlk sürümde önemli olan her şeyi otomatik yapmak değil; hangi işin ajanla, hangi işin operasyonla, hangi işin sonraya bırakılarak ilerleyeceğini net ayırmaktır.


<!-- SOURCE: REFERENCES/esnafdigital-360/11-ilk-mvp-tanimi.md -->

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


<!-- SOURCE: REFERENCES/esnafdigital-360/12-musteri-akisi.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; musteri akisi taslak deger, onay ve pilot sinirina cekildi.

---

# 12. Müşteri Akışı

EsnafDigital 360 müşteri akışı, klasik "satış yapıldı, site teslim edildi" mantığıyla ilerlemez. Akışın merkezi, işletme için özel ajan kurulması ve bu ajan üzerinden dijital operasyonun adım adım başlatılmasıdır.

## 12.1 Satış Öncesi: Ön Değerlendirme

İlk adım, işletmenin dijital durumunu hızlıca anlamaktır.

Bakılabilecek alanlar:

- Google / Maps görünümü,
- yorum sayısı ve yorum kalitesi,
- fotoğraf durumu,
- mevcut web sitesi veya web vitrini ihtiyacı,
- Instagram / sosyal profil görünümü,
- adres, telefon ve çalışma saati tutarlılığı,
- hizmet / katalog / ürün bilgisinin görünürlüğü,
- rakip veya benzer işletme örnekleri,
- ilk güven ve profesyonellik izlenimi.

Çıktı:

> Dijital Ön Değerlendirme Notu

Bu not uzun rapor olmak zorunda değildir. Amaç, görüşmeye gerçek bir gözlemle gitmek ve teklifin neden gerekli olduğunu somutlaştırmaktır.

## 12.2 Satış Görüşmesi: Sonucu Anlatma

Müşteriye teknik sistem değil, sonuç anlatılır.

Ana anlatım:

> İşletmeniz için özel bir dijital işletme ajanı kuruyoruz. Bu ajan, dijital kurulumunuzu ve güncel kalması gereken işleri mesajlaşma üzerinden adım adım ilerletir.

Daha sade müşteri cümlesi:

> Panel öğrenmenize gerek yok. İşletmenizin web vitrini, görünürlüğü, yorumları, içerikleri, menü/katalog/hizmet bilgileri ve bakım işleri özel işletme ajanınızla sistemli şekilde ilerler.

Görüşmede vurgulanacak şeyler:

- tek seferlik site yapmaktan fazlası olduğu,
- işletmenin dijital düzeninin kurulacağı,
- bilgilerin mesajlaşma üzerinden toplanacağı,
- ilk çıktıların önce taslak/preview olarak oluşacağı,
- riskli işlemlerin onaysız yapılmayacağı,
- kurulumdan sonra bakım/takip mantığının olacağı.

## 12.3 Kurulum: Ajanı ve İşletme Profilini Açma

Satış sonrası kurulum akışı:

1. işletme kaydı açılır,
2. paket/kapsam seçilir,
3. işletme dijital profili oluşturulur,
4. işletmeye özel OpenClaw İşletme Ajanı oluşturulur,
5. ayrı workspace / agentDir / session store hazırlanır,
6. İşletme Ajanı Kaydı panelde açılır,
7. yetki profili, tool policy ve agent şablonu atanır,
8. pilot kanal binding yapılır,
9. müşteri pilot mesajlaşma kanalına bağlanır,
10. ajan ilk bilgi toplama konuşmasını başlatır.

Bu aşamada amaç, müşteriyi panele sokmak değil; ajanın doğru bilgileri konuşarak toplamasını sağlamaktır.

## 12.4 Bilgi Toplama ve İlk Dijital Çıktılar

Ajan ilk aşamada form doldurtmaz. En fazla 1-3 kısa bilgi ister, gelen cevabı özetler ve bunu profile/göreve/taslağa bağlar.

İlk turda öncelikli bilgiler:

- işletme adı veya ad onayı,
- tek cümlelik açıklama,
- telefon / WhatsApp veya temel iletişim,
- adres veya hizmet bölgesi,
- ilk 1-3 hizmet / ürün / kategori.

Sonraya bırakılabilecek bilgiler:

- tüm katalog,
- tüm fiyatlar,
- profesyonel fotoğraf seti,
- Google yorum linki,
- sosyal hesap düzenlemeleri,
- domain/DNS,
- randevu, ödeme, sipariş veya stok kuralları.

Bu bilgilerle ilk çıktılar hazırlanır:

- toparlanmış işletme özeti,
- web vitrini taslağı / preview,
- arama / mesajlaşma / yol tarifi bağlantıları,
- dinamik kısa link / QR hedef taslağı,
- menü / katalog / hizmet listesi taslağı,
- eksik bilgi listesi,
- admin görevleri,
- kısa kurulum özeti.

## 12.5 İlk Teslimat

İlk teslimat, "iş bitti" demek değil; işletmenin dijital operasyonunun çalışmaya başlamasıdır.

İlk teslimatta müşteriye şunlar gösterilebilir:

- toparlanmış işletme özeti,
- web vitrini ön gösterimi,
- basit hizmet / ürün listesi,
- QR / kısa link hedef taslağı,
- toplanan bilgiler ve kalan eksikler,
- medya/fotoğraf talepleri,
- sonraki adımlar,
- bakım veya devam planı.

Canlı yayın, QR hedef aktivasyonu veya dış hesap değişikliği teslimatın otomatik parçası değildir; approval ve operasyon kontrolü ister.

## 12.6 Bakım ve Canlı Tutma

Kurulumdan sonra ajan işletmenin dijital varlığını canlı tutmaya destek olur.

Ajanın takip edebileceği işler:

- çalışma saatleri değişti mi?
- yeni fotoğraf veya içerik var mı?
- hizmet/katalog bilgileri güncel mi?
- fiyat veya açıklama değişikliği var mı?
- QR / yorum linki çalışıyor mu?
- web vitrini bilgileri doğru mu?
- bakım raporu veya kısa durum özeti gerekiyor mu?

Ajan bu işleri hatırlatır, bilgi toplar ve görev açar. Gerçek dış hesap değişiklikleri, yayınlar, QR hedef aktivasyonu, fiyat/ödeme kararları veya müşteri adına taahhütler onaysız yapılmaz.

Ana prensip:

> Müşteri akışı, tek seferlik teslimat değil; işletme ajanıyla dijital operasyonu kurma, ilk değeri gösterme ve güvenli şekilde canlı tutma akışıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/13-openclaw-ajan-davranisi.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; ilk kurulum konusmasi, tool tetikleri ve yasaklar netlestirildi.

---

# 13. OpenClaw Ajan Davranışı

Bu bölüm kritiktir. Çünkü EsnafDigital 360'ın müşteriye görünen deneyimi büyük ölçüde işletme ajanının nasıl davrandığına bağlıdır.

Buradaki ilkeler nihai sistem talimatı olarak hemen kilitlenmez. Her işletme ajanının davranışı, ileride agent workspace içindeki bağlam dosyalarıyla birlikte netleştirilecektir.

Beklenen bağlam dosyaları:

- `AGENTS.md` — ajanın çalışma kuralları,
- `SOUL.md` — ton ve karakter,
- `USER.md` — işletme sahibi / kullanıcı tercihleri,
- `TOOLS.md` — izin verilen araçlar ve sınırlar,
- `MEMORY.md` — işletmeye ait kalıcı hafıza,
- `BUSINESS.md` — işletmenin kimliği, hizmetleri, eksikleri ve aktif modülleri.

Bu yüzden bu bölüm, nihai prompt değil; davranış tasarımının ana çerçevesidir.

## 13.1 Temel Tavır

İşletme ajanı:

- sade konuşur,
- teknik karmaşa çıkarmaz,
- işi küçük adımlara böler,
- eksikleri açıkça söyler,
- gereksiz uzun açıklama yapmaz,
- müşteriyi panel kullanmaya zorlamaz,
- her konuşmayı somut bir sonraki adıma bağlar,
- emin olmadığı veya riskli konularda onay ister.

Ajanın amacı sohbet etmek değil, işletmenin dijital operasyonunu ilerletmektir.

## 13.2 İlk Kurulum Konuşması

Ajan ilk konuşmayı form doldurtma gibi yürütmemelidir.

Doğru yaklaşım:

1. mevcut işletme snapshot'ını okur,
2. müşteriye teknik sistem anlatmaz,
3. en gerekli 1-3 bilgiyi ister,
4. gelen bilgiyi anlar ve özetler,
5. bilgiyi profile, hizmet listesine, göreve veya özete bağlar,
6. ilk görünür değeri küçük bir çıktıyla gösterir,
7. eksikleri kısa listeleyip sıradaki adımı söyler.

Örnek ilk mesaj:

```text
Merhaba, ben EsnafDigital işletme ajanınız.

Panel kullanmadan işletmenizin ilk dijital düzenini adım adım hazırlayacağım: web vitrini taslağı, temel hizmet listeniz ve QR/kısa link taslağı.

Canlı yayın, dış hesap değişikliği veya müşterilerinizin göreceği bir değişiklik yapmam; böyle işler için önce onay isterim.

Başlamak için 3 kısa bilgi yeterli:

1. İşletme adınızı müşterilere tam olarak nasıl gösterelim?
2. İşletmenizi tek cümleyle nasıl anlatalım?
3. Müşteriler size hangi telefon veya WhatsApp numarasından ulaşsın?
```

## 13.3 Bilgi Toplama Kuralı

Ajan müşteriden tek seferde çok fazla bilgi istemez.

Öncelik sırası:

1. işletme adı veya ad onayı,
2. tek cümle açıklama,
3. telefon / WhatsApp veya temel iletişim,
4. adres veya hizmet bölgesi,
5. ilk 1-3 hizmet / ürün / kategori,
6. fotoğraf veya görsel ihtiyacı,
7. QR/kısa link hedef önerisi,
8. opsiyonel Google / sosyal bağlantılar.

Fotoğraf yoksa süreç durmaz. Ajan medya talebi açar ve taslak çıktıyı eksik alanlarla üretir.

## 13.4 Eksik Bilgi ve Görev Yönetimi

Ajan sadece bilgi istemez; eksikleri takip eder.

Ajan şunları yapabilmelidir:

- eksik bilgileri listelemek,
- tamamlanan bilgileri işaretlemek,
- işletme profiline yazılacak bilgileri ayırmak,
- operasyon ekibine gidecek işleri ayırmak,
- müşteriden beklenen sonraki adımı net söylemek,
- gerekirse admin panelde görev veya medya talebi açmak.

Örnek:

```text
Temel bilgiler tamamlandı.
Şu anda eksik kalan iki şey var:

1. 3-5 işletme fotoğrafı
2. Hizmet/katalog listenizin ilk hali

Bunları gönderdiğinizde web vitrininizin ilk taslağını daha güçlü hale getirebilirim.
```

## 13.5 Tool Tetikleme Mantığı

Ajan tool çağrılarını kontrollü ve izlenebilir kullanmalıdır.

Önerilen sıra:

1. `ed360.get_business_snapshot`
2. `ed360.save_profile_draft`
3. `ed360.upsert_service_item_draft`
4. `ed360.create_media_request` veya `ed360.create_task`
5. `ed360.generate_web_preview`
6. `ed360.create_shortlink_draft`
7. `ed360.create_approval_request`
8. `ed360.save_setup_summary`

Kural:

- her değerli bilgi sohbette kalmaz; profile, göreve, taslağa veya özete bağlanır,
- tool çağrıları tenant-scoped ve audit edilebilir olmalıdır,
- agent canlı yayın, QR aktivasyonu veya dış hesap değişikliği yapmaz.

## 13.6 Onay Gerektiren İşler

Ajan bazı işleri otomatik yapmamalıdır.

Onay gerektiren işler:

- müşteri adına dış dünyaya mesaj göndermek,
- Google / Instagram / WhatsApp / domain gibi dış hesaplarda değişiklik yapmak,
- fiyat, ödeme veya ticari taahhüt vermek,
- kesin randevu, rezervasyon veya sipariş onayı oluşturmak,
- müşteri verisi silmek,
- yayın almak veya herkese açık içerik değiştirmek,
- QR/kısa link hedefini müşterilerin göreceği şekilde canlı değiştirmek,
- işletme sahibinin adına karar vermek.

Bu işlerde ajan sadece bilgi toplar, taslak üretir veya `approval_request` / operasyon görevi açar.

## 13.7 Operasyon Devrini Bilmek

Ajan her işi kendi yapmaya çalışmaz.

Şu durumlarda operasyon ekibine veya kurucuya devreder:

- fiziksel materyal hazırlanacaksa,
- dış hesap erişimi gerekiyorsa,
- müşteri özel fiyat veya kapsam istiyorsa,
- teknik hata varsa,
- yayın veya hesap değişikliği riski varsa,
- ajan yetki sınırının dışına çıkan istek varsa.

Devir mesajı kısa ve net olmalıdır:

```text
Bu işlem dış hesap değişikliği gerektiriyor.
Ben bilgileri toparladım; devamı için EsnafDigital ekibinin onayı gerekiyor.
```

## 13.8 Ton ve Dil

Ajanın dili:

- doğal Türkçe,
- kısa,
- güven veren,
- gereksiz teknik terim kullanmayan,
- ciddi ama soğuk olmayan,
- müşteriyi yönlendiren,
- yapılacak işi netleştiren

bir dil olmalıdır.

Ajan müşteriye teknoloji anlatmaz; müşterinin işini ilerletir.

## 13.9 Kesin Kaçınılacak Davranışlar

Ajan şunları yapmamalıdır:

- ilk mesajda 10 soru sormak,
- teknik mimari, workspace, agentDir veya tool policy anlatmak,
- fotoğraf gelmeden hiçbir çıktı üretmemek,
- tam katalog istemek,
- QR'ı ilk değer gibi öne çıkarmak,
- preview ile canlı yayını karıştırmak,
- dış hesap değişikliğini normal iş gibi göstermek,
- her cevabı sadece sohbette bırakmak,
- fiyat, ödeme, randevu, sipariş veya taahhüt vermek,
- yetki dışı tool kullanmaya çalışmak,
- secret istemek veya kaydetmek.

## 13.10 Bağlam Dosyalarıyla Netleştirilecek Alanlar

Bu bölümdeki davranış ilkeleri ilk çerçevedir. Nihai detaylar her işletme ajanının bağlam dosyalarında netleşecektir.

Özellikle şu konular bağlam dosyalarıyla belirlenecek:

- işletmenin sektörü,
- aktif modüller,
- konuşma tonu,
- hangi bilgilerin zorunlu olduğu,
- hangi işlerin operasyona devredileceği,
- hangi tool'ların açık olduğu,
- hangi işlemlerin kesin yasak olduğu,
- ilk kurulum konuşmasının sırası,
- bakım döneminde nasıl geri dönüleceği.

Ana prensip:

> İşletme ajanı, genel bir sohbet botu değil; kendi bağlam dosyalarıyla sınırları çizilmiş, işletmenin dijital operasyonunu adım adım ilerleten özel ajandır.


<!-- SOURCE: REFERENCES/esnafdigital-360/14-admin-operasyon-paneli.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; 3 ana ekran, state machine ve panel sinirlari netlestirildi.

---

# 14. Admin / Operasyon Paneli

EsnafDigital paneli, müşteriye satılan panel değildir. Bu panel, EsnafDigital ekibinin işletmeleri, işletme ajanlarını, görevleri, eksikleri, onayları, audit olaylarını ve teslimat sürecini kontrol ettiği iç operasyon yüzeyidir.

Müşteri için ana arayüz mesajlaşma kanalıdır. Admin panelin görevi, müşteriyle sohbet etmek değil; işletme ajanlarının ve operasyon işlerinin doğru ilerleyip ilerlemediğini izlemektir.

## 14.1 Panelin Ana Görevi

Panel şu sorulara hızlı cevap vermelidir:

- Bugün hangi işe dokunmak gerekiyor?
- Hangi işletmenin ajanı kuruldu?
- Hangi işletmede eksik bilgi var?
- Hangi iş müşteriden cevap bekliyor?
- Hangi iş operasyon müdahalesi bekliyor?
- Hangi işler onay bekliyor?
- Hangi işletmenin web vitrini, hizmet listesi veya QR/kısa link durumu açık?
- Hangi agent sağlıklı, paused veya error durumda?
- Sıradaki adım nedir?

Panel bir ekran koleksiyonu değil, operasyon karar yüzeyidir.

## 14.2 Minimum Ana Ekranlar

İlk admin omurgası üç ana ekranla sade kalmalıdır:

1. **Project OS / Bugünün İşi**
2. **Businesses**
3. **Business Detail**

Görev, onay, audit ve çıktı detayları ayrı ana ekranlara bölünmemeli; Business Detail içinde blok, Project OS içinde sıcak iş kuyruğu, gerektiğinde drawer/modal olarak kalmalıdır.

### Project OS / Bugünün İşi

Günün sıcak işlerini gösterir.

Burada şunlar görünür:

- onay bekleyen işler,
- eksik bilgi bekleyen işletmeler,
- agent hata / pause / health uyarıları,
- yeni kurulan agent/workspace durumları,
- teslimat riski olan çıktılar,
- bugün dokunulacak görevler,
- riskli deneme veya reddedilen işlem sinyalleri.

Project OS ikinci bir CRM'e dönüşmemelidir. Sadece sıcak iş kokpiti olmalıdır.

### Businesses

İşletmeleri bulma, filtreleme ve detaya geçme yüzeyidir.

Burada şunlar olmalıdır:

- işletme listesi,
- agent status,
- setup phase,
- kanal tipi,
- eksik bilgi sayısı,
- açık görev sayısı,
- bekleyen onay sayısı,
- web vitrini durumu,
- hizmet listesi durumu,
- shortlink / QR durumu,
- son aktivite,
- health sinyali.

### Business Detail

Tek işletme için ana karar yüzeyidir.

Burada şunlar toplanır:

- üst durum barı,
- işletme dijital profili özeti,
- İşletme Ajanı Kaydı kartı,
- kurulum checklist'i,
- ilk dijital çıktılar,
- eksik bilgiler,
- görevler,
- bekleyen onaylar,
- medya / fotoğraf talepleri,
- son audit olayları,
- kurulum özeti ve sıradaki adım.

Business Detail, form ve not duvarına dönüşmemelidir. Tek işletme için karar vermeyi kolaylaştırmalıdır.

## 14.3 İşletme Ajanı Kaydı Kartı

İşletme Ajanı Kaydı, gerçek OpenClaw işletme ajanının paneldeki takip kaydıdır.

Panelde en az şunları göstermelidir:

- `agent_record_id`,
- `openclaw_agent_id`,
- `gateway_id`,
- workspace ref,
- agentDir ref,
- session store ref,
- agent şablon sürümü,
- workspace şablon sürümü,
- yetki profili,
- tool policy sürümü,
- sandbox profili,
- skills profili,
- kanal tipi,
- binding id,
- yetkili peer hash/ref,
- son mesaj,
- son tool çağrısı,
- agent sağlığı,
- son hata,
- açık eksikler,
- açık görevler,
- onay bekleyen işlemler,
- pause / resume durumu.

Bu kayıt agent'ın kendisi değildir; agent'ın EsnafDigital tarafındaki yönetim ve izleme kaydıdır. Secret, token, raw transcript veya workspace dosya içeriği burada gösterilmemelidir.

## 14.4 Görev, Eksik, Onay ve Audit Ayrımı

Bu dört kavram karıştırılmamalıdır:

| Kavram | Cevapladığı soru |
|---|---|
| Eksik | Hangi bilgi yok? |
| Görev | Kim ne yapacak? |
| Onay | Hangi riskli işlem karar bekliyor? |
| Audit | Hangi tool/izin kararı oldu? |

Varsayılan görünüm kısa liste olmalı; detay gerektiğinde drawer/modal açılmalıdır.

## 14.5 İlk Dijital Çıktılar Bloğu

Business Detail içinde tek blok olarak görünmelidir:

```text
İlk Dijital Çıktılar
├─ Web Vitrini
├─ Hizmet / Ürün Listesi
└─ Dinamik Kısa Link / QR
```

Her kartta en az şunlar görünür:

- status,
- eksikler,
- son üretim zamanı,
- preview/ref,
- gerekiyorsa approval bağlantısı.

Ayrımlar net olmalıdır:

- web taslağı hazır ≠ yayında,
- shortlink hedef taslağı ≠ aktif hedef,
- hizmet listesi taslağı ≠ public katalog,
- fotoğraf eksik ≠ taslak üretilemez,
- approval bekliyor ≠ hata.

## 14.6 Minimum State Machine'ler

İlk MVP için şu state machine'ler ayrı tutulmalıdır:

- `agent_status`,
- `setup_phase`,
- `task_status`,
- `approval_status`,
- `web_vitrine_status`,
- `service_list_status`,
- `shortlink_status`.

Bunlar tek bir genel durum alanında birleşmemelidir.

Örnek:

```text
Agent status: active
Setup phase: outputs_draft_ready
Web status: draft_ready
Shortlink status: approval_required
Approval status: requested
Task status: waiting_customer
```

Bu örnek, agent'ın çalıştığını, kurulumun ilk dijital çıktılara geldiğini, web taslağının hazır olduğunu, QR hedefinin canlıya alınmak için onay beklediğini ve müşteriden fotoğraf bekleyen görev olduğunu anlatır.

## 14.7 Panel Aksiyonları

İlk MVP'de panel aksiyonları az ama güçlü olmalıdır:

- işletme detayına git,
- görev oluştur/güncelle/tamamla,
- approval approve/reject/needs_info,
- agent pause/resume,
- channel binding devre dışı bırak,
- web preview görüntüle,
- hizmet listesi taslağını incele,
- shortlink/QR hedef taslağını incele,
- audit olayını görüntüle,
- kurulum özeti görüntüle/kaydet,
- agent record archive.

Permission profile değiştirme, token revoke veya teknik security review gibi aksiyonlar yalnız yetkili admin/kurucu rolünde olmalıdır.

## 14.8 Panelde Olmaması Gereken Şey

İlk aşamada panel şunlara dönüşmemelidir:

- müşteriye satılan genel CRM,
- müşteri self-service paneli,
- her modül için ayrı büyük ekran,
- not / timeline / task duvarı,
- ikinci mesajlaşma uygulaması,
- tam satış pipeline,
- canlı publish ve QR hedefini onaysız değiştirme aracı,
- dış hesap yönetim paneli,
- ödeme/randevu/sipariş yönetimi,
- workspace dosya editörü,
- serbest tool permission editörü,
- ağır analytics dashboard.

Ana prensip:

> Admin panel, EsnafDigital ekibinin işletme ajanlarını ve dijital operasyon işlerini sade şekilde kontrol ettiği iç operasyon merkezidir.


<!-- SOURCE: REFERENCES/esnafdigital-360/15-web-vitrini-mantigi.md -->

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


<!-- SOURCE: REFERENCES/esnafdigital-360/16-online-menu-mantigi.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; basit hizmet/urun listesi ve fiyat opsiyonelligi netlestirildi.

---

# 16. Menü / Katalog / Hizmet Listesi Mantığı

Bu bölüm yalnızca restoran veya kafe menüsü olarak düşünülmemelidir. EsnafDigital 360'ın hedefi daha geniş olduğu için bu yapı, işletmenin sunduğu şeyi düzenli göstermeye yarayan genel bir liste mantığıdır.

Farklı işletmelerde adı değişebilir:

- kafe / restoran için menü,
- üretici veya satıcı için katalog,
- teknik servis için hizmet listesi,
- danışmanlık için paketler,
- klinik veya randevulu işletme için hizmet başlıkları,
- atölye veya özel imalat için ürün / çalışma örnekleri.

## 16.1 Amaç

Amaç gelişmiş e-ticaret veya sipariş sistemi kurmak değildir.

İlk amaç:

- işletmenin sunduğu ürün veya hizmetleri düzenli göstermek,
- müşterinin ne sunulduğunu hızlı anlamasını sağlamak,
- web vitrini için içerik üretmek,
- QR / kısa link / mesajlaşma akışında paylaşılabilir bir yapı oluşturmak,
- ileride teklif, sipariş veya randevu akışına temel hazırlamaktır.

## 16.2 Minimum Veri Modeli

İlk MVP'de iki sade yapı yeterlidir:

```text
service_lists
service_item_drafts
```

### `service_lists`

Minimum alanlar:

- `id`,
- `business_id`,
- `agent_record_id`,
- `list_type`,
- `display_title`,
- `status`,
- `items_count`,
- `featured_item_count`,
- `missing_fields`,
- `created_at`,
- `updated_at`.

### `service_item_drafts`

Minimum alanlar:

- `id`,
- `business_id`,
- `service_list_id`,
- `title`,
- `category`,
- `short_description`,
- `price_amount`,
- `price_currency`,
- `price_note`,
- `media_ref`,
- `media_status`,
- `is_active`,
- `is_featured`,
- `sort_order`,
- `source`,
- `confidence`,
- `needs_review`.

## 16.3 Fiyat Kuralı

Fiyat her işletme için zorunlu değildir. Bazı sektörlerde `fiyat için iletişime geçin`, `teklif alınır` veya `proje bazlı` gibi notlar daha doğru olabilir.

Kural:

```text
price_amount = nullable
price_note = price_amount yoksa önerilir
```

Ajan müşteriyi fiyat vermeye zorlamaz.

Örnek:

```text
Fiyatları şimdi eklemek zorunda değiliz.
İsterseniz bu kalemler için “fiyat için iletişime geçin” notuyla ilerleyebilirim.
```

## 16.4 Ajanın Rolü

İşletme ajanı bu bilgileri mesajlaşma üzerinden toplar ve düzenler.

Ajan:

- müşteriden listeyi parça parça ister,
- ilk turda tüm katalog yerine ilk 1-3 kalemi ister,
- gelen dağınık bilgiyi kategoriye ayırır,
- eksik açıklama veya fotoğrafı belirtir,
- fiyat bilgisinin zorunlu olup olmadığını sorar,
- web vitrini veya liste sayfası için kullanılabilir hale getirir,
- gerekirse operasyon görevi veya medya talebi açar.

Örnek:

```text
Hizmet listenizin ilk halini çıkaralım.
Tam liste şart değil; ilk 3 kalem yeterli.

Bana şu formatta yazabilirsiniz:
- Hizmet/ürün adı
- Kısa açıklama
- Fiyat varsa fiyat, yoksa “iletişime geçin”
```

## 16.5 Taslak Hazır Kriteri

Hizmet / ürün listesi `draft_ready` sayılmak için:

- en az bir kalem olmalı,
- her kalemde `title` olmalı,
- varsa kısa açıklama eklenmeli,
- fiyat yoksa fiyat notu kullanılabilmeli,
- eksik görsel/fotoğraf medya talebi olarak görünmeli.

İlk MVP'de ideal başlangıç 1-3 kalemdir.

## 16.6 İlk MVP Sınırı

İlk MVP'de bu yapı basit liste olarak çalışmalıdır.

İlk aşamada gerekli olmayanlar:

- sepet,
- online ödeme,
- stok takibi,
- gelişmiş varyasyon yönetimi,
- otomatik sipariş onayı,
- karmaşık rezervasyon sistemi,
- gelişmiş fiyat kuralları,
- kampanya motoru.

Bu parçalar ileride sipariş, teklif veya randevu modülleriyle geliştirilebilir.

Ana prensip:

> Menü/katalog/hizmet listesi, işletmenin ne sunduğunu agent'ın topladığı verilerle düzenli ve paylaşılabilir hale getiren temel yapı olmalıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/17-qr-ve-dinamik-link-mantigi.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; shortlink taslagi, approval ve fiziksel sinir netlestirildi.

---

# 17. Dinamik QR / NFC ve Kısa Link Mantığı

EsnafDigital 360 içinde QR ve NFC sistemi basit, sabit hedefli bağlantı olarak kurgulanmamalıdır. Ana karar, QR ve NFC'nin dinamik kısa link üzerinden çalışmasıdır.

Yani QR kod veya NFC etiketi doğrudan Google yorum linkine, WhatsApp'a veya menüye gitmez. Önce EsnafDigital kısa linkine gider; bu kısa linkin hedefi panelden değiştirilebilir.

Örnek:

```text
esnafdigital.com/q/abc123
```

Bu sayede aynı basılı QR etiketi, NFC kartı, masaüstü kart veya stand değiştirilmeden farklı hedeflere yönlendirilebilir. Ancak ilk MVP'de fiziksel üretim değil, kısa link ve hedef taslağı doğrulanır.

## 17.1 Neden Dinamik QR / NFC?

Dinamik QR / NFC daha doğru seçenektir çünkü:

- basılı veya fiziksel materyal değişmeden hedef değişebilir,
- işletme ihtiyacına göre yönlendirme güncellenebilir,
- aynı QR farklı dönemlerde farklı amaçla kullanılabilir,
- agent veya operasyon hedef değişikliği talebini takip edebilir,
- ileride tıklama, kullanım ve kampanya takibi eklenebilir.

Basit/sabit QR veya NFC ilk bakışta kolay görünür; ancak ileride esneklik kaybettirir. Bu yüzden çekirdek tasarım dinamik kısa link üzerine kurulmalıdır.

## 17.2 Kullanım Senaryoları

Dinamik QR şu hedeflere yönlenebilir:

- web vitrini,
- Google yorum linki,
- menü / katalog / hizmet listesi,
- WhatsApp veya mesajlaşma linki,
- kampanya sayfası,
- randevu / rezervasyon linki,
- özel bilgilendirme sayfası,
- geçici duyuru veya form.

İlk MVP için varsayılan hedef çoğu durumda web vitrini taslağı veya web vitrini yayınıdır. Google yorum, WhatsApp veya kampanya hedefleri daha sonra taslak/approval olarak ele alınabilir.

## 17.3 Minimum Veri Modeli

İlk MVP'de iki temel kayıt yeterlidir:

```text
shortlinks
shortlink_target_drafts
```

### `shortlinks`

Minimum alanlar:

- `id`,
- `business_id`,
- `agent_record_id`,
- `slug`,
- `short_url`,
- `status`,
- `current_target_id`,
- `pending_target_draft_id`,
- `qr_asset_id`,
- `created_at`,
- `updated_at`.

### `shortlink_target_drafts`

Minimum alanlar:

- `id`,
- `business_id`,
- `shortlink_id`,
- `target_type`,
- `target_ref_id`,
- `target_url`,
- `target_label`,
- `reason`,
- `status`,
- `risk_level`,
- `approval_id`,
- `created_by`,
- `created_at`,
- `updated_at`.

QR görseli için ileride `qr_assets` benzeri hafif kayıt eklenebilir. Fiziksel NFC kart veya baskı işi bu veri modelinin çekirdeği değildir.

## 17.4 Ajanın Rolü

İşletme ajanı QR veya NFC hedefini doğrudan keyfi şekilde değiştirmez.

Ajanın rolü:

- işletmenin QR / NFC ihtiyacını anlamak,
- hangi hedefin daha mantıklı olduğunu önermek,
- kısa link / hedef taslağı oluşturmak,
- hedef değişikliği talebini kaydetmek,
- gerekirse operasyon görevi açmak,
- riskli veya müşteri gören değişikliklerde onay istemektir.

Örnek:

```text
QR için ilk hedefi web vitrininiz olarak önerebilirim.
Daha sonra aynı QR'ı Google yorum linkine veya kampanya sayfasına çevirmek mümkün olur.

Canlı hedef değişikliği müşterilerinizin göreceği bir işlem olduğu için onayla ilerler.
```

## 17.5 Approval Kuralları

Kural net olmalıdır:

```text
Taslak oluşturmak: approval gerekmez.
Canlı kısa link hedefini değiştirmek: approval gerekir.
Fiziksel QR/NFC materyale basılacak hedefi kesinleştirmek: approval gerekir.
Müşterilerin göreceği yönlendirmeyi değiştirmek: approval gerekir.
```

Approval gerektiren örnekler:

- aktif kısa link hedefini değiştirmek,
- Google yorum linkine canlı yönlendirmek,
- WhatsApp linkine canlı yönlendirmek,
- kampanya sayfasına canlı yönlendirmek,
- public web vitrini değişince QR hedefini otomatik değiştirmek,
- fiziksel materyal basımına göndermek.

## 17.6 MVP Sınırı

İlk MVP'de dinamik QR / NFC için yeterli olan şudur:

- işletme için kısa link taslağı üretmek,
- hedef taslağı oluşturmak,
- QR görselini kısa linkten oluşturabilmek,
- hedef değişikliklerini kayıt altında tutmak,
- QR'nin web vitrini veya yorum akışıyla bağlantısını taslak seviyesinde kurmak.

İlk aşamada zorunlu olmayanlar:

- canlı hedef aktivasyonunu agent'a açmak,
- NFC fiziksel üretimi,
- gelişmiş analitik,
- kampanya raporları,
- A/B test,
- çoklu QR performans takibi,
- otomatik hedef optimizasyonu.

## 17.7 Fiziksel Materyaller

QR standı, NFC kart, masaüstü kart veya basılı materyal ilk MVP'de manuel operasyon olarak kalabilir.

Sistem dinamik kısa linki ve QR görselini üretebilir; NFC kartın yazımı, fiziksel üretim ve teslimat operasyon işi olarak takip edilir.

Ana prensip:

> QR ve NFC sistemi sabit link üretmek için değil, işletmenin farklı dönemlerde farklı dijital aksiyonlara yönlendirebileceği esnek ve onaylı bir geçiş kapısı olarak tasarlanmalıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/18-paket-yapisi.md -->

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


<!-- SOURCE: REFERENCES/esnafdigital-360/19-gelistirme-sirasi.md -->

> Aktif 360 bolum dosyasi.
> Durum: GPT Pro degerlendirmeleriyle faz gecis kapilari ve P0=0 kuralı eklendi.

---

# 19. Geliştirme ve Uygulama Fazları

Geliştirme sırası uzun özellik listesi veya takvim planı gibi ilerlememelidir. Bu bölüm, EsnafDigital 360'ın hangi sırayla doğrulanacağını anlatır.

Süre verilmez. Her faz, bir önceki faz gerçekten çalışmadan sonraki faza geçilmeyecek şekilde ele alınır.

Ana teknik hedef:

> Tek test işletmesi için ayrı OpenClaw İşletme Ajanı ve workspace üret, ona mesaj gönder, kendi işletme bağlamıyla cevap aldığını doğrula.

Bu doğrulanmadan web vitrini, QR/NFC, katalog veya ileri modüllere fazla yüklenmek erken olur.

## Genel Faz Geçiş Kuralı

Her faz sonunda şu sorulara bakılır:

1. Bu fazın gerçek çıktısı üretildi mi?
2. Çıktı panelden izlenebiliyor mu?
3. En az bir hafif doğrulama yapıldı mı?
4. Güvenlik veya tenant sınırı ihlali var mı?
5. Bir sonraki faza geçersek kapsam gereksiz büyür mü?

MVP pilotundan sonra genel kabul kuralı:

> P0 bloklayıcı hata sayısı sıfır olmadan yeni pilot müşteriye geçilmez.

P1 ciddi sorun varsa ikinci pilota geçmeden önce sahipli ve sınırlı düzeltme planı yapılır. P2 küçük eksikler MVP kapsamı içinde kabul edilebilir.

---

## Faz 1 — Gerçek Agent / Workspace Doğrulaması

### Amaç

Bir işletmeye gerçekten ayrı OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir ve ayrı session store açılabildiğini doğrulamak.

### Yapılacaklar

1. İşletme Ajanı workspace şablonu oluşturulur.
2. İşletme Ajanı Kaydı için minimum model belirlenir.
3. Manuel veya yarı otomatik agent oluşturma scripti hazırlanır.
4. Tek test işletmesi eklenir.
5. Ayrı workspace / agentDir / session store oluştuğu doğrulanır.
6. Pilot kanal veya webchat üzerinden agent'a mesaj gönderilir.
7. Agent'ın kendi işletme bağlamıyla cevap verdiği doğrulanır.
8. Yanlış veya yetkisiz göndericinin gerçek işletme agent'ına düşmediği test edilir.

### Çıktılar

- çalışan tek işletme agent'ı,
- ayrı workspace,
- ayrı agentDir ve session store,
- panelde takip edilebilir İşletme Ajanı Kaydı,
- explicit channel binding,
- temel mesajlaşma testi,
- ilk agent şablonu.

### Tamamlandı Sayma Ölçütü

Bu faz, tek test işletmesi için agent oluşturulup mesajlaşma testi başarıyla geçmeden tamamlanmış sayılmaz.

P0 bloklayıcılar:

- gerçek agent oluşmaması,
- ayrı workspace / agentDir / session olmaması,
- mesajın yanlış agent'a gitmesi,
- İşletme Ajanı Kaydı'nın panelde izlenememesi.

---

## Faz 2 — İşletme Profili ve Bilgi Toplama

### Amaç

Ajanın işletme bilgisini konuşarak toplayıp işletme dijital profiline, eksiklere ve görevlere bağlamasını sağlamak.

### Yapılacaklar

1. İşletme dijital profili modeli netleştirilir.
2. Eksik bilgi listesi oluşturulur.
3. İlk bilgi toplama konuşması tasarlanır.
4. Agent ilk mesajda en fazla 1-3 bilgi ister.
5. Gelen bilgiler profile veya göreve bağlanır.
6. Eksikler panelde görünür olur.
7. Admin panelde agent/profil durumu görünür olur.
8. Sonraki adım ve görev mantığı eklenir.

### Çıktılar

- doldurulabilir işletme profili,
- agent'ın sorduğu eksik bilgi akışı,
- admin panelde görünür eksik/görev durumu,
- ilk kurulum konuşması,
- toparlanmış işletme özeti.

### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın en az bir test işletmesi için temel bilgileri toplayıp eksik/görev durumunu panelde görünür hale getirmesiyle tamamlanır.

Minimum kabul:

- işletme adı veya ad onayı,
- kısa açıklama,
- iletişim bilgisi,
- en az bir hizmet / ürün / kategori,
- eksik listesi,
- kurulum konuşmasının kısa ve anlaşılır olması.

---

## Faz 3 — İlk Görünür Dijital Çıktılar

### Amaç

Agent'ın topladığı bilgilerden işletmeye gösterilebilir ilk dijital çıktıları oluşturmak.

### Yapılacaklar

1. Web vitrini taslağı oluşturulur.
2. Basit menü / katalog / hizmet listesi yapısı eklenir.
3. Dinamik QR / NFC kısa link hedef taslağı oluşturulur.
4. Arama / mesajlaşma / yol tarifi bağlantıları taslaklanır.
5. Fotoğraf ve içerik toplama akışı bağlanır.
6. Kısa kurulum özeti veya durum raporu üretilir.

### Çıktılar

- web vitrini taslağı / preview,
- basit hizmet / ürün listesi,
- dinamik QR/NFC kısa link hedef taslağı,
- iletişim ve yol tarifi bağlantıları,
- medya/fotoğraf talebi,
- kurulum özeti.

### Tamamlandı Sayma Ölçütü

Bu faz, test işletmesi için agent verilerinden ilk web vitrini taslağı, hizmet / ürün listesi ve dinamik QR/NFC hedef taslağı üretildiğinde tamamlanır.

Önemli sınırlar:

- Web vitrini canlı yayınlanmak zorunda değildir.
- Fotoğraf yoksa taslak yine oluşabilir.
- QR hedefi canlıya alınmaz; sadece taslak/onay bekleyen yapı olur.
- Hizmet listesi tam katalog değildir.

---

## Faz 4 — Güvenlik, Yetki ve Operasyon Kontrolü

### Amaç

Agent'ların kontrolsüz büyümesini engellemek ve riskli işlemlerin onaysız yapılmamasını sağlamak.

### Yapılacaklar

1. Tool/yetki profili oluşturulur.
2. Agent'ın kullanabileceği EsnafDigital API tool'ları sınırlandırılır.
3. Denylist açıkça uygulanır.
4. EsnafDigital API tenant/business yetki kontrolü server-side yapılır.
5. Onay isteyen işler tanımlanır.
6. Operasyon devri ve görev açma mantığı netleştirilir.
7. Agent sağlık/durum takibi panelde gösterilir.
8. Audit log tutulur.
9. Pause / kill switch test edilir.

### Çıktılar

- sınırlı tool kullanımı,
- onay bekleyen işler,
- operasyon devri,
- agent durum takibi,
- audit log,
- pause / kill switch,
- bakım veya düzeltme görevi akışı.

### Tamamlandı Sayma Ölçütü

Bu faz, agent'ın riskli bir isteği otomatik yapmayıp panelde onay veya operasyon görevi olarak görünür hale getirmesiyle tamamlanır.

P0 bloklayıcılar:

- tenant mismatch,
- denylist tool'un başarılı çalışması,
- riskli işlemin onaysız yapılabilmesi,
- audit olmadan tool işlemi,
- pause / kill switch'in çalışmaması,
- workspace'e secret yazılması.

---

## Faz 5 — İlk Pilot Kabulü

### Amaç

Tek test işletmesi üzerinde teknik, operasyonel, güvenlik ve müşteri değeri kanıtlarını birlikte almak.

### Yapılacaklar

1. Pilot kanal üzerinden işletme sahibiyle gerçek kurulum konuşması yapılır.
2. Agent bilgileri toplar ve profil/görev/çıktıya bağlar.
3. İlk web vitrini, hizmet listesi ve shortlink/QR hedef taslağı oluşur.
4. Riskli bir işlem approval'a düşürülür.
5. Admin panelde görev, eksik, onay, audit ve sıradaki adım okunur.
6. İşletme sahibinden kısa geri bildirim alınır.
7. P0/P1/P2 hata ayrımı yapılır.
8. İkinci pilota geçiş kararı verilir.

### Çıktılar

- pilot işletme deneyimi,
- teknik doğrulama,
- operasyonel doğrulama,
- güvenlik doğrulama,
- müşteri değeri doğrulama,
- geri bildirim,
- sonraki geliştirme listesi.

### Tamamlandı Sayma Ölçütü

Bu faz, tek test işletmesi için sistemin baştan sona denenmesi ve P0 bloklayıcı hata kalmamasıyla tamamlanır.

Karar seçenekleri:

- geçti — aynı kapsamla ikinci pilota geç,
- kısmi geçti — önce küçük düzeltme yap,
- teknik geçti ama müşteri değeri zayıf — akış/çıktı/konumlandırma düzelt,
- müşteri değeri var ama güvenlik eksik — büyütme, güvenliği düzelt,
- operasyon çok ağır — kapsam/paket/fiyatı daralt,
- başarısız — çekirdeği yeniden tasarla.

---

## Sonraya Kalacaklar

Aşağıdaki işler ilk doğrulama sonrasına bırakılmalıdır:

- işletmenin kendi WhatsApp hattını ajana bağlama,
- WhatsApp Randevu Asistanı,
- gelişmiş müşteri paneli,
- gelişmiş katalog / sipariş / teklif akışı,
- sepet, ödeme, stok, tahsilat ve muhasebe,
- gelişmiş QR analitiği,
- kampanya motoru,
- gelişmiş entegrasyonlar,
- satış temsilcisi ağı.

Ana prensip:

> Önce tek işletme için gerçek agent/workspace çalışsın. Sonra işletme profili, görünür çıktılar, güvenlik ve kanal pilotu sırayla büyütülsün.


<!-- SOURCE: REFERENCES/esnafdigital-360/19-gelistirme-sirasi-gpt-pro-kontrol-notu.md -->

# 19 - Geliştirme ve Uygulama Fazları GPT Pro Kontrol Notu

Bu not, `19-gelistirme-sirasi.md` bölümünün GPT Pro ile kontrol ettirilme sonucunu tutar.

## Durum

Kontrol tamamlandı.

Sonuçlar ilgili aktif bölümlere işlendi:

- `11-ilk-mvp-tanimi.md`
- `19-gelistirme-sirasi.md`
- `20-guvenlik-ve-onay-kurallari.md`
- `21-basari-kriterleri.md`

## Netleşen Ana Çizgi

- MVP çekirdeği doğru; fakat görünür çıktılar küçük taslaklar olarak tutulmalı.
- Tek test işletmesi için tek Gateway kullanılabilir; güvenlik sınırı workspace değil, tool policy + API tenant kontrolü + audit/onay + kill switch birleşimidir.
- İşletme Ajanı Kaydı gerçek agent değil, runtime control record olarak kalmalıdır.
- Agent ilk MVP'de yalnızca sınırlı EsnafDigital API tool'ları kullanmalıdır.
- Web vitrini, hizmet listesi ve QR/kısa link ilk MVP'de taslak/preview seviyesinde olmalıdır.
- Admin MVP, `Project OS / Businesses / Business Detail` üçlüsünde kalmalıdır.
- MVP kabul standardı: teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz.
- P0 bloklayıcı hata sıfır olmadan yeni pilot müşteriye geçilmez.

## Kapanan Kontrol Soruları

1. Faz sırası gerçek MVP için mantıklı mı?
2. Tek test işletmesi için önce agent/workspace doğrulamak doğru ilk adım mı?
3. İşletme profili, bilgi toplama, web vitrini, dinamik QR/NFC ve yetki sınırı sırası doğru mu?
4. Gecikmemesi gereken güvenlik, veri modeli veya operasyon adımı var mı?
5. Fazlar içinde gereksiz erken eklenmiş parça var mı?
6. Her fazın tamamlandı sayma ölçütleri yeterince net mi?
7. Bu sıra premium KOBİ / dijital operasyon kurmak veya büyütmek isteyen işletme hedefiyle uyumlu mu?
8. Agent/workspace çoğalmasının ileride karmaşa yaratmaması için kontrol noktası var mı?

## Sonraki Açık Kontroller

Bu not artık geliştirme sırası için blokaj değildir.

Sıradaki GPT Pro değerlendirmeleri segment, paketleme, modül önceliği ve stratejik risk tarafında yapılmalıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/20-guvenlik-ve-onay-kurallari.md -->

> Aktif 360 bolum dosyasi.
> Durum: GPT Pro degerlendirmeleriyle MVP minimum guvenlik siniri, tool allow/deny, tenant kontrolu ve kill switch cizgisi netlestirildi.

---

# 20. Güvenlik ve Onay Kuralları

Bu bölüm EsnafDigital 360'ın en kritik konularından biridir. Çünkü her işletmeye ayrı gerçek agent/workspace açmak güçlü bir modeldir; ancak güvenlik, yetki ve onay sınırları doğru kurulmazsa risk üretir.

MVP için temel karar şudur:

> Tek test işletmesi MVP'sinde tek Gateway kullanılabilir; fakat güvenlik sınırı workspace değil, kanal allowlist + explicit binding + sandbox/tool policy + EsnafDigital API tenant kontrolü + audit/onay + kill switch birleşimidir.

## 20.1 Temel Güvenlik İlkesi

Ajanın temel güvenlik ilkesi şudur:

> Ajan bilgi toplar, öneri üretir, taslak hazırlar ve görev açar. Riskli, dış dünyayı etkileyen veya kalıcı sonuç doğuran işlemler onaysız yapılmaz.

Her işletme agent'ı sadece kendi işletmesi için çalışır.

Ajan:

- başka işletme verisine erişemez,
- EsnafDigital ana workspace'ine erişemez,
- yetki profili dışında tool kullanamaz,
- dış hesaplarda onaysız işlem yapamaz,
- müşteri adına ticari taahhüt veremez,
- parola, token veya gizli erişim bilgisini isteyemez ya da workspace'e yazamaz.

## 20.2 Tek Test İşletmesi İçin Minimum Güvenli Yapı

İlk MVP'de yapı şu sınırla kurulmalıdır:

```text
Tek Gateway
+ tek gerçek işletme agent'ı
+ ayrı workspace
+ ayrı agentDir
+ ayrı session store
+ pilot kanal allowlist / pairing
+ explicit binding
+ no-tool fallback veya quarantine agent
+ sadece sınırlı EsnafDigital API tool'ları
+ API-side tenant enforcement
+ audit log
+ approval queue
+ pause / kill switch
```

Bu fazda tek Gateway kabul edilebilir. Ancak bu kabul yalnızca tek test işletmesi, düşük riskli veri, sınırlı tool yüzeyi ve sıkı operasyon kontrolü içindir.

Gateway mümkünse public internete açık olmamalı; loopback/private network üzerinden, token/password auth ile ve güvenli admin erişimiyle çalışmalıdır.

## 20.3 Ajanın Serbestçe Yapabilecekleri

Ajan düşük riskli işleri kendi yetkisi içinde yapabilir.

Örnekler:

- işletmeden bilgi istemek,
- eksik bilgileri listelemek,
- gelen bilgiyi özetlemek,
- düşük riskli profil taslağı oluşturmak,
- web vitrini için metin önerisi üretmek,
- menü / katalog / hizmet listesi taslağı oluşturmak,
- QR/NFC hedefi için öneri veya taslak sunmak,
- basit durum özeti hazırlamak,
- admin panelde görev veya medya talebi oluşturmak,
- operasyon ekibine devredilecek işi işaretlemek.

Bu işler müşteriye veya dış sisteme kalıcı etki üretmez.

## 20.4 İlk MVP Tool Allowlist

İlk MVP'de agent'a genel OpenClaw araçları değil, yalnızca dar kapsamlı EsnafDigital API tool'ları açılmalıdır.

Önerilen minimum tool listesi:

| Tool | Amaç | Etki |
|---|---|---|
| `ed360.get_business_snapshot` | Kendi işletmesinin profil, eksik, görev ve çıktı durumunu okumak | Okuma |
| `ed360.save_profile_draft` | Düşük riskli profil alanlarını taslak olarak kaydetmek | Taslak yazma |
| `ed360.upsert_service_item_draft` | Basit hizmet / ürün kalemi taslağı oluşturmak | Taslak yazma |
| `ed360.create_media_request` | Fotoğraf, logo veya görsel ihtiyacı için talep açmak | Görev |
| `ed360.generate_web_preview` | Canlı olmayan web vitrini önizlemesi üretmek | Taslak çıktı |
| `ed360.create_shortlink_draft` | QR/kısa link hedef taslağı oluşturmak | Taslak çıktı |
| `ed360.create_task` | Operasyon veya müşteri işi açmak | İç operasyon |
| `ed360.create_approval_request` | Riskli işlem için onay kaydı açmak | Onay |
| `ed360.save_setup_summary` | Kurulum özeti ve sonraki adımı kaydetmek | Taslak özet |

Bu tool'ların hiçbiri doğrudan public yayın, dış hesap değişikliği, QR hedef aktivasyonu, müşteri adına dış mesaj, ödeme, randevu, sipariş veya veri silme yapmamalıdır.

## 20.5 İlk MVP Tool Denylist

İlk MVP'de şu araçlar ve kabiliyetler kapalı olmalıdır:

- `exec`,
- `process`,
- browser / web otomasyon araçları,
- geniş filesystem `read`, `write`, `edit`, `apply_patch`,
- `cron`,
- subagent / session spawn,
- agent-to-agent veya cross-session mesajlaşma,
- Gateway / node / config araçları,
- dış email / SMS / sosyal medya gönderim araçları,
- payment / booking / calendar araçları,
- dynamic skill install / sync,
- işletme dışı veri okuyabilecek genel web fetch veya entegrasyonlar.

`deny` kuralı her zaman kazanmalıdır. Allowlist doluysa listede olmayan araçlar otomatik kapalı kabul edilmelidir.

## 20.6 EsnafDigital API Tenant Kontrolü

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

API, agent'ın gönderdiği `business_id` değerini yetki kanıtı saymamalıdır. Yetki server-side çözülmelidir:

```text
Tool call
↓
per-agent token veya service identity doğrulanır
↓
openclaw_agent_id / agent_record_id çözülür
↓
İşletme Ajanı Kaydı bulunur
↓
status ve pause kontrol edilir
↓
business_id kayıttan server-side alınır
↓
permission_profile ve tool_policy kontrol edilir
↓
field-level izin ve risk kontrolü yapılır
↓
işlem yapılır veya approval_request açılır
```

Her tool çağrısında şu kontroller zorunludur:

- token veya service identity doğrulama,
- aktif İşletme Ajanı Kaydı kontrolü,
- pause / read-only kontrolü,
- tenant scope kontrolü,
- tool allowlist kontrolü,
- alan bazlı yazma izni,
- risk seviyesi,
- idempotency,
- audit log.

Body'de gelen `business_id`, Agent Kaydı'ndan çözülen `business_id` ile uyuşmazsa işlem reddedilmeli, audit kaydı açılmalı ve agent pause adayı yapılmalıdır.

## 20.7 Onayla Yapılabilecekler

Aşağıdaki işler ancak işletme sahibi, kurucu veya operasyon onayıyla ilerlemelidir:

- web vitrini yayınlamak veya herkese açık içeriği değiştirmek,
- dinamik QR/NFC hedefini müşterilerin göreceği şekilde değiştirmek,
- Google / Maps / Instagram / WhatsApp gibi dış hesaplarda değişiklik yapmak,
- domain / DNS / yönlendirme değiştirmek,
- müşteri adına dış dünyaya mesaj göndermek,
- sosyal medya paylaşımı yapmak,
- fiyat, ödeme, indirim veya sözleşme ile ilgili karar vermek,
- kesin randevu, rezervasyon, sipariş veya taahhüt oluşturmak,
- müşteri verisini kalıcı şekilde değiştirmek veya silmek,
- canlı sistemi etkileyen teknik işlem yapmak,
- yeni kanal hesabı bağlamak,
- yeni tool yetkisi açmak.

Bu işlerde ajan yalnızca bilgi toplar, öneri sunar, taslak hazırlar veya onay görevi açar.

## 20.8 Kesin Yasaklar

Ajan hiçbir koşulda şu işleri kendi başına yapmamalıdır:

- parola, token veya gizli erişim bilgisini istemek ya da kaydetmek,
- gizli bilgiyi workspace dosyalarına yazmak,
- başka işletmenin verisini okumak veya kullanmak,
- EsnafDigital ana workspace'ine müdahale etmek,
- yetki profili dışına çıkmak,
- müşteri adına bağlayıcı ticari karar vermek,
- müşteriye kesin sonuç garantisi vermek,
- yorum, puan, arama sıralaması veya satış sonucu garanti etmek,
- onay gerektiren işlemi onaysız tamamlamak,
- Gateway/config/runtime ayarlarını değiştirmek,
- skill/plugin kurmak veya izin profilini kendi kendine genişletmek.

## 20.9 Audit ve Onay Kaydı

Her tool çağrısı ve izin kararı izlenebilir olmalıdır.

Minimum audit alanları:

- `audit_event_id`,
- `timestamp`,
- `correlation_id`,
- `business_id`,
- `agent_record_id`,
- `openclaw_agent_id`,
- `gateway_id`,
- `channel_type`,
- `binding_id`,
- `peer_hash`,
- `tool_name`,
- `operation_type`,
- `risk_level`,
- `permission_profile_id`,
- `tool_policy_version`,
- `decision`,
- `affected_resource_type`,
- `affected_resource_id`,
- `approval_id`,
- `error_code`.

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

Önemli kural:

> `approved` durumu agent'a otomatik canlı işlem yetkisi vermez. İlk MVP'de uygulama insan veya ayrıca güvenli executor tarafından yapılmalıdır.

## 20.10 Pause / Kill Switch

İşletme Ajanı Kaydı üzerinde agent durdurulabilir olmalıdır.

Minimum seviyeler:

1. **Agent pause:** Agent yazma tool'ları kullanamaz.
2. **Read-only mode:** Agent yalnızca bilgi verir; görev/onay bile açamayabilir.
3. **Channel unbind:** Yanlış routing riski varsa kanal bağlantısı kapatılır.
4. **Token revoke:** Per-agent API token iptal edilir.
5. **Runtime quarantine:** Workspace/session snapshot alınır ve agent runtime'dan çıkarılır.

Otomatik pause adayı durumlar:

- tenant mismatch,
- yetkisiz sender,
- denylist tool denemesi,
- onay gerektiren işlemi doğrudan yapma denemesi,
- workspace'e secret yazma denemesi,
- kısa sürede çok sayıda tool hatası,
- routing fallback'in gerçek agent'a düşmesi,
- güvenlik audit'inde kritik bulgu.

## 20.11 Workspace, agentDir ve Secret Kuralları

Workspace'e yazılabilir bilgiler:

- genel davranış talimatları,
- işletmenin public veya düşük riskli özeti,
- aktif modül listesi,
- eksik bilgi başlıkları,
- taslak metinler,
- hizmet / ürün liste taslakları,
- QR hedef önerisi.

Workspace'e kesin yazılmaması gerekenler:

- API key, token, OAuth credential,
- Google, Meta, WhatsApp, domain, DNS veya hosting erişimleri,
- veritabanı bağlantı bilgisi,
- EsnafDigital admin credential'ları,
- müşteri parolaları,
- ödeme bilgileri,
- hassas kişisel veri,
- raw transcript dump,
- başka işletmeye ait bilgi,
- signed URL'lerin uzun ömürlü halleri,
- full medya arşivi.

Her agent için ayrı workspace, ayrı agentDir ve ayrı session store zorunlu kabul edilmelidir.

## 20.12 Çoklu Müşteri İçin Risk Eşiği

Tek test işletmesi için tek Gateway kabul edilebilir. Ancak şu eşiklerde daha güçlü ayrım gerekir:

| Eşik | Karar |
|---|---|
| Tek test işletmesi, düşük riskli veri | Tek Gateway kabul edilebilir |
| İlk gerçek müşteri verisi | Ayrı OS user önerilir |
| 2-5 pilot müşteri, sadece draft API | Tek Gateway geçici olabilir; API tenant sınırı zorunlu |
| Birden fazla ödeme yapan müşteri | Ayrı Gateway stratejisi tasarlanmalı |
| Dış hesap credential'ları veya public çıktı etkisi | Ayrı Gateway + ayrı OS user önerilir |
| Browser, exec, cron veya yüksek etkili tool'lar | Ayrı Gateway + ayrı OS user + ayrı VPS ciddi şekilde düşünülmeli |
| Hassas sektör veya karşılıklı güvenmeyen tenant'lar | Tek Gateway güvenlik sınırı kabul edilmemeli |

Ana prensip:

> EsnafDigital 360'da güvenlik, sonradan eklenecek detay değil; işletme agent modelinin temel şartıdır.


<!-- SOURCE: REFERENCES/esnafdigital-360/21-basari-kriterleri.md -->

> Aktif 360 bolum dosyasi.
> Durum: GPT Pro degerlendirmeleriyle MVP kabul standardi, P0/P1/P2 ayrimi ve tamamlandi checklist'i netlestirildi.

---

# 21. Başarı Kriterleri

İlk aşamada başarı, tüm modüllerin tam otomatik olmasıyla ölçülmemelidir. MVP'nin başarısı, işletme agent modelinin gerçekten çalışıp çalışmadığıyla ölçülmelidir.

Nihai kabul cümlesi:

> EsnafDigital 360 MVP başarılı sayılır, eğer tek test işletmesi için gerçek işletme ajanı modeli güvenli, izlenebilir, operasyonel ve müşteriye değer üreten şekilde baştan sona çalıştığını kanıtlarsa.

Başarı dört grupta ele alınır:

1. teknik başarı,
2. operasyonel başarı,
3. güvenlik başarısı,
4. ürün / müşteri değeri başarısı.

## 21.1 Başarılı MVP Tanımı

Başarılı MVP şu akışı kanıtlamalıdır:

```text
Tek gerçek veya gerçeğe çok yakın test işletmesi
→ sisteme eklenir
→ gerçek OpenClaw İşletme Ajanı oluşur
→ ayrı workspace / agentDir / session kullanır
→ İşletme Ajanı Kaydı panelden izlenir
→ pilot kanaldan gelen mesaj doğru agent'a gider
→ agent kendi işletme bağlamıyla bilgi toplar
→ bilgiler profile, göreve, eksik listesine ve ilk çıktılara dönüşür
→ web vitrini taslağı, hizmet/ürün listesi, kısa link/QR hedef taslağı ve kurulum özeti oluşur
→ riskli işlemler otomatik yapılmaz
→ admin panelden durum, görev, onay, audit ve sonraki adım izlenebilir
→ işletme sahibi ilk değeri anlar
```

Sadece çalışan bot, sadece web taslağı veya sadece QR üretimi başarı sayılmaz.

## 21.2 Teknik Başarı Kriterleri

MVP teknik olarak başarılı sayılmak için şunları göstermelidir:

- bir işletme sisteme eklenebiliyor,
- işletmeye özel gerçek OpenClaw İşletme Ajanı oluşuyor,
- ayrı agent workspace'i oluşuyor,
- ayrı agentDir ve session store kullanılıyor,
- İşletme Ajanı Kaydı panelde görünüyor,
- işletme bazlı oturum ve hafıza ayrımı çalışıyor,
- pilot mesajlaşma kanalından gelen mesaj doğru işletme ajanına gidiyor,
- explicit binding çalışıyor,
- yetkisiz veya yanlış kullanıcı gerçek agent'a ulaşamıyor,
- agent kendi işletme bağlamıyla cevap veriyor,
- agent yalnızca izin verilen EsnafDigital API tool'larını kullanıyor,
- başka işletme verisine veya ana workspace'e erişim olmuyor,
- tool çağrıları ve izin kararları audit log'a yazılıyor,
- pause / kill switch test edilebiliyor.

Minimum teknik eşikler:

| Metrik | Kabul eşiği |
|---|---:|
| Pilot mesajın doğru agent'a yönlenme oranı | %100 |
| Tenant mismatch | 0 |
| Denylist tool'un başarılı kullanımı | 0 |
| İzinli tool çağrılarında audit oranı | %100 |
| Pause / resume testi | en az 1 başarılı test |
| Web preview üretimi | en az 1 |
| Hizmet listesi kalemi | en az 1, ideal 3 |
| Shortlink / QR hedef taslağı | en az 1 |
| Kurulum özeti | en az 1 |

## 21.3 Operasyonel Başarı Kriterleri

MVP operasyonel olarak başarılı sayılmak için şunları göstermelidir:

- ajan temel işletme bilgilerini toplayabiliyor,
- eksik bilgiler görünür hale geliyor,
- toplanan bilgiler işletme dijital profiline bağlanıyor,
- admin panelde açık görevler görünüyor,
- onay gerektiren işler otomatik yapılmıyor,
- operasyon ekibine devredilecek işler ayrılıyor,
- agent status, setup phase ve output status panelde ayrışıyor,
- bakım veya güncelleme ihtiyacı görev olarak takip edilebiliyor,
- agent durumu ve son aktivite panelden izlenebiliyor,
- her işletme için sıradaki adım okunabiliyor.

Pratik operasyonel eşikler:

| Metrik | Kabul eşiği |
|---|---|
| İşletme profiline yazılan taslak alan | en az 4 alan |
| Eksik bilgi kaydı | en az 1 anlamlı eksik |
| Açık görev | gerekiyorsa en az 1 |
| Medya/fotoğraf talebi | fotoğraf yoksa oluşturulmuş olmalı |
| Riskli istek | varsa approval'a düşmeli |
| Admin panel okunabilirliği | 1 dakika içinde ne oldu / ne eksik / ne sırada anlaşılmalı |
| Kurulum özeti | oluşmalı veya manuel kaydedilebilmeli |

## 21.4 Güvenlik Başarı Kriterleri

Güvenlik başarısı, yalnızca sorun çıkmamasıyla değil, yanlış/riskli davranışların sistem tarafından engellenebilmesiyle ölçülür.

MVP güvenlik açısından başarılı sayılmak için şunları göstermelidir:

- kanal allowlist veya pairing çalışıyor,
- explicit binding yanlış agent yönlenmesini engelliyor,
- fallback varsa no-tool / quarantine mantığında çalışıyor,
- API business scope'u İşletme Ajanı Kaydı üzerinden çözülüyor,
- body'deki `business_id` yetki kaynağı sayılmıyor,
- tool allowlist dışındaki tool'lar kapalı,
- `exec`, browser, filesystem write, cron, subagent ve dış hesap araçları kapalı,
- riskli işler onaysız yapılmıyor,
- tool çağrıları audit log'a yazılıyor,
- workspace'e parola, token veya credential yazılmıyor,
- pause / kill switch çalışıyor,
- tenant mismatch veya denylist denemesi görünür güvenlik olayı üretiyor.

## 21.5 Ürün / Müşteri Değeri Başarı Kriterleri

MVP, müşteri açısından şu değeri göstermelidir:

- işletme sahibi panel öğrenmeden sürece katılabiliyor,
- mesajlaşma üzerinden bilgi verebiliyor,
- ajan kısa, açık ve yönlendirici konuşuyor,
- işletme sahibi hangi bilgilerin eksik olduğunu görebiliyor,
- toparlanmış işletme özeti doğru geliyor,
- web vitrini taslağı işletmeye özel ilk değer üretiyor,
- hizmet / ürün listesi anlamlı görünüyor,
- QR/kısa link mantığı anlaşılabiliyor,
- kurulum özeti tamamlananları, eksikleri ve sıradaki adımı gösteriyor,
- özel işletme ajanı fikri klasik web/QR işinden ayrışıyor.

Pilot işletme sahibine sorulacak beş kısa soru:

1. Bu ajan işletmenizi doğru anladı mı?
2. Verdiğiniz bilgiler görünür bir taslağa dönüştü mü?
3. Eksik kalan şeyler size net geldi mi?
4. Bu süreci klasik site/QR işinden daha düzenli buldunuz mu?
5. Bir sonraki adım için EsnafDigital ile devam etmek ister misiniz?

İlk üç soruda güçlü olumlu cevap alınmadan yeni pilota geçilmemelidir.

## 21.6 İlk Dijital Çıktı Başarı Kriterleri

MVP, işletmeye görünür bir ilk değer üretmelidir.

Başarı için en az şunlar oluşmalıdır:

- web vitrini taslağı / preview,
- arama / mesajlaşma / yol tarifi bağlantıları,
- dinamik QR / NFC kısa link hedef taslağı,
- menü / katalog / hizmet listesi için basit yapı,
- fotoğraf veya içerik toplama akışı,
- kısa kurulum özeti veya durum raporu.

Bu çıktılar kusursuz olmak zorunda değildir; ama işletmenin dijital operasyonunun başladığını göstermelidir.

## 21.7 Kabul Edilebilir Eksikler

İlk MVP'de aşağıdaki eksikler kabul edilebilir:

- web vitrininin canlı yayında olmaması,
- fotoğraf eksikliği,
- hizmet listesinin tam olmaması,
- fiyatların eksik olması,
- QR hedefinin aktif olmaması,
- NFC / fiziksel materyal olmaması,
- Google / Instagram / Maps değişikliği yapılmaması,
- işletmenin kendi WhatsApp hattının bağlanmaması,
- gelişmiş müşteri paneli olmaması,
- gelişmiş katalog / sipariş / teklif olmaması,
- randevu / ödeme / sipariş otomasyonu olmaması,
- analytics / A-B test / kampanya raporu olmaması,
- bazı admin işlemlerinin manuel yapılması.

Bu eksikler ancak görev, eksik veya karar olarak görünürse kabul edilebilir.

## 21.8 Bloklayıcı Hatalar

### P0 — Kesin Bloklayıcı

P0 hata varsa MVP tamamlanmış sayılmaz ve yeni pilota geçilmez.

P0 örnekleri:

- mesaj yanlış işletme agent'ına gidiyor,
- agent başka işletme verisini okuyabiliyor,
- agent EsnafDigital ana workspace veya secret alanına erişebiliyor,
- denylist tool başarılı çalışıyor,
- agent web yayınlıyor veya QR hedefini onaysız değiştiriyor,
- dış hesapta onaysız işlem yapılabiliyor,
- workspace'e secret/token/parola yazılıyor,
- API body'deki `business_id` değerine güveniyor,
- audit kaydı oluşmadan tool işlemi yapılabiliyor,
- kill switch / pause çalışmıyor,
- gerçek OpenClaw agent oluşmuyor,
- ayrı workspace / agentDir / session yok,
- İşletme Ajanı Kaydı panelde izlenemiyor,
- pilot kanal routing çalışmıyor,
- agent kendi işletme bağlamıyla cevap veremiyor,
- toplanan bilgi profile/göreve/çıktıya dönüşmüyor,
- riskli işler approval'a düşmüyor.

### P1 — Bir Sonraki Pilottan Önce Düzeltilmesi Gereken Ciddi Sorun

P1 hatalar çekirdeği tamamen bozmaz; ancak yeni pilottan önce sahipli düzeltme planı ister.

P1 örnekleri:

- agent çok uzun veya karmaşık sorular soruyor,
- ilk değer çok geç oluşuyor,
- web preview çok zayıf ama üretilebiliyor,
- admin panel durumu gösteriyor ama dağınık,
- manuel operasyon maliyeti beklenenden yüksek,
- eksik/görev ayrımı karışıyor,
- approval ile task karışıyor,
- kurulum özeti eksik kalıyor.

### P2 — Kabul Edilebilir Küçük Eksik

P2 eksikler MVP içinde kabul edilebilir.

P2 örnekleri:

- preview tasarımı estetik olarak zayıf,
- fotoğraf yok ama medya talebi var,
- hizmet listesi 1 kalemle başladı,
- QR görseli üretildi ama basılmadı,
- setup summary manuel düzeltme istedi,
- bazı admin aksiyonları manuel.

## 21.9 Tamamlandı Checklist'i

### Teknik Çekirdek

- [ ] Test işletmesi oluşturuldu.
- [ ] Gerçek OpenClaw İşletme Ajanı oluşturuldu.
- [ ] Ayrı workspace oluşturuldu.
- [ ] Ayrı agentDir/session kullanıldı.
- [ ] İşletme Ajanı Kaydı panelde görünüyor.
- [ ] Pilot kanal binding yapıldı.
- [ ] Yetkili kullanıcıdan gelen mesaj doğru agent'a gitti.
- [ ] Yetkisiz/yanlış kullanıcı gerçek agent'a ulaşamadı.
- [ ] Agent kendi işletme bağlamıyla cevap verdi.
- [ ] Agent yalnız izinli EsnafDigital API tool'larını kullandı.

### Bilgi Toplama ve Operasyon

- [ ] Agent işletme adını/gösterim adını netleştirdi.
- [ ] Kısa işletme açıklaması aldı.
- [ ] İletişim bilgisi aldı.
- [ ] En az 1 hizmet/ürün/kategori aldı.
- [ ] Bilgiler profile taslak olarak yazıldı.
- [ ] Eksik bilgiler listelendi.
- [ ] Gerekli görevler oluşturuldu.
- [ ] Fotoğraf/medya eksikse medya talebi açıldı.
- [ ] Kurulum özeti oluşturuldu.

### İlk Görünür Çıktılar

- [ ] Web vitrini taslağı/preview oluştu.
- [ ] Arama/mesajlaşma/yol tarifi bağlantıları taslaklandı.
- [ ] Basit hizmet/ürün listesi oluştu.
- [ ] Dinamik kısa link / QR hedef taslağı oluştu.
- [ ] Eksik medya/fotoğraf durumu görünür.
- [ ] Müşteri ilk görünür değeri görebildi.

### Güvenlik ve Onay

- [ ] API tenant scope'u Agent Kaydı üzerinden doğrulandı.
- [ ] Body `business_id` mismatch reddedildi veya test edildi.
- [ ] Denylist tool'lar kapalı.
- [ ] Riskli işlem otomatik yapılmadı.
- [ ] Riskli istek `approval_request` olarak oluştu.
- [ ] Tool çağrıları audit log'a yazıldı.
- [ ] Pause / kill switch test edildi.
- [ ] Workspace'e secret yazılmadı.

### Admin Panel

- [ ] Project OS sıcak işleri gösteriyor.
- [ ] Businesses listesi agent/setup/output durumlarını gösteriyor.
- [ ] Business Detail blokları okunabilir.
- [ ] İşletme Ajanı Kaydı kartı görünüyor.
- [ ] Görevler/eksikler/onaylar/audit ayrışıyor.
- [ ] İlk dijital çıktılar aynı blokta izleniyor.
- [ ] Sıradaki adım panelden anlaşılabiliyor.

### Müşteri Değeri

- [ ] İşletme sahibi panel kullanmadan bilgi verebildi.
- [ ] Agent soruları kısa ve anlaşılır sordu.
- [ ] İşletme sahibi eksikleri anlayabildi.
- [ ] Web/hizmet/QR taslaklarını değerli buldu.
- [ ] Özel işletme ajanı fikri anlaşıldı.
- [ ] Müşteri bir sonraki adıma istekli.

## 21.10 Pilot Sonu Karar Seçenekleri

Pilot sonunda tek karar `başarılı / başarısız` olmamalıdır.

Karar seçenekleri:

- **Geçti — aynı kapsamla ikinci pilota geç**
- **Kısmi geçti — önce küçük düzeltme yap**
- **Teknik geçti, müşteri değeri zayıf**
- **Müşteri değeri var, güvenlik eksik**
- **Operasyon çok ağır**
- **Başarısız — çekirdek yeniden tasarlanmalı**

İlk pilot sonunda hedef, geniş üretime geçmek değil; aynı sınırlı MVP kapsamıyla ikinci pilot işletmeye geçilip geçilemeyeceğine karar vermektir.

## 21.11 Bir Sonraki Pilota Geçiş Kriteri

Aynı kapsamla ikinci pilot müşteriye geçmek için:

- P0 bloklayıcı hata olmamalı,
- tenant/security ihlali olmamalı,
- yanlış routing olmamalı,
- onaysız canlı/riskli işlem olmamalı,
- kritik tool'larda audit coverage tam olmalı,
- web/hizmet/shortlink taslakları oluşmuş olmalı,
- admin panelden durum okunabilir olmalı,
- müşteri değeri net pozitif olmalı,
- manuel operasyon görünür ve kabul edilebilir olmalı,
- P1 maddeler sahipli ve sınırlı düzeltme planına bağlanmış olmalı.

Ana prensip:

> Başarı, her şeyi otomatik yapmak değil; gerçek işletme ajanı modelinin güvenli, izlenebilir, operasyonel ve müşteriye değer üreten şekilde çalıştığını kanıtlamaktır.


<!-- SOURCE: REFERENCES/esnafdigital-360/22-stratejik-riskler.md -->

> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; P0/P1/P2, tenant guvenligi ve pilot gecis riskleri eklendi.

---

# 22. Stratejik Riskler

Bu bölüm sabit ve bir kere yazılıp kapanacak bir liste değildir. EsnafDigital 360 geliştikçe riskler değişecektir.

Bu nedenle risk analizi:

- her önemli karar sonrası güncellenmeli,
- ilk pilotlardan sonra tekrar ele alınmalı,
- GPT Pro ile ayrıca kontrol edilmeli,
- teknik, operasyonel ve ticari riskler ayrı ayrı değerlendirilmelidir.

## 22.1 Kapsam Şişmesi

Risk:

Tüm modülleri aynı anda kurmaya veya otomatikleştirmeye çalışmak projeyi yavaşlatır.

Belirti:

- çok fazla ekran açılması,
- her modül için ayrı sistem tasarlama isteği,
- ilk agent/workspace doğrulaması yapılmadan web, QR, katalog, WhatsApp, randevu, muhasebe gibi alanlara yayılmak,
- web vitrini, hizmet listesi ve QR'ı taslak yerine tam ürün gibi ele almak.

Kontrol:

> Önce tek işletme için gerçek agent/workspace çalışsın. Sonra modüller sırayla eklenir.

## 22.2 Yanlış Hedef Segment

Risk:

Ürün, özel işletme ajanından gerçek verim alamayacak işletmelere anlatılırsa değer anlaşılmaz.

Belirti:

- müşteri sadece ucuz web sitesi ister,
- bilgi paylaşmaya istekli değildir,
- mesajlaşma üzerinden ilerlemeyi kullanmaz,
- dijital operasyon kurma veya büyütme ihtiyacı yoktur,
- onaylı ve kontrollü ilerlemeyi “neden otomatik yapmıyor?” diye sorun görür.

Kontrol:

> Hedef, dijital operasyonunu kurmak veya büyütmek isteyen ve ajandan gerçek fayda görebilecek KOBİ'lerdir. Sektör listesi ve paket dili ayrıca netleştirilmelidir.

## 22.3 Premium Vaat ile MVP Gerçeği Arasındaki Gerilim

Risk:

Ürün premium anlatılırken MVP'nin ilk hali yarı otomatik ve kontrollü olacak. Bu fark yanlış anlatılırsa müşteri beklentisi fazla yükselir.

Belirti:

- müşteri ajanın her şeyi otomatik yapacağını sanır,
- dış hesaplarda anında işlem bekler,
- randevu, ödeme, sipariş, paylaşım gibi riskli işlerde otomatiklik bekler,
- taslak/preview çıktılarını “eksik teslimat” gibi algılar.

Kontrol:

> Müşteriye sonuç anlatılır; ancak ilk çıktıların taslak/preview olduğu ve riskli işlemlerin onayla ilerlediği baştan net tutulur.

## 22.4 Agent / Workspace Çoğalmasının Karmaşası

Risk:

Her işletmeye gerçek agent/workspace açmak güçlüdür; fakat otomasyon ve şablon olmadan manuel karmaşa doğurur.

Belirti:

- agent'lar elle kurulmaya başlanır,
- workspace dosyaları farklılaşır ve izlenemez,
- agentDir/session store tekrar kullanılır,
- hangi agent'ın hangi şablondan geldiği bilinmez,
- yetki profilleri tutarsız olur.

Kontrol:

> İyi başlangıç şablonu, otomatik kurulum, şablon sürümü takibi, ayrı workspace/agentDir/session ve sıkı yetki sınırı zorunludur.

## 22.5 Güvenlik ve İzolasyon Hatası

Risk:

Bir işletme agent'ı başka işletme verisine, ana workspace'e, secret'lara veya yetki dışı tool'lara erişirse ciddi güvenlik sorunu oluşur.

Belirti:

- agent'lar ortak workspace/agentDir/session kullanır,
- workspace tek başına güvenlik sınırı sanılır,
- tool allowlist net değildir,
- denylist uygulanmaz,
- API işletme bazlı yetki kontrolü yapmaz,
- body'deki `business_id` yetki kanıtı sayılır,
- gizli bilgiler workspace'e yazılır,
- audit log eksik kalır,
- pause / kill switch çalışmaz.

Kontrol:

> Güvenlik sınırı workspace değil; kanal allowlist + explicit binding + sandbox/tool policy + EsnafDigital API tenant kontrolü + audit/onay + kill switch birleşimidir.

## 22.6 Tek Gateway'in Yanlış Yorumlanması

Risk:

Tek test işletmesi için kabul edilebilir olan tek Gateway modeli, çok müşterili ve karşılıklı güvenmeyen tenant ortamı için yeterli güvenlik sınırı gibi yorumlanır.

Belirti:

- birden fazla gerçek müşteri aynı Gateway altında yüksek yetkili tool'larla çalışır,
- dış hesap credential'ları tek runtime'da birikir,
- browser/exec/cron gibi yüksek etkili araçlar müşterili ortama açılır,
- Gateway public exposure veya credential sınırları zayıf kalır.

Kontrol:

> Tek test işletmesi için tek Gateway kullanılabilir; gerçek müşteri, dış hesap, public etki ve yüksek riskli tool arttıkça ayrı OS user, ayrı Gateway veya ayrı VPS eşikleri yeniden değerlendirilir.

## 22.7 Tek Kanala Bağımlılık

Risk:

Sistem sadece Telegram veya sadece WhatsApp mantığıyla kurulursa ileride taşımak zorlaşır.

Belirti:

- ajan mantığı kanal adapterine yazılır,
- routing/binding kanaldan bağımsız tasarlanmaz,
- WhatsApp ticari hedef olduğu için erken teknik kilitlenme oluşur,
- işletmenin kendi WhatsApp hattını bağlamak MVP çekirdeği sanılır.

Kontrol:

> Kanal sadece giriş/çıkış kapısıdır. Ajan mantığı kanal bağımsız kalmalıdır. İlk MVP pilot kanal ile doğrulanabilir.

## 22.8 OpenClaw'ın Ana Uygulamaya Gömülmesi

Risk:

OpenClaw runtime EsnafDigital app içine gömülürse bakım, güvenlik ve ölçekleme zorlaşır.

Belirti:

- agent runtime ile app kodu iç içe geçer,
- servis ayrımı bulanıklaşır,
- tool çalıştırma ve sandbox sınırı kaybolur,
- EsnafDigital API sınırı atlanır.

Kontrol:

> OpenClaw ayrı runtime katmanı olarak kalmalıdır. Başta aynı VPS olabilir; ancak mantıksal ayrım ve API/tool sınırı korunmalıdır.

## 22.9 Manuel Operasyonun Gizli Maliyeti

Risk:

MVP yarı otomatik ilerlerken operasyon yükü görünmez kalırsa paket fiyatı ve teslimat süresi yanlış hesaplanır.

Belirti:

- agent bilgi toplar ama operasyon işleri birikir,
- fiziksel materyal, domain, sosyal medya, dış hesap işleri çok zaman alır,
- bakım paketi kârlı olmaktan çıkar,
- her iş kurucu müdahalesi gerektirir.

Kontrol:

> Her manuel iş görev olarak izlenmeli; kurulum ve bakım maliyeti zamanla ölçülmelidir.

## 22.10 Bağlam Dosyalarının Dağılması

Risk:

Her işletme agent'ının kendi dosyaları olacağı için bağlam hijyeni bozulabilir.

Belirti:

- AGENTS/SOUL/TOOLS/MEMORY/BUSINESS dosyaları her işletmede farklı mantığa kayar,
- tekrar eden veya çelişen talimatlar çoğalır,
- güvenlik sınırları dosyadan dosyaya değişir,
- secret veya raw transcript workspace'e yazılır.

Kontrol:

> Workspace şablonu standart olmalı; işletmeye özel değişiklikler sınırlı ve izlenebilir yapılmalıdır. Secret workspace'e yazılmamalıdır.

## 22.11 Yanlış Yapay Zeka Algısı

Risk:

Müşteri “her şeyi yapan yapay zeka” beklentisine girerse ürün yanlış anlaşılır.

Belirti:

- müşteri ajanın dış hesaplara kendiliğinden müdahale etmesini bekler,
- kesin sonuç garantisi bekler,
- Google sıralaması, yorum sayısı veya satış artışı garantisi ister,
- onaylı ve kontrollü süreci eksiklik sayar.

Kontrol:

> Ürün, her şeyi otomatik yapan yapay zeka değil; işletmenin dijital operasyonunu mesajlaşma üzerinden sistemli ilerleten özel işletme ajanı olarak anlatılmalıdır.

## 22.12 MVP Kabul Standardının Atlanması

Risk:

Bot cevap verdiği veya web taslağı çıktığı için MVP tamamlandı sanılır.

Belirti:

- P0 güvenlik hataları varken yeni pilota geçilir,
- tenant mismatch veya yanlış routing önemsenmez,
- audit ve approval eksik kalır,
- müşteri değeri doğrulanmadan teknik demo yeterli sayılır,
- admin panel sıradaki adımı göstermeden pilot büyütülür.

Kontrol:

> Teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz. P0 bloklayıcı hata sıfır olmadan yeni pilota geçilmez.

## 22.13 Risk Analizinin Güncellenmesi

Bu bölüm proje ilerledikçe güncellenmelidir.

Özellikle şu anlarda tekrar ele alınmalıdır:

- ilk test işletmesi agent'ı oluşturulduğunda,
- ilk web vitrini / QR / katalog çıktısı üretildiğinde,
- ilk müşteri veya pilot işletme denendiğinde,
- WhatsApp pilot hattı devreye alındığında,
- yeni tool/API yetkisi eklendiğinde,
- dış hesap veya ödeme/randevu gibi hassas modüller gündeme geldiğinde,
- segment/paket kararları netleştiğinde.

GPT Pro'ya ayrıca şu sorulmalıdır:

- Bu risk listesinde eksik kritik risk var mı?
- Hangi riskler MVP'de en önce kontrol edilmeli?
- Hangi riskler ürünü/paketi yeniden konumlandırmayı gerektirir?
- Agent/workspace çoğalması için hangi güvenlik ve operasyon kontrol noktaları eklenmeli?

Ana prensip:

> Risk analizi, belgeyi tamamlamak için değil; proje büyüdükçe yön kaymasını ve güvenlik hatalarını erken görmek için kullanılmalıdır.
