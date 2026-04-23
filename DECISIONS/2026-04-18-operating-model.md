# 2026-04-18 - Operating Model

## Karar
EsnafDigital'in iç sistemi MVP aşamasında üç çekirdek amaca göre kurulacak:
1. proje yönetimi
2. bağlam / doküman merkezi
3. GPT Pro consultation hazırlığı

## Gerekçe
- İç operasyon görünürlüğü olmadan araç çoğalması dağınıklık üretir.
- Teklif netliği olmadan geniş panel kurmak erken optimizasyondur.
- Tüm bağlamı her göreve yüklemek kaliteyi düşürür.

## Uygulama Etkisi
- Dashboard, Businesses, Offers, Delivery, Project OS, Context Center, Prompt Üretimi ekranları önceliklendirilecek.
- Postgres + Prisma operasyonel kayıtların ana deposu olacak.
- Sabit bağlam markdown/yaml/json dosyalarında tutulacak.

## Ertelenenler
- genel CRM özellikleri
- ağır AI / RAG katmanları
- çok rollü kompleks yetkilendirme
