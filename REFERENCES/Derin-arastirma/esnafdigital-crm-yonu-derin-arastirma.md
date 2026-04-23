# EsnafDigital CRM yonu derin arastirma

## Kisa ozet

Onemli not: Istediginiz zorunlu kaynaklar arasinda `MEMORY.md` ve `HEARTBEAT.md` erisilebilirdi; ancak public repo gorunumunde `REFERENCES/` altinda yalnizca bir tasarim sistemi klasoru ve bir kaynak metni gorunuyordu, `memory/` gorunumunde de 2026-04-22 tarihli CRM notu gorunmuyordu. Bu nedenle `REFERENCES/project-os-page.md`, `REFERENCES/business-detail-v1.md` ve `memory/2026-04-22-crm-panel.md` dosyalarina dogrudan dayanarak konusmuyorum; asagidaki degerlendirme erisebildigim primer kaynaklara ve repoda gorunen uygulama/schema yuzeylerine dayanir. citeturn6view0turn6view1turn7view0turn8view1

Erişilebilen kaynaklarin cizgisi net: EsnafDigital’in kalici omurgasi `Audit -> Teklif -> Teslimat -> Bakim`; urun omurgasi da audit ile giris, guven veren dijital vitrin ile ana urun ve bakim ile devam geliri olarak tanimlaniyor. Ayni kaynaklar “once teklif netligi, sonra ekran cogaltma” ve “once calisan basit cozum, sonra otomasyon” ilkesini acikca koyuyor. HEARTBEAT ise bu fazin ana hedefini teklif omurgasi, veri temeli ve admin operasyon ekranlarini ayni sade sistemde toplamak olarak tarif ediyor ve acik risk olarak “MVP’nin genel CRM’e kaymasi”ni yaziyor. citeturn7view0turn8view0turn8view1turn9view0

Benim net sonucum su: EsnafDigital “CRM” adi altinda yatay bir SaaS urunu yapmamali. Yapmasi gereken sey, `Project OS` merkezli, tek hizmet hattini yurutmek icin dar, operasyonel, dikey bir operator panelidir. `Context Center` hafiza ve referans; `Prompt Üretimi` ise karar hazirligi icin yan katman kalmali; bunlar Project OS ile esit agirliga sahip yeni bir genel CRM’e donusmemelidir. Repo ve ekran cizgisi zaten bu ayrimi soyluyor; sorun, bu ayrimin urun siniri olarak yeterince sertlestirilmemis olmasidir. citeturn38view0turn38view1turn43view0turn41view3

## Genel karar

Genel karar sert ve nettir: EsnafDigital icin dogru yon, “isletmeleri yoneten genel CRM” degil, “Audit -> Teklif -> Teslimat -> Bakim hattini yoneten operasyon paneli”dir. `Project OS` ana omurga olmali; `Prompt Üretimi` sadece karar belirsizligi oldugunda devreye giren bir yan mekanizma, `Context Center` ise sadece sabit referans ve baglam secimi icin kullanilan bir destek katmani olmali. Bunlarin hicbiri, ayri pipeline’lari, ayri not habitatlari ve ayri mini-CRM mantiklari ureten paralel urunlere donusmemeli. Bu karar, hem MEMORY’deki kalici is modeli cizgisiyle, hem HEARTBEAT’teki “genel CRM’e kayma” uyarisi ile, hem de Prompt Üretimi ekraninin kendini hafiza ve uygulama katmanindan ayri bir “karar hazirligi” katmani olarak tanimlamasiyla tutarlidir. citeturn7view0turn8view0turn9view0turn43view0

Bir adim daha ileri gideyim: Bugun “CRM” kelimesi burada yanilticidir. Eger bu isim korunacaksa bile, urunun mantigi klasik CRM olmamali. EsnafDigital’in problemi iliski yonetimi genisligi degil; aktif islerin dogru sirayla, dogru kapsamla ve dogru sozle ilerletilmesidir. Bu nedenle urun, “kimle ne kadar iletisim kurduk” degil, “hangi is nerede takili ve bir sonraki operator adimi ne” sorusunu cevaplamalidir. Project OS kodunda “genel CRM degil, operasyon gorunurlugu” ve “grafik yerine sayi, durum ve tablo onceligi” vurgusu tam olarak bu yone isaret ediyor. citeturn41view2turn41view3

