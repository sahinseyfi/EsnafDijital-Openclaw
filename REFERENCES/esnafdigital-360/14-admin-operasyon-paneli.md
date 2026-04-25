> Aktif 360 bolum dosyasi.
> Durum: bastan yazildi; kurucu onayi icin hazir.

---

# 14. Admin / Operasyon Paneli

EsnafDigital paneli, müşteriye satılan panel değildir. Bu panel, EsnafDigital ekibinin işletmeleri, işletme ajanlarını, görevleri, eksikleri, onayları ve teslimat sürecini kontrol ettiği iç operasyon yüzeyidir.

Müşteri için ana arayüz mesajlaşma kanalıdır. Admin panelin görevi, müşteriyle sohbet etmek değil; işletme ajanlarının ve operasyon işlerinin doğru ilerleyip ilerlemediğini izlemektir.

## 14.1 Panelin Ana Görevi

Panel şu sorulara hızlı cevap vermelidir:

- Hangi işletmeler aktif?
- Hangi işletmenin ajanı kuruldu?
- Hangi işletmede eksik bilgi var?
- Hangi iş müşteriden cevap bekliyor?
- Hangi iş operasyon müdahalesi bekliyor?
- Hangi işler onay bekliyor?
- Hangi işletmenin web vitrini, QR, katalog veya bakım durumu açık?
- Bugün hangi işe dokunmak gerekiyor?

Panel bir "ekran koleksiyonu" değil, operasyon karar yüzeyidir.

## 14.2 Ana Yüzeyler

İlk admin omurgası sade kalmalıdır:

### Project OS / Bugünün İşi

Günün sıcak işlerini gösterir.

Burada şunlar görünebilir:

- onay bekleyen işler,
- eksik bilgi bekleyen işletmeler,
- yayın veya teslimat riski olan işler,
- bugün dokunulması gereken bakım işleri,
- yeni kurulan agent/workspace durumları.

Project OS ikinci bir CRM'e dönüşmemelidir. Sadece sıcak iş kokpiti olmalıdır.

### Businesses

İşletmeleri bulma, filtreleme ve detaya geçme yüzeyidir.

Burada şunlar olmalıdır:

- işletme listesi,
- durum / paket / modül filtresi,
- agent durumu,
- eksik bilgi sinyali,
- açık görev sinyali,
- son güncelleme.

### Business Detail

Tek işletme için ana karar yüzeyidir.

Burada şunlar toplanır:

- işletme dijital profili,
- İşletme Ajanı Kaydı,
- agent workspace ve durum bilgisi,
- aktif modüller,
- eksik bilgiler,
- görevler,
- bekleyen onaylar,
- web vitrini durumu,
- QR / yorum durumu,
- menü / katalog / hizmet listesi durumu,
- fotoğraf ve medya durumu,
- bakım ve sonraki adım.

Business Detail, form ve not duvarına dönüşmemelidir. Tek işletme için karar vermeyi kolaylaştırmalıdır.

## 14.3 İşletme Ajanı Kaydı Panelde Ne Gösterir?

İşletme Ajanı Kaydı, gerçek OpenClaw işletme ajanının paneldeki takip kaydıdır.

Panelde en az şunları göstermelidir:

- agentId,
- workspace durumu,
- şablon sürümü,
- yetki profili,
- bağlı kanal veya test kanalı,
- son mesaj / son aktivite,
- agent sağlığı,
- açık eksikler,
- açık görevler,
- onay bekleyen işlemler.

Bu kayıt agent'ın kendisi değildir; agent'ın EsnafDigital tarafındaki yönetim ve izleme kaydıdır.

## 14.4 Onay ve Risk Yönetimi

Panelin en önemli görevlerinden biri riskli işleri görünür yapmaktır.

Özellikle şu işler panelde onay bekleyen iş olarak görünmelidir:

- dış hesap değişikliği,
- yayın alma,
- fiyat veya ödeme ile ilgili karar,
- kesin randevu / sipariş / taahhüt,
- müşteri adına dış dünyaya mesaj,
- veri silme veya kalıcı değişiklik,
- domain / DNS / hesap erişimi işlemleri.

Ajan bu işleri otomatik yapmaz; panelde onay veya operasyon görevi olarak görünür hale getirir.

## 14.5 Panelde Olmaması Gereken Şey

İlk aşamada panel şunlara dönüşmemelidir:

- müşteriye satılan genel CRM,
- her modül için ayrı büyük ekranlar,
- not / timeline / task duvarı,
- ikinci mesajlaşma uygulaması,
- her şeyi aynı anda çözmeye çalışan ağır yönetim sistemi.

Ana prensip:

> Admin panel, EsnafDigital ekibinin işletme ajanlarını ve dijital operasyon işlerini sade şekilde kontrol ettiği iç operasyon merkezidir.

---
