# EsnafDigital için QR ve NFC Masaüstü Standlarında Derin Araştırma

## Yönetici özeti

**Yönetici özeti:** Türkiye’de internet kullanımı açık biçimde mobil ağırlıklı; Ulaştırma ve Altyapı Bakanlığı’nın 2025 verilerine göre 16 yaş ve üzeri internet kullanıcılarının yüzde 96,9’u internete erişim için cep telefonu kullanıyor ve web trafiğinin yüzde 73,1’i telefonlardan geliyor. Bu yüzden EsnafDigital’in shop içi fiziksel standları “telefonu hızlıca çıkar, tek hareketle işi bitir” mantığıyla tasarlanmalı; masaüstü stand bir mini broşür değil, fiziksel dünyadan mobile tek adımlı geçiş aracı olmalıdır. QR kodu ve NFC etiketi bu geçişi kolaylaştırır; ama ancak açık bağlam, net CTA ve doğru hedef sayfa ile çalışır. citeturn16view3turn16view1turn6search2turn6search5

EsnafDigital için en iyi varsayılan yaklaşım, çoğu işletmede **tek stand = tek ana amaç** kuralıdır. Nielsen Norman Group, QR kodların kullanıcıya kendi başına “nereye gideceğini” anlatmadığını; etkili olması için kodun ne yapacağının açık, kısa ve bağlamsal biçimde yazılması gerektiğini söylüyor. Aynı kaynak, QR’ın doğrudan ilgili sayfaya gitmesi gerektiğini; ana sayfaya düşmenin kötü deneyim olduğunu vurguluyor. Buna karar verme psikolojisi araştırmalarını da ekleyince, küçük yerel işletmelerde aynı stand üzerinde çok fazla seçenek sunmak yerine, temas noktasına göre ayrılmış tek amaçlı standların daha mantıklı olduğu sonucu çıkıyor. citeturn16view1turn9search1turn9search13turn9search15

Araştırmanın net sonucu şudur: **berber ve güzellik salonu için varsayılan ilk ürün “Google yorum standı”**, **kafe/restoran için varsayılan ilk ürün “masa üzeri menü standı”**, ikinci ürün ise çoğu işletmede **kasada yorum standı** olmalıdır. Google, işletmelerin yorum istemek için resmi link veya QR kod oluşturabileceğini; bunu mağazada sergilemenin, fişe koymanın, teşekkür e-postasında veya WhatsApp mesajında paylaşmanın uygun olduğunu söylüyor. Aynı zamanda yorum karşılığında indirim veya teşvik verilmesini açıkça yasaklıyor. Restoran tarafında National Restaurant Association verisi, müşterilerin QR ile menü açmaya, QR ile sipariş verme veya ödeme yapmaya göre daha istekli olduğunu gösteriyor. Bu da menü ve yorum akışlarının aynı masaüstü yüzeye yüklenmemesi gerektiğini destekliyor. citeturn16view0turn16view2turn25view0

**Temel bulgular:**  
- İyi bir standın çekirdeği; tek ana CTA, büyük ve temiz bir QR alanı, aynı hedefe giden NFC, kısa bir fallback URL ve küçük ama açık bir bağlamsal açıklamadır. QR kod tek başına güven üretmez; ne yapacağı yazılmalıdır. citeturn16view1turn17view1  
- QR baskısında en kritik kurallar; koyu kod-açık zemin, dört modüllük quiet zone, yeterli fiziksel boyut, bozulmamış kare modüller ve parlama üretmeyen yüzeydir. GS1 özellikle parlak ve yansıtıcı yüzeylere doğrudan baskıdan kaçınılmasını ve mat siyah + beyaz zemin kombinasyonunun en güvenlisi olduğunu söyler. citeturn17view0turn17view1turn17view2turn18view1  
- NFC yararlıdır ama tek başına güvenli değildir; Android NFC’yi tipik olarak 4 cm veya daha kısa mesafede çalışır diye tanımlar, Apple da “birkaç santimetre” yakınlık gerektiğini söyler. Bu nedenle “telefonunuzu yaklaştırın” ifadesi doğru, “dokundurun” ifadesi gereksiz derecede mekanik ve bazen yanıltıcıdır. citeturn19view1turn33search5turn6search12turn33search8  
- NFC’de standart NDEF ve NFC Forum tag ailesi kullanılmalı; Android dokümantasyonu yeni dağıtımlarda NFC Forum Type 1-4 etiketleri öneriyor. NXP’nin NTAG213/215/216 ailesi de mass-market perakende kullanımına göre tasarlanmış standart bir Type 2 ailesidir. citeturn19view2turn23search0turn23search1  
- Türkiye’de A6 ve A5 pleksi/akrilik masaüstü formatları yaygın, stoklu ve tekrarlanabilir; yerel tedarikçi sayfalarında 10,5 × 15 cm A6, 15 × 21 cm A5 ve özel QR stand ürünleri açıkça listeleniyor. Bu, EsnafDigital’in standartlaştırılmış üretim modeli kurmasını kolaylaştırır. citeturn22search5turn22search8turn21search1turn22search11  
- “QR + NFC birlikte completion rate’i ne kadar artırır?” sorusunda bağımsız ve güçlü kamusal saha verisi zayıf; bu yüzden birlikte kullanım önerisi dönüşüm ispatından çok **uyumluluk + yedeklilik + daha düşük sürtünme** mantığına dayanır. Buna rağmen QR’ın evrensel fallback, NFC’nin ise hızlandırıcı olması pratik olarak güçlü bir kombinasyondur. citeturn19view1turn33search2turn23search0

## Kanıtların söylediği şey

**Doğrudan kanıt:** QR kodlar kullanıcıya tek başına yeterli “information scent” vermez; yani kullanıcı, kodun nereye götürdüğünü QR’ın görüntüsünden anlayamaz. Nielsen Norman Group bu yüzden kodun ne yapacağını yazmayı, gerekirse okunabilir kısa URL göstermeyi ve QR’ı mutlaka mobil uyumlu, doğrudan ilgili sayfaya yönlendirmeyi önerir. Aynı kaynak, sadece logonun bağlam için yeterli olmadığını ve paragraf içine gömülü açıklamaların çoğu kullanıcı tarafından okunmayacağını söyler. Bu, EsnafDigital’in tüm standlarında “başlık + eylem + hedef türü” hiyerarşisini zorunlu hale getirmesi gerektiği anlamına gelir. citeturn16view1

