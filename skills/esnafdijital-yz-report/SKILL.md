---
name: esnafdijital-yz-report
description: Generate a compact operator-facing Y.Z report for one EsnafDigital business. Use when the user asks to create, draft, refine, or standardize the `Y.Z raporu` on a business detail page, when agent scan and Apify scan outputs must be turned into a short report, or when a business needs a ready summary with findings, weak points, and recommended next action.
---

# Esnafdijital Y.Z Report

Bu skill, tek isletme icin tarama verilerini operatora hazir kisa bir Y.Z raporuna donusturur.
Amaç veri dump'i degil, karar almayi hizlandiran okunur bir rapor cikarmaktir.

## Girdi sirasi

Raporu uretmeden once mumkunse su kaynaklari bu sirayla oku:
1. isletme temel kaydi
2. en guncel ajan tarama sonucu
3. en guncel Apify tarama sonucu
4. varsa inceleme ozeti veya ic not

Eksik veri varsa raporu yine uret, ama eksik alanlari acikca belirt.

## Cikti formati

Raporu su bolumlerle kur:
- `Genel durum`
- `Guclu sinyaller`
- `Zayif sinyaller`
- `Dijital gorunum ozeti`
- `Oncelikli aksiyon`

Detayli alan kontrati icin `references/report-contract.md` oku.

## Yazim cizgisi
- Turkce yaz
- kisa yaz
- operator diliyle yaz
- net gozlem ile yorumu karistirma
- supheli eslesmeyi en basta belirt
- eksik veri varsa gizleme

## Karar cizgisi
- Kucuk isletme, sade MVP ve dusuk operasyon yuku cizgisini koru.
- Rapor satis metni gibi parlamasin.
- Ham tarama ciktilarini kopyalama.
- Gercekten is goren 3-6 maddeyi sec.
- Ayni seyi farkli basliklarla tekrar etme.

## Birleştirme kurali
- Ajan tarama ile Apify tarama celisiyorsa, kesin dil kullanma.
- Website yok ama Maps gucluyse bunu dengeli yaz.
- Maps kaydi supheliyse raporun ana durumu `supheli` olmali.
- Tarama yoksa raporu bos sloganla doldurma; `veri yetersiz` cizgisinde kal.

## Sonlandirma standardi
- Tek bakista okunacak kadar kisa tut.
- En sonda tek bir `Oncelikli aksiyon` ver.
- Gerekirse sonraki adimi `once eslesme dogrulansin` gibi sert ve sade yaz.
