# EsnafDigital Business Detail V1 Değerlendirmesi

İstenen birincil referans dosyası `/root/.openclaw/workspace/REFERENCES/business-detail-v1.md` bu oturumda erişilebilir değildi; `file_search` tarafında da sorgulanabilir iç kaynak görünmedi. Bu yüzden aşağıdaki metin, mevcut dosyanın satır satır içerik incelemesi değil; verdiğiniz ürün kontratı ile erişebildiğim repo bağlamı üzerinden yapılmış bir first-principles değerlendirme ve replacement spec’tir. Erişebildiğim repo belgeleri yine de yönü net veriyor: EsnafDigital küçük işletmeler için “dijital görünürlük ve güven altyapısı” olarak tanımlanıyor; ana operasyon akışı audit → teklif → teslimat → bakım; MVP’den genel amaçlı CRM, ağır AI/RAG, karmaşık yetkilendirme ve mikroservis yaklaşımı dışlanıyor; Business Detail ise çekirdek yüzeylerden sonra açılacak “kanonik business detail yüzeyi” olarak konumlanıyor. Ayrıca admin/iç operasyon alanının ana uygulaması `agent-workspace` içindeki Next.js yüzeyi olarak tarif ediliyor. citeturn22view0turn25view3turn28view0

## Değerlendirme özeti

**1. Kisa ozet**

Mevcut `business-detail-v1.md` dosyasını okuyamadığım için o metnin tam olarak neyi doğru, neyi yanlış yaptığını dürüstçe söyleyemem. Ama erişebildiğim kaynaklara ve verdiğiniz kontrata göre net hüküm şu: Business Detail V1, tek işletme için **karar yüzeyi** olmalı; bilgi mezarlığı, CRM duvarı ya da Project OS’nin ikinci kopyası olmamalı. Repo gerçekliği de bunu destekliyor; ürün omurgası audit → teklif → teslimat → bakım akışı ve Business Detail bu akışa hizmet eden kanonik yüzey olarak düşünülmeli. Ayrıca repo belgeleri genel amaçlı CRM’i MVP dışı bırakıyor; bu, sayfanın scope’unu sert biçimde daraltmak gerektiği anlamına gelir. Audit scorecard zaten hangi bilgilerin kritik olduğunu söylüyor: harita doğruluğu, güven sinyalleri, web vitrini, dönüşüm hazırlığı ve içerik güncelliği. Bu yüzden doğru V1, yukarıda “sonraki en mantıklı adımı”, hemen altında da audit + canonical + conflict özetini göstermelidir. Çekirdek bilgi ana sayfada görünür olmalı; ham external data, derin ayrıntı ve geçmiş kayıtlar drawer/modal veya ayrı yüzeylerde kalmalıdır. Bu çerçevede benim önerim incremental trim değil, **rewrite** yaklaşımıdır. citeturn22view0turn25view3turn26view0turn28view0

**2. Genel karar**

Kararım: **rewrite**.

- Birincil belgeye erişim yokken o belgenin yapısını “nezaketen” korumak yanlış olur; sıfırdan model kurmak daha güvenli.
- Repo belgeleri Business Detail’i daha erken çekirdek yüzeylerden sonra gelen bir yüzey olarak konumluyor; bu da V1’de aşırı zenginlik değil, sıkı scope disiplini gerektiğini gösteriyor. citeturn25view3
- Ürün omurgası audit → teklif → teslimat → bakım akışı; Business Detail bu akışın tek işletme düzeyindeki teşhis ve karar yüzeyi olmalı. Bu akışın dışına taşan CRM-style genişleme doğrudan ürün savrulması demektir. citeturn22view0
- MVP’de “genel amaçlı CRM” açıkça dışarı atılmış. Dolayısıyla sayfaya notes wall, pipeline furniture, ilişki geçmişi, her şeyi takip eden aktiviteler vb. eklemek repo yönüyle de ters düşer. citeturn22view0turn25view3
- Baymard’ın bulguları, ana içerik subpage benzeri ayrık yüzeylere itildiğinde kullanıcıların kritik bilgiyi kaçırdığını ve yön duygusunu kaybettiğini gösteriyor; NN/g de görünür durum, düşük hafıza yükü ve minimal arayüzü temel ilke olarak koyuyor. Business Detail için bunun pratik karşılığı: ana karar bilgisi tek sayfada, ikincil ayrıntı progressive disclosure ile açılmalı. citeturn20view0turn19search1turn19search2

