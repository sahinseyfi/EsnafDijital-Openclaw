# Business Detail V1

## Amac
`Businesses / Business Detail` yuzeyi, tek bir isletmenin kanonik kontrol panelidir.
Bu sayfa `Project OS` gibi tum akisin sicak kuyrugunu gostermek icin degil, secili kaydi hizli okumak, inceleme oncesi hazirlik yapmak ve sonraki mantikli operator aksiyonunu secmek icin vardir.

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
- coklu business arasinda operasyon onceligi secme

### Business Detail
- bu isletme kim
- kanonik veri ile dis sinyal ne kadar tutarli
- son teklif ve teslimat resmi ne
- bu tek kayit icin sonraki operator karari ne
- bu kayit icin yan yuzeyler nasil acilacak

Kisa kural:
- `Project OS` = liste ve akis merkezi
- `Business Detail` = tek isletme karar yuzeyi
- `Business Detail`, `Project OS`'un ikinci kopyasi veya mini CRM'i olmaz

## Bu sayfa ne olmamali
- tam CRM form duvari olmamali
- ayni anda task, note, timeline, teklif edit, delivery edit duvarina donmemeli
- Project OS'un yaptigi isi tekrar etmemeli
- tum ham scrape verisini ayni yuzeye yigip operatoru bogmamali

## Kalici ilkeler
- kanonik dogru veri operatorun duzelttigi business kaydidir
- dis kaynaklar sinyal ve snapshot katmanidir, business kaydini sessizce override etmez
- inceleme puani ana karar mekanizmasi degil; inceleme ozeti ve eksik listesi once gelir
- sistem paket yonu onerebilir ama son secim operatorundur
- ilk cizgi karar ve aksiyon ekranidir, agir edit ekranlari sonra acilir

---

# 1. Veri kontrati cizgisi

Business Detail V1'in veri mantigi uc ana katmana ayrilir:
- `canonical` = operatorun dogru kabul ettigi ic veri
- `external` = dis dunyadan gelen snapshot ve sinyal
- `derived` = ekrana karar verdiren ozet, fark ve next-step ciktilari

Bu uc katman birbirine karistirilmaz.

## 1.1 Canonical katman
### Kaynak
- `businesses`
- `inceleme_kayitlari`
- `offers`
- `delivery_projects`
- gerekirse daha sonra genisletilecek operator metadata alani

### V1 canonical alanlari
- `id`
- `name`
- `segment`
- `district`
- `ownerName`
- `status`
- `createdAt`
- `updatedAt`

### Kural
- ust profil karti ve ana business kimligi bu katmandan okunur
- teklif ve teslimat gercegi de canonical operasyon kaydi olarak burada baglanir
- dis kaynaktan gelen veriyle cakisma olursa son karar operatorundur
- external veri canonical kaydi sessizce override etmez

## 1.2 External katman
### Kaynak
- `state/apify-discovery/summary/candidates-summary.json`
- `state/apify-discovery/snapshots/<placeId>.json`
- business'e bagli refresh snapshot dosyalari
- sonraki asamada DB tablosu veya metadata alani

### V1 external snapshot alanlari
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
- external katman dis dunya resmi olarak okunur
- operator isterse canonical kaydi buna bakarak duzeltir
- external veri fark, uyari ve sinyal uretir; gercek kaydi tek basina degistirmez

## 1.3 Derived katman
### Kaynak mantigi
Derived ciktilar canonical + external + kompakt hareket gecmisinden turetilir.
Bu katman operatoru 30-60 saniyede karara goturmek icin vardir.

### V1 derived ciktilari
- next step karti
- kisa inceleme ozeti
- 3 ila 7 maddelik eksik listesi
- bilgi tutarliligi sinyali
- yorum / puan ozeti
- website durumu ozeti
- sosyal / randevu sinyali varsa ozet
- uygun paket yonu
- canonical/external fark satirlari
- compact activity timeline

### Kural
- derived katman source of truth degildir
- paket yonu oneridir, secim operatorundur
- uzun inceleme metni veya ham scrape dump'i derived katmana yigilmamalidir

## 1.4 Destek katmanlari
### Activity timeline
V1 timeline'i ayri truth katmani degil, compact derived/ref destek alanidir.

