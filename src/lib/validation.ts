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
}).superRefine((data, ctx) => {
  if (data.tur === 'konu_calismasi') {
    if (data.soru_sayisi != null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['soru_sayisi'],
        message: 'Konu çalışmasında soru sayısı girilmez',
      });
    }
    if (data.dogru != null || data.yanlis != null || data.bos != null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dogru'],
        message: 'Konu çalışmasında doğru/yanlış/boş girilmez',
      });
    }
  }

  if (data.tur === 'deneme' && data.tam_deneme == null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['tam_deneme'],
      message: 'Deneme türü seçilmeli',
    });
  }

  if (data.soru_sayisi != null) {
    const toplam = (data.dogru || 0) + (data.yanlis || 0) + (data.bos || 0);
    if (toplam > data.soru_sayisi) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['soru_sayisi'],
        message: 'Doğru + yanlış + boş, soru sayısını aşamaz',
      });
    }
  }
});

export type CalismaFormData = z.infer<typeof calismaSchema>;
