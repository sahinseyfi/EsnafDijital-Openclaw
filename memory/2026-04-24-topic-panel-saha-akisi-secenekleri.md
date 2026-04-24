# 2026-04-24 Topic - panel ve saha akisi secenekleri

## Neden acildi
Kurucu, tek bir yone erken kilitlenmeden su hattin tum mantikli seceneklerinin arastirilmasini istedi:
- admin paneline girince isletme nasil bulunur ve secilir
- isletme arastirmasi nasil yapilir
- arastirma sonucu hangi isletmeye gidilecegi nasil belirlenir
- ziyaret hazirligi nasil yapilir
- sahada ne soylenir
- paketler nasil sunulur ve teslim edilir
- isletme bilgileri nasil toplanir
- sisteme nasil girilir
- girilen bilgiler nasil sonuca donusur

Bu not karar dosyasi degil, secenek evrenini ve ilk daraltmayi tutar.

## Mevcut repo sinyalleri
Kod ve referanslar su cizgiyi isaret ediyor:
- `discovery` sayfasi ham veriyi direkt business kaydina yazmayan, on eleme tablosu mantiginda
- `businesses` sayfasi sade liste + filtre + siradaki adim mantiginda
- `business detail` tek kayit karar yuzeyi olarak dusunulmus
- `tarama` alt sayfasi hafif / ajan / derin tarama ciktilarini ayri tutuyor
- `Project OS` hala gunluk sicak is ve stage kuyrugu merkezi

Ilk gozlem:
- sistem zaten tek ekranli tam CRM gibi degil
- ama sadece dar audit paneli de degil
- en guclu mevcut isaret: `kesif listesi + isletme detayi + sicak is kuyrugu` ucgeni

## 10 mantikli model

### 1) Kesif once, isletme sonra
Akis:
- admin -> Kesif
- adaylari filtrele
- kisa liste yap
- sonra business kaydina aktar
- detay ve audit hazirligi business tarafinda ilerler

Artisi:
- ham veri kirini business tablosuna tasimaz
- saha oncesi daha temiz secim verir

Eksisi:
- ayni kayit iki yerde yasiyor hissi dogurabilir
- hizli saha gunlerinde ekstra adim gibi hissedilebilir

Test sorusu:
- kurucu gercekten once eleme yapmak ister mi, yoksa buldugu adayi aninda sahiplenmek ister mi?

### 2) Adayi gorur gormez business kaydi ac
Akis:
- admin -> Isletmeler
- her aday aninda business olur
- arastirma, not ve asama ayni kayitta akar

Artisi:
- her sey tek yerde toplanir
- saha operatore daha dogal gelebilir

Eksisi:
- cop kayit riski yuksek
- kotu adaylar business havuzunu sisirir

Test sorusu:
- ilk fazda temiz havuz mu daha degerli, hizli sahiplenme mi?

### 3) Project OS once, tum isi sicak kuyruktan yonet
Akis:
- admin -> Project OS
- bugun hareket edecek kayit secilir
- gerekirse buradan business detail veya discovery acilir

Artisi:
- gunluk operasyon odagini korur
- dagilmadan bugunun isini one cikarir

Eksisi:
- yeni aday bulma ve arastirma icin tek basina yeterli degil
- saha oncesi derin kararlar icin yuzey eksik kalir

Test sorusu:
- kurucu gunlukte once is mi gormek ister, havuz mu gormek ister?

### 4) Business Detail karar merkezi
Akis:
- aday hangi yoldan gelirse gelsin, asil karar noktasi business detail olur
- sonraki adim, audit ozeti, tarama, teklif ve notlar burada okunur

Artisi:
- tek kayit icin hizli karar zemini verir
- sahaya gitmeden once okunacak ana sayfa olabilir

Eksisi:
- fazla yuk bindirilirse mini CRM duvarina doner
- liste secimi icin tek basina yeterli degil

Test sorusu:
- bu sayfa 30-60 saniyede karar verdiriyor mu?

### 5) Arastirma dosyasi once, isletme sonra
Akis:
- her aday icin once audit/research dosyasi cikar
- sadece yeterince iyi aday business olur

Artisi:
- secim kalitesini artirir
- saha oncesi dusunme zorlar

Eksisi:
- operasyonu yavaslatir
- dosya uretimi fazla olursa gereksiz agirlik yaratir

Test sorusu:
- arastirma ciktisi saha kazancina gore fazla pahali mi?

### 6) Ziyaret hazirlik panosu ayri yuzey
Akis:
- uygun adaylar `ziyaret hazir` kovasina duser
- gitmeden once konusma notu, hedef paket, muhtemel itiraz, alinacak bilgiler hazirlanir

Artisi:
- saha gunu icin cok pratik
- “hangi isletmeye gideyim” sorusunu netlestirir

Eksisi:
- erken acilirsa yeni bir pano daha dogurur
- ayni bilgiyi business detail ile cift yazma riski var

Test sorusu:
- ziyaret hazirlik ihtiyaci business detail icinde cozulur mu, ayri pano gerekir mi?

### 7) Saha gorusmesi script-first model
Akis:
- sistem her uygun kayit icin kisa konusma cercevesi uretir
- operator sahada standart bir giris ve teklif dili kullanir

Artisi:
- kurucunun saha dilini standartlastirir
- tecrubesiz gunde bile kaliteyi korur

Eksisi:
- fazla sabitlenirse yapay kalir
- segment farklarini yeterince tasimayabilir

Test sorusu:
- sabit script yerine moduler konusma kartlari daha mi iyi?

### 8) Teklif once dusunen model
Akis:
- arastirma ciktisi direkt paket yonune baglanir
- ziyaretin amaci teklif kapatmak olur

Artisi:
- satis odagini netlestirir
- audit -> teklif zincirini kisaltir

Eksisi:
- erken teklif baskisi yaratir
- iliski ve bilgi toplama adimini zayiflatabilir

Test sorusu:
- ilk temas amaci teklif mi, audit randevusu mu, guven girisi mi olmali?

### 9) Bilgi toplama ve teslimat formu once
Akis:
- is kapandiginda asset, erisim, sahip bilgisi ve yayin ihtiyaci standardize formla toplanir
- teslim sureci buradan akar

Artisi:
- satis sonrasi kaosu azaltir
- teslimatta eksik evrak / erisim sorununu azaltir

Eksisi:
- satis oncesi akisi dogrudan cozmuyor
- erken dusunulurse on tarafi golgeler

Test sorusu:
- teslimat bilgi formu bagimsiz yuzey mi olmali, yoksa delivery kickoff icinde mi kalmali?

### 10) Hibrit model: Kesif + Business Detail + Project OS + Ziyaret Hazirlik
Akis:
- Kesif = aday havuzu ve eleme
- Businesses = sahiplenilen gercek kayit havuzu
- Business Detail = tek kayit karar merkezi
- Project OS = bugunun sicak operasyonu
- Ziyaret Hazirlik = sadece saha gunu yakin kayitlar icin hafif gorunum

Artisi:
- her yuzeye tek rol verir
- sistem zaten buna yakin sinyal veriyor

Eksisi:
- yuzey sayisi artar
- rol ayrimi iyi yazilmazsa kafa karistirir

Test sorusu:
- dorduncu bir yuzey gercekten gerekli mi, yoksa `ziyaret hazirlik` sadece Business Detail modu mu olmali?

## Ilk daraltma - 5 finalist
Asagidaki 5 model su an en mantikli finalist gibi gorunuyor.
Bu final karar degil, ilk kesim.

### Finalist A - Kesif once, sonra business detail
Omurga:
- Discovery aday eleme
- uygun aday business olur
- karar business detailde verilir

Neden guclu:
- mevcut repo ile uyumlu
- cop kayit riskini azaltir
- saha oncesi secimi daha kontrollu yapar

Zayifligi:
- hizli saha modunda ekstra adim hissi verebilir

### Finalist B - Business detail karar merkezi + Project OS gunluk operasyon
Omurga:
- liste veya kesiften gir
- tek kayit karari detailde ver
- gunluk onceligi Project OS'ta yonet

Neden guclu:
- tek kayit ve coklu kayit rollerini ayiriyor
- CRM savrulmadan operasyonu buyutuyor

Zayifligi:
- yeni aday bulma tarafi hala discovery kalitesine bagli

### Finalist C - Hibrit model
Omurga:
- Discovery
- Businesses
- Business Detail
- Project OS
- hafif ziyaret hazirlik modu

Neden guclu:
- kullanicinin sordugu sorularin hemen hepsine bir ev adresi veriyor
- admin paneline girince neye bakacagini rol bazli netlestiriyor

Zayifligi:
- yuzeyler arasi sinir iyi cizilmezse karisir

### Finalist D - Ziyaret hazirlik odakli saha modeli
Omurga:
- secilen adaylar saha hazirlik listesine duser
- hedef, konusma plani, alinacak bilgi listesi ve beklenen paket buradan yonetilir

Neden guclu:
- “hangi isletmeye gidecegim, ne soyleyecegim” sorusuna direkt vurur
- saha kullanimina cok uygun olabilir

Zayifligi:
- erken acilirsa paneli gereksiz buyutebilir
- once ana omurga oturmadan ikincil pano gibi kalabilir

### Finalist E - Audit dosyasi / teklif bagli model
Omurga:
- arastirma ciktilari audit ozetine doner
- audit, paket ve teklif kararina daha dogrudan baglanir

Neden guclu:
- saha konusmasini paketlere baglar
- “girilen bilgi nasil sonuca donusur” sorusuna dogrudan cevap verir

Zayifligi:
- kesif ve ziyaret secimi tarafinda tek basina yetmez
- fazla belge uretirse agirlasir

## Simdilik elenen ama tamamen kapanmayan modeller
- `2) Her aday aninda business olsun`: ilk fazda cop kayit riski fazla
- `5) Arastirma dosyasi once`: saha hizi icin agir
- `7) Script-first`: tek basina model degil, destek katmani olmaya daha uygun
- `8) Teklif once`: ilk temasin dogalligini zayiflatabilir
- `9) Teslimat formu once`: on tarafin ana isini cozmuyor

## Kritik acik sorular
1. Kullanici admin paneline girdiginde ilk bakacagi ekran hangisi olmali?
   - Kesif
   - Project OS
   - Isletmeler

2. `Hangi isletmeye gideyim?` sorusu skorlu shortlist ile mi, manuel secimle mi, yoksa ziyaret hazir kovasiyla mi cozulmeli?

3. `Sahada ne soylenir?` konusu sayfa mimarisi sorunu mu, yoksa segment bazli konusma kartlari sorunu mu?

4. Bilgi toplama satis oncesi ve satis sonrasi diye ikiye mi ayrilmali?
   - saha notlari / muhatap / ihtiyac / itiraz
   - teslim assetleri / erisimler / yayin bilgisi

5. Business Detail icindeki tarama paneli yeterli mi, yoksa ziyaret hazirlik kartlarini da tasimali mi?

## Repo gercekligi ile ikinci okuma
Ilk finalistleri mevcut kod ve veri modeliyle tekrar test ettigimde su zayifliklar net gorundu:

### 1) Discovery import su an cok hizli ama fazla yalniz
`/api/discovery/import` bugun sunlari yapiyor:
- business acar
- ownerName alanini `Kesif adayi` olarak yazar
- otomatik bir audit acar
- audit ozetini telefon / website / yorum / skor uzerinden doldurur

Bu iyi cunku:
- discovery -> business zinciri gercekten calisiyor
- finalist A ve C kagit ustunde degil, kod tabaninda baslangici var

Ama zayif cunku:
- muhatap bilgisi gercek kisi degil, placeholder
- neden ziyaret edilmeli karari ayrica uretilmiyor
- saha icin `randevu / son gorusme / ulasilamadi / geri donulecek` gibi durumlar henuz yok

Yorum:
- `Kesif once sonra business detail` modeli repo ile uyumlu, ama saha takibine gecince yalniz kalir.

### 2) Business Detail bilgi zengini, ama ziyaret hazirlik nesnesi yok
Business Detail su an:
- temel kimlik
- maps / website / instagram
- hafif / ajan / derin tarama
- Y.Z raporu ve prompt gecisi
icin guclu bir merkez gibi duruyor.

Ama henuz su alanlar acik degil:
- gidilecek mi gitmeyecek mi karari
- ziyaret hedefi
- ilk cumle / konusma acilisi
- alinacak bilgi checklist'i
- gorusme sonucu kaydi

Yorum:
- finalist B ve C icin Business Detail karar merkezi olabilir
- ama ziyaret hazirlik ihtiyaci sadece mevcut bloklarla tam cozulmuyor
- burada ya hafif bir `ziyaret karti` acilmali ya da ayri pano dusunulmeli

### 3) Project OS bugunun sicak isini gosteriyor, ama saha secimini gostermez
`deriveProjectOsOverview()` mantigi su anda sunu iyi yapiyor:
- audit acilmamis kaydi gosterir
- teklifi bekleyen isi one cikarir
- teslimati sicak tutar

Ama su soruya dogrudan cevap vermez:
- bugun fiziksel olarak hangi isletmeye gitmeliyim?

Cunku siralama bugun:
- stage durumuna gore
- durum rank'ine gore
- alfabetik isletme adina gore
calisiyor.

Mesafe, saha bolgesi, ziyaret hazirligi, son temas zamani gibi sinyaller yok.

Yorum:
- finalist B tek basina saha secim problemi cozmuyor
- finalist D veya finalist C icindeki `ziyaret hazirlik modu` bu bosluga daha dogrudan vuruyor

### 4) Veri modeli audit -> teklif -> teslimat zincirinde cok sade
Prisma tarafinda cekirdek tablolar su an:
- `Business`
- `Audit`
- `Offer`
- `DeliveryProject`

Bu sadelik avantaj cunku:
- genel CRM savrulmasi yok
- operasyon zinciri temiz

Ama eksik cunku henuz ayri nesne yok:
- contact / muhatap
- activity / gorusme gecmisi
- visit prep
- next step
- task
- bilgi toplama formu
- teslim asset ve erisimlerin yapili alanlari

Yorum:
- finalist E veri zinciri tarafinda mantikli, ama bugun metin agirlikli kaliyor
- teslimat ve saha bilgi toplama ayrismasi henuz veri modelinde temsil edilmiyor

### 5) Home page / ic operasyon merkezi bugun liste secici degil, yon gosterici
Ana sayfa bugun daha cok su isi yapiyor:
- aktif oda giosterir
- audit/teklif/teslim badge'lerini verir
- seni ilgili yuzeye yollar

Yani su degil:
- detayli bugun-rota planlayici
- saha gezisi secici
- gunluk gorusme merkezi

Yorum:
- hibrit modelde home page ana karar duvari olmamali
- sadece yon verip ilgili yuzeye gondermesi daha dogru

## 5 finalistin alt varyasyonlari

### Finalist A - Kesif once, sonra business detail
#### A1) Skor-first varyasyon
- discovery skor ve bucket temel secim olur
- operator kisa listeye alir, sonra aktarir

Artisi:
- hizli
- veriye yaslanir

Eksisi:
- skor iyi ama sahada anlamsiz adaylari fazla one cikarabilir
- yorum/website agirliklari saha onceligiyle ayni sey degil

#### A2) Manuel sahiplenme varyasyonu
- operator adayi elle kisa listeye alip aktarir
- skor sadece yardimci sinyal olur

Artisi:
- saha sezgisini korur

Eksisi:
- tekrar edilebilirlik duser
- bir sure sonra kisi hafizasina baglanir

#### A3) Karma varyasyon
- skor ilk havuzu daraltir
- operator elle secer
- aktarilan kayit business detaile gider

Not:
- su anki kod tabani A3'e en yakin duruyor

### Finalist B - Business detail karar merkezi + Project OS
#### B1) Detail merkez, Project OS sadece sicak kuyruk
- tek kayit karari detailde
- toplu oncelik Project OS'ta

Guclu taraf:
- rol ayrimi temiz

Zayif taraf:
- saha secimi icin ucuncu sinyal eksik

#### B2) Detail icinde `ziyarete uygunluk` karti
- detail sayfasina git / beklet / uzaktan ilerlet karti eklenir
- Project OS ayni kalir

Guclu taraf:
- yeni sayfa acmadan saha karari cozulur

Zayif taraf:
- detail ekranina asiri gorev yuklenebilir

#### B3) Project OS'a `ziyaret adayi` filtresi ekle
- ayri sayfa acmadan kuyrukta saha adaylari ayrilir

Guclu taraf:
- tek gunluk operasyon ekrani korunur

Zayif taraf:
- Project OS yavas yavas ikinci discovery gibi sisebilir

### Finalist C - Hibrit model
#### C1) Dort sabit yuzey
- home
- discovery
- businesses/detail
- prompt uretimi
- ziyaret hazirlik sadece detail modu

Guclu taraf:
- yuzey sayisi kontrollu kalir

Zayif taraf:
- saha hazirlik ihtiyaci guclenirse detail kalabaliklasir

#### C2) Bes yuzeyli model
- discovery
- businesses
- detail
- Project OS
- ayri ziyaret hazirlik

Guclu taraf:
- her soruya net ev adresi verir

Zayif taraf:
- MVP icin erken olabilir
- navigasyon yuku artar

#### C3) Gorev-temelli gecis modeli
- kullanici ana sayfada `aday bul`, `bugun git`, `teklif kapat`, `teslim baslat` gibi gorev secerek ilgili yuzeye gider

Guclu taraf:
- kurucunun ekrani degil isi dusunmesine yardim eder

Zayif taraf:
- altyapida yine ayni yuzeyler lazim, sadece ust yonlendirme katmani eklenir

### Finalist D - Ziyaret hazirlik odakli saha modeli
#### D1) Ayri ziyaret panosu
- sadece gidilecek isletmeleri listeler
- rota, hedef, konusma notu ve alinacak bilgi maddeleri vardir

Guclu taraf:
- saha gunu icin cok guclu

Zayif taraf:
- bugun veri modeli bunu tasimiyor
- ayri nesne veya en azindan ayri durum karti gerekir

#### D2) Business detail icinde ziyaret modu
- ayri sayfa yok
- tek isletmede `ziyarete hazirla` modu acilir

Guclu taraf:
- MVP'ye daha yakin

Zayif taraf:
- bugun gitmek istedigim tum adaylari toplu gormek zorlasir

#### D3) Discovery shortlist uzerinden saha secimi
- saha gunu once discovery shortlist'e bakilir
- sonra aktarim ve detail acilir

Guclu taraf:
- yeni yuzey gerektirmez

Zayif taraf:
- aktarilmamis ama gidilecek adaylar ile aktarilmis adaylar karisir

### Finalist E - Audit dosyasi / teklif bagli model
#### E1) Audit ozet-first
- girilen her arastirma audit summary ve readiness'i guclendirir
- sonraki adim auditten teklife doner

Guclu taraf:
- mevcut veri modeliyle uyumlu

Zayif taraf:
- saha gorusme kaydi audit ozetine gomulurse ayristirma kaybolur

#### E2) Audit + saha notu ayrimi
- audit dijital gorunum icin kalir
- gorusme notu ayri hafif katman olur

Guclu taraf:
- `dijital eksik` ile `insan gorusmesi` karismaz

Zayif taraf:
- yeni hafif veri katmani gerekir

#### E3) Audit -> teklif otomasyon yonu
- audit cikisinda sistem paket onerisi ve sonraki adim onerir

Guclu taraf:
- girilen bilgi nasil sonuca donusur sorusuna net cevap verir

Zayif taraf:
- audit kalitesi zayifsa yanlis yonlendirme hizi artar

## Bu wake sonrasi guclenen kanaat
Su an tek secenegi dayatmiyorum, ama repo gercekligiyle en uyumlu cizgi giderek sunu isaret ediyor:
- `Discovery` tamamen atilacak bir gecis ekran degil, gercek degeri var
- `Business Detail` tek kayit karar merkezi olmaya en yakin yuzey
- `Project OS` gunluk sicak operasyon icin yararli ama saha secim motoru degil
- saha icin ayrica en azindan hafif bir `ziyaret hazirlik katmani` gerekecek gibi duruyor

Bu da finalistleri kendi icinde su siraya yaklastiriyor:
1. C - Hibrit ama kontrollu
2. B - Detail + Project OS
3. A - Discovery -> Detail
4. D - Ziyaret hazirlik odakli model
5. E - Audit / teklif bagli model

Bu hala nihai karar degil.
Cunku su iki kritik soru henuz acik:
- `ziyaret hazirlik` ayri yuzey mi olmali, detail modu mu?
- `sahada ne soylenir` veri modeli sorunu mu, yoksa sadece rehber karti sorunu mu?

## Ucuncu okuma - saha konusmasi, bilgi toplama ve teslima donusme
Playbook + segment + teklif omurgasini birlikte okuyunca su netlesiyor:
- saha konusmasi paket satma cumlesiyle degil, `audit ile sorunu gorunur kilma` mantigiyla baslamali
- paket sunumu segment bazli farklasa da paket omurgasi ayni kalmali
- teslim bilgisi satis oncesi ihtiyac notlariyla ayni sepette tutulursa karisir

### 1) `Sahada ne soylenir` icin 3 model

#### S1) Sabit tek script
Ornek mantik:
- kendini tanit
- dijital gorunurluk sorunu anlat
- paketi soyle
- kapat

Artisi:
- cok hizli
- yeni operator icin kolay

Eksisi:
- yapaylasir
- segment farklarini ve isletme gercegini iyi tasimaz
- audit mantigini kisa yoldan atlayabilir

#### S2) Segment bazli scriptler
- berber icin bulunurluk / yorum / saat netligi
- guzellik icin gorsel guven / yorum / hizmet anlatimi
- kafe icin menu / fotograf / konum / yorum

Artisi:
- saha dili daha gercekci olur
- OFFERS ve SEGMENTS cizgisiyle uyumlu

Eksisi:
- yine fazla ezber olabilir
- ayni segment icindeki isletme farklarini tasimaz

#### S3) Audit-first moduler konusma kartlari
Mantik:
- giris cumlesi
- gozlenen problem
- bunun isletmeye etkisi
- uygun sonraki adim
- gerekirse uygun paket yonu

Kartlar segment ve audit sinyaline gore degisir.
Ornek:
- `telefon / saat karisik`
- `website yok`
- `yorum guveni zayif`
- `Instagram bos`

Artisi:
- sahada daha dogal
- tek script yerine duruma gore konusma verir
- audit -> teklif zinciriyle daha uyumlu

Eksisi:
- veri kalitesi dusukse kart zayif olur
- ekranda yalnizca metin degil secilebilir karar kartlari gerekir

Ara yorum:
- su an en guclu cizgi S3
- S2 bunun destekleyici katmani olabilir
- S1 tek basina zayif kaliyor

### 2) `Isletme bilgileri nasil toplanir` icin 3 model

#### B1) Tek bir buyuk form
Ayni formda:
- muhatap
- ihtiyac
- itiraz
- paket ilgisi
- assetler
- erisimler
- domain
- yayin notu

Artisi:
- tek yerde her sey

Eksisi:
- sahada agir
- satis oncesi ve teslim sonrasi isleri karistirir
- CRM form duvari riskini artirir

#### B2) Iki katmanli model
Katman 1, gorusme / ziyaret notu:
- muhatap kim
- telefon / WhatsApp
- ilgi seviyesi
- ana ihtiyac
- itiraz / cekince
- sonraki adim

Katman 2, kickoff / teslim bilgisi:
- logo / fotograf / menu / hizmet listesi
- domain tercihi
- erisimler
- yayin onayi
- eksik asset listesi

Artisi:
- satis oncesi ile teslim sonrasi ayrilir
- saha kullanimi daha mantikli
- delivery scope ile daha temiz baglanir

Eksisi:
- ikinci katman icin acik trigger gerekir
- veri modeli bugun bunu ayri nesnelerle tasimiyor

#### B3) Metin-first sonra yapilandirma
- ilk gorusme serbest notla alinır
- sonra sistem bunu audit / teklif / teslim alanlarina dagitir

Artisi:
- hizli yakalama saglar
- ilk gunlerde esnek olur

