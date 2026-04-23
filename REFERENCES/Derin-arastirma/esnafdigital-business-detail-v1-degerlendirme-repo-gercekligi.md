# EsnafDigital Business Detail V1 Degerlendirmesi

## Ozet ve yon

**1. Kisa ozet**

- Birincil kaynak olan `/root/.openclaw/workspace/REFERENCES/business-detail-v1.md` dosyasina bu oturumdan dogrudan erisemedim. Container tarafinda bu yol yoktu; GitHub repoya erisebildim ama hedef spec dosyasinin exact sayfasini araclarla acamadim. Bu nedenle mevcut dokumanin icerigini uydurmuyorum ve satir satir redline yapmiyorum.
- Erişebildiğim repo gerçekliği, EsnafDigital’i küçük işletmeler için “dijital görünürlük ve güven altyapısı” olarak tarif ediyor ve çekirdek akışı net biçimde `audit -> teklif -> teslimat -> bakım` çizgisine oturtuyor. Bu akışın tüm ekranlar, veri modeli ve otomasyonlar için omurga olması isteniyor. citeturn40view3turn28view0
- Aynı repo, MVP dışında “genel amaçlı CRM”i açıkça dışarıda bırakıyor; ayrıca `Businesses`, `Audits`, `Offers`, `Delivery/Bakım` hatlarının ilk fazda ayrı üst seviye CRM sayfaları olarak değil, önce `Project OS` içinde ele alınması gerektiğini söylüyor. Business Detail de bu omurgadan sonra açılacak sonraki aşama yüzeyi olarak geçiyor. citeturn40view0turn29view3turn29view0
- Roadmap ve heartbeat, bugün gerçek implementasyon omurgasının artık soyut fikir değil; `businesses`, `audits`, `offers`, `delivery_projects` Prisma modelleri, db-or-mock servis katmanı ve ilgili CRUD route’ları ile açıldığını gösteriyor. Yani V1’in veriyi yeniden icat etmesi değil, bu omurgayı daha hızlı okunur hale getirmesi gerekiyor. citeturn30view0turn30view1turn39view0
- Audit tarafında da zemin yeterince dar: beş ağırlıklı boyutlu bir scorecard zaten var. Harita varlığı/doğruluğu, güven sinyalleri, web vitrini, dönüşüm hazırlığı ve içerik güncelliği gibi sınırlı ama işletmeye yakın sinyaller tanımlanmış durumda. Bu V1 için yeterli; spece geniş bir “her şeyi analiz et” sistemi eklemek gereksizdir. citeturn32view0
- Teklif omurgası da benzer biçimde dar ve işe yarar: ücretsiz audit/demo giriş noktası, ana kurulum paketleri, içerik devamı ve ayrı bakım hizmeti. Bu yapı Business Detail’in “paket tavsiye / aktif teklif / teslimat durumu” üçgenine odaklanabileceğini, ajans menüsü gibi sonsuz kombinasyonlara gitmemesi gerektiğini gösteriyor. citeturn37view0
- Bu yüzden benim net kararım incremental düzeltme değil, daraltılmış bir **rewrite**. Doğru V1; tek işletmede kanonik kayıt, son audit snapshot’ı, aktif teklif/teslimat durumu, sınırlı dış sinyal snapshot’ı ve bir tane net “sonraki en mantıklı adım” göstermelidir. Project OS, Context Center ve Prompt Üretimi fonksiyonlarını bu sayfaya taşımak, hem repo gerçekliğine hem de ürün hedefine ters düşer. citeturn38view0turn29view3turn39view0

**2. Genel karar**

- **Karar: rewrite.**
- Bunun birinci nedeni erişim problemi değil; repo gerçekliğiyle uyum ihtiyacı. Repo, Business Detail’i mevcut operasyon omurgası kurulduktan sonra açılacak kanonik yüzey olarak konumluyor. Eğer mevcut spec bunun üstüne ayrı bir mini-OS, CRM veya context duvarı kuruyorsa, yön sapmıştır. citeturn29view0turn30view0turn39view0
- İkinci neden, sınırların zaten belgelenmiş olması. `Project OS` sıcak operasyon yüzeyi; `Context Center` kaynak ve referans seçimi; `Prompt Üretimi` ise yalnizca prompt hazirlama yuzeyi. Business Detail bunların yerine geçmemeli. citeturn29view3turn39view0
- Üçüncü neden, repo seviyesinde tek-kanonik-yer disiplini var. README açıkça “aynı bilgi iki kanonik dosyada yaşamasın” ve “yeni dosya açmadan önce mevcut kanonik yeri kontrol et” diyor. Bu, Business Detail’in veri sahibi olmak yerine kanonik kaydı **okunur ve yönetilebilir** kılması gerektiği anlamına gelir. citeturn38view0turn38view1turn38view2
- Dördüncü neden, mevcut küçük işletme MVP’sinin zaten yeterince dar olması. Audit scorecard, teklif paketleri ve ilk segment odağı Business Detail’i dar bir karar yüzeyi olarak tasarlamak için yeterli veri veriyor; buna rağmen daha geniş bir sayfa tasarlamak ürün savrulması olur. citeturn40view3turn32view0turn37view0
- Beşinci neden, implementasyon gerçekçiligi. Ayrı bir admin Next.js uygulaması, systemd servisi, db-or-mock katmanı ve Prisma omurgası zaten yayında. Bu zeminde en gerçekçi hamle, yeni soyut sistemler değil, mevcut kayıtları tek işletme seviyesinde hızlı karar ekranına dönüştürmektir. citeturn30view2turn30view1

