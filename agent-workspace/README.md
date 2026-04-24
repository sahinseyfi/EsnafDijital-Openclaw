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

## Yazma kurallari
- yeni ekran veya route mantigi once ilgili mevcut akis icinde aranir
- ortak mantik `lib/` altinda tutulur, sayfa icine dagitilmaz
- veri sekli degisiyorsa `prisma/` ve kullanan servis birlikte kontrol edilir
- yazma akislarinda dogrudan veritabani ve ilgili servis katmani birlikte dusunulur

## Not
Repo kokundeki `deploy/` ve `bin/`, workspace geneli icindir.
Bu klasor altindakiler ise uygulama-ozel yardimcilardir.
