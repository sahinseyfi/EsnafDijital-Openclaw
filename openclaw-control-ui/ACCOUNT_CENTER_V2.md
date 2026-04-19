# Hesap Merkezi V2

Bu dosya sadece yeni auth/profil sistemi içindir.

## Amaç
Kullanıcının gerçekten neye sahip olduğunu net göstermek:
- gerçek auth kaydı
- aktif/current profil
- operator görünen adı
- teknik kimlik (`accountId`, `profileId`)

## Kapsam dışı
- Project OS
- Context Center
- Consultation Center
- eski `/codex-profilleri` ekranının kavramsal yükü

## Çekirdek dil
- Bir satır = gerçek auth kaydı
- Görünen ad = operator etiketi
- Account ID = teknik kimlik
- Current = bu oturumda aktif olan profil

## V2 inşa sırası
1. Gerçek kayıtları temiz ve dürüst göster
2. Yeni auth akışını bu modele göre yeniden kur
3. Switch / delete / rename davranışını bu modelin üstüne ekle
4. Prod doğrulamasını helper ile netleştir
5. Eski ekranı ancak V2 tamamlanınca emekli et

## Doğrulama
- Yerel/prod kontrol helper'ı: `bin/verify-hesap-merkezi-v2`
- npm kısayolu: `npm run verify:hesap-merkezi-v2`
- Varsayılan hedef: `http://127.0.0.1:3012`
- İstenirse özel base URL verilebilir: `./bin/verify-hesap-merkezi-v2 http://127.0.0.1:4013`