**3. En guclu kisimlar**

Birincil dosyayı göremediğim için burada “mevcut dokümandan korunacak parçalar” değil, repo ve brief içinde **kesin korunması gereken omurgalar** var.

- **Audit → teklif → teslimat → bakım akışı.** Bu en güçlü temel. Business Detail’i bu omurgadan koparırsanız sayfa rastgele bir kayıt ekranına dönüşür. citeturn22view0
- **Genel CRM reddi.** Repo bunu açık biçimde MVP dışı sayıyor; bu tek başına scope güvenliği sağlar. citeturn22view0turn25view3
- **Project OS ile Business Detail ayrımı.** Repo, Businesses / Audits / Offers / Delivery alanlarını ilk fazda ayrı üst seviye CRM sayfaları yapmak yerine Project OS altında omurganın alt görünümleri olarak ele alıyor; Business Detail ise sonraki aşama. Bu ayrım çok değerli. citeturn22view0turn25view3
- **Audit scorecard’ın somut boyutları.** Harita doğruluğu, güven sinyalleri, web vitrini, dönüşüm hazırlığı ve güncellik, Business Detail above-the-fold için zaten hazır bilgi hiyerarşisi veriyor. citeturn26view0
- **“Önce görünürlük ve düzen, sonra otomasyon” yönü.** Bu, ağır otomasyon ve akıllı sihir yerine operatör netliği önceliğini doğru yerde tutuyor. citeturn24view0
- **“Tüm notları toplamak değil” disiplini.** Prompt Üretimi için yazılan bu ilke, Business Detail için de geçerli olmalı: yüzeyin işi bilgi biriktirmek değil, dağınık durumu karar verilebilir hale getirmek. citeturn22view0

**4. En problemli kisimlar**

Birincil dokümanı görmediğim için aşağıdakiler “mevcut metinde kesin var” dediğim şeyler değil. Ama **varsa doğrudan kesilmesi gereken** problemli kalıplar bunlar.

- **Tekrarlar.** Aynı işletme gerçeği aynı anda canonical özet, audit kartı, external snapshot, timeline ve note içinde yaşıyorsa, “tek kanonik yer” kuralı bozulur. Repo zaten aynı bilginin iki kanonik dosyada yaşamamasını ilke olarak söylüyor. citeturn28view0
- **Fazla erken açılan kısımlar.** Genel CRM öğeleri, müşteri ilişki geçmişi, kampanya izleme, generic tasks, zengin scoring, çok-rollü iş akışları ve ileri portal mantığı bu safhada erkendir; repo roadmap bunları özellikle erteliyor ya da kapsam dışı bırakıyor. citeturn22view0turn25view3
- **Belirsiz kontratlar.** Canonical veri, external snapshot ve derived öneri birbirine karışıyorsa sayfanın güvenilirliği biter. “External silently overrides canonical” modeli burada doğrudan hatalıdır; çünkü brief’inize de repo’nun “tek kanonik yer” disiplinine de ters düşer. citeturn28view0
- **UX riskleri.** Ana karar bilgisini tab, subpage, secondary route ya da uzun accordion mezarlığına itmek yanlış. Baymard, ana içerik ayrı alt sayfalara bölündüğünde kullanıcıların kritik bilgiyi kaçırdığını ve geri gezinmede yönünü kaybettiğini gösteriyor. NN/g de durumun görünür, seçeneklerin hatırlamayı gerektirmeyecek kadar görünür ve arayüzün gereksiz bilgi yükünden arınmış olmasını temel ilke sayıyor. citeturn20view0turn19search1turn19search2
- **Ürün savrulma riski.** Project OS’nin sıcak operasyon işini Detail sayfasına taşımak, tek işletme yüzeyini kuyruk/dispatch yüzeyine çevirir. Repo tersini söylüyor: Project OS ayrı omurga, Business Detail ayrı sonraki yüzey. citeturn22view0turn25view3
- **Not duvarı riski.** Serbest metin her şeyi yutar. Prompt Üretimi için bile “tüm notları toplamak değil” denmişken, Business Detail’i note dump’a çevirmek kötü üründür. citeturn22view0

## Eksikler ve kapsam

**5. Eksik kritik kararlar**

**Eksik urun kararlari**

