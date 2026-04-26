> Aktif 360 bolum dosyasi.
> Durum: MVP kabul standardiyla hizalandi; P0/P1/P2, tenant guvenligi ve pilot gecis riskleri eklendi.

---

# 22. Stratejik Riskler

Bu bölüm sabit ve bir kere yazılıp kapanacak bir liste değildir. EsnafDigital 360 geliştikçe riskler değişecektir.

Bu nedenle risk analizi:

- her önemli karar sonrası güncellenmeli,
- ilk pilotlardan sonra tekrar ele alınmalı,
- GPT Pro ile ayrıca kontrol edilmeli,
- teknik, operasyonel ve ticari riskler ayrı ayrı değerlendirilmelidir.

## 22.1 Kapsam Şişmesi

Risk:

Tüm modülleri aynı anda kurmaya veya otomatikleştirmeye çalışmak projeyi yavaşlatır.

Belirti:

- çok fazla ekran açılması,
- her modül için ayrı sistem tasarlama isteği,
- ilk agent/workspace doğrulaması yapılmadan web, QR, katalog, WhatsApp, randevu, muhasebe gibi alanlara yayılmak,
- web vitrini, hizmet listesi ve QR'ı taslak yerine tam ürün gibi ele almak.

Kontrol:

> Önce tek işletme için gerçek agent/workspace çalışsın. Sonra modüller sırayla eklenir.

## 22.2 Yanlış Hedef Segment

Risk:

Ürün, özel işletme ajanından gerçek verim alamayacak işletmelere anlatılırsa değer anlaşılmaz.

Belirti:

- müşteri sadece ucuz web sitesi ister,
- bilgi paylaşmaya istekli değildir,
- mesajlaşma üzerinden ilerlemeyi kullanmaz,
- dijital operasyon kurma veya büyütme ihtiyacı yoktur,
- onaylı ve kontrollü ilerlemeyi “neden otomatik yapmıyor?” diye sorun görür.

Kontrol:

> Hedef, dijital operasyonunu kurmak veya büyütmek isteyen ve ajandan gerçek fayda görebilecek KOBİ'lerdir. Sektör listesi ve paket dili ayrıca netleştirilmelidir.

## 22.3 Premium Vaat ile MVP Gerçeği Arasındaki Gerilim

Risk:

Ürün premium anlatılırken MVP'nin ilk hali yarı otomatik ve kontrollü olacak. Bu fark yanlış anlatılırsa müşteri beklentisi fazla yükselir.

Belirti:

- müşteri ajanın her şeyi otomatik yapacağını sanır,
- dış hesaplarda anında işlem bekler,
- randevu, ödeme, sipariş, paylaşım gibi riskli işlerde otomatiklik bekler,
- taslak/preview çıktılarını “eksik teslimat” gibi algılar.

Kontrol:

> Müşteriye sonuç anlatılır; ancak ilk çıktıların taslak/preview olduğu ve riskli işlemlerin onayla ilerlediği baştan net tutulur.

## 22.4 Agent / Workspace Çoğalmasının Karmaşası

Risk:

Her işletmeye gerçek agent/workspace açmak güçlüdür; fakat otomasyon ve şablon olmadan manuel karmaşa doğurur.

Belirti:

- agent'lar elle kurulmaya başlanır,
- workspace dosyaları farklılaşır ve izlenemez,
- agentDir/session store tekrar kullanılır,
- hangi agent'ın hangi şablondan geldiği bilinmez,
- yetki profilleri tutarsız olur.

Kontrol:

> İyi başlangıç şablonu, otomatik kurulum, şablon sürümü takibi, ayrı workspace/agentDir/session ve sıkı yetki sınırı zorunludur.

## 22.5 Güvenlik ve İzolasyon Hatası

Risk:

Bir işletme agent'ı başka işletme verisine, ana workspace'e, secret'lara veya yetki dışı tool'lara erişirse ciddi güvenlik sorunu oluşur.

Belirti:

- agent'lar ortak workspace/agentDir/session kullanır,
- workspace tek başına güvenlik sınırı sanılır,
- tool allowlist net değildir,
- denylist uygulanmaz,
- API işletme bazlı yetki kontrolü yapmaz,
- body'deki `business_id` yetki kanıtı sayılır,
- gizli bilgiler workspace'e yazılır,
- audit log eksik kalır,
- pause / kill switch çalışmaz.

Kontrol:

> Güvenlik sınırı workspace değil; kanal allowlist + explicit binding + sandbox/tool policy + EsnafDigital API tenant kontrolü + audit/onay + kill switch birleşimidir.

## 22.6 Tek Gateway'in Yanlış Yorumlanması

Risk:

Tek test işletmesi için kabul edilebilir olan tek Gateway modeli, çok müşterili ve karşılıklı güvenmeyen tenant ortamı için yeterli güvenlik sınırı gibi yorumlanır.

Belirti:

- birden fazla gerçek müşteri aynı Gateway altında yüksek yetkili tool'larla çalışır,
- dış hesap credential'ları tek runtime'da birikir,
- browser/exec/cron gibi yüksek etkili araçlar müşterili ortama açılır,
- Gateway public exposure veya credential sınırları zayıf kalır.

Kontrol:

> Tek test işletmesi için tek Gateway kullanılabilir; gerçek müşteri, dış hesap, public etki ve yüksek riskli tool arttıkça ayrı OS user, ayrı Gateway veya ayrı VPS eşikleri yeniden değerlendirilir.

