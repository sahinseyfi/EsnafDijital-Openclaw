# Context Selection Matrix

Bu dosya, gorev tipine gore hangi baglamin prompta girecegini hizli secmek icin kullanilir.

## Kullanim
1. Gorev tipini sec
2. Zorunlu cekirdek ozeti ekle
3. Gerekli ikincil kaynaklari ekle
4. Ham dosya gerekip gerekmedigine karar ver
5. Karari etkilemeyen tekrarları prompta tasima

## Varsayilan cekirdek ozet
Her gorevde asagidaki cizgiler kisa ozet olarak bulunsun:
- calisma bicimi
- ton ve tavir
- kullanici tercihleri
- ortak rol
- teknik sinirlar
- kalici yon
- aktif odak

## Gorev tipine gore secim

### 1) Dosya degerlendirme veya baglam audit
- Ek baglam:
  - `README.md`
  - `PROJECT.md`
  - ilgili `DECISIONS/` kayitlari
  - gerekiyorsa ilgili `memory/` notlari
- Ham oku:
  - evet, degerlendirilen dosyalarin kendisi
  - dis GPT oturumunda erisim mumkunse once klonlanan repo icindeki ilgili dosyalar
  - clone mumkun degilse erisilebilen repo dosyalari veya archive icerigi
- Cikti kur:
  - once `keep | trim | rewrite` karari ver
  - `why` veya esit bir gerekce alani ekle
  - `finalContent` sadece `trim` veya `rewrite` ise iste
- Prompta tasima:
  - ilgisiz deploy detaylari
  - gorevi etkilemeyen eski gunluk notlar
  - tum dosyalari otomatik yeniden yazdiran dil

### 2) Skill iyilestirme veya prompt kalitesi
- Ek baglam:
  - ilgili `SKILL.md`
  - ilgili `references/`
  - gerekiyorsa prompting referansi
- Ham oku:
  - evet, skill ve ilgili reference dosyalari
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
  - gerekirse, degisecek dosyalar ve ilgili rehber
- Prompta tasima:
  - ilgisiz karar loglari
  - gorevle alakasiz tarihsel notlar

### 4) Bugfix, deploy veya incident
- Ek baglam:
  - `OPERATIONS.md`
  - ilgili `memory/` notlari
  - ilgili deploy veya verify scriptleri
- Ham oku:
  - evet, hata kaynagi olan dosyalar ve scriptler
- Prompta tasima:
  - stratejik ama gorevsiz belgeler
  - bugla ilgisiz plan notlari

### 5) Teklif, audit veya teslimat akisi
- Ek baglam:
  - `OFFERS.md`
  - `SEGMENTS.md`
  - `PLAYBOOKS/audit-offer-delivery.md`
- Ham oku:
  - gerekirse, teklif veya akisi dogrudan etkileyen belge
- Prompta tasima:
  - gereksiz teknik altyapi detaylari

### 6) Consultation Center prompt uretimi veya revizyonu
- Ek baglam:
  - consultation kaydi
  - ilgili skill reference dosyalari
  - gerekiyorsa `README.md` veya `PROJECT.md`
- Ham oku:
  - evet, promptu belirleyen consultation kaydi ve ilgili skill referanslari
  - sadece gerekiyorsa ek proje dosyalari
  - dis GPT oturumunda repo analizi zorunluysa erisim mumkunse once klonlanan repo icindeki ilgili dosyalar
  - clone mumkun degilse ilgili repo dosyalari, linkler veya archive icerigi
- Prompta tasima:
  - tum repo geneli
  - ilgisiz memory notlari

## Ham dosya okumayi tetikleyen durumlar
- dosyanin kendisi duzenlenecekse
- exact wording onemliyse
- iki belge arasinda cakisma aranacaksa
- ozet dusuk guven veriyorsa
- kullanici dosyanin kendisini incelemeyi istediyse

## Ham dosya okumayi gereksiz yapan durumlar
- sadece davranis cizgisi gerekiyorsa
- ayni bilgi cekirdek ozette zaten varsa
- gorevi etkilemeyen tarihsel ayrintiysa
- belge sadece arka plan seviyesi deger tasiyorsa

## Anti-patternler
- her gorevde tum dosyalari ham vermek
- HEARTBEAT ve MEMORY icerigini tekrarli tasimak
- gorevle ilgisiz belge eklemek
- sadece token harcayip karar kalitesini artirmayan baglam basmak
- aktif odak ile kalici yonu ayni katmanda anlatmak

## Not
Bu matris zorunlu sabit tablo degil, varsayilan secim rehberidir.
Gorev ozelinde daha iyi baglam gerekiyorsa rehberi asabilir, ama bunu gereksiz sisirme icin kullanma.
