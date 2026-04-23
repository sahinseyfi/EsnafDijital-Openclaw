# Project OS Sayfasi

## Amac
Project OS, EsnafDigital panelindeki ana operasyon ekranidir.
Bu sayfanin amaci sadece veri listelemek degil, `audit -> teklif -> teslimat -> bakim` hattinda hangi kaydin simdi hareket etmesi gerektigini gostermektir.

Bugunku haliyle sayfa iki isi ayni anda yapar:
- operasyonu yukaridan gorunur kilar
- gerektiğinde yeni kayit acma ve mevcut kaydi ilerletme aksiyonunu verir

## Bu sayfa ne degildir?
- sadece ham tablo sayfasi degil
- sadece form ekrani degil
- sadece rapor paneli degil

Project OS, kayit + aksiyon + durum gorme ekranidir.

## Kim icin?
- kurucu
- operator
- teklif ve teslimat arasinda kaydi takip eden kisi

Yani bu ekran, “bu isletmede simdi ne olmali?” sorusuna cevap verir.

## Sayfanin ana bolumleri

### 1. Durum guncellendi karti
Bir kayit status ilerletme aksiyonuyla guncellendiyse, sayfanin ustunde yesil bir geri bildirim karti gorunur.
Amaci sudur:
- hangi business'in az once guncellendigini gostermek
- operatoru kaybolmadan ayni kayit uzerinde tutmak

### 2. Hero alani
Sayfanin ust mesajidir.
Project OS'un neden var oldugunu anlatir:
- gunun sicak islerini gostermek
- form duvarina donusmemek
- aktif zinciri gorunur kilmak

### 3. Ozet istatistik kartlari
Bu bolum anlik operasyon yogunlugunu gosterir.
Kartlarda su sayilar gorunur:
- audit acilmamis isletme
- audit asamasindaki aktif is
- teklif asamasindaki aktif is
- teslimattaki aktif is
- bakimdaki kayit
- blocked consultation sinyali

Amac raporlama degil, bugun hangi tarafta yigilma oldugunu hemen fark ettirmektir.

### 4. Siradaki isler kuyrugu
Sayfanin en kritik bolumlerinden biridir.
Her kayit kartinda su bilgi verilir:
- business adi
- segment ve ilce
- mevcut asama
- durum etiketi
- siradaki adim
- kisa ozet

Buradaki kartlar operatore “sonra bakarim” dedirtmemeli.
Ilk bakista aksiyon cagirir.

### 5. Hizli aksiyonlar
Bu alan sayfanin ana akisindan kopmadan yeni kayit acmak icindir.
Burada:
- yeni isletme
- audit
- teklif
- teslimat
- consultation
- context
aksiyonlari gorunur tutulur.

Formlar surekli acik kalmaz.
Bunun nedeni sayfayi form duvarina cevirmemektir.

### 6. Dar form alani
Acilir/kapanir form alani icinde su formlar vardir:
- BusinessCreateForm
- AuditCreateForm
- OfferCreateForm
- DeliveryProjectCreateForm

Bu formlar ana operasyon ekraninin yerini almaz.
Sadece gerektiğinde yeni kayit acmak icin kullanilir.

### 7. Asama bazli gorunum
Ayni kayitlar stage'e gore de ayrica gosterilir:
- intake
- audit
- offer
- delivery
- maintenance

Boylece operator hem genel kuyrugu gorur hem de spesifik asamada birikme var mi anlar.

### 8. Secili kayit alani
URL uzerinden `businessId` geldiyse ilgili isletme ustte secili kart olarak gosterilir.
Bu, discovery import veya status guncelleme sonrasi kullaniciyi dogru kayit uzerinde tutmak icin vardir.

### 9. Ham tablo kayitlari
Sayfanin altinda acilir/kapanir sekilde detay tablolar tutulur:
- Isletmeler
- Audit hatti
- Teklifler
- Teslimatlar

Bu tablolar ana odak degil, referans ve kontrol alanidir.
Ana ekranin ust tarafi aksiyon odakli kalir.

## Teklif bolumu nasil okunur?
Teklifler tablosunda sadece paket adi degil, operasyonel detay da gorunur:
- secili paket
- paket aciklamasi
- domain tercihi
- secili opsiyonel ekler
- tutar
- durum

Bu yapi, teklifin sadece fiyat satiri degil, ileride delivery kapsamını etkileyen operasyon girdisi olarak tutuldugunu gosterir.

## Teslimat bolumu nasil calisir?
Delivery create formu, secili business'in son teklifini okuyup otomatik bir scope taslagi onerir.
Bu taslak bugun asagidaki mantikla olusur:
- cekirdek teslimler
- domain ve yayin plani
- gerekli assetler
- gerekli erisimler
- opsiyonel ekler
- kickoff sonrasi operasyon adimlari
- yayin oncesi kontrol

Yani delivery kaydi bos bir textarea olarak baslamaz.
Tekliften gelen operasyon iskeletiyle baslar.

## Project OS'un veri kaynaklari
Sayfa su ana veri setlerini kullanir:
- `businesses`
- `audits`
- `offers`
- `delivery_projects`
- consultation center blocked sinyali

Bu veriler `getProjectOsDataset()` ve turetilmis overview mantigi ile okunur.

## Sayfanin temel calisma prensibi
Project OS'un bugunku tasarim mantigi sudur:
1. once aktif isi gor
2. sonra siradaki adimi anla
3. gerekirse tek hareketle status ilerlet
4. gerekirse dar form alaniyla yeni kayit ac
5. detay tabloya ancak gerektiğinde in

## Su anki urun yonu icindeki yeri
Project OS ilk cizgide sade operasyon merkeziydi.
Mevcut yon kararindan sonra panel daha genis bir operasyonel CRM yonune acik hale geldi.
Buna ragmen Project OS hala cekirdek akis ekrani olarak onemini korur.

Yani ileride:
- business detail
- activity timeline
- next step
- task
- ic notlar

ayri yuzeylere acilsa bile, Project OS gunluk operasyonun ana kontrol paneli olarak kalir.

## Ne zaman yetersiz kalir?
Asagidaki durumda Project OS tek basina yetmemeye baslar:
- bir business icin daha derin zaman cizgisi gerekiyorsa
- notlar ve gorusme kayitlari artisiyorsa
- gorev atama / takip ihtiyaci doguyorsa
- ayni kayit uzerinde daha ayrintili operator calismasi gerekiyorsa

Bu durumda cozum Project OS'u bozmak degil, onu destekleyen detail yuzeyleri acmaktir.

## Kisa ozet
Project OS, EsnafDigital panelinin gunluk operasyon merkezi ve ana akis ekranidir.
Ustte aksiyon ve oncelik gorunur, altta tam kayitlar kontrol edilir.
Formlar vardir ama sayfayi ele gecirmez.
Tablolar vardir ama ana odak olmaz.
Sayfanin esas gorevi sudur: hangi business, hangi asamada, simdi ne hareket etmeli?

## Business Detail ile sinir
- `Project OS` = coklu business arasinda kuyruk ve sicak is onceligi
- `Business Detail` = tek isletmede canonical / external / derived resmi okuyup karar verme
- `Project OS`, tek isletme karar duvarina donmez
- `Business Detail`, Project OS'un ikinci kuyruk ekrani olmaz
