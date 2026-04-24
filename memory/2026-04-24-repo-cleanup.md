# 2026-04-24 - Repo cleanup kickoff

## Amaç
Repo genel temizligine girmeden once source-of-truth cizgisini ve yonlendirme zinciri denetim kuralini netlestirip, tum dosyalari kontrollu batch'lerle inceleyebilecek temiz bir audit zemini kurmak.

## Bu calismada ne yapilacak?
1. Kanonik konteynerleri kabul et, ama iceriklerini otomatik temiz sayma.
2. Her ana dosyayi, yonlendirdigi dosyalarla birlikte zincir halinde denetle.
3. Her dosya icin su testleri uygula:
   - rol uyumu
   - guncellik
   - tekrar
   - drift
   - yogunluk
4. Supheli / eski / silinebilir adaylari ayri listele.
5. Silme kararini dogrudan verme, once aday listesi ve referans kontrolu cikar.

## Kanonik konteynerler
- `README.md`
- `HEARTBEAT.md`
- `MEMORY.md`
- `PROJECT.md`
- `ROADMAP.md`
- `DECISIONS/`
- `memory/`
- `state/`

Not: Konteynerin dogru olmasi, icerigin temiz ve guncel oldugu anlamina gelmez.

## Ilk batch
1. `README.md`
2. `HEARTBEAT.md`
3. `MEMORY.md`
4. `PROJECT.md`
5. `ROADMAP.md`
6. `MEMORY_SUMMARY.md`

Bu batch'te sadece dosya ici degil, isaret edilen hedefler de okunacak.

## Beklenen cikti formati
Her dosya icin su alanlar cikarilacak:
- rol
- yonlendirdigi hedefler
- ic sorunlar
- hedeflerle uyum sorunu
- tasinacak / duzeltilecek / silme adayi notu

## Acik notlar
- `MEMORY_SUMMARY.md` su an supheli dosya olarak ele alinacak.
- `state/` gecici calisma alani; kalici karar kaynagi degil.
- Cleanup sirasinda yeni buyuk feature acilmamasi tercih edilecek.

## Batch 1 sonucu - kok ana baglam dosyalari ve yonlendirme zinciri

### Denetlenen ana dosyalar
- `README.md`
- `HEARTBEAT.md`
- `MEMORY.md`
- `PROJECT.md`
- `ROADMAP.md`
- `MEMORY_SUMMARY.md`

### Okunan yonlendirme hedefleri
- `DECISIONS/README.md`
- `memory/README.md`
- `CHECKLISTS/README.md`
- `PLAYBOOKS/README.md`
- `REFERENCES/README.md`
- `skills/README.md`
- `agent-workspace/README.md`
- `website/README.md`
- `deploy/README.md`
- `bin/README.md`
- `ARCHIVE/README.md`
- `TOOLS.md`
- `OPERATIONS.md`
- `DECISIONS/2026-04-19-brand-design-system.md`
- `state/repo-cleanup-source-of-truth.md`

### 1) README.md
- rol: repo giris kapisi ve okuma rotasi
- yonlendirdigi hedefler: kok ana baglam dosyalari + klasor `README` zinciri + `TOOLS.md` / `OPERATIONS.md`
- ic sorunlar:
  - `state/` repo yapisinda ve kanonik konteyner listesinde var, ama `state/README.md` yok; yonlendirme zincirinde bosluk olusturuyor
- hedeflerle uyum sorunu:
  - isaret ettigi hedeflerin buyuk kismi mevcut ve kendi rollerini net anlatıyor
  - `memory/README.md` naming kurali ile gercek `memory/` dosya adlari arasinda drift oldugu icin README'nin bu yone sevki teoride dogru, pratikte kirli
- not:
  - `README.md` korunacak
  - `state/` icin ayri giris notu veya `README` gerekli

### 2) HEARTBEAT.md
- rol: aktif durum panosu
- yonlendirdigi hedefler: `memory/2026-04-24-repo-cleanup.md` ve ilk batch kok dosyalari
- ic sorunlar:
  - ana hedef ve somut adim temiz, ama `Mevcut Blokajlar` listesi repo cleanup disi maddelerle karisik
  - `Gecici Operasyon Kurali` satiri standing policy gibi duruyor; aktif panoda uzun sure kalirsa heartbeat yogunlugunu bozuyor
- hedeflerle uyum sorunu:
  - repo-cleanup notuyla hedef ve batch sirasi uyumlu
  - ancak aktif panonun temizligi kendi amacina gore tam degil
- not:
  - batch sonrasi heartbeat sadece aktif cleanup blokajlarini tasimali
  - deploy cizgisi kalici olacaksa `OPERATIONS.md` veya karar kaydina tasinma adayi

### 3) MEMORY.md
- rol: kalici gercekler ve korunacak karar cizgisi
- yonlendirdigi hedefler: `DECISIONS/2026-04-19-brand-design-system.md`, `REFERENCES/design-system/`, `TOOLS.md`, `HEARTBEAT.md`, `memory/YYYY-MM-DD.md`
- ic sorunlar:
  - `baglam / dokuman merkezi` dili eski `baglam merkezi` okumasini tetikleyebilir, yeni source-of-truth cizgisine gore netlestirme adayi
  - domain / DNS gibi sabit gercekler ile `OPERATIONS.md` arasinda kismi tekrar riski var
