# EsnafDigital İçin Tek Sayfa Yerel İşletme Sitesi Araştırması

## Yönetici özeti

Türkiye bağlamında küçük yerel işletme sitesi, masaüstü merkezli bir “kurumsal vitrin” değil; mobil kullanıcıların birkaç saniye içinde işletmenin ne yaptığını anlamasını, güven duymasını ve hemen arama, WhatsApp, yol tarifi veya rezervasyon aksiyonuna geçmesini sağlayan bir temas sayfası olmalıdır. 2025 başında Türkiye’de 80,7 milyon mobil bağlantı ve 77,3 milyon internet kullanıcısı vardı; TÜİK’e göre bireylerin %88,6’sı WhatsApp kullanıyor ve internetin en yaygın kullanım amacı mesajlaşma. Bu nedenle Arnavutköy’de berber, güzellik salonu ve kafe/restoran için üretilecek tek sayfa sitelerde mobil-first CTA mimarisi varsayılan olmalıdır. citeturn25view0turn3search1turn14search4

Araştırmanın en güçlü ortak sonucu şudur: bir yerel işletme sitesinin omurgası; açık işletme adı ve kategori, gerçek hizmet/menü içeriği, doğru adres-saat-telefon bilgisi, gerçek fotoğraflar, görünür iletişim butonları ve varsa gerçek yorumlar/sosyal profillerden oluşmalıdır. Google’ın yerel görünürlük rehberleri, eksiksiz ve doğru profil bilgisinin daha görünür olduğunu; saat, hizmet, fotoğraf ve yorumların hem bulunabilirlik hem de tercih edilme üzerinde etkili olduğunu söylüyor. Google’ın resmi GBP playbook’unda hizmet/menü detayları ve fiyatların “hemen güven” ürettiği, eksiksiz profillerin daha çok tıklama aldığı, fotoğrafların yol tarifi ve web tıklamalarını artırdığı, saat bilgisinin ise ziyaret eğilimini yükselttiği belirtiliyor. citeturn19view6turn27view4turn11view0

EsnafDigital için ürünleştirilebilir çözüm, “tek şablon herkese” yaklaşımı değil; ortak bir iskelet üzerine oturan ve segmente göre içerik ağırlığı değişen bir jenerasyon sistemi olmalıdır. Berber ve güzellik salonunda servis, uzmanlık, fiyat başlangıcı ve randevu; kafe/restoranda menü, mutfak türü, paket/al-götür/rezervasyon ve mekân fotoğrafları öne çıkmalıdır. Teknik olarak en güvenli yön, tek dosyalı `index.html` içinde semantik HTML, aynı dosyada sade CSS, gerekirse çok az JavaScript, görünür içerikle tutarlı JSON-LD ve agresif olmayan görsel tasarımdır. citeturn19view2turn29view0turn29view1turn16view0turn16view1turn16view4

### Açık sorular ve sınırlılıklar

Türkiye’de özellikle berber, güzellik salonu ve mahalle restoranı siteleri için yayımlanmış doğrudan A/B dönüşüm araştırması zayıf kaldı; bu nedenle rapor, Türk pazar sinyallerini Google/TÜİK/DataReportal verileriyle kuruyor ve görsel hiyerarşi, güven, erişilebilirlik, performans gibi alanlarda güçlü küresel UX kaynaklarına yaslanıyor. Ayrıca Google GBP playbook’taki bazı oranlar Google iç verileri ve vaka çalışmalarına dayanıyor; ürün kararları için çok faydalı olsalar da akademik deney tasarımı niteliğinde değiller. Bu yüzden aşağıda “doğrudan kanıt” ile “EsnafDigital yorumu” özellikle ayrıldı. citeturn11view0turn25view0turn20view1

## Temel bulgular

