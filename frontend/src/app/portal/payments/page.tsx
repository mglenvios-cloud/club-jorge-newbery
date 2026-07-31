'use client';

import React, { useState } from 'react';
import { FeeSubscription, PaymentMethod } from '@club-digital-pro/shared';
import { CreditCard, CheckCircle2, Download, Clock, DollarSign, ExternalLink } from 'lucide-react';

const mockMemberFees: FeeSubscription[] = [
  {
    id: 'fee-101',
    tenantId: 'tenant-default-001',
    memberId: 'mem-portal-001',
    memberName: 'Santiago Alvarez',
    memberNumber: 'SOC-2026-88',
    category: 'ACTIVO',
    period: '2026-07',
    amount: 12500,
    dueDate: '2026-07-10',
    paidDate: '2026-07-05',
    status: 'PAID',
    paymentMethod: 'TRANSFER',
    receiptNumber: 'REC-2026-0091',
    createdAt: new Date('2026-07-01'),
  },
  {
    id: 'fee-102',
    tenantId: 'tenant-default-001',
    memberId: 'mem-portal-001',
    memberName: 'Santiago Alvarez',
    memberNumber: 'SOC-2026-88',
    category: 'ACTIVO',
    period: '2026-08',
    amount: 12500,
    dueDate: '2026-08-10',
    status: 'PENDING',
    createdAt: new Date('2026-08-01'),
  },
];

export default function IntegratedMemberPaymentsPage() {
  const [fees, setFees] = useState<FeeSubscription[]>(mockMemberFees);
  const [payingFee, setPayingFee] = useState<FeeSubscription | null>(null);

  const handleOnlinePay = (fee: FeeSubscription) => {
    setPayingFee(fee);
    setTimeout(() => {
      setFees(
        fees.map((f) =>
          f.id === fee.id
            ? {
                ...f,
                status: 'PAID',
                paidDate: new Date().toISOString().slice(0, 10),
                paymentMethod: 'MERCADOPAGO',
                receiptNumber: `REC-ONLINE-${Math.floor(1000 + Math.random() * 9000)}`,
              }
            : f
        )
      );
      setPayingFee(null);
    }, 1500);
  };

  const nextDue = fees.find((f) => f.status !== 'PAID');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Mis Pagos & Estado de Cuota</h1>
          <p className="text-slate-400 text-xs mt-1">
            Consulte sus cuotas vigentes, estado de pago e historial de comprobantes oficiales.
          </p>
        </div>

        {nextDue && (
          <button
            onClick={() => handleOnlinePay(nextDue)}
            disabled={!!payingFee}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 shrink-0 transition-transform hover:scale-105"
          >
            <CreditCard className="w-4 h-4" />
            <span>{payingFee ? 'Procesando Pago Online...' : `Pagar Cuota ${nextDue.period} ($${nextDue.amount.toLocaleString()})`}</span>
          </button>
        )}
      </div>

      {/* Next Due Highlight Card */}
      {nextDue && (
        <div className="glass-card p-6 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/30 to-slate-900 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">Próximo Vencimiento</span>
            <h3 className="font-extrabold text-white text-base">{nextDue.concept || `Cuota Social ${nextDue.period}`}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Vence el: <strong className="text-white">{nextDue.dueDate}</strong></p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-400 font-mono block">${nextDue.amount.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 font-mono">Moneda: ARS ($)</span>
          </div>
        </div>
      )}

      {/* Payments History Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-bold text-white text-sm">Historial de Cuotas & Recibos</h3>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Concepto / Cuota</th>
              <th className="p-4">Período</th>
              <th className="p-4">Monto ($)</th>
              <th className="p-4">Vencimiento</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Comprobante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {fees.map((f) => (
              <tr key={f.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  <span>Cuota Social {f.period}</span>
                </td>
                <td className="p-4 font-mono text-slate-400">{f.period}</td>
                <td className="p-4 font-mono font-bold text-emerald-400">${f.amount.toLocaleString()}</td>
                <td className="p-4 font-mono text-slate-400">{f.dueDate}</td>
                <td className="p-4">
                  {f.status === 'PAID' ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      PAGADO ({f.paymentMethod})
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      PENDIENTE
                    </span>
                  )}
                </td>
                <td className="p-4 text-right font-mono text-xs">
                  {f.receiptNumber ? (
                    <span className="text-blue-400 font-bold">{f.receiptNumber}</span>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
