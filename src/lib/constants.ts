export const SINAV_TURLERI = ["TYT", "AYT"] as const;

export const TYT_DERSLERI: Record<string, { konular: string[]; kaynaklar: string[] }> = {
  "Türkçe": {
    konular: ["Sözcükte Anlam", "Cümlede Anlam", "Paragraf", "Sözcük Türleri", "Cümlenin Ögeleri", "Yazım Kuralları", "Noktalama İşaretleri", "Ses Bilgisi", "Anlatım Bozuklukları", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Türkçe", "Dil Bilgisi Soru Bankası", "Tonguç TYT Türkçe", "Bilgi Sarmal TYT Türkçe", "Diğer"]
  },
  "Matematik": {
    konular: ["Sayılar", "Dört İşlem", "Kesirler", "Rasyonel Sayılar", "Üslü Sayılar", "Köklü Sayılar", "Çarpanlara Ayırma", "Oran-Orantı", "Denklemler", "Eşitsizlikler", "Problemler", "Kümeler", "Olasılık", "İstatistik", "Fonksiyonlar", "Trigonometri", "Analitik Geometri", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Matematik", "Tonguç TYT Matematik", "Karaağaç TYT Matematik", "Çap TYT Matematik", "Diğer"]
  },
  "Fizik": {
    konular: ["Fizik Bilimine Giriş", "Madde ve Özellikleri", "Hareket ve Kuvvet", "Enerji", "İtme ve Momentum", "Tork ve Denge", "Basınç", "Elektrostatik", "Elektrik", "Manyetizma", "Dalgalar", "Optik", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Fizik", "Tonguç TYT Fizik", "Çap TYT Fizik", "Diğer"]
  },
  "Kimya": {
    konular: ["Kimyaya Giriş", "Atom", "Periyodik Sistem", "Kimyasal Bağlar", "Maddenin Halleri", "Kimyasal Tepkimeler", "Asit-Baz", "Kimya Her Yerde", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Kimya", "Tonguç TYT Kimya", "Çap TYT Kimya", "Diğer"]
  },
  "Biyoloji": {
    konular: ["Yaşam Bilimi Biyoloji", "Hücre", "Canlıların Sınıflandırılması", "Canlılar ve Çevre", "Kalıtım", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Biyoloji", "Tonguç TYT Biyoloji", "Çap TYT Biyoloji", "Diğer"]
  },
  "Tarih": {
    konular: ["Tarih Bilimi", "İlk Uygarlıklar", "İslam Tarihi", "Türk-İslam Devletleri", "Osmanlı Kuruluş", "Osmanlı Yükselme", "Osmanlı Duraklama", "Osmanlı Çöküş", "Kurtuluş Savaşı", "Atatürk Dönemi", "Yakın Çağ", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Tarih", "Tonguç TYT Tarih", "Çap TYT Tarih", "Diğer"]
  },
  "Coğrafya": {
    konular: ["Doğa ve İnsan", "Dünya'nın Şekli", "İklim", "Türkiye Fiziki Coğrafya", "Türkiye Beşeri Coğrafya", "Harita Bilgisi", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Coğrafya", "Tonguç TYT Coğrafya", "Çap TYT Coğrafya", "Diğer"]
  },
  "Felsefe": {
    konular: ["Felsefeye Giriş", "Bilgi Felsefesi", "Varlık Felsefesi", "Ahlak Felsefesi", "Siyaset Felsefesi", "Din Felsefesi", "Sanat Felsefesi", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Felsefe", "Tonguç TYT Felsefe", "Çap TYT Sosyal", "Diğer"]
  },
  "Din Kültürü": {
    konular: ["İslam'ın Temel Kaynakları", "Kur'an", "Hz. Muhammed", "İslam'ın Temel İlkeleri", "İbadetler", "Ahlak", "Diğer"],
    kaynaklar: ["Hız ve Renk TYT Din", "Tonguç TYT Din", "Diğer"]
  }
};

export const AYT_DERSLERI: Record<string, { konular: string[]; kaynaklar: string[] }> = {
  "Matematik": {
    konular: ["Polinomlar", "İkinci Dereceden Denklemler", "Karmaşık Sayılar", "Matrisler", "Determinant", "Çarpanlara Ayırma", "Fonksiyonlar", "Trigonometri", "Logaritma", "Diziler", "Limit", "Türev", "İntegral", "Olasılık", "Permütasyon-Kombinasyon", "Analitik Geometri", "Çember", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Matematik", "Tonguç AYT Matematik", "Karaağaç AYT Matematik", "Çap AYT Matematik", "Diğer"]
  },
  "Fizik": {
    konular: ["Kuvvet ve Hareket", "Enerji", "İtme-Momentum", "Tork", "Basit Harmonik Hareket", "Gravitasyon", "Yük ve Elektrik Alan", "Manyetik Alan", "Elektromanyetik İndüksiyon", "Alternatif Akım", "Optik", "Dalgalar", "Atom Fiziği", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Fizik", "Tonguç AYT Fizik", "Çap AYT Fizik", "Diğer"]
  },
  "Kimya": {
    konular: ["Modern Atom Teorisi", "Gazlar", "Sıvı Çözeltiler", "Kimyasal Denge", "Çözünürlük Dengesi", "Elektrokimya", "Kimyasal Kinetik", "Organik Kimya", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Kimya", "Tonguç AYT Kimya", "Çap AYT Kimya", "Diğer"]
  },
  "Biyoloji": {
    konular: ["Hücre Biyolojisi", "Biyolojik Moleküller", "Metabolizma", "Fotosentez", "Solunum", "Hücre Bölünmesi", "Kalıtım", "Genetik Mühendisliği", "Sinir Sistemi", "Duyu Organları", "Hareket Sistemi", "Üreme ve Gelişme", "Ekoloji", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Biyoloji", "Tonguç AYT Biyoloji", "Çap AYT Biyoloji", "Diğer"]
  },
  "Edebiyat": {
    konular: ["Şiir Bilgisi", "Nesir", "Edebi Akımlar", "Halk Edebiyatı", "Divan Edebiyatı", "Tanzimat", "Servet-i Fünun", "Fecr-i Ati", "Milli Edebiyat", "Cumhuriyet Edebiyatı", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Edebiyat", "Tonguç AYT Edebiyat", "Çap AYT Edebiyat", "Diğer"]
  },
  "Tarih-1": {
    konular: ["Türk-İslam Tarihi", "İlk Türk Devletleri", "Anadolu Selçukluları", "Osmanlı Klasik Dönem", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Tarih", "Tonguç AYT Tarih", "Diğer"]
  },
  "Coğrafya-1": {
    konular: ["Doğal Sistemler", "Beşeri Sistemler", "Mekânsal Bir Sentez", "Türkiye", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Coğrafya", "Tonguç AYT Coğrafya", "Diğer"]
  },
  "Tarih-2": {
    konular: ["Osmanlı 17-18. Yüzyıl", "Osmanlı 19. Yüzyıl", "Balkan Savaşları", "1. Dünya Savaşı", "Kurtuluş Savaşı", "Atatürk Dönemi", "2. Dünya Savaşı", "Soğuk Savaş", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Tarih", "Tonguç AYT Tarih", "Diğer"]
  },
  "Coğrafya-2": {
    konular: ["Küresel Ortam", "Çevre ve Toplum", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Coğrafya", "Tonguç AYT Coğrafya", "Diğer"]
  },
  "Felsefe": {
    konular: ["Felsefenin Konuları", "Bilgi Felsefesi", "Varlık Felsefesi", "Ahlak Felsefesi", "Siyaset Felsefesi", "Estetik", "Din Felsefesi", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Felsefe", "Çap AYT Sosyal", "Diğer"]
  },
  "Din": {
    konular: ["Kelam", "Fıkıh", "Tasavvuf", "İslam Tarihi", "Diğer"],
    kaynaklar: ["Hız ve Renk AYT Din", "Diğer"]
  }
};

export const getDersler = (sinavTuru: 'TYT' | 'AYT') => {
  return sinavTuru === 'TYT' ? TYT_DERSLERI : AYT_DERSLERI;
};
