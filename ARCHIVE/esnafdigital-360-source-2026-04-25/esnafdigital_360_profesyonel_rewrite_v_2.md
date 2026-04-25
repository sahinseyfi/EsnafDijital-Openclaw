# EsnafDigital 360 + OpenClaw
## Ajan Merkezli Dijital İşletme Sistemi

> Not: Bu doküman ilk bilgi metnidir. İçindeki bölümler kurucu onayından geçmeden nihai ürün, MVP veya teknik uygulama kararı sayılmaz. Her bölüm ayrı ayrı `kabul / düzelt / ertele` süzgecinden geçirilecektir.

## MVP için kabul edilen mimari karar

Bu dokümanda geçen "işletmeye özel ajan" ifadesi EsnafDigital 360 MVP için gerçek OpenClaw işletme agent'ı ve ayrı workspace anlamına gelir.

MVP kararı şudur:

> Her işletme için tek OpenClaw Gateway/runtime altında ayrı OpenClaw agent, ayrı workspace, ayrı oturum/hafıza ve ayrı izin profili üretilecek. Bu karmaşa manuel yönetimle değil; iyi başlangıç şablonu, otomatik kurulum ve sıkı tool/yetki sınırıyla kontrol altında tutulacak.

`BusinessAgent` artık hafif profil değil; EsnafDigital tarafında bu gerçek işletme agent'ını, workspace'ini, şablon sürümünü, izin profilini, oturumlarını, kanal bağlarını ve görev durumunu izleyen kayıt olarak kullanılacaktır.

Kanal kararı ayrı tutulur: İlk doğrulama Telegram/test kanalıyla yapılabilir; WhatsApp ticari hedef kanaldır. İşletmenin kendi WhatsApp hattını bağlama veya randevu karşılama ek kanal/modül paketi olabilir; ancak ajan mimarisi işletme başına ayrı agent/workspace kararına göre kurulacaktır.

Bu doküman, EsnafDigital 360 projesi için önerilen ürün kararlarını, teknik mimariyi, satış konumlandırmasını, modül yapısını ve ilk uygulama planını taslak olarak toplar.

EsnafDigital 360 artık yalnızca küçük işletmelere web sitesi, Google düzeni, QR yorum sistemi veya bakım hizmeti sunan klasik bir dijital hizmet paketi olarak düşünülmemelidir. Bu metindeki öneriye göre projenin ana omurgası, her işletmeye özel oluşturulan **gerçek OpenClaw işletme agent'ı/workspace'i ve bunu izleyen BusinessAgent kaydı** etrafında kurulmalıdır.

Bu ajan; işletme sahibinden bilgileri toplar, web vitrini üretimini başlatır, Google / Maps / Instagram / yorum / menü / fotoğraf / bakım süreçlerini takip eder, eksikleri hatırlatır, görevleri oluşturur ve gerektiğinde EsnafDigital operasyon ekibine aktarır.

Ana hedef şudur:

> Küçük işletmelere panel öğretmeden, teknik karmaşa çıkarmadan, mesajlaşma üzerinden çalışan bir dijital işletme asistanı sunmak.

---

# 1. Yönetici Özeti

EsnafDigital 360, küçük işletmeler için ajan destekli bir dijital yönetim sistemidir.

Her işletme için bir kayıt oluşturulur. Bu kayda bağlı olarak OpenClaw tarafında ayrı bir işletme agent'ı ve workspace'i, EsnafDigital tarafında ise bu agent'ı izleyen `BusinessAgent` kaydı, oturum, görev listesi ve işletme bağlamı açılır. İşletme sahibi ilk aşamada Telegram/test kanalı veya EsnafDigital pilot hattı üzerinden kendi işletme agent'ına yönlendirilir. Ajan, işletmenin dijital varlığını kurmak ve güncel tutmak için gerekli bilgileri konuşarak toplar.

Sistem ilk aşamada Telegram üzerinden daha hızlı test edilebilir. Ticari hedefte WhatsApp önemli kanaldır; ancak MVP’de önce Telegram iç test, ardından EsnafDigital’e ait ayrı bir WhatsApp pilot hattı düşünülmelidir. Bu nedenle sistem, tek bir kanala bağlı değil; **kanal bağımsız ajan mimarisi** ile tasarlanmalıdır.

OpenClaw, EsnafDigital uygulamasının içine gömülmemelidir. Ayrı bir **agent runtime servisi** olarak çalışmalıdır. İlk MVP’de aynı Hetzner VPS üzerinde ayrı Docker servisi olarak kurulabilir. Müşteri sayısı ve operasyon yükü arttığında OpenClaw runtime ayrı VPS’e taşınmalıdır.

Temel ürün cümlesi:

> İşletmeniz için kendi hafızası, çalışma alanı ve yetki sınırları olan özel bir dijital asistan kuruyoruz. İlk aşamada pilot kanal üzerinden ilerliyorsunuz; asistan web siteniz, Google görünürlüğünüz, yorum sisteminiz, menünüz, fotoğraflarınız ve bakım işleriniz için sizi yönlendiriyor. Ticari kullanımda bu deneyim WhatsApp’a taşınabilecek şekilde tasarlanıyor.

---

# 2. Ana Ürün Kararı

EsnafDigital 360’ın ana kararı şudur:

> Her işletme için gerçek OpenClaw işletme agent'ı ve ayrı workspace oluşturulacak. EsnafDigital içindeki `BusinessAgent` kaydı bu agent'ın kimliğini, workspace yolunu, şablon sürümünü, yetki profilini, oturumlarını, kanal bağlarını ve görev durumunu izleyecek. Bu ajan işletme sahibinden bilgileri toplayacak, işletmenin dijital varlıklarını kuracak, eksikleri takip edecek ve bakım sürecini yönetecek.

Bu karar, projeyi klasik “site yapma” işinden çıkarır ve daha güçlü bir ürün konumuna taşır.

EsnafDigital’in satacağı ana şey artık yalnızca web sitesi değildir.

