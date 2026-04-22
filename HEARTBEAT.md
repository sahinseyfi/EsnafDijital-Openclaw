# HEARTBEAT.md

Bu dosya karar kaynagidir.
`HEARTBEAT.json` bu dosyanin eslik eden ozetidir.
Davranis degistiren guncelleme once burada yapilir.

Bu dosya sadece aktif durum panosudur.
Bitmis isler ve uzun gecmis burada tutulmaz.

## Mevcut Faz
**Faz 1 - ic operasyon ve baglam omurgasini kurma**

## Su Anki Ana Hedef
Teklif omurgasi, veri temeli ve admin operasyon ekranlarini ayni sade sistemde toplamak.

## Bu Hafta Oncelik
1. ilk teklif omurgasini keskinlestirmek
2. Project OS / Context Center / Consultation Center akislarini gercek veriyle baglamak
3. gercek `DATABASE_URL` ile Postgres + Prisma hattini ayaga kaldirmak
4. Hesap Merkezi V2'yi normal oturumda prod dogrulamayla kapatmak

## Siradaki Somut Adim
- opsiyonel ekler ve domain tercihinin baglandigi teklif kayitlarini 2-3 pilot isletmede deneyip delivery scope sablonunu gercek veriyle netlestirmek

## Mevcut Blokajlar
- ilk teklif paketinin detaylari hala tam keskin degil, ozellikle opsiyonel eklerin hangilerinin varsayilan paket icinde kalacagi tam kapanmadi
- operasyonel kayitlar henuz tam veritabanina tasinmadi
- Supabase uzerinde pilot gercek kayitlar acildi ve Project OS / Consultation Center DB modunda calisiyor, fakat veri henuz pilot seviyede; anlamli operasyon gecisi icin daha gercekci kayit ve teklif baglama gerekiyor
- yeni web vitrini henuz kurulmadigi icin ana domain placeholder modunda

## Dikkat Edilecek Riskler
- MVP'nin genel CRM'e kaymasi
- teklif netlesmeden ekran cogaltmak
- baglam dosyalarinin tekrar ve cop ile buyumesi

## Bu Fazin Done Tanimi
- teklif omurgasi netlesmis olacak
- temel veri modeli calisiyor olacak
- admin tarafinda ana akislarin nerede yasadigi netlesmis olacak

## Son Guncelleme
2026-04-22