## Korunacak cekirdek ve riskler

**3. En guclu kisimlar**

_Birincil spec dosyasını göremediğim için burada “mevcut dokümandaki güçlü kısımlar”ı değil, korunması gereken çekirdek omurgayı listeliyorum._

- **Audit -> Teklif -> Teslimat -> Bakım hattı korunmalı.** Bu, hem proje kimliğinde hem teklif omurgasında hem roadmap’te tekrar eden en tutarlı çizgi. Business Detail bu hattın tek işletme seviyesindeki okunur arayüzü olmalı. citeturn40view3turn37view0turn30view0
- **Genel CRM’i dışarıda tutma disiplini korunmalı.** Repo hem MVP dışı listesinde genel CRM’i açıkça reddediyor hem de heartbeat’te CRM’e kaymayı özel risk olarak yazıyor. Bu, ürün savrulmasına karşı en değerli koruma. citeturn40view0turn39view0
- **Project OS önce, Business Detail sonra yaklaşımı korunmalı.** Çünkü Project OS zaten aşama öncelikli, sıcak iş yüzeyi olarak şekilleniyor; Business Detail bunu tek işletme seviyesinde tamamlayan yüzey olmalı, yerine geçen değil. citeturn29view3turn30view0turn39view0
- **Mevcut typed veri omurgası korunmalı.** `businesses`, `audits`, `offers`, `delivery_projects` modelleri ve CRUD hatları açılmışken yeni uydurma veri yapıları eklemek yerine bu çekirdek üstünde okunabilirlik artırılmalı. citeturn30view1
- **Audit scorecard’ın dar kapsamı korunmalı.** Beş boyutlu skor kartı, Business Detail’in neye bakması gerektiğini zaten belirliyor; özellikle Maps, güven sinyalleri, web vitrini, dönüşüm hazırlığı ve güncellik eksenleri V1 için yeterli. citeturn32view0
- **Teklif paket disiplininin sınırlı yapısı korunmalı.** Paket 0’dan bakım hattına uzanan dar teklif sistemi, sayfada “her iş için sonsuz not” yerine “hangi paket / hangi aşama / neden şimdi” sorularını görünür kılmak için iyi bir temel veriyor. citeturn37view0

**4. En problemli kisimlar**

_Birincil spec dosyasını görmediğim için aşağıdakiler “belgede kesin var” iddiası değildir. Bunlar, bu specte görünürse doğrudan kesilmesi gereken problem sınıflarıdır._

- **Tekrarlar**
  - Business Detail içinde tekrar bir aşama boru hattı, queue özeti veya çoklu işletme işi görünümü açmak hatalı olur; bunlar zaten `Project OS`’ın işi. Aynı operasyon bilgisini iki yüzde yaşatmak, repo’nun kanonik-yer disiplinine ters düşer. citeturn29view3turn38view0
  - Context kaynak matrisi, prompt brief yapısı veya prompt rotası ana sayfaya taşınırsa sayfa karar yüzeyi olmaktan çıkar ve yan yüzeyleri kopyalamaya başlar. Repo bu yüzeyleri zaten ayrı amaçlarla tanımlamış durumda. citeturn29view3turn39view0
- **Fazla erken acilan kisimlar**
  - Bakım/canlılık katmanını V1 Business Detail’in merkezine almak erken. Roadmap bunu 60–90 gün katmanı olarak görüyor; ilk önce audit/teklif/teslimat görünürlüğü isteniyor. citeturn30view0
  - Deep scrape’i varsayılan davranış yapmak da erken olur. Verdiğin ürün ilkeleri zaten light scrape default, deep scrape opt-in diyor; repo tarafında da MVP dışı listesi ağır AI/RAG tarzı genişlemelere kapıyı kapatıyor. citeturn40view0
