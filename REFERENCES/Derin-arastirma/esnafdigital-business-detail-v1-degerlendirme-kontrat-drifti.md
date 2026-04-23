# EsnafDigital Business Detail V1 Degerlendirmesi

## Değerlendirme özeti

**1. Kisa ozet**

Verilen `/root/.openclaw/workspace/REFERENCES/business-detail-v1.md` dosyasına bu ortamda doğrudan erişemedim; bu yüzden mevcut dokümanı dürüstçe satır satır değerlendirdiğimi iddia edemem. Aşağıdaki yargı, erişebildiğim repo belgeleri ve mevcut uygulama gerçekliği üzerinden kuruludur. Erişilebilir kaynaklar net bir omurga çiziyor: ürün audit → teklif → teslimat → bakım akışına göre kurulmalı, Project OS sıcak operasyon ve kuyruk yüzeyi olmalı, Business Detail ise bunun üzerinde tek işletme için kanonik yüzey olmalı; ayrıca proje kendisini açıkça genel amaçlı CRM dışına koyuyor. citeturn54view1turn55view1turn45view0

Mevcut Business Detail uygulaması bir şeyi doğru yapıyor: “sıradaki mantıklı hareket”i üstte görünür kılıyor ve dış veri snapshot’ının kanonik kaydı otomatik ezmemesi gerektiğini açıkça söylüyor. citeturn53view0turn26view0 Ancak aynı sayfa şu anda fazla uzun, fazla katmanlı ve karar hızını düşürecek kadar tekrar üretmeye başlamış durumda: header rozetleri, sayı kartları, operasyon özeti, son teklif/teslimat kartları, timeline ve ham alt kayıt tabloları aynı durumun farklı kopyalarını taşıyor. citeturn51view2turn53view0turn27view0

Daha kritik sorun veri kontratında: Prisma `Offer` modeli `addonKeys`, `domainPreference` ve `customDomain` alanlarını taşıyor; ama `ProjectOsDataset` tipi ve servis eşlemesi bu alanları düşürüyor; buna rağmen Business Detail UI bunları okumaya çalışıyor. Bu, doküman-uygulama uyumsuzluğundan daha kötü bir şeydir; doğrudan ürün kontratı kaymasıdır. citeturn33view2turn37view0turn40view0turn40view1turn40view3turn38view2turn38view3

Bu nedenle benim net kararım incremental trim değil, **rewrite**. Çünkü burada ihtiyaç “biraz daha temiz bir ekran” değil; tek işletme başında karar veren operatör için daha sert bilgi hiyerarşisi, daha net veri sahipliği ve daha dar V1 sınırıdır. Eğer erişemediğim asıl doküman zaten bunu söylüyorsa bile, erişilebilir repo gerçekliği bunun şu anda yeterince korunmadığını gösteriyor. citeturn54view0turn55view1turn45view0turn53view0

**2. Genel karar**

**rewrite**

- Mevcut dosyaya erişemediğim için onu “doğru kabul edip hafifçe düzeltmek” dürüst olmaz; kararımı erişilebilir repo gerçekliği üzerinden veriyorum.  
- Proje belgeleri Project OS’u operasyon merkezi, Business Detail’i ise sonraki aşama kanonik yüzey olarak tanımlıyor; bu ayrım korunmalı, bulanıklaştırılmamalı. citeturn54view0turn55view1
- Mevcut Business Detail görünümü aynı yaşam döngüsü bilgisini birden fazla blokta tekrar ediyor; bu, 30–60 saniyede karar verme hedefiyle çelişiyor. citeturn51view2turn53view0turn27view0
- “Kanonik kontrol yüzeyi” olmasına rağmen görünür bir doğrudan düzenleme yolu yok; görünen aksiyonlar Project OS’a geçiş, danışma, bağlam ve discovery refresh etrafında dönüyor. citeturn51view0turn51view2turn51view3turn51view4
- Veri kontratı şimdiden kaymış durumda; bu yüzden V1’i metin düzeyinde yeniden sıkılaştırmadan ekran büyütmek scope drift üretir. citeturn33view2turn37view0turn40view0turn40view3turn38view2

