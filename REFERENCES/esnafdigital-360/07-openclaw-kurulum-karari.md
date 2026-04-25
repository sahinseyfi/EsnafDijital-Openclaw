> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

# 7. OpenClaw Kurulum Kararı

OpenClaw, EsnafDigital uygulamasının içine gömülmez. Ayrı bir agent runtime katmanı olarak çalışır.

Bu ayrımın amacı şudur:

- EsnafDigital uygulaması işletme verisini, paneli, web vitrini, QR, katalog ve görevleri yönetir.
- OpenClaw runtime işletme ajanlarını, konuşmaları, kanal bağlantılarını ve tool çalıştırma sınırlarını yönetir.
- İki taraf birbiriyle doğrudan veritabanı paylaşarak değil, kontrollü EsnafDigital API ve sınırlı tool/plugin'lar üzerinden konuşur.

## 7.1 MVP Kurulum Modeli

İlk MVP’de ayrı fiziksel sunucu şart değildir. Başlangıçta aynı VPS üzerinde iki ayrı katman bulunabilir:

```text
VPS
│
├─ esnafdigital-app
│  ├─ admin panel
│  ├─ web vitrini
│  ├─ işletme kayıtları
│  ├─ QR / katalog / rapor modülleri
│  └─ database / storage
│
└─ openclaw-runtime
   ├─ OpenClaw Gateway
   ├─ işletme ajanları
   ├─ işletme agent workspace'leri
   ├─ kanal adapterleri
   └─ tool / sandbox / yetki profilleri
```

Buradaki kritik karar Docker olup olmaması değildir. Kritik karar, OpenClaw’ın EsnafDigital app içine karışmaması ve ayrı runtime mantığıyla yönetilmesidir.

## 7.2 İşletme Başına Agent ve Workspace

MVP kararı şudur:

> Her işletme için tek OpenClaw Gateway/runtime altında ayrı OpenClaw İşletme Ajanı ve ayrı workspace oluşturulur.

Bu, her işletme için ayrı VPS veya ayrı Gateway kurulacağı anlamına gelmez. Aynı runtime içinde çoklu izole işletme ajanları çalışır.

Her işletme için tutulacak temel parçalar:

- gerçek OpenClaw İşletme Ajanı,
- ayrı workspace,
- ayrı konuşma oturumu ve hafıza,
- ayrı izin/yetki profili,
- EsnafDigital panelinde İşletme Ajanı Kaydı,
- işletme dijital profili,
- aktif modüller,
- eksik bilgiler,
- açık görevler ve takip durumu.

Örnek mantık:

```text
openclaw-runtime
│
├─ gateway
├─ agent_isletme_001
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
│  └─ yetki-profili
│
├─ agent_isletme_002
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
│  └─ yetki-profili
│
└─ agent_isletme_003
   ├─ workspace
   ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md / BUSINESS.md
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
- İşletme Ajanı Kaydı agent'ın nerede olduğunu ve hangi durumda olduğunu izler,
- tool yetkileri varsayılan olarak sınırlı gelir,
- riskli işlemler onaysız çalışmaz,
- agent başka işletme workspace'lerine veya EsnafDigital ana workspace'ine erişemez,
- şablon sürümü takip edilir; ileride güncelleme gerektiğinde hangi agent'ın hangi şablondan geldiği bilinir.

## 7.4 Ne Zaman Ayrı VPS’e Taşınmalı?

İlk doğrulamada aynı VPS üzerinde ayrı runtime katmanı yeterli olabilir.

OpenClaw runtime şu durumlarda ayrı VPS’e taşınmalıdır:

- işletme agent sayısı belirgin şekilde artarsa,
- medya ve dosya trafiği yükselirse,
- WhatsApp veya başka kanal bağlantıları kritik hale gelirse,
- tool çalıştırma yükü artarsa,
- güvenlik izolasyonu daha önemli hale gelirse,
- agent runtime kaynak kullanımı EsnafDigital uygulamasını etkilemeye başlarsa.

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

---
