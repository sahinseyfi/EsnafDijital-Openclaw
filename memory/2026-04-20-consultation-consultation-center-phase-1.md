# Consultation: Consultation Center Faz 1 guclendirme analizi

## Tarih
2026-04-20

## Amac
Consultation Center yuzeyini yeni bir sistem kurmadan, mevcut route/component/API/service omurgasi uzerinde kucuk ve dusuk riskli diff'lerle daha iyi brief, daha iyi kalite kapisi ve daha somut cikti ureten hale getirmek.

## Dayanak
Analiz su yuzeylere dayanir:
- `README.md`
- `HEARTBEAT.md`
- `MEMORY_SUMMARY.md`
- `PROJECT.md`
- `openclaw-control-ui` icindeki fiili route/component/API/service agaci
- 2026-04-19 ve 2026-04-20 donemindeki ilgili hizli commit katmanlari

## Mevcut durum ozeti
- Consultation Center, dis danisma veya GPT Pro calismalari icin temiz brief ve secili baglam ureten bir karar hazirlama yuzeyi haline geldi.
- Quick create, inbox filtreleri, detail editor, evaluator, workflow guidance, prompt preview, response capture ve action baglama akislari calisiyor.
- Route karari `blocked / internal / external` cizgisinde evaluator tarafinda veriliyor.
- Action kayitlari Project OS ve Context Center hedeflerine baglanabiliyor.

## Ana surtunmeler
1. Ilk giris hala fazla serbest, yapilandirma yuku detail ekrana oteleniyor.
2. `type` alani alan turunu soyluyor ama isin modu audit/patch/strateji gibi ayrismiyor.
3. Hedef yuzey secimi acik degil, sistem bunu sinyallerden tahmin ediyor.
4. Missing-fields mantigi triage icin yeterli ama karar kalitesi icin dar kaliyor.
5. Brief kalitesi alanlari schema, JSON brief ve editor arasinda tam hizali degil.
6. Stage dropdown'u kalite kapilarini by-pass edecek kadar serbest kalabiliyor.
7. Cikti paneli prompt-first tarafa daha yakin, uygulanabilir plan gorunurlugu daha zayif.

## Faz 1 yonu
Yeni bir consultation sistemi kurmak yerine mevcut Consultation Center omurgasi guclendirilmeli.
Hedef, yuzeyi triage + prompt hazirligindan bir adim ileri tasiyip mini-brief + kalite kapisi + uygulanabilir is plani ekseninde netlestirmek.

## Onerilen dusuk riskli Faz 1 degisiklikleri
### Simdi yapilabilecekler
- Quick create icine is modu, hedef yuzey, cikti tipi ve oncelik gibi hafif mini-brief alanlari eklemek.
- `evaluator.ts` icinde missing-fields matrisini target surface, output type, priority, scope ve success criteria gibi alanlarla genisletmek.
- Detail editor'de `successCriteria` ve benzeri kalite alanlarini gorunur yapmak.
- Consultation sayfasinda sonucu plan-first siraya alip prompt preview'i ikinci plana cekmek.
- Prompt preview'i ancak `external` ve eksik alan yoksa tam guclu gostermek.

### Sonra yapilabilecekler
- `suggestions.ts` tarafinda yeni meta alanlar icin daha akilli taslak uretmek.
- Suggest route ve workflow helper'i yeni alanlarla hizalamak.
- Aksiyon preset'lerine hedef yuzey ve bakilacak dosya mantigi eklemek.

### Bekleyebilir
- Prisma schema normalization
- Public website surface mapping
- Daha gelismis context ranking / consultation analytics

## Onerilen alan seti
### Zorunluya yakin
- baslik
- ham not / mevcut durum
- alan tipi
- is modu
- hedef yuzey
- karar sorusu
- istenen cikti tipi
- oncelik ve neden simdi

### Karar kalitesini artiran alanlar
- hedef kullanici / etkilenen rol
- kapsam ici / kapsam disi
- mevcut problem kaniti
- beklenen degisiklik
- basari kriteri / kabul kriteri
- etkilenen modul / ekran / akis

## Onerilen cikti sirasi
1. kisa karar ozeti
2. sistem karari ve kisa gerekcesi
3. eksik alanlar / varsayimlar
4. onerilen calisma modu
5. uygulanabilir aksiyonlar
6. kucuk patch plani
7. kabul kriterleri
8. gerekirse GPT Pro promptu

## Pratik sonuc
Net hukum: mevcut Consultation Center su an triage + prompt hazirligi yapiyor; Faz 1 degeri, onu daha iyi mini-brief, daha iyi kalite kapisi ve daha somut is plani ureten hale getirmekte.

## Sonraki is
Kucuk ve dusuk riskli Faz 1 patch ile basla.
Onerilen ilk hedef: `openclaw-control-ui/app/consultation-center/page.tsx` icinde plan-first cikti sirasini guclendir ve prompt preview'i readiness kosuluna bagla.
