'use client';

import React from 'react';
import {
  Building2,
  DollarSign,
  Users,
  Activity,
  Key,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminExecutiveDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Centro Corporativo Super Admin</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Dashboard Ejecutivo SaaS
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Supervisión de la plataforma del Club Atlético Jorge Newbery y métricas institucionales.
          </p>
        </div>

        <Link
          href="/admin/clubs/wizard"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nuevo Club</span>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Clubes Registrados</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">24</div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-emerald-400 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +12.5%
            </span>
            <span className="text-slate-500">este mes (21 activos)</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Ingreso Recurrente Mensual (MRR)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">$18,450</div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-emerald-400 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +8.3%
            </span>
            <span className="text-slate-500">vs mes anterior</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Socios Globales</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">14,200</div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-sky-400 font-bold">En todos los tenants</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Salud del Sistema (SLA)</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">99.8%</div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-emerald-400 font-bold">Sin interrupciones</span>
          </div>
        </div>
      </div>

      {/* Distribution Charts & Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Distribution */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Distribución por Plan SaaS</h3>
            <span className="text-xs text-slate-400 font-mono">Conexión DB Lista</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Plan Enterprise ($299/mo)</span>
                <span className="text-blue-400 font-mono">10 Clubes (41.6%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[41.6%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Plan Professional ($129/mo)</span>
                <span className="text-sky-400 font-mono">11 Clubes (45.8%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full w-[45.8%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Plan Starter ($49/mo)</span>
                <span className="text-amber-400 font-mono">3 Clubes (12.5%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[12.5%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick System Diagnostics */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Diagnóstico de Plataforma</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">Licencias Activas</span>
              </div>
              <span className="font-bold text-white font-mono">28 / 30</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Auditorías Hoy</span>
              </div>
              <span className="font-bold text-white font-mono">142 eventos</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                <span className="text-slate-300">Latencia API Backend</span>
              </div>
              <span className="font-bold text-emerald-400 font-mono">42ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
