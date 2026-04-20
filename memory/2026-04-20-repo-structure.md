# Session: 2026-04-20 21:27:33 UTC

- **Session Key**: agent:main:main
- **Session ID**: e27416a9-1804-4c6e-af21-2f219704293b
- **Source**: webchat

## Conversation Summary

user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Mon 2026-04-20 21:18 UTC] Aşağıdaki gibi bir yol izlemek seni bozar mı? “1. Mevcut yapı değerlendirmesi

Bu repo gerçekten “kod deposu + yaşayan çalışma alanı + bağlam merkezi” olarak kurulmuş. Bu güçlü bir taraf; çünkü proje tanımı, aktif durum, kalıcı hafıza, kararlar, checklist/playbook’lar ve kod aynı yerde duruyor. Özellikle HEARTBEAT.md, MEMORY_SUMMARY.md, MEMORY.md, PROJECT.md, ROADMAP.md, AGENTS.md, TOOLS.md ve OPERATIONS.md ile zaten bir çekirdek omurga kurulmuş. ￼

Ayrıca repo içinde işlevsel ayrımlar da var: DECISIONS/ kalıcı kararları, memory/ tarihli günlük notları, CHECKLISTS/ kısa icra listelerini, PLAYBOOKS/ uçtan uca akışları, REFERENCES/ kaynakları, ARCHIVE/ ham/eskimiş materyali tutuyor. Kod tarafında da pratikte iki ana uygulama görülüyor: statik bir admin-site/ ve asıl Next.js uygulaması olan openclaw-control-ui/; bu ikinci klasörde app/, components/, lib/, prisma/ gibi tipik ürün kodu alanları var. ￼

Sorun şu: bu yapı Openclaw benzeri “alışık” bir ajan için çalışabilir, ama sıfır hafızalı GPT-5 Pro için ilk girişte öncelik sırası yeterince sert değil. Repo kökü bilgi açısından zengin, fakat ilk 2–3 dakikada “nereye bakmalıyım?” sorusuna tek ve tartışmasız bir rota vermiyor. ￼

⸻

2. Sorunlar

2.1 Kök dizinde fazla sayıda bağlam dosyası var

Kökte AGENTS.md, BOOTSTRAP.md, CONSULTATION_LOG.md, HEARTBEAT.md, HEARTBEAT.json, IDENTITY.md, MEMORY.md, MEMORY_SUMMARY.md, NOTES.md, OFFERS.md, OPERATIONS.md, PROJECT.md, ROADMAP.md, SEGMENTS.md, SOUL.md, TOOLS.md, TOOLS.yaml, USER.md gibi çok sayıda bağlam dosyası aynı seviyede duruyor. Bu, “önce hangisini okuyayım?” maliyetini yükseltiyor. ￼

2.2 Zorunlu giriş rotası tek değil

README.md okuma sırası olarak önce HEARTBEAT.md, sonra MEMORY_SUMMARY.md diyor. AGENTS.md yine HEARTBEAT.md ve MEMORY_SUMMARY.md ile açılıyor ama sonra görev bazlı başka dallara gidiyor. BOOTSTRAP.md ise yeni oturumlarda önce AGENTS.md, sonra MEMORY_SUMMARY.md, sonra HEARTBEAT.md çizgisini öneriyor. Yani giriş rotası var, ama tek ve katı değil. ￼

2.3 README’nin anlattığı repo modeli ile gerçek ağaç kaymış

README, ürün tarafını iki ana klasör olarak website/ ve agent-workspace/ üzerinden anlatıyor; ayrıca state/ klasöründen söz ediyor. Ama mevcut kökte görünen gerçek klasörler admin-site/, openclaw-control-ui/, bin/, deploy/ vb.; website/, agent-workspace/ ve state/ görünmüyor. Bu, GPT-5 Pro’nun ilk zihinsel modelini yanlış kurmasına yol açar. ￼

2.4 Kısa ömürlü bilgi ile kalıcı bilgi aynı seviyede karışıyor

HEARTBEAT.md açıkça kısa ömürlü operasyon nabzı için. MEMORY.md ise kalıcı gerçekler için. Ama aynı kökte NOTES.md, CONSULTATION_LOG.md, BOOTSTRAP.md, HEARTBEAT.json, DEGISIKLIK_OZETI.md gibi geçicilik derecesi farklı başka dosyalar da duruyor. Bu karışım, “güncel olan ne, tarihi olan ne, kalıcı olan ne?” ayrımını zayıflatıyor. ￼

2.5 Aynı bağlam alanı birden fazla dosyaya dağılmış

Proje ve ürün çizgisi PROJECT.md, MEMORY.md, ROADMAP.md, OFFERS.md, SEGMENTS.md arasında dağılıyor. Bunların her biri değerli, ama sınırlar keskin değilse model “tek doğru kaynak” hissini kaybeder. Özellikle ürün omurgası ve segment bilgisi hem proje tanımında hem hafızada hem ayrı dosyalarda yankılanıyor. ￼

2.6 Ajan davranışı ve persona talimatları dağınık

AGENTS.md çalışma kuralı veriyor; USER.md kullanıcı profili anlatıyor; IDENTITY.md ajan kimliğini yazıyor; SOUL.md ton ve davranış çizgisi veriyor. Bunlar tek tek faydalı ama ilk girişte dördünü birden kökte görmek, “hangisi operasyonel, hangisi karakter, hangisi görev disiplini?” ayrımını bulanıklaştırıyor. ￼

2.7 Operasyonel bilgi tek katmanda toplanmamış

OPERATIONS.md canlı servis, port, path ve systemd bilgisini taşıyor. TOOLS.md ise ortam, stack ve araç politikasını tutuyor. Buna ek olarak kökte bin/ ve deploy/ var; openclaw-control-ui/ içinde ayrıca ayrı bin/ ve deploy/ klasörleri var. Bu, “operasyon komutu nerede, deploy notu nerede, uygulama-içi script nerede?” sorusunu zorlaştırıyor. ￼

2.8 Klasörlerin çoğunda giriş README/INDEX görünmüyor

DECISIONS/, memory/, CHECKLISTS/, PLAYBOOKS/, REFERENCES/, AGENTS/, skills/, bin/, deploy/, openclaw-control-ui/, admin-site/ listelerinde görünür bir README.md ya da INDEX.md yok. İnsan için tolere edilebilir; sıfır hafızalı model için maliyetlidir. ￼

