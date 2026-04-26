> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; API tool sozlesmesi, karar destek notu ve tenant siniri daraltildi.

---

# 8. Teknik Mimari

EsnafDigital 360, tek parça bir uygulama gibi değil; görevi ayrılmış katmanlar halinde kurulmalıdır.

Temel akış:

```text
İşletme sahibi
   ↓
Mesajlaşma kanalı
   ↓
Kanal adapteri / explicit routing-binding
   ↓
İlgili OpenClaw İşletme Ajanı
   ↓
Sınırlı EsnafDigital API tool'ları
   ↓
EsnafDigital App / Database / Karar Notu / Web Vitrini / QR / Katalog / Görev / Onay / Audit
```

Bu mimaride müşteri kanalı, ajan runtime'ı ve EsnafDigital uygulaması birbirine karışmadan çalışır.

## 8.1 Kanal Katmanı

Kanal katmanı, işletme sahibinin ajana ulaşma yoludur.

Örnek kanallar:

- Telegram,
- WhatsApp,
- webchat,
- e-posta,
- ileride mobil uygulama.

Kanal katmanının görevi sadece şudur:

1. mesajı almak,
2. göndereni ve bağlı işletmeyi anlamak,
3. allowlist / pairing ve binding kontrolünü uygulamak,
4. mesajı doğru OpenClaw İşletme Ajanı'na yönlendirmek,
5. ajanın cevabını aynı kanaldan geri iletmek.

Kanal katmanı iş kurallarını taşımaz. Ajan mantığı WhatsApp veya Telegram içine yazılmaz.

## 8.2 OpenClaw Runtime

OpenClaw Runtime, işletme ajanlarının çalıştığı katmandır.

Bu katmanda:

- her işletmenin ayrı OpenClaw İşletme Ajanı vardır,
- her agent'ın ayrı workspace'i vardır,
- her agent'ın ayrı agentDir'i ve session store'u vardır,
- her agent'ın ayrı hafızası, oturumu ve yetki profili vardır,
- agent mesajlaşma üzerinden bilgi ve açık karar toplar,
- eksikleri takip eder,
- departman bakışlarıyla karar destek notu üretir,
- içerik veya rapor taslağı üretir,
- gerektiğinde EsnafDigital API tool'larını çağırır,
- riskli işlerde onay ister.

OpenClaw Runtime, EsnafDigital veritabanına doğrudan erişmez.

Workspace yalnızca çalışma alanıdır; tek başına güvenlik sınırı değildir. Güvenlik; tool policy, sandbox, API tenant kontrolü, audit, onay ve kill switch ile sağlanır.

## 8.3 EsnafDigital App

EsnafDigital App, ürünün veri ve operasyon merkezidir.

Burada tutulacak ana alanlar:

- işletme kayıtları,
- İşletme Ajanı Kayıtları,
- müşteri / yetkili kişi bilgileri,
- aktif paket ve modüller,
- açık kararlar ve karar destek notları,
- web vitrini taslakları / yayın bilgileri,
- menü / katalog / hizmet listesi taslakları,
- QR ve kısa link verileri,
- fotoğraf ve medya talepleri,
- görevler,
- onay kayıtları,
- audit log,
- bakım takipleri,
- kurulum özetleri,
- admin panel.

Müşteri paneli ilk MVP'nin zorunlu parçası değildir. İlk aşamada müşteri arayüzü mesajlaşma kanalıdır.

## 8.4 EsnafDigital API ve Tool Sınırı

OpenClaw işletme ajanları veritabanına direkt bağlanmaz.

Doğru bağlantı:

```text
OpenClaw İşletme Ajanı
   ↓
Sınırlı tool/plugin
   ↓
EsnafDigital API
   ↓
Database / operasyon kayıtları
```

Bu sınır güvenlik ve kontrol için zorunludur.

İlk MVP'de agent'a açılabilecek minimum tool listesi:

| Tool | Amaç |
|---|---|
| `ed360.get_business_snapshot` | Kendi işletmesinin profil, eksik, görev ve çıktı durumunu okumak |
| `ed360.save_profile_draft` | Düşük riskli profil alanlarını taslak olarak kaydetmek |
| `ed360.save_decision_note` | Karar destek notu ve ilgili açık kararı kaydetmek |
| `ed360.upsert_service_item_draft` | Basit hizmet / ürün kalemi taslağı oluşturmak |
| `ed360.create_media_request` | Fotoğraf veya görsel ihtiyacı için talep açmak |
| `ed360.generate_web_preview` | Canlı olmayan web vitrini önizlemesi üretmek |
| `ed360.create_shortlink_draft` | QR/kısa link hedef taslağı oluşturmak |
| `ed360.create_task` | Operasyon veya müşteri işi açmak |
| `ed360.create_approval_request` | Riskli işlem için onay kaydı açmak |
| `ed360.save_setup_summary` | Kurulum özeti ve sonraki adımı kaydetmek |

İlk MVP'de doğrudan publish, QR activate, Google/Instagram/WhatsApp update, satın alma, ödeme, para transferi, sözleşme, resmi başvuru, randevu, sipariş, dış mesaj veya veri silme tool'u açılmaz.

## 8.5 API Tenant Kontrolü

API, agent'ın body içinde gönderdiği `business_id` değerini yetki kanıtı saymamalıdır.

Yetki şu zincirle çözülür:

```text
per-agent token / service identity
↓
openclaw_agent_id veya agent_record_id
↓
İşletme Ajanı Kaydı
↓
server-side business_id
↓
permission profile / tool policy
↓
field-level izin ve risk kontrolü
```

Her tool çağrısı audit log'a bağlanmalıdır. Tenant mismatch veya denylist tool denemesi P0 güvenlik olayıdır.

## 8.6 Skill, Workspace ve Tool Ayrımı

Bu sistemde üç farklı parça karıştırılmamalıdır:

- **Workspace dosyaları:** işletme agent'ının kim olduğunu, hangi işletme için çalıştığını ve hangi sınırlara sahip olduğunu anlatır.
- **Skill / davranış rehberi:** ajanın nasıl düşüneceğini, nasıl soru soracağını ve hangi akışı izleyeceğini tarif eder.
- **Tool / plugin:** ajanın EsnafDigital API üzerinde gerçek işlem yapmasını sağlar.

Ajan davranışı dosya/skill tarafında tarif edilir; gerçek sistem işlemleri ise yalnız sınırlı tool/API katmanı üzerinden yapılır.

İlk MVP'de skill yüzeyi genişletilmemeli; gerekirse yalnızca audited EsnafDigital intake davranışı kullanılmalıdır.