Eksisi:
- standardizasyon dusuk kalir
- operator ayni seyi farkli yazar, karsilastirma zorlasir

Ara yorum:
- ilk faz icin B2 en mantikli gorunuyor
- ama uygulama sirasi su olabilir: once hafif B3, sonra B2'ye gecis
- burada once tam veri modeli degil, iki ayri operator kutusu bile ilerleme saglayabilir

### 3) `Girilen bilgiler nasil sonuca donusur` icin zincir sorunu
Mevcut cizgi su:
- discovery import -> business + audit
- audit -> offer
- offer -> delivery

Ama arada eksik halkalar var:
- ziyaret yapildi mi?
- uzaktan mi ilerliyor?
- audit sonrasi neden Paket 1 yerine Paket 2 secildi?
- tekliften delivery kickoff'a hangi eksik bilgi tasindi?

Burada 3 alt model var:

#### Z1) Tam operator karari, sistem sadece kaydeder
Artisi:
- basit

Eksisi:
- neden bu karar alindi izi zayif kalir

#### Z2) Sistem paket ve sonraki adim onerir, operator onaylar
Artisi:
- audit -> teklif bagi gorunur olur
- kullanicinin `sonuclama` sorusuna net cevap verir

Eksisi:
- onerinin kalitesi audit kalitesine bagli

#### Z3) Kural tabanli kapilar
Ornek:
- website yok + maps zayif + telefon var => Paket 1 veya 2 arasi bak
- yorum / QR ihtiyaci bariz => Paket 2 yonu
- Instagram zayif + fiziksel yorum akisi ihtiyaci => Paket 3 yonu

Artisi:
- paket onerisini aciklasinir yapar

Eksisi:
- fazla erken sertlestirilirse gercegi fazla duzlestirir

Ara yorum:
- en mantikli ilk cizgi `Z2 + hafif Z3`
- yani sistem acik gerekceli yon onersin, operator son karari versin

### 4) `Paketler nasil sunulur ve teslim edilir` sorusunda yeni ayrim
Teklif omurgasi sunu gosteriyor:
- saha gorusmesinde her paketi anlatmak gerekmiyor
- once sorun ve uygun yon anlatilmali
- paketler `temel / plus / guclu kimlik` olarak secimlestirilmeli

Bu da saha sunumunda 3 stil doguruyor:

#### P1) Tum paketleri acikca masaya koy
Eksisi:
- erken karmasa yaratir

#### P2) Tek onerilen paket + bir ust alternatif
Artisi:
- karar kolaylasir
- sahada daha net

Eksisi:
- bazen fazla yonlendirici hissedilebilir

#### P3) Once audit sonucu, sonra paket ac
Mantik:
- sizde su 2-3 eksik var
- bunun icin en mantikli baslangic bu
- isterseniz bir ust seviye de su farki getirir

Artisi:
- OFFERS cizgisiyle en uyumlu model bu
- paket pazarlama listesi gibi degil, sonuc yolu gibi anlatilir

Ara yorum:
- P3 en guclu model
- P2 sahada pratik destek modeli olarak kullanilabilir

### 5) Teslimata geciste eksik halka
Playbook teslimatta `asset ve not topla` diyor.
Ama bugun veri modeli ve ekran gercekligi su acikligi birakiyor:
- hangi asset eksik
- kimden beklenecek
- domain / erisim / yayin onayi geldi mi

Bu da delivery kickoff icin 3 secenek doguruyor:

#### T1) Tek `scope` metni ile devam
Artisi:
- sade
- bugunku yapiyla uyumlu

Eksisi:
- eksik asset takibi zor
- teslim gecikme nedeni gorunmez kalir

#### T2) `scope` + hafif checklist satirlari
- assetler
- erisimler
- yayin onayi
- bekleyenler

Artisi:
- text-first cizgiyi cok bozmadan takip kalitesi artar

Eksisi:
- yeni yari-yapili format standardi gerekir

#### T3) Tam yapili teslim formu
Artisi:
- en izlenebilir model

Eksisi:
- MVP icin agir
- erken CRM hissi uretir

Ara yorum:
- simdilik T2 en dengeli gorunuyor
- T1 tek basina saha ve teslim kopusunu buyutebilir
- T3 icin erken

## Bu wake sonrasi guncellenen kanaat
Finalistleri etkileyen yeni sinyal su:
- `sahada ne soylenir` konusu ayri bir tam sayfa zorunlulugu degil, once `audit-first moduler konusma kartlari` olarak cozulmeli
- `isletme bilgileri nasil toplanir` sorusunda tek buyuk form yerine `gorusme notu` ve `kickoff bilgisi` ayrimi daha saglikli
- `girilen bilgi nasil sonuca donusur` sorusunda sistemin gerekceli yon onerisi lazim, ama son karar operatorte kalmali
- `teslim` tarafinda tek serbest metin yerine yarim yapili checklist destegi daha dogru olabilir

Bu da finalistleri biraz daha su yone cekiyor:
- C ve B hala onde
- D, ayri sayfa olmak zorunda olmayabilir; once detail icindeki ziyaret karti + konusma karti ile test edilebilir
- E, paket ve sonuc zinciri tarafinda gucleniyor ama tek basina tam model olmuyor

## Dorduncu okuma - hangi isletmeye gidilecegi karari
Discovery ve business discovery kodunu tekrar okuyunca ziyaret secimi konusunda yeni netlik cikti.

### 1) Mevcut `score` ziyaret onceligi skoru degil
Kod gercegi su:
- discovery scoring bugun eksik sinyalleri odullendiriyor
- telefon eksik, website yok, saat bilgisi eksik, yorum yok gibi seyler skoru artiriyor
- kapali gorunme skoru dusuruyor
- yorum ve puan cok gucluyse skor biraz dusuyor

Bu ne demek:
- bugunku `score`, `sahada once buna git` skoru degil
- daha cok `dijital acik / audit firsati` skoru

Risk:
- bu skor tek basina kullanilirsa cok eksik ama sahada verimsiz adaylar gereksiz one cikabilir
- kullanicinin istedigi `hangi isletmeye gideyim` sorusu tam cozulmez

### 2) Discovery tarafinda ziyaret secimi icin kullanilmayan ama var olan sinyaller var
Veri ve kodda su sinyaller zaten var:
- `ownershipStatus`
- `matchedSearchTermCount`
- `hasOpeningHours`
- `isClosed`
- `latitude / longitude`
- `district`
- `reviewsCount / rating`
- `shortlist`
- `imported`
- business refresh history icinde `instagramSignal`

Ama bugun bunlar:
- tablo filtre/siralama yardimi olarak var
- ziyaret rotasi veya saha verim skoru olarak birlestirilmiyor

### 3) `best match` mantigi discovery eslesmesi icin iyi, ziyaret secimi icin yeterli degil
`buildBusinessRefreshEntry()` tarafinda su mantik guclu:
- isim eslesmesi
- kategori uyumu
- ilce uyumu
- search result satirlarini eleme

Bu guzel cunku:
- yanlis isletmeyi secme riskini dusuruyor

Ama sunu cevaplamiyor:
- bu dogru isletme tamam, peki buna fiziksel ziyaret mantikli mi?

Yani iki ayri skor ihtiyaci var gibi duruyor:
1. `dogru eslesme skoru`
2. `ziyaret onceligi skoru`

### 4) `hangi isletmeye gidilecegi` icin 4 model

#### G1) Eksik-sinyal odakli model
Mantik:
- website yok
- yorum zayif
- saat/telefon eksik
- ownership alinmamis
=> once git

Artisi:
- audit firsatini net bulur
- discovery ile uyumlu

Eksisi:
- her dijital acigi olan isletme sahada iyi aday degil
- muhatap bulma kolayligi, lokasyon ve segment onceligi eksik kalir

#### G2) Saha-verim odakli model
Mantik:
- yakin bolgede mi
- segment olarak hizli satisa uygun mu
- kapali degil mi
- acilis saati var mi
- telefon / ulasilabilirlik var mi
- sahiplik alinmamis veya zayif dijital duzen var mi

Artisi:
- fiziksel ziyaret kararina daha yakin

Eksisi:
- salt dijital audit acigini ikinci plana itebilir

#### G3) Karma model: audit firsati + saha verimi
Mantik:
- discovery skorunu koru
- ustune saha verim katsayisi ekle
- manuel oncelik ver

Ornek bilesenler:
- dijital acik
- segment uyumu
- saha mesafesi / ilce yakinligi
- acik gorunme / kapanik olmama
- muhataba ulasma ihtimali
- operatorun manuel `bugun git` isareti

Artisi:
- hem veri hem saha gercegi birlesir
- kullanicinin sordugu soruya en yakin model bu

Eksisi:
- biraz daha fazla mantik gerekir
- tek skora fazla guvenilirse yanlis kesinlik hissi yaratabilir

#### G4) Tam manuel saha secimi
Mantik:
- sistem sadece bilgi gosterir
- kullanici gitmek istedigini secer

Artisi:
- esnek
- MVP icin kolay

Eksisi:
- tekrar edilebilirlik dusuk
- panel karar destegi vermemis olur

Ara yorum:
- bugunku repo gercekligiyle en saglikli cizgi `G3`
- `G4` gecici kacis olabilir ama kalici cevap degil

### 5) Ziyaret secimi icin gerekli en hafif yeni sinyaller
Ayri CRM nesneleri acmadan bile su 5 sinyal cok sey degistirir:
- `ziyaret onceligi`: dusuk / orta / yuksek
- `ziyaret tipi`: fiziksel / uzaktan / beklet
- `son temas`: tarih + kisa sonuc
- `manuel oncelik`: bugun / bu hafta / sonra
- `ziyaret nedeni`: tek secim veya 2-3 maddelik etiket

Ornek ziyaret nedeni seti:
- website yok
- yorum akisi zayif
- profil tutarsiz
- gorsel guven zayif
- sahada daha iyi anlatilacak aday

Bu sinyaller varsa:
- Business Detail icindeki ziyaret karti guclenir
- Project OS veya yeni hafif filtre ile `bugun git` listesi uretilebilir

### 6) Segment etkisi ziyaret seciminde de kullanilmali
`SEGMENTS.md` cizgisi burada bosa gitmemeli:
- berber = hizli satis / hizli teslim potansiyeli
- guzellik = teklif uyumu en guclu
- kafe/restoran = daha firsatli ama bakim yuku yuksek

Bu neye donusebilir:
- ayni dijital eksik skorunda guzellik veya berber saha gunu onde olabilir
- kafe/restoran ayni eksikte daha secici ele alinabilir

Yani ziyaret secimi salt discovery acik skoru olmamali.
Segmentten gelen teslim ve bakim gercegi de etkili olmali.

### 7) En guclu gecici formul
Nihai model degil, ama su an en mantikli gecici cizgi su gorunuyor:

`ziyaret adayi = dijital acik sinyali + segment uyumu + saha verimi + manuel oncelik - kapanik/uygunsuzluk riskleri`

Bu formulun ilk versiyonu su sekilde olabilir:
- discovery skoru yardimci olsun
- `isClosed` negatif agirlik olsun
- `ownershipStatus=unclaimed` pozitif yardimci sinyal olsun
- `hasOpeningHours` ve telefon varligi saha verimi icin arti olsun
- segment agirligi eklensin
- ilce/yakinlik sinyali eklensin
- son kararda operator elle one cekebilsin

### 8) Bu wake sonrasi finalistlere etkisi
Bu yeni okuma finalistleri su sekilde etkiliyor:
- C hala en guclu, cunku discovery + detail + operasyon ayrimini korurken ziyaret secimini yeni hafif katmanla tasiyabilir
- B hala guclu ama tek basina yetersiz, cunku Project OS'ta ziyaret secim skoru yok
- D tamamen dusmuyor; ama ayri pano acmadan once `ziyaret karti + filtre` ile test edilmesi daha mantikli gorunuyor
- A tek basina yetersiz kaliyor, cunku discovery skoru ile fiziksel ziyaret karari ayni sey degil
- E ziyaret secimi sorusunu dogrudan cozmedigi icin biraz geride kaliyor

## Besinci okuma - ziyaret hazirligi ayri sayfa mi, detail modu mu?
Business Detail referansi ile mevcut kodu yanyana okuyunca onemli bir fark cikti.

### 1) Referans belge Business Detail'i daha buyuk dusunuyor, kod ise daha hafif
`REFERENCES/business-detail-v1.md` tarafinda sayfaya su katmanlar dusunulmus:
- next step
- audit snapshot
- hazirlik / tarama
- son teklif
- son teslimat
- timeline
- alt kayitlar

Ama mevcut `app/businesses/[slugAndId]/page.tsx` bugun daha hafif:
- temel isletme karti
- baglanti / link / Instagram ozeti
- kisa ic not
- `BusinessScanPanel`

Yani gercek durum su:
- Business Detail referans dokumandaki kadar dolu degil
- halen yeni 1-2 kart tasiyabilecek kadar boslugu var

Bu cok kritik cunku:
- `ziyaret hazirlik` icin hemen ayri sayfa acmak zorunlu gorunmuyor
- once detail icinde hafif bir kart / mod denenebilir

### 2) Kod tabaninda zaten bir desen var: ana detail + ayri derin detay
Su anki pattern:
- ana detail sayfasi = hizli karar ve ozet
- `/tarama` alt sayfasi = daha derin tarama gecmisi ve ham veri

Bu desenden cikan ders:
- EsnafDigital zaten `ana karar yuzeyi + gerekiyorsa alt detay sayfasi` modelini kullaniyor
- bu, ziyaret hazirligi icin de dogal bir yol sunuyor

Olası kurgu:
- asama 1: Business Detail icinde `ziyaret karti`
- asama 2: ihtiyac buyurse `/ziyaret` veya benzeri alt detay sayfasi

### 3) Ayri sayfa acmak icin bugun yeterli veri yogunlugu yok
Ziyaret hazirlik icin su alanlar henuz yok:
- tekrarli gorusme gecmisi
- rota planlari
- ayni gunde coklu ziyaret listesi
- zengin itiraz bankasi
- toplu saha notlari

Boyle bir durumda ayri sayfa acmanin riski:
- sayfa olur ama ici zayif kalir
- ekran cogaltma riski gerceklesir
- HEARTBEAT ve MEMORY cizgisindeki `teklif netlesmeden ekran cogaltma` riskine yaklasir

### 4) Detail modu icin en hafif kurulum
Business Detail icinde su bloklar tek kartta toplanabilir:
- `ziyarete uygun mu?` (git / uzaktan ilerlet / beklet)
- `ziyaret nedeni`
- `sahada ilk acilis`
- `alinacak bilgi listesi`
- `beklenen sonraki adim`

Bu kart tek kayit sorusunu cevaplar:
- bu isletmeye gidilir mi
- gidilirse neden gidilir
- gidince ne konusulur
- donunce neye baglanir

Bu, sayfanin mevcut rolune uyuyor.
Cunku Business Detail zaten `tek isletme icin sonraki mantikli operator karari` yuzeyi olmaya aday.

### 5) Ayri ziyaret sayfasi hangi kosulda mantikli olur?
Su kosullardan en az biri gerceklesirse:
- ayni gunde 5-10 ziyaretlik toplu plan mantigi dogarsa
- rota / bolge gruplanmasi lazim olursa
- tekrarli gorusme gecmisi buyurse
- gorusme sonucu karsilastirma ve toplu takip ihtiyaci artarsa
- saha calismasi ayri operasyon moduna donerse

Yani ayri sayfa V2/V3 adayi olabilir, ama V1 zorunlulugu gibi durmuyor.

### 6) Iki modelin net karsilastirmasi

#### M1) Business Detail modu olarak ziyaret hazirlik
Artisi:
- mevcut sayfa rolune uyuyor
- yeni navigasyon acmiyor
- veri zayifken bile anlamli
- kullanicinin `tek isletmede simdi ne yapacagim` sorusunu cozer

Eksisi:
- toplu ziyaret gunu icin tek basina yetmeyebilir
- detail sayfasi zamanla sisebilir

#### M2) Ayri ziyaret hazirlik sayfasi
Artisi:
- toplu saha gunu icin daha guclu olabilir
- rota ve karsilastirma mantigi kurmaya uygun

Eksisi:
- bugun erken
- mevcut veri yogunlugu bunu tasimiyor
- yeni sayfa yeni sinir problemi dogurur

### 7) Bu wake sonrasi guclenen kanaat
Bu eksende su an en guclu cizgi:
- once `Business Detail icinde ziyaret hazirlik modu/karti`
- sonra ancak veri ve kullanim yogunlugu artarsa ayri ziyaret sayfasi

Bu, finalistler icinde en cok su varyasyonlari guclendiriyor:
- `B2 Detail icinde ziyarete uygunluk karti`
- `C1/C3 Hibrit ama ziyaret hazirlik detail modu`
- `D2 Business detail icinde ziyaret modu`

Buna karsilik su varyasyonlar biraz zayifliyor:
- `C2 Bes yuzeyli model`
- `D1 Ayri ziyaret panosu`

## Altinci okuma - audit -> teklif -> delivery kickoff zinciri ekranda nasil gorunmeli?
Kod gercegine tekrar bakinca onemli bir eksik netlesiyor:
- veri modeli zinciri var
- servis seviyesinde `createAudit`, `createOffer`, `createDeliveryProject` var
- teklifte `packageName`, `amountTry`, `addonKeys`, `domainPreference`, `customDomain` alanlari var
- delivery tarafinda ise bugun tek ana alan fiilen `scope`

Ama gorunur ekran zinciri zayif cunku:
- ana sayfa sadece yon veriyor
- Business Detail'te son teklif / son teslimat kartlari henuz yok
- create/update akislarinin kullaniciya gorunen belirgin form yuzeyi kodda pek gorunmuyor

Bu ne demek:
- `girilen bilgi nasil sonuca donusur` sorusunun veri cevabi var
- ama ekran cevabi henuz zayif

### 1) Su anki zincirin zayif noktasi
Bugun bir auditten teklife geciste operatorun su sorulara tek bakista cevabi yok:
- auditten hangi gerekceyle bu paket cikti?
- teklifte hangi ekler acildi?
- subdomain mi custom domain mi secildi?
- delivery kickoff'a hangi teslim beklentisi tasindi?

Yani kayitlar var ama aradaki `neden / neye donustu` hikayesi zayif.

### 2) Bu zincir icin 3 ekran modeli

#### K1) Tamamen ayri ekranlar modeli
- audit ekrani ayri
- teklif ekrani ayri
- delivery kickoff ayri

Artisi:
- her asama detayli olur

Eksisi:
- erken donemde fazla ekran uretir
- kullanicinin sordugu temel akisi dagitir
- mevcut repo sadelik cizgisine ters dusmeye daha yakin

#### K2) Business Detail icinde `zincir kartlari`
Tek kayitta su kartlar gorunur:
- audit ozeti
- onerilen paket / teklif karti
- kickoff hazirlik karti

Her kartta:
- mevcut durum
- neden
- primary sonraki aksiyon
- gerekiyorsa detay linki

Artisi:
- kullanicinin `bu bilgi neye donustu` sorusunu tek yerde cozer
- yeni sayfa acmadan zinciri gorunur yapar
- Business Detail rolune uyuyor

Eksisi:
- kartlar kotu tasarlanirsa sayfa yuklenebilir

#### K3) Project OS icinde stage zinciri, Detail icinde neden zinciri
- Project OS = hangi kayit hangi asamada bekliyor
- Business Detail = neden bu asamaya geldi ve sonra ne olacak

Artisi:
- rol ayrimi temiz
- mevcut repo mantigina en yakin model bu

Eksisi:
- iki ekran arasinda gidis gelis ihtiyaci kalir
- detail icinde yine minimum kartlar acilmak zorunda

Ara yorum:
- en saglikli cizgi `K3`, uygulama bicimi olarak da `Detail icinde K2 kartlari`
- yani ikisi rakip degil, tamamlayici

### 3) Minimum gorunur zincir ne olmali?
Yeni agir nesne acmadan bile Business Detail'te su 3 kart yeterli olabilir:

#### ZKart 1 - Audit sonucu
- kisa audit ozeti
- 3 ana eksik
- readiness
- onerilen sonraki adim

#### ZKart 2 - Teklif yonu
- onerilen paket veya son teklif
- neden bu paket
- opsiyonel ekler
- domain tercihi
- primary aksiyon: `teklif ac / teklifi guncelle / teklifi gonder`

#### ZKart 3 - Kickoff hazirligi
- teslim neye donusecek
- scope taslagi veya son scope
- eksik asset / erisim / onay sinyali
- primary aksiyon: `kickoff baslat`

Bu kurgu sunu cozer:
- auditten teklife gecis gorunur olur
- tekliften delivery kickoff'a gecis gorunur olur
- kullanici hangi bilginin hangi ciktiya donustugunu izler

### 4) `neden bu paket` satiri eksik kalirsa zincir yine kopar
Teklif kaydinda bugun su alanlar var:
- paket
- tutar
- ekler
- domain tercihi

Ama henuz ayri bir `gerekce` alani yok.
Bu eksikligi ilk fazda yeni tablo acmadan bile su yollarla hafifletmek mumkun:
- audit ozetinden turetilmis 1-2 satirlik `paket nedeni` karti
- Y.Z raporu / derived ozetten gelen `neden simdi bu yon` satiri

Yani once tam veri modeli degil, derived aciklama satiri acmak yeterli olabilir.

### 5) Delivery kickoff tarafinda bugun en zayif halka `scope`
Delivery kaydinin tek agir alani `scope` oldugu icin su risk var:
- teklifte secilen alanlar kickoff'ta eriyebilir
- hangi ek yorum materyali secildi, domain ne oldu, hangi asset eksik tam gorunmez

Bu yuzden onceki wake'teki T2 yorumu burada daha da guclendi:
- `scope` yanina 3-5 maddelik yari-yapili kickoff checklisti gelmeli
- ama tam form duvarina donmemeli

Minimum kickoff checklisti:
- assetler geldi mi
- erisim var mi
- domain tercihi net mi
- yayin onayi beklaniyor mu
- ilk yayin hedefi ne

### 6) Bu wake sonrasi finalistlere etkisi
Bu yeni okuma sunu guclendiriyor:
- C ve B'nin Business Detail merkezli varyasyonlari daha da mantikli
- E tamamen elenmiyor, cunku audit->teklif->delivery zincirinin dilini en iyi o tasiyor
- ama E'nin ayri bir model olmasindan cok, B/C icine entegre edilen `zincir kartlari mantigi` daha guclu gorunuyor

Yani burada yeni guclenen varyasyon:
- `Business Detail + ziyaret karti + audit/teklif/kickoff zincir kartlari`

## Yedinci okuma - admin paneline ilk girince hangi ekran acilmali?
Navigasyon ve mevcut ana sayfa yapisini birlikte okuyunca yeni bir netlik cikti.

### 1) Kod gerceginde uc farkli giris mantigi var
Su an sistemde fiilen 3 giris mantigi ayni anda yasiyor:
- `/` ana sayfa = bugunku aktif odagi soyluyor, yonlendiriyor
- `/businesses` = ana akis nav'inde ilk siradaki gercek kayit listesi
- `/discovery` = aday bulma ve on eleme yuzeyi

Ama `AdminShell` nav gruplarinda dikkat ceken sey su:
- nav'de `Home` yok
- ilk ana akis linki `Isletmeler`
- `Keşif` ve `Prompt Uretimi` onun yaninda

Bu ne demek:
- root sayfa var ama kalici ana merkez gibi tasinmiyor
- nav mantigi bize aslen `businesses` tabanli bir omurga dusunuldugunu soyluyor

### 2) Ana sayfa ilk ekran olarak faydali ama kalici calisma merkezi gibi degil
`/` su an iyi yaptigi seyler:
- aktif odagi soyler
- audit/teklif/teslim sayilarini verir
- dogru yere yonlendirir

Ama yapmadigi seyler:
- isletme sectirmez
- aday buldurmaz
- saha gunu listesi vermez
- kayit uzerinde calistirmaz

Yorum:
- ana sayfa `giris panosu` olabilir
- ama `calisma ekrani` olmamali
- bu zaten mevcut kod cizgisiyle uyumlu