- Sayfanın birincil işi tam olarak nedir: “işletmeyi anlamak” mı, “audit’i görmek” mi, “sonraki aksiyonu seçmek” mi? Benim cevabım üçüncüsü: anlamayı, sonraki aksiyon seçimine hizmet ettiği kadar yapmalı.
- Primary CTA öncelik sırası nedir? Conflict review, canonical edit, light scrape, audit update, Project OS item açma arasında deterministik sıra tanımlanmalı.
- Hangi alanlar gerçekten zorunlu? İşletme adı, segment, telefon, adres/konum, web varlığı durumu, record state ve kısa operatör özeti dışında her şeyi V1’de zorunlu yapmamak gerekir.
- “Hazır”, “inceleme gerekli”, “blokeli”, “arşiv” gibi sınırlı record-state seti netleşmeli.
- “Bu işletme için Project OS item’ı ne zaman açılır?” kuralı belirlenmeli; aksi halde Detail ile Project OS sınırı kayar.

**Eksik veri kontrati kararlari**

- Canonical business record’ın alan seti ve sahipliği net tanımlanmalı.
- External snapshot nesnesi standartlaşmalı: kaynak, toplanma zamanı, ham referans, normalize aday alanlar, confidence.
- Conflict nesnesi açıkça tanımlanmalı: field, canonical value, external value, source, status, resolved_by.
- Audit sonucu ayrı bir model mi, canonical’ın bir alt bölümü mü? Bu karar verilmeden sayfa netleşmez.
- Derived “next step” nesnesi tanımlanmalı: action_type, reason, blocker, confidence, generated_at.

**Eksik implementation-boundary kararlari**

- Hangi işlem inline, hangisi drawer, hangisi ayrı route olacak?
- Scrape tetikleme UI’si sadece trigger mı verecek, yoksa detaylı run yönetimi de burada mı olacak?
- Deep scrape tetikleyince sonuç hangi yüzeye düşecek?
- Edit yetkisi kimde, audit yetkisi kimde, external conflict resolution kimde?
- Event log’un authoritative kaynağı nedir: business event stream mi, audit records mı, scrape runs mı?

**6. Fazla olan kisimlar**

Aşağıdakileri V1.1, V2 ya da daha sonrasına atardım:

- **Genel amaçlı CRM katmanı.** Repo bunu zaten MVP dışı sayıyor. Erken çünkü Business Detail’in karar yüzeyini kayıt mezarlığına çevirir. citeturn22view0turn25view3
- **Ağır AI/RAG / otomatik öneri motoru / akıllı skor orkestrasyonu.** Repo özellikle “önce görünürlük ve düzen, sonra otomasyon” diyor. Erken çünkü kuralları net olmayan sistemi daha da belirsiz yapar. citeturn24view0turn25view3
- **Çok rollü karmaşık yetkilendirme.** Repo kapsam dışına atıyor. Erken çünkü iç operasyon MVP’sinde ürün değerini büyütmez, implementasyonu ağırlaştırır. citeturn22view0turn25view3
- **İleri müşteri portalı, muhasebe, stok, gelir-gider.** EsnafDigital’in mevcut omurgasıyla ilgisiz yan modüller. Erken çünkü Product OS ve Business Detail’e gürültü bindirir. citeturn22view0turn25view3
- **Her source için tam ekran ayrı modül.** External data’nın işi kanıt taşımaktır, yüzeyi ele geçirmek değil.
- **Default deep scrape.** Brief’inize ters. Operasyon maliyetini ve veri karmaşasını gereksiz artırır.
- **Sonsuz timeline ve serbest not sistemi.** Operatörün 30–60 saniyede karar vermesine yardım etmez.

## Sifirdan model

**7. Sifirdan daha dogru bilgi mimarisi**

Bugün sıfırdan kursam Business Detail’i yukarıdan aşağı şu sırayla kurardım:

- **Header.** İşletme adı, segment, record state, son operator edit zamanı, linked Project OS durumu. İş: “neyi inceliyorum?” sorusunu anında kapatmak.
- **Next Step strip.** Tek cümle öneri + tek primary CTA. İş: operatörü düşünce borcundan kurtarmak. ROADMAP’in “aktif iş ve kritik aksiyon yüzeyi” yönü burada doğrudan uygulanmalı; arayüz kritik aksiyonu saklamamalı. citeturn25view3turn19search2turn19search1
- **Audit Snapshot.** Beş audit boyutunun kompakt özeti: harita, güven, web vitrini, dönüşüm hazırlığı, güncellik. İş: işletmenin durumunu 10 saniyede okutmak. Bu boyutlar zaten scorecard’da tanımlı. citeturn26view0
- **Canonical Summary.** Kanonik kabul edilen temel işletme bilgileri. İş: “şu an sistemin doğru kabul ettiği veri bu”yı netleştirmek.
- **Gaps & Conflicts.** Eksik zorunlu alanlar, açık external mismatch’ler, veri güveni riskleri. İş: karar geciktiren belirsizlikleri görünür kılmak.
- **External Signals Summary.** Ham veri değil; kaynak bazında kompakt özet ve tazelik. İş: dış dünyanın ne söylediğini kanıtlı ama ikincil biçimde göstermek.
- **Project OS mini-card.** Eğer bağlı açık iş varsa link, durum ve owner. İş: queue’yu buraya taşımadan temas noktası vermek.
- **Recent Timeline.** Son 8–12 maddelik materyal olay listesi. İş: “buraya nasıl geldik?” sorusuna kısa cevap.
- **Drawer/Modal katmanı.** Full external evidence, canonical edit, conflict review, audit history, deep scrape confirm. Baymard’ın bulguları ana içeriği ayrı alt sayfalara itmenin keşfedilebilirliği bozduğunu gösteriyor; bu yüzden birincil bilgi ana gövdede, ikincil derinlik drawer’da kalmalı. citeturn20view0

**8. Sifirdan daha dogru veri kontrati**

Ben bunu tek tablo mantığıyla değil, dört katman mantığıyla kurarım:

- **Canonical core.** İşletmenin kabul edilmiş iç gerçeği. `name`, `segment`, `category`, `phone`, `address`, `website_status`, `website_url`, `record_state`, `operator_summary`, `last_verified_at` gibi alanlar burada. Sadece operatör mutasyonu ile değişir.
- **Operator assessment.** Audit sonucu ve iç değerlendirme. Bu, canonical core ile aynı şey değildir. Kimlik verisi değil, teşhis verisidir. `audit_score_total`, boyut bazlı skorlar, kısa gerekçe, bakım ihtiyacı ve teklif uygunluğu burada tutulur. Scorecard zaten veri omurgasını veriyor. citeturn26view0
- **External snapshots.** İmmutable gözlem kayıtları. Her snapshot `source`, `collected_at`, `run_type`, `raw_ref`, `normalized_candidates`, `confidence` taşır. Bu katman kanıttır; gerçek değildir.
- **Derived decision layer.** Sistem tarafından hesaplanan ama kanonik olmayan nesneler. `freshness_status`, `open_conflicts`, `missing_required_fields`, `next_step`, `attention_level` burada üretilir. Her an yeniden hesaplanabilir.

Ben ayrıca şu birleşmeleri yaparım:

- Harita, website, sosyal, review gibi source-özel mini-modelleri dağıtmam; hepsini tek `external_snapshots` şemasına toplarım.
- Dağınık “health”, “quality”, “completeness”, “confidence” kartlarını ayrı ayrı yaşamam; bunları tek `data_quality` derived bloğunda birleştiririm.
- Audit summary ile canonical core’u birleştirmem. Audit, işletme kimliği değil, değerlendirme ürünüdür.

Sonraya bırakacaklarım:

- çapraz işletme ilişki grafiği,
- çoklu audit versiyon karşılaştırması için ağır analitik UI,
- agent-generated narrative summary’ler,
- tam iletişim geçmişi,
- otomatik merge motoru.

Canonical / external / derived ayrımı net olmalı:

- **Canonical**: operatörün kabul ettiği şey.
- **External**: dış dünyanın gördüğü ya da scraped snapshot.
- **Derived**: sistemin yorumlayarak ürettiği işaret ve öneriler.
- External hiçbir zaman canonical’ı sessizce yazamaz.
- Derived hiçbir zaman source of truth olamaz.
- External’dan canonical’a geçiş yalnızca açık operator action + audit trail ile olur.

**9. Daha net V1 siniri**

**Sayfada kesin kalacaklar**

- işletme kimliği ve record state
- kısa operatör özeti
- Next Step önerisi ve primary CTA
- Audit Snapshot
- zorunlu canonical alan özeti
- açık gaps/conflicts özeti
- light scrape tazeliği
- bağlı Project OS işine mini referans
- kısa timeline

