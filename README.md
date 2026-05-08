# YKS Çalışma Takip

YKS (Yükseköğretim Kurumları Sınavı) hazırlık sürecini takip etmek için geliştirilmiş web uygulaması.

## Özellikler

- 📊 **Panel**: Bugün, bu hafta, bu ay ve toplam çalışma istatistikleri
- ✏️ **Çalışma Ekle**: TYT/AYT derslerine göre konu çalışması, soru çözme ve deneme kaydı
- 📅 **Takvim**: Aylık takvim görünümü ve günlük detaylar
- 📈 **Analiz**: Recharts ile interaktif grafikler (günlük soru, ders dağılımı, kümülatif süre, D/Y/B)
- 🔒 **Şifre Koruması**: Oturum tabanlı kimlik doğrulama
- ☁️ **Appwrite Backend**: Bulut veritabanı entegrasyonu
- 💾 **GitHub Yedekleme**: İsteğe bağlı GitHub backup

## Teknolojiler

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Appwrite (veritabanı)
- Recharts (grafikler)
- React Hook Form + Zod (form validasyonu)
- date-fns (tarih işlemleri)
- Lucide React (ikonlar)

## Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Ortam değişkenlerini ayarlayın:
   ```bash
   cp .env.local.example .env.local
   ```
   `.env.local` dosyasını Appwrite proje bilgilerinizle doldurun.

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Ortam Değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite endpoint URL |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite proje ID |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Appwrite veritabanı ID |
| `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` | Appwrite koleksiyon ID |
| `APPWRITE_API_KEY` | Appwrite sunucu API anahtarı |
| `SESSION_PASSWORD` | Giriş şifresi |
| `GITHUB_TOKEN` | GitHub yedekleme için token (opsiyonel) |
| `GITHUB_OWNER` | GitHub kullanıcı adı (opsiyonel) |
| `GITHUB_REPO` | GitHub repo adı (opsiyonel) |

## Appwrite Koleksiyon Yapısı

Koleksiyonda şu alanlar bulunmalıdır:
- `tarih` (string) - YYYY-MM-DD formatında
- `tur` (string) - konu_calismasi / soru_cozme / deneme
- `sinav_turu` (string, nullable) - TYT / AYT
- `ders` (string)
- `konu` (string)
- `kaynak` (string)
- `soru_sayisi` (integer, nullable)
- `sure_dakika` (integer)
- `dogru` (integer, nullable)
- `yanlis` (integer, nullable)
- `bos` (integer, nullable)
- `notlar` (string, nullable)
- `tam_deneme` (boolean, nullable)
- `olusturulma` (string)
A website to record studies