- hedeflerle uyum sorunu:
  - tasarim sistemi karari ve referanslari mevcut, linkler dogru
  - genel proje omurgasi `PROJECT.md` ve `ROADMAP.md` ile uyumlu
- not:
  - silme adayi yok
  - sadece kalici gercek vs operasyon detayi siniri sertlestirilecek

### 4) PROJECT.md
- rol: proje tanimi, kapsam ve MVP siniri
- yonlendirdigi hedefler: acik dosya linki vermiyor; dolayli olarak `HEARTBEAT.md`, `ROADMAP.md`, `MEMORY.md`, ajan/kullanici/arac baglami ile calisiyor
- ic sorunlar:
  - kritik bir ic sorun gorulmedi
- hedeflerle uyum sorunu:
  - `MEMORY.md` ve `ROADMAP.md` ile ana omurga uyumlu
  - `baglam dosyalari` dili, context-center sonrasi cizgiyle uyumlu
- not:
  - korunacak
  - sonraki teknik audit'te uygulama/nav gercegiyle ayri capraz kontrol yapilabilir

### 5) ROADMAP.md
- rol: orta vadeli yon, siralama ve ertelenenler
- yonlendirdigi hedefler: acik dosya linki yok; `PROJECT.md` ve `HEARTBEAT.md` ile birlikte okunuyor
- ic sorunlar:
  - `Project OS ile Prompt Uretimi / Context el sikismasi` ifadesinde eski `Context` adlandirma izi var
  - `0-30 Gun / Done` altindaki `ilk tanitim sitesi yayinda` satiri, heartbeat'teki `ana domain placeholder modunda` notuyla gerilimli
- hedeflerle uyum sorunu:
  - faz ve oncelik cizgisi genel olarak uyumlu
  - ama adlandirma ve site durumu dilinde cleanup ihtiyaci var
- not:
  - wording cleanup adayi
  - silme adayi yok

### 6) MEMORY_SUMMARY.md
- rol: 1 dakikalik turetilmis ozet
- yonlendirdigi hedefler: `TOOLS.md`
- ic sorunlar:
  - supheli dosya notu dogrulandi
  - `baglam merkezi` dili guncel cizgiye gore driftli
  - turetilmis ozet oldugu halde bagimsiz karar merkezi gibi okunma riski tasiyor
- hedeflerle uyum sorunu:
  - genel proje omurgasi `MEMORY.md` ile uyumlu
  - ama adlandirma ve ic sistem tanimi yeni cleanup/source-of-truth cizgisine gore duzeltilmeli
- not:
  - silme degil, sadelestirme / yeniden turetme adayi

## Yonlendirme hedeflerinden cikan net bulgular

### memory/README.md -> gercek dosya adlari uyumsuz
- kural: konu notlari `YYYY-MM-DD-topic-slug.md`, incident notlari `YYYY-MM-DD-incident-slug.md`, consultation notlari `YYYY-MM-DD-consultation-slug.md`
- bulgu: mevcut `memory/` altinda bu kurala uymayan 25 dosya var
- ornekler:
  - `2026-04-19-github-sync.md`
  - `2026-04-20-page-error.md`
  - `2026-04-22-context-cleanup.md`
  - `2026-04-23-dark-mode.md`
  - `2026-04-24-repo-cleanup.md`
- sonuc: bu klasor README'si kanonik ama gercek dosya adlariyla tam uyumlu degil; batch-2'de rename/alias/planned exception karari gerekiyor

### DECISIONS/README.md -> karar dosyalari uyumlu
- naming kuraliyla uyumsuz karar dosyasi bulunmadi
- `DECISIONS/2026-04-19-brand-design-system.md` mevcut ve `MEMORY.md` icindeki referansla uyumlu

### Klasor README zinciri -> buyuk resim saglam, `state/` boslugu var
- `agent-workspace/README.md`, `website/README.md`, `deploy/README.md`, `bin/README.md`, `CHECKLISTS/README.md`, `PLAYBOOKS/README.md`, `REFERENCES/README.md`, `skills/README.md`, `ARCHIVE/README.md` hedefleri mevcut ve temel rol uyumu sagliyor
- en net navigasyon boslugu: `state/` kok README'de kanonik konteyner olarak geciyor ama kendi giris README'si yok

## Batch 1 supheli / duzeltme adayi listesi
1. `MEMORY_SUMMARY.md` -> driftli dil, turetilmis ozet rolunu sertlestirme ihtiyaci
2. `ROADMAP.md` -> `Context` adlandirma izi ve site durumu ifadesi cleanup adayi
3. `HEARTBEAT.md` -> cleanup disi blokaj satirlari ve kaliciya donusen gecici kural yogunlugu
4. `memory/` dosya adlari -> 25 adet naming drift adayi
5. `state/` -> `README` eksigi nedeniyle yonlendirme zincirinde bosluk

## Batch 1 sonucu
- kok ana baglam dosyalarinin konteyner cizgisi buyuk olcude dogru
- ana sorun konteyner seciminden cok icerik drifti, naming drifti ve yonlendirme bosluklari
- sonraki batch, dosya silmeden once naming/wording/scope duzeltmelerini planlamali

