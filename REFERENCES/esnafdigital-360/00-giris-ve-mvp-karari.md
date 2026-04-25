> Aktif 360 bolum dosyasi.
> Durum: duzeltildi; kurucu onayi icin hazir.

---

# EsnafDigital 360 + OpenClaw
## Ajan Merkezli Dijital İşletme Sistemi

> Not: Bu doküman ilk bilgi metnidir. İçindeki bölümler kurucu onayından geçmeden nihai ürün, MVP veya teknik uygulama kararı sayılmaz. Her bölüm ayrı ayrı `kabul / düzelt / ertele` süzgecinden geçirilecektir.

## MVP için kabul edilen mimari karar

Bu dokümanda geçen "işletmeye özel ajan" ifadesi EsnafDigital 360 MVP için gerçek OpenClaw işletme agent'ı ve ayrı workspace anlamına gelir.

MVP kararı şudur:

> Her işletme için tek OpenClaw Gateway/runtime altında ayrı OpenClaw agent, ayrı workspace, ayrı oturum/hafıza ve ayrı izin profili üretilecek. Bu karmaşa manuel yönetimle değil; iyi başlangıç şablonu, otomatik kurulum ve sıkı tool/yetki sınırıyla kontrol altında tutulacak.

`İşletme Ajanı Kaydı`, EsnafDigital panelinde o işletmenin gerçek OpenClaw agent'ını yöneten takip kaydıdır. Bu kayıt; agent kimliğini, workspace yolunu, şablon sürümünü, izin profilini, oturumlarını, kanal bağlantılarını ve görev durumunu tutar.

> Teknik adlandırma gerekirse ASCII karşılığı `IsletmeAjaniKaydi` / `isletme_ajani_kaydi` olarak tutulur.

Kanal kararı ayrı tutulur: İlk doğrulama Telegram/test kanalıyla yapılabilir; WhatsApp ticari hedef kanaldır. İşletmenin kendi WhatsApp hattını bağlama veya randevu karşılama ek kanal/modül paketi olabilir; ancak ajan mimarisi işletme başına ayrı agent/workspace kararına göre kurulacaktır.

Bu doküman, EsnafDigital 360 projesi için önerilen ürün kararlarını, teknik mimariyi, satış konumlandırmasını, modül yapısını ve ilk uygulama planını taslak olarak toplar.

EsnafDigital 360 artık yalnızca web sitesi, Google düzeni, dinamik QR/NFC yönlendirme sistemi veya bakım hizmeti sunan klasik bir dijital hizmet paketi olarak düşünülmemelidir. Bu metindeki öneriye göre projenin ana omurgası, her işletmeye özel oluşturulan **gerçek OpenClaw işletme agent'ı/workspace'i ve bunu yöneten İşletme Ajanı Kaydı** etrafında kurulmalıdır.

Bu ajan; işletme sahibinden bilgileri toplar, web vitrini üretimini başlatır, Google / Maps / Instagram / yorum / menü / fotoğraf / bakım süreçlerini takip eder, eksikleri hatırlatır, görevleri oluşturur ve gerektiğinde EsnafDigital operasyon ekibine aktarır.

Ana hedef şudur:

> Dijital operasyonunu kurmak veya büyütmek isteyen KOBİ’lere, panel karmaşası olmadan mesajlaşma tabanlı özel işletme ajanı sunmak.

---