- **Belirsiz kontratlar**
  - “Kanonik bilgi” ile “dış snapshot” birbirine karışırsa sessiz override riski doğar. Bu sayfada en kritik kontrat, operator-edited iç kaydın tek gerçek olması; dış verinin sadece sinyal ve uyuşmazlık üretmesidir.
  - Audit sonucu mutasyona açık kanonik kayıtla karıştırılırsa hangi şeyin “değerlendirme”, hangi şeyin “gerçek kayıt” olduğu bozulur. Özellikle audit immutable snapshot, business mutable truth olarak ayrılmalı.
- **UX riskleri**
  - Above the fold’e çok fazla kart, uzun timeline, not yığını ve yan-sistem özeti koymak operator karar hızını öldürür. Repo zaten home ekranını “sistem anlatısından aktif iş ve kritik aksiyon yüzeyine çekme” hedefini yazıyor; Business Detail’in bundan daha kötü olması kabul edilemez. citeturn30view0turn39view0
  - “Sonraki adım” görünmüyorsa sayfa başarısızdır. Heartbeat, Prompt Üretimi’da bile workflow guidance kartı ve sonraki adım önerisini görünür hale getirmiş; Business Detail’in bundan daha bulanık olması yanlış olur. citeturn39view0
- **Urun savrulma riskleri**
  - Repo bunu açıkça adlandırıyor: MVP’nin genel CRM’e kayması. Business Detail’i notlar, aktiviteler, görevler, kişi ilişkileri, sonsuz timeline ve belge duvarına çevirmek doğrudan bu riski gerçekleştirir. citeturn39view0turn40view0

**5. Eksik kritik kararlar**

_Aşağıdaki kararlar repo gerçekliğinde görünür veri omurgası açılmış olmasına rağmen Business Detail V1 için ayrıca netleştirilmesi gereken karar setidir. citeturn30view1turn30view0turn29view0_

- **Eksik urun kararlari**
  - Sayfanın tek başarı tanımı ne: “işletmeyi anlamak” mı, “aksiyon seçmek” mi, “kayıt düzenlemek” mi? Benim önerim: 30–60 saniyede tek sonraki aksiyonu seçtirmek.
  - İşletme aşama modeli ne: `lead`, `audit_pending`, `audited`, `offer_draft`, `offer_sent`, `delivery_active`, `maintenance`, `closed` gibi sınırlı bir enum mu olacak?
  - Primary CTA hangi kuralla belirlenecek? “Audit yoksa audit aç”, “audit var offer yoksa teklif oluştur”, “delivery aktifse delivery’ye git” gibi deterministic kurallar yazılmalı.
  - Sayfada paket önerisi gösterilecek mi, yoksa sadece mevcut/son teklif mi gösterilecek? Küçük işletme MVP’si için ikisi birden değil; “son teklif” ve gerekiyorsa “önerilen bir sonraki paket” yeterlidir.
  - Uyuşmazlık badge’i bilgi verici mi olacak, bloklayıcı mı? Mesela telefon numarası mismatch’i primary CTA’yı “kanonik kaydı düzelt”e çevirebilir mi?
  - Sayfa tam ekran edit yüzeyi mi, yoksa karar+eylem yüzeyi mi? Benim önerim ikincisi.

- **Eksik veri kontrati kararlari**
  - `business` kaydının sahibi hangi alanlar? Ad, kategori, telefon, adres, saatler, segment, owner, stage, iç notlar gibi çekirdek alanlar dış veriden asla override edilmemeli.
  - `audit` kaydı immutable mı? V1’de evet olmalı; audit yeni run ile yenilenmeli, eski audit sessizce mutasyona uğramamalı.
  - `external snapshot` alanında hangi alanlar tutulacak? Minimum: maps profile presence, rating/review count, website exists, instagram exists, last checked time, source URL/reference, mismatch flags.
  - “Aktif teklif” ve “aktif teslimat” seçimi hangi kuralla yapılacak? Son oluşturulan mı, son güncellenen mi, açık durumdaki mi? Bu kurallar yazılmalı.
  - `derived next step` nerede hesaplanacak? UI’da değil, server tarafında deterministik olarak hesaplanmalı.
  - Alan düzeyinde provenance zorunlu mu? En azından external snapshot ve mismatch alanlarında evet.

