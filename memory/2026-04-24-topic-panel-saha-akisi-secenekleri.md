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

## Sonraki arastirma basliklari
- `ziyaret hazirligi` ayri sayfa mi, business detail modu mu?
- `sahada ne soylenir` icin segment bazli konusma kartlari nasil yazilmali?
- `hangi isletmeye gidilecegi` icin skor + manuel oncelik + mesafe mantigi birlikte mi calismali?
- `girilen bilgiler nasil sonuca donusur` icin audit -> teklif -> delivery veri zinciri nasil gorunur hale getirilmeli?
- `isletme bilgileri nasil toplanir` konusu iki form katmani olarak mi tasarlanmali: gorusme notu ve kickoff bilgi toplama
