'use client';

import React, { useState } from 'react';
import { Income } from '@club-digital-pro/shared';
import { ArrowUpRight, Plus, DollarSign } from 'lucide-react';

const mockIncomesList: Income[] = [
  { id: 'inc-1', tenantId: 'tenant-default-001', category: 'CUOTAS', description: 'Recaudación cuotas sociales mensualidad Julio', amount: 145000, date: new Date('2026-07-15') },
  { id: 'inc-2', tenantId: 'tenant-default-001', category: 'SPONSORS', description: 'Canon sponsoreo Banco Macro Pro', amount: 80000, date: new Date('2026-07-10') },
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>(mockIncomesList);
  const [category, setCategory] = useState('SPONSORS');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newInc: Income = {
      id: `inc-${Date.now()}`,
      tenantId: 'tenant-default-001',
      category,
      description,
      amount: parseFloat(amount),
      date: new Date(),
    };

    setIncomes([newInc, ...incomes]);
    setDescription('');
    setAmount('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Registro de Ingresos</h1>
          <p className="text-slate-400 text-xs mt-0.5">Control de ingresos por sponsors, concesiones, eventos y cuotas.</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nuevo Ingreso</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="glass-card p-6 rounded-2xl border border-emerald-500/30 space-y-4 animate-in fade-in">
          <h3 className="font-bold text-white text-sm">Nuevo Ingreso a Tesorería</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white">
                <option value="SPONSORS">Sponsors & Auspicios</option>
                <option value="ALQUILERES">Alquiler de Canchas/Salones</option>
                <option value="EVENTOS">Entradas & Eventos</option>
                <option value="VARIOS">Ingresos Varios</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Concepto / Descripción</label>
              <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white" />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Monto ($ ARS)</label>
              <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">Cancelar</button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md">Guardar Ingreso</button>
          </div>
        </form>
      )}

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Categoría</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Fecha</th>
              <th className="p-4 text-right">Monto ($ ARS)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {incomes.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-sans font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {inc.category}
                </td>
                <td className="p-4 font-sans text-slate-200">{inc.description}</td>
                <td className="p-4 text-slate-400">{new Date(inc.date).toLocaleDateString()}</td>
                <td className="p-4 text-right font-bold text-emerald-400">+${inc.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
