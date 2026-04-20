# EsnafDigital Workspace

Bu repo, EsnafDigital'in tek GitHub deposu olarak tutulur.
Ama uygulama tarafi sade bir cizgide iki ana klasor etrafinda organize edilir.

## Repo mantigi
Bu repo iki farkli seyi ayni yerde tutar:
1. urun kodu
2. operasyon ve baglam dosyalari

Urun kodunda iki ana uygulama klasoru vardir.
Destekleyici markdown, karar, checklist ve operasyon dosyalari repo kokunde kalir.

## Iki ana klasor

### 1) `website/`
Ana web vitrini / tanitim sitesi icin ayrilan klasordur.
Su an hafif ve sade tutulur.
Site buyurse de public-facing vitrin burada kalir.

Ornek kullanim:
- landing page
- hizmet anlatimi
- iletisim / guven ogeleri
- kampanya veya sektor bazli vitrin sayfalari

### 2) `agent-workspace/`
Benim calistigim teknik ortam ve admin uygulama cekirdegi burada yasar.
Admin paneli, ic operasyon ekranlari ve uygulama kodu bu klasorun kendisinde toplanir.

Burada su alanlar yasar:
- Project OS
- Context Center
- Consultation Center
- Hesap Merkezi

Ornek alt alanlar:
- `app/` -> Next.js route ve sayfalar
- `components/` -> arayuz parcalari
- `lib/` -> servis, evaluator, domain mantigi
- `prisma/` -> veri modeli
- `bin/` -> deploy ve operasyon scriptleri
- `deploy/` -> servis / systemd referanslari

## Destek ve baglam klasorleri
Bunlar ana uygulama klasoru degildir. Repo'nun calisma omurgasidir.

- `CHECKLISTS/` -> kisa uygulama listeleri
- `PLAYBOOKS/` -> uctan uca akislar
- `skills/` -> gorev odakli rehberler
- `memory/` -> gunluk tarihlenmis notlar
- `DECISIONS/` -> karar kayitlari
- `REFERENCES/` -> tasarim ve diger referans kaynaklari
- `deploy/` -> repo koku operasyon notlari / yardimci deploy dosyalari
- `state/` -> gecici ama takip edilmesi gereken uretim artefaktlari

## Cekirdek dosyalar
- `PROJECT.md` -> proje tanimi ve kapsam
- `ROADMAP.md` -> orta vadeli yon ve oncelikler
- `HEARTBEAT.md` -> aktif odak, blokaj ve siradaki adimlar
- `MEMORY.md` -> kalici karar cizgisi
- `MEMORY_SUMMARY.md` -> hizli kisaltma ozeti
- `AGENTS.md` -> calisma kurallari
- `TOOLS.md` -> arac ve baglam politikasi
- `OPERATIONS.md` -> servis, port, systemd ve canli operasyon notlari

## Okuma sirasi
1. `HEARTBEAT.md`
2. `MEMORY_SUMMARY.md`
3. goreve gore ilgili dosyalar

## Kisa kural
- Tek repo korunur
- Iki ana klasor vardir: `website/` ve `agent-workspace/`
- Diger ust seviye klasorler uygulama degil, operasyon ve baglam destek alanidir
