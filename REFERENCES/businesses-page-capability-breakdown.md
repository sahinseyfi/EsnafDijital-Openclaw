# Businesses Sayfasi Yetenek Kirilimi

Bu dokuman business detail sayfasinda gorunmesi istenen basliklari varsayimsiz sekilde acmak icin yazildi.
Burada iki sey ayrilir:
- neyi gostermek istiyoruz
- bunu gosterebilmek icin hangi veri ve is akisi gerekir

Kural:
Bir baslik ancak veri kaynagi, operator aksiyonu ve cikisi netse ekrana tasinmalidir.

## 1. Audit / Mevcut Durum

### 1.1 Google Maps durumu kontrolu
**Sayfada ne gosterilecek**
- Google Business Profile var mi
- sahiplenilmis mi
- ad / telefon / adres / kategori bilgisi dolu mu
- yorum sayisi ve puan
- website linki var mi
- calisma saatleri var mi

**Tam olarak ne yapacagiz**
- mevcut Google Maps kaydinin temel alanlarini business detail icinde ozetle gosterecegiz
- kritik eksikleri "eksik / var / kontrol edilmeli" dilinde isaretleyecegiz
- business kaydindan ilgili Google kaydina cikis linki verecegiz

**Bunun icin gereken veri**
- maps profile url veya place reference
- sahiplik durumu
- ad, telefon, adres, kategori
- yorum sayisi ve puan
- website url
- calisma saatleri

**Henuz net olmayanlar**
- veri discovery snapshot'tan mi okunacak, canli tekrar mi cekilecek
- sahiplik durumu ne kadar guvenilir kaynaktan gelecek

### 1.2 Temel bilgi tutarliligi kontrolu
**Sayfada ne gosterilecek**
- isletme adi ayni mi
- telefon ayni mi
- adres ayni mi
- kategori tutarli mi
- website / Instagram linkleri ayni isletmeye mi ait gorunuyor

**Tam olarak ne yapacagiz**
- secili kaynaklar arasinda temel alanlari yan yana karsilastiracagiz
- fark varsa "tutarsizlik" olarak gosterecegiz
- operatorun duzeltmesi gereken alanlari kisa liste halinde cikaracagiz

**Bunun icin gereken veri**
- business ic kaydi
- Google Maps verisi
- website ust bilgi / footer bilgisi
- Instagram profil adi / bio linki

**Henuz net olmayanlar**
- kanonik dogru kaynak business kaydi mi olacak, operator override'i mi olacak

### 1.3 Yorum / puan gorunumu
**Sayfada ne gosterilecek**
- toplam yorum
- puan
- son yorum tarihi varsa ozet
- yorum akisi zayif / orta / iyi sinyali

**Tam olarak ne yapacagiz**
- yorum ve puani okunur sekilde gosterecegiz
- yorum hacmini tek satirlik audit sinyaline cevirecegiz
- teklif yonlendirmesinde bu sinyali kullanacagiz

**Bunun icin gereken veri**
- rating
- reviewsCount
- mumkunse son yorum tarihi veya son yorum ornekleri

**Henuz net olmayanlar**
- sadece toplam puan/yorum mu tutulacak, yorum icerigi de okunacak mi

### 1.4 Website var mi / guven veriyor mu
**Sayfada ne gosterilecek**
- website var / yok
- calisiyor / kirik
- temel guven unsurlari var / yok
- mobilde kabul edilebilir / zayif gibi operator yorumu

**Tam olarak ne yapacagiz**
- website'nin varligini ve temel calisirlik durumunu gosterecegiz
- guven kontrolu icin kisa checklist kullanacagiz
- sonucta "iyilestirilmeli" ise audit eksigine baglayacagiz

**Bunun icin gereken veri**
- website url
- sayfa aciliyor mu
- temel bolumler: hero, iletisim, harita / adres, CTA, gorsel duzen

**Henuz net olmayanlar**
- bu degerlendirme manuel audit notu mu olacak, otomatik evaluator mu olacak
- guven skoru sayisal mi, sadece kisa ozet mi olacak

### 1.5 Instagram var mi / bos mu
**Sayfada ne gosterilecek**
- profil var / yok
- gonderi var / yok
- son paylasim tarihi varsa ozet
- profil temel olarak dolu mu

**Tam olarak ne yapacagiz**
- Instagram profilinin varligini gosterecegiz
- profilin "kurulu ama bos", "aktif", "zayif" gibi hafif statulerini verecegiz
- paket yonlendirmesinde bu sinyali kullanacagiz

**Bunun icin gereken veri**
- Instagram profil linki
- profil bio / link durumu
- gonderi sayisi veya son paylasim sinyali

**Henuz net olmayanlar**
- bu veri elle mi girilecek, scrape ile mi gelecek

