# Session: 2026-04-23 12:26:58 UTC

- **Session Key**: agent:main:telegram:group:-1003769173846
- **Session ID**: be4db6bc-56d2-40a8-8d74-c1e50754bc13
- **Source**: webchat

## Conversation Summary

user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Thu 2026-04-23 10:07 UTC] Bunları değerlendirmeni istiycem ama önce bana bir değerlendirme promptu lazım. nasıl değerlendirmeni istemeliyim
assistant: Şöyle istemen en temiz yol:

**Kopyala yapıştır prompt**
```text
Sana biraz içerik / dosya / ekran / fikir göndereceğim.

Bunları şu hedefe göre değerlendir:
[hedefi 1 cümleyle yaz]

Değerlendirme çerçeven:
- EsnafDigital’in sade MVP çizgisine uygunluk
- Audit -> Teklif -> Teslimat -> Bakım akışına katkı
- Gereksiz karmaşıklık veya CRM’e savrulma riski
- Uygulanabilirlik
- Kısa vadede gerçek fayda

Her parça için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- next: önerdiğin en mantıklı sonraki adım

En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım

Gerekirse sert ol, gereksiz kibarlık yapma. Genel yorum değil, karar verdiren net değerlendirme yap.
```

Daha iyi sonuç için başına bunu da ekleyebilirsin:

```text
Bağlam:
- şu anki iş: [örn. teklif omurgası / admin ekranı / veri modeli]
- karar ihtiyacı: [neyi netleştirmek istiyorsun]
- sınır: [neyi büyütmek istemiyorsun]
```

İstersen bir de sana **dosya, ekran, fikir, prompt, teklif** için ayrı ayrı daha iyi 4 kısa şablon çıkarayım.
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Thu 2026-04-23 10:14 UTC] hedefimiz hepsi için revrite yazmak olsun değerlendirme çerçevesinde olmaz mı
assistant: Olur ama ben önermem.

Çünkü hedefi baştan **“hepsi için rewrite yaz”** yaparsan, model değerlendirme yerine otomatik metin üretmeye kayar. Bu da iyi olan şeyi bile gereksiz bozabilir.

Daha doğru çerçeve şu:

- önce **değerlendir**
- sonra sadece gereken yerde **rewrite öner**
- istersen yine her parça için “rewrite taslağı” alanı eklenir, ama karar ayrı kalır

En iyi prompt şöyle olur:

```text
Sana biraz içerik / dosya / ekran / fikir göndereceğim.

Bunları şu hedefe göre değerlendir:
[hedef]

Değerlendirme çerçeven:
- EsnafDigital’in sade MVP çizgisine uygunluk
- Audit -> Teklif -> Teslimat -> Bakım akışına katkı
- gereksiz karmaşıklık veya CRM’e savrulma riski
- uygulanabilirlik
- kısa vadede gerçek fayda

Her parça için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyonunu yaz, gerekmiyorsa boş bırak
- next: önerdiğin en mantıklı sonraki adım

İyi olan parçaları zorla yeniden yazma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

Eğer senin gerçek niyetin “ben yine de her şeyin daha iyi yazılmış versiyonunu görmek istiyorum” ise o zaman ayrı prompt kurarız. Ama bu artık **değerlendirme promptu değil, toplu iyileştirme promptu** olur.

İstersen sana şimdi iki net şablon çıkarayım:
1. **değerlendirme odaklı**
2. **toplu rewrite odaklı**
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Thu 2026-04-23 10:16 UTC] her dosya için bunun gibi hazır prompt üret
assistant: Evet. Aşağıya çekirdek dosyalar için tek tek hazır prompt bıraktım.

Bunları direkt başka GPT oturumuna verip değerlendirme alabilirsin.

---

## 1) README.md için

```text
Sana bir `README.md` dosyası vereceğim.

Bunu EsnafDigital bağlamında değerlendir.

Amaç:
Bu README, yeni bir oturumun veya yeni bir ajanın en hızlı şekilde doğru yöne girmesini sağlamalı.

Değerlendirme çerçeven:
- giriş kapısı olarak netlik
- okuma sırası ve yönlendirme kalitesi
- doğru dosyaya yönlendirme başarısı
- tekrar, gürültü veya gereksiz detay
- EsnafDigital’in sade MVP çizgisine uygunluk
- operasyonel fayda

Şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyonu yaz
- next: önerilen tek sonraki adım

Özellikle şuna bak:
README gerçekten onboarding yüzeyi gibi mi çalışıyor, yoksa bilgi yığınına mı dönmüş?
İyi olanı bozma, zayıf olanı düzelt.
```

---

## 2) AGENTS.md için

```text
Sana bir `AGENTS.md` dosyası vereceğim.

Bunu EsnafDigital bağlamında değerlendir.

Amaç:
Bu dosya, ajan davranışını netleştirmeli, işi sonuca götürmeli ve dağılmayı engellemelidir.

Değerlendirme çerçeven:
- ajan için davranış kontratı net mi
- iş akışı uygulanabilir mi
- gereksiz soyutluk veya tekrar var mı
- gerçek üretim odaklı mı
- Audit -> Teklif -> Teslimat -> Bakım akışını destekliyor mu
- CRM’e savrulmayı önlüyor mu

Şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyonu yaz
- next: önerilen tek sonraki adım

Özellikle şuna bak:
Bu dosya ajanın hızını ve netliğini artırıyor mu, yoksa fazla kural yükü mü oluşturuyor?
```

---

## 3) SOUL.md için

```text
Sana bir `SOUL.md` dosyası vereceğim.

Bunu EsnafDigital bağlamında değerlendir.

Amaç:
Bu dosya, ajanın tonunu ve çalışma karakterini belirlemeli ama işi yavaşlatmamalı.

Değerlendirme çerçeven:
- ton net mi
- karakter tarifleri işe yarıyor mu
- yapay veya abartılı dil var mı
- pratik çalışma stilini destekliyor mu
- kısa ve uygulanabilir mi
- EsnafDigital’in sade, güven veren çizgisine uyuyor mu

Şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyonu yaz
- next: önerilen tek sonraki adım

Özellikle şuna bak:
Bu dosya kişilik veriyor mu, yoksa gereksiz rol yapma riski mi oluşturuyor?
```

---

## 4) IDENTITY.md için

```text
Sana bir `IDENTITY.md` dosyası vereceğim.

Bunu EsnafDigital bağlamında değerlendir.

Amaç:
Bu dosya ajanın kim olduğunu, ne iş yaptığını ve ne olmadığını netleştirmeli.

Değerlendirme çerçeven:
- rol tanımı net mi
- sınırlar açık mı
- yanlış beklentileri önlüyor mu
- tekrar veya boş ifade var mı
- operasyonel kararları sadeleştiriyor mu

Şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyonu yaz
- next: önerilen tek sonraki adım

Özellikle şuna bak:
Bu dosya ajanın odak kaybını azaltıyor mu?
```

---

## 5) USER.md için

```text
Sana bir `USER.md` dosyası vereceğim.

Bunu EsnafDigital bağlamında değerlendir.

Amaç:
Bu dosya, kullanıcının rolünü, beklentisini ve iş bölümünü netleştirmeli.

Değerlendirme çerçeven:
- kullanıcı profili net mi
- iş bölümü açık mı
- iletişim tercihleri uygulanabilir mi
- ajanı gereksiz açıklama yükünden kurtarıyor mu
- karar ve eskalasyon noktalarını netleştiriyor mu

Şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyonu yaz
- next: önerilen tek sonraki adım

Özellikle şuna bak:
Bu dosya gerçekten iş birliğini kolaylaştırıyor mu, yoksa genel profil met
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Thu 2026-04-23 10:16 UTC] her dosya için bunun gibi hazır prompt üret
assistant: Olur. Aşağıya mevcut ana dosyalar için hazır promptları bırakıyorum.

## Ortak çıktı formatı
Bunu hepsinde aynı tut:

```text
Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 1) README.md için prompt

```text
Sana bir README.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya yeni oturumu doğru yere sokuyor mu, okuma sırasını net veriyor mu, kaynak hiyerarşisini sade biçimde kuruyor mu, gereksiz tekrar üretmeden doğru dosyaya yönlendiriyor mu?

Değerlendirme çerçeven:
- onboarding netliği
- doğru okuma sırası
- kanonik kaynakların ayrışması
- gereksiz tekrar veya kafa karışıklığı riski
- sade MVP çalışma düzenine uygunluk

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 2) AGENTS.md için prompt