Ayrica mevcut yon yamalanacak kadar net degil. HEARTBEAT, Project OS’un asama-oncelikli ve sicak is odakli bir giris yuzeyine yaklastigini soyluyor; buna karsilik erisebildigim Project OS sayfa kodu hala form bloklari, ham veri tabloları ve cekirdek veri modeli anlatimi etrafinda duruyor. Yani kaynaklar arasinda bile “operasyon kokpiti mi, veri giris sayfasi mi” sorusu tam kapanmamis. Bu, patch degil, cizgi reseti gerektigini gosteriyor. citeturn9view0turn37view0turn41view3

## EsnafDigital icin dogru CRM tanimi

EsnafDigital icin dogru CRM tanimi sunlardir: tek operatorun, tek hizmet zincirinde, tek isletme kaydini audit’ten teklife, tekliften teslimata, teslimattan bakima tasirken kaybolmamasi icin tasarlanmis dikey bir operasyon kaydi. Bu tanimda merkezde “lead” veya “deal” yoktur; merkezde “isletme + mevcut hizmet asamasi + bir sonraki operator karari” vardir. MEMORY zaten cekirdek akis olarak bunu koruyor; Project OS da kendisini “genel CRM gibi buyumek” icin degil, “gercek teslimat hattini acik tutmak” icin konumluyor. citeturn7view0turn8view0turn37view0turn41view3

Bu CRM’in optimize edecegi sey iliski cesitliligi degil, operasyon dogrulugudur. Operatör su sorulara hizli cevap almali: Bu isletme audit asamasinda mi, teklif bekliyor mu, ne soz verilmis, teslimatta blokaj ne, bakimda ne zaman dokunulacak, bir karar icin iceride mi netlesmeli yoksa disariya mi sorulmali? Prompt Üretimi’in “Blocked / Internal / External” route mantigi ve “sec, netlestir, gonder, sonucu isle” gibi tek akis vurgusu, bu yardimci karar katmaninin bile aslinda operator faydasina indirgenmesi gerektigini gosteriyor. citeturn43view0turn42view0turn42view4

Bu CRM’in optimize ETMEMESI gereken seyler de nettir: mesaj tarihcesi, iliski gecmisi genisligi, sinirsiz gorev aglari, serbest not biriktirme, yonetsel pipeline tiyatrosu ve rapor vitrini. Prompt Üretimi’in kendi sayfasinda “not coplugu degildir”, “prompt uretimi amac degil, dogru route amac” ve “is cikarsa Project OS veya Context Center’a baglanir” denmesi, sistemin kendisinin bile bu tehlikeyi gordugunu kanitliyor. Yani urunun dogru tanimi, “her seyi iceri alma” degil, “dogru isi dogru yerde tutma”dir. citeturn43view0turn42view3

Birinci ilkeden bakinca en dogru model su olur: `Project OS` is yapan yerdir; `Context Center` hatirlanan seyin yeridir; `Prompt Üretimi` karar belirsizligini gecici olarak temizleyen yerdir. Bu ucunu birlestirip tek bir mega-CRM yapmak, paneli faydali olmaktan cikarip daginiklastirir. Repo kokundeki acik kaynak siralamasi ve `agent-workspace` README’si de zaten uygulama, baglam ve servis/mantik ayrimini acik kuruyor. citeturn38view0turn38view1

## Kesinlikle dahil olmasi gereken yuzeyler

**Sicak is kuyrugu:** Ana ekranin gercek isi, operatora “bugun neyi ilerletmeliyim” demektir. Stage sayaci, blokaj nedeni, bir sonraki aksiyon ve sicak kayit gorunurlugu olmadan bu panel sadece veri deposu olur. HEARTBEAT’te Project OS girisinin asama-oncelikli ve sicak akisi gorunur kilma yonune kaydigi yaziliyor; Project OS ekraninda da cekirdek karar cizgisi “genel CRM degil, operasyon gorunurlugu” olarak ifade ediliyor. citeturn9view0turn41view2turn41view3

