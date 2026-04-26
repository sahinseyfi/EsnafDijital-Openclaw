# MEMORY.md

Bu dosya sadece kolay degismeyecek aktif cizgiyi tutar.

## 1) Aktif proje niyeti
- Kurucunun bir proje yapma amaci var; proje basladi ama fikir halen gelisiyor.
- Ajanin ana rolu, bu gelisen fikri netlestirmede ve uygulanabilir hale getirmede kurucuya destek olmaktir.
- Eski kararlar yeni yonu kilitlemez. Son kullanici yonu esas alinir.
- Gereksiz eski baglam, 360/roadmap/dreaming/arastirma kalabaligi aktif karar kaynagi degildir.

## 2) Bilinmesi gereken aktif urun yuzeyi
- Oncelikli admin sayfasi: `https://admin.esnafdijital.com.tr/hesap-merkezi`
- Kod yolu: `agent-workspace/app/hesap-merkezi/page.tsx`
- Ana component: `agent-workspace/components/account-center/AccountCenter.tsx`
- Servis: `agent-workspace/lib/account-center/service.ts`
- Sayfanin amaci: kimlik dogrulama/profil sisteminin sade baslangic ekrani; gercek hesap kaydi, gorunen operator adi, aktif profil, kullanim limitleri, profil ekleme/silme/degistirme ve kisa not/meta iliskisini yonetir.

## 3) Onceki isletmelere verilmek istenen hizmetler
Kanonik ozet `OFFERS.md` icindedir. Kisa omurga:

### Paket 0 - Dijital Gorunurluk Kontrolu
- Google Maps/profil gorunumu
- temel bilgi tutarliligi
- yorum/puan gorunumu
- website ve Instagram ilk guven kontrolu
- kritik eksik listesi ve uygun paket yonlendirmesi

### Paket 1 - Temel Dijital Varlik
- Google isletme profili duzeni
- `isletmeadi.esnafdijital.com.tr` temel web vitrini
- gerekiyorsa destekleyici temel logo/kartvizit dokunusu

### Paket 2 - Gorunurluk Plus
- Paket 1 kapsami
- Yandex ve Apple Maps kaydi
- temel QR yorum isteme akisi

### Paket 3 - Guclu Dijital Kimlik
- Paket 2 kapsami
- Instagram profil duzeni
- NFC yorum isteme akisi

### Paket 4 - Duzenli Icerik
- haftalik Instagram icerik paylasimi
- temel icerik duzeni
- sosyal yuzeyin bos kalmamasi

### Bakim - Guncel Tutma / Canlilik
- harita bilgileri, telefon/saat/adres duzeltmeleri
- site uzerindeki kucuk guncellemeler
- temel gorsel/bilgi yenilemeleri
- gorunurluk ve yorum akisina kisa kontrol

### Opsiyonel ekler
- ozel domain baglama
- ek kartvizit varyasyonu
- ek yorum materyali
- kucuk sosyal medya duzenlemesi

## 4) Calisma ilkeleri
- Kisa, net, uygulanabilir cevap ver.
- Fikir gelisiyorsa once netlestir, sonra somut adima indir.
- Eski dosyalari yeni karardan daha onemli sayma.
- Kod veya dosya degistirince hafif dogrulama yap.
- Dosya degistirildiyse cevap sonunda degisen dosyalari listele.
- Gizli bilgi workspace'e yazilmaz.
