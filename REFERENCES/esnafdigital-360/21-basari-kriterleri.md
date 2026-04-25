> Aktif 360 bolum dosyasi.
> Durum: GPT Pro degerlendirmeleriyle MVP kabul standardi, P0/P1/P2 ayrimi ve tamamlandi checklist'i netlestirildi.

---

# 21. Başarı Kriterleri

İlk aşamada başarı, tüm modüllerin tam otomatik olmasıyla ölçülmemelidir. MVP'nin başarısı, işletme agent modelinin gerçekten çalışıp çalışmadığıyla ölçülmelidir.

Nihai kabul cümlesi:

> EsnafDigital 360 MVP başarılı sayılır, eğer tek test işletmesi için gerçek işletme ajanı modeli güvenli, izlenebilir, operasyonel ve müşteriye değer üreten şekilde baştan sona çalıştığını kanıtlarsa.

Başarı dört grupta ele alınır:

1. teknik başarı,
2. operasyonel başarı,
3. güvenlik başarısı,
4. ürün / müşteri değeri başarısı.

## 21.1 Başarılı MVP Tanımı

Başarılı MVP şu akışı kanıtlamalıdır:

```text
Tek gerçek veya gerçeğe çok yakın test işletmesi
→ sisteme eklenir
→ gerçek OpenClaw İşletme Ajanı oluşur
→ ayrı workspace / agentDir / session kullanır
→ İşletme Ajanı Kaydı panelden izlenir
→ pilot kanaldan gelen mesaj doğru agent'a gider
→ agent kendi işletme bağlamıyla bilgi toplar
→ bilgiler profile, göreve, eksik listesine ve ilk çıktılara dönüşür
→ web vitrini taslağı, hizmet/ürün listesi, kısa link/QR hedef taslağı ve kurulum özeti oluşur
→ riskli işlemler otomatik yapılmaz
→ admin panelden durum, görev, onay, audit ve sonraki adım izlenebilir
→ işletme sahibi ilk değeri anlar
```

Sadece çalışan bot, sadece web taslağı veya sadece QR üretimi başarı sayılmaz.

## 21.2 Teknik Başarı Kriterleri

MVP teknik olarak başarılı sayılmak için şunları göstermelidir:

- bir işletme sisteme eklenebiliyor,
- işletmeye özel gerçek OpenClaw İşletme Ajanı oluşuyor,
- ayrı agent workspace'i oluşuyor,
- ayrı agentDir ve session store kullanılıyor,
- İşletme Ajanı Kaydı panelde görünüyor,
- işletme bazlı oturum ve hafıza ayrımı çalışıyor,
- pilot mesajlaşma kanalından gelen mesaj doğru işletme ajanına gidiyor,
- explicit binding çalışıyor,
- yetkisiz veya yanlış kullanıcı gerçek agent'a ulaşamıyor,
- agent kendi işletme bağlamıyla cevap veriyor,
- agent yalnızca izin verilen EsnafDigital API tool'larını kullanıyor,
- başka işletme verisine veya ana workspace'e erişim olmuyor,
- tool çağrıları ve izin kararları audit log'a yazılıyor,
- pause / kill switch test edilebiliyor.

Minimum teknik eşikler:

| Metrik | Kabul eşiği |
|---|---:|
| Pilot mesajın doğru agent'a yönlenme oranı | %100 |
| Tenant mismatch | 0 |
| Denylist tool'un başarılı kullanımı | 0 |
| İzinli tool çağrılarında audit oranı | %100 |
| Pause / resume testi | en az 1 başarılı test |
| Web preview üretimi | en az 1 |
| Hizmet listesi kalemi | en az 1, ideal 3 |
| Shortlink / QR hedef taslağı | en az 1 |
| Kurulum özeti | en az 1 |

## 21.3 Operasyonel Başarı Kriterleri

MVP operasyonel olarak başarılı sayılmak için şunları göstermelidir:

