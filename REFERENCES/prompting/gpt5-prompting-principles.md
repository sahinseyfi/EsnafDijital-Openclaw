# GPT-5 Prompting Principles Reference

Bu dosya, Prompt Üretimi prompt uretimi icin calisma referansidir.
Ham kaynak degil, uygulanabilir ozet tutulur.

## Kaynak
- OpenAI GPT-5 Prompting Guide: https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide
- Raw notebook source: https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/gpt-5/gpt-5_prompting_guide.ipynb

## Prompt Üretimi icin uygulanacak ana ilkeler
1. Gorevi tek ve net tanimla.
   - Tek prompt tek is istesin.
   - Ajanin ne uretmesi gerektigi ilk kisimda acik olsun.

2. Baglami sec, dump etme.
   - Tum dosyalari veya tum notlari verme.
   - Sadece gorevi degistiren baglami sec.
   - Baglam maddeleri kisa, secili ve amaca bagli olsun.

3. Cikti kontratini acik ver.
   - Beklenen cikti tipi net olsun: liste, plan, JSON, karar cercevesi, teklif vb.
   - Belirsiz ve yumusak yonlendirme yerine olculebilir beklenti yaz.

4. Yapilandirilmis ama kisa kal.
   - Uzun teori yerine net bolumler kullan.
   - Tercih edilen cekirdek bolumler: amac, baglam, gorev, sinirlar, beklenen cikti.

5. Repo ve runtime gercegine bagla.
   - Prompt genel danismanlik metni gibi kalmasin.
   - Gerekli yerde repo linkleri, dosya yuzeyleri ve VPS/OpenClaw runtime gercegi acikca verilsin.

6. Uydurma kesinlik uretme.
   - Eksik kritik bilgi varsa bunu belirt.
   - Varsayim gerekiyorsa etiketle.
   - Eksigi gizleyip yapay netlik kurma.

7. Aracsal ve uygulanabilir yaz.
   - Prompt okuyan ajan hemen ne yapacagini anlamali.
   - Genel framework anlatisi, pazarlama dili veya gereksiz sistem tasarimi anlatisi ekleme.

8. Iteration icin fail-closed dusun.
   - Repo referansi yoksa
   - Somut gorev yoksa
   - Beklenen cikti net degilse
   - Prompt hazir sayilmasin.

## Prompt Üretimi icin anti-patternler
- Genel strateji yazip repo gercegine inmemek
- Tum prompt kaydi gecmisini prompta basmak
- Tek promptta birden fazla farkli is istemek
- Cikti tipini acik tanimlamamak
- Kucuk isletme / sade MVP / dusuk operasyon yuku cizgisini kaybetmek
- Sadece teori verip uygulanacak karari vermemek

## Kisa uygulama notu
Bu referans dogrudan kullaniciya gosterilecek prompt degil.
Promptu ureten skill veya agent icin arka-plan cizgisi olarak kullanilir.