## Korunacaklar ve sorunlar

**3. En guclu kisimlar**

- Audit → teklif → teslimat → bakım omurgası doğru. Proje belgeleri tüm ekranların, veri modelinin ve otomasyonların bu zinciri desteklemesi gerektiğini açıkça söylüyor; bu sağlam bir ürün omurgasıdır. citeturn54view1turn55view1
- Project OS’un ayrı bir sıcak operasyon yüzeyi olarak tanımlanması doğru. Mevcut Project OS sayfası kendisini “kayıt formu duvarı değil” diye tarif ediyor ve kuyruk + daraltılmış hızlı aksiyonlar + kapalı ham kayıtlar düzeni kullanıyor; bu sınır iyi. citeturn45view0turn45view1turn45view2
- Business Detail içinde “Next step” bloğunun görünür ve aksiyon bağlı olması doğru. Stage, status, recommended action ve advance CTA aynı blokta geliyor; bu, sayfanın gerçek işini işaret ediyor. citeturn53view0
- Dış veri snapshot’ının kanonik kaydı otomatik ezmemesi çok doğru bir kural. Sayfa bunu açıkça yazıyor; bu, external signal ile operator truth arasındaki sınırı koruyan en değerli karar. citeturn26view0
- İşletmeye özel kanonik URL fikri doğru. `businesses/[slugAndId]` yapısı ve sayfa içindeki “canonical route” gösterimi, tek kaydın sabit bir adresi olduğunu ima ediyor; bu iyi bir kontrol yüzeyi temeli. citeturn21view0turn26view1

**4. En problemli kisimlar**

- **Tekrarlar:** Header rozetleri, sayı kartları, “operasyon özeti”, “son teklif/son teslimat” kartları ve en alttaki ham tablolar aynı lifecycle bilgisini farklı biçimlerde tekrarlıyor. Bu, bilgi zenginliği değil; tarama maliyetidir. citeturn51view2turn53view0turn27view0
- **Fazla erken açılan kisimlar:** Son teklifin paket detayları, teslimat kapsamı ve tüm audit/offer/delivery tabloları ana sayfa gövdesinde yer alıyor. Operatör daha “şimdi ne yapmalıyım?” sorusunu cevaplamadan ayrıntıya gömülüyor. citeturn26view2turn26view3turn27view0
- **Belirsiz kontratlar:** Dış veri snapshot’ı sayfada var ve refresh ediliyor, ama erişilebilir Prisma şemasında discovery/external snapshot için görünür bir model yok; bu, veri nerede yaşar ve nasıl tazelenir sorusunu açık bırakıyor. Aynı anda offer alanlarında da UI–service–schema drift’i var. citeturn26view0turn33view6turn33view2turn37view0turn40view0
- **UX riskleri:** Sayfa “kanonik işletme bilgisi” gösteriyor ama görünür bir “düzenle” aksiyonu sunmuyor. Operatör doğruyu düzeltmek yerine başka yüzeylere gitmeye zorlanıyor. citeturn51view0turn51view2
- **Urun savrulma riskleri:** Proje belgeleri genel CRM’yi açıkça MVP dışına koyuyor; buna rağmen mevcut Business Detail uzadıkça tek-işletmelik bir CRM dosyasına dönüşme eğilimi taşıyor. Bu eğilim şimdi kesilmezse V1, “karar sayfası” değil “kayıt duvarı” olur. citeturn54view1turn55view1turn27view0
- **Implementation riski:** `getProjectOsDataset()` veri tabanı URL’si yoksa veya Prisma okuması hata verirse mock store’a düşüyor. Bu geliştirme için pratik olabilir, ama kanonik operator yüzeyinde sessiz fallback kabul edilmemeli. citeturn36view0

## Eksikler ve fazlalıklar

**5. Eksik kritik kararlar**

**Eksik urun kararlari**

