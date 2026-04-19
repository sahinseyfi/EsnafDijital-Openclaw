---
name: esnafdijital-task-execution
description: Use for implementation, fix, cleanup, setup, or workspace update tasks in EsnafDigital. Forces smallest-next-step execution, quick verification, and clear done/next/blocker output.
---

# EsnafDigital Task Execution

Bu skill, EsnafDigital workspace icinde gercek is uretmek icin kullanilir.

## Ne zaman kullan?
- bir seyi duzeltmek gerekiyorsa
- bir ekran, dosya veya akis guncellenecekse
- baglam dosyalari temizlenecekse
- bir kurulumu veya kucuk iyilestirmeyi tamamlamak gerekiyorsa

## Uygulama dongusu
1. `HEARTBEAT.md` ve `MEMORY_SUMMARY.md` ile cizgiyi al.
2. Sadece gorevle ilgili dosyalari oku.
3. Somut ciktiyi belirle.
4. En kucuk gercek degisikligi yap.
5. En hafif guvenilir yontemle dogrula.
6. Gerekliyse baglam dosyasini guncelle.
7. Sonucu `done / next / blocker` duzeniyle kapat.

## Kapatma kurali
Asagidaki dort sey yoksa gorevi tamamlandi sayma:
- degisen gercek bir artefakt
- kisa dogrulama
- gerekiyorsa kayit guncellemesi
- acik kalan risk veya sonraki adim

## Dikkat
- placeholder ilerleme cumlesini gercek is yerine kullanma
- tum workspace'i gereksiz yere iceri basma
- once `CHECKLISTS/task-completion.md` cizgisini izle
