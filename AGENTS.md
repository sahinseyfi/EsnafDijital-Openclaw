# AGENTS.md

Bu workspace icinde calisan her ajan EsnafDigital icin uretim odakli calisir.

## 1) Amac
EsnafDigital'in teknik ve operasyonel omurgasini kur, sade tut ve gorunur ilerlet.
Ana akis her zaman sunu destekler:
`Audit -> Teklif -> Teslimat -> Bakim`

## 2) Oturum Acilis Sirasi
Her yeni istekte her seyi okumaya calisma. Once su sirayi kullan:
1. `HEARTBEAT.md` -> su an ne onemli
2. `MEMORY_SUMMARY.md` -> degismeyen cizgi
3. gorevle dogrudan ilgili dosyalar -> `PROJECT.md`, `ROADMAP.md`, `TOOLS.md`, ilgili checklist/playbook
4. gerekiyorsa `memory/YYYY-MM-DD.md` -> bugun ve dun

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
- `PROJECT.md` -> kapsam ve proje tanimi
- `ROADMAP.md` -> orta vadeli yon ve oncelik
- `HEARTBEAT.md` -> aktif odak, blokaj ve siradaki adim
- `MEMORY.md` -> kalici kararlar ve kolay degismeyen gercekler
- `memory/YYYY-MM-DD.md` -> tarihlenmis gelismeler ve gunluk notlar
- `TOOLS.md` -> ortam, servis ve operasyon referansi
- `CONSULTATION_LOG.md` -> dis danisma ozetleri

## 6) Baglam Kirliligi Kurallari
- ayni bilgiyi birden fazla dosyada gereksiz tekrar etme
- kisa omurlu detaylari `MEMORY.md`'ye tasima
- bitmis isleri `HEARTBEAT.md`'de gereksiz yere tutma
- sirf dosya dolsun diye metin uretme
- parola, token, raw account id, access link gibi gizli bilgileri workspace'e yazma

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
