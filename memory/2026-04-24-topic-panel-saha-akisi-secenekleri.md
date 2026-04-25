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

## Otuz ucuncu okuma - `ilk acilis` template ailesi problem tipine mi, yoksa segment + problem birlikte okunarak mi secilmeli?
Bu soru onceki iki kararin devamı:
- `ilk acilis` audit/Y.Z'den dogrudan alinmayacak, ayri saha cevirisi olacak
- bu satir icin `kucuk template ailesi + derived tek vurgu` modeli daha saglikli

Simdi kritik karar su:
- template ailesini secen sey esas olarak problem mi olmali?
- yoksa segment de aile secimini degistiren tam bir eksen mi olmali?

### 1) Referanslar hangi yone itiyor?
Farkli dosyalar ayni yonde bulusuyor:
- `OFFERS.md`: paket yapisi ayni kalir, segment bazli satis dili degisir
- QR/NFC arastirmasi: segment bazli ton farki faydali, ama coklu script bankasi zayif
- tek sayfa site arastirmasi: ortak iskelet korunur, segmente gore icerik agirligi degisir
- onceki notlar: `ilk acilis`te segment sadece ton yumusatma seviyesi gibi hafif fark yaratabilir

Bu dordunu bir araya koyunca cok net bir tasarim ilkesi cikiyor:
- omurga ortak kalmali
- segment, omurgayi degil vurguyu ve tonu hafifce ayarlamali

### 2) Uc model

#### I1) Template ailesi tamamen problem tipine gore secilsin
Ornek:
- gorunum toparlama
- guven / ulasilabilirlik
- hizli firsat / demo koprusu

Artisi:
- kural sade kalir
- aile sayisi sismez
- operator neden bu cumleyi gordugunu daha kolay anlar

Eksisi:
- berber/guzellik/kafe arasindaki ton farki bazen fazla duz kalabilir
- ayni problem farkli segmentte ayni dille acilabilir

#### I2) Template ailesi segment + problem birlikte okunarak secilsin
Ornek:
- berber + yorum zayif = hizli guven ailesi
- guzellik + website yok = premium vitrin ailesi
- kafe + menu eksik = menu/akış ailesi

Artisi:
- daha baglamsal gorunur
- segmente ozel his artar

Eksisi:
- aile sayisi hizla carpilir
- mini script matrisi dogar
- V1 icin gereksiz davranis karmasasi uretir

#### I3) Template ailesi problem tipine gore secilsin, segment yalniz ton ve kelime secimini ayarlasin
Ornek:
- aile = `guven / ulasilabilirlik`
- berberde daha hizli/net dil
- guzellikte daha yumusak/guven verici dil
- kafede daha islev/akış odakli dil

Artisi:
- omurga sade kalir
- segment farki kaybolmaz
- script bankasina donmeden baglam hissi korunur

Eksisi:
- ton kurali iyi yazilmazsa fazla ince kalabilir
- bazi kafe/restoran vakalarinda ayrik davranis ihtiyaci varmis gibi hissedilebilir

Ara yorum:
- su an en saglikli yol `I3`

### 3) Neden problem-only tek basina biraz eksik kalabilir?
Cunku elimizdeki segment arastirmalari ton farkinin gercek oldugunu gosteriyor:
- berberde daha hizli ve net dil
- guzellikte daha yumusak ve guven verici dil
- kafe/restoranda daha islev odakli dil

Ayni problem tipine sahip iki isletme dusun:
- guzellik salonunda `website yok`
- berberde `website yok`

Ana problem ayni olabilir,
ama ilk acilisin ritmi ayni olmak zorunda degil.
Bu farki hic tasimamak cumleyi fazla duzlestirebilir.

### 4) Neden segment + problem birlikte aile secmek riskli?
Cunku bu yol cok hizli buyur.
Bugun 3 segment x 3 problem ailesi = 9 davranis gibi gorunur.
Sonra:
- muhatap tipi
- temas kanali
- sahada onceki itiraz
- website var/yok

derken sistem mini konusma motoruna doner.
Bu da daha once koydugumuz kirmizi cizgiye ters:
- gereksiz script bankasi yok
- tam generative prompt motoru yok
- karar guvenligi once gelir

### 5) O zaman en saglikli V1 mantigi ne?
Bence su ayrim en temiz cizgi:
- `template ailesi` = problem tipinden gelsin
- `tek derived vurgu` = kayda ozel eksik/aksiyon bilgisinden gelsin
- `ton` = segmentten hafifce etkilensin

Yani hiyerarsi soyle:
1. problem tipi aileyi secer
2. kayda ozel eksik vurgu slotunu doldurur
3. segment cumlenin ton sicakligini ayarlar

Bu model hem ortak iskeleti hem segment farkini birlikte tasir.

### 6) Segment tam olarak neyi degistirmeli?
V1'de bence segment sadece su alanlara dokunmali:
- cumlenin yumusaklik seviyesi
- secilen fiilin tonu
- fayda vurgusunun cinsi

Ornek:
- berber: daha hizli, net, pratik
- guzellik: daha yumusak, guven verici, vitrin hissi yuksek
- kafe/restoran: daha islev odakli, menu/yorum/akış netligi

Ama segment suyu degistirmemeli:
- aile sayisi
- temel akış mantigi
- cümlenin ana yapisi

### 7) En buyuk risk ne?
Ton farki yaratayim derken segmenti ikinci bir kurucu eksene cevirmek.
Bu olursa her segment icin ayri script ailesi doğar ve yine dagilir.
V1 kuralı bu yuzden sert olmali:
- aile secimi segmentten gelmez
- segment sadece mikro ton modulatorudur
- aile sayisi en fazla 3 kalir

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `ilk acilis` template ailesi esas olarak problem tipine gore secilmeli
- segment aile secimini degistiren ikinci ana eksen olmamali
- segment yalniz ton, ritim ve fayda vurgusunu hafifce ayarlayan mikro katman olarak kalmali

Kisa formda:
- family = problem
- slot = specific issue
- tone = segment

Bu model hem fazla duzlesmeyi engeller hem de script bankasina savrulmadan baglami korur.

## Otuz dorduncu okuma - `neden bu paket` alani yalniz serbest metin mi olmali, yoksa `ana eksik + secilen paket + beklenen sonuc` gibi yari-yapili bir mikro sablonla mi daha saglikli tutulur?
Bu soru onceki teklif gerekcesi kararinin form tasarimi katmani.
Daha once su cizgiyi netlestirmistim:
- `neden bu paket` alani teklif snapshot'inin parcasi olmali
- `draft/sent` asamasinda guncellenebilmeli
- `approved` olduktan sonra frozen snapshot'a donmeli

Simdi asil soru su:
- bu alan operatorun bos textarea'si mi olmali?
- yoksa kisa ama yari-yapili bir kalipla mi tutulmali?

### 1) Referanslar hangi yone itiyor?
Birden fazla kaynak ayni seyi destekliyor:
- `business-detail-v1.md` teklifte `teklif gerekcesi` ve `hangi eksigi kapattigi` acik capability olarak geciyor
- `OFFERS.md` teklifin audit cikisina baglanmasini ve `hangi eksik`, `hangi paket`, `ne teslim` zincirini netlestiriyor
- delivery scope karari, ayrik alanlara dagilmak yerine `yari-yapili` text-first formatin MVP'de daha saglikli oldugunu gostermis durumda
- onceki notlarda da `neden bu paket` bos yorum alani olmamali cizgisi zaten acildi

Bu dordunu birlikte okuyunca iki guclu sinyal var:
- tam serbest metin fazla dagitabilir
- ama ayri ayri birden cok form alani acmak da teklif duvarina kaydirabilir

### 2) Uc model

#### N1) Tam serbest metin
Artisi:
- operator esnek yazar
- farkli sahne ve itirazlari rahat anlatir

Eksisi:
- kalite ve tutarlilik cok degisir
- bazen sadece `uygun goruldu` gibi bos metinler kalir
- delivery ve sonraki okuma icin sebep zinciri zayiflar
- not coplugune kayma riski yuksek

#### N2) Tam alanlara bolunmus mini form
Ornek:
- ana eksik
- secilen paket nedeni
- beklenen sonuc
- muhatap itirazi
- domain notu

Artisi:
- veri daha temiz yakalanir
- analiz etmek kolaylasir

Eksisi:
- teklif ekranini gereksiz form duvarina cevirir
- MVP icin fazla workflow hissi verir
- kullanici daha fazla alan doldururken akisi kaybeder

#### N3) Tek alanda yari-yapili mikro sablon
Ornek mantik:
- `Ana eksik:` ...
- `Bu paket:` ...
- `Beklenen sonuc:` ...

Artisi:
- tek alan sadeligini korur
- operatoru bos ve zayif yazi yerine net sebep zincirine iter
- delivery ve sonradan okuma icin daha guvenli snapshot verir

Eksisi:
- fazla sertse operatoru mekanik hissettirebilir
- sablon kotu tasarlanirsa yine copy-paste metnine doner

Ara yorum:
- su an en saglikli yol `N3`

### 3) Neden tam serbest metin zayif?
Cunku `neden bu paket` alani yorum yazmak icin degil,
teklif kararinin omurgasini kisa ve okunur sekilde sabitlemek icin var.

Tam serbest metinde en buyuk risk su:
- bazen sebep yerine sadece slogan yazilir
- bazen `paket 2 daha uygun` gibi eksik bir cumle kalir
- bazen saha itirazi, fiyat savunmasi ve operasyon notu ayni yere yigilir

Bu da snapshot niteligini bozar.

### 4) Neden mini form da fazla gelebilir?
Cunku bu kez baska uca kayariz.
Ayrik inputlar su riskleri getirir:
- operator daha cok alan doldurur, daha az karar verir
- teklif ekraninda gereksiz burokrasi hissi artar
- skill'in kirmizi cizgisi olan `teklif netlesmeden ekran cogaltma` tetiklenir

Delivery scope kararinda nasil yari-yapili text-first daha iyi calistiysa,
burada da benzer mantik daha saglikli gorunuyor.

### 5) O zaman en saglikli V1 mantigi ne?
Bence en temiz yol su:
- `neden bu paket` tek alan olarak kalsin
- ama bos serbest metin olmasin
- varsayilan mikro sablon operatoru uc kisa parcaya yonlendirsin:
  - `Ana eksik`
  - `Bu paket`
  - `Beklenen sonuc`

Yani veri modeli ayri alanlara bolunmez,
ama yazim disiplini yari-yapili tutulur.

### 6) Bu mikro sablon neden iyi calisabilir?
Cunku dogrudan teklif omurgasina oturuyor:
- audit neyi gosterdi?
- hangi paket neden secildi?
- teslim veya etki olarak ne bekleniyor?

Bu, `OFFERS.md` icindeki zincirle bire bir uyumlu:
- hangi eksik kritik
- hangi paket uygun
- ne teslim edilecek

Yani mikro sablon uydurma degil,
mevcut is akisinin text-first yansimasi.

### 7) Sablon ne kadar sert olmali?
V1 icin bence yumusak ama belirgin olmali.
Yani operator isterse cumleyi dogal Turkceyle yazabilsin,
ama sistem placeholder veya onek olarak su iskeleti versin:
- `Ana eksik: ...`
- `Bu paket: ...`
- `Beklenen sonuc: ...`

Isterse bunlari tek paragrafta da yazabilir,
ama zihinsel iskelet bu uc sorudan sasmasin.

### 8) En buyuk risk ne?
Mikro sablon faydali diye zamanla bunun da mini checklist'e donmesi.
Mesela su yone kaymasi riskli:
- ana eksik
- ikinci eksik
- itiraz tipi
- kanal hazirligi
- domain notu
- ek materyal

Bu durumda yine form duvarina geliriz.
V1 kuralı sert olmali:
- tek alan
- en fazla uc mikro baslik
- 1-2 cumlelik kisa mantik
- fiyat savunmasi ve gunluk notlar ayni alana yigilmamali

### 9) Gecici net kanaat
Su an en mantikli cizgi su:
- `neden bu paket` alani tam serbest metin olarak birakilmamali
- ama ayri inputlara bolunmus mini forma da donmemeli
- en saglikli V1 model, tek alanda `ana eksik + bu paket + beklenen sonuc` mantigiyla calisan yari-yapili mikro sablon

Kisa formda:
- storage = single field
- writing mode = semi-structured
- scope = short decision snapshot

Bu model hem teklif kartini sade tutar hem de gerekce zincirini daha guvenli hale getirir.

## Otuz besinci okuma - biriken mikro kararlar sonrasi 5 finalistin tazelenmis cekirdegi
Artik tek tek mikro kararlar biriktigi icin finalistleri yeniden okumak gerekli oldu.
Cunku ilk finalist listesi daha genis varyasyonlar tasiyordu,
ama sonraki okumalar bazi varyasyonlari fiilen zayiflatti:
- ayri ziyaret sayfasi erken gorunuyor
- `bugun git` sinyali Businesses listesinde ve lead/audit bandinda daha dogru duruyor
- Business Detail tek kayit karar merkezi olarak daha da guclendi
- timeline/history event-first olmali
- teklif ve kickoff zinciri Business Detail kartlari icinde okunur hale gelmeli
- teklif/delivery terimleri stage sinirlarini asmamali

Bu yeni kararlar finalistleri tamamen degistirmiyor,
ama her finalistin artik hangi varyasyonla yasadigini daha netlestiriyor.

### Finalist 1 - Kontrollu hibrit cekirdek
Bilesenler:
- `Discovery` = aday eleme ve temiz on eleme
- `Businesses` = sahiplenilen kayit havuzu ve secim listesi
- `Business Detail` = tek kayit karar merkezi
- `Project OS` = sicak operasyon kuyrugu
- ziyaret hazirlik = ayri sayfa degil, Detail icinde kart/mod

Neden en guclu:
- neredeyse tum son kararlarla uyumlu
- her yuzeye net rol veriyor
- `bugun git`, operator notu, timeline, audit/teklif/kickoff zinciri ayni cekirdekte mantikli yere oturuyor

Ana risk:
- yuzey sayisi teorik olarak fazla gorunebilir
- rol adlari ve gecisler iyi yazilmazsa kullanici gereksiz karma hissedebilir

Guncel hukmu:
- su an en guclu finalist bu
- ama `5 yuzeyli` degil, `4 yuzey + detail icinde ziyaret modu` varyasyonuyla

### Finalist 2 - Businesses-first operasyon modeli
Bilesenler:
- varsayilan calisma girisi `Businesses`
- secim ve filtreleme burada
- Detail tek kayit karar duvari
- Project OS yalniz sicak is ve stage kuyrugu

Neden guclu:
- saha ve manuel aday yakalama gercegine yakin
- `bugun git` gibi sinyaller Businesses icinde dogal duruyor
- Home veya Discovery'yi zorunlu giris yapmiyor

Ana risk:
- discovery kaynakli temiz on eleme degerini ikinci plana itebilir
- kirlilik kontrolu icin duplicate/sahiplenme disiplini ister

Guncel hukmu:
- hibrit modele cok yaklasti
- discovery agirligi dusuk kurumlar icin en pratik finalist olabilir

### Finalist 3 - Discovery -> Detail kontrollu gecis modeli
Bilesenler:
- aday once Discovery tarafinda temizlenir
- uygun aday business olur
- karar Detail'de verilir
- Project OS daha sonra devreye girer

Neden guclu:
- cop kayit riskini dusurur
- dis veri ile kanonik kayit ayrimini temiz korur

Ana risk:
- yolda bulunan veya discovery disi gelen adaylarda ekstra adim hissi yaratir
- saha hizi gereken gunde fazla on eleme davranisi dogurabilir

Guncel hukmu:
- hala mantikli finalist
- ama artik varsayilan omurga olmaktan cok `temiz havuz oncelikli` varyasyona donusuyor

### Finalist 4 - Ziyaret hazirlik odakli model
Bilesenler:
- gidilecek kayit secimi
- ilk acilis satiri
- alinacak bilgi listesi
- beklenen paket yonu
- gorusme sonucu/temas ozeti

Neden hala finalist:
- kurucunun sahada `nereye gideyim, ne diyeyim, donunce neye baglayayim` sorusuna en direkt vuran hat bu

Ana risk:
- ayri pano olursa erken ve agir kalir
- kendi basina urun merkezi degil, destek moduna kayiyor

Guncel hukmu:
- artik bagimsiz ana model olmaktan cok,
  `Business Detail icinde ziyaret hazirlik modu` varyasyonuyla yasiyor
- ayri sayfa varyasyonu belirgin sekilde zayifladi

### Finalist 5 - Audit/teklif zinciri modeli
Bilesenler:
- audit ozeti
- teklif gerekcesi
- paket yonu
- kickoff scope / kapsam teyidi
- audit teyidi gibi kalite sinyalleri

Neden hala finalist:
- `girilen bilgi nasil sonuca donusur` sorusunun en temiz operasyon cevabi burada
- teklif omurgasi ve delivery baglantisini en net bu model tasiyor

Ana risk:
- tek basina kullanilinca fazla metin ve zincir odakli kalabiliyor
- saha secimi ve kayit bulma sorusunu tek basina cozmez

Guncel hukmu:
- artik bagimsiz shell olmaktan cok,
  finalist 1 ve 2'nin icinde yasayan `zincir kartlari ve yumusak kural sistemi`ne donusuyor

### Tazelenmis siralama
Su anki bilgiyle finalistleri boyle okuyorum:
1. Kontrollu hibrit cekirdek
2. Businesses-first operasyon modeli
3. Discovery -> Detail kontrollu gecis modeli
4. Ziyaret hazirlik odakli model (detail modu olarak)
5. Audit/teklif zinciri modeli (destek iskeleti olarak)

### Bu tazelemeden cikan asil sonuc
Aslinda 5 finalist hala duruyor,
ama bunlarin ikisi giderek `ana shell`, ikisi `guc veren mod`, biri de `destek iskeleti` karakterine kayiyor.
Bu onemli.
Cunku son karar belki `5 esit alternatif` arasindan degil,
`2 ana omurga + 3 entegre mod` arasindan cikacak.

Yani bugun itibariyla:
- asil omurga adayi = `Kontrollu hibrit` veya `Businesses-first`
- entegre mod adayi = `ziyaret hazirlik`
- zincir disiplini = `audit/teklif/kickoff kartlari`

Bu, erken karara kilitlenmek degil.
Ama artik finalistlerin esit agirlikta olmadigini kabul etmek demek.

## Otuz altinci okuma - `kontrollu hibrit` ile `Businesses-first` arasindaki asil fark ne?
Finalistleri tazeledikten sonra artik en guclu iki aday birbirine fazla yaklasti.
Bu da su riski doguruyor:
- iki ayri model var saniyoruz
- ama aslinda ayni omurganin iki farkli baslangic noktasi olabilir

Bu yuzden su soruyu ayirmak gerekli:
- `kontrollu hibrit` ile `Businesses-first` gercekte hangi noktada ayriliyor?

### 1) Mevcut repo hangi yone daha yakin?
Bugunku repo sinyalleri iki yone birden isaret ediyor:
- `Businesses` nav icinde fiili ana calisma yuzeyi gibi duruyor
- root sayfa yon veriyor ama kalici merkez gibi tasinmiyor
- `Discovery` ise cok net bir on eleme tablosu ve `ana kayda dokunmadan once temizle` mantigi tasiyor

Yani kod sunu soyluyor:
- gunluk calismada `Businesses-first` daha dogal
- veri hijyeni ve aday elemede ise `hibrit/discovery` degeri gercek

Bu nedenle fark `hangi yuzeyler var?` sorusundan cok,
`varsayilan operator baslangici neresi?` sorusuna donuyor.

### 2) Iki modelin gercek ayrimi

#### HBD1) Kontrollu hibrit
Varsayilan mantik:
- aday havuzu ayridir
- sahiplenilen kayit havuzu ayridir
- operator ihtiyaca gore discovery ile businesses arasinda rol bazli gezer

Merkezi iddia:
- sistem hem temiz havuzu hem sahiplenilen havuzu korumali
- operatorun girisi duruma gore degisebilir

#### HBD2) Businesses-first
Varsayilan mantik:
- calisma kapisi once `Businesses`
- discovery yardimci ve ikincil kaynak olarak kalir
- manuel/saha girisi norm sayilir

Merkezi iddia:
- operatorun asil yasadigi yer businesses listesi olmali
- discovery degerli ama varsayilan kapı olmak zorunda degil

### 3) Neden bu fark onemli?
Cunku tum alt kararlar buna baglaniyor:
- yeni aday nerede sahiplenilir?
- `bugun git` filtresi hangi yuzeyde anlam kazanir?
- kullanici admin'e girince once havuz mu gorur, kendi kayitlarini mi?
- discovery import urunun merkezi mi, destekleyici kanali mi?

Yani burada fark mimari degil,
operasyonel varsayilan farki.

### 4) Kontrollu hibrit ne zaman daha dogru gorunuyor?
Su durumlarda:
- Apify/discovery akisi kuvvetli kullanilacaksa
- aday temizligi ve cop onleme birincil onemse
- ekipte `ham aday` ile `sahiplenilen kayit` arasindaki sinir korunmak isteniyorsa
- sistem zamanla birden fazla aday toplama kanalina acik tutulacaksa

Bu modelin gucu su:
- veriyi daha temiz tutar
- kayit olmadan once eleme disiplini verir

Ama zayifligi su:
- kurucunun sahada hizli calistigi gunlerde discovery disi adaylar icin dolayli hissedebilir

### 5) Businesses-first ne zaman daha dogru gorunuyor?
Su durumlarda:
- kurucu genelde sahada gordugu adayi hemen sahipleniyorsa
- panelin birincil hissi `kendi havuzum` olmaliysa
- discovery ikincil kaynak olarak kalacaksa
- gunluk kullanimin buyuk bolumu mevcut kayitlar uzerinden donuyorsa

Bu modelin gucu su:
- daha az zihinsel gecis ister
- `bugun git`, stage filtresi, detail'e gecis gibi kararlar ayni yerde toplanir

Ama zayifligi su:
- discovery tarafinin sagladigi hijyen zamanla ihmal edilebilir
- duplicate ve kalitesiz aday riski daha cok operator disiplinine kalir

### 6) O zaman bunlar gercekten iki ayri finalist mi?
Bence evet, ama eskisi kadar uzak degiller.
Asil ayrim su cizgide:
- `hibrit` = iki havuz mantigini urun omurgasina bilincli sekilde yazar
- `Businesses-first` = ayni yuzeyleri korur ama operatorun varsayilan evi olarak businesses'i one alir

Yani komponent listesi neredeyse ayni olabilir,
ama urun davranisi ve onboarding hissi farkli olur.

### 7) Su an hangisi daha olgun gorunuyor?
Bugunku repo ve son mikro kararlarla ben sunu goruyorum:
- mevcut arayuz hissi `Businesses-first`e daha yakin
- ama dogru bilgi hijyeni cizgisi `kontrollu hibrit`in lehine

Bu ikisini birlikte okuyunca gecici net kanaat su:
- `kontrollu hibrit`, daha dogru uzun vadeli omurga gibi duruyor
- ama bunun gunluk kullanimdaki yuzu `Businesses-first` hissi vermeli

Yani operator deneyimi:
- `once businesses'teyim`
Ama sistem mantigi:
- `discovery ile businesses ayni havuz degil`

### 8) Gecici net kanaat
Su an en mantikli daraltma su:
- `kontrollu hibrit` ana omurga adayi olarak bir adim onde
- ama bu modelin kullaniciya gorunen giris hissi `Businesses-first` gibi olmali
- baska bir deyişle, nihai yon muhtemelen `hibrit mimari + businesses-first gunluk kullanim` sentezi olacak

Kisa formda:
- architecture = controlled hybrid
- day-to-day entry feel = businesses-first
- discovery = supportive but real, not fake

Bu, iki finalisti tek kararda eritmek degil.
Ama aralarindaki asil farkin `yuzey listesi` degil `varsayilan operator evi` oldugunu netlestirmek demek.

## Otuz yedinci okuma - `bugun git` filtresi `lead/audit` icindeki tum kayitlari mi gostermeli, yoksa yalniz belirli ziyaret sinyali olan alt grubu mu?
Bir onceki karar sunuydu:
- `bugun git` V1'de stage-bagimsiz olmamali
- esas alani `lead/intake` ve `audit` bandi olmali

Ama burada yeni bir ayrim cikiyor:
- bu banttaki her kayit zaten potansiyel ziyaret adayi mi sayilacak?
- yoksa `bugun git` bunun icinde de daha dar bir secim filtresi mi olmali?

Bu ayrim onemli.
Cunku yanlis kurulursa `bugun git` yeni sinyal gibi gorunur,
ama fiilen sadece ikinci bir stage filtresi olur.

### 1) Mevcut repo bu konuda ne soyluyor?
`agent-workspace/app/businesses/page.tsx` bugun sadece su toplu filtreleri veriyor:
- arama
- segment
- isletme durumu
- hat asamasi

Yani mevcut liste mantigi zaten `lead/audit` bandini daraltmaya izin veriyor.
Eger `bugun git` filtresi bu bandin tum kayitlarini gosterecekse,
pratikte kullaniciya sunu demis oluruz:
- `audit` filtresinin baska isimli ikinci versiyonu

Bu yuzden yeni filtre ancak stage filtresinin cevaplamadigi ayri bir soruya cevap verirse anlamli.

### 2) `bugun git` hangi soruya cevap vermeli?
Bence su soruya:
- `bugun sahaya cikacaksam, lead/audit icindeki hangi kayitlar digerlerinden daha oncelikli ve gorusmeye daha uygun?`

Bu soru su degil:
- `lead veya audit asamasinda hangi kayitlar var?`

Dolayisiyla `bugun git` = stage degil,
ziyaret secim katmani.

### 3) Iki model

#### BG1) `lead/audit` icindeki tum kayitlar `bugun git` filtresine dahil olsun
Artisi:
- basit
- ilk bakista veri gerektirmez
- operator `bugun git`e basinca tum potansiyel adaylari gorur

Eksisi:
- `stage = intake/audit` filtresinden neredeyse ayri bir sey soylemez
- uzun listede gercek saha secimi yine operatorun zihnine kalir
- `bugun git`in anlami bulanir, cunku `bugun` degil `bir ara gidilebilir` havuzuna doner

#### BG2) Yalniz belirli ziyaret sinyali olan alt grup `bugun git`e girsin
Artisi:
- stage filtresinden ayri gercek is degeri uretir
- saha gununde kisa ve kullanilabilir liste verir
- `Businesses` sayfasini ikinci Project OS'a cevirmeden secim desteği saglar

Eksisi:
- derive mantigi gerekir
- sinyaller kotu kurulursa bazi kayitlar gozden kacabilir
- operatorun neden bu kaydi burada gordugunu aciklamak gerekir

Ara yorum:
- V1 icin sade gorunse de aslinda `BG1` daha zayif
- cunku yeni bir karar uretmez

### 4) Neden tum `lead/audit` havuzu yeterli degil?
Cunku `lead/audit` bandi cok genis bir anlam tasir:
- yeni eklenmis ama daha aranacak kayit olabilir
- uzaktan ilerlemesi daha mantikli kayit olabilir
- muhatabi belirsiz kayit olabilir
- fiziksel ziyaret yerine once telefon/WhatsApp denenmesi gereken kayit olabilir
- zaten bu hafta gorusulmus ama beklemeye alinmis kayit olabilir

Bunlarin hepsini `bugun git` diye ayni sepete atarsak,
ziyaret secimi yerine ham aday havuzu gormus oluruz.

### 5) O zaman `bugun git` icin minimum alt grup mantigi ne olmali?
Bence ayri yeni CRM tablolarina gitmeden su hafif derived sinyaller yeterli olabilir:
- `ziyaret tipi = fiziksel`
- `manuel oncelik = bugun` veya `yuksek`
- `son temas` yok ya da eski
- `ziyaret nedeni` dolu
- stage zaten `intake/audit`

Yani en sade kural su olabilir:
- `bugun git` = stage uygun + fiziksel ziyaret mantikli + bugun/erken saha degeri var

Bu, her kaydi puanlamadan da is gorebilir.

### 6) Hangi alt varyasyonlar var?

#### BG2a) Tam manuel isaret modeli
Kayit ancak operator `bugun` diye isaretlerse bu filtreye girer.

Guclu taraf:
- cok kontrollu
- yanlis pozitif az

Zayif taraf:
- sistem karar destegi uretmez
- unutulursa liste bos kalir

#### BG2b) Tam derived model
Sistem son temas, ziyaret tipi, stage ve sebebe bakip otomatik dahil eder.

Guclu taraf:
- operator yukunu azaltir
- daha tutarli olabilir

Zayif taraf:
- erken donemde yanlis kesinlik hissi yaratir
- operator neden girdigini anlamazsa guven dusurur

#### BG2c) Hibrit model
Sistem aday ceker, operator isaretle guclendirir.

Ornek:
- stage uygun
- fiziksel ziyaret tipi var
- temas eski
=> `ziyaret uygun`

Ek olarak operator `bugun` derse,
kayit `bugun git` alt grubuna cikar.

Guclu taraf:
- sistem destek verir
- son soz operatorde kalir

Zayif taraf:
- iki katmanli dilin iyi adlandirilmasi gerekir

### 7) Su an en saglikli V1 hangisi?
Su anki repo olgunlugunda en guclu cizgi bence `BG2c`ye yakin.
Ama cok agir degil, asgari kuralla.

Yani:
- herkes `lead/audit` havuzunda durabilir
- bunun icinde ayri bir `ziyaret uygun` veya `fiziksel gorusme uygun` alt sinyali derive edilebilir
- `bugun git` ise bunun da daha dar, operator destekli alt secimi olur

Bunun sebebi su:
- `Businesses` sayfasinda stage filtresi zaten var
- `bugun git` ayni isi tekrar etmemeli
- saha secimi icin daha kisa ve daha gercek bir liste lazim

### 8) En buyuk risk ne?
`bugun git` filtresini cok akilli gostermek.
Mesela sistem sessizce cok fazla kaydi `bugun` diye onerirse,
operator sunu hisseder:
- liste yine uzun
- neden burada oldugu belli degil
- bu da sadece yeni bir skor oyunu

Diger risk de tam tersi:
- her sey sadece manuelse sistem yine karar desteği vermemis olur