**Isletme profili:** V1’de isletme, CRM’in merkez sabiti olmali. Ancak bu profil bir “hesap agaci” ya da cok katmanli contact module degil; isim, segment, ilce, tek operasyonel muhatap, mevcut asama ve bagli audit/teklif/teslimat gorunumu kadar dar olmali. Business modeli zaten `name`, `segment`, `district`, `ownerName` ve `status` ile bu yalın iskeleti kuruyor. citeturn39view0turn39view3

**Audit calisma alani:** Audit, bu urunde bir on-gorusme notu degil; teklifin girdisi olan somut teshis nesnesidir. Bu yuzey, gorunurluk/trust/hazirlik durumunu yapilandirilmis sekilde toplamalı ve cikista “hangi teklif sinifina gidilir” sorusunu netlestirmelidir. MEMORY, audit’i giris urunu ve teklifin temel girdisi olarak tanimliyor; schema da Audit nesnesini isletme baglantisi, hazirlik ve ozet uzerinden tutuyor. citeturn7view0turn8view0turn39view0

**Teklif yuzeyi:** Teklif ekrani, satilabilir vaadin snapshot’i olmali. Paket, fiyat, durum ve soz verilen kapsamin yalın kaydi olmadan operator zinciri kopar. Offer modeli bugun bile yalnizca `businessId`, `status`, `packageName` ve `amountTry` tutuyor; bu sadelik avantajdir ve korunmalidir. Buraya line-item muhasebe, sinirsiz indirim mantigi ve custom object yigmamak gerekir. citeturn39view4turn40view0

**Teslimat ve bakim kokpiti:** EsnafDigital’in farki teslimatin gorunur ve hizli olmasi, sonra da bakim geliriyle devam etmesidir. Dolayisiyla teslimat statusu, kapsam, blokaj ve yayina gecis net gorunmeli; bakim ise DeliveryProject icindeki yasayan durum olarak izlenmelidir. Schema’da `DeliveryProjectStatus` zaten `kickoff`, `building`, `live`, `maintenance` olarak kurulmus; bu, bakimi ayri bir dev modül yapmadan tasiyabileceginizi gosteriyor. citeturn8view0turn39view0turn40view0

**Karar ve baglam koprusu:** Operatör bazen bilgi, bazen karar yuzunden takilir. Bu durumda CRM’in icine ikinci bir not ve prompt evreni kurmak yerine, Project OS icinden Consultation ve Context’e kontrollu gecis lazimdir. Prompt Üretimi kendi taniminda zaten “karar brief’i, danisma filtresi ve sonuc route katmani” diyor; Context Center’ı hafiza, Project OS’u uygulama olarak konumluyor. Bu ayrim korunmalidir. citeturn43view0

## Riskli ama belki sonra acilabilecek yuzeyler

**Bakim ritmi ve yenileme hatirlaticisi:** Bakim EsnafDigital’in devam urunu oldugu icin, canliya gecen islerde “son dokunus / siradaki bakim tarihi / basit yenileme nedeni” gibi hafif bir ritim katmani acilabilir. Ama bunun ayri bir ticketing sistemi ya da SLA/queue dunyasina donusmesi gereksizdir. MEMORY’nin devami bakim olarak tanimlamasi bunu dogrular; fakat ayni MEMORY “once calisan basit cozum” dedigi icin bu katman V1 cekirdegi netlesmeden acilmamali. citeturn7view0turn8view0

**Sinirli varlik talep listesi:** Teslimat asamasinda logo, menu, fotograflar, sosyal linkler, domain tercihi gibi eksikler operatoru durdurabilir. Bunlar icin teslimat nesnesine bagli basit bir eksik listesi acilabilir. Ama bu, sinirsiz gorev/subtask sistemine kaymamalidir. HEARTBEAT’in “ekran cogaltma” riskine ve mevcut schema’nin yalın DeliveryProject modeline bakinca, bu ancak teslimat blokajlari gercekten tekrarli hale gelirse acilmalidir. citeturn9view0turn40view0

