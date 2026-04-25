# 2026-04-24 Topic - panel ve saha akisi secenekleri

## Bu dosya ne?
Bu dosya artik ham arastirma dump'i degil.
Panel, operasyon ve saha akisi icin daraltilmis calisma ozeti.

Amac:
- cok fazla secenegi tek yerde bogmamak
- su anki en guclu cizgiyi okunur tutmak
- sonraki daraltma icin net devralma noktasi birakmak

## Ana sorular
Kurucunun cevap aradigi ana sorular:
- admin paneline girince isletme nasil bulunur ve secilir?
- isletme arastirmasi nasil yapilir?
- arastirma sonucu hangi isletmeye gidilecegi nasil belirlenir?
- ziyaret hazirligi nasil yapilir?
- sahada ne soylenir?
- paketler nasil sunulur ve teslim edilir?
- isletme bilgileri nasil toplanir ve sisteme nasil girilir?
- girilen bilgiler nasil sonuca donusur?

## Kisa cevap - su anki en guclu cizgi
Su anki en dengeli yorum su:
- cekirdek omurga = `Home/Project OS + Businesses + Business Detail`
- `Discovery` tamamen kalkmiyor
- ama ana cockpit de olmuyor
- en guclu yorum = `B cekirdegi + yan intake/Discovery kapisi`

Bu ne demek:
- `Home/Project OS` = gunun aktif isi ve sicak operasyon akisi
- `Businesses` = sahiplenilen kayitlari bulma, filtreleme ve detaya gecme yeri
- `Business Detail` = tek kayitta karar verme, audit oncesi okuma ve sonraki adimi secme yeri
- `Discovery` = aday habitatı, on eleme, shortlist ve kontrollu import kapisi

## Karar notu - 2026-04-25
Kurucu karari:
- V1 ana omurga olarak `Finalist B` secildi.
- `Finalist A` tamamen elenmedi; candidate/business ayrimi ve kontrollu import disiplini `B` omurgasinin intake kapisina gomulecek.

Bu karar su an ne anlama geliyor:
- ana nav ve gunluk calisma omurgasi = `Home/Project OS + Businesses + Business Detail`
- `Discovery` kalabilir ama ana cockpit gibi konumlanmayacak
- V1 ekran ve veri akisi tartismalari `B + A intake disiplini` varsayimiyla daraltilacak
- sonraki somutlestirme isi, bu karari ekran akisi ve veri siniri seviyesine indirmek olacak

## Netlesen cizgiler

### 1) Candidate ve business ayni sey degil
Bu ayrim korunmali.
Her aday hemen business olmamali.
Yoksa:
- business havuzu siser
- cop kayit artar
- operasyon zinciri kirlenir

### 2) Discovery gerekli ama ikincil
Discovery lazim cunku:
- ham adayi business'e yazmadan once ayiriyor
- shortlist davranişi tasiyor
- kontrollu `isletmeye aktar` kapisi oluyor
- snapshot ve aday detayini business detail disinda tutuyor

Ama discovery ana operasyon merkezi olmamali.
Ana omurga yine sahiplenilen kayitlar ve audit -> teklif -> teslimat hatti olmali.

### 3) Admin panele girince ilk cevap tek yer degil
En dogru yorum su:
- aktif is varsa merkez = `Home/Project OS` ve `Businesses`
- mevcut kayit aranacaksa = `Businesses`
- yeni aday aranacaksa = `Discovery`

Yani tek cevap `Discovery` ya da tek cevap `Businesses` degil.
Ama gunluk ana omurga `Businesses` tarafina daha yakin.

### 4) `Hangi isletmeye gideyim?` sorusu discovery skoru ile tek basina cozulmuyor
Bugunku discovery skoru daha cok `dijital acik/firsat` skoru.
Dogrudan `once buna git` skoru degil.

Bu nedenle saha secimi icin daha dogru formul su yone gidiyor:
`ziyaret adayi = dijital acik + segment uyumu + saha verimi + manuel oncelik - kapanik/uygunsuzluk riskleri`

Kisa yorum:
- discovery yardimci sinyal verir
- son karar icin saha verimi ve manuel oncelik de gerekir

### 5) Ziyaret hazirligi ayri pano olmak zorunda degil
Su an en guvenli cizgi:
- ayri saha paneli acmak yerine
- `Business Detail` icinde hafif ziyaret karti / ziyaret modu dusunmek

Boylece:
- ekran sayisi artmaz
- tek kayit icin hazirlik ayni yerde okunur
- ama gerekirse sonra derinlesebilir

### 6) Giris disiplini yeni ekranlardan daha kritik
Bugun en buyuk eksik yeni bir sayfa degil.
Daha kritik eksikler:
- kontrollu import / sahiplenme
- duplicate uyarisi
- kaynak izi
- hafif shortlist

Yani once ekran degil,
`giris disiplini` netlesmeli.

## 5 finalist - bugunku daraltilmis hali