- Business Detail’in tek cümlelik işi yazılı hale getirilmemiş: “tek işletme için sıradaki en mantıklı aksiyonu seçtiren kanonik yüzey” ifadesi doküman düzeyinde ana kural olmalı. Şu an erişilebilir uygulama bu niyeti hissettiriyor ama sayfa yapısı bunu yeterince sert korumuyor. citeturn53view0turn27view0
- Her state için tek bir primary CTA kuralı yok. Bugün görünür aksiyonlar Project OS, danışma, bağlam, refresh ve bazen progress advance arasında dağılıyor. citeturn51view2turn26view0
- “Ne zaman Business Detail içinde ilerletilir, ne zaman Project OS’a gidilir?” kararı yazılı değil. Bu ayrım belirsiz kalırsa iki yüzey birbirini yemeye başlar. citeturn54view0turn45view0
- Kanonik çekirdek alan seti net değil. Mevcut `Business` modeli çok dar; ama sayfanın rolü için gereken minimum operator-owned alanlar ayrıca tanımlanmamış. citeturn33view0turn33view1

**Eksik veri kontrati kararlari**

- Field ownership net değil: hangi alanlar yalnızca kanonik operator kaydından gelir, hangileri yalnızca external snapshot’tır, hangileri derived’dır? Bu yazılmalı. Mevcut sayfa bu üç katmanı karıştırmaya başlamış durumda. citeturn26view0turn53view0
- External snapshot’ın persistence kontratı açık değil. Erişilebilir şemada discovery modeli görünmüyor ama sayfada refresh + snapshot okuma var. citeturn26view0turn33view6
- Offer kontratı tekilleştirilmeli. Schema, service ve UI aynı alan setini konuşmuyor. citeturn33view2turn37view0turn40view0turn40view3turn38view2
- Timeline’ın kaynağı açık değil. V1’de gerçek event log mu tutulacak, yoksa mevcut gibi audit/offer/delivery hareketlerinden türetilecek mi? Sayfa şu anda türetilmiş bir timeline gösteriyor. citeturn26view3
- Operator yüzeyinde sessiz mock fallback yasak mı, serbest mi, sadece lokal geliştirme için mi? Bu karar kontrat düzeyinde yazılmalı. citeturn36view0

**Eksik implementation-boundary kararlari**

- Business Detail ile Project OS arasındaki görev bölüşümü net yazılmalı: Project OS cross-business queue/hot ops yüzeyidir; Business Detail single-business truth surface’tir. Bu repo’da ima ediliyor ama spesifikasyon dilinde kilitlenmeli. citeturn54view0turn45view0
- Drawer/modal sınırları tanımlı değil. Mevcut Business Detail neredeyse her şeyi inline taşıyor; Project OS ise form ve ham kayıtları accordion içinde tutuyor. Bu fark tesadüfi olmamalı; bilinçli kural olmalı. citeturn27view0turn45view1turn45view2
- Light scrape ile deep scrape ayrımı implementation düzeyinde bağlanmalı: hangi buton neyi tetikler, sonuç nereye yazar, hangi veri otomatik görünür, ne review ister? Erişilebilir sayfa yalnızca refresh davranışını gösteriyor. citeturn26view0
- Consultation/Context handoff kuralı net değil. Görünen linkler var, ama hangi durumda sayfadan ayrılmak gerektiği ürün kuralı olarak yazılmamış. citeturn51view2turn44view7

**6. Fazla olan kisimlar**

- V1 ana gövdede tam ham audit/offer/delivery tablolarını taşımamalı. Bunlar detay talebidir; ilk karar yüzeyi değildir.  
- V1, header altında salt sayı kartlarıyla alan harcamamalı. “Kaç audit var?” çoğu durumda “şimdi ne yapacağım?” kadar değerli değildir.  
- V1, offer addon/domain gibi ayrıntıları ana akışta göstermemeli; bunlar ancak son teklif detayında drawer/modal olarak anlamlıdır. Mevcut kontrat zaten stabil değil. citeturn33view2turn37view0turn38view2
- V1’e deep scrape çıktıları, rakip analizi, zaman serisi review analitiği veya çok kaynaklı detay karşılaştırma eklemek erkendir. Bunlar hem veri kontratı hem operasyon yükü büyütür.  
- V1, serbest not duvarı, iletişim geçmişi, görev listesi, attachment merkezi gibi CRM alışkanlıklarını içeri almamalı. Proje bunu zaten MVP dışı çizmiş durumda. citeturn54view1turn55view1
- V1, yeni ayrı filtreli liste yüzeylerini erken açmamalı. Proje belgesi bunları Business Detail’den bile sonra “gerekirse” diye konumluyor. citeturn54view0