Google’ın resmi Business Profile yardımı da fiziksel yorum standı kullanımını doğrudan destekliyor: işletmeler yorum istemek için resmi link veya QR oluşturabiliyor; bu kodu fişlere eklemek, teşekkür e-postasına koymak, sohbet sonunda paylaşmak ve mağazada sergilemek öneriliyor. Fakat Google aynı zamanda yorum karşılığında ücretsiz/indirimli ürün veya hizmet verilmesini “fake engagement” sayıyor ve yasaklıyor. Dahası, Google’ın kendi tavsiyesi “dürüst ve dengeli” yorumların güvene yardımcı olduğu yönünde; bu da stand metninin “5 yıldız verin” gibi yönlendirici değil, “deneyiminizi paylaşın” gibi dürüst ve nötr olması gerektiğini gösterir. citeturn16view0turn16view2

QR baskı tarafında en sağlam teknik çerçeve GS1 ve DENSO WAVE’den geliyor. DENSO, QR etrafında dört modül genişliğinde boş bir quiet zone gerektiğini ve modüllerin bozulacak şekilde büyütülüp küçültülmemesi gerektiğini açıkça belirtiyor. GS1 de düşük kontrastın, renk gradyanlarının, parlatıcı film ve metalik yüzeylerin taramayı bozduğunu; özellikle mat siyah kod ve açık, opak zemin kombinasyonunun en güvenilir seçenek olduğunu söylüyor. Kısacası, baskı tarafında “şık görünen ama zor okunan” tasarımlar değil, “sade, yüksek kontrastlı, mat ve temiz” tasarımlar kazanır. citeturn17view1turn17view2turn17view0turn18view0turn18view1

NFC tarafında Android dokümantasyonu, NFC’nin tipik olarak 4 cm veya daha kısa mesafede çalıştığını; NDEF’in standart veri biçimi olduğunu ve yeni dağıtımlarda NFC Forum Type 1-4 etiketlerin tercih edilmesi gerektiğini söylüyor. Apple ise desteklenen cihazlarda NFC taramanın “birkaç santimetre” yakınlıkta çalıştığını; metin dilinde “scan / near” yaklaşımının kullanılmasını öneriyor. Ayrıca Apple’ın arka plan etiket okuma desteği iPhone XS ve sonrasında bulunuyor. Bu yüzden Türkiye’de küçük işletme için pratik kural nettir: NFC eklenebilir, ama **QR mutlaka yedek olarak kalmalıdır**. citeturn19view1turn19view2turn33search2turn33search5turn6search12turn33search8

Restoran kullanım örneğinde doğrudan saha verisi de önemli bir ayrım veriyor. National Restaurant Association’ın 2024 raporunda, masa servisli restoran müşterilerinin yüzde 59’u QR ile menü açmaya sıcak bakarken, QR ile sipariş verme oranı yüzde 48, QR ile ödeme oranı yüzde 46’da kalıyor. Sınırlı servis restoranlarda da menü için QR kullanımı, ödeme ve siparişe göre biraz daha rahat kabul görüyor. Bu yüzden kafe/restoranda QR masa standının ana görevi “menüyü açmak” olmalı; yorum isteme ayrı bir temas noktasına, tercihen ödeme veya çıkış anına taşınmalıdır. citeturn25view0

**Yorum ve sentez:** Bu doğrudan kanıtların birlikte okunan sonucu, küçük yerel işletmelerde en yüksek performansın “fiziksel temas noktası başına tek görev” yaklaşımıyla elde edileceğidir. Kullanıcı karar verirken seçenek sayısı arttıkça karar yükü ve hata riski artar; QR kodun doğası da zaten tek bir fiziksel işaretten tek bir dijital aksiyona geçişte en iyi çalışır. Bu nedenle EsnafDigital için temel karar kuralı şu olmalıdır: müşteri o anda neye ihtiyacı varsa, stand da yalnızca onu teklif etsin. Çok amaçlı kullanım ancak resepsiyon veya bekleme alanı gibi “henüz hangi aksiyonu seçeceği belli olmayan” alanlarda savunulabilir; orada bile en iyi uygulama, bir fiziksel stand üzerinde birincil CTA’yı vermek ve gerekiyorsa açılan landing page içinde en fazla iki ikincil seçenek sunmaktır. Bu öneri, tek bir akademik deneyden değil; QR bağlam gereksinimi, doğrudan hedef sayfa ilkesi ve choice overload bulgularının birleşik yorumundan çıkıyor. citeturn16view1turn9search1turn9search13turn9search4

Buradan çıkan pratik cevaplar netleşiyor. **Tek amaçlı mı, çok amaçlı mı?** Varsayılan olarak tek amaçlı. **Sadece yorum standı mı, çoklu aksiyon standı mı?** Berber ve güzellik salonunda ilk kurulum için yalnızca yorum standı daha güçlü; kafe/restoranda masa üstünde yalnızca menü standı daha güçlü, yorum standı ayrı olmalı. **Hangi CTA daha iyi dönüşür?** Kullanıcının o andaki bağlamına bire bir uyan CTA: ödeme sonrası “Google’da yorum bırakın”, masaya oturunca “Menüyü açın”, resepsiyonda “WhatsApp’tan yazın”, vitrin veya girişte “Konumu açın”. Genelde “Bizi keşfedin” gibi soyut kopyalar değil, “Menüyü açın / Yorum bırakın / WhatsApp’tan yazın” gibi fiil temelli kopyalar daha güçlüdür. citeturn9search15turn9search6turn16view1

## Önerilen varsayılan stand stratejisi

**Önerilen varsayılan stand stratejisi:** EsnafDigital için en sağlıklı ürünleşme modeli, “tek şablon – çok işletme” mantığıyla çalışan bir **stand sistemi** kurmaktır. Bu sistemin standart çekirdeği aynı kalır; yalnızca işletmeye göre CTA, ikon, hedef link ve vurgu rengi değişir. Pratikte bu şu anlama gelir: tüm işletmeler için ortak bir A6 dikey gövde, ortak bir yerleşim ızgarası, ortak QR/NFC teknik standardı ve ortak üretim akışı kullanılır; segmente göre yalnızca görev ve yerleşim değişir. Türkiye’de A6 ve A5 masaüstü pleksi/QR stand formatlarının yerel üretimde yaygın oluşu da bu standardizasyonu ekonomik hale getirir. citeturn22search5turn22search8turn21search1turn22search11

