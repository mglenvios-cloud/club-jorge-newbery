'use client';

import React, { useState } from 'react';
import { Discipline } from '@club-digital-pro/shared';
import { Trophy, Plus, Users, Layers, ShieldCheck, Activity, Waves } from 'lucide-react';

const mockDisciplinesList: Discipline[] = [
  { id: 'disc-1', tenantId: 'tenant-default-001', name: 'Fútbol Masculino', code: 'FUT-MASC', icon: 'Trophy', categoriesCount: 4, athletesCount: 85 },
  { id: 'disc-2', tenantId: 'tenant-default-001', name: 'Básquet', code: 'BASQUET', icon: 'Activity', categoriesCount: 3, athletesCount: 42 },
  { id: 'disc-3', tenantId: 'tenant-default-001', name: 'Hockey Femenino', code: 'HOCKEY-FEM', icon: 'Shield', categoriesCount: 3, athletesCount: 38 },
  { id: 'disc-4', tenantId: 'tenant-default-001', name: 'Natación', code: 'NATACION', icon: 'Waves', categoriesCount: 2, athletesCount: 24 },
];

export default function DisciplinesPage() {
  const [disciplines, setDisciplines] = useState<Discipline[]>(mockDisciplinesList);
  const [newDiscName, setNewDiscName] = useState('');
  const [newDiscCode, setNewDiscCode] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscName || !newDiscCode) return;

    const created: Discipline = {
      id: `disc-${Date.now()}`,
      tenantId: 'tenant-default-001',
      name: newDiscName,
      code: newDiscCode.toUpperCase(),
      icon: 'Trophy',
      categoriesCount: 1,
      athletesCount: 0,
    };

    setDisciplines([...disciplines, created]);
    setNewDiscName('');
    setNewDiscCode('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Disciplinas Institucionales</h1>
          <p className="text-slate-400 text-xs mt-0.5">Gestión de deportes, estructura de categorías y cuerpos técnicos.</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Disciplina</span>
        </button>
      </div>

      {/* Adding Form Modal / Card */}
      {isAdding && (
        <form onSubmit={handleAdd} className="glass-card p-6 rounded-2xl border border-blue-500/30 space-y-4 animate-in fade-in">
          <h3 className="font-bold text-white text-sm">Agregar Nueva Disciplina Deportiva</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Nombre de la Disciplina</label>
              <input
                type="text"
                required
                value={newDiscName}
                onChange={(e) => setNewDiscName(e.target.value)}
                placeholder="Ej: Futsal Femenino"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Código / Identificación</label>
              <input
                type="text"
                required
                value={newDiscCode}
                onChange={(e) => setNewDiscCode(e.target.value)}
                placeholder="Ej: FUTSAL-FEM"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md"
            >
              Guardar Disciplina
            </button>
          </div>
        </form>
      )}

      {/* Disciplines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {disciplines.map((disc) => (
          <div key={disc.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                {disc.code}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-white text-base">{disc.name}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>{disc.categoriesCount} Categorías</span>
                <span>•</span>
                <span>{disc.athletesCount} Deportistas</span>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-bold">
              <span>Gestionar Plantel</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