### 3) `Isletmeler` su an en dogal operasyon girisi
`/businesses` sayfasi:
- nav'de birinci
- tum kayitlari listeliyor
- filtre veriyor
- hat asamasini gosteriyor
- siradaki adimi gosteriyor
- detail'e gecis sagliyor

Bu yuzden su soruya en yakin cevap burada:
- paneline girince takip ettigin gercek isletmeleri nasil bulacaksin?

Eksigi:
- aday bulma burada degil
- discovery ile gelen yeni havuz ayri yuzeyde

### 4) `Discovery` ilk ekran ancak ozel modda mantikli
`/discovery` sayfasi iyi cunku:
- aday havuzunu temiz tutuyor
- ham veriyi business'e hemen yazmiyor
- shortlist/import aksiyonlari var

Ama herkese varsayilan ilk ekran olursa risk:
- mevcut operasyon kayitlarini ikinci plana iter
- sanki panelin omurgasi hep yeni aday aramakmis gibi his verir
- teklif / teslim / bakim tarafini gozlestirir

Yorum:
- discovery varsayilan genel home olmamali
- `aday bulma modu` veya bos sistem modu icin once cikabilir

### 5) Uc olasi ilk ekran modeli

#### H1) Her zaman Home ile ac
Artisi:
- yon verir
- sade

Eksisi:
- ikinci tik olmadan gercek is uretmez
- nav'de merkezi rol tasimadigi icin yarim kalir

#### H2) Her zaman Businesses ile ac
Artisi:
- gercek operasyon kayitlarina indirir
- mevcut nav ile tam uyumlu
- detail'e hizli gecis verir

Eksisi:
- hic aday yoksa veya yeni gun discovery agirlikliysa eksik hissettirebilir

#### H3) Duruma gore adaptif giris
Ornek:
- hic business yoksa `/discovery`
- aktif bekleyen audit/teklif varsa `/businesses`
- sadece sistem yonlendirmesi gerekiyorsa `/`

Artisi:
- kullanicinin anlik ihtiyacina daha yakin

Eksisi:
- davranis gorunmezse kafa karistirabilir
- bir gun bir yer, diger gun baska yer acilmasi sabitlik hissini azaltabilir

### 6) En guclu ara cozum
Su an en dengeli model su gorunuyor:
- kalici ana calisma ekrani = `Businesses`
- yonlendirme panosu = `/`
- aday bulma modu = `Discovery`

Yani kullanici sorusuna net cevap:
- panelde gercek takip edecegin kaydi `Businesses` tarafinda bulursun
- yeni aday arayacaksan `Discovery`ye gecersin
- sistem seni once neye bakman gerektigine `/` sayfasinda yonlendirebilir ama asil is burada bitmez

Bu model onceki finalistlerle de uyumlu:
- B ve C gucleniyor
- A discovery girisini koruyor ama merkeze koymuyor

### 7) Hala acik risk
Bir risk hala var:
- nav'de home olmamasi ama root sayfanin var olmasi kullanicida `esas ekran hangisi` belirsizligi yaratabilir

Bu da iki yoldan biriyle cozulmeli:
- ya root sadece gecici giris panosu gibi tutulur
- ya nav'de rolu acik yazilir

Ama bu wake'in sonucu olarak su kanaat guclendi:
- `admin paneline ilk girince` genel cevap `Businesses`e daha yakin
- `hic veri yoksa` veya `aday bulma modundaysan` discovery onde olabilir
- root ekran tek basina ana omurga olmamali

## Sekizinci okuma - yolda gorulen isletmeyi hizli bulma ve cift kayit riski
Kurucunun saha gercegine en yakin soru burada cikti:
- yolda bir isletme goruldugunde sistemde var mi yok mu nasil hizli anlasilacak?
- bulunamazsa ayni isletme ikinci kez nasil acilmayacak?

### 1) Su anki kod gercegi ne sagliyor?
`/businesses` aramasi bugun sunlari tarayabiliyor:
- isletme adi
- ownerName
- ilce
- queue ozet/notu

Bu iyi cunku:
- adin bir kismini yazinca bulunabilir
- ilceyle daraltma yapilabilir
- not veya ozetten de yakalama sansi var

Ama saha icin eksik cunku:
- adres yok
- mahalle/sokak yok
- telefon yok
- discovery tarafindaki place baglantisi yok
- manuel yeni kayit acmadan once duplicate kontrolu yok

### 2) Discovery tarafinda kismi koruma var, manuel tarafta zayif
`/api/discovery/import` su an ayni `placeId` iki kez aktarilmasin diye runtime state uzerinden koruma koyuyor.
Bu guclu.

Ama manuel kayitta bugun gorunen cizgi su:
- `createBusiness` ad, ilce, ownerName ister
- ama benzer mevcut kayit var mi diye kontrol etmez
- yani manuel acista cift kayit riski gercek

### 3) Saha senaryosu icin tek dogru cevap arama + duplicate kontrolunu ayni akis yapmak
En mantikli V1 akisi su gorunuyor:

#### Adim 1 - once hizli ara
Operator yolda gordugu isletme icin tek kutuda su sekilde arar:
- isletme adi parcasi
- ilce veya mahalle parcasi
- gerekirse kategori

Ornek:
- `ozlem kuafor arnavutkoy`
- `mavi erkek berberi merkez`
- `lale guzellik`

#### Adim 2 - sonuc yoksa `yeni aday ac`
Ama bu buton direkt kaydetmez.
Once arkada `muhtemel ayni kayitlar` kontrolu kosar.

#### Adim 3 - sistem yakin eslesmeleri gosterir
En az su alanlardan:
- benzer ad
- ayni ilce
- benzer adres parcasi varsa o da
- ayni telefon varsa kuvvetli eslesme

Operatora su secenekler verilir:
- `mevcut kaydi ac`
- `yine de yeni kayit ac`

### 4) Duplicate kontrolu icin katmanli kural lazim
Tek bir sert kural yetmez.
En saglikli yol 3 katmanli model:

#### D1) Sert eslesme
Sunlardan biri ayniysa cok kuvvetli uyar:
- ayni `placeId`
- ayni telefon
- ayni website alan adi

#### D2) YumUSak eslesme
Bunlar birlikteyse muhtemel duplicate uyarisi:
- normalize edilmis benzer isim
- ayni ilce veya mahalle
- benzer kategori

#### D3) Manuel override
Cunku bazen ayni ada sahip farkli subeler olabilir.
Bu yuzden operator son karari verebilmeli.
Ama `yine de yeni kayit ac` bilincli aksiyon olmali.

### 5) Saha hizini bozmadan nasil yapilir?
En kritik nokta bu.
Fazla form olursa saha hizini oldurur.
O yuzden V1 sade olmali:
- ustte tek arama kutusu
- sonuc yoksa `yeni aday ac`
- kaydetmeden once 3-5 muhtemel eslesme ciksin
- ayni degilse hizlica devam etsin

Yani saha operatorune `once form doldur` degil, `once bul, bulamazsan kontrollu ac` mantigi verilmeli.

### 6) En mantikli veri yakalama sirasi
Yolda gorulen bir isletmede ilk anda her sey bilinmez.
Bu yuzden ilk kayitta zorunlu minimum su olmali:
- isletme adi
- ilce/mahalle veya konum ipucu
- segment
- kaynak = `sahada goruldu`

Sonra detaylar audit/gorusme asamasinda genisler.
Bu, gereksiz form duvarini engeller.

### 7) Bu sorunun finalistlere etkisi
Bu yeni soru su modelleri guclendiriyor:
- `Businesses ana calisma girisi` cizgisi, cunku once mevcut kaydi orada bulmak gerekiyor
- `Discovery tek giris olsun` modeli zayifliyor, cunku yolda bulunan isletme her zaman discovery'den gelmeyecek
- `manuel isletme ac ama duplicate kapiyla` varyasyonu gucleniyor

### 8) Gecici net kanaat
Su an en mantikli cizgi bu:
- saha icin `hizli bul veya kontrollu yeni aday ac` akisi lazim
- duplicate onleme discovery tarafinda `placeId` ile sert, manuel tarafta ise `benzer kayit uyarisi` ile yumusak olmali
- son karar operatora kalmali ama sistem iki kez acmayi kolaylastirmamali

## Dokuzuncu okuma - Business Detail'te farkli kaynak verisi nasil gruplanmali?
Bu eksende referans dokuman ile mevcut sayfayi birlikte okuyunca net bir ayrim cikti.

### 1) Referans cizgi aslinda 3 katman soyluyor
`REFERENCES/business-detail-v1.md` Business Detail icin acik bir veri ayrimi veriyor:
- `canonical` = operatorun dogru kabul ettigi ic veri
- `external` = Maps, website, Instagram, refresh snapshot gibi dis sinyal katmani
- `derived` = next step, fark, audit ozeti, paket yonu gibi karar ozetleri

Bu cok guclu cunku veri tipi ile karar tipini ayiriyor.

### 2) Mevcut sayfa ise katmanlari kismen karistiriyor
`app/businesses/[slugAndId]/page.tsx` bugun sunlari yanyana veriyor:
- isletme adi, ownerName = canonical
- adres, telefon, maps, website = discovery/external
- not = latest audit
- Instagram profil kutusu = baska external kaynak
- altta `BusinessScanPanel` = tarama ve derived karar aksiyonu

Yani bugun sayfa calisiyor ama operatorun kafasinda su soru acik kaliyor:
- bu satir sistemin kendi kaydi mi, yoksa dis kaynaktan gelen son gorunum mu?

### 3) Sadece kaynaga gore gruplayalim mi?
Model S1:
- Google/Maps
- Website
- Instagram
- Ajan
- Y.Z

Artisi:
- her veri nereden geldi net olur

Eksisi:
- operatorun asil sorusu olan `simdi ne dogru, ne eksik, ne yapmaliyim` dagilabilir
- sayfa kaynak galerisine donusme riski var

### 4) Sadece role gore gruplayalim mi?
Model S2:
- ic kayit
- dis gorunum
- farklar
- karar

Artisi:
- operator once neye guvenecegini bilir
- karar hizi artar

Eksisi:
- dis kaynaklar kendi icinde fazla ezilebilir
- Instagram ile Maps sinyali ayni torbaya girebilir

### 5) En mantikli yol hibrit gruplama
Su an en guclu model S3 gorunuyor:

#### Blok 1 - Kanonik isletme karti
Yalniz ic kayit:
- ad
- segment
- ilce
- muhatap
- durum
- stage / next step baglanti sinyali

#### Blok 2 - Kaynak durumu seridi
Sadece kaynak rozetleri:
- Maps snapshot var/yok ve tazelik
- Instagram snapshot var/yok ve tazelik
- Ajan tarama durumu
- Y.Z raporu durumu

Bu blok bir `envanter cubugu` gibi calisir.

#### Blok 3 - Dis sinyal kartlari
Kaynaga gore ayrilmis kartlar:
- Maps / discovery
- Website
- Instagram
- Ajan tarama veya derin tarama sonucu

Burada her kart kendi etiketiyle gelir.

#### Blok 4 - Fark / tutarsizlik alani
Derived ama cok degerli katman:
- telefon ic kayitta yok, dista var
- website dista var, ic kayitta yok
- kategori uyusmuyor
- adres teyit edilmeli

#### Blok 5 - Karar kartlari
Yine derived katman:
- audit ozeti
- ziyaret uygunlugu
- teklif yonu
- sonraki aksiyon

Bu sira iyi cunku:
- ic gercek -> dis sinyal -> fark -> karar zinciri kuruyor

### 6) `BusinessScanPanel` aslinda bu hibrit modelin parcasina donusebilir
Bugun `BusinessScanPanel` icinde zaten su cizgi var:
- hafif tarama = mevcut dis sinyali ozetler
- Y.Z raporu = derived karar ozeti uretir
- ajan tarama = ayri kaynak ve ozet verir
- scan history = tazelik/gecmis verir

Yani sifirdan yeni fikir kurmuyoruz.
Aslinda var olan panel, `external + derived` katmaninin ayri bir modulu gibi duruyor.
Bu da su sonuca yaklastiriyor:
- ust sayfa `canonical` ve kisa `external` ozetini verir
- scan panel daha derin `external/derived` modulu olarak kalir

### 7) En kritik UX kurali
Bir veri satirina bakinca operator sunu anlamali:
- bu bilgi ic kayit mi?
- dis kaynaktan mi geldi?
- sistemin onerisi mi?

Bunu cozmenin hafif yolu:
- bolum basliklarinda katman adini acik yazmak
- kritik satirlarda kucuk kaynak etiketi kullanmak (`Ic kayit`, `Maps`, `Instagram`, `Ajan`, `Turetilmis`)

### 8) Bu wake sonrasi guclenen kanaat
Business Detail icin en mantikli veri gruplama cizgisi su:
- sadece kaynak bazli dizmek yetmez
- sadece operasyon rolu bazli dizmek de yetmez
- `kanonik -> kaynak durumu -> dis sinyal kartlari -> farklar -> karar kartlari` sirasinda hibrit model daha dengeli

Bu model su riskleri de azaltir:
- dis kaynagin kanonik veriyi sessizce ezmesi
- sayfanin kaynak dump'ina donmesi
- operatorun neye guvenecegini sasirmasi

## Onuncu okuma - Y.Z skill tum veriden eksiksiz ozet nasil cikarmali?
Kurucunun son sorusu su ayrimi netlestirdi:
- mesele sadece `kisa rapor yazmak` degil
- `veri nasil toplanir, nasil ayiklanir, nasil karar katmanina doner` zincirini dusunmek gerekiyor

### 1) Bugunku akisin gercek durumu
`/api/businesses/[id]/yz-report/route.ts` ve `lib/businesses/yz-report.ts` bugun su akisi kuruyor:
1. business kaydi cekilir
2. discovery snapshot cekilir
3. latest agent scan cekilir
4. refresh history icinden latest Apify scan secilir
5. latest audit summary alinır
6. bunlar skill promptuna metin bloklari halinde konur
7. skill tek seferde JSON rapor dondurur
8. rapor `state/yz-reports/<businessId>.json` altina history olarak yazilir

Bu iyi cunku:
- calisan bir uctan uca zincir var
- Y.Z raporu zaten kod tabaninda ilk sinif cikti haline gelmis
- Business Detail icinde kullaniliyor

Ama eksik cunku:
- kaynaklar arasi uzlastirma ayri adim degil
- `ne dogrulandi / ne eksik / ne celiskili` sistematik uretilmiyor
- prompt girdisi agirlikla duz metin bloklari
- `eksiksiz ozet` hissi operator sozune degil, checklist temeline baglanmamis

### 2) Uc farkli skill modeli

#### Y1) Tek asamali kisa rapor modeli
Su an buna yakin:
- tum girdiyi bir promptta ver
- final Y.Z raporunu dogrudan yaz

Artisi:
- hizli
- basit

Eksisi:
- veri kaybi ve atlama riski yuksek
- celiski ve eksik alanlar kolayca gomulur
- model final metne erken atlar

#### Y2) Iki asamali uzlastirma + rapor modeli
- once kaynaklar yapisal bir `normalized bundle`a doner
- sonra bu bundle uzerinden final operator raporu yazilir

Artisi:
- neyin kanit, neyin yorum oldugu daha net ayrilir
- eksik ve celiski listesi sistematik cikar
- final rapor daha guvenilir olur

Eksisi:
- daha fazla tasarim ister
- bir ara kontrat gerekir

#### Y3) Tam pipeline modeli
- toplama
- normalize etme
- duplicate / eslesme kontrolu
- field-level confidence
- karar raporu
- UI katmani

Artisi:
- en saglam model

Eksisi:
- bugun icin agirlasma riski var
- onceki faz icin fazla buyuk olabilir

Ara yorum:
- simdilik en dengeli yol `Y2`
- `Y1` fazla kirilgan
- `Y3` dogru yon ama hemen tam kurulursa agir olabilir

### 3) En mantikli V2 akisi
Su an en guclu zincir su gorunuyor:

#### Adim 1 - kaynak toplama
- canonical business
- latest audit summary
- discovery/maps snapshot
- latest agent scan
- latest Apify/deep scan
- varsa Instagram profili
- ileride teklif / delivery baglami da opsiyonel eklenebilir

#### Adim 2 - normalize bundle uret
Tek prompttan once alanlari ortak forma getir:
- ad
- ilce/adres
- telefon
- website
- Instagram
- kategori/segment
- maps linki
- rating/reviews
- source freshness
- audit notes

Bu adimda her alan icin kaynak etiketi korunmali.

#### Adim 3 - alan bazli siniflandirma
Her kritik alan su sepetlere dusmeli:
- `verified`
- `missing`
- `conflicting`
- `weak-signal`

Ornek:
- website externalda var ama canonicalda yok = `conflicting` veya `missing in canonical`
- telefon hicbir yerde yok = `missing`
- Maps ve agent scan ayni yone isaret ediyor = `verified`

#### Adim 4 - eksiksizlik checklisti calistir
`eksiksiz` kelimesi yoruma birakilmamali.
Minimum checklist baglanmali:
- isletme adi
- konum/adres
- telefon
- website
- Instagram
- maps baglantisi
- kategori
- puan/yorum
- muhatap
- audit notu
- sonraki aksiyon icin yeterli veri var mi

#### Adim 5 - karar ozetini uret
Ancak bu asamada final Y.Z raporu yazilmali:
- genel durum
- guclu sinyaller
- zayif sinyaller
- dijital gorunum ozeti
- oncelikli aksiyon

#### Adim 6 - ikili cikti ver
Tek cikti yerine iki katman daha mantikli:
- `operatorSummary` = bugunku kisa Y.Z raporu
- `evidencePack` = verified/missing/conflicting/checklist/freshness ozeti

Bu sayede ustte hizli okuma, altta gerekce olur.

### 4) Skill nasil gelistirilmeli?
`esnafdijital-yz-report` skill'i sadece yazim kurali degil, workflow skill'i haline gelmeli.

#### G1) SKILL.md icinde iki asamali workflow net yazilmali
- once uzlastir
- sonra rapor yaz
- final cevaba erken atlama

#### G2) reference dosyalari ayrilmali
Bugun sadece `report-contract.md` var.
Su iki referans daha mantikli gorunuyor:
- `references/input-bundle-contract.md`
- `references/reconciliation-rules.md`

Boylece skill kisalir, kural seti referansa tasinir.

#### G3) cikti kontrati genislemeli
Bugunku JSON alanlari:
- status
- summary
- strengths
- weaknesses
- visibilitySummary
- nextAction

V2 tarafinda ek dusunulebilecek alanlar:
- `verifiedFacts`
- `missingFacts`
- `conflicts`
- `freshnessSummary`
- `coverageScore` veya en az `coverageState`
- `confidence`

Hepsi UI'de aynen gosterilmek zorunda degil.
Ama skill'in icte daha saglam dusunmesini saglar.

#### G4) prompt girdisi metin bloklarindan yapisal pakete donmeli
Bugun `formatPayload`, `formatAgentScan`, `formatApifyScan` metin satiri uretip prompta ekiyor.
Bu calisir ama kirilgan.
Daha saglam yol:
- JSON benzeri sabit bloklar
- alan adlari tutarli
- null/empty durumlari acik
- kaynak etiketi korunmus

### 5) En kritik risk
Burada asiri buyume riski var.
Y.Z skill'i su hataya dusmemeli:
- mini CRM motoruna donusmek
- tum alanlari sonsuz toplamak
- rapor yerine ham dump uretmek

Bu yuzden guclu ama dar cizgi su olmali:
- tek isletme
- operator odagi
- karar hizlandirma
- checklist tabanli eksiksizlik
- kanit ile yorumu ayirma

### 6) Bu wake sonrasi guclenen kanaat
Su an en mantikli gelisim cizgisi:
- kisa Y.Z raporu fikrini koru
- ama once `normalized evidence bundle` ve `reconciliation` katmani ekle
- tam pipeline motoruna hemen gecme
- `iki asamali uzlastirma + rapor` modeliyle ilerle

Bu, hem skill'i guclendirir hem de panelde `ic gercek -> dis sinyal -> fark -> karar` cizgisiyle uyumlu kalir.

## On birinci okuma - sahada ne soylenir, paket nasil sunulur?
`PLAYBOOKS/audit-offer-delivery.md`, `OFFERS.md` ve `SEGMENTS.md` birlikte okununca saha konusmasi icin onemli bir sinir netlesti.

### 1) Ilk temasin amaci paket satmak degil, audit zemini kurmak
En kritik cizgi `OFFERS.md` icinde acik:
- audit teklifin girdisidir
- audit olmadan teklif verilmez
- paket dili audit cikisina baglanir

Bu neyi disliyor:
- daha ilk dakikada `bizde 3 paket var` diye giren ajans dili
- sahada ezbere fiyat ve kapsam sayma
- segment bazli ayri paket aileleri uretme

Yani ilk temasin amaci su olmali:
- isletmenin dijital gorunum sorununu fark ettirmek
- audit cikisi icin izin ve zemin kurmak
- sonra uygun pakete baglamak

### 2) Saha konusmasi icin 3 model

#### K1) Paket-first konusma
- kendini tanit
- paketleri say
- fiyat araligina gir

Artisi:
- kisa

Eksisi:
- OFFERS cizgisine ters
- soguk ve ajansimsi durur
- isletmeye ozel sorun cikmadan paket anlami zayif kalir

#### K2) Audit-first konusma
- isletmeyi kisa gozlemle ac
- 1-2 somut eksigi soyle
- `isterseniz bunu size kisa kontrol olarak netlestireyim` cizgisine gel
- paket ancak audit cikisinda konusulur

Artisi:
- mevcut teklif omurgasiyla uyumlu
- sahada daha dogal
- guven veren giris saglar

Eksisi:
- operatorun iyi gozlem yapmasini ister
- cok uzun konusulursa dagilabilir

#### K3) Karma model
- audit gozlemiyle gir
- ama son 1-2 cumlede uygun paket serisini cok kisa ima et

Artisi:
- audit-first kalirken satis kopmaz

Eksisi:
- cizgi kotu korunursa erken tekliflesmeye kayabilir

Ara yorum:
- su an en guclu model `K2`
- ama saha kapanisi icin `K3`ten kisa bir son baglama cumlesi alinabilir

### 3) Tek bir sabit script yerine moduler konusma kartlari daha mantikli
Bu onceki sorularla da uyusuyor.
Neden:
- berber, guzellik ve kafe ayni acilis cumlesini tasimaz
- ama paket mantigi ayni kalmali
- fark satis hikayesinde olmali, paket ailesinde degil

Bu yuzden daha saglikli model:
- cekirdek ortak iskelet
- ustune segmente gore vurgu karti

### 4) Ortak saha iskeleti nasil olmali?
Su 5 adimli cizgi en dengeli gorunuyor:

#### S1) Giris
- cok kisa tanisma
- neden baktigini tek cumlede soyle

#### S2) Somut gozlem
- Maps/website/yorum/iletisim tarafindan 1-2 net eksik veya firsat soyle
- genel pazarlama lafi etme

#### S3) Audit teklifi
- `isterseniz size bunu kisa bir dijital gorunurluk kontrolu olarak netlestireyim`

#### S4) Paket koprusu
- audit cikisinda bunun temel kurulum mu, plus mi, daha guclu vitrin mi gerektirdigini soyleyebilecegini belirt

#### S5) Sonraki adim
- geri donus, kisa not alma veya tekrar gorusme aksiyonuna bagla

Bu modelin artisi:
- ilk temas satis gibi degil, yardim eden teshis gibi baslar
- ama tamamen havada da kalmaz

### 5) Segment bazli vurgu farklari ne olmali?
Paket yapisi ayni, ama konusma vurgusu segmentten etkilenmeli.

#### Berber
Ilk vurgu:
- bulunurluk
- saat/telefon/yol tarifi netligi
- yorum guveni

Sahada dil:
- hizli, sade, direkt

#### Guzellik salonu
Ilk vurgu:
- gorsel guven
- hizmetlerin daha net anlatimi
- yorum + sosyal profil butunlugu

Sahada dil:
- biraz daha premium ama yine sade

