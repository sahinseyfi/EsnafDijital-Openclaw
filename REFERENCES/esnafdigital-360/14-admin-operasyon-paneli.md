> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; 3 ana ekran, state machine ve panel sinirlari netlestirildi.

---

# 14. Admin / Operasyon Paneli

EsnafDigital paneli, müşteriye satılan panel değildir. Bu panel, EsnafDigital ekibinin işletmeleri, işletme ajanlarını, görevleri, eksikleri, onayları, audit olaylarını ve teslimat sürecini kontrol ettiği iç operasyon yüzeyidir.

Müşteri için ana arayüz mesajlaşma kanalıdır. Admin panelin görevi, müşteriyle sohbet etmek değil; işletme ajanlarının ve operasyon işlerinin doğru ilerleyip ilerlemediğini izlemektir.

## 14.1 Panelin Ana Görevi

Panel şu sorulara hızlı cevap vermelidir:

- Bugün hangi işe dokunmak gerekiyor?
- Hangi işletmenin ajanı kuruldu?
- Hangi işletmede eksik bilgi var?
- Hangi iş müşteriden cevap bekliyor?
- Hangi iş operasyon müdahalesi bekliyor?
- Hangi işler onay bekliyor?
- Hangi işletmenin web vitrini, hizmet listesi veya QR/kısa link durumu açık?
- Hangi agent sağlıklı, paused veya error durumda?
- Sıradaki adım nedir?

Panel bir ekran koleksiyonu değil, operasyon karar yüzeyidir.

## 14.2 Minimum Ana Ekranlar

İlk admin omurgası üç ana ekranla sade kalmalıdır:

1. **Project OS / Bugünün İşi**
2. **Businesses**
3. **Business Detail**

Görev, onay, audit ve çıktı detayları ayrı ana ekranlara bölünmemeli; Business Detail içinde blok, Project OS içinde sıcak iş kuyruğu, gerektiğinde drawer/modal olarak kalmalıdır.

### Project OS / Bugünün İşi

Günün sıcak işlerini gösterir.

Burada şunlar görünür:

- onay bekleyen işler,
- eksik bilgi bekleyen işletmeler,
- agent hata / pause / health uyarıları,
- yeni kurulan agent/workspace durumları,
- teslimat riski olan çıktılar,
- bugün dokunulacak görevler,
- riskli deneme veya reddedilen işlem sinyalleri.

Project OS ikinci bir CRM'e dönüşmemelidir. Sadece sıcak iş kokpiti olmalıdır.

### Businesses

İşletmeleri bulma, filtreleme ve detaya geçme yüzeyidir.

Burada şunlar olmalıdır:

- işletme listesi,
- agent status,
- setup phase,
- kanal tipi,
- eksik bilgi sayısı,
- açık görev sayısı,
- bekleyen onay sayısı,
- web vitrini durumu,
- hizmet listesi durumu,
- shortlink / QR durumu,
- son aktivite,
- health sinyali.

### Business Detail

Tek işletme için ana karar yüzeyidir.

Burada şunlar toplanır:

- üst durum barı,
- işletme dijital profili özeti,
- İşletme Ajanı Kaydı kartı,
- kurulum checklist'i,
- ilk dijital çıktılar,
- eksik bilgiler,
- görevler,
- bekleyen onaylar,
- medya / fotoğraf talepleri,
- son audit olayları,
- kurulum özeti ve sıradaki adım.

Business Detail, form ve not duvarına dönüşmemelidir. Tek işletme için karar vermeyi kolaylaştırmalıdır.

## 14.3 İşletme Ajanı Kaydı Kartı

İşletme Ajanı Kaydı, gerçek OpenClaw işletme ajanının paneldeki takip kaydıdır.

Panelde en az şunları göstermelidir:

- `agent_record_id`,
- `openclaw_agent_id`,
- `gateway_id`,
- workspace ref,
- agentDir ref,
- session store ref,
- agent şablon sürümü,
- workspace şablon sürümü,
- yetki profili,
- tool policy sürümü,
- sandbox profili,
- skills profili,
- kanal tipi,
- binding id,
- yetkili peer hash/ref,
- son mesaj,
- son tool çağrısı,
- agent sağlığı,
- son hata,
- açık eksikler,
- açık görevler,
- onay bekleyen işlemler,
- pause / resume durumu.

