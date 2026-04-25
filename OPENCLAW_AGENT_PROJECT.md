# OpenClaw Ajan Proje Dokumani

Bu dokuman, EsnafDigital icin bu VPS uzerinde calisan OpenClaw ajanina yaptirilmak istenen genis is ve fikir havuzunu anlatir.

Amac, projeyi tek bir ana ise kilitlemek degildir. EsnafDigital sadece "site yapan" bir is, sadece "QR satan" bir is, sadece "Instagram yoneten" bir is ya da sadece "CRM kuran" bir is olarak dusunulmez. Bu VPS uzerindeki OpenClaw ajani; fikirleri toparlayan, onceliklendiren, dokumana ceviren, teknik olarak uygulayan, test eden ve zamanla satilabilir hizmetlere donusturen calisma ortagi olarak konumlanir.

## 1) Ana niyet

Kurucunun niyeti sudur:

- Kucuk isletmeler icin dijitalde guven, gorunurluk, iletisim ve duzen kurmak.
- Bu isi tek bir hizmet kalemine daraltmadan, ihtiyaca gore farkli dijital cozumlere acik tutmak.
- Fikirleri sadece not olarak biriktirmemek; OpenClaw ajanina bu VPS uzerinde gercek is, prototip, dokuman, panel, akis ve teslimat hazirlatiyor olmak.
- Hizmetleri once sade, satilabilir ve elle kontrol edilebilir bicimde kurmak; sonra ise uygun olanlari otomasyon, panel, musteri alani veya ajan destegiyle genisletmek.

Kisa cumle:

**EsnafDigital, kucuk isletmelerin dijital islerini sade bicimde toparlayan; bu VPS uzerindeki OpenClaw ajaniyla fikirden uygulamaya ilerleyen esnek bir hizmet ve operasyon sistemidir.**

## 2) Tek ana ise bagli kalmama ilkesi

Bu proje asagidaki tekil kaliplardan birine hapsedilmez:

- sadece web sitesi yapma isi
- sadece Google Maps duzenleme isi
- sadece QR yorum standi isi
- sadece Instagram yonetimi isi
- sadece online menu isi
- sadece musteri paneli isi
- sadece CRM veya ozel yazilim isi
- sadece ajan / yapay zeka isi

Bunlarin her biri ayri ayri degerli olabilir; ancak EsnafDigital'in asil gucu, isletmenin ihtiyacina gore bu parcalari sade bir dijital duzen icinde birlestirebilmesidir.

## 3) OpenClaw ajanindan beklenen rol

Bu VPS uzerindeki OpenClaw ajani su rolleri ustlenir:

1. **Fikir toparlama**
   - Kurucudan gelen daginik fikirleri kayda alir.
   - Benzer fikirleri birlestirir.
   - Cekirdek, opsiyonel ek, ileri fikir ayrimini yapar.

2. **Urunlestirme destegi**
   - Fikri satilabilir hizmet maddesine cevirir.
   - Kapsam, haricler, teslim sekli ve fiyat mantigi icin taslak uretir.
   - Paketlerin sisip ajans menusu haline gelmesini engeller.

3. **Teknik uygulama**
   - Admin panel, veri modeli, sayfa, form, kart, rapor, buton, API ve yardimci scriptleri gelistirir.
   - Degisiklikleri kucuk parcalar halinde yapar.
   - Build/test/dogrulama yapmadan isi bitmis saymaz.

4. **Operasyon sistemi kurma**
   - Isletme kaydi, on degerlendirme, teklif, teslimat, bakim ve sonraki adim takibini duzenler.
   - Project OS, Businesses ve Business Detail yuzeylerini sade tutar.
   - Gereksiz ekran cogalmasini engeller.

5. **Satis ve teslimat hazirligi**
   - Sahaya gidilecek isletme icin bilgi toplar.
   - On degerlendirme ozeti, teklif taslagi, demo metni veya ziyaret hazirligi uretir.
   - Ajan tarama, Y.Z raporu, prompt uretimi ve satis destek metinlerini hazirlar.

6. **Dokuman ve hafiza yonetimi**
   - Kalici kararlari dogru dosyaya yazar.
   - Gecici not ile kalici cizgiyi karistirmaz.
   - Tekrar eden fikirleri uygun dokumana baglar.

7. **Guvenli otomasyon**
   - Dusuk riskli isleri otomatiklestirir.
   - Dis dunyaya mesaj, yayin, musteri verisi, silme, prod etkisi veya erisim degisikligi gibi riskli islerde onay ister.

## 4) Fikir havuzu

