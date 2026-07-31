'use client';

import React from 'react';
import { Blocks, ToggleRight, ToggleLeft } from 'lucide-react';

export default function ModulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Catálogo de Módulos Globales</h1>
        <p className="text-slate-400 text-xs mt-1">Feature Flags generales para habilitar o restringir módulos a nivel de plataforma.</p>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Código / Módulo</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Estado Global</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { code: 'SOCIOS', name: 'Gestión de Socios & Carnets', cat: 'CORE', desc: 'Padrón de afiliados, estados, vínculos familiares y carnets digitales.', active: true },
              { code: 'FINANZAS', name: 'Tesorería & Cuotas Sociales', cat: 'FINANCE', desc: 'Cobranza recurrente, facturación electrónica y pasarelas online.', active: true },
              { code: 'DEPORTES', name: 'Gestión Deportiva & Canchas', cat: 'SPORTS', desc: 'Reserva de turnos, actividades, torneos y profesores.', active: true },
              { code: 'MARKETING', name: 'Campañas & Mailer Institucional', cat: 'COMMUNICATION', desc: 'Envío masivo de comunicados y fidelización de socios.', active: true },
              { code: 'TV', name: 'Streaming & Eventos en Vivo', cat: 'MEDIA', desc: 'Transmisión multi-cam y contenido bajo demanda.', active: true },
            ].map((mod, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white flex items-center gap-3">
                  <Blocks className="w-4 h-4 text-blue-400" />
                  <div>
                    <span>{mod.name}</span>
                    <span className="block text-[10px] text-slate-500 font-mono">{mod.code}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-slate-400">{mod.cat}</td>
                <td className="p-4 text-slate-300">{mod.desc}</td>
                <td className="p-4">
                  <button className="text-emerald-400 flex items-center gap-1 font-bold">
                    <ToggleRight className="w-6 h-6 text-emerald-400" />
                    <span>ACTIVO</span>
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