**İşletmeler arasında standart kalması gerekenler:**  
- Gövde mantığı: tek ana CTA, büyük QR, aynı hedefe giden NFC, fallback URL, küçük marka alanı. citeturn16view1turn19view1  
- Teknik kurallar: koyu kod + açık zemin, dört modül quiet zone, mat yüzey, bozulmamış QR, mobil uyumlu hedef sayfa, dinamik yönlendirme tercihleri. citeturn17view1turn17view2turn17view0turn18view1turn13search0  
- Operasyon: her stand için tek hedef slug, iPhone + Android test, QR ve NFC’nin aynı sonuca gitmesi, teşviksiz ve dürüst yorum dili. citeturn16view2turn33search2turn19view1

**Segment bazında değişmesi gerekenler:**  
- Ana aksiyon: berber/güzellikte yorum veya WhatsApp; kafe/restoranda menü, ikinci aşamada kasada yorum. citeturn25view0turn16view0  
- Yerleşim: berberde kasa ve bekleme koltuğu; güzellik salonunda resepsiyon ve ödeme noktası; kafe/restoranda masa ve kasa ayrımı. citeturn16view0turn25view0  
- Ton: berberde daha hızlı ve net; güzellikte daha yumuşak ve güven verici; kafe/restoranda işlev odaklı. Bu kısım doğrudan saha mantığından türetilmiş bir yorumdur.  
- Görsel vurgu: menü için ürün/menü cue’ları; yorum için Google review cue; WhatsApp için açık iletişim cue’su. Logo destekleyici olabilir ama tek başına yeterli bağlam değildir. citeturn16view1

**Fiziksel tasarım kontrol listesi:**  
- Varsayılan yüz ölçüsü **A6 dikey 105 × 148 mm** olmalı; Türkiye’de 10 × 15 cm ve A6/A5 masaüstü pleksi formatları yaygın ve hazır tedarik ediliyor. Birden çok aksiyonu aynı yüzde taşımak gerçekten şartsa A5 dikey kullanılabilir; aksi halde A6 daha ucuz, daha az yer kaplayan ve daha tekrarlanabilir çözümdür. citeturn22search5turn22search8turn21search1turn21search6  
- Varsayılan yönelim **dikey** olmalı. Dikey format; başlık, kısa yönerge, büyük QR ve altta URL için daha temiz bir hiyerarşi sağlar. Yatay sadece masa ayak izi çok dar olduğunda veya üçgen/A-frame masa çadırında anlamlıdır. Bu öneri, QR’ın bağlam metni ve kodla aynı ölçüde görünür olma gereksinimine dayalı bir yorumdur. citeturn16view1  
- QR alanı, A6 yüzde **yaklaşık 32–40 mm kare** olacak şekilde planlanmalı; pratik minimumda 2,5 × 2,5 cm çoğu kaynakta güvenli alt sınır kabul edilir, ama DENSO da kodların mümkün olduğunca büyük basılmasını önerir. Close-range masaüstü kullanım için 3,2–4,0 cm aralığı güvenli ve rahat bir tarama penceresi verir. citeturn17view3turn28view2turn28view0  
- Tek yüzlü stand varsayılan olarak **kasa/resepsiyon** için daha uygundur; iki yüzlü veya üçgen stand ise **ortak masa** ve iki yönden yaklaşılabilen yüzeylerde avantaj sağlar. Ticari holder pazarında 4"×6" ve 5"×7" çift taraflı, üçgen ve A-frame formatların yaygınlığı bunu destekler; yine de bu bulgu daha çok uygulama pratiğinden gelir. citeturn20search4turn20search5  
- Görsel hiyerarşi şu sırada kurulmalı: **başlık → kısa yönlendirme → QR alanı → NFC işareti → fallback URL**. QR kodun çevresine yazı, ikon veya süsleme bindirilmemeli; quiet zone her tarafta temiz bırakılmalıdır. citeturn17view1turn17view2turn16view1  
- Stand stabilitesi “estetikten önce” gelir. Türkiye’de metal ayaklı ve ahşap tabanlı masaüstü pleksi ürünler yaygın; kasa üstünde devrilmeyen, kolay silinen, tekrar içerik değiştirilebilen gövdeler seçilmelidir. citeturn22search1turn22search8

