# 2026-04-19 Brand + Design System Kararı

Bu dosya, `/root/.openclaw/Tasarım Sistemi ve Marka Kimliği.txt` içeriğinin kalıcı ve uygulanabilir karar özetidir.

## Kaynak
- Tam kaynak kopyası: `REFERENCES/2026-04-19-tasarim-sistemi-ve-marka-kimligi-source.txt`
- Bu dosya, gelecekte landing page, admin panel ve ortak UI kararlarında ana referanstır.

## 1) Marka Çekirdeği
- Marka özü: küçük işletmeler için sade ve işe yarayan dijital düzen
- Marka vaadi: karmaşık ajans dili olmadan, hızlı anlaşılır ve güven veren dijital çözüm
- Hissiyat: kurumsal ama soğuk değil, profesyonel ama esnaf dostu, modern ama gösterişsiz
- Kaçınılacak algı: steril SaaS, neon startup estetiği, ağır jargon, kalabalık dashboard dili
- Ana cümle: `İşletmeniz için sade dijital düzen.`

## 2) Tasarım İlkeleri
1. Önce anlaşılırlık
2. Önce güven
3. Önce erişilebilirlik
4. Önce sadelik

Uygulama kuralları:
- Her ekranda tek ana aksiyon net görünmeli
- Bilgi yoğunluğu kontrollü olmalı
- Placeholder, label yerine geçmemeli
- Grafik yerine önce net sayı ve durum kartları kullanılmalı
- Mobilde kritik akışlar tek kolon kalmalı

## 3) Renk Sistemi
### Brand
- `brand-50`: `#EFF6FF`
- `brand-100`: `#DBEAFE`
- `brand-200`: `#BFDBFE`
- `brand-500`: `#2563EB`
- `brand-600`: `#1D4ED8`
- `brand-700`: `#1E40AF`

### Accent
- `accent-50`: `#F0FDFA`
- `accent-100`: `#CCFBF1`
- `accent-200`: `#99F6E4`
- `accent-500`: `#14B8A6`
- `accent-600`: `#0D9488`
- `accent-700`: `#0F766E`

### Surfaces
- `canvas`: `#F8FAFC`
- `surface`: `#FFFFFF`
- `surface-subtle`: `#F1F5F9`

### Text
- `ink-title`: `#0F172A`
- `ink-body`: `#334155`
- `ink-secondary`: `#475569`
- `ink-muted`: `#64748B`
- `ink-disabled`: `#94A3B8`
- `ink-inverse`: `#FFFFFF`

### Lines
- `line`: `#E2E8F0`
- `line-strong`: `#CBD5E1`

### Semantic
- success: fill `#15803D`, text `#166534`, bg `#F0FDF4`, border `#BBF7D0`
- danger: fill `#DC2626`, text `#991B1B`, bg `#FEF2F2`, border `#FECACA`
- warning: fill `#B45309`, text `#92400E`, bg `#FFFBEB`, border `#FDE68A`
- info: fill `#0369A1`, text `#075985`, bg `#F0F9FF`, border `#BAE6FD`

## 4) Tipografi
- Tek aile: `Inter`
- Heading: `600/700`
- Body: `400/500`
- Button/label: `600`
- Sayısal alanlar: `tabular-nums`

### Ölçek
- `display`: 48/56 700
- `h1`: 40/48 700
- `h2`: 32/40 700
- `h3`: 24/32 600
- `h4`: 20/28 600
- `body-lg`: 18/30 400
- `body`: 16/26 400
- `body-sm`: 14/22 400
- `label`: 14/20 600
- `caption`: 13/18 500
- `button`: 15/20 600

## 5) Geometri ve Hareket
- Buton / input radius: `12px`
- Kart / modal radius: `16px`
- Badge / chip: `9999px`
- Hover: ton koyulaşması + hafif shadow artışı
- Active: zıplama yok, shadow azalır
- Transition: `150–180ms`
- Focus ring: görünür, `4px`, brand temelli
- Minimum tıklanabilir alan: `44x44`
- Form ve ana aksiyon yüksekliği: `48px`

## 6) Kart, Form ve İkon Kuralları
- Kart yaklaşımı: border-first, shadow-second
- Kart shadow:
  - `shadow-soft`: `0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)`
  - `shadow-soft-hover`: `0 2px 6px rgba(15,23,42,0.08), 0 14px 32px rgba(15,23,42,0.10)`
- Input/select/textarea:
  - beyaz zemin
  - `line-strong` border
  - focus: `brand-600` border + `brand-100` ring
  - error: danger border + açık hata metni
- İkonografi: varsayılan `line-first`
- Solid ikon yalnızca aktif nav, kritik uyarı veya dolu badge için
- İkon tek başına anlam taşımamalı, özellikle panelde ikon + yazı birlikte kullanılmalı

## 7) İçerik ve Mikro Metin Kuralları
- Hitap: saygılı ama yakın `siz`
- Kısa cümle
- Sonucu baştan söyle
- Kullanıcıyı suçlama
- Hata mesajı sırası: ne oldu + ne yapmalı + veri güvende mi
- Teknik terimleri sadeleştir

### Terim dönüşümleri
- Dashboard -> Panel
- Domain -> Site adresi
- Lead -> Müşteri talebi
- Analytics -> Ziyaret özeti
- Publish -> Yayına al
- Integration -> Bağlantı
- Configuration -> Ayar

### Ton örnekleri
- Başarı: `Bilgileriniz kaydedildi.`
- Başarı: `Çalışma saatleriniz güncellendi. Müşterileriniz yeni saatleri artık görebilir.`
- Hata: `Kaydederken bir sorun oluştu. Bilgileriniz kaybolmadı, lütfen tekrar deneyin.`

## 8) Sayfa ve Ürün Deseni
### Landing page sırası
1. Navbar
2. Hero
3. Trust strip
4. Hizmet kartları
5. Nasıl çalışır
6. Önce / sonra
7. Referanslar
8. Paketler
9. SSS
10. İletişim formu
11. Footer

### Dashboard sırası
- App shell
- Sidebar
- Topbar
- Page header
- Info banner
- Stat cards
- Settings sections
- Data table / empty state

### Ürün anlatımı
EsnafDigital üçlü omurga ile anlatılmalı:
1. Dijital Görünürlük Kontrolü
2. Güven Veren Dijital Vitrin
3. Bakım / Canlılık / Küçük Güncelleme

## 9) Bileşen Öncelik Seti
### Marketing MVP
- Button
- Navbar
- Hero
- ServiceCard
- StepCard
- PricingCard
- FAQAccordion
- ContactForm
- Footer

### Dashboard MVP
- AppShell
- Sidebar
- Topbar
- PageHeader
- StatCard
- Input / Select / Textarea
- SettingsSection
- DataTable
- EmptyState
- Toast
- Modal

## 10) Uygulama Notu
- Next.js + Tailwind + shadcn uyumlu yapı tercih edilecek
- Tailwind token isimleri bu dosyadaki renk isimleriyle birebir kalmalı
- Yeni ekran ve bileşenler, bu dil dışına taşmadan türetilecek
- Yeni sayfa tasarımında önce mevcut token ve component seti kullanılacak, yeni görsel dil icat edilmeyecek

## 11) Operasyonel Karar
Bugünden itibaren:
- landing page işleri bu marka/tasarım sistemiyle yapılır
- admin panel ekranları aynı renk, tipografi ve davranış çizgisini korur
- kopya metinlerde sade Türkçe ve jargon kaçınma zorunludur
- bir tasarım kararı bu sistemi bozuyorsa, önce bu dosyaya göre değerlendirilir
