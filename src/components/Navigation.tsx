'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BusyIndicator from '@/components/BusyIndicator';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/5 backdrop-blur-xs border-b border-white/5 flex items-center h-16 md:h-20 font-orbitron">
      <div className="max-w-7xl mx-auto px-4 md:px-16 w-full flex items-center justify-between">
        <Link 
          href="/" 
          className={`text-2xl md:text-6xl font-bold tracking-tight ${pathname === '/' ? 'text-red-600' : 'text-red-600 hover:text-blue-600 transition-colors'}`}
          style={{ fontVariationSettings: '"wght" 700' }}
        >
          <span>Pocket Rave</span>
          <BusyIndicator className="ml-2 opacity-80" />
        </Link>
        <div className="flex items-center gap-3 md:gap-8">
          <Link 
            href="/projects" 
            className={`text-sm md:text-2xl font-bold tracking-tight whitespace-nowrap ${pathname === '/projects' ? 'text-red-600' : 'text-white hover:text-red-600 transition-colors'}`}
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            Projects
          </Link>
          <Link 
            href="/live-acts" 
            className={`text-sm md:text-2xl font-bold tracking-tight whitespace-nowrap ${pathname === '/live-acts' ? 'text-red-600' : 'text-white hover:text-red-600 transition-colors'}`}
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            Live Acts
          </Link>
        </div>
      </div>
    </nav>
  );
}