Satılacak ana değer:

- dijital görünürlük,
- güvenilir görünüm,
- müşteri iletişim kolaylığı,
- Google / Maps düzeni,
- yorum toplama sistemi,
- web vitrini,
- online menü,
- içerik ve fotoğraf düzeni,
- bakım ve takip,
- işletmeye özel dijital asistan.

Bu yapı sayesinde tüm modüller birbirinden kopuk hizmetler olmaktan çıkar ve tek bir ajan merkezli sistemin parçaları haline gelir.

---

# 3. Konumlandırma

## 3.1 Yanlış Konumlandırma

EsnafDigital 360 şu şekilde anlatılmamalıdır:

- web sitesi yapıyoruz,
- Google Maps düzenliyoruz,
- QR yorum sistemi kuruyoruz,
- sosyal medya desteği veriyoruz,
- online menü yapıyoruz,
- küçük işletmelere yazılım satıyoruz.

Bunlar sistemin parçalarıdır; ancak ana ürün değildir.

## 3.2 Doğru Konumlandırma

Doğru konumlandırma:

> EsnafDigital 360, küçük işletmeler için mesajlaşma üzerinden çalışan OpenClaw destekli dijital yönetim sistemidir.

Daha sade müşteri cümlesi:

> Panel öğrenmenize gerek yok. İşletmenizin dijital işleri için asistanınıza WhatsApp’tan yazın; web, Google, yorum, menü, fotoğraf ve bakım işleriniz sistemli şekilde ilerlesin.

Daha satış odaklı cümle:

> İşletmenizin internette güvenilir, güncel ve kolay ulaşılabilir görünmesi için size özel bir dijital asistan kuruyoruz.

---

# 4. Hedef Müşteri

İlk hedef müşteri grubu, dijital tarafta eksikleri olan ama büyük yazılım sistemleri kullanmak istemeyen küçük ve yerel işletmelerdir.

Öncelikli sektörler:

1. kafe,
2. restoran,
3. berber,
4. güzellik salonu,
5. oto yıkama,
6. diş kliniği,
7. spor salonu,
8. butik mağaza,
9. tamir / servis işletmeleri,
10. yerel hizmet işletmeleri.

Bu işletmelerin ortak ihtiyacı şudur:

- internette düzgün görünmek,
- Google’da ve haritada güven vermek,
- müşterinin kolay aramasını sağlamak,
- WhatsApp’tan kolay ulaşılmak,
- yorum toplamak,
- menü veya hizmetleri göstermek,
- fotoğrafları düzenli tutmak,
- bilgileri güncel tutmak,
- bunları teknik panel öğrenmeden yönetmek.

---

# 5. Ürün Mantığı

EsnafDigital 360 üç ana katmandan oluşur:

1. **İşletme dijital profili**
2. **İşletmeye özel gerçek OpenClaw agent/workspace**
3. **Bu agent'ı izleyen BusinessAgent kaydı**
4. **Modüler dijital hizmet sistemi**

## 5.1 İşletme Dijital Profili

Her işletmenin sistemde merkezi bir profili olur.

Bu profil şunları tutar:

- işletme adı,
- sektör,
- yetkili kişi,
- telefon,
- WhatsApp numarası,
- adres,
- çalışma saatleri,
- Google Maps linki,
- Instagram hesabı,
- web vitrini linki,
- yorum linki,
- online menü linki,
- randevu / rezervasyon linki,
- logo,
- fotoğraflar,
- hizmetler,
- ürünler,
- fiyat bilgileri,
- aktif modüller,
- bakım durumu,
- ödeme durumu,
- açık görevler,
- eksik bilgiler,
- son güncelleme tarihi.

## 5.2 BusinessAgent ve Gerçek OpenClaw İşletme Ajanı

Her işletmenin EsnafDigital içinde ayrı bir `BusinessAgent` kaydı olur.

Bu kayıt OpenClaw tarafında açılan gerçek işletme agent'ının EsnafDigital karşılığıdır. MVP’de `BusinessAgent` hafif profil değil; agentId, workspace yolu, şablon sürümü, izin profili, bağlı kanal/peer, oturum ve görev durumunu izleyen kayıt olarak tasarlanır.

Ajan şunları bilir:

- işletmenin kim olduğunu,
- hangi sektörde çalıştığını,
- hangi modüllerin aktif olduğunu,
- hangi bilgilerin eksik olduğunu,
- hangi işlerin müşteriden bilgi beklediğini,
- hangi işlerin operasyona aktarılması gerektiğini,
- hangi taleplerin otomatik yapılabileceğini,
- hangi işlemlerde onay gerektiğini.

Ajanın görevi sadece cevap vermek değildir.

Ajanın gerçek görevi:

- bilgi toplamak,
- müşteriyi yönlendirmek,
- eksikleri hatırlatmak,
- içerik taslağı üretmek,
- görev oluşturmak,
- işletme profilini güncellemek,
- web vitrini ve menü verilerini beslemek,
- bakım sürecini takip etmek,
- operasyon ekibine yapılacak işleri aktarmaktır.

## 5.3 Modüler Hizmet Sistemi

Ajan, sistemdeki tüm hizmet modüllerini yönetir veya tetikler.

Modüller ilk günden veri modelinde yer alır. Ancak hepsinin ilk günden tam otomatik olması gerekmez. Bazı modüller yazılımla, bazıları yarı otomatik, bazıları ise operasyon desteğiyle yürütülür.

Ana prensip:

> Tüm modüller sistemin parçası olarak tasarlanacak; otomasyon seviyesi zamanla artırılacak.

---

# 6. Kanal Stratejisi

Bu sistemde kanal, ürünün kendisi değildir. Kanal sadece müşterinin ajana ulaşma yoludur.

## 6.1 Ticari Hedef Kanal: WhatsApp

Türkiye’de küçük işletme sahibi için en doğal kanal WhatsApp’tır.

