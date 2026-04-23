# Business Detail V1

## Amac
`Businesses / Business Detail` yuzeyi, tek bir isletmenin kanonik kontrol panelidir.
Bu sayfa `Project OS` gibi tum akisin sicak kuyrugunu gostermek icin degil, secili kaydi hizli okumak, audit oncesi hazirlik yapmak ve sonraki mantikli operator aksiyonunu secmek icin vardir.

Bu dokuman uc ayri referansi tek yerde toplar:
- sayfanin rol ve bilgi mimarisi
- veri kontrati
- capability / acilis sirasi

## Ana soru
Bu sayfa su bes soruya 30-60 saniye icinde cevap vermelidir:
1. bu isletme kim
2. dis dunyada nasil gorunuyor
3. su an hangi asamada
4. ana sorun ne
5. sonraki mantikli aksiyon ne

## Project OS ile rol ayrimi
### Project OS
- bugun hangi is hareket etmeli
- kuyruk ve sicak asama gorunumu
- hizli status ilerletme

### Business Detail
- bu isletme kim
- hangi kayitlari var
- dis veri ile kanonik veri ne kadar tutarli
- son teklif ve teslimat resmi ne
- bu kayit icin sonraki operator katmanlari nasil acilacak

Kisa kural:
- `Project OS` = liste ve akis merkezi
- `Business Detail` = tek kaydin kontrol paneli

## Bu sayfa ne olmamali
- tam CRM form duvari olmamali
- ayni anda task, note, timeline, teklif edit, delivery edit duvarina donmemeli
- Project OS'un yaptigi isi tekrar etmemeli
- tum ham scrape verisini ayni yuzeye yigip operatoru bogmamali

## Kalici ilkeler
- kanonik dogru veri operatorun duzelttigi business kaydidir
- dis kaynaklar sinyal ve snapshot katmanidir, business kaydini sessizce override etmez
- audit puani ana karar mekanizmasi degil; audit ozeti ve eksik listesi once gelir
- sistem paket yonu onerebilir ama son secim operatorundur
- ilk cizgi karar ve aksiyon ekranidir, agir edit ekranlari sonra acilir

---

# 1. Veri katmanlari

## 1.1 Kanonik operator verisi
### Kaynak
- `businesses`
- gerekirse daha sonra genisletilecek operator metadata alani

### V1 alanlari
- `id`
- `name`
- `segment`
- `district`
- `ownerName`
- `status`
- `createdAt`
- `updatedAt`

### Kural
- ust profil karti bu katmandan okunur
- dis kaynaktan gelen veriyle cakisma olursa son karar operatorundur

## 1.2 Dis veri snapshot'i
### Kaynak
- `state/apify-discovery/summary/candidates-summary.json`
- `state/apify-discovery/snapshots/<placeId>.json`
- business'e bagli refresh snapshot dosyalari
- sonraki asamada DB tablosu veya metadata alani

### V1 snapshot alanlari
- `placeId`
- `mapsUrl`
- `categoryName`
- `categories`
- `address`
- `district`
- `city`
- `phone`
- `websiteUrl`
- `hasWebsite`
- `rating`
- `reviewsCount`
- `hasOpeningHours`
- `isClosed`
- `ownershipStatus`
- `latitude`
- `longitude`
- `capturedAt`

### Tazelik alanlari
- son snapshot zamani
- onceki snapshot zamani varsa fark gorunumu
- `Detayli isletme verilerini al` aksiyonunun son calisma zamani

### Kural
- snapshot dis dunya resmi olarak okunur
- operator isterse business kaydini buna bakarak duzeltir
- snapshot sessizce business kaydini ezmez

## 1.3 Audit snapshot katmani
### Kaynak
- discovery snapshot verisi
- website kontrolu sonucu
- Google Search / sonuc sayfasi sinyalleri
- operatorun duzelttigi eksik listesi
- audit kaydi veya audit metadata alani

### V1 ciktilari
- kisa audit ozeti
- 3 ila 7 maddelik eksik listesi
- bilgi tutarliligi sinyali
- yorum / puan ozeti
- website durumu
- sosyal / randevu sinyali varsa ozet
- uygun paket yonu

### Kural
- puansiz da calisabilmeli
- eksik listesi operator tarafindan duzenlenebilir olmali
- paket yonu oneridir, secim operatorundur

## 1.4 Activity timeline katmani
### V1 kaynaklari
- `business.createdAt`
- `audit.createdAt`, `audit.updatedAt`
- `offer.createdAt`, `offer.updatedAt`
- `deliveryProject.createdAt`, `deliveryProject.updatedAt`

### Sonraki kaynaklar
- dis veri yenileme eventi
- scrape / website tarama eventi
- operator notu eventi
- demo sayfasi acildi / kapandi eventi
- domain baglama durumu degisti eventi