- ajan temel işletme bilgilerini toplayabiliyor,
- eksik bilgiler görünür hale geliyor,
- toplanan bilgiler işletme dijital profiline bağlanıyor,
- admin panelde açık görevler görünüyor,
- onay gerektiren işler otomatik yapılmıyor,
- operasyon ekibine devredilecek işler ayrılıyor,
- agent status, setup phase ve output status panelde ayrışıyor,
- bakım veya güncelleme ihtiyacı görev olarak takip edilebiliyor,
- agent durumu ve son aktivite panelden izlenebiliyor,
- her işletme için sıradaki adım okunabiliyor.

Pratik operasyonel eşikler:

| Metrik | Kabul eşiği |
|---|---|
| İşletme profiline yazılan taslak alan | en az 4 alan |
| Eksik bilgi kaydı | en az 1 anlamlı eksik |
| Açık görev | gerekiyorsa en az 1 |
| Medya/fotoğraf talebi | fotoğraf yoksa oluşturulmuş olmalı |
| Riskli istek | varsa approval'a düşmeli |
| Admin panel okunabilirliği | 1 dakika içinde ne oldu / ne eksik / ne sırada anlaşılmalı |
| Kurulum özeti | oluşmalı veya manuel kaydedilebilmeli |

## 21.4 Güvenlik Başarı Kriterleri

Güvenlik başarısı, yalnızca sorun çıkmamasıyla değil, yanlış/riskli davranışların sistem tarafından engellenebilmesiyle ölçülür.

MVP güvenlik açısından başarılı sayılmak için şunları göstermelidir:

- kanal allowlist veya pairing çalışıyor,
- explicit binding yanlış agent yönlenmesini engelliyor,
- fallback varsa no-tool / quarantine mantığında çalışıyor,
- API business scope'u İşletme Ajanı Kaydı üzerinden çözülüyor,
- body'deki `business_id` yetki kaynağı sayılmıyor,
- tool allowlist dışındaki tool'lar kapalı,
- `exec`, browser, filesystem write, cron, subagent ve dış hesap araçları kapalı,
- riskli işler onaysız yapılmıyor,
- tool çağrıları audit log'a yazılıyor,
- workspace'e parola, token veya credential yazılmıyor,
- pause / kill switch çalışıyor,
- tenant mismatch veya denylist denemesi görünür güvenlik olayı üretiyor.

## 21.5 Ürün / Müşteri Değeri Başarı Kriterleri

MVP, müşteri açısından şu değeri göstermelidir:

- işletme sahibi panel öğrenmeden sürece katılabiliyor,
- mesajlaşma üzerinden bilgi verebiliyor,
- ajan kısa, açık ve yönlendirici konuşuyor,
- işletme sahibi hangi bilgilerin eksik olduğunu görebiliyor,
- toparlanmış işletme özeti doğru geliyor,
- web vitrini taslağı işletmeye özel ilk değer üretiyor,
- hizmet / ürün listesi anlamlı görünüyor,
- QR/kısa link mantığı anlaşılabiliyor,
- kurulum özeti tamamlananları, eksikleri ve sıradaki adımı gösteriyor,
- özel işletme ajanı fikri klasik web/QR işinden ayrışıyor.

Pilot işletme sahibine sorulacak beş kısa soru:

1. Bu ajan işletmenizi doğru anladı mı?
2. Verdiğiniz bilgiler görünür bir taslağa dönüştü mü?
3. Eksik kalan şeyler size net geldi mi?
4. Bu süreci klasik site/QR işinden daha düzenli buldunuz mu?
5. Bir sonraki adım için EsnafDigital ile devam etmek ister misiniz?

İlk üç soruda güçlü olumlu cevap alınmadan yeni pilota geçilmemelidir.

## 21.6 İlk Dijital Çıktı Başarı Kriterleri

MVP, işletmeye görünür bir ilk değer üretmelidir.

Başarı için en az şunlar oluşmalıdır:

- web vitrini taslağı / preview,
- arama / mesajlaşma / yol tarifi bağlantıları,
- dinamik QR / NFC kısa link hedef taslağı,
- menü / katalog / hizmet listesi için basit yapı,
- fotoğraf veya içerik toplama akışı,
- kısa kurulum özeti veya durum raporu.

Bu çıktılar kusursuz olmak zorunda değildir; ama işletmenin dijital operasyonunun başladığını göstermelidir.