**Drawer/modal olacaklar**

- canonical edit formu
- external evidence ayrıntıları
- conflict review akışı
- tam audit geçmişi
- deep scrape onay modali
- full event log

**Ayri yuzeye tasinacaklar**

- Project OS queue ve hot operations
- bulk business yönetimi
- offer üretimi ve şablon akışı
- delivery/bakım operasyon ekranları
- gelişmiş raporlama ve portföy analitiği
- generic CRM benzeri ilişki/touchpoint yönetimi
- scrape run yönetim konsolu

**10. Dusuk sadakatli UI wireframe**

Above the fold full width olmalı: Header, Next Step, Audit Snapshot. Sonrasında desktop-first iki kolon: solda karar için ana içerik, sağda ikincil operasyonel özet. Primary CTA üst blokta tek ve net olmalı; secondary actions sağ üstte veya sağ kolonda küçük butonlar olarak durmalı. Ham external detaylar ana kolon akışını bozmasın; drawer’a aksın. Bunun nedeni hem repo’nun “aktif iş / kritik aksiyon” yönü hem de görünür durum + düşük hafıza yükü + gereksiz bilgi yükünden kaçınma ilkeleridir. citeturn25view3turn19search1turn19search2turn20view0

```text
[Header: Business Name | Segment | Record State | Last Verified | Linked Project OS]

[Next Step: "Telefon uyumsuzlugu var, canonical kaydi gozden gecir"]   [Primary CTA: Review Conflict]
[Secondary: Edit Canonical] [Run Light Scrape] [Deep Scrape]

[Audit Snapshot: Maps | Trust | Web | Conversion | Freshness | Total]

[Left column - wide]                           [Right column - narrow]

[Canonical Summary]                            [Data Quality]
- name                                         - last light scrape
- phone                                        - freshness state
- address                                      - open conflicts count
- website status/url                           - missing required fields

[Gaps & Conflicts]                             [External Signals Summary]
- missing field list                           - latest website signal
- mismatch list                                - latest maps signal
- blocked decision                             - latest review/trust signal

[Latest Audit Summary]                         [Project OS Link]
- 5 dimension scores                           - item state
- short rationale                              - owner
- proposed commercial implication              - open in Project OS

[Recent Timeline]
- operator edit
- light scrape completed
- conflict resolved
- audit updated
- project item linked

[Drawers/Modals]
- Edit Canonical Drawer
- External Evidence Drawer
- Conflict Review Drawer
- Audit History Drawer
- Deep Scrape Confirm Modal
```

## Yeni kanonik doküman

**11. Tam rewrite**

### Business Detail V1

#### Tanim

Business Detail, tek bir işletme için kanonik iç veriyi, son internal assessment durumunu ve dış sinyallerin kontrollü özetini tek yerde gösteren karar yüzeyidir. Bu sayfanın işi, operatörün 30–60 saniye içinde işletmenin durumunu anlaması ve sıradaki en mantıklı aksiyonu seçmesidir.

Business Detail, Project OS değildir. Project OS kuyruk, sıcak operasyon ve çoklu iş görünümüdür. Business Detail ise tek işletme düzeyinde teşhis, doğrulama ve karar seçim yüzeyidir. EsnafDigital ürün omurgası audit → teklif → teslimat → bakım akışıdır; bu sayfa o omurganın tek işletme düğümüdür. Repo yönü de Business Detail’i Project OS’ten sonra açılacak kanonik yüzey olarak konumluyor. citeturn22view0turn25view3

#### Amac

Bu sayfa şunları sağlamalıdır:

- sistemin bu işletme için doğru kabul ettiği kanonik bilgiyi göstermek,
- en son audit ve veri güveni durumunu özetlemek,
- dış sinyallerin ne söylediğini kaynağıyla göstermek,
- karar geciktiren eksik veya çelişkili alanları görünür kılmak,
- operatöre tek bir net sonraki adım önermek.

#### Basari kosulu

Başarılı bir oturum sonunda operatör aşağıdaki beş soruya sayfa değiştirmeden cevap verebilmelidir:

- Bu işletme kim?
- Sistem şu an hangi bilgiyi doğru kabul ediyor?
- Hangi bilgi eksik, çelişkili veya bayat?
- Son audit ne söylüyor?
- Şimdi yapılacak en mantıklı iş ne?