**İçerik ve metin kontrol listesi:**  
- Başlık her zaman doğrudan fiil içermeli: **“Google’da yorum bırakın”**, **“Menüyü açın”**, **“WhatsApp’tan yazın”**, **“Konumu açın”**. “Hemen keşfet”, “Detaylar burada”, “Get started” benzeri belirsiz CTA’lar kullanılmamalı; NN/g belirsiz fiillerin zayıf information scent ürettiğini açıkça söylüyor. citeturn9search6turn9search15  
- Yardımcı metin kısa tutulmalı. En iyi uygulama, başlığın altında tek satırlık bir netleştirme veya iki çok kısa adım kullanmaktır: örneğin **“QR’ı okutun veya telefonunuzu yaklaştırın.”** Apple’ın NFC metin dili için önerisi teknik jargon yerine konuşma dili; “yaklaştırın / tara” yaklaşımıdır. citeturn6search12turn33search8turn9search14  
- Toplam görünen metin mümkün olduğunca kısa kalmalı; QR çevresinde paragraf olmamalı. NN/g araştırması, kısa ve taranabilir metnin kullanılabilirliği anlamlı biçimde artırdığını gösteriyor. EsnafDigital açısından bunun pratik yorumu, ana yüzde URL hariç yaklaşık 12–20 kelime sınırını aşmamaktır. citeturn9search5turn16view1  
- Logo ve ikonlar **yardımcı bağlam** için kullanılabilir; ancak tek başına logo yeterli değildir. QR’ın Google yoruma mı, WhatsApp’a mı, menüye mi gittiği metinle açıkça yazılmalıdır. citeturn16view1  
- Yorum isteyen standlarda dil **yumuşak ama aksiyon odaklı** olmalı: “Deneyiminizi Google’da paylaşır mısınız?” veya daha işlem odaklı sürümde “Google’da yorum bırakın.” Buna karşılık “Bize 5 yıldız verin”, “Olumlu yorum bırakın”, “Yorum bırakana indirim var” gibi kalıplar hem güveni hem politika uyumunu bozar. Google dürüst ve dengeli yorumların güvene yardımcı olduğunu, teşviklerin yasak olduğunu söylüyor. citeturn16view2turn16view0  
- Fallback URL mutlaka görünür olmalı ve okunabilir kısa yapıda seçilmelidir. NN/g QR yanında URL göstermenin güven ve alternatif erişim açısından yararlı olduğunu söyler. Ancak bu URL rastgele bir genel shortener değil, mümkünse markalı ve anlamlı bir kısa alan adı/path yapısında olmalıdır; bu ikinci kısım pratik yorumdur. citeturn16view1turn13search0  
- Statik yıldız puanı veya yorum sayısı kullanılacaksa yalnızca **gerçek ve güncel** ise kullanılmalı; aksi halde güven kaybı yaratır. BrightLocal’ın 2026 bulguları tüketicilerin tutarlılık, tazelik ve yanıt verme davranışına önem verdiğini gösteriyor; bu yüzden küçük bir “Google değerlendirmeleri” cue’su çoğu zaman sahte görünen sabit 5,0 yıldızdan daha güvenlidir. citeturn30search0turn16view2

## Teknik kurallar ve üretim

**QR teknik kontrol listesi:**  
- Hedef URL her zaman **mobil uyumlu ve doğrudan ilgili sayfa** olmalı; QR kod kullanıcıyı ana sayfaya değil, tam vaat edilen eyleme götürmelidir. Yorum standı resmi Google yorum formuna, menü standı mobil menüye, WhatsApp standı click-to-chat akışına, harita standı işletme profiline veya yön tarifine gitmelidir. citeturn16view1turn16view0turn34search0  
- QR kodun çevresinde her tarafta **en az dört modül quiet zone** bırakılmalıdır. Bu alan şeffaf değil, gerçekten boş ve baskısız görünmelidir. Metin, desen, çizgi veya renk blokları bu alanı ihlal etmemelidir. citeturn17view1turn17view2  
- Varsayılan renk kuralı **koyu kod + açık zemin** olmalı. NN/g koyu ön plan ve açık arka planı öneriyor; GS1 ise düşük kontrast, gradyan ve parlak yüzeylerin taramayı bozduğunu vurguluyor. Özellikle mat siyah kod ve beyaz/opak açık zemin, güvenli varsayılan kombinasyondur. citeturn16view1turn17view0turn18view0turn18view1  
- QR kodu dekoratif olarak bükmek, modülleri yuvarlatmak, içine büyük logo gömmek veya üzerinde metin bindirmek tarama kalitesini düşürebilir. GS1 özelleştirilmiş 2D kodların kalite sorunlarına daha açık olduğunu; DENSO ise modül bozulmasının ve çevreye metin/resim bindirmenin okumayı zorlaştırdığını söylüyor. citeturn17view2turn17view0  
- Hata düzeltmede genel varsayılan **M** seviyesidir; daha kirli, çizilmeye açık veya yoğun özelleştirmeli kullanım senaryolarında **Q/H** düşünülebilir ama bunun kodu büyüttüğü unutulmamalıdır. citeturn17view4  
- Baskı master’ı mümkünse vektör tabanlı hazırlanmalı ve gerçek üretim öncesi küçük prova alınmalıdır. DENSO “uygulamadaki okuma cihazını dikkate alın”, Flowcode ise ideal baskı boyutunda deneme taraması yapın diyor; bu yüzden en az bir iPhone ve bir Android ile gerçek ışıkta test zorunlu olmalıdır. citeturn17view3turn28view0  
- Dinamik yönlendirme bağlantısı genellikle statikten daha iyidir; Bitly’nin tanımına göre dinamik QR kısa, düzenlenebilir bir redirect URL taşır ve analitik toplar. EsnafDigital için bu, işletme taşınsa, menü değişse, link bozulsa veya CTA güncellense bile aynı print’i korumak demektir. Ancak dinamik yapıyı kullanıcıya hissettirmemek gerekir; açılış gecikmesi ve ara sayfa sürtünme yaratır. citeturn13search0turn13search4

**NFC teknik kontrol listesi:**  
- NFC tarafında **NDEF biçimli HTTPS URL** kullanılmalı. NDEF, NFC Forum’un ortak veri formatıdır; Android de URL kullanımını bu standart akış içinde destekler. citeturn19view4turn19view2  
- Yeni dağıtımlarda **NFC Forum Type 1–4** tag ailesi tercih edilmeli; Android bunu garanti uyumluluk için öneriyor. Küçük işletme standı için NTAG213/215/216 ailesi yaygın, mass-market ve perakende kullanımına uygun bir varsayılandır. citeturn19view2turn23search0turn23search1  
- QR ve NFC **aynı hedefe** gitmelidir. Aynı yüzde bir yanda yorum, öbür yanda WhatsApp gibi ayrışan hedefler kullanıcının zihninde belirsizlik üretir. Eğer iki farklı aksiyon gerekiyorsa iki ayrı stand ya da çok amaçlı bir landing page tercih edilmelidir. Bu öneri choice overload ve kısa mesafeli NFC akış mantığının yorumudur. citeturn9search1turn16view1turn19view1  
- Kullanıcı dili olarak “**Telefonunuzu yaklaştırın**” en doğru ifadedir. Apple, people-facing metinde teknik jargon ve “tap/touch” yerine “scan/near” yaklaşımını önerir; Android de bağlantının çok kısa mesafede başladığını belirtir. citeturn6search12turn19view1turn33search8  
- iPhone tarafında arka plan etiket okuma desteği **iPhone XS ve sonrası** için belgelenmiştir; Android tarafında NDEF desteği standartlaştırılmış olsa da her Android telefonda NFC donanımı ve kullanıcı ayarı aynı değildir. Bu yüzden NFC hiçbir zaman QR’ın yerine geçen tek kanal olarak düşünülmemelidir. citeturn33search2turn19view2turn19view1  
- Metal, NFC düşmanıdır. NXP, metalin yakınında girdap akımları oluştuğunu, bunun anteni detune ettiğini ve ferrit ile kalkanlama gerekebileceğini açıkça söylüyor. Bu yüzden NFC etiketi metal ayak, metal plaka, folyo kaplı karton veya metal kasaya doğrudan bindirilmemeli; gerekiyorsa on-metal tag veya ferrit ara katman kullanılmalıdır. citeturn19view3  
- Tag yazıldıktan ve doğrulandıktan sonra mümkünse **read-only** hale getirilmelidir; Android API’si ve NXP dokümantasyonu, bazı tag’lerde read-only kilitlemenin desteklendiğini gösteriyor. Bu, saha personelinin yanlışlıkla etiketi yeniden yazma riskini azaltır. citeturn19view2turn23search9  
- NFC’nin başarısız olduğu durumda yedek akış şu sırada olmalıdır: **aynı hedefe giden QR → görünür kısa URL → personelin linki WhatsApp’tan gönderme opsiyonu**. Google resmi olarak WhatsApp ile review link paylaşımını da destekliyor. citeturn16view0