## 21.7 Kabul Edilebilir Eksikler

İlk MVP'de aşağıdaki eksikler kabul edilebilir:

- web vitrininin canlı yayında olmaması,
- fotoğraf eksikliği,
- hizmet listesinin tam olmaması,
- fiyatların eksik olması,
- QR hedefinin aktif olmaması,
- NFC / fiziksel materyal olmaması,
- Google / Instagram / Maps değişikliği yapılmaması,
- işletmenin kendi WhatsApp hattının bağlanmaması,
- gelişmiş müşteri paneli olmaması,
- gelişmiş katalog / sipariş / teklif olmaması,
- randevu / ödeme / sipariş otomasyonu olmaması,
- analytics / A-B test / kampanya raporu olmaması,
- bazı admin işlemlerinin manuel yapılması.

Bu eksikler ancak görev, eksik veya karar olarak görünürse kabul edilebilir.

## 21.8 Bloklayıcı Hatalar

### P0 — Kesin Bloklayıcı

P0 hata varsa MVP tamamlanmış sayılmaz ve yeni pilota geçilmez.

P0 örnekleri:

- mesaj yanlış işletme agent'ına gidiyor,
- agent başka işletme verisini okuyabiliyor,
- agent EsnafDigital ana workspace veya secret alanına erişebiliyor,
- denylist tool başarılı çalışıyor,
- agent web yayınlıyor veya QR hedefini onaysız değiştiriyor,
- dış hesapta onaysız işlem yapılabiliyor,
- workspace'e secret/token/parola yazılıyor,
- API body'deki `business_id` değerine güveniyor,
- audit kaydı oluşmadan tool işlemi yapılabiliyor,
- kill switch / pause çalışmıyor,
- gerçek OpenClaw agent oluşmuyor,
- ayrı workspace / agentDir / session yok,
- İşletme Ajanı Kaydı panelde izlenemiyor,
- pilot kanal routing çalışmıyor,
- agent kendi işletme bağlamıyla cevap veremiyor,
- toplanan bilgi profile/göreve/çıktıya dönüşmüyor,
- riskli işler approval'a düşmüyor.

### P1 — Bir Sonraki Pilottan Önce Düzeltilmesi Gereken Ciddi Sorun

P1 hatalar çekirdeği tamamen bozmaz; ancak yeni pilottan önce sahipli düzeltme planı ister.

P1 örnekleri:

- agent çok uzun veya karmaşık sorular soruyor,
- ilk değer çok geç oluşuyor,
- web preview çok zayıf ama üretilebiliyor,
- admin panel durumu gösteriyor ama dağınık,
- manuel operasyon maliyeti beklenenden yüksek,
- eksik/görev ayrımı karışıyor,
- approval ile task karışıyor,
- kurulum özeti eksik kalıyor.

### P2 — Kabul Edilebilir Küçük Eksik

P2 eksikler MVP içinde kabul edilebilir.

P2 örnekleri:

- preview tasarımı estetik olarak zayıf,
- fotoğraf yok ama medya talebi var,
- hizmet listesi 1 kalemle başladı,
- QR görseli üretildi ama basılmadı,
- setup summary manuel düzeltme istedi,
- bazı admin aksiyonları manuel.

## 21.9 Tamamlandı Checklist'i

### Teknik Çekirdek

- [ ] Test işletmesi oluşturuldu.
- [ ] Gerçek OpenClaw İşletme Ajanı oluşturuldu.
- [ ] Ayrı workspace oluşturuldu.
- [ ] Ayrı agentDir/session kullanıldı.
- [ ] İşletme Ajanı Kaydı panelde görünüyor.
- [ ] Pilot kanal binding yapıldı.
- [ ] Yetkili kullanıcıdan gelen mesaj doğru agent'a gitti.
- [ ] Yetkisiz/yanlış kullanıcı gerçek agent'a ulaşamadı.
- [ ] Agent kendi işletme bağlamıyla cevap verdi.
- [ ] Agent yalnız izinli EsnafDigital API tool'larını kullandı.

### Bilgi Toplama ve Operasyon