| Alan | Doğrudan kanıt | EsnafDigital yorumu |
|---|---|---|
| Mobil ve mesajlaşma | Türkiye’de 2025 başında 80,7 milyon mobil bağlantı vardı; internet penetrasyonu %88,3’tü. TÜİK 2025 verisinde WhatsApp kullanım oranı %88,6; internet kullanım amaçlarında mesajlaşma ilk sırada. citeturn25view0turn3search1turn14search4 | Birincil CTA seti masaüstü e-posta değil; telefon, WhatsApp, yol tarifi ve varsa rezervasyon olmalı. Mobil alt sabit CTA çubuğu mantıklı bir varsayılan. |
| Yerel görünürlük | Google, eksiksiz ve doğru iş bilgisine sahip işletmelerin yerel sonuçlarda daha görünür olduğunu; yerel sonuçların esasen alaka, mesafe ve bilinirliğe dayandığını söylüyor. Telefon, adres, kategori, saat ve ek nitelikler önemlidir. citeturn19view6 | Tek sayfa site, sadece “marka anlatısı” değil; Google Business Profile ve harita görünürlüğünü destekleyen net yerel veri yüzeyi olmalı. |
| Güven sinyalleri | Google’ın resmi playbook’unda saat bilgisinin müşteri güveni için kritik olduğu, hizmet/menü ve fiyat bilgisinin “immediate trust” ürettiği, fotoğrafların ziyaret/yol tarifi/web tıklamasını artırdığı belirtiliyor. Google ayrıca yorumlara verilen yanıtların işletmenin özenini gösterdiğini söylüyor. citeturn11view0turn27view0turn27view1 | Güven, sahte “5 yıldızlı” bloklardan değil; doğru saat, gerçek fotoğraf, açık fiyat/hizmet, görünür adres ve dış platformlara bağlı gerçek itibar sinyallerinden gelmeli. |
| Dış doğrulama | NN/g araştırmasında kullanıcılar, site içi referanslardan çok dış inceleme kaynaklarına güveniyor; şeffaflık ve gerçeklik kritik. Google da sahte veya teşvikli yorumlara yaptırım uyguluyor. FTC’nin 2024’te yürürlüğe giren kuralı aldatıcı, sahte veya teşvikli değerlendirmeleri hedef alıyor. citeturn20view1turn28view0turn28view1turn28view2 | Yorum bölümü varsa Google yorumlarına/linklerine yaslanmalı; veri zayıfsa yıldız bloğu uydurulmak yerine tamamen kaldırılmalı. |
| İçerik ve okunabilirlik | W3C’ye göre iyi sayfa yapısı için bölgeler ve başlıklar mantıksal biçimde işaretlenmeli; açıklayıcı başlıklar kullanıcıların yön bulmasına yardım eder. W3C formlar için kısa ve gerekli alanlarla sınırlı kalınmasını öneriyor. NN/g’ye göre görsel hiyerarşi ve belirgin alt başlıklar taramayı kolaylaştırır. citeturn16view4turn17view1turn26view0turn20view4turn20view5 | Tek sayfa sitenin gücü; az ama kritik içeriği doğru sırada göstermesidir. Uzun paragraflar ve kalabalık bloklar dönüşümü zayıflatır. |
| Modernlik ile sadelik dengesi | NN/g, karusellerin çoğu görünümde kolayca gözden kaçtığını; statik hero’nun çoğu durumda daha iyi olabildiğini söylüyor. web.dev, üstteki hero görselinin lazy-load edilmemesi ve kritik görsellerin önceliklendirilmesini öneriyor. citeturn31search0turn17view4turn17view5 | “Modern” görünüm; animasyon, slider ve efekt yığını değil; temiz hero, iyi boşluk kullanımı, gerçek fotoğraflar, net CTA ve sağlam tipografidir. |

## Gerekli site omurgası

### Her site için gerekli bölümler

Aşağıdaki yapı, tek sayfalık yerel işletme sitesi için EsnafDigital’in standart omurgası olmalıdır. Tablodaki “neden” sütunu doğrudan kanıta dayanır; bölümün nasıl uygulanacağı ise ürünleştirme yorumudur.

| Bölüm | İçerik standardı | Neden zorunlu |
|---|---|---|
| Hero ve hızlı aksiyon alanı | İşletme adı, kategori, kısa açıklama, mahalle/ilçe referansı, birincil CTA’lar: **Ara**, **WhatsApp**, **Yol tarifi**, varsa **Randevu/Rezervasyon**. Hero’da en fazla bir ana mesaj ve iki-üç buton olmalı. | Google, telefon, adres, kategori ve saat gibi bilgilerin yerel görünürlükte kritik olduğunu; kullanıcıların yerel işletmeleri çoğu zaman telefonlarında aradığını söylüyor. İletişim bilgisinin görünür ve harita uygulamasına bağlı olması da kullanıcı beklentisi. citeturn19view6turn20view0 |
| Hizmetler veya menü özeti | Berber/güzellikte hizmet listesi; restoranda menü grupları veya öne çıkan ürünler. Varsa açıklama ve fiyat başlangıçları gösterilmeli. | Google Business Profile’da hizmetleri gruplama, açıklama ve fiyat ekleme mümkündür; Google’ın playbook’unda kapsamlı teklif/menü ve fiyatların güven ürettiği, kullanıcıların işletmeyi ziyaret etmeden önce içeriğe baktığı belirtiliyor. citeturn19view2turn11view0 |
| Gerçek görseller | Kapak görseli, işletme fotoğrafları, varsa iç/dış mekân, ekip, uygulama/servis veya ürün fotoğrafları. | Google, logo ve kapak görselinin tanınmayı artırdığını; fotoğrafların daha fazla ziyaret, yol tarifi talebi ve web tıklamasıyla ilişkili olduğunu söylüyor. citeturn27view2turn27view3turn11view0 |
| Güven kanıtı alanı | Gerçek puan/sayı varsa yorum özeti; yoksa işletme öne çıkanları, ödeme yöntemleri, Wi‑Fi, dış mekân oturma, hijyen, park, çocuk saç kesimi, uzmanlık gibi gerçek nitelikler. | Google, niteliklerin doğrudan Search/Maps’te görünerek bulunabilirlik ve şeffaflık sağladığını; yorum yanıtlama ve olumlu yorumların öne çıkmaya yardımcı olabileceğini belirtiyor. Dış kaynaklı itibar sinyalleri de site içi referanslardan daha güvenilir algılanıyor. citeturn11view0turn19view6turn20view1 |
| İşletme özeti veya “neden bizi seçmeli” alanı | Çok kısa, gerçek ve yerel dilde açıklama: işletmenin tarzı, uzmanlığı, hedef kitlesi veya fark yaratan yönü. Mümkünse sahip/ekip yüzü ve kısa biyografi. | Google işletme açıklamasını potansiyel müşterilerle bağ kuran temel araç olarak tanımlıyor. NN/g’ye göre “About” içerikleri açık, özgün ve şeffaf olmalı. citeturn12view0turn20view2 |
| Konum, saat ve iletişim | Açık adres, çalışılan bölge, çalışma saatleri, telefon, WhatsApp, sosyal bağlantılar, harita bağlantısı; restoranda ek saatler veya servis türleri. | Google, doğru ve güncel saat/adres/iletişim bilgisinin müşteri güveni ve görünürlük için önemli olduğunu söylüyor. NN/g de yerel şube/konum, saat ve harita açılan adres bağlantısını açıkça öneriyor. citeturn19view1turn19view0turn20view0turn29view1 |
| Alt bölüm ve makinece okunabilir veri | Temiz footer, tekrar iletişim bilgileri, sosyal bağlantılar, telif, gerekiyorsa yasal eller; ayrıca görünür içerikle tutarlı JSON-LD `LocalBusiness` / alt türü. | Google, yapılandırılmış verinin sayfadaki görünür içeriği açıklaması gerektiğini ve görünmeyen/farklı bilgi eklenmemesi gerektiğini söylüyor. Yerel işletme structured data, iş saatleri ve diğer alanları Google’a anlatabilir. citeturn16view0turn16view1 |

