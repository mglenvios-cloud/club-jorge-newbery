'use client';

import React, { useState } from 'react';
import { Payment } from '@club-digital-pro/shared';
import { DollarSign, ExternalLink, CheckCircle2, Clock, ShieldCheck, CreditCard } from 'lucide-react';

const mockPaymentsList: Payment[] = [
  {
    id: 'pay-001',
    tenantId: 'tenant-default-001',
    memberId: 'mem-001',
    memberName: 'Martín González',
    amount: 12500,
    currency: 'ARS',
    method: 'MERCADOPAGO',
    status: 'PAID',
    externalId: 'MP-88990011',
    paidAt: new Date('2026-07-05'),
    createdAt: new Date('2026-07-05'),
  },
  {
    id: 'pay-002',
    tenantId: 'tenant-default-001',
    memberId: 'mem-003',
    memberName: 'Mateo Gómez',
    amount: 8500,
    currency: 'ARS',
    method: 'CASH',
    status: 'PAID',
    paidAt: new Date('2026-07-08'),
    createdAt: new Date('2026-07-08'),
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPaymentsList);
  const [isGeneratingMP, setIsGeneratingMP] = useState(false);
  const [mpUrl, setMpUrl] = useState<string | null>(null);

  const handleGenerateMPCheckout = () => {
    setIsGeneratingMP(true);
    setTimeout(() => {
      setIsGeneratingMP(false);
      setMpUrl('https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MP-PREF-CLUB-DIGITAL-PRO-2026');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Registro de Pagos & Pasarela Mercado Pago</h1>
          <p className="text-slate-400 text-xs mt-0.5">Control de acreditaciones online, webhooks y cobros presenciales.</p>
        </div>

        <button
          onClick={handleGenerateMPCheckout}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-500 hover:to-blue-400 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Simular Checkout Mercado Pago</span>
        </button>
      </div>

      {mpUrl && (
        <div className="glass-card p-5 rounded-2xl border border-sky-500/30 bg-sky-950/20 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <div>
              <h4 className="font-bold text-white text-xs">Preferencia Checkout Mercado Pago Creada</h4>
              <p className="text-[11px] text-slate-400 font-mono">{mpUrl}</p>
            </div>
          </div>
          <a
            href={mpUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-xs flex items-center gap-1 hover:bg-sky-400"
          >
            <span>Ir a Pagar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Main Payments Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Socio / Payer</th>
              <th className="p-4">Monto ($ ARS)</th>
              <th className="p-4">Medio de Pago</th>
              <th className="p-4">ID Externo MP</th>
              <th className="p-4">Fecha de Acreditación</th>
              <th className="p-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-sans font-bold text-white">{p.memberName}</td>
                <td className="p-4 font-bold text-emerald-400">${p.amount.toLocaleString()}</td>
                <td className="p-4 text-slate-300 font-sans">{p.method}</td>
                <td className="p-4 text-slate-400">{p.externalId || '—'}</td>
                <td className="p-4 text-slate-400">{p.paidAt ? new Date(p.paidAt).toLocaleDateString() : '—'}</td>
                <td className="p-4 text-right">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ACREDITADO
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