Bu yüzden ticari ürün anlatımında hedef kanal WhatsApp olmalıdır. Ancak MVP’de her işletmeye ayrı WhatsApp hattı açılması zorunlu değildir; önce Telegram/test kanalı veya EsnafDigital’e ait pilot WhatsApp hattı üzerinden doğru işletme agent'ına yönlendirme doğrulanacaktır.

Buradaki pilot WhatsApp hattı, işletmelere hemen ayrı numara vermek değil; EsnafDigital’in kişisel numaradan bağımsız kullanacağı kontrollü test hattıdır.

WhatsApp üzerinden yapılacak işler:

- müşteriyle ilk temas,
- bilgi toplama,
- fotoğraf alma,
- menü bilgisi alma,
- çalışma saati güncelleme,
- web vitrini güncelleme talebi,
- QR / yorum linki gönderimi,
- bakım hatırlatmaları,
- kısa rapor paylaşımı,
- destek konuşmaları.

Müşteri vaadi:

> Panel öğrenmenize gerek yok. WhatsApp’tan yazın, dijital asistanınız sizi yönlendirsin.

İşletmenin kendi müşterilerine gösterilecek WhatsApp butonu ise ilk aşamada işletmenin kendi numarasına gider. İşletmenin kendi WhatsApp hattını ajana bağlamak, randevu ve karşılama amaçlı ileri modül olarak ayrıca değerlendirilir.

## 6.2 İlk Teknik MVP Kanalı: Telegram

İlk teknik geliştirme için Telegram daha hızlı ve esnek olabilir.

Telegram şu amaçla kullanılmalıdır:

- iç test,
- hızlı bot prototipi,
- demo müşteri denemesi,
- ajan konuşma akışı geliştirme,
- bilgi toplama senaryolarını doğrulama,
- OpenClaw runtime davranışını test etme.

Telegram, ticari kanal olarak zorunlu tutulmamalıdır. Müşteriye “Telegram kullanmalısın” demek satışta sürtünme oluşturabilir.

## 6.3 Doğru Mimari: Kanal Bağımsız Sistem

Sistemin kalbi WhatsApp veya Telegram olmamalıdır.

Sistemin kalbi:

> Business Profile + Business Agent + Module System + Task Engine

Kanal adaptörleri ayrı tutulmalıdır.

Desteklenecek kanallar:

- Telegram,
- WhatsApp,
- web panel,
- e-posta,
- ileride mobil uygulama.

Önemli kural:

> Ajanın mantığı kanalın içine yazılmayacak. Kanal sadece mesajı alacak, ajana iletecek ve ajan cevabını müşteriye geri gönderecek.

MVP kanal kararı:

> Kanal, agent mimarisinden ayrı yönetilir. İlk doğrulamada Telegram/test kanalı veya EsnafDigital pilot hattı kullanılabilir; mesaj routing/binding ile doğru işletme agent'ına yönlendirilir. WhatsApp ticari hedef kanal olarak kalır.

İleri opsiyon:

> İşletmenin kendi WhatsApp hattını ajana bağlama veya randevu karşılama ek kanal/modül paketi olabilir; ancak işletme başına gerçek agent/workspace kararı çekirdek mimaridir.

---

# 7. OpenClaw Kurulum Kararı

OpenClaw, EsnafDigital uygulamasının içine gömülmemelidir.

Doğru karar:

> OpenClaw ayrı bir agent runtime servisi olarak çalışmalıdır.

## 7.1 İlk MVP Kurulumu

İlk aşamada OpenClaw mevcut Hetzner VPS üzerinde kurulabilir.

Ancak aynı uygulamanın içine değil, ayrı Docker servisi olarak çalışmalıdır.

Önerilen yapı:

```text
Hetzner VPS
│
├─ esnafdigital-app
│  ├─ web vitrini
│  ├─ admin panel
│  ├─ işletme kayıtları
│  ├─ menü / QR / rapor modülleri
│  └─ database / storage
│
└─ openclaw-runtime
   ├─ OpenClaw Gateway
   ├─ Telegram adapter
   ├─ WhatsApp adapter hazırlığı
   ├─ EsnafDigital işletme ajanları
   ├─ işletme agent workspace'leri
   └─ tool execution / sandbox / permission profiles
```

## 7.2 İşletme Başına Ayrı Agent/Workspace Kurulacak

İlk aşamadaki karar, her işletme için gerçek OpenClaw işletme agent'ı ve ayrı workspace üretmektir. Burada amaç müşteri başına ayrı Gateway/VPS kurmak değil; tek OpenClaw Gateway/runtime altında izole agent'lar çalıştırmaktır.

Doğru model:

> Tek OpenClaw Gateway/runtime, çoklu OpenClaw işletme agent'ı, her işletme için ayrı workspace, ayrı oturum/hafıza ve ayrı izin profili.

Örnek:

```text
openclaw-runtime
│
├─ gateway
├─ agent_cafe_ada
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md
│  └─ permission-profile
├─ agent_berber_ali
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md
│  └─ permission-profile
└─ agent_restoran_deniz
   ├─ workspace
   ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md
   └─ permission-profile
```

Her işletmenin ayrı:

- OpenClaw agent'ı,
- workspace'i,
- `BusinessAgent` takip kaydı,
- işletme profili,
- konuşma geçmişi / oturumları,
- görev listesi,
- işletme bağlamı,
- aktif modülleri,
- tool/yetki sınırı

olur.

Karmaşa manuel yönetimle değil; iyi başlangıç şablonu, otomatik agent kurulumu, şablon sürümü takibi ve sıkı tool/yetki sınırıyla kontrol altına alınır.

## 7.3 Ne Zaman Ayrı VPS’e Taşınmalı?

İlk 10-50 müşteri için aynı VPS üzerinde ayrı Docker servisi yeterli olabilir.

Ancak şu durumlarda OpenClaw runtime ayrı VPS’e taşınmalıdır:

- müşteri sayısı artarsa,
- WhatsApp bağlantısı kritik hale gelirse,
- agent işlemleri yoğunlaşırsa,
- medya / dosya yükü artarsa,
- güvenlik izolasyonu gerekirse,
- işletme agent sayısı ve tool çalışma yükü tek VPS sınırını aşarsa.

Üretime geçişte önerilen yapı:

```text
VPS 1 — EsnafDigital App
- web uygulaması
- admin panel
- API
- database
- public website

VPS 2 — OpenClaw Runtime
- OpenClaw Gateway
- WhatsApp / Telegram sessionları
- işletme agent workspace'leri ve BusinessAgent takip kayıtları
- sandbox
- tool execution
```

---

# 8. Teknik Mimari

Sistem şu ana parçalardan oluşmalıdır:

```text
Müşteri
   ↓
WhatsApp / Telegram
   ↓
Channel Adapter
   ↓
İlgili OpenClaw İşletme Agent'ı
   ↓
EsnafDigital API
   ↓
Database / Web Vitrini / Menü / QR / Görevler / Raporlar
```

## 8.1 EsnafDigital App

EsnafDigital App, ürünün ana veri ve yönetim merkezidir.

İçinde şunlar bulunur:

- işletme kayıtları,
- kullanıcı / müşteri bilgileri,
- aktif paketler,
- modül durumları,
- web vitrini verileri,
- menü verileri,
- QR linkleri,
- fotoğraf ve medya varlıkları,
- bakım görevleri,
- durum raporları,
- ödeme durumu,
- admin panel,
- müşteri paneli.

## 8.2 OpenClaw Runtime

OpenClaw Runtime, ajanların çalıştığı ayrı katmandır.

Görevleri:

- mesajları almak,
- mesajı doğru OpenClaw işletme agent'ına yönlendirmek,
- ilgili işletme workspace'ini, hafızasını ve yetki profilini yüklemek,
- müşteriden bilgi istemek,
- EsnafDigital API’ye güvenli istekler atmak,
- görev oluşturmak,
- içerik üretmek,
- rapor taslağı hazırlamak,
- operasyon ekibine bilgi aktarmak.

## 8.3 EsnafDigital API

OpenClaw, veritabanına doğrudan erişmemelidir.

Doğru bağlantı:

> OpenClaw → EsnafDigital API → Database

Bu yapı güvenlik ve kontrol açısından daha doğru olur.

Ajanın kullanacağı örnek API işlemleri:

- işletme bilgisi getir,
- işletme bilgisi güncelle,
- eksik bilgi listesi getir,
- fotoğraf yükle,
- menü öğesi ekle,
- QR linki oluştur,
- bakım görevi aç,
- rapor oluştur,
- müşteri talebi kaydet,
- operasyon görevi oluştur.

Bu işlemler OpenClaw tarafında skill değil, tool / plugin olarak bağlanmalıdır.

- **Skill:** Ajanın nasıl davranacağını ve hangi akışı izleyeceğini tarif eder.
- **Tool / plugin:** Ajanın EsnafDigital API üzerinde gerçek işlem yapmasını sağlar.

MVP’de ortak işletme agent davranış şablonu, işletmeye özel workspace dosyaları ve bu ajanların kullanacağı sınırlı EsnafDigital API tool’ları birlikte düşünülmelidir.

---

# 9. Ana Modüller

Sistem baştan tüm modülleri taşıyabilecek şekilde tasarlanmalıdır.

## 9.1 Çekirdek Modüller

Bunlar ilk sürümün ana omurgasıdır:

- işletmeye özel OpenClaw işletme agent'ı ve BusinessAgent takip kaydı,
- dijital görünürlük kontrolü,
- Google İşletme Profili düzeni,
- mobil uyumlu web vitrini,
- QR yorum sistemi,
- WhatsApp / arama / yol tarifi bağlantıları,
- Instagram profil düzeni,
- fotoğraf ve içerik toparlama,
- aylık bakım,
- basit durum raporu.

## 9.2 Ek Ticari Modüller

Bunlar paketlere eklenebilir veya opsiyonel hizmet olarak satılabilir:

- özel domain,
- NFC yorum kartı,
- yorum standı,
- kartvizit veya basit logo desteği,
- online menü sayfası,
- randevu / rezervasyon linki,
- dinamik QR,
- düzenli Instagram içerik desteği,
- ek fotoğraf ve içerik düzenleme.

## 9.3 İleri Sistem Modülleri

Bunlar sistem vizyonunda baştan yer almalı, ancak otomasyon seviyesi kademeli artırılmalıdır:

- müşteri paneli,
- self-service içerik yönetimi,
- WhatsApp Randevu Asistanı,
- gelişmiş online menü sistemi,
- gelir / gider ekranı,
- stok ve muhasebe modülleri,
- gelişmiş entegrasyonlar,
- satış temsilcisi ağı.

---

# 10. Modüllerin İlk Sürüm Karşılığı

Tüm modüller sistemde temsil edilmelidir. Fakat ilk gün hepsinin tam otomatik olması gerekmez.

