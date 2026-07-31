'use client';

import React, { useState } from 'react';
import { useTenant } from '@/components/providers/TenantProvider';
import { Palette, Layers, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const { tenant, updateBranding } = useTenant();
  const [primaryColor, setPrimaryColor] = useState(tenant?.branding.primaryColor || '#2563eb');
  const [secondaryColor, setSecondaryColor] = useState(tenant?.branding.secondaryColor || '#0f172a');
  const [accentColor, setAccentColor] = useState(tenant?.branding.accentColor || '#38bdf8');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding({
      primaryColor,
      secondaryColor,
      accentColor,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Configuración del Tenant & Branding</h1>
        <p className="text-slate-400 text-xs mt-1">
          Personalice la identidad visual y los colores institucionales del club dinámicamente.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Palette className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold text-white text-base">Identidad Cromática Dinámica</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Color Primario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-slate-900 border border-slate-700"
              />
              <span className="font-mono text-xs text-slate-400 uppercase">{primaryColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Color Secundario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-slate-900 border border-slate-700"
              />
              <span className="font-mono text-xs text-slate-400 uppercase">{secondaryColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Color de Acento</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-slate-900 border border-slate-700"
              />
              <span className="font-mono text-xs text-slate-400 uppercase">{accentColor}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          {saved ? (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <Check className="w-4 h-4" />
              <span>¡Branding actualizado con éxito!</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500">Los cambios aplican en tiempo real al tema del sistema.</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Branding</span>
          </button>
        </div>
      </form>

      {/* Tenant Info */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <Layers className="w-5 h-5 text-sky-400" />
          <h2 className="font-bold text-white text-base">Información Técnica del Tenant</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400">ID de Tenant:</span>
            <p className="font-mono text-slate-200 font-bold">{tenant?.id}</p>
          </div>
          <div>
            <span className="text-slate-400">Nombre del Tenant:</span>
            <p className="font-mono text-slate-200 font-bold">{tenant?.name}</p>
          </div>
          <div>
            <span className="text-slate-400">Slug Dominio:</span>
            <p className="font-mono text-slate-200 font-bold">{tenant?.slug}</p>
          </div>
          <div>
            <span className="text-slate-400">Plan de Suscripción:</span>
            <p className="font-mono text-blue-400 font-bold">{tenant?.plan}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
