'use client';

import React from 'react';
import { Landmark, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function CashMovementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Caja & Movimientos de Tesorería</h1>
        <p className="text-slate-400 text-xs mt-0.5">Seguimiento en tiempo real de flujo de caja e ingresos/egresos directos.</p>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Tipo</th>
              <th className="p-4">Descripción del Movimiento</th>
              <th className="p-4">Fecha</th>
              <th className="p-4 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {[
              { id: '1', type: 'INCOME', desc: 'Cobro de cuota social en efectivo', amount: 12500, date: '2026-07-21 11:20' },
              { id: '2', type: 'EXPENSE', desc: 'Compra de materiales de oficina y recibos', amount: 3200, date: '2026-07-21 14:05' },
            ].map((m) => (
              <tr key={m.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-sans font-bold">
                  {m.type === 'INCOME' ? (
                    <span className="text-emerald-400 flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" /> INGRESO</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><ArrowDownRight className="w-3.5 h-3.5" /> EGRESO</span>
                  )}
                </td>
                <td className="p-4 font-sans text-slate-200">{m.desc}</td>
                <td className="p-4 text-slate-400">{m.date}</td>
                <td className={`p-4 text-right font-bold ${m.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {m.type === 'INCOME' ? '+' : '-'}${m.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
