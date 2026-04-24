# 2026-04-19 - Prompt Uretimi v1

## Durum Notu
- Bu karar dosyasinin kanonik adi `Prompt Uretimi` cizgisine gore rename edildi.
- Eski `consultation-center` adlari artik aktif urun adi degil; repo icinde sadece uyumluluk/redirect izleri kalabilir.
- Ayri bir `Context Center` sayfasi guncel cizgide yoktur; baglam secimi dokuman akisi ve `Prompt Uretimi` icindeki referans secimiyle yurur.

## Karar
EsnafDigital icindeki bu yuzeyin adi `Prompt Uretimi` olacak.
Bu yuzeyin tek isi, kullanicinin verdigi daginik istegi netlestirip dogru baglamla kullanilabilir GPT promptu uretmektir.

## Rol Siniri
- **Baglam secimi = ayri bir urun yuzeyi degil; dokuman akisi ve Prompt Uretimi icindeki referans secimi**
- **Prompt Uretimi = prompt hazirlama**
- **Project OS / Businesses = uygulama ve operasyon takibi**

Prompt Uretimi su isi yapar:
1. ham istegi toparlar
2. eksik kritik alanlari gorunur eder
3. gerekli baglam referanslarini secer
4. hedef modele gore tek parca prompt uretir

Prompt Uretimi su isi yapmaz:
- GPT cevabi toplamaz
- cevap ozeti veya karar notu tutmaz
- aksiyon takibi yapmaz
- task / proje yonetimi olmaz
- genel not duvari gibi calismaz

## V1 Yuzey Kurali
Ekranda yalnizca su uc blok bulunur:
1. yeni prompt kaydi acma
2. secili kaydin metnini ve baglamini duzenleme
3. hazir promptu gorup kopyalama

## Veri Kurali
- prompt kaydi veri tabaninda tutulabilir
- promptun dayandigi sabit referanslar dosya tabanli baglamdan secilir
- dis GPT cevabi bu yuzeye geri yapistirilmaz

## Basari Olcutu
Bir kayit ancak su durumda tamam sayilir:
- prompt istegi netlesmistir
- gerekli baglam secilmistir
- kullaniciya gonderilecek prompt hazirdir

Bu yuzeyin isi burada biter.
