# 24. Stratejik Riskler

## 24.1 Kapsam Şişmesi

Risk:

Tüm modülleri aynı anda tam otomatik yapmaya çalışmak projeyi yavaşlatır.

Karar:

> Modüller baştan sistemde yer alacak, ancak otomasyon seviyesi kademeli artırılacak.

## 24.2 Tek Kanala Bağımlılık

Risk:

Sistem sadece Telegram’a veya sadece WhatsApp’a göre kurulursa ileride taşımak zorlaşır.

Karar:

> Kanal adaptörü ayrılacak. Ajan çekirdeği backend’de kalacak.

## 24.3 OpenClaw’ın Ana Uygulamaya Gömülmesi

Risk:

Ajan runtime ana uygulamaya gömülürse güvenlik, ölçekleme ve bakım zorlaşır.

Karar:

> OpenClaw ayrı servis olarak kurulacak. İlk aşamada aynı VPS, ileride ayrı VPS.

## 24.4 Ajanın Fazla Yetki Alması

Risk:

Ajan kontrolsüz şekilde dış hesaplarda işlem yaparsa müşteri ve güvenlik riski oluşur.

Karar:

> Ajan bilgi toplar, öneri üretir ve görev açar. Riskli dış işlemler onayla yapılır.

---
