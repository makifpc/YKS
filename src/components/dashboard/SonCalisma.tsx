'use client';
import { Calisma } from '@/lib/types';
import { formatDate, formatDuration } from '@/lib/utils';

interface Props {
  calismalar: Calisma[];
}

const turLabel: Record<string, string> = {
  konu_calismasi: 'Konu',
  soru_cozme: 'Soru',
  deneme: 'Deneme',
};

export default function SonCalisma({ calismalar }: Props) {
  if (calismalar.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center text-gray-500">
        Henüz kayıt yok
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Son Çalışmalar</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="px-6 py-3 text-left">Tarih</th>
              <th className="px-6 py-3 text-left">Tür</th>
              <th className="px-6 py-3 text-left">Ders</th>
              <th className="px-6 py-3 text-left">Konu</th>
              <th className="px-6 py-3 text-right">Süre</th>
              <th className="px-6 py-3 text-right">Soru</th>
            </tr>
          </thead>
          <tbody>
            {calismalar.map(c => (
              <tr key={c.$id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="px-6 py-3 text-gray-300">{formatDate(c.tarih)}</td>
                <td className="px-6 py-3">
                  <span className="bg-indigo-900/50 text-indigo-300 text-xs px-2 py-1 rounded">
                    {turLabel[c.tur] || c.tur}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-200">{c.ders}</td>
                <td className="px-6 py-3 text-gray-400">{c.konu}</td>
                <td className="px-6 py-3 text-right text-gray-300">{formatDuration(c.sure_dakika)}</td>
                <td className="px-6 py-3 text-right text-gray-300">{c.soru_sayisi ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
