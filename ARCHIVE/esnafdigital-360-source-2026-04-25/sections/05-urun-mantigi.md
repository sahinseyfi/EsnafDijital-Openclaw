# 5. Ürün Mantığı

EsnafDigital 360 üç ana katmandan oluşur:

1. **İşletme dijital profili**
2. **İşletmeye özel gerçek OpenClaw agent/workspace**
3. **Bu agent'ı izleyen BusinessAgent kaydı**
4. **Modüler dijital hizmet sistemi**

## 5.1 İşletme Dijital Profili

Her işletmenin sistemde merkezi bir profili olur.

Bu profil şunları tutar:

- işletme adı,
- sektör,
- yetkili kişi,
- telefon,
- WhatsApp numarası,
- adres,
- çalışma saatleri,
- Google Maps linki,
- Instagram hesabı,
- web vitrini linki,
- yorum linki,
- online menü linki,
- randevu / rezervasyon linki,
- logo,
- fotoğraflar,
- hizmetler,
- ürünler,
- fiyat bilgileri,
- aktif modüller,
- bakım durumu,
- ödeme durumu,
- açık görevler,
- eksik bilgiler,
- son güncelleme tarihi.

## 5.2 BusinessAgent ve Gerçek OpenClaw İşletme Ajanı

Her işletmenin EsnafDigital içinde ayrı bir `BusinessAgent` kaydı olur.

Bu kayıt OpenClaw tarafında açılan gerçek işletme agent'ının EsnafDigital karşılığıdır. MVP’de `BusinessAgent` hafif profil değil; agentId, workspace yolu, şablon sürümü, izin profili, bağlı kanal/peer, oturum ve görev durumunu izleyen kayıt olarak tasarlanır.

Ajan şunları bilir:

- işletmenin kim olduğunu,
- hangi sektörde çalıştığını,
- hangi modüllerin aktif olduğunu,
- hangi bilgilerin eksik olduğunu,
- hangi işlerin müşteriden bilgi beklediğini,
- hangi işlerin operasyona aktarılması gerektiğini,
- hangi taleplerin otomatik yapılabileceğini,
- hangi işlemlerde onay gerektiğini.

Ajanın görevi sadece cevap vermek değildir.

Ajanın gerçek görevi:

- bilgi toplamak,
- müşteriyi yönlendirmek,
- eksikleri hatırlatmak,
- içerik taslağı üretmek,
- görev oluşturmak,
- işletme profilini güncellemek,
- web vitrini ve menü verilerini beslemek,
- bakım sürecini takip etmek,
- operasyon ekibine yapılacak işleri aktarmaktır.

## 5.3 Modüler Hizmet Sistemi

Ajan, sistemdeki tüm hizmet modüllerini yönetir veya tetikler.

Modüller ilk günden veri modelinde yer alır. Ancak hepsinin ilk günden tam otomatik olması gerekmez. Bazı modüller yazılımla, bazıları yarı otomatik, bazıları ise operasyon desteğiyle yürütülür.

Ana prensip:

> Tüm modüller sistemin parçası olarak tasarlanacak; otomasyon seviyesi zamanla artırılacak.

---