### 1.6 Temel eksiklerin kisa ozeti
**Sayfada ne gosterilecek**
- 3 ila 7 maddelik eksik listesi

**Tam olarak ne yapacagiz**
- yukaridaki audit basliklarindan uretilen eksikleri tek blokta toplayacagiz
- her eksigi kisa ve operator dilinde yazacagiz
- bu blok teklif kararini besleyecek

**Bunun icin gereken veri**
- audit sonucunda cikan eksik maddeler

**Henuz net olmayanlar**
- eksikler manuel mi yazilacak, evaluator mu cikaracak

### 1.7 Kisa audit puani veya ozet
**Sayfada ne gosterilecek**
- sayisal puan veya kisa seviye ozeti

**Tam olarak ne yapacagiz**
- audit sonucunu tek bakista okunur hale getirecegiz
- ama ana islev eksik listesi olacak, puan tek basina karar vermeyecek

**Bunun icin gereken veri**
- scorecard ya da ozet mantigi

**Henuz net olmayanlar**
- puan sistemi kesinlesmedi mi
- puan mi, seviye etiketi mi daha dogru olacak

## 2. Paket / Teklif Yonu

### 2.1 Uygun paket yonu
**Sayfada ne gosterilecek**
- onerilen paket
- neden bu paket
- hangi eksigi kapatiyor

**Tam olarak ne yapacagiz**
- audit ciktilarini paket omurgasina baglayacagiz
- "Paket 1 yeterli / Paket 2 daha dogru / Paket 3 gerekli" gibi yon verecegiz
- gereksiz yuksek paket onerisi yapmayacagiz

**Bunun icin gereken veri**
- audit eksik listesi
- mevcut urun paket tanimlari
- gerekiyorsa operator notu

**Henuz net olmayanlar**
- bu yonlendirme kural bazli mi olacak, operator secimi mi olacak

### 2.2 Teklif gerekcesi
**Sayfada ne gosterilecek**
- bu paket neden secildi
- gorunur sonuc ne olacak

**Tam olarak ne yapacagiz**
- her paket yonunu audit bulgularina bagli 2-4 maddelik gerekceye indirecegiz
- boylece teklif sadece fiyat degil, mantik olarak da okunacak

**Bunun icin gereken veri**
- audit bulgusu -> paket kapsami esleme kurali

## 3. Demo / Onizleme

### 3.1 Ornek website taslagi / onizleme gosterimi
**Sayfada ne gosterilecek**
- secili business icin hazirlanan demo taslak linki veya gorsel onizleme

**Tam olarak ne yapacagiz**
- business detail icinden demo sayfaya gecis verecegiz
- demo varsa yayinda, yoksa henuz uretilmedi durumunu gosterecegiz

**Bunun icin gereken veri**
- demo url
- demo durumu: yok / hazirlaniyor / hazir

**Henuz net olmayanlar**
- demo statik template mi olacak, isletmeye ozel uretilmis mi olacak

### 3.2 Tek yonlu demo website onizlemesi
**Sayfada ne gosterilecek**
- sadece izlenen, panelden duzenlenmeyen demo onizleme

**Tam olarak ne yapacagiz**
- demo yuzeyini duzenleme araci yapmayacagiz
- business detail icinde sadece goruntuleme ve acma aksiyonu olacak

**Bunun icin gereken veri**
- demo page url veya preview asset

### 3.3 `isletmeadi.esnafdijital.com.tr` web sayfasi
**Sayfada ne gosterilecek**
- subdomain yayinda mi
- demo mu canli mi

**Tam olarak ne yapacagiz**
- business'e bagli subdomain linkini gosterecegiz
- durumunu "yok / demo / canli" olarak isaretleyecegiz

**Bunun icin gereken veri**
- subdomain url
- yayin durumu

## 4. Temel Teslimler

### 4.1 Logo tasarimi
**Sayfada ne gosterilecek**
- logo var / yok
- son versiyon dosyasi veya thumbnail
- onay durumu

**Tam olarak ne yapacagiz**
- business detail icinde logo tesliminin durumunu takip edecegiz
- tasarim dosyasina veya son ciktiya baglanti verecegiz

**Bunun icin gereken veri**
- logo asset reference
- durum: bekliyor / taslak / onaylandi / teslim edildi

### 4.2 Kartvizit tasarimi
**Sayfada ne gosterilecek**
- kartvizit var / yok
- onizleme
- baski hazir durumu

**Tam olarak ne yapacagiz**
- kartvizit tesliminin durumunu ayri gosterecegiz
- gerekiyorsa birincil / ek varyasyon ayrimini tutacagiz

**Bunun icin gereken veri**
- kartvizit asset reference
- durum

### 4.3 Website kurulumu
**Sayfada ne gosterilecek**
- website kurulumu basladi mi
- taslak / yayinda / bakimda durumu