Bu omurga, segment fark etmeksizin yeniden kullanılabilir. Değişmesi gereken şey, bölüm sırası değil; her bölümün ağırlığıdır. Berber ve güzellik salonunda “hizmet + randevu” daha yukarı taşınmalı; kafe/restoranda “menü + ortam fotoğrafı + rezervasyon/sipariş” daha baskın olmalıdır. citeturn19view2turn29view0turn29view1

### İsteğe bağlı ve segmente göre değişen bölümler

| Segment | Değişmesi gereken ana vurgu | Uygun ek bölümler | Kanıt düzeyi |
|---|---|---|---|
| Berber | Saç/sakal hizmetleri, hızlı ulaşım, fiyat başlangıcı, walk-in veya randevu netliği. | Popüler paketler, çocuk saç kesimi, ustalar/barber profili, ödeme şekilleri, park bilgisi. | Hizmet listesi, fiyat ve booking/link tarafı güçlü kanıta dayanıyor; “usta profili” ve “çocuk saç kesimi” ürünleştirme yorumu. citeturn19view2turn19view3turn18view1 |
| Güzellik salonu | Randevu odaklı akış, hizmet süresi veya fiyat başlangıcı, uzmanlık alanı, hijyen ve gerçek sonuç görselleri. | Uzman profilleri, cilt/bakım kategorileri, kampanya alanı, sertifika veya eğitim bilgisi yalnızca gerçekse. | Booking, hizmet, fiyat, yorum ve fotoğraf kısmı güçlü; “sertifika kartı” ve “uzman profili” kontrollü yorum. citeturn19view2turn19view3turn18view2turn11view0 |
| Kafe ve restoran | Menü, mutfak türü, öne çıkan tabaklar, mekân atmosferi, iç/dış servis seçenekleri, rezervasyon veya sipariş. | Menü sekmeleri, günün spesiyali veya kampanya alanı, paket servis/al-götür/delivery etiketleri, bekleme listesi veya rezervasyon linki. | En güçlü doğrudan kanıt bu segmentte var: Google restoran rehberi, menü, rezervasyon, servis nitelikleri ve `Restaurant` şeması açık. citeturn29view0turn29view1turn18view3turn18view4 |

### Veri-bölüm eşleme tablosu

| Yapılandırılmış veri alanı | Yerleşeceği ana bölüm | Uygulama notu |
|---|---|---|
| `business_name`, `category` | Hero, `<title>`, H1, JSON-LD | En görünür metin. Kategori mutlaka sade Türkçe yazılmalı. citeturn19view6turn16view1 |
| `short_description` | Hero alt metni, işletme özeti, meta description | Kısa, doğal ve yerel bağlamlı olmalı; snippet için kullanılabilir. citeturn12view0turn16view2 |
| `services` | Hizmetler/menü bölümü, JSON-LD | Hizmet grubu + kısa açıklama + fiyat varsa göster. Hizmet yoksa ilgili bölüm küçültülür. citeturn19view2turn16view1 |
| `address`, `map_info` | Konum bölümü, yol tarifi butonu, JSON-LD | Tam adres text olarak görünür olmalı; yalnız embed’e güvenilmemeli. citeturn20view0turn19view6 |
| `phone` | Hero CTA, iletişim bölümü, footer, JSON-LD | Tıklanabilir telefon aksiyonu birincil CTA olabilir. citeturn19view6turn20view0 |
| `whatsapp` | Hero CTA, mobil sabit CTA, footer | Türkiye bağlamında yüksek öncelik. Veri yoksa tamamen kaldır. citeturn3search1turn14search4 |
| `working_hours` | Konum/saat bölümü, JSON-LD | Düzenli ve özel saat mantığı desteklenmeli. citeturn19view1turn16view1 |
| `photos` | Hero görseli, galeri, alt metinler | Üstteki hero görseli lazy-load edilmemeli; alt görseller lazy olabilir. Boyutlar tanımlanmalı. citeturn17view4turn17view5turn34search0 |
| `social_links` | İletişim bölümü, footer, JSON-LD `sameAs` | Aktif ve resmi hesaplar varsa göster; pasif/boş hesapları gösterme. citeturn11view0turn36search0 |
| `reviews`, `rating`, `review_count` | Güven alanı | Sadece gerçek veri varsa. Yoksa yorum kartını kaldır; yıldızları uydurma. citeturn27view0turn20view1turn28view0 |
| `highlights`, `attributes` | Güven alanı, hizmet özeti | Wi‑Fi, dış mekân oturma, park, ödeme, çocuklara uygun, hijyen gibi gerçek nitelikler. citeturn11view0turn19view6 |
| `cta_text`, `booking_link`, `order_link` | Hero CTA ve bölüm içi CTA’lar | Varsa “Randevu Al”, “Rezervasyon Yap”, “Sipariş Ver”; yoksa telefon/WhatsApp’a düş. citeturn19view3turn29view1 |