Yani asiri otomasyon da, hic derive etmeme de zayif.

### 9) Gecici net kanaat
Su an en mantikli cizgi su:
- `bugun git` filtresi `lead/audit` icindeki tum kayitlari gostermemeli
- aksi halde stage filtresinin ikinci versiyonuna doner
- bu filtre yalniz belirli ziyaret sinyali olan alt grubu gostermeli
- en saglikli V1, `hafif derived ziyaret uygunlugu + operatorun bugun onceligi` hibriti gibi duruyor

Kisa formda:
- stage filter = `bu kayit hatta nerede?`
- visit suitability = `fiziksel gorusme mantikli mi?`
- `bugun git` = `bugun cikarsam once bunlara bak`

Bu uc soru ayri kalirsa,
`Businesses` listesi daha zekice olur ama CRM duvarina da kaymaz.

## Otuz sekizinci okuma - `ziyaret uygun` ile `bugun git` ayri iki sinyal olarak mi kalmali, yoksa tek filtre icinde mi erimeli?
Bir onceki iki ara karar sunlardi:
- `bugun git`, stage filtresinin ikinci kopyasi olmamali
- en saglikli cizgi, `hafif derived ziyaret uygunlugu + operatorun bugun onceligi` hibriti gibi gorunuyor

Ama burada hala acik bir urun sorusu var:
- bunu gercekten iki ayri sinyal olarak mi yasatacagiz?
- yoksa kullaniciya tek filtre gosterecek, altta badge + sebep ile mi cozecegiz?

Bu soru onemli.
Cunku iki kavrami fazla ayirirsak filtre duvari buyur.
Ama tek kavrama indirgersek de `bugun` ile `fiziksel olarak uygun` ayni sey sanilir.

### 1) Bu iki kavram aslinda ayni sey mi?
Bence hayir.
Aralarinda net bir seviye farki var:
- `ziyaret uygun` = bu kayitta fiziksel gorusme anlamli mi?
- `bugun git` = bugun sahaya cikarsam once buna bakmali miyim?

Yani biri uygunluk,
digeri gunluk oncelik.

Bunu tek kavrama eritince su risk doguyor:
- fiziksel gorusme mantikli olan ama bugun gitmeyecek kayitlar kaybolur
- ya da bugun onceligi verilmis ama temelde neden uygun oldugu anlasilmaz

### 2) Uc model

#### ZG1) Tek kullanici yuzeyi, tek kavram: sadece `bugun git`
Mantik:
- sistem gerekli tum sinyalleri kendi icinde toplar
- kullanici yalniz `bugun git` badge veya filtresini gorur
- altta kisa sebep satiri olur

Artisi:
- en sade yuzey
- Businesses listesinde az yer kaplar
- operatore tek soruluk secim deneyimi verir

Eksisi:
- `bugun` ile `ziyaret acisindan uygun` kavramlarini karistirir
- fiziksel gorusme mantikli ama bugunun konusu olmayan kayitlar gorunmez olur
- yarin/hafta ici planlama gibi ara katmanlar icin zayif kalir

#### ZG2) Iki esit kullanici filtresi: `ziyaret uygun` ve `bugun git`
Mantik:
- biri uygunluk filtresi
- biri gunluk saha onceligi filtresi
- ikisi de Businesses icinde ayri gorunur

Artisi:
- kavramsal ayrim temizdir
- operator isterse daha genis saha havuzunu da gorebilir
- sistem neyi neden ayirdigini daha net anlatir

Eksisi:
- V1 icin filtre yuzeyi buyur
- stage + status + segment + arama yanina bir de iki saha filtresi eklenirse liste agirlasir
- erken donemde gereksiz CRM hissi uretir

#### ZG3) Ic model iki katmanli, gorunen yuzey asimetrik
Mantik:
- sistem icerde `ziyaret uygunlugu`nu ayri derived sinyal olarak tutar
- operatorun hizli aksiyonu olarak `bugun git` daha on planda kalir
- `ziyaret uygun` kullaniciya ayri ana filtre olarak degil, badge/sebep/detay katmani olarak gorunur

Ornek:
- Businesses listesi: `bugun git` filtresi veya isareti
- kartta kisa sebep: `fiziksel gorusme uygun, son temas eski`
- Business Detail: `ziyaret karari = gidilir / uzaktan ilerlet / beklet`

Artisi:
- anlamsal ayrim korunur
- yuzey sade kalir
- Business Detail roluyle uyumludur
- `bugun git` operator aksiyonu olarak daha net kalir

Eksisi:
- isimlendirme cok dikkatli olmali
- operator `ziyaret uygun`u tam filtre olarak niye gormedigini anlamayabilir
- sebep satiri kotu yazilirsa arka model gizli kalir

Ara yorum:
- su an V1 icin en guclu yol `ZG3`

### 3) Neden iki esit filtre zayif gorunuyor?
Cunku bugunku `Businesses` sayfasi zaten su filtreleri tasiyor:
- arama
- segment
- durum
- stage

Buna bir de esdeger iki saha filtresi eklemek su riski dogurur:
- operator listeyi okumadan once filtre okumaya baslar
- saha secimi karar destegi olmaktan cikip kontrol paneli ayarina doner
- MVP sadeligi bozulur

Yani kavramsal olarak iki katman lazim olabilir,
ama arayuzde bunlari ayni agirlikta gostermek sart degil.

### 4) Neden tek kavram da yetmiyor?
Cunku `bugun git` gunluk niyet tasir.
Ama saha akisi her zaman ayni gun kararindan ibaret degil.
Su ara durumlar gercek:
- fiziksel gorusme mantikli ama once telefon denenmeli
- fiziksel gorusme mantikli ama bu hafta sonu planlanacak
- bugun gidilmeyecek ama beklet de degil

Bu ara durumlar varsa,
arkada `ziyaret uygunlugu` gibi daha genis bir karar katmani olmadan sistem kaba kalir.

### 5) O zaman en saglikli V1 modeli nasil gorunmeli?
Bence su sekilde:

#### Businesses listesi
- ana saha filtresi veya badge'i = `bugun git`
- kartta kisa derived sebep satiri olabilir
- gerekirse ileride ikincil `ziyaret uygun` quick filter gelir, ama V1'de zorunlu degil

#### Business Detail
- asil saha karari burada acik okunur:
  - `gidilir`
  - `uzaktan ilerlet`
  - `beklet`
- bunun altinda neden ve ilk saha hazirligi yer alir

#### Ic mantik
- derived modelde `ziyaret uygunlugu` ayri katman olarak yasar
- operator eylemi olarak `bugun` onceligi bunun uzerine biner

Bu sayede:
- urun dili sade kalir
- karar kalitesi dusmez
- yarin daha iyi saha planlamasi kurmak istersek temel mantik hazir olur

### 6) En buyuk risk ne?
Iki kavrami ayri tutayim derken kullaniciya gereksiz yeni dil ogretmek.
Ornegin su tur yapi erken donemde agir gelir:
- ziyaret uygun
- fiziksel uygun
- saha adayi
- bugun git
- bu hafta git

Bu, ayni ailede cok fazla etiket demek.
V1'de bu kadar katman operatore yardim etmek yerine zihin yorar.

Diger risk de ters ucta:
- her seyi yalniz `bugun git`e sikistirmak
- sonra neden uygun oldugu, ne zaman uygun oldugu ve sahada ne yapilacagi karismaya baslar

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- `ziyaret uygun` ile `bugun git` ayni sey degil, kavramsal olarak ayri kalmali
- ama V1'de ikisi de esit gorunen iki ana filtreye donusmemeli
- en saglikli model: icerde iki katman, disarida asimetrik yuzey

Kisa formda:
- derived decision = `ziyaret uygun mu?`
- operator intent = `bugun git`
- visible primary list signal = `bugun git`
- visible deeper reasoning = detail icindeki ziyaret karari ve kisa sebep

Bu model hem onceki `Businesses-first` hissini bozmuyor,
hem de Business Detail'i tek kayit saha karar yuzeyi olarak guclendiriyor.

## Otuz dokuzuncu okuma - `audit teyidi gerekli` sinyali audit kartinda mi yasamali, yoksa teklife gecis butonuna yakin kopru satiri olarak mi?
Bir onceki ara karar sunuydu:
- Y.Z `teklife gec` dediginde audit zayif/eskiyse yumusak bir kalite sinyali gerekli
- bu sinyal sert blokaj olmamali

Ama simdi daha ince bir urun sorusu var:
- bu uyariyi yalniz audit snapshot icinde tutmak yeterli mi?
- yoksa operatorun gercek karar aninda, yani `teklife gec` aksiyonuna yakin yerde de gorunmesi mi gerekir?

Bu ayrim onemli.
Cunku dogru yerde durmazsa ya gorulmez,
ya da sayfayi gereksiz ikaz duvarina cevirir.

### 1) Referanslar hangi yone itiyor?
`business-detail-v1.md` su rolleri net veriyor:
- `Next Step` karti sayfanin en guclu karar karti
- `Audit Snapshot` karti hazirlik sinyali, eksik listesi ve ilk paket yonunu tasiyor
- `Son teklif karti` ise fiyat/operasyon girdisi gibi okunmali

Buradan su net cikiyor:
- `audit teyidi gerekli`nin anlamsal evi audit snapshot'a daha yakin
- ama operatorun gercek hata riski `teklife gec` aksiyonuna basarken cikiyor

Yani bilgi evi baska,
karar surtunme noktasi baska.

### 2) Uc model

#### AT1) Sinyal yalniz audit kartinda dursun
Artisi:
- anlam olarak dogru yerde kalir
- auditin rolunu korur
- teklif alanina audit dili tasmaz

Eksisi:
- operator audit kartini gecip `teklife gec` aksiyonuna odaklanabilir
- kritik anda sinyal gorunurlugu dusuk kalir
- `audit var ama zayif` problemi karar aninda yeterince tutulmaz

#### AT2) Sinyal yalniz teklife gecis koprusunde dursun
Artisi:
- tam karar aninda gorunur
- operatorun gozunden kacma ihtimali azalir

Eksisi:
- audit sorunu audit kartindan kopmus olur
- neden bu uyariyi gordugunu anlamak zorlasir
- zamanla her gecis butonuna tasinan genel bir workflow uyarisi gibi hissedebilir

#### AT3) Ana evi audit karti, baglamsal yansimasi teklife gecis koprusunde olsun
Mantik:
- temel sinyal audit snapshot / paket yonu tarafinda yasamaya devam eder
- eger `Next Step` veya primary aksiyon `teklife gec` ise, butona yakin yerde tek satirlik kopru uyari gorunur
- bu satir audit kartindaki sinyalin kopyasi degil, kisa eylem cevirisidir

Ornek:
- audit karti: `Son tarama sonrasi audit ozeti eski kalmis olabilir.`
- teklife gecis koprusu: `Teklife gecis acik, ama paket secmeden once audit teyidi onerilir.`

Artisi:
- sinyalin anlamsal evi korunur
- kritik karar aninda da kaybolmaz
- Next Step ve Audit Snapshot rolleri birlikte calisir

Eksisi:
- tekrar riski vardir
- kopya metin kotu yazilirsa sayfa iki kez ayni seyi soyluyor gibi durur

Ara yorum:
- su an en saglikli yol `AT3`

### 3) Neden yalniz audit karti yetmeyebilir?
Cunku Business Detail'in dogasi geregi operator bazen soyle okur:
- ust ozet
- Y.Z / next step
- primary aksiyon

Audit karti guclu olsa da,
karar hizi yuksek kullanicida o kart her zaman tam okunmayabilir.
Ozellikle Y.Z `teklife gec` dediginde,
operator `tamam ilerliyorum` refleksiyle hareket eder.
Bu durumda auditteki zayiflik sinyali dogru yerde olsa bile,
dogru anda gorunmeyebilir.

### 4) Neden yalniz kopru satiri da zayif?
Cunku bu durumda audit kalitesiyle ilgili problem,
teklif butonuna yapismis genel bir uyarı gibi algilanir.
Halbuki sorun butonun kendisi degil,
paket zeminini tasiyan audit bilgisinin zayif olmasi.

Yani uyari yalniz koprude yasarsa,
operatorun aklinda su netlesmeyebilir:
- neyi teyit etmem gerekiyor?
- bu audit ozeti mi eski?
- paket yonu mu gerilimli?
- son tarama mi auditten yeni?

Bu aciklamanin dogal evi audit tarafidir.

### 5) O zaman en saglikli V1 yerlesim nasil olmali?
Bence su cizgi en guclu:

#### Audit Snapshot / paket yonu tarafi
- asil kalite sinyali burada yasasin
- neden teyit gerektigini kisa ve dogrudan soylesin
- mumkunse bir sebep tipi gostersin:
  - `eski audit`
  - `ince audit`
  - `tarama ile gerilim`

#### Next Step / teklife gecis yakini
- yalniz primary aksiyon `teklife gec` ise gorunsun
- tek satirlik kopru uyari olsun
- audit kartina geri baglansin, ama yeni mini form duvari acmasin

Bu sayede:
- ana anlam kaybolmaz
- karar ani korunur
- teklif karti gereksiz audit yukuyla sismez

### 6) Teklif kartina tasimak neden riskli?
Cunku onceki kararlar su cizgiyi koruyor:
- teklif karti fiyat satiri degil, ama yine de teklif girdisi olmali
- delivery veya audit terimleri erken yayilmamali
- teklif netlesmeden ekran cogalmamali

`audit teyidi gerekli` dogrudan teklif kartinin icine yerlestikce,
teklif karti yavas yavas su rolleri toplamaya baslar:
- paket sec
- audit oku
- kalite kontrol yap
- risk anla

Bu da teklif kartini gecis nesnesinden mini workflow paneline cevirir.
V1 icin gereksiz agirlik.

### 7) En buyuk risk ne?
Ayni uyariyi uc yerde gostermek:
- audit karti
- next step
- teklif karti

Bu olursa operator bir sure sonra hicbirini okumaz.
O yuzden tekrar siniri sert tutulmali:
- ana kaynak = audit tarafi
- karar ani yansimasi = sadece `teklife gec` aksiyonunda
- teklif karti = sessiz kalmali

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `audit teyidi gerekli` sinyalinin asli yeri audit snapshot / paket yonu tarafidir
- ama operatorun tam karar anini korumak icin, `teklife gec` aksiyonuna yakin tek satirlik kopru uyari da olmali
- bu, iki esit uyari alani degil; biri kaynak, biri eylem cevirisidir
- teklif karti bu sinyalin ana evi olmamali

Kisa formda:
- source of warning = audit card
- action reminder = teklife gecis koprusu
- not recommended = teklif kartina gommek

Bu model hem auditin paket zemini rolunu koruyor,
hem de Y.Z veya next-step akisinda kritik anda kalite sinyalini kaybettirmiyor.

## Kirkıncı okuma - `bugun git` isareti tam manuel mi olmali, yoksa derived aday uzerinde tek tik guclendirme mi daha saglikli?
Bir onceki kararlar sunlardi:
- `bugun git` stage filtresinin ikinci kopyasi olmamali
- `ziyaret uygun` ile `bugun git` ayni sey degil
- V1'de en saglikli cizgi `hafif derived ziyaret uygunlugu + operatorun bugun onceligi` gibi gorunuyor

Ama burada hala bir uygulama detayi acik:
- operator herhangi bir kaydi istedigi anda `bugun git` diye mi isaretlemeli?
- yoksa sistem once `ziyaret uygun` adaylarini cikarmali, operator da bunlar arasinda tek tikla guclendirme mi yapmali?

Bu soru kritik.
Cunku burada verilecek karar,
`bugun git`i karar destegi araci mi yoksa serbest isaret kutusu mu yapacagini belirliyor.

### 1) Mevcut repo ne diyor?
Bugunki repo gerceginde:
- `Businesses` sayfasi yalniz arama, segment, durum ve stage filtresi sunuyor
- `Business Detail` tek kayit resmi, Y.Z, audit ve tarama tarafini okuyor
- sahaya ozel manuel oncelik UI'i henuz yok

Yani sifirdan yeni bir yuzey dili ekleyeceksek,
bu dilin V1'de gereksiz veri girisi uretmemesi onemli.

### 2) Uc model

#### BGI1) Tam manuel isaret
Mantik:
- operator istedigi herhangi bir kaydi `bugun git` diye isaretler
- sistem uygunluk aramaz
- liste bu isaretlere gore olusur

Artisi:
- maksimum kontrol verir
- discovery disi veya sezgisel saha kararlarini da tasir
- operator sisteme uymak zorunda kalmaz

Eksisi:
- karar destegi zayiflar, sistem sadece isaret panosuna doner
- unutulursa liste bos veya copuk kalir
- her kaydi elle dusunmek gerekir, bu da panelin secim faydasini azaltir
- zamanla note/task mantigina kayma riski artar

#### BGI2) Tam derived otomatik secim
Mantik:
- sistem `ziyaret uygun` adaylari icinden kendi `bugun git` listesini de otomatik cikarir
- operator yalniz sonucu gorur

Artisi:
- en hizli yuzey deneyimi verir
- manuel is yukunu azaltir
- saha listesi daha tutarli gorunebilir

Eksisi:
- erken donemde fazla kesinlik hissi yaratir
- operatorun sezgisel saha bilgisi sistemde kaybolur
- discovery disi, mahalle bilgisi, rota niyeti gibi insan sinyalleri zayif kalir
- neden bugun diye sectigini iyi anlatamazsa guven kaybeder

#### BGI3) Derived aday + operatorun tek tik guclendirmesi
Mantik:
- sistem once `ziyaret uygun` adaylarini derive eder
- operator bunlar icinden `bugun` diye guclendirir
- yani manuel isaret sifirdan degil, aday havuzu uzerinden calisir

Ornek:
- stage uygun
- fiziksel gorusme mantikli
- son temas eski
=> `ziyaret uygun`

Sonra operator:
- `bugun` tiklar
=> kayit `bugun git` alt grubuna girer

Artisi:
- sistem karar destegi verir
- operatorun saha sezgisi son katmanda korunur
- `bugun git` anlami daha dar ve daha guvenli olur
- Businesses-first cizgisine uygun, hizli bir secim mekanizmasi sunar

Eksisi:
- aday olmayan kayit icin istisna yolu tanimlamak gerekir
- tek tikin anlami iyi yazilmazsa `neden buna tiklayabiliyorum, digerine tiklayamiyorum?` sorusu dogar
- derived aday kalitesi dusukse operator sinirlenebilir

Ara yorum:
- su an en saglikli yol acik farkla `BGI3`

### 3) Neden tam manuel model zayif gorunuyor?
Cunku bu modelde sistemin rolu su seviyeye iner:
- operator ne derse onu listele

Bu da onceki kararlarla celisir.
Cunku biz tam da su nedenle `bugun git`i stage filtresinden ayirmaya calisiyorduk:
- sistem saha seciminde bir miktar anlamli daraltma yapsin
- operator tum havuzu her seferinde bastan okumak zorunda kalmasin

Tam manuel model,
bu faydayi geri alip bizi hafif etiket panosuna dondurur.

### 4) Neden tam otomatik model de zayif?
Cunku `bugun` yalniz uygunluk degil,
gunluk niyet ve saha planlama karari da tasiyor.
Su insan sinyalleri bazen belirleyici olabilir:
- bugun o mahallede olunacak olmasi
- daha once soz verilmis olmasi
- telefonda olumlu cevap alinmis olmasi
- muhatabin belirli saatte uygun oldugunun bilinmesi

Bunlar her zaman derived veriden cikmaz.
Bu yuzden tam otomatik secim,
uygunlukla bugunluk niyeti fazla birlestirir.

### 5) O zaman en saglikli V1 davranisi nasil olmali?
Bence su cizgi en guclu:

#### Businesses listesi
- sistem `ziyaret uygun` adaylarini arka planda derive eder
- operatorun gorunen hizli aksiyonu `bugun git` olur
- bu isaret ideal olarak adaylar uzerinde tek tik guclendirme gibi calisir

#### Business Detail
- neden `ziyaret uygun` oldugu burada aciklanir
- operator gerekirse `bugun` onceligini burada da verebilir veya kaldirabilir
- ama esas mantik yine aday katmani uzerinden akar

#### Istisna yolu
- derived aday olmayan ama operatorun sahada oncelik vermek istedigi kayitlar icin,
  tam serbest genel modele donmeden dar bir `elle one al` kacis yolu sonra dusunulebilir
- bu kacis yolu V1'in varsayilani olmamali

Yani once sistem aday cikarsin,
son soz operatorun hizli guclendirmesinde olsun.

### 6) Tek tik guclendirme neden daha guvenli?
Cunku burada manuel isaret sifirdan yaratilmiyor,
bir anlam katmaninin ustune biniyor.
Bu su faydayi verir:
- `bugun git` listesi daha kisa kalir
- operator tum havuzu degil anlamli adaylari gorur
- sistemin neden bu kaydi aday gordugu sonradan detailde okunabilir
- `bugun` karari operasyonel niyet olarak ayrisabilir

Bu da onceki cizgiyle uyumlu:
- `ziyaret uygun` = derived decision
- `bugun git` = operator intent

### 7) En buyuk risk ne?
Derived aday olmayan kayitlara hic kacis yolu vermemek.
Bu durumda saha gercegi sunu diyebilir:
- sistem bu kaydi aday gormedi
- ama kurucu bugun o sokakta olacak ve yine de gidecek

Bu tip istisna mutlaka var.
Ama bunu cozmenin yolu tum modeli tam manuele cevirmek degil.
Daha guvenli yol:
- once derived-ustune-guclendirme modeliyle baslamak
- sonra gerekiyorsa detail icinde dar bir istisna override'i dusunmek

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `bugun git` isareti tam manuel ana model olmamali
- tam otomatik derived secim de fazla kesin davranir
- en saglikli V1 model: `derived ziyaret uygun adaylari + operatorun tek tik bugun guclendirmesi`
- istisnai manuel override ihtiyaci olabilir, ama bu varsayilan akisa donusmemeli

Kisa formda:
- base = system finds candidates
- operator action = promote to `bugun git`
- possible later escape hatch = narrow manual override
- not recommended = free-form full manual tagging

Bu model hem karar destegini koruyor,
hem de sahadaki insan sezgisini son katmanda kaybettirmiyor.

## Kirk birinci okuma - `temas sonucu` timeline eventi yalniz manuel mi olmali, yoksa operator notundaki belirli mikro alanlardan derive mi edilmeli?
Bir onceki kararlar su cizgiyi kurmustu:
- `guncel operator notu` = bugunluk derlenmis ozet
- `son 3 temas ozeti` = compact timeline icindeki anlamli temas eventleri
- not snapshot'i gecmisin kendisi olmamali
- ama anlamli note guncellemeleri gerekiyorsa timeline event'i uretebilir

Simdi daha uygulamaya yakin soru su:
- bu `temas sonucu` event'i operator tarafindan ayri bir event olarak mi girilmeli?
- yoksa operator notundaki belirli mikro alanlar kaydedilince sistem mi bunu tek satirlik event'e cevirmeli?

Bu ayrim onemli.
Cunku cift giris istersek saha akisi agirlasir.
Ama fazla otomatik derive edersek timeline coplenir.

### 1) Mevcut referanslar hangi yone itiyor?
`business-detail-v1.md` ve onceki notlar birlikte su resmi veriyor:
- timeline `yorum` degil `hareket` gostermeli
- operator notu ana yuzeyde `tek guncel ozet` olarak kalmali
- gorusme notu icin dusunulen minimum alanlar zaten var:
  - `muhatap / rol`
  - `ihtiyac veya itiraz`
  - `teyit edilen bilgi`
  - `sonraki temas`
- `not eklendiginde timeline eventi uretilebilir`

Buradan su guclu sey cikiyor:
- tamamen serbest metinden derive etmek riskli
- ama tamamen ayri manuel event istemek de ayni bilgiyi iki kez girdirir

### 2) Uc model

#### TS1) Yalniz manuel timeline event girisi
Mantik:
- operator notu ayridir
- temas sonucu ayrica `event ekle` gibi manuel girilir
- timeline sadece bu acik eventlerden beslenir

Artisi:
- event dili cok kontrollu olur
- timeline'da neyin girecegi net secilir
- yanlis otomasyon riski azdir

Eksisi:
- cift giris yuksek surtunme yaratir
- sahada operator notu yazar ama eventi atlayabilir
- gecmis yine eksik kalir
- V1 icin gereksiz mini CRM hareketi gibi hissedebilir

#### TS2) Serbest operator notundan otomatik derive
Mantik:
- operator mevcut notu gunceller
- sistem metinden olay cikarip timeline event'i uretir

Artisi:
- veri girisi cok hafif hissedilir
- operatoru ayri event dusunmeye zorlamaz

Eksisi:
- serbest metin yorumu kirilgan olur
- ayni notta kucuk editler de event uretebilir
- olay tarihi ile not duzenleme tarihi karisabilir
- timeline'da gurultu ve tekrar riski cok yuksek

#### TS3) Belirli mikro alanlardan kontrollu derive
Mantik:
- operator serbest metin duvarina degil, kisa temas alanlarina veri girer
- sistem yalniz anlamli temas alanlari kaydedildiginde `temas sonucu` event'i uretir
- event metni serbest nottan degil, bu alanlardan kurulur

Ornek alanlar:
- kanal veya muhatap
- sonuc tipi (`muhatap yoktu`, `ilgili`, `tekrar aranacak`, `teklif istedi` gibi)
- tek cümle kisa ozet
- sonraki temas tarihi veya niyeti

Artisi:
- cift giris azalir
- timeline daha tutarli kalir
- olay dili standartlasir
- `guncel operator notu` ile gecmis rol ayrimi korunur

Eksisi:
- mikro alanlarin siniri iyi cizilmeli
- her kaydetme event uretmemeli
- operatorun `ben sadece notumu duzelttim` hissiyle gereksiz event cikmasi engellenmeli

Ara yorum:
- su an en saglikli yol `TS3`

### 3) Neden tam manuel model zayif?
Cunku saha akisi zaten hiz gerektiriyor.
Operatorun sunu iki ayri yere girmesi zayif:
- notu guncelle
- bir de ayni gorusmenin event'ini ac

Bu ikili akista genelde ikinci adim atlanir.
Sonra su sorun olur:
- guncel not var
- ama timeline bos veya eksik

Bu da onceki hedefe ters:
- son 3 temas ozeti gercekten yasayan bir referans olmali

### 4) Neden serbest metinden otomatik derive da zayif?
Cunku operator notu bugunluk beyaz tahta gibi degisebilir.
Ornegin su tip guncellemeler olay degil, sadece derleme olabilir:
- telefon teyit edildi
- sali aranacak
- sahibi ogleden sonra orada
- Paket 2 olabilir gibi duruyor

Bunlarin serbest metinden her degisimde otomatik event'e donmesi,
timeline'i edit log'una cevirir.
Bu da onceki `timeline yorum degil hareket gosterir` cizgisini bozar.

### 5) O zaman en saglikli V1 davranisi nasil olmali?
Bence su model en guvenli:

#### Operator girdi katmani
- `guncel operator notu` serbest ama derlenmis ozet olarak kalir
- bunun yaninda temas icin kisa mikro alanlar olur
- bu alanlar gorusme/arama/ziyaret sonucunu tasir

#### Event uretim mantigi
- ancak `temas sonucu` niteligindeki alanlar doluysa event olusur
- salt not edit'i event uretmez
- ayni gun icinde anlamsiz minik duzeltmeler ikinci event acmaz

#### Timeline cikisi
- tek satir, contact-aware event uretir
- ornek: `Telefonla gorusuldu, muhatap yarin tekrar aranacak.`
- veya: `Isletmede muhatap yoktu, sali tekrar ugranacak.`

Bu modelle:
- event dili hareket olarak kalir
- gecmis not kopyasi olmaz
- operator tek seferlik girisle hem bugunku ozetini hem gecmis izini besler

### 6) Peki manuel hic olmayacak mi?
Tamamen sifir manuel demek de dogru olmayabilir.
Bence V1 cizgisi su olmali:
- varsayilan yol = mikro alanlardan kontrollu derive
- istisna yol = gerekirse detail icinde `temas sonucu ekle` benzeri dar manuel aksiyon sonra dusunulebilir

Ama bu istisna V1'in omurgasi olmamali.
Yoksa yine iki paralel veri giris kapisi acilir.

### 7) En buyuk risk ne?
Mikro alanlari sessizce buyutmek.
Mesela su yone kayarsa yine mini CRM olur:
- kanal
- muhatap
- itiraz tipi
- duygu seviyesi
- kapanis ihtimali
- teklif beklentisi
- notlar

V1 icin bu fazla.
Temas sonucu event'i yalniz su minimumu tasimali:
- muhatap veya kanal
- sonuc tipi
- kisa tek cümle ozet
- sonraki temas niyeti varsa o

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `temas sonucu` timeline eventi yalniz ayri manuel girisle yasamamalı
- ama serbest operator notundan otomatik derive da edilmemeli
- en saglikli V1 model: operator notuna yakin duran kisitli temas mikro alanlarindan kontrollu derive edilen event mantigi
- salt not edit'i event uretmez, sadece anlamli temas kaydi event'e doner

Kisa formda:
- not = current summary
- contact fields = structured minimal input
- timeline = derived contact event
- avoid = free-text auto-parsing and double manual entry

Bu model hem veri tekrarini azaltir,
hem de `son 3 temas ozeti`ni gercekten kullanilabilir bir referans olarak ayakta tutar.

## Kirk ikinci okuma - yari-yapili `neden bu paket` alani create aninda audit + Y.Z'den on-dolu mu gelmeli, yoksa placeholder ile mi baslamali?
Bu soru onceki iki ara kararin uygulama katmani:
- `neden bu paket` teklif snapshot'inin parcasi olmali
- en saglikli mantik `derived-first + kisa override`
- alan tam serbest degil, yari-yapili mikro sablon gibi tutulmali

Simdi asil soru su:
- operator teklif olustururken bos bir sablon mu gorsun?
- yoksa audit + Y.Z'den gelen taslak metinle mi baslasin?

Bu ayrim onemli.
Cunku bos baslarsa karar zinciri kopabilir.
Ama fazla dolu gelirse operator okumadan kaydedebilir.

