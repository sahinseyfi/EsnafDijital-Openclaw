# Grounding Checklist

Promptu hazir saymadan once sunlari kontrol et:

## Zorunlu grounding
- repo gercegi var mi
- uygulama reposu linki var mi
- OpenClaw upstream linki var mi
- VPS uzerinde calisan OpenClaw ajani baglami var mi
- gorev mevcut Consultation Center akisina bagli mi
- sabit rol net mi
- eger hedef dis GPT oturumuysa ve gorev repo analizi gerektiriyorsa erisim mumkunken clone veya esdeger repo incelemesi gercekten yapildi mi

## Zorunlu netlik
- prompt tek bir is mi istiyor
- once cekirdek baglam ozeti kurulmus mu
- dosya veya skill degerlendirmesinde `keep | trim | rewrite` benzeri karar cizgisi net mi
- secili baglam istenen degisikligi guvenle kurmaya yetecek kadar genis mi
- karari etkilemeyen tekrarlar prompta tasinmamis mi
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
- dis GPT oturumunda repo analizi istenirken erisim mumkunken clone veya esdeger repo incelemesi hic yapilmadiysa
- dosya degerlendirme gorevi toplu rewrite moduna kayiyorsa
- baglam yapay olarak dar tutulup kritik kaynaklar disarida kalmissa
- gereksiz teori promptun agirligini artiriyorsa
- eksik kritik bilgi saklaniyorsa
- oturum hafizasi veya baglam eksigiyle ilgili meta cumleler final promptta geciyorsa
- `[1]`, `[2]`, `([GitHub][1])` gibi atif veya footnote stili geciyorsa
