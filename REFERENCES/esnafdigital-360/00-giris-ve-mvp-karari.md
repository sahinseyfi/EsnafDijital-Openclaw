> Aktif 360 bolum dosyasi.
> Durum: sanal isletme ekibi / karar destek eksenine cekildi; MVP guvenlik siniri korunur.

---

# EsnafDigital 360 + OpenClaw
## Ajan Merkezli Sanal İşletme Ekibi

Bu doküman, EsnafDigital 360 projesinin aktif ürün ve mimari çalışma metnidir. Bölümler karar adayı taşır; uygulamaya dönüşecek her kritik kapsam, MVP veya yön değişikliği kurucu onayından geçmelidir.

## Ana Ürün Kararı

EsnafDigital 360 yalnızca web sitesi, Google düzeni, dinamik QR/NFC yönlendirme sistemi, katalog veya bakım hizmeti sunan klasik bir dijital hizmet paketi değildir.

Ana ürün şudur:

> İşletme sahibinin CEO olduğu; ajanın ise finans, satış, pazarlama, operasyon, satın alma, müşteri hizmetleri ve dijital görünürlük bakış açılarıyla çalışan sanal işletme ekibi gibi karar desteği verdiği özel işletme yönetim ajanı sistemi.

Ajan gerçek departmanların hukuki veya fiili yetkisini devralmaz. Ajan karar vermez; işletmeyi tanır, eksikleri ve fırsatları gösterir, seçenekleri karşılaştırır, karar notu hazırlar, görev açar ve son kararı işletme sahibine bırakır.

Web vitrini, QR, menü/katalog, sosyal medya ve görünürlük işleri bu ana ürünün dijital çıktı modülleridir. Amaç web yapan asistan değil, işletmeyi tanıyan ve yönetim kararlarında yön gösteren işletme ajanıdır.

## MVP için Kabul Edilen Mimari Çizgi

Bu dokümanda geçen **işletmeye özel ajan**, EsnafDigital 360 MVP için gerçek OpenClaw İşletme Ajanı ve ayrı çalışma alanı anlamına gelir.

MVP çekirdeği şudur:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir/session, İşletme Ajanı Kaydı, pilot kanal routing/binding, sınırlı EsnafDigital API tool'ları, audit/onay ve kill switch ile baştan sona çalışacaktır.

İşletme Ajanı Kaydı, agent'ın kendisi değildir. EsnafDigital panelinde o işletmenin gerçek OpenClaw agent'ını izleyen ve yöneten kayıttır. Bu kayıt; agent kimliğini, workspace/agentDir/session referanslarını, şablon sürümünü, izin profilini, kanal bağlantılarını, sağlık durumunu, görevleri, eksikleri, karar notlarını ve onay durumunu takip eder.

Teknik adlandırma gerekirse ASCII karşılığı `IsletmeAjaniKaydi` / `isletme_ajani_kaydi` olarak tutulur.

## MVP Ürün Kanıtı

MVP sadece botun cevap vermesi veya web vitrini taslağı üretmesiyle başarılı sayılmaz.

MVP şu dört kanıtı birlikte göstermelidir:

1. **Teknik kanıt:** gerçek işletme ajanı, ayrı workspace/agentDir/session ve doğru kanal routing çalışır.
2. **Operasyonel kanıt:** agent bilgiyi profile, eksiklere, görevlere, karar notlarına ve onay kayıtlarına çevirebilir.
3. **Güvenlik kanıtı:** agent kendi sınırı dışına çıkmaz; riskli işleri onaysız yapmaz.
4. **Müşteri değeri kanıtı:** işletme sahibi ajanın işletmeyi anladığını, yön gösterdiğini ve ilk somut çıktıları ürettiğini görür.

İlk görünür dijital çıktılar hâlâ önemlidir: web vitrini taslağı, basit hizmet/ürün listesi, dinamik kısa link/QR hedef taslağı ve kurulum özeti. Fakat bunlar ana ürün değil, sanal işletme ekibinin ilk kanıt çıktılarıdır.

## Kanal Kararı

Kanal ürün değildir. İlk doğrulama Telegram/test kanalı, webchat veya EsnafDigital pilot hattı ile yapılabilir. WhatsApp ticari hedef kanal olarak kalır; ancak işletmenin kendi WhatsApp hattını bağlamak, randevu/sipariş karşılamak veya dış hesapları yönetmek MVP çekirdeği değildir.

## Güvenlik Sınırı

Ayrı workspace tek başına güvenlik sınırı sayılmaz. MVP güvenlik sınırı şu birleşimle kurulur:

- kanal allowlist / pairing,
- explicit binding,
- sandbox/tool policy,
- EsnafDigital API tarafında tenant/business yetki kontrolü,
- audit log,
- onay kuyruğu,
- pause / kill switch.

Ajan; ürün satın alma, para transferi, sözleşme imzalama, vergi beyanı, hukuki taahhüt, resmi başvuru veya sağlık/güvenlik/ruhsat gerektiren kesin kararları işletme sahibi adına yapmaz.

## Ana Hedef

> Dijital operasyonunu ve işletme kararlarını daha sistemli yönetmek isteyen KOBİ'lere, panel karmaşası olmadan mesajlaşma tabanlı özel işletme yönetim ajanı sunmak.

MVP tamamlandı sayılması için teknik, operasyonel, karar destek, güvenlik ve müşteri değeri kanıtları birlikte alınmalı; P0 bloklayıcı hata sıfır olmadan yeni pilota geçilmemelidir.