### 1) Mevcut repo gercegi ne diyor?
Bugunku offer modelinde ayri `neden bu paket` alani yok.
Yani bu alan acilsa bile V1'de sifirdan davranis tasarlanacak.
Referanslar ise sunu acik soyluyor:
- `OFFERS.md`: teklif audit cikisina baglanmali
- onceki notlar: `neden bu paket` cekirdek kaynagini audit + Y.Z'den almali
- yari-yapili `ana eksik + bu paket + beklenen sonuc` mantigi en saglikli form gibi gorunuyor

Bu ucunu birlikte okuyunca su net:
- placeholder-only model, yukari akistan gelen zeka zincirini fazla bos birakir
- ama tamamen bitmis final metni otomatik koymak da operatoru pasiflestirebilir

### 2) Uc model

#### NP1) Yalniz placeholder ile baslasin
Ornek:
- `Ana eksik:`
- `Bu paket:`
- `Beklenen sonuc:`

Artisi:
- operator dusunerek yazar
- otomatik metne koru korune baglanmaz
- yanlis derived metin riski dusuk gorunur

Eksisi:
- audit + Y.Z zinciri create aninda gorunur dayanak uretmez
- operator bos veya asiri genel metin yazabilir
- hizli akista alan atlanabilir
- `derived-first` onceki kararini zayiflatir

#### NP2) Tam on-dolu derived metinle gelsin
Ornek:
- audit ana eksigi
- Y.Z aksiyonu
- secili paket
birlesip tek taslak metin olusturur

Artisi:
- teklifin neden dogdugu ilk anda kayda baglanir
- operatora hiz kazandirir
- kalite tabani yukselir

Eksisi:
- operator metni okumadan oldugu gibi birakabilir
- audit zayif/eskiyse hatali gerekceyi tasir
- alan `otomatik yazildi, gectim` hissine donusebilir

#### NP3) Hafif on-dolu mikro sablonla gelsin
Mantik:
- alan bos gelmez
- ama tam bitmis paragraf da gelmez
- audit + Y.Z, sablonun icine kisa taslak parcaciklar onerir
- operator bunlari gozden gecirip tamamlar veya dar duzeltme yapar

Ornek baslangic:
- `Ana eksik: Maps bilgileri ve yorum akisi zayif.`
- `Bu paket: Paket 2, temel vitrine ek olarak QR yorum akisini kurmak icin secildi.`
- `Beklenen sonuc: daha tutarli gorunurluk ve yorum toplama baslangici.`

Artisi:
- derived zinciri korunur
- operator tamamen sifirdan yazmak zorunda kalmaz
- alanin yari-yapili karakteri korunur
- `okumadan gecme` riski tam otomatik paragrafa gore daha dusuk olur

Eksisi:
- iyi taslak kalitesi ister
- audit zayifsa taslak da zayif olabilir
- operatorun neyi degistirebilecegi acik olmali

Ara yorum:
- su an en saglikli yol `NP3`

### 3) Neden yalniz placeholder zayif gorunuyor?
Cunku bu model ilk bakista temiz gibi dursa da,
pratikte onceki karar zincirini koparir:
- audit sorunu buldu
- Y.Z siradaki aksiyonu verdi
- ama teklif create ekranina gelince operator yine bos sayfayla karsilasti

Bu durumda sistem karar destegi,
teklif aninda tekrar sifira duser.
Bu da V1'in hiz ve sadelik hedefine ters.

### 4) Neden tam on-dolu final metin de riskli?
Cunku `neden bu paket` alaninin isi sadece otomatik aciklama gostermek degil,
teklif anindaki bilincli karari sabitlemek.
Tam paragraf on-dolgu su riski getirir:
- operator onu kontrol etmeden kaydeder
- sonra metin gercek saha itirazini veya butce gercegini yansitmaz
- alan derived raporun kopyasina doner

Yani alanin snapshot olma rolu zayiflar.

### 5) O zaman en saglikli V1 davranisi nasil olmali?
Bence su model en guclu:

#### Create aninda
- `neden bu paket` alani yari-yapili sablonla acilsin
- audit + Y.Z'den gelen kisa taslaklar bu sablonun icine on-dolu gelsin
- operator bu metni gozden gecirip gerekirse kisa duzeltme yapsin

#### Edit mantigi
- `draft/sent` asamasinda kontrollu duzenlenebilir olsun
- `approved` olduktan sonra frozen snapshot'a donsun

#### Guvenlik kuralı
- eger `audit teyidi gerekli` sinyali varsa,
  on-dolgu yine gelebilir ama `paket secmeden once audit teyidi onerilir` cizgisiyle birlikte okunmali
- yani prefill, zayif audit'i sessizce maskelememeli

### 6) Bu model neden iyi calisiyor?
Cunku onceki kararlarla hizali:
- audit = paket zemini
- Y.Z = siradaki karar gecidi
- teklif = secilen cozumu snapshot'a baglayan yer

Hafif on-dolu sablon bunlari birbirine baglar,
ama operatorun sahadaki gercek farkini eklemesine de izin verir.
Yani ne bos form duvarina doner,
ne de otomatik rapor kopyasina.

### 7) En buyuk risk ne?
On-dolgu kalitesizse operatorun kotu metni duzeltmeden gecmesi.
Bu yuzden V1'de on-dolgu dili su kadar sade olmali:
- tek iddia
- tek paket nedeni
- tek beklenen sonuc

Daha uzun ve pazarlama kokan metinler,
hem okunmaz hem de yanlis guven uretir.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- yari-yapili `neden bu paket` alani create aninda bos placeholder ile baslamamali
- ama tam final paragraf olarak da otomatik dolmamalı
- en saglikli V1 model: audit + Y.Z'den gelen kisa taslaklarla on-dolu, yari-yapili ve operatorun kisa duzeltmesine acik bir alan
- approval sonrasi bu alan frozen teklif snapshot'ina donmeli

Kisa formda:
- not recommended = empty placeholder only
- not recommended = full auto paragraph
- recommended = prefilled micro-template + short operator refinement

Bu model hem teklifi audit zincirine bagliyor,
hem de operatoru sadece kopyalayip gecen pasif okuyucuya cevirmiyor.

## Kirk ucuncu okuma - derived aday olmayan kayitlar icin dar istisna override'i listede mi, yoksa yalniz detail icinde mi daha guvenli olur?
Bir onceki kararlar su cizgiyi kurmustu:
- `bugun git` ana model olarak tam manuel olmamali
- en saglikli V1 cizgisi `derived ziyaret uygun adaylari + operatorun tek tik bugun guclendirmesi`
- derived aday olmayan kayitlar icin gerekirse dar bir istisna override'i sonra dusunulebilir

Simdi asil soru su:
- bu istisna override Businesses listesinde hizli bir isaret olarak mi olmali?
- yoksa yalniz Business Detail icindeki tek kayit karar yuzeyinde mi acilmali?

Bu ayrim kritik.
Cunku istisna yolunu fazla gorunur yaparsak ana model delinir.
Ama fazla gizlersek saha gercegindeki ani kararlar tasinmaz.

### 1) Mevcut yuzeyler ne soyluyor?
Bugunki repo gercegi su:
- `Businesses` sayfasi filtre + liste + detaya gecis yuzeyi
- satir veya kart icinde aksiyon yok, daha cok secim ve tarama yapiyor
- `Business Detail` ise tek kayit resmi, Y.Z, audit ve tarama sinyalleriyle `bu kayitta ne yapilmali?` sorusuna daha yakin

Bu iki yuzeyi birlikte okuyunca su netlesiyor:
- istisna override `liste secimi`nden cok `tek kayit hakkinda bilincli operator karari` gibi duruyor
- yani rolen dogal evi detail tarafina daha yakin

### 2) Uc model

#### DO1) Override dogrudan Businesses listesinde olsun
Ornek:
- satirda `Bugun yine de one al` benzeri hafif bir aksiyon
- derived aday olmayan kayit da listeden tek tikla `bugun git`e alinabilir

Artisi:
- en hizli yol budur
- sahada anlik karar icin iyi hissedebilir
- liste uzerinden toplu saha secimi yapan operatora hiz verir

Eksisi:
- derived modelin disiplinini erken deler
- `neden bu kaydi override ettim?` sorusu kayitsiz kalir
- listede filtre + secim + istisna aksiyonu birikir
- mobilde Businesses yuzeyi agirlasir
- `Businesses` kolayca mini operasyon panosuna kayar

#### DO2) Override yalniz Business Detail icinde olsun
Ornek:
- operator derived aday olmayan kaydi detailde acip,
  `ziyaret uygun degil ama bugun one al` benzeri dar bir aksiyon kullanir
- gerekce detail baglaminda okunur

Artisi:
- istisna bilincli ve baglamli olur
- tek kayit karar yuzeyi rolune uyar
- Businesses listesi sade kalir
- operator override yaparken Y.Z, audit, dis sinyal ve notu ayni anda gorur

Eksisi:
- bir tik daha yavas olabilir
- cok hizli saha gununde ekstra gecis hissi yaratabilir
- operator bazen `listeden halletmek isterdim` diyebilir

#### DO3) Hem listede hem detailde olsun
Artisi:
- maksimum esneklik verir
- farkli calisma stillerine uyumlu gorunur

Eksisi:
- iki giris kapisi ayni istisnayi farkli sekilde acmis olur
- hangisinin kanonik oldugu bulanir
- V1'de gereksiz kapsam buyutur
- yine genel CRM savrulmasi riski artar

Ara yorum:
- su an en saglikli yol acik farkla `DO2`

### 3) Neden liste override'i zayif gorunuyor?
Cunku Businesses tarafi zaten onceki kararlarda su rol icin secildi:
- kaydi bul
- daralt
- kisa secim sinyali gor
- detail'e gec

Eger istisna override'i de listeye tasirsak,
su seyler ayni yerde toplanir:
- filtre
- stage okuma
- `bugun git`
- derived sinyal
- istisna karari

Bu noktada liste sayfasi `hafif secim ekrani` olmaktan cikip,
mini dispatch paneline donmeye baslar.
Bu da onceki sade cizgiye ters.

### 4) Neden detail override daha guvenli?
Cunku istisna zaten siradan durum degil.
Istisna demek su tip bir insan bilgisi var demek:
- bugun o mahalleden gecilecek
- muhatapla sozlesildi
- onceki telefon gorusmesi olumlu gecti
- derived model bunu henuz goremiyor ama operator biliyor

Bu tip farklar tek kayit baglaminda daha dogru okunur.
Business Detail de zaten su soruya ayrilmis durumda:
- `bu isletmede simdi ne yapmaliyim?`

Yani derived modele istisna getirme karari,
topludan cok tek kayit kararina benziyor.

### 5) O zaman en saglikli V1 davranisi nasil olmali?
Bence su model en guclu:

#### Businesses listesi
- derived adaylari ve `bugun git` sinyalini gosterir
- ama derived disi kayit icin serbest override aksiyonu tasimaz
- operatoru gerekiyorsa detail'e gonderir

#### Business Detail
- derived karar acik okunur: `gidilir / uzaktan ilerlet / beklet`
- eger operatorun saha bilgisi farkliysa, dar bir istisna aksiyonuyla `bugun one al` diyebilir
- bu aksiyon mumkunse kisa bir sebep tipiyle baglanir:
  - `rota`
  - `muhatap teyidi`
  - `saha bilgisi`
  - `ozel durum`

Bu sayede:
- ana model korunur
- istisna kapisi vardir
- ama istisna listeyi domine etmez

### 6) Listeye hic sinyal gelmemeli mi?
Bence liste tamamen kor olmamali.
Ama override aksiyonu ile override izi ayri sey.
Daha guvenli cizgi su olabilir:
- operator detailde istisna override yaptiysa,
  Businesses listesinde bunun sonucu gorunebilir
- ama override'in kendisi listeden baslatilmaz

Yani liste `sonucu gorur`,
karari ise detail tasir.
Bu ayrim cok degerli.

### 7) En buyuk risk ne?
Istisna yolunu fazla kolaylastirmak.
Eger derived disi her kayda listeden tek tik atilabilirse,
operator zamanla derived katmani okumayi birakir.
O zaman su cizgi zayiflar:
- system finds candidates
- operator promotes intentionally

Bu yuzden override kapisi olmali,
ama default davranis kadar kolay olmamali.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- derived aday olmayan kayitlar icin dar istisna override'i V1'de listede degil, yalniz Business Detail icinde daha guvenli duruyor
- Businesses listesi override aksiyonu degil, secim ve gorunurluk yuzeyi olarak kalmali
- detailde verilen override karari sonra listeye sonuc sinyali olarak yansiyabilir
- boylece istisna yolu var olur, ama ana model delinmez

Kisa formda:
- not recommended = list-level free override
- recommended = detail-level narrow override
- acceptable visibility = list shows result, not control

Bu model hem `Businesses-first` gunluk hissini koruyor,
hem de istisna kararini dogru baglama tasiyor.

## Kirk dorduncu okuma - `audit teyidi` uyarisinda `eski / ince / tarama-gerilimi` disinda baska esik gerekli mi?
Bir onceki ara karar suydu:
- `audit teyidi gerekli` sinyali yumusak olmali
- asli yeri audit snapshot / paket yonu tarafi olmali
- karar ani yansimasi yalniz `teklife gec` koprusunde gorunmeli
- ilk esik seti su ucluydu:
  - `eski audit`
  - `ince audit`
  - `tarama-gerilimi`

Simdi soru su:
- bu uc isaret V1 icin yeterli mi?
- yoksa baska risk sinyalleri de ayni uyariya dahil edilmeli mi?

Bu onemli.
Cunku esik seti dar kalirsa zayif audit gozden kacabilir.
Ama fazla genislerse `audit teyidi` her seyin cop torbasina doner.

### 1) Referanslar hangi yone itiyor?
Repo ve referanslar birlikte su ayirimi veriyor:
- `audit` = `teklife gecildiyse hangi paket yonu uygun?`
- `Y.Z` = `simdi teklife gecilir mi, yoksa once dogrulama mi gerekir?`
- `business-detail-v1.md` audit puanini degil, audit ozeti ve eksik listesini one aliyor
- `yz-report` kontratinda `supheli eslesme` ve `veri yetersiz` ayri genel durumlar olarak zaten var
- external katmanda `isClosed` gibi dis dunya riskleri tutuluyor ama bunlar canonical/audit zeminiyle karistirilmiyor

Buradan guclu bir cizgi cikiyor:
- `audit teyidi` uyarisi, audit kalitesine dair dar bir kalite kontrol olmali
- genel veri guvensizligi veya eslesme suphesi bunun icine yigilmamali

### 2) Uc model

#### ATS1) Mevcut uc esik yeterli, baska bir sey eklenmesin
Esikler:
- eski audit
- ince audit
- tarama-gerilimi

Artisi:
- kural sade kalir
- operator neyin eksik oldugunu kolay anlar
- uyari spam'e donmez

Eksisi:
- bazi gri vakalar disarida kalabilir
- audit teknik olarak dolu ama yine de kalitesiz olabilir

#### ATS2) Daha genis kalite sepeti acilsin
Ek aday sinyaller:
- Y.Z `veri yetersiz`
- Y.Z `supheli eslesme`
- `isClosed`
- `channelReadiness = dusuk`
- ownership / maps uyumsuzlugu

Artisi:
- daha kapsayici gorunur
- operatorun gozunden daha az sey kacabilir

Eksisi:
- `audit teyidi` sinyalini amacindan saptirir
- Y.Z ve external riskleri audit kalitesine gomerek katmanlari karistirir
- sayfada hangi uyari ne icin var anlasilmaz

#### ATS3) Uc esik cekirdek kalsin, diger riskler ayri sinyal ailelerinde dursun
Mantik:
- `audit teyidi` yalniz audit zemini zayifsa ciksin
- `supheli eslesme`, `veri yetersiz`, `isClosed` gibi seyler baska katmanda daha erken ve daha sert okunur
- `channelReadiness` gibi alanlar ise audit ozetinin icine erir, ayri esik olmak zorunda degil

Artisi:
- katman ayrimi korunur
- audit uyarisi yalniz kendi isini yapar
- sayfa dili daha anlasilir kalir

Eksisi:
- farkli risk aileleri icin iyi isimlendirme ister
- operator bazen `neden bu da audit teyidi degil?` diye sorabilir

Ara yorum:
- su an en saglikli yol `ATS3`

### 3) Neden `supheli eslesme` veya `veri yetersiz` ayni sepete girmemeli?
Cunku bunlar `paket zemini biraz zayif` problemi degil,
daha onceki karar kapisini etkileyen sinyaller.
Eger Y.Z durumu `supheli eslesme` veya `veri yetersiz` ise,
sorun su seviyededir:
- bu kayitla devam etmeli miyiz?
- eslesme dogru mu?
- daha fazla veri mi lazim?

Bu, `audit teyidi`nden daha yuksek seviyeli bir sorudur.
Ayni etikete gomulurse operator sorunun agirligini yanlis okur.

### 4) `isClosed` veya benzeri dis riskler neden ayri kalmali?
Cunku `isClosed` bir audit kalite sorusu degil,
dis dunya gercekligi sorusu.
Boyle bir durumda dogru cizgi daha cok su olur:
- once kaydin kapanik/supheli olup olmadigini netlestir
- sonra teklif zeminini konus

Yani `isClosed`, audit teyidinin alt sinyali degil;
daha erken bir dogrulama/uyari ailesine ait.

### 5) `channelReadiness dusuk` gibi audit alanlari ek esik olmali mi?
Bence hayir, dogrudan ayri esik olmak zorunda degil.
Cunku bu tip alanlar zaten audit ozetinin `ince` veya `zayif` olma hissine katkida bulunur.
Ayri esik yaparsak sunu uretebiliriz:
- audit ince
- readiness dusuk
- eksik listesi zayif

Sonra ayni problemi uc farkli isimle tekrar ederiz.
Bu da uyariyi sisirir.

### 6) O zaman en saglikli V1 esik seti nasil gorunmeli?
Bence su sekilde:

#### `audit teyidi gerekli`nin cekirdek esikleri
- `eski audit`: audit `updatedAt`, son anlamli tarama/Y.Z girisinden belirgin eskiyse
- `ince audit`: audit ozeti yok, asiri kisa veya paket yonu cikarmaya yetmeyecek kadar bos ise
- `tarama-gerilimi`: son dis bulgular, auditteki paket yonu veya ana eksikle gerilim uretiyorsa

#### Bu uyarinin DISINDA kalacak ama AYRI okunacak riskler
- `supheli eslesme`
- `veri yetersiz`
- `isClosed` / kapanik sinyali
- discovery/external dogrulama sorunlari

Bu model su ayrimi korur:
- `audit teyidi` = paket zemini yeterince saglam mi?
- `Y.Z / external risk` = bu kayit ve gorunum guvenilir mi?

### 7) En buyuk risk ne?
Her turlu supheyi `audit teyidi` etiketi altina yikmak.
Bu olursa operator sunu okuyamaz:
- veri mi eksik?
- eslesme mi supheli?
- audit mi zayif?
- paket yonu mu eski?

Yani tek uyariyla cok sey anlatmaya calismak,
uyari sistemini basitlestirmek degil bulandirmak olur.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `audit teyidi` uyarisi icin cekirdek esik seti olarak `eski / ince / tarama-gerilimi` yeterli gorunuyor
- `supheli eslesme`, `veri yetersiz`, `isClosed` gibi sinyaller ayni uyariya eklenmemeli
- bunlar audit kalitesi degil, daha ust veya daha dis risk aileleri olarak ayri okunmali
- yani ek sinyal ihtiyaci varsa cozum `audit teyidi`ni buyutmek degil, ayri risk dili kurmak

Kisa formda:
- keep = old / thin / scan-conflict
- do not fold in = mismatch / insufficient-data / closed
- principle = one warning family, one job

Bu model hem katman ayrimini koruyor,
hem de `audit teyidi` uyarisini gercekten okunur bir kalite sinyali olarak tutuyor.

## Kirk besinci okuma - `ince audit` esigi yalniz karakter uzunlugu mu olmali, yoksa yari-yapili icerik kontrolu mu istemeli?
Bir onceki kararda su cizgiyi netlestirdim:
- `audit teyidi` cekirdek olarak `eski / ince / tarama-gerilimi` uclusune dayansin
- ama burada en kaygan alan `ince audit`
- cunku `ince`yi yalniz hisle birakirsam sistem tutarsizlasir

Simdi asil soru su:
- `ince audit` sadece cok kisa metin demek mi?
- yoksa audit metni paket kararina yetecek asgari iskeleti tasiyor mu diye daha yapili bakmak mi gerekir?

### 1) Mevcut repo gercegi ne diyor?
Kod tarafinda audit kaydi bugun cok hafif:
- `channelReadiness`
- `summary`
- `updatedAt`

Y.Z ve agent scan uretimi de auditten yalniz `summary` okuyor.
Yani bugun kanonik audit modeli ayri alanlar halinde suyu tutmuyor:
- ana eksik
- paket yonu
- beklenen sonuc

Bu cok onemli.
Cunku V1'de elimizde gercek anlamda yapili audit objesi yok.
Demek ki cozum ya tamamen serbest metne razi olacak,
ya da serbest metnin icinde dar bir mikro iskelet arayacak.

### 2) Uc model

#### IAE1) Yalniz karakter uzunlugu esigi
Ornek mantik:
- 0-20 karakter = ince
- 20-60 karakter = supheli
- 60+ karakter = yeterli

Artisi:
- uygulamasi en kolay
- teknik olarak hizli ve ucuz

Eksisi:
- uzun ama bos auditleri kacirir
- kisa ama guclu auditleri haksiz yere cezalandirir
- operatoru daha iyi audit yazmaya degil, daha uzun audit yazmaya iter

#### IAE2) Tam yapili alan zorunlulugu
Ornek mantik:
Audit mutlaka ayri alanlarla tutulur:
- ana eksik
- paket yonu
- beklenen sonuc

Artisi:
- kalite kontrol net olur
- teklif zemini daha saglam okunur

Eksisi:
- bugunku veri modeline fazla buyuk gelir
- teklif netlesmeden yeni form yapisi ve ekran buyutur
- V1 icin agirlik yaratir

#### IAE3) Serbest metin + dar mikro iskelet kontrolu
Mantik:
- audit kaydi hala tek `summary` olarak kalir
- ama sistem `ince audit`i yalniz uzunlukla degil, auditin icindeki kritik isaretlerle anlar
- auditte asgari olarak su tip bilgi aranir:
  - sorun/eksik ne
  - beklenen cozum veya yon ne
  - beklenen sonuc / neden bu yone gidildigi ne

Artisi:
- bugunku hafif veri modelini bozmaz
- yalniz uzunluga bakmaktan daha akilli olur
- V1'de yeni tablo ve zorunlu form duvari acmaz

Eksisi:
- heuristik kalir
- her zaman kusursuz olmaz
- iyi isimlendirilmis mikro sablon ister

Ara yorum:
- su an en saglikli yol `IAE3`

### 3) Neden yalniz uzunluk zayif?
Cunku auditin isi `uzun olmak` degil,
su sorulari cevaplamak:
- asıl eksik ne?
- hangi paket yone mantikli?
- bu paket neyi duzeltecek?

`Instagram yok, site zayif, yorum az.` gibi cumle 40-50 karakteri gecebilir,
ama hala teklif zemini icin zayif kalabilir.
Tersine,
`Website yok. Paket 1 vitrini uygun. Amaç görünürlük ve güven.` gibi daha kisa bir metin,
paket karari icin daha kullanimli olabilir.

Yani karakter sayisi yardimci olabilir,
ama ana karar olmamali.

### 4) Neden tam yapili alan zorunlulugu simdilik agir?
Cunku su an referanslar net sekilde soyluyor:
- teklif netlesmeden ekran cogaltma
- form duvarina donmeme
- CRM'e kaymama

Eger `ince audit`i cozmek icin hemen su alanlari zorunlu acarsam:
- ana eksik
- paket yonu
- beklenen sonuc
- destekleyici not

bu kez audit kalitesini korurken V1 sadeligini bozarim.
Sorun gercek ama cozumun agirligi simdilik fazla.

### 5) O zaman en saglikli mikro iskelet ne olabilir?
Bence `summary` serbest kalirken,
sistem icin dar bir uc ayakli iskelet yeterli:
- `ana eksik`
- `paket / cozum yonu`
- `beklenen sonuc`

Ornek iyi audit ozeti:
- `Website yok ve iletisim daginik. Paket 1 vitrini uygun. Amaç güven veren temel görünürlük.`

Ornek zayif audit ozeti:
- `Dijital taraf zayif.`
- `Bakilacak.`
- `Site olabilir.`

Bu ayrim,
karakter uzunlugundan daha iyi kalite sinyali verir.

### 6) Teknikte nasil yorumlanmali?
Bence V1 icin su hiyerarsi dogru:
- once tamamen bos mu bak
- sonra asiri kisa mi bak
- sonra mikro iskelet sinyali var mi bak

Yani `ince audit` karari tek kosullu degil,
dar bir kombinasyonla verilir:
- bos veya cok kisa ise direkt `ince`
- orta uzunlukta ama `sorun + yon + sonuc` iskeletinden yalniz bir parcayi tasiyorsa yine `ince`
- yeterli uzunlukta ve en az iki-uc kritik parcayi tasiyorsa `ince degil`

Bu model hem teknik olarak uygulanabilir,
hem de operator davranisini daha dogru yone iter.

### 7) En buyuk risk ne?
Mikro iskeleti gizli form zorunluluguna cevirmek.
Eger sistem her auditte cok katı `template police` gibi davranirsa,
operator serbestce dusunemez.
Bu yuzden mikro iskelet sunu yapmali:
- kalite kontrolu saglamali
- ama birebir sablon dayatmamali

Yani hedef `herkes ayni cumleyi yazsin` degil,
`paket kararina yetecek omurga bulunsun` olmali.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `ince audit` esigi yalniz karakter uzunluguna birakilmamali
- ama tam yapili audit form zorunluluguna da gidilmemeli
- en saglikli V1 yol, tek `summary` icinde `ana eksik + cozum yonu + beklenen sonuc` omurgasini arayan hafif bir kalite kontrol
- karakter uzunlugu yalniz yardimci sinyal olmali, ana karar degil

Kisa formda:
- not enough = length only
- too heavy = structured mandatory fields now
- recommended = free text with narrow content skeleton

Bu model hem mevcut repo gercegine uyuyor,
hem de `audit teyidi` icindeki `ince audit` sinyalini daha akilli hale getiriyor.

## Kirk altinci okuma - audit ozetindeki mikro iskelet yardimi operatora gorunur placeholder olarak mi verilmeli, yoksa yalniz arka planda kalite kontrolu olarak mi kalmali?
Bir onceki karar sunu netlestirmisti:
- `ince audit` esigi yalniz uzunlukla belirlenmemeli
- ama tam yapili alan zorunluluguna da gidilmemeli
- en mantikli yol, tek `summary` icinde `ana eksik + cozum yonu + beklenen sonuc` omurgasini hafifce aramak

Simdi asil soru su:
- bu mikro iskelet operatora yazarken gorunmeli mi?
- yoksa sistem bunu sessizce arkada kontrol edip yalniz sonradan `ince audit` uyarisina mi cevirmeli?

Bu karar kucuk gibi gorunuyor ama davranis tasarimi acisindan kritik.
Cunku operator neyi nasil yazacagini hic gormezse kalite artmayabilir.
Ama fazla gorunur yaparsak yine yarim-form duvarina kayariz.

### 1) Repo ve referanslar hangi yone itiyor?
Mevcut cizgi su:
- Project OS formlari `dar form alani` mantiginda, sayfayi ele gecirmemeli
- `business-detail-v1.md` ana yuzeyi karar ve ozet alaninda tutuyor, detay veya editor duvarina cevirmiyor
- playbook ise audit cikisinin teklife neden ve beklenen sonuc bagiyla gitmesini istiyor
- bugunku veri modeli tek `summary` alaniyla calisiyor, ayri audit alt alanlari yok

Buradan iki guclu sonuc cikiyor:
- operatora hic rehber vermemek zayif kalabilir
- ama rehberi tam gorunur mini form gibi acmak da V1 sadeligini bozar

### 2) Uc model

#### MIK1) Yalniz arka plan kalite kontrolu olsun
Mantik:
- operator bos textarea gorur
- sistem arka planda `ince audit` kontrolu yapar
- zayifsa sonra uyari verir

Artisi:
- UI cok sade kalir
- yeni gorunur metin eklenmez
- form duvari riski dusuktur

Eksisi:
- operator neye gore daha iyi audit yazacagini basktan anlamaz
- uyari ancak yazildiktan sonra gelir
- ayni hata tekrarlanabilir

#### MIK2) Mikro iskelet tam gorunur placeholder / yardim metni olarak verilsin
Ornek:
- placeholder: `Ana eksik nedir? Hangi cozum yone uygun? Beklenen sonuc ne?`
- veya kisa yardim satiri: `Eksik + cozum yonu + beklenen sonuc yaz.`

Artisi:
- operatoru dogru dusunmeye iter
- kalite kontrolunu proaktif hale getirir
- yeni tablo acmadan davranis kalitesini artirabilir

Eksisi:
- kotu yazilirsa yapay ve ogretmenvari durur
- placeholder fazla belirgin olursa audit alanini yari-yapili forma cevirir
- mobil veya hizli kullanimda gorsel yuk artabilir

#### MIK3) Hibrit model: hafif gorunur ipucu + arka plan kalite kontrolu
Mantik:
- textarea serbest kalir
- placeholder veya yardim metni cok kisa olur
- sistem yine arka planda kalite kontrolu yapar
- yalniz zayif durumda `audit teyidi` veya `gozden gecir` sinyali cikar

Artisi:
- davranisi basta yonlendirir
- ama tam form hissi vermez
- kalite kontrolunu sonradan da korur

Eksisi:
- metnin tonu iyi ayarlanmazsa ya etkisiz kalir ya da fazla ogretici durur
- iki katmanli model oldugu icin isimlendirme disiplini ister

Ara yorum:
- su an en saglikli yol `MIK3`

### 3) Neden yalniz arka plan kontrolu zayif?
Cunku audit kalitesini yalniz hata aninda uyarmak,
operatoru iyi ornege yonlendirmekten daha zayif bir mekanizma.
Ozellikle bugunki veri modeli tek `summary` oldugu icin,
kullanicinin zihninde su soru acik kalir:
- ne yazmami bekliyorsun?

