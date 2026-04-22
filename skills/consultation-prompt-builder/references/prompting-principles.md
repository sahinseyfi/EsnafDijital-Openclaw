# Prompting Principles

## Kaynak cizgisi
- OpenAI GPT-5 Prompting Guide
- Consultation Center icin yalnizca uygulanabilir kismini kullan

## Uygulanacak ilkeler
1. Gorevi tek ve net tanimla.
2. Once cekirdek baglam ozetini kur, sonra gereken ikincil baglami sec; dump etme ve dosya sayisini yapay olarak sinirlama.
3. Beklenen cikti tipini acik ver.
4. Kisa ama yapilandirilmis kal.
5. Dosya veya skill degerlendirme gorevlerinde once karar ver, sonra sadece gereken yerde degisiklik oner.
6. Dis GPT oturumunda repo analizi gerekiyorsa, erisim mumkunse once repoyu klonla ve ilgili dosyalari dogrudan incele; clone mumkun degilse repo icerigini baska bir yolla incele; bu da mumkun degilse bunu acik bosluk veya blokaj olarak yaz.
7. Repo ve runtime gercegine bagla.
8. Eksik kritik bilgiyi uydurma.
9. Hedef modelin baglam ihtiyacini icerde dusun, final prompta oturum hafizasi veya baglam eksigi meta cumlesi olarak tasima.
10. Uygunsa teknik olmayan kisa ozeti JSON disinda, ayri bir ikinci bolum olarak iste.
11. finalPromptText'i dogrudan son prompt olarak yaz, sonradan template ile toparlanacak taslak gibi birakma.
12. Sabit rol, acik repo referansi ve uygulanabilir gorev tanimi kullan.
13. Citation, footnote veya markdown reference link kullanma; link gerekiyorsa dogrudan URL ver.
14. Promptu hemen uygulanabilir yaz.

## Tercih edilen prompt omurgasi
- rol
- amac
- secili baglam
- gorev
- sinirlar
- beklenen cikti
- JSON disi kisa teknik olmayan ozet bolumu

## Anti-patternler
- genel strateji yazip uygulamaya inmemek
- tum consultation tarihcesini basmak
- tek promptta birden fazla is istemek
- cikti tipini acik tanimlamamak
- dosya degerlendirme gorevini butun dosyalari rewrite etmeye zorlamak
- `keep | trim | rewrite` ayrimi gerekirken sadece toplu yeniden yazim istemek
- teori ve jargonla promptu sisirmek
- dis GPT oturumunda repo analizi isterken clone veya esdeger repo incelemesi yapmadan kesin konusmak
- oturum hafizasi veya baglam eksigiyle ilgili meta cumleleri final prompta tasimak
- son prompt yerine kodun toparlayacagi yarim taslak uretmek
- repo linklerini veya runtime gercegini ima edip acik yazmamak
- baglami dosya sayisina gore yapay olarak daraltmak
- `[1]`, `[2]`, `([GitHub][1])` gibi atif/footnote stili kullanmak
