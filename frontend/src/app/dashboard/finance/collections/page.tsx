'use client';

import React, { useState } from 'react';
import { FeeSubscription, PaymentMethod } from '@club-digital-pro/shared';
import { DollarSign, Printer, CheckCircle2, Search, CreditCard, Receipt, Download } from 'lucide-react';

import { ReceiptPDF } from '@/components/finance/ReceiptPDF';

const mockUnpaidFees: FeeSubscription[] = [
  {
    id: 'fee-102',
    tenantId: 'tenant-jorge-newbery',
    memberId: 'mem-002',
    memberName: 'Lucía Fernández',
    memberNumber: 'SOC-1002',
    category: 'ACTIVO',
    period: '2026-07',
    amount: 12500,
    dueDate: '2026-07-10',
    status: 'OVERDUE',
    createdAt: new Date('2026-07-01'),
  },
  {
    id: 'fee-104',
    tenantId: 'tenant-jorge-newbery',
    memberId: 'mem-004',
    memberName: 'Esteban Soler',
    memberNumber: 'SOC-1004',
    category: 'CADETE',
    period: '2026-07',
    amount: 9800,
    dueDate: '2026-07-10',
    status: 'PENDING',
    createdAt: new Date('2026-07-01'),
  },
];

export default function CollectionsPage() {
  const [unpaidFees, setUnpaidFees] = useState<FeeSubscription[]>(mockUnpaidFees);
  const [selectedFee, setSelectedFee] = useState<FeeSubscription | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [receiptIssued, setReceiptIssued] = useState<string | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [completedFee, setCompletedFee] = useState<FeeSubscription | null>(null);

  const handlePay = (fee: FeeSubscription) => {
    setSelectedFee(fee);
  };

  const confirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFee) return;

    const receiptNum = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceiptIssued(receiptNum);
    const paidFee = { ...selectedFee, paymentMethod };
    setCompletedFee(paidFee);

    setTimeout(() => {
      setUnpaidFees(unpaidFees.filter((f) => f.id !== selectedFee.id));
      setSelectedFee(null);
      setReceiptIssued(null);
      setShowReceiptModal(true);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Cobranzas & Emisión de Comprobantes</h1>
        <p className="text-slate-400 text-xs mt-0.5">Cobro presencial en caja, procesamiento online y reimpresión de recibos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pending Payments Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm">Cuotas Pendientes de Cobro</h3>

            <div className="space-y-3">
              {unpaidFees.map((fee) => (
                <div key={fee.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs block">{fee.memberName}</span>
                    <span className="text-[10px] text-blue-400 font-mono">{fee.memberNumber} • Período: {fee.period}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-emerald-400 font-mono text-sm">${fee.amount.toLocaleString()}</span>
                    <button
                      onClick={() => handlePay(fee)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                    >
                      Cobrar en Caja
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Payment Form Modal or Card */}
        {selectedFee ? (
          <form onSubmit={confirmPayment} className="glass-card p-6 rounded-2xl border border-blue-500/30 space-y-4 animate-in fade-in">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Registrar Pago en Caja</span>
            </h3>

            <div className="text-xs space-y-1">
              <p className="text-slate-400">Socio: <strong className="text-white">{selectedFee.memberName}</strong></p>
              <p className="text-slate-400">Concepto: <strong className="text-slate-200">Cuota {selectedFee.period}</strong></p>
              <p className="text-slate-400">Monto: <strong className="text-emerald-400 text-sm font-mono">${selectedFee.amount.toLocaleString()}</strong></p>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-300">Medio de Pago</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="CASH">Efectivo (Caja Central)</option>
                <option value="TRANSFER">Transferencia Bancaria</option>
                <option value="DEBIT_CARD">Tarjeta de Débito</option>
                <option value="CREDIT_CARD">Tarjeta de Crédito</option>
                <option value="MERCADOPAGO">Mercado Pago Online</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              <span>{receiptIssued ? `Recibo Emitido: ${receiptIssued}` : 'Emitir Recibo Oficial'}</span>
            </button>
          </form>
        ) : (
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-2 py-12">
            <Receipt className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">Seleccione un socio del listado para registrar el cobro e imprimir el recibo.</p>
          </div>
        )}
      </div>

      {showReceiptModal && (
        <ReceiptPDF
          receiptNumber={receiptIssued || `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`}
          fee={completedFee}
          onClose={() => setShowReceiptModal(false)}
        />
      )}
    </div>
  );
}