Sistem bunu hic soylemezse,
`Dijital taraf zayif.` gibi bos ama teknik olarak gecerli cumleler artabilir.

### 4) Neden tam gorunur placeholder da tek basina yeterli degil?
Cunku placeholder faydali olsa bile,
operator onu her zaman izlemez.
Ayrica placeholder tek basina kalite kontrolu yapmaz.
Uzun ama bos bir metin yine yazilabilir.
Yani yalniz placeholder koyup denetimi birakmak da eksik olur.

### 5) O zaman en saglikli gorunur yardim ne kadar gorunur olmali?
Bence burada doz cok onemli.
V1 icin en guvenli cizgi su:
- tek satirlik hafif placeholder veya yardim metni
- ornekten cok yon veren bir dil
- mini checklist veya ek alanlar yok

Ornek uygun ton:
- `Ana eksik, uygun cozum yonu ve beklenen sonucu kisaca yazin.`

Ornek fazla agir ton:
- `1. Ana eksik 2. Paket yonu 3. Beklenen sonuc 4. Notlar`

Ikinci secenek audit alanini hemen yari-forma cevirir.
Birinci secenek ise dusunme yonu verir ama ekran buyutmez.

### 6) Bu yardim nerede durmali?
Bence en dogru yer audit `summary` alaninin placeholder'i veya hemen altindaki tek satir yardim metni.
Ayri kart, drawer veya acik checklist gereksiz.
Cunku problem tek alanda cozuluyor:
- audit summary nasil daha faydali yazilir?

Ayni seyi baska yuzeye tasimak V1 mantigina ters.

### 7) En buyuk risk ne?
Mikro yardimi zamanla gizli schema'ya cevirmek.
Eger sonra sunlar gelirse risk baslar:
- zorunlu ikonlar
- eksik alan chipleri
- mini form breakdown
- audit composer drawer

Bu noktada hafif yardim,
mini audit editorune donusur.
Bu da `teklif netlesmeden ekran cogaltma` cizgisine ters.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- audit ozetinde mikro iskelet yardimi tamamen gizli kalmamali
- ama tam gorunur yari-form haline de getirilmemeli
- en saglikli V1 model, operatora tek satirlik hafif placeholder/yardim verip kalite kontrolunu arkada surduren hibrit yaklasim
- yani rehber gorunur olur, denetim ise sessizce devam eder

Kisa formda:
- not enough = hidden-only quality control
- too much = visible mini-template/form
- recommended = subtle prompt + background check

Bu model hem operatoru bastan dogru yone iter,
hem de UI'yi audit editorune cevirmeden kaliteyi korur.

## Kirk yedinci okuma - audit summary icin uygun placeholder dili soru formunda mi, yoksa yon veren duz cumle formunda mi daha guvenli olur?
Bir onceki karar suydu:
- audit summary alaninda hafif gorunur bir mikro yardim olmali
- ama bu yardim yari-forma donusmemeli
- en guvenli cizgi `subtle prompt + background check`

Simdi soru daha da daraldi:
- bu gorunur yardim soru gibi mi yazilmali?
- yoksa yon veren duz cumle gibi mi yazilmali?

Ilk bakista kucuk bir kelime secimi gibi gorunuyor,
ama aslinda operatora verilen ton ve yon duygusunu etkiliyor.

### 1) Repo dili ne diyor?
Mevcut repo yuzeylerine bakinca belirgin bir desen var:
- placeholder ve yardim metinleri agirlikla yon veren duz cumle formunda
- ornekler:
  - `Yapmak istediginiz degisikligi, kafanizdaki soru isaretlerini ve neyi tartmak istediginizi duz metin olarak yazin.`
  - `Ne icin prompt istediginizi, neden simdi gerektigini ve kafanizdaki soruyu duz metin olarak yazin.`
  - `Giris sonrasi donen baglantiyi ya da kodu yapistirin`
- soru isaretiyle biten placeholder neredeyse yok

Bu cok degerli bir sinyal.
Cunku urun dili bugun operatoru `sorguya cekmekten` cok,
`yon verip is yaptirmaya` dayaniyor.

### 2) Uc model

#### PHD1) Soru formu
Ornek:
- `Ana eksik ne? Hangi cozum yone uygun? Beklenen sonuc ne?`

Artisi:
- operatorun zihninde dusunme basligi acabilir
- uc ayagi acikca hatirlatir

Eksisi:
- audit alanini mini sorgu listesine cevirir
- placeholder icinde art arda sorular yapay durabilir
- repo genel tonuyla daha az uyumlu
- hizli kullanimda `cevap formu` hissi verir

#### PHD2) Yon veren duz cumle
Ornek:
- `Ana eksik, uygun cozum yonu ve beklenen sonucu kisaca yazin.`

Artisi:
- mevcut repo diliyle uyumlu
- kisa, net, uygulanabilir
- operatora ne yapacagini soyler ama onu mini forma sokmaz
- SOUL ve USER tonuyla daha yakin

Eksisi:
- soru formu kadar ayrik dusunme basligi acmayabilir
- cok genel yazilirsa kolay gozden kacar

#### PHD3) Hibrit soru-cumle
Ornek:
- `Ana eksik ne, uygun cozum yone ne, kisaca yazin.`

Artisi:
- hem dusundurur hem yon verir gibi gorunur

Eksisi:
- iki ton birbirine girer
- ne tam soru, ne tam yonlendirme olur
- en kolay yapaylasan secenek budur

Ara yorum:
- su an en saglikli yol `PHD2`

### 3) Neden soru formu zayif gorunuyor?
Cunku audit summary alaninin isi uzun bir dusunme oturumu baslatmak degil,
hizli ama faydali bir operasyon ozeti cikarmak.
Art arda sorular sunu hissettirebilir:
- sistem benden uc ayri cevap bekliyor
- demek ki burada yari-form var

Bu da onceki kirmizi cizgiye dokunur:
- teklif netlesmeden ekran cogaltma
- form duvarina donmeme

Yani soru formu niyet olarak dogru olsa bile,
UI hissi olarak gereksiz agirlik uretebilir.

### 4) Neden yon veren duz cumle daha guvenli?
Cunku su uc seyi ayni anda sagliyor:
- ne yazilacagini kisaca soyluyor
- ayni alani uce bolmuyor
- mevcut panel diline uyuyor

Ayrica USER ve SOUL cizgisi de bunu destekliyor:
- kisa
- net
- uygulanabilir
- gereksiz teori yok

`... kisaca yazin` formu tam bu davranisi tasiyor.

### 5) Bu cumle ne kadar yon verici olmali?
Burada da doz onemli.
Asiri yumusak olursa faydasizlasir:
- `Audit notu yazin`

Asiri didaktik olursa agirlasir:
- `Ana eksigi, cozum yonunu, beklenen sonucu ve destekleyici gerekceyi ayri ayri belirtin`

Bence V1 icin orta doz en saglikli:
- ne yazilacagini soyler
- ama checklist gibi acilmaz

Ornek iyi ton:
- `Ana eksik, uygun cozum yonu ve beklenen sonucu kisaca yazin.`

### 6) Yardim metni mi, placeholder mi?
Bu sorunun yan cevabi da burada netlesiyor:
Eger duz cumle secilecekse,
placeholder olarak kullanmak daha dogal gorunuyor.
Cunku bir soru listesi placeholder icinde daha rahatsiz durur.
Duz cumle ise hem placeholder'da hem alt yardim satirinda dogal kalabilir.

Yani secilen ton,
yuzey secimini de kolaylastiriyor.

### 7) En buyuk risk ne?
Duz cumleyi fazla genel yazip islevsizlestirmek.
Eger metin sadece `Kisa audit ozeti yazin` olursa,
mikro iskelet yardimi kaybolur.
Demek ki esas mesele sadece `soru mu cumle mi` degil,
duz cumlenin yeterince yon verici olup olmadigi.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- audit summary placeholder dili soru formunda degil, yon veren duz cumle formunda daha guvenli duruyor
- bu secim hem repo'nun mevcut placeholder diline uyuyor hem de audit alanini yari-forma cevirmiyor
- soru formu dusundurucu olsa da V1 sadeligini bozma ve mini checklist hissi verme riski daha yuksek
- bu yuzden gorunur mikro yardim varsa ton `ne yapilacagini soyleyen duz cumle` olmali

Kisa formda:
- not recommended = multi-question placeholder
- awkward = hybrid question-sentence
- recommended = short directive sentence

Bu model hem urun dilini tutarli kiliyor,
hem de audit summary alanini sade ama daha faydali hale getiriyor.

## Kirk sekizinci okuma - approval oncesi delivery risk sinyali gerekirse bunun yeri teklif karti mi, yoksa kickoff acilmadan onceki ayri bir hazirlik satiri mi olmali?
Bu soru onceki iki kararin yuzey yerlesimini birlestiriyor:
- `kapsam teyidi` normal haliyle approved-sonrasi kickoff kartinin dogal evi
- approval oncesi delivery benzeri bir kopukluk gorulecekse bu ayni adla degil, daha hafif `scope/hazirlik riski` dilinde kalmali

Ama hala acik bir nokta vardi:
- bu hafif risk sinyali gerekiyorsa nerede durmali?
- teklif kartinin icinde mi?
- yoksa teklif ile kickoff arasina yeni bir `hazirlik satiri` mi acilmali?

Bu onemli.
Cunku ayni bilgiye farkli ev secmek,
urunun stage disiplinini dogrudan etkiliyor.

### 1) Referanslar hangi yone itiyor?
Mevcut referanslar birlikte su cizgiyi veriyor:
- `business-detail-v1.md` kart zincirini audit / son teklif / son teslimat olarak kuruyor, araya ekstra operasyon kati eklemiyor
- onceki minimum zincir kararinda `Teklif karti` ve `Kickoff karti` ayrildi; arada ayri bir pre-kickoff yuzey onerilmedi
- `Project OS` mantigi `audit -> teklif -> teslimat -> bakim` sirasini sert tutuyor
- delivery create formu zaten son tekliften otomatik scope taslagi uretiyor, yani kickoff hazirligi teknik olarak tekliften tureyen bir kopru
- skill kirmizi cizgisi yine ayni: teklif netlesmeden ekran cogaltma yok

Buradan cikan ilk kuvvetli his su:
- ayri bir `pre-kickoff` satiri kolayca hayalet bir besinci asamaya donusebilir

### 2) Uc model

#### ADR1) Erken risk sinyali teklif kartinin icinde ikincil satir olarak dursun
Ornek:
- `Scope/hazirlik riski var`
- `Paket netlesince kickoff notu gozden gecirilmeli`

Artisi:
- yeni stage acmaz
- ticari karar ile ona bagli operasyon riski ayni kayitta okunur
- teklif karti zaten teslimati besleyen operasyon girdisi olarak tanimli
- UI buyumez

Eksisi:
- doz kacarsa teklif karti yarim kickoff kartina doner
- iyi isimlendirme ister

#### ADR2) Teklif ile kickoff arasina ayri `hazirlik satiri` veya mini kart girsin
Ornek:
- `Kickoff oncesi hazirlik`
- `Teslim riskleri`
- `Scope netligi`

Artisi:
- delivery dilini teklif kartindan ayirir gibi gorunur
- gelecekte eksik asset / erisim sinyallerini burada toplama hissi verebilir

Eksisi:
- fiilen yeni bir ara asama acar
- `audit -> teklif -> teslimat` hattini `audit -> teklif -> hazirlik -> teslimat` gibi hissettirir
- tekrar riski yuksektir
- Business Detail'i daha erken mini operasyon panosuna cevirir

#### ADR3) Approval oncesi hic gosterme, sadece approved sonrasi kickoff kartina birak
Artisi:
- en sade ve en temiz stage disiplini budur
- V1 scope'u korur

Eksisi:
- bazi kopukluklar gec fark edilir
- operator bazen teklifi kapatmadan once `teslimata tasinir mi` sorusunu hic gormez

Ara yorum:
- genel kural olarak `ADR3` V1 default icin en guvenli
- ama erken sinyal gercekten lazim olursa, yer olarak `ADR1` daha saglikli
- `ADR2` en riskli secenek

### 3) Neden ayri hazirlik satiri zayif gorunuyor?
Cunku urunun omurgasi zaten dar:
- audit = sorun ve yon
- teklif = secilen cozum
- teslimat = onayli cozumu uygulama

Araya `hazirlik satiri` sokunca su belirsizlesir:
- bu yeni bir asama mi?
- kim ne zaman bu satira bakacak?
- kickoff yoksa bu satir neyi temsil ediyor?

Bu da onceki `pipeline fetish` riskine dokunur.
Kucuk bir uyari icin yeni bir ara katman acmak,
uyaridan daha buyuk tasarim maliyeti dogurur.

### 4) Neden teklif karti icindeki ikincil satir daha dogal?
Cunku approval oncesi sorun hala esasen su sorudur:
- bu paket ve bugunku notlar teslimata tasinirken kopma riski uretiyor mu?

Bu soru henuz tam delivery sorusu degil,
teklifin operasyonel saglamligi sorusu.
Dolayisiyla eger erken uyari verilecekse,
onun en dogal evi `son teklif` kartinin ikincil alani olur.

Bu model su ayrimi korur:
- ana teklif karti = paket, tutar, neden bu paket
- ikincil hafif risk satiri = `teslimata inerken dikkat`
- kickoff karti = approved sonrasi asil kapsam teyidi

### 5) Teklif karti delivery kartina kaymadan bu nasil yapilir?
Bence iki sinir gerekli:
- dil hafif kalmali: `hazirlik riski`, `scope notu eksik`, `paket netlesince kontrol et`
- teslimat detayina girmemeli: asset listesi, yayin hedefi, erisim checklist'i burada acilmamali

Yani teklif kartindaki erken sinyal,
`teslimat paneli acilisi` degil,
yalniz `kopma olabilir` uyarisi olmali.

### 6) Peki hic erken sinyal olmamasi neden hala guclu aday?
Cunku bugunku veri modeli ve ekran siniri dusunulunce,
once approved-sonrasi kickoff kartini dogru kurmak daha degerli olabilir.
Erken sinyal ancak su durumda anlam kazanir:
- teklif kartinda `neden bu paket` ve diger alanlar zaten okunur hale gelmis
- operator hala tekrarlayan sekilde ayni teslim kopuklugunu yasiyor

Bu kanit olmadan erken sinyal acmak,
ongorulu ama gereksiz bir komplikasyon olabilir.

### 7) O zaman en saglikli V1 cizgisi ne?
Bence su net siralama dogru:
- V1 default: approval oncesi ayri delivery risk sinyali hic acma
- eger gercek kullanimda tekrar eden kopukluk kaniti cikarsa,
  bunu ayri `hazirlik satiri` olarak degil, `son teklif` karti icinde hafif ikincil satir olarak ekle
- approved sonrasi asil `kapsam teyidi` yine kickoff kartinda yasasin

Bu sayede:
- stage zinciri bozulmaz
- ekstra ara yuzey acilmaz
- ama gerekirse erken uyari icin dogal bir yuva hazir olur

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- approval oncesi delivery risk sinyali gerekiyorsa bunun yeri ayri bir kickoff-oncesi `hazirlik satiri` degil, `son teklif` karti icindeki hafif ikincil satir olmali
- ancak V1 baslangicinda en guvenli yol bunu hic erken acmamak, once approved-sonrasi kickoff kartini dogru oturtmak
- ayri hazirlik satiri yeni bir ara asama hissi urettigi icin gereksiz scope ve tekrar riski tasiyor

Kisa formda:
- V1 default = no early delivery-risk row
- if needed later = small secondary line inside offer card
- not recommended = separate pre-kickoff prep row

Bu model hem `audit -> teklif -> teslimat` omurgasini koruyor,
hem de erken delivery dilinin urunu yeni bir stage'e savurmasini onluyor.

## Kirk dokuzuncu okuma - teklif kartindaki olasi erken risk satiri hangi dilde daha guvenli olur?
Bir onceki karar sunu netlestirmisti:
- approval oncesi ayri bir `hazirlik satiri` acmak iyi degil
- V1'de default olarak hic erken delivery risk satiri olmayabilir
- ama ileride gercek kullanimda gerekirse, bu sinyal `son teklif` karti icinde hafif ikincil satir olarak yasamali

Simdi soru daha da daraldi:
- boyle bir satir gerekirse hangi dil daha guvenli?
- hem operatora bir seylerin eksik olabilecegini hissettirsin
- hem de delivery/kickoff asamasi aciliyormus hissi vermesin

### 1) Repo dili ve urun cizgisi ne diyor?
Taranan metinlerde belirgin bir ton var:
- UI dili kisa ve yon veren cumleleri seviyor
- `eksik`, `kontrol`, `risk` gibi kelimeler kullaniliyor
- ama stage isimleri de net korunuyor: `kickoff`, `delivery`, `approved`
- onceki kararlar delivery dilini teklif kartina sizdirmama konusunda sert

Buradan iki ilke cikiyor:
- etiket cok teknik ya da stage-adli olmamali
- cok genel korku dili de olmamali

### 2) Uc aday

#### ERD1) `hazirlik riski`
Artisi:
- kisa
- delivery stage adi tasimiyor
- teknik degil

Eksisi:
- fazla genel
- hangi hazirlik, neyin riski, belli degil
- operatora aksiyon yerine belirsiz alarm hissi verir

#### ERD2) `scope notu eksik`
Artisi:
- sorunun `not / kapsam netligi` tarafinda oldugunu anlatir
- tam delivery asamasi acmaz
- dramatik degil, daha operasyonel durur

Eksisi:
- `scope` Ingilizce kaliyor
- UI'de Turkce cizgi icinde biraz yabanci durabilir
- yalniz yazilirsa cok teknik hissedebilir

#### ERD3) `kickoff oncesi kontrol`
Artisi:
- operatora ne zaman bakilacagini soyler
- gecis mantigini ima eder

Eksisi:
- delivery stage'ini erkenden cagirir
- neredeyse yeni bir mini asama gibi okunur
- tam kacinmak istedigim `pre-kickoff row` hissine yaklasir

Ara yorum:
- bu uc secenek icinde en zayif olan acikca `ERD3`
- `ERD1` ve `ERD2` arasinda ise daha guvenli cekirdek `ERD2`, ama Turkcelestirilmis haliyle

### 3) Neden `kickoff oncesi kontrol` riskli?
Cunku bu ifade yalnizca bir uyari degil,
zihinde bir surec kapisi acar:
- demek ki kickoff oncesi ayri kontrol var
- demek ki burada ayri bir bekleme hali olabilir

Bu da onceki kararlarla catisir.
Kucuk bir metin, istemeden yeni bir stage hissi uretebilir.

### 4) Neden `hazirlik riski` tek basina zayif?
Cunku `risk` kelimesi operatora sunlari ayni anda hissettirebilir:
- neyin riski?
- ticari mi?
- teslimat mi?
- eksik belge mi?

Yani dikkat ceker ama yon vermez.
Uyari gorulur, ama neyin gozden gecirilecegi net olmayabilir.
Bu da fazla soyut kalir.

### 5) Neden `scope notu eksik` dogru yone daha yakin?
Cunku problem aslinda su:
- secilen paket var
- ama bunu teslimata tasiyacak kisa kapsam notu veya netlik zayif olabilir

Yani asil mesele `risk`ten cok,
`kapsam notu net degil` problemidir.
Bu dil:
- delivery asamasi acmaz
- sorunu somutlastirir
- operatora hangi tur gozden gecirme gerektigini hissettirir

Ama buradaki sorun su:
- `scope` kelimesi repo icinde var ama kullanici dili icin fazla Ingilizce kalabilir

### 6) O zaman en guvenli nihai yon ne?
Bence dogru yon,
`scope notu eksik` secenegini Turkcelestirmek:
- `kapsam notu eksik`
- veya daha yumusak haliyle `kapsam notu netlesmeli`

Bu iki varyasyon arasinda da fark var:

#### `kapsam notu eksik`
- daha net
- daha keskin sinyal
- sorun daha gorunur

#### `kapsam notu netlesmeli`
- daha yumusak
- operatoru azarlamaz
- delivery stage hissi yaratmadan gozden gecirmeye iter

Su anki urun tonu dusunulunce,
en guvenli aday bana `kapsam notu netlesmeli` gorunuyor.
Cunku hem sorunun ne oldugunu anlatir,
hem de `eksik` kadar sert veya alarmvari durmaz.

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- erken teklif-ici risk satiri gerekirse `kickoff oncesi kontrol` gibi stage cagirici bir dil kullanilmamali
- `hazirlik riski` fazla genel kaldigi icin ikinci tercih seviyesinde
- en guvenli yon, `scope notu` fikrini Turkcelestirip yumusatmak
- bu nedenle en saglikli dil adaylari:
  - birinci tercih: `kapsam notu netlesmeli`
  - ikinci tercih: `kapsam notu eksik`

Kisa formda:
- not recommended = `kickoff oncesi kontrol`
- too vague = `hazirlik riski`
- recommended direction = `kapsam notu ...`
- safest tone = `kapsam notu netlesmeli`

Bu model hem delivery-asamasi hissini erken cagirmiyor,
hem de operatora bakacagi seyin kapsam netligi oldugunu soyluyor.

## Ellinci okuma - erken teklif-ici uyari satiri ikon/renk dili tasimali mi, yoksa yalniz sessiz bir ikincil metin olarak mi kalmali?
Bir onceki ara karar suydi:
- erken delivery-kopma sinyali V1'de default olarak hic acilmamali
- sonradan gercekten gerekirse `son teklif` karti icinde hafif ikincil satir olabilir
- en guvenli metin yonu `kapsam notu netlesmeli`

Simdi soru su:
- bu satir bir `uyari kutusu` gibi mi gorunmeli?
- yoksa yalniz sessiz ikincil metin olarak mi kalmali?

Bu kritik.
Cunku ayni cumle farkli gorsel dozla cok farkli anlam tasir.
Yanlis doz, kucuk bir hatirlatmayi gereksiz alarm haline getirebilir.

### 1) Repo ve tasarim sistemi hangi yone itiyor?
Taranan kaynaklar su cizgiyi veriyor:
- urunde `muted` ikincil aciklama metni yaygin kullaniliyor
- badge'ler daha cok durum ozeti ve sayi gostermek icin kullaniyor
- `warning/danger` renk tokenlari var ama bunlar daha belirgin problem hallerine uygun
- voice guide `kisa cumle`, `sonucu bastan soyle`, `kullaniciyi suclama` diyor
- UX kurali bilgi yogunlugunun kontrollu olmasini istiyor
- onceki kararlar da bu erken satirin delivery stage'i hissettirmemesini istiyor

Buradan ilk guclu sonuc su:
- bu satir ana alarm diliyle acilmamali

### 2) Uc model

#### GZD1) Renkli/ikonlu belirgin uyari satiri
Ornek:
- sari arka plan
- warning border
- unlem ikonu
- `kapsam notu netlesmeli`

Artisi:
- gozden kacmasi zor
- operator hemen fark eder

Eksisi:
- kucuk bir hazirlik notunu stage-seviyesi probleme cevirir
- teklif kartinda delivery gerilimini fazla buyutur
- warning tonu zamanla spam'e donebilir
- V1 sade cizgiye ters duser

#### GZD2) Sessiz ikincil metin
Ornek:
- teklif kartinda paket/neden bu paket satirinin altinda
- `muted` tonla kisa metin: `Kapsam notu netlesmeli.`

Artisi:
- stage drift uretmez
- karti yeni uyari kutusuna cevirmez
- mevcut repo diliyle uyumlu
- ikincil ama okunabilir kalir

Eksisi:
- kolay gozden kacabilir
- ancak gercekten ikincil ise bu bazen kabul edilebilir

#### GZD3) Orta doz: hafif ikon veya ton, ama kutu degil
Ornek:
- muted metin + kucuk info/warning ikonu
- veya yalniz warning-text rengi, arka plan yok

Artisi:
- sessiz metinden daha fark edilir
- tam alert kutusu kadar agresif degil

Eksisi:
- ikon veya renk yine onu `uyari bileti` gibi gosterebilir
- tasarim sistemi icinde yeni bir ara desen dogurur
- V1'de gereksiz yeni UI kurali acabilir

Ara yorum:
- V1 icin en saglikli yol `GZD2`
- `GZD3` ancak sessiz metin gercek kullanimin icinde cok kolay kacarsa dusunulebilir

### 3) Neden belirgin uyari kutusu zayif?
Cunku bu satirin anlami su kadar dar:
- tekliften teslimata inerken kisa kapsam netligi gerekebilir

Bu, `supheli eslesme`, `isClosed`, `veri yetersiz` gibi ust seviye uyari ailesi degil.
Buna sari kutu, ikon ve border verirsek,
sorunun agirligini oldugundan fazla gostermis oluruz.

Ayrica onceki kararlar delivery dilinin teklif kartina sizmamasini istiyordu.
Belirgin warning stili,
metnin delivery-asamasi hissini daha da yukseltebilir.

### 4) Neden sessiz ikincil metin daha guvenli?
Cunku bu satir ana karar degil,
ana kart icindeki yardimci netlestirme.
Teklif kartinin merkezinde halen su olmalı:
- paket
- tutar
- neden bu paket
- domain/ekler

`Kapsam notu netlesmeli.` gibi bir cizgi ise,
bu cekirdegin altinda duran operasyonel dip not olur.
Bu rol icin `muted` veya benzeri ikincil stil yeterli.

### 5) Peki hicbir gorsel vurgu olmamasi metni kaybettirir mi?
Bazen evet.
Ama bu risk su anda kabul edilebilir gorunuyor.
Cunku onceki karar da sunu soyluyor:
- bu satir default degil
- yalniz tekrar eden gercek kullanim ihtiyacinda acilacak

Yani bu satir bir gun eklenirse,
zaten nadir ve baglamli bir durumda cikacak.
Boyle bir sey icin ilk tercih sessiz ama okunur metin olmali.
Sorun cikarsa doz sonra artirilir.

### 6) Orta doz ikonlu model neden simdilik gereksiz?
Cunku ikon/renkli ince vurgu ilk bakista cazip gorunse de,
aslinda yeni bir desen aciyor:
- hangi ikincil satir ikon alir?
- hangisi yalniz muted kalir?
- sari mi gri mi?
- teklifteki diger yan notlar ne olacak?

Bu da V1 icin gereksiz tasarim borcu yaratir.
Bir problem cozulmeden once yeni pattern acmak iyi degil.

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- erken teklif-ici uyari satiri gerekirse ikon/renkli alert gibi tasinmamali
- en guvenli V1 sunumu, yalniz sessiz ama okunur bir ikincil metin olmali
- warning/danger tonlari daha ust seviye riskler icin saklanmali
- eger ileride sessiz metin gercek kullanimi tasimazsa, o zaman hafif bir ara vurgu yeniden dusunulebilir

Kisa formda:
- not recommended = warning box / alert row
- maybe later = tiny icon or light emphasis
- recommended now = muted secondary line only

Bu model hem ekran dozunu dusuk tutuyor,
hem de kucuk bir operasyon notunu gereksiz alarm haline getirmiyor.

## Elli birinci okuma - `kapsam notu netlesmeli` satiri yalniz metin olarak mi kalmali, yoksa hemen altina `teklifi guncelle` benzeri mikro aksiyon da baglanmali mi?
Bir onceki karar suydi:
- boyle bir satir V1'de default degil
- bir gun gerekirse `son teklif` karti icinde sessiz ikincil metin olarak durmali
- en guvenli metin tonu `kapsam notu netlesmeli`

Simdi soru su:
- bu metin tek basina yeterli mi?
- yoksa operatoru hizlandirmak icin hemen yanina/altina `teklifi guncelle` gibi mikro aksiyon mu eklenmeli?

Bu kucuk gorunen karar aslinda kart mimarisini etkiliyor.
Cunku bir dip notu butonla birlestirdigimde,
o not bir `yardimci sinyal` olmaktan cikip mini goreve donusmeye baslayabilir.

### 1) Referanslar hangi yone itiyor?
Repo ve referanslar birlikte su cizgiyi veriyor:
- `UX Rules`: her section'da 1 ana CTA, en fazla 1 ikincil CTA
- `business-detail-v1.md`: primary CTA tek olur, digerleri destek aksiyon olur
- onceki teklif karti minimumu zaten `primary aksiyon = teklifi ac / guncelle / gonder`
- Business Detail'in isi karar ve yon bulmak, task duvari olmak degil
- ayni bilgi ve ayni hareket gereksiz tekrar etmemeli

Bu cizgi cok net:
- teklif kartinin zaten bir primary aksiyonu varken,
  erken risk satirina ayrica mikro aksiyon baglamak kolayca rekabet uretebilir

### 2) Uc model

#### MAA1) Yalniz metin olarak kalsin
Ornek:
- `Kapsam notu netlesmeli.`
- altinda ekstra buton yok

Artisi:
- kart hiyerarsisini bozmaz
- primary aksiyon rekabeti yaratmaz
- gereksiz task hissi dogurmaz
- onceki `sessiz ikincil metin` kararina en uyumlu secenek budur

Eksisi:
- operatorun hangi hareketi yapacagi tamamen kartin mevcut primary aksiyonundan cikmasi gerekir
- bazen biraz fazla sessiz kalabilir

#### MAA2) Her durumda mikro aksiyon eklensin
Ornek:
- `Kapsam notu netlesmeli.`
- yaninda `Teklifi guncelle`

Artisi:
- dogrudan yon verir
- gozden kacma ihtimalini azaltir

Eksisi:
- ayni kartta ikinci bir fiili CTA yaratir
- `teklifi guncelle` zaten kartin ana aksiyonuyla cakisabilir
- dip notu mini task'a cevirir
- V1 scope'unu gereksiz buyutur

#### MAA3) Baglamsal mikro aksiyon olsun
Mantik:
- yalniz belirli durumda ciksin
- mesela primary aksiyon `teklifi gonder` ise, ikincil olarak `notu duzelt` gibi acilsin

Artisi:
- tum durumda degil, daha kontrollu olur
- bazen faydali kisayol gibi davranabilir

Eksisi:
- yeni karar tablosu gerektirir
- hangi durumda mikro aksiyon var/yok mantigi karmasilasir
- V1'de erken pattern borcu yaratir