**Saha/discovery’den intake importu:** MEMORY, işletme keşfi/veri toplama tarafında Apify CLI tercih edildiğini soyluyor. Bu nedenle daha sonra discovery’den gelen kayitlari “intake” durumunda Project OS’a dusuren dar bir import hattı acilabilir. Ama bu, “lead generation suite” ya da genis lead havuzu yonetimi anlamina gelmemeli; sadece aktif operasyon hattina alinacak adaylari beslemeli. citeturn8view0turn7view0

**Hafif zamanlama:** Audit randevusu, teklif follow-up tarihi ya da sonraki bakim tarihi gibi birkac tarih alanı acilabilir. Ama tam takvim urunu, takim iskelesi, toplantı planlayici ve kapasite araci haline gelirse odak dagilir. MEMORY ve HEARTBEAT’in genel ilkesi, araci isletmek icin degil isi isletmek icin minimum gerekli yuzeyi kurmaktir. citeturn8view0turn9view0

## Bilincli olarak disarida kalmasi gerekenler

**Yatay lead/deal pipeline’lari disarida kalmali.** EsnafDigital’in kalici cizgisi zaten tek bir hizmet hattini koruyor; bunu on bes farkli stage’e bolup kanbanlastirmak, operator isini degil yonetsel gosteri ihtiyacini besler. Project OS’un kendi karar cizgisi de “genel CRM degil” diyor. citeturn7view0turn41view2turn41view3

**Serbest not sistemi disarida kalmali.** “Not alalim, sonra bakariz” mantigi burada urun degil cop uretir. Prompt Üretimi’in acik kirmizi cizgisi “not çöplüğü değildir”dir; aynı mantik CRM cekirdegi icin daha da gecerlidir. Eger bir metin sonraki aksiyonu degistirmiyorsa CRM’de yasamamali. citeturn43view0

**Mesaj gecmisi ve omnichannel inbox disarida kalmali.** Bu panelin isi operatorun sonraki adimini netlestirmek; WhatsApp, e-posta veya DM tarihcesini mirror’lamak degil. Consultation ekraninda bile baglam paketi ve prompt preview varsayilan olarak kapali; yani tasarim mantigi gereksiz tarihceyi degil, gereken ozet ve sonraki adimi one cikarmaya calisiyor. CRM cekirdegi bunu bozup message-history gravity’ye cekilmemeli. citeturn43view0

**Genis raporlama ve dashboard katmani disarida kalmali.** Project OS’un kendi kodu “grafik yerine sayi, durum ve tablo onceligi” diyor. Bu cizgi dogru. Fazla raporlama, calismayan akislarin ustune boya cekmektir. Queue calismadan dashboard ureten urun, operator paneli degil sunum panelidir. citeturn41view2

**Generic task/project manager disarida kalmali.** Consultation schema’sinda bile action nesneleri var; bu yeterince tehlikeli bir kayma sinyalidir. Eger Project OS buna ayri task, comment, assignee, due-date, checklist, subtask agi eklerse ikinci bir proje yonetim araci dogar. Bu urun Trello, Asana ya da Monday muadili olmamali. citeturn39view2turn8view1turn9view0

**Custom field/custom object fabrikasi disarida kalmali.** Ilk segmentler Arnavutköy odaklı, berber/guzellik/kafe-restoran gibi tekrarli lokal isletmeler. Bu ortamda guc, sonsuz esneklikten degil, tekrarli operasyonu hizli isletmekten gelir. Custom object’ler ilk asamada disiplin degil daginiklik uretir. citeturn7view0turn8view0

## En buyuk urun savrulma riskleri

En buyuk risk **task creep**. Bir urun ekibi akistaki belirsizligi netlestirmek yerine “bir task daha acalim” demeye basladiginda ana zincir gozden kaybolur. Consultation tarafinda hem schema seviyesinde `ConsultationAction` nesnesi var hem de HEARTBEAT’te “aksiyon uretme”, “aksiyon listesi”, “actioned stage” gibi detaylar artik belirginlesmis durumda. Bu mantik Project OS’un icine sizarsa operator paneli isletme hattini degil task mezarligini yonetmeye baslar. citeturn39view2turn8view1turn9view0