## Sifirdan tasarım

**7. Sifirdan daha dogru bilgi mimarisi**

Erişilebilir mevcut sayfadaki tekrar ve ham tablo yükünü azaltmak için sayfayı bugün sıfırdan şu sırayla kurardım: citeturn51view2turn27view0

1. **Header**  
   İşletme adı, segment, ilçe, yaşam döngüsü durumu, son kanonik güncelleme zamanı ve görünür bir “kanonik bilgiyi düzenle” aksiyonu. Bu blok “kim bu kayıt?” sorusunu bitirir.

2. **Next Step**  
   Tek baskın blok. Mevcut stage, neden şimdi bu stage’de olduğu, bir cümlelik recommended next action ve tek primary CTA burada olur. Secondary CTA yalnızca Project OS veya danışma olur; ikisi birden primary olamaz.

3. **Signal Snapshot**  
   Üç kompakt kart:  
   - kanonik veri tamamlık durumu  
   - external snapshot tazeliği ve mismatch var/yok  
   - ticari/operasyonel ilerleme durumu  
   Amaç, sayfayı aşağı kaydırmadan durum ısısını vermek.

4. **Kanonik Profil**  
   Yalnızca operator-owned truth. Kimlik, sahibi/kontak, telefon, temel public pointers ve kayıt durumu. Bu blok okunur ve düzenlenir; tartışmalı external veri burada yer almaz.

5. **External Snapshot ve Farklar**  
   Light scrape sonucu, snapshot zamanı, kaynak, confidence/match ve “kanonikle farklar” listesi. Bu bölümün işi gösterge sunmaktır; truth olmak değil.

6. **Operasyon Ozetleri**  
   Son audit, son teklif, son teslimat. Yalnızca birer özet satırı veya kompakt kart. Tam geçmiş değil.

7. **Recent Activity**  
   Son birkaç olay. Maksimum 5–7 satır. Bu, “en son ne oldu?” sorusunu cevaplar; CRM tarzı sonsuz tarihçe üretmez.

8. **Details on demand**  
   Alt kayıt tabloları, full offer scope, audit scorecard, delivery scope, external raw payload ve deep scrape sonucu drawer/modal içinde açılır.

**8. Sifirdan daha dogru veri kontrati**

Bu bölümde “hangi veri katmanlari kalmali, hangileri birlesmeli, hangileri sonraya kalmali” kararını öneri olarak netleştiriyorum. Bu öneri özellikle mevcut offer drift’ini ve discovery belirsizliğini temizlemek için tasarlandı. citeturn33view2turn33view6turn40view0turn38view2

**Kalmali**

- **Canonical / `business_core`**  
  İşletmenin operator tarafından doğrulanan iç kaydı.  
  İçermeli: `id`, `slug`, `name`, `segment`, `district`, `owner_or_contact_name`, `primary_phone?`, `status`, `operator_summary?`, `updated_at`, `updated_by`.  
  Kural: yalnızca operatör düzenler.

- **Operational history / `audits`, `offers`, `delivery_projects`**  
  Akış kayıtları ayrı kalmalı. Audit, offer ve delivery geçmişi business core’a gömülmemeli. Bunlar history’dir, truth değildir.

- **External / `discovery_snapshots`**  
  Light scrape ve gerekirse deep scrape çıktıları burada yaşamalı.  
  İçermeli: `business_id`, `mode(light|deep)`, `source`, `captured_at`, `match_status`, `candidate_payload`, `raw_ref`, `freshness_days`.  
  Kural: kanonik kaydı sessizce override etmez.

