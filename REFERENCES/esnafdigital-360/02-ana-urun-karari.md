> Aktif 360 bolum dosyasi.
> Durum: ana urun web/dijital asistan degil, sanal isletme ekibi / karar destek ajani olarak netlestirildi.

---

# 2. Ana Ürün Kararı

EsnafDigital 360'ın ana ürün kararı şudur:

> Dijital operasyonunu ve işletme kararlarını daha sistemli yönetmek isteyen işletme için özel bir OpenClaw İşletme Ajanı kurulur. Bu ajan, işletmeyi tanır; departman bakış açılarıyla analiz yapar; karar notu, görev, eksik, taslak çıktı ve onay kaydı üretir.

Bu karar, projeyi klasik “site yapma” işinden çıkarır ve daha güçlü bir konuma taşır:

> EsnafDigital 360 = KOBİ ve esnaf için sanal işletme yönetim ekibi.

## 2.1 Satılan Ana Değer

Satılacak ana değer yalnızca web sitesi, QR veya katalog değildir.

Satılacak ana değer:

- işletmeye özel mesajlaşma tabanlı işletme yönetim ajanı,
- işletmenin kimliğini, hedeflerini, güçlü/zayıf yönlerini ve açık kararlarını bilen hafıza,
- finans, satış/pazarlama, operasyon, satın alma ve müşteri hizmetleri bakışıyla karar desteği,
- işletme dijital profili ve organizasyon profili,
- eksik bilgi, açık görev, onay ve karar notu takibi,
- web vitrini, görünürlük, yorum, menü/katalog/hizmet listesi ve QR gibi dijital çıktı modülleri,
- bakım ve canlı tutma desteği.

## 2.2 Ajanın Sınırı

Ajan departmanların yerine geçmez.

Doğru sınır:

```text
Ajan analiz eder, önerir, kontrol listesi çıkarır, görev açar ve karar notu hazırlar.
Son karar ve dış dünyayı etkileyen işlem işletme sahibinde / EsnafDigital operasyonundadır.
```

Ajan şunları yapmaz:

- işletme sahibi adına ürün satın almak,
- para transferi yapmak,
- sözleşme imzalamak,
- vergi beyanı veya resmi başvuru yapmak,
- hukuki/finansal kesin taahhüt vermek,
- sağlık/güvenlik/ruhsat gibi uzman kontrolü gerektiren konularda kesin onay vermek,
- dış hesaplarda veya public yayınlarda onaysız değişiklik yapmak.

## 2.3 MVP Açısından Ana Karar

İlk MVP'de ana ürün kararı şu şekilde daraltılır:

- tek test işletmesiyle gerçek agent/workspace modeli doğrulanır,
- ayrı workspace, ayrı agentDir/session ve İşletme Ajanı Kaydı çalışır,
- pilot kanal mesajı doğru işletme ajanına gider,
- agent işletme bilgisini ve ilk organizasyon/karar bağlamını toplar,
- agent en az bir basit işletme kararına departman bakışıyla karar destek notu üretir,
- agent düşük riskli bilgileri profile, eksiklere, görevlere ve taslak çıktılara dönüştürür,
- web vitrini, hizmet listesi ve QR/kısa link **taslak** olarak oluşur,
- canlı yayın, QR hedef aktivasyonu, dış hesap değişikliği, müşteri adına mesaj, randevu/sipariş/ödeme gibi işlemler agent tarafından otomatik yapılmaz,
- riskli işler approval veya operasyon görevi olarak panelde görünür.

Bu yapı sayesinde modüller birbirinden kopuk hizmetler olmaktan çıkar; işletmenin yönetim ve dijital operasyonunu birlikte taşıyan tek bir ajan merkezli sistemin parçaları haline gelir.