Ara yorum:
- su an en saglikli yol acik farkla `MAA1`

### 3) Neden mikro aksiyon eklemek zayif gorunuyor?
Cunku bu satirin rolu zaten ikincil:
- ana karar = teklif kartinin primary aksiyonu
- ikincil yardim = kapsam netligi uyarisi

Eger bu ikincil yardima buton eklersem,
su sorular dogar:
- primary aksiyon hangisi?
- `teklifi guncelle` ile kartin ana butonu farkliysa hangisini once yapiyorum?
- ayni kartta neden iki ayri yon var?

Bu da onceki `tek primary CTA` kuralini zayiflatir.

### 4) `teklifi guncelle` zaten kartta dogal olarak var mi?
Buyuk olasilikla evet.
Cunku onceki teklif karti minimumunda zaten su cizgi var:
- primary aksiyon = `teklifi ac / guncelle / gonder`

Yani `kapsam notu netlesmeli` satiri ciktigi anda,
operatorun yapacagi hareket cogu zaman zaten kartin ana aksiyonuna dahil olacak.
Bu durumda ekstra mikro buton yeni deger uretmekten cok,
mevcut hareketi ikinci kez soylemis olur.

### 5) Peki hic aksiyon baglamamak operatoru belirsiz birakir mi?
Sinirli olculde birakabilir,
ama bu risk su sekilde daha temiz cozulebilir:
- metin kendi basina yeterince yon verici olur
- kartin mevcut primary aksiyonu ayni baglamda kalir

Ornek okuma:
- primary: `Teklifi guncelle`
- ikincil metin: `Kapsam notu netlesmeli.`

Bu ikili zaten operatora yeterli yon verir.
Ekstra bir mikro buton olmadan da mantik kurulabilir.

### 6) Baglamsal mikro aksiyon neden simdilik fazla?
Cunku ilk bakista makul gorunse de,
sistemde yeni kural ailesi aciyor:
- draft'ta baska mi gorunecek?
- sent'te baska mi?
- approved'a yakin durumda ne olacak?
- mikro aksiyon primary ile nasil iliskilenecek?

Bu da kucuk bir yardimci satir icin,
orantisiz bir karar karmasasi getirir.
V1 icin pahali.

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- `kapsam notu netlesmeli` satiri yalniz metin olarak kalmali
- hemen altina `teklifi guncelle` benzeri ayri bir mikro aksiyon baglamak gerekmez
- cunku teklif kartinin kendi primary aksiyonu zaten buna dogal cikis yolu saglar
- ekstra mikro aksiyon, tek primary CTA kuralini zayiflatir ve dip notu mini task'a cevirir

Kisa formda:
- recommended = text only
- no need = extra micro action
- reason = primary action already covers it

Bu model hem kart hiyerarsisini koruyor,
hem de kucuk bir operasyon sinyalini gereksiz ikincil buton setine cevirmiyor.

## Elli ikinci okuma - `neden bu paket` on-dolgu kalitesi dusukse operatoru hafifce uyaran bir `gozden gecir` sinyali gerekir mi?
Bir onceki kararlar su omurgayi kurdu:
- `neden bu paket` alani teklif snapshot'inin parcasi olmali
- create aninda audit + Y.Z'den gelen yari-yapili on-dolgu ile acilmali
- operator kisa duzeltme yapabilmeli
- ama bu alan bos yorum cebi olmamali

Simdi asil soru su:
- on-dolgu kalitesi dusuk oldugunda hic sinyal vermeden devam mi edilmeli?
- yoksa operatoru hafifce durdurup `gozden gecir` benzeri bir kalite sinyali mi lazim?

Bu soru onemli.
Cunku yari-otomatik on-dolgu modeli hiz kazandirir,
ama kalite dusukse operatoru pasiflestirme riski de tasir.

### 1) Referanslar hangi yone itiyor?
Mevcut cizgi su:
- `OFFERS.md` teklifin audit cikisina baglanmasini ve `hangi eksik -> hangi paket -> ne teslim` zincirini netlestirmesini istiyor
- onceki notlarda `neden bu paket` alaninin yari-yapili ama okunur snapshot olmasi kararlasti
- ayni notlarda `audit teyidi gerekli` sinyalinin yumusak ama gorunur olmasi kabul edildi
- son kararlar da kucuk ikincil kalite sinyallerinin sessiz, ikincil ve CTA'siz kalmasi gerektigini gosterdi

Buradan gelen guclu sonuc su:
- kalite sinyali fikri yabanci degil
- ama bu sinyal yeni bir task veya ikinci CTA uretmemeli

### 2) Uc model

#### NPG1) Hic sinyal olmasin
Mantik:
- on-dolgu ne kadar iyi/kotu olursa olsun operator kendisi okur
- ek bir kalite sinyali verilmez

Artisi:
- en sade akistir
- yeni kural acmaz

Eksisi:
- dusuk kaliteli on-dolgu kolayca okunmadan gecebilir
- yari-otomatik metin `tamamdir` hissi verebilir
- teklif snapshot kalitesi sessizce duser

#### NPG2) Hafif `gozden gecir` sinyali olsun
Mantik:
- on-dolgu asiri genel, eksik veya mikro iskeleti zayif tasiyorsa
  `neden bu paket` alanina yakin sessiz bir ikincil metin cikar
- operatora `gozden gecir` denir ama akis kitlenmez

Artisi:
- otomatik metnin pasifce kaydedilme riskini azaltir
- kaliteyi yumusak sekilde yukari iter
- onceki `audit teyidi` modeline benzer bir kalite guvencesi kurar

Eksisi:
- iyi esik ister
- fazla sik cikarsa okunmaz hale gelebilir

#### NPG3) Daha belirgin etiket / badge olsun
Ornek:
- `Gozden gecir` badge'i
- sari tonlu minik uyari

Artisi:
- gozden kacmasi daha zor

Eksisi:
- kucuk kalite sinyalini gereksiz alarm haline getirir
- teklif kartini dikkat dagitici hale getirir
- onceki `sessiz ikincil sinyal` cizgisine ters duser

Ara yorum:
- su an en saglikli yol `NPG2`

### 3) Neden hic sinyal olmamasi zayif?
Cunku bu alanda onceki kararla bilincli bir risk kabul edildi:
- tam paragraf otomatik yazilmiyor
- ama yari-yapili on-dolgu geliyor

Bu modelin en buyuk zayifligi su olabilir:
- operator taslagi `yeterince iyi` sanip hic bakmadan gecer
- ama metin aslinda `ana eksik`, `paket nedeni` veya `beklenen sonuc` ayaklarindan birini zayif tasiyor olabilir

Buna hic sinyal vermemek,
on-dolgunun kalite sorununu sessizce teklif snapshot'ina tasir.

### 4) Neden belirgin badge/uyari fazla?
Cunku burada konustugumuz sey ust seviye bir risk degil,
metin kalitesine dair kucuk bir operator yardimi.
Sari badge veya belirgin etiket kullanirsak,
sorunun agirligini oldugundan buyuk gosteririz.
Ayrica bu alan zaten teklif kartinin ikincil karar katmani.
Orada bir de belirgin `gozden gecir` etiketi,
kartin asıl hiyerarsisini bozar.

### 5) O zaman en saglikli hafif sinyal neye benzemeli?
Bence onceki kararlarla ayni cizgi izlenmeli:
- ayri badge degil
- ayri buton degil
- sessiz ikincil metin
- kısa ve yon verici bir dil

Ornek:
- `Paket gerekcesi kisaca gozden gecirilmeli.`
- veya daha yalniz: `Paket gerekcesi netlesmeli.`

Burada `gozden gecir` ifadesi,
operatorun otomatik metni kontrol etmesini ister,
ama yeni bir asama ya da alarm hissi yaratmaz.

### 6) Bu sinyal ne zaman cikmali?
Esik yine dar olmali.
Bence yalniz su tip durumlarda:
- on-dolgu asiri genel kaldiysa
- `ana eksik + paket + beklenen sonuc` omurgasindan yalniz tek parcayi tasiyorsa
- audit zayifligindan dolayi teklif gerekcesi mekanik veya belirsiz gorunuyorsa

Yani her teklifte degil,
yalniz kalite dusukse cikmali.
Yoksa operator bu metni de audit teyidi gibi arka plan gurultusune cevirir.

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- `neden bu paket` on-dolgu kalitesi dusukse hafif bir kalite sinyali gerekli gorunuyor
- ama bu sinyal belirgin badge/uyari degil, alanin yakininda sessiz ikincil metin olmali
- `gozden gecir` fikri uygun, cunku operatoru kontrol etmeye iter ama akisi kilitlemez
- esik dar tutulmali; her teklifte degil, yalniz zayif on-dolguda cikmali

Kisa formda:
- not enough = no signal
- too much = badge / alert-style review tag
- recommended = quiet secondary `gozden gecir` cue

Bu model hem yari-otomatik teklif gerekcesinin kalite riskini frenliyor,
hem de teklif kartini yeni bir uyari panosuna cevirmiyor.

## Elli ucuncu okuma - `neden bu paket` kalite sinyalinde en guvenli nihai metin hangisi?
Bir onceki ara karar sunu netlestirmisti:
- `neden bu paket` alani yari-otomatik on-dolgu ile acilmali
- kalite dusukse hafif bir sinyal faydali gorunuyor
- ama bu sinyal badge/alert degil, sessiz ikincil metin olmali

Simdi soru daha da daraldi:
- bu sessiz sinyal hangi kelimeyle daha guvenli olur?
- `gozden gecirilmeli` mi?
- yoksa `netlesmeli` gibi daha yumusak bir varyant mi?

Bu kucuk gibi gorunuyor,
ama kelime secimi operatorun alani nasil okudugunu degistirir.
Biri kontrol ve duzeltme hissi verir,
digeri eksik dusunceyi tamamlama hissi verir.

### 1) Repo ve onceki kararlar hangi yone itiyor?
Eldeki cizgi su:
- `neden bu paket` alaninin isi teklif snapshot'ini okunur sekilde sabitlemek
- bu alan derived-first ama operatorun kisa duzeltmesine acik
- quality cue varsa sessiz ikincil metin olmali
- voice guide kisa, suclayici olmayan, sonucu bastan soyleyen mikro metin istiyor
- onceki delivery-ici sinyalde `kapsam notu netlesmeli` ifadesi daha guvenli bulunmustu, cunku stage hissi veya alarm uretmiyordu

Buradan cikan ilk sonuc su:
- burada da ayni cizgide, yumusak ama yon verici bir dil daha guvenli olabilir

### 2) Uc model

#### NKS1) `Paket gerekcesi gozden gecirilmeli.`
Artisi:
- operatora aktif bir kontrol eylemi soyler
- otomatik metni pasifce kaydetme riskini azaltir
- net bir fiil barindirir

Eksisi:
- bir miktar denetim/uyari tonu tasir
- alan hataliymis gibi hissedilebilir
- sik cikarsa `review fatigue` uretebilir

#### NKS2) `Paket gerekcesi netlesmeli.`
Artisi:
- daha yumusak
- alani eksik ama duzeltilebilir bir taslak gibi hissettirir
- warning yerine rafine etme daveti sunar
- sessiz ikincil metin rolune daha iyi oturur

Eksisi:
- `gozden gecir` kadar eylem cagirici degil
- bazi operatorler icin fazla yumusak kalabilir

#### NKS3) `Paket gerekcesi kisa duzeltme isteyebilir.` gibi belirsiz dil
Artisi:
- en yumusak ton olabilir

Eksisi:
- fazla dolayli
- ne yapilacagi zayif anlasilir
- UI mikro metni icin gereksiz muallak kalir

Ara yorum:
- su an en saglikli yol `NKS2`

### 3) Neden `gozden gecirilmeli` biraz sert kalabiliyor?
Cunku bu ifade genelde sunu ima eder:
- mevcut metin yeterince guvenli degil
- operator bunu kontrol etmeden ilerlememeli

Bu ton bazen dogru olabilir,
ama burada konustugumuz durum ust seviye risk degil,
kalitesi dusuk bir yari-on-dolgu.
Yani amac:
- `yanlis` diye alarm vermek degil
- `biraz daha netlestir` demek

Bu yuzden `gozden gecir` fiili,
bazi durumlarda ihtiyac olandan biraz daha denetleyici duyulabilir.

### 4) Neden `netlesmeli` daha guvenli?
Cunku bu ifade alani su sekilde okutur:
- temel fikir var
- ama daha net hale gelmeli
- operator bunu kisa dokunusla iyilestirebilir

Bu ton,
derived-first + short refinement modeline tam uyuyor.
Alan tamamen bos degil,
komple hatali da degil,
sadece snapshot kalitesi biraz daha aciklik istiyor.
`netlesmeli` bunu daha iyi tasiyor.

### 5) Yine de `netlesmeli` fazla yumusak kalir mi?
Bir miktar risk var.
Ama burada iki koruyucu sey zaten mevcut:
- sinyal yalniz dusuk kalite durumunda cikar
- kartin primary aksiyonu zaten teklifi guncelleme/acma tarafinda olur

Yani mikro metnin her seyi tek basina halletmesi gerekmiyor.
Onun isi yalniz yon vermek.
Bu rolde `netlesmeli` yeterince iyi gorunuyor.

### 6) O zaman en saglikli nihai ifade ne?
Bence iki iyi adaydan su siralama dogru:
- birinci tercih: `Paket gerekcesi netlesmeli.`
- ikinci tercih: `Paket gerekcesi gozden gecirilmeli.`

Birincisi daha yumusak,
daha az denetleyici,
daha cok taslagi iyilestirme daveti tasiyor.
Bu da onceki sessiz ikincil sinyal kararlarina daha yakin.

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- `neden bu paket` kalite sinyalinde en guvenli nihai metin `Paket gerekcesi netlesmeli.` gorunuyor
- `Paket gerekcesi gozden gecirilmeli.` daha net ama biraz daha denetleyici ikinci tercih olarak kalabilir
- kucuk kalite sinyali icin yumusak ama yon verici dil daha tutarli duruyor

Kisa formda:
- recommended = `Paket gerekcesi netlesmeli.`
- fallback = `Paket gerekcesi gozden gecirilmeli.`
- avoid = fazla dolayli veya alarmvari metinler

Bu model hem yari-otomatik on-dolgu mantigina uyuyor,
hem de teklif kartinda gereksiz sertlik olusturmuyor.

## Elli dorduncu okuma - `ilk acilis` ton modulatoru icin muhatap tipi ile temas kanali ayni anda farkli yone cekerse hangisi baskin olmali?
Bir onceki kararlar su cizgiyi kurmustu:
- `ilk acilis` ayri bir saha-derived satir olmali
- template ailesi esas olarak problem tipinden secilmeli
- segment yalniz hafif ton modulatoru olmali

Simdi kritik soru su:
- muhatap tipi ile temas kanali ayni cumleyi farkli yone cekerse hangisi one gecmeli?

Ornek gerilimler:
- sahibi/karar verici ama WhatsApp kanali
- resepsiyon/gatekeeper ama yuz yuze temas
- telefonda hizli akan ama teknik olarak daha cok detay isteyebilecek bir muhatap

Bu soru onemli.
Cunku yanlis oncelik kurulursa cumle ya format olarak yanlis olur,
ya da yanlis kisiye yanlis agirlikta soylenir.

### 1) Referanslar hangi yone itiyor?
Farkli kaynaklar birlikte okununca su desen cikiyor:
- QR/NFC arastirmasi surekli `kullanicinin o andaki baglami` ve `temas noktasi`ni birincil kabul ediyor
- ayni arastirma `masa`, `kasa`, `resepsiyon`, `vitrin` gibi fiziksel temas noktasina gore ayni CTA'nin bile degistigini soyluyor
- tek sayfa site arastirmasi da CTA setini kanal/niyet gercegine gore kuruyor: telefon, WhatsApp, yol tarifi, rezervasyon
- onceki notlarda `muhatap tipi` ve `temas kanali` segmentten daha kuvvetli olasi modulatorler olarak belirdi

Buradan ilk guclu sonuc su:
- temas kanali, cumlenin bicimini belirleyen daha sert bir sinir gibi duruyor
- muhatap tipi ise bicimden cok `izin seviyesi` ve ton yumusakligini ayarlayan ikinci katman gibi

### 2) Uc model

#### MKT1) Muhatap tipi baskin olsun
Mantik:
- once kiminle konustuguna bak
- kanal sonra cumleyi hafifce duzeltsin

Artisi:
- yanlis kisiye fazla dogrudan veya fazla teknik konusma riskini azaltir
- gatekeeper ile karar vericiyi ayirmak onemli oldugu icin mantikli gorunur

Eksisi:
- kanal gercegini ikinci plana atar
- WhatsApp gibi kisa/asenkron mecrada gereksiz uzun veya yuz yuze gibi yazilmis cumleler dogabilir
- ilk temasin format uyumu bozulabilir

#### MKT2) Temas kanali baskin olsun
Mantik:
- once mecranin izin verdigi ritim ve uzunluga bak
- sonra muhatap tipi ayni formatin icinde tonu ve vaadi ayarlasın

Artisi:
- cumle gercek mecraya uyar
- telefon, WhatsApp ve yuz yuze arasindaki kritik format farkini korur
- sahadaki ilk temas kopma riskini azaltir

Eksisi:
- yanlis kullanilirsa ayni kanalda muhatap farkini fazla duzleyebilir
- resepsiyon ile sahip ayni kalipta aciliyormus gibi hissedebilir

#### MKT3) Cift eksen esit agirlikli olsun
Mantik:
- kanal ve muhatap tipi ayni anda esit sekilde template'i secsin

Artisi:
- teorik olarak daha baglamsal gorunur

Eksisi:
- hizla mini karar motoruna doner
- V1 icin fazla kural carpimi uretir
- tekrar script matrisi riskini geri getirir

Ara yorum:
- su an en saglikli yol `MKT2`

### 3) Neden temas kanali daha sert belirleyici gibi duruyor?
Cunku kanal, yalniz ton degil,
cumlenin tasinabilecegi formati da belirliyor:
- WhatsApp = kisa, dusuk surtunmeli, asenkron, hizli okunur
- telefon = daha akici, hemen yanit alan, ses tonu destekli
- yuz yuze = daha insan, daha baglamli, gozleme dayali

Bu farklar yok sayilirsa,
aynı iyi fikir yanlis formatta sunulur.
Yanlis format, daha ilk saniyede acilisi kirabilir.

### 4) Neden muhatap tipi yine cok onemli ama ikinci katman?
Cunku muhatap tipi su seyleri belirliyor:
- ne kadar derine girebilirsin
- karar dili mi kullanmalisin, yoksa izin/yonlendirme dili mi
- `size kisaca gosterebilirim` mi dersin, `muhatabiniz kimse ona da aktarabilirim` mi dersin

Yani muhatap tipi,
`ne kadar iddiali ve ne kadar dogrudan konusacagini` belirler.
Ama cumlenin kanal ritmini bozacak kadar birincil olmayabilir.

### 5) O zaman cakisinca nasil bir hiyerarsi dogru olur?
Bence V1 icin su hiyerarsi en temiz:
1. `problem tipi` = template ailesini secer
2. `temas kanali` = cumlenin formatini ve ritmini belirler
3. `muhatap tipi` = izin seviyesi, dogrudanlik ve vaat dozunu ayarlar
4. `segment` = en son mikro sicaklik/fayda vurgusu yapar

Bu su anlama gelir:
- kanal, cumleyi hangi formda soyleyecegini belirler
- muhatap tipi ise ayni form icinde ne kadar ilerleyecegini ayarlar

### 6) Somut orneklerde bu nasil okunur?
#### Sahip + WhatsApp
- kanal baskin: cumle kisa ve yazisal olur
- muhatap tipi ikinci katman: karar/fayda dili biraz daha net olabilir

Ornek cizgi:
- `Merhaba, isletmenizi kisaca inceledim. Isterseniz 2 maddede en hizli toparlanacak yeri yazayim.`

#### Resepsiyon + yuz yuze
- kanal baskin: daha insan ve anlik acilis olur
- muhatap tipi ikinci katman: iddia dozunu dusurur, izin ister

Ornek cizgi:
- `Merhaba, ben dijital gorunum tarafinda hizli bir tespit yapiyorum. Uygunsa bunu kiminle paylasmam daha dogru olur?`

#### Telefon + karar verici
- kanal baskin: hizli, sesle akacak kadar net
- muhatap tipi ikinci katman: fayda koprusu daha dogrudan olabilir

Ornek cizgi:
- `Merhaba, isletmenizde dijital tarafta hizli toparlanacak iki nokta gordum. Uygunsaniz bir dakikada ozetleyebilirim.`

Bu orneklerde gorulen sey:
- kanal cumlenin tasinma bicimini belirliyor
- muhatap tipi cumlenin cesaret dozunu ayarliyor

### 7) En buyuk risk ne?
Temas kanalini yeterince baskin almamak.
Bu olursa sistem sunu yapabilir:
- WhatsApp icin fazla uzun ve sahne kuran cumleler uretir
- yuz yuze icin fazla robotik, mesaj gibi cumle kurar
- telefonda gozle gosterilecek seylerden bahseder

Ikinci risk de muhatap tipini cok baskin alip her durumda ayni gatekeeper/owner script ayrimini buyutmektir.
Bu da V1'i gereksiz script matrisi haline getirir.

### 8) Gecici net kanaat
Su an en mantikli cizgi su:
- `ilk acilis` ton modulatorunde muhatap tipi ile temas kanali catisirsa, temas kanali daha baskin olmali
- cunku kanal cumlenin format, ritim ve uzunluk sinirini cizer
- muhatap tipi yine onemli kalir, ama ayni format icinde dogrudanlik ve izin seviyesini ayarlayan ikinci katman olur
- segment ise en sonda hafif sicaklik/vurgu farki verir

Kisa formda:
- family = problem
- form = channel
- permission/tone dose = audience type
- flavor = segment

Bu model hem sahadaki gercek temas kosuluna uyuyor,
hem de `ilk acilis` mantigini script bankasina cevirmeden kontrol altinda tutuyor.

## Elli besinci okuma - `temas sonucu` mikro alanlari yalniz detail icinde mi yasamali, yoksa listede hizli tek satir giris varyanti da degerli mi?
Bu soru dogrudan panel omurgasina bagli.
Cunku `temas sonucu`nu nereye koydugun,
- Project OS'un hizli operasyon merkezi mi kalacagini
- yoksa mini CRM not duvarina mi kayacagini
belirler.

Elimizdeki referanslar su cizgiyi beraber kuruyor:
- `Project OS` = kuyruk, sicak is, hizli status ilerletme, aksiyon merkezi
- `Business Detail` = tek isletme karar yuzeyi ve canonical okuma alani
- CRM arastirma notlari = mesaj gecmisi ve serbest not habitatini disarida tut diyor

Yani soru yalniz UX sorusu degil.
Ayni zamanda scope sorusu.

### 1) Uc model

#### TSO1) `Temas sonucu` sadece detail icinde yasasin
Mantik:
- iletisim sonucu tek isletme gercegidir
- o yuzden yalniz Business Detail icinde girilsin

Artisi:
- canonical cizgi temiz kalir
- Project OS'a mini CRM formu sizmaz
- daha fazla baglam ve kisa not detail'de tutulabilir

Eksisi:
- operator kuyrukta hizli ilerlerken surtunme artar
- `aradim, acmadi` gibi mikro sonuclar icin detail'e gir-cik yorucu olur
- sicak gunluk operasyon akisi yavaslayabilir

#### TSO2) `Temas sonucu` listeden hizli tek satir girilebilsin
Mantik:
- Project OS zaten sicak is ekraniysa,
  mikro temas sonuclari da oradan islenebilsin

Artisi:
- hiz yuksek olur
- kuyruk icinde hareket etmek kolaylasir
- operator gercek saha ritmine daha yakin calisir

Eksisi:
- cok hizli sekilde mini CRM'e doner
- not, sonuc, follow-up, kisiler, kanal ve serbest metin istemeye baslar
- Business Detail ile sinir bulanir

#### TSO3) Hibrit model: listede yalniz yapisal mikro sonuc, detail'de tam baglam
Mantik:
- Project OS'ta sadece kuyrugu ileri tasiyan minimum sonuc girilir
- detay, gerekirse Business Detail'de acilir

Artisi:
- hiz korunur
- scope dagilmaz
- Project OS `aksiyon merkezi`, Business Detail `karar ve kayit yuzeyi` olmaya devam eder

Eksisi:
- iyi sinir cizilmezse iki yerde ayni sey varmis gibi algilanabilir
- `hangi sonucu listeden islerim, hangisi detail ister` kurali net olmalidir

Ara yorum:
- su an en saglikli yol `TSO3`

### 2) Neden detail-only tek basina biraz eksik?
Cunku repo cizgisi Project OS'u pasif rapor paneli degil,
aktif operasyon merkezi olarak kuruyor:
- sicak isler
- hizli status ilerletme
- kayit + aksiyon + durum

Bu dogruysa,
`aradim ulasilmadi`, `gorusme uygun degil`, `yarin tekrar dene` gibi mikro sonuclar icin her seferinde detail'e inmek fazla surtunme yaratir.
Bu da gercek hayatta operatoru suya iter:
- ya hic kayit girmemeye
- ya da disarida daginik not tutmaya

Ikisi de kotu.

### 3) Neden listeden tam serbest giris daha da riskli?
Cunku o yol cok hizli su talepleri dogurur:
- hangi kisiyle konusuldu?
- tam ne dendi?
- ne zaman tekrar aranacak?
- serbest not nereye yazilsin?
- kanal secimi burada da olsun mu?

Bu da daha once acikca kacindigimiz sahaya girer:
- message history
- note habitat
- task creep
- CRM savrulmasi

Yani `listeden hizli giris` ancak cok sert daraltmayla faydali olabilir.

### 4) O zaman en saglikli V1 siniri ne?
Bence su sert ayrim iyi calisir:
- `Project OS / liste` = yalniz queue'yu ilerleten yapisal mikro sonuc
- `Business Detail` = sonucu aciklayan baglam, istisna ve gerekiyorsa kisa not

Yani listede su tarz seyler olabilir:
- `ulasilamadi`
- `geri donus bekleniyor`
- `uygun zaman degil`
- `ziyaret planlanacak`
- `detail'de netlestir`

Ama listede sunlar olmamali:
- uzun serbest metin
- tam gorusme transkripti
- cok alanli contact log
- ayrik follow-up formu

### 5) Peki `Businesses` listesi de ayni hizli girise acilmali mi?
Burada daha dikkatli olmak gerekiyor.
`Businesses` sayfasi kaynaklara gore sade liste ve detaya inis yuzeyi.
`Project OS` ise aktif sicak is ekrani.
Bu ayrim korunacaksa,
hizli mikro sonuc girisi once `Project OS` tarafina daha cok yakisir.
Genel `Businesses` listesine ayni yetkiyi vermek,
listeleri gereksizce ayni hale getirebilir.

Bu yuzden bugun icin daha guvenli cizgi su gorunuyor:
- hizli temas sonucu varsa once `Project OS` / sicak kuyruk tarafinda dusun
- `Businesses` listesi bunu varsayilan davranis olarak tasimasin
- `Business Detail` zaten tam baglam icin ana yer olarak kalsin

### 6) Bu hibrit modelin riskleri neler?
Iki ana risk var:
1. Project OS'taki mikro sonuc alaninin yavas yavas buyumesi
2. Business Detail'de ayni sonucun tekrar elle yazilmasi

Bunu onlemek icin kural sert olmali:
- listede yalniz secimli/structural sonuc
- detail'de yalniz gerekirse aciklama
- ayni bilgi iki yerde farkli serbest metinle yasamaz

### 7) Gecici net kanaat
Su an en mantikli cizgi su:
- `temas sonucu` tamamen detail'e kapatilmasin, cunku gunluk operasyon akisi icin fazla surtunmeli olur
- ama listeden serbest not/gorusme logu acilmasin, cunku panel mini CRM'e kayar
- en saglikli V1 model `Project OS'ta minimum yapisal mikro sonuc + Business Detail'de tam baglam` gorunuyor
- `Businesses` genel listesi ise bu davranisi varsayilan olarak tasimamali; once Project OS ve detail ayrimi korunmali

Kisa formda:
- queue micro outcome = Project OS
- canonical reasoning/context = Business Detail
- plain browse list = Businesses

Bu model admin paneline girince isletme secimi ve ilerletme mantigini da daha temiz kuruyor:
- secim = Project OS sicak kayit veya Businesses detaya inis
- mikro ilerletme = Project OS
- tek kayit karari = Business Detail

## Elli altinci okuma - `Project OS` kuyrugunda mikro temas sonucu islemenin en guvenli tetikleme deseni ne olmali?
Bir onceki ara karar suydu:
- `temas sonucu` tamamen detail'e kapatilmayacak
- ama listeden serbest not/log acilmayacak
- en saglikli sinir `Project OS'ta minimum yapisal mikro sonuc + Business Detail'de tam baglam`

Simdi uygulama sorusu su:
- bu mikro sonucu Project OS kartinda nasil isletmeli?
- hep gorunen inline secim mi?
- bir compact drawer mi?
- yoksa tek dokunusluk presetler mi?

Bu soru kritik.
Cunku yanlis desen Project OS'u ya form duvarina cevirir,
ya da hizli operasyon gucunu kirar.

### 1) Referanslar hangi yone itiyor?
Eldeki cizgi birkac net sinir veriyor:
- `Project OS` = gunluk operasyon merkezi, hizli status ilerletme ve sicak kuyruk
- `Business Detail` = tek kayit karar duvari
- UX kurallari = kritik islem tek kolon, section basina 1 ana CTA, modal yalniz gercekten gerekiyorsa
- Business Detail referansi = ikincil derinlik drawer/modal olabilir, ama ana akisi bogmamalidir

Buradan cikan sert sonuc su:
- Project OS karti icinde surekli gorunen cok alanli inline form yanlis yone iter
- ama her basit mikro sonucta detail'e gondermek de fazla surtunme yaratir

### 2) Uc model

#### PTO1) Inline secim
Ornek:
- kart icinde select/chip grubu hep gorunur
- operator karttan ayrilmadan sonucu secer

Artisi:
- tek bakista islenebilir
- ekstra ac/kapa hareketi yok
- kuyrukta hizli gibi gorunur

