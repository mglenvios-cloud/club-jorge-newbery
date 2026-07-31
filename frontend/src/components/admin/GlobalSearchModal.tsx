'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Building2, User, Key, Layers, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar clubes, usuarios, licencias, módulos, facturación... (Ctrl + K)"
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Links / Results */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-3 mb-2">Acceso Rápido Corporativo</p>
          
          <button
            onClick={() => navigateTo('/admin/clubs')}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs font-semibold text-white">Gestión de Clubes</p>
                <p className="text-[10px] text-slate-400">Ver directorio de 24 clubes registrados</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigateTo('/admin/clubs/wizard')}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-sky-400" />
              <div>
                <p className="text-xs font-semibold text-white">Club Wizard (Onboarding)</p>
                <p className="text-[10px] text-slate-400">Asistente para dar de alta una nueva institución</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigateTo('/admin/users')}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-xs font-semibold text-white">Usuarios & Permisos</p>
                <p className="text-[10px] text-slate-400">Super Admins y administradores institucionales</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigateTo('/admin/licenses')}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-3">
              <Key className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs font-semibold text-white">Licencias SaaS</p>
                <p className="text-[10px] text-slate-400">Gestión de llaves de activación y vigencias</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
