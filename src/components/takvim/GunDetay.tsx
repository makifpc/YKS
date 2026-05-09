'use client';
import { Calisma } from '@/lib/types';
import { formatDate, formatDuration } from '@/lib/utils';
import { Clock, Hash, BookOpen } from 'lucide-react';

interface Props {
  tarih: string;
  calismalar: Calisma[];
}

const turLabel: Record<string, string> = {
  konu_calismasi: 'Konu',
  soru_cozme: 'Soru',
  deneme: 'Deneme',
};

export default function GunDetay({ tarih, calismalar }: Props) {
  const toplamSure = calismalar.reduce((a, c) => a + c.sure_dakika, 0);
  const toplamSoru = calismalar.reduce((a, c) => a + (c.soru_sayisi || 0), 0);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-1">{formatDate(tarih)}</h3>
      <div className="flex gap-4 text-sm text-gray-400 mb-4">
        <span className="flex items-center gap-1"><Clock size={14} /> {formatDuration(toplamSure)}</span>
        <span className="flex items-center gap-1"><Hash size={14} /> {toplamSoru} soru</span>
      </div>

      {calismalar.length === 0 ? (
        <p className="text-gray-500 text-sm">Bu gün kayıt yok</p>
      ) : (
        <div className="space-y-3">
          {calismalar.map(c => (
            <div key={c.$id} className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded mr-2">
                    {turLabel[c.tur]}
                  </span>
                  {c.sinav_turu && (
                    <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">
                      {c.sinav_turu}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{formatDuration(c.sure_dakika)}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-white flex items-center gap-1">
                  <BookOpen size={12} /> {c.ders}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{c.konu}</p>
                {c.kaynak && <p className="text-xs text-gray-500 mt-0.5">{c.kaynak}</p>}
              </div>
              {c.soru_sayisi && (
                <div className="mt-2 flex gap-3 text-xs">
                  <span className="text-green-400">✓ {c.dogru ?? 0}</span>
                  <span className="text-red-400">✗ {c.yanlis ?? 0}</span>
                  <span className="text-gray-400">○ {c.bos ?? 0}</span>
                </div>
              )}
              {c.notlar && <p className="text-xs text-gray-400 mt-2 italic">{c.notlar}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