Eksisi:
- her karti mini forma cevirir
- mobilde kalabaliklastirir
- kartin asil `next step` ve primary aksiyonunu zayiflatir
- outcome sayisi biraz artsa bile CTA duvari dogurur

Ara yorum:
- hizli gorunur ama scope ve gorsel yogunluk riski yuksek

#### PTO2) Compact drawer
Ornek:
- kartta tek bir ikincil tetik: `Temas sonucu`
- tiklaninca kisa drawer acilir
- drawer icinde 4-5 preset sonuc gorunur
- gerekiyorsa `detail'de ac` kacis linki bulunur

Artisi:
- kart temiz kalir
- Project OS form duvarina donmez
- yapisal sonuclar yine hizli girilir
- istisna durumlari detail'e itmek kolay olur

Eksisi:
- bir ekstra tik ister
- cok sik kullanilan akista hafif surtunme yaratir
- drawer kotu tasarlanirsa modal gibi agir hissedebilir

Ara yorum:
- scope kontrolu en guclu model bu

#### PTO3) Tek butonlu presetler
Ornek:
- kartta dogrudan kucuk preset butonlari gorunur:
  `Ulasilamadi`, `Bekleniyor`, `Ziyaret`, `Detail`

Artisi:
- en hizli isleme hissi verir
- `tek hareketle ilerlet` mantigina cok yakindir
- yapisal sonuclarda operator dusunmeden ilerler

Eksisi:
- kart bazinda buton kalabaligi yaratir
- etiketler uzadikca tasarim bozulur
- her stage ve her kart icin ayni preset seti uygun olmayabilir
- yanlis tik / acele kayit riski artar

Ara yorum:
- yalniz outcome kumesi cok dar ve sabitse guclu
- genel varsayilan desen olarak riskli

### 3) Neden inline secim en zayif aday?
Cunku sorun yalniz estetik degil.
Inline secim Project OS kartina su mesaji verir:
- burada hem oku
- hem karar ver
- hem secim yap
- hem gerekirse not dus

Bu da karti `aksiyon cagirici queue item` olmaktan,
`mini is kaydi formu`na cevirir.
Bir kez bu kapı acilinca genelde devaminda su talepler gelir:
- kanal secimi de gorunsun
- tekrar tarihi de olsun
- kisa not da ekleyelim

Bu, tam da kacindigimiz kayma.

### 4) Neden tek butonlu presetler cazip ama dikkat ister?
Cunku Project OS'un ruhuna cok yaklasiyor:
- tek hareket
- hizli ilerletme
- beklemeden kuyruk temizleme

Ama sorun su:
Project OS kartinda zaten ana odaklar var:
- kaydi tanimak
- next step'i gormek
- primary aksiyonu secmek

Bunlara 3-4 preset daha eklenince,
her kartta `hangi buton asil is?` sorusu dogabilir.
Ozellikle mobilde bu daha sert hissedilir.
Yani preset mantigi kotu degil,
ama acikta ve surekli gorunur halde tutulmasi riskli.

### 5) O zaman compact drawer neden daha guvenli gorunuyor?
Cunku su dengeyi kuruyor:
- kartin ana akis rolunu koruyor
- mikro sonucu yine hizli isletiyor
- serbest forma kaymadan yapisal presetler sunuyor
- istisna veya baglam gerekirse detail'e kapi birakiyor

Yani drawer burada `detay formu` degil,
`preset secim tepsisi` gibi davranirsa dogru olabilir.
Bu onemli ayrim.
Amac uzun akisyon degil,
karti bozmadan ikinci katmanda 4-5 yapisal sonuc sunmak.

### 6) Peki V1 drawer tam olarak nasil olmali?
Bence su kadar dar olmali:
- tetik: `Temas sonucu`
- 4 sabit preset:
  - `Ulasilamadi`
  - `Geri donus bekleniyor`
  - `Uygun zaman degil`
  - `Ziyaret planlanacak`
- bir kacis secenegi:
  - `Detail'de netlestir`
- kayit sonrasi ustte mevcut `durum guncellendi` geri bildirimiyle ayni cizgide kisa basari mesaji

Olmamasi gerekenler:
- serbest textarea
- tarih secici
- kisi secici
- kanal formu
- ikinci drawer/modala gecis

### 7) Tek butonlu presetler hic mi kullanilmasin?
Tamamen dislamamak daha dogru olabilir.
Ama bunlar varsayilan acik satir olmaktan cok,
sadece cok dar bir durumda anlamli olabilir:
- kart sayisi azsa
- stage sabitse
- outcome kumesi gercekten iki secenege dusuyorsa

Ornek:
- sadece `ulasilamadi` ve `detail` gibi iki net secenek varsa
kucuk preset strip dusunulebilir.
Ama genel Project OS kuyrugu icin bunu varsayilan yapmak erken gorunuyor.

### 8) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- `Project OS` kuyrugunda mikro temas sonucu islemenin en guvenli varsayilan tetikleme deseni `compact drawer + icinde sabit presetler` gorunuyor
- `inline secim` kartlari mini forma cevirdigi icin en zayif aday
- `tek butonlu presetler` hizli ama kart bazinda CTA kalabaligi ve yanlis tik riski nedeniyle genel varsayilan olmamali
- drawer'in isi detay toplamak degil, karti bozmadan yapisal mikro sonucu secmek olmali

Kisa formda:
- default = compact preset drawer
- maybe later = cok dar stage icin acik preset strip
- avoid = surekli inline form

Bu model onceki kararlarla da uyumlu:
- queue micro outcome = Project OS
- reasoning/context = Business Detail
- no mini CRM drift

## Elli yedinci okuma - `Project OS` kuyrugunda mikro temas sonucu kaydedildikten sonra en guvenli sonraki davranis ne olmali?
Bir onceki karar su noktaya gelmisti:
- mikro temas sonucu `Project OS` icinde islenebilir
- ama bu is `compact preset drawer` ile olmali
- serbest not ve tam baglam yine `Business Detail`'de kalmali

Simdi son kritik halka su:
- operator bir sonucu kaydettikten sonra ekran ne yapmali?
- kart kapanmali mi?
- otomatik siradaki kayda mi gecmeli?
- yoksa ayni kayitta kalip kisa geri bildirim mi vermeli?

Bu soru kucuk gorunuyor,
ama kuyruk psikolojisini belirliyor.
Yanlis karar ya hizi bozar,
ya da operatoru ne yaptigini anlamadan bir sonraki kayda savurur.

### 1) Referanslar hangi yone itiyor?
Eldeki repo cizgisi burada sasirtici derecede net:
- `Project OS` sayfa referansi, durum guncelleme sonrasi ustte yesil bir geri bildirim karti gorundugunu ve operatoru kaybolmadan ayni kayit uzerinde tuttugunu acikca soyluyor
- Project OS mantigi `tek hareketle status ilerlet`, ama bunu yaparken kaydi gozden kacirtmamayi hedefliyor
- UX kurallari da gereksiz modal/ani gecis yerine kontrollu geri bildirim ve dusuk bilissel yuk cizgisine uyuyor

Buradan ilk guclu sonuc su:
- varsayilan davranis otomatik ziplama degil,
  kaydi stabil tutup basari geri bildirimi vermek olmali

### 2) Uc model

#### KSD1) Kart kapanmasi / karttan dusmesi
Mantik:
- sonuc kaydedildi
- kayit kuyruktan sessizce duser veya kart kapanir

Artisi:
- kuyruk temizlenmis hissi verir
- hizli akista ilerliyor gibi gorunur

Eksisi:
- operator `ne oldu?` hissi yasayabilir
- kart aniden kayboldugu icin geri bildirim zayif kalir
- yanlis secim yapildiysa toparlama zorlasir
- ayni kayitta bir sonraki gerekli aksiyon varsa gorunmez olabilir

Ara yorum:
- hizli gorunur ama guven hissi zayif

#### KSD2) Otomatik siradaki kayda gecis
Mantik:
- sonuc kaydedilir kaydedilmez fokus siradaki kart/kayda aktarilir

Artisi:
- cok yuksek tempo hissi verir
- tekrarlayan arama bloklarinda seri calisma etkisi saglar

Eksisi:
- operatorun baglam duygusunu koparir
- kaydedilen sonuc ile olusan yeni durum gorulemez
- yanlis tik riski varsa arka arkaya zincir hata uretebilir
- Project OS'u call-center batch akisi gibi hissettirebilir

Ara yorum:
- belli bir gelecekte `seri arama modu` icin dusunulebilir,
  ama genel varsayilan icin sert ve riskli

#### KSD3) Ayni kayitta kalip geri bildirim gosterme
Mantik:
- sonuc kaydedilir
- drawer kapanir
- kayit yerinde kalir
- ustte veya kart yakininda kisa basari geri bildirimi gorunur
- kartin etiketi/next-step'i yeni duruma gore tazelenir

Artisi:
- operator ne yaptigini gorur
- guven ve kontrol hissi korunur
- gerekirse ayni kayit icin ikinci karar verilebilir
- mevcut `durum guncellendi` deseniyle uyumludur

Eksisi:
- seri kuyruk temizleme modunda bir tik daha yavas hissedebilir
- geri bildirim kotu tasarlanirsa gereksiz duraklama yaratabilir

Ara yorum:
- bugunku repo ve UX cizgisine en yakin model bu

### 3) Neden kartin kaybolmasi varsayilan olmamali?
Cunku mikro temas sonucu her zaman `is bitti` anlamina gelmez.
Ornek:
- `geri donus bekleniyor`
- `uygun zaman degil`
- `detail'de netlestir`

Bu sonuclar bazen kaydi kuyruktan tamamen dusurmez,
sadece ayni kaydin yorumunu degistirir.
Kart hemen kaybolursa operator su soruyu sorar:
- kayit bitti mi?
- beklemede mi?
- nereye gitti?

Bu da kuyruk guvenini zedeler.

### 4) Neden otomatik sonraki kayda gecis fazla agresif?
Cunku EsnafDigital'in mevcut omurgasi,
`tek kayitlik karar + hizli operasyon` dengesi uzerine kurulu.
Tam otomatik sonraki kayit davranisi ise daha cok su kulturleri cagirir:
- call-center benzeri batch isleme
- seri etiketleme
- bir kaydi bitirince digerine ziplama zorunlulugu

Bu urun cizgisi icin biraz fazla mekanik.
Ozellikle audit, teklif ve ziyaret hazirlik mantigi olan bir sistemde,
ayni kayitta yeni olusan durumun bir an gorulmesi daha guvenli.

### 5) O zaman en saglikli V1 davranis ne?
Bence su kombinasyon en temiz:
- preset secilince drawer kapanir
- kart yerinde kalir
- sayfa ustundeki mevcut `durum guncellendi` pattern'iyle uyumlu kisa bir basari geri bildirimi gorunur
- kartin ilgili etiketi veya `next step` satiri sessizce tazelenir
- operator isterse sonra manuel olarak siradaki kayda gecer

Yani sistem sunu demeli:
- `kaydin guncellendi`
- `buradasin`
- `istersen devam et`

Ama operatoru zorla savurmamali.

### 6) Hic mi hizli siradakine gecis olmamali?
Belki sonra olabilir,
ama varsayilan davranis olarak degil.
Daha guvenli gelecek varyasyonu su olabilir:
- basari geri bildirim kartinda ikincil link: `Siradaki kayda gec`
- ya da keyboard hizlandirma kisayolu

Boylece:
- varsayilan guvenli kalir
- hiz isteyen operatora ekstra yol acilir

Bu daha iyi,
cunku hiz tercihini operator yapar,
sistem dayatmaz.

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- mikro temas sonucu kaydedildikten sonra varsayilan davranis `ayni kayitta kal + kisa basari geri bildirimi goster + karti tazele` olmali
- `kartin kaybolmasi` ve `otomatik siradaki kayda gecis` varsayilan icin fazla agresif gorunuyor
- hizli akisa sonra opsiyonel kacis eklenebilir, ama temel desen operatoru kayit icinde stabil tutmali

Kisa formda:
- default = stay + refresh + success feedback
- optional later = `siradaki kayda gec` kisayolu/linki
- avoid as default = auto-dismiss / auto-next

Bu model Project OS'un mevcut `durum guncellendi` mantigiyla ayni dili konusuyor,
ve mikro temas sonucunu mini CRM'e cevirmeden guvenli sekilde operasyon akisinin icine aliyor.

## Elli sekizinci okuma - `Project OS` kuyrugunda mikro temas sonucu preset seti her stage icin ayni mi kalmali, yoksa stage'e gore daralan sabit alt setler mi daha guvenli?
Bir onceki kararlar burada iyi bir zemin kurdu:
- mikro temas sonucu `Project OS`ta islenebilir
- tetikleme deseni `compact preset drawer` olmali
- kayit sonrasi varsayilan davranis `stay + refresh + success feedback` olmali

Simdi siradaki kritik soru su:
- drawer icindeki presetler her kartta ayni mi kalmali?
- yoksa stage'e gore daralan sabit alt setler mi daha guvenli?

Bu onemli.
Cunku tek bir ortak liste basit gibi gorunse de,
farkli asamalarda anlamsiz secimler dogurabilir.
Tersine fazla stage-ozel davranis da sistemi mikro workflow matrisi haline getirebilir.

### 1) Referanslar hangi yone itiyor?
Mevcut repo iki sey soyluyor:
- `Project OS` zaten kaydi `intake -> audit -> offer -> delivery -> maintenance` asamalariyla okuyor
- her stage'in kendi `nextAction` ve bazilarinda `advanceAction` mantigi var

Yani sistem bugunden zaten `her kayit ayni durumda degil` diyor.
Bu durumda ayni mikro temas sonucu setini her stage'e yaymak,
kuyruk mantigiyla tam uyusmayabilir.

Diger taraftan,
HEARTBEAT ve CRM arastirma cizgisi de asiri pipeline karmasasina karsi net uyari veriyor.
Demek ki cozum su olmamali:
- her stage icin tamamen farkli 8-10 secenekli ayri mikro dunya

Buradan ilk guclu sonuc cikiyor:
- tam global tek set fazla kaba
- tam serbest stage-matrisi fazla karmasik
- en guvenli yol sabit cekirdek + stage'e gore daralan alt set gibi gorunuyor

### 2) Uc model

#### SPS1) Tum stage'lerde ayni preset seti
Ornek tek liste:
- `Ulasilamadi`
- `Geri donus bekleniyor`
- `Uygun zaman degil`
- `Ziyaret planlanacak`
- `Detail'de netlestir`

Artisi:
- ezberlemesi kolay
- UI her kartta ayni davranir
- gelistirmesi sade gorunur

Eksisi:
- delivery veya maintenance kartinda `ziyaret planlanacak` bazen anlamsiz kalabilir
- audit oncesi ile gonderilmis teklif sonrasi ayni sonuc seti fazla duz kalir
- operatora `her seye ayni etiketleri bas` hissi verebilir

Ara yorum:
- basit ama semantik olarak fazla kaba

#### SPS2) Her stage icin tamamen farkli preset setleri
Artisi:
- baglama en yakin model gibi gorunur
- anlamsiz secimleri azaltir

Eksisi:
- kural matrisi buyur
- operator ezberi zorlasir
- V1'i mini workflow engine'e cevirir
- her yeni stage/status degisikliginde preset tartismasi acilir

Ara yorum:
- teorik guclu, pratikte V1 icin pahali

#### SPS3) Sabit cekirdek + stage'e gore daralan alt setler
Mantik:
- tum uygun stage'lerde kucuk bir ortak cekirdek korunur
- ama her stage yalniz kendine mantikli olan 2-4 secenegi gorur
- anlamsiz olanlar sessizce cikmaz

Artisi:
- ogrenme maliyeti dusuk kalir
- semantik dogruluk artar
- global davranis korunur ama her kartta gereksiz secim cikmaz
- mini CRM ve mini pipeline engine riskini dengeler

Eksisi:
- yine de net kural ister
- operator bazen `diger kartta gordugum secenek burada yok` diye dusunebilir

Ara yorum:
- su an en saglikli yol bu

### 3) Neden tam global set zayif kaliyor?
Cunku `temas sonucu` her stage'de ayni isi gormuyor.
Ornekler:
- `intake`te amac ilk temas ve audit kapisini acmak
- `audit`te amac teshisi netlestirip teklife zemin kurmak
- `offer`da amac paket ve onay konusunu ilerletmek
- `delivery`de ise konu artik temas denemesi degil, operasyon blokaji olabilir
- `maintenance`te ise duzenli dokunus mantigi var

Bu fark varken,
her kartta ayni 5 sonucu gostermek hem anlamsiz secimler uretir,
hem de mikro temas sonucunu stage disi bir etikete donusturur.

### 4) Neden tam stage-bazli tam farkli set de riskli?
Cunku bu yolun sonu cok hizli sunlara gider:
- intake'te 5 baska preset
- audit'te 6 baska preset
- offer'da 7 baska preset
- delivery'de ayri blokaj presetleri
- maintenance'te ayri hatirlatma presetleri

Bu noktada artik `temas sonucu drawer` degil,
mini operasyon motoru kurmus oluruz.
Bu da daha once cizdigimiz sinira ters:
- Project OS kuyruk ve sicak is merkezi
- task ve note mezarligi degil

### 5) O zaman en saglikli V1 siniri ne?
Bence su cizgi en guvenli:
- mikro temas sonucu presetleri sadece `intake`, `audit` ve `offer` stage'lerinde aktif dusunulsun
- `delivery` ve `maintenance` icin ayni drawer varsayilan olarak acilmasin
- bu iki stage'de konu `temas sonucu`ndan cok `operasyon durumu / blokaj / bakim dokunusu` oldugu icin baska bir desen daha sonra dusunulsun

Bu onemli bir daraltma.
Cunku boylece `temas sonucu` araci gercekten temas odakli asamalarda kalir.

### 6) Pre-delivery stage'ler icinde alt setler nasil olmali?
V1'de bence bir cekirdek ucgen yeterli:
- ortak cekirdek:
  - `Ulasilamadi`
  - `Geri donus bekleniyor`
  - `Detail'de netlestir`

Buna stage'e gore bir ek secenek gelir:
- `intake` / `audit` icin:
  - `Ziyaret planlanacak`
  - gerekirse `Uygun zaman degil`
- `offer` icin:
  - `Teklif konusulacak` gibi yeni bir preset acmak riskli gorunuyor
  - daha guvenlisi, offer'da da ayni ortak cekirdek + `Detail'de netlestir` cizgisini korumak

Burada kritik fark su:
- offer stage'ine ayri ticari mikro presetler eklemek cazip,
ama bu hizla `nurture / pazarlik / itiraz / sicak / soguk` gibi CRM diline kayar

O yuzden offer tarafinda sadelik daha guvenli.

### 7) Delivery ve maintenance neden disarida kalmali?
Cunku bu asamalarda artik temas sonucu degil,
su tur seyler baskin:
- asset bekleniyor
- onay bekleniyor
- yayin blokaji var
- guncelleme zamani geldi

Bunlar `temas sonucu` degil,
operasyon veya bakim durumu.
Ayni drawer icine sokulursa iki farkli dil karisir:
- saha / ulasma dili
- teslimat / bakim dili

Bu da Project OS'ta kavram kaymasi yaratir.

### 8) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- `Project OS` kuyrugunda mikro temas sonucu presetleri her stage icin birebir ayni kalmamali
- ama her stage icin tamamen ayri dunya da kurulmamali
- en guvenli model `sabit cekirdek + stage'e gore daralan alt set` gorunuyor
- bu desen esas olarak `intake`, `audit` ve gerekirse `offer` stage'leriyle sinirli kalmali
- `delivery` ve `maintenance` icin ayni drawer'i zorlamak yerine baska operasyon deseni sonra dusunulmeli

Kisa formda:
- not recommended = one global set everywhere
- not recommended = fully custom set per stage
- recommended = small shared core + stage-limited subsets
- scope guard = contact outcomes stay pre-delivery

Bu model hem Project OS'un mevcut stage mantigina uyuyor,
hem de mikro temas sonucu aracini genel CRM etiket panosuna cevirmeden tutuyor.

## Elli dokuzuncu okuma - `Project OS` kuyrugunda pre-delivery temas sonucu ile delivery/bakim blokaj sinyalini ayirmak icin en guvenli ikinci mikro desen ne olmali?
Bir onceki ara karar su cizgiyi kurdu:
- `temas sonucu` drawer'i pre-delivery tarafla sinirli kalmali
- `delivery` ve `maintenance` ayni mikro temas diliyle zorlanmamali
- Project OS kuyruk ve sicak is merkezi olmaya devam etmeli

Simdi asil soru su:
- o halde delivery/bakim tarafinda ikinci mikro desen ne olmali?
- ayni drawer'in delivery versiyonu mu?
- ayri bir mini blokaj drawer'i mi?
- yoksa daha da dar bir `blokaj sinyali` modeli mi?

Bu soru kritik.
Cunku delivery/bakim tarafi zaten kolayca task/project manager gorunumune kayabilir.
Burada yanlis desen secilirse,
Project OS once mikro temas loguna,
sonra da mikro operasyon panosuna doner.

### 1) Referanslar hangi yone itiyor?
Kaynaklar birlikte okununca birkac sert sinir veriyor:
- delivery create mantigi zaten scope, gerekli assetler, erisimler ve yayin oncesi kontrol gibi operasyon iskeletiyle basliyor
- CRM arastirmasi `DeliveryProject` icinde sinirli blokaj ve hafif eksik listesi fikrine acik, ama standalone task/subtask sistemine acikca karsi
- bakim V1'de ayri buyuk nesne degil, `DeliveryProject` icinde yasayan durum olarak goruluyor
- Project OS'un isi veri toplamak degil, `hangi is simdi hareket etmeli` sorusuna cevap vermek

Buradan cikan ilk sonuc su:
- delivery/bakim icin ikinci desen `temas sonucu` gibi eylem gecmisi toplamamali
- onun isi yalniz `blokaj var mi, varsa ne kadar temel seviyede, nereye gitmeli` sorusunu cevaplamak olmali

### 2) Uc model

#### IBM1) Ayni drawer'in delivery/bakim versiyonu
Ornek:
- pre-delivery drawer'daki gibi bir ikinci drawer
- bu kez icinde `asset bekleniyor`, `onay bekleniyor`, `yayin blokaji`, `guncelleme zamani` gibi presetler

Artisi:
- teknik olarak tutarli gorunur
- operator iki benzer pattern ogrenmis olur

Eksisi:
- iki farkli kavrami ayni davranis ailesine sokar
- temas sonucu ile operasyon blokajini ayni tur islem gibi gosterir
- kisa surede `tarih`, `kime sorduk`, `hangi asset`, `hangi link` talepleri dogurur
- Project OS'ta ikinci workflow cekirdegi acar

Ara yorum:
- yuzeysel tutarli gorunse de kavramsal olarak riskli

#### IBM2) Ayri mini blokaj drawer'i
Ornek:
- delivery/maintenance kartinda `Blokaj isle`
- acilinca 3-4 blokaj tipi secilir

Artisi:
- pre-delivery ile post-delivery dillerini ayirir
- daha kontrollu bir ikincil pattern gibi gorunur

Eksisi:
- yine drawer + preset + kayit akisi kurar
- delivery tarafinda ayrica mini checklist beklentisi dogurur
- schema'da bugun blokaj nedeni/asset listesi alani olmadigi icin ya uydurma derived state'e yaslanir ya da yeni alan baskisi yaratir

Ara yorum:
- bir onceki modele gore daha temiz,
  ama V1 icin yine de fazla operasyonlasma riski tasiyor

#### IBM3) `Blokaj sinyali` mikro deseni
Ornek:
- delivery/maintenance kartinda temas drawer'i yerine kucuk bir durum satiri veya badge ailesi olur
- yalniz 1 kisa sinyal gosterir:
  - `Asset bekleniyor`
  - `Onay bekleniyor`
  - `Yayin riski`
  - `Bakim dokunusu yaklasti`
- gerekiyorsa tek kacis verir:
  - `Detail'de ac`
  - ya da mevcut primary aksiyona baglar

Artisi:
- Project OS'u task paneline cevirmeden blokaji gorunur kilar
- temas sonucu ile operasyon blokajini semantik olarak ayirir
- mevcut DeliveryProject sadeligine daha uyumludur
- block reason'i kuyruk sinyali olarak tutar, cozum detayini detail/delivery yuzeyine iter

Eksisi:
- hizli inline guncelleme kadar eylemli his vermez
- gercek blokajlar cogalirsa tek badge yetersiz kalabilir

Ara yorum:
- su an en saglikli V1 yol bu gorunuyor

### 3) Neden ikinci bir drawer bile riskli?
Cunku drawer teknik olarak hafif gorunse de,
delivery/bakim baglaminda cok hizli su sorulari cagirir:
- hangi asset eksik?
- kimden bekleniyor?
- ne zaman istendi?
- kac kez hatirlatildi?
- yayin icin hangi teknik adim takildi?

Bu sorularin hepsi makul.
Ama hepsini Project OS'ta cozmeye kalkarsak,
queue ekranini ikinci bir teslimat yonetim paneline cevirmis oluruz.
Bu da skill'in kirmizi cizgisine ters:
- genel CRM'e kayma yok
- teklif netlesmeden ve ana akis sertlesmeden ekran cogaltma yok

### 4) Neden `blokaj sinyali` daha guvenli?
Cunku Project OS'un isi cozumun ayrintisini tasimak degil,
operatora sunu gostermek:
- bu kayit ilerliyor mu
- takildiysa niye takildi
- simdi detail'e mi inmeli, yoksa ana aksiyonla ilerleyebilir mi

Kucuk bir `blokaj sinyali` bunu yapiyor.
Mesela:
- `Asset bekleniyor` = delivery detayina in
- `Onay bekleniyor` = operator ticari/operasyonel teyit isteyebilir
- `Bakim dokunusu yaklasti` = bakim aksiyonu hatirlatilir

Burada sinyal var,
ama ayrik mini isleme motoru yok.
Bu cizgi su an daha dogru.

### 5) Peki bu sinyal nereden beslenmeli?
V1 gerceginde schema cok yalniz:
- `DeliveryProject`ta esasen `status` ve `scope` var
- ayri blockerReason veya nextTouchAt alani henuz yok

Bu yuzden V1 icin en guvenli yorum su:
- delivery/bakim blokaj sinyali ilk asamada `scope` ve durumdan tureyen cok hafif derived ipucu olabilir
- eger tekrar eden gercek ihtiyac cikarsa,
  sonraki adim Project OS'a yeni drawer acmak degil,
  `DeliveryProject` nesnesine dar 1-2 alan eklemeyi tartismak olmali

Yani veri evinin yeri queue degil,
DeliveryProject olmali.
Bu ayrim onemli.

### 6) O zaman en saglikli V1 pattern paketi ne?
Bence su ikili artik netlesiyor:
- pre-delivery = `compact preset drawer` ile temas sonucu
- delivery/maintenance = `blokaj sinyali` mikro deseni

`Blokaj sinyali`nin ozellikleri:
- 1 kisa label/badge veya tek satir durum
- yalniz anlamliysa gorunur
- cozum isleme alani acmaz
- en fazla `Detail'de ac` veya mevcut primary aksiyona bagli kisa link verir

Olmamasi gerekenler:
- ikinci serbest form
- task checklist editoru
- assignee / due date dunyasi
- ayni kart icinde asset yonetim duvari

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- pre-delivery temas sonucu ile delivery/bakim blokaj sinyali ayni pattern ailesine zorlanmamali
- delivery/bakim icin en guvenli ikinci mikro desen `blokaj sinyali` gorunuyor, ikinci bir drawer degil
- bu sinyal queue'da yalniz `neden takildi / neden dikkat istiyor` seviyesinde kalmali
- gercek operasyonel detay ve cozum Delivery/Business Detail yuzeyine inmeli
- eger blokaj verisi kalici alan isterse bunun evi Project OS degil, `DeliveryProject` nesnesi olmali

Kisa formda:
- pre-delivery = action micro-pattern
- delivery/maintenance = blocker signal micro-pattern
- avoid = two parallel drawers
- data home = DeliveryProject, not queue UI

Bu model Project OS'u tek kokpit olarak koruyor,
ama ayni ekranda iki farkli is dilini karistirmadan ilerletiyor.

## Altmisinci okuma - delivery/bakim `blokaj sinyali` icin en guvenli ilk label ailesi ne olmali?
Bir onceki karar bizi su noktaya getirdi:
- pre-delivery tarafinda `temas sonucu` ayri mikro desen olarak kalacak
- delivery/bakim tarafinda ise ikinci bir drawer degil, `blokaj sinyali` mikro deseni daha guvenli
- kalici veri gerekiyorsa bunun evi Project OS degil, `DeliveryProject` nesnesi olmali

Simdi soru daha da daraldi:
- bu `blokaj sinyali` ilk etapta hangi label ailesiyle baslamali?
- 3-4 sabit tip yeterli mi?
- yoksa daha genis bir set mi gerekir?

Bu soru kucuk gorunuyor,
ama label sayisi arttikca urun ya faydali sinyale,
ya da task diline kayar.
Bu yuzden ilk aileyi dar kurmak kritik.

### 1) Referanslar hangi yone itiyor?
Kaynaklar ortak bir yone itiyor:
- `DeliveryProject` bugun yalnizca `status` ve `scope` tasiyor, yani veri zemini henuz hafif
- delivery create mantigi zaten `gerekli assetler`, `gerekli erisimler`, `yayin oncesi kontrol` gibi blokaj cinslerini iskelet olarak biliyor
- CRM arastirmasi delivery tarafinda `baslica blokaj`, `yayina gecis`, `bakim ritmi`, `sinirli varlik talep listesi` gibi dar kavramlara izin veriyor
- ayni arastirma task creep, note creep ve generic project manager riskine acikca karsi

Buradan ilk net sonuc cikiyor:
- label ailesi operasyonel gercekten dogmali
- ama `her eksik icin ayri etiket` seviyesine inmemeli
- en guvenli yol, blokaji kategori seviyesinde gosteren kucuk bir aile

### 2) Dort model

#### BLA1) Cok dar uc etiket
Ornek:
- `Asset bekleniyor`
- `Onay bekleniyor`
- `Bakim zamani`

Artisi:
- ezberlemesi cok kolay
- task sistemine kaymaz

