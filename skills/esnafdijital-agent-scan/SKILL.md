---
name: esnafdijital-agent-scan
description: Agent-side single-business scan for EsnafDigital. Use when the user selects `Ajan tarama`, asks to scan or enrich one business without Apify, wants website/maps/search/social signals reviewed by the agent, or needs a compact operator-facing scan summary and next action for a business record.
---

# Esnafdijital Agent Scan

Bu skill, tek isletme icin ajan tarafinda yapilan taramayi standardize eder.
Amaç ham veri yigmak degil, operatorun hemen kullanabilecegi kisa ve guvenilir sinyal cikarmaktir.

## Cekirdek akis

1. Tek isletme uzerinde calis.
2. Once mevcut kaydi oku: isim, ilce, kategori, website, maps linki, notlar.
3. Hizli sinyali dusuk maliyetle topla.
4. Gerekirse agent-browser-core ile sayfa ici gezinme yap.
5. Ciktiyi kisa operasyon ozetine donustur.
6. Belirsiz alanlari acikca `dogrulanmadi` diye isaretle.

## Tarama sirasi

### 1. Temel dogrulama
- isletme adi
- kategori / is kolu
- ilce / konum uyumu
- aktif mi kapali mi sinyali
- ayni isimli baska isletme riski var mi

### 2. Web vitrini sinyali
- resmi website var mi
- site aciliyor mu
- iletisim bilgisi net mi
- hizmet anlatimi yeterli mi
- bariz guven eksigi var mi

### 3. Harita ve arama sinyali
- Google Maps temel kalite sinyali
- markali aramada resmi yuzeyler cikiyor mu
- Yandex / Apple Maps sadece anlamliysa kontrol et
- sonuc yoksa bunu negatif veri gibi degil `gorunmedi` olarak yaz

### 4. Sosyal sinyal
- Instagram varsa aktiflik, link duzeni, temel guven izi
- hesap yoksa `yok` yaz, tahmin uretme

## Cikti formati

Her ajan tarama sonunda sonucu su bloklarla ver:
- `Durum`
- `Kisa ozet`
- `Bulgular`
- `Eksikler / riskler`
- `Onerilen sonraki adim`

Detayli alan listesi icin `references/scan-contract.md` oku.

## Karar cizgisi
- Kucuk isletme, sade MVP ve dusuk operasyon yuku cizgisini koru.
- Tam scrape console gibi davranma.
- Gereksiz ham HTML / uzun dump donme.
- Tek kayit icin operatora yarayan sinyali cikar.
- Emin olmadigin seyi kesin bilgi gibi yazma.
- Discovery ile Project OS sinirini bozma; bu skill veri toplar, operator karari yerine gecmez.

## Arac secimi
- Statik ve hafif sayfalar icin once `web_fetch` dusun.
- Etkilesim, popup, lazy content veya gezinme gerekiyorsa `agent-browser-core` kullan.
- Apify gerektiren isler bu skillin disindadir; onlar `Apify tarama` akisinda kalir.

## Sonlandirma standardi
- Kisa bir operasyon ozetini uret.
- En az bir net sonraki adim yaz.
- Supheli eslesme varsa bunu en ustte belirt.
