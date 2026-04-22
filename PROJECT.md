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

## Ana Operasyon Akışı
1. **Audit** — işletmenin mevcut dijital görünümünü analiz et
2. **Teklif** — ihtiyaca uygun net kapsam üret
3. **Teslimat** — görünen iyileştirmeyi hızlıca hayata geçir
4. **Bakım** — canlılığı ve güncelliği koru

Bu projede tüm ekranlar, veri modeli, kayıt yapıları ve otomasyonlar bu akışı desteklemelidir.

## İlk Pazar Odağı
- **Bölge:** İstanbul Arnavutköy ve çevresi
- **Öncelikli segmentler:**
  - berber
  - güzellik salonu
  - kafe / restoran

## Ürün Omurgası
### 1. Giriş ürünü
**Dijital Görünürlük Kontrolü / Audit**
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
- GPT Pro danışma için bağlamlı prompt üretimi

## MVP Dışı
- yatay ve herkes için genel amaçlı SaaS CRM
- tüm sektörleri aynı anda hedefleyen yapı
- ağır AI / RAG / vector DB katmanları
- stok / tahsilat / gelir-gider modülleri
- çok rollü karmaşık yetkilendirme
- mikroservis mimarisi

## İç Sistem Hedefi
İç sistem tek yerde şu üç şeyi birleştirmelidir:
1. **Operasyonel CRM / Proje Yönetimi** — işletme, görüşme, not, teklif, teslimat ve bakım hattında neredeyiz, sırada ne var, blokaj ne
2. **Bağlam Merkezi** — proje, karar, hafıza, araçlar, dosyalar
3. **Consultation Center** — kararı netleştirip doğru bağlamla danışma brief'i ve prompt üretme

## Admin Panelde Olması Gereken Ana Sayfalar
### Faz 1 cekirdek yuzeyler
- Dashboard / Ana Sayfa
- Project OS
- Context Center
- GPT Pro Consultation Center
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

## Consultation Center / Prompt Üretim Mantığı
Consultation Center'ın amacı tüm notları toplamak değil; dağınık konuyu karar brief'ine çevirmek, danışma gerekliliğini filtrelemek ve gerekirse güçlü prompt üretmektir.

Prompt üretimi, yalnızca serbest metin alanından gelen talebe göre değil; aşağıdaki bağlamı kullanarak çalışmalıdır:
- proje tanımı
- aktif yol haritası
- güncel heartbeat
- kalıcı hafıza
- ajan kuralları
- kullanıcı tercihleri
- araç ve ortam notları

Amaç, "uzun prompt" üretmek değil; **doğru bağlamı seçen, net hedef veren, uygulamaya dönük güçlü prompt** üretmektir.

Consultation Center sonucu üç yere route eder:
- kullanıcı işi
- teknik ajan işi
- ortak karar

## Teknik Varsayımlar
- **frontend/admin:** Next.js
- **veritabanı:** Postgres
- **ORM:** Prisma
- **sabit bağlam:** Markdown / YAML / JSON
- **küçük otomasyonlar:** cron / basit jobs

## İş Bölümü
- **Kurucu:** satış, saha, teklif doğrulama, yön belirleme, kritik ticari kararlar
- **Ajan / sistem tarafı:** teknik kurulum, admin panel, veri modeli, operasyon akışı, bağlam yönetimi, prompt hazırlık sistemi, dokümantasyon ve bakım