### Eksik veri kuralları

| Eksik veri | Uygulanacak fallback | Yapılmaması gereken |
|---|---|---|
| Kısa açıklama yok | Ad + kategori + konum + temel hizmetlerden tek cümlelik açıklama türet. | Süs cümlesi, ajans jargonu veya doğrulanamaz iddia yazma. |
| Hizmet var ama fiyat yok | Sadece hizmet isimlerini ve gerekiyorsa “fiyat için arayın/WhatsApp” CTA’sını göster. | Uydurma fiyat, “başlayan fiyat” tahmini veya para simgesi oyunu yapma. |
| Fotoğraf yok | Galeri alanını kaldır; temiz tipografi ve renk yüzeyleriyle ilerle. Logo varsa onu kullan. | Stok fotoğraf galerisiyle işletmeyi sanki gerçek mekânmış gibi göstermeye çalışma. |
| Yorum verisi yok | Yorum bloğunu kaldır; güveni saat, adres, gerçek hizmet içeriği ve sosyal/harita linkleriyle kur. | Sahte yıldız, sahte alıntı, sahte sayılar üretme. citeturn20view1turn28view0turn28view2 |
| WhatsApp yok | WhatsApp butonunu tamamen kaldır; telefon veya rezervasyon öne çıkar. | Boş, pasif veya devre dışı CTA gösterme. |
| Adres yok ama hizmet bölgesi var | “Hizmet bölgesi” metni kullan; harita/directions yerine arama ve WhatsApp CTA’sını öne çıkar. | Uydurma harita pin’i veya sahte adres yazma. |
| Çalışma saati yok | Saat alanını ya kaldır ya da yalnızca “güncel saat için arayın” ifadesini kullan; ama görünür saat tablosu yapma. | Tahmini çalışma saati üretme. |
| Rezervasyon linki yok | “Randevu Al” yerine “Ara” veya “WhatsApp’tan Yaz” CTA’sına düş. | Çalışmayan form veya sahte rezervasyon akışı kurma. |
| Sosyal link yok | Sosyal ikonları tamamen kaldır. | Tıklanmayan ikon sırası bırakma. |
| Form endpoint’i yok | İletişim formu ekleme; telefon, WhatsApp, harita ve sosyal kanalları kullan. | Çalışmayan “Bize Yazın” formu koyma. citeturn26view0turn20view0 |

## Güven, dönüşüm ve modern görünüm

### Güven ve dönüşüm kontrol listesi

Aşağıdaki maddeler, EsnafDigital’in tek sayfa jenerasyon sisteminde varsayılan kural olarak uygulanmalıdır:

- Telefon, WhatsApp, yol tarifi ve varsa rezervasyon CTA’ları ilk ekran içinde görünmeli. Türkiye’de mesajlaşma ve mobil kullanım çok güçlü; Google da yerel aramanın sıkça telefon üzerinden yapıldığını açıkça örnekliyor. citeturn25view0turn14search4turn19view6
- Saat bilgisi açık ve güncel olmalı; tatil/özel saat mantığı desteklenmeli. Google, saat bilgisini müşteri güveni ve ziyaret kararı için kritik görüyor. citeturn19view1turn11view0
- Hizmet ya da menü bölümü gerçekten karar vermeye yardım etmeli: grup adı, kısa açıklama ve gerçek fiyat/veri varsa gösterilmeli. citeturn19view2turn11view0turn29view1
- Adres metin olarak görünmeli ve harita uygulamasına açılmalı; yalnızca görsel harita gömmesi yeterli sayılmamalı. citeturn20view0turn19view6
- Yorumlar varsa gerçek ve dış kaynakla uyumlu olmalı; mümkünse Google yorum sayfasına bağlantı verilmeli. Dış kaynaklı itibar, site içi “müşteri dedi ki” bloklarından daha güvenilir algılanıyor. citeturn20view1turn27view0turn28view0
- İşletme özeti kısa, doğal ve yerel olmalı; “1998’den beri” gibi bilgiler yalnızca veri varsa gösterilmeli. NN/g’ye göre kullanıcılar About içeriklerinde netlik, özgünlük ve şeffaflık bekliyor. citeturn20view2
- Aktif sosyal bağlantılar yalnızca gerçekten aktif hesaplar için gösterilmeli. Google’ın resmi playbook’unda sosyal bağlantıların ziyaret öncesi kontrol edildiği belirtiliyor. citeturn11view0turn25view0
- İletişim formu varsa minimum alanla kurulmalı; aksi durumda form yerine doğrudan temas kanalları tercih edilmeli. W3C kısa ve gerekli alanlarla sınırlı formları öneriyor. citeturn26view0

### Modern görsel tasarım kontrol listesi

“Modern ama yerel” görünüm için önerilen kalıp şudur:

- Statik ve güçlü bir hero kullan; karusel/slider’ı varsayılan olarak kullanma. Kullanıcılar karuselleri kolayca atlayabiliyor; statik hero çoğu durumda daha nettir. citeturn31search0
- Birincil CTA’yı renk ve boyutla öne çıkar; ikincil CTA’ları daha sakin tut. NN/g’ye göre görsel hiyerarşi, kullanıcının nereye bakacağını ve hangi öğelerin birlikte algılanacağını belirler. citeturn20view4
- Başlıklar kısa ve açıklayıcı olsun; her bölüm tek bakışta anlaşılmalı. Açıklayıcı başlıklar taramayı ve yön bulmayı güçlendirir. citeturn17view1turn20view5
- Tasarım dili “SaaS landing page” değil, “gerçek yerel işletme” hissettirmeli: gerçek fotoğraflar, net adres, hizmet gerçekliği, sıcak ama sade renk kullanımı. Güven tasarım kalitesi, açıklık ve şeffaflıkla kuruluyor. citeturn20view1turn20view2
- Görsel alanlarda fazla efekt yerine boşluk, hizalama ve sade kart yapıları kullan. Grid mantığı ve temiz hizalama okunabilirliği artırır. citeturn20view5
- Butonlar ve dokunma hedefleri mobil için rahat kullanılmalı; W3C minimum 24×24 CSS piksel hedef boyutuna işaret ediyor. citeturn17view0
- Metin-kontrast farkı yeterli olmalı; web.dev düşük kontrastın en yaygın erişilebilirlik sorunlarından biri olduğunu vurguluyor. citeturn13search12turn17view2
- Fotoğraflar gerçek ve bağlamsal olmalı; dekoratif olanlar sade tutulmalı, bilgi taşıyanlara anlamlı alt metin verilmeli. citeturn34search0turn34search9

### Kaçınılması gereken anti-pattern’ler

- **Sahte yorumlar, teşvikli yorumlar, AI ile yazılmış kullanıcı alıntıları, uydurma puan ve sayılar.** Google bu tip fake engagement için kısıtlama uygulayabiliyor; FTC de aldatıcı değerlendirmelere yaptırım çerçevesi kurdu. citeturn28view0turn28view1turn28view2
- **Hero’da otomatik dönen slider/karusel.** Çoğu zaman dikkat dağıtır, gözden kaçar ve ürün mesajını zayıflatır. citeturn31search0
- **Üstteki hero görselini lazy-load etmek.** web.dev, above-the-fold hero görsellerinde lazy-loading’in LCP’ye zarar verebileceğini açıkça belirtiyor. citeturn17view4turn17view5
- **Parallax veya ağır dekoratif efektler.** NN/g, parallax’ın yükleme ve okunabilirlik sorunları yaratabildiğini söylüyor. citeturn20view5
- **Çok sayıda sosyal proof widget’ı ve gömülü feed.** NN/g, sosyal proof öğelerinin arayüzü kalabalıklaştırıp özellikle mobilde yükleme süresini artırabileceğini vurguluyor. citeturn20view3
- **Gizli ya da zor bulunan iletişim bilgisi.** Kullanıcılar iletişim bağlantısını üst sağ veya footer’da bekliyor; saklamak güveni düşürüyor. citeturn20view0
- **Gerçek veriden kopuk yapılandırılmış veri.** Google, structured data’nın görünür sayfa içeriğiyle aynı şeyi anlatması gerektiğini söylüyor. citeturn16view0turn16view1
- **Çalışmayan form, bozuk rezervasyon butonu, boş sosyal ikonlar.** Kırık CTA güven kaybı üretir; veri yoksa buton da olmamalıdır. Bu, rapordaki tüm fallback mantığının merkezidir. citeturn26view0turn20view0

## Teknik üretim çerçevesi

Tek dosyalı `index.html` üretim sistemi için en güvenli teknik standart şudur: semantik HTML5 bölgeleri (`header`, `main`, `section`, `nav`, `footer`), mantıklı başlık hiyerarşisi, görünür veriyle tutarlı JSON-LD, aynı dosyada sade ve okunabilir CSS, yalnızca gerektiğinde minimal JavaScript, mümkün olduğunca statik `<head>` meta etiketleri ve düşük bağımlılık. W3C sayfa bölgeleri ve mantıksal başlık yapısını öneriyor; Google ise meta açıklamasının ve structured data’nın doğrudan HTML’de, geçerli `<head>` içinde ve mümkünse JavaScript ile sonradan enjekte edilmeden yönetilmesini tavsiye ediyor. citeturn16view4turn17view1turn16view2turn16view3

Erişilebilirlik için `html` etiketinde dil belirtilmeli; W3C tekniği bunu doğrudan `lang` niteliğiyle yapmayı yeterli yöntem olarak tanımlıyor. Görsellerde bilgi taşıyan öğelere anlamlı `alt`, dekoratif olanlara boş `alt=""` ya da CSS arka plan yaklaşımı kullanılmalı. Form varsa her kontrol etiketlenmeli, gerekli yönergeler verilmeli ve mümkün olduğunca kısa tutulmalı. Dokunma hedefleri küçük bırakılmamalı. citeturn37view0turn34search0turn34search7turn26view0turn17view0

Performans tarafında görsellerin `width` ve `height` değerleri verilerek CLS azaltılmalı; fold altındaki görseller `loading="lazy"` ile ertelenebilir, fakat üstteki ana hero görseli lazy yüklenmemelidir. Kritik hero görselinde gerektiğinde `fetchpriority="high"` kullanılabilir. Bu, özellikle tek dosyalı, mobil-first sitelerde ilk anlamlı görünümü hızlandırır. citeturn17view4turn17view5turn17view3

