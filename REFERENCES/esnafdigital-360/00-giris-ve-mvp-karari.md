> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; teknik cekirdek ve pilot siniri net.

---

# EsnafDigital 360 + OpenClaw
## Ajan Merkezli Dijital İşletme Sistemi

Bu doküman, EsnafDigital 360 projesinin aktif ürün ve mimari çalışma metnidir. Bölümler karar adayı taşır; uygulamaya dönüşecek her kritik kapsam, MVP veya yön değişikliği kurucu onayından geçmelidir.

## MVP için Kabul Edilen Mimari Çizgi

Bu dokümanda geçen **işletmeye özel ajan**, EsnafDigital 360 MVP için gerçek OpenClaw İşletme Ajanı ve ayrı çalışma alanı anlamına gelir.

MVP çekirdeği şudur:

> Tek test işletmesi için gerçek OpenClaw İşletme Ajanı, ayrı workspace, ayrı agentDir/session, İşletme Ajanı Kaydı, pilot kanal routing/binding, sınırlı EsnafDigital API tool'ları, audit/onay ve kill switch ile baştan sona çalışacaktır.

İşletme Ajanı Kaydı, agent'ın kendisi değildir. EsnafDigital panelinde o işletmenin gerçek OpenClaw agent'ını izleyen ve yöneten kayıttır. Bu kayıt; agent kimliğini, workspace/agentDir/session referanslarını, şablon sürümünü, izin profilini, kanal bağlantılarını, sağlık durumunu, görevleri, eksikleri ve onay durumunu takip eder.

Teknik adlandırma gerekirse ASCII karşılığı `IsletmeAjaniKaydi` / `isletme_ajani_kaydi` olarak tutulur.

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

## Ana Hedef

EsnafDigital 360 yalnızca web sitesi, Google düzeni, dinamik QR/NFC yönlendirme sistemi veya bakım hizmeti sunan klasik bir dijital hizmet paketi değildir.

Ana hedef şudur:

> Dijital operasyonunu kurmak veya büyütmek isteyen KOBİ'lere, panel karmaşası olmadan mesajlaşma tabanlı özel işletme ajanı sunmak.

MVP tamamlandı sayılması için yalnızca botun cevap vermesi yetmez. Teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmalı; P0 bloklayıcı hata sıfır olmadan yeni pilota geçilmemelidir.
