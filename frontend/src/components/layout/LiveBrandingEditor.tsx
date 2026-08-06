'use client';

import React, { useState } from 'react';
import { useTenant } from '@/components/providers/TenantProvider';
import { Palette, X, Sparkles, Check, Type, Eye } from 'lucide-react';

const FONT_OPTIONS = [
  { label: 'Inter (Predeterminada)', value: "'Inter', sans-serif" },
  { label: 'Roboto (Moderna)', value: "'Roboto', sans-serif" },
  { label: 'Montserrat (Geométrica)', value: "'Montserrat', sans-serif" },
  { label: 'Outfit (Moderna Tech)', value: "'Outfit', sans-serif" },
  { label: 'Sistema Sans-Serif', value: "system-ui, sans-serif" },
];

const FONT_SIZE_OPTIONS = [
  { label: 'Normal (16px)', value: '16px' },
  { label: 'Mediano (17px)', value: '17px' },
  { label: 'Grande (18px)', value: '18px' },
  { label: 'Extra Grande (20px)', value: '20px' },
];

export function LiveBrandingEditor() {
  const { tenant, updateBranding } = useTenant();
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(tenant?.name || 'Club Atlético Jorge Newbery');
  const [primaryColor, setPrimaryColor] = useState(tenant?.branding?.primaryColor || '#dc2626');
  const [secondaryColor, setSecondaryColor] = useState(tenant?.branding?.secondaryColor || '#0a0a0a');
  const [accentColor, setAccentColor] = useState(tenant?.branding?.accentColor || '#ffffff');
  const [fontFamily, setFontFamily] = useState(tenant?.branding?.fontFamily || "'Inter', sans-serif");
  const [fontSize, setFontSize] = useState(tenant?.branding?.fontSize || '16px');
  const [saved, setSaved] = useState(false);

  const handleOpen = () => {
    if (tenant) {
      setName(tenant.name);
      setPrimaryColor(tenant.branding.primaryColor || '#dc2626');
      setSecondaryColor(tenant.branding.secondaryColor || '#0a0a0a');
      setAccentColor(tenant.branding.accentColor || '#ffffff');
      setFontFamily(tenant.branding.fontFamily || "'Inter', sans-serif");
      setFontSize(tenant.branding.fontSize || '16px');
    }
    setIsOpen(true);
  };

  const applyChanges = (
    pColor = primaryColor,
    sColor = secondaryColor,
    aColor = accentColor,
    cName = name,
    fFamily = fontFamily,
    fSize = fontSize
  ) => {
    updateBranding({
      name: cName,
      primaryColor: pColor,
      secondaryColor: sColor,
      accentColor: aColor,
      fontFamily: fFamily,
      fontSize: fSize,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/90 border border-blue-500/40 text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-md group"
        title="Abrir Editor en Vivo"
      >
        <Palette className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform" />
        <span>Editor en Vivo</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>

      {/* Drawer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full overflow-y-auto flex flex-col shadow-2xl">
            {/* Panel Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 sticky top-0 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-white text-base tracking-tight">Editor en Vivo</h2>
                  <p className="text-slate-400 text-xs">Nombre, Paleta de 3 Colores, Tipografía y Pelota 3D</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="p-6 space-y-6 flex-1">
              {/* 1. Club Name */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">
                  Nombre del Club
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    applyChanges(primaryColor, secondaryColor, accentColor, e.target.value, fontFamily, fontSize);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* 2. 3-Color Palette */}
              <div className="space-y-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Paleta de 3 Colores
                  </h3>
                  <div className="flex gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: primaryColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: secondaryColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: accentColor }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">1. Color Primario (Pelota 3D & Acentos)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => {
                          setPrimaryColor(e.target.value);
                          applyChanges(e.target.value, secondaryColor, accentColor, name, fontFamily, fontSize);
                        }}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-slate-900 border border-slate-700"
                      />
                      <span className="font-mono text-xs text-slate-400 uppercase">{primaryColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">2. Color Secundario (Fondo)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => {
                          setSecondaryColor(e.target.value);
                          applyChanges(primaryColor, e.target.value, accentColor, name, fontFamily, fontSize);
                        }}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-slate-900 border border-slate-700"
                      />
                      <span className="font-mono text-xs text-slate-400 uppercase">{secondaryColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">3. Color de Acento</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => {
                          setAccentColor(e.target.value);
                          applyChanges(primaryColor, secondaryColor, e.target.value, name, fontFamily, fontSize);
                        }}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-slate-900 border border-slate-700"
                      />
                      <span className="font-mono text-xs text-slate-400 uppercase">{accentColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Typography & Font Size */}
              <div className="space-y-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4 text-blue-400" />
                  <span>Tipografía & Tamaño</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      Fuente Tipográfica
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => {
                        setFontFamily(e.target.value);
                        applyChanges(primaryColor, secondaryColor, accentColor, name, e.target.value, fontSize);
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
                    >
                      {FONT_OPTIONS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      Tamaño de Letra del Sistema
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {FONT_SIZE_OPTIONS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => {
                            setFontSize(s.value);
                            applyChanges(primaryColor, secondaryColor, accentColor, name, fontFamily, s.value);
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                            fontSize === s.value
                              ? 'bg-blue-600/20 text-blue-400 border-blue-500'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
              {saved ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Check className="w-4 h-4" />
                  <span>¡Cambios guardados!</span>
                </div>
              ) : (
                <span className="text-[10px] text-slate-500">Actualiza todas las vistas dinámicamente</span>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all"
              >
                Cerrar Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