- [ ] Agent işletme adını/gösterim adını netleştirdi.
- [ ] Kısa işletme açıklaması aldı.
- [ ] İletişim bilgisi aldı.
- [ ] En az 1 hizmet/ürün/kategori aldı.
- [ ] Bilgiler profile taslak olarak yazıldı.
- [ ] Eksik bilgiler listelendi.
- [ ] Gerekli görevler oluşturuldu.
- [ ] Fotoğraf/medya eksikse medya talebi açıldı.
- [ ] Kurulum özeti oluşturuldu.

### İlk Görünür Çıktılar

- [ ] Web vitrini taslağı/preview oluştu.
- [ ] Arama/mesajlaşma/yol tarifi bağlantıları taslaklandı.
- [ ] Basit hizmet/ürün listesi oluştu.
- [ ] Dinamik kısa link / QR hedef taslağı oluştu.
- [ ] Eksik medya/fotoğraf durumu görünür.
- [ ] Müşteri ilk görünür değeri görebildi.

### Güvenlik ve Onay

- [ ] API tenant scope'u Agent Kaydı üzerinden doğrulandı.
- [ ] Body `business_id` mismatch reddedildi veya test edildi.
- [ ] Denylist tool'lar kapalı.
- [ ] Riskli işlem otomatik yapılmadı.
- [ ] Riskli istek `approval_request` olarak oluştu.
- [ ] Tool çağrıları audit log'a yazıldı.
- [ ] Pause / kill switch test edildi.
- [ ] Workspace'e secret yazılmadı.

### Admin Panel

- [ ] Project OS sıcak işleri gösteriyor.
- [ ] Businesses listesi agent/setup/output durumlarını gösteriyor.
- [ ] Business Detail blokları okunabilir.
- [ ] İşletme Ajanı Kaydı kartı görünüyor.
- [ ] Görevler/eksikler/onaylar/audit ayrışıyor.
- [ ] İlk dijital çıktılar aynı blokta izleniyor.
- [ ] Sıradaki adım panelden anlaşılabiliyor.

### Müşteri Değeri

- [ ] İşletme sahibi panel kullanmadan bilgi verebildi.
- [ ] Agent soruları kısa ve anlaşılır sordu.
- [ ] İşletme sahibi eksikleri anlayabildi.
- [ ] Web/hizmet/QR taslaklarını değerli buldu.
- [ ] Özel işletme ajanı fikri anlaşıldı.
- [ ] Müşteri bir sonraki adıma istekli.

## 21.10 Pilot Sonu Karar Seçenekleri

Pilot sonunda tek karar `başarılı / başarısız` olmamalıdır.

Karar seçenekleri:

- **Geçti — aynı kapsamla ikinci pilota geç**
- **Kısmi geçti — önce küçük düzeltme yap**
- **Teknik geçti, müşteri değeri zayıf**
- **Müşteri değeri var, güvenlik eksik**
- **Operasyon çok ağır**
- **Başarısız — çekirdek yeniden tasarlanmalı**

İlk pilot sonunda hedef, geniş üretime geçmek değil; aynı sınırlı MVP kapsamıyla ikinci pilot işletmeye geçilip geçilemeyeceğine karar vermektir.

## 21.11 Bir Sonraki Pilota Geçiş Kriteri

Aynı kapsamla ikinci pilot müşteriye geçmek için:

- P0 bloklayıcı hata olmamalı,
- tenant/security ihlali olmamalı,
- yanlış routing olmamalı,
- onaysız canlı/riskli işlem olmamalı,
- kritik tool'larda audit coverage tam olmalı,
- web/hizmet/shortlink taslakları oluşmuş olmalı,
- admin panelden durum okunabilir olmalı,
- müşteri değeri net pozitif olmalı,
- manuel operasyon görünür ve kabul edilebilir olmalı,
- P1 maddeler sahipli ve sınırlı düzeltme planına bağlanmış olmalı.

Ana prensip:

> Başarı, her şeyi otomatik yapmak değil; gerçek işletme ajanı modelinin güvenli, izlenebilir, operasyonel ve müşteriye değer üreten şekilde çalıştığını kanıtlamaktır.
