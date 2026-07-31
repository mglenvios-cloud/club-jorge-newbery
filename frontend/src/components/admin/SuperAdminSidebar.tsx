'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Wand2,
  CreditCard,
  Key,
  ShoppingBag,
  Palette,
  Blocks,
  Users,
  Receipt,
  ShieldAlert,
  Sliders,
  Cpu,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';

const adminNavItems = [
  { name: 'Dashboard Ejecutivo', href: '/admin', icon: LayoutDashboard },
  { name: 'Clubes', href: '/admin/clubs', icon: Building2, badge: '24' },
  { name: 'Club Wizard', href: '/admin/clubs/wizard', icon: Wand2, badge: 'Nuevo' },
  { name: 'Planes SaaS', href: '/admin/plans', icon: CreditCard },
  { name: 'Licencias', href: '/admin/licenses', icon: Key },
  { name: 'Marketplace', href: '/admin/marketplace', icon: ShoppingBag },
  { name: 'Branding Global', href: '/admin/branding', icon: Palette },
  { name: 'Módulos Globales', href: '/admin/modules', icon: Blocks },
  { name: 'Usuarios & Admins', href: '/admin/users', icon: Users },
  { name: 'Facturación & MRR', href: '/admin/billing', icon: Receipt },
  { name: 'Auditoría', href: '/admin/audit', icon: ShieldAlert },
  { name: 'Configuración Global', href: '/admin/settings', icon: Sliders },
];

export function SuperAdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between min-h-screen sticky top-0 h-screen overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/80 sticky top-0 bg-slate-950 z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-white">
              SUPER <span className="text-blue-500 font-black">ADMIN</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">Consola Corporativa</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Gestión Global SaaS
          </p>
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] rounded font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950">
        <button
          onClick={logout}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-800"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