**Malzeme ve üretim kontrol listesi:**  
- En iyi fiyat/tekrar üretim dengesi için temel öneri **şeffaf pleksi/akrilik gövde + değiştirilebilir baskı inserti** modelidir. Türkiye’de yerel tedarikçiler A4/A5/A6 masaüstü pleksi ürünleri ve QR stand türevlerini standart stok olarak listeliyor; içerik değiştirilebilir yapı özellikle kampanya, menü ve CTA güncellemelerinde avantaj sağlar. citeturn22search1turn22search5turn22search0  
- Daha güven veren ve modern bir görünüm için **ahşap taban + pleksi yüz** iyi bir ikinci seviye seçenektir. Yerel üreticiler hem A6 QR code stand hem A5/A6 ahşap ayaklı föylük formatlarını sunuyor. Özellikle kafe ve güzellik salonunda “ucuz promosyon kartı” yerine “mekâna ait obje” hissi vermede daha güçlüdür. citeturn22search8turn21search4turn22search11  
- Kamuya açık Türkiye liste fiyatları, A6/A5 masaüstü pleksi ve QR standları için yaklaşık yüz küsur TL bandından başlayıp malzeme ve forma göre yukarı çıkıyor; ancak bunlar perakende raf fiyatı olduğu için EsnafDigital’in toplu B2B maliyet hesabında yalnızca yön gösterici kabul edilmelidir. Asıl önemli sonuç, bu ürünlerin Türkiye’de hazır kategori olarak var olmasıdır; yani saha ölçeklemesi mümkün. citeturn22search11turn22search9turn21search6  
- QR alanında **mat** baskı veya mat insert kullanılmalı; GS1 parlak ve yansıtıcı yüzeylerden kaçınılmasını, şeffaf/yarı şeffaf yüzeylerde ise opak beyaz zemin kullanılmasını öneriyor. Bu yüzden tam parlak UV baskılı akrilik yüzey, özellikle spot ışık altında risklidir. citeturn17view0turn18view1  
- Kafe/restoran ortamında yağ, nem, sürekli silme ve masa hareketi düşünüldüğünde kâğıt katlama standlar başlangıç denemesi için ucuz olabilir, ama kalıcı ürün standardı için uygun değildir. Yerel tedarikçilerin dayanıklılık ve günlük kullanım vurgusu, pleksi menü/föylüklerin bu segment için daha uygun olduğunu gösteriyor. Bu öneri kısmen tedarikçi verisi, kısmen kullanım yorumu taşır. citeturn22search0turn22search6  
- Doğrudan akriliğe kalıcı QR basmak yerine **değiştirilebilir insert** kullanmak operasyonel olarak daha doğrudur; çünkü CTA, URL, marka rengi, yorum yerine WhatsApp’a geçiş gibi değişikliklerde tüm gövdeyi değil yalnızca baskı yüzünü değiştirirsiniz. Dinamik redirect bunu daha da güçlendirir. citeturn22search0turn13search0

## Yerleşim, saha kullanımı ve segment farkları

**Yerleşim ve personel kullanım kontrol listesi:**  
- **Google yorum standı** için en iyi yer, hizmet tamamlandıktan ve ödeme alındıktan sonraki doğal durak noktasıdır: kasa, resepsiyon masası, çıkışa yakın tezgâh, ödeme terminali yanı. Google’ın fiş, mağaza içi QR ve sohbet sonu önerileri bu “işlem sonu” mantığını destekler. citeturn16view0  
- **Menü standı** masa, host standı veya girişte olmalıdır; QR’ı kasaya koyup menüyü uzaktan çağırtmak mantıksızdır. Restoran verileri, müşterinin QR ile menü açmaya daha sıcak olduğunu gösterdiği için masa üstü kullanım burada doğal ve güçlüdür. citeturn25view0  
- **WhatsApp/contact standı** için en iyi yer resepsiyon, bekleme alanı, vitrin yanı veya kartvizit/fiyat bilgisi noktasıdır. Kullanıcı burada “iletişim kurma” niyeti taşır; tam ödeme anında WhatsApp CTA çoğu zaman gereksizdir. Bu öneri kullanım akışı yorumudur.  
- **Harita/profil standı** içeride masa ortasına değil; vitrinde, girişte, takeaway alanında veya yeni gelen müşteri için yönlendirici noktada anlamlıdır. İç mekânda zaten fiziksel olarak işletmenin içindeyken “konumu açın” çağrısı çoğu zaman zayıftır. Bu da bağlama dayalı bir yorumdur.  
- Stand görünür olmalı ama saldırgan olmamalıdır. En iyi pratik, her karar anında **bir** görünür stand, her yüzeyde rastgele çoğaltılmış beş stand değil. Fazla tekrar hem görsel kirlilik hem de “spam” hissi doğurur; choice overload araştırmaları da kalabalık seçenek ortamının karar kalitesini düşürdüğünü gösterir. citeturn9search1turn9search13

