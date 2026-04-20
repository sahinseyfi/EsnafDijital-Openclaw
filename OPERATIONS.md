# OPERATIONS.md

Bu dosya, EsnafDigital'in servis, port, systemd ve canli operasyon referanslarini tutar.

## Domain ve Yayin Notlari
- **Ana domain:** esnafdijital.com.tr
- **Admin domain:** admin.esnafdijital.com.tr
- **DNS saglayicisi:** Natro

## Mevcut Servis Referanslari
- **Canli web app eski calisma yolu:** `/opt/esnafdijital/web`
- **Arsivlenen eski web app yolu:** `/opt/esnafdijital/archive/web-20260418-182221`
- **Ajan calisma ortami kaynak yolu:** `/root/.openclaw/workspace/agent-workspace`
- **Web sitesi kaynak yolu:** `/root/.openclaw/workspace/website`
- **Web app service:** `esnafdijital-web.service` (su an kapali)
- **Admin app service:** `esnafdijital-admin.service`
- **Reverse proxy:** Caddy
- **Web app ic portu:** `3011`
- **Admin app ic portu:** `3012`
- **Auth helper:** `/usr/local/bin/esnafdijital-openclaw-auth`
- **Discovery helper:** `/usr/local/bin/esnafdijital-openclaw-discovery`
- **Dashboard overlay/state dosyasi:** `/opt/esnafdijital/data/codex-dashboard-overlay.json`
- **Admin domain durumu:** `admin.esnafdijital.com.tr` basic auth + Next.js admin app ile yayinda

## Operasyon Komutlari
- web app durum: `systemctl status esnafdijital-web.service`
- web app yeniden baslat: `systemctl restart esnafdijital-web.service`
- admin app durum: `systemctl status esnafdijital-admin.service`
- admin app yeniden baslat: `systemctl restart esnafdijital-admin.service`
- caddy durum: `systemctl status caddy`
- caddy yeniden baslat: `systemctl restart caddy`
- workspace sync servis durum: `systemctl status esnafdijital-workspace-sync.service`
- workspace sync timer durum: `systemctl status esnafdijital-workspace-sync.timer`
- workspace sync log: `journalctl -u esnafdijital-workspace-sync.service -n 100 --no-pager`

## GitHub Workspace Sync
- yalnizca `/root/.openclaw/workspace` GitHub'a senkronize edilir, tum `/root/.openclaw` degil
- sync script yolu: `/root/.openclaw/workspace/bin/esnafdijital-workspace-sync`
- systemd dosyalari repo icinde: `/root/.openclaw/workspace/deploy/esnafdijital-workspace-sync.{service,timer}`
- canli env dosyasi: `/etc/esnafdijital/workspace-github-sync.env`
- ornek env dosyasi: `/root/.openclaw/workspace/deploy/workspace-github-sync.env.example`
- ayrilmis SSH key: `/root/.ssh/esnafdijital_workspace_github`

## Bellek Koruma Notlari
- **Swap dosyasi:** `/swapfile` (8G, `/etc/fstab` ile kalici)
- **Swap ayari:** `/etc/sysctl.d/99-esnafdijital-memory.conf` icinde `vm.swappiness=20`
- **Admin memory guard:** `/etc/systemd/system/esnafdijital-admin.service.d/override.conf`
- **Admin memory limit cizgisi:** `MemoryHigh=1500M`, `MemoryMax=2500M`, `OOMPolicy=stop`, `KillMode=mixed`