#### V1 kaynaklari
- `business.createdAt`
- `inceleme.createdAt`, `inceleme.updatedAt`
- `offer.createdAt`, `offer.updatedAt`
- `deliveryProject.createdAt`, `deliveryProject.updatedAt`
- dis veri yenileme eventi varsa onun kompakt kaydi

#### Event kontrati
- `id`
- `type`
- `occurredAt`
- `title`
- `text`
- `source`
- `entityId` (opsiyonel)

#### Kural
- timeline yorum degil hareket gosterir
- compact kalir
- karar destekler, ekrani bogmaz

### Operator notu
Bu katman V1 ekraninda tam editor olarak acilmaz, ama veri yeri korunur.

#### Onerilen alanlar
- `id`
- `businessId`
- `body`
- `createdAt`
- `updatedAt`
- `authorRole`

#### Kural
- note canonical business verisini sessizce degistirmez
- not eklendiginde timeline eventi uretilebilir
- note ana ekranin merkezine gecmez

## 1.5 Tek cumlelik veri kurali
- `canonical` = operatorun dogru kabul ettigi ic gercek
- `external` = dis snapshot ve sinyal
- `derived` = karar verdiren ozet katmani

Bu ucunun ayrimi bozulursa Business Detail hizli karar yuzeyi olmaktan cikar.

---

# 2. Sayfa bilgi mimarisi

## 2.1 Ust baslik alani
### Gosterilecekler
- isletme adi
- segment
- ilce
- isletme sahibi
- durum badge'leri
- inceleme / teklif / teslimat badge'leri

### Sag aksiyonlar
- `Is Takibinde ac`
- `Danisma`
- `Baglam`
- sonra gerekirse `Duzenle`

### Amac
Tek bakista hangi kayitta olundugunu ve bu kaydin hangi operasyon asamasinda oldugunu anlatmak.

## 2.2 Kisa ozet satiri
- canonical durum ozeti
- external tazelik / uyumsuzluk ozeti
- derived risk / next-step ozeti

Amac, tek isletmenin gercek kaydi, dis sinyali ve karar resmi arasindaki farki hizli gostermektir.

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
- `Project OS` kuyrugunu tekrar etmez, sadece bu kayit icin ne yapilacagini soyler

## 2.4 On degerlendirme ozeti karti
### Gosterilecekler
- inceleme ozeti
- hazirlik sinyali
- dis veri resmi
- ilk eksik listesi
- Google / website / sosyal gorunurlukten gelen kritik sinyaller
- ilk paket yonu

### Kural
- inceleme ozeti ustte ve okunur kalmali
- detay rapor duvarina donusmemeli

## 2.5 Hazirlik / Tarama paneli
Bu alan ayri bir tam sayfa degil, Business Detail icinde bir bolum olarak acilir.

### Modlar
- `Hafif tarama` (varsayilan)
- `Derin tarama`

### Panel rolu
Bu bolum, operatorun "bu kayit icin baska hangi dis sinyali simdi cekmeye deger" sorusunu cevaplar.
Amaci ham scrape yonetmek degil, inceleme oncesi veya teklif oncesi tek kayit bazli hazirlik paketini kontrollu sekilde genisletmektir.

### V1 sayfa yapisi
Panel tek bir kart olarak acilir ve kendi icinde su sirayla akar:
1. ust ozet bari
2. mod secici
3. kaynak secimi
4. tek primary calistir aksiyonu
5. sonuc ozeti
6. fark alani
7. kisa gecmis

#### Ust ozet bari
- son calisma zamani
- veri tazeligi etiketi
- son calisma durumu (`hazir`, `yenileniyor`, `basarili`, `uyari`, `hatali`)
- son mod (`Hafif` / `Derin`)

Amac: operator karti acmadan once bu alanin ne kadar guncel oldugunu gormek.

#### Mod secici
- segmented control veya iki butonlu secici
- varsayilan secim `Hafif tarama`
- `Derin tarama` secildiginde kisa maliyet / sure uyari satiri gorunur

Kural: sekme mantigi olabilir ama tam tab layout'a donmemeli; mod degisikligi ayni kart icinde kalmali.

#### Kaynak secimi
Varsayilan gorunur alan kisa tutulur.

##### Hafif tarama varsayilan kaynaklari
- mevcut Maps / discovery snapshot
- website kontrolu
- Google Search gorunurluk aramasi
- ilk sonuc sayfalarindan temel sinyal toplama

