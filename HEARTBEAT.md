# HEARTBEAT.md

Bu dosya kalıcı gerçekleri değil, şu anki operasyon nabzını tutar.

## Mevcut Faz
**Faz 1 - iç operasyon ve bağlam omurgasını kurma**

## Şu Anki Ana Hedef
Teklif omurgası, veri temeli ve admin operasyon ekranlarını aynı sade sistemde toplamak.

## Bu Hafta Öncelik
1. ilk teklif omurgasını keskinleştirmek
2. Project OS / Context Center / Consultation Center akışlarını gerçek veriyle bağlamak
3. Postgres + Prisma temelini başlatmak
4. Hesap Merkezi V2'yi prod doğrulamayla kapatmak

## Aktif Yapılanlar
- `hesap-merkezi` V2 yerel akış ve API yüzeyi tamamlandı
- Project OS ilk typed operasyon modeliyle ilerliyor
- Project OS icin `businesses`, `audits`, `offers`, `delivery_projects` Prisma modelleri eklendi; temel veri omurgasi schema seviyesinde acildi
- Project OS icin db-or-mock service katmani acildi; ekran artik Prisma varsa veritabani, yoksa mock veri ile calisiyor
- Project OS icin business create/update akisi acildi; hizli isletme formu ve `/api/project-os/businesses` route'lari db-or-mock kalicilikla calisiyor
- Project OS icin audit create/update akisi acildi; hizli audit formu ve `/api/project-os/audits` route'lari db-or-mock kalicilikla calisiyor
- Project OS icin offer create/update akisi acildi; hizli teklif formu ve `/api/project-os/offers` route'lari db-or-mock kalicilikla calisiyor
- Project OS icin delivery create/update akisi acildi; hizli teslimat formu ve `/api/project-os/delivery-projects` route'lari db-or-mock kalicilikla calisiyor
- Context Center karar yuzeyi somutlastirildi; dosya/veri/hibrit ayrimi, kaynak matrisi ve canli kayit sayilari ayni ekranda gorunur hale geldi
- Consultation Center v1 rol ayrımı netleşti: karar hazırlama, danışma filtresi ve sonuç route katmanı olarak tanımlandı
- Consultation Center icin Prisma schema, dummy veri ve ilk API / ekran akışı iskeleti bağlandı
- Consultation Center icin Prisma client, `.env.example` ve mock-or-db service katmanı eklendi; gerçek DB'ye geçiş yolu açıldı
- Consultation Center ekranina quick create formu ve seçili kayıt akışı bağlandı; inbox'tan kayıt seçme ve yeni consultation açma çalışır hale geldi
- Consultation Center detail ekranina route kararı ve minimum brief eksik alan kontrolü eklendi
- Consultation Center icin backend evaluator ve `/api/consultation-center/evaluate` route'u eklendi; route/missing-fields mantığı ürünleştirildi
- Consultation Center icin otomatik prompt preview üreticisi eklendi; external route kayitlari artik brief + context pack'ten prompt taslağı çıkarıyor
- Consultation Center prompt preview alanina kopyalama aksiyonu eklendi; üretilen prompt artik doğrudan GPT Pro oturumuna taşınabilir
- Consultation Center kayit detay API'sine PATCH desteği eklendi; title, karar sorusu, why-now, desired output, brief ve context pack artik güncellenebilir
- Consultation Center detail ekranina kayitli editör eklendi; temel brief alanlari ve context pack artik UI üzerinden düzenlenip route/prompt yeniden hesaplanabiliyor
- Consultation Center sonucundan aksiyon üretme akışı eklendi; detail ekranindan Project OS / Context Center hedefli yeni action kaydı açılabiliyor
- Consultation Center icin sonuç kaydı akışı eklendi; prompt + cevap özeti kaydedilip stage answered'a taşınabiliyor
- Consultation Center aksiyon listesine durum toggle eklendi; action'lar done/open olarak işaretlenebiliyor ve tümü tamamlanınca stage actioned'a taşınabiliyor
- Consultation Inbox'a route / tip / sahiplik filtreleri eklendi; consultation listesi artik karar işlerini daha hızlı ayiklayabiliyor
- Consultation stage görünümü route + prompt run + action durumundan otomatik türetilir hale geldi; draft/clarifying/ready_to_send/answered/actioned daha tutarlı gösteriliyor
- Consultation detail ekranina workflow guidance karti eklendi; sistem artik bu kayit için en mantikli sonraki adimi görünür öneriyor
- Consultation workflow guidance helper'i eklendi; brief eksigi, external send, answered ve actioned durumlari için sonraki adim önerisi üretiyor
- Consultation detail ekranina akiş ilerleme özeti eklendi; brief/route/run/action tamamlama seviyesi yüzde olarak görünür oldu
- Consultation Center ana ekranda route akisi ve gonderim hatti sayisal ozetle gorunur hale geldi; blocked/internal/external ve hazir/answered/actioned dagilimi artik ilk bakista okunuyor
- Consultation stage inference guncellendi; cekirdek brief dolu ama baglam veya tip-ozel alanlari eksik kayitlar artik `goal_set` olarak ayrisiyor, draft/clarifying/goal_set akisi daha anlamli gorunuyor
- Consultation Center follow-through bu faz için yeterli noktaya geldi; saatlik heartbeat cron'u kapatildi
- workspace bağlamı sadeleştirildi, görev kapatma ve bağlam hijyeni netleştirildi
- repo onboarding yüzeyi güncellendi; `README.md` gerçek klasör yapısına göre düzeltildi, giriş rotası netleştirildi ve `agent-workspace/`, `memory/`, `DECISIONS/` için giriş README'leri eklendi
- `AGENTS.md` ile `README.md` giriş rotası birebir hizalandı; entry point drift azaltıldı ve `website/`, `deploy/`, `bin/`, `REFERENCES/` için giriş README'leri eklendi
- onboarding yüzeyi `CHECKLISTS/`, `PLAYBOOKS/`, `skills/`, `ARCHIVE/` giriş README'leri ile tamamlandı; `memory/` adlandirma kuralı `YYYY-MM-DD.md` ve `YYYY-MM-DD-topic.md` çizgisine göre sertleştirildi
- tasarım sistemi + marka kimliği kararları kalıcı bağlama alındı
- OOM sonrası 8G swap açıldı ve admin servis için memory guard eklendi