- **Eksik implementation-boundary kararlari**
  - Business Detail mevcut `Project OS` CRUD route’larını mı reuse edecek, yoksa yeni detail-specific API mi üretecek? Benim önerim: mevcut CRUD’ları koru, detail için read-optimized aggregate endpoint ekle.
  - Route konumu ne olacak? Ayrı top-level modül yerine Project OS içinden açılan tek-işletme detail daha doğru.
  - Light scrape ne zaman ve nasıl tetiklenecek? Manuel “refresh snapshot” aksiyonu ile; sessiz background overwrite ile değil.
  - Deep scrape ne zaman açılacak? Ana sayfada default değil; drawer üzerinden açık opt-in aksiyonu olarak.
  - Consultation ve Context verileri ne kadar görünür olacak? Sadece gerekiyorsa link-out veya küçük referans; ana veri yığını bu sayfaya taşınmamalı.
  - Timeline’ın veri kaynağı ne olacak? V1’de tam event log değil; yalnızca son audit, son teklif, aktif delivery, son light scrape gibi kompakt olaylar.

**6. Fazla olan kisimlar**

- **Bakım / canlılık operasyonunu ana gövdeye almak** erken. Roadmap bunu sonraki katman olarak görüyor; Business Detail V1 bunu ancak küçük bir durum etiketi veya link olarak taşımalı. citeturn30view0
- **Tam CRM activity timeline** erken. Repo hem genel CRM’i MVP dışı sayıyor hem de CRM drift’i aktif risk olarak yazıyor. Uzun event geçmişi ayrı bir yüzeye kalsın. citeturn40view0turn39view0
- **Consultation sonuçlarını ve prompt üretim akışını Business Detail içine yığmak** erken ve yanlış. Prompt Üretimi zaten ayrı ürün yüzeyi olarak tanımlı ve ciddi biçimde çalışır durumda. citeturn29view3turn39view0
- **Deep scrape, çoklu dış kaynak korelasyonu, zengin kanıt galerisi** V1.1 veya V2 konusu. Bugünkü veri omurgası zaten audit, offer ve delivery görünürlüğünü açmaya odaklı. citeturn30view0turn30view1
- **Ayrık filtreli liste yüzeyleri** de erken. `PROJECT.md` bunları Business Detail’den sonra, “gerekirse” diye anıyor; önce detailin kararlı ve hızlı olması gerekir. citeturn29view0
- **Ağır AI/RAG, rol-yetki, mikroservisleşme, finans/modül genişlemesi** doğrudan fazla. Bunların tamamı repo düzeyinde MVP dışı yazılmış durumda. citeturn40view0turn40view1turn40view2

## Onerilen tasarim

**7. Sifirdan daha dogru bilgi mimarisi**

_Bu mimari, mevcut repo sınırlarını ve verdiğin ürün ilkelerini birlikte kabul eder: Project OS sıcak operasyon yüzeyi olarak kalır; Business Detail ise tek işletmede hızlı karar yüzeyi olur. citeturn29view3turn30view0turn39view0_

1. **Header**
   - İşletme adı, segment, owner, stage, son güncelleme zamanı, veri tazelik badge’leri.
   - İlk bakışta “bu işletme kim, kim bakıyor, hangi aşamada” sorusunu kapatır.

2. **Next Step bar**
   - Tek cümlelik durum özeti.
   - Bir tane primary CTA.
   - Gerekirse bir tane secondary CTA.
   - Sayfanın kalbi budur; geri kalan her şey bu barı destekler.

3. **Audit Snapshot**
   - Son audit skoru, beş boyutun kompakt görünümü, en kritik üç boşluk, audit tazeliği.
   - Audit detay kanıtı drawer’da açılır; sayfa ana gövdesi audit raporuna dönüşmez.

4. **Commercial State**
   - Son/aktif teklif, önerilen paket, delivery var mı, bakımda mı gibi ticari-işlemsel durum.
   - Bu blok operatorün “hangi fazdayız” sorusunu ikinci kez cevaplar ama daha iş-akışı açısından cevaplar.

5. **Canonical Business Record**
   - İçeriden düzenlenen gerçek kayıt.
   - Ad, kategori, telefon, adres, saat, kısa işletme notu, iç etiketler, sorumlu kişi.
   - Bu blok sessiz override edilemez.

6. **External Signals Snapshot**
   - Maps, website, Instagram gibi sınırlı dış sinyaller.
   - Tazelik, kaynak ve mismatch badge’leri görünür olur.
   - Detay drawer’da; ana yüzde yalnızca operator kararını etkileyen özet görünür.

7. **Compact Activity strip**
   - Son audit, son offer, aktif delivery, son snapshot refresh.
   - Uzun timeline değil; karar için yeterli dört-beş satırlık özet.

8. **Related surfaces**
   - Project OS, full audit, offer detail, delivery detail, consultation/context link-out.
   - Ana gövdeyi kirletmeden geçiş sağlar.

**8. Sifirdan daha dogru veri kontrati**

_Bu kontrat, mevcut `businesses`, `audits`, `offers`, `delivery_projects` omurgasını baz alır; audit scorecard ve teklif hattı da mevcut dar kapsamı destekler. citeturn30view1turn32view0turn37view0_