2.9 Makine-dostu ve insan-dostu durum kaydı arasında source-of-truth net değil

HEARTBEAT.md ve HEARTBEAT.json aynı alanı iki formatta taşıyor. Bu faydalı olabilir; ama biri ana, diğeri türetilmiş olarak tanımlanmazsa güven düşer. ￼

⸻

3. Önerilen yapı

Ana kararım şu:

Kodu olduğu yerde bırak. Operasyon path’lerini bozma. Kökü sadeleştir. “İlk giriş paketi”ni sertleştir. Kökte sadece yön verici belgeler kalsın; geri kalan bağlamı tek bir context/ altında grupla.

3.1 Nihai klasör yapısı

/
├─ README.md
├─ START_HERE.md # yeni: zorunlu giriş dosyası
├─ HEARTBEAT.md # canlı durum, insan için ana kaynak
├─ HEARTBEAT.json # makine için türetilmiş özet
├─ MEMORY_SUMMARY.md # 1 ekranlık kalıcı özet
├─ PROJECT.md # repo/proje nedir
├─ ROADMAP.md # orta vadeli yön
├─ AGENTS.md # oturum davranışı + okuma rotası
├─ OPERATIONS.md # canlı operasyon referansı
│
├─ context/
│ ├─ README.md
│ ├─ core/
│ │ ├─ MEMORY.md
│ │ ├─ TOOLS.md
│ │ └─ TOOLS.yaml
│ ├─ business/
│ │ ├─ OFFERS.md
│ │ ├─ SEGMENTS.md
│ │ └─ AUDIT_SCORECARD.json
│ ├─ agent/
│ │ ├─ USER.md
│ │ ├─ IDENTITY.md
│ │ └─ SOUL.md
│ └─ logs/
│ ├─ CONSULTATION_LOG.md
│ ├─ NOTES.md
│ ├─ DEGISIKLIK_OZETI.md
│ └─ BOOTSTRAP.md
│
├─ DECISIONS/
│ ├─ README.md
│ └─ YYYY-MM-DD-*.md
├─ memory/
│ ├─ README.md
│ └─ YYYY-MM-DD*.md
├─ CHECKLISTS/
│ ├─ README.md
│ └─ *.md
├─ PLAYBOOKS/
│ ├─ README.md
│ └─ *.md
├─ REFERENCES/
│ ├─ README.md
│ └─ ...
├─ ARCHIVE/
│ ├─ README.md
│ └─ ...
├─ AGENTS/
│ ├─ README.md
│ └─ ...
├─ skills/
│ ├─ README.md
│ └─ ...
├─ deploy/
│ ├─ README.md
│ └─ ...
├─ bin/
│ ├─ README.md
│ └─ ...
├─ admin-site/
│ ├─ README.md
│ └─ index.html
└─ openclaw-control-ui/
 ├─ README.md
 ├─ app/
 ├─ components/
 ├─ lib/
 ├─ prisma/
 ├─ bin/
 └─ deploy/

3.2 Repo kökünde hangi dosyalar kalmalı

Bence kökte sadece şunlar kalmalı:

* README.md
* START_HERE.md
* HEARTBEAT.md
* HEARTBEAT.json
* MEMORY_SUMMARY.md
* PROJECT.md
* ROADMAP.md
* AGENTS.md
* OPERATIONS.md

Bunlar GPT-5 Pro’nun ilk girişte cevaplamak istediği temel soruları taşır:

* repo ne?
* önce ne okunur?
* güncel durum ne?
* orta vadeli yön ne?
* çalışma disiplini ne?
* operasyonel bilgi nerede?

3.3 Neden bu yapı daha iyi

Bu yapıda kök “yön tayin katmanı” olur; context/ ise “derin bağlam katmanı” olur. Böylece model önce az sayıda dosyayla zihinsel harita kurar, sonra yalnızca görev gerekiyorsa derine iner. Bu, mevcut repo ruhunu bozmaz; sadece görünürlüğü ve önceliklendirmeyi sertleştirir.

3.4 GPT-5 Pro için zorunlu giriş okuma sırası

Varsayılan rota:

1. START_HERE.md
2. HEARTBEAT.md
3. MEMORY_SUMMARY.md

Sonra göreve göre dallan:

* Repo nedir / strateji / ürün → PROJECT.md, sonra ROADMAP.md
* Kalıcı ilke / değişmeyen çizgi → context/core/MEMORY.md
* Kalıcı karar → DECISIONS/README.md, sonra ilgili karar dosyası
* Kod görevi → ilgili uygulama README.md, sonra kod
* Operasyon görevi → OPERATIONS.md, sonra deploy/README.md veya bin/README.md
* Bugün ne oldu / günlük akış → memory/README.md, sonra son 1–2 tarihli not
* Danışma geçmişi → context/logs/CONSULTATION_LOG.md

Bu rota, mevcut dağınık giriş önerilerinin yerine tek standart olmalı. Mevcut repo zaten HEARTBEAT ve MEMORY_SUMMARY’yi öne çıkarıyor; önerim bunu tek kapıya dönüştürmek. ￼

⸻

4. Dosya yerleştirme kuralları

Buradaki amaç “hangi bilgi nereye yazılır?” sorusunu sıfır belirsizliğe indirmek.

4.1 Tek satırlık kural seti

* Şu an ne oluyor? → HEARTBEAT.md
* Kolay değişmeyecek gerçek nedir? → context/core/MEMORY.md
* Onun 1 ekranlık özeti nedir? → MEMORY_SUMMARY.md
* Projeyi dışarıdan biri 3 dakikada nasıl anlar? → PROJECT.md
* Önümüzdeki haftalar/aylar ne yönde? → ROADMAP.md
* Kalıcı karar nerede? → DECISIONS/
* Günlük not / bugün olanlar nerede? → memory/YYYY-MM-DD*.md
* Teklif/paket bilgisi nerede? → context/business/OFFERS.md
* Hedef segment bilgisi nerede? → context/business/SEGMENTS.md
* Operasyonel servis/path/port bilgisi nerede? → OPERATIONS.md
* Tool/stack/politika nerede? → context/core/TOOLS.md
* Tekrarlayan süreç nerede? → PLAYBOOKS/
* Kısa icra listesi nerede? → CHECKLISTS/
* Ham kaynak / transcript nerede? → REFERENCES/ veya ARCHIVE/

4.2 Kısa ömürlü / kalıcı / karar / referans / arşiv ayrımı