### Event kontrati
- `id`
- `type`
- `occurredAt`
- `title`
- `text`
- `source`
- `entityId` (opsiyonel)

### Kural
- timeline yorum degil hareket gosterir
- uzun audit metni timeline'i bogmaz
- kayitlar compact kalir

## 1.5 Operator notu katmani
Bu katman V1 ekraninda tam editor olarak acilmaz, ama veri yeri korunur.

### Onerilen alanlar
- `id`
- `businessId`
- `body`
- `createdAt`
- `updatedAt`
- `authorRole`

### Kural
- note business ana verisini sessizce degistirmez
- not eklendiginde timeline eventi uretilebilir

---

# 2. Sayfa bilgi mimarisi

## 2.1 Ust baslik alani
### Gosterilecekler
- isletme adi
- segment
- ilce
- isletme sahibi
- durum badge'leri
- audit / teklif / teslimat badge'leri

### Sag aksiyonlar
- `Is Takibinde ac`
- `Danisma`
- `Baglam`
- sonra gerekirse `Duzenle`

### Amac
Tek bakista hangi kayitta olundugunu ve bu kaydin hangi operasyon asamasinda oldugunu anlatmak.

## 2.2 Kisa ozet kartlari
- audit kaydi sayisi
- teklif kaydi sayisi
- teslimat / bakim kaydi sayisi

Amaç, kaydin operasyon yogunlugunu hizli gostermektir.

## 2.3 Next Step karti
### Gosterilecekler
- mevcut stage
- status label
- siradaki adim
- kisa operasyon ozeti
- varsa tek primary aksiyon

### Kural
- bu sayfanin en guclu karar karti budur
- coklu aksiyon duvarina donmemeli

## 2.4 Audit Snapshot karti
### Gosterilecekler
- audit ozeti
- hazirlik sinyali
- dis veri resmi
- ilk eksik listesi
- Google / website / sosyal gorunurlukten gelen kritik sinyaller
- ilk paket yonu

### Kural
- audit snapshot ustte ve okunur kalmali
- detay rapor duvarina donusmemeli

## 2.5 Hazirlik / Tarama paneli
Bu alan ayri bir tam sayfa degil, Business Detail icinde bir bolum olarak acilir.

### Modlar
- `Hafif tarama` (varsayilan)
- `Derin tarama`

### Hafif tarama
Amac, tek isletme icin dusuk maliyetli audit on hazirligi cikarmaktir.

#### Kaynaklar
- mevcut Google Maps / discovery snapshot
- Google Search gorunurluk aramasi
- ilk sonuc sayfalarindan temel bilgi toplama
- website kontrolu

#### Cikti
- title / website durumu
- telefon / sosyal / randevu sinyali
- temel adres / ad / website tutarliligi
- kisa hizmet sinyali

#### Kural
- derin crawl yapmaz
- ilk ilgili sayfalar ve dogrudan isletmeye bagli yuzeyleri okur
- amac SERP raporu degil, hizli hazirlik paketidir

### Derin tarama
Amac, operator acarsa secmeli sekilde daha pahali / daha yavas veri toplamak.

#### Kaynaklar
- Google Maps detay yenileme
- Instagram
- Yandex
- Apple Maps
- ek review / website enrichment

#### Kural
- varsayilan acik gelmez
- operator secmeden kosmaz
- gereksiz toplu scrape'e donusmez

### Panelde gosterilecekler
- checkbox'li kaynak listesi
- her kaynak icin kisa amac notu
- tek toplu calistir aksiyonu
- son calisma zamani
- durum etiketi
- gerekiyorsa `Demo sayfasi uret` aksiyonu

### Kural
- bu panel genel CRM otomasyon duvari olmayacak
- isletmeye gitmeden once hazirlik paketi cikarmak hedef
- maliyet kontrolu icin minimum set varsayilan olacak

## 2.6 Son teklif karti
### Gosterilecekler
- paket
- tutar
- paket aciklamasi
- domain tercihi
- secili ekler

### Amac
Teklif kaydini fiyat satiri degil, teslimati besleyen operasyon girdisi gibi gostermek.

## 2.7 Son teslimat karti
### Gosterilecekler
- teslimat durumu
- mevcut scope metni
- website / domain / yayin sinyali varsa ozet

### Amac
Operatorun yapim/bakim resmini detail seviyede gormesi.

## 2.8 Activity timeline
Audit, teklif, teslimat ve sonraki ek eventleri zamansal akista gosterir.

## 2.9 Alt kayitlar
- audit kayitlari
- teklif kayitlari
- teslimat / bakim kayitlari