Ikinci buyuk risk **notes creep**. “Bir yerlere yazilsin” refleksi, ozellikle kucuk takimlarda veri kalitesini cok hizli bozar. Prompt Üretimi sayfasinda bunun icin dogrudan kirmizi cizgi konmus: not coplugu degil. Bu sadece Consultation icin degil, tum CRM cekirdegi icin de kural olmali. Serbest not alanlari her zaman kullanilir; ama neredeyse hic temizlenmez. Sonuc: bilgi degil enkaz. citeturn43view0

Ucuncu risk **pipeline fetish**. Stage sayisi arttikca ekip kendini kontrol hisseder ama is ilerlemez. EsnafDigital’in kalici hattı zaten belli: audit, teklif, teslimat, bakım. Buna paralel route’lar, alt pipeline’lar, farkli board’lar, “on-hold / nurture / re-open / warm / lukewarm” gibi soyut asamalar eklemek dusuk kaliteli yonetim hissi verir. Deger yaratmaz. HEARTBEAT’in genel CRM kaymasi uyarisi tam da buna isaret ediyor. citeturn7view0turn9view0

Dorduncu risk **reporting bloat**. Rapor, veri iyi oldugunda faydalidir; veri disiplini kurulmadan rapor ekrani acmak ise yalnizca dikkat dagitır. Project OS kodundaki “grafik yerine sayi, durum ve tablo onceligi” cizgisi bugun korunmasi gereken seylerden biridir. Eger bu bozulur ve panel yonetsel dashboard’a donerse operator faydasi duser. citeturn41view2

Besinci risk **message-history gravity**. Bir urun “tum iletisim de burada dursun” demeye basladigi anda CRM olmaktan cikar, inbox ve destek sistemi melezi olur. Consultation ekraninda bile bağlam paketi, prompt preview, sonuc kaydi ve aksiyonlar kontrollu acu-kapa ile tutuluyor; yani uretici mantik “once karar ve sonraki adim” diyor. CRM cekirdegi buna ragmen mesaj gecmisi toplarsa urunun siniri kirilir. citeturn43view0

Altinci risk **yan merkezlerin CRM’i ele gecirmesi**. Repository acikca `Project OS`, `Context Center` ve `Prompt Üretimi` ayrimi kuruyor. Bu ayrim bozulup herkese esit statu verilirse, kullanıcı artik “isi nerede yapacagini” degil “hangi merkezde dolanacagini” dusunur. Bu da tek panel hedefini gerceklestirmez; tam tersine panel icinde daginiklik uretir. citeturn38view0turn43view0

## Daha net V1 nesne seti

**Business** V1’in merkez nesnesi olmali. Ama bu nesne “hesap”, “organizasyon”, “contact graph” veya “multi-branch CRM account” degil; tek bir yerel isletmenin operasyonel kaydi olmali. `name`, `segment`, `district`, tek operasyonel muhatap ve mevcut hizmet durumu yeterli. Business modeli bugun zaten tam bu yalınligi tasiyor; bu iyi bir sey. Sakın bozmayın. citeturn39view0turn39view3

**Audit** ayri ve birinci sinif nesne olmali. Cunku EsnafDigital’in giris urunu budur ve teklif buradan dogar. Audit nesnesi “serbest saha notu” gibi davranmamali; yapilandirilmis teshis, hazirlik seviyesi, ana bulgular ve teklif yonu cikarmali. Audit modelinin bugunku yalınligi buna uygundur; buna saha checklist’i eklenebilir ama not defteri eklenmemelidir. citeturn7view0turn8view0turn39view0

**Offer** ayri ve ikinci sinif degil, birinci sinif nesne olmali. Cunku ticari vaadin kaydi budur. Paket, tutar, durum ve vaat ozetini tutmali. V1’de ayri fiyat listesi motoru, sinirsiz line item, indirim matrisi, vergi konfigurasyonu gibi seyler gereksizdir. Rakam ve vaat net olsun; geri kalani disarida kalsin. Bugunku Offer modeli bu sadeligi destekliyor. citeturn40view0turn39view4

**DeliveryProject** ayri nesne olmali. Cunku satis vaadi ile operasyonel teslimat ayni sey degil. Kapsam, status, baslica blokaj ve yayina gecis burada tutulur. Bu nesnenin icinde `maintenance` statusunun bulunmasi önemli bir sinyaldir: V1’de bakım için ayri CRM modulu kurmaya gerek yok; bakım, teslimattan yasayan duruma gecen ayni nesnenin devamidir. citeturn39view0turn40view0

