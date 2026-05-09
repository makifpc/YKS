'use client';
import { useCalisma } from '@/hooks/useCalisma';
import Takvim from '@/components/takvim/Takvim';

export default function TakvimPage() {
  const { calismalar, loading } = useCalisma();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-indigo-400 animate-pulse">Yükleniyor...</div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">📅 Takvim</h1>
      <Takvim calismalar={calismalar} />
    </div>
  );
}
