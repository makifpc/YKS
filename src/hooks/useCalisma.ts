'use client';
import { useState, useEffect, useCallback } from 'react';
import { Calisma } from '@/lib/types';

export function useCalisma() {
  const [calismalar, setCalismalar] = useState<Calisma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_all = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/calismalar');
      if (!res.ok) throw new Error('Veri yüklenemedi');
      const data = await res.json();
      setCalismalar(data.calismalar || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Hata oluştu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch_all();
  }, [fetch_all]);

  async function ekle(calisma: Omit<Calisma, '$id' | 'olusturulma'>): Promise<boolean> {
    try {
      const res = await fetch('/api/calismalar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(calisma),
      });
      if (!res.ok) throw new Error('Kaydetme başarısız');
      await fetch_all();
      return true;
    } catch {
      return false;
    }
  }

  async function sil(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/calismalar/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Silme başarısız');
      await fetch_all();
      return true;
    } catch {
      return false;
    }
  }

  return { calismalar, loading, error, ekle, sil, yenile: fetch_all };
}