## Batch 1b - ajan ve persona dosyalari

### Denetlenen dosyalar
- `AGENTS.md`
- `USER.md`
- `IDENTITY.md`
- `SOUL.md`

### 7) AGENTS.md
- rol: ajanin calisma kontrati ve root dosya disiplini
- yonlendirdigi hedefler: `README.md`, `HEARTBEAT.md`, `MEMORY_SUMMARY.md`, `PROJECT.md`, `ROADMAP.md`, `agent-workspace/README.md`, `memory/README.md`, `DECISIONS/README.md`, `TOOLS.md`, `OPERATIONS.md`, `CHECKLISTS/admin-panel-mvp.md`, `CHECKLISTS/task-completion.md`, `CHECKLISTS/context-hygiene.md`, `PLAYBOOKS/audit-offer-delivery.md`
- ic sorunlar:
  - `memory/YYYY-MM-DD-topic.md` naming ornegi, `memory/README.md` icindeki daha spesifik `topic/incident/consultation` slug kuralindan daha gevsek kaliyor
  - acilis sirasinda `MEMORY_SUMMARY.md` sert sekilde one cikariliyor; bu dosya su an drift suphelisi oldugu icin yanlis agirlik olusturabilir
- hedeflerle uyum sorunu:
  - referans verdigi hedeflerin tamami mevcut
  - fakat `memory` naming cizgisiyle kucuk uyumsuzluk var
- not:
  - korunacak
  - batch 2'de `memory` naming cizgisiyle ayni dile cekilmeli

### 8) USER.md
- rol: kullanici profili, calisma tercihi ve cevap beklentisi
- yonlendirdigi hedefler: acik dosya linki yok
- ic sorunlar:
  - kritik sorun yok
- hedeflerle uyum sorunu:
  - `SOUL.md` ve `AGENTS.md` ile uyumlu
- not:
  - korunacak

### 9) IDENTITY.md
- rol: ajanin kapsam siniri ve ne olmadigi
- yonlendirdigi hedefler: acik dosya linki yok
- ic sorunlar:
  - kritik sorun yok
- hedeflerle uyum sorunu:
  - `PROJECT.md`, `USER.md` ve `SOUL.md` ile uyumlu
- not:
  - korunacak

### 10) SOUL.md
- rol: ton, davranis ve calisma stili
- yonlendirdigi hedefler: acik dosya linki yok
- ic sorunlar:
  - kritik sorun yok
- hedeflerle uyum sorunu:
  - `USER.md` tercihleri ve `IDENTITY.md` sinirlariyla uyumlu
- not:
  - korunacak

## Batch 1 + 1b guncel sonuc
- `AGENTS.md`, `USER.md`, `IDENTITY.md`, `SOUL.md` ilk audit kapsaminda artik kayda girdi
- bu dordlu icinde en net cleanup adayi `AGENTS.md` icindeki `memory` naming dili ve `MEMORY_SUMMARY.md` agirligi
- diger uc dosya su an temiz ve korunacak durumda

## Batch 1c - teknik ve operasyon referans dosyalari

### Denetlenen dosyalar
- `TOOLS.md`
- `OPERATIONS.md`
- `TOOLS.yaml`

### 11) TOOLS.md
- rol: teknik ortam siniri, varsayilan yigin ve operasyon secim cizgisi
- yonlendirdigi hedefler: `TOOLS.yaml`, `OPERATIONS.md`
- ic sorunlar:
  - `TOOLS.md` ana cizgi olarak temiz, ama turetilmis eslik dosyasi `TOOLS.yaml` eski `context center` ve `consultation center` adlarini hala tasiyor
- hedeflerle uyum sorunu:
  - `PROJECT.md`, `MEMORY.md` ve `README.md` ile stack ve operasyon siniri uyumlu
  - ancak `TOOLS.yaml` ile tam senkron degil; ozet dosya eski adlandirma driftine dusmus
- not:
  - `TOOLS.md` korunacak
  - `TOOLS.yaml` batch 2 cleanup adayi

### 12) OPERATIONS.md
- rol: servis, yol, port ve canli operasyon referansi
- yonlendirdigi hedefler: workspace `bin/` ve `deploy/` artefaktlari, sistem yol referanslari
- ic sorunlar:
  - `Canli web app eski calisma yolu: /opt/esnafdijital/web` yolu artik yok
  - bu satir tarihsel bilgi tasiyorsa daha acik etiketlenmeli; aktif referans gibi durmasi drift riski olusturuyor
- hedeflerle uyum sorunu:
  - `admin` ve workspace sync tarafindaki workspace/deploy/bin referanslari mevcut
  - `HEARTBEAT.md` icindeki `ana domain placeholder modunda` notuyla birlikte okuyunca eski web app yolunun aktif olmadigi netlesiyor
- not:
  - `OPERATIONS.md` korunacak
  - eski web app yolu satiri cleanup / netlestirme adayi

### 13) TOOLS.yaml
- rol: `TOOLS.md` eslik eden turetilmis ozet
- yonlendirdigi hedefler: acik dosya linki yok, `TOOLS.md`den turemis durum ozeti
- ic sorunlar:
  - `context center`
  - `consultation center`
  - bu iki ifade kaldirilan/eski adlandirma izi tasiyor