#### Kafe/restoran
Ilk vurgu:
- menu/fotograf/konum bilgisi
- acik/kapali ve yorum etkisi
- daha yuksek guncellik ihtiyaci

Sahada dil:
- firsat buyuk ama bakim yuku de vurgulanmadan dikkatli secilmeli

### 6) Paket nasil sunulmali?
Burada da 3 model var:

#### P1) Tum paketleri tek seferde anlat
Eksisi:
- menu okur gibi olur
- sahada agir kacabilir

#### P2) Yalniz onerilen seviyeyi anlat
Artisi:
- daha sade

Eksisi:
- operator neden alt/ust paketi degil de bunu sectigini anlatmakta zorlanabilir

#### P3) Onerilen paketi merkeze koy, sadece bir alt ve bir ust seviye capasi ver
Ornek mantik:
- size en cok su seviye oturuyor
- bunun bir daha hafif giris versiyonu var
- bir de daha guclu ust seviye var ama bugun buna mecbur degilsiniz

Artisi:
- secim hissi verir
- ama paket menusu duvarina donmez

Ara yorum:
- saha icin en dengeli yol `P3`

### 7) Saha konusmasi ile teslimat kopmamali
Playbook cizgisine gore konusma su sorulara baglanmali:
- gorulen eksik ne
- hangi paket onu kapatir
- ne teslim edilecek
- ne edilmeyecek

Yani saha dilinde bile `neden bu paket` ve `ne teslim` isareti olmali.
Aksi halde satis alinsa bile kickoff'ta kopma olur.

### 8) Bu wake sonrasi finalistlere etkisi
Bu yeni okuma su varyasyonlari guclendiriyor:
- `audit-first moduler konusma kartlari`
- `onerilen paket + alt/ust capasi` sunumu
- `Business Detail icinde audit ozeti -> teklif yonu` zinciri

Zayiflayan varyasyonlar:
- `script-first tek sabit metin`
- `tum paketleri sahada menu gibi anlatma`
- `audit gormeden erken teklif baskisi`

### 9) Gecici net kanaat
Su an en mantikli saha cizgisi:
- sabit script degil, audit-first moduler konusma kartlari
- ilk temas paket satmak icin degil, sorunu gorunur kilmak icin
- paket sunumunda sadece onerilen seviye merkeze alinip bir alt ve bir ust capasi kisa verilmeli
- segment farki paket yapisinda degil, vurgu ve orneklerde yasanmali

## On ikinci okuma - gorusme notu ile kickoff bilgisi nasil ayrilmali?
Bu soru, `girilen bilgi nasil sonuca donusur` zincirinin en zayif halkasini daha net gosterdi.
Kod ve teklif omurgasinda bugun su durum var:
- audit kaydinda tek agir alan fiilen `summary`
- teklifte `packageName`, `amountTry`, `addonKeys`, `domainPreference`, `customDomain` var
- delivery tarafinda tek belirgin agir alan `scope`

Yani su an sistemde su kopma riski var:
- sahada toplanan serbest not ile
- teslimata girecek operasyonel kickoff bilgisi
aynı metin havuzunda eriyebilir

### 1) Bu iki sey aslinda ayni problem degil

#### Gorusme notu nedir?
Saha veya ilk temas bilgisidir.
Daha cok su ise yarar:
- muhatap dili ve tonu
- gorulen itiraz veya ilgi
- isletmenin o anki onceligi
- hangi sorunlara reaksiyon verdigi
- tekrar donerken hatirlanacak baglam

#### Kickoff bilgisi nedir?
Is onaylandiktan sonra teslimati baslatan operasyon girdisidir.
Daha cok su ise yarar:
- ne teslim edilecek
- hangi asset / erisim eksik
- domain tercihi ne
- yayin icin ne bekleniyor
- teslim sureci neye takilabilir

Bu ayrim cok onemli cunku:
- gorusme notu satis oncesi hafizadir
- kickoff bilgisi teslimat oncesi operasyon girisidir

### 2) Uc model

#### N1) Tek not alani modeli
- her sey audit summary veya scope icinde akar

Artisi:
- en basit

Eksisi:
- hizli coplenir
- neyin saha notu, neyin teslim girdisi oldugu kaybolur
- delivery kickoff'ta tekrar yorum yapmak gerekir

#### N2) Iki ayri hafif katman
- `gorusme notu`
- `kickoff checklist + scope`

Artisi:
- ayrim net
- gereksiz yeni tablo acmadan bile uygulanabilir
- bugunku veri modeline en yakin evrim bu

Eksisi:
- UI'de nerede duracagi dikkat ister

#### N3) Tam form tabanli ayri nesneler
- gorusme nesnesi
- kickoff nesnesi
- asset nesnesi
- erisim nesnesi

Artisi:
- en temiz uzun vadeli model

Eksisi:
- bugun icin agir
- erken CRM savrulmasi riski var

Ara yorum:
- simdilik en dengeli yol `N2`

### 3) Gorusme notunun minimum alanlari ne olmali?
Bence saha tarafi icin minimum set su:
- `gorusmeOzeti` = 2-5 cumle
- `ilgiSeviyesi` = dusuk / orta / iyi gibi hafif bir etiket olabilir
- `anaSorun` = operatorun gordugu ana aci
- `itirazVeyaCekince` = varsa
- `sonrakiTemas` = ara / tekrar git / audit gonder / beklet

Ama dikkat:
- bunlar tam ayri form duvarina donmemeli
- ilk versiyonda audit ozeti yaninda hafif alanlar veya moduler satirlar olarak durabilir

### 4) Kickoff bilgisinin minimum alanlari ne olmali?
`scope` tek basina yetersiz gorunuyor.
Onun yanina en az su 5 madde gerekiyor:
- `teslimOzeti` veya scope
- `assetDurumu` = logo/fotograf/metin geldi mi
- `erisimDurumu` = Maps/Instagram/domain erisimi var mi
- `domainTercihi` = subdomain / custom domain
- `ilkYayinHedefi` = neyi canliya aliyoruz

Opsiyonel 6. madde:
- `onayBekleyenler` = musteri onayi gereken konu var mi

Bu set delivery kickoff'ta cok daha anlamli.

### 5) Neden audit summary bunu tasiyamaz?
Cunku audit summary'nin isi baska:
- dijital acigi ozetlemek
- paket yonu cizmek
- teklif kararina girdi vermek

Eger gorusme detayi ve kickoff detayi buraya yigilirsa:
- audit ozeti kirlenir
- teklif gerekcesi kaybolur
- sonradan okunmasi zorlasir

### 6) Neden `scope` tek basina yetmez?
Cunku `scope` su tipte kalabilir:
- `temel web vitrini + maps duzenleme + qr yorum akisi`

Bu iyi ama su sorulari cevaplamaz:
- logo var mi?
- fotograflar hazir mi?
- kimden onay alinacak?
- custom domain mi isteniyor?
- maps erisimi var mi?

Yani `scope` teslimin ne oldugunu soyler, ama teslimin nasil baslayacagini tam soylemez.

### 7) En mantikli gecici ekran modeli
Yeni sayfa acmadan su zincir mantikli gorunuyor:

#### Business Detail icinde
- `Gorusme notu` karti = satis oncesi hafiza
- `Teklif yonu` karti = auditten cikan karar
- `Kickoff hazirlik` karti = is onaylandiginda teslim girisi

Bu, onceki Business Detail zincir yorumuyla da uyumlu.

### 8) Bu wake sonrasi guclenen kanaat
Su an en saglikli cizgi su:
- gorusme notu ile kickoff bilgisi ayni metin olmamali
- ama bugun bunlar icin ayri agir nesneler acmak erken olabilir
- ilk V1 ayrim su sekilde yeterli gorunuyor:
  - audit ozeti = sorun ve paket girdisi
  - gorusme notu = saha baglami ve ilgi/itiraz hafizasi
  - kickoff bilgisi = teslim baslangic checklisti + scope

Bu ayrim sunu guclendiriyor:
- satis ile teslim kopmaz
- Business Detail icindeki zincir kartlari daha anlamli olur
- veri modeli buyumeden rol ayrimi saglanir

## On ucuncu okuma - discovery skoru ile ziyaret onceligi skoru ayni sey mi?
Bu soru discovery kodunu okuyunca daha net ayrildi.

### 1) Bugunku discovery skoru neyi olcuyor?
`lib/businesses/discovery.ts` icindeki `scoreEntry` bugun agirlikla su sinyallere bakiyor:
- telefon yoksa +1
- website yoksa +1
- saat bilgisi eksikse +1
- yorum yoksa +1
- kapali gorunuyorsa -3
- yorum ve puan gucluyse -1

Sonra da:
- skor `>= 3` ise `review`
- daha dusukse `shortlist`

Bu cok onemli cunku bu skorun mantigi su:
- `dijital acik / eksik / audit firsati` ne kadar belirgin?

Yani bugunku skorun gizli anlami:
- sorun var mi?
- dijital toparlama ihtiyaci goze batiyor mu?

### 2) Bu skor neden ziyaret karari icin tek basina yetmez?
Cunku sahada `gidilecek isletme` sorusu baska degiskenler de ister.
Discovery skoru bunlari neredeyse hic tartmiyor:
- yakinlik / rota verimi
- segmente gore teslim ve bakim yuku
- isletmenin fiziksel acik olma ritmi
- sahada konusmaya uygun muhatap olasiligi
- discovery disi manuel oncelik
- sistemde zaten acik business kaydi var mi

Daha da kritik nokta:
- `review` kovasi bazen daha sorunlu veya daha belirsiz kaydi isaret eder
- ama daha sorunlu olmak, otomatik olarak `bugun gidilecek en iyi aday` demek degil

### 3) Kod seviyesinde discovery tablosu da bunu destekliyor
`/discovery` ekrani sunlari one cikariyor:
- skor
- yorum / puan
- iletisim sinyali
- sahiplik
- arama kapsami
- karar kovasi

Bu tablo iyi cunku:
- aday havuzu temizleniyor
- on eleme yapiliyor

Ama eksik cunku:
- `ziyaret verimi` diye ayri bir kolon yok
- `bugun git` mantigi yok
- ilce/rota bazli saha onceligi yok
- segment agirligi discovery bucket'ina dogrudan islenmiyor

### 4) Uc model

#### V1) Discovery skoru = ziyaret skoru say
Artisi:
- kolay

Eksisi:
- saha gercegini kacirir
- dijital acik ile saha verimini karistirir

#### V2) Discovery skoru yardimci sinyal olsun
- discovery skoru = audit/acik sinyali
- ziyaret skoru = ayrica turetilir

Artisi:
- rol ayrimi net
- daha gercekci

Eksisi:
- ikinci bir hafif mantik gerekir

#### V3) Tek bilesik skor uret
- discovery + segment + rota + manuel oncelik ayni sayiya aksin

Artisi:
- tek liste verir

Eksisi:
- neden-sonuc kaybolur
- operator niye yukari geldigini anlamakta zorlanir

Ara yorum:
- su an en guclu yol `V2`

### 5) Ziyaret onceligi skorunun minimum bilesenleri ne olmali?
Bugunku arastirma cizgisine gore en hafif model su olabilir:
- `discoveryGapSignal` = mevcut discovery skoru veya bucket yorumu
- `segmentFit` = guzellik > berber > kafe/restoran gibi ilk faz agirligi
- `fieldEfficiency` = telefon, saat, konum, aciklik sinyali
- `routeFit` = ilce / yakinlik / ayni gun gruplanabilirlik
- `duplicateOrExistingRisk` = zaten business var mi, supheli eslesme var mi
- `manualPriority` = operatorun elle one cekmesi

Bu modelde discovery skoru sadece bir parca olur.

### 6) Dikkat cekici bir terslik daha var
Bugunku `scoreEntry` mantiginda eksik sinyal arttikca skor artiyor.
Bu audit icin mantikli olabilir.
Ama saha icin bazen ters etki yaratir:
- telefonu yok
- website yok
- yorum yok

Boyle bir kayit `review`e cikabilir.
Fakat sahada buna gitmek verimli mi, emin degil.
Belki de telefonsuz, yorumsuz, cok belirsiz bir kayit yerine daha net ama iyi paket uyumu olan baska kayda gitmek daha mantikli olur.

Yani `en sorunlu` ile `en gidilesi` farkli listeler olabilir.

### 7) Bu wake sonrasi finalistlere etkisi
Bu yeni okuma su varyasyonlari guclendiriyor:
- discovery = aday eleme ve audit firsat skoru
- business/project os/detail tarafinda ayrica `ziyaret uygunlugu` veya `bugun git` sinyali
- ayri ziyaret sayfasi acmadan once hafif derived katmanla test etme

Zayiflayan varyasyon:
- discovery tablosundaki mevcut skorla saha listesini otomatik kurma

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- discovery skoru `dijital acik / audit firsati` skoru olarak kalmali
- ziyaret onceligi skoru bundan ayri, daha hafif ikinci katman olmali
- bu ikinci katman Business Detail veya Project OS tarafinda `bugun gidilir mi` kararina yardim etmeli
- tek karmasik ana skor yerine iki farkli amacli skor daha okunur ve daha saha-gercekci gorunuyor

## On dorduncu okuma - `bugun git` sinyali Project OS'ta mi, Business Detail'te mi?
Bu soru onceki `ziyaret onceligi` arastirmasinin dogal devamiydi.
`REFERENCES/project-os-page.md`, `lib/project-os/derived.ts` ve `app/page.tsx` birlikte okuyunca ekran rolleri daha net ayrildi.

### 1) Project OS'un asli isi ne?
Referans ve kod birlikte su cizgiyi soyluyor:
- Project OS = coklu business arasinda hangi kayit simdi hareket etmeli?
- hot stage ve queue mantigi var
- intake / audit / offer / delivery / maintenance asamalarina gore is siralaniyor
- summary ve nextAction veriyor

Ama queue mantigi bugun su eksende kurulu:
- audit var mi?
- teklif acildi mi?
- teslimat acildi mi?
- status ne?

Yani Project OS bugun:
- operasyon zinciri onceligi verir
- ama saha ziyareti onceligi vermez

### 2) Ana sayfa da ayni dili tasiyor
`app/page.tsx` icindeki `getActiveFocus` su karar dilini kullaniyor:
- prompt tikanikligi var mi
- teklif sicak mi
- audit bekliyor mu
- teslimat canli mi

Bu da yine bize sunu soyluyor:
- root ve Project OS daha cok `is hattinda simdi nerede yigilma var` sorusunu cozuyor
- tek tek fiziksel ziyaret kararini dogrudan tasimiyor

### 3) Business Detail'in dogal rolu ne?
Onceki okumalarla uyumlu olarak Business Detail:
- tek kayit karar yuzeyi
- canonical / external / derived resmi bir arada okuma yeri
- bu isletmeye gidilir mi, neden gidilir, gidince ne beklenir gibi sorulara daha yakin

Bu yuzden `bugun git` sinyali tek bir isletme icin burada daha dogal duruyor.

### 4) Uc model

#### G1) `bugun git` sadece Project OS'ta olsun
Artisi:
- gunluk liste tek yerde gorunur

Eksisi:
- neden gidilecegi zayif kalir
- detail'e girince ayni karar zemini kaybolur
- Project OS rolunu asiri genisletir

#### G2) `bugun git` sadece Business Detail'te olsun
Artisi:
- tek kayit karari daha acik verilir

Eksisi:
- birden fazla aday arasinda saha secimi zorlasir
- gunluk operasyon ekraninda bu sinyal gorunmez

#### G3) Cift katmanli model
- Project OS = `ziyaret adayi / bugun git` diye hafif liste sinyali verir
- Business Detail = bunun nedenini ve saha kartini aciklar

Artisi:
- ekran rolleri bozulmaz
- coklu secim de tek kayit karari da cozulur

Eksisi:
- ayni kavramin iki yerde dikkatli isimlendirilmesi gerekir

Ara yorum:
- su an en saglikli yol `G3`

### 5) Ama Project OS'taki sinyal hafif olmali
Project OS'a su tip agir kartlar tasinmamali:
- konusma notlari
- itiraz detaylari
- alinacak bilgi listesi
- saha hazirlik metni

Orada olmasi gereken en hafif gorunum:
- `ziyaret adayi`
- `bugun git`
- veya `uzaktan ilerlet`

Ve belki tek satir sebep:
- `guzellik segmenti + website yok + ayni ilcede`

Yani Project OS'ta sadece secim sinyali, Business Detail'te gerekce ve hazirlik kalmali.

### 6) Business Detail'te ne olmali?
`bugun git` sinyali detailde daha derinlesebilir:
- gidilir / uzaktan ilerlet / beklet
- neden
- sahada ilk acilis
- alinacak bilgi listesi
- beklenen sonraki adim

Bu, onceki `ziyaret karti` yorumuyla tam uyumlu.

### 7) Bu ayrim neden guclu?
Cunku su iki soruyu ayiriyor:
- `bugun hangi kayda bakayim?` -> Project OS
- `bu kayda gidince ne yapayim?` -> Business Detail

Bu ayrim bozulursa:
- ya Project OS mini detail sayfasina doner
- ya da Business Detail liste secim ekranina doner

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `bugun git` sinyalinin hafif secim versiyonu Project OS'ta olabilir
- ama asil ziyaret uygunlugu ve saha hazirlik karari Business Detail icindeki derived kartta yasanmali
- yani ziyaret onceligi cift katmanli okunmali: once listede isaret, sonra detailde gerekce

Bu model hem onceki finalist C'yi guclendiriyor hem de yeni ayri ziyaret panosu acmadan saha kullanimini tasiyabiliyor.

## On besinci okuma - Business Detail icindeki ziyaret kartinin minimum alanlari neler olmali?
Bu soru onceki iki arastirmanin kesistigi nokta oldu:
- `bugun git` secim sinyali listede hafif olabilir
- ama asil ziyaret karari ve saha hazirligi detail icinde okunmali

`REFERENCES/business-detail-v1.md` su cizgiyi veriyor:
- Business Detail tek kayit karar yuzeyi
- next step karti bu sayfanin en guclu karar karti
- audit snapshot ve tarama paneli ustte okunur kalmali
- ekran mini CRM duvarina donmemeli

Mevcut `app/businesses/[slugAndId]/page.tsx` ise bugun hala hafif:
- temel isletme karti
- dis sinyal alanlari
- Instagram ozeti
- auditten gelen kisa not
- `BusinessScanPanel`

Bu bize su serbestligi veriyor:
- ziyaret karti icin yer var
- ama kart cok buyurse sayfanin hafifligi bozulur

### 1) Uc model

#### Z1) Yalniz `gidilir mi?` karti
Alanlar:
- gidilir / beklet / uzaktan ilerlet
- tek cumle neden

Artisi:
- cok hafif

Eksisi:
- sahaya cikinca ne diyecegini ve ne toplayacagini soylemez
- pratikte yarim karar olur

#### Z2) Dengeli ziyaret karti
Alanlar:
- `ziyaret karari`
- `neden`
- `ilk acilis`
- `alinacak bilgi`
- `beklenen sonraki adim`

Artisi:
- sahada gercekten ise yarar
- detail'in tek kayit karar roluyle uyumlu
- ayri sayfa acmadan yeterli derinlik verir

Eksisi:
- kotu tasarlanirsa audit kartiyla karisabilir

#### Z3) Tam saha hazirlik karti
Ek alanlar:
- itiraz notlari
- rota notu
- tahmini paket
- riskler
- tekrar gorusme gecmisi

Artisi:
- saha gunu cok zengin olabilir

Eksisi:
- bugun icin agir
- ayri ziyaret sayfasina kayma riski yaratir

Ara yorum:
- su an en mantikli yol `Z2`

### 2) Minimum alanlar tam olarak neler olmali?
Bence V1 ziyaret karti icin 5 alan yeterli:

#### A1) `Ziyaret karari`
Degerler:
- `Bugun git`
- `Uzaktan ilerlet`
- `Beklet`

Amac:
- ilk karari tek bakista vermek

#### A2) `Neden`
1-2 satir.
Ornek mantik:
- website yok, yorum zayif, segment uyumu guclu
- maps kaydi var ama guven sinyali daginik

Amac:
- Project OS'taki hafif isaretin detail'deki gerekcesi olmak

#### A3) `Sahada ilk acilis`
Tek cumlelik audit-first giris.
Amac:
- operatorun sahada kilitlenmesini azaltmak
- tam script degil, acilis capasi vermek

#### A4) `Alinacak bilgi`
En fazla 3-5 madde.
Ornek:
- muhatap kim
- telefon/WhatsApp teyidi
- fotograf/icerik var mi
- domain istegi var mi

Amac:
- gorusmeyi veri toplamaya baglamak

#### A5) `Beklenen sonraki adim`
Tek cumle.
Ornek:
- audit ozetini netlestirip Paket 1-2 yonuyle don
- once eslesme/telefon dogrulansin

Amac:
- ziyaretin cikisini operasyon zincirine baglamak

### 3) Hangi alanlari bilincli olarak disarida birakmali?
V1'de su alanlar bu kartta zorunlu olmamali:
- tam itiraz bankasi
- uzun gorusme gecmisi
- rota / harita planlamasi
- ayrintili paket karsilastirmasi
- teslim kickoff checklisti

Cunku bunlar ya baska kartin isi ya da ayri fazda acilmali.

### 4) Y.Z raporu ile audit snapshot arasinda bu kart nereye oturur?
En saglikli sira su gibi gorunuyor:
- Next Step
- Audit Snapshot
- Ziyaret Karti
- Hazirlik / Tarama paneli
- Teklif / Teslim zinciri

Neden:
- audit snapshot sorunu ve paket yonunu anlatir
- ziyaret karti `sahaya gidilir mi ve gidince ne yapilir` sorusunu cozer
- scan panel ise gerekiyorsa ek sinyal toplar

### 5) Bu kartin en buyuk riski ne?
Audit kartini tekrar etmesi.
Bunu onlemek icin kural su olmali:
- audit karti = dijital sorun ve teklif yonu
- ziyaret karti = fiziksel temas karari ve saha icin operator rehberi

### 6) Gecici net kanaat
Su an en mantikli V1 ziyaret karti su 5 alanla kurulabilir:
- ziyaret karari
- neden
- sahada ilk acilis
- alinacak bilgi
- beklenen sonraki adim

Bu kart:
- Project OS'taki hafif `bugun git` sinyalini detail'de anlamlandirir
- ayri ziyaret sayfasi acmadan saha hazirligini tasir
- audit ve teklif zincirine kopmeden baglanir

## On altinci okuma - Business Detail icindeki audit / teklif / kickoff zincir kartlarinin minimum alanlari neler olmali?
Bu soru, onceki `ziyaret karti` ve `gorusme notu vs kickoff bilgisi` ayrimini zincir seviyesinde birlestirdi.

### 1) Referans ve kod bize ne diyor?
`REFERENCES/business-detail-v1.md` acikca sunu istiyor:
- `Audit Snapshot` karti olsun
- `Son teklif` karti olsun
- `Son teslimat` karti olsun
- ama sayfa form duvarina donmesin

Kod gercegi ise bugun su durumda:
- Project OS queue, audit / offer / delivery asamalarini net turetiyor
- offer tarafinda dogrudan gorunen ana alanlar: `packageName`, `amountTry`, `addonKeys`, `domainPreference`, `customDomain`
- delivery tarafinda queue seviyesinde gorunen ana alan fiilen `scope`

Yani zincir verisi var ama detail ekraninda operatora karar verdiren hafif kart dili henuz zayif.

### 2) Uc model

#### C1) Sadece durum kartlari
- audit var / yok
- teklif var / yok
- kickoff var / yok

Artisi:
- cok hafif

Eksisi:
- `neden` ve `neye donustu` hikayesini tasimaz
- kullanicinin sordugu `girilen bilgi nasil sonuca donusur` sorusunu tam cozmez

#### C2) Dengeli zincir kartlari
- her kartta durum + neden + primary aksiyon + kisa operasyon girdisi

Artisi:
- karar hizi verir
- Business Detail rolune uyar
- form duvarina donmez

Eksisi:
- iyi sinir cizgisi ister