* Kısa ömürlü durum
 Bugünün odağı, aktif blokaj, sıradaki birkaç adım: HEARTBEAT.md
* Günlük kısa ömürlü kayıt
 Tarihli not, çalışma günlüğü, o günün gözlemi: memory/YYYY-MM-DD*.md
* Kalıcı bilgi
 İş modeli çizgisi, teknik ilke, korunacak karar hattı: context/core/MEMORY.md
* Kalıcı karar
 “Bunu neden böyle yapıyoruz?” sorusunun resmi cevabı: DECISIONS/YYYY-MM-DD-slug.md
* Referans
 Ham kaynak, dış metin, transcript, tasarım kaynağı: REFERENCES/
* Arşiv
 Artık aktif referans olmayan ama saklanacak dosya: ARCHIVE/

4.3 Source of truth kuralları

* HEARTBEAT.md ana kaynaktır; HEARTBEAT.json ondan türetilir.
* context/core/MEMORY.md ana kalıcı hafızadır; MEMORY_SUMMARY.md onun kısa özetidir.
* PROJECT.md “bu proje nedir” der; todo ve günlük durum içermez.
* ROADMAP.md “sıraya nasıl koyuyoruz” der; bugünkü durum içermez.
* DECISIONS/ “neden böyle yaptık” der; uygulanabilir günlük not içermez.
* memory/ günlük kayıt taşır; kalıcı ilke taşımaz.

Bu ayrımı bugün repo zaten ima ediyor, ama sert tanımlamıyor; önerim bunu resmi kurala çevirmek. ￼

⸻

5. Taşıma / yeniden adlandırma önerileri

5.1 Kökte kalacaklar

Bunları yerinde bırak:

* README.md
* HEARTBEAT.md
* HEARTBEAT.json
* MEMORY_SUMMARY.md
* PROJECT.md
* ROADMAP.md
* AGENTS.md
* OPERATIONS.md

5.2 context/ altına taşınacaklar

* MEMORY.md → context/core/MEMORY.md
* TOOLS.md → context/core/TOOLS.md
* TOOLS.yaml → context/core/TOOLS.yaml
* OFFERS.md → context/business/OFFERS.md
* SEGMENTS.md → context/business/SEGMENTS.md
* AUDIT_SCORECARD.json → context/business/AUDIT_SCORECARD.json
* USER.md → context/agent/USER.md
* IDENTITY.md → context/agent/IDENTITY.md
* SOUL.md → context/agent/SOUL.md
* CONSULTATION_LOG.md → context/logs/CONSULTATION_LOG.md
* NOTES.md → context/logs/NOTES.md
* DEGISIKLIK_OZETI.md → context/logs/DEGISIKLIK_OZETI.md
* BOOTSTRAP.md → context/logs/BOOTSTRAP.md

5.3 Yeniden adlandırmama önerisi

Ben admin-site/ ve openclaw-control-ui/ klasörlerini şimdi yeniden adlandırmanı önermem. Sebep: canlı path ve servis referansları OPERATIONS.md içinde mevcut; openclaw-control-ui zaten çalışan Next.js uygulaması gibi duruyor. Burada isim değiştirmekten çok, doğru README ile yolu netleştirmek daha düşük riskli. ￼

5.4 README’de düzeltilmesi gerekenler

README.md içindeki website/, agent-workspace/, state/ anlatımı güncellenmeli; gerçek repo ağacı admin-site/ ve openclaw-control-ui/ üzerinden anlatılmalı. Bu tek değişiklik bile GPT-5 Pro’nun ilk zihinsel modelini ciddi biçimde iyileştirir. ￼

⸻

6. Yeni oluşturulacak dosyalar

6.1 Zorunlu dosyalar

START_HERE.md
Bu repo için en kritik yeni dosya bu. İçeriği en fazla 1 ekran olmalı ve şu başlıkları taşımalı:

* Bu repo ne?
* 3 dakikalık giriş rotası
* Göreve göre nereye gidilir?
* Yazma kuralları
* Single source of truth haritası

Önerilen iskelet:

# START_HERE
Bu repo hem ürün kodu hem yaşayan bağlam workspace'idir.
## Zorunlu ilk okuma
1. HEARTBEAT.md
2. MEMORY_SUMMARY.md
## Göreve göre rota
- repo/proje mantığı -> PROJECT.md
- orta vadeli yön -> ROADMAP.md
- kalıcı hafıza -> context/core/MEMORY.md
- kararlar -> DECISIONS/README.md
- günlük notlar -> memory/README.md
- operasyon -> OPERATIONS.md
- ürün kodu -> openclaw-control-ui/README.md
- statik site -> admin-site/README.md
## Yazma kuralı
- aktif durum -> HEARTBEAT.md
- günlük not -> memory/YYYY-MM-DD.md
- kalıcı karar -> DECISIONS/
- kalıcı gerçek -> context/core/MEMORY.md

context/README.md
context/ altındaki alt alanların ne tuttuğunu anlatmalı.

6.2 Her önemli klasör için README/INDEX

Oluştur:

* DECISIONS/README.md
* memory/README.md
* CHECKLISTS/README.md
* PLAYBOOKS/README.md
* REFERENCES/README.md
* ARCHIVE/README.md
* AGENTS/README.md
* skills/README.md
* deploy/README.md
* bin/README.md
* openclaw-control-ui/README.md
* admin-site/README.md

6.3 Klasör bazlı README içeriği nasıl olmalı

Her klasör README’si en fazla şu 5 şeyi yazmalı:

* Bu klasör ne tutar?
* Önce hangi dosya okunur?
* Buraya ne yazılmaz?
* Dosya isimlendirme kuralı
* İlgili komşu klasörler

Örnek:

DECISIONS/README.md

* Burada yalnızca kalıcı karar kayıtları tutulur.
* Format: YYYY-MM-DD-kisa-slug.md
* Todo yazılmaz.
* Günlük not yazılmaz.
* Karar sonucu ilgili kaynak dosyalara işlenir.

memory/README.md

* Günlük / tarihli notlar burada tutulur.
* Format: YYYY-MM-DD.md veya YYYY-MM-DD-kisa-baslik.md
* Kalıcı ilke buraya yazılmaz.
* Bir bilgi 7 gün sonra da önemliyse MEMORY veya DECISIONS’a terfi ettirilir.

openclaw-control-ui/README.md

