'use client';

import React from 'react';
import { ShieldAlert, Info, AlertTriangle, Terminal } from 'lucide-react';

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Logs de Auditoría & Seguridad</h1>
        <p className="text-slate-400 text-xs mt-1">Registro inmutable de acciones críticas realizadas por usuarios e impersonaciones.</p>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Timestamp</th>
              <th className="p-4">Usuario</th>
              <th className="p-4">Tenant Scope</th>
              <th className="p-4">Acción Ejecutada</th>
              <th className="p-4">Severidad</th>
              <th className="p-4">Dirección IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {[
              { time: '2026-07-21 18:20:12', user: 'admin@clubdigitalpro.com', scope: 'GLOBAL', action: 'TENANT_PLAN_UPDATED (Club Italiano -> PRO)', sev: 'INFO', ip: '190.18.22.4' },
              { time: '2026-07-21 17:45:00', user: 'admin@sanmartin.org', scope: 'sanmartin', action: 'BULK_MEMBER_IMPORT (340 rows)', sev: 'INFO', ip: '201.252.10.2' },
              { time: '2026-07-21 14:10:55', user: 'SYSTEM_MONITOR', scope: 'nautico-este', action: 'TENANT_AUTO_SUSPENDED (Invoice Overdue)', sev: 'WARNING', ip: '127.0.0.1' },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="p-4 text-slate-400">{row.time}</td>
                <td className="p-4 text-white font-bold">{row.user}</td>
                <td className="p-4 text-blue-400">{row.scope}</td>
                <td className="p-4 text-slate-200">{row.action}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.sev === 'INFO' ? 'bg-sky-500/10 text-sky-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {row.sev}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{row.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
