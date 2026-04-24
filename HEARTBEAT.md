# HEARTBEAT.md

Bu dosya karar kaynagidir.
`HEARTBEAT.json` bu dosyanin eslik eden ozetidir.
Davranis degistiren guncelleme once burada yapilir.

Bu dosya sadece aktif durum panosudur.
Bitmis isler ve uzun gecmis burada tutulmaz.

## Mevcut Faz
**Faz 1 - ic operasyon ve baglam omurgasini kurma**

## Su Anki Ana Hedef
Repo genel temizlik oncesi source-of-truth cizgisini netlestirip tum dosyalari yonlendirme zinciriyle birlikte kontrollu denetleyebilecek temiz audit zeminini kurmak.

## Bu Hafta Oncelik
1. source-of-truth ve yonlendirme zinciri denetim kuralini netlestirmek
2. ilk batch olarak kokteki ana baglam dosyalarini ve yonlendirdikleri hedefleri incelemek
3. supheli / eski / silinebilir dosya adaylarini kanitli liste halinde cikarmak
4. cleanup batch'lerini build/deploy dogrulamasiyla parca parca yurutmek

## Siradaki Somut Adim
- `memory/2026-04-24-repo-cleanup.md` icindeki rename tablosuna gore `memory/` capraz referans taramasini yapip staged rename karar notunu cikarmak, sonra `AGENTS.md` ve `HEARTBEAT.md` scope temizligini son bir batch ile kapatmak

## Mevcut Blokajlar
- `memory/` altindaki 25 driftli dosya icin fiziksel rename oncesi capraz referans taramasi henuz tamamlanmadi
- standing policy olarak ayrilan yayin kurali artik `OPERATIONS.md` icine tasindi; heartbeat tarafinda cleanup odagini korumak icin bundan sonra orasi referans alinacak

## Dikkat Edilecek Riskler
- genisleme adina yatay ve daginik bir genel CRM urunune savrulmak
- teklif netlesmeden ekran cogaltmak
- baglam dosyalarinin tekrar ve cop ile buyumesi

## Bu Fazin Done Tanimi
- teklif omurgasi netlesmis olacak
- temel veri modeli calisiyor olacak
- admin tarafinda ana akislarin nerede yasadigi netlesmis olacak

## Son Guncelleme
2026-04-24
