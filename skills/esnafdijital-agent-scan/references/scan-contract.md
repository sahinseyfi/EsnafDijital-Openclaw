# Agent Scan Contract

## 1. Girdi
Tek isletme bazli calis.
Minimum beklenen alanlar:
- isletme adi
- ilce veya konum ipucu
- varsa kategori
- varsa website
- varsa maps linki
- varsa onceki not

## 2. Beklenen cikti

### Durum
Asagidakilerden birini sec:
- `net`
- `supheli eslesme`
- `sinirli veri`

### Kisa ozet
2-4 cumlede genel durum.

### Bulgular
Kisa madde listesi. Tercih sirası:
- website durumu
- maps / arama gorunurlugu
- sosyal sinyal
- iletisim netligi
- guven / eksik sayfa sinyali

### Eksikler / riskler
Gercekten eksik olan seyleri yaz:
- website yok
- telefon net degil
- ayni isimli kayit riski
- kapali olabilir
- konum uyumsuz olabilir

### Onerilen sonraki adim
Tek bir sonraki adim oner:
- audit icin uygun
- once maps eslesmesi dogrulansin
- website vitrini teklifi uygun
- sosyal + website birlikte ele alinmali

## 3. Tarama derinligi
Varsayilan tarama hafif olmalı.
Su durumlarda derine in:
- resmi website var ama belirsiz
- maps kaydi supheli eslesiyor
- sosyal hesap ile website birbirini tutmuyor
- kurucu ozellikle detay istiyor

## 4. Yazim kurali
- Turkce yaz
- kisa yaz
- yorum ile gozlemi karistirma
- emin degilsen `muhtemel`, `gorunuyor`, `dogrulanmadi` de

## 5. Non-goals
- toplu lead listesi cikarma
- her platformu zorunlu tarama
- ham veri dump'i
- CRM benzeri uzun operasyon notu
