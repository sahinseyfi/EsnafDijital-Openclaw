---
name: esnafdijital-context-hygiene
description: Use when updating MEMORY, HEARTBEAT, or daily logs in EsnafDigital. Keeps active context short, removes duplicates, and keeps secrets out of the workspace.
---

# EsnafDigital Context Hygiene

Bu skill, workspace baglamini temiz ve kullanisli tutmak icin kullanilir.

## Amac
- aktif dosyalari kisa tutmak
- kalici bilgi ile gunluk notu ayirmak
- tekrar eden satirlari temizlemek
- gizli bilgiyi workspace disinda tutmak

## Dosya yerlesim mantigi
- `HEARTBEAT.md` -> su anki aktif odak
- `MEMORY.md` -> kolay degismeyen karar cizgisi
- `memory/YYYY-MM-DD.md` -> tarihlenmis gelismeler

## Uygulama kurallari
1. Ayni bilgiyi farkli dosyalara gereksiz kopyalama.
2. Bitmis isleri aktif dosyalarda tutma.
3. Uzun tekrarli talimatlari checklist / playbook / skill'e tasi.
4. Parola, token, raw account id ve benzeri hassas degerleri ayikla.
5. `HEARTBEAT.md` kisa ve aktif odakli kalsin.

## Kapatma kontrolu
`CHECKLISTS/context-hygiene.md` maddelerini tek tek gec.
