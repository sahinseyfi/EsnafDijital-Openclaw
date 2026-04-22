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
- Repo migration zinciri DB gecmisiyle hizalandi; bir sonraki adim `202604211753_init` delta migration'ini kontrollu uygulayip `npm run prisma:bootstrap:local` dogrulamasini tekrar almak

## Mevcut Blokajlar
- ilk teklif paketinin detaylari hala tam keskin degil
- operasyonel kayitlar henuz tam veritabanina tasinmadi
- gercek `DATABASE_URL` bulundu ve repo tarafinda eksik `20260418143000_init` migration'i geri yazilarak migration gecmisi hizalandi; fakat sonraki `202604211753_init` delta migration'i mevcut eski tabloları/kolonlari donusturuyor ve kismi yikici etkisi var, bu yuzden kontrollu apply onayi olmadan bootstrap tamamlanmiyor
- prod dogrulama icin normal oturum yetkisi gerekiyor
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
