# EsnafDigital Workspace

Bu repo, EsnafDigital'in tek GitHub deposudur.
Ayni yerde iki sey tutulur:
1. urun kodu
2. operasyon ve baglam omurgasi

Amac su: hafizasiz bir oturum bile kisa surede yon bulsun, dogru dosyayi okusun ve gereksiz dagilmasin.

## Ilk giris rotasi
Yeni bir oturumda varsayilan okuma sirasi:
1. `README.md`
2. `HEARTBEAT.md`
3. `MEMORY_SUMMARY.md`
4. goreve gore ilgili dosya veya klasor README'si

## Guvenilir kaynak sirasi
- `HEARTBEAT.md` -> aktif durum, blokaj, siradaki adim
- `MEMORY_SUMMARY.md` -> 1 dakikalik kalici cizgi
- `PROJECT.md` -> proje tanimi ve kapsam
- `ROADMAP.md` -> orta vadeli yon
- `AGENTS.md` -> calisma kontrati
- `MEMORY.md` -> kalici kararlar ve kolay degismeyen gercekler
- `DECISIONS/` -> tekil karar kayitlari
- `memory/` -> tarihlenmis gunluk notlar ve session/incident kayitlari
- `TOOLS.md` ve `OPERATIONS.md` -> operasyon ve teknik ortam referansi

## Repo yapisi

### Uygulama klasorleri
- `website/` -> public-facing web vitrini
- `agent-workspace/` -> ana Next.js uygulamasi ve admin/ic operasyon alani

### Baglam ve operasyon klasorleri
- `CHECKLISTS/` -> kisa uygulama listeleri
- `PLAYBOOKS/` -> uctan uca is akis rehberleri
- `DECISIONS/` -> tarihli karar kayitlari
- `memory/` -> tarihlenmis gelismeler, session ve incident notlari
- `REFERENCES/` -> kaynak materyaller ve referanslar
- `skills/` -> gorev odakli workspace skill'leri
- `deploy/` -> repo kokundeki operasyon/deploy referanslari
- `bin/` -> repo kokundeki yardimci scriptler
- `ARCHIVE/` -> aktif kullanilmayan ama saklanan materyaller
- `state/` -> gecici ama takip edilmesi gereken uretim artefaktlari

## Goreve gore nereye gidilir?
- Kod veya admin ekran gorevi -> `agent-workspace/README.md`
- Web vitrini gorevi -> `website/README.md`
- Aktif durum / oncelik -> `HEARTBEAT.md`
- Proje kapsam ve yon -> `PROJECT.md`, sonra `ROADMAP.md`
- Karar gecmisi -> `DECISIONS/README.md`, sonra ilgili karar dosyasi
- Gecmis oturum veya gunluk not -> `memory/README.md`, sonra ilgili tarihli dosya
- Operasyon, servis, komut, yol -> `TOOLS.md`, `OPERATIONS.md`, sonra gerekiyorsa `deploy/README.md` veya `bin/README.md`
- Kaynak materyal veya referans arama -> `REFERENCES/README.md`
- Tekrarlayan is akisi -> ilgili `CHECKLISTS/` veya `PLAYBOOKS/`

## Bu bilgi nereye yazilir?
| Bilgi tipi | Kanonik yer | Kisa kural |
| --- | --- | --- |
| Su an ne yapiliyor? | `HEARTBEAT.md` | Sadece aktif durum ve siradaki adim |
| Kalici cizgi ve zor degisen gercekler | `MEMORY.md` | Gunluk detay yazilmaz |
| Proje tanimi ve kapsam | `PROJECT.md` | Gecici durum eklenmez |
| Orta vadeli yon | `ROADMAP.md` | Gunluk todo tutulmaz |
| Tekil kalici karar | `DECISIONS/YYYY-MM-DD-slug.md` | Her dosya bir karar |
| Gunluk not veya session/incident kaydi | `memory/` | Tarihli isim kullan |
| Operasyon ve teknik ortam | `TOOLS.md`, `OPERATIONS.md` | Canli referans burada |
| Teklif, segment, referans materyal | `OFFERS.md`, `SEGMENTS.md`, `REFERENCES/` | Karar kaydi gibi davranma |
| Eski veya superseded icerik | `ARCHIVE/` | Ilk okuma paketi degil |

## Kisa kurallar
- Ayni bilgi iki kanonik dosyada yasamasin.
- Once kokteki giris dosyalarini oku, sonra ilgili klasore dallan.
- Kisa omurlu durum ile kalici hafizayi karistirma.
- Yeni dosya acmadan once mevcut kanonik yeri kontrol et.
