'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/5 backdrop-blur-xs border-b border-white/5 flex items-center h-20 font-orbitron">
      <div className="max-w-7xl mx-auto px-16 w-full flex items-center justify-between">
        <Link 
          href="/" 
          className={`text-6xl font-bold tracking-tight ${pathname === '/' ? 'text-red-600' : 'text-red-600 hover:text-blue-600 transition-colors'}`}
          style={{ fontVariationSettings: '"wght" 700' }}
        >
          Pocket Rave
        </Link>
        <div className="flex items-center gap-8">
          <Link 
            href="/projects" 
            className={`text-2xl font-bold tracking-tight ${pathname === '/projects' ? 'text-red-600' : 'text-white hover:text-red-600 transition-colors'}`}
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            Projects
          </Link>
          <Link 
            href="/live-acts" 
            className={`text-2xl font-bold tracking-tight ${pathname === '/live-acts' ? 'text-red-600' : 'text-white hover:text-red-600 transition-colors'}`}
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            Live Acts
          </Link>
        </div>
      </div>
    </nav>
  );
}

