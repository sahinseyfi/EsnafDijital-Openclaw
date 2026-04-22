# Apify Discovery MVP

## Final karar
Apify taramasini ham Google Maps verisini dogrudan ana is kayitlarina yazmak icin degil, Arnavutkoy icin segment bazli kucuk kosularla aday toplamak icin kullan.

Ilk asamada akisi su kadar sade tut:
1. segment bazli kucuk tarama yap
2. ham ciktiyi staging dosyasinda tut
3. duplicate kayitlari search coverage bilgisini koruyarak birlestir
4. zincir kayitlari ele
5. gorunurluk skoru hesapla
6. sadece shortlist ciktisi uret
7. kaliteli adaylar icin ikinci adimda Business + Audit ac

Bu sayede:
- ana sistemi ham scrape deposuna cevirmeyiz
- CRM'e kayma riskini dusururuz
- once 20-30 nitelikli aday bulup teklif akisinin gercekten isleyip islemedigini goruruz

## Ilk kapsam
Ilk turu sunlarla baslat:
- berber
- guzellik salonu

Kafe ve restoran tarafi daha gurultulu oldugu icin ikinci tura birak.

Bolge:
- Arnavutkoy, Istanbul, Turkiye

## Ilk komut
Asagidaki komut ilk berber kosusu icin yeterli MVP komutudur:

```bash
mkdir -p state/apify-discovery/raw
apify call compass/crawler-google-places \
  --input-file state/apify-discovery/berber-arnavutkoy.input.json \
  --output-dataset \
  --silent \
  > state/apify-discovery/raw/berber-arnavutkoy.raw.json
```

Ayni kalibi sadece input dosyasini degistirerek diger segmentler icin de kullan.

## Search coverage notu
Ayni isletme farkli arama terimlerinde farkli sekilde gorunebilir.

Ornek:
- `beauty salon` ile cikiyor
- `bayan kuaforu` ile cikmiyor

Bu satis ve konumlama acisindan degerli bir sinyaldir. Isletmenin Google tarafinda hangi dil ve kategoriyle yakalandigini gosterir.

Bu yuzden dedupe sirasinda su bilgi korunacak:
- hangi arama terimlerinde gorundu
- hangi arama gruplarinda/segmentlerinde gorundu
- kac farkli arama teriminde gorundu
- ilk hangi arama terimiyle yakalandi

## Summary komutu
Raw veriyi koruyup ozet tablo uretmek icin:

```bash
./bin/apify-discovery-summary
```

Bu komut su dosyalari uretir:
- `state/apify-discovery/summary/candidates-summary.json`
- `state/apify-discovery/summary/candidates-summary.csv`

## Sonraki adim
Summary komutu su isi yapar:
- maps url veya place benzeri benzersiz alanla dedupe
- dedupe sirasinda `matchedSearchTerms` ve `matchedSegments` bilgisini kaybetmeden birlestir
- `missingSearchTerms` ve `missingSegments` alanlarini hesapla
- gorunurluk skorunu hesapla
- summary tabloyu JSON ve CSV olarak yazar

Bir sonraki adimda istersek zincir eleme ve sadece shortlist cikisi icin ikinci script ekleriz.