- hedeflerle uyum sorunu:
  - `TOOLS.md` icindeki guncel cizgiyle tam uyumlu degil
- not:
  - batch 2'de ya yeniden turetilmeli ya da elle drift cleanup yapilmali

## Batch 1 + 1b + 1c guncel sonuc
- `TOOLS.md` ve `OPERATIONS.md` artik ilk audit kapsaminda ayri maddelerle kayda girdi
- teknik/operasyon tarafinda en net iki drift:
  1. `TOOLS.yaml` icindeki eski adlandirma kalintilari
  2. `OPERATIONS.md` icindeki artik bulunmayan eski web app yolu

## Batch 1d - SOUL / USER / MEMORY birlikte degerlendirme

### Denetlenen dosyalar
- `SOUL.md`
- `USER.md`
- `MEMORY.md`

### Ortak okuma
- `SOUL.md` ton ve davranis kontratini veriyor
- `USER.md` kullanici profili ve iletisim beklentisini netlestiriyor
- `MEMORY.md` ise kalici proje cizgisini ve karar omurgasini tutuyor

### Uyum durumu
- uc dosya birbiriyle genel olarak uyumlu
- `SOUL.md` ile `USER.md` ayni iletisim cizgisini destekliyor: kisa, net, uygulamaya donuk, gereksiz teori yok
- `USER.md` icindeki is bolumu, `MEMORY.md` icindeki `Kullanici / Ajan` ayrimiyla uyumlu
- `MEMORY.md` icindeki `once netlik`, `gereksiz karmasiklik yok`, `gercek cikti` cizgisi `SOUL.md` karakteriyle uyumlu

### Net gucler
1. rol ayrimi temiz
   - kullanici saha/satis/yön tarafinda
   - ajan teknik sistem/operasyon tarafinda
2. ton cizgisi temiz
   - dogal, sade, baskisiz, sonuc odakli
3. proje omurgasi temiz
   - `Audit -> Teklif -> Teslimat -> Bakim`
   - sade stack ve MVP siniri net

### Net drift / iyilestirme adayi
1. `MEMORY.md`
   - `baglam / dokuman merkezi` dili eski `baglam merkezi` cizgisine yakin kaliyor
   - repo cleanup'ta netlesen yeni source-of-truth diline gore sadeleştirme adayi
2. `USER.md` + `SOUL.md`
   - ikisi de ton/iletisim cizgisinde guclu, ama bazi satirlar birbirine cok yakin anlam tasiyor
   - su an sorun degil, sadece ileride gereksiz tekrar buyurse birlestirme degil ama sinir sertlestirme gerekebilir
3. `MEMORY.md`
   - kalici gercekler ile operasyonel gercekler ayni dosyada duruyor; simdilik yonetilebilir ama `OPERATIONS.md` ile tekrar siniri batch cleanup'ta izlenmeli

### Sonuc
- `SOUL.md` korunacak
- `USER.md` korunacak
- `MEMORY.md` korunacak ama wording cleanup adayi olarak acik kalacak
- bu uc dosya repo kimligini tasiyan cekirdek set olarak saglam

## Batch 2 duzeltme plani

### Hedef
Batch 1'de bulunan drift ve yonlendirme bosluklarini dosya silmeden once kontrollu bir duzeltme planina cevirmek.

### Ilke
- once wording / scope / navigasyon temizligi
- sonra naming duzeltmesi icin etki analizi
- dosya silme veya toplu rename karari, referans kontrolu cikmadan uygulanmayacak

### Uygulama sirasi
1. `state/README.md` ekle
   - kok `README.md` icindeki yonlendirme boslugunu kapat
   - `state/` klasorunun gecici/uretim artefakti rolu netlestir
   - risk: dusuk

2. `MEMORY_SUMMARY.md` wording cleanup
   - `baglam merkezi` dilini kaldir
   - dosyanin turetilmis kisa ozet rolu daha net hale gelsin
   - `MEMORY.md` ile cizgiyi birebir koru
   - risk: dusuk

3. `ROADMAP.md` wording cleanup
   - `Context` adlandirma izini kaldir
   - `ilk tanitim sitesi yayinda` satirini mevcut placeholder gercegiyle uyumlu hale getir
   - stratejik yone dokunma
   - risk: dusuk

4. `TOOLS.yaml` drift cleanup
   - `context center` ve `consultation center` kalintilarini guncel adlandirmaya cek
   - `TOOLS.md` ile birebir eslik eden ozet olma kuralini geri getir
   - risk: dusuk

5. `OPERATIONS.md` netlestirme
   - `/opt/esnafdijital/web` satirini tarihsel/arsiv notu olarak ayir veya aktif referans gorunumunden cikar
   - risk: dusuk

6. `HEARTBEAT.md` scope temizligi
   - repo cleanup disi blokaj satirlarini ayikla ya da baska kanonik yere tasi
   - standing policy gibi duran deploy notunun kalici mi gecici mi oldugunu netlestir
   - risk: dusuk-orta

