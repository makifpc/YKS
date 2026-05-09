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

`tarih`, `tur`, `sinav_turu`, `ders`, `konu`, `kaynak`, `soru_sayisi`, `sure_dakika`, `dogru`, `yanlis`, `bos`, `notlar`, `tam_deneme`, `olusturulma`