```text
Sana bir AGENTS.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya ajanın çalışma kontratını net kuruyor mu, en küçük gerçek adımla ilerleme disiplinini koruyor mu, bağlam kirliliğini azaltıyor mu ve işi gerçek çıktı üzerinden kapatıyor mu?

Değerlendirme çerçeven:
- görev alma ve yürütme netliği
- done standardının sağlamlığı
- gereksiz teori yerine uygulama odaklılık
- tek aktif görev mantığı
- bağlam hijyeni ve dosya disiplini
- fazla genel kalma veya pratikte işlememe riski

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 3) SOUL.md için prompt

```text
Sana bir SOUL.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya ajanın tonunu ve çalışma karakterini doğru kuruyor mu, fazla yapaylaşmadan güvenilir teknik partner hissi veriyor mu, kısa ve sonuç odaklı kalıyor mu?

Değerlendirme çerçeven:
- ton netliği
- karakterin işe hizmet etmesi
- gereksiz teatral veya kurumsal dil riski
- pratiklik ve sahiplenme dengesi
- kısa konuşup iş bitiren çizgiye uygunluk

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 4) IDENTITY.md için prompt

```text
Sana bir IDENTITY.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya ajanın kim olduğunu ve ne olmadığını yeterince net çiziyor mu, rol sınırını koruyor mu, dağılmayı önlüyor mu?

Değerlendirme çerçeven:
- rol netliği
- sorumluluk alanı açıklığı
- sınır koyma gücü
- gereksiz genişleme veya belirsizlik riski
- ürün, operasyon ve teknik omurgaya uygunluk

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 5) USER.md için prompt

```text
Sana bir USER.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya kullanıcının rolünü, beklentisini, iletişim tercihlerini ve ajanla iş bölümünü net anlatıyor mu?

Değerlendirme çerçeven:
- kullanıcı profili netliği
- iş bölümü açıklığı
- iletişim tercihinin işe etkisi
- karar ve onay noktalarının görünürlüğü
- gereksiz tekrar veya fazla genel kalma riski

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 6) TOOLS.md için prompt

```text
Sana bir TOOLS.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya teknik ortamı, stack sınırını, veri sınırını, otomasyon eşiğini ve gizli bilgi çizgisini yeterince net kuruyor mu?

Değerlendirme çerçeven:
- teknik stack netliği
- MVP sadeliğini koruma gücü
- veri ve operasyon sınırları
- yeni araç/servis ekleme disiplinini koruma
- gizli bilgi hijyeni
- pratikte karar verdirme gücü

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 7) MEMORY.md için prompt

```text
Sana bir MEMORY.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya sadece kalıcı gerçekleri ve zor değişen karar çizgisini mi tutuyor, yoksa günlük detay ve geçici durumla kirlenmiş mi?

Değerlendirme çerçeven:
- kalıcı bilgi kalitesi
- karar çizgisinin netliği
- günlük notlardan ayrışma
- tekrar ve şişme riski
- Audit -> Teklif -> Teslimat -> Bakım omurgasına hizmet etmesi
- uzun ömürlü referans olma gücü

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 8) MEMORY_SUMMARY.md için prompt

```text
Sana bir MEMORY_SUMMARY.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya 1 dakikada yön veren kısa kalıcı özeti veriyor mu, yoksa fazla detayla değerini kaybediyor mu?

Değerlendirme çerçeven:
- özet netliği
- kısa sürede yön verme gücü
- kalıcı çizgiyi taşıma başarısı
- fazla detay veya eksik kritik bilgi riski
- yeni oturum için fayda seviyesi

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 9) HEARTBEAT.md için prompt

```text
Sana bir HEARTBEAT.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya sadece aktif durumu, mevcut blokajı ve sıradaki somut adımı mı tutuyor, yoksa geçmiş iş ve gereksiz açıklamalarla ağırlaşmış mı?

Değerlendirme çerçeven:
- aktif durum netliği
- bu hafta önceliklerin doğruluğu
- sıradaki somut adımın uygulanabilirliği
- blokajların gerçek ve işe yarar olması
- bitmiş işlerin burada gereksiz tutulma riski
- operasyonu ileri taşıma gücü

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

## 10) BOOTSTRAP.md için prompt

