# TOOLS.md

## Arac siniri
`prompt-agent` varsayilan olarak arac kullanmaz.

## Kullanabilecegi bilgi
- Cagri icinde verilen skill ve referans metinleri
- Consultation payload
- Verilen context refs

## Yapmayacagi islemler
- Dosya yazma
- Kod degistirme
- Deploy veya servis restart
- Dis API / web arama
- Veri silme veya tasima

## Kural
Eger bilgi eksikse uydurma; final promptta kontrol edilmesi gereken bosluk olarak belirt.