#### Olmayan seyler

Bu sayfa şunlar değildir:

- genel amaçlı CRM,
- Project OS kopyası,
- serbest not deposu,
- tam scrape run yönetim konsolu,
- ilişki/touchpoint geçmişi merkezi,
- sessiz otomatik veri birleştirme motoru.

MVP kapsamı zaten genel CRM’i, ağır AI/RAG katmanlarını, karmaşık yetkilendirmeyi ve ilgisiz iş modüllerini dışarı atıyor. Bu belge o scope çizgisine sadıktır. citeturn22view0turn25view3

#### Sayfa ilkeleri

- Ana bilgi tek yüzeyde görünür olmalıdır.
- İkincil ayrıntılar drawer/modal ile açılmalıdır.
- External data hiçbir zaman canonical veriyi sessizce değiştirmemelidir.
- Derived öneriler yardımcıdır; kararın yerine geçmez.
- Sayfa kopyası kısa, operasyonel ve iç jargon yerine saha diliyle yazılmalıdır.
- Her blok “karar hızı” testini geçmelidir: blok yoksa operatör daha kötü karar mı verir? Cevap hayırsa blok sayfada kalmaz.

Bu ilkeler repo’daki “önce görünürlük ve düzen, sonra otomasyon”, “aynı bilgi iki kanonik yerde yaşamasın” ve “aktif iş / kritik aksiyon” yönüyle uyumludur. citeturn24view0turn28view0

#### Sayfa yapisi

**Header**

Header şu alanları içerir:

- business name
- segment / category
- record state
- last operator verification
- linked Project OS status

Bu blokta yalnızca yön buldurucu bilgi bulunur. Burada ham veriye girilmez.

**Next Step**

Header’ın hemen altında tek cümlelik bir öneri kartı yer alır. Örnek:

- “Maps kaydı ile canonical telefon uyuşmuyor. Önce conflict’i çöz.”
- “Light scrape bayat. Önce güncel snapshot al.”
- “Audit eksik. Önce audit’i tamamla.”
- “Audit tamam; teklif üretmeye hazır. Project OS item aç.”

Bu kart tek bir primary CTA taşır. Aynı anda iki ana buton gösterilmez.

**Audit Snapshot**

Next Step’in altında Audit Snapshot bulunur. Snapshot şu boyutları gösterir:

- Harita varlığı ve doğruluğu
- Dijital güven sinyalleri
- Web vitrini
- Dönüşüm hazırlığı
- Canlılık ve güncellik

Bu boyutlar mevcut scorecard’dan gelir. V1’de her boyut için basit durum etiketi ve istenirse toplam skor gösterilir. Ama ağır grafik, benchmark ve tarihsel analitik gösterilmez. citeturn26view0

**Canonical Summary**

Bu bölüm sistemin doğru kabul ettiği temel işletme bilgilerini gösterir:

- işletme adı
- segment / kategori
- telefon
- adres / konum metni
- website durumu
- website URL
- kısa operatör özeti
- record state

Kısa operatör özeti serbest not alanı değildir. Maksimum kısa bir durum cümlesidir. Amaç, sonraki operatöre sahayı aktarmaktır; her şeyi not etmek değildir.

**Gaps and Conflicts**

Bu bölüm üç şeyi gösterir:

- eksik zorunlu alanlar,
- açık conflict’ler,
- kararı bloke eden belirsizlikler.

Örnek conflict satırı:

- Field: phone
- Canonical: +90 xxx
- External: +90 yyy
- Source: maps snapshot
- Seen: 2 gün önce
- CTA: Review

Bu bölüm sayfadaki en önemli ikinci karardır. Çünkü veri güveni net değilse sonraki aksiyon seçimi de net değildir.

**External Signals Summary**

Bu bölüm external kaynakları ham formda değil, karar verecek kadar özetlenmiş biçimde verir:

- son light scrape zamanı
- hangi kaynaklardan veri geldiği
- hangi kaynaklarda sinyal bulunduğu
- açık mismatch sayısı
- deep scrape var/yok durumu

Buradan detay drawer açılır. Ana sayfada ham JSON, uzun HTML, tam post listesi veya full scrape transcript gösterilmez.

**Project OS mini-card**

Bu kart yalnızca temas noktasıdır:

- bağlı item var mı,
- state nedir,
- owner kim,
- son güncelleme ne zaman,
- “Project OS’te aç” linki.

