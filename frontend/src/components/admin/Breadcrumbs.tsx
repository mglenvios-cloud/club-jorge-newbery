'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  admin: 'Super Admin',
  clubs: 'Gestión de Clubes',
  wizard: 'Club Wizard (Onboarding)',
  plans: 'Planes SaaS',
  licenses: 'Licencias',
  marketplace: 'Marketplace de Módulos',
  branding: 'Sistema de Branding',
  modules: 'Catálogo de Módulos',
  users: 'Gestión de Usuarios',
  billing: 'Facturación & MRR',
  audit: 'Logs de Auditoría',
  settings: 'Configuración Global',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400">
      <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Centro Corporativo</span>
      </Link>

      {segments.map((segment, idx) => {
        const url = `/${segments.slice(0, idx + 1).join('/')}`;
        const isLast = idx === segments.length - 1;
        const label = routeLabels[segment] || segment;

        return (
          <React.Fragment key={url}>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            {isLast ? (
              <span className="font-semibold text-white">{label}</span>
            ) : (
              <Link href={url} className="hover:text-white transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