- **Hangi veri katmanlari kalmali**
  - `business_canonical`
    - Operator-edited iç gerçek.
    - Kimlik, iletişim, kategori, çalışma bilgileri, stage, owner, iç notlar.
  - `audit_record`
    - Immutable değerlendirme snapshot’ı.
    - Score, dimension breakdown, top gaps, evidence references, created_at.
  - `offer_record`
    - Teklif aşaması ve önerilen/aktif paket bilgisi.
  - `delivery_project`
    - Teslimatın açık/kapalı durumu, owner ve temel ilerleme özeti.
  - `external_snapshot_light`
    - Maps/site/social gibi dış sinyallerin tarih damgalı snapshot’ı.
  - `business_detail_derived`
    - Page-computed view model: next_step, stale flags, mismatch summary, header badges.

- **Hangileri birlesmeli**
  - Header badge’leri, freshness uyarıları, risk etiketleri ve “next step” ayrı ayrı manual alanlar olmamalı; `business_detail_derived` içinde hesaplanmalı.
  - “Audit summary” ayrı datastore olmamalı; son `audit_record` üzerinden türetilmeli.
  - “Commercial summary” ayrı tablo olmamalı; aktif `offer_record` + aktif `delivery_project` üzerinden türetilmeli.

- **Hangileri sonraya kalmali**
  - `external_snapshot_deep`
  - Zengin scrape artifact galerileri
  - Tam activity event log
  - Bakım/canlılık çalışma kayıtları
  - Consultation çıktı özetlerinin Business Detail içinde gömülü tutulması

- **Canonical / external / derived ayrimini netlestir**
  - **Canonical**: operatör değiştirir; sistem sessizce değiştirmez.
  - **External**: kaynak ve zaman damgasıyla tutulur; kanoniğe sadece uyuşmazlık sinyali verir.
  - **Derived**: her render’da veya endpoint içinde hesaplanır; kalıcı gerçek gibi davranılmaz.
  - **Audit**: external’ın “ham verisi” değil; belirli zamandaki değerlendirme kaydıdır. Bu yüzden hem canonical’dan hem raw external snapshot’tan ayrıdır.

**9. Daha net V1 siniri**

_Bu sınır, Project OS’un sıcak hat olarak kalması, Business Detail’in tek işletmede kanonik yüzey olması ve CRM drift’inin önlenmesi için çizildi. citeturn29view3turn39view0turn40view0_

- **Sayfada kesin kalacaklar**
  - İşletme kimliği, stage, owner, freshness
  - Next step + primary CTA
  - Son audit özeti
  - Aktif teklif / teslimat özeti
  - Kanonik işletme kaydı
  - Light external snapshot + mismatch badge’leri
  - Kompakt son olaylar şeridi

- **Drawer/modal olacaklar**
  - Kanonik kayıt düzenleme
  - Full audit evidence / dimension detayı
  - Teklif detay / düzenleme
  - Delivery detay / düzenleme
  - Light scrape refresh
  - Conflict detail
  - Opt-in deep scrape tetikleme

- **Ayri yuzeye tasinacaklar**
  - Çoklu işletme queue ve aşama görünümü
  - Consultation hazırlama / prompt / sonuç
  - Context source matrix / dosya seçim yüzeyi
  - Tam delivery project management
  - Bakım/canlılık operasyon ekranı
  - Ayrık filtreli detay listeleri
  - Uzun history/activity duvarı

**10. Dusuk sadakatli UI wireframe**

- Desktop-first.
- Above the fold tek hedef: işletmenin durumu + sonraki adım.
- Üst bloklar full width; gövde 2 kolon; timeline altta full width.
- Primary action tek tane; secondary’ler küçük.
- Düzenleme ve detaylar drawer/modal’da; ana sayfa rapor mezarlığına dönmüyor.

```text
[Header: Business name | Stage | Owner | Freshness | Mismatch badges]

[Next Step: "Bu isletmede simdi en mantikli adim ..."] [Primary CTA]
[Secondary: Edit Canonical] [Secondary: Refresh Light Scrape]

[Audit Snapshot: Score | 5 dimension chips | Top 3 gaps | Audit freshness]

[Left column: Canonical Business Record]
- Name / category / phone / address / hours
- Internal note
- Package recommendation / latest offer
- Edit action

[Right column: External Signals Snapshot]
- Maps presence / review count / rating
- Website exists / status
- Instagram exists / last checked
- Conflict summary
- Open details drawer

[Commercial State]
- Latest offer status
- Delivery active?
- Maintenance flag
- Open offer / Open delivery

[Timeline]
- Last audit
- Last offer update
- Last delivery update
- Last light scrape
```

## Yeni kanonik dokuman