**Maintenance** V1’de ayri ana nesne olmamali; `DeliveryProject` icinde iki-uc alanla yasamali. Ozellikle `nextTouchAt`, `lastUpdateSummary` ve gerekirse `maintenanceReason` gibi dar alanlar yeterlidir. Ayri bakım nesnesi ancak hacim gercekten buyurse ve operatorler ayni ay icinde onlarca aktif bakim isini bagimsiz sekilde yonetmeye baslarsa acilabilir. Bu, DeliveryProjectStatus’un zaten `maintenance`i tasiyor olmasina dayanan bilinçli bir cıkarımdır. citeturn39view0

**ConsultationRef** ve **ContextRef** V1’de CRM cekirdek nesnesi olmamali; sadece baglantı alanı olmali. Yani CRM kaydi, gerekirse bir consultation kaydina veya bir sabit referansa link versin; ama zengin brief, prompt, run, action ve context json’larini Project OS icine kopyalayip aynalamaya kalkmasin. Consultation schema’sinin bugunku genisligi, bu aynalama egiliminin neden tehlikeli oldugunu zaten gosteriyor. citeturn39view1turn39view2

Bu nedenle net V1 nesne seti su olmalı: **Business, Audit, Offer, DeliveryProject**. Bunun yaninda sadece **ConsultationRef** ve **ContextRef** gibi baglanti seviyesinde iliskiler olmali. **Lead, Deal, Task, Note, Thread, Activity, Contact, Account** gibi nesneler V1 disinda kalmali. Bu sertlik, ürünün lehinedir. citeturn7view0turn9view0turn43view0

## Daha net V1 yuzey seti

V1 yuzey seti bir ana omurga ve iki yan kopruden olusmali. Ana omurga `Project OS` olmali. Repodaki app yapisinda zaten `project-os`, `businesses/[slugAndId]`, `consultation-center` ve `context-center` route’lari ayrisiyor; bu, dogru urun hiyerarsisi için iyi bir baslangic. Ama bunlari esit agırlıkta “CRM modulleri” gibi sunmak yerine, hiyerarsiyi tek ana is ekrani lehine sertlestirmek gerekir. citeturn20view0turn38view1

**Ana ekran:** `Project OS / Sicak isler`. Varsayilan ekran bu olmali. Form duvari degil, siradaki is kuyruğu olmali. Hangi is gecikiyor, hangisi bloklu, hangisinin bir sonraki adimi belli, bunlar cikmali. Erişebildiğim Project OS sayfasinda formlar ve tablolar halen cok agir; bu, ilk bakista operatoru aksiyondan cok veri girisine iter. Bunu tersine cevirin. citeturn37view0turn41view3

**Isletme profili:** `Business Detail`. Bu yuzeyde isletmenin sabit kimligi, mevcut asama etiketi, son audit/teklif/teslimat baglantilari ve tek ozet gorunmeli. Burasi hikaye anlatma yeri degil; operatorun baglam kaybetmeden is zincirini gormesini saglayan baglama yuzeyi olmali. App yapisinda business detail route’u gorunuyor; bu yuzey V1’de gereklidir. citeturn20view0turn39view0

**Audit yuzeyi:** Audit olusturma ve guncelleme ayrik ama yalın kalmali. Audit ekraninin cikisi teklifi netlestirmeli; “audit bitti” hissi degil, “teklif acmaya hazir” sonucu vermeli. HEARTBEAT’te audit create/update akislarinin acildigi yaziyor; bu yuzey korunmali ama yapilandirilmis hale getirilmeli. citeturn8view1

**Teklif yuzeyi:** Teklif ekraninda paket, fiyat, onay durumu ve sözü verilen kapsam snapshot’i tek bakista gorulmeli. Burasi satıs tiyatrosu degil, operator-ticari baglanti yuzeyidir. HEARTBEAT zaten teklif create/update akisinin acildigini ve teklif omurgasinin bu fazin cekirdeginde oldugunu yaziyor. citeturn8view1turn9view0

