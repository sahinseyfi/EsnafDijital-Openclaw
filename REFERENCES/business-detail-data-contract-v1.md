# Business Detail Data Contract V1

## Amac
Bu dokuman, business detail sayfasinda ayni anda uc farkli veri katmaninin nasil birlikte calisacagini netlestirir:
1. kanonik operator verisi
2. dis veri snapshot'i
3. timeline / audit / teklif / teslim hareketleri

Amac ekran cogaltmak degil, tek business detail yuzeyinde su sorulari temiz cevaplamaktir:
- bu isletmenin kanonik bilgisi ne
- dis dunyada son gorunen veri ne
- arada fark var mi
- son hareketler ne
- sonraki mantikli operator aksiyonu ne

## V1 prensibi
- kanonik dogru veri `businesses` kaydidir
- dis veri operatorun yerine gecmez, snapshot olarak tutulur
- audit snapshot business detail'in ust tarafinda okunur ozet katmandir
- activity timeline operasyon hareketlerinin zamani cizgisidir
- operator notu ayri katmandir ama V1 kontratinda yeri simdiden ayrilir

## 1. Kanonik operator verisi
Bu katman operatorun duzelttigi ve ana referans kabul edilen veridir.

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
- business detail ust profil karti bu katmandan okunur
- dis kaynaktan gelen veriyle cakisinca son karar operatorundur

## 2. Dis veri snapshot'i
Bu katman discovery / Apify yenileme akisindan gelen son okunmus gercegi tutar.

### Kaynak
- `state/apify-discovery/summary/candidates-summary.json`
- `state/apify-discovery/snapshots/<placeId>.json`
- sonraki asamada business'e bagli kalici DB tablosu veya metadata alani

### V1 snapshot alanlari
Asagidaki alanlar business detail'e tasinabilir:
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
V1'de su alanlar acik gorunmeli:
- son snapshot zamani
- onceki snapshot zamani varsa fark gorunumu
- `Detayli isletme verilerini al` aksiyonunun son calisma zamani

### Kural
- snapshot ekranin “dis dunya resmi” katmanidir
- operator isterse bu veriye bakarak business kaydini duzeltir
- snapshot dogrudan business kaydini sessizce ezmez

## 3. Audit snapshot katmani
Bu katman business detail ustunde kisa okunur audit ozetini verir.

### Kaynak
- discovery snapshot verisi
- website kontrolu sonucu
- operatorun elle duzelttigi eksik listesi
- audit kaydi veya audit metadata alani

### V1 ciktilari
- kisa audit ozeti
- 3 ila 7 maddelik eksik listesi
- bilgi tutarliligi sinyali
- yorum / puan ozeti
- website durumu
- Instagram durumu varsa ozet
- uygun paket yonu

### Kural
- puan sistemi kesinlesmedigi icin audit snapshot ilk cizgide puansiz da calisabilmeli
- eksik listesi operator tarafindan duzenlenebilir olmali
- sistemin urettigi paket yonu oneridir, secim operatorundur

## 4. Activity timeline katmani
Bu katman business detail icindeki zaman akisidir.

### Su anki V1 kaynaklari
- `business.createdAt`
- `audit.createdAt`, `audit.updatedAt`
- `offer.createdAt`, `offer.updatedAt`
- `deliveryProject.createdAt`, `deliveryProject.updatedAt`

### Sonraki ek kaynaklar
- dis veri yenileme eventi
- operator notu eklendi / guncellendi eventi
- demo sayfasi acildi / kapandi eventi
- domain baglama durumu degisti eventi

### Event kontrati
Timeline girdisi su alanlari tasimali:
- `id`
- `type`
- `occurredAt`
- `title`
- `text`
- `source`
- `entityId` (opsiyonel)

### Kural
- timeline yorum degil hareket gosterir
- uzun audit icerigi timeline'i bogmaz
- audit, teklif ve teslimin son hareketleri compact kalir

## 5. Operator notu katmani
Bu katman henuz UI olarak acilmadi ama veri kontratinda yeri sabitlenir.

### Amac
- operatorun business'e ozel serbest ama kisa notlarini tutmak
- bu notlari kanonik veriyle karistirmamak

### V1 kontrat onerisi
- `id`
- `businessId`
- `body`
- `createdAt`
- `updatedAt`
- `authorRole`

### Kural
- not timeline'a dusen ayri bir event de uretir
- not, business ana profil verisini sessizce degistirmez

## 6. `Detayli isletme verilerini al` aksiyonu
Bu aksiyon business detail dis veri katmanini yeniler.

### V1 girisi
- business kaydi
- bagli `placeId` veya maps referansi

### V1 cikisi
- yeni snapshot
- son yenileme zamani
- snapshot farklari
- timeline'a yeni bir “dis veri yenilendi” eventi

### Kural
- bu aksiyon kanonik business verisini otomatik override etmez
- operator isterse snapshot ile business verisini eslestirir / duzeltir

## 7. Ekran eslemesi
### Ust bolum
- kanonik profil
- next step
- audit snapshot

### Orta bolum
- paket yonu
- demo / website durumu
- teslim / domain durumu

### Alt bolum
- activity timeline
- alt kayit tablolari
- sonra operator notlari

## 8. Acik kararlar
Hala netlesmesi gerekenler:
- snapshot verisi DB'ye ne zaman tasinacak
- operator notu ayri tablo mu olacak, metadata mi
- audit snapshot ayri tablo mu olacak, mevcut audit kaydinin uzantisi mi
- website kontrolu sonucu hangi teknik yontemle uretilecek
- Instagram / Yandex / Apple veri kontrati hangi alanlara inecek

## Sonraki somut adim
Bu kontrattan sonra en mantikli uygulama adimi:
- business detail icinde `audit snapshot` kartini acmak
- sonra operator notu veri kontratini netlestirmek
