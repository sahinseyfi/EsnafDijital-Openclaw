# 2026-04-25 Topic - 360 gecis duzenleme kaydi

Bu dosya, EsnafDigital 360 bilgi metnine gecis sirasinda hangi dosyada neyin degistirildigini kisa ve izlenebilir tutmak icin acildi.

## Amac
- 360 bilgi metninin onaysiz nihai karar gibi uygulanmasini engellemek
- Kurucunun "onay almadan ilerleme" tercihini aktif baglama yaymak
- Degistirilen dosyalarin ne amacla degistirildigini tek yerden gormek

## Duzenleme kaydi

### `HEARTBEAT.md`
- Aktif faz, `ic operasyon ve baglam omurgasi` cizgisinden `EsnafDigital 360 MVP yonunu netlestirme` cizgisine alindi.
- Ana hedef, kokteki `esnafdigital_360_profesyonel_rewrite_v_2.md` belgesinin ilk bilgi metni olarak bolum bolum onaylanmasi seklinde guncellendi.
- Haftalik oncelik, 360 belgesini `kabul / duzelt / ertele` mantigiyla inceleme hattina cevrildi.
- Risklere, bilgi metninin tamamini onaysiz nihai karar gibi uygulama riski eklendi.

### `USER.md`
- Kurucunun calisma tercihlerine su iki kural eklendi:
  - onay almadan ilerleme; ozellikle dosya, kapsam, MVP veya yon degisikliginde once kurucu onayi al
  - bir mesajda dosya degistirildiyse, mesajin sonunda degistirilen her dosyayi listele

### `memory/2026-04-25.md`
- 360 bilgi metninin ilk bilgi metni oldugu ve her bolumun kurucu onayindan gececegi not edildi.
- Onceki `bugunku MVP` ifadesinin nihai MVP degil, o ana kadarki aktif admin/operasyon kesiti anlaminda kullanildigi aciklandi.
- Kurucunun onay ve degistirilen dosyalari listeleme tercihi gunluk hafizaya yazildi.
- Bu tercihle catisan kok dosya ifadelerinin hizalandigi not edildi.

### `AGENTS.md`
- Varsayilan calisma dongusune, dosya/kapsam/MVP/yon degisikliginde once kurucu onayi alma adimi eklendi.
- Eski `dusuk riskli teknik ilerlemelerde gereksiz durma` cizgisi daraltildi.
- Sadece okuma, inceleme ve dogrulama gibi degisiklik yapmayan adimlarda onaysiz ilerlenebilecegi netlestirildi.

### `SOUL.md`
- `once cozmeyi denersin, gercekten gerekirse sorarsin` ifadesi, onay gereken yerde once sormayi vurgulayacak sekilde degistirildi.
- `gereken isi alir ve bitirirsin` ifadesi, `onayli isi alir ve bitirirsin` seklinde hizalandi.

### `MEMORY.md`
- Korunacak calisma ilkelerine su kalici kurallar eklendi:
  - dosya, kapsam, MVP veya yon degisikliginde kurucu onayi almadan ilerleme
  - bir mesajda dosya degistirildiyse, mesajin sonunda degistirilen her dosyayi listele

### `OPENCLAW_AGENT_PROJECT.md`
- Yeni fikir calisma sirasina, dosya/kapsam/MVP/yon degisikliginde once kurucu onayi alma adimi eklendi.
- Onay gerektiren isler bolumune bu yeni onay cizgisi eklendi.
- Teknik prototip uretme ifadesi, kurucu onayi sonrasinda prototip uretme seklinde daraltildi.

### `esnafdigital_360_profesyonel_rewrite_v_2.md`
- Belgenin basina not eklendi:
  - Bu dokuman ilk bilgi metnidir.
  - Bolumler kurucu onayindan gecmeden nihai urun, MVP veya teknik uygulama karari sayilmaz.
  - Her bolum ayri ayri `kabul / duzelt / ertele` suzgecinden gecirilecektir.
- Giris cumlesi, `guncel ana urun kararlarini tanimlar` dilinden `onerilen kararları taslak olarak toplar` diline yumusatildi.
- OpenClaw uygulanabilirlik arastirmasi sonrasi kurucu onayiyla MVP duzeltmeleri belgeye islendi:
  - `Her isletmeye ozel OpenClaw ajani` ifadesi MVP icin gercek OpenClaw isletme agent'i + ayri workspace + ayri oturum/hafiza + ayri izin profili olarak karar haline getirildi.
  - OpenClaw tarafinda tek Gateway/runtime altinda coklu izole isletme agent'i calisacagi netlestirildi.
  - Kullaniciya gorunen kayit adi daha sonra `Isletme Ajani Kaydi` olarak netlendi; bu kayit gercek agent'i, workspace yolunu, sablon surumunu, izin profilini, oturumlari, kanal baglarini ve gorev durumunu izleyen EsnafDigital kaydi olarak tanimlandi.
  - Karmasayi kontrol ilkesi `iyi sablon + otomatik kurulum + siki yetki siniri` olarak yazildi.
  - WhatsApp icin `ticari hedef kanal` cizgisi korundu; ilk dogrulamanin Telegram/test kanali veya EsnafDigital pilot hatti ile yapilabilecegi netlestirildi.
  - Isletmenin kendi WhatsApp hattini ajana baglama ve randevu karsilama konusu ek kanal/modul paketi olarak tutuldu.
  - Ajanin kullanacagi ozel islemlerin skill degil `tool/plugin`, davranis rehberinin ise workspace/sablon dosyalari oldugu aciklandi.
  - Guvenlik bolumune kesin randevu ve dis hesap/odeme/fiyat gibi islemlerde onay gerektigi eklendi.

## Su anki pratik kural
Bundan sonra 360 projesine gecis su sekilde yurur:
1. Bolum okunur.
2. Kurucu ile `kabul / duzelt / ertele` karari verilir.
3. Onaylanan kisimlar ayri olarak MVP, panel veya teknik plana islenir.
4. Dosya degistirilirse mesaj sonunda degistirilen dosyalar yazilir.

## Kod / panel degisikligi
Bu kayit kapsaminda admin kodunda veya canli sistemde bilincli bir degisiklik yapilmadi.
