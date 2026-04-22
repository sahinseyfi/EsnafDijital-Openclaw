# Prompting Principles

## Kaynak cizgisi
- OpenAI GPT-5 Prompting Guide
- Consultation Center icin yalnizca uygulanabilir kismini kullan

## Uygulanacak ilkeler
1. Gorevi tek ve net tanimla.
2. Once cekirdek baglam ozetini kur, sonra gereken ikincil baglami sec; dump etme ve dosya sayisini yapay olarak sinirlama.
3. Beklenen cikti tipini acik ver.
4. Kisa ama yapilandirilmis kal.
5. Repo ve runtime gercegine bagla.
6. Eksik kritik bilgiyi uydurma.
7. Hedef modelin baglam ihtiyacini icerde dusun, final prompta oturum hafizasi veya baglam eksigi meta cumlesi olarak tasima.
8. Uygunsa teknik olmayan kisa ozeti JSON disinda, ayri bir ikinci bolum olarak iste.
9. finalPromptText'i dogrudan son prompt olarak yaz, sonradan template ile toparlanacak taslak gibi birakma.
10. Sabit rol, acik repo referansi ve uygulanabilir gorev tanimi kullan.
11. Citation, footnote veya markdown reference link kullanma; link gerekiyorsa dogrudan URL ver.
12. Promptu hemen uygulanabilir yaz.

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
- teori ve jargonla promptu sisirmek
- oturum hafizasi veya baglam eksigiyle ilgili meta cumleleri final prompta tasimak
- son prompt yerine kodun toparlayacagi yarim taslak uretmek
- repo linklerini veya runtime gercegini ima edip acik yazmamak
- baglami dosya sayisina gore yapay olarak daraltmak
- `[1]`, `[2]`, `([GitHub][1])` gibi atif/footnote stili kullanmak
