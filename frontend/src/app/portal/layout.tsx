'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  QrCode,
  CreditCard,
  Bell,
  User,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  ShieldCheck,
  Smartphone,
  CalendarCheck,
} from 'lucide-react';
import { useTenant } from '@/components/providers/TenantProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

const portalNav = [
  { name: 'Inicio', href: '/portal', icon: LayoutDashboard },
  { name: 'Carnet Digital', href: '/portal/carnet', icon: QrCode, badge: 'QR Live' },
  { name: 'Reservar Canchas', href: '/portal/bookings', icon: CalendarCheck, badge: 'NUEVO' },
  { name: 'Mis Pagos', href: '/portal/payments', icon: CreditCard },
  { name: 'Notificaciones', href: '/portal/notifications', icon: Bell },
  { name: 'Mi Perfil', href: '/portal/profile', icon: User },
];

export default function MemberPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { tenant } = useTenant();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <Link href="/portal" className="flex items-center gap-3">
          {tenant?.branding?.logoUrl ? (
            <img src={tenant.branding.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-md"
              style={{ backgroundColor: tenant?.branding?.primaryColor || '#2563eb' }}
            >
              {tenant?.name?.charAt(0) || 'C'}
            </div>
          )}
          <div>
            <h1 className="font-extrabold text-sm text-white">{tenant?.name}</h1>
            <span className="text-[9px] text-blue-400 font-mono flex items-center gap-1">
              <Smartphone className="w-2.5 h-2.5" /> Portal del Socio (Web & PWA)
            </span>
          </div>
        </Link>

        {/* Member Profile Quick Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link href="/portal/notifications" className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </Link>

          <div className="h-4 w-px bg-slate-800" />

          <Link href="/portal/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              alt="Santiago"
              className="w-8 h-8 rounded-full border border-blue-500/40 object-cover"
            />
            <span className="hidden sm:inline text-xs font-bold text-slate-200">Santiago</span>
          </Link>
        </div>
      </header>

      {/* Main Navigation Bar for Members */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 sm:px-8 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-6 text-xs font-semibold">
          {portalNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`py-3.5 flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                  isActive
                    ? 'border-blue-500 text-white font-extrabold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] rounded font-bold bg-blue-500/20 text-blue-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Body Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 space-y-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} {tenant?.name} — Portal del Socio SaaS Multi-Tenant</p>
      </footer>
    </div>
  );
}