**Tam olarak ne yapacagiz**
- mevcut delivery kaydi ile bu teslimi baglayacagiz
- kurulumu business detail icinde gorunur hale getirecegiz

**Bunun icin gereken veri**
- delivery kaydi
- website linki
- yayin durumu

## 5. Harita Dagitimi

### 5.1 Yandex kaydi
**Sayfada ne gosterilecek**
- var / yok
- acildi / bekliyor / canli

**Tam olarak ne yapacagiz**
- Yandex Business kaydinin operasyon durumunu business detail'da gosterecegiz
- bu isi audit bulgusundan delivery maddesine baglayacagiz

**Bunun icin gereken veri**
- Yandex profil linki veya status kaydi

### 5.2 Apple Maps kaydi
**Sayfada ne gosterilecek**
- var / yok
- acildi / bekliyor / canli

**Tam olarak ne yapacagiz**
- Apple Business Connect / Apple Maps varligini ve durumunu gosterecegiz
- eksikse teslim maddesi olarak isaretleyecegiz

**Bunun icin gereken veri**
- Apple profil linki veya status kaydi

### 5.3 Google Maps duzenleme / tamamlama
**Sayfada ne gosterilecek**
- duzenleme gerekli mi
- hangi alanlar eksik
- tamamlandi mi

**Tam olarak ne yapacagiz**
- auditte bulunan Google eksiklerini delivery maddelerine cevirecegiz
- is tamamlaninca business detail'da kapanmis gosterilecegiz

**Bunun icin gereken veri**
- Google eksik listesi
- durum takibi

## 6. Yorum Akisi

### 6.1 QR yorum isteme akisi
**Sayfada ne gosterilecek**
- kuruldu / kurulmadi
- QR asset'i var / yok
- kullanim notu varsa ozet

**Tam olarak ne yapacagiz**
- QR yorum akisini business detail'da bagli teslim maddesi olarak gosterecegiz
- varsa ilgili asset veya landing'e baglanti verecegiz

**Bunun icin gereken veri**
- QR asset reference
- kurulum durumu

### 6.2 NFC yorum isteme akisi
**Sayfada ne gosterilecek**
- kuruldu / kurulmadi
- NFC materyali hazir mi

**Tam olarak ne yapacagiz**
- NFC yorum akisinin durumunu ayri gosterecegiz
- Paket 3 veya ilgili ek kapsamla bagini netlestirecegiz

**Bunun icin gereken veri**
- NFC materyal kaydi
- kurulum durumu

## 7. Sosyal Profil

### 7.1 Instagram kurulumu / profil duzeni
**Sayfada ne gosterilecek**
- profil acildi mi
- bio / link / avatar duzgun mu
- temel gorsel duzen yapildi mi

**Tam olarak ne yapacagiz**
- Instagram profil kurulumunu teslim maddesi olarak gosterecegiz
- sadece varligini degil, temel duzen yapilip yapilmadigini de isaretleyecegiz

**Bunun icin gereken veri**
- profil linki
- profil durum checklist'i

## 8. Domain / Yayin

### 8.1 Ozel domain baglama
**Sayfada ne gosterilecek**
- domain isteniyor mu
- domain adi ne
- baglandi mi
- DNS bekliyor mu

**Tam olarak ne yapacagiz**
- ozel domain baglama isini website tesliminden ayri ama bagli bir operasyon maddesi olarak gosterecegiz
- domain surecini bekliyor / islemde / tamamlandi olarak takip edecegiz

**Bunun icin gereken veri**
- domain tercihi
- custom domain degeri
- DNS / baglama durumu

## Bu kirilimi ekrana nasil tasiyacagiz?
Bu basliklar ayni anda tek sayfada ham liste gibi durmamalidir.
Daha dogru ekran sirasi su:

1. Audit Snapshot
2. Paket Yonlendirmesi
3. Demo / Onizleme
4. Teslimler
5. Kanal Genisletmeleri
6. Yorum Akisi
7. Sosyal Profil
8. Domain / Yayin

## V1 icin hemen acilabilecekler
Mevcut veri omurgasina en yakin olanlar:
- kisa audit ozeti
- eksik listesi
- uygun paket yonu
- son teklif karti
- subdomain / website durumu
- ozel domain durumu

## Veri modeli veya yeni kaynak gerektirenler
Dogrudan mevcut omurgadan cikmayanlar:
- Google Maps detay durum karti
- bilgi tutarliligi karsilastirmasi
- Instagram bos mu sinyali
- Yandex kaydi durumu
- Apple Maps kaydi durumu
- QR yorum akisi asset durumu
- NFC yorum akisi asset durumu
- logo ve kartvizit asset takibi

## Sonraki en mantikli tasarim calismasi
Bu kirilimdan sonra karar verilmesi gereken sey:
- bu 8 grubun hangisi ustte kart, hangisi accordion, hangisi alt tab olacak
