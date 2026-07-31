'use client';

import React, { useState } from 'react';
import { TreasuryMovement, MovementType, PaymentMethod } from '@club-digital-pro/shared';
import { Landmark, ArrowUpRight, ArrowDownRight, Lock, Plus, Check } from 'lucide-react';

const mockMovementsList: TreasuryMovement[] = [
  {
    id: 'mov-001',
    tenantId: 'tenant-default-001',
    type: 'INCOME',
    category: 'CUOTAS_SOCIALES',
    concept: 'Cobro de cuotas sociales mensualidad Julio',
    amount: 21000,
    paymentMethod: 'CASH',
    createdBy: 'Caja Central',
    createdAt: new Date('2026-07-21T10:30:00'),
  },
  {
    id: 'mov-002',
    tenantId: 'tenant-default-001',
    type: 'EXPENSE',
    category: 'MANTENIMIENTO',
    concept: 'Insumos de limpieza y mantenimiento natatorio',
    amount: 4500,
    paymentMethod: 'CASH',
    createdBy: 'Caja Central',
    createdAt: new Date('2026-07-21T14:15:00'),
  },
];

export default function TreasuryPage() {
  const [movements, setMovements] = useState<TreasuryMovement[]>(mockMovementsList);
  const [type, setType] = useState<MovementType>('INCOME');
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('VARIOS');

  const [cashStatus, setCashStatus] = useState<'OPEN' | 'CLOSED'>('OPEN');

  const handleAddMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept || !amount) return;

    const newMov: TreasuryMovement = {
      id: `mov-${Date.now()}`,
      tenantId: 'tenant-default-001',
      type,
      category,
      concept,
      amount: parseFloat(amount),
      paymentMethod: 'CASH',
      createdBy: 'Caja Central',
      createdAt: new Date(),
    };

    setMovements([newMov, ...movements]);
    setConcept('');
    setAmount('');
  };

  const totalIncome = movements.filter((m) => m.type === 'INCOME').reduce((acc, m) => acc + m.amount, 0);
  const totalExpense = movements.filter((m) => m.type === 'EXPENSE').reduce((acc, m) => acc + m.amount, 0);
  const closingBalance = 15000 + totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Tesorería & Caja Diaria</h1>
          <p className="text-slate-400 text-xs mt-0.5">Control de ingresos, egresos y arqueo al cierre de jornada.</p>
        </div>

        <button
          onClick={() => setCashStatus(cashStatus === 'OPEN' ? 'CLOSED' : 'OPEN')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            cashStatus === 'OPEN'
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
              : 'bg-emerald-600 text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>{cashStatus === 'OPEN' ? 'Realizar Arqueo y Cerrar Caja' : 'Caja Cerrada (Abrir Nuevamente)'}</span>
        </button>
      </div>

      {/* Cash Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold">Saldo Inicial de Apertura</span>
          <div className="text-xl font-bold text-white font-mono">$15,000</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold">Total Ingresos del Día</span>
          <div className="text-xl font-bold text-emerald-400 font-mono">+${totalIncome.toLocaleString()}</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold">Total Egresos del Día</span>
          <div className="text-xl font-bold text-rose-400 font-mono">-${totalExpense.toLocaleString()}</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-emerald-500/30 space-y-1 bg-emerald-950/20">
          <span className="text-[11px] text-emerald-400 font-semibold">Saldo Actual en Caja</span>
          <div className="text-xl font-black text-emerald-400 font-mono">${closingBalance.toLocaleString()}</div>
        </div>
      </div>

      {/* Register Movement Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: New Movement Form */}
        <form onSubmit={handleAddMovement} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Registrar Movimiento de Caja</span>
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setType('INCOME')}
              className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1 ${
                type === 'INCOME' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> Ingreso
            </button>
            <button
              type="button"
              onClick={() => setType('EXPENSE')}
              className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1 ${
                type === 'EXPENSE' ? 'bg-rose-600 text-white' : 'bg-slate-950 text-slate-400'
              }`}
            >
              <ArrowDownRight className="w-3.5 h-3.5" /> Egreso
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">Concepto del Movimiento</label>
            <input
              type="text"
              required
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ej: Pago de insumos de secretaría"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">Monto ($)</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
          >
            Guardar Movimiento
          </button>
        </form>

        {/* Right: Movements Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Movimientos del Día</h3>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="p-4">Tipo</th>
                <th className="p-4">Concepto</th>
                <th className="p-4">Hora</th>
                <th className="p-4 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-900/40">
                  <td className="p-4">
                    {m.type === 'INCOME' ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> INGRESO
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <ArrowDownRight className="w-3.5 h-3.5" /> EGRESO
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-sans text-slate-200 font-semibold">{m.concept}</td>
                  <td className="p-4 text-slate-500">{new Date(m.createdAt).toLocaleTimeString()}</td>
                  <td className={`p-4 text-right font-bold ${m.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {m.type === 'INCOME' ? '+' : '-'}${m.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