#### C3) Tam detay kartlari
- her kartta tum alanlar, tum gecmis, tum notlar

Artisi:
- hic sey kacmaz

Eksisi:
- erken ve agir
- mini CRM duvari riski cok yuksek

Ara yorum:
- su an en saglikli yol `C2`

### 3) Audit kartinin minimum alanlari
Audit kartinin isi su olmali:
- sorunu gorunur kilmak
- teklif yonune zemin kurmak

V1 minimum alanlar:
- `hazirlik seviyesi` veya audit statusu
- `kisa audit ozeti`
- `ilk 3 eksik / zayif sinyal`
- `onerilen paket yonu`
- `primary aksiyon` = incelemeye al / teklife gecir

Bilerek disarida:
- uzun audit raporu
- ham scrape dump
- tum yorum / puan ayrintisi

### 4) Teklif kartinin minimum alanlari
Teklif kartinin isi sadece fiyat gostermek degil, teslim oncesi operasyon kararini okunur yapmak.

V1 minimum alanlar:
- `onerilen veya son paket`
- `tutar`
- `neden bu paket` (1-2 satir derived aciklama)
- `domain tercihi`
- `secili ekler` (varsa)
- `primary aksiyon` = teklifi ac / guncelle / gonder

Burada kritik nokta:
- `neden bu paket` satiri olmadan teklif karti yine eksik kalir
- cunku operator paketin auditten nasil dogdugunu gormez

### 5) Kickoff kartinin minimum alanlari
Kickoff kartinin isi `scope`u teslim baslangicina baglamak.

V1 minimum alanlar:
- `teslim durumu` = kickoff / yapim / yayinda gibi
- `scope ozeti`
- `asset durumu` = geldi / eksik gibi cok hafif sinyal
- `erisim durumu` = maps / instagram / domain tarafinda durum sinyali
- `ilk yayin hedefi` veya teslim hedefi
- `primary aksiyon` = kickoff baslat / yapima gecir

Burada bilerek tam checklist acilmiyor.
Ama kart sadece `scope`tan ibaret de kalmiyor.

### 6) Kartlar arasindaki ayrim nasil korunur?
Bu en kritik kural:
- `Audit` = sorun ve uygun yon
- `Teklif` = secilen cozum ve ticari/operasyonel cerceve
- `Kickoff` = onayli cozumun nasil baslayacagi

Eger bu ayrim bozulursa:
- audit karti teklife tasar
- teklif karti kickoff checklistine donar
- detail sayfa sisip odagini kaybeder

### 7) Bu zincir ziyaret kartiyla nasil yanyana durur?
En saglikli sira su gibi gorunuyor:
- Next Step
- Audit Snapshot
- Ziyaret Karti
- Hazirlik / Tarama
- Teklif Karti
- Kickoff Karti

Neden:
- once sorun ve saha karari netlesir
- sonra ek sinyal gerekirse cekilir
- sonra cozum ve teslim zinciri okunur

### 8) Gecici net kanaat
Su an Business Detail icin en mantikli minimum zincir su:
- Audit karti = hazirlik seviyesi + ozet + 3 eksik + paket yonu + primary aksiyon
- Teklif karti = paket + tutar + neden bu paket + domain + ekler + primary aksiyon
- Kickoff karti = durum + scope ozeti + asset durumu + erisim durumu + ilk yayin hedefi + primary aksiyon

Bu model:
- `girilen bilgi nasil sonuca donusur` sorusunu okunur kilar
- ama detail'i erken CRM duvarina cevirmez

## On yedinci okuma - `scope` metni yanina hangi 3-5 checklist maddesi eklenirse teslim kopmadan izlenebilir kalir?
Bu soru teslim zincirinin gercek darbozazini hedefliyor.
`DECISIONS/2026-04-22-delivery-scope-text-first.md` cizgisi net:
- kickoff checklist'i ayri alanlara bolunmeyecek
- tek `scope` metni icinde kalacak
- ama yari-yapili baslikli operasyon notu olacak

Buradan cikan kritik soru su:
- madem tam checklist metin icinde kalacak, Business Detail kartinda yanina hangi kisa durum satirlari konursa operator scope'u okumadan da kopmaz?

### 1) Referans ve kod bize ne diyor?
`REFERENCES/project-os-page.md` scope taslaginin bugun su basliklarla dogdugunu soyluyor:
- cekirdek teslimler
- domain ve yayin plani
- gerekli assetler
- gerekli erisimler
- opsiyonel ekler
- kickoff sonrasi operasyon adimlari
- yayin oncesi kontrol

Ama mevcut `app/businesses/[slugAndId]/page.tsx` gercegi de onemli:
- Business Detail su an henuz teklif ve kickoff kartlarini gostermuyor
- sayfa bugun temel kimlik + tarama paneli kadar hafif

Yani eklenecek checklist preview mutlaka kisa olmali.
Yoksa kart daha ilk adimda mini delivery paneline doner.

### 2) Uc model

#### K1) Uc satirlik cok hafif preview
- `asset`
- `erisim`
- `yayin`

Artisi:
- cok hafif
- karar kartini sisirmez

Eksisi:
- tekliften gelen kapsam teyidini kacirabilir
- teslim neden bekliyor sorusuna bazen eksik cevap verir

#### K2) Dort cekirdek satir + kosullu besinci satir
- `kapsam teyidi`
- `asset durumu`
- `erisim durumu`
- `yayin plani`
- varsa `ek bagimlilik`

Artisi:
- tekliften kickoff'a gecisi okunur kilir
- teslim kopmasina en cok neden olan 4 riski gorunur yapar
- opsiyonel ekleri sadece gerektiginde acar

Eksisi:
- iyi turetilmezse `kapsam teyidi` satiri `scope ozeti` ile tekrar edebilir

#### K3) Bes sabit satirlik zengin preview
- kapsam teyidi
- asset
- erisim
- opsiyonel ekler
- yayin oncesi kontrol

Artisi:
- daha tam gorunum verir

Eksisi:
- `yayin oncesi kontrol` kickoff aninda erken olabilir
- karti gorev listesine yaklastirir
- Business Detail'in hafif karar yuzeyi cizgisini zorlar

Ara yorum:
- su an en saglikli yol `K2`

### 3) Minimum 4 + 1 kosullu model neden daha dogru?
Cunku teslim kopmasi en sik su nedenlerle olur:
1. neyin teslim edilecegi son kez net degildir
2. gerekli gorsel/metin/icerik gelmemistir
3. gereken hesap veya panel erisimleri alinmamistir
4. domain / subdomain / yayin yolu net degildir
5. bazen de paket disi ama secilmis ek bir bagimlilik vardir

Bu liste delivery scope basliklariyla uyumlu, ama tum metni tekrar etmez.

### 4) O zaman satirlar tam olarak ne olmali?
V1 icin en mantikli cekirdek set bence su:

#### D1) `Kapsam teyidi`
Ornek durumlar:
- teyitli
- revize bekliyor
- son paket teyidi gerekli

Amac:
- teklifte secilen cozumun kickoff'ta dagilmasini onlemek

#### D2) `Asset durumu`
Ornek durumlar:
- logo ve 3 gorsel geldi
- gorseller eksik
- metin bekleniyor

Amac:
- yapimi gercekten baslatacak malzemenin olup olmadigini tek bakista gormek

#### D3) `Erisim durumu`
Ornek durumlar:
- maps erisimi geldi
- instagram sifresi yok
- domain panel erisimi gerekmiyor

Amac:
- teknik bloke nedenini saklamamak

#### D4) `Yayin plani`
Ornek durumlar:
- subdomain ile cikilacak
- ozel domain baglanacak
- once demo sonra canli

Amac:
- kickoff'in nereye vardigini netlestirmek

#### D5) `Ek bagimlilik` (yalniz gerekiyorsa)
Ornek durumlar:
- QR materyali basimi bekliyor
- ek kartvizit varyasyonu alinacak
- NFC kurulumu sonraki faz

Amac:
- opsiyonel eki sabit kolon yapmadan gorunur tutmak

### 5) Bilerek neleri disarida birakmali?
V1 preview'de bunlar olmamali:
- tum kickoff sonrasi operasyon adimlari
- yayin oncesi tam kontrol listesi
- owner / due date / status bazli task mantigi
- her asset icin ayri satir
- uzun notlar

Cunku bunlar text-first kararinin ruhunu bozar.

### 6) En buyuk tasarim riski ne?
`Kapsam teyidi` ile `scope ozeti`nin ayni seyi iki kez soylemesi.
Bunu onlemek icin kural su olmali:
- `scope ozeti` = ne teslim edilecek
- `checklist satirlari` = teslimi baslatmak icin ne hazir / ne eksik

### 7) Gecici net kanaat
Su an en mantikli kickoff karti preview modeli su gibi gorunuyor:
- ustte `scope ozeti`
- altinda 4 cekirdek satir:
  - kapsam teyidi
  - asset durumu
  - erisim durumu
  - yayin plani
- varsa 1 kosullu satir:
  - ek bagimlilik

Bu model:
- `text-first scope` kararina sadik kalir
- ama operatoru uzun metin okumadan bloke noktalarina indirir
- Business Detail'i delivery paneline cevirmeden kickoff resmini guclendirir

## On sekizinci okuma - `Y.Z` raporu ile `audit ozeti` arasindaki rol ayrimi tam nasil cizilmeli?
Bu soru kritik cunku bugun repo icinde iki farkli `ozet` dili var:
- discovery import ile acilan `audit.summary`
- scan panelinde uretilen `Y.Z raporu`

Eger bu ikisi ayni isi yaparsa iki ayri kart gereksizlesir.
Eger rolleri net ayrilirsa `girilen bilgi nasil sonuca donusur` zinciri cok daha okunur olur.

### 1) Kod ve kontrat ne diyor?
`app/api/discovery/import/route.ts` icindeki `buildSummary()` bugun su isi yapiyor:
- aday nereden acildi bilgisini yazar
- kategori, adres, telefon, website, yorum, skor gibi ham sinyalleri kisa metne doker
- yeni audit kaydina ilk factual ozet olarak girer

Bu dilin karakteri:
- kayit acilis ozeti
- daha cok `ne bulundu`
- daha az `simdi ne yapalim`

`Y.Z Report Contract` ise acikca su isi istiyor:
- tek bakista dijital gorunumu anlat
- guclu ve zayif sinyalleri sec
- kisa gorunum ozeti ver
- tek cumle `oncelikli aksiyon` soyle
- uzun audit raporuna donme

`app/api/businesses/[id]/yz-report/route.ts` daha da net:
- discovery sinyali
- agent scan
- apify scan
- audit summary
birlikte okunup tek derived karar raporu uretiliyor.

Yani sistemin niyeti zaten su gibi:
- `audit ozeti` = girdi
- `Y.Z raporu` = ciktiya yakin derived karar katmani

### 2) Uc model

#### R1) Ikisi de benzer kisa ozet olsun
Artisi:
- uygulamasi kolay

Eksisi:
- tekrar uretir
- operator hangi karta bakacagini anlamaz
- detail sayfada cift ozet duvari olusur

#### R2) Audit factual, Y.Z derived
- audit = bulunan durum ve operasyon girdisi
- Y.Z = butun sinyallerden sonra tek bakista karar ozeti

Artisi:
- veri -> yorum -> aksiyon zinciri net olur
- Project OS ve Business Detail rol ayrimi temiz kalir
- Y.Z karti scan panelinde dogal yerine oturur

Eksisi:
- audit tarafinda fazla yorum birikirse sinir yine bozulur

#### R3) Y.Z ana ozet olsun, audit geri planda kalsin
Artisi:
- operator tek kart gorur

Eksisi:
- audit -> teklif omurgasi zayiflar
- sistem ilk kayit acilis bilgisini ikinci plana iter
- teklif nedeninin kaynagi bulaniklasir

Ara yorum:
- su an en saglikli yol `R2`

### 3) O zaman audit ozetinin isi tam olarak ne?
Audit ozeti bence sunlarla sinirli olmali:
- kayit hangi sinyalle acildi
- hangi temel eksikler ilk bakista goruldu
- hangi hazirlik seviyesinde oldugu
- teklife neden zemin oldugu

Yani audit ozeti:
- daha yakin, daha operasyon girdisi
- daha cok factual ve kisa yorumlu
- teklif kartina baglanmaya uygun

Bu yuzden audit ozeti su soruya cevap vermeli:
- `Bu kaydi neden ciddiye aliyoruz ve hangi eksiklerden dolayi audit/teklif hattina sokuyoruz?`

### 4) Y.Z raporunun isi tam olarak ne?
Y.Z raporu sunlari yapmali:
- discovery + agent + apify + audit sinyallerini tek potada eritmek
- supheli eslesme riskini acikca gostermek
- dijital gorunumu operator diline cevirmek
- tek oncelikli aksiyon vermek

Bu yuzden Y.Z raporu su soruya cevap vermeli:
- `Tum mevcut sinyallere bakinca bu isletmede simdi en mantikli hareket ne?`

### 5) Ikisi arasindaki en saglikli ayrim cumlesi
Su ayrim calisiyor gibi gorunuyor:
- `Audit ozeti` = kaydin ilk operasyonel problemi ve teklif zeminini anlatir
- `Y.Z raporu` = tum tarama ve notlardan sonra operatorun simdiki kararini netlestirir

Kisa formda:
- audit = `neden bu kayit acildi?`
- Y.Z = `simdi ne yapalim?`

### 6) Business Detail icinde nereye otururlar?
En saglikli duzen bence su:
- Audit Snapshot karti = detail ust bolumde, teklif zincirine yakin
- Y.Z raporu = Hazirlik / Tarama paneli icinde, derived karar blogu olarak

Neden:
- audit snapshot operasyon zincirinin parcasi
- Y.Z raporu tarama ve karar turetme katmani
- ayni seviyede yan yana iki ana ozet karti olursa tekrar hissi artar

### 7) En buyuk risk ne?
Audit ozetine `oncelikli aksiyon` dili girerse rol bozulur.
Y.Z raporu da auditteki ham bulgulari tek tek tekrar ederse yine rol bozulur.

Bu yuzden kural sert olmali:
- auditte tek cumle yon olabilir ama tam karar karti dili olmamali
- `oncelikli aksiyon` alani Y.Z tarafinda kalmali
- teklifteki `neden bu paket` ise audit + Y.Z'den beslenebilir ama orada yeniden baglama oturur

### 8) Gecici net kanaat
Su an en mantikli rol ayrimi su:
- `Audit ozeti` = ilk operasyonel/factual zemin
- `Y.Z raporu` = derived karar ozeti

Bu modelle zincir soyle okunur:
- discovery/import -> audit ozeti
- hafif/ajan/apify tarama -> Y.Z raporu
- Y.Z + audit -> teklif gerekcesi
- teklif -> kickoff scope

Bu cizgi kullanicinin sordugu `girilen bilgi nasil sonuca donusur` sorusuna en temiz cevabi veriyor.

## On dokuzuncu okuma - `gorusme notu` nu audit kaydina mi, Business Detail operator notuna mi daha yakin konumlamak gerekir?
Bu soru repo gerceginde su an hafif bir karisiklik oldugunu gosteriyor:
- `Business Detail` bugun `Ek not / kisa ic not` diye aslinda `latestAudit.summary` gostermekte
- ama ayni `audit.summary` hem import ozeti hem de audit girdisi rolu tasiyor

Yani bugunku uygulama pratik ama kavramsal olarak temiz degil.

### 1) Referans ve veri modeli ne diyor?
`REFERENCES/business-detail-v1.md` notlar icin su cizgiye yakin:
- ana yuzey aksiyon odakli kalacak
- `ic not goruntuleme / ekleme` drawer/modal tarafi dusunuluyor
- sayfa not/task/message duvarina donmeyecek

Prisma veri modeli ise bugun ayri bir `note` veya `activity` nesnesi tutmuyor.
Sadece su cekirdekler var:
- `Business`
- `Audit.summary`
- `Offer`
- `DeliveryProject.scope`

Bu da bizi su soruya getiriyor:
- gorusme notu auditin parcasi mi, yoksa business seviyesinde gecici operator hafizasi mi?

### 2) Uc model

#### G1) Gorusme notu audit kaydinda kalsin
Artisi:
- yeni nesne acmadan ilerler
- teklif zincirine yakin durur

Eksisi:
- audit ozetini kirletir
- discovery importtan gelen factual acilis ozetini sonradan saha notlariyla karistirir
- ayni audit icinde `ne bulundu` ile `sahada ne konusuldu` ust uste biner

#### G2) Gorusme notu once Business Detail operator notu olsun
Artisi:
- audit karti temiz kalir
- saha konusmasi, muhatap bilgisi, itiraz, geri donus notu gibi daha hareketli icerik dogru yerde durur
- referanstaki `ic not` drawer/modal cizgisiyle uyumlu

Eksisi:
- ayri not modeli acilmazsa gecici olarak yine bir yere yazmak gerekir
- fazla serbest birakilirsa daginik kisa not copu birikebilir

#### G3) Ikiye bol: audit notu + gorusme notu
- audit icinde sadece audit etkili notlar
- business detail'de saha/operator notlari

Artisi:
- teorik olarak en dogru ayrim

Eksisi:
- V1 icin erken olabilir
- ayri veri modeli ve UI disiplini ister
- mini CRM'e kayma riski var

Ara yorum:
- su an en saglikli yol `G2`, ama `G3` mantigindan promotion kurali alinmali

### 3) Neden audit yerine operator notu daha dogru?
Cunku gorusme notu dogasi geregi daha oynak ve daha baglamsal:
- muhatap kimdi
- neye ilgi gosterdi
- neye itiraz etti
- neyi sonra gondermek lazim
- geri donus zamani ne

Bunlar audit kartinin cekirdek sorusu olan
- `dijital sorun ne`
- `paket yonu ne`
- `teklif zemini ne`
sorulariyla ayni sey degil.

Audit ozeti daha kalici ve operasyon zincirine bagli kalmali.
Gorusme notu ise saha hafizasi ve takip capasi olmali.

### 4) Ama tamamen ayri tutmak da riskli mi?
Evet.
Eger gorusme notu tamamen serbest kalir ve hic promote edilmezse, saha gorusmesinden cikan kritik kararlar audit/teklif zincirine yansimaz.
Bu yuzden en saglikli kural su:
- gorusme notu once operator notu olarak tutulur
- kalici operasyon etkisi olan kisimlar ilgili karta promote edilir

Promotion ornekleri:
- `website istemiyor, once maps duzeni istiyor` -> audit/teklif yonu guncellenir
- `ozel domain istiyor` -> teklif kartina girer
- `logo yok, fotograf cekilecek` -> kickoff scope'a girer
- `Sali tekrar ugranacak` -> operator notunda kalir

### 5) O zaman V1'de minimum gorusme notu yapisi ne olmali?
Ayri timeline acmadan bile gorusme notu su 4 kisa alani tasiyabilir:
- `muhatap / rol`
- `ihtiyac veya itiraz`
- `teyit edilen bilgi`
- `sonraki temas`

Bu yapi:
- sahada konusulanlari hafif toplar
- ama audit snapshot'in isini ustlenmez

### 6) Mevcut repo gercegine gore gecici sonuc ne?
Bugun ayri not modeli olmadigi icin `latestAudit.summary`nin gecici ic not gibi kullanilmasi anlasilir.
Ama bu kalici cizgi olmamali.
Cunku ayni alan su anda zaten:
- discovery import factual ozeti
- audit girdisi
- detail notu
olarak uc farkli isi ustleniyor.

Bu ileride mutlaka bulaniklik uretir.

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- `gorusme notu` auditten cok `Business Detail operator notu`na yakindir
- ama not icindeki kalici operasyon etkileri audit / teklif / kickoff kartlarina promote edilmelidir

Kisa formda:
- operator notu = `sahada ne konusuldu ve sirada ne var?`
- audit ozeti = `bu isletmenin dijital sorunu ve teklif zemini ne?`

Bu ayrim hem genel CRM savrulmasini engeller hem de audit alanini cop not deposuna cevirmez.

## Yirminci okuma - `Project OS` icindeki `bugun git` isareti tek satir derived neden ile mi, yoksa badge + kisa sebep kombosu ile mi daha okunur olur?
Bu soru cok kritik cunku `Project OS` ile `Business Detail` arasindaki rol farkini test ediyor.
`Project OS` coklu kayitli bir sicak is kuyrugu.
Burada saha sinyali gorunecekse, ilk bakista secilmeli ama ikinci discovery ekranina da donmemeli.

### 1) Mevcut repo gercegi ne?
Bugun `Project OS` mantigi ve `Businesses` listesi su alanlarla calisiyor:
- asama
- durum etiketi
- siradaki adim
- kisa ozet

`deriveProjectOsOverview()` tarafinda da kuyruk:
- stage onceligi
- stage icindeki status rank
- sonra alfabetik sira
uzerinden kuruluyor.

Yani bugun sistemde `bugun git` gibi fiziksel ziyaret odakli ayri bir derived sinyal yok.
Bu da iki seyi gosteriyor:
- boyle bir sinyal gelirse mevcut kartta cok dikkatli yerlestirilmeli
- yoksa Project OS kendi cekirdek sorusundan sapar

### 2) Uc model

#### P1) Tek satir derived neden
Ornek:
- `Website yok, segment uyumu guclu, bugun gidilebilir.`

Artisi:
- uygulamasi kolay
- yeni gorsel dil acmadan eklenebilir

Eksisi:
- kuyruk ekraninda ilk bakista secilmez
- `summary` ve `sıradaki adım` arasina karisabilir
- mobil listede gozden kolay kacar

#### P2) Sadece badge
Ornek:
- `Bugun git`
- `Uzaktan ilerlet`
- `Beklet`

Artisi:
- taranabilirlik cok yuksek
- kuyruk ekranina iyi uyar

Eksisi:
- nedenini soylemez
- operator ayni satirda karar mantigini gormez
- badge sayisi artarsa anlami zayiflar

#### P3) Badge + kisa sebep kombosu
Ornek:
- badge: `Bugun git`
- kisa sebep: `website yok, telefon var, segment uyumu net`

Artisi:
- kuyruk taranabilir kalir
- neden bir bakista gorunur
- detail'e tiklamadan once yeterli saha mantigi verir

Eksisi:
- kotu tasarlanirsa karti kalabaliklastirir
- her kayitta acilirsa ikinci discovery tablosu hissi yaratir

Ara yorum:
- su an en saglikli yol `P3`, ama yalniz kosullu gosterimle

### 3) Neden tek satir yeterli degil?
Cunku Project OS ve Businesses listesi coklu kayit tarama yuzeyi.
Bu tur yuzeyde ilk taranan sey metin degil, isaret ve hiyerarsidir.

Bugun bile liste satirlarinda operator ilk olarak su alanlari tarar:
- isim
- hat asamasi
- siradaki adim

`bugun git` sinyali sadece uzun bir cumle olarak gelirse,
- `summary` icinde erir
- `siradaki adim` ile karisabilir
- ziyaret secimi hiz kazandirmak yerine yeni okuma yuku getirir

### 4) Neden sadece badge de yetmez?
Cunku saha karari stage gibi objektif bir veri degil.
Derived karardir.
Bu yuzden `neden` gorunmezse operator sunu sorar:
- niye bugun git?
- niye uzaktan ilerlet?
- niye beklet?

Sebep gorunmezse yine detail'e inmek zorunda kalir.
O zaman Project OS'un hiz avantaji eksik kalir.

### 5) O zaman en saglikli V1 formu ne?
Bence V1 su olmali:
- yalnız ziyaret icin anlamli adaylarda rozet ciksin
- rozetin saginda 1 kisa derived sebep satiri olsun
- bu satir maksimum 60-90 karakterlik olsun
- primary aksiyon alaninin yerini almasin

Yani hiyerarsi su olmali:
1. stage / next action hala ana operasyon sinyali
2. `bugun git` badge'i ikincil saha sinyali
3. kisa sebep ise badge'in aciklamasi

Bu cizgi Project OS'u bozmaz, sadece saha secimini hizlandirir.

