# 2026-04-19 - Consultation Center v1

## Karar
Consultation Center, EsnafDigital içinde not toplama ekranı veya genel prompt ekranı olmayacak.

Net rol ayrımı:
- **Context Center = hafıza**
- **Consultation Center = karar hazırlama katmanı**
- **Project OS = uygulama katmanı**

Consultation Center v1'in işi:
1. dağınık konuyu karar brief'ine çevirmek
2. dış danışma gerekliliğini filtrelemek
3. gerekirse GPT Pro prompt'u üretmek
4. gelen cevabı kullanıcı işi / teknik iş / ortak karar olarak route etmek
5. kararı tekrar Context Center ve Project OS'e yazmak

## Neyi Yapmayacak?
- tüm notları burada biriktirmeyecek
- task/proje takibi olmayacak
- CRM'e kaymayacak
- tüm dosyaları prompt'a kör basmayacak
- her konuda GPT Pro açmayacak

## v1 Durum Modeli
- `draft`
- `clarifying`
- `goal_set`
- `context_ready`
- `blocked`
- `internal`
- `external`
- `ready_to_send`
- `answered`
- `actioned`

## Danışma Filtresi
Bir konu ancak şu şartlarda dış danışmaya gider:
- karar sorusu net
- neden şimdi var belli
- bağlam seçilmiş
- kısıtlar yazılmış
- beklenen çıktı tipi seçilmiş

Muhtemel route'lar:
- `blocked` -> önce içeride netleştir
- `internal` -> GPT Pro gerekmez, iç aksiyon aç
- `external` -> prompt üret ve danışma aç

## Brief Tipleri
### 1. Saha / satış brief
Alanlar:
- title
- decisionQuestion
- marketSegment
- region
- stage
- targetBusinessType
- fieldSignals
- commercialGoal
- mainObstacle
- constraints
- desiredOutput
- decisionDueAt

### 2. Teknik brief
Alanlar:
- title
- decisionQuestion
- affectedModule
- affectedRole
- currentProblem
- options
- technicalConstraints
- reversalCost
- desiredOutput
- acceptanceCriteria

### 3. Ortak karar brief'i
5 blok:
- karar çekirdeği
- ticari katman
- teknik katman
- bağlam paketi
- beklenen cevap

## Consultation Center v1 UI
### Ekranlar
1. **Consultation Inbox**
   - kayıt listesi
   - filtreler
   - sahiplik
   - route durumu
   - GPT Pro gerekli mi göstergesi

2. **Consultation Detail**
   - sol panel: brief alanları
   - sağ panel: context pack + karar filtresi + durum
   - alt sekmeler:
     - `Netleştir`
     - `Prompt`
     - `Sonuç & Aksiyon`

3. **Quick Create Modal**
   - başlık
   - ham not
   - konu tipi

### UI İlkeleri
- wizard değil
- uzun form değil
- tür seçimine göre alan aç/kapat
- eksik alanları net söyle
- prompt üretmeden önce route kararını görünür yap

## Consultation Center Detail Akışı
1. konu aç
2. karar sorusunu netleştir
3. hedef / çıktı tipini seç
4. Context Center'dan ilgili bağlamı bağla
5. sistem `blocked / internal / external` route önerisi üretir
6. external ise prompt preview oluşur
7. cevap geldikten sonra aksiyonlara çevrilir
8. karar notu Context Center'a, işler Project OS'e yazılır

## Prisma v1 Taslağı
```prisma
model Consultation {
  id                String   @id @default(cuid())
  title             String
  type              ConsultationType
  stage             ConsultationStage @default(draft)
  status            ConsultationStatus @default(open)
  ownerRole         ConsultationOwnerRole?
  consultRoute      ConsultationRoute?
  decisionQuestion  String?
  goal              String?
  dueAt             DateTime?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  brief             ConsultationBrief?
  runs              ConsultationRun[]
  actions           ConsultationAction[]
}

model ConsultationBrief {
  id                String   @id @default(cuid())
  consultationId    String   @unique
  businessJson      Json?
  technicalJson     Json?
  sharedJson        Json?
  contextRefsJson   Json?
  constraintsJson   Json?
  successCriteria   String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  consultation      Consultation @relation(fields: [consultationId], references: [id], onDelete: Cascade)
}

model ConsultationRun {
  id                String   @id @default(cuid())
  consultationId    String
  modelName         String?
  promptText        String
  sentAt            DateTime?
  responseRaw       String?
  responseSummary   String?
  createdAt         DateTime @default(now())

  consultation      Consultation @relation(fields: [consultationId], references: [id], onDelete: Cascade)
}

model ConsultationAction {
  id                String   @id @default(cuid())
  consultationId    String
  ownerRole         ConsultationOwnerRole
  actionType        ConsultationActionType
  title             String
  status            ConsultationActionStatus @default(open)
  linkedEntityType  String?
  linkedEntityId    String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  consultation      Consultation @relation(fields: [consultationId], references: [id], onDelete: Cascade)
}

enum ConsultationType {
  sales
  technical
  shared
}

enum ConsultationStage {
  draft
  clarifying
  goal_set
  context_ready
  blocked
  internal
  external
  ready_to_send
  answered
  actioned
}

enum ConsultationStatus {
  open
  archived
}

enum ConsultationRoute {
  blocked
  internal
  external
}

enum ConsultationOwnerRole {
  user
  tech_agent
  shared
}

enum ConsultationActionType {
  decision_note
  project_task
  followup
}

enum ConsultationActionStatus {
  open
  done
  cancelled
}
```

## Consultation Detail Alan Listesi
### Header
- title
- type
- stage
- route
- ownerRole
- dueAt

### Netleştir sekmesi
- decisionQuestion
- whyNow
- desiredOutput
- missingFieldsSummary

### Brief blokları
- business brief alanları
- technical brief alanları
- shared brief alanları

### Context pack
- selected context refs
- previous decisions
- constraints
- related records

### Prompt sekmesi
- route result
- prompt preview
- copy button
- sentAt

### Sonuç & Aksiyon sekmesi
- raw response
- response summary
- action list
- Context Center'a karar yaz
- Project OS işi aç

## Route Mekanizması
Kontroller:
- satış / saha testi gerekiyorsa -> `user`
- panel / veri / UI / otomasyon işi varsa -> `tech_agent`
- ürün vaadi / teklif / fiyat / operasyon kuralı etkileniyorsa -> `shared`
- bağlam eksikse -> route verilmez, geri netleştirmeye gider

## v1 Scope
### Dahil
- inbox
- detail screen
- quick create
- 3 brief tipi
- karar filtresi
- context pack seçimi
- prompt preview
- response paste / summary
- Project OS aksiyon üretimi
- Context Center karar geri yazımı

### Hariç
- otomatik GPT Pro gönderimi
- çoklu model orkestrasyonu
- ağır approval zinciri
- CRM özellikleri
- ileri analitik ekranlar

## Uygulama Sırası
1. Prisma tabloları
2. Consultation inbox verisi
3. Detail ekranı ve brief blokları
4. route evaluator
5. prompt preview
6. response -> action dönüşümü
7. Context Center / Project OS bağlantısı

## Ürün Cümlesi
Consultation Center v1, EsnafDigital içinde danışma isteme ekranı değil; doğru konuyu seçen, doğru bağlamla soran ve sonucu doğrudan işe çeviren karar hazırlama modülüdür.
