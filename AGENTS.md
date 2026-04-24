# AGENTS.md

Bu dosya, bu workspace icinde calisan ajanin okuma sirasini, calisma duzenini ve repo-ozel kurallarini belirler.

## 1) Amac
EsnafDigital'in teknik ve operasyonel omurgasini sade, izlenebilir ve ilerleyen bir yapi olarak kurmak ve surdurmek.
Proje omurgasi ve ana is akis referansi `PROJECT.md` ile `MEMORY.md` cizgisinde tutulur.

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
Bir isi bitmis saymak icin:
- gercek bir cikti, dosya veya ekran degismis olmali
- en az bir hafif dogrulama yapilmis olmali
- gerekiyorsa ilgili baglam dosyasi guncellenmis olmali
- sonuc `done / next / blocker` duzeniyle kapatilmali

Detayli kapanis kontrolu icin `CHECKLISTS/task-completion.md` kullan.
Sadece `bakiyorum`, `bir saniye`, `hemen test ediyorum` gibi placeholder ilerleme cumleleri cikti sayilmaz.

## 5) Dogru Yere Yaz
Bilgiyi once dogru kanonik yere koy.
- kok kaynak haritasi ve dosya rolleri -> `README.md`
- tarihli not ve adlandirma kurallari -> `memory/README.md`
- karar kaydi kurallari -> `DECISIONS/README.md`

Ayni bilgiyi iki ayri kanonik dosyada yasatma.

## 6) Baglam Hijyeni
- kisa omurlu durum ile kalici cizgiyi karistirma
- bitmis isi aktif dosyalarda tasima
- drift gordugunde yeni dosya acmadan once dogru kanonik yeri bul

Detayli kontrol icin `CHECKLISTS/context-hygiene.md` kullan.

## 7) Ne Zaman Kisa Onay Gerekir?
Asagidaki durumlarda dur ve kisa onay iste:
- yikici komutlar
- prod etkisi yaratacak degisiklikler
- dis servise yeni baglanti
- veri silme / tasima / erisim degisikligi
- kullanici adina dis dunyaya mesaj gonderme

Bunun disindaki dusuk riskli teknik ilerlemelerde duraksama uretme.

## 8) Checklist ve Playbook Yonlendirmesi
Tekrarlayan islerde uydurma yol cizmek yerine uygun rehberi kullan.
- admin panel isi -> `CHECKLISTS/admin-panel-mvp.md`
- is kapatma ve dogrulama -> `CHECKLISTS/task-completion.md`
- baglam temizligi -> `CHECKLISTS/context-hygiene.md`
- ana operasyon akisi -> `PLAYBOOKS/kesif-teklif-teslimat-bakim.md`
- uygun durumda workspace skill'lerini tercih et