Asagidaki fikirler bu proje icinde yasayan hizmet, ek hizmet veya ileri urun adaylaridir.

### 4.1 Dijital gorunurluk kontrolu

Isletmenin Google, web, Instagram, yorum, adres, telefon ve temel guven sinyalleri kontrol edilir.

Amac:
- isletmenin dijitalde nerede zayif gorundugunu anlamak
- teklif icin gercek gerekce olusturmak
- gereksiz hizmet satmak yerine ihtiyaca uygun yolu secmek

### 4.2 Google isletme profili / Maps duzeni

Adres, telefon, calisma saatleri, kategori, fotograf ve temel profil bilgileri toparlanir.

Amac:
- isletmenin aramada daha guvenilir gorunmesi
- musteriye yol tarifi, arama ve bilgiye ulasimi kolaylastirmak

### 4.3 Temel web vitrini

Isletme icin sade, mobil uyumlu ve guven veren web vitrini kurulur.

Ilk teslim modeli:
- `isletmeadi.esnafdijital.com.tr`

Amac:
- isletmenin "internette duzgun bir yeri" olmasi
- hizmetlerini, iletisim bilgilerini ve guven sinyallerini tek yerde gostermek

### 4.4 Ozel domain

Isletme isterse kendi alan adi baglanir.

Amac:
- daha profesyonel algi
- marka sahipligi hissi

Not:
- Cekirdek paketin zorunlu parcasi degil, ek hizmettir.

### 4.5 QR ile yorum isteme akisi

Isletme icin Google yorum sayfasina giden QR kod uretilir. Bu QR fiziksel veya dijital materyalde kullanilir.

Amac:
- yorum istemeyi kolaylastirmak
- isletmenin sosyal kanitini guclendirmek

Sinir:
- yorum sayisi garanti edilmez
- yorum karsiligi tesvik veya uygunsuz yonlendirme yapilmaz

### 4.6 NFC yorum akisi

QR'a ek olarak NFC etiketi veya standi kullanilir. Musteri telefonu yaklastirarak yorum sayfasina gider.

Amac:
- yorum birakma surecini daha hizli ve modern hale getirmek
- fiziksel temas noktasinda daha guclu bir deneyim sunmak

### 4.7 Yorum materyalleri

Masaustu stand, kucuk kart, kasa yani yonlendirme, fis arkasi notu veya dijital gorsel gibi yorum isteme materyalleri hazirlanir.

Amac:
- yorum istemeyi isletmenin gunluk akisina yerlestirmek
- QR/NFC akisini gorunur hale getirmek

### 4.8 Instagram profil duzeni

Bio, profil linki, kategori, sabitlenmis icerikler, temel gorsel duzen ve profil algisi toparlanir.

Amac:
- bos veya daginik Instagram gorunumunu guven veren vitrine cevirmek
- web vitrini ve Google profiliyle tutarli bir sosyal yuz olusturmak

### 4.9 Duzenli Instagram icerik paylasimi

Haftalik veya belirli ritimde sosyal medya icerigi hazirlanir ve paylasima uygun hale getirilir.

Amac:
- profilin bos kalmamasini saglamak
- isletmenin aktif ve canli gorunmesini desteklemek

Sinir:
- tam sosyal medya ajansi modeli degildir
- reklam yonetimi varsayilan kapsam degildir

### 4.10 Kucuk sosyal medya duzenlemesi

Tam icerik yonetimi olmadan hafif profil dokunuslari yapilir.

Ornek:
- bio duzeltme
- link ekleme
- temel kapak/gorsel duzeni
- basit aciklama metinleri

### 4.11 Yandex / Apple Maps kaydi

Google disindaki harita yuzeylerinde de isletme kaydi ve temel bilgiler duzenlenir.

Amac:
- yerel bulunurlugu genisletmek
- farkli cihaz ve harita kullanan musterilere de dogru bilgi sunmak

### 4.12 Kartvizit / temel logo destegi

Ana hizmet degil, destekleyici kalemdir.

Amac:
- dijital kimlikle fiziksel temas noktalarini uyumlu hale getirmek
- isletmenin daha toparlanmis gorunmesini saglamak

### 4.13 Bakim / guncel tutma

Kurulan dijital yuzeylerin zamanla bozulmamasi icin kucuk guncellemeler yapilir.

Kapsam ornekleri:
- adres / telefon / saat duzeltme
- site metni guncelleme
- temel gorsel yenileme
- yorum ve gorunurluk akisina kisa kontrol

### 4.14 Fotograf yukleme akisi