- **Derived / `business_summary`**  
  Saklanmak zorunda değil; hesaplanabilir.  
  İçermeli: `current_stage`, `current_stage_status`, `next_step`, `missing_fields`, `mismatch_flags`, `package_hint`, `needs_consultation`.  
  Kural: canonical + operational + latest external snapshot’tan türetilir.

**Birlesmeli**

- “Operasyon özeti”, “next step”, “son audit/teklif/teslimat” tek bir **derived summary** mantığında birleşmeli. Bunlar ayrı ayrı stored truth olmamalı.
- Timeline için ayrı bir CRM log modeli açılmamalı. V1’de timeline, mevcut operasyon kayıtları ve sistem event’lerinden türetilebilir.
- “İlk eksik listesi” ile “package hint” ayrı feature gibi büyütülmemeli; ikisi aynı derived assessment katmanında bir araya gelmeli.

**Sonraya kalmali**

- Field-level merge ledger  
- Çok kaynaklı external karşılaştırma  
- Deep scrape artefact arşivi  
- İletişim geçmişi / call log / CRM notes  
- Review trend analytics  
- Attachment/media yönetimi  

**Canonical / external / derived ayrimini netlestir**

- **Canonical:** operatörün doğru kabul ettiği iç gerçek.  
- **External:** dış dünyadan görülen snapshot/signal.  
- **Derived:** canonical + external + history üzerinden hesaplanan karar çıktısı.  
- **Kural:** external hiçbir alanı sessizce canonical yapmaz; önce fark olarak görünür, sonra operatör isterse kabul eder.

**9. Daha net V1 siniri**

Aşağıdaki sınır, Project OS’un kuyruk/hot-ops rolünü koruyup Business Detail’i tek kayıt başında karar yüzeyi olarak tutmak için önerilmiştir. citeturn54view0turn45view0turn45view1

**Sayfada kesin kalacaklar**

- İşletme header’ı  
- Tek baskın “Next Step” bloğu  
- Kanonik profil özeti  
- External snapshot tazelik ve mismatch özeti  
- Son audit / son teklif / son teslimat özetleri  
- Kısa recent activity  
- Light scrape refresh  
- Gerekliyse tek primary CTA ile stage advance

**Drawer/modal olacaklar**

- Kanonik profil düzenleme  
- Full audit detail / scorecard  
- Full offer detail / addon / domain tercihi  
- Full delivery scope  
- External snapshot raw detail  
- “Farkları gözden geçir ve kabul et” akışı  
- Deep scrape talep modalı

**Ayri yuzeye tasinacaklar**

- Cross-business kuyruk ve stage bazlı çalışma görünümü  
- Bulk operasyonlar  
- Ham tüm kayıt tabloları  
- Prompt Üretimi  
- Context Center  
- Discovery explorer / kaynak bazlı inceleme  
- Ayrı filtreli listeler

**10. Dusuk sadakatli UI wireframe**

Aşağıdaki wireframe desktop-first, text-only ve düşük sadakatlidir. Amaç blok sırasını ve yüzey sınırını netleştirmektir.

```text
[Header - full width]
Business Name | Segment | District | Status | Last Canonical Update
[Edit Canonical]

[Next Step - full width]
Stage | Why this stage | Recommended next action
[Primary CTA] [Open in Project OS] [Open Consultation]

[Audit Snapshot / Signal Snapshot - full width]
[Canonical completeness] [External freshness + mismatch count] [Pipeline state]

[Left column]                         [Right column]
[Canonical Profile]                   [External Snapshot Summary]
- owner/contact                       - source
- phone                               - captured at
- public links                        - matched listing
- status                              - top mismatches
[Edit button]                         [Refresh light scrape] [Review differences]

[Left column]                         [Right column]
[Latest Audit / Offer / Delivery]     [Recent Activity]
- latest audit summary                - event 1
- latest offer summary                - event 2
- latest delivery summary             - event 3
[View details]                        [View full timeline]

[Timeline - full width]
Recent events only, max 5-7 items

[Drawers / Modals]
- Edit Canonical
- Audit Detail
- Offer Detail
- Delivery Detail
- External Snapshot Raw
- Deep Scrape Request
```

