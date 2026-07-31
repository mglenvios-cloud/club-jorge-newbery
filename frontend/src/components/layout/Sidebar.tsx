'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Trophy, Tv, Film, Settings, Layers, ShieldCheck, Cpu, ArrowUpRight, DollarSign, CalendarCheck } from 'lucide-react';

import { useTenant } from '../providers/TenantProvider';

const navigation = [
  { name: 'Dashboard Global', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Centro de Socios', href: '/dashboard/members', icon: Users, badge: 'Oficial' },
  { name: 'Club Finance Pro', href: '/dashboard/finance', icon: DollarSign, badge: 'Finanzas' },
  { name: 'Gestión Deportiva', href: '/dashboard/sports', icon: Trophy, badge: 'Oficial' },
  { name: 'Reservas & Canchas', href: '/dashboard/facilities', icon: CalendarCheck, badge: 'Canchas' },
  { name: 'Club TV & Streaming', href: '/dashboard/tv', icon: Tv, badge: 'Oficial' },
  { name: 'Media Center + IA', href: '/dashboard/media-center', icon: Film, badge: 'IA Sports' },
  { name: 'SaaS Config & Tenants', href: '/dashboard/tenants', icon: Layers, badge: 'Core' },
  { name: 'Seguridad & Roles', href: '/dashboard/security', icon: ShieldCheck },
  { name: 'Configuración Base', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { tenant } = useTenant();

  const primary = tenant?.branding?.primaryColor || '#0055a5';
  const shieldUrl = tenant?.branding?.shieldUrl;
  const logoUrl = tenant?.branding?.logoUrl;
  const clubName = tenant?.name || '';

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/80">
          {shieldUrl ? (
            <img src={shieldUrl} alt="Escudo" className="w-9 h-9 rounded-xl object-contain" />
          ) : logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-contain" />
          ) : (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primary }}>
              <Cpu className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <h1 className="font-extrabold text-sm tracking-tight text-white truncate">
              {clubName}
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">Gestión Institucional</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1">
          <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Navegación Sistema
          </p>
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] rounded font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 m-4 rounded-xl bg-slate-900/40 border border-slate-800">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-slate-300">SaaS Multi-Tenant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <p className="text-[10px] text-slate-500 mb-3">Plataforma lista para incorporación de clubes.</p>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-[11px] text-blue-400 font-medium hover:underline"
        >
          <span>Ver Landing Page</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}
