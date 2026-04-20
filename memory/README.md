# memory

Bu klasor, tarihlenmis calisma gecmisini tutar.
Kalici hafiza burada degil, repo kokundeki `MEMORY.md` dosyasindadir.

## Ne zaman okunur?
- bugun veya dun ne oldugunu gormek icin
- belirli bir session, hata veya incident gecmisine bakmak icin
- eski bir degisikligin tarihli izini bulmak icin

## Okuma sirasi
1. ilgili gunun genel notu varsa `YYYY-MM-DD.md`
2. sonra gerekiyorsa ilgili `topic`, `incident` veya `consultation` dosyasina git
3. ayni gun icin daginik genel not arama, once mevcut gun dosyasini kontrol et

## Yazma kurallari
- gunluk genel ozet -> `YYYY-MM-DD.md`
- ayni gun icin tekrar genel not acma, mevcut `YYYY-MM-DD.md` dosyasina ekle
- tekil konu notlari -> `YYYY-MM-DD-topic-slug.md`
- hata, kirilma veya prod issue -> `YYYY-MM-DD-incident-slug.md`
- dis analiz, danisma veya repo degerlendirmesi -> `YYYY-MM-DD-consultation-slug.md`
- kalici ilke, proje omurgasi veya karar cizgisi buraya yazilmaz

## Adlandirma kurali
- daily: `YYYY-MM-DD.md`
- topic: `YYYY-MM-DD-topic-slug.md`
- incident: `YYYY-MM-DD-incident-slug.md`
- consultation: `YYYY-MM-DD-consultation-slug.md`
- slug kisa ve kebab-case olur
- ayni gun icin tek daily dosyasi olur
- `topic`, `incident` ve `consultation` dosyalari ayni gun icinde coklanabilir
- hata, kirilma veya prod issue ise `incident`
- dis analiz, danisma veya repo degerlendirmesi ise `consultation`
- geri kalan tekil konu notlari `topic` olarak acilir

## Not
Bu klasor ilk giris paketi degildir.
Ilk once `HEARTBEAT.md` ve `MEMORY_SUMMARY.md` okunur, sonra gerekirse buraya gelinir.
