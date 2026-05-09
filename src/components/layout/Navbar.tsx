'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, LayoutDashboard, Calendar, BarChart2, PlusCircle, LogIn, LogOut } from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Panel', icon: LayoutDashboard },
  { href: '/giris', label: 'Ekle', icon: PlusCircle },
  { href: '/takvim', label: 'Takvim', icon: Calendar },
  { href: '/analiz', label: 'Analiz', icon: BarChart2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const { authenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-white font-bold text-lg">
          <BookOpen size={24} className="text-indigo-400" />
          <span>YKS Takip</span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}

          {authenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors min-h-[44px]"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
          ) : (
            <Link
              href="/oturum"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors min-h-[44px]"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Giriş</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
