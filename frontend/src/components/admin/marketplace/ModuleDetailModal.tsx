'use client';

import React, { useState } from 'react';
import { MarketplaceModule } from '@club-digital-pro/shared';
import {
  X,
  Check,
  Download,
  Trash2,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Blocks,
  Clock,
  User,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ModuleDetailModalProps {
  module: MarketplaceModule | null;
  onClose: () => void;
  onAction: (moduleCode: string, action: 'INSTALL' | 'UNINSTALL' | 'ENABLE' | 'DISABLE' | 'UPDATE') => void;
}

export function ModuleDetailModal({ module, onClose, onAction }: ModuleDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CHANGELOG' | 'PERMISSIONS'>('OVERVIEW');

  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-xl">
              <Blocks className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">{module.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 font-mono">
                  v{module.version}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Por <strong className="text-white">{module.author}</strong> • Categoría: <span className="font-mono text-sky-400">{module.category}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`pb-2 transition-colors ${activeTab === 'OVERVIEW' ? 'text-blue-400 border-b-2 border-blue-500 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Descripción & Vistas Previas
          </button>
          <button
            onClick={() => setActiveTab('CHANGELOG')}
            className={`pb-2 transition-colors ${activeTab === 'CHANGELOG' ? 'text-blue-400 border-b-2 border-blue-500 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Historial de Versiones (Changelog)
          </button>
          <button
            onClick={() => setActiveTab('PERMISSIONS')}
            className={`pb-2 transition-colors ${activeTab === 'PERMISSIONS' ? 'text-blue-400 border-b-2 border-blue-500 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Permisos & Dependencias
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-300 leading-relaxed">{module.description}</p>

              {/* Screenshots gallery */}
              {module.images && module.images.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Imágenes & Interfaz</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {module.images.map((imgUrl, idx) => (
                      <img key={idx} src={imgUrl} alt="Screenshot" className="w-full h-40 object-cover rounded-2xl border border-slate-800 shadow-md" />
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Licencia</span>
                  <span className="font-bold text-slate-200">{module.license}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Compatibilidad</span>
                  <span className="font-bold text-slate-200">{module.compatibility}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Precio Recurrente</span>
                  <span className="font-bold text-emerald-400 font-mono">${module.monthlyPrice} /mo</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Estado Global</span>
                  <span className="font-bold text-blue-400">{module.isInstalled ? (module.isEnabled ? 'Habilitado' : 'Deshabilitado') : 'Disponible'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CHANGELOG' && (
            <div className="space-y-4">
              {module.changelog.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Versión {item.version}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {item.changes.map((change, cIdx) => (
                      <li key={cIdx}>{change}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'PERMISSIONS' && (
            <div className="space-y-6 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-white text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Permisos Requeridos por el Módulo</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {module.permissions.map((p) => (
                    <span key={p} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-white text-xs flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Dependencias Necesarias</span>
                </span>
                {module.dependencies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {module.dependencies.map((dep) => (
                      <span key={dep} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-mono font-bold">
                        Módulo: {dep}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">Este módulo no requiere dependencias adicionales.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
          >
            Cerrar
          </button>

          <div className="flex items-center gap-3">
            {module.isInstalled ? (
              <>
                {module.hasUpdate && (
                  <button
                    onClick={() => {
                      onAction(module.code, 'UPDATE');
                      onClose();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Actualizar a v{module.latestVersion}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onAction(module.code, module.isEnabled ? 'DISABLE' : 'ENABLE');
                    onClose();
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 ${
                    module.isEnabled
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {module.isEnabled ? <ToggleLeft className="w-4 h-4 text-rose-400" /> : <ToggleRight className="w-4 h-4 text-emerald-400" />}
                  <span>{module.isEnabled ? 'Deshabilitar Módulo' : 'Habilitar Módulo'}</span>
                </button>

                <button
                  onClick={() => {
                    onAction(module.code, 'UNINSTALL');
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs flex items-center gap-2 border border-rose-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Desinstalar</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onAction(module.code, 'INSTALL');
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Instalar Módulo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
