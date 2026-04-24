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
- `memory/2026-04-24-repo-cleanup.md` notundan baslayip `README.md`, `HEARTBEAT.md`, `MEMORY.md`, `PROJECT.md`, `ROADMAP.md`, `MEMORY_SUMMARY.md` ve yonlendirdikleri hedefleri birlikte denetlemek

## Mevcut Blokajlar
- delivery scope taslagi asset, erisim ve yayin kontrol adimlariyla guclendi ve text-first olarak korunma karari netlesti; fakat gercek asset toplama asamasinda ek satir veya operator notu ihtiyaci cikabilir
- operasyonel kayitlar henuz tam veritabanina tasinmadi
- Supabase uzerinde pilot gercek kayitlar acildi ve Project OS / Prompt Üretimi DB modunda calisiyor, fakat veri henuz pilot seviyede; anlamli operasyon gecisi icin daha gercekci kayit ve teklif baglama gerekiyor
- yeni web vitrini henuz kurulmadigi icin ana domain placeholder modunda

## Gecici Operasyon Kurali
- Site gelistirme asamasinda admin/site tarafinda atilan her committen hemen sonra deploy alinacak ve canli saglik kontrolu yapilacak.
- Bu cizgi site gelistirme asamasindan cikinca kaldirilacak.

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