* Bu uygulama nedir?
* Ana modüller: Project OS, Context Center, Consultation Center, Hesap Merkezi
* Çalıştırma komutları
* Veri modeli nerede?
* Operasyon bilgisi için OPERATIONS.md

⸻

7. Uygulama planı

Aşama 1 — Yolu düzelt, dosya taşıma yapma

Önce sadece şunları yap:

1. START_HERE.md oluştur.
2. README.md’yi gerçek repo ağacına göre güncelle.
3. openclaw-control-ui/README.md ve admin-site/README.md ekle.
4. DECISIONS/README.md, memory/README.md, CHECKLISTS/README.md, PLAYBOOKS/README.md ekle.

Bu aşama en yüksek getiriyi en düşük riskle verir.

Aşama 2 — Kökü sadeleştir

Sonra bağlam dosyalarını context/ altına taşı:

1. context/ oluştur.
2. core/, business/, agent/, logs/ alt klasörlerini aç.
3. Yukarıda saydığım dosyaları taşı.
4. Eski kök path’lerde kısa yönlendirme stub’ları bırakma; doğrudan temizle. Kök sade olmalı.

Aşama 3 — Source of truth kurallarını yazılı hale getir

Bunları START_HERE.md ve context/README.md içine açıkça ekle:

* HEARTBEAT.md ana canlı durum
* HEARTBEAT.json türev
* MEMORY.md ana kalıcı hafıza
* MEMORY_SUMMARY.md kısa özet
* DECISIONS/ resmi karar kaydı
* memory/ günlük not

Aşama 4 — Çakışan içerikleri temizle

Özellikle şu alanlarda tekrar azalt:

* PROJECT.md ↔ MEMORY.md
* PROJECT.md ↔ OFFERS.md
* MEMORY.md ↔ SEGMENTS.md
* AGENTS.md ↔ USER.md ↔ IDENTITY.md ↔ SOUL.md

Burada hedef silmek değil, rol sınırı koymak.

Aşama 5 — Güncelleme ritmini standardize et

Basit kural:

* Her çalışma döngüsünde en fazla 1 ana durum dosyası güncellenir.
* Günlük gelişme varsa memory/YYYY-MM-DD*.md
* Kalıcı karar çıktıysa DECISIONS/
* Kalıcı çizgi değiştiyse context/core/MEMORY.md ve ardından MEMORY_SUMMARY.md
* Haftalık/aktif odak değiştiyse HEARTBEAT.md
* Operasyonel path/servis değiştiyse OPERATIONS.md

⸻

Son hüküm

Bu repo için en doğru hamle, yeni bir mimari icat etmek değil; kökü “giriş katmanı”, context/i “derin bağlam katmanı” haline getirmek.

En kritik üç değişiklik:

1. START_HERE.md ekle
2. README.md’yi gerçek ağaçla hizala
3. Kökteki ikinci seviye bağlam dosyalarını context/ altına indir

Bunlar yapıldığında GPT-5 Pro, gerçekten şu düzeni yaşayabilir:

hafızasız gir → 3 dosya oku → doğru klasöre sap → doğru kaynağa güven → doğru dosyaya yaz.

İstersen bunun devamında sana doğrudan uygulanabilir bir örnek START_HERE.md + güncellenmiş kök README.md taslağı da yazayım.“
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Mon 2026-04-20 21:18 UTC] Aşağıdaki gibi bir yol izlemek seni bozar mı? “1. Mevcut yapı değerlendirmesi

Bu repo gerçekten “kod deposu + yaşayan çalışma alanı + bağlam merkezi” olarak kurulmuş. Bu güçlü bir taraf; çünkü proje tanımı, aktif durum, kalıcı hafıza, kararlar, checklist/playbook’lar ve kod aynı yerde duruyor. Özellikle HEARTBEAT.md, MEMORY_SUMMARY.md, MEMORY.md, PROJECT.md, ROADMAP.md, AGENTS.md, TOOLS.md ve OPERATIONS.md ile zaten bir çekirdek omurga kurulmuş. ￼

Ayrıca repo içinde işlevsel ayrımlar da var: DECISIONS/ kalıcı kararları, memory/ tarihli günlük notları, CHECKLISTS/ kısa icra listelerini, PLAYBOOKS/ uçtan uca akışları, REFERENCES/ kaynakları, ARCHIVE/ ham/eskimiş materyali tutuyor. Kod tarafında da pratikte iki ana uygulama görülüyor: statik bir admin-site/ ve asıl Next.js uygulaması olan openclaw-control-ui/; bu ikinci klasörde app/, components/, lib/, prisma/ gibi tipik ürün kodu alanları var. ￼

Sorun şu: bu yapı Openclaw benzeri “alışık” bir ajan için çalışabilir, ama sıfır hafızalı GPT-5 Pro için ilk girişte öncelik sırası yeterince sert değil. Repo kökü bilgi açısından zengin, fakat ilk 2–3 dakikada “nereye bakmalıyım?” sorusuna tek ve tartışmasız bir rota vermiyor. ￼

⸻

2. Sorunlar

2.1 Kök dizinde fazla sayıda bağlam dosyası var

Kökte AGENTS.md, BOOTSTRAP.md, CONSULTATION_LOG.md, HEARTBEAT.md, HEARTBEAT.json, IDENTITY.md, MEMORY.md, MEMORY_SUMMARY.md, NOTES.md, OFFERS.md, OPERATIONS.md, PROJECT.md, ROADMAP.md, SEGMENTS.md, SOUL.md, TOOLS.md, TOOLS.yaml, USER.md gibi çok sayıda bağlam dosyası aynı seviyede duruyor. Bu, “önce hangisini okuyayım?” maliyetini yükseltiyor. ￼

2.2 Zorunlu giriş rotası tek değil

README.md okuma sırası olarak önce HEARTBEAT.md, sonra MEMORY_SUMMARY.md diyor. AGENTS.md yine HEARTBEAT.md ve MEMORY_SUMMARY.md ile açılıyor ama sonra görev bazlı başka dallara gidiyor. BOOTSTRAP.md ise yeni oturumlarda önce AGENTS.md, sonra MEMORY_SUMMARY.md, sonra HEARTBEAT.md çizgisini öneriyor. Yani giriş rotası var, ama tek ve katı değil. ￼

2.3 README’nin anlattığı repo modeli ile gerçek ağaç kaymış