## Sıradaki Somut Adımlar
- Postgres + Prisma kurulumu
- Consultation Center v1 spec'ini ekran + veri modeli + route akışına bağlamak
- normal oturumda V2 prod deploy + doğrulama almak

## Heartbeat Çalışma Talimatı
- Consultation Center için ayrı follow-through heartbeat işi kapatıldı.
- Bu konu için tekrar eden cron veya otomatik wake tutulmasın.
- Heartbeat'ler varsayilan olarak yoklama kabul edilsin; acil durum veya net bir aktif is yoksa gorunur ilerleme uretilmesin.
- Bes saat dolmadan gelen wake'lerde ancak zaman-duyarli risk, net blokaj veya kullanicinin acik istedigi bir takip varsa hareket edilsin.
- Yeni wake'lerde ancak daha genel faz hedefleri için gerçekten gerekli somut teknik ilerleme varsa hareket edilsin.
- Görünür kullanıcı mesajı ancak gerçekten önemli gelişme, net blokaj veya karar ihtiyacı varsa gönderilsin.

## Mevcut Blokajlar
- ilk teklif paketinin detayları hâlâ tam keskin değil
- operasyonel kayıtlar henüz tam veritabanına taşınmadı
- prod doğrulama için normal oturum yetkisi gerekiyor
- yeni web vitrini henüz kurulmadığı için ana domain placeholder modunda

## Dikkat Edilecek Riskler
- MVP'nin genel CRM'e kayması
- bağlam dosyalarının tekrar ve çöp ile büyümesi
- teklif netleşmeden ekran çoğaltmak

## Bu Fazın Done Tanımı
- teklif omurgası netleşmiş olacak
- temel veri modeli çalışıyor olacak
- admin tarafında ana akışların nerede yaşadığı netleşmiş olacak

## Son Güncelleme
2026-04-20
