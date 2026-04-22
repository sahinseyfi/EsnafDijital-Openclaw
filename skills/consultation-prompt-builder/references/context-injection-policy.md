# Context Injection Policy

Bu politika, EsnafDigital icin GPT-5 ve benzeri modele gorev verirken hangi baglamin nasil eklenecegini belirler.

## Amac
- Her gorevde gerekli cekirdek proje cizgisini korumak
- Gereksiz dosya dump'i yapmadan daha iyi prompt kurmak
- Ham dosyalari her seferinde yukleyip baglami sisirmemek
- Goreve gore dogru ikincil kaynaklari secmek
- Eksik kritik baglam varsa bunu acik bosluk olarak gostermek

## Ana kural
Her gorevde tum dosyalari ham haliyle prompta koyma.

Varsayilan akis:
1. once cekirdek baglam ozeti uret
2. sonra goreve gore gerekli ikincil baglami sec
3. sadece gerekirse ham dosya oku veya tam metin tasi
4. karari etkilemeyen tekrarları prompta koyma

## Her gorevde zorunlu cekirdek baglam
Asagidaki dosyalar her gorevde dolayli olarak kullanilsin, ama varsayilan olarak ham metinleri degil ozetleri prompta girsin:

- `AGENTS.md`
- `SOUL.md`
- `USER.md`
- `IDENTITY.md`
- `TOOLS.md`
- `MEMORY.md`
- `HEARTBEAT.md`

## Cekirdek baglam ozeti nasil kurulur
Cekirdek baglam ozeti su alanlari kisa ve uygulanabilir sekilde icermeli:

### Calisma bicimi
`AGENTS.md` icinden:
- nasil ilerlenir
- done standardi
- dosya disiplini
- ne zaman kisa onay gerekir

### Ton ve tavir
`SOUL.md` icinden:
- sakin
- pratik
- sonuc odakli
- gereksiz teori yok

### Kullanici tercihleri
`USER.md` icinden:
- kisa ve net iletisim
- uygulanabilir oneriler
- teknik dilin sade tutulmasi
- gereksiz uzatma yapilmamasi

### Projedeki ortak rol
`IDENTITY.md` icinden:
- ajanin proje ici rolu
- ne olmadigi
- hangi alanlardan sorumlu oldugu

### Teknik ve guvenlik sinirlari
`TOOLS.md` icinden:
- varsayilan stack
- dosya vs veritabani ayrimi
- otomasyonun ne zaman kurulacagi
- gizli bilgi yazmama kurali

### Kalici yon
`MEMORY.md` icinden:
- proje omurgasi
- ana akis
- korunacak ilkeler
- teknik ve urunsel kalici kararlar

### Aktif odak
`HEARTBEAT.md` icinden:
- mevcut faz
- bu haftanin onceligi
- aktif blokaj
- siradaki somut adim

## Cekirdek ozetin bicimi
Bu ozet ham dosya dump'i gibi degil, kisa operasyon ozeti gibi yazilsin.

Tercih edilen bicim:
- en fazla 10-20 kisa madde
- tekrar yok
- sadece gorevi etkileyen cizgi var
- karar vermeye yardim etmeyen tarihsel ayrinti yok

## Goreve gore secilecek ikincil baglam
Asagidaki kaynaklar sadece gorev uygunsa eklenir:

### Repo, kapsam veya sistem kurgusu islerinde
- `README.md`
- `PROJECT.md`
- `ROADMAP.md`

### Kalici karar veya ilke degisikligi islerinde
- `DECISIONS/`

### Yakin gecmis uygulama, deploy, incident veya ilerleme gereken islerde
- `memory/`
- gerekiyorsa ilgili gun veya konu dosyasi

### Tekrarlayan operasyon veya uygulama standardi gereken islerde
- `CHECKLISTS/`
- `PLAYBOOKS/`

## Ham dosya ne zaman okunur
Asagidaki durumlarda ozet yetmez, ham dosya okunur:

- dosyanin kendisi duzenlenecekse
- iki dosya arasinda cakisma analizi yapilacaksa
- tam ifade veya exact wording onemliyse
- karar belirli bir kayda veya belgeye dayanacaksa
- ozet dusuk guven veriyorsa
- kullanici ozellikle dosyanin kendisini degerlendirmeyi istemisse
- dis GPT oturumunda repo analizi yapiliyorsa ve cikti repo gercegine dayanacaksa

## Ham dosya ne zaman prompta tasinmaz
Dosya okunmus olsa bile tam metin prompta tasinmaz, eger:
- sadece ana cizgi gerekiyorsa
- bilgi tekrari uretiyorsa
- gorevi dogrudan etkilemiyorsa
- ayni bilgi cekirdek ozette zaten varsa

## Prompt icine baglam nasil yerlestirilir
Tercih edilen sira:

1. amac
2. karar sorusu veya hedef
3. cekirdek baglam ozeti
4. goreve ozel secili ikincil baglam
5. acik bosluklar veya varsayimlar
6. gorev
7. sinirlar
8. beklenen cikti

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

## Consultation Center icin ozel uygulama notu
Consultation Center prompt uretiminde varsayilan olarak:
- once cekirdek baglam ozeti kur
- sonra consultation kaydinin ihtiyacina gore ikincil baglam sec
- sadece prompt kalitesini gercekten etkiliyorsa ham dosya oku
- prompta sadece karari etkileyen baglam tasinmali
- eger hedef dis GPT oturumuysa ve gorev repo analizi gerektiriyorsa, ilgili repo icerigini incelemeyi zorunlu varsay; erisim yoksa bunu acik bosluk veya blokaj olarak yaz

## Hazir sayma kosulu
Baglam paketi ancak su durumda hazir sayilir:
- cekirdek proje cizgisi gorunuyorsa
- aktif faz veya kalici yon karismiyorsa
- goreve uygun ikincil kaynaklar secildiyse
- karari etkilemeyen tekrar prompta tasinmadiysa
- eksik kritik bilgi saklanmadiysa