### 6) Hangi badge seti daha guvenli?
Bence V1 icin 3'lu set yeterli:
- `Bugun git`
- `Uzaktan ilerlet`
- `Beklet`

Neden:
- fazla granular durum seti kuyruk ekranini sisirir
- `aranacak`, `tekrar ugranacak`, `muhatap yoktu` gibi detaylar Business Detail/operator notu seviyesinde daha dogru

### 7) En buyuk risk ne?
Project OS'un ikinci discovery ekranina donmesi.
Bunu onlemek icin kurallar sert olmali:
- badge herkeste gorunmez, yalniz ziyaret acisindan anlamli adaylarda gorunur
- sebep 1 kisa satiri gecmez
- badge stage siralamasini degistiren ana mekanizma olmaz
- detay mantik Business Detail'de acilir

### 8) Gecici net kanaat
Su an en mantikli cozum:
- `badge + kisa sebep` kombosu
- ama kosullu ve hafif

Kisa formda:
- `tek satir neden` = zayif, kolay kaybolur
- `sadece badge` = hizli ama yetersiz
- `badge + kisa sebep` = Project OS icin en dengeli V1

Bu da sunu destekliyor:
- `Project OS` = secimi hizlandiran kuyruk
- `Business Detail` = karar mantigini acan tek kayit duvari

## Yirmi birinci okuma - `sahada ilk acilis` satiri Y.Z raporundan mi, audit snapshot'tan mi, yoksa ayri bir derived saha mantigindan mi turetilmeli?
Bu soru kucuk gorunuyor ama aslinda saha akisinin en hassas parcalarindan biri.
Cunku `ilk acilis` satiri kotu kaynaktan turetilirse:
- fazla teknik kalir
- fazla genel kalir
- ya da sahadaki gercek konusma yerine ekranda guzel duran bir slogan olur

### 1) Mevcut repo gercegi ne diyor?
Bugun elimizde uc yakin kaynak var:
- `audit.summary` = kaydin ilk operasyonel/factual zemini
- `Y.Z raporu` = derived karar ve `oncelikli aksiyon`
- `Business Detail` icindeki karar promptu = Y.Z + agent scan + discovery + ic not birlesimiyle dis GPT promptu uretme hazirligi

Buradan su net:
- sistem zaten `tek bakista ne yapalim` kararini Y.Z tarafina itiyor
- ama sahada soylenebilecek ilk cumle icin henuz ozel bir kontrat yok

### 2) Uc model

#### A1) `ilk acilis` Y.Z raporundan turetilsin
Artisi:
- son ve butunlesik karar katmanina yaslanir
- tarama sinyallerini bir araya getirir

Eksisi:
- Y.Z kontrati `konusma acilisi` icin yazilmamis
- `oncelikli aksiyon` ile `ilk acilis` ayni sey degil
- sahada soylenebilir cumle yerine operator karari dilinde kalabilir

#### A2) `ilk acilis` audit snapshot'tan gelsin
Artisi:
- daha somut ve soruna yakin olur
- teklif zeminiyle uyumlu kalir

Eksisi:
- audit dili genelde `eksik` ve `tespit` odaklidir
- insanla konusma cumlesine dogal donusmeyebilir
- discovery importtan gelen factual audit ozeti sahada cok mekanik kalabilir

#### A3) `ilk acilis` ayri bir derived saha mantigindan turetilsin
Girdiler:
- auditteki ana eksik veya paket yonu
- Y.Z raporundaki oncelikli aksiyon
- operator notundaki muhatap / itiraz bilgisi varsa o

Artisi:
- sahaya ozel bir dil uretilir
- audit ile Y.Z'nin rolleri bozulmaz
- konusma cumlesi tam ihtiyacina gore sinirli kalir

Eksisi:
- yeni bir derived kural gerektirir
- kontrol edilmezse yapay ve tekrarci olabilir

Ara yorum:
- su an en saglikli yol `A3`

### 3) Neden Y.Z tek basina yetmiyor?
Cunku Y.Z raporunun isi:
- genel durum
- guclu / zayif sinyaller
- dijital gorunum ozeti
- tek oncelikli aksiyon

Bu kontrat iyi bir `karar` kontrati.
Ama iyi bir `konusma acilisi` kontrati degil.

Ornek fark:
- `Oncelikli aksiyon: website vitrini teklifi hazirlanabilir`
Bu sahada soylenebilir bir ilk cumle degil.
En fazla operatora yol gosterir.

### 4) Neden audit tek basina yetmiyor?
Audit daha cok `neden bu kayit` sorusuna cevap veriyor.
Bu da sahadaki ilk cumleyi bazen fazla sert yapar.

Ornek risk:
- `website yok, telefon eksik, yorum dusuk`
Bu bulgular acilisin girdisi olabilir.
Ama bunlari dogrudan soylenen cumleye cevirmek,
- yargilayici
- mekanik
- soguk
olabilir.

### 5) O zaman en saglikli V1 mantigi ne?
Bence `ilk acilis` icin ayri ama cok hafif bir derived saha kuralina ihtiyac var.
Bu kural su sekilde calisabilir:
- `audit` ana problemi verir
- `Y.Z` simdiki yonu verir
- `operator notu` varsa ton ve muhatap bilgisini duzeltir
- cikis tek cumlelik audit-first ama insanla konusulabilir bir acilis olur

Yani akista:
- audit = ne sorun var
- Y.Z = simdi ne yapalim
- saha derived = bunu ilk cumlede nasil acariz

### 6) Bu satirin dil kurali ne olmali?
V1 icin bence su kurallar net olmali:
- tek cumle
- teknik jargon yok
- suclayici dil yok
- paket satmaya abanma yok
- once gozlem ve fayda dili
- sonra gerekirse ince teklif koprusu

Ornek cizgi:
- `Sizi kisaca dijital gorunum tarafinda inceledim, isterseniz 2 dakikada nerede en hizli toparlanma olur gosterebilirim.`

Bu dil ne auditin ham bulgusu kadar sert ne de Y.Z aksiyonu kadar operator-ici kalir.

### 7) En buyuk risk ne?
Yeni derived saha mantigi ayrica prompt benzeri bir motor haline gelirse gereksiz buyur.
Bunu onlemek icin:
- sadece tek satir uretsin
- segmente gore hafif ton farki alabilir ama tam script bankasina donmesin
- detail ekraninda yardimci satir olarak kalsin
- operator isterse duzenleyebilsin

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `ilk acilis` ne Y.Z'den dogrudan alinmali ne de auditten kopyalanmali
- `audit + Y.Z + varsa operator notu`ndan beslenen ayri bir derived saha satiri olmali

Kisa formda:
- audit = problem kaynagi
- Y.Z = karar kaynagi
- ilk acilis = saha iletisimi icin derived ceviri

Bu model hem kart rollerini bozmaz hem de sahada gercekten kullanilabilecek bir cumle uretir.

## Yirmi ikinci okuma - `neden bu paket` satiri Y.Z/audit turetimi mi olmali, yoksa teklifte operatorun kisa gerekce alani mi acilmali?
Bu soru teklif kartinin omurgasini etkiliyor.
Cunku `paket`, `tutar`, `domain`, `ekler` gorunse bile, operator su soruyu yine sorar:
- neden Paket 1 degil de Paket 2?
- neden simdi bu cozum?

### 1) Mevcut repo gercegi ne diyor?
Bugun offer veri modeli su alanlari tutuyor:
- `packageName`
- `amountTry`
- `addonKeys`
- `domainPreference`
- `customDomain`

Yani bugun offer kaydinda ayri bir `gerekce` alani yok.

Ama hem `OFFERS.md` hem `PLAYBOOKS/audit-offer-delivery.md` su cizgiyi acikca istiyor:
- her teklif audit cikisina baglanir
- teklifin nedenini netlestir
- hangi eksigi kapattigi anlasilsin

Demek ki ihtiyac gercek.
Sadece veri modeline henuz dogrudan inmemis.

### 2) Uc model

#### N1) Tam derived gerekce
- `audit ozeti`
- `Y.Z raporu`
- secili paket
birlesiminden 1-2 satir uretilir

Artisi:
- yeni alan acmadan ilerler
- teklifi audit/Y.Z zincirine baglar
- V1'de formu buyutmez

Eksisi:
- upstream veri degisirse teklif gerekcesi de oynayabilir
- operatorun bilerek sectigi ticari vurgu kaybolabilir
- tarihsel teklif mantigi sonradan bulanabilir

#### N2) Teklifte operatorun kisa gerekce alani olsun
- `neden bu paket` elle yazilir

Artisi:
- karar kaydi sabitlenir
- teklifi acan kisi niyeti dogrudan kayda gecer
- sonra audit/Y.Z degisse bile teklif anindaki mantik korunur

Eksisi:
- yeni alan + form + disiplin ister
- kotu kullanilirsa pazarlama kopyasina veya uzun nota doner
- teklif ekranini erken buyutur

#### N3) Derived oner, operator gerekirse override etsin
- varsayilan 1 satir gerekce audit/Y.Z'den gelsin
- operator isterse kisa override yapsin

Artisi:
- V1 sadeligini korur
- teklif anindaki bilincli farklari da tasir
- derived zincir ile insan karari arasinda denge kurar

Eksisi:
- iki kaynakli mantik getirir
- iyi kural yazilmazsa hangi metnin kanonik oldugu karisir

Ara yorum:
- uzun vadede en saglikli model `N3`
- ama bugunku repo gerceginde V1 baslangici `derived-first` olmak zorunda gorunuyor

### 3) Neden salt operator alaniyla baslamak riskli?
Cunku bugun panelin gucu sadelik.
Teklife yeni `neden bu paket` textarea'si eklemek kolay ama beraberinde su riskleri getirir:
- her teklifte uzun aciklama beklenir
- operator ayni seyi farkli dillerle yazar
- teklif karti hizli karar yuzeyi olmaktan cikabilir

Ayrica mevcut omurga zaten su zinciri kurmus durumda:
- audit sorunu bulur
- Y.Z simdiki aksiyonu netlestirir
- teklif cozumu secer

Bu zincir varken ilk asamada derived gerekce dogal bir baslangic.

### 4) Neden salt derived de eksik kalabilir?
Cunku paket secimi bazen yalniz teknik eksikten dogmaz.
Sahada su farklar olabilir:
- butce siniri
- muhatabin direnci
- once hafif baslayip sonra buyutme karari
- segmente gore ticari oncelik

Bunlar audit + Y.Z'de tam temsil edilmeyebilir.
Yani tamamen derived metin bazen `dogru ama eksik` kalir.

### 5) O zaman en saglikli V1 cizgisi ne?
Bence V1 icin su daha guvenli:
- `neden bu paket` satiri once audit + Y.Z'den turetilsin
- ama bu satir Business Detail / teklif kartinda `operator gerekirse duzenler` cizgisine acik kalsin
- bu override ayri genis alan degil, kisa 1-2 satirlik kontrollu alan olmali

Boylece:
- veri -> yorum -> teklif zinciri korunur
- operatorun sahadaki gercek karari da tamamen kaybolmaz

### 6) Kural nasil cizilmeli?
Bence su sert ayrim iyi calisir:
- varsayilan kaynak = audit + Y.Z
- override yalniz paket secimini degistiren gercek saha nedeni varsa kullanilir
- override pazarlama diliyle yazilmaz
- maksimum 1-2 satir

Ornek override sebepleri:
- `isletme once dusuk butceyle temel vitrin istiyor`
- `QR yorum akisina hemen ihtiyac var, bu nedenle Paket 2 secildi`
- `Instagram duzeni sahada onceliklendirildi, Paket 3 buna gore acildi`

### 7) En buyuk risk ne?
Iki farkli gerekce kaynagi acip hangisinin kanonik oldugunu bulandirmak.
Bunu onlemek icin kural su olmali:
- override yoksa kanonik gerekce derived metindir
- override varsa teklif kartinda gorunen ve saklanan birincil gerekce odur
- audit ve Y.Z yine kaynak kalir, ama teklif kararini override metni temsil eder

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `neden bu paket` icin cekirdek kaynak audit + Y.Z turetimi olmali
- ama uzun vadede tamamen kilitlenmemek icin kisa operator override kapisi acik tutulmali

Kisa formda:
- V1 baslangic = `derived-first`
- kalici guvenli model = `derived + kisa override`

Bu cizgi hem mevcut veri modeline uyar hem de teklif kartini gereksiz form duvarina cevirmez.

## Yirmi ucuncu okuma - kickoff kartindaki `kapsam teyidi` satiri teklif durumundan mi, delivery notundan mi, yoksa ikisinin kesisiminden mi turetilmeli?
Bu soru teslim zincirinin en kolay bulaniklasan noktasina vuruyor.
Cunku kickoff kartinda hem `scope ozeti` var, hem de bir `kapsam teyidi` satiri dusunuyoruz.
Eger bunun kaynagi yanlis secilirse ayni sey iki kez yazilir ya da daha kotusu teklif ile teslim birbirinden kopar.

### 1) Mevcut repo gercegi ne diyor?
Bugun veri modeli ayri bir `kapsam teyidi` alani tutmuyor.
Elde iki temel kaynak var:
- `offer` kaydi: paket, tutar, domain, ekler
- `delivery.scope`: tekliften tureyen yari-yapili kickoff metni

`DECISIONS/2026-04-22-delivery-scope-text-first.md` cizgisi de net:
- kickoff checklist'i tek `scope` metni icinde kalacak
- ayri operator alanlarina bolunmeyecek

Bu yuzden `kapsam teyidi` satiri icin aslinda veri degil, derived yorum lazim.

### 2) Uc model

#### KT1) Sadece teklif durumundan turet
Ornek mantik:
- teklif approved ise `teyitli`
- sent ise `cevap bekliyor`
- draft ise `net degil`

Artisi:
- cok basit
- ticari onay mantigina dayanir

Eksisi:
- teslime inerken scope'un revize olup olmadigini gormez
- teklif onayli olsa bile kickoff icin eksik netlik olabilir
- gercek operasyon hazirligini fazla iyimser gosterebilir

#### KT2) Sadece delivery note/scope'tan turet
Ornek mantik:
- scope metninde teyit dili varsa `teyitli`
- belirsizse `revize bekliyor`

Artisi:
- teslimin fiili baslangicina daha yakin durur

Eksisi:
- teklif kaynagindan kopabilir
- scope metni operatorun yazim stiline fazla bagli kalir
- ticari karar ile operasyon karari arasindaki bag zayiflar

#### KT3) Teklif + delivery kesisiminden turet
Mantik:
- teklif, secilen cozumun resmi kaynagi
- delivery scope, kickoff anindaki operasyonal somutlama
- `kapsam teyidi` satiri ikisinin uyumuna bakar

Artisi:
- hem ticari karar hem teslim baslangici korunur
- kartta gercek riski daha dogru gosterir
- `scope ozeti` tekrarina dusmeden yorum katmani saglar

Eksisi:
- derived kural biraz daha dikkat ister
- iki kaynak uyumsuzsa operatora net dil secmek gerekir

Ara yorum:
- su an en saglikli yol `KT3`

### 3) Neden teklif tek basina yetmiyor?
Cunku teklif `ne satildi` sorusunu cevaplar.
Ama kickoff kartindaki `kapsam teyidi` daha dar bir soru sorar:
- `satilan seyin bu kickoff scope'u icinde dogru somutlandigindan emin miyiz?`

Ornek risk:
- teklifte Paket 2 secildi
- ama kickoff scope'unda Yandex/Apple veya QR akisina dair netlik yok

Bu durumda teklif onayli olsa bile `kapsam teyidi` tam olmayabilir.

### 4) Neden delivery note tek basina yetmiyor?
Cunku `scope` metni text-first ve esnek.
Bu iyi ama tek basina kanonik ticari kaynak degil.

Operator scope'a bir sey yazmis olabilir,
ama bu yazinin secilen paket ve eklerle tam uyumlu olup olmadigi yine teklife bakmadan anlasilmaz.

Yani delivery note bize suyu soyluyor:
- `nasil baslayacagiz`
Ama tek basina suyu soylemez:
- `bu baslangic satilan cozumle ayni mi?`

### 5) O zaman en saglikli V1 mantigi ne?
Bence `kapsam teyidi` satiri su kesisim mantigiyla turetilmeli:
- offer = kanonik cozum secimi
- delivery.scope = kickoff somutlamasi
- satir = bu ikisi birbirini tutuyor mu?

Bu durumda V1 degerleri su olabilir:
- `Teyitli` = paket ve scope uyumlu, belirgin kopukluk yok
- `Revize bekliyor` = scope'ta tekliften sapma veya eksik netlik var
- `Son paket teyidi gerekli` = kickoff var ama teklif zemini tam kapanmamis / son secim bulanık

### 6) Bu satir `scope ozeti` ile nasil ayrisir?
Bu cok onemli.
Kural su olmali:
- `scope ozeti` = ne teslim edilecek / nasil baslayacak
- `kapsam teyidi` = bunun teklif kaydiyla uyum guveni ne durumda

Yani biri icerik,
digeri uyum/güven yorumu.

### 7) En buyuk risk ne?
`kapsam teyidi` satirinin teslimat durumuyla karismasi.
Ornegin:
- kickoffta olmak baska sey
- kapsam teyitli olmak baska sey

Bu yuzden `kickoff / yapim / yayinda` zaten durum satirinda kalmali.
`kapsam teyidi` ise yalniz uyum ve netlik yorumu olmali.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- kickoff kartindaki `kapsam teyidi` ne yalniz tekliften ne de yalniz delivery note'tan turetilmeli
- `offer + delivery.scope` kesisiminden derived bir guven/netlik satiri olmali

Kisa formda:
- teklif = kanonik cozum kaynagi
- scope = operasyonel baslangic kaynagi
- kapsam teyidi = ikisinin uyum yorumu

Bu model hem text-first delivery kararina sadik kalir hem de tekliften kopuk bir kickoff karti uretmez.

## Yirmi dorduncu okuma - audit ozetindeki `paket yonu` ile Y.Z raporundaki `oncelikli aksiyon` catistiginda hangi kaynak birincil sayilmali?
Bu soru tek cizgilik bir `hangi kaynak kazansin?` sorusu gibi gorunuyor.
Ama aslinda iki farkli karar katmanini ayirmayi gerektiriyor:
- audit = teklif omurgasina giris ve paket zemini
- Y.Z = simdiki operator aksiyonu

Eger bunu tek kazananli kurarsak ya audit fazla zayiflar ya da Y.Z raporu sadece dekor olur.

### 1) Kod ve kanonik cizgi ne diyor?
`OFFERS.md` cok net:
- her teklif audit cikisina baglanir
- audit cikisinda hangi paketin uygun oldugu netlesir

`Y.Z Report Contract` ise farkli bir sey istiyor:
- tek bakista dijital gorunumu anlat
- tek cumle `oncelikli aksiyon` ver

Ayrica `app/api/businesses/[id]/yz-report/route.ts` Y.Z raporunu uretirken `auditSummary`yi de girdi olarak veriyor.
Yani Y.Z auditin ustune gelen derived bir yorum katmani.

Buradan ilk kritik sonuc cikiyor:
- Y.Z auditin yerine gecen ana teklif kaynagi degil
- audit de Y.Z'nin simdiki aksiyon rolunu tek basina ustlenmiyor

### 2) Uc model

#### C1) Audit her zaman birincil olsun
Artisi:
- teklif omurgasi net kalir
- paket secimi auditten kopmaz

Eksisi:
- Y.Z'nin `once eslesme dogrulansin` gibi guvenlik/temizlik aksiyonlari ikinci plana duser
- operator erken teklife kosabilir

#### C2) Y.Z her zaman birincil olsun
Artisi:
- en guncel ve butunlesik yorum kazanir
- supheli eslesme gibi kritik durumlar yuksekte kalir

Eksisi:
- auditin teklif girdisi rolu zayiflar
- paket yonu surekli degisen derived karar gibi hissedilir
- teklif omurgasi bulanabilir

#### C3) Katmanli oncelik modeli
- `Y.Z` once `teklife gecilir mi, yoksa once dogrulama/ek tarama mi gerekir?` sorusunu belirler
- `audit` ise `teklife geciliyorsa hangi paket yonu mantikli?` sorusunu belirler

Artisi:
- iki kaynagin rolu temiz ayrilir
- hem guvenlik/temizlik hem ticari omurga korunur
- veri -> yorum -> teklif zinciri daha dogru okunur

Eksisi:
- tek satir karar bekleyenler icin ilk bakista daha soyut gelebilir
- UI'da bu ayrim iyi anlatilmazsa karisik gorunebilir

Ara yorum:
- su an en saglikli yol `C3`

### 3) Neden audit tek basina kazanamaz?
Cunku auditin paket yonu dogru olsa bile,
Y.Z bazen daha ust seviye bir fren veya siralama karari verebilir.

Ornek:
- audit: `Paket 1 uygun`
- Y.Z: `once maps eslesmesi dogrulansin`

Bu durumda paket yonu silinmez.
Ama operatorun simdiki aksiyonu teklif acmak degil, once eslesmeyi temizlemektir.

Yani Y.Z burada paketi degil,
`pakete gecis zamanini` durdurur.

### 4) Neden Y.Z tek basina kazanamaz?
Cunku Y.Z kontrati teklif yapisini korumak icin yazilmamis.
`oncelikli aksiyon` bazen su tipte olabilir:
- `website vitrini teklifi hazirlanabilir`
- `audit icin uygun, teklif omurgasina gecilebilir`

Bu cumleler yon verir.
Ama Paket 1 mi Paket 2 mi sorusunu tek basina tasimaz.
Bu karar zaten audit omurgasina daha yakin.

Yani Y.Z bize `hangi is sirada`yi daha iyi soyler,
audit ise `hangi cozum uygun`u daha iyi soyler.

### 5) O zaman catismada pratik kural ne olmali?
Bence su sirali kural calisir:

#### Kural 1
Eger Y.Z `supheli eslesme`, `veri yetersiz`, `once dogrulansin`, `ek tarama gerekli` gibi bir aksiyon veriyorsa,
bu islem paketin onune gecer.

Yani:
- package direction korunur
- ama uygulamaya alinmaz
- once temizlik/dogrulama yapilir

#### Kural 2
Eger Y.Z teklife gecise izin veren bir aksiyon veriyorsa,
paket yonu icin audit birincil kaynak olur.

Yani:
- `website vitrini teklifi hazirlanabilir` -> auditteki Paket 1/2/3 yonu okunur
- Y.Z teklife gecisi acan katman olur, paketi secen degil

#### Kural 3
Eger auditteki paket yonu ile sahadaki gercek durum farkliysa,
bu fark operator override veya audit guncellemesiyle kayda alinmali,
Y.Z'yi gizli paket motoruna cevirmemeli.

### 6) En saglikli kisaltma cumlesi ne?
Bence su formul temiz:
- `Y.Z aksiyonu sirayi belirler, audit paket yonunu belirler.`

Biraz daha acik hali:
- `Y.Z` = gecit / fren / siradaki dogru hareket
- `audit` = teklife gecildiginde secilecek cozum omurgasi

### 7) En buyuk risk ne?
Y.Z raporundaki her aksiyonu paket secimi yerine koymak.
Bu olursa:
- audit anlamsizlasir
- teklif omurgasi derived dalgalanmaya acilir
- paket sayisi ve anlatimi daha kolay savrulur

Diger risk de auditteki paket yonunu mutlak alip,
Y.Z'nin supheli eslesme veya eksik veri uyarilarini gormezden gelmek.
Bu da erken ve yanlis teklif riskini artirir.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `birincil` tek kaynak secmek yerine katmanli oncelik modeli kullanilmali
- Y.Z `simdi teklife gecilir mi, yoksa once dogrulama mi gerekir?` sorusunda birincil
- audit `teklife gecildiyse hangi paket yonu uygun?` sorusunda birincil

Kisa formda:
- `Y.Z = aksiyon gecidi`
- `audit = paket omurgasi`

Bu cizgi hem teklif omurgasini korur hem de Y.Z raporunun gercek degerini dogru yere koyar.

