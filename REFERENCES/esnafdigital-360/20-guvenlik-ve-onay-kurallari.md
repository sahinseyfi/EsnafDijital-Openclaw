> Aktif 360 bolum dosyasi.
> Durum: GPT Pro degerlendirmeleriyle MVP minimum guvenlik siniri, tool allow/deny, tenant kontrolu ve kill switch cizgisi netlestirildi.

---

# 20. Güvenlik ve Onay Kuralları

Bu bölüm EsnafDigital 360'ın en kritik konularından biridir. Çünkü her işletmeye ayrı gerçek agent/workspace açmak güçlü bir modeldir; ancak güvenlik, yetki ve onay sınırları doğru kurulmazsa risk üretir.

MVP için temel karar şudur:

> Tek test işletmesi MVP'sinde tek Gateway kullanılabilir; fakat güvenlik sınırı workspace değil, kanal allowlist + explicit binding + sandbox/tool policy + EsnafDigital API tenant kontrolü + audit/onay + kill switch birleşimidir.

## 20.1 Temel Güvenlik İlkesi

Ajanın temel güvenlik ilkesi şudur:

> Ajan bilgi toplar, öneri üretir, taslak hazırlar ve görev açar. Riskli, dış dünyayı etkileyen veya kalıcı sonuç doğuran işlemler onaysız yapılmaz.

Her işletme agent'ı sadece kendi işletmesi için çalışır.

Ajan:

- başka işletme verisine erişemez,
- EsnafDigital ana workspace'ine erişemez,
- yetki profili dışında tool kullanamaz,
- dış hesaplarda onaysız işlem yapamaz,
- müşteri adına ticari taahhüt veremez,
- parola, token veya gizli erişim bilgisini isteyemez ya da workspace'e yazamaz.

## 20.2 Tek Test İşletmesi İçin Minimum Güvenli Yapı

İlk MVP'de yapı şu sınırla kurulmalıdır:

```text
Tek Gateway
+ tek gerçek işletme agent'ı
+ ayrı workspace
+ ayrı agentDir
+ ayrı session store
+ pilot kanal allowlist / pairing
+ explicit binding
+ no-tool fallback veya quarantine agent
+ sadece sınırlı EsnafDigital API tool'ları
+ API-side tenant enforcement
+ audit log
+ approval queue
+ pause / kill switch
```

Bu fazda tek Gateway kabul edilebilir. Ancak bu kabul yalnızca tek test işletmesi, düşük riskli veri, sınırlı tool yüzeyi ve sıkı operasyon kontrolü içindir.

Gateway mümkünse public internete açık olmamalı; loopback/private network üzerinden, token/password auth ile ve güvenli admin erişimiyle çalışmalıdır.

## 20.3 Ajanın Serbestçe Yapabilecekleri

Ajan düşük riskli işleri kendi yetkisi içinde yapabilir.

Örnekler:

- işletmeden bilgi istemek,
- eksik bilgileri listelemek,
- gelen bilgiyi özetlemek,
- düşük riskli profil taslağı oluşturmak,
- web vitrini için metin önerisi üretmek,
- menü / katalog / hizmet listesi taslağı oluşturmak,
- QR/NFC hedefi için öneri veya taslak sunmak,
- basit durum özeti hazırlamak,
- admin panelde görev veya medya talebi oluşturmak,
- operasyon ekibine devredilecek işi işaretlemek.

Bu işler müşteriye veya dış sisteme kalıcı etki üretmez.

## 20.4 İlk MVP Tool Allowlist

İlk MVP'de agent'a genel OpenClaw araçları değil, yalnızca dar kapsamlı EsnafDigital API tool'ları açılmalıdır.

Önerilen minimum tool listesi:

| Tool | Amaç | Etki |
|---|---|---|
| `ed360.get_business_snapshot` | Kendi işletmesinin profil, eksik, görev ve çıktı durumunu okumak | Okuma |
| `ed360.save_profile_draft` | Düşük riskli profil alanlarını taslak olarak kaydetmek | Taslak yazma |
| `ed360.upsert_service_item_draft` | Basit hizmet / ürün kalemi taslağı oluşturmak | Taslak yazma |
| `ed360.create_media_request` | Fotoğraf, logo veya görsel ihtiyacı için talep açmak | Görev |
| `ed360.generate_web_preview` | Canlı olmayan web vitrini önizlemesi üretmek | Taslak çıktı |
| `ed360.create_shortlink_draft` | QR/kısa link hedef taslağı oluşturmak | Taslak çıktı |
| `ed360.create_task` | Operasyon veya müşteri işi açmak | İç operasyon |
| `ed360.create_approval_request` | Riskli işlem için onay kaydı açmak | Onay |
| `ed360.save_setup_summary` | Kurulum özeti ve sonraki adımı kaydetmek | Taslak özet |

