# PROJECT.md

## Proje Kimliği
- **Ad:** EsnafDigital
- **Tur:** kucuk isletmeler icin dijital guven, gorunurluk ve duzen kurma hizmeti
- **Faz:** ic operasyon sistemi + ilk satilabilir hizmet omurgasi

## Ana Problem
Turkiye'deki kucuk isletmelerin onemli bir kismi dijitalde ya zayif temsil ediliyor ya da guven vermeyen bir gorunumle yer aliyor. Sorun cogu zaman yalnizca "site yok" meselesi degil; daginik bilgi, dusuk guven algisi, zayif gorunurluk ve donusume hazirliksiz dijital vitrin sorunu.

## Ana Amac
Kucuk isletmelerin dijitalde daha gorunur, daha guvenilir, daha kolay ulasilabilir ve islerini adim adim dijitale tasiyabilir hale gelmesini saglayan sade, tekrar edilebilir ve buyuyebilir bir hizmet sistemi kurmak.

## Cekirdek Deger Onerisi
EsnafDigital, kucuk isletmeye agir ajans dili degil; hizli anlasilir, guven veren ve dogrudan ise yarayan dijital duzen sunar.

## Is Akisi Omurgasi
1. **Aday isletme bulma** — sahada anlamli hedefleri secmek
2. **Veri toplama** — mevcut dijital izi ve temel sinyalleri toplamak
3. **On degerlendirme** — isletmeyi okumak, ihtiyaci ve onceligi netlestirmek
4. **Ziyaret hazirligi** — gorusme oncesi somut malzemeyi hazirlamak
5. **Gorusme** — ihtiyaci, guveni ve kapsam beklentisini netlestirmek
6. **Teklif** — kapsam, teslim sekli ve ticari cerceveyi belirlemek
7. **Teslimat** — gorunen iyilestirmeyi hizlica hayata gecirmek
8. **Bakim** — canliligi ve guncelligi korumak

Bu akis satis ve operasyon omurgasidir, dogrudan satilan hizmet listesi degildir.

## Ilk Pazar Odagi
- **Bolge:** Istanbul Arnavutkoy ve cevresi
- **Not:** bu secim, kurucunun hizli temas kurabilmesi ve sahada kolay hareket edebilmesi nedeniyle yapilan ilk saha avantajidir; tek ve degismez pazar karari degildir.
- **Ilk deneme segmentleri:**
  - berber
  - guzellik salonu
  - kafe / restoran

## Hizmet Omurgasi
### Ana hizmet
- isletmenin dijitalde guven veren, duzenli ve ulasilabilir hale gelmesini saglayan kurulum ve toparlama isi

### Devam hizmeti
- Bakim / Canlilik / Kucuk Guncelleme

### Genisleme alani
- hafif panel ve ajan destekli isletme yonetimi, ana hizmet omurgasinin ustune sonra eklenebilecek genisleme katmanidir

### Satis destek araclari
- ornek site hazirligi
- ornek ekran / ornek calisma
- hizli taslak / on gosterim
- ajan destegiyle isletme verilerini okuyup satis, teklif ve konumlandirma konusunda destek almak

Bunlar ana ve kalici olarak garanti edilen hizmetler degil; gerektiginde satis surecini destekleyen araclar olarak kullanilir.

## MVP Kapsami
- harita varligi ve optimizasyonu
- tek sayfa profesyonel web vitrini
- temel guven unsurlari
- yorum yonlendirme akisi
- operasyonel kayitlarin panelde takibi
- proje ve baglam yonetimi
- istem uretimi icin baglamli ve dogrudan kullanilabilir altyapi

## MVP Disi
- bagimsiz, yatay ve herkese satilan genel amacli CRM urunlesmesi
- tum sektorleri ayni anda hedefleyen yapi
- agir AI / RAG / vector DB katmanlari
- stok / tahsilat / gelir-gider modulleri
- cok rollu karmasik yetkilendirme
- mikroservis mimarisi

## Ic Sistem Hedefi
Ic sistem tek yerde su cekirdegi birlestirmelidir:
1. **Proje / operasyon yonetimi** — isletme, on degerlendirme, teklif, teslimat ve bakim islerinde neredeyiz, sirada ne var, blokaj ne
2. **Baglam ve dokuman sistemi** — proje, karar, hafiza, araclar ve kalici referanslar
3. **Yardimci katmanlar** — istem uretimi, satis destek araclari ve uygun yerde ajan destekli akislar

## Admin Panelde Olmasi Gereken Ana Sayfalar
### Faz 1 cekirdek yuzeyler
- Dashboard / Ana Sayfa
- Project OS
- Istem Uretimi
- Hesap Merkezi

### Faz 1 icindeki operasyon alt yuzeyleri
- Isletmeler
- On Degerlendirmeler
- Teklifler
- Teslimat / Bakim

Not: Bu dort operasyon alani ilk fazda `Project OS` icinde baslayabilir, ancak ihtiyac halinde ayri detay yuzeylerine ayrilmasi acik bir yon secenegidir.

### Sonraki asama
- Isletme detay
- Aktivite / not / sonraki adim zaman cizgisi
- Gerekirse ayrik filtreli liste yuzeyleri
- Gorev ve takip yuzeyleri

## Istem Uretimi Mantigi
Istem Uretimi'nin amaci tum notlari toplamak degil; daginik istegi netlestirip dogru baglamla tek parca guclu istem uretmektir.

Bu yuzey, asagidaki baglami kullanarak calismalidir:
- proje tanimi
- aktif yol haritasi
- guncel heartbeat
- kalici hafiza
- ajan kurallari
- kullanici tercihleri
- arac ve ortam notlari

Amac, "uzun istem" uretmek degil; **dogru baglami secen, net hedef veren, dogrudan kullanilabilir guclu istem** uretmektir.

Bu yuzeyin isi istem uretiminde biter.
Cevap toplama, karar yazma veya aksiyon takibi baska yuzeylerde cozulur.

## Teknik Varsayimlar
Teknik tercih ve ortam varsayimlari icin `TOOLS.md` esas alinir.

## Is Bolumu
- **Kurucu:** satis, saha, teklif dogrulama, yon belirleme, kritik ticari kararlar
- **Ajan / sistem tarafi:** teknik kurulum, admin panel, veri modeli, operasyon akisi, baglam yonetimi, istem hazirlik sistemi, dokumantasyon ve bakim
