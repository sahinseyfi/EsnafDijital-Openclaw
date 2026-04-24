# PROJECT.md

## Proje Kimliği
- **Ad:** EsnafDigital
- **Tür:** küçük işletmeler için dijital görünürlük ve güven altyapısı
- **Faz:** iç operasyon sistemi + ilk satılabilir teklif omurgası

## Ana Problem
Türkiye'deki küçük işletmelerin önemli bir kısmı dijitalde ya zayıf temsil ediliyor ya da güven vermeyen bir görünümle yer alıyor. Sorun çoğu zaman yalnızca "site yok" meselesi değil; dağınık bilgi, düşük güven algısı, zayıf görünürlük ve dönüşüme hazırlıksız dijital vitrin sorunu.

## Ana Amaç
Küçük işletmelerin dijitalde daha görünür, daha güvenilir ve daha kolay ulaşılabilir hale gelmesini sağlayan sade, tekrar edilebilir ve büyüyebilir bir hizmet sistemi kurmak.

## Çekirdek Değer Önerisi
EsnafDigital, küçük işletmeye ağır ajans dili değil; hızlı anlaşılır, güven veren ve doğrudan işe yarayan dijital düzen sunar.

## Ilk Is Akisi Omurgasi
1. **On degerlendirme** — isletmenin mevcut dijital durumunu hizlica anlamak
2. **Teklif** — ihtiyaca uygun net kapsam uretmek
3. **Teslimat** — gorunen iyilestirmeyi hizlica hayata gecirmek
4. **Bakim** — canliligi ve guncelligi korumak

Bu akış çıkış omurgasıdır, ama panelin kilitli kalacağı tek hat değildir.
İç sistem, işletmeyle ilgili not, görüşme, aktivite, görev, teklif, teslimat ve bakım işlerini tek yerde toplayan CRM-evrilebilir bir operasyon sistemi olarak kurulacaktır.

## İlk Pazar Odağı
- **Bölge:** İstanbul Arnavutköy ve çevresi
- **Öncelikli segmentler:**
  - berber
  - güzellik salonu
  - kafe / restoran

## Ürün Omurgası
### 1. Giriş ürünü
**Dijital Gorunurluk Kontrolu / On Degerlendirme**
- mevcut dijital görünümün hızlı fotoğrafı
- eksiklerin ve fırsatların sade özeti
- teklif için giriş noktası

### 2. Ana ürün
**Güven Veren Dijital Vitrin**
- tek sayfa profesyonel web sitesi
- harita/profil düzeni
- temel güven unsurları
- QR yorum akışı
- hızlı teslim yaklaşımı

### 3. Devam ürünü
**Bakım / Canlılık / Küçük Güncelleme**
- küçük içerik güncellemeleri
- iletişim ve görünürlük bakımı
- dijital vitrinin ölü kalmamasını sağlama

## MVP Kapsamı
- harita varlığı ve optimizasyonu
- tek sayfa profesyonel web vitrini
- temel güven unsurları
- yorum yönlendirme akışı
- operasyonel kayıtların panelde takibi
- proje ve bağlam yönetimi
- GPT Pro icin baglamli ve dogrudan kullanilabilir prompt uretimi

## MVP Dışı
- bağımsız, yatay ve herkese satılan genel amaçlı SaaS CRM ürünleşmesi
- tüm sektörleri aynı anda hedefleyen yapı
- ağır AI / RAG / vector DB katmanları
- stok / tahsilat / gelir-gider modülleri
- çok rollü karmaşık yetkilendirme
- mikroservis mimarisi

## İç Sistem Hedefi
İç sistem tek yerde şu üç şeyi birleştirmelidir:
1. **CRM-evrilebilir operasyon sistemi** — işletme, görüşme, not, aktivite, görev, teklif, teslimat ve bakım işlerinde neredeyiz, sırada ne var, blokaj ne
2. **Baglam dosyalari** — proje, karar, hafiza, araclar ve kalici referanslar
3. **Prompt Üretimi** — daginik istegi netlestirip dogru baglamla kullanilabilir prompt uretme

## Admin Panelde Olması Gereken Ana Sayfalar
### Faz 1 cekirdek yuzeyler
- Dashboard / Ana Sayfa
- Project OS
- GPT Pro Prompt Üretimi
- Hesap Merkezi

### Faz 1 icindeki operasyon alt yuzeyleri
- Businesses
- Audits
- Offers
- Delivery / Bakim

Not: Bu dort operasyon alani ilk fazda `Project OS` icinde baslayabilir, ancak ihtiyac halinde ayri CRM/detail yuzeylerine ayrilmasi artik acik bir yon secenegidir.

### Sonraki asama
- Business Detail
- Activity / note / next step timeline
- Gerekirse ayrik filtreli liste yuzeyleri
- Gorev ve takip yuzeyleri

## Prompt Üretimi / Prompt Üretim Mantığı
Prompt Üretimi'nin amacı tum notlari toplamak degil; daginik istegi netlestirip dogru baglamla tek parca guclu prompt uretmektir.

Prompt üretimi, yalnızca serbest metin alanından gelen talebe göre değil; aşağıdaki bağlamı kullanarak çalışmalıdır:
- proje tanımı
- aktif yol haritası
- güncel heartbeat
- kalıcı hafıza
- ajan kuralları
- kullanıcı tercihleri
- araç ve ortam notları

Amac, "uzun prompt" uretmek degil; **dogru baglami secen, net hedef veren, dogrudan kullanilabilir guclu prompt** uretmektir.

Bu yuzeyin isi prompt uretiminde biter.
Cevap toplama, karar yazma veya aksiyon takibi baska yuzeylerde cozulur.

## Teknik Varsayımlar
- **frontend/admin:** Next.js
- **veritabanı:** Postgres
- **ORM:** Prisma
- **sabit bağlam:** Markdown / YAML / JSON
- **küçük otomasyonlar:** cron / basit jobs

## İş Bölümü
- **Kurucu:** satış, saha, teklif doğrulama, yön belirleme, kritik ticari kararlar
- **Ajan / sistem tarafı:** teknik kurulum, admin panel, veri modeli, operasyon akışı, bağlam yönetimi, prompt hazırlık sistemi, dokümantasyon ve bakım
