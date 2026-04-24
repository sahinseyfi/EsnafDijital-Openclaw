# Repo Cleanup - Source of Truth Taslagi

Durum: draft
Amaç: repo genel temizligi oncesi her bilgi tipinin kanonik yerini sertlestirmek.

## 1. Kanonik cekirdek

| Bilgi tipi | Kanonik yer | Ne yazar | Ne yazmaz |
| --- | --- | --- | --- |
| Aktif durum, bu hafta odak, blokaj, siradaki somut adim | `HEARTBEAT.md` | sadece simdiki durum | gecmis oturum detayi, kalici ilke |
| Kalici gercekler, zor degisen karar cizgisi | `MEMORY.md` | proje omurgasi, korunacak ilkeler, sabit operasyonel gercekler | gunluk not, kisa omurlu durum |
| Proje tanimi ve kapsam | `PROJECT.md` | bu proje nedir, neyi kapsar, MVP ici / disi | bugunun isi, gecici blokaj |
| Orta vadeli yon ve siralama | `ROADMAP.md` | sonraki asamalar, oncelik sirası | gunluk gorev listesi |
| Teknik ortam ve operasyon referansi | `TOOLS.md`, `OPERATIONS.md` | servis, stack, port, operasyon siniri | urun vizyonu, gunluk durum |
| Calisma kontrati | `AGENTS.md` | ajanin davranis cizgisi, isletim kurallari | proje kapsam tekrari |
| Kullanici ve ajan profili | `USER.md`, `IDENTITY.md`, `SOUL.md` | iletisim ve rol cizgisi | aktif task durumu |

## 2. Turetilmis / ozet yuzeyler

| Dosya | Rol | Kural |
| --- | --- | --- |
| `README.md` | giris kapisi ve okuma rotasi | kanonik dosyalari isaret eder, onlarin yerine gecmez |
| klasor `README.md` dosyalari | klasorun ic mantigi | ilgili klasore giris rehberi, ana karar kaynagi degil |
| checklist / playbook | uygulama rehberi | politika degil, operasyonel kullanim rehberi |

## 3. Karar ve tarihce

| Bilgi tipi | Kanonik yer | Kural |
| --- | --- | --- |
| Tekil kalici karar | `DECISIONS/YYYY-MM-DD-slug.md` | bir dosya = bir karar |
| Gunluk gelisme ozeti | `memory/YYYY-MM-DD.md` | ayni gun tek kanonik gunluk dosya |
| Konu / incident / session kaydi | `memory/YYYY-MM-DD-topic.md` | kalici karar degil, tarihlenmis baglam |
| Ham veya derin referans materyal | `REFERENCES/` | karar kaydi gibi davranmaz |
| Aktif olmayan ama saklanacak icerik | `ARCHIVE/` | ilk okuma paketi degil |

## 4. Kod ve urun yuzeyi

| Bilgi tipi | Kanonik yer | Kural |
| --- | --- | --- |
| Canli admin kodu | `agent-workspace/` | calisan urun buradadir |
| Public site kodu | `website/` | vitrinin kanonik kodu |
| Yardimci script | `bin/`, `deploy/` | operasyon amacli yardimci katman |
| Gecici ama takipli uretim artefakti | `state/` | karar dosyasi gibi davranmaz, calisma artefaktidir |

## 5. Ilk netlestirilmesi gereken acik noktalar

1. `README.md` icindeki mevcut tabloyu ana source-of-truth ozeti olarak koruyup bu dosyayi sadece cleanup calisma notu olarak mi kullanalim? Onerim: evet.
2. `state/` altindaki dosyalar kalici belge degil, cleanup bittiginde silinebilir/arsivlenebilir calisma artefakti mi olsun? Onerim: evet.
3. Koku dosyalarindan hangileri artik supheli: `CONSULTATION_LOG.md`, eski tekil notlar, gecmis adlandirma kalintilari. Bunlar Faz 1 envanterde ayrica siniflanacak.

## 6. Onerilen sert kurallar

- Ayni bilgi iki kanonik dosyada yasamaz.
- `HEARTBEAT.md` aktif panodur, bitmis isi tutmaz.
- `MEMORY.md` gunluk not kabul etmez.
- `PROJECT.md` ve `ROADMAP.md` task board gibi kullanilmaz.
- `README.md` yonlendirir, ana karar dosyalarinin yerine gecmez.
- `REFERENCES/` kaynak materyaldir, resmi karar dosyasi degildir.
- `ARCHIVE/` saklama alanidir, aktif operasyon rehberi degildir.

## 7. Yeni kural: dogru konteyner, dogru icerik anlamina gelmez

Kanonik yerin belli olmasi tek basina dosyanin guvenilir oldugu anlamina gelmez.
Cleanup sirasinda her kanonik dosya su testlerden gecirilecek:

1. **rol uyumu**: dosya kendi amacina uygun mu?
2. **guncellik**: icerik hala bugunku cizgiyle uyumlu mu?
3. **tekrar**: ayni bilgi baska kanonik dosyada tekrar ediyor mu?
4. **drift**: eski isim, eski ekran, eski akis, kapanmis feature izi tasiyor mu?
5. **yogunluk**: o dosya gereksiz sisip okunamaz hale gelmis mi?

Bu yuzden cleanup mantigi sadece `hangi dosya nerede durmali` degil, ayni zamanda `o dosyanin icindeki her satir hala dogru mu` kontrolunu de kapsar.

## 8. Yeni okuma kurali: yonlendirme zinciri de denetimin parcasi

Bir dosya kendi icinde baska dosya, klasor README'si, karar kaydi veya playbook'a yonlendiriyorsa denetim yalniz o ana dosyada bitmeyecek.

Uygulanacak kural:
1. ana dosya okunur
2. icindeki acik yonlendirmeler tek tek cikarilir
3. o yonlendirmelerin hedefleri de okunur
4. ana dosyanin iddiasi ile hedef dosyanin gercegi karsilastirilir
5. uyumsuzluk varsa hem kaynak dosyada hem hedefte not edilir

Bu sayede ornegin:
- `README.md` okunuyorsa isaret ettigi kok dosyalar ve ilgili klasor README'leri de kontrol edilir
- `DECISIONS/README.md` okunuyorsa isaret ettigi karar dosyalari da kontrol edilir
- `memory/README.md` okunuyorsa naming ve kullanim kurali gercek dosyalarla karsilastirilir
- `CHECKLISTS/README.md` veya `PLAYBOOKS/README.md` okunuyorsa alt rehberler de kapsam dahilinde sayilir

Yani cleanup icin okuma modeli yalniz `tek dosya denetimi` degil, `yonlendirme zinciri denetimi` olacak.

## 9. Bu karar turunun sonucu

Asagidaki konteynerler prensipte kabul edildi, fakat icerikleri otomatik olarak temiz kabul edilmeyecek:
- `README.md`
- `HEARTBEAT.md`
- `MEMORY.md`
- `PROJECT.md`
- `ROADMAP.md`
- `DECISIONS/`
- `memory/`
- `state/`

Yani sonraki fazda soru su olacak:
- konteyner dogru mu? -> buyuk olcude evet
- icerik temiz ve tutarli mi? -> tek tek denetlenecek
- yonlendirdigi hedeflerle uyumlu mu? -> zincir halinde denetlenecek
