# agent-workspace

Bu klasor, EsnafDigital'in ana Next.js uygulamasidir.
Admin paneli, ic operasyon ekranlari ve ilgili servis mantigi burada yasar.
Ilk fazda burada ozellikle isletme, on degerlendirme, teklif, teslimat ve bakim akislarini gorunur kilan operasyon yuzeyleri netlesir.

## Ne zaman okunur?
- kod degisikligi yapilacaksa
- ekran veya API akisi incelenecekse
- veri modeli veya servis katmani degisecekse

## Ilk bakilacak yerler
- `package.json` -> uygulama komutlari ve bagimliliklar
- `app/` -> route ve sayfa akislari
- `components/` -> arayuz parcaciklari
- `lib/` -> domain, servis ve evaluator mantigi
- `prisma/` -> veri modeli
- `deploy/` ve `bin/` -> uygulama-ozel operasyon/script alanlari

## Admin panel dosya haritasi
- `app/page.tsx` -> admin ana sayfa / Project OS
- `components/admin/AdminShell.tsx` -> admin panel genel kabugu
- `app/businesses/page.tsx` -> Businesses liste ve filtreleme yuzeyi
- `app/businesses/[slugAndId]/page.tsx` -> tek isletme detay / karar yuzeyi
- `app/discovery/page.tsx` -> Discovery intake yuzeyi
- `lib/project-os/service.ts` -> Project OS veri okuma/yazma katmani
- `lib/project-os/types.ts` -> Project OS tipleri

## Yazma kurallari
- yeni ekran veya route mantigi once ilgili mevcut akis icinde aranir
- ortak mantik `lib/` altinda tutulur, sayfa icine dagitilmaz
- veri sekli degisiyorsa `prisma/` ve kullanan servis birlikte kontrol edilir
- yazma akislarinda dogrudan veritabani ve ilgili servis katmani birlikte dusunulur

## Not
Repo kokundeki `deploy/` ve `bin/`, workspace geneli icindir.
Bu klasor altindakiler ise uygulama-ozel yardimcilardir.