### Finalist B - Sade cekirdek omurga
**Omurga:**
- `Home/Project OS + Businesses + Business Detail`
- discovery ikincil intake davranisi

**Neden guclu:**
- repo sinyalleriyle en uyumlu
- gunluk operasyonu sade tutuyor
- teklif netlesmeden ekran cogaltmiyor

**Zayif nokta:**
- discovery disiplini gevserse aday secimi fazla operator ustunde kalir

### Finalist C - Daha sistemli intake + operasyon omurgasi
**Omurga:**
- discovery -> business detail -> operasyon kuyrugu daha bilincli baglanir

**Neden guclu:**
- `hangi adayi hatta alalim?` sorusunu daha iyi tasir
- aday secimi sorusunda B'den daha guclu

**Zayif nokta:**
- bugunku faz icin biraz fazla sistemsel kalabilir
- discovery'yi ana cockpit gibi buyutme riski var

### Finalist A - Temiz giris / on eleme modeli
**Omurga:**
- kesif once
- sonra business'e gecis

**Neden hala yasiyor:**
- candidate/business ayrimini en temiz o koruyor
- duplicate ve cop kayit riskini azaltmaya yardim ediyor

**Zayif nokta:**
- tek basina gunluk operasyon modeli degil
- saha secimini discovery skoru ile asiri baglama riski var

### Finalist D - Ziyaret hazirlik katmani
**Omurga:**
- ziyaret hedefi
- ne soylenir
- hangi bilgi toplanir
- muhtemel paket / sonraki adim

**Neden hala yasiyor:**
- kurucunun sorularinin buyuk parcasi sahaya bakiyor
- ama bu ayri ana panel degil, ek katman gibi duruyor

**Zayif nokta:**
- ayri pano olursa ekran cogaltir
- bugunku veri modeliyle henuz tam kanitli degil

### Finalist E - Audit -> teklif -> teslimat mantik omurgasi
**Omurga:**
- auditten teklif cikar
- tekliften teslimat scope'u beslenir

**Neden hala yasiyor:**
- EsnafDigital'in hizmet mantigina en sadik cizgi bu
- `neden bu paket`, `neden bu scope` sorularini iyi tasiyor

**Zayif nokta:**
- tek basina aday bulma, duplicate, saha secimi ve gunluk operasyonu cozmez
- tam panel modeli degil, mantik omurgasi gibi davranir

## Bugunku siralama
Su anki gecici siralama:
1. **B** = en uygulanabilir cekirdek
2. **C** = en guclu alternatif / daha sistemli varyasyon
3. **A** = intake disiplini
4. **D** = saha katmani
5. **E** = audit-teklif-teslimat mantik omurgasi

Kisa yorum:
- asil yarıs `B vs C`
- `A`, `D`, `E` artik tam rakipten cok destek katmani gibi okunuyor

## Su an icin net cevaplar

### Admin paneline girince isletme nasil bulunur?
- mevcut kayit icin once `Businesses`
- yeni aday icin `Discovery`
- aktif isin onceligi icin `Home/Project OS`

### Isletme arastirmasi nasil yapilir?
- aday habitatında discovery/dis sinyaller okunur
- sahiplenilen kayitta `Business Detail` canonical + external + derived okumayi birlestirir

### Hangi isletmeye gidilecegi nasil belirlenir?
- discovery skoru tek basina yeterli degil
- segment, ulasilabilirlik, yakinlik, kapalilik riski ve manuel oncelik de gerekir

### Ziyaret hazirligi nasil yapilir?
- ilk guvenli cizgi = `Business Detail` icinde hafif ziyaret karti/modu

### Girilen bilgiler nasil sonuca donusur?
- V1 operasyon hatti kisaltilmis 3 adim degil; `intake -> audit -> teklif -> teslimat -> bakim` cizgisi korunur
- `Project OS` audit-first sicak kuyruk gibi davranabilir ama bu, diger asamalari yok saydigi anlamina gelmez
- `Business Detail` bu hattin `neden / neye donustu` tarafini tek kayitta okumayi tasimali
- `Project OS` ise hangi kayit hangi asamada ve neden bekliyor sorusunu tasimali

## V1 panel iskeleti - B omurgasinin somut hali

### 1) Ana nav
V1 icin ana nav su kadar olmali:
- `Home / Project OS`
- `Businesses`
- `Discovery`

Yorum:
- `Home / Project OS` = sicak is ve bugun neye dokunacagim sorusu
- `Businesses` = sahiplenilen kayit evreni
- `Discovery` = yeni aday bulma ve kontrollu iceri alma kapisi

Nav disinda tutulmasi gereken seyler:
- ayri `Visits` ana sayfasi
- ayri `Pipeline CRM` ana sayfasi
- ayri `Audit Queue` ana sayfasi

