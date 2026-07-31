'use client';

import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Users, TrendingUp, Sparkles, CreditCard } from 'lucide-react';

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Executive Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Ingresos del Mes</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">$225,000</div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +15.2% vs mes anterior
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Gastos del Mes</span>
          <div className="text-2xl font-black text-rose-400 font-mono">$63,000</div>
          <span className="text-[10px] text-slate-400 font-mono">Costos operativos y deportes</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Socios Activos Pagadores</span>
          <div className="text-2xl font-black text-white font-mono">250</div>
          <span className="text-[10px] text-blue-400 font-mono">92.8% de cobrabilidad</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 space-y-1 bg-emerald-950/20">
          <span className="text-xs text-emerald-400 font-semibold">Balance Consolidado</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">$162,000</div>
          <span className="text-[10px] text-emerald-300 font-mono font-bold">Caja neta superavitaria</span>
        </div>
      </div>

      {/* Financial Charts & AI Insight Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Monthly Revenue vs Expenses Bar Chart mockup */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Evolución Mensual de Ingresos vs Gastos</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Año 2026</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-4 pt-4 text-xs font-mono">
            {[
              { month: 'Ene', inc: 70, exp: 30 },
              { month: 'Feb', inc: 75, exp: 35 },
              { month: 'Mar', inc: 85, exp: 40 },
              { month: 'Abr', inc: 80, exp: 38 },
              { month: 'May', inc: 90, exp: 42 },
              { month: 'Jun', inc: 95, exp: 45 },
              { month: 'Jul', inc: 100, exp: 30 },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div style={{ height: `${bar.inc}%` }} className="w-1/2 bg-emerald-500 rounded-t" title={`Ingresos ${bar.month}`} />
                  <div style={{ height: `${bar.exp}%` }} className="w-1/2 bg-rose-500 rounded-t" title={`Gastos ${bar.month}`} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Financial Executive Report */}
        <div className="glass-card p-6 rounded-3xl border border-blue-500/30 space-y-4 bg-gradient-to-b from-blue-950/20 to-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Análisis Inteligente de Finanzas</h3>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            La recaudación aumentó 15.2% este mes. Los gastos deportivos representan el 42% de los costos totales. Se sugiere enviar avisos de cobranza a los 18 socios morosos pendientes.
          </p>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-blue-400 font-mono font-bold flex items-center justify-between">
            <span>Sugerencia: Renovar Sponsors</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