| Modül | İlk Sürüm Karşılığı | Tip |
|---|---|---|
| Dijital görünürlük kontrolü | Ajan bilgi toplar, operasyon checklist’i tamamlar | Yarı otomatik |
| Google İşletme Profili | Ajan bilgi toplar, operasyon kontrol eder | Manuel + ajan destekli |
| Web vitrini | İşletme profilinden otomatik taslak sayfa oluşur | Yazılım |
| QR yorum sistemi | Google yorum linkinden QR üretilir | Yarı otomatik |
| WhatsApp / arama / yol tarifi | Profil verilerinden butonlar üretilir | Yazılım |
| Instagram profil düzeni | Ajan bio, link ve profil önerisi üretir | Yarı otomatik |
| Fotoğraf / içerik | Müşteri kanaldan gönderir, profil varlıklarına eklenir | Yarı otomatik |
| Aylık bakım | Ajan hatırlatır, operasyon kontrol eder | Yarı otomatik |
| Basit rapor | Checklist ve profil verisinden üretilir | Yarı otomatik |
| Özel domain | Operasyon bağlar | Manuel |
| NFC kart | QR linki NFC’ye yazılır | Manuel / fiziksel |
| Yorum standı | QR tasarımı hazırlanır | Manuel / fiziksel |
| Kartvizit / logo | Şablonla hazırlanır | Hizmet |
| Online menü | Basit kategori / ürün sayfası | Yazılım |
| Randevu linki | Mevcut link web vitrini ve ajana bağlanır | Yarı otomatik |
| WhatsApp Randevu Asistanı | İlk aşamada talep toplar ve işletme sahibine onay için özetler | İleri modül |
| Dinamik QR | Kısa link hedefi panelden değişir | Yazılım |
| Instagram içerik | Ajan önerir, operasyon uygular | Hizmet |
| Ek fotoğraf düzenleme | Kanaldan alınır, göreve dönüşür | Yarı otomatik |
| Müşteri paneli | İlk aşamada WhatsApp/Telegram arayüzü panel yerine geçer | Ajan arayüzü |
| Self-service içerik | Müşteri mesajla bilgi/fotoğraf gönderir | Ajan arayüzü |
| İşletmeye özel ajan | Her işletmeye ayrı OpenClaw agent/workspace; `BusinessAgent` kaydı bunu izler | Yazılım |
| Gelişmiş menü | Basit menüden sonra geliştirilir | Kademeli yazılım |
| Gelir / gider | Veri modeli hazırlanır, aktif ürün sonraya kalır | İleri modül |
| Stok / muhasebe | Veri modeli ve entegrasyon alanı bırakılır | İleri modül |
| Entegrasyonlar | API bağlantıları sonradan eklenir | İleri modül |
| Satış temsilcisi ağı | İlk müşterilerden sonra kurulur | İleri operasyon |

---

# 11. İlk MVP Tanımı

Bu projede MVP yalnızca web vitrini değildir.

MVP şu akışı çalıştırmalıdır:

> Bir işletme sisteme kaydedildiğinde ona özel OpenClaw işletme agent'ı, ayrı workspace, `BusinessAgent` takip kaydı, konuşma oturumu, bağlam ve görev listesi oluşur. İşletme sahibi ilk aşamada Telegram veya test kanalı üzerinden kendi işletme agent'ına yönlendirilir. Ajan kendi işletme hafızası ve izin profiliyle işletme bilgilerini toplar. Sistem bu bilgilerle web vitrini, iletişim butonları, QR yorum linki, basit menü ve görev listesini oluşturur. Mimari WhatsApp’a taşınabilecek şekilde kurulmuş olur.

## 11.1 MVP’de Olması Gerekenler

MVP’nin çalışıyor sayılması için şu parçalar hazır olmalıdır:

- işletme kayıt modeli,
- işletme profili,
- işletmeye özel gerçek OpenClaw agent/workspace,
- `BusinessAgent` takip kaydı,
- işletme bazlı ayrı oturum, bağlam ve hafıza,
- agent workspace şablonu,
- otomatik agent kurulum akışı,
- sıkı tool/yetki profili,
- Telegram test bağlantısı,
- routing/binding ile doğru işletme agent'ına yönlendirme,
- kanal bağımsız mesaj işleme yapısı,
- ajan bilgi toplama akışı,
- web vitrini taslağı,
- WhatsApp / arama / yol tarifi bağlantıları,
- Google yorum linki alanı,
- QR üretim akışı,
- basit online menü yapısı,
- fotoğraf toplama akışı,
- admin görev listesi,
- bakım görevi oluşturma,
- basit durum raporu taslağı.

## 11.2 MVP’de Tam Otomatik Olması Gerekmeyenler

İlk MVP’de şu işler manuel veya yarı otomatik kalabilir:

- Google İşletme Profili’nde gerçek değişiklik yapmak,
- Instagram’da paylaşım yapmak,
- özel domain bağlamak,
- NFC kart basmak,
- yorum standı hazırlamak,
- gelir / gider sistemi,
- stok ve muhasebe modülleri,
- gelişmiş müşteri paneli,
- tüm WhatsApp otomasyonları,
- işletmenin kendi WhatsApp hattını ajana bağlama ve randevu karşılama modülü.

Bu işler sistemde modül olarak temsil edilmeli; ancak ilk gün tam otomasyon zorunlu olmamalıdır.

---

# 12. Müşteri Akışı

## 12.1 Satış Öncesi

İşletme için kısa bir ön değerlendirme yapılır.

Bakılacak alanlar:

- Google Maps görünümü,
- yorum sayısı,
- fotoğraf durumu,
- Instagram profili,
- mevcut web sitesi,
- adres / telefon tutarlılığı,
- rakip örnekleri,
- ilk izlenim notu.

Çıktı:

> Dijital Ön Değerlendirme Notu

## 12.2 Satış Görüşmesi

Müşteriye teknik sistem değil, sonuç anlatılır:

> İşletmeniz için kendi hafızası ve yetki sınırları olan özel bir dijital asistan kuruyoruz. Bu asistan web siteniz, Google görünürlüğünüz, yorum sisteminiz, menünüz ve bakım işleriniz için sizi mesajlaşma üzerinden yönlendiriyor.

MVP anlatımında bu cümle şu şekilde daraltılmalıdır:

> İlk aşamada pilot mesajlaşma kanalı üzerinden dijital kurulumunuzu yönetiyoruz. Sistem WhatsApp’a taşınabilecek şekilde tasarlanıyor.

## 12.3 Kurulum

Satış sonrası süreç:

1. işletme kaydı açılır,
2. aktif paket seçilir,
3. işletmeye özel OpenClaw agent/workspace otomatik oluşturulur,
4. bu agent'ı izleyen `BusinessAgent` kaydı açılır,
5. müşteri mesajlaşma kanalına bağlanır,
6. ajan bilgileri toplamaya başlar,
7. web vitrini taslağı oluşur,
8. QR yorum linki hazırlanır,
9. menü / hizmet bilgileri alınır,
10. fotoğraflar toplanır,
11. teslimat görevleri panelde takip edilir.