7. `AGENTS.md` ince ayar
   - `memory` naming ornegini `memory/README.md` ile ayni dile cek
   - `MEMORY_SUMMARY.md` referans agirligini cleanup sonrasi gercek yerine oturt
   - risk: dusuk

8. `memory/` naming drift etki analizi
   - 25 dosyayi `daily`, `topic`, `incident`, `consultation` olarak sinifla
   - once capraz referans taramasi yap
   - fiziksel rename'i tablo ve grup bazli planla
   - risk: orta

### Batch 2'de silinmeyecekler
- `MEMORY_SUMMARY.md`
- `ROADMAP.md`
- `TOOLS.yaml`
- `OPERATIONS.md`
- `AGENTS.md`
- `memory/` altindaki driftli dosyalar

Not: Bu batch'te hedef duzeltme ve siniflandirma; silme veya toplu rename ancak referans kontrolunden sonra.

### Batch 2 cikti beklentisi
- `state/README.md` eklenmis olacak
- driftli wording dosyalari guncellenmis olacak
- `memory/` rename listesi tablo halinde hazir olacak
- `HEARTBEAT.md` sonraki somut adim fiziksel uygulama batch'ine donmus olacak

### Ek not - dil temizligi
- `audit` kelimesi ana baglam dosyalarindan temizlendi: `MEMORY.md`, `MEMORY_SUMMARY.md`, `HEARTBEAT.md`, `AGENTS.md`, `PROJECT.md`, `ROADMAP.md`
- `PLAYBOOKS/kesif-teklif-teslimat-bakim.md` eklendi ve `PLAYBOOKS/README.md` yeni ada baglandi
- Repo genelinde hala kalan `audit` kullanimi var; bunlar checklist, teklif dosyalari, referanslar, uygulama kodu, veri modeli ve uretilmis ciktilara yayiliyor
- Tum Ingilizce kelimeleri temizlemek, yalniz metin duzeltmesi degil; kod sabitleri, veritabani model adlari, dosya adlari ve arayuz metinleri icin ayri batch gerektiriyor

### Ek not - HEARTBEAT kullanimi
- Drift'in tekrar etmemesi icin `HEARTBEAT.md` kullanim siniri ayri batch olarak sertlestirilecek.
- Hedef: heartbeat'i aktif pano olarak tutmak; gecmis, kalici politika, uzun aciklama ve daginik notlari buradan uzak tutmak.
- Sonraki duzeltmede heartbeat icin net kural seti yazilacak: ne burada kalir, ne buradan cikar, ne zaman guncellenir.

## Batch 2 uygulama - dusuk riskli drift duzeltmeleri

### Uygulanan degisiklikler
1. `state/README.md` eklendi
   - `state/` klasorunun gecici/uretim artefakti rolu netlestirildi
   - kok `README.md` icindeki yonlendirme boslugu kapanmis oldu

2. `MEMORY_SUMMARY.md` guncellendi
   - turetilmis 1 dakikalik ozet rolu en basa yazildi
   - `dokuman/baglam sistemi` diliyle guncel source-of-truth cizgisine yaklastirildi

3. `ROADMAP.md` guncellendi
   - `Context` adlandirma izi kaldirildi
   - `ilk tanitim sitesi yayinda` drifti temizlenip mevcut placeholder gercegi `Doing` tarafina cekildi

4. `TOOLS.yaml` guncellendi
   - `context center` ve `consultation center` kalintilari temizlendi
   - `prompt uretimi yuzeyi` ve `dokuman ve baglam akisi` diliyle `TOOLS.md` cizgisine yaklastirildi

5. `OPERATIONS.md` guncellendi
   - `/opt/esnafdijital/web` satiri aktif referans gibi durmayacak sekilde etiketlendi
   - heartbeat icinden tasinan gecici yayin kurali operasyon referansina alindi

6. `HEARTBEAT.md` guncellendi
   - cleanup disi blokajlar ayiklandi
   - sonraki adim rename referans taramasi + son scope temizligi olarak daraltildi

### Hizli dogrulama
- `state/README.md` artik mevcut
- `MEMORY_SUMMARY.md`, `ROADMAP.md`, `TOOLS.yaml`, `OPERATIONS.md`, `HEARTBEAT.md` Batch 2 planindaki dusuk riskli drift duzeltmelerini yansitiyor

## memory naming rename tablosu (onerilen)

Asagidaki tablo fiziksel rename oncesi calisma notudur. Son karar, capraz referans taramasi tamamlaninca verilecek.