Bu tool'ların hiçbiri doğrudan public yayın, dış hesap değişikliği, QR hedef aktivasyonu, müşteri adına dış mesaj, ödeme, randevu, sipariş veya veri silme yapmamalıdır.

## 20.5 İlk MVP Tool Denylist

İlk MVP'de şu araçlar ve kabiliyetler kapalı olmalıdır:

- `exec`,
- `process`,
- browser / web otomasyon araçları,
- geniş filesystem `read`, `write`, `edit`, `apply_patch`,
- `cron`,
- subagent / session spawn,
- agent-to-agent veya cross-session mesajlaşma,
- Gateway / node / config araçları,
- dış email / SMS / sosyal medya gönderim araçları,
- payment / booking / calendar araçları,
- dynamic skill install / sync,
- işletme dışı veri okuyabilecek genel web fetch veya entegrasyonlar.

`deny` kuralı her zaman kazanmalıdır. Allowlist doluysa listede olmayan araçlar otomatik kapalı kabul edilmelidir.

## 20.6 EsnafDigital API Tenant Kontrolü

İşletme agent'ları EsnafDigital veritabanına doğrudan erişmemelidir.

Doğru sınır:

```text
İşletme Agent'ı
   ↓
Sınırlı tool/plugin
   ↓
EsnafDigital API
   ↓
Veritabanı / operasyon kayıtları
```

API, agent'ın gönderdiği `business_id` değerini yetki kanıtı saymamalıdır. Yetki server-side çözülmelidir:

```text
Tool call
↓
per-agent token veya service identity doğrulanır
↓
openclaw_agent_id / agent_record_id çözülür
↓
İşletme Ajanı Kaydı bulunur
↓
status ve pause kontrol edilir
↓
business_id kayıttan server-side alınır
↓
permission_profile ve tool_policy kontrol edilir
↓
field-level izin ve risk kontrolü yapılır
↓
işlem yapılır veya approval_request açılır
```

Her tool çağrısında şu kontroller zorunludur:

- token veya service identity doğrulama,
- aktif İşletme Ajanı Kaydı kontrolü,
- pause / read-only kontrolü,
- tenant scope kontrolü,
- tool allowlist kontrolü,
- alan bazlı yazma izni,
- risk seviyesi,
- idempotency,
- audit log.

Body'de gelen `business_id`, Agent Kaydı'ndan çözülen `business_id` ile uyuşmazsa işlem reddedilmeli, audit kaydı açılmalı ve agent pause adayı yapılmalıdır.

## 20.7 Onayla Yapılabilecekler

Aşağıdaki işler ancak işletme sahibi, kurucu veya operasyon onayıyla ilerlemelidir:

- web vitrini yayınlamak veya herkese açık içeriği değiştirmek,
- dinamik QR/NFC hedefini müşterilerin göreceği şekilde değiştirmek,
- Google / Maps / Instagram / WhatsApp gibi dış hesaplarda değişiklik yapmak,
- domain / DNS / yönlendirme değiştirmek,
- müşteri adına dış dünyaya mesaj göndermek,
- sosyal medya paylaşımı yapmak,
- fiyat, ödeme, indirim veya sözleşme ile ilgili karar vermek,
- kesin randevu, rezervasyon, sipariş veya taahhüt oluşturmak,
- müşteri verisini kalıcı şekilde değiştirmek veya silmek,
- canlı sistemi etkileyen teknik işlem yapmak,
- yeni kanal hesabı bağlamak,
- yeni tool yetkisi açmak.

Bu işlerde ajan yalnızca bilgi toplar, öneri sunar, taslak hazırlar veya onay görevi açar.

## 20.8 Kesin Yasaklar

Ajan hiçbir koşulda şu işleri kendi başına yapmamalıdır:

- parola, token veya gizli erişim bilgisini istemek ya da kaydetmek,
- gizli bilgiyi workspace dosyalarına yazmak,
- başka işletmenin verisini okumak veya kullanmak,
- EsnafDigital ana workspace'ine müdahale etmek,
- yetki profili dışına çıkmak,
- müşteri adına bağlayıcı ticari karar vermek,
- müşteriye kesin sonuç garantisi vermek,
- yorum, puan, arama sıralaması veya satış sonucu garanti etmek,
- onay gerektiren işlemi onaysız tamamlamak,
- Gateway/config/runtime ayarlarını değiştirmek,
- skill/plugin kurmak veya izin profilini kendi kendine genişletmek.

