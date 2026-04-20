# memory

Bu klasor, tarihlenmis calisma gecmisini tutar.
Kalici hafiza burada degil, repo kokundeki `MEMORY.md` dosyasindadir.

## Ne zaman okunur?
- bugun veya dun ne oldugunu gormek icin
- belirli bir session, hata veya incident gecmisine bakmak icin
- eski bir degisikligin tarihli izini bulmak icin

## Okuma sirasi
1. ilgili gunun genel notu varsa `YYYY-MM-DD.md`
2. sonra gerekiyorsa konu-ozel dosya `YYYY-MM-DD-topic.md`

## Yazma kurallari
- gunluk genel ozet -> `YYYY-MM-DD.md`
- konu, hata, incident veya session ozel kayit -> `YYYY-MM-DD-topic.md`
- ayni gun icin birden fazla genel gunluk dosyasi acma
- kalici ilke, proje omurgasi veya karar cizgisi buraya yazilmaz

## Adlandirma kurali
- gunluk ozet: `YYYY-MM-DD.md`
- konu/incident/session: `YYYY-MM-DD-kisa-konu.md`

## Not
Bu klasor ilk giris paketi degildir.
Ilk once `HEARTBEAT.md` ve `MEMORY_SUMMARY.md` okunur, sonra gerekirse buraya gelinir.
