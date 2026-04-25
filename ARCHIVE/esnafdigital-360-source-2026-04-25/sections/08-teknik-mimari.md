# 8. Teknik Mimari

Sistem şu ana parçalardan oluşmalıdır:

```text
Müşteri
   ↓
WhatsApp / Telegram
   ↓
Channel Adapter
   ↓
İlgili OpenClaw İşletme Agent'ı
   ↓
EsnafDigital API
   ↓
Database / Web Vitrini / Menü / QR / Görevler / Raporlar
```

## 8.1 EsnafDigital App

EsnafDigital App, ürünün ana veri ve yönetim merkezidir.

İçinde şunlar bulunur:

- işletme kayıtları,
- kullanıcı / müşteri bilgileri,
- aktif paketler,
- modül durumları,
- web vitrini verileri,
- menü verileri,
- QR linkleri,
- fotoğraf ve medya varlıkları,
- bakım görevleri,
- durum raporları,
- ödeme durumu,
- admin panel,
- müşteri paneli.

## 8.2 OpenClaw Runtime

OpenClaw Runtime, ajanların çalıştığı ayrı katmandır.

Görevleri:

- mesajları almak,
- mesajı doğru OpenClaw işletme agent'ına yönlendirmek,
- ilgili işletme workspace'ini, hafızasını ve yetki profilini yüklemek,
- müşteriden bilgi istemek,
- EsnafDigital API’ye güvenli istekler atmak,
- görev oluşturmak,
- içerik üretmek,
- rapor taslağı hazırlamak,
- operasyon ekibine bilgi aktarmak.

## 8.3 EsnafDigital API

OpenClaw, veritabanına doğrudan erişmemelidir.

Doğru bağlantı:

> OpenClaw → EsnafDigital API → Database

Bu yapı güvenlik ve kontrol açısından daha doğru olur.

Ajanın kullanacağı örnek API işlemleri:

- işletme bilgisi getir,
- işletme bilgisi güncelle,
- eksik bilgi listesi getir,
- fotoğraf yükle,
- menü öğesi ekle,
- QR linki oluştur,
- bakım görevi aç,
- rapor oluştur,
- müşteri talebi kaydet,
- operasyon görevi oluştur.

Bu işlemler OpenClaw tarafında skill değil, tool / plugin olarak bağlanmalıdır.

- **Skill:** Ajanın nasıl davranacağını ve hangi akışı izleyeceğini tarif eder.
- **Tool / plugin:** Ajanın EsnafDigital API üzerinde gerçek işlem yapmasını sağlar.

MVP’de ortak işletme agent davranış şablonu, işletmeye özel workspace dosyaları ve bu ajanların kullanacağı sınırlı EsnafDigital API tool’ları birlikte düşünülmelidir.

---