```text
Sana bir BOOTSTRAP.md vereceğim.

Bunu EsnafDigital bağlamında değerlendir:
Bu dosya sadece kısa referans işlevi görüyor mu, yeni görev yükü bindirmeden doğru yere yönlendiriyor mu, yoksa gereksiz bir katman mı yaratıyor?

Değerlendirme çerçeven:
- dosyanın gerçekten gerekli olup olmaması
- yönlendirme netliği
- tekrar üretme riski
- onboarding değerine katkısı
- sade repo yapısına uygunluk

Her değerlendirme için şu formatta dön:
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- risk: varsa ana risk
- rewrite: sadece gerekiyorsa daha iyi versiyon
- next: önerilen en mantıklı sonraki adım

İyi olanı zorla bozma. Güçlü olanı koru, zayıf olanı düzelt.
En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

---

İstersen bir sonraki mesajda sana bunun **tek parça master versiyonunu** da yazayım, yani dosya adını değiştirip her dosyada kullanabileceğin tek şablon.
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Thu 2026-04-23 10:18 UTC] Derin-arastirma buradaki dosyalar için istiycez
assistant: Tamam. O zaman promptu **tek dosya yorumu** gibi değil, **dosyayı repo içindeki rolüyle birlikte inceleyen derin araştırma promptu** olarak kurmak lazım.

En doğru ana şablon şu:

```text
Sana EsnafDigital workspace içinden bir dosya vereceğim.

Bu dosyayı tek başına yorumlama. Önce dosyanın repo içindeki görevini anla, sonra ilgili diğer çekirdek dosyalarla birlikte değerlendir.

İnceleme yöntemi:
- önce bu dosyanın amacını çıkar
- sonra gerekiyorsa şu çekirdek dosyalarla çapraz kontrol yap:
  README.md
  HEARTBEAT.md
  MEMORY_SUMMARY.md
  MEMORY.md
  AGENTS.md
  TOOLS.md
- bu dosyanın tekrar üretip üretmediğini, başka bir dosyanın alanına girip girmediğini, aktif durum ile kalıcı hafızayı karıştırıp karıştırmadığını kontrol et
- dosyayı EsnafDigital’in sade MVP çizgisi ve Audit -> Teklif -> Teslimat -> Bakım omurgasına göre değerlendir
- değerlendirmeyi genel teoriyle değil, dosyanın repo içindeki gerçek işlevine göre yap

Değerlendirme ölçütleri:
- bu dosya kendi görevini net yapıyor mu
- doğru yerde mi duruyor
- başka dosyalarla çakışıyor mu
- gereksiz tekrar, bağlam kirliliği veya şişme üretiyor mu
- operasyonu gerçekten hızlandırıyor mu
- sade ve uygulanabilir kalıyor mu

Şu formatta dön:
- fileRole: bu dosyanın repo içindeki doğru rolü
- decision: keep / trim / rewrite
- why: kısa net gerekçe
- overlaps: çakıştığı veya tekrar ettiği dosyalar
- risks: varsa ana riskler
- rewritePlan: sadece gerekiyorsa nasıl sadeleştirilmeli
- rewrite: sadece decision = rewrite ise önerilen yeni metin
- next: önerilen en mantıklı sonraki adım

Kurallar:
- iyi olan parçaları zorla yeniden yazma
- rewrite kararı yoksa tam metin üretme
- dosyayı kendi başına değil, repo sistemi içindeki yeriyle değerlendir
- kısa, net ve karar verdiren yaz
- mümkünse aktif durum, kalıcı hafıza, operasyon referansı ve onboarding rolleri arasındaki sınırları açık söyle

En sonda ayrıca şunları ver:
1. genel değerlendirme
2. en kritik 3 sorun
3. hemen yapılması gereken tek adım
```

Bunu her dosya için kullanabilirsin. Sadece başına şu satırı ekle:

```text
İncelenecek ana dosya: [DOSYA_ADI]
```

İstersen bir sonraki mesajda bunu sana şu dosyalar için tek tek uyarlayayım:
- README.md
- AGENTS.md
- HEARTBEAT.md
- MEMORY.md
- MEMORY_SUMMARY.md
- TOOLS.md

Bu set için deep-research sürümü daha iyi olur.
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Thu 2026-04-23 10:18 UTC] test
assistant: Buradayım, çalışıyor.

İstersen şimdi ilk dosya için deep-research promptunu net çıkarayım.
