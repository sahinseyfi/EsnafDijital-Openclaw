# Prompting Principles

## Uygulanacak ilkeler
1. Gorevi tek ve net tanimla.
2. Once cekirdek baglam ozetini kur, sonra gereken ikincil baglami sec. Dump etme.
3. Beklenen cikti tipini acik ver.
4. Kisa ama yapilandirilmis kal.
5. Dosya veya skill degerlendirme gorevlerinde once karar ver, sonra sadece gereken yerde degisiklik oner.
6. Dis GPT oturumunda repo analizi gerekiyorsa, final prompt dis GPT'yi repo icerigini gercekten incelemeye yonlendirsin. Bu da mumkun degilse acik bosluk veya blokaj yazdirsin.
7. Repo ve runtime gercegine bagla.
8. Eksik kritik bilgiyi uydurma.
9. Hedef modelin baglam ihtiyacini icerde dusun, final prompta oturum hafizasi veya baglam eksigi meta cumlesi olarak tasima.
10. Uygunsa teknik olmayan kisa ozeti JSON disinda, ayri bir ikinci bolum olarak iste.
11. finalPromptText'i dogrudan son prompt olarak yaz, sonradan template ile toparlanacak taslak gibi birakma.
12. Sabit rol ve uygulanabilir gorev tanimi kullan.
13. `https://github.com/sahinseyfi/EsnafDijital-Openclaw` referansi finalPromptText icinde her zaman gecsin.
14. `https://github.com/openclaw/openclaw` referansini runtime, upstream davranisi veya OpenClaw siniri gorevi etkiliyorsa ekle.
15. Citation, footnote veya markdown reference link kullanma, link gerekiyorsa dogrudan URL ver.
16. Promptu hemen uygulanabilir yaz.

## Tercih edilen prompt omurgasi
- rol
- amac
- secili baglam
- gorev
- sinirlar
- beklenen cikti
- JSON disi kisa teknik olmayan ozet bolumu

## Final prompt checklist
Promptu hazir saymadan once sunlari kontrol et:
- prompt tek bir is istiyor mu
- cekirdek baglam ozeti kurulmus mu
- secili baglam istenen degisikligi guvenle kurmaya yetecek kadar genis mi
- karari etkilemeyen tekrarlar prompta tasinmamis mi
- beklenen cikti tipi acik mi
- sinirlar ve basari kosulu yazili mi
- gerekiyorsa teknik olmayan kisa ozet istegi JSON disinda ayri bir bolum olarak var mi
- finalPromptText dogrudan kullanilacak son prompt gibi mi
- contextRefs en fazla 4 ogeye dusurulmus mu
- `https://github.com/sahinseyfi/EsnafDijital-Openclaw` geciyor mu
- runtime veya upstream baglami gercekten gerekiyorsa `https://github.com/openclaw/openclaw` geciyor mu

## Hazir saymama durumlari
- prompt fazla genel kalmissa
- repo/runtime baglami eksikse
- kullanilacak cikti bicimi net degilse
- dosya degerlendirme gorevi toplu rewrite moduna kayiyorsa
- baglam yapay olarak dar tutulup kritik kaynaklar disarida kalmissa
- gereksiz teori promptun agirligini artiriyorsa
- eksik kritik bilgi saklaniyorsa
- oturum hafizasi veya baglam eksigiyle ilgili meta cumleler final promptta geciyorsa
- `[1]`, `[2]`, `([GitHub][1])` gibi atif veya footnote stili geciyorsa

## Anti-patternler
- genel strateji yazip uygulamaya inmemek
- tum consultation tarihcesini basmak
- tek promptta birden fazla is istemek
- cikti tipini acik tanimlamamak
- dosya degerlendirme gorevini butun dosyalari rewrite etmeye zorlamak
- teori ve jargonla promptu sisirmek
- dis GPT oturumunda repo analizi isterken repo incelemesini bizim ajan yapacakmis gibi belirsiz yazmak
- dis GPT oturumunda repo analizi isterken repo icerigini incelemeden kesin konusmak
- son prompt yerine kodun toparlayacagi yarim taslak uretmek
- repo linklerini veya runtime gercegini ima edip acik yazmamak
