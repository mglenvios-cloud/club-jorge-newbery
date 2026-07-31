'use client';

import React from 'react';
import { Receipt, DollarSign, Download, ArrowUpRight } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Facturación & Control de MRR</h1>
          <p className="text-slate-400 text-xs mt-1">Historial de cobros de suscripciones SaaS a los clubes afiliados.</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-xl border border-emerald-500/20 text-emerald-400 font-mono font-bold text-sm flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>MRR Actual: $18,450 USD</span>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">N° Comprobante</th>
              <th className="p-4">Club Registrado</th>
              <th className="p-4">Monto ($)</th>
              <th className="p-4">Fecha Emisión</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Factura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { inv: 'INV-2026-001', club: 'Club Atlético San Martín', amount: '$299.00', date: '2026-07-01', status: 'PAID' },
              { inv: 'INV-2026-002', club: 'Club Italiano', amount: '$129.00', date: '2026-07-01', status: 'PAID' },
              { inv: 'INV-2026-003', club: 'Club Náutico del Este', amount: '$49.00', date: '2026-07-01', status: 'OVERDUE' },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="p-4 font-mono text-slate-300 font-bold flex items-center gap-2">
                  <Receipt className="w-3.5 h-3.5 text-blue-400" />
                  <span>{row.inv}</span>
                </td>
                <td className="p-4 font-bold text-white">{row.club}</td>
                <td className="p-4 font-mono font-bold text-emerald-400">{row.amount}</td>
                <td className="p-4 text-slate-400 font-mono">{row.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
