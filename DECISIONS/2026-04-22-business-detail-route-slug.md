# Business Detail Route Slug Karari

## Baglam
Business detail sayfasi icin discovery detail benzeri okunur bir route isteniyor.
Ham external kimlikler veya anlamsiz id gorunumleri kullaniciya guvensiz ve daginik his veriyor.
Ayni anda route'un stabil kalmasi, isim degisse bile kaydin acilabilmesi ve Turkce karakterlerin URL'de sorun cikarmamasi gerekiyor.

## Karar
Business detail route'u okunur slug + kisa stabil id birlikte tasiyacak.
Kanonik format:
- `/businesses/<slug>--<businessId>`

Ornek:
- `/businesses/xenia-beauty-guzellik-salonu-34555--cma8k2p9`

`slug` su alanlardan uretilir:
- isletme adi
- isletme turu / segment etiketi
- posta kodu varsa posta kodu

## Turkce karakter donusum kurali
Slug uretilirken metin kucuk harfe indirilir ve Turkce karakterler ASCII karsiligina cevrilir:
- `ç -> c`
- `ğ -> g`
- `ı -> i`
- `ö -> o`
- `ş -> s`
- `ü -> u`

Ek kurallar:
- bosluk ve ayiricilar `-` olur
- birden fazla `-` tek `-`e iner
- basta/sonda `-` kalmaz
- URL icin uygun olmayan diger karakterler atilir

## Neden
- Kullanici route'a baktiginda hangi isletmede oldugunu anlar.
- Salt isim veya posta kodu tek basina guvenli ayirici degildir.
- `businessId` route'u stabil ve kesin yapar.
- Isim degisse bile eski slug'dan dogru kayda gidip kanonik route'a yonlendirme yapmak mumkun kalir.
- Discovery tarafindaki external `placeId` mantigi business detail tarafina tasinmamis olur.

## Etki
- Business detail yuzeyi discovery detayindan farkli olarak insan-okunur URL kullanir.
- Business route cozumleme mantigi `businessId` uzerinden yapilir, slug daha cok gorunur kimlik gorevi gorur.
- Sonraki uygulama adiminda ortak `slugifyTr()` yardimcisi yazilmasi gerekir.
- Turkce karakter normalize etme kurali kod ve test seviyesinde sabitlenmelidir.

## Ilgili Dosyalar
- `agent-workspace/app/discovery/[placeId]/page.tsx`
- `agent-workspace/app/project-os/page.tsx`
- `PROJECT.md`
- `ROADMAP.md`
- `memory/2026-04-22.md`