README, ürün tarafını iki ana klasör olarak website/ ve agent-workspace/ üzerinden anlatıyor; ayrıca state/ klasöründen söz ediyor. Ama mevcut kökte görünen gerçek klasörler admin-site/, openclaw-control-ui/, bin/, deploy/ vb.; website/, agent-workspace/ ve state/ görünmüyor. Bu, GPT-5 Pro’nun ilk zihinsel modelini yanlış kurmasına yol açar. ￼

2.4 Kısa ömürlü bilgi ile kalıcı bilgi aynı seviyede karışıyor

HEARTBEAT.md açıkça kısa ömürlü operasyon nabzı için. MEMORY.md ise kalıcı gerçekler için. Ama aynı kökte NOTES.md, CONSULTATION_LOG.md, BOOTSTRAP.md, HEARTBEAT.json, DEGISIKLIK_OZETI.md gibi geçicilik derecesi farklı başka dosyalar da duruyor. Bu karışım, “güncel olan ne, tarihi olan ne, kalıcı olan ne?” ayrımını zayıflatıyor. ￼

2.5 Aynı bağlam alanı birden fazla dosyaya dağılmış

Proje ve ürün çizgisi PROJECT.md, MEMORY.md, ROADMAP.md, OFFERS.md, SEGMENTS.md arasında dağılıyor. Bunların her biri değerli, ama sınırlar keskin değilse model “tek doğru kaynak” hissini kaybeder. Özellikle ürün omurgası ve segment bilgisi hem proje tanımında hem hafızada hem ayrı dosyalarda yankılanıyor. ￼

2.6 Ajan davranışı ve persona talimatları dağınık

AGENTS.md çalışma kuralı veriyor; USER.md kullanıcı profili anlatıyor; IDENTITY.md ajan kimliğini yazıyor; SOUL.md ton ve davranış çizgisi veriyor. Bunlar tek tek faydalı ama ilk girişte dördünü birden kökte görmek, “hangisi operasyonel, hangisi karakter, hangisi görev disiplini?” ayrımını bulanıklaştırıyor. ￼

2.7 Operasyonel bilgi tek katmanda toplanmamış

OPERATIONS.md canlı servis, port, path ve systemd bilgisini taşıyor. TOOLS.md ise ortam, stack ve araç politikasını tutuyor. Buna ek olarak kökte bin/ ve deploy/ var; openclaw-control-ui/ içinde ayrıca ayrı bin/ ve deploy/ klasörleri var. Bu, “operasyon komutu nerede, deploy notu nerede, uygulama-içi script nerede?” sorusunu zorlaştırıyor. ￼

2.8 Klasörlerin çoğunda giriş README/INDEX görünmüyor

DECISIONS/, memory/, CHECKLISTS/, PLAYBOOKS/, REFERENCES/, AGENTS/, skills/, bin/, deploy/, openclaw-control-ui/, admin-site/ listelerinde görünür bir README.md ya da INDEX.md yok. İnsan için tolere edilebilir; sıfır hafızalı model için maliyetlidir. ￼

2.9 Makine-dostu ve insan-dostu durum kaydı arasında source-of-truth net değil

HEARTBEAT.md ve HEARTBEAT.json aynı alanı iki formatta taşıyor. Bu faydalı olabilir; ama biri ana, diğeri türetilmiş olarak tanımlanmazsa güven düşer. ￼

⸻

3. Önerilen yapı

Ana kararım şu:

Kodu olduğu yerde bırak. Operasyon path’lerini bozma. Kökü sadeleştir. “İlk giriş paketi”ni sertleştir. Kökte sadece yön verici belgeler kalsın; geri kalan bağlamı tek bir context/ altında grupla.

3.1 Nihai klasör yapısı

/
├─ README.md
├─ START_HERE.md # yeni: zorunlu giriş dosyası
├─ HEARTBEAT.md # canlı durum, insan için ana kaynak
├─ HEARTBEAT.json # makine için türetilmiş özet
├─ MEMORY_SUMMARY.md # 1 ekranlık kalıcı özet
├─ PROJECT.md # repo/proje nedir
├─ ROADMAP.md # orta vadeli yön
├─ AGENTS.md # oturum davranışı + okuma rotası
├─ OPERATIONS.md # canlı operasyon referansı
│
├─ context/
│ ├─ README.md
│ ├─ core/
│ │ ├─ MEMORY.md
│ │ ├─ TOOLS.md
│ │ └─ TOOLS.yaml
│ ├─ business/
│ │ ├─ OFFERS.md
│ │ ├─ SEGMENTS.md
│ │ └─ AUDIT_SCORECARD.json
│ ├─ agent/
│ │ ├─ USER.md
│ │ ├─ IDENTITY.md
│ │ └─ SOUL.md
│ └─ logs/
│ ├─ CONSULTATION_LOG.md
│ ├─ NOTES.md
│ ├─ DEGISIKLIK_OZETI.md
│ └─ BOOTSTRAP.md
│
├─ DECISIONS/
│ ├─ README.md
│ └─ YYYY-MM-DD-*.md
├─ memory/
│ ├─ README.md
│ └─ YYYY-MM-DD*.md
├─ CHECKLISTS/
│ ├─ README.md
│ └─ *.md
├─ PLAYBOOKS/
│ ├─ README.md
│ └─ *.md
├─ REFERENCES/
│ ├─ README.md
│ └─ ...
├─ ARCHIVE/
│ ├─ README.md
│ └─ ...
├─ AGENTS/
│ ├─ README.md
│ └─ ...
├─ skills/
│ ├─ README.md
│ └─ ...
├─ deploy/
│ ├─ README.md
│ └─ ...
├─ bin/
│ ├─ README.md
│ └─ ...
├─ admin-site/
│ ├─ README.md
│ └─ index.html
└─ openclaw-control-ui/
 ├─ README.md
 ├─ app/
 ├─ components/
 ├─ lib/
 ├─ prisma/
 ├─ bin/
 └─ deploy/

3.2 Repo kökünde hangi dosyalar kalmalı

Bence kökte sadece şunlar kalmalı:

* README.md
* START_HERE.md
* HEARTBEAT.md
* HEARTBEAT.json
* MEMORY_SUMMARY.md
* PROJECT.md
* ROADMAP.md
* AGENTS.md
* OPERATIONS.md

Bunlar GPT-5 Pro’nun ilk girişte cevaplamak istediği temel soruları taşır:

* repo ne?
* önce ne okunur?
* güncel durum ne?
* orta vadeli yön ne?
* çalışma disiplini ne?
* operasyonel bilgi nerede?

3.3 Neden bu yapı daha iyi

