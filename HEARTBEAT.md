# HEARTBEAT.md

Bu dosya karar kaynagidir.
`HEARTBEAT.json` bu dosyanin eslik eden ozetidir.
Davranis degistiren guncelleme once burada yapilir.

Bu dosya sadece aktif durum panosudur.
Bitmis isler ve uzun gecmis burada tutulmaz.

## Mevcut Faz
**Faz 1 - ic operasyon ve baglam omurgasini kurma**

## Su Anki Ana Hedef
Teklif omurgasi, veri temeli ve admin operasyon ekranlarini CRM yonunde genisleyebilen ayni sistemde toplamak.

## Bu Hafta Oncelik
1. ilk teklif omurgasini keskinlestirmek
2. Project OS / Context Center / Consultation Center akislarini gercek veriyle baglamak
3. gercek `DATABASE_URL` ile Postgres + Prisma hattini ayaga kaldirmak
4. Hesap Merkezi V2'yi normal oturumda prod dogrulamayla kapatmak

## Siradaki Somut Adim
- sikilastirilan `refresh-discovery` match guard'ini `3012` runtime'ina deploy edip pilot berber kaydinda `Pilot Garage` yanlis pozitifinin artik donmedigini smoke test ile dogrulamak

## Mevcut Blokajlar
- delivery scope taslagi asset, erisim ve yayin kontrol adimlariyla guclendi ve text-first olarak korunma karari netlesti; fakat gercek asset toplama asamasinda ek satir veya operator notu ihtiyaci cikabilir
- operasyonel kayitlar henuz tam veritabanina tasinmadi
- Supabase uzerinde pilot gercek kayitlar acildi ve Project OS / Consultation Center DB modunda calisiyor, fakat veri henuz pilot seviyede; anlamli operasyon gecisi icin daha gercekci kayit ve teklif baglama gerekiyor
- manuel tarama metadata deploy edildi ve `3012` deep-mode smoke test gecti; pilot berber kaydindaki `Pilot Garage` yanlis pozitifi icin workspace tarafinda match quality guard sikilastirildi, fakat `3012` runtime deploy + smoke test henuz alinmadi
- yeni web vitrini henuz kurulmadigi icin ana domain placeholder modunda

## Dikkat Edilecek Riskler
- yatay ve her yone dagilan genel CRM urunune savrulmak
- teklif netlesmeden ekran cogaltmak
- baglam dosyalarinin tekrar ve cop ile buyumesi

## Bu Fazin Done Tanimi
- teklif omurgasi netlesmis olacak
- temel veri modeli calisiyor olacak
- admin tarafinda ana akislarin nerede yasadigi netlesmis olacak

## Son Guncelleme
2026-04-23
