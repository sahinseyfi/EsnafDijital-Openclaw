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
4. Eski ekranı ancak V2 tamamlanınca emekli et