**11. Tam rewrite**

_Aşağıdaki metin, mevcut doküman yerine geçecek şekilde sıfırdan yazılmış öneri kanonik dokümandır._

**Business Detail V1**

Business Detail, tek bir işletme için kanonik kontrol yüzeyidir. Bu yüzeyin amacı, operatörün 30–60 saniye içinde işletmenin mevcut durumunu anlaması ve bir sonraki en mantıklı aksiyonu seçmesidir.

Business Detail bir CRM duvarı değildir. Project OS’un queue ve sıcak operasyon işini devralmaz. Context Center’ın kaynak matrisi veya Prompt Üretimi’nin prompt hazirlama akislarini da içine çekmez. Bu yüzeyin işi, tek işletmede doğru bilgi hiyerarşisi kurmak ve aksiyon seçimini hızlandırmaktır. Repo düzeyindeki ürün çizgisi zaten genel CRM’i MVP dışı saymakta, sıcak operasyonu önce Project OS içinde tutmakta ve Business Detail’i bunun üstüne gelen kanonik tek-işletme yüzeyi olarak konumlamaktadır. citeturn40view0turn29view0turn30view0turn39view0

**Amac**

Bu sayfa şu dört soruyu hızlıca cevaplamalıdır:

- Bu işletme şu anda hangi aşamada?
- İç kanonik kayıtta kritik eksik veya çelişki var mı?
- Son audit bize ne söylüyor?
- Şimdi yapılması gereken tek doğru aksiyon ne?

Bu sayfa şu soruları ana yüzde çözmeye çalışmamalıdır:

- Tüm işletmeler arasında bugün en sıcak iş hangisi?
- Hangi prompt kaydi nasıl hazırlanacak?
- Hangi dosya veya referans seti seçilmeli?
- Teslimat operasyonunun tam detay planı nedir?
- Bu işletme ile ilgili bütün geçmiş notlar nelerdir?

Bu soruların yeri başka yüzeylerdir.

**Basari olcutu**

V1 başarılı sayılır, eğer bir operatör bu sayfayı açtıktan sonra bir dakikadan kısa sürede aşağıdakileri söyleyebiliyorsa:

- işletmenin kim olduğunu,
- hangi aşamada olduğunu,
- son audit’in ne dediğini,
- aktif teklif veya teslimat durumu olup olmadığını,
- dış sinyaller ile iç kayıt arasında önemli bir çelişki olup olmadığını,
- ve şimdi hangi aksiyonun seçilmesi gerektiğini.

**Temel ilkeler**

- İç kanonik kayıt tek gerçektir.
- Dış veri sinyal ve snapshot’tır; kanoniği sessizce override etmez.
- Light scrape varsayılandır.
- Deep scrape açık opt-in aksiyonudur.
- Audit immutable snapshot mantığıyla ele alınır.
- Sayfa karar yüzeyidir; sınırsız içerik konteyneri değildir.
- Aynı bilgi iki farklı kanonik yüzeyde tekrar yaşatılmaz. Repo disiplini zaten bunu açıkça ister. citeturn38view0turn38view1

**Sayfanin ustten alta yapisi**

**Header**

Header aşağıdaki alanları gösterir:

- işletme adı
- segment/kategori
- sorumlu kişi
- yaşam döngüsü aşaması
- son güncelleme zamanı
- freshness badge’leri
- mismatch badge’leri

Header, “işletme kim / kim bakıyor / ne kadar taze / dikkat gereken çelişki var mı” sorusunu tek satırda kapatmalıdır.

**Next Step bar**

Header’ın hemen altında tek bir “Next Step” barı bulunur. Bu bar:

- mevcut durumun kısa özetini verir,
- bir tane primary CTA gösterir,
- gerekirse iki küçük secondary action gösterir.

Primary CTA deterministik kuralla seçilir. Örnek çizgi:

- audit yoksa: `Audit olustur`
- audit var ama kritik kanonik eksik varsa: `Kanonik kaydi duzenle`
- audit var, offer yoksa: `Teklif olustur`
- offer draft ise: `Teklifi gozden gecir`
- offer gönderilmiş ve delivery başlamışsa: `Teslimata git`
- dış snapshot çok bayatsa: `Light scrape yenile`

Sayfada aynı anda üç büyük primary CTA bulunmaz. Tek yüzey, tek önerilen aksiyon.

**Audit Snapshot**

Bu blok son audit kaydını özetler:

- toplam skor
- beş dimension’ın kompakt görünümü
- en kritik üç boşluk
- audit tarihi
- audit detayını açan bir drawer aksiyonu