Project OS detayları burada yönetilmez.

**Recent Timeline**

Timeline yalnızca materyal olayları içerir:

- canonical edit
- light scrape completed
- deep scrape completed
- audit updated
- conflict resolved
- record state changed
- Project OS item linked/unlinked

V1’de en fazla son 10–12 olay gösterilir. Sonsuz aktivite akışı yoktur.

#### Veri katmanlari

**Canonical core**

Operator-edited accepted truth.

Örnek alanlar:

- id
- name
- segment
- category
- phone
- address_text
- website_status
- website_url
- operator_summary
- record_state
- last_verified_at
- updated_by
- updated_at

**Operator assessment**

Operator-authored internal diagnosis.

Örnek alanlar:

- latest_audit_id
- audit_total_score
- maps_score
- trust_score
- website_score
- conversion_score
- freshness_score
- commercial_readiness
- maintenance_need
- assessment_note
- assessed_by
- assessed_at

**External snapshots**

Immutable observations.

Örnek alanlar:

- snapshot_id
- business_id
- source_kind
- run_type
- collected_at
- raw_ref
- normalized_candidates
- confidence
- status

**Derived layer**

Recomputed helper objects.

Örnek alanlar:

- missing_required_fields
- open_conflicts
- freshness_state
- attention_level
- next_step
- stale_reason

#### Veri kurallari

- External snapshot hiçbir zaman canonical core’u doğrudan güncellemez.
- External candidate, ancak operator accept action ile canonical’a yazılır.
- Her accept/reject olayı timeline’a düşer.
- Derived layer elle düzenlenmez.
- Canonical core ile operator assessment ayrı tutulur.
- Aynı bilgi iki farklı “truth” bloğunda yeniden yazılmaz. Bu repo’nun tek kanonik yer prensibiyle uyumludur. citeturn28view0

#### Next Step kurali

V1’de öneri motoru deterministic çalışır. Kural sırası:

- Açık identity conflict varsa: **Review Conflict**
- Zorunlu canonical alan eksikse: **Complete Record**
- Hiç başarılı light scrape yoksa veya stale ise: **Run Light Scrape**
- Audit yoksa: **Create / Update Audit**
- Audit tamam ve teklif fırsatı netse, açık Project OS işi yoksa: **Create Project OS Item**
- Sorun daraltılamıyor ve daha fazla kanıt gerekiyorsa: **Run Deep Scrape**

Deep scrape her zaman secondary action’dır. Primary default olamaz.

#### Etkilesimler

**Edit Canonical Drawer**

- canonical core alanlarını düzenler
- save sırasında updated_by ve updated_at üretir
- external veriyi otomatik import etmez

**Conflict Review Drawer**

- bir field için canonical ve external adayları yan yana gösterir
- operator accept / dismiss kararı verir
- karar event log’a yazılır

**External Evidence Drawer**

- snapshot listesi
- kaynak
- collected_at
- raw preview
- normalized candidate fields

**Deep Scrape Confirm Modal**

- neden gerekiyor?
- hangi soru çözülecek?
- mevcut light scrape neden yetmiyor?

#### Bos ve hata durumlari

- İşletme kaydı var ama audit yok: “Audit yok” durumu ve CTA
- İşletme kaydı var ama light scrape hiç yok: “External snapshot yok” durumu ve CTA
- Scrape başarısız: son hata özeti + retry
- Canonical kayıt eksik ama external snapshot var: external info yalnızca kanıt olarak görünür
- Project OS linki yok: mini-card pasif görünür, create action sadece rule uygunsa açılır

#### V1 disi

- generic notes wall
- ilişki / touchpoint geçmişi
- müşteri iletişim kutusu
- portföy analitiği
- otomatik merge
- cross-business graph
- custom dashboard layout
- çok rollü approval system

#### Uygulama sirasi

**Adim bir**

- `businesses` temel şema
- read-only Business Detail shell
- canonical summary + record state

**Adim iki**

- audit summary modeli
- Audit Snapshot bloğu
- short operator summary

**Adim uc**

- light scrape run metadata
- external snapshots summary
- external evidence drawer

**Adim dort**

- conflict model
- conflict review drawer
- deterministic next-step logic

**Adim bes**

- Project OS mini-link
- compact timeline
- deep scrape confirm modal

