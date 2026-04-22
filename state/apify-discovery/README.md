# Apify Discovery MVP

## Final karar
Apify taramasini ham Google Maps verisini dogrudan ana is kayitlarina yazmak icin degil, Arnavutkoy icin segment bazli kucuk kosularla aday toplamak icin kullan.

Ilk asamada akisi su kadar sade tut:
1. segment bazli kucuk tarama yap
2. ham ciktiyi staging dosyasinda tut
3. duplicate ve zincir kayitlari ele
4. gorunurluk skoru hesapla
5. sadece shortlist ciktisi uret
6. kaliteli adaylar icin ikinci adimda Business + Audit ac

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

## Sonraki adim
Raw dosyalar olustuktan sonra tek bir scorer scripti su isi yapacak:
- maps url veya place benzeri benzersiz alanla dedupe
- zincir ve hedef disi kayitlari ele
- gorunurluk skoru hesapla
- sadece shortlist dosyasi uret
