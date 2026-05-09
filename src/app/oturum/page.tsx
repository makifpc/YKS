'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Lock } from 'lucide-react';

export default function OturumPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(password);
    setLoading(false);
    if (ok) {
      router.push('/giris');
    } else {
      setError('Şifre yanlış. Tekrar deneyin.');
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-full mb-3">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Oturum Aç</h1>
          <p className="text-gray-400 text-sm mt-1">Çalışma eklemek için şifre gerekli</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Şifreyi girin..."
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Kontrol ediliyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
