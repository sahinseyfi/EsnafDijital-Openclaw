# deploy

Bu klasor, repo kokundeki operasyon ve deploy referanslarini tutar.
Buradaki dosyalar workspace geneli icin kullanilan servis ve zamanlayici tanimlaridir.

## Ne zaman okunur?
- systemd service veya timer incelenecekse
- deploy veya otomasyon referansi lazimsa
- repo kokundeki operasyon artefaktlari gozden gecirilecekse

## Ilk bakilacak yerler
- `esnafdijital-workspace-sync.service`
- `esnafdijital-workspace-sync.timer`
- `workspace-github-sync.env.example`

## Yazma kurallari
- uygulama-ozel deploy/script mantigini once `agent-workspace/deploy/` ile karistirma
- burada sadece workspace geneli operasyon referansi tut
- gizli deger yazma, sadece ornek veya referans tut

## Not
Canli servis, port ve yol bilgisi icin kokteki `OPERATIONS.md` de birlikte kontrol edilmelidir.
