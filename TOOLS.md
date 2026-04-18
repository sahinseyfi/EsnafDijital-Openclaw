# TOOLS.md

Bu dosya, EsnafDigital'in teknik ortamını, servis notlarını ve araç kullanım politikasını tutar.

## Ortam
- **Ana çalışma ortamı:** VPS
- **Ana uygulama türü:** tanıtım sitesi + admin panel + iç operasyon sistemi
- **Yaklaşım:** tek repo içinde sade ve yönetilebilir yapı

## Varsayılan Yığın
- **Frontend / admin:** Next.js
- **Veritabanı:** Postgres
- **ORM:** Prisma
- **Sabit bağlam:** Markdown / YAML / JSON
- **Küçük otomasyonlar:** cron / basit jobs

## Araç Politikası
### Ne zaman veritabanı kullanılır?
Şu tür şeyler veritabanında tutulur:
- businesses
- audits
- offers
- delivery projects
- operasyonel kayıtlar
- tarihçesi olan iş nesneleri

### Ne zaman dosya tabanlı bağlam kullanılır?
Şu tür şeyler Markdown/YAML/JSON içinde tutulur:
- proje tanımı
- roadmap
- heartbeat
- memory
- checklist
- decision log
- playbook
- prompt üretimi için sabit bağlam

### Ne zaman otomasyon kurulur?
- aynı iş tekrar etmeye başladıysa
- elle takip edilmesi hata doğuruyorsa
- küçük ve anlaşılır bir otomasyon yeterliyse

## Domain ve Yayın Notları
- **Ana domain:** esnafdijital.com.tr
- **DNS sağlayıcısı:** Natro

## Mevcut Servis Notları
- **Web repo yolu:** `/root/.openclaw/workspace/EsnafDigital-Agent/web`
- **Web app service:** `esnafdijital-web.service`
- **Reverse proxy:** Caddy
- **Web app iç portu:** `3011`

## Operasyon Komutları
- web app durum: `systemctl status esnafdijital-web.service`
- web app yeniden başlat: `systemctl restart esnafdijital-web.service`
- caddy durum: `systemctl status caddy`
- caddy yeniden başlat: `systemctl restart caddy`

## Araç Seçim Prensipleri
- önce mevcut stack içinde çöz
- yeni servis eklemeden önce mevcut yapı yeterli mi kontrol et
- sırf ileride lazım olabilir diye araç ekleme
- MVP'de ağır altyapı değil, görünür sonuç önceliklidir

## Mevcut Faydalı Yardımcılar
- **Apify CLI:** işletme bulma / keşif / veri toplama tarafında tercih edilir

## Sonradan Doldurulacak Alanlar
- subdomain listesi
- port / servis eşleşmeleri
- yedekleme politikası
- cron görevleri
- erişim / bakım notları