| Mevcut ad | Onerilen tip | Onerilen yeni ad |
| --- | --- | --- |
| `2026-04-19-github-sync.md` | topic | `2026-04-19-topic-github-sync.md` |
| `2026-04-20-page-error.md` | incident | `2026-04-20-incident-page-error.md` |
| `2026-04-20-repo-structure.md` | consultation | `2026-04-20-consultation-repo-structure.md` |
| `2026-04-22-cold-start.md` | topic | `2026-04-22-topic-cold-start.md` |
| `2026-04-22-context-cleanup.md` | topic | `2026-04-22-topic-context-cleanup.md` |
| `2026-04-22-crm-panel.md` | topic | `2026-04-22-topic-crm-panel.md` |
| `2026-04-22-executor-confusion.md` | topic | `2026-04-22-topic-executor-confusion.md` |
| `2026-04-22-gateway-summary.md` | topic | `2026-04-22-topic-gateway-summary.md` |
| `2026-04-22-old-profile.md` | topic | `2026-04-22-topic-old-profile.md` |
| `2026-04-22-skill-creator.md` | topic | `2026-04-22-topic-skill-creator.md` |
| `2026-04-22-telegram-group.md` | topic | `2026-04-22-topic-telegram-group.md` |
| `2026-04-23-crm-zinciri.md` | topic | `2026-04-23-topic-crm-zinciri.md` |
| `2026-04-23-dark-mode.md` | topic | `2026-04-23-topic-dark-mode.md` |
| `2026-04-23-deploy-request.md` | topic | `2026-04-23-topic-deploy-request.md` |
| `2026-04-23-evaluation-prompt.md` | consultation | `2026-04-23-consultation-evaluation-prompt.md` |
| `2026-04-23-filename-slug.md` | topic | `2026-04-23-topic-filename-slug.md` |
| `2026-04-23-heartbeat-update.md` | topic | `2026-04-23-topic-heartbeat-update.md` |
| `2026-04-23-instagram-manual.md` | topic | `2026-04-23-topic-instagram-manual.md` |
| `2026-04-23-memory-flush.md` | topic | `2026-04-23-topic-memory-flush.md` |
| `2026-04-23-photo-upload.md` | topic | `2026-04-23-topic-photo-upload.md` |
| `2026-04-23-research-outputs.md` | consultation | `2026-04-23-consultation-research-outputs.md` |
| `2026-04-24-context-cleanup.md` | topic | `2026-04-24-topic-context-cleanup.md` |
| `2026-04-24-deploy-rule.md` | topic | `2026-04-24-topic-deploy-rule.md` |
| `2026-04-24-filename-slug.md` | topic | `2026-04-24-topic-filename-slug.md` |
| `2026-04-24-repo-cleanup.md` | topic | `2026-04-24-topic-repo-cleanup.md` |

### Rename tablo notu
- drift sayisi pattern taramasi ile yeniden dogrulandi: `25`
- fiziksel rename bu batch'te yapilmadi
- capraz referans taramasi tamamlandi; staged rename risk haritasi cikti

## memory capraz referans taramasi sonucu

### Ozet
- 25 driftli dosyanin tamami repo icinde filename bazli tarandi
- 20 dosya sadece bu cleanup notunda referansli gorunuyor
- 4 dosya ek memory/reference baglantilari tasiyor
- 1 dosya aktif calisma notu oldugu icin heartbeat ve ayni gun notlari tarafindan referanslaniyor

### Ek baglantili dosyalar
1. `2026-04-19-github-sync.md`
   - ek referanslar: `memory/2026-04-19.md`, `memory/2026-04-22-old-profile.md`
   - karar: paired update ile ikinci asamada rename

2. `2026-04-20-page-error.md`
   - ek referanslar: `memory/2026-04-20.md`
   - non-kanonik cache referansi: `memory/.dreams/short-term-recall.json`
   - karar: daily note guncellemesiyle birlikte ikinci asamada rename, `.dreams` cache'i kanonik sayilmayacak

3. `2026-04-20-repo-structure.md`
   - ek referanslar: `memory/2026-04-20.md`, `memory/2026-04-22-old-profile.md`
   - non-kanonik cache referansi: `memory/.dreams/short-term-recall.json`
   - karar: paired update ile ikinci asamada rename

4. `2026-04-22-crm-panel.md`
   - ek referanslar: `memory/2026-04-23-crm-zinciri.md`, `REFERENCES/Derin-arastirma/esnafdigital-crm-yonu-derin-arastirma.md`
   - karar: reference + memory birlikte guncellenmeden rename yapilmayacak

5. `2026-04-24-repo-cleanup.md`
   - ek referanslar: `HEARTBEAT.md`, `memory/2026-04-24-context-cleanup.md`, `memory/2026-04-24-filename-slug.md`
   - karar: aktif calisma notu oldugu icin bu cleanup hattı kapanana kadar rename ertelenecek

### Staged rename karari
- Asama A, dusuk risk: sadece bu cleanup notunda referansli kalan 20 dosya
- Asama B, orta risk: ek memory/reference baglantisi tasiyan 4 dosya
- Asama C, ertele: aktif calisma notu olan `2026-04-24-repo-cleanup.md`

### Asama A icin uygun dosyalar
- `2026-04-22-cold-start.md`
- `2026-04-22-context-cleanup.md`
- `2026-04-22-crm-panel.md` haric tum 2026-04-22 tekil notlari icinden yalniz cleanup notunda gecenler:
  - `2026-04-22-executor-confusion.md`
  - `2026-04-22-gateway-summary.md`
  - `2026-04-22-old-profile.md`
  - `2026-04-22-skill-creator.md`
  - `2026-04-22-telegram-group.md`
