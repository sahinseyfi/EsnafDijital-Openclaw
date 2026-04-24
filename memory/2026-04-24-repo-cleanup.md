# 2026-04-24 - Repo cleanup kickoff

## Amaç
Repo genel temizligine girmeden once source-of-truth cizgisini ve yonlendirme zinciri denetim kuralini netlestirip, tum dosyalari kontrollu batch'lerle inceleyebilecek temiz bir audit zemini kurmak.

## Bu calismada ne yapilacak?
1. Kanonik konteynerleri kabul et, ama iceriklerini otomatik temiz sayma.
2. Her ana dosyayi, yonlendirdigi dosyalarla birlikte zincir halinde denetle.
3. Her dosya icin su testleri uygula:
   - rol uyumu
   - guncellik
   - tekrar
   - drift
   - yogunluk
4. Supheli / eski / silinebilir adaylari ayri listele.
5. Silme kararini dogrudan verme, once aday listesi ve referans kontrolu cikar.

## Kanonik konteynerler
- `README.md`
- `HEARTBEAT.md`
- `MEMORY.md`
- `PROJECT.md`
- `ROADMAP.md`
- `DECISIONS/`
- `memory/`
- `state/`

Not: Konteynerin dogru olmasi, icerigin temiz ve guncel oldugu anlamina gelmez.

## Ilk batch
1. `README.md`
2. `HEARTBEAT.md`
3. `MEMORY.md`
4. `PROJECT.md`
5. `ROADMAP.md`
6. `MEMORY_SUMMARY.md`

Bu batch'te sadece dosya ici degil, isaret edilen hedefler de okunacak.

## Beklenen cikti formati
Her dosya icin su alanlar cikarilacak:
- rol
- yonlendirdigi hedefler
- ic sorunlar
- hedeflerle uyum sorunu
- tasinacak / duzeltilecek / silme adayi notu

## Acik notlar
- `MEMORY_SUMMARY.md` su an supheli dosya olarak ele alinacak.
- `state/` gecici calisma alani; kalici karar kaynagi degil.
- Cleanup sirasinda yeni buyuk feature acilmamasi tercih edilecek.
