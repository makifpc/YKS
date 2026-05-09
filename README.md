# YKS Çalışma Takip

Türkçe ve tablet uyumlu bir YKS çalışma takip uygulaması (Next.js + TypeScript + Appwrite).

## Gerekli minimum kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Ortam dosyasını oluşturun:
   ```bash
   cp .env.local.example .env.local
   ```
3. `.env.local` içinde **zorunlu** alanları doldurun:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
   - `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`
   - `APPWRITE_API_KEY`
   - `SESSION_PASSWORD`
4. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

## Opsiyonel (GitHub yedekleme)

Yeni kayıtları otomatik GitHub’a yazdırmak için şu 3 alanı ekleyin:

- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`

## Appwrite koleksiyon alanları

| Alan | Tip |
|---|---|
| `tarih` | string (`YYYY-MM-DD`) |
| `tur` | string (`konu_calismasi` \| `soru_cozme` \| `deneme`) |
| `sinav_turu` | string/null (`TYT` \| `AYT`) |
| `ders` | string |
| `konu` | string |
| `kaynak` | string |
| `soru_sayisi` | integer/null |
| `sure_dakika` | integer |
| `dogru` | integer/null |
| `yanlis` | integer/null |
| `bos` | integer/null |
| `notlar` | string/null |
| `tam_deneme` | boolean/null |
| `olusturulma` | string (ISO datetime) |
