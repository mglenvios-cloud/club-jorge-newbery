'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Users, Calendar, Medal, BarChart2 } from 'lucide-react';

const sportsSubNav = [
  { name: 'Disciplinas & Categorías', href: '/dashboard/sports', icon: Trophy },
  { name: 'Planteles & Deportistas', href: '/dashboard/sports/rosters', icon: Users },
  { name: 'Entrenamientos', href: '/dashboard/sports/trainings', icon: Calendar },
  { name: 'Fixture & Partidos', href: '/dashboard/sports/matches', icon: Medal },
  { name: 'Estadísticas & Reportes', href: '/dashboard/sports/stats', icon: BarChart2 },
];

export default function SportsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Gestión Deportiva Multi-Tenant</h1>
          <p className="text-slate-400 text-xs mt-1">
            Administración integral de disciplinas, planteles, fichas médicas, entrenamientos y estadísticas.
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {sportsSubNav.map((item) => {
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
