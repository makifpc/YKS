'use client';
import { useCalisma } from '@/hooks/useCalisma';
import OzetKart from '@/components/dashboard/OzetKart';
import SonCalisma from '@/components/dashboard/SonCalisma';
import { filterToday, filterThisWeek, filterThisMonth, sumSure, sumSoru } from '@/lib/utils';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { calismalar, loading, error } = useCalisma();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-indigo-400 text-lg animate-pulse">Yükleniyor...</div>
    </div>
  );

  if (error) return (
    <div className="text-red-400 text-center py-8">{error}</div>
  );

  const bugun = filterToday(calismalar);
  const buHafta = filterThisWeek(calismalar);
  const buAy = filterThisMonth(calismalar);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">📊 Panel</h1>
        <Link
          href="/giris"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle size={20} />
          Çalışma Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OzetKart
          baslik="Bugün"
          sure={sumSure(bugun)}
          soru={sumSoru(bugun)}
          renk="indigo"
        />
        <OzetKart
          baslik="Bu Hafta"
          sure={sumSure(buHafta)}
          soru={sumSoru(buHafta)}
          renk="purple"
        />
        <OzetKart
          baslik="Bu Ay"
          sure={sumSure(buAy)}
          soru={sumSoru(buAy)}
          renk="violet"
        />
        <OzetKart
          baslik="Toplam"
          sure={sumSure(calismalar)}
          soru={sumSoru(calismalar)}
          renk="pink"
        />
      </div>

      <SonCalisma calismalar={calismalar.slice(0, 5)} />
    </div>
  );
}