Bu sıra, repo’daki mevcut teknik varsayımlarla ve roadmap öncelikleriyle uyumludur: admin/front-end Next.js, veri tarafı Postgres + Prisma, küçük otomasyonlar ve önce veri modeli / operasyon görünürlüğü mantığı. citeturn22view0turn25view3turn28view0

## Ustunluk savunmasi

**12. Ustunluk savunmasi**

Mevcut `business-detail-v1.md` dosyasını okuyamadığım için, yazdığım versiyonun o metinden **kesin olarak** daha iyi olduğunu kanıtlayamam. Bunu dürüstçe söylemek gerekir. Kanıtlayabildiğim şey şu: bu rewrite, verdiğiniz ürün kontratına ve erişilebilen repo gerçekliğine daha sıkı oturuyor.

**1. daha hizli operator karari**

Yeni versiyon “Next Step + Audit Snapshot + Gaps/Conflicts” omurgasını merkeze alıyor. ROADMAP’in home ekranını bile “aktif iş ve kritik aksiyon yüzeyi”ne çekme yönü düşünüldüğünde, Business Detail’in bundan daha gevşek olması için bir neden yok. NN/g’nin görünür durum ve recognition-over-recall ilkeleri de bunu destekliyor. citeturn25view3turn19search1turn19search2

**2. daha net bilgi hiyerarsisi**

Yeni yapı audit scorecard boyutlarını doğrudan above-the-fold özetine çeviriyor; ana sayfada primary content, drawer’da secondary content tutuyor. Baymard’ın araştırması da ana içerik ayrı yüzeylere itildiğinde bilgi kaçırma ve yön kaybı olduğunu gösteriyor. citeturn26view0turn20view0

**3. daha az belirsizlik**

Yeni model canonical core, operator assessment, external snapshots ve derived layer’ı açıkça ayırıyor. Bu ayrım olmadan “hangi veri doğru?” sorusu cevaplanamaz.

**4. daha dusuk CRM-style scope drift riski**

Repo belgeleri zaten genel CRM’i MVP dışı bırakıyor. Yeni versiyon bu dışlamayı sayfa tasarımına kadar indiriyor; notes wall, ilişki geçmişi ve pipeline furniture’ı yüzeyden uzak tutuyor. citeturn22view0turn25view3

**5. daha temiz V1 siniri**

Sayfada kalacak, drawer’a gidecek ve ayrı yüzeye taşınacak şeyler ayrı ayrı tanımlandı. Bu, Product OS ile Detail yüzeyi arasındaki doğal sınırı koruyor. Repo da Businesses / Audits / Offers / Delivery’yi ilk fazda Project OS omurgası altında tutup Business Detail’i daha sonra açmayı öneriyor. citeturn22view0turn25view3

**6. daha gercekci implementasyon sirasi**

Yeni öneri mevcut teknik gerçekliğe oturuyor: Next.js admin yüzeyi, Postgres, Prisma ve küçük otomasyonlar. Ayrıca roadmap’in önce veri modeli ve operasyon görünürlüğü, sonra Business Detail açma yönüne uyuyor. citeturn22view0turn25view3turn28view0

**7. daha dusuk operasyon yuku**

Light scrape default, deep scrape opt-in. Deterministic next-step mantığı var. External data kanıt olarak geliyor ama silent override yapmıyor. Bunların toplamı hem veri güvenini hem operasyon maliyetini kontrol altında tutar.

**Zayif kalan yerler**

- Birincil referans dosyasını okuyamadığım için mevcut metne özgü tekrarları, tutarsız alan adlarını veya halihazırda çözülmüş kararları doğrulayamadım.
- Repo kod düzeyindeki gerçek route, Prisma schema ve mevcut component sınırlarına erişimim yok; bu yüzden isimlendirme ve UI slot önerileri mimariyle uyumlu görünse de tam entegrasyon garantisi veremem.
- Audit’in ayrı tablo mu, ayrı aggregate mi, yoksa business record’a bağlı sürümlü bir assessment mı tutulduğu mevcut koddan teyit edilemedi.

Buna rağmen net hükmüm değişmiyor: verdiğiniz kontrat ve erişilebilen repo yönü açısından en güvenli hareket **trim değil, rewrite**. Bu yüzey küçük işletme MVP’si için karar hızı üretmeli; bilgiyi sergilemek için şişmemeli. Repo belgeleri de tam olarak bu disipline işaret ediyor. citeturn22view0turn24view0turn28view0