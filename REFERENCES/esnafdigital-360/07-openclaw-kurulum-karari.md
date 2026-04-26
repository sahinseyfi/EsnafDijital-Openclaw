> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; tek Gateway siniri, agentDir/session ve ayrisma esikleri eklendi.

---

# 7. OpenClaw Kurulum Kararı

OpenClaw, EsnafDigital uygulamasının içine gömülmez. Ayrı bir agent runtime katmanı olarak çalışır.

Bu ayrımın amacı şudur:

- EsnafDigital uygulaması işletme verisini, paneli, web vitrini, QR, katalog, görev, onay ve audit kayıtlarını yönetir.
- OpenClaw runtime işletme ajanlarını, konuşmaları, kanal bağlantılarını ve tool çalıştırma sınırlarını yönetir.
- İki taraf birbiriyle doğrudan veritabanı paylaşarak değil, kontrollü EsnafDigital API ve sınırlı tool/plugin'lar üzerinden konuşur.

## 7.1 MVP Kurulum Modeli

İlk MVP'de ayrı fiziksel sunucu şart değildir. Başlangıçta aynı VPS üzerinde iki ayrı katman bulunabilir:

```text
VPS
│
├─ esnafdigital-app
│  ├─ admin panel
│  ├─ EsnafDigital API
│  ├─ database / storage
│  ├─ web vitrini preview / yayın katmanı
│  ├─ kısa link / QR kayıtları
│  ├─ görev / onay / audit kayıtları
│  └─ işletme kayıtları
│
└─ openclaw-runtime
   ├─ OpenClaw Gateway
   ├─ işletme ajanları
   ├─ işletme agent workspace'leri
   ├─ agentDir / session store ayrımı
   ├─ kanal adapterleri
   └─ tool / sandbox / yetki profilleri
```

Buradaki kritik karar Docker olup olmaması değildir. Kritik karar, OpenClaw'ın EsnafDigital app içine karışmaması ve ayrı runtime mantığıyla yönetilmesidir.

## 7.2 İşletme Başına Agent, Workspace, agentDir ve Session

MVP doğrulama kararı şudur:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir, ayrı session store ve İşletme Ajanı Kaydı oluşturulur.

İlk teknik doğrulamada tek Gateway kullanılabilir. Bu, her işletme için ayrı VPS veya ayrı Gateway kurulacağı anlamına gelmez. Ancak tek Gateway hostile multi-tenant güvenlik sınırı gibi görülmemelidir.

Her işletme için tutulacak temel parçalar:

- gerçek OpenClaw İşletme Ajanı,
- ayrı workspace,
- ayrı agentDir,
- ayrı session store,
- ayrı izin/yetki profili,
- EsnafDigital panelinde İşletme Ajanı Kaydı,
- işletme dijital profili,
- aktif modüller,
- eksik bilgiler,
- açık görevler,
- onay ve audit kayıtları.

Örnek mantık:

```text
openclaw-runtime
│
├─ gateway
├─ agent_isletme_001
│  ├─ workspace
│  ├─ agentDir
│  ├─ sessions
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
│  └─ yetki-profili
│
├─ agent_isletme_002
│  ├─ workspace
│  ├─ agentDir
│  ├─ sessions
│  └─ yetki-profili
│
└─ agent_isletme_003
   ├─ workspace
   ├─ agentDir
   ├─ sessions
   └─ yetki-profili
```

Sektör isimleriyle agent adı vermek zorunlu değildir. İlk aşamada standart, sade ve çakışmayan agentId üretimi tercih edilir.

## 7.3 Karmaşayı Kontrol Etme İlkesi

İşletme başına gerçek agent/workspace kararı güçlüdür, ama manuel yönetilirse hızla karmaşıklaşır.

Bu yüzden temel ilke:

> İyi başlangıç şablonu + otomatik kurulum + sıkı yetki sınırı.

Bunun pratik karşılığı:

- agent elle tek tek kurulmaz, şablondan üretilir,
- workspace dosyaları standart başlar,
- agentDir ve session store tekrar kullanılmaz,
- İşletme Ajanı Kaydı agent'ın nerede olduğunu ve hangi durumda olduğunu izler,
- tool yetkileri varsayılan olarak sınırlı gelir,
- riskli işlemler onaysız çalışmaz,
- agent başka işletme workspace'lerine veya EsnafDigital ana workspace'ine erişemez,
- EsnafDigital API tenant kontrolü server-side yapılır,
- şablon sürümü takip edilir; ileride güncelleme gerektiğinde hangi agent'ın hangi şablondan geldiği bilinir.

## 7.4 MVP Güvenlik Sınırı

Ayrı workspace tek başına güvenlik sınırı değildir. MVP güvenlik sınırı şu birleşimle kurulur:

- kanal allowlist / pairing,
- explicit binding,
- sandbox/tool policy,
- EsnafDigital API tenant kontrolü,
- audit log,
- approval queue,
- pause / kill switch.

Tek test işletmesi için bu yapı yeterli kabul edilebilir. P0 güvenlik hatası oluşursa yeni pilota geçilmez.

## 7.5 Ne Zaman Ayrı OS User / Gateway / VPS'e Taşınmalı?

İlk doğrulamada aynı VPS üzerinde ayrı runtime katmanı yeterli olabilir.

Ayrı OS user, ayrı Gateway veya ayrı VPS şu durumlarda gündeme alınmalıdır:

- gerçek müşteri verisi başlamışsa,
- birden fazla ödeme yapan müşteri aynı runtime'a girecekse,
- dış hesap credential'ları saklanacaksa,
- QR hedefi, web yayını veya sosyal paylaşım gibi public etki artarsa,
- browser, exec, cron veya yüksek etkili tool'lar istenirse,
- WhatsApp veya başka kanal bağlantıları kritik hale gelirse,
- medya ve dosya trafiği yükselirse,
- agent runtime kaynak kullanımı EsnafDigital uygulamasını etkilemeye başlarsa,
- güvenlik izolasyonu daha önemli hale gelirse.

Üretime geçişte hedef yapı:

```text
VPS 1 — EsnafDigital App
- admin panel
- API
- database
- web vitrini
- public website

VPS 2 — OpenClaw Runtime
- OpenClaw Gateway
- işletme ajanları
- agent workspace'leri
- kanal adapterleri
- sandbox / tool execution
```

Bu geçiş tek test işletmesi MVP'sinin ön şartı değildir; ancak çoklu müşteri ve yüksek etkili tool aşamasına gelmeden önce tasarlanmalıdır.
