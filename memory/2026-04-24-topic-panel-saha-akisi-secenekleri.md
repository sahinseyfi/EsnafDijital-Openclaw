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
- audit -> teklif -> teslimat zinciri korunur
- `Business Detail` bu zincirin `neden / neye donustu` tarafini okumayi tasimali
- `Project OS` ise hangi kayit hangi asamada bekliyor sorusunu tasimali

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