## 12.4 Bakım

Kurulumdan sonra ajan düzenli olarak şu işleri takip eder:

- çalışma saatleri güncel mi?
- yeni fotoğraf var mı?
- menü değişti mi?
- fiyatlar değişti mi?
- Google yorum linki çalışıyor mu?
- QR linki çalışıyor mu?
- Instagram profili güncel mi?
- web vitrini bilgileri doğru mu?
- bakım raporu hazırlanmalı mı?

---

# 13. OpenClaw Ajan Davranışı

Ajanın dili sade, yönlendirici ve iş bitirici olmalıdır.

Ajan şunları yapmalıdır:

- müşteriden tek seferde çok fazla bilgi istememeli,
- adım adım bilgi toplamalı,
- eksik bilgiyi açıkça belirtmeli,
- müşterinin gönderdiği bilgiyi işletme profiline bağlamalı,
- gerekiyorsa görev oluşturmalı,
- riskli işlemlerde onay istemeli,
- operasyon ekibine aktarılması gereken işleri ayırmalı,
- her konuşmayı somut sonraki adıma bağlamalı.

Ajanın örnek davranışı:

```text
Merhaba, işletmenizin dijital kurulumunu başlatıyorum.
Önce temel bilgileri tamamlayalım.

1. İşletme adınız nedir?
2. İşletme adresiniz nedir?
3. Müşteriler size hangi WhatsApp numarasından ulaşsın?
```

Bilgi tamamlandığında:

```text
Temel bilgiler tamamlandı.
Şimdi web vitrininizin ilk taslağını hazırlayabilirim.
Bunun için 3-5 işletme fotoğrafı ve sunduğunuz ana hizmetleri göndermeniz yeterli.
```

---

# 14. Admin / Operasyon Paneli

EsnafDigital tarafında tüm işletmeler ve ajan süreçleri tek panelden takip edilmelidir.

Panelde görünmesi gereken alanlar:

- işletme listesi,
- aktif ajan durumu,
- son müşteri mesajı,
- eksik bilgiler,
- açık görevler,
- bekleyen onaylar,
- web vitrini durumu,
- Google / Maps durumu,
- QR yorum durumu,
- online menü durumu,
- fotoğraf durumu,
- bakım tarihi,
- ödeme durumu,
- manuel müdahale gereken işler.

Panelin amacı müşteriyle konuşmak değil, operasyonu kontrol etmektir.

Müşteri için ana arayüz mesajlaşma kanalıdır. Panel, EsnafDigital ekibinin yönetim ekranıdır.

---

# 15. Web Vitrini Mantığı

Web vitrini, işletme profilinden otomatik veya yarı otomatik oluşmalıdır.

Sayfada bulunacak temel alanlar:

- işletme adı,
- kısa açıklama,
- sektör / hizmet türü,
- fotoğraflar,
- hizmetler,
- online menü veya ürünler,
- telefon butonu,
- WhatsApp butonu,
- yol tarifi butonu,
- Instagram bağlantısı,
- Google yorum bağlantısı,
- çalışma saatleri,
- adres,
- varsa kampanya / duyuru alanı.

Web vitrini müşterinin internetteki temel güven sayfası olmalıdır.

Amaç kapsamlı kurumsal site yapmak değil; işletmenin hızlı, düzgün, mobil uyumlu ve güvenilir görünmesini sağlamaktır.

---

# 16. Online Menü Mantığı

Online menü ilk aşamada basit tutulmalıdır.

İlk menü yapısı:

- kategori,
- ürün adı,
- açıklama,
- fiyat,
- ürün fotoğrafı,
- aktif / pasif durumu.

Ajan müşteriden menü bilgilerini mesajlaşma üzerinden toplayabilir.

Örnek:

```text
Menünüzü eklemek için ürünleri şu formatta gönderebilirsiniz:

Ürün adı:
Fiyat:
Kategori:
Kısa açıklama:
Fotoğraf:
```

Gelişmiş menü sistemi sonraki aşamada eklenebilir.

---

# 17. QR ve Dinamik Link Mantığı

QR sistemi iki seviyeli düşünülmelidir.

## 17.1 Basit QR

İlk aşamada QR doğrudan şu hedeflere yönlenebilir:

- Google yorum linki,
- WhatsApp linki,
- online menü,
- web vitrini,
- randevu linki.

## 17.2 Dinamik QR

Daha doğru yapı, QR’ın kısa link üzerinden çalışmasıdır.

Örnek:

```text
esnafdigital.com/q/abc123
```

Bu kısa linkin hedefi panelden değiştirilebilir.

Bu sayede basılı QR materyali değişmeden hedef değiştirilebilir.

Kullanım örnekleri:

- bugün Google yorum linkine yönlendir,
- yarın online menüye yönlendir,
- kampanya döneminde özel sayfaya yönlendir,
- randevu sistemine yönlendir.

---

# 18. Paket Yapısı

## 18.1 EsnafDigital 360 Ajan Kurulum Paketi

İçerik:

- işletmeye özel OpenClaw agent/workspace,
- bu agent'ı izleyen `BusinessAgent` kaydı,
- mesajlaşma bağlantısı,
- işletme bilgi toplama akışı,
- mobil uyumlu web vitrini,
- Google / Maps kontrol akışı,
- QR yorum sistemi,
- WhatsApp / arama / yol tarifi bağlantıları,
- Instagram profil önerisi,
- fotoğraf ve içerik toplama,
- basit online menü,
- temel durum raporu.

## 18.2 EsnafDigital 360 Ajan Bakım Paketi

İçerik:

- aylık dijital kontrol,
- web vitrini güncellemeleri,
- menü güncellemeleri,
- fotoğraf güncellemeleri,
- Google / QR / link kontrolleri,
- Instagram içerik önerileri,
- bakım hatırlatmaları,
- kısa durum raporu,
- mesajlaşma üzerinden destek.