Isletme fotograflari WhatsApp, Drive, ozel upload linki veya ileride musteri paneli ile iletir. EsnafDigital kontrol edip yayina alir.

Amac:
- gorsel guncellemeyi kolaylastirmak
- isletmeyi her seferinde teknik islerle ugrastirmamak

Ilk sade model:
- ozel yukleme linki
- operator onayi
- yayina alma ve siralama EsnafDigital tarafinda

### 4.15 Mevcut kaynaklardan icerik ice alma

Instagram, Google Drive, Google Maps veya mevcut siteden fotograf/metin/icerik alinabilir.

Amac:
- sifirdan veri toplama yukunu azaltmak
- hizli baslangic yapmak

Risk:
- telif, kalite ve yanlis gorsel kontrolu gerekir

### 4.16 Online menu

Ozellikle kafe/restoran icin dijital menu urunu.

Amac:
- menuyu telefondan kolay acmak
- fiyat ve urun guncellemelerini daha kolay yapmak
- QR/NFC standlariyla baglamak

Not:
- Simdilik cekirdekte degil, guclu gelecek urun adayidir.

### 4.17 WhatsApp / iletisim standi

QR, NFC veya kisa link ile WhatsApp, arama, yol tarifi ya da iletisim sayfasina yonlendiren fiziksel/dijital temas noktasi.

Amac:
- musterinin isletmeye ulasmasini kolaylastirmak
- telefon, WhatsApp ve yol tarifi aksiyonlarini gorunur hale getirmek

### 4.18 Dinamik QR / kisa link / yonlendirme yonetimi

QR kod ayni kalir, arkasindaki hedef daha sonra degistirilebilir.

Ornek:
- bugun Google yorum sayfasi
- yarin online menu
- sonra kampanya sayfasi
- daha sonra WhatsApp iletisim

Amac:
- basili materyali tekrar tekrar degistirmeden hedefi yonetmek
- kampanya ve mevsimsel ihtiyaclara uyum saglamak

### 4.19 Randevu / siparis / rezervasyon baglantilari

Berber ve guzellik salonu icin randevu; kafe/restoran icin siparis veya rezervasyon baglantilari kullanilabilir.

Ilk sade model:
- mevcut linklere baglama
- WhatsApp veya telefon uzerinden aksiyon alma
- ozel sistem kurmadan yonlendirme yapmak

### 4.20 Ozel musteri paneli / hesap alani

Isletmenin giris yapip bilgi, fotograf, menu veya icerik guncelleyebilecegi alan.

Amac:
- isletmenin kendi basina kucuk guncellemeler yapabilmesi
- EsnafDigital'in manuel yukunu azaltmak

Not:
- Uzun vadede guclu fikir; ilk asamada agir olabilir.

### 4.21 Self-service icerik yonetimi

Musteri panelinin pratik kullanim tarafidir. Isletme kendi fotografini, menuyu, duyuruyu veya temel bilgiyi girer.

Amac:
- musteriye bagimsiz hareket alani vermek
- ancak yayina alma veya onay kontrolunu EsnafDigital'de tutmak

### 4.22 Isletmeye ozel OpenClaw ajani

Her isletme icin kendine ozel, sohbetle calisan bir dijital asistan fikridir.

Ornek isler:
- calisma saati degisikligi talebi
- yeni fotograf yukleme talebi
- yorum cevabi taslagi
- kampanya metni
- menu guncelleme istegi
- aylik ne yapilmali ozeti

Amac:
- isletme sahibinin teknik panelle ugrasmadan dijital islerini sohbet ederek yonetebilmesi

### 4.23 Gelir / gider ekrani

Isletmeye basit finans takibi saglama fikridir.

Not:
- Simdilik cekirdekte degildir.
- Erken girerse EsnafDigital'i dijital gorunurluk hizmetinden genel isletme yazilimina kaydirabilir.

### 4.24 Stok / tahsilat / muhasebe modulleri

Daha genis isletme yazilimi alanina giren fikirlerdir.

Not:
- Bugun ertelenmelidir.
- Ancak uzun vadeli fikir havuzunda tutulabilir.

### 4.25 EsnafDigital'in kendi operasyon CRM'i

Bu musterilere satilan urun degildir. EsnafDigital'in kendi panelidir.

Amac:
- isletmeleri
- kisileri
- gorusmeleri
- on degerlendirmeleri
- teklifleri
- teslimatlari
- bakimi
- notlari
- siradaki adimlari

tek yerde yonetmek.

### 4.26 Satis destek araclari

Saha ve teklif oncesinde kullanilan yardimci araclar.

