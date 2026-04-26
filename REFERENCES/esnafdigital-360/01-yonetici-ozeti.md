> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; ozet artik taslak cikti, onay ve pilot sinirini vurgular.

---

# 1. Yönetici Özeti

EsnafDigital 360, dijital operasyonunu kurmak veya büyütmek isteyen KOBİ'ler için mesajlaşma tabanlı özel işletme ajanı sistemidir.

Her işletme için gerçek bir OpenClaw İşletme Ajanı ve ayrı çalışma alanı modeli hedeflenir. İlk MVP'de bu model tek test işletmesiyle doğrulanır: ayrı workspace, ayrı agentDir/session, İşletme Ajanı Kaydı, pilot kanal routing/binding, sınırlı EsnafDigital API tool'ları, audit/onay ve kill switch birlikte çalışmalıdır.

EsnafDigital panelindeki **İşletme Ajanı Kaydı**, agent'ın kendisi değildir; agent'ın kimliğini, çalışma alanını, şablon sürümünü, yetki profilini, kanal bağlarını, görevlerini, eksiklerini, sağlık durumunu ve onaylarını izleyen runtime control kaydıdır.

İşletme sahibi teknik panel öğrenmeden; dijital kurulum, görünürlük, içerik, web vitrini, QR, menü/katalog/hizmet listesi ve bakım süreçlerini mesajlaşma üzerinden ilerletir. Ancak ilk MVP'de bu çıktılar tam otomatik ürünler değil, agent'ın topladığı bilginin güvenli ve izlenebilir taslaklarıdır.

Sistem tek bir kanala bağlı tasarlanmaz. İlk doğrulama Telegram/test kanalı, webchat veya EsnafDigital pilot hattı ile yapılabilir; ticari hedefte WhatsApp önemli kanal olarak kalır. İşletmenin kendi WhatsApp hattını bağlamak ve randevu/sipariş gibi hassas akışları çalıştırmak ileri modül olarak ele alınır.

OpenClaw, EsnafDigital uygulamasının içine gömülmez. Ayrı bir agent runtime servisi olarak çalışır. İlk MVP'de aynı VPS üzerinde başlayabilir; gerçek müşteri sayısı, dış hesap bağlantıları, tool etkisi veya güvenlik ihtiyacı arttığında ayrı OS user, ayrı Gateway veya ayrı VPS eşikleri tekrar değerlendirilir.

Temel ürün cümlesi:

> İşletmeniz için kendi hafızası, çalışma alanı ve yetki sınırları olan özel bir dijital işletme ajanı kuruyoruz. Panel karmaşası olmadan; web vitrini, görünürlük, yorum, menü/katalog/hizmet listesi, içerik ve bakım işlerinizi mesajlaşma üzerinden güvenli ve adım adım ilerletiyoruz.

MVP kabul standardı:

> Teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz.