**Teslimat ve bakım yuzeyi:** Teslimat operatör isidir; dolayisiyla bu ekran “live mi, building mi, maintenance mi, blokaj ne” gibi sorulara cevap vermeli. Ayri bir proje yonetim suit’ine donusmemeli. HEARTBEAT’te delivery create/update akisi ve schema’da DeliveryProject durumu bunun icin zaten yeterli bir baslangic veriyor. citeturn8view1turn39view0

**Yan kopruler:** `Karar ac` ve `Baglam sec`. Prompt Üretimi top-level CRM ekranı gibi pazarlanmamali; Project OS icinden, takildiginda acilan bir yan kapı olmali. Context Center da ayni sekilde, hafiza ve kaynak secimi icin cagirilmalı; operasyonel kaydı yutan bir referans deposu olmamali. Consultation sayfasinin kendi tanimi bile bunu destekliyor. citeturn43view0

## Kirmizi cizgi kurallari

Bu kurallar tavsiye degil, urun siniridir. Kaynaklarin cizgisi de bunu destekliyor: once netlik, sonra arac; genel CRM’e kaymama; not coplugu ve prompt-amacçiligi reddi; grafik yerine sayi/durum/tablo onceligi. citeturn8view0turn9view0turn41view2turn43view0

- Her yeni alan veya ekran, su testi gecmeli: **“Bu, operatorun sonraki aksiyonunu degistiriyor mu?”** Degistirmiyorsa disarida kalir.
- CRM’de **tek kanonik akış** vardir: Audit -> Teklif -> Teslimat -> Bakim. Bunun disinda paralel pipeline acilmaz.
- **Serbest not alanlari** minimumda tutulur. Yapilandirilmamis not biriktirme yasaktır.
- **Standalone task sistemi** yoktur. Gerekirse checklist, ilgili nesnenin icinde ve o nesnenin omru boyunca yasar.
- **Mesaj gecmisi** CRM’e kopyalanmaz. Gerekirse tek satirlik karar ozeti veya operator ozetine indirgenir.
- **Reporting**, ancak queue kalitesi oturduktan sonra gelir. Dashboard, queue’nun yerine gecemez.
- **Consultation**, CRM cekirdegi degildir. Consultation sonucu ya Project OS’a tek karar/aksiyon olarak iner ya da Context Center’a referans olarak baglanir.
- **Context**, CRM cekirdegi degildir. Referans secip cikilir; orada yasayip CRM’e tasanmaz.
- **Custom object ve custom field** V1’de yoktur.
- “One panel” demek **her seyi ayni yere toplamak** degil, **operatorun isi icin tek kokpit kurmak** demektir.

## Tam rewrite: operasyonel CRM cizgisi dokumani

EsnafDigital’in operasyonel CRM’i, yatay bir “musteri iliskileri yazilimi” degildir. Bu sistemin gorevi, kucuk yerel isletmeleri Audit -> Teklif -> Teslimat -> Bakim hattinda kaybetmeden ilerletmektir. Merkezde iliski genisligi degil, hizmet akisi vardir. Bu nedenle sistemin basarisi, kac alan barindirdigi ya da kac rapor gosterdigi ile degil; operatorun bir sonraki dogru adimi ne kadar hizli gordugu ile olculur. Bu cizgi, MEMORY’deki kalici is modeli ve HEARTBEAT’teki genel CRM kaymasi uyarisi ile uyumludur. citeturn7view0turn8view0turn9view0

Bu urunun merkezi `Project OS`’tur. `Project OS`, aktif islerin sicaklik sirasina gore gorundugu, blokajlarin acik oldugu ve audit, teklif, teslimat, bakim zincirinin tek yerde izlendiği operator kokpitidir. Burada amac veri toplamak degil, işi ilerletmektir. Ekran, kendisini genel CRM’den acikca ayirmalidir. Sayi, durum ve tablo yeterlidir; grafik, dashboard ve yonetsel gosteri katmani gereksizdir. citeturn41view2turn41view3