Bu yapıda kök “yön tayin katmanı” olur; context/ ise “derin bağlam katmanı” olur. Böylece model önce az sayıda dosyayla zihinsel harita kurar, sonra yalnızca görev gerekiyorsa derine iner. Bu, mevcut repo ruhunu bozmaz; sadece görünürlüğü ve önceliklendirmeyi sertleştirir.

3.4 GPT-5 Pro için zorunlu giriş okuma sırası

Varsayılan rota:

1. START_HERE.md
2. HEARTBEAT.md
3. MEMORY_SUMMARY.md

Sonra göreve göre dallan:

* Repo nedir / strateji / ürün → PROJECT.md, sonra ROADMAP.md
* Kalıcı ilke / değişmeyen çizgi → context/core/MEMORY.md
* Kalıcı karar → DECISIONS/README.md, sonra ilgili karar dosyası
* Kod görevi → ilgili uygulama README.md, sonra kod
* Operasyon görevi → OPERATIONS.md, sonra deploy/README.md veya bin/README.md
* Bugün ne oldu / günlük akış → memory/README.md, sonra son 1–2 tarihli not
* Danışma geçmişi → context/logs/CONSULTATION_LOG.md

Bu rota, mevcut dağınık giriş önerilerinin yerine tek standart olmalı. Mevcut repo zaten HEARTBEAT ve MEMORY_SUMMARY’yi öne çıkarıyor; önerim bunu tek kapıya dönüştürmek. ￼

⸻

4. Dosya yerleştirme kuralları

Buradaki amaç “hangi bilgi nereye yazılır?” sorusunu sıfır belirsizliğe indirmek.

4.1 Tek satırlık kural seti

* Şu an ne oluyor? → HEARTBEAT.md
* Kolay değişmeyecek gerçek nedir? → context/core/MEMORY.md
* Onun 1 ekranlık özeti nedir? → MEMORY_SUMMARY.md
* Projeyi dışarıdan biri 3 dakikada nasıl anlar? → PROJECT.md
* Önümüzdeki haftalar/aylar ne yönde? → ROADMAP.md
* Kalıcı karar nerede? → DECISIONS/
* Günlük not / bugün olanlar nerede? → memory/YYYY-MM-DD*.md
* Teklif/paket bilgisi nerede? → context/business/OFFERS.md
* Hedef segment bilgisi nerede? → context/business/SEGMENTS.md
* Operasyonel servis/path/port bilgisi nerede? → OPERATIONS.md
* Tool/stack/politika nerede? → context/core/TOOLS.md
* Tekrarlayan süreç nerede? → PLAYBOOKS/
* Kısa icra listesi nerede? → CHECKLISTS/
* Ham kaynak / transcript nerede? → REFERENCES/ veya ARCHIVE/

4.2 Kısa ömürlü / kalıcı / karar / referans / arşiv ayrımı

* Kısa ömürlü durum
 Bugünün odağı, aktif blokaj, sıradaki birkaç adım: HEARTBEAT.md
* Günlük kısa ömürlü kayıt
 Tarihli not, çalışma günlüğü, o günün gözlemi: memory/YYYY-MM-DD*.md
* Kalıcı bilgi
 İş modeli çizgisi, teknik ilke, korunacak karar hattı: context/core/MEMORY.md
* Kalıcı karar
 “Bunu neden böyle yapıyoruz?” sorusunun resmi cevabı: DECISIONS/YYYY-MM-DD-slug.md
* Referans
 Ham kaynak, dış metin, transcript, tasarım kaynağı: REFERENCES/
* Arşiv
 Artık aktif referans olmayan ama saklanacak dosya: ARCHIVE/

4.3 Source of truth kuralları

* HEARTBEAT.md ana kaynaktır; HEARTBEAT.json ondan türetilir.
* context/core/MEMORY.md ana kalıcı hafızadır; MEMORY_SUMMARY.md onun kısa özetidir.
* PROJECT.md “bu proje nedir” der; todo ve günlük durum içermez.
* ROADMAP.md “sıraya nasıl koyuyoruz” der; bugünkü durum içermez.
* DECISIONS/ “neden böyle yaptık” der; uygulanabilir günlük not içermez.
* memory/ günlük kayıt taşır; kalıcı ilke taşımaz.

Bu ayrımı bugün repo zaten ima ediyor, ama sert tanımlamıyor; önerim bunu resmi kurala çevirmek. ￼

⸻

5. Taşıma / yeniden adlandırma önerileri

5.1 Kökte kalacaklar

Bunları yerinde bırak:

* README.md
* HEARTBEAT.md
* HEARTBEAT.json
* MEMORY_SUMMARY.md
* PROJECT.md
* ROADMAP.md
* AGENTS.md
* OPERATIONS.md

5.2 context/ altına taşınacaklar

* MEMORY.md → context/core/MEMORY.md
* TOOLS.md → context/core/TOOLS.md
* TOOLS.yaml → context/core/TOOLS.yaml
* OFFERS.md → context/business/OFFERS.md
* SEGMENTS.md → context/business/SEGMENTS.md
* AUDIT_SCORECARD.json → context/business/AUDIT_SCORECARD.json
* USER.md → context/agent/USER.md
* IDENTITY.md → context/agent/IDENTITY.md
* SOUL.md → context/agent/SOUL.md
* CONSULTATION_LOG.md → context/logs/CONSULTATION_LOG.md
* NOTES.md → context/logs/NOTES.md
* DEGISIKLIK_OZETI.md → context/logs/DEGISIKLIK_OZETI.md
* BOOTSTRAP.md → context/logs/BOOTSTRAP.md

5.3 Yeniden adlandırmama önerisi

Ben admin-site/ ve openclaw-control-ui/ klasörlerini şimdi yeniden adlandırmanı önermem. Sebep: canlı path ve servis referansları OPERATIONS.md içinde mevcut; openclaw-control-ui zaten çalışan Next.js uygulaması gibi duruyor. Burada isim değiştirmekten çok, doğru README ile yolu netleştirmek daha düşük riskli. ￼

5.4 README’de düzeltilmesi gerekenler

README.md içindeki website/, agent-workspace/, state/ anlatımı güncellenmeli; gerçek repo ağacı admin-site/ ve openclaw-control-ui/ üzerinden anlatılmalı. Bu tek değişiklik bile GPT-5 Pro’nun ilk zihinsel modelini ciddi biçimde iyileştirir. ￼

⸻