### 2) Home / Project OS ne gostermeli?
Bu sayfa rapor sayfasi degil, sicak operasyon panosu olmali.
Ilk bloklar su olmali:
- `Bugun / sicak isler`
- `Teklif bekleyenler`
- `Teslimat / asset / onay blokajlari`
- `Bakimda dikkat isteyenler`

Her satirda en az su davranis olmali:
- isletme adi
- mevcut durum / neden sicak oldugu
- sonraki adim
- detaya git

Bu sayfa yeni aday kesfi veya detayli arastirma yukunu tasimamali.

### 3) Businesses ne olmali?
Bu ekran sahiplenilen kayit listesi olmali.
Aday havuzu olmamali.

Liste / filtre mantigi:
- isim
- segment
- konum
- durum / asama
- son temas / son hareket
- etiket veya hafif blokaj sinyali

Hizli aksiyonlar:
- detaya git
- not / durum guncelle
- teklif veya ziyaret hazirligi icin kaydi ac

Bu ekranda olmamasi gereken seyler:
- ham discovery snapshot yiginlari
- kontrolsuz `yeni business` cop kayit akisi
- discovery skoru merkezli siralama

### 4) Business Detail ne olmali?
V1'in asil karar yuzeyi burasi olmali.
Tek kayitta canonical + external + derived okumayi birlestirmeli.

Ilk bloklar:
- `Ozet`  -> isim, segment, konum, iletisim, sahiplik/durum
- `Dis sinyaller` -> web, maps, sosyal, gozlenen aciklar
- `Notlar / temas gecmisi`
- `Ziyaret hazirligi` -> ne diyecegim, ne soracagim, ne toplayacagim
- `Operasyon izi` -> `intake -> audit -> teklif -> teslimat -> bakim` + gerekiyorsa hafif blokaj sinyalleri
- `Sonraki adim`

Temel kural:
- operator bir isletmeyle ilgili karar vermek icin baska 3 ekrana ziplamak zorunda kalmamali

### 5) Discovery ne olmali?
Discovery ana operasyon merkezi degil, intake kapisi olmali.

V1 davranisi:
- aday listele
- kisa sinyal goster
- shortlist isle
- duplicate uyar
- kontrollu `business'e aktar`

Discovery'de tutulabilecek seyler:
- ham aday
- kaynak izi
- snapshot mantigi
- discovery skoru
- shortlist / eleme notu

Discovery'den business'e tasinmamasi gereken her sey otomatik tasinmak zorunda degil.
Sadece operasyon icin gereken minimum temiz alanlar gecmeli.

### 6) Discovery -> Business gecis kurali
Bu gecis V1'in en kritik disiplini olmali.

Asgari kural:
- her aday otomatik business olmaz
- aktarim oncesi duplicate kontrolu gorunur olur
- kaynak kaybolmaz
- aktarimdan sonra business tarafi temiz ve operasyon odakli kalir

Business'e gecmesi gereken minimum set:
- ad / unvan
- kategori veya segment
- konum
- iletisimden elde kalan guvenli alanlar
- kaynak referansi
- ilk kisa operator notu

Discovery tarafinda kalabilecekler:
- ham snapshot detaylari
- zayif veya gecici sinyaller
- discovery puani / aday shortlist notlari

### 7) V1'de acilmamasi gereken yeni katmanlar
Simdilik acilmamasi gerekenler:
- ayri ziyaret paneli
- ayri saha rota paneli
- ayri mini CRM kuyrugu
- stage duvari gibi asiri detayli pipeline
- discovery ile business arasinda ucuncu ara varlik

### 8) V1 icin net urun cumlesi
Bu panelin V1 yorumu su olmali:
- `Project OS` = bugun hangi sahiplenilmis is sicak?
- `Businesses` = hangi kayit benim aktif evrenimde?
- `Business Detail` = bu kayit icin ne biliyorum, ne yapacagim?
- `Discovery` = yeni adayi iceri almadan once burada ayiklarim

## Sonraki arastirma basliklari
- `Discovery` nav'de kalacaksa etiketi ve notu nasil yazilmali ki onu ana cockpit gibi degil, intake kapisi gibi anlatsin?
- `Discovery` nav'den cekilirse en guvenli giris noktasi neresi olur?
- `Businesses` icinde `hizli bul veya kontrollu yeni aday ac` davranisi olursa discovery ile sinir nerede cizilmeli?
- `Discovery detail` icindeki hangi alanlar business detail'e hic tasinmamali?
- ayri aday habitatı DB'de mi, runtime state + snapshot dosyalarinda mi kalmali?
- ziyaret hazirligi ve saha secimi kartlari discovery tarafinda mi, business detail tarafinda mi daha dogal durur?

## Devralma notu
Bu dosya bundan sonra uzun dusunce dump'i gibi buyumemeli.
Yeni arastirma gelirse:
- ya bu ozetin ilgili bolumu guncellenmeli
- ya da yeni konu gercekten ayriysa yeni topic dosyasi acilmali
