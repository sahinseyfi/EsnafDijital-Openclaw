# Context Injection Policy

Bu dosya, Prompt Uretimi sirasinda hangi baglamin secilecegini belirler. Amac daha cok baglam degil, dogru baglamdir.

## Varsayilan akis

1. Ham notu parcala ve `primaryTask` sec.
2. Kisa cekirdek ozet kur.
3. Gorev tipine gore ikincil kaynak sec.
4. Sadece gerekirse ham dosya oku.
5. Prompta sadece karari etkileyen baglami tasi.
6. `secondaryTasks` ve `parkedQuestions` icin ek baglam toplamaya girme.

## Cekirdek ozet

Cekirdek ozet, ham dosya dump'i degil 3-8 kisa madde olmalidir.

Varsayilan olarak sadece gorevi etkileyen cizgileri sec:
- calisma bicimi
- kullanici tercihleri
- kalici proje yonu
- aktif hedef
- teknik/guvenlik sinirlari
- hizmet ve CRM ayrimi

Kaynaklar:
- `AGENTS.md` ve `SOUL.md`: calisma bicimi ve ton
- `USER.md`: kullanici tercihleri
- `MEMORY.md`: kalici karar cizgisi
- `HEARTBEAT.md`: aktif durum
- `TOOLS.md`: teknik ve guvenlik sinirlari
- `IDENTITY.md`: rol ayrimi gerekiyorsa

Bu dosyalarin tam metni prompta otomatik tasinmaz.

## Gorev tipine gore baglam

### 1) Dosya degerlendirme / baglam inceleme

Ek baglam:
- `README.md`
- `PROJECT.md`
- ilgili `DECISIONS/` kayitlari
- gerekiyorsa ilgili `memory/` notlari

Ham oku:
- degerlendirilen dosyalar
- cakisma aranan dosyalar
- dis GPT repo analizi yapacaksa erisebilecegi repo linkleri veya dosya listesi

Prompta tasima:
- dosyalarin tam metni degil, goreve yetecek secili ozet
- exact wording gerekiyorsa ilgili kisa alinti

### 2) Skill iyilestirme / prompt kalitesi

Ek baglam:
- ilgili `SKILL.md`
- ilgili `references/`
- gerekiyorsa entegrasyon dosyasi

Prompta tasima:
- skill'in amaci
- sorunlu kurallar
- beklenen cikti kontrati

Tasinmayacaklar:
- tum memory dump'i
- gorevle ilgisiz repo belgeleri

### 3) Feature implementation

Ek baglam:
- `README.md`
- `PROJECT.md`
- `ROADMAP.md`
- ilgili checklist/playbook

Ham oku:
- degisecek kod dosyalari
- route/component/model veya scriptler

Tasinmayacaklar:
- eski karar loglari
- feature ile ilgisiz strateji notlari

### 4) Bugfix / deploy / incident

Ek baglam:
- `OPERATIONS.md`
- ilgili incident veya gunluk memory notu
- deploy/verify scriptleri

Ham oku:
- hata kaynagi dosyalar
- log veya scriptler

Tasinmayacaklar:
- bugla ilgisiz proje stratejisi

### 5) Teklif / inceleme / teslimat akisi

Ek baglam:
- `OFFERS.md`
- `SEGMENTS.md`
- `PLAYBOOKS/kesif-teklif-teslimat-bakim.md`

Ham oku:
- teklifi veya akisi dogrudan etkileyen belge

Tasinmayacaklar:
- gereksiz teknik altyapi detaylari

## Ham dosya ne zaman okunur?

Oku, eger:
- dosyanin kendisi duzenlenecekse
- exact wording onemliyse
- iki dosya arasinda cakisma analizi yapilacaksa
- karar belirli bir kayda dayaniyorsa
- ozet dusuk guven veriyorsa
- kullanici dosyanin kendisini incelemeyi istediyse
- dis GPT repo analizi yapacaksa ve cikti repo gercegine dayanacaksa

## Ham dosya ne zaman prompta tasinmaz?

Dosya okunmus olsa bile tam metin tasima, eger:
- sadece ana cizgi gerekiyorsa
- bilgi tekrar ediyorsa
- gorevi dogrudan etkilemiyorsa
- ayni bilgi cekirdek ozette varsa
- sadece `secondaryTasks` icin lazimsa

## Prompt icinde baglam sirasi

1. Amac
2. `primaryTask`
3. Karar sorusu veya hedef
4. Kisa cekirdek ozet
5. Goreve ozel secili baglam
6. Acik bosluklar / varsayimlar
7. Gorev
8. Sinirlar
9. Beklenen cikti

## Acik bosluk kurali

Kritik bilgi eksikse uydurma. Prompt, eksigi su sekilde yazdirsin:
- acik bosluk
- varsayim
- dogrulanacak nokta
- blokaj

## Anti-patternler

- her gorevde tum dosyalari ham haliyle prompta basmak
- HEARTBEAT ve MEMORY icerigini tekrarli tasimak
- once `primaryTask` secmeden baglam toplamaya baslamak
- baglami dosya sayisina gore yapay daraltmak
- sadece daha cok baglam daha iyi diye token sisirmek
- aktif faz ile kalici kararlari karistirmak
- dis GPT'ye repo inceletmeden repo hakkinda kesin karar istetmek