Audit scorecard’ın mevcut beş boyutu V1 için yeterlidir: harita varlığı/doğruluğu, güven sinyalleri, web vitrini, dönüşüm hazırlığı ve güncellik. V1 bu boyutları yeniden tasarlamaz; mevcut dar omurgayı okur. citeturn32view0

**Commercial State**

Bu blok işletmenin ticari-işlemsel durumunu gösterir:

- aktif teklif var mı
- teklif hangi durumda
- önerilen veya son teklif edilen paket ne
- aktif delivery var mı
- bakım flag’i var mı

Bu blok tam teklif editörü değildir. Teklif detay ve düzenleme drawer veya link-out ile açılır.

**Canonical Business Record**

Bu blok operator-edited gerçek kayıttır. V1’de minimum alan seti şudur:

- işletme adı
- ana kategori / segment
- telefon
- adres
- çalışma saatleri
- kısa iç not
- owner
- stage
- opsiyonel iç etiketler

Bu bloktaki bilgi dış kaynaklardan otomatik değişmez. Sayfada açık “Düzenle” aksiyonu bulunur. Düzenleme drawer’da yapılır.

**External Signals Snapshot**

Bu blok dış sinyalleri özetler. Light scrape için minimum alanlar:

- Google Maps varlığı
- rating ve review count
- website var/yok
- Instagram var/yok
- son kontrol zamanı
- mismatch badge’leri

Bu blok kaynak ve tazelik göstermelidir. Örnek:

- “Maps phone mismatch”
- “Hours stale”
- “Website missing”
- “Instagram exists but inactive”

Bu blok audit yerine geçmez. Bu blok kanonik kaydın da sahibi değildir. Görevi, operatöre dış dünyadaki sinyali kompakt biçimde göstermektir.

**Compact Activity strip**

Sayfa altında kısa bir aktivite şeridi bulunur. Sadece şu olaylar görünür:

- son audit
- son teklif güncellemesi
- aktif delivery güncellemesi
- son light scrape

Uzun activity wall veya her küçük edit geçmişi V1’de yoktur.

**Drawer ve modal kurallari**

V1’de aşağıdaki detaylar drawer/modal’a taşınır:

- kanonik kayıt düzenleme
- full audit evidence
- teklif detay / düzenleme
- delivery detay / düzenleme
- conflict detail
- light scrape refresh
- opt-in deep scrape başlatma

Ana sayfa, bu drawer’ların özet giriş yüzeyidir. Detayın kendisi değildir.

**Veri katmanlari**

V1 şu veri katmanlarıyla çalışır:

- `business_canonical`
- `audit_record`
- `offer_record`
- `delivery_project`
- `external_snapshot_light`
- `business_detail_derived`

`business_detail_derived`, kalıcı gerçek değil; ekranda okunurluk için hesaplanan view modeldir. Burada aşağıdakiler bulunur:

- next step
- stale flags
- mismatch summary
- header badges
- audit freshness state
- commercial summary

**Veri sahipligi ve override kurali**

- `business_canonical` alanlarını sadece operatör değiştirir.
- `external_snapshot_light` kanoniği değiştirmez.
- `audit_record` geçmiş değerlendirmedir; yeni run ile yenilenir, eski audit sessizce üstüne yazılmaz.
- `derived` alanlar düzenlenmez; hesaplanır.
- Eğer external ile canonical çelişiyorsa sistem “uyuşmazlık” gösterir, “sessiz düzeltme” yapmaz.

Bu ayrım yazılı kontrat olarak bulunmalıdır. V1’in en kritik güvenlik ve operasyon disiplini budur.

**Primary action kurali**

Sayfada primary action seçim mantığı deterministik ve görünür olmalıdır. V1 için önerilen basit kural sırası:

1. kritik kanonik eksik varsa önce onu düzelt,
2. audit yoksa audit aç,
3. audit var offer yoksa teklif aç,
4. offer draft ise gözden geçir / gönder,
5. delivery aktifse delivery detayına git,
6. sadece veri bayatlığı varsa light scrape yenile.

Bu sıra birden çok büyük butona izin vermez. Sistem en mantıklı bir sonraki adımı seçer; diğerleri secondary veya drawer aksiyonu olarak kalır.

**Kapsam disi**

V1’de aşağıdakiler yoktur:

- genel CRM activity duvarı
- tam not ve belge arşivi
- prompt ve cevap akışının sayfa içine gömülmesi
- context kaynak matrisi
- deep scrape default akışı
- bakım/canlılık operasyonlarını yöneten tam modül
- ayrı üst seviye Business listeleri ve ağır filtre yüzeyleri
- finans, stok, tahsilat, gelir-gider katmanları
- ağır AI/RAG tabakası
- çok rollü karmaşık yetkilendirme

Bu kapsam dışı çizgi repo’daki MVP sınırıyla da uyumludur. citeturn40view0turn40view1turn40view2

