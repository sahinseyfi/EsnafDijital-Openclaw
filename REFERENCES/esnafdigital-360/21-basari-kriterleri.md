> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardi sanal isletme ekibi / karar destek kanitini icerecek sekilde guncellendi.

---

# 21. Başarı Kriterleri

İlk aşamada başarı, tüm modüllerin tam otomatik olmasıyla ölçülmemelidir. MVP'nin başarısı, işletme agent modelinin gerçekten çalışıp çalışmadığı ve işletme sahibine karar destek değeri üretip üretmediğiyle ölçülmelidir.

Nihai kabul cümlesi:

> EsnafDigital 360 MVP başarılı sayılır, eğer tek test işletmesi için gerçek işletme ajanı modeli güvenli, izlenebilir, operasyonel, karar destekli ve müşteriye değer üreten şekilde baştan sona çalıştığını kanıtlarsa.

Başarı beş grupta ele alınır:

1. teknik başarı,
2. operasyonel başarı,
3. karar destek başarısı,
4. güvenlik başarısı,
5. ürün / müşteri değeri başarısı.

## 21.1 Başarılı MVP Tanımı

Başarılı MVP şu akışı kanıtlamalıdır:

```text
Tek gerçek veya gerçeğe çok yakın test işletmesi
→ sisteme eklenir
→ gerçek OpenClaw İşletme Ajanı oluşur
→ ayrı workspace / agentDir / session kullanır
→ İşletme Ajanı Kaydı panelden izlenir
→ pilot kanaldan gelen mesaj doğru agent'a gider
→ agent kendi işletme bağlamıyla bilgi ve açık karar toplar
→ bilgiler profile, göreve, eksik listesine, karar notuna ve ilk çıktılara dönüşür
→ en az bir departman bazlı karar destek notu oluşur
→ web vitrini taslağı, hizmet/ürün listesi, kısa link/QR hedef taslağı ve kurulum özeti oluşur
→ riskli işlemler otomatik yapılmaz
→ admin panelden durum, görev, açık karar, onay, audit ve sonraki adım izlenebilir
→ işletme sahibi ajanın işletmeyi anladığını ve yön gösterdiğini görür
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
| Karar destek notu | en az 1 |
| Web preview üretimi | en az 1 |
| Hizmet listesi kalemi | en az 1, ideal 3 |
| Shortlink / QR hedef taslağı | en az 1 |
| Kurulum özeti | en az 1 |

## 21.3 Operasyonel Başarı Kriterleri

MVP operasyonel olarak başarılı sayılmak için şunları göstermelidir:

- ajan temel işletme bilgilerini toplayabiliyor,
- açık karar veya hedef görünür hale geliyor,
- eksik bilgiler görünür hale geliyor,
- toplanan bilgiler işletme bilgi/karar profiline bağlanıyor,
- karar notu görev ve sonraki adımlara bağlanıyor,
- admin panelde açık görevler görünüyor,
- onay gerektiren işler otomatik yapılmıyor,
- operasyon ekibine devredilecek işler ayrılıyor,
- agent status, setup phase, decision status ve output status panelde ayrışıyor,
- bakım veya güncelleme ihtiyacı görev olarak takip edilebiliyor,
- agent durumu ve son aktivite panelden izlenebiliyor,
- her işletme için sıradaki adım okunabiliyor.

Pratik operasyonel eşikler:

| Metrik | Kabul eşiği |
|---|---|
| İşletme profiline yazılan taslak alan | en az 4 alan |
| Açık karar kaydı | en az 1 |
| Karar destek notu | en az 1 |
| Eksik bilgi kaydı | en az 1 anlamlı eksik |
| Açık görev | gerekiyorsa en az 1 |
| Medya/fotoğraf talebi | fotoğraf yoksa oluşturulmuş olmalı |
| Riskli istek | varsa approval'a düşmeli |
| Admin panel okunabilirliği | 1 dakika içinde ne oldu / ne eksik / ne sırada anlaşılmalı |
| Kurulum özeti | oluşmalı veya manuel kaydedilebilmeli |

## 21.4 Karar Destek Başarı Kriterleri

Karar destek başarısı, ajanın işletmeyi sadece dijital profil olarak değil, yönetim bağlamıyla anlayabilmesiyle ölçülür.

MVP karar destek açısından başarılı sayılmak için:

- işletme sahibinden en az bir gerçek karar sorusu alınmalı,
- ajan kararın hangi alanlara girdiğini sınıflandırmalı,
- eksik bilgileri kısa ve uygulanabilir şekilde sormalı,
- en az 3 ilgili departman bakışıyla değerlendirme yapmalı,
- en az 2 seçenek sunmalı,
- riskleri ve onay/uzman kontrolü gereken noktaları belirtmeli,
- net ama bağlayıcı olmayan öneri vermeli,
- sıradaki adımı görev veya takip maddesi olarak kaydetmelidir.

İlk MVP için örnek departman bakışları:

- genel yönetim,
- finans,
- satış/pazarlama,
- operasyon,
- satın alma,
- müşteri hizmetleri.

Ajan karar vermez; karar desteği sağlar.

## 21.5 Güvenlik Başarı Kriterleri

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
- satın alma, ödeme, para transferi, sözleşme, vergi, resmi başvuru ve dış hesap değişikliği yapılmıyor,
- tool çağrıları audit log'a yazılıyor,
- workspace'e parola, token veya credential yazılmıyor,
- pause / kill switch çalışıyor,
- tenant mismatch veya denylist denemesi görünür güvenlik olayı üretiyor.

## 21.6 Ürün / Müşteri Değeri Başarı Kriterleri

MVP, müşteri açısından şu değeri göstermelidir:

- işletme sahibi panel öğrenmeden sürece katılabiliyor,
- mesajlaşma üzerinden bilgi ve karar sorusu verebiliyor,
- ajan kısa, açık ve yönlendirici konuşuyor,
- işletme sahibi hangi bilgilerin eksik olduğunu görebiliyor,
- ajan işletmeyi yalnızca site bilgisi olarak değil, iş bağlamıyla anlıyor,
- karar destek notu işletme sahibine faydalı geliyor,
- toparlanmış işletme özeti doğru geliyor,
- web vitrini taslağı işletmeye özel ilk dijital değer üretiyor,
- hizmet / ürün listesi anlamlı görünüyor,
- QR/kısa link mantığı anlaşılabiliyor,
- kurulum özeti tamamlananları, eksikleri, açık kararları ve sıradaki adımı gösteriyor,
- özel işletme ajanı fikri klasik web/QR işinden ayrışıyor.

Pilot işletme sahibine sorulacak kısa sorular:

1. Bu ajan işletmenizi doğru anladı mı?
2. Karar notu size gerçekten yardımcı oldu mu?
3. Eksik kalan şeyler size net geldi mi?
4. Verdiğiniz bilgiler görünür bir taslağa dönüştü mü?
5. Bu ajanı tekrar bir işletme kararı için kullanmak ister misiniz?

## 21.7 MVP Dışı Sayılacak Eksikler

Aşağıdakiler MVP başarısını tek başına düşürmez:

- web vitrininin canlı yayında olmaması,
- QR hedefinin aktif olmaması,
- NFC / fiziksel materyal olmaması,
- işletmenin kendi WhatsApp hattının bağlanmaması,
- gelişmiş müşteri paneli olmaması,
- gelişmiş katalog / sipariş / teklif olmaması,
- randevu / ödeme / sipariş otomasyonu olmaması,
- gerçek satın alma veya para transferi yapılmaması,
- hukuk/vergi/ruhsat konusunda kesin uzman görüşü verilmemesi.

Bunlar MVP'nin bilinçli sınırlarıdır.

## 21.8 Hata Sınıfları

### P0 — Kesin Bloklayıcı

P0 hata varsa MVP tamamlanmış sayılmaz ve yeni pilota geçilmez.

P0 örnekleri:

- mesaj yanlış işletme agent'ına gidiyor,
- agent başka işletme verisi görüyor,
- tenant mismatch,
- denylist tool çalışıyor,
- agent web yayınlıyor veya QR hedefini onaysız değiştiriyor,
- agent satın alma, ödeme, para transferi, sözleşme veya resmi işlem yapmaya çalışıyor,
- agent hukuki/finansal/vergi/ruhsat alanında kesin ve bağlayıcı karar veriyor,
- audit log yok,
- kill switch / pause çalışmıyor,
- secret workspace'e yazılıyor,
- İşletme Ajanı Kaydı agent'ı izleyemiyor,
- riskli işler approval'a düşmüyor.

### P1 — Ciddi ama Düzeltilebilir

P1 hata ikinci pilottan önce net planla çözülmelidir.

P1 örnekleri:

- karar destek notu fazla genel kalıyor,
- agent çok fazla soru soruyor,
- departman bakışları işletmeye özgü değil,
- web taslağı çok zayıf,
- admin panelde sıradaki adım zor okunuyor,
- approval ile task karışıyor,
- eksik bilgi modeli yetersiz,
- operasyon işi manuel olarak çok ağır.

### P2 — Küçük İyileştirme

P2 hata pilotu durdurmayabilir.

P2 örnekleri:

- metin tonu iyileştirilebilir,
- QR görseli üretildi ama basılmadı,
- ek fotoğraf eksik,
- karar notu formatı daha okunabilir yapılabilir,
- bazı alanlar manuel dolduruldu,
- paket dili netleşmeye ihtiyaç duyuyor.

## 21.9 MVP Tamamlandı Checklist

Teknik:

- [ ] Test işletmesi oluşturuldu.
- [ ] Gerçek OpenClaw İşletme Ajanı oluşturuldu.
- [ ] Ayrı workspace oluştu.
- [ ] Ayrı agentDir ve session store kullanıldı.
- [ ] İşletme Ajanı Kaydı panelde göründü.
- [ ] Pilot mesaj doğru agent'a gitti.
- [ ] Yanlış/yetkisiz sender engellendi.

Operasyon:

- [ ] İşletme bilgi ve karar profiline en az 4 alan yazıldı.
- [ ] En az 1 açık karar kaydı oluştu.
- [ ] En az 1 karar destek notu oluştu.
- [ ] En az 1 eksik bilgi kaydı oluştu.
- [ ] En az 1 görev veya sonraki adım oluştu.
- [ ] Kurulum özeti oluştu.

Dijital çıktı:

- [ ] Web vitrini taslağı oluştu.
- [ ] En az 1 hizmet / ürün / kategori kalemi oluştu.
- [ ] Dinamik kısa link / QR hedef taslağı oluştu.
- [ ] Fotoğraf yoksa medya talebi oluştu.

Güvenlik:

- [ ] Tool allowlist çalıştı.
- [ ] Denylist tool çalışmadı.
- [ ] API tenant scope'u Agent Kaydı üzerinden doğrulandı.
- [ ] Audit log oluştu.
- [ ] Riskli istek `approval_request` olarak oluştu.
- [ ] Agent onaysız public/dış işlem yapmadı.
- [ ] Pause / kill switch test edildi.

Müşteri değeri:

- [ ] İşletme sahibi ajanın işletmesini doğru anladığını söyledi veya doğruladı.
- [ ] Karar destek notu anlaşılır bulundu.
- [ ] Eksik ve sıradaki adım anlaşıldı.
- [ ] İlk dijital taslaklar değerli bulundu.
- [ ] “Bu ajanı tekrar kullanırım” sinyali alındı.

## 21.10 MVP Sonuç Kararı

MVP sonunda karar şu seçeneklerden biri olmalıdır:

1. **Geçti:** Aynı çekirdekle ikinci pilota geçilebilir.
2. **Kısmi geçti:** Küçük düzeltmelerden sonra ikinci pilot denenebilir.
3. **Teknik geçti ama karar destek değeri zayıf:** Sanal işletme ekibi davranışı ve bilgi modeli düzeltilir.
4. **Teknik geçti ama müşteri değeri zayıf:** Akış, çıktı ve konumlandırma düzeltilir.
5. **Müşteri değeri var ama güvenlik zayıf:** Büyütme durur, güvenlik düzeltilir.
6. **Operasyon çok ağır:** Kapsam, paket veya fiyat yeniden ele alınır.
7. **Başarısız:** Ürün çekirdeği yeniden tasarlanır.

Ana prensip:

> P0 bloklayıcı hata olmamalı, tenant/security ihlali olmamalı, karar destek değeri görünmeli, işletme sahibi ilk değeri anlamalı ve sistem güvenli şekilde izlenebilir olmalıdır.
