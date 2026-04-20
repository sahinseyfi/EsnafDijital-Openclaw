# AGENTS.md

Bu workspace icinde calisan her ajan EsnafDigital icin uretim odakli calisir.

## 1) Amac
EsnafDigital'in teknik ve operasyonel omurgasini kur, sade tut ve gorunur ilerlet.
Ana akis her zaman sunu destekler:
`Audit -> Teklif -> Teslimat -> Bakim`

## 2) Oturum Acilis Sirasi
Her yeni istekte her seyi okumaya calisma. Once su sirayi kullan:
1. `README.md` -> repo ne, ilk nereye bakilacak
2. `HEARTBEAT.md` -> su an ne onemli
3. `MEMORY_SUMMARY.md` -> degismeyen cizgi
4. goreve gore ilgili dosya veya klasor README'si -> `PROJECT.md`, `ROADMAP.md`, `agent-workspace/README.md`, `memory/README.md`, `DECISIONS/README.md`, `TOOLS.md`, `OPERATIONS.md`, ilgili checklist/playbook
5. gerekiyorsa ilgili tarihli veya konu-ozel kayit

## 3) Varsayilan Calisma Dongusu
Her gorevde su donguyu uygula:
1. talebi tek cumlede netlestir
2. hangi somut ciktiyi degistirecegini belirle
3. en kucuk gercek adimi sec ve uygula
4. sonucu kisa sekilde dogrula
5. gerekiyorsa ilgili kaydi guncelle
6. kullaniciya `done / next / blocker` duzeniyle don

Tek aktif gorev mantigini koru. Bir isi yarim birakip baska yone savrulma.

## 4) Bitmis Sayma Standardi
Bir is ancak su durumda tamamlanmis sayilir:
- gercek bir cikti, dosya veya ekran degismisse
- kisa bir dogrulama yapildiysa
- gerekiyorsa ilgili baglam dosyasi guncellendiyse
- acik risk veya sonraki adim net yazildiysa

Sadece `bakiyorum`, `bir saniye`, `hemen test ediyorum` gibi placeholder ilerleme cumleleri cikti sayilmaz.

## 5) Dosya Disiplini
- `README.md` -> giris kapisi, okuma rotasi ve kaynak hiyerarsisi
- `PROJECT.md` -> kapsam ve proje tanimi
- `ROADMAP.md` -> orta vadeli yon ve oncelik
- `HEARTBEAT.md` -> aktif odak, blokaj ve siradaki adim
- `MEMORY.md` -> kalici kararlar ve kolay degismeyen gercekler
- `DECISIONS/` -> tekil kalici karar kayitlari
- `memory/YYYY-MM-DD.md` -> tarihlenmis gunluk ozet, ayni gun icin mevcut dosyaya ek yap
- `memory/YYYY-MM-DD-topic.md` -> session, incident veya konu-ozel kayit
- `TOOLS.md` ve `OPERATIONS.md` -> ortam, servis ve operasyon referansi
- `OFFERS.md`, `SEGMENTS.md`, `REFERENCES/` -> teklif, segment ve kaynak materyal
- `ARCHIVE/` -> aktif kullanilmayan ama saklanacak icerik

## 6) Baglam Kirliligi Kurallari
- ayni bilgiyi birden fazla dosyada gereksiz tekrar etme
- kisa omurlu detaylari `MEMORY.md`'ye tasima
- bitmis isleri `HEARTBEAT.md`'de gereksiz yere tutma
- gunluk not ile kalici karari ayni yere yazma
- yeni dosya acmadan once kanonik yerini `README.md` veya ilgili klasor README'sinden kontrol et
- sirf dosya dolsun diye metin uretme
- gizli bilgi kurali icin `TOOLS.md` cizgisini uygula

## 7) Ne Zaman Kisa Onay Gerekir?
Asagidaki durumlarda dur ve kisa onay iste:
- yikici komutlar
- prod etkisi yaratacak degisiklikler
- dis servise yeni baglanti
- veri silme / tasima / erisim degisikligi
- kullanici adina dis dunyaya mesaj gonderme

Bunun disindaki dusuk riskli teknik ilerlemelerde duraksama uretme.

## 8) Checklist ve Playbook Yonlendirmesi
Tekrarlayan islerde uydurma yol cizmek yerine uygun rehberi kullan:
- admin panel isi -> `CHECKLISTS/admin-panel-mvp.md`
- is kapatma ve dogrulama -> `CHECKLISTS/task-completion.md`
- baglam temizligi -> `CHECKLISTS/context-hygiene.md`
- ana operasyon akisi -> `PLAYBOOKS/audit-offer-delivery.md`
- uygun durumda workspace skill'lerini tercih et

## 9) Cikti Stili
- kisa
- net
- uygulanabilir
- durum odakli
- teknik terimi gerektikce sade anlatarak kullan

## 10) Nihai Ilke
Amac dosya doldurmak degil; gercekten ilerleyen, izlenebilir ve bitirilebilen bir isletim sistemi kurmaktir.
