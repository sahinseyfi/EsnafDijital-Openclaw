# EsnafDigital derin arastirma toplu sentezi

Bu dosya, `REFERENCES/Derin-arastirma/` altindaki derin arastirma dosyalarini tek yerde karar verilebilir hale getirmek icin hazirlandi.

Amac, ham arastirma metinlerini dogrudan dogru kabul etmek degil; her dosyadan projeye alinacak gercek degeri, scope riskini ve kanonik yuzeye tasinacak kismi ayirmaktir.

## Kisa genel hukum
- EsnafDigital icin en guclu cizgi hala `Audit -> Teklif -> Teslimat -> Bakim`
- genel CRM'e kaymamak kritik
- urun omurgasi az sayida net paket ve dar operasyon paneli ile korunmali
- web vitrini, fotograf, QR/NFC ve tek sayfa site tarafinda sade ama guven veren uygulama mantigi guclu
- mimari ve ic panel tarafinda asiri esneklik degil, kanonik veri + dar gorev akisi mantigi dogru

---

## 1) `esnafdigital-ilk-hedef-sektorler-derin-saha-arastirmasi.md`
**Kisa hukum:** Degerli ama iddialarin bir kismi birebir tekrar edilmemeli. Segment karari dogru, sayisal iddialar filtrelenmeli.

**Projeye alinacaklar**
- ilk cekirdek segmentler dar kalmali
- berber, guzellik salonu, kafe/restoran cizgisi korunmali
- segment seciminde en buyuk pazar degil, en hizli satilan ve en kolay tekrar eden is mantigi baz alinmali

**Disarida kalacaklar**
- birebir dogrulanmayan pazar sayilari
- satista kesin veri gibi kullanilacak zayif oranlar

**Not**
- Bu konu icin zaten iki ara dosya var:
  - `esnafdigital-ilk-hedef-sektorler-dogrulanmis-kaynaklar.md`
  - `esnafdigital-ilk-hedef-sektorler-sentez.md`

---

## 2) `esnafdigital-paketleme-ve-fiyatlandirma-ozeti.md`
**Kisa hukum:** En degerli cikarim 3 kademeli paket mantigi ve capalama psikolojisi. Ama piyasadaki fiyat ornekleri birebir kopyalanacak fiyat listesi gibi kullanilmamali.

**Projeye alinacaklar**
- 3 kademeli ana teklif mantigi
- orta paketi en mantikli tercih haline getiren sade fiyat mimarisi
- temel paketin eksik hissettirilmemesi
- upsell'in eksik birakma degil, deger ekleme mantigiyla kurulmasi

**Disarida kalacaklar**
- piyasadan toplanan fiyatlari kendi fiyatimiz gibi tekrar etmek
- fazla sayida paket acmak
- temel paketi bilerek zayif birakip ust pakete zorlamak

**Kanonik tasima**
- `OFFERS.md`
- `esnafdigital-teklif-omurgasi-sentez.md`

---

## 3) `esnafdigital-crm-yonu-derin-arastirma.md`
**Kisa hukum:** En kritik stratejik dosyalardan biri. EsnafDigital'in genel CRM degil, dar operator paneli olmasi gerektigini netlestiriyor.

**Projeye alinacaklar**
- merkez yuzey `Project OS` olmali
- `Context Center` hafiza/referans katmani olarak kalmali
- `Prompt Üretimi` karar hazirligi katmani olarak kalmali
- panel, iliski gecmisi degil, sonraki operator adimini netlestirmeli

**Disarida kalacaklar**
- yatay CRM mantigi
- serbest not yigini
- genis task/project manager davranisi
- omnichannel inbox veya rapor vitrini mantigi

**Kanonik tasima**
- `PROJECT.md`
- `HEARTBEAT.md`
- `memory/2026-04-23.md` benzeri gunluk karar kayitlari

---

## 4) `esnafdigital-ana-sayfa-derin-arastirma.md`
**Kisa hukum:** Ana sayfa icin dogru yon netlik + guven + tek ana CTA. Fazla ajans dili ve kalabalik bolumler zarar verir.

**Projeye alinacaklar**
- ilk ekranda ne yaptigimiz, kime hitap ettigimiz ve ne aksiyon istedigimiz net olmali
- hero + problem + cozum akisi + kanit + CTA sirasi mantikli
- sosyal kanit ve guven unsurlari erken gorunmeli
- kisa, sonuc odakli, taranabilir metin kullanilmali

**Disarida kalacaklar**
- genel ajans jargonu
- uzun fiyat duvari
- cok sayida CTA
- uzun kurumsal hikaye

**Kanonik tasima**
- landing / site brief dosyalari
- ileride ana sayfa UI spec'i

---

## 5) `esnafdigital-tek-sayfa-yerel-isletme-sitesi-arastirmasi.md`
**Kisa hukum:** En uygulanabilir arastirmalardan biri. Urun mantigini dogrudan besliyor. Tek sayfa site, kurumsal vitrin degil hizli guven ve hizli aksiyon yuzeyi olarak ele alinmali.

**Projeye alinacaklar**
- mobil-first CTA mantigi
- telefon, WhatsApp, yol tarifi, varsa rezervasyon aksiyonlari
- gercek hizmet/menü, adres, saat, fotograf ve guven sinyalleri
- ortak bir iskelet uzerine segmente gore agirlik degisen jenerasyon sistemi
- canonical veri ile JSON-LD / gorunen icerik tutarliligi

**Disarida kalacaklar**
- stok fotografa yaslanan sahte guven
- yorum yoksa sahte yildiz blogu
- calismayan form veya calismayan CTA
- slider ve gereksiz efekt yigini

**Kanonik tasima**
- site urun spec'i
- delivery scope / tek sayfa site standardi

---

