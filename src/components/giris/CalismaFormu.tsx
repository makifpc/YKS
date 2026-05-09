'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { calismaSchema, CalismaFormData } from '@/lib/validation';
import { useCalisma } from '@/hooks/useCalisma';
import { getDersler } from '@/lib/constants';
import { today } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

const TUR_OPTIONS = [
  { value: 'konu_calismasi', label: '📚 Konu Çalışması' },
  { value: 'soru_cozme', label: '✏️ Soru Çözme' },
  { value: 'deneme', label: '📝 Deneme' },
];

export default function CalismaFormu() {
  const { ekle } = useCalisma();
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CalismaFormData>({
    resolver: zodResolver(calismaSchema),
    defaultValues: {
      tarih: today(),
      tur: 'konu_calismasi',
      sinav_turu: 'TYT',
      sure_dakika: 30,
    },
  });

  const tur = watch('tur');
  const sinavTuru = watch('sinav_turu');
  const tamDeneme = watch('tam_deneme');
  const selectedDers = watch('ders');

  const dersler = sinavTuru ? getDersler(sinavTuru) : {};
  const dersListesi = Object.keys(dersler);
  const konular = selectedDers && dersler[selectedDers] ? dersler[selectedDers].konular : [];
  const kaynaklar = selectedDers && dersler[selectedDers] ? dersler[selectedDers].kaynaklar : [];

  async function onSubmit(data: CalismaFormData) {
    setSubmitting(true);
    const payload = {
      ...data,
      sinav_turu: data.sinav_turu || null,
      soru_sayisi: data.soru_sayisi ?? null,
      dogru: data.dogru ?? null,
      yanlis: data.yanlis ?? null,
      bos: data.bos ?? null,
      notlar: data.notlar || null,
      tam_deneme: data.tam_deneme ?? null,
    };
    const ok = await ekle(payload as never);
    setSubmitting(false);
    if (ok) {
      setSuccess(true);
      reset({ tarih: today(), tur: 'konu_calismasi', sinav_turu: 'TYT', sure_dakika: 30 });
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  const inputClass = "w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors";
  const labelClass = "block text-sm text-gray-300 mb-1";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
      {success && (
        <div className="flex items-center gap-2 bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg">
          <CheckCircle size={18} />
          Çalışma başarıyla kaydedildi!
        </div>
      )}

      {/* Tür seçimi */}
      <div>
        <label className={labelClass}>Çalışma Türü</label>
        <div className="grid grid-cols-3 gap-2">
          {TUR_OPTIONS.map(opt => (
            <label
              key={opt.value}
              className={`cursor-pointer border rounded-lg p-3 text-center text-sm transition-colors ${
                tur === opt.value
                  ? 'border-indigo-500 bg-indigo-900/40 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                className="hidden"
                value={opt.value}
                {...register('tur')}
                onChange={e => {
                  setValue('tur', e.target.value as CalismaFormData['tur']);
                  setValue('ders', '');
                  setValue('konu', '');
                  setValue('kaynak', '');
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Tarih */}
      <div>
        <label className={labelClass}>Tarih</label>
        <input type="date" className={inputClass} {...register('tarih')} />
        {errors.tarih && <p className={errorClass}>{errors.tarih.message}</p>}
      </div>

      {/* Sınav türü */}
      {tur !== 'deneme' && (
        <div>
          <label className={labelClass}>Sınav Türü</label>
          <div className="flex gap-3">
            {['TYT', 'AYT'].map(st => (
              <label key={st} className={`cursor-pointer border rounded-lg px-6 py-2 text-sm transition-colors ${
                sinavTuru === st ? 'border-indigo-500 bg-indigo-900/40 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}>
                <input type="radio" className="hidden" value={st} {...register('sinav_turu')} />
                {st}
              </label>
            ))}
          </div>
        </div>
      )}

      {tur === 'deneme' && (
        <>
          <div>
            <label className={labelClass}>Sınav Türü</label>
            <div className="flex gap-3">
              {['TYT', 'AYT'].map(st => (
                <label key={st} className={`cursor-pointer border rounded-lg px-6 py-2 text-sm transition-colors ${
                  sinavTuru === st ? 'border-indigo-500 bg-indigo-900/40 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'
                }`}>
                  <input type="radio" className="hidden" value={st} {...register('sinav_turu')} />
                  {st}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Deneme Türü</label>
            <div className="flex gap-3">
              <label className={`cursor-pointer border rounded-lg px-6 py-2 text-sm transition-colors ${
                tamDeneme === true ? 'border-indigo-500 bg-indigo-900/40 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}>
                <input type="radio" className="hidden" {...register('tam_deneme')} value="true" onChange={() => setValue('tam_deneme', true)} />
                Tam Deneme
              </label>
              <label className={`cursor-pointer border rounded-lg px-6 py-2 text-sm transition-colors ${
                tamDeneme === false ? 'border-indigo-500 bg-indigo-900/40 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}>
                <input type="radio" className="hidden" {...register('tam_deneme')} value="false" onChange={() => setValue('tam_deneme', false)} />
                Bölüm Denemesi
              </label>
            </div>
          </div>
        </>
      )}

      {/* Ders */}
      <div>
        <label className={labelClass}>Ders</label>
        <select className={inputClass} {...register('ders')} onChange={e => {
          setValue('ders', e.target.value);
          setValue('konu', '');
          setValue('kaynak', '');
        }}>
          <option value="">Ders seçin...</option>
          {dersListesi.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.ders && <p className={errorClass}>{errors.ders.message}</p>}
      </div>

      {/* Konu */}
      <div>
        <label className={labelClass}>Konu</label>
        <select className={inputClass} {...register('konu')}>
          <option value="">Konu seçin...</option>
          {konular.map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        {errors.konu && <p className={errorClass}>{errors.konu.message}</p>}
      </div>

      {/* Kaynak */}
      <div>
        <label className={labelClass}>Kaynak</label>
        <select className={inputClass} {...register('kaynak')}>
          <option value="">Kaynak seçin...</option>
          {kaynaklar.map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        {errors.kaynak && <p className={errorClass}>{errors.kaynak.message}</p>}
      </div>

      {/* Süre */}
      <div>
        <label className={labelClass}>Süre (dakika)</label>
        <input
          type="number"
          min={1}
          className={inputClass}
          {...register('sure_dakika', { valueAsNumber: true })}
        />
        {errors.sure_dakika && <p className={errorClass}>{errors.sure_dakika.message}</p>}
      </div>

      {/* Soru çözme / deneme alanları */}
      {(tur === 'soru_cozme' || tur === 'deneme') && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Soru Sayısı</label>
            <input
              type="number"
              min={0}
              className={inputClass}
              {...register('soru_sayisi', { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className={labelClass}>Doğru</label>
            <input
              type="number"
              min={0}
              className={inputClass}
              {...register('dogru', { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className={labelClass}>Yanlış</label>
            <input
              type="number"
              min={0}
              className={inputClass}
              {...register('yanlis', { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className={labelClass}>Boş</label>
            <input
              type="number"
              min={0}
              className={inputClass}
              {...register('bos', { valueAsNumber: true })}
            />
          </div>
        </div>
      )}

      {/* Notlar */}
      <div>
        <label className={labelClass}>Notlar (isteğe bağlı)</label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="Çalışma hakkında notlar..."
          {...register('notlar')}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors min-h-[44px]"
      >
        {submitting ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
    </form>
  );
}