Ornek:
- demo site
- ornek ekran
- hizli on gosterim
- ajanla isletme verisi okuyup teklif hazirligi
- ziyaret hazirligi notu

Amac:
- kurucunun sahaya daha hazir gitmesi
- teklifi soyut degil, somut ornekle anlatmasi

### 4.27 Satis temsilcisi / yonlendirme modeli

Ilk asamada satis kurucu tarafinda yurur. Ileride satis temsilcileri veya is getiren kisilerle paylasimli kazanc modeli kurulabilir.

Amac:
- saha erisimini buyutmek
- operasyonu panel ve ajanla destekleyerek daha cok isletmeye ulasmak

## 5) Cekirdek, yakin ek, ileri fikir ayrimi

### Bugun cekirdek satisa yakin olanlar
- dijital gorunurluk kontrolu
- Google profil / Maps duzeni
- temel web vitrini
- QR yorum akisi
- Instagram profil duzeni
- Yandex / Apple Maps kaydi
- NFC yorum akisi
- bakim / guncel tutma
- duzenli Instagram icerik paylasimi

### Opsiyonel ve yakin ekler
- ozel domain
- ek kartvizit
- yorum materyalleri
- kucuk sosyal medya duzenlemesi
- fotograf yukleme linki
- mevcut kaynaklardan icerik alma
- WhatsApp / iletisim standi
- dinamik QR / kisa link

### Ileri urun ve fikir havuzu
- online menu
- ozel musteri paneli
- self-service icerik yonetimi
- isletmeye ozel OpenClaw ajani
- randevu / siparis / rezervasyon baglantilari
- gelir / gider ekrani
- stok / tahsilat / muhasebe modulleri
- genis ozel panel veya ileri entegrasyonlar

## 6) Ajanin calisma yontemi

Her yeni fikir icin OpenClaw ajani su sirayi izlemelidir:

1. Fikri tek cumlede netlestir.
2. Fikrin hangi grupta oldugunu sec:
   - cekirdek satis
   - opsiyonel ek
   - operasyon araci
   - ileri urun fikri
3. En kucuk gercek ciktiyi belirle:
   - dokuman
   - panel karti
   - form
   - veri modeli
   - teklif maddesi
   - demo ekran
   - script
   - rapor
4. Gereksiz buyutmeye girmeden uygula.
5. Build, test, diff, smoke test veya dosya kontroluyle dogrula.
6. Gerekirse ilgili kanonik dosyayi guncelle.
7. Sonucu durum / sonraki adim / blokaj seklinde kapat.

## 7) Onay gerektiren isler

Ajan asagidaki durumlarda kendi basina hareket etmemelidir:

- musterilere mesaj gonderme
- dis dunyada yayin yapma
- sosyal medya paylasimi yapma
- Google/Maps/Instagram gibi dis hesaplarda gercek degisiklik yapma
- veri silme veya tasima
- canli sistemde riskli degisiklik
- gizli bilgi, token, parola veya erisim degisikligi
- musteri adina ticari karar verme

Bu islerde kurucudan kisa onay alinmalidir.

## 8) Projenin korunacak dengesi

EsnafDigital genis fikirlere acik kalir; ama her fikri ayni anda ana urune cevirmeye calismaz.

Korunacak denge:
- fikirler kaybolmasin
- cekirdek teklif sismesin
- satis sahada anlatilabilir kalsin
- panel ikinci bir karisiklik kaynagi olmasin
- ajan gercek is uretsin, sadece fikir listelemesin
- her adim kucuk, dogrulanabilir ve geri alinabilir olsun

## 9) Baslangic icin pratik hedef

Bu dokumanin pratik anlami sudur:

- Kurucu yeni bir fikir soylediginde ajan bunu kaybedecek gibi davranmaz.
- Fikir cekirdege girecekse teklif omurgasina baglar.
- Cekirdege erken ise ileri fikir havuzunda tutar.
- Teknik uygulanabilir hale geldiyse panelde veya dokumanda kucuk bir prototip uretir.
- Bu VPS, sadece web uygulamasi sunucusu degil; EsnafDigital'in fikirden uygulamaya gecen ajanli calisma merkezi olarak kullanilir.

## 10) Tek cumlelik ozet

**Bu projenin hedefi, EsnafDigital'in tum dijital hizmet fikirlerini tek bir ana ise mahkum etmeden; bu VPS uzerindeki OpenClaw ajaniyla siraya koymak, uygulamak, dogrulamak ve zamanla satilabilir hizmetlere donusturmektir.**