## 22.7 Tek Kanala Bağımlılık

Risk:

Sistem sadece Telegram veya sadece WhatsApp mantığıyla kurulursa ileride taşımak zorlaşır.

Belirti:

- ajan mantığı kanal adapterine yazılır,
- routing/binding kanaldan bağımsız tasarlanmaz,
- WhatsApp ticari hedef olduğu için erken teknik kilitlenme oluşur,
- işletmenin kendi WhatsApp hattını bağlamak MVP çekirdeği sanılır.

Kontrol:

> Kanal sadece giriş/çıkış kapısıdır. Ajan mantığı kanal bağımsız kalmalıdır. İlk MVP pilot kanal ile doğrulanabilir.

## 22.8 OpenClaw'ın Ana Uygulamaya Gömülmesi

Risk:

OpenClaw runtime EsnafDigital app içine gömülürse bakım, güvenlik ve ölçekleme zorlaşır.

Belirti:

- agent runtime ile app kodu iç içe geçer,
- servis ayrımı bulanıklaşır,
- tool çalıştırma ve sandbox sınırı kaybolur,
- EsnafDigital API sınırı atlanır.

Kontrol:

> OpenClaw ayrı runtime katmanı olarak kalmalıdır. Başta aynı VPS olabilir; ancak mantıksal ayrım ve API/tool sınırı korunmalıdır.

## 22.9 Manuel Operasyonun Gizli Maliyeti

Risk:

MVP yarı otomatik ilerlerken operasyon yükü görünmez kalırsa paket fiyatı ve teslimat süresi yanlış hesaplanır.

Belirti:

- agent bilgi toplar ama operasyon işleri birikir,
- fiziksel materyal, domain, sosyal medya, dış hesap işleri çok zaman alır,
- bakım paketi kârlı olmaktan çıkar,
- her iş kurucu müdahalesi gerektirir.

Kontrol:

> Her manuel iş görev olarak izlenmeli; kurulum ve bakım maliyeti zamanla ölçülmelidir.

## 22.10 Bağlam Dosyalarının Dağılması

Risk:

Her işletme agent'ının kendi dosyaları olacağı için bağlam hijyeni bozulabilir.

Belirti:

- AGENTS/SOUL/TOOLS/MEMORY/BUSINESS dosyaları her işletmede farklı mantığa kayar,
- tekrar eden veya çelişen talimatlar çoğalır,
- güvenlik sınırları dosyadan dosyaya değişir,
- secret veya raw transcript workspace'e yazılır.

Kontrol:

> Workspace şablonu standart olmalı; işletmeye özel değişiklikler sınırlı ve izlenebilir yapılmalıdır. Secret workspace'e yazılmamalıdır.

## 22.11 Yanlış Yapay Zeka Algısı

Risk:

Müşteri “her şeyi yapan yapay zeka” beklentisine girerse ürün yanlış anlaşılır.

Belirti:

- müşteri ajanın dış hesaplara kendiliğinden müdahale etmesini bekler,
- kesin sonuç garantisi bekler,
- Google sıralaması, yorum sayısı veya satış artışı garantisi ister,
- onaylı ve kontrollü süreci eksiklik sayar.

Kontrol:

> Ürün, her şeyi otomatik yapan yapay zeka değil; işletmenin dijital operasyonunu mesajlaşma üzerinden sistemli ilerleten özel işletme ajanı olarak anlatılmalıdır.

## 22.12 MVP Kabul Standardının Atlanması

Risk:

Bot cevap verdiği veya web taslağı çıktığı için MVP tamamlandı sanılır.

Belirti:

- P0 güvenlik hataları varken yeni pilota geçilir,
- tenant mismatch veya yanlış routing önemsenmez,
- audit ve approval eksik kalır,
- müşteri değeri doğrulanmadan teknik demo yeterli sayılır,
- admin panel sıradaki adımı göstermeden pilot büyütülür.

Kontrol:

> Teknik, operasyonel, güvenlik ve müşteri değeri kanıtları birlikte alınmadan MVP tamamlanmış sayılmaz. P0 bloklayıcı hata sıfır olmadan yeni pilota geçilmez.

## 22.13 Risk Analizinin Güncellenmesi

Bu bölüm proje ilerledikçe güncellenmelidir.

Özellikle şu anlarda tekrar ele alınmalıdır:

- ilk test işletmesi agent'ı oluşturulduğunda,
- ilk web vitrini / QR / katalog çıktısı üretildiğinde,
- ilk müşteri veya pilot işletme denendiğinde,
- WhatsApp pilot hattı devreye alındığında,
- yeni tool/API yetkisi eklendiğinde,
- dış hesap veya ödeme/randevu gibi hassas modüller gündeme geldiğinde,
- segment/paket kararları netleştiğinde.

GPT Pro'ya ayrıca şu sorulmalıdır:

- Bu risk listesinde eksik kritik risk var mı?
- Hangi riskler MVP'de en önce kontrol edilmeli?
- Hangi riskler ürünü/paketi yeniden konumlandırmayı gerektirir?
- Agent/workspace çoğalması için hangi güvenlik ve operasyon kontrol noktaları eklenmeli?

Ana prensip:

> Risk analizi, belgeyi tamamlamak için değil; proje büyüdükçe yön kaymasını ve güvenlik hatalarını erken görmek için kullanılmalıdır.
