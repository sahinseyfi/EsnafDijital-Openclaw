# Context Injection Policy

Bu dosya, Prompt Üretimi prompt uretiminde hangi baglamin nasil secilecegini belirler.

## Amac
- Gerekli cekirdek proje cizgisini korumak
- Gereksiz dosya dump'i yapmadan daha iyi prompt kurmak
- Ham dosyalari her seferinde yukleyip baglami sisirmemek
- Goreve gore dogru ikincil kaynaklari secmek
- Eksik kritik baglam varsa bunu acik bosluk olarak gostermek
- Geniş notu once parcalayip yalnizca `primaryTask` icin baglam secmek

## Varsayilan akis
1. Once ham notu parcala ve `primaryTask` sec.
2. Sonra cekirdek baglam ozeti kur.
3. Goreve gore gerekli ikincil baglami sec.
4. Sadece gerekirse ham dosya oku.
5. Karari etkilemeyen tekrarları prompta tasima.
6. `secondaryTasks` ve `parkedQuestions` icin gereksiz ek baglam toplamaya girme.

## Her gorevde zorunlu cekirdek ozet
Asagidaki cizgiler kisa operasyon ozeti olarak gorunsun, ama varsayilan olarak ham metinleri prompta girme:
- calisma bicimi
- ton ve tavir
- kullanici tercihleri
- ortak rol
- teknik ve guvenlik sinirlari
- kalici yon
- aktif odak

Bu cizgiler tipik olarak su kaynaklardan gelir:
- `AGENTS.md`
- `SOUL.md`
- `USER.md`
- `IDENTITY.md`
- `TOOLS.md`
- `MEMORY.md`
- `HEARTBEAT.md`

## Cekirdek ozetin bicimi
- en fazla 10-20 kisa madde
- tekrar yok
- sadece gorevi etkileyen cizgi var
- karar vermeye yardim etmeyen tarihsel ayrinti yok

## Gorev tipine gore ikincil baglam

### 1) Dosya degerlendirme veya baglam audit
- Ek baglam:
  - `README.md`
  - `PROJECT.md`
  - ilgili `DECISIONS/` kayitlari
  - gerekiyorsa ilgili `memory/` notlari
- Ham oku:
  - degerlendirilen dosyalarin kendisi
  - dis GPT oturumunda erisilebilen repo dosyalari, linkler veya archive icerigi
- Prompta tasima:
  - ilgisiz deploy detaylari
  - gorevi etkilemeyen eski gunluk notlar
  - tum dosyalari otomatik yeniden yazdiran dil

### 2) Skill iyilestirme veya prompt kalitesi
- Ek baglam:
  - ilgili `SKILL.md`
  - ilgili `references/`
  - gerekiyorsa ilgili uygulama entegrasyon dosyalari
- Ham oku:
  - skill ve ilgili reference dosyalari
- Prompta tasima:
  - tum memory dump'i
  - gorevle ilgisiz repo belgeleri

### 3) Feature implementation
- Ek baglam:
  - `README.md`
  - `PROJECT.md`
  - `ROADMAP.md`
  - ilgili `CHECKLISTS/` veya `PLAYBOOKS/`
- Ham oku:
  - degisecek dosyalar ve ilgili rehber
- Prompta tasima:
  - ilgisiz karar loglari
  - gorevle alakasiz tarihsel notlar

### 4) Bugfix, deploy veya incident
- Ek baglam:
  - `OPERATIONS.md`
  - ilgili `memory/` notlari
  - ilgili deploy veya verify scriptleri
- Ham oku:
  - hata kaynagi olan dosyalar ve scriptler
- Prompta tasima:
  - stratejik ama gorevsiz belgeler
  - bugla ilgisiz plan notlari

### 5) Teklif, audit veya teslimat akisi
- Ek baglam:
  - `OFFERS.md`
  - `SEGMENTS.md`
  - `PLAYBOOKS/audit-offer-delivery.md`