##### Derin tarama secmeli kaynaklari
- Google Maps detay yenileme
- Instagram
- Yandex
- Apple Maps
- ek review / website enrichment

Kural:
- `Hafif` modda kaynaklar varsayilan acik ve kilitli olabilir; operator sadece neyin kosacagini gorur
- `Derin` modda kaynaklar secmeli gelir
- uzun aciklama yerine her kaynak altinda tek satir amac notu kullanilir

#### Primary aksiyon alani
- tek ana buton: `Tarama baslat`
- buton altinda kisa calisma beklentisi: `yaklasik sure`, `dis kaynak`, `kanonik veri override edilmez`
- ikinci aksiyon olarak ancak gerekirse `Demo sayfasi uret` sonra eklenir, V1'de zorunlu degil

#### Sonuc ozeti
Calisma bittiginde kartin orta bolumunde ilk bakista su alanlar gorunur:
- ozet sonuc metni
- website / telefon / sosyal / randevu sinyali
- isim / adres / website tutarlilik durumu
- kritik eksik listesine eklenecek 3-5 bulgu

Kural: ham SERP dump veya tam scrape JSON'u burada gosterilmez.

#### Fark alani
Yeni calisma onceki snapshot veya onceki tarama ile anlamli fark urettiyse kisa fark satirlari gosterilir:
- yeni bulunan website
- kaybolan telefon
- yorum / puan farki
- sahiplik veya kapanma sinyali degisimi

Kural: fark alani sadece degisim varsa gorunur; bos ise sessiz kalir.

#### Kisa gecmis
Kartin en altinda compact bir gecmis listesi tutulur:
- calisma zamani
- mod
- kaynak sayisi
- sonuc etiketi

Kural: tam run log'u acilmaz; detay gerekirse sonra drawer/modal dusunulur.

### Hafif tarama
Amac, tek isletme icin dusuk maliyetli inceleme on hazirligi cikarmaktir.

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
- Instagram taramasi profil bulmak icin kullanilmaz; sadece bilinen profil linki varsa o profil uzerinden ilerler
- gereksiz toplu scrape'e donusmez

### V1'de gosterilecekler
- ust ozet bari
- mod secici
- kisa kaynak listesi
- tek toplu calistir aksiyonu
- sonuc ozeti
- fark alani
- kisa gecmis

### V1 disinda kalacaklar
- tam scrape console
- cok kolonlu kaynak bazli veri tablosu
- ham HTML / raw JSON gorunumu
- ayni kart icinde not, task ve message duvari
- otomatik surekli tarama veya toplu schedule mantigi

### Kural
- bu panel genel CRM otomasyon duvari olmayacak
- isletmeye gitmeden once hazirlik paketi cikarmak hedef
- maliyet kontrolu icin minimum set varsayilan olacak
- kart ilk bakista karar verir, detay ancak ikincil katmanda acilir

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
On degerlendirme, teklif, teslimat ve sonraki ek eventleri zamansal akista gosterir.

## 2.9 Alt kayitlar
- inceleme kayitlari
- teklif kayitlari
- teslimat / bakim kayitlari

Kural: ana ekran ustu aksiyon odakli kalir, alttaki tablo ve gecmis bolumu referans alanidir.

---

# 3. Capability kirilimi

## 3.1 On degerlendirme / mevcut durum
### Hemen acilabilecekler
- Google Maps snapshot ozeti
- temel bilgi tutarliligi kontrolu
- yorum / puan ozeti
- website var mi / calisiyor mu sinyali
- sosyal / randevu sinyali
- temel eksiklerin kisa ozeti
- puan yerine seviye / kisa inceleme ozeti

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
- inceleme ozeti
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
3. On degerlendirme ozeti
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
- inceleme ozeti okunur
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
- inceleme ozeti ayri tablo mu olacak, mevcut inceleme kaydinin uzantisi mi
- website kontrolu sonucu hangi teknik yontemle uretilecek
- Instagram / Yandex / Apple veri kontrati hangi alanlara inecek
- demo sayfasi icin yayin suresi / kapanma kurali ne olacak

## Sonraki somut uygulama adimi
Bu dokumana gore en mantikli siradaki is:
- business detail icindeki `Hazirlik / Tarama` bolumunu hafif tarama odakli ilk UI olarak acmak
- sonra bu bolumde kaynak secimi + son calisma zamani + ozet ciktilari gostermek