6. Yeni oluşturulacak dosyalar

6.1 Zorunlu dosyalar

START_HERE.md
Bu repo için en kritik yeni dosya bu. İçeriği en fazla 1 ekran olmalı ve şu başlıkları taşımalı:

* Bu repo ne?
* 3 dakikalık giriş rotası
* Göreve göre nereye gidilir?
* Yazma kuralları
* Single source of truth haritası

Önerilen iskelet:

# START_HERE
Bu repo hem ürün kodu hem yaşayan bağlam workspace'idir.
## Zorunlu ilk okuma
1. HEARTBEAT.md
2. MEMORY_SUMMARY.md
## Göreve göre rota
- repo/proje mantığı -> PROJECT.md
- orta vadeli yön -> ROADMAP.md
- kalıcı hafıza -> context/core/MEMORY.md
- kararlar -> DECISIONS/README.md
- günlük notlar -> memory/README.md
- operasyon -> OPERATIONS.md
- ürün kodu -> openclaw-control-ui/README.md
- statik site -> admin-site/README.md
## Yazma kuralı
- aktif durum -> HEARTBEAT.md
- günlük not -> memory/YYYY-MM-DD.md
- kalıcı karar -> DECISIONS/
- kalıcı gerçek -> context/core/MEMORY.md

context/README.md
context/ altındaki alt alanların ne tuttuğunu anlatmalı.

6.2 Her önemli klasör için README/INDEX

Oluştur:

* DECISIONS/README.md
* memory/README.md
* CHECKLISTS/README.md
* PLAYBOOKS/README.md
* REFERENCES/README.md
* ARCHIVE/README.md
* AGENTS/README.md
* skills/README.md
* deploy/README.md
* bin/README.md
* openclaw-control-ui/README.md
* admin-site/README.md

6.3 Klasör bazlı README içeriği nasıl olmalı

Her klasör README’si en fazla şu 5 şeyi yazmalı:

* Bu klasör ne tutar?
* Önce hangi dosya okunur?
* Buraya ne yazılmaz?
* Dosya isimlendirme kuralı
* İlgili komşu klasörler

Örnek:

DECISIONS/README.md

* Burada yalnızca kalıcı karar kayıtları tutulur.
* Format: YYYY-MM-DD-kisa-slug.md
* Todo yazılmaz.
* Günlük not yazılmaz.
* Karar sonucu ilgili kaynak dosyalara işlenir.

memory/README.md

* Günlük / tarihli notlar burada tutulur.
* Format: YYYY-MM-DD.md veya YYYY-MM-DD-kisa-baslik.md
* Kalıcı ilke buraya yazılmaz.
* Bir bilgi 7 gün sonra da önemliyse MEMORY veya DECISIONS’a terfi ettirilir.

openclaw-control-ui/README.md

* Bu uygulama nedir?
* Ana modüller: Project OS, Context Center, Consultation Center, Hesap Merkezi
* Çalıştırma komutları
* Veri modeli nerede?
* Operasyon bilgisi için OPERATIONS.md

⸻

7. Uygulama planı

Aşama 1 — Yolu düzelt, dosya taşıma yapma

Önce sadece şunları yap:

1. START_HERE.md oluştur.
2. README.md’yi gerçek repo ağacına göre güncelle.
3. openclaw-control-ui/README.md ve admin-site/README.md ekle.
4. DECISIONS/README.md, memory/README.md, CHECKLISTS/README.md, PLAYBOOKS/README.md ekle.

Bu aşama en yüksek getiriyi en düşük riskle verir.

Aşama 2 — Kökü sadeleştir

Sonra bağlam dosyalarını context/ altına taşı:

1. context/ oluştur.
2. core/, business/, agent/, logs/ alt klasörlerini aç.
3. Yukarıda saydığım dosyaları taşı.
4. Eski kök path’lerde kısa yönlendirme stub’ları bırakma; doğrudan temizle. Kök sade olmalı.

Aşama 3 — Source of truth kurallarını yazılı hale getir

Bunları START_HERE.md ve context/README.md içine açıkça ekle:

* HEARTBEAT.md ana canlı durum
* HEARTBEAT.json türev
* MEMORY.md ana kalıcı hafıza
* MEMORY_SUMMARY.md kısa özet
* DECISIONS/ resmi karar kaydı
* memory/ günlük not

Aşama 4 — Çakışan içerikleri temizle

Özellikle şu alanlarda tekrar azalt:

* PROJECT.md ↔ MEMORY.md
* PROJECT.md ↔ OFFERS.md
* MEMORY.md ↔ SEGMENTS.md
* AGENTS.md ↔ USER.md ↔ IDENTITY.md ↔ SOUL.md

Burada hedef silmek değil, rol sınırı koymak.

Aşama 5 — Güncelleme ritmini standardize et

Basit kural:

* Her çalışma döngüsünde en fazla 1 ana durum dosyası güncellenir.
* Günlük gelişme varsa memory/YYYY-MM-DD*.md
* Kalıcı karar çıktıysa DECISIONS/
* Kalıcı çizgi değiştiyse context/core/MEMORY.md ve ardından MEMORY_SUMMARY.md
* Haftalık/aktif odak değiştiyse HEARTBEAT.md
* Operasyonel path/servis değiştiyse OPERATIONS.md

⸻

Son hüküm

Bu repo için en doğru hamle, yeni bir mimari icat etmek değil; kökü “giriş katmanı”, context/i “derin bağlam katmanı” haline getirmek.

En kritik üç değişiklik:

1. START_HERE.md ekle
2. README.md’yi gerçek ağaçla hizala
3. Kökteki ikinci seviye bağlam dosyalarını context/ altına indir

Bunlar yapıldığında GPT-5 Pro, gerçekten şu düzeni yaşayabilir:

hafızasız gir → 3 dosya oku → doğru klasöre sap → doğru kaynağa güven → doğru dosyaya yaz.

İstersen bunun devamında sana doğrudan uygulanabilir bir örnek START_HERE.md + güncellenmiş kök README.md taslağı da yazayım.“
assistant: Kısa cevap, **tamamı değil ama bir kısmı beni bozabilir**.

En net ayrım şu:

## Beni bozmaz, hatta iyi olur
Bunlar güvenli ve faydalı:
- `START_HERE.md` eklemek
- kök `README.md`yi giriş rotası olarak sertleştirmek
- `DECISIONS/README.md`, `memory/README.md`, `CHECKLISTS/README.md`, `PLAYBOOKS/README.md` gibi klasör README’leri eklemek
- source-of-truth kurallarını yazılı hale getirmek
- “önce ne okunur, ne nereye yazılır” kısmını çok netleştirmek

