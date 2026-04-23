# Prompting Principles

## Uygulanacak ilkeler
1. Ham notu once parcala ve tek bir `primaryTask` sec.
2. Varsayilan olarak tek prompt uret, diger basliklari `secondaryTasks` ve `parkedQuestions` alanlarina ayir.
3. Ancak gercekten bagimsiz iki is varsa `promptStrategy` alanini `split_recommended` yap, yine de otomatik iki prompt uretme.
4. Once cekirdek baglam ozetini kur, sonra gereken ikincil baglami sec. Dump etme.
5. Beklenen cikti tipini acik ver.
6. Kisa ama yapilandirilmis kal.
7. Dosya veya skill degerlendirme gorevlerinde once karar ver, sonra sadece gereken yerde degisiklik oner.
8. Dis GPT oturumunda repo analizi gerekiyorsa, final prompt dis GPT'yi repo icerigini gercekten incelemeye yonlendirsin. Bu da mumkun degilse acik bosluk veya blokaj yazdirsin.
9. Repo ve runtime gercegine bagla.
10. Eksik kritik bilgiyi uydurma.
11. Hedef modelin baglam ihtiyacini icerde dusun, final prompta oturum hafizasi veya baglam eksigi meta cumlesi olarak tasima.
12. Uygunsa teknik olmayan kisa ozeti JSON disinda, ayri bir ikinci bolum olarak iste.
13. finalPromptText'i dogrudan son prompt olarak yaz, sonradan template ile toparlanacak taslak gibi birakma.
14. Sabit rol ve uygulanabilir gorev tanimi kullan.
15. `https://github.com/sahinseyfi/EsnafDijital-Openclaw` referansi finalPromptText icinde her zaman gecsin.
16. `https://github.com/openclaw/openclaw` referansini runtime, upstream davranisi veya OpenClaw siniri gorevi etkiliyorsa ekle.
17. Citation, footnote veya markdown reference link kullanma, link gerekiyorsa dogrudan URL ver.
18. Promptu hemen uygulanabilir yaz.

## Tercih edilen prompt omurgasi
- rol
- amac
- secili baglam
- gorev
- sinirlar
- beklenen cikti
- JSON disi kisa teknik olmayan ozet bolumu

## Decomposition cizgisi
- once nottaki ayri isleri ve sorulari listele
- bu turda gercekten cozulecek `primaryTask` alanini sec
- prompt disinda kalacak ama kaybolmamasi gereken basliklari `secondaryTasks` alanina yaz
- bu turda hic acilmamasi gereken veya sonra ayrica ele alinacak sorulari `parkedQuestions` alanina yaz
- `whyPrimaryNow` alaninda neden bu isin one alindigini acikla
- `promptStrategy` varsayilan olarak `single_prompt` olsun
- `split_recommended` yalnizca tek prompta sikistirmak kaliteyi bozacak kadar bagimsiz coklu is varsa kullanilsin
- `finalPromptText` sadece `primaryTask` icin yazilsin

## Final prompt checklist
Promptu hazir saymadan once sunlari kontrol et:
- prompt tek bir is istiyor mu
- `primaryTask` net mi
- `secondaryTasks` ve `parkedQuestions` ayristirildi mi
- `finalPromptText` yalnizca `primaryTask` icin mi
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
- `primaryTask` disindaki isler final prompta sizdiysa
- oturum hafizasi veya baglam eksigiyle ilgili meta cumleler final promptta geciyorsa
- `[1]`, `[2]`, `([GitHub][1])` gibi atif veya footnote stili geciyorsa

## Anti-patternler
- genel strateji yazip uygulamaya inmemek
- tum prompt kaydi gecmisini basmak
- tek promptta birden fazla is istemek
- decomposition yapmadan genis notu dogrudan prompta cevirmek
- cikti tipini acik tanimlamamak
- dosya degerlendirme gorevini butun dosyalari rewrite etmeye zorlamak
- teori ve jargonla promptu sisirmek
- dis GPT oturumunda repo analizi isterken repo incelemesini bizim ajan yapacakmis gibi belirsiz yazmak
- dis GPT oturumunda repo analizi isterken repo icerigini incelemeden kesin konusmak
- son prompt yerine kodun toparlayacagi yarim taslak uretmek
- repo linklerini veya runtime gercegini ima edip acik yazmamak
