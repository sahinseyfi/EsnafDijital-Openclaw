# Consultation: Admin bilgi mimarisi repo-gercegi ayrimi

## Tarih
2026-04-21

## Amac
Dis GPT cikrisini repo gercegine gore ayirip kanonik yerlere dagitmak ve sonraki urun patch sirasi icin temiz bir Faz 1 / Faz 2 cizgisi cikarmak.

## Kaynak
Kullanici tarafindan paylasilan dis analiz metni.

## Onemli not
Dis analiz icinde `openclaw-control-ui` uygulama adi ve dosya yollari geciyor.
Current workspace icinde fiili kod yolu `agent-workspace/` altindadir.
Bu yuzden asagidaki kayit, klasor adlarini bire bir gercek kabul etmek icin degil, urun yuzeyi ve bilgi mimarisi onerisini repo gercegiyle eslemek icin tutulur.

## Repo-gercegi ile dogrulanan noktalar
- Ana admin home bugun manifesto / yonlendirme agirlikli, operasyon kokpiti degil.
- `Project OS`, `Consultation Center`, `Context Center`, `Hesap Merkezi` cekirdek yuzeyler olarak zaten var.
- `Businesses`, `Audits`, `Offers`, `Delivery / Bakim` veri ve operasyon omurgasi olarak gercek, ama ilk fazda ayri top-level route olmak zorunda degil.
- `Project OS` bu dort operasyon nesnesinin tek omurga yuzeyi olmaya uygun.
- `Consultation Center` kirli not deposu degil, secili brief ve karar / action hatti olmali.
- `Context Center` aktif operasyon listesi degil, bilgi nereye yasar karar yuzeyi olmali.
- `Hesap Merkezi` sistem katmani olarak kalmali, ana operasyon yuzeyleriyle ayni agirlikta okunmamali.

## Ana surtunmeler
1. Home bugunku isi gostermek yerine sistemi anlatiyor.
2. Dashboard ile Project OS / Consultation / Context arasindaki gecisler yeterince aksiyon odakli degil.
3. Audit -> Teklif -> Teslimat -> Bakim hatti ana sayfada ilk bakista gorunmuyor.
4. Operasyon nesneleri route seviyesinde degilse bile bilgi mimarisinde ayriklasmali.
5. Consultation ve Context merkezlerinin ana akisa giris kurali daha belirgin olmali.

## Faz 1 cizgisi
### Simdi kayda alinacaklar
- Home sistem anlatisindan aktif is + kritik aksiyon yuzeyine cekilmeli.
- Home yalnizca kompakt hat ozeti, karar bekleyen is ozeti ve baglam eksigi sinyali vermeli.
- `Project OS`, businesses / audits / offers / delivery-bakim hattinin kanonik operasyon yuzeyi olmali.
- `Consultation Center` ve `Context Center` ana akistan cagrilan ikincil ama kritik karar yuzeyleri olarak konumlanmali.
- `Hesap Merkezi` ve `Codex Profilleri` ikincil / sistem tarafinda kalmali.

### Faz 1 kucuk uygulama sirasi
1. home hero -> aktif is + kritik aksiyon
2. home manifesto kartlarini kucult veya kaldir
3. home'a kompakt hat ozeti ekle
4. `Project OS` icinde asama bazli gorunurlugu artir
5. `Project OS` satir / kartlarina Consultation ve Context kisa yollari ekle

## Faz 2
- kanonik business detail drawer veya route
- audit scorecard gorunurlugu
- kaydedilmis filtreler / saved views
- consultation brief -> response -> action zincirini daha guclu hale getirme

## Bekleyebilir
- ayri top-level audits / offers / delivery route'lari
- trend / analytics dashboard
- agir otomasyon katmani

## Kanonik yerlere dagitim
- urun ve bilgi mimarisi ilkeleri -> `PROJECT.md`
- orta vadeli faz sirası -> `ROADMAP.md`
- aktif teknik odak ve sira -> `HEARTBEAT.md`
- bu detayli dis analiz -> bu consultation kaydi

## Net sonuc
En dogru Faz 1 cizgisi su: home bugunku isi gostermeli, `Project OS` ana operasyon omurgasi olmali, `Businesses / Audits / Offers / Delivery` ilk fazda `Project OS` icinde netlesmeli, `Consultation Center` ve `Context Center` ise ana akisin karar ve baglam uzantilari olarak calismali.
