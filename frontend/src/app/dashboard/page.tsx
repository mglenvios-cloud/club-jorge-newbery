'use client';

import React from 'react';
import { useTenant } from '@/components/providers/TenantProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { Server, Shield, Layers, CheckCircle2, Cpu, Activity, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { tenant } = useTenant();
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>Plataforma Base Inicializada</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bienvenido, {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Consola central de la infraestructura SaaS para <strong className="text-white">{tenant?.name}</strong>. Aislamiento multi-tenant activo y sistema de permisos RBAC listo.
            </p>
          </div>

          <Link
            href="/dashboard/settings"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 shrink-0 flex items-center justify-center gap-2"
          >
            <span>Configurar Tenant</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Placeholder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">Estado del Tenant</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white">{tenant?.status || 'ACTIVO'}</div>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">Plan: {tenant?.plan}</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">Contexto Multi-Tenant</span>
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white">Aislado</div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Slug: {tenant?.slug}</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">Rol del Usuario</span>
            <span className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Shield className="w-4 h-4" />
            </span>
          </div>
          <div className="text-xl font-bold text-white truncate">{user?.role}</div>
          <p className="text-[11px] text-sky-400 mt-1 font-mono">Permisos: {user?.permissions.length}</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">API Backend</span>
            <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Server className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white">Operational</div>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">Express + Prisma</p>
        </div>
      </div>

      {/* Infrastructure Status Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-white text-base">Checklist de la Plataforma Base</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Next.js 14 App Router & React</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Tailwind CSS & Theme Provider</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Express API & TypeScript</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Prisma ORM Multi-Tenant Schema</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Tenant & Auth Providers</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Layout Shell & Landing Corporate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
