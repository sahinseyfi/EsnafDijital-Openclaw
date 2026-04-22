# TOOLS.md

Bu dosya teknik ortami ve operasyon sinirini tutar.

## Calisma Ortami
- **Ana ortam:** VPS
- **Ana yuzeyler:** tanitim sitesi + admin panel + ic operasyon sistemi
- **Yaklasim:** tek repo icinde sade ve yonetilebilir yapi

## Varsayilan Yigin
- **Frontend / admin:** Next.js
- **Veritabani:** Postgres
- **ORM:** Prisma
- **Sabit baglam:** Markdown / YAML / JSON
- **Kucuk otomasyonlar:** cron / basit jobs

## Veri Siniri
### Veritabani
- businesses
- audits
- offers
- delivery_projects
- durum ve tarihcesi olan operasyonel is nesneleri

### Dosya tabanli baglam
- proje tanimi
- roadmap
- heartbeat
- memory
- decisions
- checklist
- playbook
- sabit prompt baglami

## Otomasyon Esigi
- ayni is tekrar etmeye basladiysa
- elle takip hata doguruyorsa
- kucuk ve anlasilir otomasyon yeterliyse

## Gizli Bilgi Kurali
- parola, token, raw callback linki ve benzeri hassas degerleri workspace'e yazma
- gerekiyorsa sadece yol, konum veya referans bilgisi tut
- gercek gizli degerler env dosyasi, sistem state'i veya parola yoneticisinde kalsin

## Secim Cizgisi
- once mevcut stack icinde cozum ara
- sirf ileride lazim olabilir diye yeni servis ekleme
- MVP'de agir altyapi degil, gorunur sonuc onceliklidir

## Operasyon Referansi
- servis, port, systemd, swap ve canli yayin notlari `OPERATIONS.md` icindedir
- isletme kesfi ve veri toplama tarafinda Apify CLI tercih edilir