Bu kayıt agent'ın kendisi değildir; agent'ın EsnafDigital tarafındaki yönetim ve izleme kaydıdır. Secret, token, raw transcript veya workspace dosya içeriği burada gösterilmemelidir.

## 14.4 Görev, Eksik, Onay ve Audit Ayrımı

Bu dört kavram karıştırılmamalıdır:

| Kavram | Cevapladığı soru |
|---|---|
| Eksik | Hangi bilgi yok? |
| Görev | Kim ne yapacak? |
| Onay | Hangi riskli işlem karar bekliyor? |
| Audit | Hangi tool/izin kararı oldu? |

Varsayılan görünüm kısa liste olmalı; detay gerektiğinde drawer/modal açılmalıdır.

## 14.5 İlk Dijital Çıktılar Bloğu

Business Detail içinde tek blok olarak görünmelidir:

```text
İlk Dijital Çıktılar
├─ Web Vitrini
├─ Hizmet / Ürün Listesi
└─ Dinamik Kısa Link / QR
```

Her kartta en az şunlar görünür:

- status,
- eksikler,
- son üretim zamanı,
- preview/ref,
- gerekiyorsa approval bağlantısı.

Ayrımlar net olmalıdır:

- web taslağı hazır ≠ yayında,
- shortlink hedef taslağı ≠ aktif hedef,
- hizmet listesi taslağı ≠ public katalog,
- fotoğraf eksik ≠ taslak üretilemez,
- approval bekliyor ≠ hata.

## 14.6 Minimum State Machine'ler

İlk MVP için şu state machine'ler ayrı tutulmalıdır:

- `agent_status`,
- `setup_phase`,
- `task_status`,
- `approval_status`,
- `web_vitrine_status`,
- `service_list_status`,
- `shortlink_status`.

Bunlar tek bir genel durum alanında birleşmemelidir.

Örnek:

```text
Agent status: active
Setup phase: outputs_draft_ready
Web status: draft_ready
Shortlink status: approval_required
Approval status: requested
Task status: waiting_customer
```

Bu örnek, agent'ın çalıştığını, kurulumun ilk dijital çıktılara geldiğini, web taslağının hazır olduğunu, QR hedefinin canlıya alınmak için onay beklediğini ve müşteriden fotoğraf bekleyen görev olduğunu anlatır.

## 14.7 Panel Aksiyonları

İlk MVP'de panel aksiyonları az ama güçlü olmalıdır:

- işletme detayına git,
- görev oluştur/güncelle/tamamla,
- approval approve/reject/needs_info,
- agent pause/resume,
- channel binding devre dışı bırak,
- web preview görüntüle,
- hizmet listesi taslağını incele,
- shortlink/QR hedef taslağını incele,
- audit olayını görüntüle,
- kurulum özeti görüntüle/kaydet,
- agent record archive.

Permission profile değiştirme, token revoke veya teknik security review gibi aksiyonlar yalnız yetkili admin/kurucu rolünde olmalıdır.

## 14.8 Panelde Olmaması Gereken Şey

İlk aşamada panel şunlara dönüşmemelidir:

- müşteriye satılan genel CRM,
- müşteri self-service paneli,
- her modül için ayrı büyük ekran,
- not / timeline / task duvarı,
- ikinci mesajlaşma uygulaması,
- tam satış pipeline,
- canlı publish ve QR hedefini onaysız değiştirme aracı,
- dış hesap yönetim paneli,
- ödeme/randevu/sipariş yönetimi,
- workspace dosya editörü,
- serbest tool permission editörü,
- ağır analytics dashboard.

Ana prensip:

> Admin panel, EsnafDigital ekibinin işletme ajanlarını ve dijital operasyon işlerini sade şekilde kontrol ettiği iç operasyon merkezidir.
