import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'YKS Çalışma Takip',
  description: 'YKS sınav hazırlık sürecini takip et',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="font-sans bg-gray-950 text-gray-100 min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
