# Design Tokens

## Renk sistemi
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

### Surface
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

### Line
- `line`: `#E2E8F0`
- `line-strong`: `#CBD5E1`

### Semantic
- success: fill `#15803D`, text `#166534`, bg `#F0FDF4`, border `#BBF7D0`
- danger: fill `#DC2626`, text `#991B1B`, bg `#FEF2F2`, border `#FECACA`
- warning: fill `#B45309`, text `#92400E`, bg `#FFFBEB`, border `#FDE68A`
- info: fill `#0369A1`, text `#075985`, bg `#F0F9FF`, border `#BAE6FD`

## Tipografi
- font ailesi: `Inter`
- heading: `600/700`
- body: `400/500`
- button/label: `600`
- metrikler: `tabular-nums`

## Tipografik ölçek
- `display`: `48/56 700`
- `h1`: `40/48 700`
- `h2`: `32/40 700`
- `h3`: `24/32 600`
- `h4`: `20/28 600`
- `body-lg`: `18/30 400`
- `body`: `16/26 400`
- `body-sm`: `14/22 400`
- `label`: `14/20 600`
- `caption`: `13/18 500`
- `button`: `15/20 600`

## Geometri
- buton/input: `12px`
- kart/modal: `16px`
- badge/chip: `9999px`

## Shadow
- `shadow-soft`: `0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)`
- `shadow-soft-hover`: `0 2px 6px rgba(15,23,42,0.08), 0 14px 32px rgba(15,23,42,0.10)`

## Motion
- transition: `150–180ms`
- hover: ton koyulaşması + hafif shadow artışı
- active: shadow azalır, zıplama yok
- focus: görünür `4px` ring

## Kullanım notları
- arayüzün ana ağırlığı nötr yüzeylerde kalmalı
- `ink-disabled` sadece gerçekten pasif durumlarda kullanılmalı
- placeholder, label yerine geçmemeli
- destructive aksiyonlar yalnızca danger tonu ile işaretlenmeli
