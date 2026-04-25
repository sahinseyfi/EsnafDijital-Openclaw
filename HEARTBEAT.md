# HEARTBEAT.md

Bu dosya karar kaynagidir.
`HEARTBEAT.json` bu dosyanin eslik eden ozetidir.
Davranis degistiren guncelleme once burada yapilir.

Bu dosya sadece aktif durum panosudur.
Bitmis isler ve uzun gecmis burada tutulmaz.

## Mevcut Faz
**Faz 1 - ic operasyon ve baglam omurgasini kurma**

## Su Anki Ana Hedef
Admin panelde cekirdek operasyon omurgasini sade tutmak: `Home/Project OS + Businesses + Business Detail` cizgisini mevcut kod ve referanslarla hizalamak.

## Bu Hafta Oncelik
1. `Project OS` yuzeyini gunun sicak is kokpiti olarak sinirlamak
2. `Businesses` yuzeyini sahiplenilen kayitlari bulma, filtreleme ve detaya gecme yeri olarak tutmak
3. `Business Detail` yuzeyini tek kayitta canonical / external / derived karar yuzeyi yapmak
4. `Business Detail` icinde tek kayda ait `Siradaki adim` karar kartini Project OS kuyrugunu kopyalamadan gostermek
5. `Discovery` yuzeyini ana cockpit degil ikincil intake kapisi olarak konumlamak
6. ziyaret hazirligini ayri pano degil `Business Detail` icinde hafif kart/mod olarak dusunmek

## Siradaki Somut Adim
- `Business Detail` ustune tek kayit icin `Siradaki adim` karar karti eklenecek; kaynak olarak `deriveProjectOsOverview()` icindeki ilgili business queue item kullanilacak.

## Mevcut Blokajlar
- Yok

## Dikkat Edilecek Riskler
- genisleme adina yatay ve daginik bir genel CRM urunune savrulmak
- teklif netlesmeden ekran cogaltmak
- `Discovery` yuzeyinin ikinci cockpit veya ana operasyon kuyruguna donusmesi
- `Business Detail` yuzeyinin task/note/timeline/form duvari haline gelmesi
- `Siradaki adim` kartinin Project OS kuyrugunu detay sayfasina kopyalayan ikinci kokpite donusmesi
- baglam dosyalarinin tekrar ve cop ile buyumesi

## Bu Fazin Done Tanimi
- teklif omurgasi netlesmis olacak
- temel veri modeli calisiyor olacak
- admin tarafinda ana akislarin nerede yasadigi netlesmis olacak

## Son Guncelleme
2026-04-25