## 18.3 Ek Modüller

Ek ücretli veya üst paket olarak sunulabilecek modüller:

- özel domain,
- NFC yorum kartı,
- yorum standı,
- kartvizit / basit logo,
- gelişmiş online menü,
- randevu / rezervasyon entegrasyonu,
- WhatsApp Randevu Asistanı,
- dinamik QR yönetimi,
- düzenli sosyal medya içerik desteği,
- gelir / gider,
- stok,
- muhasebe entegrasyonu,
- satış temsilcisi ağı.

---

# 19. Geliştirme Sırası

En mantıklı teknik geliştirme sırası:

1. Business veri modeli
2. BusinessModule yapısı
3. BusinessAgent takip modeli
4. İşletme agent workspace şablonu
5. Otomatik OpenClaw agent kurulum akışı
6. Tool/yetki profili ve sandbox sınırı
7. OpenClaw runtime servis ayrımı
8. EsnafDigital API bağlantısı ve ajan tool/plugin sınırı
9. Telegram MVP adapter / routing-biding doğrulaması
10. Ajan bilgi toplama akışı
11. Admin işletme listesi
12. Web vitrini şablonu
13. QR yorum üretimi
14. Kısa link / dinamik QR altyapısı
15. Fotoğraf / asset yönetimi
16. Basit online menü
17. Bakım görevleri
18. Basit durum raporu
19. EsnafDigital WhatsApp pilot hattı
20. Müşteri paneli
21. Gelişmiş menü
22. Gelir / gider
23. Stok / muhasebe
24. Entegrasyonlar
25. Satış temsilcisi ağı
26. İşletmenin kendi WhatsApp hattını ajana bağlama / randevu asistanı modülü

Kritik geliştirme kararı:

> Önce gerçek işletme agent/workspace şablonu + otomatik kurulum + sıkı tool/yetki sınırı + BusinessAgent takip kaydı + bilgi toplama + web vitrini + QR + menü akışı kurulacak. Sonra WhatsApp pilot hattı, panel iyileştirmeleri ve ileri modüller eklenecek.

---

# 20. İlk 30 Gün Uygulama Planı

## Hafta 1 — Temel Veri ve Mimari

Hedef:

- işletme veri modelini kurmak,
- modül yapısını tanımlamak,
- OpenClaw runtime kararını teknik olarak ayırmak,
- ilk agent workspace şablonunu ve otomatik kurulum mantığını oluşturmak.

Çıktılar:

- Business modeli,
- BusinessModule yapısı,
- BusinessAgent takip modeli,
- agent workspace şablonu,
- otomatik agent kurulum taslağı,
- EsnafDigital API tool/plugin sınırı,
- temel API endpointleri,
- admin işletme listesi taslağı.

## Hafta 2 — Ajan ve Telegram MVP

Hedef:

- Telegram üzerinden çalışan ilk işletme ajanı prototipini oluşturmak,
- ajanın bilgi toplama akışını test etmek,
- bilgileri işletme profiline yazdırmak.

Çıktılar:

- Telegram bot bağlantısı,
- routing/binding ile doğru işletme agent'ına yönlendirme testi,
- işletme ajanı konuşma akışı,
- temel bilgi toplama,
- eksik bilgi takibi,
- görev oluşturma.

## Hafta 3 — Web Vitrini, QR ve Menü

Hedef:

- ajan tarafından toplanan bilgilerle web vitrini taslağı oluşturmak,
- QR yorum akışını kurmak,
- basit online menü modelini eklemek.

Çıktılar:

- demo web vitrini,
- WhatsApp / arama / yol tarifi butonları,
- Google yorum link alanı,
- QR üretimi,
- basit menü sayfası,
- fotoğraf yükleme akışı.

## Hafta 4 — Satışa Hazırlık ve İlk Demo

Hedef:

- sistemi ilk müşteri görüşmelerinde gösterilebilir hale getirmek,
- paket anlatımını netleştirmek,
- ilk 3-5 işletme ile test yapmak.

Çıktılar:

- demo işletme,
- satış konuşma metni,
- teklif şablonu,
- dijital ön değerlendirme şablonu,
- bakım paketi açıklaması,
- ilk müşteri test notları.

---

# 21. İlk 10 Müşteri Stratejisi

İlk 10 müşteri gelirden çok öğrenme için kullanılmalıdır.

Ölçülecek sorular:

- Hangi sektör daha hızlı anlıyor?
- EsnafDigital asistan hattı ve WhatsApp’a taşınabilir asistan fikri ilgi çekiyor mu?
- Müşteri web vitrini mi, yorum sistemi mi, Google düzeni mi, menü mü istiyor?
- Hangi fiyat seviyesi kabul ediliyor?
- Kurulum kaç saat / gün sürüyor?
- Müşteriden bilgi toplama nerede tıkanıyor?
- Ajan gerçekten iş yükünü azaltıyor mu?
- Hangi işler hâlâ manuel kalmalı?

İlk 10 müşteride hedef mükemmel ürün değil, doğru sistem omurgasını doğrulamaktır.

---

# 22. Güvenlik ve Onay Kuralları

Ajan her işi otomatik yapmamalıdır.

Aşağıdaki işlemler kurucu veya operasyon onayı olmadan yapılmamalıdır:

- müşteriye dış dünyada mesaj göndermek,
- sosyal medya paylaşımı yapmak,
- Google / Maps / Instagram hesaplarında gerçek değişiklik yapmak,
- domain / DNS değiştirmek,
- müşteri verisi silmek,
- canlı sistemde riskli işlem yapmak,
- ödeme veya fiyat kararı vermek,
- sözleşme kararı vermek,
- müşteri adına ticari taahhüt oluşturmak,
- kesin randevu oluşturmak,
- parola, token veya erişim bilgisi değiştirmek.

Ajanın güvenli rolü:

- bilgi toplar,
- öneri üretir,
- görev açar,
- içerik taslağı hazırlar,
- kontrol listesi tamamlar,
- onay gereken işleri operasyon ekibine aktarır.

Randevu gibi müşteriyle doğrudan işleyen senaryolarda ajan ilk aşamada talep toplar ve özetler; kesin randevu ancak işletme sahibi veya operasyon onayıyla oluşur.

---

# 23. Başarı Kriterleri

İlk aşamada başarı, tüm modülleri tam otomatik yapmakla ölçülmemelidir.

Başarı kriterleri:

- bir işletme sisteme eklenebiliyor mu?
- işletmeye özel OpenClaw agent/workspace, `BusinessAgent` takip kaydı, oturum, hafıza ve yetki profili oluşuyor mu?
- müşteri ajanla mesajlaşabiliyor mu?
- ajan temel bilgileri toplayabiliyor mu?
- bilgiler işletme profiline yazılıyor mu?
- web vitrini taslağı oluşuyor mu?
- QR yorum linki üretilebiliyor mu?
- online menü basit şekilde oluşturulabiliyor mu?
- görevler admin panelde görünüyor mu?
- bakım süreci takip edilebiliyor mu?
- sistem WhatsApp’a taşınabilecek kadar ayrık mı?

Bu sorulara evet cevabı alınırsa MVP doğru yoldadır.

---

# 24. Stratejik Riskler

## 24.1 Kapsam Şişmesi

Risk:

Tüm modülleri aynı anda tam otomatik yapmaya çalışmak projeyi yavaşlatır.

Karar:

> Modüller baştan sistemde yer alacak, ancak otomasyon seviyesi kademeli artırılacak.

## 24.2 Tek Kanala Bağımlılık

Risk:

Sistem sadece Telegram’a veya sadece WhatsApp’a göre kurulursa ileride taşımak zorlaşır.

Karar:

> Kanal adaptörü ayrılacak. Ajan çekirdeği backend’de kalacak.

## 24.3 OpenClaw’ın Ana Uygulamaya Gömülmesi

Risk:

Ajan runtime ana uygulamaya gömülürse güvenlik, ölçekleme ve bakım zorlaşır.

Karar:

> OpenClaw ayrı servis olarak kurulacak. İlk aşamada aynı VPS, ileride ayrı VPS.

## 24.4 Ajanın Fazla Yetki Alması

Risk:

Ajan kontrolsüz şekilde dış hesaplarda işlem yaparsa müşteri ve güvenlik riski oluşur.

Karar:

> Ajan bilgi toplar, öneri üretir ve görev açar. Riskli dış işlemler onayla yapılır.

---

# 25. OpenClaw’a Verilecek Ana Talimat

OpenClaw ajanları aşağıdaki ana prensiple çalışmalıdır:

```text
Sen EsnafDigital 360 sistemi içinde çalışan işletmeye özel dijital asistansın.
Görevin müşterinin dijital işlerini mesajlaşma üzerinden sade şekilde yönetmektir.

MVP'de her işletme için ayrı OpenClaw işletme agent'ı ve workspace'iyle çalışırsın.
Kendi işletme hafızan, şablon dosyaların ve yetki sınırların vardır.
EsnafDigital ana workspace'ine ve diğer işletme workspace'lerine erişmezsin.
Sadece sana verilen EsnafDigital API tool/plugin'ları ve izin profili içinde işlem yaparsın.

Önce işletmenin eksik bilgilerini topla.
Sonra bu bilgileri işletme profiline işle.
Web vitrini, Google görünürlüğü, QR yorum sistemi, online menü, fotoğraf, Instagram ve bakım süreçleri için müşteriyi adım adım yönlendir.

Müşteriye teknik detay anlatma.
Her konuşmayı net bir sonraki adıma bağla.
Eksik bilgi varsa kısa ve anlaşılır şekilde iste.
Riskli işlemleri otomatik yapma; operasyon veya kurucu onayı iste.
Kesin randevu, dış hesap değişikliği, ödeme/fiyat veya müşteri adına taahhüt gerektiren işleri onaysız yapma.

Amacın cevap vermek değil, işletmenin dijital kurulum ve bakım sürecini ilerletmektir.
```

---

# 26. Nihai Karar

EsnafDigital 360 şu şekilde inşa edilmelidir:

> Her işletme için ayrı OpenClaw işletme agent'ı, ayrı workspace, ayrı hafıza/oturum, sıkı yetki profili ve bunu izleyen `BusinessAgent` kaydı oluşturan; mesajlaşma üzerinden işletme bilgilerini toplayan, web vitrini ve dijital görünürlük altyapısını kuran, QR / menü / içerik / bakım / rapor süreçlerini yöneten modüler dijital işletme sistemi.

Kanal kararı:

> Ticari hedefte WhatsApp önemli kanaldır; ilk MVP ve teknik doğrulama için Telegram başlangıç kanalıdır. WhatsApp önce EsnafDigital’e ait ayrı pilot hatla denenir. Sistem mimarisi kanal bağımsız olmalıdır.

OpenClaw kurulum kararı:

> OpenClaw, EsnafDigital uygulamasının içine gömülmeyecek. Ayrı bir agent runtime servisi olarak kurulacak. İlk MVP’de aynı Hetzner VPS üzerinde ayrı Docker servisi olarak çalışacak. Tek OpenClaw Gateway/runtime altında her işletme için ayrı OpenClaw agent/workspace, ayrı oturum/hafıza ve ayrı yetki profili üretilecek. `BusinessAgent` kaydı bu gerçek agent'ı EsnafDigital tarafında izleyecek. Ajanlar EsnafDigital veritabanına doğrudan değil, EsnafDigital API üzerinden, sınırlı tool/plugin’lar aracılığıyla işlem yapacak.

Ürün yönü:

> EsnafDigital 360, küçük işletmeler için panel değil, mesajlaşma tabanlı dijital asistan deneyimi sunmalıdır.