Structured data için ana sayfada `LocalBusiness` ve uygun alt tür kullanılmalı: güzellik salonu için `BeautySalon`, restoran için `Restaurant`; berber için kaynaklarda ayrı bir “BarberShop” türü görülmediği için `HairSalon` veya genel `LocalBusiness`, kontrollü bir fallback olarak düşünülebilir. Bu nokta doğrudan standarttan çok uygulama yorumudur; hangi tür seçilirse seçilsin, adres, telefon, saat, sosyal profiller ve görünür iş bilgisiyle tutarlı olmalıdır. Restoranda `hasMenu`, `servesCuisine`, gerekiyorsa `acceptsReservations`; sosyal profiller için `sameAs` düşünülebilir. citeturn18view0turn18view1turn18view2turn18view3turn18view4turn36search0

EsnafDigital jeneratörü için önerilen teknik varsayılanlar şunlardır: sistem font yığını, dış framework’süz CSS, ikon ihtiyacı varsa satır içi SVG, gereksiz kütüphane yok, iletişim CTA’ları anchor link, harita için öncelikle haritaya açılan bağlantı, yapılandırılmış veri için JSON-LD, SEO için benzersiz `title` ve `meta description`, erişilebilir odak stilleri ve mobilde okunabilir satır aralığı. Bunların bir kısmı doğrudan kullanıcı gereksinimlerinden, bir kısmı ise yukarıdaki performans/erişilebilirlik kaynaklarından türetilmiştir. citeturn16view2turn16view3turn37view0turn17view4turn26view0

## EsnafDigital için sonuçlar ve sonraki adımlar

### EsnafDigital için çıkarımlar

EsnafDigital’in en büyük avantajı, siteyi “tasarım projesi” gibi değil “veriden üretilen yerel görünürlük ve temas aracı” gibi ele alabilmesidir. Google’ın yerel görünürlük mantığı, eksik ve belirsiz içerikten çok doğru ve ayrıntılı veriyi ödüllendiriyor; dolayısıyla ürünün gerçek çekirdeği şablonun kendisi değil, veri kalitesi standardı olmalıdır. Adres, saat, telefon, hizmetler, fotoğraflar, yorumlar ve sosyal profiller eşit önemde değildir; ilk sürümde en çok dönüşüm getiren yüzeyler telefon, WhatsApp, harita, saat ve hizmet/menü açıklığıdır. citeturn19view6turn11view0turn25view0

Bu nedenle ürün mimarisi üç katmanda kurgulanmalıdır: ortak çekirdek şablon, segment eklentileri ve veri yeterlilik kuralları. Ortak çekirdek tüm işletmelerde aynı kalır; segment eklentileri bölümlerin vurgu sırasını değiştirir; veri yeterlilik kuralları ise hangi bölümün gösterileceğine karar verir. Bu yaklaşım, “eksik veride de şık gözüken ama yalan söylemeyen” jeneratif sistem kurmayı mümkün kılar. citeturn19view2turn29view1turn16view0

### Önümüzdeki 30 gün için önerilen aksiyonlar

Önümüzdeki 30 günde EsnafDigital için en yüksek getirili yol, tam kapsamlı görsel özgünleştirmeden önce kontrollü, veri güdümlü bir V1 üretim hattı kurmaktır.

1. **Bir kanonik işletme veri şeması tanımlayın.** Zorunlu alanları `business_name`, `category`, `phone`; güçlü önerilen alanları `address`, `working_hours`, `services`, `photos`, `whatsapp`, `map_info`; isteğe bağlı alanları `reviews`, `social_links`, `booking_link`, `highlights` olarak ayırın.  
2. **Tek ortak çekirdek şablon ve üç segment varyantı oluşturun.** Berber, güzellik salonu ve kafe/restoran için yalnız içerik sırası ve blok ağırlıkları değişsin; teknik iskelet sabit kalsın.  
3. **Veri yeterlilik puanı ekleyin.** Örneğin “İletişim hazır”, “Konum hazır”, “Görsel hazır”, “İtibar hazır”, “Rezervasyon hazır” gibi skorlar; hangi blokların gösterileceğini bu skor belirlesin.  
4. **Yorum ve fotoğraf için katı gerçeklik kapıları tanımlayın.** Gerçek veri yoksa bölüm otomatik kapansın; sahte yıldız, stok-mekân galerisi ve uydurma istatistik üretilmesin. Bu, uzun vadeli marka güveni için kritiktir. citeturn28view0turn28view2turn20view1  
5. **V1’e JSON-LD, özgün `title`, özgün `meta description` ve temel performans kuralları yerleştirin.** Bu katman jeneratörün default çıktısı olsun. citeturn16view1turn16view2turn16view3turn17view4  
6. **Arnavutköy’de küçük bir pilot cohort başlatın.** Her segmentten birkaç işletmeyle test edin; temel başarı metrikleri telefon tıklaması, WhatsApp tıklaması, yol tarifi, rezervasyon tıklaması ve GBP web/arama etkileşimi olsun. Google Business Profile performans raporları çağrı, website clicks, directions, menus ve bookings gibi metrikleri zaten sunuyor. citeturn33view0turn33view1  
7. **Bakım hattını ürünün parçası yapın.** Saat, menü, kampanya, özel gün, fotoğraf ve sosyal link güncellemeleri “maintenance” fazında sistematik bir checklist ile yürüsün; yerel işletmelerde güven kaybının en hızlı nedeni eski/veri dışı sitedir. citeturn19view1turn19view6turn29view1  

## Üretime hazır Türkçe prompt

Aşağıdaki prompt, bu araştırmadaki yüksek güvenli kuralları üretime dönük hale getirmek için tasarlandı. Kopyalayıp başka bir HTML-yazan modele verebilirsiniz.

