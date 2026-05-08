export type SinavTuru = 'TYT' | 'AYT';
export type CalismaTuru = 'konu_calismasi' | 'soru_cozme' | 'deneme';

export interface Calisma {
  $id?: string;
  tarih: string; // YYYY-MM-DD
  tur: CalismaTuru;
  sinav_turu: SinavTuru | null;
  ders: string;
  konu: string;
  kaynak: string;
  soru_sayisi?: number | null;
  sure_dakika: number;
  dogru?: number | null;
  yanlis?: number | null;
  bos?: number | null;
  notlar?: string | null;
  tam_deneme?: boolean | null;
  olusturulma: string;
}

export interface CalismaSummary {
  toplamSure: number;
  toplamSoru: number;
  toplamDogru: number;
  toplamYanlis: number;
  toplamBos: number;
  derseDagitim: Record<string, number>;
}
