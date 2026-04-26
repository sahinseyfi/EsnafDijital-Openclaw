> Aktif 360 bolum dosyasi.
> Durum: sanal isletme ekibi / karar destek eksenine cekildi.

---

# 1. Yönetici Özeti

EsnafDigital 360, dijital operasyonunu ve işletme kararlarını daha sistemli yönetmek isteyen KOBİ'ler için mesajlaşma tabanlı özel işletme yönetim ajanı sistemidir.

Ürünün ana fikri şudur:

> İşletme sahibi CEO gibi kalır; ajan ise finans, satış, pazarlama, operasyon, satın alma, müşteri hizmetleri ve dijital görünürlük bakış açılarını tek yerde birleştiren sanal işletme ekibi gibi çalışır.

Ajan gerçek bir finans müdürü, avukat, muhasebeci, satın almacı veya müşteri temsilcisi yerine geçmez. Hukuki/fiili yetki devralmaz. Ajanın rolü karar desteğidir: işletmeyi tanımak, eksikleri bulmak, seçenekleri karşılaştırmak, riskleri göstermek, karar notu hazırlamak, görev açmak ve son kararı işletme sahibine bırakmak.

Her işletme için gerçek bir OpenClaw İşletme Ajanı ve ayrı çalışma alanı modeli hedeflenir. İlk MVP'de bu model tek test işletmesiyle doğrulanır: ayrı workspace, ayrı agentDir/session, İşletme Ajanı Kaydı, pilot kanal routing/binding, sınırlı EsnafDigital API tool'ları, audit/onay ve kill switch birlikte çalışmalıdır.

EsnafDigital panelindeki **İşletme Ajanı Kaydı**, agent'ın kendisi değildir; agent'ın kimliğini, çalışma alanını, şablon sürümünü, yetki profilini, kanal bağlarını, görevlerini, eksiklerini, karar notlarını, sağlık durumunu ve onaylarını izleyen runtime control kaydıdır.

İşletme sahibi teknik panel öğrenmeden ajana şunları sorabilir:

- Bu ekipmanı almalı mıyım?
- Bu ay hangi ürünü/hizmeti öne çıkarmalıyım?
- Fiyat artırmam doğru olur mu?
- Yeni personel veya vardiya ihtiyacım var mı?
- Bu kampanya kârlı olur mu?
- Şu müşteri şikayetine nasıl cevap vereyim?
- Google yorumlarım düşük, ne yapmalıyım?
- Web vitrinimde hangi hizmetleri öne çıkarmalıyım?
- Bu ay işletmemde hangi 3 şeye odaklanmalıyım?

Web vitrini, QR, menü/katalog/hizmet listesi, sosyal medya ve görünürlük işleri bu ajanın ürettiği dijital çıktı modülleridir. Bunlar ürünün tamamı değil, işletme ajanının görünür sonuçlarıdır.

Sistem tek bir kanala bağlı tasarlanmaz. İlk doğrulama Telegram/test kanalı, webchat veya EsnafDigital pilot hattı ile yapılabilir; ticari hedefte WhatsApp önemli kanal olarak kalır. İşletmenin kendi WhatsApp hattını bağlamak ve randevu/sipariş gibi hassas akışları çalıştırmak ileri modül olarak ele alınır.

Temel ürün cümlesi:

> İşletmenizi bilen, dijital işlerinizi yürüten ve yönetim kararlarınızda size departman departman danışmanlık yapan yapay zeka işletme ajanı.

MVP kabul standardı:

> Teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz.
