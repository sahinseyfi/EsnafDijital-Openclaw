# TOOLS.md

Bu dosya teknik ortam ve aktif uygulama referansini kisa tutar.

## Ana Ortam
- Ana calisma alani: VPS uzerindeki bu repo
- Admin uygulamasi: `agent-workspace/`
- Aktif oncelikli sayfa: `https://admin.esnafdijital.com.tr/hesap-merkezi`
- Hesap Merkezi route: `agent-workspace/app/hesap-merkezi/page.tsx`
- Hesap Merkezi ana component: `agent-workspace/components/account-center/AccountCenter.tsx`
- Hesap Merkezi servis: `agent-workspace/lib/account-center/service.ts`

## Varsayilan Teknik Yigin
- Web / admin: Next.js
- Veritabani: Postgres / Prisma kullanimi varsa mevcut uygulama yapisina gore ilerle
- Baglam: Markdown
- Kucuk otomasyon: sadece gercek ihtiyac varsa basit script/job

## Aktif Teknik Ilke
- Once mevcut kod ve mevcut stack icinde cozum ara.
- Yeni servis veya agir mimari ekleme.
- Hesap Merkezi veya hizmet omurgasi disindaki eski referanslari aktif karar gibi kullanma.
- Kod degisikliginde en kucuk anlamli test/build/lint veya dogrudan dosya kontrolu yap.

## Gizli Bilgi Kurali
- Parola, token, OAuth callback, raw account id, signed URL veya hassas kimlik workspace'e yazilmaz.
- Gerekiyorsa sadece dosya yolu, route veya kavramsal referans yazilir.
- Gercek gizli degerler env, sistem state'i veya parola yoneticisinde kalir.

## Operasyon Notu
Servis, port, systemd, deploy ve canli yayin detaylari gerekiyorsa `OPERATIONS.md` veya `agent-workspace/README.md` kontrol edilir.
