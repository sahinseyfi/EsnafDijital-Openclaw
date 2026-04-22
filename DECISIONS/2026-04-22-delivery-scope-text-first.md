# Delivery Scope Text-First Karari

## Baglam
Project OS icinde delivery kickoff acarken tekliften otomatik scope taslagi uretiliyor.
Son iki pilotta bu taslak `Gerekli assetler`, `Gerekli erisimler`, `Kickoff sonrasi operasyon adimlari` ve `Yayin oncesi kontrol` basliklariyla genisletildi.
Soru suydu: bu checklist tek `scope` metni icinde mi kalmali, yoksa simdiden ayri operator alanlarina mi bolunmeli?

## Karar
MVP asamasinda delivery kickoff checklist'i tek `scope` metni icinde kalacak.
Ancak bu metin serbest duz yazı degil, yarı-yapili baslikli bir operasyon notu olarak korunacak.

## Neden
- Iki farkli pilotta ayni yapiyla yeterli operasyon netligi verdi.
- Ayri alanlara bolmek bu asamada Project OS'u gereksiz form duvarina ve mini workflow engine'ine yaklastirir.
- Mevcut ihtiyac operatorun kickoff aninda ne toplaması gerektigini gormesidir, ayri veri modeli kurmak degil.
- Tek metin alani, paketler arasi farkli teslim detaylarini esnek tutuyor.

## Ne zaman yeniden acilir?
Asagidaki kosullardan biri gorulurse ayri alanlara gecis tekrar degerlendirilir:
- asset, erisim veya yayin kontrol satirlari ayri ayri takip edilmek zorunda kalirsa
- ayni checklist maddeleri icin owner, durum veya son tarih tutulmasi gerekirse
- operatorler serbest metin icinde kritik maddeleri kacirmaya baslarsa

## Etki
- Delivery kickoff formu sade kalir.
- Scope taslagi baslikli checklist mantigiyla uretilmeye devam eder.
- Sonraki iyilestirme, alanlari bolmek degil; ayni metni gercek asset/veriyle doldurup saha yeterliligini test etmektir.

## Ilgili Dosyalar
- `agent-workspace/lib/project-os/offer-packages.ts`
- `agent-workspace/components/project-os/DeliveryProjectCreateForm.tsx`
- `HEARTBEAT.md`
- `memory/2026-04-22.md`
