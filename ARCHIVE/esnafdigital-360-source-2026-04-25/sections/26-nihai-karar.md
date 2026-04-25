# 26. Nihai Karar

EsnafDigital 360 şu şekilde inşa edilmelidir:

> Her işletme için ayrı OpenClaw işletme agent'ı, ayrı workspace, ayrı hafıza/oturum, sıkı yetki profili ve bunu izleyen `BusinessAgent` kaydı oluşturan; mesajlaşma üzerinden işletme bilgilerini toplayan, web vitrini ve dijital görünürlük altyapısını kuran, QR / menü / içerik / bakım / rapor süreçlerini yöneten modüler dijital işletme sistemi.

Kanal kararı:

> Ticari hedefte WhatsApp önemli kanaldır; ilk MVP ve teknik doğrulama için Telegram başlangıç kanalıdır. WhatsApp önce EsnafDigital’e ait ayrı pilot hatla denenir. Sistem mimarisi kanal bağımsız olmalıdır.

OpenClaw kurulum kararı:

> OpenClaw, EsnafDigital uygulamasının içine gömülmeyecek. Ayrı bir agent runtime servisi olarak kurulacak. İlk MVP’de aynı Hetzner VPS üzerinde ayrı Docker servisi olarak çalışacak. Tek OpenClaw Gateway/runtime altında her işletme için ayrı OpenClaw agent/workspace, ayrı oturum/hafıza ve ayrı yetki profili üretilecek. `BusinessAgent` kaydı bu gerçek agent'ı EsnafDigital tarafında izleyecek. Ajanlar EsnafDigital veritabanına doğrudan değil, EsnafDigital API üzerinden, sınırlı tool/plugin’lar aracılığıyla işlem yapacak.

Ürün yönü:

> EsnafDigital 360, küçük işletmeler için panel değil, mesajlaşma tabanlı dijital asistan deneyimi sunmalıdır.
