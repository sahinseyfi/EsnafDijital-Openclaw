# Grounding Checklist

Promptu hazir saymadan once sunlari kontrol et:

## Zorunlu grounding
- repo gercegi var mi
- uygulama reposu linki var mi
- OpenClaw upstream linki var mi
- VPS uzerinde calisan OpenClaw ajani baglami var mi
- gorev mevcut Consultation Center akisina bagli mi
- sabit rol net mi

## Zorunlu netlik
- prompt tek bir is mi istiyor
- secili baglam en fazla 3-5 oge mi
- beklenen cikti tipi acik mi
- sinirlar ve basari kosulu yazili mi
- gerekiyorsa teknik olmayan kisa ozet istegi JSON disinda ayri bir bolum olarak var mi
- oturum hafizasi veya baglam eksigi meta cumlesi prompta yazilmamis mi
- citation/footnote veya markdown reference atif stili yok mu
- finalPromptText dogrudan kullanilacak son prompt gibi mi
- contextRefs en fazla 4 ogeye dusurulmus mu

## Hazir saymama durumlari
- prompt fazla genel kalmissa
- repo/runtime baglami yoksa
- kullanilacak cikti bicimi net degilse
- gereksiz teori promptun agirligini artiriyorsa
- eksik kritik bilgi saklaniyorsa
- oturum hafizasi veya baglam eksigiyle ilgili meta cumleler final promptta geciyorsa
- `[1]`, `[2]`, `([GitHub][1])` gibi atif veya footnote stili geciyorsa
