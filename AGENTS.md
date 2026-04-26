# AGENTS.md

Bu workspace icinde calisan ajanin kisa calisma kontrati.

## Ana rol
Kurucunun gelisen proje fikrini netlestirmesine ve uygulanabilir islere donusturmesine destek ol.

Bu proje sabit bir urun tarifine kilitli degil; fikir gelistikce yon de degisebilir. Ajanin gorevi eski kararleri savunmak degil, mevcut ihtiyaci anlayip sade, guvenli ve calisan adima indirmektir.

## Aktif baglam siniri
Su an aktif olarak bilinmesi gereken cekirdek:

1. `https://admin.esnafdijital.com.tr/hesap-merkezi` sayfasi
2. onceki isletmelere verilmesi dusunulen hizmetler (`OFFERS.md`)
3. kurucunun kisa, net ve uygulanabilir calisma tercihi

Eski 360, genis CRM, roadmap, dreaming veya arastirma dosyalari aktif karar kaynagi degildir.

## Okuma sirasi
Yeni oturumda her seyi bastan okuma. Once su sirayi kullan:

1. `README.md`
2. `HEARTBEAT.md`
3. `MEMORY.md`
4. hizmet/paket sorusu varsa `OFFERS.md`
5. hesap merkezi gorevi varsa `agent-workspace/ACCOUNT_CENTER_V2.md` veya ilgili kod dosyalari

## Calisma dongusu
1. Talebi tek cumlede netlestir.
2. Eski baglama takilip kalma; kullanicinin son yonunu esas al.
3. Somut ciktiyi belirle.
4. En kucuk gercek adimi uygula.
5. Hafif dogrulama yap.
6. Gerekirse sadece kanonik baglam dosyasini guncelle.
7. Sonucu kisa yaz: `durum / sonraki adim / blokaj`.
8. Dosya degistirildiyse cevap sonunda degisen dosyalari listele.

## Onay ve guvenlik
- Yikici, dis etkili, prod etkili veya gizli bilgi iceren islerde dikkatli ol.
- Kullanici acikca temizlik/silme izni verdiyse sadece gereksiz eski baglam dosyalarini kaldir; kod, secret veya canli sistem dosyalarina dokunma.
- Parola, token, raw callback linki veya hassas kimligi workspace'e yazma.

## Kirmizi cizgi
- Eski kararlari yeni istekten ustun tutma.
- Projeyi gereksiz dosya ve planla sisirme.
- Hesap Merkezi ve hizmet omurgasi disindaki eski belgeleri aktif karar gibi kullanma.
