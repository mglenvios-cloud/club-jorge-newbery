'use client';

import React from 'react';
import { CreditCard, Check, Plus } from 'lucide-react';

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Gestión de Planes SaaS</h1>
          <p className="text-slate-400 text-xs mt-1">Configure los precios, cuotas de socios e inclusión de módulos por plan.</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30">
          <Plus className="w-4 h-4" />
          <span>Crear Plan Custom</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Starter', price: '$49', period: '/mes', members: 'Hasta 500 socios', modules: ['SOCIOS'] },
          { name: 'Professional', price: '$129', period: '/mes', members: 'Socios Ilimitados', modules: ['SOCIOS', 'FINANZAS', 'DEPORTES'] },
          { name: 'Enterprise', price: '$299', period: '/mes', members: 'Ilimitado + Dominio Custom', modules: ['TODOS LOS MÓDULOS'] },
        ].map((p, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-base">{p.name}</span>
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{p.price}<span className="text-xs text-slate-400 font-normal">{p.period}</span></div>
            <p className="text-xs text-slate-300 font-semibold">{p.members}</p>
            <div className="h-px bg-slate-800"></div>
            <ul className="space-y-2 text-xs text-slate-400">
              {p.modules.map((m, mIdx) => (
                <li key={mIdx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
