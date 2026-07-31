'use client';

import React, { useState } from 'react';
import { Expense } from '@club-digital-pro/shared';
import { ArrowDownRight, Plus } from 'lucide-react';

const mockExpensesList: Expense[] = [
  { id: 'exp-1', tenantId: 'tenant-default-001', category: 'DEPORTES', description: 'Arbitrajes e insumos fixture de partidos', amount: 45000, date: new Date('2026-07-12') },
  { id: 'exp-2', tenantId: 'tenant-default-001', category: 'MANTENIMIENTO', description: 'Insumos de cloro y filtrado natatorio', amount: 18000, date: new Date('2026-07-14') },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpensesList);
  const [category, setCategory] = useState('DEPORTES');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      tenantId: 'tenant-default-001',
      category,
      description,
      amount: parseFloat(amount),
      date: new Date(),
    };

    setExpenses([newExp, ...expenses]);
    setDescription('');
    setAmount('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Registro de Gastos & Egresos</h1>
          <p className="text-slate-400 text-xs mt-0.5">Control de egresos por deportes, infraestructura, salarios y servicios.</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Egreso</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="glass-card p-6 rounded-2xl border border-rose-500/30 space-y-4 animate-in fade-in">
          <h3 className="font-bold text-white text-sm">Registrar Nuevo Egreso</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white">
                <option value="DEPORTES">Gastos Deportivos & Arbitrajes</option>
                <option value="MANTENIMIENTO">Mantenimiento & Limpieza</option>
                <option value="SERVICIOS">Luz, Agua, Gas & Conectividad</option>
                <option value="SALARIOS">Sueldos Staff & Profesores</option>
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
            <button type="submit" className="px-6 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md">Guardar Egreso</button>
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
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-sans font-bold text-rose-400 flex items-center gap-1">
                  <ArrowDownRight className="w-3.5 h-3.5" /> {exp.category}
                </td>
                <td className="p-4 font-sans text-slate-200">{exp.description}</td>
                <td className="p-4 text-slate-400">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="p-4 text-right font-bold text-rose-400">-${exp.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