Eksisi:
- `yayin riski` gibi ayri bir teknik/operasyonel gerilimi kaybeder
- bazen cok kaba kalabilir

Ara yorum:
- guvenli ama biraz fazla sikistirilmis olabilir

#### BLA2) Dortlu cekirdek aile
Ornek:
- `Asset bekleniyor`
- `Onay bekleniyor`
- `Yayin riski`
- `Bakim dokunusu`

Artisi:
- delivery ve maintenance icin ana blokaj tiplerini kapsar
- hala ezberlenebilir kalir
- teknik detayi kuyruga yigmaz
- `neden dikkat istiyor` sorusuna yeterli cevap verir

Eksisi:
- bazi durumlarda `yayin riski` ile `onay bekleniyor` birbirine yakin hissedebilir
- ilk tanimlari net yazilmazsa operator yorum farki olabilir

Ara yorum:
- su an en dengeli aday bu

#### BLA3) Alti-yedi etiketli genis aile
Ornek:
- asset
- erisim
- onay
- domain
- yayin riski
- revizyon
- bakim dokunusu

Artisi:
- daha ayrintili gorunur
- bazi delivery vakalarini daha net ayirabilir

Eksisi:
- hizla mikro task taksonomisine doner
- schema ve UI'dan daha hizli buyur
- operatoru `dogru etiketi secme` isine sokar

Ara yorum:
- V1 icin fazla ayrintili

#### BLA4) Serbest / derived metin label'i
Ornek:
- sistem veya operator kisa serbest blokaj metni yazar

Artisi:
- her duruma uyar gibi gorunur

Eksisi:
- ayni problemi farkli dillerle tekrar ettirir
- notes creep kapisini acar
- kuyrukta karsilastirma ve filtreleme bozulur

Ara yorum:
- en riskli yol bu

### 3) Neden `asset / onay / yayin riski / bakim dokunusu` dorlugu en saglikli gorunuyor?
Cunku bu dortlu,
hem delivery hem maintenance tarafindaki ana gerilimleri fazla dallandirmadan kapsiyor:
- `Asset bekleniyor` = logo, menu, fotograf, sosyal link, icerik gibi somut girdi eksigi
- `Onay bekleniyor` = sahibi/operator teyidi, icerik veya yayin izni
- `Yayin riski` = teknik/gecikme/son kontrol gerilimi
- `Bakim dokunusu` = canli is icin yenileme ya da periyodik temas ihtiyaci

Bu dille kuyruk sunu soyler:
- tam ne yapilacagini degil
- neden dikkat gerektigini

Bu da Project OS rolune uygun.

### 4) `Erisim bekleniyor` veya `domain bekleniyor` niye ayri etiket olmamali?
Ilk bakista makul.
Ama V1'de ayri etiket olduklarinda su zincir acilir:
- domain ayri olsun
- hosting ayri olsun
- sosyal sifre ayri olsun
- GBP yetki ayri olsun

Bu cok hizli asset listesini operasyonel envantere cevirir.
Daha guvenli yorum su:
- ilk etapta bunlar `Asset bekleniyor` veya `Onay bekleniyor` icinde toplanabilir
- tekrar eden yogun bir pattern cikarirsa sonra veri katmaninda yeniden ayrilir

### 5) `Yayin riski` fazla belirsiz mi?
Bir miktar risk var.
Ama ayni zamanda tam ihtiyac bu olabilir.
Cunku Project OS'taki blokaj sinyalinin isi teknik debug raporu vermek degil.
Onun isi operatora su hissi vermek:
- bu is yayina gecmeye yakin ama bir gerilim var
- detail/delivery yuzeyine inip netlestirmek gerekiyor

Bu rolde `yayin riski` yeterince faydali,
ve `dns`, `ssl`, `icerik onayi`, `son kontrol` gibi alt nedenleri kuyruga tasimiyor.

### 6) `Bakim dokunusu` cok eylem cagirici mi?
Aslinda bu iyi olabilir.
Cunku maintenance tarafinda amac blokaji dramatize etmek degil,
ritmi hatirlatmak.
`Bakim bekliyor` yerine `Bakim dokunusu` ifadesi daha hafif,
daha operasyonel ve daha az alarmvari duruyor.
Bu da bakim hattini ticket kuyruğu gibi gostermemeye yardim eder.

### 7) O zaman ilk label ailesi nasil yazilmali?
Su an en mantikli yazim su gorunuyor:
- `Asset bekleniyor`
- `Onay bekleniyor`
- `Yayin riski`
- `Bakim dokunusu`

Yedek yorum:
- eger `Yayin riski` fazla soyut hissedilirse ikinci aday `Yayin oncesi gerilim` degil,
  daha sade sekilde `Yayin bekliyor` olabilir
- ama `bekliyor` kimi bekledigini bulandirabilir,
  bu yuzden ilk tercih yine `Yayin riski`

### 8) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- delivery/bakim `blokaj sinyali` icin ilk label ailesi 4 sabit tipte tutulmali
- en dengeli ilk set `Asset bekleniyor`, `Onay bekleniyor`, `Yayin riski`, `Bakim dokunusu` gorunuyor
- bundan daha dar set delivery gerilimini fazla ezer
- daha genis set ise task taksonomisine kayma riski tasir
- alt nedenlerin evi queue label'i degil, sonraki asamada gerekirse `DeliveryProject` veri katmani olmali

Kisa formda:
- recommended first set = 4 labels
- avoid = free text labels
- avoid = 6-7 item taxonomy in V1
- if needed later = split in data model, not in queue first

Bu model Project OS'u hala kokpit olarak tutuyor,
ama delivery/bakim tarafinda da operatorun neden dikkat etmesi gerektigini yalnizca bir bakista anlatabiliyor.

## Altmis birinci okuma - delivery/bakim `blokaj sinyali` varsa bunun `nextAction` satirina ne dozda yansimasi guvenli olur?
Bir onceki kararlar delivery/bakim tarafi icin iyi bir cizgi kurdu:
- `temas sonucu` ile `blokaj sinyali` ayni pattern ailesi olmayacak
- delivery/bakim tarafinda ikinci drawer acilmayacak
- queue yalniz dikkat gerektiren temel nedeni gosterecek
- ilk label ailesi 4 sabit tipte dar tutulacak

Simdi kritik soru su:
- bu blokaj sinyali `nextAction` satirini hic etkilemesin mi?
- yalniz ufak bir ipucu olarak mi dursun?
- yoksa `Yayina al` gibi action label'ini `Onayi bekle` benzeri seylere mi cevirmeli?

Bu soru onemli.
Cunku `nextAction` Project OS kartinin ana yon duygusunu tasiyor.
Burayi fazla oynatirsak operator ana aksiyonu kaybeder.
Ama hic yansitmazsak da blokaj sinyali fazla pasif kalabilir.

### 1) Referanslar hangi yone itiyor?
Repo cizgisi burada oldukca net:
- `Project OS` kartlarinda `siradaki adim` ana karar alanlarindan biri
- derived yapida her stage icin net bir `nextAction` ve bazen `advanceAction` label'i var
- bu label'lar zincirin omurgasini tasiyor: `Audit baslat`, `Teklifi gonder`, `Yayina al`, `Bakimi surdur`
- UX kurallari ve Business Detail cizgisi tek primary CTA ve dusuk bilissel yuk istiyor

Buradan ilk kuvvetli sonuc su:
- `nextAction` label'ini blokaj tipine gore sik degistirmek riskli
- ana action dili stage omurgasini korumali
- blokaj sinyali varsa bu daha cok destek katmaninda gorunmeli

### 2) Uc model

#### NAY1) Hic yansimasin
Mantik:
- `nextAction` aynen kalir
- blokaj sinyali ayri badge/satirda yasar

Artisi:
- action kararliligi korunur
- stage omurgasi bozulmaz

Eksisi:
- blokaj ile action arasindaki iliski zayif gorunebilir
- operator bazen `peki bu blokaj action'i nasil etkiliyor` diye dusunebilir

Ara yorum:
- guvenli ama biraz fazla kopuk kalabilir

#### NAY2) Tek satirlik ipucu olarak yansisin
Mantik:
- `nextAction` ana label'i aynen kalir
- hemen altinda veya yakinda kisa destek satiri gorunur
- ornek: `Yayina al` + `Once onay bekleniyor`

Artisi:
- ana action kararliligini korur
- blokaj ile eylem arasindaki bagi aciklar
- Project OS'un `neden simdi hareket etmeli` mantigina iyi oturur
- ikinci bir editor veya yeni action dili acmaz

Eksisi:
- kopya kotu yazilirse fazla uyarici olabilir
- badge + summary + helper birlikte olursa tekrar riski dogar

Ara yorum:
- su an en dengeli yol bu

#### NAY3) Action label'i hafifce degissin
Ornek:
- `Yayina al` yerine `Onayi netlestir`
- `Bakimi surdur` yerine `Bakim dokunusunu planla`

Artisi:
- blokaji action'a dogrudan cevirir
- kart daha eylemli hissedebilir

Eksisi:
- stage omurgasini bozar
- ayni status icin farkli kartlarda farkli ana action dili dogurur
- derived mantik ve advanceAction tutarliligi kirilir
- bir sure sonra mini workflow engine'e doner

Ara yorum:
- en riskli yol bu

### 3) Neden action label'ini degistirmek fazla riskli?
Cunku su anki `nextAction`lar aslinda stage makinesinin okunur cevirisi:
- `Yapima gecir`
- `Yayina al`
- `Bakima gecir`
- `Bakimi surdur`

Bunlar degismeye basladiginda operator artik sunu ayirt etmekte zorlanabilir:
- kaydin resmi stage aksiyonu ne?
- gecici blokaj ipucusu ne?

Bu ayrim bozulursa queue dili karisir.
Ayrica kod tarafinda `advanceAction.label` ile gorunen action arasindaki mantik da zamanla kopar.
Bu da sessiz teknik drift uretir.

### 4) Neden hic yansitmamak da biraz eksik kalabiliyor?
Cunku delivery/bakim blokaj sinyalinin isi yalniz rozet gostermek degil,
operatora bugunku dikkat sebebini hissettirmek.
Eger kartta yalniz `Yayina al` yazip yanda `Onay bekleniyor` badge'i durursa,
operator bu iliskiyi zihninde kendi kurmak zorunda kalabilir.
V1'de kuyrugun isi dusunce borcunu azaltmak oldugu icin,
ufak bir bag koprusu daha faydali olabilir.

### 5) O zaman en saglikli V1 modeli ne?
Bence su cizgi en temiz:
- `nextAction` ana label'i stage'e gore stabil kalsin
- delivery/bakim blokaj sinyali varsa,
  action'in hemen altinda tek satirlik kisa bir helper/ipucu gorunsun
- bu satir cozum yazmasin,
  yalniz engelin action ile iliskisini soylesin

Ornekler:
- `Yayina al`
  - `Once onay bekleniyor.`
- `Yapima gecir`
  - `Gerekli assetler tamamlanmadi.`
- `Bakimi surdur`
  - `Bakim dokunusu yaklasti.`

Bu modelde:
- action = omurga
- blocker helper = durum aciklamasi
- detail = cozum yeri

### 6) Bu helper satirin dozu ne olmali?
Bence su kadar:
- tek cumle
- 3-5 kelimelik badge degil, ama kisa yardimci satir
- warning tonu dusuk
- `hemen sunu yap` diye ikinci primary action'a donusmemeli
- gerekiyorsa mevcut detail linkine baglanmali, ayri CTA olusturmamali

Yani `Yayina al` butonunun altina:
- `Onay bekleniyor, detayda netlestir.`

bile bir tik fazla olabilir.
Daha guvenlisi:
- `Once onay bekleniyor.`

Cunku cozum yolunu degil, once durumu anlatiyoruz.

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- delivery/bakim `blokaj sinyali` varsa, bunun `nextAction` satirina hic yansimamasi biraz zayif kalabilir
- ama ana action label'ini blokaja gore degistirmek daha buyuk risk tasir
- en guvenli model `stage-stabil nextAction + altinda tek satirlik hafif blocker helper` gorunuyor
- helper satir ikinci CTA veya mini workflow dili acmamali
- ana action omurgasi stabil, blokaj aciklamasi ise yardimci kalmali

Kisa formda:
- recommended = stable action + small helper line
- okay but weaker = no reflection
- avoid = mutate primary action label by blocker

Bu model Project OS'un ana yon hissini bozmadan,
operatora delivery/bakim tarafindaki gercek engeli de karar aninda hissettirebilir.

## Altmis ikinci okuma - `temas sonucu` icin detail disinda hizli giris acilacaksa, en guvenli minimum alan seti ne olmali?
Bir dizi onceki karar artik iyi bir zemin kurdu:
- hizli temas sonucu varsa bunun yeri genel `Businesses` listesi degil, once `Project OS` olmali
- desen `compact preset drawer` olmali
- serbest not, uzun gorusme kaydi ve task benzeri takip mantigi acilmamali
- tam baglam ve istisna aciklamasi yine `Business Detail`de kalmali

Simdi asil soru su:
- operator drawer'i actiginda hangi alanlari girmeli?
- yalniz preset mi?
- kanal da secilmeli mi?
- tarih, muhatap, kisa not gibi alanlar da eklenmeli mi?

Bu soru kritik.
Cunku alan sayisi arttikca hizli mikro sonuc,
kolayca mini contact log'a doner.

### 1) Referanslar hangi yone itiyor?
Kaynaklarin ortak cizgisi net:
- `Project OS` form duvarina donusmemeli
- UX tarafinda kritik islem tek kolon ve dusuk bilgi yogunlugu korunmali
- genel CRM kaymasi, note creep ve message-history gravity acik risk olarak goruluyor
- `temas sonucu`nun isi tam gorusme kaydi tutmak degil, kuyrugu ilerleten yapisal mikro sonucu islemek

Buradan ilk kuvvetli sonuc cikiyor:
- operatorun doldurdugu alan seti olabilecek en dar haline inmeli
- sistemin zaten bildigi seyler tekrar operatora sorulmamalidir

### 2) Uc model

#### MAG1) Yalniz preset secimi
Operator yalniz sunu secer:
- `Ulasilamadi`
- `Geri donus bekleniyor`
- `Uygun zaman degil`
- `Ziyaret planlanacak`
- `Detail'de netlestir`

Sistemin otomatik bildikleri:
- business
- stage
- kaydi isleyen operator
- islem zamani
- kart baglami

Artisi:
- en hizli ve en guvenli model
- form duvari acmaz
- queue mantigina tam uyar
- veri tekrarini azaltir

Eksisi:
- kanal veya muhatap ayrimi gormek isteyen operator icin eksik hissedebilir
- bazi sonuclarin arkasi detail'e kalir

Ara yorum:
- su an en guvenli aday bu

#### MAG2) Preset + kanal secimi
Ek olarak:
- `telefon`
- `WhatsApp`
- `yuz yuze`

Artisi:
- temas bilgisini biraz daha anlamli kilar
- sonraki saha dilini dolayli besleyebilir

Eksisi:
- her hizli guncellemede ikinci karar ister
- ayni sonucun onune yeni form adimi koyar
- operator acelede rastgele secmeye baslayabilir
- V1'de veri kullanim yeri henuz net degilse toplama anlamsizlasir

Ara yorum:
- teorik faydali ama V1 hizli giris icin erken olabilir

#### MAG3) Preset + kanal + muhatap/kisa not/tarih
Artisi:
- en baglamsal gorunur

Eksisi:
- hizli mikro giris olmaktan cikar
- mini CRM log'u olur
- serbest not/task/takip kapisini acar
- ayni bilgiler sonra operator notu/detail tarafinda tekrar eder

Ara yorum:
- en riskli model bu

### 3) Neden tarih operator input'u olmamali?
Cunku hizli giris deseninde zaman zaten sistem tarafindan guvenli sekilde damgalanabilir.
Operatore ayrica `ne zaman oldu` diye sormak:
- gereksiz ikinci alan acar
- hatali/eksik giris dogurur
- ayni anda hiz ve dogruluk kaybettirir

Bu yuzden tarih,
input alani degil,
otomatik metadata olmali.

### 4) Neden kanal bile simdilik fazla olabilir?
Ilk bakista faydali duruyor.
Ama burada kritik soru su:
- V1'de bu kanal verisi Project OS'ta hangi karari degistirecek?

Eger cevap net degilse,
operatorden ekstra secim istemek gereksizdir.
Ayrica onceki kararlar `ilk acilis` tonunu kanal/muhatap bilgisiyle modulate etme fikrini daha cok detail/operator notu tarafina yaklastiriyor.
Bu da su anlama geliyor:
- kanal bilgisi lazimsa dogru evi hizli queue girisi degil,
  daha baglamli detail katmani olabilir

### 5) O zaman minimum alan seti ne olmali?
Bence operator input'u olarak yalniz sunlar kalmali:
- `temas sonucu preset secimi`

Sistem tarafindan otomatik tasinabilecek minimum baglam:
- `businessId`
- `stage`
- `recordedAt`
- `recordedBy`

Opsiyonel kacis, ama alan degil:
- `Detail'de netlestir`

Yani gercek minimum set,
form alani olarak `tek alanli secim` modelidir.
Geri kalan seyler ya otomatik metadata,
ya da detail'e kacan baglamdir.

### 6) Peki hic mi ikinci alan olmasin?
Su an en guvenli cevap: varsayilan olarak hayir.
Ama ileride gercek kullanim su sorunu dogurursa:
- ayni preset farkli kanallarda cok farkli anlam tasiyor

ancak o zaman ikinci bir alan dusunulebilir.
Ve o durumda bile ilk aday `kisa kanal secimi` olur,
serbest not veya muhatap alanlari degil.

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- `temas sonucu` icin detail disinda hizli giris acilacaksa,
  operatorun doldurdugu minimum alan seti yalniz `preset secimi` olmali
- `business`, `stage`, `recordedAt`, `recordedBy` gibi alanlar sistem tarafindan otomatik tasinmali
- `kanal`, `muhatap`, `kisa not`, `tekrar tarihi` gibi alanlar hizli queue girisine eklenmemeli
- istisna ve baglam ihtiyaci `Detail'de netlestir` kacisiyla Business Detail'e tasinmali

Kisa formda:
- operator input minimum = one preset
- system metadata = business + stage + time + actor
- avoid = channel/note/date in quick queue flow
- escape hatch = detail

Bu model Project OS'un hizini koruyor,
ve mikro sonucu gercekten mikro tutarak genel CRM savrulmasina en dusuk kapıyı aciyor.

## Altmis ucuncu okuma - hizli `temas sonucu` event'i kaydedilince bunun Business Detail `son 3 temas ozeti` alanina hangi dozda promotelenmesi guvenli olur?
Biriken kararlar artik su omurgayi veriyor:
- hizli `temas sonucu` once `Project OS` tarafinda minimum preset secimiyle islenecek
- `Business Detail` ana yuzeyinde `tek guncel operator notu` kalacak
- `son 3 temas ozeti` ise note snapshot'larindan degil, temas-odakli compact event mantigindan beslenecek

Simdi asil soru su:
- hizli queue sonucu girilince bunu her seferinde `son 3 temas ozeti`ne mi dusurmeliyiz?
- yoksa yalniz gercekten baglam degeri tasiyan presetleri mi oraya promote etmeliyiz?

Bu soru onemli.
Cunku doz fazla olursa `son 3 temas ozeti` mikro log coplugune doner.
Doz cok dusuk olursa da hizli queue sonucu detail tarafina hic iz birakmaz.

### 1) Referanslar hangi yone itiyor?
Daha onceki cizgi burada iki sert sinir koyuyor:
- `son 3 temas ozeti` compact referans alani olmali, full event log degil
- `timeline yorum degil hareket gosterir`, ama sadece anlamli hareketler ekrani beslemeli

Buradan ilk sonuc cikiyor:
- hizli `temas sonucu`nun hepsi ayni agirlikta detail'e tasinmamali
- `son 3 temas ozeti`, yalniz bugunku saha kararini etkileyen sinyalleri secmeli

### 2) Uc model

#### P1) Her hizli preset aninda `son 3 temas ozeti`ne promotelensin
Artisi:
- Project OS ile Detail arasinda hic kopukluk kalmaz
- son temas izi her zaman gorunur

Eksisi:
- `ulasilamadi` tekrarlarinda alan hizla dolup anlamsizlasir
- `detail'de netlestir` gibi kacis presetleri gereksizce referans alana tasinir
- `son 3 temas ozeti` kisa baglam yerine mikro islem gunlugune doner

Ara yorum:
- baglanti guclu, ama doz fazla

#### P2) Yalniz anlamli presetler promotelensin
Mantik:
- tum hizli sonuc sistemi icinde event olarak kaydedilebilir
- ama `son 3 temas ozeti` yalniz sonraki saha kararini degistiren presetleri ceker

Ilk anlamli adaylar:
- `Geri donus bekleniyor`
- `Uygun zaman degil`
- `Ziyaret planlanacak`

Varsayilan olarak promote edilmemesi daha guvenli gorunenler:
- `Ulasilamadi`
- `Detail'de netlestir`

Artisi:
- detail referans alani daha anlamli kalir
- tekrarlayan dusuk sinyal alanlari ana gorunumu kirletmez
- saha planina etki eden son temaslar one cikar

Eksisi:
- secim kurali ister
- operator bazen `az once ulasilamadi girdim, neden burada yok` diyebilir

Ara yorum:
- su an en dengeli yol bu

#### P3) Hizli presetler hic auto-promote olmasin
Mantik:
- `son 3 temas ozeti` yalniz operator notu veya ayrica acilan temas event'lerinden gelsin

Artisi:
- detail cok temiz kalir
- Project OS ile Detail rolleri sert ayrisir

Eksisi:
- hizli queue sonucu detayda izsiz kaybolabilir
- operator ayni seyi ikinci kez detail'de yazmaya itilebilir
- tekrar ve surtunme artar

Ara yorum:
- temiz ama pratikte fazla kopuk

### 3) Neden `Ulasilamadi` varsayilan promote adayi olmamali?
Cunku bu sonuc sik tekrar eden,
ama her tekrarinda yeni karar degeri uretmeyen bir sinyal.
Uc kez ust uste `ulasilamadi` gorunmesi,
`son 3 temas ozeti`ni daha bilgilendirici yapmiyor.
Sadece ekrani ayni sonucla dolduruyor.

Bu yuzden daha guvenli yorum su:
- `ulasilamadi` queue metadata ve gerekiyorsa ham event izi olarak kalabilir
- ama referans ozete varsayilan olarak cikmamali

### 4) Neden `Geri donus bekleniyor` ve `Ziyaret planlanacak` daha uygun?
Cunku bunlar yalniz sonuc degil,
bir sonraki hareketin yonunu da tasiyor:
- tekrar temas ritmi var mi?
- fiziksel ziyaret cikti mi?
- bugun/yarin saha karari degisti mi?

`son 3 temas ozeti`nin isi tam da bu tur hafif karar baglamini korumak.
Bu yuzden bu presetler daha yuksek deger tasiyor.

### 5) `Detail'de netlestir` neden ozeti kirletir?
Cunku bu bir temas sonucu degil,
bir kacis davranisi.
Anlami su:
- hizli queue akisi burada yetmedi
- baglam detail'de acilacak

Bunu `son 3 temas ozeti`ne tasimak,
referans alani eylem kaydiyla degil,
UI kacis izleriyle doldurur.
Bu yanlis.

### 6) O zaman en saglikli V1 mantigi ne?
Bence su cizgi en temiz:
- hizli `temas sonucu` event'i sistemde kayit altina alinabilir
- ama Business Detail `son 3 temas ozeti` alanina yalniz `anlamli presetler` promote edilmeli
- ilk promote ailesi su olmali:
  - `Geri donus bekleniyor`
  - `Uygun zaman degil`
  - `Ziyaret planlanacak`
- su ikisi varsayilan olarak promote edilmemeli:
  - `Ulasilamadi`
  - `Detail'de netlestir`

Eger ileride saha kullanimi sunu gosterirse:
- `ulasilamadi` ard arda tekrar ettiginde gercek karar degeri olusuyor

ancak o zaman bu preset icin ayri bir esik mantigi dusunulebilir.
Ama V1'de buna girmemek daha guvenli.

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- hizli `temas sonucu`nun hepsi `son 3 temas ozeti`ne aninda dusmemeli
- `son 3 temas ozeti` kompakt referans alan olarak kalmali
- en guvenli model `selective promote` gorunuyor
- ilk etapta yalniz saha yonunu degistiren presetler ozet alana terfi etmeli
- `ulasilamadi` ve `detail'de netlestir` varsayilan olarak ozete cikmamalı

Kisa formda:
- recommended = selective promote
- promote = callback / bad timing / visit planned
- avoid promote = unreachable / detail escape
- maybe later = threshold rule for repeated unreachable

Bu model Project OS'taki hizli mikro sonucu detail tarafina kontrollu bagliyor,
ama Business Detail'i de tekrar eden dusuk degerli temas kirintilariyla sisirmiyor.

## Altmis dorduncu okuma - hizli `temas sonucu`nda `ulasilamadi` yinelenirse bunun Project OS seviyesinde ikinci bir `soguk lead` veya `zayif temas` sinyaline donusmesi gerekir mi?
Biriken kararlar artik net bir sinir veriyor:
- Project OS'un isi `simdi ne hareket etmeli` sorusunu cevaplamak
- stage omurgasi `audit -> teklif -> teslimat -> bakim` olarak sabit kalmali
- hizli `temas sonucu` micro-queue ilerletme isidir, CRM-style lead nurturing motoru degil
- `son 3 temas ozeti` bile sadece secmeli ve anlamli temaslari yukari tasimali

Simdi kritik soru su:
- `ulasilamadi` tekrar ederse sistem bunu ayri bir sinyale cevirmeli mi?
- ornegin `soguk lead` veya `zayif temas` gibi ikinci bir queue statusu dogmali mi?
- yoksa bu tekrar sadece alt seviyede kalip Project OS diline hic cikmamali mi?

Bu soru onemli.
Cunku tekrar eden dusuk sinyal tamamen gorunmez kalirsa operator ayni kayda anlamsiz enerji harcayabilir.
Ama ayri `cold lead` dili acilirse pipeline furniture ve nurture CRM mantigi hizla geri gelir.

### 1) Referanslar hangi yone itiyor?
Repo burada beklenenden daha sert:
- schema tarafinda `BusinessStatus` sadece `lead | active | paused`
- Project OS derived tarafinda queue dili yalniz mevcut stage, `statusLabel`, `nextAction`, `summary` ve gerekiyorsa `advanceAction` etrafinda donuyor
- CRM yonu arastirmasi acikca `warm / lukewarm / nurture / re-open` gibi soyut asamalari riskli buluyor
- Project OS referansi da bu ekranin veri toplama ve yonetsel pipeline tiyatrosu degil, aktif isi ilerletme ekrani oldugunu tekrar ediyor

Buradan ilk kuvvetli sonuc cikiyor:
- `ulasilamadi` tekrarini ayri bir resmi stage veya yeni business statusune cevirmek yanlis yone iter
- ama hic yansitmamak da operasyonel hafizayi fazla zayif birakabilir

### 2) Uc model

#### U1) Yeni resmi sinyal acilsin: `Soguk lead` / `Zayif temas`
Mantik:
- belirli tekrar sayisinda queue veya business statusu degissin
- operator kartta bunu ayri status gibi gorsun

Artisi:
- tekrar eden erisim sorunu gorunur olur
- saha seciminde bazen hizli eleme hissi verebilir

Eksisi:
- `lead pipeline` dili geri gelir
- stage disi ikinci bir akil yurutme hattı acilir
- `paused`, `lead`, `audit` gibi mevcut alanlarla carpisma baslar
- yarin bunun yanina `sicak`, `orta`, `yeniden dene` gibi yeni etiketler eklenmek istenir

Ara yorum:
- ilk bakista pratik, ama en hizli CRM kaymasi yaratan model bu

#### U2) Yeni resmi status olmasin, ama esik-temelli yardimci sinyal olsun
Mantik:
- `ulasilamadi` tekrar ederse stage degismez
- business statusu degismez
- ama kartta yalniz yardimci bir ipucu olusur
- ornek: `Tekrar temas zayif` veya `Erisim zayifligi var`

Artisi:
- ana stage omurgasi korunur
- tekrar eden dusuk sinyal tamamen kaybolmaz
- operator ayni kayda kore sekilde saplanmaz

Eksisi:
- iyi tasarlanmazsa yine gizli bir scoring/pipeline'a doner
- esik mantigi ister
- helper satir, blokaj helper'lari ve temas eventleriyle karisma riski tasir

Ara yorum:
- dikkatli daraltilirsa dusunulebilir, ama cok kontrollu kalmali

#### U3) Ayri sinyal acilmasin, tekrar alt seviyede kalsin
Mantik:
- `ulasilamadi` event olarak kaydedilir
- detail tarafinda gerekiyorsa timeline veya ham event izi vardir
- queue seviyesinde yeni bir soyutlama uretilmez

Artisi:
- Project OS dili temiz kalir
- yeni pipeline katmani acilmaz
- CRM savrulmasina en direncli modeldir

Eksisi:
- ayni kayda tekrar tekrar gidilme riski olur
- operatorun `bu kayit zaten birkac kez temas disi kaldi` farkindaligi zayiflayabilir

Ara yorum:
- cok temiz ama biraz fazla sessiz kalabilir

### 3) Neden yeni resmi `soguk lead` dili acmak yanlis?
Cunku EsnafDigital'in merkezi `lead nurturing` degil,
`audit -> teklif -> teslimat -> bakim` operasyonudur.
`Soguk lead` gibi bir sinyal ilk anda masum dursa da,
arkasindan su istekleri dogurur:
- `sicak lead` da olsun
- `yeniden canlandir` da olsun
- `beklemede` ayri olsun
- listede bunlara gore filtre acilsin

Bu zincir dogrudan repo cizgisinin kacindigi yone gider.
Ayrica bugunku schema ve derived mantikta boyle bir ikinci omurga yok.
Eklenirse urun dili degil, yonetsel pipeline dili buyur.

### 4) Peki tekrar eden `ulasilamadi` tamamen gorunmez mi kalmali?
Tamamen degil.
Cunku bu sinyal bazen su pratik anlama gelir:
- bu kayit bugunun birincil saha enerjisini hak etmiyor olabilir
- once baska daha canli audit firsatlarina gitmek daha verimli olabilir

