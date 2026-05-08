import { z } from 'zod';

export const calismaSchema = z.object({
  tarih: z.string().min(1, 'Tarih gerekli'),
  tur: z.enum(['konu_calismasi', 'soru_cozme', 'deneme']),
  sinav_turu: z.enum(['TYT', 'AYT']).nullable().optional(),
  ders: z.string().min(1, 'Ders gerekli'),
  konu: z.string().min(1, 'Konu gerekli'),
  kaynak: z.string().min(1, 'Kaynak gerekli'),
  soru_sayisi: z.number().int().min(0).nullable().optional(),
  sure_dakika: z.number().int().min(1, 'Süre en az 1 dakika olmalı'),
  dogru: z.number().int().min(0).nullable().optional(),
  yanlis: z.number().int().min(0).nullable().optional(),
  bos: z.number().int().min(0).nullable().optional(),
  notlar: z.string().nullable().optional(),
  tam_deneme: z.boolean().nullable().optional(),
});

export type CalismaFormData = z.infer<typeof calismaSchema>;