## Yirmi besinci okuma - operator notu timeline yerine tek guncel not mantiginda mi kalmali, yoksa son 3 temas ozeti kadar hafif bir gecmis gostermek mi daha guvenli olur?
Bu soru not sistemi ile timeline sistemi arasindaki siniri test ediyor.
Cunku Business Detail referanslarinda iki cizgi ayni anda var:
- `generic note wall` istenmiyor
- ama `compact activity timeline` ve `kisa gecmis` referans olarak acik

Yani soru sadece `not olsun mu olmasin mi` degil.
Asil soru su:
- aktif karar yuzeyinde ne gosterelim?
- referans alaninda ne kadar gecmis tutalim?

### 1) Referanslar ne diyor?
`REFERENCES/business-detail-v1.md` su cizgiyi veriyor:
- sayfa task/note/timeline duvarina donmemeli
- ana ekran ustu aksiyon odakli kalmali
- alt kisim referans ve gecmis alani olabilir
- activity timeline V1'de derived/ref destek alani olmali

Derin arastirma rewrite spec tarafinda da cizgi benzer:
- generic notes wall istenmiyor
- compact timeline kabul edilebilir
- operator summary ayri ama kisa kalmali

Bu bize su yonu gosteriyor:
- ana yuzeyde tek guncel operator ozetinin gucu yuksek
- ama hic gecmis olmamasi da temasi koparabilir

### 2) Uc model

#### O1) Sadece tek guncel not
Artisi:
- cok sade
- ana karar yuzeyini temiz tutar
- generic note wall riskini en cok azaltir

Eksisi:
- son temasin neden ozetlendigi kaybolabilir
- bir not guncellenince onceki kisa baglam yok olur
- sahada `en son ne olmustu` sorusu icin tekrar hafizaya yuk bindirir

#### O2) Ana kartta son 3 temas ozeti
Artisi:
- hafif gecmis verir
- son temas zinciri daha okunur olur

Eksisi:
- detail ust bolumde hizla mini timeline etkisi yaratir
- audit/teklif/kickoff kartlarinin dikkatini yer
- ayni bilgiyi sonra timeline'da tekrar etme riski artar

#### O3) Tek guncel not + altta cok hafif gecmis
- ana kartta yalniz `guncel operator notu`
- referans alaninda en fazla son 3 temas ozeti

Artisi:
- ana karar yuzeyi temiz kalir
- hafiza kaybi riski azalir
- compact timeline cizgisiyle uyumlu

Eksisi:
- iki katmanli gosterim ister
- iyi sinir cizilmezse ayni not iki yerde tekrar eder

Ara yorum:
- su an en saglikli yol `O3`

### 3) Neden sadece tek not yeterli degil?
Cunku operator notu dogasi geregi hareketlidir.
Bir not guncellendiginde su bilgiler kaybolabilir:
- son temas ne zamandi
- neye itiraz edilmisti
- geri donus sozu verilmis miydi

Ozellikle saha akisinda `en son ne oldu` sorusu kisa da olsa hafiza ister.
Hic gecmis yoksa operator notu fazlaca overwrite edilen beyaz tahtaya doner.

### 4) Neden son 3 notu ana karta almak da riskli?
Cunku o zaman Business Detail ust bolumu yavas yavas su yone kayar:
- audit karti
- Y.Z karti
- ziyaret karti
- teklif karti
- kickoff karti
- bir de temas gecmisi

Bu da ana soruyu bozar:
- `simdi ne yapmaliyim?`

Gecmis faydali olsa bile ana karar katmanina cikinca ilk bakis hizini dusurur.

### 5) O zaman en saglikli V1 cizgisi ne?
Bence su ayrim temiz:
- ana kartta `tek guncel operator notu`
- alt referans alanda `son 3 temas ozeti` veya compact timeline parcasi

Boylece:
- operatorun simdiki baglami tek satirda gorunur
- ama hemen alt/ref alanda hafif hafiza korunur
- generic CRM message history'e donulmez

### 6) Bu iki katman nasil ayrismali?
Kural su olmali:
- `guncel operator notu` = su anda sahada veya takipte ne bilmem gerekiyor?
- `son 3 temas ozeti` = bugunku notun nasil olustugunu aciklayan kisa referans

Yani gecmis karti yorum duvari degil,
3 maddelik olay izi olmali.

Ornek temas ozeti alanlari:
- tarih/zaman
- muhatap veya kanal
- tek cumle sonuc

### 7) En buyuk risk ne?
Ayni seyin hem operator notunda hem gecmiste tekrar etmesi.
Bunu onlemek icin:
- operator notu serbest yigin degil, derlenmis bugunluk ozet olmali
- gecmis ise ham uzun not degil, tek satirlik ozet olaylar olmali
- son 3'u asan tarihce ana yuzeye tasinmamali

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- Business Detail ana karar yuzeyinde `tek guncel operator notu` kalmali
- ama hafif hafiza kaybi olmamasi icin alt/ref alanda `son 3 temas ozeti` kadar compact gecmis tutulabilir

Kisa formda:
- `main` = tek guncel not
- `reference` = son 3 temas ozeti

Bu model hem not coplugunu engeller hem de sahada kopukluk riskini azaltir.

## Yirmi altinci okuma - `bugun git` badge'i Project OS ana kuyrugunda mi, yoksa yalniz Businesses listesinde filtrelenebilir ikincil isaret olarak mi daha guvenli baslar?
Bu soru `badge nasil gorunsun?` sorusundan daha kritik.
Cunku asil konu su:
- saha secim sinyalini ilk hangi yuzeye koyarsak urunu daha az bozariz?

### 1) Mevcut yuzey rolleri ne diyor?
Kod ve referanslar su ayrimi guclendiriyor:
- `Project OS` = gunun sicak is kuyrugu, `audit -> teklif -> teslimat -> bakim` hattinda simdi ne hareket etmeli?
- `Businesses` = tum kayitlari toplu gorup filtreleyerek uygun kaydi bulma yuzeyi
- `Home` = yon gosterici, karar duvari degil

`Project OS` referansi acikca diyor ki:
- siradaki isler kuyrugu aksiyon odakli kalmali
- sayfa form/rapor/tablo duvarina donmemeli
- Business Detail'in ikinci kuyruk ekrani olmamali

`Businesses` sayfasi ise bugun zaten su rollere daha yakin:
- toplu tarama
- arama / filtreleme
- stage'e gore daraltma
- kaydi detaya tasima

Bu yuzden iki yuzey ayni degil.
`bugun git` sinyali de once bu rol farkina gore yerlestirilmeli.

### 2) Uc model

#### B1) Ilk gunden Project OS ana kuyruguna koy
Artisi:
- gunun sicak is ekraninda saha sinyali direkt gorunur
- operator tek ekranda daha fazla sey gorur

Eksisi:
- Project OS'un audit/teklif/teslim odagini bozar
- ziyaret secimi ile operasyon kuyru gu karisir
- ikinci discovery hissi riski yuksek

#### B2) Once yalniz Businesses listesine koy
Artisi:
- toplu tarama ve secim yuzeyine daha iyi uyar
- filtre/arama mantigi ile dogal bag kurar
- Project OS'u bozmadan saha sinyalini test etmeye izin verir

Eksisi:
- operator iki yuzey arasinda gidip gelebilir
- `gunun sicak isi` ile `bugun gidilecek kayit` ayni ekranda birlesmez

#### B3) Businesses'ta baslat, sonra sinyal olgunlasirsa Project OS'a terfi ettir
Artisi:
- en dusuk riskli ogrenen yol
- once secim ekraninda test edilir
- gercek fayda gorulurse Project OS'a kontrollu tasinabilir

Eksisi:
- iki asamali urun kuralı gerektirir
- ilk bakista biraz dolayli hissedilebilir

Ara yorum:
- su an en saglikli yol `B3`

### 3) Neden Project OS'ta hemen baslamak riskli?
Cunku Project OS'un cekirdek sorusu su:
- `hangi kayit hangi asamada ve simdi hangi operasyon hareketi olmali?`

`bugun git` ise farkli bir soru soruyor:
- `hangi kayit saha ziyareti icin aday?`

Bu ikisi akraba ama ayni degil.
Ilk asamada ziyaret sinyalini ana kuyruga koyarsak su risk var:
- teklif bekleyen is mi daha sicak,
yoksa bugun gidilebilecek aday mi daha sicak,
aynı listede karisir
- stage sirasinin ustune ikinci oncelik mantigi biner
- Project OS, audit-teklif-teslim kuyrugu olmaktan uzaklasir

### 4) Neden Businesses sayfasi daha guvenli baslangic?
Cunku `Businesses` zaten secim ve filtreleme yuzeyi.
Bugun sayfada su alanlar var:
- arama
- segment filtreleri
- durum filtreleri
- hat asamasi filtreleri
- detaya gecis

Yani `bugun git` burada su rollerde ise yarayabilir:
- filtrelenebilir ikincil isaret
- liste satirinda yardimci sinyal
- saha secim modu acildiginda hizlandirici badge

Bu ekleme sayfanin ruhunu bozmaz.
Cunku sayfa zaten `kaydi bul ve sec` yuzeyi.

### 5) O zaman en saglikli V1 rollout ne olmali?
Bence su sira dogru:
1. `Businesses` listesinde badge + kisa sebep olarak basla
2. filtrelenebilir ikincil isaret yap
3. operator sahada gercekten kullaniyorsa faydayi gozle
4. ancak sonra `Project OS` icin terfi edilip edilmeyecegine bak

Bu cizgi hem riski dusurur hem de gereksiz erken urun savrulmasini engeller.

### 6) Project OS'a ne zaman tasinabilir?
Su kosullar gorulurse dusunulebilir:
- `bugun git` sinyali toplu secimde gercekten kullaniliyor ve guven veriyorsa
- audit/teklif kuyru gu ile saha secim sinyali arasinda tutarli bir hiyerarsi kurulabiliyorsa
- Project OS kartinda bunu gostermek `siradaki adim`i zayiflatmiyorsa

Yani tasima otomatik default olmamali.
Kanit gerektirmeli.

### 7) En buyuk risk ne?
Saha secim sinyalinin kullanisli olmasi yuzunden her yere yayilmasi.
Bu da su sonuca gider:
- Businesses = secim ekrani
- Project OS = secim + sicak is + saha rozetleri
- Business Detail = karar duvari

Sonra urun ayni problemi 3 yerde farkli sekilde gostermeye baslar.
Bu tekrar riskidir.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `bugun git` badge'i once `Businesses` listesinde filtrelenebilir ikincil isaret olarak baslamali
- `Project OS` ana kuyruguna ise ancak faydasi kanitlanirsa kontrollu terfi etmeli

Kisa formda:
- `Businesses` = guvenli ilk deneme alani
- `Project OS` = kanit sonrasi terfi alani

Bu model hem Project OS'un cekirdek rolunu korur hem de saha secim sinyalini dusuk riskle test eder.

## Yirmi yedinci okuma - `ilk acilis` satiri sabit bir template ailesiyle mi, yoksa tamamen derived tek cumle mantigiyla mi daha tutarli olur?
Bu soru onceki kararin ikinci kati.
Cunku onceki okumada `ilk acilis`in audit veya Y.Z'den dogrudan alinmamasi, ayri bir derived saha cevirisi olmasi gerektigini not etmistim.
Simdi asil kritik soru su:
- bu derived satir tamamen serbest mi uretilmeli?
- yoksa kucuk bir template ailesi icinde mi kalmali?

### 1) Repo ve referanslar neyi destekliyor?
Bugunku kod gerceginde `buildBusinessPromptNote` zaten coklu girdiyi derleyip tek bir karar promptuna ceviriyor.
Yani sistem tamamen sabit metin mantiginda degil, derived bilgi birlestirme mantigina yakin.
Ama diger yandan referanslar su riskleri acikca gosteriyor:
- generic CRM'e kayma yok
- gereksiz script bankasi yok
- sahada ise yarayan kisa cumle daha degerli

QR/NFC derin arastirmasinda da benzer bir ders var:
- `personel davet scripti` kisa, baskisiz ve baglama uygun olmali
- segment bazli hafif ton farki yararli olabilir
- ama cok aksiyonlu veya uzun script zayiflar

Bu ikisini birlestirince tek kutuplu cevap zayif kaliyor.

### 2) Uc model

#### T1) Sabit template ailesi
Ornek:
- `Sizi kisaca dijital gorunum tarafinda inceledim, isterseniz 2 dakikada nerede hizli toparlanma olur gosterebilirim.`
- segment bazli 3-4 varyant

Artisi:
- ton tutarlidir
- sahada operatoru korur
- yapay ve oynak cumle riski dusuktur

Eksisi:
- kayda ozguluk zayif kalir
- ayni cumle bir sure sonra ezber ve robotik hissedebilir
- website yok mu, yorum zayif mi, maps karisiklik mi, buna gore ince fark veremez

#### T2) Tamamen derived tek cumle
Girdi:
- audit problemi
- Y.Z aksiyonu
- operator notu
- segment

Artisi:
- kayda ozel hissi yuksek
- sahadaki ana probleme daha iyi yaslanabilir
- tekrar az gorunur

Eksisi:
- ton oynakligi artar
- bazen fazla teknik veya fazla satisci kacabilir
- V1 icin gereksiz prompt-motoru gibi buyume riski tasir

#### T3) Kucuk template ailesi + derived slotlar
Ornek mantik:
- 3 ana template ailesi
  - gorunum/toparlama
  - guven/ulasilabilirlik
  - teklif/demo koprusu
- template icindeki vurgu derived gelir
  - `haritada ve webde gorunum`
  - `iletisim netligi`
  - `yorum / vitrin zayifligi`

Artisi:
- ton omurgasi korunur
- kayda ozel vurgu eklenir
- tam script bankasina da tam serbest uretime de kaymaz

Eksisi:
- iyi slot kuralı ister
- fazla kategori acilirsa yine karmasiklasir

Ara yorum:
- su an en saglikli yol `T3`

### 3) Neden saf template yetmiyor?
Cunku `ilk acilis`in isi yalniz nazik olmak degil.
Ayni zamanda su hissi vermeli:
- bu kisi bu isletmeye bakmis
- cumle bos degil
- ama yargilayici da degil

Tam sabit template ile bu bazen fazla genel kalir.
Ozellikle farkli problemler arasinda ayrim kaybolur:
- maps kaydi supheli
- website hic yok
- instagram var ama vitrin daginik
- yorum guclu ama iletisim zayif

Hepsine ayni acilis bindirmek sahada gucu dusurebilir.

### 4) Neden tamamen derived cumle de riskli?
Cunku Business Detail V1'in ruhu karar netligi, generative gosteri degil.
Tamamen derived cumle su riskleri getirir:
- ayni veri farkli gunlerde farkli dil uretebilir
- operatorun guvenecegi sabit ton kaybolur
- sistem fark etmeden fazla `teklif satmaya calisan` cumle uretebilir
- V1'de aslinda gerekmeyen mini-prompt motoru dogar

Yani sahada ozel his faydali, ama ton stabilitesi daha onemli.

### 5) O zaman en saglikli V1 mantigi ne?
Bence su ayrim temiz:
- `ilk acilis` tamamen serbest uretilmesin
- ama tek kalip da olmasin
- kucuk bir `template ailesi` olsun
- hangi aile secilecegini derived kural belirlesin
- cumle icindeki tek vurgu parcasi derived gelsin

Pratikte:
- template iskeleti = ton guvencesi
- derived slot = kayda ozel anlam

### 6) Template aileleri nasil sinirlanmali?
V1 icin bence en fazla 3 aile yeter:
1. `gorunum toparlama`
2. `guven / ulasilabilirlik`
3. `hizli firsat / demo koprusu`

Bunlar segment degil,
problem tipidir.
Segment sadece ton yumusatma seviyesi gibi hafif fark yaratabilir.

Bu onemli.
Cunku segment bazli asiri script dallanmasi yine mini script bankasina doner.

### 7) En buyuk risk ne?
Template ailesi faydali diye zamanla 12 varyanta cikmasi.
Bu olursa:
- bakimi zorlasir
- operator neden bu cumleyi gordugunu anlamaz
- urun davranisi karanliklasir

Bu nedenle V1 kural sert olmali:
- en fazla 3 aile
- tek cumle
- tek ana vurgu
- baskisiz ton
- paket adi dogrudan gecmeyebilir, sadece kopru olabilir

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `ilk acilis` satiri ne tamamen sabit kalip olmalı ne de tamamen serbest derived tek cumle olmali
- en saglikli V1 model, `kucuk template ailesi + derived tek vurgu` mantigidir

Kisa formda:
- tone = template ailesi
- specificity = derived slot

Bu model hem sahada guvenli ton korur hem de cumleyi kayda baglar.

## Yirmi sekizinci okuma - `neden bu paket` override'i sadece teklif olustururken mi, yoksa teklif kapandi sonra da duzenlenebilir bir not olarak mi daha dogru olur?
Bu soru kucuk bir metin alani gibi gorunuyor ama aslinda `teklif neyin kaydi?` sorusuna dokunuyor.
Cunku bugunku referanslar iki seyi ayni anda soyluyor:
- teklif, yalniz fiyat satiri degil; delivery'i besleyen operasyon girdisi
- ama Business Detail ve panel generic not duvarina donmemeli

Yani `neden bu paket` alani acilacaksa, bunun bir `serbest metin cebi` mi yoksa `teklif snapshot`inin parcasi mi oldugu net olmali.

### 1) Mevcut repo gercegi ne diyor?
Bugunku offer modeli su alanlari tutuyor:
- `packageName`
- `amountTry`
- `addonKeys`
- `domainPreference`
- `customDomain`
- `status`

Yani teklifin ticari ve operasyonel iskeleti var,
ama `neden bu paket` gibi kisa karar gerekcesi henuz yok.

Referanslar ise baska bir yone isaret ediyor:
- `business-detail-v1.md` icinde `teklif gerekcesi` acik capability olarak geciyor
- ayni dokumanda son teklif karti `paket, tutar, paket aciklamasi, domain, ekler` gostermeli deniyor
- `project-os-page.md` teklifi delivery kapsamını etkileyen operasyon girdisi olarak tanimliyor

Buradan su net:
- `neden bu paket` bos bir yorum alani olmamali
- ama teklif snapshot'inda eksik bir halka gibi duruyor

### 2) Uc model

#### P1) Sadece teklif olustururken yazilsin, sonra degismeden kalsin
Artisi:
- snapshot mantigini korur
- sonradan tarih carpitma riski dusuk olur
- delivery icin sabit dayanak verir

Eksisi:
- teklif draft halindeyken karar degisirse alan eski kalabilir
- operator aceleyle yazdiysa duzeltme sansi dar olur

#### P2) Teklif kapandiktan sonra da serbest not gibi duzenlenebilsin
Artisi:
- operator sonradan baglam ekleyebilir
- sahadaki yeni itirazlar yazilabilir

Eksisi:
- teklif snapshot'i ile yorum alani birbirine karisir
- delivery hangi gerekcenin kanonik oldugunu anlamakta zorlanir
- Business Detail zamanla not coplugune kayar

#### P3) Teklif olusurken zorunlu kisa gerekce acilsin, teklif onaylanana kadar guncellenebilsin, onaydan sonra donsun
Artisi:
- teklif gercegi ile ayni nesnede kalir
- draft/sent doneminde operator duzeltme yapabilir
- approved sonrasi delivery icin sabit snapshot olur

Eksisi:
- `ne zaman donar?` kuralı net yazilmazsa belirsizlik olur
- sonradan gelen yeni itirazlar icin ayri kanal gerekir

Ara yorum:
- su an en saglikli yol `P3`

### 3) Neden salt teklif-aninda tek seferlik alan yetmeyebilir?
Cunku teklif pratikte bazen tek oturusta netlesmez.
Audit yonu dogru olsa bile su seyler degisebilir:
- muhatap butce itirazi yapar
- domain tercihi degisir
- ekler cikartilir
- Paket 2 yerine Paket 1'e inilir

Bu durumda `neden bu paket` alanini hic guncelleyememek,
teklif snapshot'ini hatali bir tarihe kilitleyebilir.

### 4) Neden teklif kapandiktan sonra serbestce duzenlenmesi riskli?
Cunku bu alanin isi gecmis anlatmak degil,
o teklifin neden o sekilde secildigini kaydetmek.

Teklif onaylandiktan sonra bu metni serbestce degistirmek su riskleri getirir:
- operator sonradan `aslinda sebep buydu` diye tarihi yeniden yazar
- delivery scope'unun hangi mantikla secildigi bulaniklasir
- ayni kayitta hem teklif gerekcesi hem sonradan eklenmis yorumlar toplanir

Bu da alanin karakterini bozar.

### 5) O zaman en saglikli V1 mantigi ne?
Bence `neden bu paket` serbest sonradan not degil,
teklif snapshot'inin kisa bir parcasi olmali.
Ama `yalniz create aninda yazildi ve bir daha asla dokunulamaz` kadar da sert olmamali.

En temiz kural su:
- offer `draft` veya `sent` durumundayken kisa gerekce guncellenebilir
- offer `approved` olduktan sonra gerekce donar
- approval sonrasi yeni baglam gerekiyorsa bu, ayni alani ezmek yerine ayri operator ozeti veya yeni teklif revizyonu ile tasinir

### 6) Bu alan nasil sinirlanmali?
V1 icin bence sert sinir lazim:
- 1-2 cumle
- audit bulgusuna bagli olmali
- paketin hangi eksigi kapattigini soylemeli
- fiyat savunmasi veya uzun satis metni olmamali
- serbest gunluk not gibi kullanilamamali

Ornek cizgi:
- `Maps tutarliligi ve yorum akisi eksik oldugu icin Paket 2 secildi; temel vitrin kurulumunun ustune QR yorum akisi gerekli.`

Bu, hem delivery'e girdi olur hem de operatora niyet netligi verir.

### 7) Approval sonrasi ne olmali?
Bence burada ikinci bir ilke lazim:
- approved teklifin `neden bu paket` alani tarihsel snapshot sayilmali
- eger sonra fikir degisirse ya yeni teklif revizyonu acilmali ya da ayri kisa operator ozeti dusulmeli

Yani ayni alani yasayan not defterine cevirmemek kritik.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `neden bu paket` alani teklif olusurken acilmali ve teklif snapshot'inin parcasi olmali
- ama offer `draft/sent` asamasinda kontrollu guncellenebilmeli
- offer `approved` olduktan sonra artik serbestce degistirilmemeli

Kisa formda:
- before approved = kisa ve duzenlenebilir teklif gerekcesi
- after approved = frozen snapshot
- later context = ayri ozet veya yeni revizyon

Bu model hem teklifin operasyon girdisi olma cizgisini korur hem de not coplugu riskini dusurur.

## Yirmi dokuzuncu okuma - `kapsam teyidi` satiri teklif `approved` olmadan hic gorunmemeli mi, yoksa erken uyumsuzluk sinyali olarak daha once de gosterilebilir mi?
Bu soru onceki `KT3` kararinin gorunum kuralini netlestiriyor.
Cunku onceki okumada `kapsam teyidi`nin en saglikli kaynagi olarak `offer + delivery.scope` kesisimini secmistim.
Ama kaynak dogru olsa bile, bu satiri ne zaman gosterecegimiz ayri konu.

### 1) Repo gercegi hangi yone itiyor?
Mevcut akis su cizgiye yaslaniyor:
- queue mantiginda delivery asamasi, offer `approved` olduktan sonra aciliyor
- `deriveProjectOsOverview` de delivery zincirini ancak approved sonrasi ana asama olarak okuyor
- `Project OS` ve CRM arastirma notlari `audit -> teklif -> teslimat -> bakim` sirasini koruyor
- skill kirmizi cizgisi acik: teklif netlesmeden ekran cogaltma yok

Bu cok onemli.
Cunku `kapsam teyidi` satiri delivery/kickoff karakterli bir satir.
Bunu cok erken one cekmek, teslimat mantigini teklif asamasina sizdirabilir.

### 2) Uc model

#### KG1) Sadece offer `approved` olduktan sonra gorunsun
Artisi:
- akis sirasina sadik kalir
- teklif netlesmeden delivery dili acilmaz
- kickoff karti daha temiz kalir

