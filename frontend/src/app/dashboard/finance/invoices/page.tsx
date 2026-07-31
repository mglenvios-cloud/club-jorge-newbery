'use client';

import React, { useState } from 'react';
import { Invoice, FeeSubscription } from '@club-digital-pro/shared';
import { Receipt, Download, FileText, CheckCircle2 } from 'lucide-react';
import { ReceiptPDF } from '@/components/finance/ReceiptPDF';

const mockInvoicesList: Invoice[] = [
  { id: 'inv-001', tenantId: 'tenant-jorge-newbery', paymentId: 'pay-001', number: 'B-0001-00008891', amount: 12500, status: 'ISSUED', createdAt: new Date('2026-07-05') },
  { id: 'inv-002', tenantId: 'tenant-jorge-newbery', paymentId: 'pay-002', number: 'B-0001-00008892', amount: 8500, status: 'ISSUED', createdAt: new Date('2026-07-08') },
];

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Facturación & Emisión de Comprobantes</h1>
          <p className="text-slate-400 text-xs mt-0.5">Historial de facturas emitidas, comprobantes AFIP-ready y descarga en PDF.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">N° Comprobante</th>
              <th className="p-4">Monto ($ ARS)</th>
              <th className="p-4">Emisión</th>
              <th className="p-4">Estado AFIP</th>
              <th className="p-4 text-right">Descargar PDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {mockInvoicesList.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-blue-400 font-sans" />
                  <span>{inv.number}</span>
                </td>
                <td className="p-4 font-bold text-emerald-400">${inv.amount.toLocaleString()}</td>
                <td className="p-4 text-slate-400">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                    EMITIDA (CAE OK)
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Ver / Imprimir Comprobante PDF"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <ReceiptPDF
          receiptNumber={selectedInvoice.number}
          fee={{
            id: selectedInvoice.id,
            tenantId: selectedInvoice.tenantId,
            memberId: 'mem-001',
            memberName: 'Socio Institucional',
            memberNumber: 'SOC-2026',
            category: 'ACTIVO',
            period: '2026-07',
            amount: selectedInvoice.amount,
            dueDate: '2026-07-10',
            status: 'PAID',
            paymentMethod: 'TRANSFER',
            createdAt: selectedInvoice.createdAt,
          }}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
