# Degisiklik Ozeti

Bu pakette ajanin daha duzgun is tamamlamasi icin su degisiklikler yapildi:

## 1) Ajanin calisma bicimi netlestirildi
Ajanin her istekte izlemesi gereken sade bir yol eklendi:
- istegi netle
- en kucuk gercek adimi at
- sonucu dogrula
- gerekiyorsa kaydi guncelle
- done / next / blocker olarak don

## 2) Bitirmeden bitmis sayma kapisi eklendi
Sadece "bakiyorum" veya "hemen yapiyorum" gibi ara cumleler yeterli sayilmaz.
Gercek cikti ve kisa dogrulama olmadan is tamamlanmis kabul edilmez.

## 3) Baglam daha temiz hale getirildi
- `HEARTBEAT.md` kisaltildi
- `MEMORY.md` daha kalici cizgiye cekildi
- gunluk memory dosyalarindaki tekrarlar temizlendi
- ayni bilginin farkli yerlere dagilmasi azaltildi

## 4) Hassas bilgi temizligi yapildi
Workspace icinde kalmamasi gereken gizli degerler ayiklandi.
Bu repo artik referans ve operasyon baglami tasiyor; gizli deger tasimiyor.

## 5) Tekrarlayan isler icin hazir rehberler eklendi
- gorev kapatma checklist'i
- baglam temizligi checklist'i
- proje akis playbook'u
- workspace skill'leri

## 6) Git'e uygunluk iyilestirildi
Kok `.gitignore` dosyasi genisletildi; env, log ve build artifaktlarinin repo'ya sizma riski azaltildi.