**Personel davet scripti** fiziksel stand kadar önemlidir; çünkü stand pasif obje, davet ise eylemi tetikleyen “son itme”dir. En iyi script, kısa, baskısız ve hizmet sonrası söylenen cümledir. Önerilen Türkçe örnekler:  
- Berber: **“Memnun kaldıysanız, buradan Google’da yorum bırakabilirsiniz.”** Bu dil, isteği doğrudan söyler ama “olumlu yorum” dikte etmez. citeturn16view2turn16view0  
- Güzellik salonu: **“Uygunsa deneyiminizi burada paylaşabilirsiniz; QR’ı okutmanız yeterli.”** Yumuşak ton, premium/hassas deneyime daha uygundur. Bu öneri kısmen bağlamsal yorumdur.  
- Kafe/restoran kasası: **“İsterseniz yorum bırakabilirsiniz; burada hemen açılıyor.”** Menü standında bu cümle kullanılmamalı; yorum talebi yemek öncesi değil, ödeme sonrası gelmelidir. citeturn25view0turn16view0  

**Segment bazlı öneriler:**  
- **Berber dükkânları:** İlk stand olarak kasada tek amaçlı yorum standı en güçlü seçenektir. İkinci ürün olarak bekleme alanına veya girişe küçük bir WhatsApp/iletişim standı eklenebilir. Ton kısa ve hızlı olmalı: “Google’da yorum bırakın” veya “WhatsApp’tan yazın.” Berberde müşteri deneyimi hızlı ve rutin olduğu için standın kararsız bırakmaması önemlidir. citeturn16view0turn9search15  
- **Güzellik salonları:** Resepsiyon-kasa hattında yorum standı; işlem öncesi bilgi ihtiyacı yüksekse WhatsApp veya hizmet kataloğu/landing page standı düşünülebilir. Metin biraz daha yumuşak ve güven verici olabilir: “Deneyiminizi paylaşın” veya “Bize WhatsApp’tan ulaşın.” Malzeme algısı burada daha kritik olduğundan ahşap tabanlı veya daha temiz premium hissi veren gövde tercih edilebilir. Yerleşim ve ton önerisi daha çok saha yorumudur; malzeme tarafında ahşap/pleksi kombinasyonunun yerel bulunabilirliği nettir. citeturn22search8turn21search4  
- **Kafe/restoran:** Standları ayırmak gerekir. Masa üstünde **yalnızca menü**, kasada **yalnızca yorum**. NRA verisi QR ile menü açmanın sipariş/ödeme QR’larından daha kabul edilir olduğunu gösterdiği için menü standını fazla akıllandırmaya çalışmak gereksizdir. Menü standı çift taraflı veya üçgen olabilir; yorum standı ise kasa tarafında daha küçük ve tek yüzlü kalabilir. citeturn25view0turn20search4  

**Kaçınılması gereken anti-pattern’ler:**  
- **Çok fazla metin:** Kullanıcı QR çevresindeki paragrafı okumaz; kısa, taranabilir ve fiil içeren metin gerekir. citeturn16view1turn9search5  
- **Küçük QR:** 2,5 cm altına inmek close-range dışında risklidir; pratikte 3,2–4,0 cm daha güvenlidir. citeturn28view2turn17view3  
- **Zayıf kontrast ve parlak yüzey:** Mat siyah + açık zemin güvenli varsayılan; parlak/metal yüzey yüksek risktir. citeturn17view0turn18view1  
- **Bir yüzde çok aksiyon:** Choice overload ve düşük information scent üretir; tek amaçlı kullanım ilk tercih olmalı. citeturn9search1turn9search13turn16view1  
- **QR’ın ana sayfaya gitmesi:** Kullanıcı “yorum bırakın” görüp ana siteye düşerse akış kırılır. citeturn16view1  
- **Sahte veya baskıcı review dili:** “5 yıldız verin”, “indirim için yorum bırakın”, “negatifse yazmayın” gibi kopyalar güven ve politika uyumunu bozar. citeturn16view0turn16view2  
- **NFC işaretinin çipten farklı yerde olması:** Range çok kısa olduğu için kullanıcı deneyimi bozulur. Çip, işaretin tam arkasında olmalıdır; bu öneri teknik menzil gerçeğinin tasarım yorumudur. citeturn19view1turn33search5  
- **Metale yapıştırılmış standart NFC etiket:** Detuning nedeniyle okuma düşer; ferrit/on-metal çözüm gerekir. citeturn19view3  
- **Sadece NFC, QR’sız kurulum:** Cihaz uyumluluğu ve kullanıcı alışkanlığı değişken olduğu için QR fallback zorunludur. citeturn33search2turn19view1turn19view2  
- **Genel stock görünümlü, işletmeden kopuk tasarım:** Teknik olarak taransa bile düşük güven üretebilir. Burada en iyi denge; stock fotoğraf yerine logo, hizmet türü ikonu, gerçek renk paleti ve sade tipografi kullanmaktır. Bu, güven ve bağlam ilkelerinden türetilmiş bir yorumdur.  

## EsnafDigital için uygulama modeli

**EsnafDigital için çıkarımlar:** EsnafDigital bu işi tekil tasarım hizmeti gibi değil, **operasyonel bir ürün paketi** gibi ele almalıdır. En mantıklı kurgu, kullanıcı bağlamına göre seçilen 3 temel şablon ailesi oluşturmaktır: **yorum**, **menü**, **WhatsApp/iletişim**. Dördüncü kategori olarak **profil/harita** veya **mikro landing page** eklenebilir, ama bu varsayılan değil istisna olmalıdır. Böylece Audit aşamasında işletmenin hangi yüzeyde hangi niyetin oluştuğu belirlenir; Offer aşamasında tek stand mı çift stand mı satılacağı karar verilir; Delivery aşamasında QR/NFC/dinamik link üretimi yapılır; Maintenance aşamasında ise linklerin, review yanıtlarının ve fiziksel stand durumunun kontrolü yapılır. Bu model Google’ın review-QR akışı, Bitly tipi dinamik yönlendirme mantığı ve yukarıdaki QR/NFC teknik kurallarıyla uyumludur. citeturn16view0turn13search0turn16view1turn19view2

