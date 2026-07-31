'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, Video, Image as ImageIcon, FileText, Sparkles, History, LayoutGrid } from 'lucide-react';

const mediaCenterNav = [
  { name: 'General', href: '/dashboard/media-center', icon: LayoutGrid },
  { name: 'Noticias', href: '/dashboard/media-center/news', icon: Newspaper },
  { name: 'Videos', href: '/dashboard/media-center/videos', icon: Video },
  { name: 'Fotos', href: '/dashboard/media-center/photos', icon: ImageIcon },
  { name: 'Documentos', href: '/dashboard/media-center/documents', icon: FileText },
  { name: 'IA Creator', href: '/dashboard/media-center/ai-creator', icon: Sparkles, badge: 'IA Sports' },
  { name: 'Archivo Histórico', href: '/dashboard/media-center/historical', icon: History, badge: 'Museo' },
];

export default function MediaCenterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Club Media Center + IA Sports Content</h1>
          <p className="text-slate-400 text-xs mt-1">
            Plataforma de generación automatizada de noticias con Inteligencia Artificial, archivo histórico y multicanal.
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {mediaCenterNav.map((item) => {
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
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] rounded font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}
