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

## Gizli Bilgi Politikası
- parola, token, raw callback linki, raw account id ve benzeri hassas değerler workspace'e yazılmaz
- gerekiyorsa sadece yol, konum veya referans bilgisi tutulur
- gerçek gizli değerler env dosyası, sistem state'i veya parola yöneticisinde kalır

## Operasyon Referansı
- servis, port, systemd, swap ve canli yayin notlari `OPERATIONS.md` icinde tutulur

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