**EsnafDigital için en kritik standart kararlar** şunlar olmalıdır:  
- Her stand için **tek ana aksiyon**; gerekiyorsa ikinci aksiyon ayrı stand veya landing page’de. citeturn9search1turn16view1  
- Her işletme için bir **markalı kısa alan adı/path standardı**; örneğin `esnaf.link/isletme-yorum`, `esnaf.link/isletme-menu`, `esnaf.link/isletme-wa`. Bu yapı hem QR yoğunluğunu azaltır hem de ileride hedef değişikliği yapmayı kolaylaştırır. citeturn13search0turn28view2  
- Tüm QR’lar önce dinamik redirect’e, oradan son hedefe gitmeli; ama son hedef mümkün olduğunca anlık açılmalı, ara sayfa göstermemelidir. citeturn13search0turn13search4  
- Tüm NFC’ler NDEF URL olarak yazılmalı ve testten sonra mümkünse read-only yapılmalıdır. citeturn19view2turn23search9  
- Review projelerinde yalnızca resmi Google review link/QR kullanılmalı; personel scriptlerinde teşvik, ödül veya yıldız diktesi yer almamalıdır. citeturn16view0turn16view2

**Önümüzdeki 30 gün için önerilen aksiyonlar:**  
- Arnavutköy’de üç segmentten toplam **9 pilot işletme** seçin: 3 berber, 3 güzellik salonu, 3 kafe/restoran. Aynı şablon sistemiyle yalnızca CTA ve vurgu rengini değiştirin. Bu adım kullanıcı bağlamı farklarının gerçekten dönüşüm yaratıp yaratmadığını hızlıca görmenizi sağlar.  
- Her pilot için yalnızca birinci siparişte şu basit kuralı uygulayın: berber/güzellikte **kasada yorum standı**, kafede **masada menü standı + kasada yorum standı**. İlk ay çok amaçlı stand satmayın. Bu, değişkenleri azaltır ve öğrenmeyi hızlandırır. citeturn25view0turn16view0  
- Stand başına benzersiz dinamik slug oluşturun ve her slug’ı konuma göre isimlendirin; örneğin `barber-yorum-kasa`, `cafe-menu-masa1`. Böylece hangi temas noktasının daha çok açılış getirdiğini anlarsınız. citeturn13search4turn13search0  
- Delivery SOP’sine şu zorunlu testleri ekleyin: baskı provasında bir iPhone ve bir Android ile QR test, NFC test, ışık altında test, yanlış link testi, fallback URL okunabilirlik kontrolü. citeturn17view3turn28view0turn33search2turn19view1  
- İşletme sahiplerine review bakımını satılabilir hizmete dönüştürün: yeni yorumları yanıtlamak, bozuk linki güncellemek, menü/landing page içeriğini yenilemek, standın fiziksel durumunu kontrol etmek. Google da review’lere yanıt vermeyi iyi pratik olarak vurguluyor. citeturn16view2turn24search11  
- Pilot sonunda yalnızca tarama/tap sayısını değil; işletme sahibi uyumunu, personelin scripti söyleyip söylemediğini ve standın gerçekten doğru yere konup konmadığını da değerlendirin. Çünkü bu kategoride tasarım kadar saha disiplini de performansı belirler. Bu son madde saha yorumu niteliğindedir.  

**Nihai yeniden kullanılabilir Türkçe tasarım promptu:** Aşağıdaki prompt, QR kullanılabilirliği, Google review akışı, NFC uyumluluğu ve Türkiye’de üretimi kolay A6/A5 pleksi formatları temel alınarak hazırlanmıştır. citeturn16view1turn16view0turn17view0turn19view2turn22search5

```text
Türkiye’de küçük yerel bir işletme için pratik, uygun maliyetli, güven veren ve kolay üretilebilir bir QR/NFC masaüstü stand tasarla.

İşletme bilgileri:
- İşletme adı: [İŞLETME_ADI]
- Segment: [BERBER / GÜZELLİK SALONU / KAFE / RESTORAN]
- Bölge: [İLÇE / ŞEHİR]
- Ana amaç: [GOOGLE YORUM / MENÜ / WHATSAPP / HARİTA-PROFİL / LANDING PAGE]
- Hedef URL: [HEDEF_URL]
- Fallback kısa URL: [KISA_URL]
- Marka renkleri: [RENKLER]
- Logo var mı: [EVET / HAYIR]
- NFC kullanılacak mı: [EVET / HAYIR]

Zorunlu tasarım kuralları:
- Tek standda tek ana CTA kullan.
- Standın ana yüzünü varsayılan olarak A6 dikey tasarla; yalnızca gerçekten gerekliyse A5 dikey öner.
- QR kod büyük, net ve merkezi olsun; baskıda güvenli okunacak şekilde yaklaşık 35–40 mm kare alan planla.
- QR kodu koyu renk, açık zemin ve bozulmamış kare modüller ile düşün; dekoratif, aşırı stilize veya quiet zone’u bozan QR kullanma.
- QR kodun çevresinde yeterli boşluk bırak.
- Eğer NFC varsa, QR ve NFC aynı hedefe gitsin.
- NFC alanı belirgin bir işaretle gösterilsin ve kullanıcıya “Telefonunuzu yaklaştırın” şeklinde doğal Türkçe yönerge verilsin.
- Fallback kısa URL görünür olsun.
- Metin çok kısa olsun; paragraf kullanma.
- Tasarım modern ve profesyonel görünsün; ama lüks afiş gibi değil, gerçek dükkân içi kullanım için sade ve işlev odaklı olsun.
- İşletme logosu varsa küçük destekleyici unsur olarak kullan; logo tek başına bağlam vermesin.
- Sahte yıldız, “5 yıldız verin”, indirim teşviki, spam dili veya güveni zedeleyen agresif satış tarzı kullanma.
- Stock insan fotoğrafı kullanma; mümkünse ikon, düzen, boşluk ve tipografi ile çöz.
- Üretim için pleksi/akrilik masaüstü standa uygun, kolay basılabilir bir ön yüz öner.

İçerik hiyerarşisi:
1) Üstte net başlık
2) Altında tek satırlık kısa yönlendirme
3) Büyük QR alanı
4) NFC işareti ve kısa cue
5) Altta fallback kısa URL
6) Gerekirse küçük işletme logosu

CTA dili örnekleri:
- Google yorum: “Google’da yorum bırakın”
- Daha yumuşak yorum dili: “Deneyiminizi Google’da paylaşın”
- Menü: “Menüyü açın”
- WhatsApp: “WhatsApp’tan yazın”
- Harita/profil: “Konumu açın”

Çıktı formatı:
- Ön yüz için hazır Türkçe metin
- Tasarım açıklaması
- Yerleşim açıklaması
- Renk ve tipografi önerisi
- Baskı/üretim notları
- Bu segment için önerilen yerleştirme noktası
```