- `2026-04-23-crm-zinciri.md`
- `2026-04-23-dark-mode.md`
- `2026-04-23-deploy-request.md`
- `2026-04-23-evaluation-prompt.md`
- `2026-04-23-filename-slug.md`
- `2026-04-23-heartbeat-update.md`
- `2026-04-23-instagram-manual.md`
- `2026-04-23-memory-flush.md`
- `2026-04-23-photo-upload.md`
- `2026-04-23-research-outputs.md`
- `2026-04-24-context-cleanup.md`
- `2026-04-24-deploy-rule.md`
- `2026-04-24-filename-slug.md`

Not: Asama A listesi, cleanup notu disinda ek baglanti tasimayan dosyalari kapsar. Fiziksel rename bu not ve ilgili referanslar tek patch'te guncellenmeden uygulanmayacak.

### Sonraki adim
- Asama A rename patch'ini hazirla
- `AGENTS.md` ve `HEARTBEAT.md` scope temizligini kapat
- fiziksel rename oncesi kullanicidan kisa onay iste

## Asama A approval-ready rename taslagi

### Hazirlanan artefakt
- komut taslagi: `state/repo-cleanup-asama-a-rename.sh`
- calistirma komutu: `bash /root/.openclaw/workspace/state/repo-cleanup-asama-a-rename.sh`

### Kapsam
- sadece Asama A icindeki 20 dusuk riskli `memory/` dosyasi rename edilir
- Asama B ve Asama C bu komuta dahil degildir
- rename sonrasi `memory/2026-04-24-repo-cleanup.md` icindeki tablo ve staged karar notu yeni adlarla senkronize edilecektir

### Onay notu
- bu komut toplu dosya tasima oldugu icin kullanicidan kisa onay alinmadan calistirilmayacak
- onay gelince komut birebir bu haliyle calistirilacak, sonra referans guncellemeleri ayri adimda tamamlanacak

## Asama A referans guncelleme etkisi

### Tarama sonucu
- Asama A icindeki 20 eski ad repo genelinde tekrar tarandi
- filename bazli kanonik referans yuzeyi pratikte tek dosyada toplaniyor: `memory/2026-04-24-repo-cleanup.md`
- ikinci gorunen yuzey, bizzat calistirilacak artefakt olan `state/repo-cleanup-asama-a-rename.sh`
- `AGENTS.md`, `HEARTBEAT.md`, `README.md`, `MEMORY.md` ve diger kok referans dosyalarinda ek Asama A filename baglantisi cikmadi

### Uygulama notu
- rename sonrasi ilk patch sadece bu cleanup notunu yeni adlarla senkronize edecek
- bu senkron icin hazir artefakt: `state/repo-cleanup-asama-a-post-rename-sync.py`
- calistirma komutu: `python3 /root/.openclaw/workspace/state/repo-cleanup-asama-a-post-rename-sync.py`
- `state/repo-cleanup-asama-a-rename.sh` ise calisma artefakti oldugu icin is tamamlaninca silme/arsivleme adayi olarak ele alinacak
- referans daralmasi sayesinde Asama A rename + patch paketi dusuk riskli kaldi

## Ek bulgu - MEMORY promoted block drift'i

### Bulgu
- `MEMORY.md` icindeki `Promoted From Short-Term Memory (2026-04-24)` blogu, dosyanin kendi cizgisiyle uyumsuz sekilde ham gunluk notlari ve tekrarli teknik detaylari tek satira yigilmis halde tasiyor
- blok icinde `Consultation Center`, eski rota/adlandirma ve gunluk commit/uygulama detaylari var; bunlar kalici hafiza yerine tarihli `memory/` notlarinda kalmali
- bu yapi `MEMORY.md` icindeki "yalnizca kalici cizgi" kuralini zayiflatiyor

### MEMORY promoted block ayiklama plani
1. toplu promotion blogunu oldugu gibi korumak yerine once satir tipine gore ayir
   - gunluk degisiklik / commit / deploy / endpoint / route / ekran detayi -> `memory/` tarafinda kalacak
   - kalici karar zaten `DECISIONS/` veya `MEMORY.md` icinde varsa tekrar tutulmayacak
   - yeni ama gercekten kalici ilke varsa temiz tek maddeye indirgenecek

2. blok icindeki belirgin gecici / stale icerikler
   - `Consultation Center` heartbeat, brief, route ve endpoint detaylari artik aktif source-of-truth cizgisini temsil etmiyor
   - gunluk commit listeleri, build/smoke test sonuc satirlari ve uygulama dosya yolları kalici hafiza adayi degil
   - `Project OS genel CRM degil` gibi satirlar, daha sonraki CRM-genisleme kararlarina gore stale/gerilimli okunabilir

3. bloktan korunabilecek sadece dar adaylar
   - gerekirse tek satirlik kalici ilke olarak su tip icerikler dusunulebilir:
     - gereksiz tekrar eden heartbeat/cron istememe cizgisi
     - auth/provider usage tarafinda dogru veri kaynagi ilkesi
     - kalici karar dosyasina zaten baglanmamis ama operasyon cizgisini etkileyen net bir ilke
   - bunlar da ham promotion marker'iyle degil, normal `MEMORY.md` maddesi olarak yeniden yazilacak

