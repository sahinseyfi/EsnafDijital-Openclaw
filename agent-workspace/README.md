# agent-workspace

Bu klasor, EsnafDigital'in ana Next.js uygulamasidir.
Admin paneli, ic operasyon ekranlari ve ilgili servis mantigi burada yasar.

## Ne zaman okunur?
- kod degisikligi yapilacaksa
- ekran veya API akisi incelenecekse
- veri modeli veya mock/db servis katmani degisecekse

## Ilk bakilacak yerler
- `package.json` -> uygulama komutlari ve bagimliliklar
- `app/` -> route ve sayfa akislari
- `components/` -> arayuz parcaciklari
- `lib/` -> domain, servis ve evaluator mantigi
- `prisma/` -> veri modeli
- `.data/` -> mock modda kalici veriler
- `deploy/` ve `bin/` -> uygulama-ozel operasyon/script alanlari

## Yazma kurallari
- yeni ekran veya route mantigi once ilgili mevcut akis icinde aranir
- ortak mantik `lib/` altinda tutulur, sayfa icine dagitilmaz
- veri sekli degisiyorsa `prisma/` ve kullanan servis birlikte kontrol edilir
- mock kalicilik gerekiyorsa `.data/` tarafi da dusunulur

## Not
Repo kokundeki `deploy/` ve `bin/`, workspace geneli icindir.
Bu klasor altindakiler ise uygulama-ozel yardimcilardir.
