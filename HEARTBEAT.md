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
- Kok ana dosya zincirindeki scope temizligini tamamlamak icin `HEARTBEAT.md` aktif pano rolunu fiili akisla hizalayip, sonra `MEMORY.md` icindeki promoted block'u kalici hafiza cizgisine gore ayiklayarak ancak bunun ardindan Asama A rename batch'i icin kisa onaya gecmek

## Mevcut Blokajlar
- fiziksel rename uygulamasi toplu dosya tasima sayildigi icin kisa onay gerektiriyor
- Asama B dosyalari ek memory/reference baglantilari tasidigi icin ilk rename batch'ine alinmayacak

## Dikkat Edilecek Riskler
- genisleme adina yatay ve daginik bir genel CRM urunune savrulmak
- teklif netlesmeden ekran cogaltmak
- baglam dosyalarinin tekrar ve cop ile buyumesi
- HEARTBEAT.md'nin aktif pano yerine gecmis, politika ve daginik notlarla sisip odagini kaybetmesi
- `MEMORY.md` icinde ham promotion bloklarinin kalici hafiza yerine gunluk/cop veri biriktirmesi

## Bu Fazin Done Tanimi
- teklif omurgasi netlesmis olacak
- temel veri modeli calisiyor olacak
- admin tarafinda ana akislarin nerede yasadigi netlesmis olacak

## Son Guncelleme
2026-04-24
