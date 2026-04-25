# 7. OpenClaw Kurulum Kararı

OpenClaw, EsnafDigital uygulamasının içine gömülmemelidir.

Doğru karar:

> OpenClaw ayrı bir agent runtime servisi olarak çalışmalıdır.

## 7.1 İlk MVP Kurulumu

İlk aşamada OpenClaw mevcut Hetzner VPS üzerinde kurulabilir.

Ancak aynı uygulamanın içine değil, ayrı Docker servisi olarak çalışmalıdır.

Önerilen yapı:

```text
Hetzner VPS
│
├─ esnafdigital-app
│  ├─ web vitrini
│  ├─ admin panel
│  ├─ işletme kayıtları
│  ├─ menü / QR / rapor modülleri
│  └─ database / storage
│
└─ openclaw-runtime
   ├─ OpenClaw Gateway
   ├─ Telegram adapter
   ├─ WhatsApp adapter hazırlığı
   ├─ EsnafDigital işletme ajanları
   ├─ işletme agent workspace'leri
   └─ tool execution / sandbox / permission profiles
```

## 7.2 İşletme Başına Ayrı Agent/Workspace Kurulacak

İlk aşamadaki karar, her işletme için gerçek OpenClaw işletme agent'ı ve ayrı workspace üretmektir. Burada amaç müşteri başına ayrı Gateway/VPS kurmak değil; tek OpenClaw Gateway/runtime altında izole agent'lar çalıştırmaktır.

Doğru model:

> Tek OpenClaw Gateway/runtime, çoklu OpenClaw işletme agent'ı, her işletme için ayrı workspace, ayrı oturum/hafıza ve ayrı izin profili.

Örnek:

```text
openclaw-runtime
│
├─ gateway
├─ agent_cafe_ada
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md
│  └─ permission-profile
├─ agent_berber_ali
│  ├─ workspace
│  ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md
│  └─ permission-profile
└─ agent_restoran_deniz
   ├─ workspace
   ├─ AGENTS.md / SOUL.md / USER.md / TOOLS.md / MEMORY.md
   └─ permission-profile
```

Her işletmenin ayrı:

- OpenClaw agent'ı,
- workspace'i,
- `BusinessAgent` takip kaydı,
- işletme profili,
- konuşma geçmişi / oturumları,
- görev listesi,
- işletme bağlamı,
- aktif modülleri,
- tool/yetki sınırı

olur.

Karmaşa manuel yönetimle değil; iyi başlangıç şablonu, otomatik agent kurulumu, şablon sürümü takibi ve sıkı tool/yetki sınırıyla kontrol altına alınır.

## 7.3 Ne Zaman Ayrı VPS’e Taşınmalı?

İlk 10-50 müşteri için aynı VPS üzerinde ayrı Docker servisi yeterli olabilir.

Ancak şu durumlarda OpenClaw runtime ayrı VPS’e taşınmalıdır:

- müşteri sayısı artarsa,
- WhatsApp bağlantısı kritik hale gelirse,
- agent işlemleri yoğunlaşırsa,
- medya / dosya yükü artarsa,
- güvenlik izolasyonu gerekirse,
- işletme agent sayısı ve tool çalışma yükü tek VPS sınırını aşarsa.

Üretime geçişte önerilen yapı:

```text
VPS 1 — EsnafDigital App
- web uygulaması
- admin panel
- API
- database
- public website

VPS 2 — OpenClaw Runtime
- OpenClaw Gateway
- WhatsApp / Telegram sessionları
- işletme agent workspace'leri ve BusinessAgent takip kayıtları
- sandbox
- tool execution
```

---