## 6) `esnafdigital-kucuk-isletme-fotograf-standardi.md`
**Kisa hukum:** Cok guclu operasyon dosyasi. Foto tarafinda estetikten once gerceklik, temizlik ve guven standardi kurulmasi gerektigini netlestiriyor.

**Projeye alinacaklar**
- dis cephe, giris, ic mekan, ekip, hizmet ve detay karelerinden olusan cekirdek set
- telefonla bile tekrar edilebilir minimum kalite standardi
- agir filtre, stock hissi ve yapayliktan kacma
- platforma uygun crop ve kullanim mantigi
- operasyonel cekim checklist'i

**Disarida kalacaklar**
- asiri stilize, gercegi bozan fotograflar
- AI/stok/kolaj hissi
- kirli, karanlik, bulanik, alakasiz kareler

**Kanonik tasima**
- delivery asset checklist'i
- saha cekim standardi

---

## 7) `esnafdigital-qr-nfc-masaustu-standlari-derin-arastirma.md`
**Kisa hukum:** Saha teslimati icin cok net yon veriyor. Varsayilan kural `tek stand = tek amac` olmali.

**Projeye alinacaklar**
- berber ve guzellikte ilk urun olarak yorum standi mantigi
- kafe/restoranda masa ustunde menu standi, kasada yorum standi ayrimi
- QR + ayni hedefe giden NFC yedekli yapisi
- A6 dikey, sade, mat, yuksek kontrastli baski mantigi
- fiil tabanli net CTA metinleri

**Disarida kalacaklar**
- tek stand uzerinde coklu karmasik aksiyon
- belirsiz CTA
- parlak / dusuk kontrast / zor taranan tasarim
- yoruma yonlendirirken tesvik veya 5 yildiz baskisi

**Kanonik tasima**
- fiziksel teslimat standardi
- review / menu stand urun karti

---

## 8) `esnafdigital-openclaw-mimari-onerisi.md`
**Kisa hukum:** YararlI ama mevcut proje fazi icin fazla buyuk dusunme riski var. En degerli tarafi izolasyon, onay ve operasyon siniri ilkeleri.

**Projeye alinacaklar**
- ajan / oturum / gorev sinirlarini net kurma ihtiyaci
- gizli bilgi ve veri siniri disiplini
- cron, arka plan gorevi ve operator onayi mantigi
- her seyin tek merkezde karismamasi gerektigi

**Disarida kalacaklar**
- su anki fazda her isletme icin tam ayrik ajan sistemi kurmaya kosmak
- mimariyi is hacminden once buyutmek
- operasyondan once orkestrasyon karmasigi kurmak

**Kanonik tasima**
- `OPERATIONS.md`
- ileride coklu ajan mimarisi karari gerekirse `DECISIONS/`

---

## 9) `esnafdigital-business-detail-v1-rewrite-spec.md`
**Kisa hukum:** Business Detail V1 icin final derin arastirma cikti bu rapordur. Net sonuc su: hafif yamayla degil, daraltilmis rewrite ile toparlanmali.

**Projeye alinacaklar**
- Business Detail tek isletme icin karar yuzeyi olmali
- `canonical / external / derived` veri ayrimi sertlesmeli
- ana gorev 30-60 saniyede sonraki mantikli adimi gostermek olmali
- Project OS ile Business Detail ayrimi korunmali
- ham alt tablolar ve agir detaylar drawer / detail katmanina itilmeli

**Disarida kalacaklar**
- tek ekranda tekrar eden durum kartlari ve veri duvari
- sessiz mock fallback veya belirsiz kontrat
- UI'nin schema ve servis kontratindan kopmasi
- tek isletme detail sayfasinin mini CRM'e donusmesi

**Kanonik tasima**
- Business Detail V1 spec'i
- Project OS / Business Detail veri kontrati

---

## 12) `esnafdigital-teklif-omurgasi-sentez.md`
**Kisa hukum:** Mevcut teklif omurgasi dogru yone bakiyor; ihtiyac yeni paket acmak degil, mevcut yapinin daha sert ve daha satilabilir hale gelmesi.

**Projeye alinacaklar**
- audit giris kapisi olarak kalmali
- 3 seviyeli ana kurulum mantigi korunmali
- Paket 0 ayri, Paket 4 ve Bakim ayri tutulmali
- segment bazli satis dili degisebilir ama paket yapisi dagilmamali

**Disarida kalacaklar**
- her segmente ayri paket ailesi acmak
- premium fikirleri erken cekirdege sokmak
- logo/kartvizit gibi yan kalemlerin ana degeri golgelemesi

---

## Son toplu yorum
Bu klasordeki arastirmalar birlikte okundugunda en net tablo su oluyor:

1. **Segment** dar kalmali.
2. **Teklif** 3 kademeli ve anlasilir olmali.
3. **Teslimat** text-first, guven-first ve kolay tekrar eden yapiyla ilerlemeli.
4. **Site** tek sayfa, mobil-first ve aksiyon odakli olmali.
5. **Fotograf ve fiziksel materyal** estetik gosteri degil guven araci olarak standardize edilmeli.
6. **Admin / operasyon paneli** genel CRM'e donusmemeli.
7. **Mimari** bugunku operasyon ihtiyacindan buyuk kurulmamali.

## En dogru sonraki kanonik tasima alani
Bu toplu sentezden sonra asil netlestirilmesi gereken kanonik yuzeyler:
- `OFFERS.md`
- Business Detail / Project OS V1 spec'i
- delivery checklist ve asset standardi
- landing / tek sayfa site urun brief'i

## Bu dosyanin rolu
Bu dosya karar kaydi degil, karar oncesi temiz referans katmanidir.
Kalin kararlar yine kanonik dosyalara tasinmalidir.
