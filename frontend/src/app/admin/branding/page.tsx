'use client';

import React from 'react';
import { Palette, Check, Save } from 'lucide-react';

export default function GlobalBrandingPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Sistema de Branding Global & Presets</h1>
        <p className="text-slate-400 text-xs mt-1">Configure las paletas por defecto y patrones de UI corporativos para nuevos clubes.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Palette className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold text-white text-base">Preset por Defecto del SaaS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400">Color Primario Predeterminado</span>
            <div className="h-10 rounded-lg bg-blue-600 flex items-center px-3 font-mono text-xs text-white">#2563EB</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400">Color Secundario Predeterminado</span>
            <div className="h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center px-3 font-mono text-xs text-white">#0F172A</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400">Color Acento Predeterminado</span>
            <div className="h-10 rounded-lg bg-sky-400 flex items-center px-3 font-mono text-xs text-slate-950 font-bold">#38BDF8</div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30">
            <Save className="w-4 h-4" />
            <span>Guardar Presets Globales</span>
          </button>
        </div>
      </div>
    </div>
  );
}
