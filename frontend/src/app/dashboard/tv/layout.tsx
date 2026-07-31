'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tv, Radio, Film, Megaphone, ExternalLink } from 'lucide-react';

const tvSubNav = [
  { name: 'Live Studio & Streaming', href: '/dashboard/tv', icon: Radio },
  { name: 'Biblioteca Multimedia', href: '/dashboard/tv/media', icon: Film },
  { name: 'Sponsors & Publicidad', href: '/dashboard/tv/ads', icon: Megaphone },
];

export default function TvLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Club TV Multi-Tenant Studio</h1>
          <p className="text-slate-400 text-xs mt-1">
            Plataforma de streaming en vivo, producción multimedia y monetización con sponsors.
          </p>
        </div>

        <Link
          href="/tv"
          target="_blank"
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center gap-2"
        >
          <span>Abrir Portal Público TV</span>
          <ExternalLink className="w-4 h-4 text-blue-400" />
        </Link>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {tvSubNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}