Kural: ana ekran ustu aksiyon odakli kalir, alttaki tablo ve gecmis bolumu referans alanidir.

---

# 3. Capability kirilimi

## 3.1 Audit / mevcut durum
### Hemen acilabilecekler
- Google Maps snapshot ozeti
- temel bilgi tutarliligi kontrolu
- yorum / puan ozeti
- website var mi / calisiyor mu sinyali
- sosyal / randevu sinyali
- temel eksiklerin kisa ozeti
- puan yerine seviye / kisa audit ozeti

## 3.2 Paket / teklif yonu
### Hemen acilabilecekler
- onerilen paket yonu
- teklif gerekcesi
- hangi eksigi kapattigi

## 3.3 Demo / onizleme
### V1 cizgisi
- demo ayri skill ile uretilir
- business detail icinde sadece durum + link gorunur
- demo acilisi manuel olur

## 3.4 Temel teslimler
### Sonraya birakilacaklar
- logo asset takibi
- kartvizit asset takibi
- website kurulumu detay operasyonu

## 3.5 Kanal genisletmeleri
### Sonraya birakilacaklar
- Yandex kaydi durumu
- Apple Maps kaydi durumu
- Google Maps duzenleme operasyon takibi

## 3.6 Yorum akisi
### Sonraya birakilacaklar
- QR yorum isteme akisi
- NFC yorum isteme akisi

## 3.7 Sosyal profil operasyonu
### Sonraya birakilacaklar
- Instagram kurulum / profil duzeni checklist'i

## 3.8 Domain / yayin
### V1.1 veya V2
- ozel domain tercihi
- custom domain degeri
- DNS / baglama durumu
- subdomain: `yok / demo / canli`

---

# 4. UX ve ekran davranis kurallari

## Sayfada kalacaklar
- header
- next step
- audit snapshot
- hafif tarama ozeti
- scrape paneli
- son teklif karti
- son teslimat karti
- timeline

## Drawer / modal olacaklar
- hafif tarama detay dokumu
- derin tarama kaynak secim detaylari
- snapshot fark detaylari
- son teklif / son teslimat detay acilimlari
- ic not goruntuleme / ekleme

## Ayri yuzeye tasinacaklar
- tam business edit formu
- tam teklif duzenleme
- tam teslimat scope duzenleme
- ham scrape ciktilari
- detay review listesi
- genis task yonetimi
- demo uretim / yayin yonetimi

## Ustten alta ideal akis
1. Header
2. Next Step
3. Audit Snapshot
4. Hazirlik / Tarama paneli
5. Son teklif / son teslimat
6. Timeline
7. Alt kayitlar

## UX kural cizgisi
- ana soru hep ayni kalir: `bu isletmede simdi ne durumda ve sonraki mantikli hareket ne?`
- ilk ekran karar ve yon bulma alanidir
- alt kisim referans ve gecmis alanidir
- ayni bilgi birden fazla kartta gereksiz tekrar etmez
- primary CTA tek olur, digerleri destek aksiyon olur

---

# 5. V1 siniri ve acilis sirasi

## V1 done tanimi
Bu sayfa V1 icin ancak su durumda tamam sayilir:
- route kanonik ve okunur calisiyor
- Project OS'tan detail'e gecis net
- operator tek bakista business'in kim oldugunu ve hangi asamada oldugunu anliyor
- audit snapshot okunur
- hafif tarama ozeti gorunuyor
- son teklif ve teslimat resmi gorunuyor
- timeline referans icin acik
- sayfa task / note / form duvarina donusmemis

## V1'de bilerek acilmayanlar
- tam activity timeline filtresi
- ic not editoru
- gorev listesi
- iletisim gecmisi
- inline duzenleme duvari
- ham scrape operasyon ekrani

## V2 acilis sirasi
1. scrape panelinin daha guclu hali
2. timeline event genislemesi
3. ic not
4. task
5. daha detayli teslim / kanal genisletmeleri

---

# 6. Acik kararlar
Hala netlesmesi gerekenler:
- snapshot verisi DB'ye ne zaman tasinacak
- operator notu ayri tablo mu olacak, metadata mi
- audit snapshot ayri tablo mu olacak, mevcut audit kaydinin uzantisi mi
- website kontrolu sonucu hangi teknik yontemle uretilecek
- Instagram / Yandex / Apple veri kontrati hangi alanlara inecek
- demo sayfasi icin yayin suresi / kapanma kurali ne olacak

## Sonraki somut uygulama adimi
Bu dokumana gore en mantikli siradaki is:
- business detail icindeki `Hazirlik / Tarama` bolumunu hafif tarama odakli ilk UI olarak acmak
- sonra bu bolumde kaynak secimi + son calisma zamani + ozet ciktilari gostermek
