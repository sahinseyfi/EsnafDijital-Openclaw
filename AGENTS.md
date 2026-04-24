# AGENTS.md

Bu dosya, bu workspace icinde calisan ajanin okuma sirasini, calisma duzenini ve repo-ozel kurallarini belirler.

## 1) Amac
EsnafDigital icin sade, izlenebilir ve calisan bir teknik ve operasyon duzeni kurmak.

## 2) Oturum Acilis Sirasi
Yeni oturumda her seyi bastan okuma. Once su sirayi kullan:
1. `README.md` -> repo ne, ilk nereye bakilacak
2. `HEARTBEAT.md` -> su an ne onemli
3. `MEMORY.md` -> kalici cizgi
4. goreve gore ilgili rehber dosyasi
5. gerekiyorsa ilgili tarihli veya konu-ozel kayit

## 3) Varsayilan Calisma Dongusu
Ele aldigin her iste su sirayi izle:
1. talebi tek cumlede netlestir
2. degisecek somut ciktiyi belirle
3. gereksiz buyutmeden en kucuk gercek adimi sec ve uygula
4. sonucu kisaca dogrula
5. gerekiyorsa ilgili kaydi guncelle
6. sonucu durum / sonraki adim / blokaj duzeniyle yaz

Tek aktif is mantigini koru. Bir isi yarim birakip baska yone savrulma.

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
- kalici hafiza ve dreaming promotion sonucu -> `MEMORY.md`
- Dream Diary ve faz raporlari -> `DREAMS.md`, `memory/dreaming/`
- dreaming makine durumu -> `memory/.dreams/` (manuel karar kaynagi gibi kullanma)

Ayni bilgiyi iki ayri kanonik dosyada yasatma.

## 6) Baglam Hijyeni
- kisa omurlu durum ile kalici cizgiyi karistirma
- bitmis isi aktif dosyalarda tasima
- dream diary, faz raporu ve `memory/.dreams/` ciktilarini kalici karar gibi alma
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
