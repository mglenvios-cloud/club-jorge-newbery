'use client';

import React from 'react';
import { Key, Plus, Copy, CheckCircle2 } from 'lucide-react';

export default function LicensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Licencias & Llaves de Activación</h1>
          <p className="text-slate-400 text-xs mt-1">Generación y monitoreo de claves de vigencia por institución.</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30">
          <Plus className="w-4 h-4" />
          <span>Generar Nueva Licencia</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Club</th>
              <th className="p-4">Llave de Licencia (Token)</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Vencimiento</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { club: 'Club Atlético San Martín', key: 'CDP-ENT-2026-99A1-X992', plan: 'ENTERPRISE', exp: '2027-01-15', status: 'ACTIVE' },
              { club: 'Club Italiano', key: 'CDP-PRO-2026-11B3-K401', plan: 'PROFESSIONAL', exp: '2026-08-10', status: 'ACTIVE' },
              { club: 'Club Náutico del Este', key: 'CDP-STR-2025-44C0-M009', plan: 'STARTER', exp: '2025-12-31', status: 'EXPIRED' },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white">{row.club}</td>
                <td className="p-4 font-mono text-slate-300 flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-purple-400" />
                  <span>{row.key}</span>
                </td>
                <td className="p-4 font-semibold text-blue-400">{row.plan}</td>
                <td className="p-4 text-slate-400 font-mono">{row.exp}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800" title="Copiar Llave">
                    <Copy className="w-4 h-4" />
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
