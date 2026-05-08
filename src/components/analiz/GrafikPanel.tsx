'use client';
import { Calisma } from '@/lib/types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Props {
  calismalar: Calisma[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#818cf8', '#7c3aed'];

export default function GrafikPanel({ calismalar }: Props) {
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const date = format(subDays(new Date(), 13 - i), 'yyyy-MM-dd');
    const entries = calismalar.filter(c => c.tarih === date);
    return {
      tarih: format(parseISO(date), 'dd MMM', { locale: tr }),
      soru: entries.reduce((a, c) => a + (c.soru_sayisi || 0), 0),
      sure: entries.reduce((a, c) => a + c.sure_dakika, 0),
    };
  });

  const derseDagitim: Record<string, number> = {};
  calismalar.forEach(c => {
    derseDagitim[c.ders] = (derseDagitim[c.ders] || 0) + c.sure_dakika;
  });
  const pieData = Object.entries(derseDagitim).map(([name, value]) => ({ name, value }));

  const sortedByDate = [...calismalar].sort((a, b) => a.tarih.localeCompare(b.tarih));
  let cumulative = 0;
  const cumulativeData = sortedByDate.reduce<{ tarih: string; toplam: number }[]>((acc, c) => {
    cumulative += c.sure_dakika;
    const last = acc[acc.length - 1];
    if (last && last.tarih === c.tarih) {
      last.toplam = cumulative;
    } else {
      acc.push({ tarih: c.tarih, toplam: cumulative });
    }
    return acc;
  }, []);

  const dogYanBos: Record<string, { dogru: number; yanlis: number; bos: number }> = {};
  calismalar.filter(c => c.soru_sayisi).forEach(c => {
    if (!dogYanBos[c.ders]) dogYanBos[c.ders] = { dogru: 0, yanlis: 0, bos: 0 };
    dogYanBos[c.ders].dogru += c.dogru || 0;
    dogYanBos[c.ders].yanlis += c.yanlis || 0;
    dogYanBos[c.ders].bos += c.bos || 0;
  });
  const dyb = Object.entries(dogYanBos).map(([ders, v]) => ({ ders, ...v }));

  const tooltipStyle = { backgroundColor: '#1f2937', border: '1px solid #374151', color: '#f9fafb' };

  if (calismalar.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        Filtreye uyan kayıt bulunamadı
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white mb-4">Son 14 Gün – Günlük Soru</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={last14}>
            <XAxis dataKey="tarih" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="soru" name="Soru" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {pieData.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Derse Göre Çalışma Süresi (dk)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} dk`, 'Süre']} />
              <Legend formatter={(v) => <span style={{ color: '#d1d5db', fontSize: 12 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {cumulativeData.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Toplam Çalışma Süresi (Kümülatif)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cumulativeData}>
              <XAxis dataKey="tarih" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} dk`, 'Toplam']} />
              <Line type="monotone" dataKey="toplam" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {dyb.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Doğru / Yanlış / Boş</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dyb} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis dataKey="ders" type="category" tick={{ fontSize: 11, fill: '#9ca3af' }} width={80} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend formatter={(v) => <span style={{ color: '#d1d5db', fontSize: 12 }}>{v}</span>} />
              <Bar dataKey="dogru" name="Doğru" fill="#10b981" stackId="a" />
              <Bar dataKey="yanlis" name="Yanlış" fill="#ef4444" stackId="a" />
              <Bar dataKey="bos" name="Boş" fill="#6b7280" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
