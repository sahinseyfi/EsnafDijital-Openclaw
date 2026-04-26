> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; ana urun karari taslak cikti ve onay siniriyla netlestirildi.

---

# 2. Ana Ürün Kararı

EsnafDigital 360'ın ana ürün kararı şudur:

> Dijital operasyonunu kurmak veya büyütmek isteyen işletme için özel bir OpenClaw İşletme Ajanı kurulur. Bu ajan, işletme dijital profili ve sınırlı EsnafDigital API tool'ları üzerinden bilgi toplar, eksikleri görünür yapar, taslak çıktılar üretir, görev açar ve riskli işleri onay/operasyon devrine bırakır.

Bu karar, projeyi klasik “site yapma” işinden çıkarır ve daha güçlü bir ürün konumuna taşır.

EsnafDigital'in satacağı ana şey yalnızca web sitesi değildir.

Satılacak ana değer:

- işletmeye özel mesajlaşma tabanlı dijital işletme ajanı,
- güven veren dijital kimlik,
- işletme dijital profili,
- web vitrini taslağı ve gerektiğinde yayın süreci,
- yorum toplama ve dinamik QR / kısa link akışı,
- menü / katalog / hizmet listesi taslağı,
- içerik, fotoğraf ve bilgi düzeni,
- müşteri iletişimini kolaylaştıran bağlantılar,
- görev, eksik ve onay takibi,
- düzenli bakım ve canlı tutma desteği.

## MVP Açısından Ana Karar

İlk MVP'de ana ürün kararı şu şekilde daraltılır:

- tek test işletmesiyle gerçek agent/workspace modeli doğrulanır,
- ayrı workspace, ayrı agentDir/session ve İşletme Ajanı Kaydı çalışır,
- pilot kanal mesajı doğru işletme ajanına gider,
- agent düşük riskli bilgileri profile ve taslak çıktılara dönüştürür,
- web vitrini, hizmet listesi ve QR/kısa link **taslak** olarak oluşur,
- canlı yayın, QR hedef aktivasyonu, dış hesap değişikliği, müşteri adına mesaj, randevu/sipariş/ödeme gibi işlemler agent tarafından otomatik yapılmaz,
- riskli işler approval veya operasyon görevi olarak panelde görünür.

Bu yapı sayesinde modüller birbirinden kopuk hizmetler olmaktan çıkar; işletmenin dijital operasyonunu kuran veya büyüten tek bir ajan merkezli sistemin parçaları haline gelir.
