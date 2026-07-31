'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CreditCard, DollarSign, Receipt, ArrowUpRight, ArrowDownRight, Landmark, BarChart3, Sparkles } from 'lucide-react';

const financeSubNav = [
  { name: 'Dashboard Financiero', href: '/dashboard/finance', icon: LayoutDashboard },
  { name: 'Cuotas Sociales', href: '/dashboard/finance/memberships', icon: CreditCard },
  { name: 'Pagos & MP', href: '/dashboard/finance/payments', icon: DollarSign },
  { name: 'Facturación', href: '/dashboard/finance/invoices', icon: Receipt },
  { name: 'Ingresos', href: '/dashboard/finance/income', icon: ArrowUpRight },
  { name: 'Gastos', href: '/dashboard/finance/expenses', icon: ArrowDownRight },
  { name: 'Caja', href: '/dashboard/finance/cash', icon: Landmark },
  { name: 'Reportes & IA', href: '/dashboard/finance/reports', icon: BarChart3, badge: 'IA Pro' },
];

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Club Finance Pro + Billing Multi-Tenant</h1>
          <p className="text-slate-400 text-xs mt-1">
            Administración económica completa, pasarela Mercado Pago, facturación y reportes financieros automáticos con IA.
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {financeSubNav.map((item) => {
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
