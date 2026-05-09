'use client';
import { useState, useEffect } from 'react';
import { isAuthenticated, setAuthenticated } from '@/lib/auth';

export function useAuth() {
  const [authenticated, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(isAuthenticated());
    setLoading(false);
  }, []);

  async function login(password: string): Promise<boolean> {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.ok) {
        setAuthenticated(true);
        setAuth(true);
        return true;
      }
    }
    return false;
  }

  async function logout() {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
    } catch {
      // logout state is cleared locally regardless of request result
    }
    setAuth(false);
  }

  return { authenticated, loading, login, logout };
}
