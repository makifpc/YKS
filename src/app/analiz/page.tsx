'use client';
import { useCalisma } from '@/hooks/useCalisma';
import GrafikPanel from '@/components/analiz/GrafikPanel';
import FiltrePaneli from '@/components/analiz/FiltrePaneli';
import { useState } from 'react';

export default function AnalizPage() {
  const { calismalar, loading } = useCalisma();
  const [filtreler, setFiltreler] = useState({
    sinavTuru: '' as 'TYT' | 'AYT' | '',
    ders: '',
    tur: '' as 'konu_calismasi' | 'soru_cozme' | 'deneme' | '',
    baslangic: '',
    bitis: '',
  });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-indigo-400 animate-pulse">Yükleniyor...</div>
    </div>
  );

  const filtrelenmis = calismalar.filter(c => {
    if (filtreler.sinavTuru && c.sinav_turu !== filtreler.sinavTuru) return false;
    if (filtreler.ders && c.ders !== filtreler.ders) return false;
    if (filtreler.tur && c.tur !== filtreler.tur) return false;
    if (filtreler.baslangic && c.tarih < filtreler.baslangic) return false;
    if (filtreler.bitis && c.tarih > filtreler.bitis) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">📈 Analiz</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FiltrePaneli filtreler={filtreler} onChange={setFiltreler} calismalar={calismalar} />
        </div>
        <div className="lg:col-span-3">
          <GrafikPanel calismalar={filtrelenmis} />
        </div>
      </div>
    </div>
  );
}