Eksisi:
- approval oncesi olasi scope kopuklugu erken fark edilmez
- operator bazen gec uyari alabilir

#### KG2) Draft/sent asamasinda da gorunsun
Ornek:
- draft = `erken kontrol`
- sent = `cevapla birlikte netlestir`
- approved = `teyitli / revize bekliyor`

Artisi:
- risk erken gorunur
- operator teklifteyken teslimat kopuklugunu dusunur

Eksisi:
- teklif kartina gizli delivery mantigi tasir
- `teklif netlesmeden ekran cogaltma` riskini arttirir
- ayni kartta hem ticari kapanis hem kickoff uyumu konusulmaya baslar

#### KG3) Normal `kapsam teyidi` satiri yalniz approved sonrasi gorunsun, approval oncesi gerekiyorsa ayri bir hafif `scope riski` sinyali kullanilsin
Artisi:
- terimleri karistirmaz
- delivery satiri delivery asamasinda kalir
- approval oncesi gereken uyari tamamen yok olmaz

Eksisi:
- iki ayri dil kuralı ister
- iyi adlandirilmazsa operator neden iki farkli etiket gordugunu anlamayabilir

Ara yorum:
- su an en saglikli yol `KG3`, ama V1 baslangici pratikte `KG1`e daha yakin olmali

### 3) Neden her asamada gostermek riskli?
Cunku `kapsam teyidi` ismi kendi basina sunu ima ediyor:
- satilan cozum delivery baslangicina indi
- artik uyum kontrolu yapiyoruz

Bu ise teklif `draft` veya `sent` iken biraz erken.
O anda asil soru hala su olabilir:
- paket kesin mi?
- butce kabul edildi mi?
- domain tercihi degisecek mi?

Boyle bir anda `kapsam teyidi` satiri acilirsa,
operator sanki teslim kesinlesmis gibi okuyabilir.
Bu da akis sirasini bozar.

### 4) Neden approval sonrasi gormek daha tutarli?
Cunku delivery zaten onayli teklifin icrasi.
`kapsam teyidi` de tam olarak su soruya cevap veriyor:
- `onaylanan cozum kickoff scope'unda dogru somutlandi mi?`

Bu soru ancak onaylanan bir cozum varsa tam anlam kazanir.
Aksi halde satir bir tur erken tahmin etiketine doner.

### 5) Peki erken uyari ihtiyaci tamamen yok mu?
Yok degil.
Ozellikle teklif `sent` asamasindayken operator bazen sunu bilmek isteyebilir:
- mevcut scope taslagi secilen paketle kabaca uyumlu mu?
- saha gorusmesinde soz verilmis bir sey scope'a dusmus mu?

Ama bu ihtiyac icin ayni `kapsam teyidi` etiketini one cekmek yerine,
daha hafif bir preflight dili daha temiz olur.

Ornek erken sinyal dili:
- `scope riski var`
- `kickoff notu eksik`
- `paket netlesince scope kontrol edilecek`

Yani erken uyari varsa bile delivery teyidi gibi degil,
teklif-oncesi/teklif-ici hazirlik notu gibi davranmali.

### 6) O zaman en saglikli V1 mantigi ne?
Bence sert cizgi su olmali:
- `kapsam teyidi` satiri Business Detail kickoff kartinda yalniz offer `approved` olduktan sonra ana satir olarak gorunsun
- approval oncesi delivery ile ilgili bir kopukluk sinyali gerekirse, bu ayni isimle degil `hazirlik riski` veya `scope riski` gibi daha hafif ikincil dilde kalsin

Boylece:
- teklif = hala ticari netlesme alanı
- delivery kickoff = kapsam teyidinin dogal evi

### 7) En buyuk risk ne?
Erken uyari faydali diye delivery terimlerinin teklif kartina yayilmasi.
Bu olursa urun su yone kayar:
- audit karti paket konusur
- teklif karti yarim delivery konusur
- kickoff karti ayni seyi tekrarlar

Bu tekrar hem ekran sisirir hem de kavram sinirlarini bozar.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `kapsam teyidi` satiri normal haliyle offer `approved` olmadan gorunmemeli
- approval oncesi gerekirse ayni kavrami tasimayan daha hafif bir `scope/hazirlik riski` sinyali kullanilabilir
- V1 baslangicinda ise en guvenli yol bunu hic erken acmamak, dogrudan approved-sonrasi kickoff kartinda gostermektir

Kisa formda:
- normal `kapsam teyidi` = approved-sonrasi
- early warning gerekiyorsa = ayri hafif risk sinyali
- V1 default = once approved-sonrasiyla basla

Bu model hem akis disiplinini korur hem de delivery dilini teklif asamasina tasirmaz.

## Otuzuncu okuma - Y.Z aksiyonu `teklife gec` derken audit paketi cok zayif / eski kaldiysa, operatoru audit guncellemeye zorlayan hafif bir kural gerekir mi?
Bu soru audit ile Y.Z arasindaki onceki rol ayriminin pratik guvenlik testi.
Cunku daha once su cizgiyi netlestirmistim:
- `Y.Z` = `simdi teklife gecilir mi, yoksa once dogrulama mi gerekir?`
- `audit` = `teklife gecildiyse hangi paket yonu uygun?`

Ama bugunku kod gerceginde Y.Z raporu uretilirken audit sadece `auditSummary` olarak girdi oluyor.
Yani sistem auditin kalitesini veya guncelligini ayrica denetlemiyor.
Bu da su riski doguruyor:
- yeni tarama sinyali guclu olabilir
- Y.Z `teklife gec` diyebilir
- ama eldeki audit ozeti eski, cok ince veya paket yonu icin zayif kalmis olabilir

### 1) Referanslar hangi yone itiyor?
`Y.Z Report Contract` Y.Z'nin isini cok net ciziyor:
- tek `oncelikli aksiyon` ver
- uzun audit raporu olma
- paket motoruna donme

`business-detail-v1.md` ise baska bir cizgiyi koruyor:
- sistem paket yonu onerebilir ama son secim operatorundur
- `teklif gerekcesi` ve `hangi eksigi kapattigi` audit/teklif cizgisinde yasamali

Buradan su net cikiyor:
- Y.Z `teklife gec` dediginde bu tek basina saglam paket zemini demek degil
- audit tarafi zayifsa teklif omurgasi sallanabilir

### 2) Uc model

#### G1) Hic kural olmasin
Mantik:
- Y.Z `teklife gec` diyorsa operator devam eder
- audit eskiyse bunu operator fark eder

Artisi:
- en sade akistir
- ekstra kural getirmez

Eksisi:
- paket yonu eski audit uzerinden kayabilir
- operatorun gozunden kolayca kacar
- `Y.Z aksiyon gecidi, audit paket zemini` ayrimi kagitta kalir

#### G2) Sert zorunlu kural olsun
Mantik:
- audit cok kisa/eskiyse `teklife gec` aksiyonu kitlenir
- once audit guncellemesi zorunlu olur

Artisi:
- paket zemini korunur
- eksik audit ile teklif acma riski duser

Eksisi:
- fazla sert olabilir
- sahada hizli akisi gereksiz yere kesebilir
- her zayif audit gercekten yeni audit gerektirmeyebilir

#### G3) Hafif audit teyit kuralı olsun
Mantik:
- Y.Z hala `teklife gec` diyebilir
- ama audit zayif/eskiyse paket yonu alaninda veya teklif oncesi kartta `audit teyidi gerekli` sinyali gorunur
- operator teklife gecebilir ama once audit ozetini tazelemesi tavsiye edilir

Artisi:
- Y.Z'nin gecit rolunu bozmaz
- auditin paket zemini rolunu korur
- akisi sert kilitlemeden kalite guvencesi verir

Eksisi:
- iyi esik kuralı ister
- fazla gevsek yazilirsa gormezden gelinir

Ara yorum:
- su an en saglikli yol `G3`

### 3) Neden hic kural olmamasi zayif?
Cunku bugun Y.Z raporu tarama ve derived karar katmani.
Dogru isi su:
- simdi hangi hareket sirada

Ama audit baska isi tasiyor:
- teklife baglanacak paket mantigi
- hangi eksik hangi cozumle kapanir

Eger audit ozeti zayifsa ve hic sinyal vermeden `teklife gec` denirse,
operator sanki paket zemini de hazirmis gibi okuyabilir.
Bu da auditin rolunu yavasca dekor haline getirir.

### 4) Neden sert blokaj da fazla olabilir?
Cunku bazen audit eksik gorunse bile gercek saha resmi nettir.
Ornek:
- yeni agent/apify taramasi geldi
- isletmenin ihtiyaci acik
- operator sadece audit ozetini kisa guncelleyip devam etmek ister

Bu durumda tam blokaj, akisi faydasiz yere katilastirir.
Ayrica kullanici cizgisi de erken ekran ve zoraki mini workflow engine istemiyor.

### 5) O zaman en saglikli hafif kural ne olabilir?
Bence mantik su olmali:
- Y.Z `teklife gec` diyorsa gecit acik kalir
- ama audit asagidaki sinyallerden biriyle zayifsa `audit teyidi gerekli` uyarisi cikar:
  - audit ozeti yok veya cok ince
  - audit, son anlamli tarama guncellemesinden belirgin eski
  - auditte paket yonu var ama son tarama bulgulari onunla gerilim uretiyor

Yani kural teklifi mutlak kilitlemez,
ama paket secimi oncesi operatoru audit tazelemeye iter.

### 6) Bu sinyal nerede durmali?
Bence en dogru yer:
- audit/paket yonu kartinin yakininda
- veya teklife gecis koprusunde kisa bir `audit teyidi gerekli` satiri

Y.Z kartinin icine koymak daha zayif.
Cunku sorun Y.Z'nin ne dedigi degil,
audit zemininin teklife yeterince tasinip tasinmadigi.

### 7) Bu kuralin dili nasil olmali?
V1 dili sert blokaj dili olmamali.
Ornek:
- `Teklife gecis acik, ama paket yonu icin audit ozeti tazelenmeli.`
- `Son tarama sonrasi audit ozeti eski kalmis olabilir.`
- `Paket secmeden once audit teyidi onerilir.`

Bu dil hem akis kapisini kapatmaz hem de operatoru dikkatli davranmaya iter.

### 8) En buyuk risk ne?
Bu hafif kuralin zamanla gizli zorunlu workflow'a donmesi.
Eger her durumda audit teyidi cikarsa operator artik onu okumaz.
Bu yuzden esik dar tutulmali:
- gercekten zayif audit
- gercekten eski audit
- gercekten paket gerilimi

Diger her durumda Y.Z'nin `teklife gec` karari gereksiz surtunmesiz akmali.

### 9) Gecici net kanaat
Su an en mantikli cizgi su:
- Y.Z `teklife gec` dediginde audit zayif/eskiyse operatoru uyaran hafif bir kural gerekli
- ama bu kural sert blokaj olmamali
- en saglikli V1 model `audit teyidi gerekli` benzeri yumusak ama gorunur bir sinyal
- teklif kapisi acik kalir, fakat paket secimi oncesi audit tazeleme onerilir

Kisa formda:
- Y.Z = gecit
- audit = paket zemini
- audit zayifsa = soft warning, hard block degil

Bu model hem teklif omurgasini korur hem de Y.Z kartini gizli paket motoruna cevirmeden kullanir.

## Otuz birinci okuma - `son 3 temas ozeti` timeline olaylariyla mi, yoksa yalniz operator notundan derive edilen kisa snapshotlarla mi daha saglikli uretilir?
Bu soru ilk bakista kucuk bir UI tercihi gibi gorunuyor,
ama aslinda `gecmis neyin izi olmali?` sorusuna dokunuyor.
Cunku daha once su cizgiyi netlestirmistim:
- ana yuzeyde `tek guncel operator notu`
- referans alanda `son 3 temas ozeti`

Simdi asil mesele su:
- bu 3 satir gercek olaylardan mi gelsin?
- yoksa operator notunun farkli anlarindaki ozetlerinden mi derive edilsin?

### 1) Referanslar ne diyor?
`business-detail-v1.md` bu konuda oldukca net:
- `Activity timeline` V1'de ayri truth katmani degil, compact derived/ref destek alanidir
- timeline kaynaklari audit/offer/delivery tarihleri ve dis veri yenileme eventleri olabilir
- `timeline yorum degil hareket gosterir`
- `operator notu` ayridir, canonical veriyi sessizce degistirmez
- `not eklendiginde timeline eventi uretilebilir`

Bu dort madde birlikte okununca guclu bir yon veriyor:
- gecmisin ana omurgasi event mantigi olmali
- operator notu ise bugunku derlenmis durum olmali
- note update varsa bunu gecmise tasiyan sey not snapshot'i degil, onun urettigi timeline event'i olmali

### 2) Uc model

#### H1) Son 3 temas ozeti dogrudan timeline olaylarindan gelsin
Artisi:
- gecmis gercek hareketlere dayanir
- audit/teklif/teslimat/not guncelleme ayni event dili icinde toplanabilir
- operator notu ile gecmisin rolu ayrisir

Eksisi:
- temas odagi zayif eventler de listeye girebilir
- `offer guncellendi` gibi olaylar her zaman saha temasi kadar degerli degil

#### H2) Son 3 temas ozeti operator notu versiyonlerinden derive edilsin
Artisi:
- sahaya ve insan temasina daha yakin hissedilir
- son notlar genelde operatorun aklindaki asil baglami tasir

Eksisi:
- ayni seyin hem `guncel operator notu`nda hem `gecmis snapshot`ta tekrar riski yuksek
- not tarihi ile olay tarihi karisabilir
- gercek hareket yerine overwrite edilmis yorumlarin izi kalir

#### H3) Gecmis timeline eventlerinden gelsin, ama note degisikligi varsa bu da `tema ozeti` tipinde event uretsin
Artisi:
- event omurgasi korunur
- saha temasi kaybolmaz
- operator notunu gecmise ikinci kez kopyalamadan, not degisimini olaylastirir

Eksisi:
- iyi event adlandirmasi ister
- her not degisikligi event olmamali, yoksa timeline yine coplenir

Ara yorum:
- su an en saglikli yol `H3`

### 3) Neden salt operator notu snapshot'i zayif?
Cunku operator notu onceki kararda zaten `tek guncel ozet` olarak secildi.
Onun eski versiyonlarindan tekrar `son 3 temas` cikarmak su riski getirir:
- ayni bilgi iki farkli yerde yasar
- operator notu bir whiteboard gibi guncellenirken gecmis de onun kopyasi haline gelir
- olay izi yerine edit izi goruruz

Bu da `timeline yorum degil hareket gosterir` kuralina ters duser.

### 4) Neden timeline omurgasi daha tutarli?
Cunku Business Detail referansinda timeline zaten `compact derived/ref destek alani` olarak tanimlanmis.
Yani kisa gecmisin dogal evi burasi.

Buradan gelen satirlar daha temiz siniflanabilir:
- audit guncellendi
- teklif gonderildi
- teslimat kickoff acildi
- hafif tarama yenilendi
- operator temas ozeti girildi

Bunlarin hepsi `hareket` dilidir.
Bu sayede gecmis, bugunku nottan ayri durur.

### 5) Peki `temas ozeti` nasil korunur?
Bence kritik nokta su:
- her event genel sistem olayi olmak zorunda degil
- `operator notu guncellendi` gibi kuru event de yetmez
- gerekirse `temas ozeti kaydedildi` gibi tek satirlik olay tipi olmali

Yani operator bir gorusme/arama/ziyaret sonucunu kisa ozet olarak girdiginde,
bunun kendisi timeline'a su tipte dusmeli:
- tarih/zaman
- kanal veya muhatap
- tek cumle sonuc

Boylece gecmis temas odagini korur,
ama operator notunun eski kopyalarini ekrana tasimaz.

### 6) O zaman en saglikli V1 mantigi ne?
Bence su ayrim temiz:
- `guncel operator notu` = bugun ne bilmem gerekiyor?
- `son 3 temas ozeti` = compact timeline icinden secilmis son anlamli temas eventleri
- note update varsa ancak `temas sonucu` niteligindeyse timeline eventi uretsin

Yani son 3 satir saf `note snapshot` degil,
`event-first, contact-aware` mantikla gelmeli.

### 7) En buyuk risk ne?
Timeline omurgasi dogru diye her seyi oraya akitmak.
Bu olursa yine mini CRM history duvarina doner.
Bu yuzden V1 filtresi sert olmali:
- sadece anlamli temas veya karar eventleri
- en fazla son 3
- tek cumle sonuc
- yorum duvari yok

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `son 3 temas ozeti` yalniz operator notu snapshot'larindan derive edilmemeli
- ana omurga compact timeline eventleri olmali
- ama note/temas guncellemeleri gerekiyorsa bunlar da `temas sonucu` tipinde tek satirlik timeline eventi olarak uretilmeli

Kisa formda:
- history source = timeline events
- note source = current operator summary
- bridge = meaningful note updates can emit timeline events

Bu model hem tekrar riskini dusurur hem de sahadaki `en son ne oldu` sorusuna daha temiz cevap verir.

## Otuz ikinci okuma - `bugun git` filtre mantigi stage bagimsiz mi olmali, yoksa yalniz `lead/audit` bandindaki kayitlarda mi aktiflesmeli?
Bu soru `badge nerede gorunsun?` kararinin ikinci kati.
Daha once su cizgiyi netlestirmistim:
- `bugun git` once `Businesses` listesinde filtrelenebilir ikincil isaret olarak baslamali
- `Project OS` ana kuyruguna ise ancak faydasi kanitlanirsa terfi etmeli

Simdi sorun su:
- bu filtre tum stage'lerde acik olursa fazla genisler mi?
- yoksa yalniz saha seciminin dogal oldugu bantta mi anlamli kalir?

### 1) Mevcut akis ne diyor?
Kod ve referanslar bugun su sirayi koruyor:
- `Businesses` sayfasi arama + segment + durum + stage filtreleriyle toplu secim yuzeyi
- `Project OS` = aktif isi goster, siradaki adimi anla, gerekirse status ilerlet
- urun omurgasi = `audit -> teklif -> teslimat -> bakim`
- discovery import gelen adaylari `lead` business + audit ile hatta sokuyor

Buradan guclu bir sey cikiyor:
`bugun git` saha secim sinyali, dogasi geregi en cok su bantta anlamli:
- `lead / intake`
- `audit`

Cunku bu bantta asil soru su:
- `hangi kayda fiziksel gitmek veya gorusme yapmak bugun en anlamli?`

`offer / delivery / maintenance` tarafinda ise ana soru genelde baska:
- teklif kapansin mi?
- kickoff baslasin mi?
- yayin/bakim ne durumda?

### 2) Uc model

#### Z1) Stage bagimsiz olsun
Artisi:
- operator isterse her kayitta `bugun git` filtresi kullanabilir
- maksimum esneklik verir

Eksisi:
- offer/delivery/bakim tarafinda badge anlami bulanir
- ziyaret secimi ile operasyon takip sinyalleri karisir
- ayni kayitta `teklifi kapat` mi daha onemli, `bugun git` mi sorusu tekrar dogar

#### Z2) Yalniz `lead/intake + audit` bandinda aktif olsun
Artisi:
- saha secim sinyalinin dogal alaninda kalir
- teklif netlesmeden onceki hazirlik/ziyaret sorusuna hizmet eder
- Project OS ve sonraki stage rollerine daha az tasar

Eksisi:
- nadiren offer oncesi son bir ziyaret gereken gri vakalar icin sert gorunebilir
- operator ozel durumlarda sinyali baska stage'de isteyebilir

#### Z3) Varsayilan `lead/audit`, ama operator override ile istisnai olarak baska stage'de de isaretlenebilir
Artisi:
- cekirdek kural temiz kalir
- istisna gereken sahada esneklik verir

Eksisi:
- override mantigi erkenden acilirsa yine kapsam buyur
- V1 icin gereksiz kural karmasasi yaratabilir

Ara yorum:
- su an en saglikli yol `Z2`, uzun vadeli esneme gerekirse sonra `Z3`

### 3) Neden stage bagimsiz model zayif?
Cunku `bugun git` ziyaret-sekim sinyali.
Bu sinyal offer/delivery bandina yayilinca su sorun olur:
- teklif zaten kapatilmaya calisiyordur
- delivery zaten kickoff/yapim/yayin mantigina girmistir
- maintenance zaten kucuk guncelleme ve canlilik hattidir

Bu stage'lerde fiziksel ziyaret bazen gerekebilir,
ama bu ihtiyac genel kural degil istisna.
Iste bu yuzden stage-bagimsiz filtre,
istisnayi defaulta cevirmis olur.

### 4) Neden `lead/audit` bandi daha dogal?
Cunku saha secimi en cok burada karar yaratir:
- adayin gercekten degip degmeyecegi
- audit oncesi veya audit sirasinda fiziksel gozlem gerekip gerekmedigi
- ilk acilis cumlesi ve paket zemininin sahada netlesip netlesmeyecegi

Yani `bugun git` filtresi su soruya cevap veriyor:
- `bugun sahaya ciksam once hangi adaylari veya audit bandindaki kayitlari gormeliyim?`

Bu soru henüz teklif/delivery akisi degil,
oncesindeki secim/hazirlik sorusu.

### 5) Peki offer bandinda hic ziyaret gerekmez mi?
Gerekebilir.
Ama bu bence `bugun git` filtresinin varsayilan kapsamini genisletmek icin yeterli degil.
Oradaki dogru cozum daha cok su olabilir:
- ozel bir `saha teyidi gerekli`
- veya teklif kartina yakin ayri bir kopru notu

Yani farkli ihtiyaci ayni filtreye yikmamak daha temiz.

### 6) O zaman en saglikli V1 mantigi ne?
Bence su kural temiz:
- `bugun git` filtresi yalniz `lead/intake` ve `audit` bandindaki kayitlarda aktiflesmeli
- `offer / delivery / maintenance` stage'lerinde bu badge varsayilan secim sinyali olmamali
- ileride gercek saha ihtiyaci cikarsa, bunu ayni filtreyi yatay genisleterek degil istisnai ikincil sinyalle cozmeyi dusunmek daha dogru

### 7) En buyuk risk ne?
V1'de `bugun git` faydali oldugu icin her stage'e yaymak.
Bu olursa tekrar su tabloya doneriz:
- Businesses = secim ekrani + yarim operasyon ekrani
- Project OS = sicak is kuyrugu
- Business Detail = karar duvari

Sonra her yuzey ayni karmayi farkli isimle tasir.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `bugun git` filtre mantigi stage bagimsiz olmamali
- V1'de yalniz `lead/intake` ve `audit` bandindaki kayitlarda aktiflesmeli
- `offer/delivery/maintenance` icin gerekirse ayri ve daha dar istisna sinyali sonra dusunulmeli

Kisa formda:
- default scope = lead + audit
- not default = offer + delivery + maintenance
- later escape hatch = ayri istisna sinyali, ayni badge'in yatay genislemesi degil

Bu model hem saha secim filtresini net tutar hem de operasyon akisini gereksiz bulandirmaz.

## Sonraki arastirma basliklari
- `ilk acilis` template ailesi problem tipine mi, yoksa segment + problem birlikte okunarak mi secilmeli?
- `neden bu paket` alani yalniz serbest metin mi olmali, yoksa `ana eksik + secilen paket + beklenen sonuc` gibi yari-yapili bir mikro sablonla mi daha saglikli tutulur?
- approval oncesi delivery risk sinyali gerekirse bunun yeri teklif karti mi, yoksa kickoff acilmadan onceki ayri bir hazirlik satiri mi olmali?
- `audit teyidi gerekli` sinyali yalniz audit kartinda mi durmali, yoksa teklife gecis butonuna yakin bir kopru satiri olarak mi daha etkili olur?
- `temas sonucu` timeline eventi yalniz manuel girisle mi olusmali, yoksa operator notundaki belirli mikro alanlardan otomatik derive mi edilmeli?
- `bugun git` filtresi `lead` ve `audit` icinde de tum kayitlara mi acik olmali, yoksa yalniz belirli ziyaret sinyalleri olan alt grupta mi onerilmeli?
