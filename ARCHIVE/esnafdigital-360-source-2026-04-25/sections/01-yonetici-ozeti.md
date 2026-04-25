# 1. Yönetici Özeti

EsnafDigital 360, küçük işletmeler için ajan destekli bir dijital yönetim sistemidir.

Her işletme için bir kayıt oluşturulur. Bu kayda bağlı olarak OpenClaw tarafında ayrı bir işletme agent'ı ve workspace'i, EsnafDigital tarafında ise bu agent'ı izleyen `BusinessAgent` kaydı, oturum, görev listesi ve işletme bağlamı açılır. İşletme sahibi ilk aşamada Telegram/test kanalı veya EsnafDigital pilot hattı üzerinden kendi işletme agent'ına yönlendirilir. Ajan, işletmenin dijital varlığını kurmak ve güncel tutmak için gerekli bilgileri konuşarak toplar.

Sistem ilk aşamada Telegram üzerinden daha hızlı test edilebilir. Ticari hedefte WhatsApp önemli kanaldır; ancak MVP’de önce Telegram iç test, ardından EsnafDigital’e ait ayrı bir WhatsApp pilot hattı düşünülmelidir. Bu nedenle sistem, tek bir kanala bağlı değil; **kanal bağımsız ajan mimarisi** ile tasarlanmalıdır.

OpenClaw, EsnafDigital uygulamasının içine gömülmemelidir. Ayrı bir **agent runtime servisi** olarak çalışmalıdır. İlk MVP’de aynı Hetzner VPS üzerinde ayrı Docker servisi olarak kurulabilir. Müşteri sayısı ve operasyon yükü arttığında OpenClaw runtime ayrı VPS’e taşınmalıdır.

Temel ürün cümlesi:

> İşletmeniz için kendi hafızası, çalışma alanı ve yetki sınırları olan özel bir dijital asistan kuruyoruz. İlk aşamada pilot kanal üzerinden ilerliyorsunuz; asistan web siteniz, Google görünürlüğünüz, yorum sisteminiz, menünüz, fotoğraflarınız ve bakım işleriniz için sizi yönlendiriyor. Ticari kullanımda bu deneyim WhatsApp’a taşınabilecek şekilde tasarlanıyor.

---