Bunlar bence doğru yön.

## Beni bozabilecek kısım
Şu bölüm riskli:
- `MEMORY.md`
- `TOOLS.md`
- `SOUL.md`
- `USER.md`
- `IDENTITY.md`
- hatta kısmen `AGENTS.md`

bunları kökten `context/` altına taşımak.

Sebep:
- şu an OpenClaw bu workspace’te bazı dosyaları kökte bekliyor
- özellikle `HEARTBEAT.md` için zaten exact root path kuralı var
- `AGENTS.md` ve `SOUL.md` de mevcut davranış/ton/bootstrap akışında özel rol oynuyor
- yani “GPT-5 Pro için temiz repo” açısından mantıklı olan şey, “şu anki canlı OpenClaw ajanı” açısından bire bir güvenli olmayabilir

## En doğru yol
Ben olsam bunu iki katmanda yaparım:

### Aşama 1, hemen yapalım
- `START_HERE.md`
- kök `README.md` düzeltme
- klasör bazlı `README.md` dosyaları
- source-of-truth kuralları
- okuma sırası standardı

Bu kısım beni bozmaz.

### Aşama 2, dikkatli yapalım
`context/` altına taşıma işini ancak şu şekilde yapalım:
- ya kökte uyumlu stub/redirect bırakalım
- ya da OpenClaw’ın gerçekten bu yeni path’lerle sorunsuz çalışacağını önce test edelim

Yani:
- **insan/GPT Pro için çok mantıklı**
- **canlı ajan bootstrap’i için doğrudan taşıma riskli**

## Bir ek düzeltme
Senin metindeki şu nokta artık eski kaldı:
- repo artık `admin-site/` + `openclaw-control-ui/` değil
- şu an gerçek yapı `website/` + `agent-workspace/` olarak duruyor ve canlı doğrulama geçti. Source: memory/2026-04-20.md#L56-L59

Benim önerim:
- senin planın **evet doğru**
- ama **Aşama 1’i aynen uygula**
- **Aşama 2’de kök kritik dosyaları taşımayalım**, en azından şimdilik

İstersen ben bunu şimdi güvenli versiyona çevireyim:
1. senin planı baz alayım  
2. “bozmayacak sürüm” olarak revize edeyim  
3. sonra doğrudan uygulayayım.
user: Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.
When reading HEARTBEAT.md, use workspace file /root/.openclaw/workspace/HEARTBEAT.md (exact case). Do not read docs/heartbeat.md.
Current time: Monday, April 20th, 2026 - 9:22 PM (UTC) / 2026-04-20 21:22 UTC
user: Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.
When reading HEARTBEAT.md, use workspace file /root/.openclaw/workspace/HEARTBEAT.md (exact case). Do not read docs/heartbeat.md.
Current time: Monday, April 20th, 2026 - 9:22 PM (UTC) / 2026-04-20 21:22 UTC
user: Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.
When reading HEARTBEAT.md, use workspace file /root/.openclaw/workspace/HEARTBEAT.md (exact case). Do not read docs/heartbeat.md.
Current time: Monday, April 20th, 2026 - 9:22 PM (UTC) / 2026-04-20 21:22 UTC
assistant: HEARTBEAT_OK
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Mon 2026-04-20 21:23 UTC] Bunları yapmak senin çalışmanı da kolaylaştırır mı
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Mon 2026-04-20 21:23 UTC] Bunları yapmak senin çalışmanı da kolaylaştırır mı
user: Sender (untrusted metadata):
```json
{
  "label": "openclaw-control-ui",
  "id": "openclaw-control-ui"
}
```

[Mon 2026-04-20 21:23 UTC] Bunları yapmak senin çalışmanı da kolaylaştırır mı
assistant: Evet, **doğru sürümü yapılırsa baya kolaylaştırır**.

En çok şu kısım işimi kolaylaştırır:
- `START_HERE.md`
- net giriş rotası
- klasör README’leri
- source-of-truth kuralları
- hangi bilgi nereye yazılır netliği

Bunlar şunları azaltır:
- yanlış dosyaya bakma
- aynı bilgiyi farklı yerde arama
- gereksiz tekrar
- yeni oturumda yön bulma maliyeti

Ama kritik ayrım şu:

## Kolaylaştıran kısım
Bunlar iyi:
- kökü yönlendirme katmanı yapmak
- derin bağlamı gruplamak
- README/INDEX eklemek
- yazma kurallarını sertleştirmek

## Zorlaştırabilecek kısım
Bunlar dikkat ister:
- OpenClaw’ın özel beklediği kök dosyaları taşımak
- çalışan uygulama klasörlerini tekrar yeniden adlandırmak
- canlı path’leri bir daha oynatmak

Yani benim için ideal cevap şu:
- **evet, yapı temizliği işimi kolaylaştırır**
- ama **“güvenli bilgi mimarisi temizliği” şeklinde**
- **“canlı bootstrap/path kırabilecek agresif taşıma” şeklinde değil**

En doğru formül:
1. önce yönlendirme katmanını güçlendir
2. sonra klasör README’lerini ekle
3. sonra gerçekten güvenli olan bağlam dosyalarını grupla
4. kökte özel anlamı olan dosyalara dokunma

İstersen ben bunu sana iki sütunlu net listeye çevireyim:
- **bana iyi gelen değişiklikler**
- **dokunmamak gerekenler**
user: Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.
When reading HEARTBEAT.md, use workspace file /root/.openclaw/workspace/HEARTBEAT.md (exact case). Do not read docs/heartbeat.md.
Current time: Monday, April 20th, 2026 - 9:23 PM (UTC) / 2026-04-20 21:23 UTC
user: Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.
When reading HEARTBEAT.md, use workspace file /root/.openclaw/workspace/HEARTBEAT.md (exact case). Do not read docs/heartbeat.md.
Current time: Monday, April 20th, 2026 - 9:23 PM (UTC) / 2026-04-20 21:23 UTC
user: Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.
When reading HEARTBEAT.md, use workspace file /root/.openclaw/workspace/HEARTBEAT.md (exact case). Do not read docs/heartbeat.md.
Current time: Monday, April 20th, 2026 - 9:23 PM (UTC) / 2026-04-20 21:23 UTC
assistant: HEARTBEAT_OK
