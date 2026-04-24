# HEARTBEAT.md

Bu dosya karar kaynagidir.
`HEARTBEAT.json` bu dosyanin eslik eden ozetidir.
Davranis degistiren guncelleme once burada yapilir.

Bu dosya sadece aktif durum panosudur.
Bitmis isler ve uzun gecmis burada tutulmaz.

## Mevcut Faz
**Faz 1 - ic operasyon ve baglam omurgasini kurma**

## Su Anki Ana Hedef
Repo genel temizlik oncesi ana referans cizgisini netlestirip tum dosyalari yonlendirme zinciriyle birlikte kontrollu denetleyebilecek temiz bir inceleme zemini kurmak.

## Bu Hafta Oncelik
1. source-of-truth ve yonlendirme zinciri denetim kuralini netlestirmek
2. MEMORY cizgisine bagli kok dosyalari ve yonlendirdikleri hedefleri hizalamak
3. supheli / eski / silinebilir dosya adaylarini kanitli liste halinde cikarmak
4. cleanup batch'lerini build/deploy dogrulamasiyla parca parca yurutmek
5. HEARTBEAT.md kullanimini daha disiplinli hale getirip aktif pano, blokaj ve siradaki adim sinirlarini sertlestirmek

## Siradaki Somut Adim
- Asama A ve Asama B rename paketleri tamamlandigi icin, aktif cleanup notu olan `2026-04-24-repo-cleanup.md` dosyasini Asama C olarak ayri tutup bu hat kapandiginda naming kararini verecek son kontrolu hazirlamak

## Mevcut Blokajlar
- aktif cleanup notu olan `2026-04-24-repo-cleanup.md` Asama C olarak ayrildigi icin bu hatta henuz dahil edilmeyecek

## Dikkat Edilecek Riskler
- genisleme adina yatay ve daginik bir genel CRM urunune savrulmak
- teklif netlesmeden ekran cogaltmak
- baglam dosyalarinin tekrar ve cop ile buyumesi
- HEARTBEAT.md'nin aktif pano yerine gecmis, politika ve daginik notlarla sisip odagini kaybetmesi
- Asama C aktif notunu erken rename edip ayni gun baglantilarinda yeni drift uretmek

## Bu Fazin Done Tanimi
- teklif omurgasi netlesmis olacak
- temel veri modeli calisiyor olacak
- admin tarafinda ana akislarin nerede yasadigi netlesmis olacak

## Son Guncelleme
2026-04-24
