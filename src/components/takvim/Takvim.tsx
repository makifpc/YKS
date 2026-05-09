'use client';
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calisma } from '@/lib/types';
import GunDetay from './GunDetay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  calismalar: Calisma[];
}

export default function Takvim({ calismalar }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const byDate: Record<string, Calisma[]> = {};
  calismalar.forEach(c => {
    if (!byDate[c.tarih]) byDate[c.tarih] = [];
    byDate[c.tarih].push(c);
  });

  function prevMonth() {
    setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  const firstDayOfWeek = (monthStart.getDay() + 6) % 7;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold text-white">
            {format(currentMonth, 'MMMM yyyy', { locale: tr })}
          </h2>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
            <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const entries = byDate[dateStr] || [];
            const hasEntries = entries.length > 0;
            const isSelected = selectedDay === dateStr;
            const isTodayDate = isToday(day);

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors min-h-[44px] relative ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : isTodayDate
                    ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700'
                    : hasEntries
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'text-gray-500 hover:bg-gray-800/50'
                }`}
              >
                {format(day, 'd')}
                {hasEntries && !isSelected && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-1">
        {selectedDay ? (
          <GunDetay tarih={selectedDay} calismalar={byDate[selectedDay] || []} />
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-gray-500 text-center">
            Detay görmek için bir gün seçin
          </div>
        )}
      </div>
    </div>
  );
}