- Ham oku:
  - teklifi veya akisi dogrudan etkileyen belge
- Prompta tasima:
  - gereksiz teknik altyapi detaylari

### 6) Prompt Üretimi prompt uretimi veya revizyonu
- Ek baglam:
  - consultation kaydi
  - ilgili skill reference dosyalari
  - gerekiyorsa `README.md` veya `PROJECT.md`
  - runtime veya davranis gercegi gerekiyorsa uygun uygulama dosyalari
- Ham oku:
  - promptu belirleyen consultation kaydi ve ilgili skill referanslari
  - sadece gerekiyorsa ek proje dosyalari
  - dis GPT oturumunda repo analizi zorunluysa ilgili repo dosyalari, linkler veya archive icerigi
- Prompta tasima:
  - tum repo geneli
  - ilgisiz memory notlari
  - `secondaryTasks` veya `parkedQuestions` icin gereken ama `primaryTask` icin kritik olmayan dosyalar

## Ham dosya ne zaman okunur
- dosyanin kendisi duzenlenecekse
- exact wording onemliyse
- iki dosya arasinda cakisma analizi yapilacaksa
- karar belirli bir kayda veya belgeye dayanacaksa
- ozet dusuk guven veriyorsa
- kullanici dosyanin kendisini incelemeyi istediyse
- dis GPT oturumunda repo analizi yapiliyorsa ve cikti repo gercegine dayanacaksa

## Ham dosya ne zaman prompta tasinmaz
Dosya okunmus olsa bile tam metin prompta tasinmaz, eger:
- sadece ana cizgi gerekiyorsa
- bilgi tekrari uretiyorsa
- gorevi dogrudan etkilemiyorsa
- ayni bilgi cekirdek ozette zaten varsa
- yalnizca `secondaryTasks` veya `parkedQuestions` icin lazimsa

## Prompt icine baglam nasil yerlestirilir
Tercih edilen sira:
1. amac
2. `primaryTask`
3. karar sorusu veya hedef
4. cekirdek baglam ozeti
5. goreve ozel secili ikincil baglam
6. acik bosluklar veya varsayimlar
7. gorev
8. sinirlar
9. beklenen cikti

## Acik bosluk kurali
Kritik bilgi eksikse uydurma.

Onun yerine su sekilde isaretle:
- acik bosluk
- varsayim
- dogrulanmasi gereken nokta

## Anti-patternler
- her gorevde tum dosyalari ham haliyle prompta basmak
- HEARTBEAT ve MEMORY icerigini tekrarli sekilde tasimak
- gorevle ilgisiz checklist veya playbook eklemek
- sadece daha cok baglam daha iyi diye token sisirmek
- exact kaynak gerekmeyen durumda tum belgeyi yuklemek
- aktif faz ile kalici kararlari birbirine karistirmak
- baglami dosya sayisina gore yapay olarak daraltmak
- once `primaryTask` secmeden baglam toplamaya baslamak

## Prompt Üretimi icin ozel not
- once ham notu parcala
- sonra `primaryTask` icin cekirdek baglam ozeti kur
- sonra consultation kaydinin ihtiyacina gore ikincil baglam sec
- prompta sadece karari etkileyen baglam tasinmali
- eger hedef dis GPT oturumuysa ve gorev repo analizi gerektiriyorsa, final promptun dis GPT'yi ilgili repo icerigini incelemeye yonlendirmesi zorunlu varsay
- bu da mumkun degilse final prompt bunu acik bosluk veya blokaj olarak yazdirsin

## Hazir sayma kosulu
Baglam paketi ancak su durumda hazir sayilir:
- `primaryTask` net secildiyse
- cekirdek proje cizgisi gorunuyorsa
- aktif faz ile kalici yon karismiyorsa
- goreve uygun ikincil kaynaklar secildiyse
- karari etkilemeyen tekrar prompta tasinmadiysa
- eksik kritik bilgi saklanmadiysa
