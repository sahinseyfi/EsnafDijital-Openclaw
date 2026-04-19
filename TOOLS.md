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
- **Canlı web app eski çalışma yolu:** `/opt/esnafdijital/web`
- **Arşivlenen eski web app yolu:** `/opt/esnafdijital/archive/web-20260418-182221`
- **Admin control UI kaynak yolu:** `/root/.openclaw/workspace/openclaw-control-ui`
- **Admin statik ilk sayfa kaynak yolu:** `/root/.openclaw/workspace/admin-site`
- **Web app service:** `esnafdijital-web.service` (şu an kapalı)
- **Admin app service:** `esnafdijital-admin.service`
- **Reverse proxy:** Caddy
- **Web app iç portu:** `3011`
- **Admin app iç portu:** `3012`
- **Auth helper:** `/usr/local/bin/esnafdijital-openclaw-auth`
- **Discovery helper:** `/usr/local/bin/esnafdijital-openclaw-discovery`
- **Dashboard overlay/state dosyası:** `/opt/esnafdijital/data/codex-dashboard-overlay.json`
- **Domain durumu:** `esnafdijital.com.tr` şu an bakım/placeholder 503 yanıtı veriyor
- **Admin domain durumu:** `admin.esnafdijital.com.tr` basic auth + Next.js admin app ile yayında
- **Swap dosyası:** `/swapfile` (8G, `/etc/fstab` ile kalıcı)
- **Swap ayarı:** `/etc/sysctl.d/99-esnafdijital-memory.conf` içinde `vm.swappiness=20`
- **Admin memory guard:** `/etc/systemd/system/esnafdijital-admin.service.d/override.conf`
- **Admin memory limit çizgisi:** `MemoryHigh=1500M`, `MemoryMax=2500M`, `OOMPolicy=stop`, `KillMode=mixed`

## Operasyon Komutları
- web app durum: `systemctl status esnafdijital-web.service`
- web app yeniden başlat: `systemctl restart esnafdijital-web.service`
- admin app durum: `systemctl status esnafdijital-admin.service`
- admin app yeniden başlat: `systemctl restart esnafdijital-admin.service`
- caddy durum: `systemctl status caddy`
- caddy yeniden başlat: `systemctl restart caddy`
- workspace sync servis durum: `systemctl status esnafdijital-workspace-sync.service`
- workspace sync timer durum: `systemctl status esnafdijital-workspace-sync.timer`
- workspace sync log: `journalctl -u esnafdijital-workspace-sync.service -n 100 --no-pager`

## GitHub Workspace Sync
- yalnızca `/root/.openclaw/workspace` GitHub'a senkronize edilir, tüm `/root/.openclaw` değil
- sync script yolu: `/root/.openclaw/workspace/bin/esnafdijital-workspace-sync`
- systemd dosyaları repo içinde: `/root/.openclaw/workspace/deploy/esnafdijital-workspace-sync.{service,timer}`
- canlı env dosyası: `/etc/esnafdijital/workspace-github-sync.env`
- örnek env dosyası: `/root/.openclaw/workspace/deploy/workspace-github-sync.env.example`
- ayrılmış SSH key: `/root/.ssh/esnafdijital_workspace_github`

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