**Nihai yeniden kullanılabilir Türkçe operatör kontrol listesi:**  

- **Audit aşaması**  
  - İşletmenin doğrulanmış Google Business Profile’ı var mı? Varsa yorum linki oluşturulabilir; Google review QR’ı masaüstünde mağaza içinde sergilemek resmi olarak desteklenir. citeturn16view0  
  - İşletmenin ana ihtiyacı hangisi: yorum, menü, WhatsApp, harita/profil, yoksa basit landing page mi? Bu kararı “müşteri o anda hangi mini işi yapmak istiyor?” sorusuyla verin. citeturn16view1turn9search1  
  - Mekânda doğru temas noktası neresi: masa, kasa, resepsiyon, bekleme alanı, vitrin, takeaway bankosu?  
  - İşletmede menü, mobil uyumlu landing page veya WhatsApp click-to-chat linki hazır mı? WhatsApp için click-to-chat bağlantısı kullanılabilir. citeturn34search0  
  - Review akışında işletme sahibine şunu net anlatın: yorum karşılığı indirim/hediye verilemez; “olumlu yorum” dikte edilmez. citeturn16view0turn16view2  

- **Offer aşaması**  
  - Varsayılan karar kuralı: tek stand = tek ana amaç.  
  - Berber/güzellik için ilk teklif: kasada yorum standı.  
  - Kafe/restoran için ilk teklif: masa menü standı; ikinci ürün olarak kasada yorum standı. citeturn25view0  
  - Çok amaçlı stand ancak resepsiyon/bekleme alanında ve gerçekten gerekliyse teklif edilmelidir; landing page’de 1 ana, en fazla 2 ikincil aksiyon kuralı kullanın. citeturn9search1turn16view1  
  - Stand gövdesinde varsayılan format A6 dikey; alan yetmezse A5 dikey. Türkiye’de her iki format da yaygın bulunur. citeturn22search5turn22search8  

- **Delivery aşaması**  
  - Resmi Google yorum linkini masaüstü tarayıcıdan oluşturun; Google review QR üretimi masaüstünde yapılır. citeturn16view0  
  - Hedef için mümkünse dinamik redirect slug oluşturun; örneğin `esnaf.link/isletme-yorum`. citeturn13search0  
  - QR’ı yüksek kontrastla üretin; dört modül quiet zone’u koruyun; baskı provasında 3,2–4,0 cm civarı güvenli QR alanı hedefleyin. citeturn17view1turn17view0turn28view2  
  - NFC yazılacaksa NDEF URL kullanın, QR ve NFC’yi aynı hedefe yönlendirin. Yeni kurulumda NFC Forum Type 1–4 uyumlu tag kullanın; pratikte NTAG213/215/216 ailesi uygundur. citeturn19view2turn23search0turn23search1  
  - NFC etiketini metal yüzeye doğrudan koymayın; gerekiyorsa ferrit veya on-metal çözüm kullanın. citeturn19view3  
  - Test sırası: iPhone QR, Android QR, iPhone NFC, Android NFC, spot ışık altında tekrar test, fallback URL gözle kontrol.  
  - Tag destekliyorsa yazma sonrası read-only kilit düşünün. citeturn19view2turn23search9  
  - Mat insert/print kullanın; QR alanına parlak laminasyon veya metalik efekt vermeyin. citeturn18view1  

- **Print/production hazırlığı**  
  - A6/A5 pleksi/akrilik masaüstü gövde seçin; değiştirilebilir insert tercih edin. citeturn22search0turn22search1  
  - Kasa için tek yüzlü; ortak masa için iki yüzlü/üçgen gövde düşünün. citeturn20search4turn20search5  
  - İçerik hiyerarşisini sabitleyin: başlık, kısa yönerge, QR, NFC cue, kısa URL, küçük logo. citeturn16view1  
  - Son onayda şu soruları sorun: “İlk bakışta ne yapacağı anlaşılıyor mu?”, “QR alanı yeterince büyük mü?”, “NFC noktası doğru yerde mi?”, “URL okunuyor mu?”  

- **Maintenance aşaması**  
  - Aylık link kontrolü yapın; dinamik hedef bozuldu mu, menü güncel mi, WhatsApp numarası hâlâ doğru mu? citeturn13search0  
  - Google review’lere yanıt verin; Google bunu iyi pratik olarak vurgular. citeturn16view2turn24search11  
  - Fiziksel standın yeri değişmiş mi, kirlenmiş mi, ışık yüzünden parlıyor mu, NFC etiketi kalktı mı kontrol edin.  
  - İşletme büyüdükçe ikinci standı ihtiyaç anına göre ekleyin; varsayılanı bozup her yeri çok amaçlı standlarla doldurmayın. citeturn9search13turn16view1  

**Son karar cümlesi:** EsnafDigital’in başlangıç standardı; **A6 dikey, tek amaçlı, mat baskılı, büyük QR’lı, aynı hedefe giden NFC yedekli, kısa URL’li pleksi/akrilik stand** olmalıdır. Segmente göre değişen şey “tasarım dili”nden çok “hangi anda hangi CTA’nın teklif edildiği”dir; bu kategori tasarım kadar saha akışı işidir. QR tarafında kanıt güçlü, NFC tarafında uyumluluk mantığı güçlü, ama “QR+NFC birlikte ne kadar fazla dönüşüm getirir?” konusunda bağımsız kanıt zayıftır. Bu yüzden EsnafDigital en doğru şekilde “önce QR ile sağlam temel, sonra NFC ile sürtünme azaltma” yaklaşımını benimsemelidir. citeturn16view1turn17view0turn19view2turn33search2turn16view3