```text
Sen tek dosyalık yerel işletme web sitesi üreten bir HTML yazma modelisin.

Görevin:
Sana verilecek yapılandırılmış işletme verisinden yalnızca ve yalnızca tam bir `index.html` üret.

ÇOK ÖNEMLİ ÇIKTI KURALLARI
- Sadece tamamlanmış `index.html` çıktısı ver.
- Markdown kullanma.
- Kod bloğu kullanma.
- Açıklama, not, değerlendirme, özet veya ek metin yazma.
- Eksik veri varsa bölüm eklemek yerine bölümü kaldır veya sadeleştir.
- Asla lorem ipsum kullanma.
- Asla sahte yorum, sahte puan, sahte sayı, sahte kampanya, sahte ödül veya doğrulanmamış iddia üretme.
- Elindeki veride olmayan hiçbir bilgiyi uydurma.

TASARIM HEDEFİ
- Türkiye’deki küçük yerel işletmeler için modern, sade, güven veren, mobil öncelikli bir tek sayfa site üret.
- Bu bir genel kurumsal/SaaS sayfası olmasın.
- Site; gerçek bir mahalle/esnaf işletmesi hissi versin.
- Birincil dönüşüm hedefleri:
  1) telefon araması
  2) WhatsApp iletişimi
  3) haritada yol tarifi
  4) varsa rezervasyon / sipariş / randevu

DİL VE ÜSLUP
- Tüm metinler doğal, akıcı, kısa ve güven veren Türkçe olmalı.
- Çeviri kokan yapay “pazarlama dili” kullanma.
- Kısa cümleler kullan.
- Okunabilirlik öncelikli olsun.
- Bölüm başlıkları sade ve net olsun.
- Metinler işletme kategorisine uygun olsun:
  - berber için samimi ve net
  - güzellik salonu için düzenli, özenli ve güven verici
  - kafe/restoran için iştah açıcı ama abartısız

TEKNİK KURALLAR
- Geçerli bir HTML5 dokümanı üret.
- `<!doctype html>` ile başla.
- `<html lang="tr">` kullan.
- Semantik HTML kullan: `header`, `main`, `section`, `nav`, `footer`, `address`, `figure` gibi uygun etiketleri tercih et.
- Tüm CSS aynı dosyada, `<style>` içinde olsun.
- Mümkünse JavaScript kullanma.
- JavaScript yalnızca gerçekten gerekiyorsa ve çok az kullanılmalı.
- Harici CSS framework kullanma.
- Harici JS framework kullanma.
- Sayfa tamamen responsive olsun.
- Mobil görünüm öncelikli olsun.
- Erişilebilirlik gözet:
  - mantıklı başlık hiyerarşisi
  - yeterli kontrast
  - belirgin odak stilleri
  - görsellere uygun `alt` metinleri
  - dekoratif görsellerde uygun boş `alt`
  - ikon butonlarda metinsel erişilebilir ad
- Kahraman/hero görseli varsa üstteki ana görseli lazy-load etme.
- Fold altındaki görsellerde `loading="lazy"` kullanabilirsin.
- Görsellerde mümkün olduğunda `width` ve `height` ver.
- SEO için anlamlı `<title>` ve `<meta name="description">` oluştur.
- `meta keywords` kullanma.
- Yapılandırılmış veri olarak görünür içerikle tutarlı bir JSON-LD ekle:
  - genel olarak `LocalBusiness`
  - kategoriye uygunsa:
    - güzellik salonu: `BeautySalon`
    - kafe/restoran: `Restaurant`
    - berber: uygun durumda `HairSalon` veya genel `LocalBusiness`
- JSON-LD içinde yalnızca gerçekten verilen verileri kullan.

GENEL YAPISAL KURALLAR
Site tek sayfa olacak. Gerektiğinde anchor link’li basit bir üst menü olabilir.
Varsayılan bölüm mantığı aşağıdaki gibi olsun; ama veri eksikse bazı bölümleri kaldır:

1. Üst alan / hero
- İşletme adı
- Kategori
- Kısa açıklama
- Konum referansı
- Birincil CTA’lar:
  - telefon varsa “Ara”
  - WhatsApp varsa “WhatsApp’tan Yaz”
  - adres/map varsa “Yol Tarifi Al”
  - booking/order varsa uygun CTA:
    - “Randevu Al”
    - “Rezervasyon Yap”
    - “Sipariş Ver”
- Hero net, sade ve güçlü olsun.
- Aşırı büyük pazarlama sloganı kullanma.
- CTA’lar ilk ekranda görünür olsun.

2. Hizmetler veya menü
- İşletme kategorisine göre:
  - berber / güzellik salonu: hizmetler
  - kafe/restoran: menü veya öne çıkan ürünler
- Hizmetler gruplandırılabiliyorsa gruplandır.
- Kısa açıklama ekle.
- Fiyat varsa göster.
- Fiyat yoksa fiyat uydurma.
- Çok uzun liste verme; öne çıkan veya en faydalı listeyi ver.

3. Güven alanı
- Gerçek yorum verisi varsa kısa yorum özeti veya seçilmiş gerçek yorumlar göster.
- Yorum yoksa bu bölümü kaldır veya işletmenin gerçek öne çıkan özelliklerini göster:
  - ödeme yöntemleri
  - Wi‑Fi
  - dış mekân
  - hijyen
  - park
  - aile dostu
  - uzmanlık
- Sahte yıldız ve sahte sayaç kullanma.
- Veride olmayan “10+ yıl deneyim”, “5000 mutlu müşteri” gibi ifadeler yazma.

4. Görsel alan
- Gerçek fotoğraflar varsa galeri veya seçilmiş görseller kullan.
- Fotoğraf yoksa galeri ekleme.
- Fotoğraf yokken düzeni tipografi, boşluk ve renk alanlarıyla güçlü tut.
- Mekân/hizmet/ürün fotoğrafları varsa kategoriye uygun sırala.

5. İşletme özeti
- Çok kısa bir “Hakkında” veya “Neden tercih ediliyor” alanı olabilir.
- Gerçek veriye dayan.
- Abartılı marka hikâyesi yazma.
- Sahip/ekip bilgisi varsa kısa, samimi ve gerçek biçimde kullan.

6. Konum, saat ve iletişim
- Adres varsa açık metin olarak göster.
- Harita linki varsa buton ver.
- Çalışma saatleri varsa okunaklı tablo/listede göster.
- Telefon görünür olsun.
- WhatsApp görünür olsun.
- Sosyal linkler yalnızca gerçek ve verilen hesaplar için göster.
- İletişim bilgilerini saklama; net biçimde göster.

7. Alt bölüm
- İşletme adı
- kısa telif / kapanış
- iletişim tekrarı
- sosyal linkler varsa tekrar
- çok kalabalık footer yapma

SEGMENT KURALLARI

BERBER
- Hizmetleri net ve pratik göster.
- Saç kesimi, sakal, çocuk kesimi, bakım gibi hizmetler varsa uygun sırada sun.
- Hızlı ulaşım ve arama/WhatsApp CTA’sını güçlü tut.
- Tasarım maskülen olabilir ama sert ve karanlık olmak zorunda değil.
- “Mahalle berberi” güveni hissi verebilir.

GÜZELLİK SALONU
- Randevu CTA’sını öne çıkar.
- Hizmet kategorileri, uzmanlık alanları ve varsa fiyat başlangıçları görünür olsun.
- Temiz, ferah, düzenli bir görsel dil kullan.
- Varsa gerçek uzman profilleri veya kısa notlar göster.
- Hijyen, özen, profesyonellik duygusu önemli.

KAFE / RESTORAN
- Menü veya öne çıkan ürünler mutlaka erken görünmeli.
- Varsa mutfak türü, servis seçenekleri, reservasyon/sipariş CTA’ları gösterilmeli.
- Mekân atmosferini gerçek görsellerle hissettir.
- Paket servis / al-götür / yerinde servis bilgisi varsa görünür yap.
- Gereksiz uzun metin yerine iştah açıcı ama sade açıklamalar yaz.

MISSING DATA / FALLBACK KURALLARI
- `short_description` yoksa: ad + kategori + konum + temel hizmetlerden kısa, gerçekçi bir açıklama türet.
- `services` yoksa: hizmet bölümü ekleme.
- `photos` yoksa: galeri ekleme.
- `reviews` yoksa: yorum bölümü ekleme.
- `whatsapp` yoksa: WhatsApp CTA ekleme.
- `address` yoksa ama hizmet bölgesi varsa: adres yerine hizmet bölgesini göster; yol tarifi butonunu kaldır.
- `working_hours` yoksa: saat tablosu ekleme.
- `booking_link` / `order_link` yoksa: ilgili CTA’yı kaldır; telefon/WhatsApp CTA’sını öne çıkar.
- `social_links` yoksa: sosyal ikon kullanma.
- `map_info` yoksa: gömülü harita veya yol tarifi butonu ekleme.
- Form endpoint veya açık iletişim form bilgisi yoksa çalışmayan form ekleme.

GÖRSEL TASARIM KURALLARI
- Temiz, modern ve sade bir görünüm üret.
- Genellikle açık arka plan + net tipografi + tek vurgu rengi yaklaşımı kullan.
- Aşırı gradient, glassmorphism, karmaşık gölgeler, neon efektler, ağır animasyonlar kullanma.
- Görsel hiyerarşi çok net olsun.
- Hero statik olsun; otomatik dönen slider yapma.
- Kartlar, boşluk ve hizalama düzenli olsun.
- Site bir startup landing page gibi görünmesin.
- Gerçek yerel işletme hissi versin.

İÇERİKTE YAPILMAMASI GEREKENLER
- Lorem ipsum
- Sahte yorum
- Sahte yıldız puanı
- Sahte fiyat
- Sahte kampanya
- Sahte istatistik
- “Türkiye’nin en iyisi”, “1 numara”, “garantili memnuniyet” gibi doğrulanamaz iddialar
- İşletme verisinde olmayan marka renkleri, sertifikalar, ödüller veya unvanlar
- Blog, bülten, kariyer, uygulama indirme, yatırımcı dili, SaaS özellik gridi gibi alakasız kurumsal parçalar

EK KURALLAR
- Sayfa içeriği kısa ama yetersiz olmayacak kadar dolu olsun.
- Tek sayfada fazla bölüm kalabalığı yapma.
- CTA yoğunluğu yüksek ama spam hissettirmeyecek şekilde olsun.
- Mobilde CTA’lar rahat tıklanabilir olsun.
- Telefon, WhatsApp ve yol tarifi gibi aksiyonlar belirgin olsun.
- HTML okunaklı ve düzenli biçimde yazılsın.

GİRDİ VERİSİ
Aşağıdaki yapılandırılmış veriyi kullan:
{{BUSINESS_DATA_JSON}}

Şimdi yalnızca tam bir `index.html` üret.
```