**Implementation sirasi**

Bu V1, yeni evren kurmaz; mevcut omurganın üstüne inşa edilir.

İş sırası şu olmalıdır:

- önce mevcut `businesses`, `audits`, `offers`, `delivery_projects` omurgasından read-optimized aggregate üret,
- sonra header + next step + audit snapshot bloklarını aç,
- sonra commercial state bloğunu bağla,
- sonra canonical business edit drawer’ını aç,
- sonra light external snapshot ve mismatch badge’lerini ekle,
- en son compact activity strip’i bağla.

Deep scrape, bakım modülü veya prompt gömülmesi bu sıraya girmez. Repo heartbeat’i zaten mevcut CRUD ve db-or-mock katmanlarının açıldığını; roadmap ise asıl yakın hedefin audit/teklif/teslimat görünürlüğü olduğunu gösteriyor. citeturn30view1turn30view0turn39view0

**Kabul kriterleri**

V1 tamamlandı sayılır, eğer:

- operator tek işletmede stage’i ilk bakışta anlayabiliyorsa,
- bir tane net primary CTA görebiliyorsa,
- son audit’in özünü sayfadan okuyabiliyorsa,
- aktif teklif/delivery durumu görünürse,
- dış snapshot ile iç kayıt çelişkileri görünürse,
- hiçbir external veri kanoniği sessizce değiştirmiyorsa,
- ve sayfa Project OS, Context Center veya Prompt Üretimi’ı kopyalamıyorsa.

**12. Ustunluk savunmasi**

- **1. daha hizli operator karari**
  - Yeni versiyonun merkezine `Next Step` barını koyuyorum. Bu, “önce durumu anlat, sonra buton ekle” değil; “tek önerilen aksiyonu görünür kıl” yaklaşımı. Repo’nun home için hedeflediği “aktif iş + kritik aksiyon” çizgisiyle uyumlu. citeturn30view0turn39view0
- **2. daha net bilgi hiyerarsisi**
  - Kanonik record, audit snapshot, commercial state ve external snapshot birbirinden ayrıldı. Bu, aynı ekranda “gerçek kayıt / değerlendirme / dış sinyal / türetilmiş öneri” karışıklığını azaltır. Repo’daki tek-kanonik-yer disipliniyle de daha tutarlıdır. citeturn38view0turn38view2
- **3. daha az belirsizlik**
  - Veri kontratını altı net katmana indirdim ve her birine sahiplik kuralı yazdım. En kritik konu olan “external override edebilir mi?” sorusu artık gri alan değil.
- **4. daha dusuk CRM-style scope drift riski**
  - Bu versiyon not duvarı, activity wall, document heap, generic contact/task yapıları açmıyor. Bu, repo’nun hem “genel CRM MVP dışı” çizgisine hem de “CRM’e kayma” risk notuna doğrudan cevap veriyor. citeturn40view0turn39view0
- **5. daha temiz V1 siniri**
  - Bakım/canlılık, deep scrape, prompt gömülmesi ve ayrı liste yüzeyleri net biçimde dışarı alındı. Roadmap’in 30–60 gün ve 60–90 gün ayrımıyla daha uyumlu. citeturn30view0
- **6. daha gercekci implementasyon sirasi**
  - Yeni versiyon mevcut `businesses`, `audits`, `offers`, `delivery_projects` omurgasını ve db-or-mock yaklaşımını reuse ediyor. Yeni soyut sistem icat etmiyor; bugünkü implementasyon gerçekliğine dayanıyor. citeturn30view1turn30view2
- **7. daha dusuk operasyon yuku**
  - Light scrape default, deep scrape opt-in; external sadece snapshot; compact activity strip; drawer-first detay stratejisi. Bunların hepsi veri bakım yükünü, manual temizlik ihtiyacını ve ekran çöpünü düşürür.
- **Zayif kalan yer**
  - Bunu “mevcut belgeye karşı kesin kanıtlanmış üstünlük” diye satmıyorum. Birincil spec dosyasını okuyamadım. Bu yüzden mevcut metnin tam olarak ne kadar iyi ya da kötü olduğunu söyleyemem. Dürüst cümle şu: mevcut dosyayı değil, repo gerçekliği ve verdiğin ürün ilkeleri karşısında en doğru V1’i yeniden kurdum. Eğer mevcut spec zaten benim önerdiğim kadar dar ise, bazı eleştiriler redundant kalabilir. Ama repo’daki sınırlar, riskler ve açık öncelikler düşünüldüğünde, **rewrite yönü** hâlâ incremental iyileştirmeden daha güvenli ve daha doğru görünüyor. citeturn29view0turn30view0turn39view0turn40view0