CRM’in cekirdek nesneleri yalnizca dordur: `Business`, `Audit`, `Offer`, `DeliveryProject`. `Business` isletmenin operasyonel capasi; `Audit` teklifin girdisi olan teshis; `Offer` ticari vaadin snapshot’i; `DeliveryProject` ise o vaadin icrasi ve yasayan bakim durumudur. Bakim, V1’de ayri bir mega modül degil, DeliveryProject’in devamidir. Bu nedenle ek nesne uretmek yerine mevcut nesneleri sertlestirmek gerekir. citeturn39view0turn40view0

`Prompt Üretimi` ve `Context Center`, CRM’in cekirdegi degil, yan katmanlaridir. `Prompt Üretimi`, karar brief’i, route secimi ve sonuctan aksiyon cikarma icin vardir. `Context Center` ise sabit referans ve hafiza secimi icin vardir. Bunlar Project OS’un icine dagitilmaz, onu yutmaz ve ondan bagimsiz ikinci bir CRM mantigi kurmaz. Prompt Üretimi’in kendi kirmizi cizgisi de bunu acik soyluyor: not coplugu olmayacak, prompt uretimi amac olmayacak, ureyen is Project OS veya Context Center’a baglanacak. citeturn43view0

Bu urunde bilinclı olarak disarida tutulacak seyler vardir: genel lead pipeline’lari, omnichannel mesaj gecmisi, serbest not habitatlari, generic task manager, custom object fabrikasi ve yonetsel dashboard katmani. Bunlar operatoru guclendirmez; dikkatini parçalar. EsnafDigital’in rekabeti yatay yazılım genisliginden degil, yerel isletmeye hizli audit, net teklif, visibl teslimat ve duzenli bakım sunmaktan gelir. Bu yüzden scope sert tutulur. citeturn7view0turn41view2turn43view0

V1’in done tanimi parlak degil, faydali olmalidir: operatör bir isletmeyi sisteme alir, audit’i yapilandirir, teklifi acar, teslimati baslatir, bakima aktarir ve nerede takildigini aninda gorur. Gerekiyorsa bir kararı Consultation’a yollar, referansi Context’ten ceker, ama is asla bu yan yuzeylerde dagilmaz. Sistem bir action theatre degil, gercek is akisi olur. Bu, repo icindeki uygulama/baglam/karar ayriminin urun mantigina cevrilmis halidir. citeturn38view0turn38view1turn43view0

## Ustunluk savunmasi

Bu dar operasyonel CRM cizgisi, yatay SaaS CRM hevesinden daha ustundur cunku EsnafDigital’in ilk pazari ve ilk segmentleri genis kurumsal satis organizasyonlari degil; Arnavutköy odakli yerel berber, guzellik salonu ve kafe/restoran segmentleridir. Bu pazarda kazanan sey “account hierarchy” ya da “multi-pipeline forecasting” degil; hizli teshis, anlasilir teklif, görünür teslimat ve duzenli bakimdir. MEMORY bunu urun ve is modeli seviyesinde zaten tarif ediyor. citeturn7view0turn8view0

Bu cizgi ayni zamanda uygulama gercegine daha uygundur. Repo, uygulamayi `agent-workspace` icindeki admin/ic operasyon alanı olarak kuruyor; Prisma schema da cekirdekte yalnizca birkaç operasyon nesnesiyle basliyor. Bu, implementation realism adina avantajdir. Yatay CRM hevesi bu sadeligi yok eder; veri modeli sismanlar, UI dagilir, karar merkezleri birbirine karisir. Dar model ise hem daha hizli yapilir hem daha az cop veri uretir. citeturn38view1turn40view0turn39view1

Son olarak bu cizgi uzun vadede daha savunulabilirdir cunku urunu “her sey burada” tuzagindan korur. HEARTBEAT ve Consultation ekranlari, ekipte bu savrulma tehlikesinin zaten fark edildigini gosteriyor: genel CRM kaymasi uyarisi var; not coplugu reddediliyor; prompt amac degil, route amac deniyor. Benim onerim bu sezgiyi policy’ye cevirmek: Project OS merkez, digerleri yan katman. Bunu yaparsaniz EsnafDigital bir panel kurmaz; calisan bir operator sistemi kurar. Yapmazsaniz elinizde bloat bir mini-SaaS kalir. citeturn9view0turn43view0turn41view3