**Above the fold** kesin görünmeli: header, next step, signal snapshot ve primary CTA. Ham tablolar, uzun geçmiş ve ayrıntılı paket kapsamı above the fold’a çıkmamalı.

## Yeni kanonik metin

**11. Tam rewrite**

**Business Detail V1**

Business Detail, tek bir işletme için **kanonik kontrol yüzeyidir**. Bu sayfanın işi operatöre 30–60 saniye içinde üç sorunun cevabını vermektir: Bu işletme kimdir? Şu an durumu nedir? Şimdi ne yapılmalıdır?

Bu sayfa **Project OS değildir**. Project OS, sıcak operasyon kuyruğu ve çapraz kayıt yönetimi yüzeyidir. Business Detail ise tek kayıt başında doğrulama, karar ve yön seçme yüzeyidir. Proje dokümanlarında da Project OS önce operasyon omurgası olarak, Business Detail ise bunun üzerinde sonradan açılan kanonik yüzey olarak konumlanmıştır. Ayrıca ürün açıkça genel amaçlı CRM olmak istememektedir. citeturn54view0turn55view1turn45view0

### Amaç

Business Detail V1, operatörün tek bir işletme için aşağıdaki işleri hızlıca yapmasını sağlar:

- kanonik işletme kaydını görmek ve gerektiğinde düzeltmek
- dış dünyadan görülen snapshot’ı görmek
- bu iki katman arasındaki önemli farkları fark etmek
- işletmenin audit → teklif → teslimat → bakım hattındaki yerini anlamak
- sıradaki en mantıklı aksiyonu seçmek

### Basari kriteri

Bir operatör bu sayfaya geldiğinde 30–60 saniye içinde şunları net okuyabilmelidir:

- işletmenin temel kimliği
- işletmenin şu an hangi aşamada olduğu
- dış verinin ne kadar güncel olduğu
- kritik bir uyumsuzluk olup olmadığı
- şimdi atılması gereken bir sonraki aksiyon

Bu beş sorudan biri cevapsız kalıyorsa sayfa başarısızdır.

### V1 prensipleri

- **Kanonik truth operator-edited iç kayıttır.**
- **External data signal’dır; truth değildir.**
- **Derived data okunur; truth gibi düzenlenmez.**
- **Light scrape varsayılandır.**
- **Deep scrape opt-in’dir.**
- **Sayfa generic CRM duvarı olmaz.**
- **Detaylar ana gövdede birikmez; details on demand yaklaşımı kullanılır.**

### Sayfa kapsamı

Sayfa aşağıdaki bloklardan oluşur:

**Header**  
İşletme adı, segment, ilçe, kayıt durumu, son kanonik güncelleme zamanı ve görünür bir “kanonik bilgiyi düzenle” aksiyonu.

**Next Step**  
Sayfanın baskın bloğudur. Mevcut stage, mevcut stage’in kısa açıklaması, önerilen bir sonraki aksiyon ve o aksiyona bağlı tek primary CTA burada yer alır. Primary CTA state’e göre değişebilir: audit başlat, audit’i tamamla, teklif hazırla, teklifi güncelle, teslimatı başlat, bakım notunu aç gibi. Aynı state’te birden fazla primary CTA verilmez.

**Signal Snapshot**  
Üç kompakt karttan oluşur:

- kanonik veri tamlık durumu
- external snapshot tazeliği ve kritik mismatch var/yok
- operasyon hattındaki mevcut ilerleme

**Kanonik Profil**  
Sadece operator-owned alanlar gösterilir. V1 için minimum alan seti:

- işletme adı
- segment
- ilçe
- owner veya primary contact adı
- primary phone
- kayıt durumu
- kısa operator summary
- temel public link alanları varsa bunların operator-confirmed hali

Bu blok düzenlenebilir olmalıdır.

