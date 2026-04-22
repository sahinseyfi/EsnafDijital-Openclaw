# Businesses Sayfasi Tasarim Plani

## Amac
`Businesses` / business detail yuzeyi, secili isletmenin kanonik profil ve operasyon gorunumudur.
Bu sayfa `Project OS` gibi tum akisin sicak kuyrugunu gostermek icin degil, tek bir isletmeyi daha derin okumak ve yonetmek icin vardir.

## Project OS ile rol ayrimi
### Project OS
- bugun hangi is hareket etmeli
- kuyruk ve sicak asama gorunumu
- hizli status ilerletme

### Businesses / Business Detail
- bu isletme kim
- hangi durumda
- hangi kayitlari var
- son teklif ve teslimat resmi ne
- burada sonraki operator katmanlari nasil acilacak

Kisa kural:
- `Project OS` = liste ve akis merkezi
- `Business Detail` = tek kaydin kontrol paneli

## Bu sayfa ne olmamali?
- ilk asamada tam CRM form duvari olmamali
- ayni anda task, note, timeline, teklif edit, delivery edit duvarina donmemeli
- Project OS'un yaptigi isi tekrar etmemeli

## Ana tasarim ilkesi
Discovery detail iskeleti yeniden kullanilir:
- ustte guclu baslik alani
- badge'li durum ozeti
- sag ustte hizli aksiyonlar
- altta kartli iki kolon bilgi bloklari
- en altta alt kayit tabloları

Ama icerik discovery degil, tamamen business + operasyon odakli olur.

## V1 bilgi mimarisi

### 1. Ust baslik alani
Icerik:
- isletme adi
- segment
- ilce
- isletme sahibi
- durum badge'leri
- audit / teklif / teslimat badge'leri

Sag aksiyonlar:
- `Is Takibinde ac`
- `Danisma`
- `Baglam`
- sonra eklenecek: `Duzenle`

Amac:
Tek bakista hangi kayitta oldugunu ve bu kaydin hangi operasyon asamasinda bulundugunu anlatmak.

### 2. Kisa ozet kartlari
Kartlar:
- audit kaydi sayisi
- teklif kaydi sayisi
- teslimat / bakim kaydi sayisi

Amac:
Bu business'in panel icindeki yogunlugunu hizli gostermek.

### 3. Sol kolon, Temel profil
Alanlar:
- isletme adi
- tur / segment
- ilce
- isletme sahibi
- kayit durumu
- kanonik route

Not:
Bu kolon V1'de sade tutulur.
Iletisim, adres, posta kodu, etiket gibi alanlar veri modeli geldikce eklenir.

### 4. Sag kolon, Operasyon ozeti
Alanlar:
- mevcut stage
- status label
- siradaki adim
- kisa operasyon ozeti
- son audit ozeti
- son teklif ozeti
- son teslimat ozeti

Amac:
Project OS'tan bu kayda giren operator burada daha detayli ama hala kompakt bir operasyon cevabi gorsun.

### 5. Son teklif karti
Gosterilecekler:
- paket
- tutar
- paket aciklamasi
- domain tercihi
- secili ekler

Amac:
Teklif kaydini sadece fiyat satiri gibi degil, teslimati besleyen operasyon girdisi gibi gostermek.

### 6. Son teslimat karti
Gosterilecekler:
- teslimat durumu
- mevcut scope metni

Amac:
Operatorun bu isletmenin yapim/bakim resmini detail seviyede gormesi.

### 7. Alt kayitlar
Tablolar:
- audit kayitlari
- teklif kayitlari
- teslimat / bakim kayitlari

Amac:
Gecmise inmek isteyen operator icin referans alan saglamak.
Ana ekranin ustu aksiyon odakli kalir, asagi taraf kontrol ve gecmis bolumudur.

## V1'de bilerek acilmayanlar
- tam activity timeline
- ic not editoru
- gorev listesi
- iletisim gecmisi
- inline duzenleme duvari

Sebep:
Bunlari ayni anda acarsak business detail ilk gunden agir bir mini CRM'e doner.

## V2 acilis sirasi
Bu sayfaya sonraki eklenme sirasi su olmali:

### 1. Next Step karti
En yakin ek katman bu olmali.
Neden:
- mevcut sayfanin asil sorusuyla uyumlu
- hafif
- operatoru dogrudan aksiyona tasir

### 2. Activity timeline
Audit, teklif, teslimat, not ve karar hareketlerini zamansal akista toplar.
Neden ikinci sira:
- business detail icin dogal derinlesme burada
- ama veri kontrati netlesmeden once acilmamali

### 3. Ic not
Operator notu business detail'da mantikli, ama timeline ile iliskisi dusunulmeden acilmamali.

### 4. Task
En son acilmasi daha dogru.
Cunku task acildiginda durum, owner, due date ve filtre ihtiyaci buyur.

## Sayfa davranis kurallari
- sayfada tek ana soru korunur: `bu isletmede simdi ne durumda ve sonraki mantikli hareket ne?`
- form yogunlugu yukselirse ana yuzey bozulur
- uzun serbest metinler kartlarin tamamini ele gecirmemeli
- alt kayitlar ana ekrandan daha baskin olmamali
- Project OS ile Business Detail ayni isi yapan iki ayri ekran haline gelmemeli

## Tasarim dili
- mevcut admin kart dili korunur
- discovery detail iskeleti yeniden kullanilir
- bilgi onceligi yukaridan asagi azalir
- ust bolum karar ve yon bulma, alt bolum referans ve gecmis olur

## V1 done tanimi
Bu sayfa V1 icin ancak su durumda tamam sayilir:
- route kanonik ve okunur calisiyor
- Project OS'tan detail'e gecis net
- operator tek bakista business'in kim oldugunu ve hangi asamada oldugunu anliyor
- son teklif ve teslimat resmi gorunuyor
- alt kayitlar referans icin acik
- sayfa henuz not/task/form duvarina donusmemis

## Sonraki somut uygulama adimi
Bu plan sonrasi en mantikli UI adimi:
- `Next Step` kartini business detail'a eklemek

Bundan sonra:
- activity timeline
- ic not
- task
