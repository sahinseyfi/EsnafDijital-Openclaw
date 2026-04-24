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