4. uygulama sekli
   - once korunacak 0-3 net kalici madde sec
   - sonra `Promoted From Short-Term Memory` blogunu tamamen kaldir
   - gerekiyorsa kalan gercek kalici maddeyi ilgili `MEMORY.md` bolumlerine dagit
   - promotion marker yorumlari ve skor metinleri tamamen temizlenir

### Sonuc
- rename batch'inden bagimsiz ama ayni cleanup hattina bagli bir drift adayi daha netlesti
- Asama A rename ve referans patch'i kapandiktan sonra `MEMORY.md` promoted block'u ayiklama / kaliciya donusturme batch'i acilacak

## 2026-04-24 ek ilerleme - kontrollu kok dosya uyum duzeltmeleri

Bu bolum, ilk auditten sonra tek tek uygulanmis gercek duzeltmeleri kayda alir. Amac, eski bulgu listesi ile fiili repo durumu arasinda fark birakmamaktir.

### Uygulanan duzeltmeler
1. `TOOLS.yaml`
   - ozet dosyasi ikinci politika kaynagi gibi davranmayacak sekilde sadeleştirildi
   - yorumlayici ek maddeler yerine `TOOLS.md` ile daha birebir hizali ozet yapisina cekildi
   - sonuc: `TOOLS.md` -> ana kaynak, `TOOLS.yaml` -> eslik eden ozet cizgisi guclendi

2. `OPERATIONS.md`
   - OpenClaw operasyon komutlari eklendi
   - eklenen satirlar: `openclaw status`, `openclaw gateway status/start/stop/restart`
   - sonuc: VPS uzerindeki OpenClaw baglami canli operasyon referansinda daha gorunur hale geldi

3. `README.md`
   - `deploy/`, `bin/`, `state/` satirlari icin `ne zaman bakilir` dili netlestirildi
   - sonuc: root onboarding ve yonlendirme zinciri daha okunur oldu

4. `PROJECT.md`
   - detayli `Teknik Varsayimlar` listesi kaldirildi, yerine `TOOLS.md` yonlendirmesi kondu
   - `Genisleme alani` ifadesi guncel kalici karara gore `operasyonel CRM yonunde genisleyebilen panel` cizgisine cekildi
   - sonuc: proje tanimi ile teknik tercih ve karar kaydi rolleri daha temiz ayrildi

5. `ROADMAP.md`
   - `Done / Doing / Next` yapisi kaldirildi
   - yerine roadmap rolune daha uygun `Bu donemin oncelikleri` ve `Bu donemde netlesmesi gereken kararlar` yapisi kuruldu
   - `bagimsiz yatay SaaS tipi genel CRM urunlesmesi` maddesine aciklayici not eklendi; operasyonel CRM genislemesinin bunun disinda oldugu netlestirildi
   - sonuc: roadmap aktif durum panosundan ayrilip orta vadeli yon dosyasi rolune daha iyi oturdu

### Kapanan veya daralan drift adaylari
- `TOOLS.yaml` icindeki eski adlandirma / yorumlayici drift buyuk olcude kapandi
- `ROADMAP.md` icindeki `Context` izi ve aktif durum dili temizlendi
- `PROJECT.md` icindeki eski `hafif panel` okumasinin yerini guncel CRM genisleme karariyla uyumlu ifade aldi
- `README.md` icindeki `deploy/bin/state` yonlendirme belirsizligi daraldi
- `OPERATIONS.md` icindeki OpenClaw operasyon boslugu kapandi

### Hala acik kalanlar
1. `HEARTBEAT.md`
   - genel iskelet dogru
   - `Siradaki Somut Adim` satiri guncellenip fiili akisla hizalandi
   - heartbeat, rename batch'ine erken baglanmak yerine once root scope temizligi ve `MEMORY.md` promoted block ayiklamasina dondu

2. `MEMORY.md`
   - promoted block ayiklandi
   - ham gunluk/teknik detaylar ve promotion marker yorumlari kaldirildi
   - yalniz iki kalici ilke korundu: surekli arka plan ajanlari yerine tek-seferlik/deterministik yardimci akis tercihi ve gereksiz tekrar eden wake/cron mantigindan kacinma cizgisi
   - `Genisleme alani` ifadesi de guncel CRM karariyla hizalandi

3. `MEMORY_SUMMARY.md`
   - ilk cleanup notlarinda aday olarak acildi; bu turda tekrar ele alinmadi
   - turetilmis ozet rolunu sertlestirme ihtiyaci acik kaldi

4. `memory/` naming drift rename paketi
   - Asama A / B / C plani hazir
   - ama fiziksel rename icin kullanici onayi, referans patch'i ve kok dosya audit kapanisi birlikte ele alinacak

### Guncel durum notu
- Kok ana dosyalar icinde `README.md`, `PROJECT.md`, `ROADMAP.md`, `TOOLS.md`, `TOOLS.yaml`, `OPERATIONS.md`, `AGENTS.md`, `USER.md`, `IDENTITY.md`, `SOUL.md` tarafinda temel rol cizgisi artik daha net
- `HEARTBEAT.md` aktif pano rolune gore fiili akisla hizalandi
- `MEMORY.md` promoted block'u ayiklanip kalici cizgiye indirildi
- Bu cleanup hattinin sonraki kontrollu duragi: `MEMORY_SUMMARY.md`, sonra rename batch onayi