Ama bu yargi yeni `lead asamasi` ile degil,
daha hafif bir dikkat ipucusuyla kurulursa daha saglikli olur.

### 5) O zaman en guvenli V1 cizgi ne?
Bence su:
- `ulasilamadi` yinelenmesi yeni resmi queue stage'i veya business statusu uretmemeli
- varsayilan olarak Project OS'ta ayri `soguk lead` etiketi de acilmamali
- eger gercek kullanimda tekrar eden boşa efor problemi cikarsa,
  ancak o zaman ikinci katmanda yalniz helper-duzeyi bir sinyal dusunulebilir
- bu sinyalin dili de `lead temperature` degil,
  daha operasyonel ve gecici bir ifade olmali

Yani gerekirse sonraki aday aile su tarzda olabilir:
- `Temas zayifligi var`
- `Tekrar temas dusuk verim verdi`

Ama bunlar bile V1'de varsayilan davranis olmamali.
Oncelik, secmeli promote mantigi ve detail event izi ile yetinmek.

### 6) Neden helper-duzeyi sinyal bile temkinli olmali?
Cunku artik elimizde birden cok mikro katman var:
- hizli temas preset'i
- detail `son 3 temas ozeti`
- delivery/bakim blokaj helper satiri
- Project OS `summary`

Bunlarin ustune bir de agresif `temas zayif` helper'i gelirse,
kart kendi ana isinden uzaklasabilir.
Bu yuzden boyle bir sinyal varsa bile:
- ikincil,
- esik-temelli,
- nadir,
- karar degistiren durumda
olmasi gerekir.

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- tekrarlayan `ulasilamadi`, yeni bir `soguk lead` veya `zayif temas` resmi statusune donusmemeli
- bu alan lead/pipeline furniture dogurur ve CRM kaymasi riskini buyutur
- varsayilan davranis, `ulasilamadi`yi alt seviyede event olarak tutmak ve queue dilini bozmemek olmali
- ancak sahada gercek tekrar-efor sorunu kanitlanirsa,
  stage disi ama helper-duzeyi cok hafif bir dikkat sinyali ikinci adim olarak dusunulebilir

Kisa formda:
- avoid = official cold-lead state
- recommended V1 = keep unreachable low-level
- maybe later = rare helper, not stage/status
- principle = protect audit-first queue language

Bu model Project OS'un audit-first operasyon kokpiti kimligini koruyor,
ve temas bilgisini de yan bir nurture motoruna cevirmeden tasiyor.

## Altmis besinci okuma - `ulasilamadi` event'i alt seviyede kalacaksa bunun operatora en az zarar veren gorunur izi nerede olmali?
Biriken kararlar burada artik daha net:
- `ulasilamadi` yeni resmi stage/status olmayacak
- Project OS queue dili bu sinyalle yeniden sekillenmeyecek
- `son 3 temas ozeti`ne de varsayilan olarak promote edilmeyecek
- ama tamamen gorunmez kalirsa operator ayni kayda tekrar bos efor harcayabilir

Simdi asil soru su:
- bu izin tek gorunur evi yalniz ham timeline mi olmali?
- yoksa Business Detail'de `son temas denemesi` gibi tek satirlik pasif metadata da olmali mi?
- iki yerde birden gorunmesi tekrar riski yaratir mi?

Bu soru kucuk gibi gorunuyor,
ama aslinda `dusuk degerli sinyal nasil hatirlanir?` sorusu.
Yanlis kurarsak ya sinyal kaybolur,
ya da detail sayfasi hafif hafif temas gunlugune doner.

### 1) Referanslar hangi yone itiyor?
Kaynaklarin verdigi sinirlar oldukca acik:
- Business Detail derived katmani operatoru 30-60 saniyede karara goturmeli
- timeline `ayri truth katmani` degil, compact derived/ref destek alani
- timeline yorum degil hareket gosterir
- ayni bilgi canonical ozet, timeline ve note icinde tekrar yasamamalidir
- canonical kaynakta `gerekirse daha sonra genisletilecek operator metadata alani` icin alan birakiliyor

Buradan ilk guclu sonuc cikiyor:
- yalniz timeline'a guvenmek temiz ama fazla pasif kalabilir
- ayri bir serbest not veya genis temas ozeti acmak ise yanlis yone gider
- eger ek bir gorunur iz olacaksa,
bu yeni truth katmani degil,
son event'ten derive edilen pasif tek satir olmalidir

### 2) Uc model

#### G1) Yalniz ham/compact timeline
Mantik:
- `ulasilamadi` event'i sadece timeline'da gorunur
- detail'in ust bloklarina tasinmaz

Artisi:
- tekrar en dusuk seviyede kalir
- yeni metadata alani acma baskisi yaratmaz
- event-first mantik korunur

Eksisi:
- timeline alt bolumde kaldigi icin operator kolayca kacirabilir
- `en son temas denemesi basarisizdi` gibi hafif hafiza izi karar anina yeterince yakin olmaz
- dusuk sinyal bazen gerektiginden fazla sessiz kalir

Ara yorum:
- temiz ama pratikte biraz fazla derine sakli

#### G2) Detail'de tek satirlik pasif metadata
Mantik:
- `ulasilamadi` event'i alt seviyede kayitli kalir
- detail yuzeyinde yukariya yakin ama pasif bir satir derive edilir
- ornek: `Son temas denemesi: Ulasilamadi.`

Artisi:
- operatorun ayni gun ayni kayda korle saplanma riskini azaltir
- yeni stage/status dili acmaz
- tek satir kaldigi icin note/timeline duvarina donusmez
- `operator metadata alani` cizgisine de uyumlu durur

Eksisi:
- iyi sinir cizilmezse `kanal`, `muhatap`, `tekrar tarihi` gibi alanlar eklenmek istenebilir
- `son 3 temas ozeti` ile rol cakismasi riski vardir

Ara yorum:
- su an en dengeli aday bu, ama doz sert tutulmali

#### G3) Hibrit: timeline + metadata + temas ozeti benzeri ikinci gosterim
Artisi:
- kacirma riski cok duser

Eksisi:
- ayni dusuk degerli sinyal birden cok yerde yasar
- Business Detail tekrarli hafiza duvarina kayar
- `tek kanonik yer` ve `compact derived` cizgisi bozulur

Ara yorum:
- en riskli model bu

### 3) Neden yalniz timeline biraz eksik kaliyor?
Cunku `ulasilamadi` gibi dusuk sinyal zaten queue'ya promote edilmiyor.
Bir de detail'de yalniz timeline dibine itilirse,
operasyonel hafiza olarak neredeyse yok olmus olur.
Bu durumda operator sunu gec gorebilir:
- bu kayitta son deneme basarisizdi
- simdi ayni anda tekrar yuklenmek yerine daha sicak audit firsatina gitmek daha mantikli olabilir

Yani burada ihtiyac tam audit yorumu degil,
yalniz hafif bir `hatirlatici iz`.

### 4) Neden genis metadata veya ikinci temas ozeti yanlis?
Cunku hemen su zincir acilir:
- kanal da yazilsin
- muhatap da gorunsun
- kac kez denendi sayisi da olsun
- sonraki deneme tarihi de eklensin

Bu artik pasif iz degil,
mini temas kaydi olur.
Ayrica `son 3 temas ozeti` ve timeline ile uc katmanli tekrar uretir.
Bu da sayfayi audit-karar yuzeyi olmaktan uzaklastirir.

### 5) O zaman en guvenli V1 cizgi ne?
Bence su:
- `ulasilamadi` event'i ham/compact timeline'da kalmaya devam etmeli
- ama Business Detail'de yalniz tek satirlik pasif bir derived metadata da gosterilebilmeli
- bu satir yeni veri kaynagi olmamali,
  son anlamli `ulasilamadi` event'inden turemeli
- satir yuksek sesli warning veya CTA olmamali
- `son 3 temas ozeti`ne karismamali

Ornek aile:
- `Son temas denemesi: Ulasilamadi.`
- `Son deneme yanitsiz kaldi.`

Ama bundan ileri gitmemeli:
- kanal yok
- muhatap yok
- neden aciklamasi yok
- tekrar sayaci yok
- yeni buton yok

### 6) Bu satirin en dogru yeri neresi olur?
En guvenli yer,
Next Step veya kisa ozet satirini ele gecirmeyen,
ama karar anina yakin bir ikincil metadata slotu.
Yani:
- header degil
- primary CTA satiri degil
- `son 3 temas ozeti` bolumu degil
- timeline'in yerine gecen yeni kart da degil

Daha cok su rol:
- pasif hafiza izi
- operatorun son denemeyi unutmasini engelleyen tek satir

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- `ulasilamadi` event'inin tek gorunur evi yalniz timeline olmamali, cunku fazla pasif kalabilir
- ama bunu ayri temas ozeti veya genis metadata katmanina cevirmek de yanlis olur
- en guvenli model `timeline kaynak + detail'de tek satirlik pasif derived metadata` gorunuyor
- bu metadata yeni truth veya yeni action dili acmamalı
- rolü yalniz hafif hatirlatici iz olmakla sinirli kalmali

Kisa formda:
- source = timeline event
- visible trace = one passive detail line
- avoid = multi-field contact metadata
- avoid = promote into main summary/next step

Bu model `ulasilamadi` bilgisini ne kaybettiriyor,
ne de paneli gizli bir temas gunlugune ceviriyor.

## Altmis altinci okuma - audit summary placeholder icin en guvenli nihai kisa metin hangisi olmali?
Bu soru kucuk UI kopyasi gibi gorunuyor,
ama repo gerceginde etkisi buyuk.
Cunku `audit.summary` bugun yalniz create form alaninda kalmiyor:
- create/update tarafinda zorunlu alan
- Project OS queue `summary` satirina tasiniyor
- business detail'de fiilen `ek not / ozet` gibi gorunebiliyor
- agent scan ve Y.Z raporu giris baglamina da karisabiliyor

Yani placeholder kotuysa,
operatoru yalniz formda degil,
sonraki butun derived yuzeylerde de zayif metne iter.

### 1) Referanslar hangi yone itiyor?
Biriken onceki kararlar burada ortak yon veriyor:
- `audit ozeti` = kaydin ilk operasyonel problemi ve teklif zemini
- `Y.Z raporu` = derived karar ozeti
- `next step` = aksiyon dili
- audit ozeti bunlarla karismamali
- uzun narrative veya serbest not yigini da olmamali

Buradan ilk guclu sonuc su:
- placeholder ne fazla genel olmali,
- ne de operatoru paket/teklif diliyle erken kilitlemeli
- en iyi kopya operatoru uc dusunceye yonlendirmeli:
  - ana eksik ne?
  - muhtemel cozum yonu ne?
  - beklenen sonuc ne?

### 2) Uc model

#### A1) Cok kisa ve genel placeholder
Ornek:
- `Kisa audit ozeti yazin.`
- `Ozet girin.`

Artisi:
- en temiz ve en kisa gorunur

Eksisi:
- operatoru bos ve daginik metne iter
- kimisi sadece bulgu yazar, kimisi teklif fikri yazar, kimisi not yigini yazar
- ayni alanin rolunu yuzeyler arasi tutarsizlastirir

Ara yorum:
- temiz gorunur ama fazla bos bir yonlendirme

#### A2) Yumşak uc-parcali yonlendirme
Ornek:
- `Ana eksigi, muhtemel cozum yonunu ve beklenen sonucu 1-2 cumlede yazin.`

Artisi:
- audit -> teklif koprusunu acar
- ama operatoru paket adi veya fiyat yazmaya zorlamaz
- literal sablonu kayda zorlama riski dusuktur
- Project OS ve Business Detail'de okununca da fazla yapay durmaz

Eksisi:
- halen bir miktar yorum gerektirir
- bazi operatorler `muhtemel cozum yonu`nu fazla ticari okuyabilir

Ara yorum:
- su an en dengeli yol bu

#### A3) Sert yari-sablon placeholder
Ornek:
- `Ana eksik: ... Cozum yonu: ... Beklenen sonuc: ...`

Artisi:
- yazim disiplini yuksek
- operatorun alandan sapma ihtimali azalir

Eksisi:
- kayda da ayni etiketli yapi kopyalanabilir
- sonra bu metin Project OS `summary` veya detail ozetinde mekanik gorunur
- audit ozeti yerine form sablonu okunuyormus hissi verir

Ara yorum:
- mantikli ama saklanan metin icin fazla sert

### 3) Neden `uygun cozum yonu` yerine `muhtemel cozum yonu` daha guvenli?
Cunku `uygun` kelimesi,
sanki karar kapanmis ve paket secimi netlesmis gibi duyulabilir.
Oysa audit ozeti hala giris katmanidir.
`Muhtemel` veya `olasi` dili daha emniyetli:
- audit'in teshis rolu korunur
- teklif cizgisine kopru kurulur
- ama satis karari erken donmez

### 4) Neden literal basliklari kayda zorlamamak daha iyi?
Cunku bu alanin cikisi sonradan bircok yerde okunuyor:
- queue `summary`
- business detail ozet/not alani
- yardimci tarama ve rapor baglami

Eger operatore `Ana eksik:` kalibini yazdirirsak,
bu mekanik yapi kayitlar arasi hizli okunurluk kazandirsa da,
bir sure sonra butun yuzeylerde ayni karton dil dolasir.
V1 icin daha guvenli cizgi,
operatorun zihnini yonlendiren ama kaydi etiketli sablona zorlamayan placeholder.

### 5) O zaman en guvenli V1 metni ne olmali?
Bence su en dengeli aday:
- `Ana eksigi, muhtemel cozum yonunu ve beklenen sonucu 1-2 cumlede yazin.`

Neden?
- `ana eksik` audit teshisini sabitler
- `muhtemel cozum yonu` teklif bagini acik tutar ama kilitlemez
- `beklenen sonuc` ise yalniz problem saymak yerine operasyon etkisini dusundurtur
- `1-2 cumle` siniri alani romanlastirmayi engeller

### 6) Yedek ikinci aday ne olabilir?
Eger daha da kisa istenirse:
- `Ana eksigi, cozum yonunu ve beklenen sonucu kisaca yazin.`

Ama burada iki risk biraz artiyor:
- `kisaca` bazen tek fragmana duser
- `cozum yonu` muhtemellik tonunu kaybeder

Bu yuzden ilk tercih hala `1-2 cumle` ve `muhtemel` iceren versiyon.

### 7) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- audit summary placeholder cok genel olmamali
- ama operatoru etiketli yari-form metnine de zorlamamali
- en guvenli model `yumusak uc-parcali yonlendirme` gorunuyor
- en dengeli metin de su:
  - `Ana eksigi, muhtemel cozum yonunu ve beklenen sonucu 1-2 cumlede yazin.`

Kisa formda:
- avoid = `Ozet girin.` gibi bos placeholder
- avoid = `Ana eksik: ...` diye sert kayit sablonu
- recommended = soft 3-part guidance
- exact candidate = `Ana eksigi, muhtemel cozum yonunu ve beklenen sonucu 1-2 cumlede yazin.`

Bu model audit ozetini hem yazarken toparliyor,
hem de daha sonra Project OS ve Business Detail'e tasindiginda mekaniklestirmeden okunur tutuyor.

## Altmis yedinci okuma - audit summary placeholder bu kadar netlestiyse, ayni alan icin ikinci bir `yardim metni` daha gerekir mi?
Bir onceki kararda placeholder icin en dengeli aday netlesti:
- `Ana eksigi, muhtemel cozum yonunu ve beklenen sonucu 1-2 cumlede yazin.`

Simdi soru su:
- bu alanin altina ikinci bir helper text de koymali miyiz?
- yoksa placeholder tek basina yeterli mi?

Bu soru onemli.
Cunku audit create formu Project OS icindeki dar form alaninda aciliyor.
Yani buradaki her ek satir,
`dar form` ile `mikro editor` arasindaki siniri etkiliyor.

### 1) Referanslar hangi yone itiyor?
Burada uc guclu sinir var:
- Project OS form duvarina donusmemeli
- UX kurallari bilgi yogunlugunun kontrollu kalmasini istiyor
- `audit.summary` alani tek form alani degil, sonraki derived yuzeylere de tasinan cekirdek metin

Ayrica kod gerceginde bugun net olan seyler su:
- `createAudit` tarafinda `summary` zorunlu
- audit formu bir `dar form alani` kontratinin parcasi
- grep taramasinda audit ozet alanina bagli tanimli bir yardim metni izine rastlanmadi
- repo'da helperText desenleri daha cok tarama ve buton baglamlarinda, yani operasyon aciklamasi gereken yerlerde kullaniliyor

Buradan ilk guclu sonuc cikiyor:
- audit summary alaninda varsayilan tasarim `label + placeholder` ile yetinmeye daha yakin
- ikinci yardim satiri ancak placeholder'in tek basina yetmedigi net bir kullanim sorunu varsa dusunulmeli

### 2) Uc model

#### HLP1) Yalniz placeholder
Mantik:
- label gorunur kalir
- placeholder yonlendirir
- ayrica helper text eklenmez

Artisi:
- dar form ritmi korunur
- bilgi yogunlugu dusuk kalir
- operatoru ayni yonde iki kez itmez
- Project OS hizli aksiyon karakterine daha iyi uyar

Eksisi:
- placeholder focus sonrasi kayboldugu icin,
  bazi operatorler yazarken yonlendirmeyi unutabilir

Ara yorum:
- su an en guvenli varsayilan bu

#### HLP2) Placeholder + kisa helper text
Ornek helper:
- `Kisa tutun, teklif gerekcesine zemin hazirlayin.`

Artisi:
- yazarken yonlendirme kaybolmaz
- alana rol netligi katabilir

Eksisi:
- placeholder zaten ayni isi yapiyorsa tekrar yaratir
- dar formda ikinci aciklama satiri gereksiz burokrasi hissi dogurur
- kotu yazilirsa audit ozeti ile teklif notu arasindaki ayrimi daha da bulandirabilir

Ara yorum:
- ancak placeholder yetersiz kalirsa dusunulecek ikinci adim

#### HLP3) Placeholder + helper + yari-sablon ornegi
Artisi:
- disiplin cok artar gibi gorunur

Eksisi:
- audit create formunu mikro dokumantasyona cevirir
- operatoru okuma/yazma moduna sokar
- `dar form` yerine `kopya duvari` hissi uretir
- skill'in kirmizi cizgisi olan gereksiz ekran/burokrasi artisini tetikler

Ara yorum:
- en riskli model bu

### 3) Neden ikinci helper satiri varsayilan olarak fazla gelebilir?
Cunku placeholder zaten uc kritik soruyu tek satirda veriyor:
- ana eksik
- muhtemel cozum yonu
- beklenen sonuc

Bunun altina bir de helper koyarsak,
aynı alan su hisse kayabilir:
- label
- placeholder
- helper
- belki sonra hata mesaji

Bu yogunluk,
Project OS icindeki hizli audit acilisina gore fazla ogretici bir ton yaratir.
V1'de ihtiyacimiz egitim metni degil,
dogru yone iten hafif raydir.

### 4) Peki placeholder'in kaybolmasi gercek risk degil mi?
Bir miktar risk var.
Ama bu riskin daha dusuk maliyetli cozumu once su olmali:
- label'i net secmek
- placeholder'i guclu yazmak
- kayit kalitesini gozlemlemek

Buna ragmen sahada su problem gorulurse:
- operator metni hep eksik veya tek boyutlu giriyor
- placeholder focus sonrasi yon tamamen kayboluyor

ancak o zaman ikinci adim olarak cok kisa bir helper text dusunulebilir.
Yani helper text V1 varsayilani degil,
V1 gozlem sonrasi acilabilecek emniyet kemeri olmali.

### 5) O zaman en guvenli V1 cizgi ne?
Bence su:
- audit summary alaninda label + guclu placeholder yeterli olmali
- varsayilan olarak ikinci helper text eklenmemeli
- copy yogunlugu yerine net placeholder tercih edilmeli
- ancak gercek kullanimda kalite drift'i gorulurse,
  o zaman ikinci adim olarak tek satirlik cok kisa helper dusunulebilir

Yani ilk V1 paketi:
- label = `Audit ozeti`
- placeholder = `Ana eksigi, muhtemel cozum yonunu ve beklenen sonucu 1-2 cumlede yazin.`
- no helper text by default

### 6) Gecici net kanaat
Su an en mantikli V1 cizgi su:
- audit summary placeholder netlestiyse,
  ayni alan icin ikinci bir yardim metni varsayilan olarak gerekmez
- en guvenli model `label + strong placeholder` gorunuyor
- helper text ikinci katman olarak ancak gercek veri kalitesi sorunu cikarsa acilmali
- audit create deneyimi `dar form` karakterini korumali,
  ogretici kopya duvarina donmemeli

Kisa formda:
- recommended V1 = placeholder only
- avoid = placeholder plus repetitive helper
- maybe later = one-line helper after real usage signal
- principle = protect low-density quick audit entry

Bu model audit ozet alanini netlestiriyor,
ama ayni anda Project OS formunu da agirlastirmiyor.

## Altmis sekizinci okuma - 5 finalist modeli tekrar daraltinca hangi omurgalar ayakta kaliyor?
Bu wake'in amaci mikro kararlarin gercek model secimine ne kadar donustugunu test etmekti.
Cunku son birkac okumada su alanlarda ciddi daralma oldu:
- admin panele ilk giris
- discovery ile business ayrimi
- `hangi isletmeye gidilecegi`
- Business Detail'in rolu
- Project OS'un rolu
- hizli temas sonucu ve pasif hafiza izleri
- audit -> teklif -> delivery zinciri

Yani soru artik sadece tek tek UI karari degil:
- bu parcalar gercekte hangi finalist modeli guclendiriyor?
- hangileri hala ayakta ama zayif kaldi?

### 1) Daraltma sonrasi sabitlenen cekirdekler
Su satirlar artik neredeyse omurga gibi duruyor:
- `Discovery` aday bulma ve on eleme yuzeyi olarak kalmali
- `Businesses` / `Business Detail` sahiplenilen kayitlarin evi olmali
- `Business Detail` tek kayitta karar merkezi olmali
- `Project OS` gunluk sicak is ve stage kuyrugu olmali
- `ziyaret hazirlik` ayri ana urun olmaktan once detail icindeki hafif katman olarak test edilmeli
- audit dili teklif/delivery zincirini beslemeli
- hizli temas sonucu varsa bile mini CRM'e kaymamalı

Bu set su an finalistleri esit durumda birakmiyor.
Bazi modeller bu cizgiyle daha cok hizalaniyor.

### 2) 5 finalistin guncel sirasi

#### 1. Finalist C - Hibrit model
**Guncel omurga:**
- `Discovery` = aday bulma ve on eleme
- `Businesses` = sahiplenilen kayit havuzu
- `Business Detail` = tek kayit karar merkezi
- `Project OS` = gunluk sicak operasyon
- `ziyaret hazirlik` = ayri sayfa degil, detail icindeki hafif mod/kart

**Neden en guclu?**
Cunku kullanicinin sordugu tum ana sorulara ayri ama kontrollu bir ev veriyor,
ama yeni bir genel CRM evreni acmiyor.
Ayrica sonraki mikro kararlarin cogu da bunu destekledi:
- ziyaret secimi discovery skoru ile ayni degil
- Project OS saha secim motoru degil
- detail tek kayitta daha da guclendi
- ziyaret hazirlik ayri pano olmadan once detail icinde test edilmeli
- audit -> teklif -> delivery zinciri de detail icinde zincir kartlariyla gorunur kilinabilir

**En guclu varyasyon:** `C1/C3 melezi`
- klasik hibrit omurga korunur
- ziyaret hazirlik detail modu olur
- root veya nav tarafinda gorev-yonlendirme hafif kalir

**Zayif nokta:**
- rol ayrimi kotu yazilirsa kullanici `nereye bakacagim` diye zorlanabilir
- yuzey sayisi hala diger modellere gore daha fazla

#### 2. Finalist B - Business Detail karar merkezi + Project OS gunluk operasyon
**Guncel omurga:**
- toplu operasyon = Project OS
- tek kayit karari = Business Detail
- discovery destek katmani olarak kalir

**Neden hala cok guclu?**
Cunku mevcut repo ve veri modeliyle en kolay oturan iki ana omurga bu.
Ozellikle su kararlar bunu guclendirdi:
- Project OS hizli ama dar kalmali
- detail ziyaret, audit, paket ve kickoff zincirini birlikte okuyabilmeli
- `ulasilamadi`, `temas sonucu`, audit summary gibi mikro kararlar detail tarafinda daha dogru eve oturuyor

**En guclu varyasyon:** `B2`
- Detail icinde `ziyarete uygunluk` veya hafif ziyaret karti
- Project OS ayni kalir

**Zayif nokta:**
- `hangi isletmeye gidilecegi` sorusunda discovery / ziyaret secim katmani olmadan eksik kalir
- yeni aday bulma ve on eleme tarafini kendi basina cozmuyor

#### 3. Finalist A - Kesif once, sonra business detail
**Guncel omurga:**
- discovery on eleme yapar
- uygun aday business olur
- karar detail tarafina akar

**Neden orta seviyede kaldi?**
Cunku duplicate riski, cop kayit temizligi ve aday sahiplenme mantiginda hala guclu.
Ozellikle fiziksel sahada `once hizli ara, sonra gerekirse yeni aday ac` ve duplicate kontrol akisi bunu tamamen oyundan dusurmuyor.

**En guclu varyasyon:** `A + hafif duplicate guard`
- discovery giris kapisi olur
- manuel yeni kayitta muhtemel benzerler uyarilir

**Zayif nokta:**
- fiziksel ziyaret kararini discovery skoru tek basina cozemiyor
- gunluk operasyon ve teklif/delivery takibini kendi basina tasimiyor
- hizli saha gununde fazla oneleme hissi verebilir

#### 4. Finalist D - Ziyaret hazirlik odakli saha modeli
**Guncel omurga:**
- ziyaret hedefi
- konusma plani
- alinacak bilgi listesi
- muhtemel paket / sonraki adim

**Neden tamamen elenmedi?**
Cunku kullanicinin sorularinin onemli kismi dogrudan saha gunune bakiyor.
Ayrica `hangi isletmeye gidilecegi`, `sahada ne soylenir`, `hangi bilgi toplanir` sorulari saf UI detayi degil, gercek operasyon ihtiyaci.

**En guclu varyasyon:** `D2`
- ayri sayfa degil
- Business Detail icinde ziyaret modu/karti

**Zayif nokta:**
- ayri pano oldugunda ekran cogaltma ve tekrar riski hizla buyuyor
- toplu saha planlama ihtiyaci bugun veri modeliyle henuz kanitlanmis degil
- kendi basina tam model olmaktan cok C/B icine eklenen saha katmani gibi davranıyor

#### 5. Finalist E - Audit dosyasi / teklif bagli model
**Guncel omurga:**
- audit giris urunu
- paket ve teklif auditten turetilir
- delivery kickoff teklifteki secimlerden beslenir

**Neden hala listede ama geride?**
Cunku EsnafDigital'in ana hizmet mantigina en sadik dil burada.
`neden bu paket`, audit summary placeholder, kickoff scope gibi konularda E modeli digerlerine dusunce iskeleti veriyor.

**En guclu varyasyon:** `E2`
- audit -> teklif -> kickoff zinciri ayri ekranlar degil,
  Business Detail icindeki zincir kartlariyla gorunur olur

**Zayif nokta:**
- `hangi isletmeye gideyim` sorusunu tek basina cozmez
- discovery, duplicate, ziyaret secimi ve gunluk operasyonu eksik birakir
- tek basina tum panel modeli olmaktan cok diger finalistlerin icine gomulu bir omurga gibi calisiyor

### 3) Bu siralama ne anlatiyor?
Onemli bir sey artik netlesiyor:
- `C` ve `B` gercek panel modeli adaylari
- `A` giris / on eleme mantigi olarak yasiyor
- `D` saha katmani olarak yasiyor
- `E` audit-teklif zinciri dili olarak yasiyor

Yani 5 finalist kağıt uzerinde esit degil.
Bugunku arastirma cizgisi su yone akiyor:
- asıl panel omurgasi = `C` veya `B`
- kritik destek katmanlari = `A`, `D`, `E`

Bu da su ara okumayi doguruyor:
- belki de nihai karar 5 esit finalist arasindan secim degil,
  `ana omurga + destek moduller` mantigina donusuyor

### 4) Gecici net kanaat
Su an en mantikli daraltma su:
1. **C** = en guclu tam sistem adayi
2. **B** = en uygulanabilir sade omurga adayi
3. **A** = temiz giris / duplicate-disiplin adayi
4. **D** = ayri urun degil, saha katmani adayi
5. **E** = ayri panel degil, audit-teklif zinciri omurgasi adayi

Kisa formda:
- likely final battle = `C vs B`
- `A` survives as intake discipline
- `D` survives as detail-based visit prep layer
- `E` survives as audit->offer->delivery reasoning spine

Bu okuma onemli cunku artik sonraki arastirma,
`5 ayri dunya` uretmek yerine,
`C mi B mi ana omurga olacak ve A/D/E bundan ne dozda iceri girecek` sorusuna daralabilir.

## Sonraki arastirma basliklari
- `C` ile `B` arasindaki esas fark kullaniciya hangi anda hissediyor: aday secimi mi, ziyaret hazirligi mi, yoksa gunluk operasyon mu?
- `A`nin discovery/disiplin faydasi `C` icine gomulu kalabilir mi, yoksa ayri bir davranis olarak korunmasi mi gerekir?
- `D2` ziyaret modu detail icinde kalirsa, toplu saha gunu icin tek eksik ne olur?
- `E2` zincir kartlari Business Detail icinde yeterli olur mu, yoksa audit/offer bagini aciklamak icin ek derived satir gerekir mi?
- detail icindeki istisna override icin kisa sebep tipleri serbest metin mi olmali, yoksa 3-4 sabit etiket daha guvenli mi?
- delivery/bakim `blokaj sinyali` helper satiri icin en guvenli mikro kopya ailesi ne olmali: `Once onay bekleniyor.` / `Gerekli assetler tamamlanmadi.` / `Bakim dokunusu yaklasti.` gibi tek kalip mi, yoksa label-bazli yari-sabit cumleler mi daha tutarli?