**External Snapshot**  
Bu blok latest light scrape sonucunu gösterir. Kaynak, snapshot zamanı, eşleşen listing özeti, telefon/website/adres gibi görünen alanlar ve kanonik kayıtla önemli farklar burada yer alır. External data burada gösterilir ama kanonik alanları otomatik güncellemez. Kullanıcı isterse bir farkı review edip kanonik kayda taşır.

**Operasyon Ozetleri**  
Son audit, son teklif ve son teslimat sadece özet olarak görünür. Tam geçmiş burada açılmaz.

**Recent Activity**  
Son birkaç event görünür. Amaç geçmişi arşivlemek değil, son hareketi anlamaktır.

### Veri katmanlari

**Canonical layer**  
`business_core` ve buna bağlı operator-owned alanlar. Bu alanlar manuel olarak düzenlenir ve business için iç truth olarak kabul edilir.

**Operational layer**  
`audits`, `offers`, `delivery_projects`. Bunlar business’ın zaman içindeki iş kayıtlarıdır. Business core ile birleştirilmez.

**External layer**  
`discovery_snapshots`. Light ve deep scrape sonuçları burada yaşar. Her snapshot kaynak, zaman ve mode bilgisi taşımalıdır. Ham payload saklanabilir ama UI’da varsayılan olarak özet görünür.

**Derived layer**  
`business_summary`. Bu katman current stage, next step, missing fields, mismatch flags ve package hint gibi türetilmiş alanları üretir. Bu katman UI için okunur, ama operator truth gibi düzeltilmez; gerekirse calculation override yerine explicit operator note kullanılır.

### Aksiyon kurallari

Sayfadaki primary CTA her zaman tek olmalıdır. Secondary aksiyonlar en fazla şunlardır:

- Project OS’ta aç
- danışma aç
- external snapshot refresh et

Kanonik profil düzenleme ayrı drawer/modal içinde yapılır. External fark review akışı da ayrı drawer/modal içinde açılır.

### Dış veri kurallari

- Light scrape varsayılan yenileme yoludur.
- Deep scrape ancak açık kullanıcı talebiyle çalışır.
- Deep scrape sonucu de external katmanda kalır.
- Hiçbir external alan sessizce kanonik alanı ezmez.
- Mismatch görüntülemek serbesttir; accept etmek explicit operator kararı gerektirir.

### Sayfada olmayacaklar

Aşağıdakiler Business Detail V1 ana gövdesinde yer almaz:

- cross-business queue
- bulk operasyonlar
- sonsuz ham tablo duvarı
- generic notes / CRM log
- attachment merkezi
- deep scrape ayrıntı raporunun tam gövdesi
- ayrı filtreli liste yüzeyleri
- çok kaynaklı karmaşık conflict resolution akışları

Bunlar ya drawer/modal içinde kalır ya da ayrı yüzeye taşınır.

### Ayrı yuzeyler

- Project OS: kuyruk, hızlı operasyon, bulk görünüm, ham kayıtlar
- Prompt Üretimi: kararsız veya blokajlı durumlar
- Context Center: geniş bağlam ve referans ihtiyacı
- Discovery explorer: gerekirse detaylı external inceleme

### Implementation sirasi

V1 aşağıdaki sırayla uygulanmalıdır:

1. veri kontratını netleştir  
2. canonical business edit akışını aç  
3. derived next-step özetini güvenilir hale getir  
4. external snapshot modelini ayır  
5. mismatch review drawer’ını ekle  
6. detay kartlarını drawer/modal yap  
7. deep scrape opt-in akışını en sona bırak

Bu sıra, proje belgelerindeki öncelik düzeniyle de uyumludur: önce teklif netliği, operasyon görünürlüğü ve veri modeli; sonra teslimat ve küçük otomasyonlar. citeturn55view0

## Uygunluk ve ustunluk savunmasi

**12. Ustunluk savunmasi**

