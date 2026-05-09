'use client';
import { Calisma } from '@/lib/types';

interface Filtreler {
  sinavTuru: 'TYT' | 'AYT' | '';
  ders: string;
  tur: 'konu_calismasi' | 'soru_cozme' | 'deneme' | '';
  baslangic: string;
  bitis: string;
}

interface Props {
  filtreler: Filtreler;
  onChange: (f: Filtreler) => void;
  calismalar: Calisma[];
}

export default function FiltrePaneli({ filtreler, onChange, calismalar }: Props) {
  const dersler = Array.from(new Set(calismalar.map(c => c.ders))).sort();

  const inputClass = "w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500";
  const labelClass = "block text-xs text-gray-400 mb-1";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
      <h3 className="font-semibold text-white">Filtreler</h3>

      <div>
        <label className={labelClass}>Sınav Türü</label>
        <select
          className={inputClass}
          value={filtreler.sinavTuru}
          onChange={e => onChange({ ...filtreler, sinavTuru: e.target.value as Filtreler['sinavTuru'] })}
        >
          <option value="">Tümü</option>
          <option value="TYT">TYT</option>
          <option value="AYT">AYT</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Ders</label>
        <select
          className={inputClass}
          value={filtreler.ders}
          onChange={e => onChange({ ...filtreler, ders: e.target.value })}
        >
          <option value="">Tümü</option>
          {dersler.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tür</label>
        <select
          className={inputClass}
          value={filtreler.tur}
          onChange={e => onChange({ ...filtreler, tur: e.target.value as Filtreler['tur'] })}
        >
          <option value="">Tümü</option>
          <option value="konu_calismasi">Konu Çalışması</option>
          <option value="soru_cozme">Soru Çözme</option>
          <option value="deneme">Deneme</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Başlangıç</label>
        <input
          type="date"
          className={inputClass}
          value={filtreler.baslangic}
          onChange={e => onChange({ ...filtreler, baslangic: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass}>Bitiş</label>
        <input
          type="date"
          className={inputClass}
          value={filtreler.bitis}
          onChange={e => onChange({ ...filtreler, bitis: e.target.value })}
        />
      </div>

      <button
        onClick={() => onChange({ sinavTuru: '', ders: '', tur: '', baslangic: '', bitis: '' })}
        className="w-full text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg py-2 transition-colors"
      >
        Sıfırla
      </button>
    </div>
  );
}
