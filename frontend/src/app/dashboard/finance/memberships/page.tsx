'use client';

import React, { useState } from 'react';
import { MembershipPlan } from '@club-digital-pro/shared';
import { CreditCard, Plus, Check, Users, Sparkles } from 'lucide-react';

const mockPlansList: MembershipPlan[] = [
  { id: 'plan-1', tenantId: 'tenant-default-001', name: 'Socio Activo', description: 'Acceso a instalaciones deportivas y eventos institucionales.', price: 12500, period: 'MONTHLY', active: true, createdAt: new Date() },
  { id: 'plan-2', tenantId: 'tenant-default-001', name: 'Socio Familiar', description: 'Grupo familiar de hasta 4 integrantes con pase libre a sedes.', price: 24000, period: 'MONTHLY', active: true, createdAt: new Date() },
  { id: 'plan-3', tenantId: 'tenant-default-001', name: 'Socio Premium', description: 'Gimnasio, natatorio, eventos VIP y descuentos en merchandising.', price: 35000, period: 'MONTHLY', active: true, createdAt: new Date() },
];

export default function MembershipsPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>(mockPlansList);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newPlan: MembershipPlan = {
      id: `plan-${Date.now()}`,
      tenantId: 'tenant-default-001',
      name,
      description,
      price: parseFloat(price),
      period: 'MONTHLY',
      active: true,
      createdAt: new Date(),
    };

    setPlans([...plans, newPlan]);
    setName('');
    setPrice('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Planes de Cuotas Sociales & Categorías</h1>
          <p className="text-slate-400 text-xs mt-0.5">Configuración de aranceles periódicos por tipo de afiliación.</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nuevo Plan de Cuota</span>
        </button>
      </div>

      {/* Add Plan Form Modal */}
      {isAdding && (
        <form onSubmit={handleCreate} className="glass-card p-6 rounded-2xl border border-blue-500/30 space-y-4 animate-in fade-in">
          <h3 className="font-bold text-white text-sm">Nuevo Plan de Afiliación</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Nombre del Plan</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Socio Juvenil"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Precio Mensual ($ ARS)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="15000"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-semibold text-slate-300">Descripción & Beneficios</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beneficios incluidos en la cuota..."
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md">
              Guardar Plan
            </button>
          </div>
        </form>
      )}

      {/* Plans Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-[10px] font-bold font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {p.period}
                </span>
                <span className="text-xs text-emerald-400 font-bold">ACTIVO</span>
              </div>
              <h3 className="font-extrabold text-white text-lg">{p.name}</h3>
              <p className="text-xs text-slate-400">{p.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-400 font-mono">${p.price.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 font-mono">ARS / mes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