**1. daha hizli operator karari**  
Yeni versiyon, sayfayı tek soru etrafında kuruyor: “Şimdi ne yapmalıyım?” Mevcut erişilebilir uygulamada bu cevap var ama tekrarlar arasında gömülüyor; header rozetleri, count kartları, operasyon özeti ve alt kartlar aynı lifecycle bilgisini çoğaltıyor. Yeni sürüm bu çoğaltmayı kesip next-step bloğunu sayfanın baskın merkezi yapıyor. citeturn51view2turn53view0turn27view0

**2. daha net bilgi hiyerarsisi**  
Yeni versiyonda sıra nettir: kimlik → aksiyon → sinyal → doğrulama → detay. Mevcut sayfada ise kimlik, sayımlar, operasyon özeti, audit snapshot, teklif kartı, teslimat kartı, timeline ve ham tablolar birbirine yakın ağırlıkta duruyor. Bu yapı “önce karar, sonra detay” değil; “önce her şeyi göster” yapısıdır. citeturn51view2turn53view0turn27view0

**3. daha az belirsizlik**  
Yeni versiyon canonical / external / derived ayrımını açık sözleşmeye çeviriyor. Bu, erişilebilir implementasyondaki en ciddi sorunu çözüyor: Offer alanları schema, service ve UI arasında aynı dili konuşmuyor; discovery/external katmanının persistence kontratı da görünür değil. Yeni metin, bu ayrımı isimlendirip saklama kuralı koyuyor. citeturn33view2turn33view6turn37view0turn40view0turn38view2

**4. daha dusuk CRM-style scope drift riski**  
Yeni versiyon full tables, generic notes, communication log ve bulk ops’u dışarı atıyor. Bu, proje belgelerindeki “genel amaçlı CRM değil” kuralını gerçekten uyguluyor. Mevcut erişilebilir sayfa ise bu sınıra yaklaşmaya başlamış durumda. citeturn54view1turn55view1turn27view0

**5. daha temiz V1 siniri**  
Yeni versiyon sayfada kalacakları, drawer/modal olacakları ve ayrı yüzeye taşınacakları açıkça ayırıyor. Mevcut repo’da Project OS bu ayrımı kısmen yapıyor; form ve ham kayıtları accordion içine alıyor. Business Detail için de aynı disiplin gerekiyor. citeturn45view1turn45view2turn27view0

**6. daha gercekci implementasyon sirasi**  
Yeni sürüm “önce veri kontratı, sonra edit, sonra derived summary, sonra external mismatch review” diyor. Bu sıra, roadmap’deki “offer clarity → operasyon görünürlüğü → veri modeli → teslimat akışı → küçük otomasyonlar” önceliklerine daha yakın. Yani önce ürün kontratını sıkılaştırıyor, sonra kozmetik değil hareketli yüzey ekliyor. citeturn55view0

**7. daha dusuk operasyon yuku**  
Yeni versiyon light scrape’ı varsayılan tutuyor, deep scrape’ı opt-in yapıyor, external veriyi signal olarak saklıyor ve ayrıntıyı drawer’a itiyor. Bu, operatörün hem her sayfada bilgi çöplüğüne maruz kalmasını hem de veri kaynağı karmaşasını azaltır. Mevcut implementasyonda external refresh yaklaşımı doğru başlıyor; yeni sürüm bunu tam kontrata bağlıyor. citeturn26view0

**Zayif kalan yerler**

- Asıl `business-detail-v1.md` dosyasını okuyamadığım için, burada “mevcut doküman”a dair verdiğim hükümler satır satır redline değil; erişilebilir repo ve implementasyon gerçekliği üzerinden verilmiş yargılardır. Bu sınırlama gerçektir.  
- Kanonik çekirdek alan setinde telefon, public links ve operator summary gibi bazı alanları öneri olarak açtım; bunlar ürün açısından mantıklı ama mevcut erişilebilir şemada henüz netleşmiş değiller. citeturn33view0turn33view1  
- Eğer erişemediğim asıl doküman zaten bu ayrımları çok net koyuyorsa, o durumda sorun doküman kalitesi değil uygulama disiplini olur. Ama erişilebilir uygulama bunu bugün yeterince kanıtlamıyor. citeturn33view2turn40view0turn38view2