## 20.9 Audit ve Onay Kaydı

Her tool çağrısı ve izin kararı izlenebilir olmalıdır.

Minimum audit alanları:

- `audit_event_id`,
- `timestamp`,
- `correlation_id`,
- `business_id`,
- `agent_record_id`,
- `openclaw_agent_id`,
- `gateway_id`,
- `channel_type`,
- `binding_id`,
- `peer_hash`,
- `tool_name`,
- `operation_type`,
- `risk_level`,
- `permission_profile_id`,
- `tool_policy_version`,
- `decision`,
- `affected_resource_type`,
- `affected_resource_id`,
- `approval_id`,
- `error_code`.

Her onay kaydında en az şunlar tutulmalıdır:

- hangi işletme,
- hangi agent,
- istenen işlem,
- işlem nedeni,
- risk seviyesi,
- kimden onay beklendiği,
- onay durumu,
- zaman bilgisi,
- işlem sonucu.

Önemli kural:

> `approved` durumu agent'a otomatik canlı işlem yetkisi vermez. İlk MVP'de uygulama insan veya ayrıca güvenli executor tarafından yapılmalıdır.

## 20.10 Pause / Kill Switch

İşletme Ajanı Kaydı üzerinde agent durdurulabilir olmalıdır.

Minimum seviyeler:

1. **Agent pause:** Agent yazma tool'ları kullanamaz.
2. **Read-only mode:** Agent yalnızca bilgi verir; görev/onay bile açamayabilir.
3. **Channel unbind:** Yanlış routing riski varsa kanal bağlantısı kapatılır.
4. **Token revoke:** Per-agent API token iptal edilir.
5. **Runtime quarantine:** Workspace/session snapshot alınır ve agent runtime'dan çıkarılır.

Otomatik pause adayı durumlar:

- tenant mismatch,
- yetkisiz sender,
- denylist tool denemesi,
- onay gerektiren işlemi doğrudan yapma denemesi,
- workspace'e secret yazma denemesi,
- kısa sürede çok sayıda tool hatası,
- routing fallback'in gerçek agent'a düşmesi,
- güvenlik audit'inde kritik bulgu.

## 20.11 Workspace, agentDir ve Secret Kuralları

Workspace'e yazılabilir bilgiler:

- genel davranış talimatları,
- işletmenin public veya düşük riskli özeti,
- aktif modül listesi,
- eksik bilgi başlıkları,
- taslak metinler,
- hizmet / ürün liste taslakları,
- QR hedef önerisi.

Workspace'e kesin yazılmaması gerekenler:

- API key, token, OAuth credential,
- Google, Meta, WhatsApp, domain, DNS veya hosting erişimleri,
- veritabanı bağlantı bilgisi,
- EsnafDigital admin credential'ları,
- müşteri parolaları,
- ödeme bilgileri,
- hassas kişisel veri,
- raw transcript dump,
- başka işletmeye ait bilgi,
- signed URL'lerin uzun ömürlü halleri,
- full medya arşivi.

Her agent için ayrı workspace, ayrı agentDir ve ayrı session store zorunlu kabul edilmelidir.

## 20.12 Çoklu Müşteri İçin Risk Eşiği

Tek test işletmesi için tek Gateway kabul edilebilir. Ancak şu eşiklerde daha güçlü ayrım gerekir:

| Eşik | Karar |
|---|---|
| Tek test işletmesi, düşük riskli veri | Tek Gateway kabul edilebilir |
| İlk gerçek müşteri verisi | Ayrı OS user önerilir |
| 2-5 pilot müşteri, sadece draft API | Tek Gateway geçici olabilir; API tenant sınırı zorunlu |
| Birden fazla ödeme yapan müşteri | Ayrı Gateway stratejisi tasarlanmalı |
| Dış hesap credential'ları veya public çıktı etkisi | Ayrı Gateway + ayrı OS user önerilir |
| Browser, exec, cron veya yüksek etkili tool'lar | Ayrı Gateway + ayrı OS user + ayrı VPS ciddi şekilde düşünülmeli |
| Hassas sektör veya karşılıklı güvenmeyen tenant'lar | Tek Gateway güvenlik sınırı kabul edilmemeli |

Ana prensip:

> EsnafDigital 360'da güvenlik, sonradan eklenecek detay değil; işletme agent modelinin temel şartıdır.
