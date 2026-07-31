'use client';

import React from 'react';
import { Sliders, Save, Database, ShieldCheck, Globe } from 'lucide-react';

export default function GlobalSettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Configuración Global del SaaS</h1>
        <p className="text-slate-400 text-xs mt-1">Parámetros del sistema, dominios base y llaves de cifrado para toda la plataforma.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Globe className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold text-white text-base">Parámetros de Red & Dominios</h2>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            <label className="font-semibold text-slate-300">Dominio Base SaaS</label>
            <input
              type="text"
              defaultValue="clubdigitalpro.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-slate-300">URL del Backend API</label>
            <input
              type="text"
              defaultValue="https://api.clubdigitalpro.com/api"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          <button className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30">
            <Save className="w-4 h-4" />
            <span>Guardar Configuración Global</span>
          </button>
        </div>
      </div>
    </div>
  );
}
