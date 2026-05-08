import { format, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calisma } from './types';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd MMM yyyy', { locale: tr });
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd.MM.yyyy');
}

export function today(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} dk`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} sa ${m} dk` : `${h} sa`;
}

export function filterByDateRange(calismalar: Calisma[], start: Date, end: Date): Calisma[] {
  return calismalar.filter(c => {
    const d = parseISO(c.tarih);
    return isWithinInterval(d, { start, end });
  });
}

export function filterToday(calismalar: Calisma[]): Calisma[] {
  const t = today();
  return calismalar.filter(c => c.tarih === t);
}

export function filterThisWeek(calismalar: Calisma[]): Calisma[] {
  const now = new Date();
  return filterByDateRange(calismalar, startOfWeek(now, { weekStartsOn: 1 }), endOfWeek(now, { weekStartsOn: 1 }));
}

export function filterThisMonth(calismalar: Calisma[]): Calisma[] {
  const now = new Date();
  return filterByDateRange(calismalar, startOfMonth(now), endOfMonth(now));
}

export function sumSure(calismalar: Calisma[]): number {
  return calismalar.reduce((acc, c) => acc + (c.sure_dakika || 0), 0);
}

export function sumSoru(calismalar: Calisma[]): number {
  return calismalar.reduce((acc, c) => acc + (c.soru_sayisi || 0), 0);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
