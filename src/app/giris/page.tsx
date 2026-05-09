'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CalismaFormu from '@/components/giris/CalismaFormu';

export default function GirisPage() {
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/oturum');
    }
  }, [authenticated, loading, router]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-indigo-400 animate-pulse">Kontrol ediliyor...</div>
    </div>
  );

  if (!authenticated) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">✏️ Çalışma Ekle</h1>
      <CalismaFormu />
    </div>
  );
}
