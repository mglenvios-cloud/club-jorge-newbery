'use client';

import React from 'react';
import { useTenant } from '../providers/TenantProvider';
import { FeeSubscription } from '@club-digital-pro/shared';
import { Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReceiptPDFProps {
  receiptNumber: string;
  fee?: FeeSubscription | null;
  onClose?: () => void;
}

export function ReceiptPDF({ receiptNumber, fee, onClose }: ReceiptPDFProps) {
  const { tenant } = useTenant();

  if (!tenant) return null;

  const clubName = tenant.name;
  const logoUrl = tenant.branding?.logoUrl;
  const shieldUrl = tenant.branding?.shieldUrl;
  const address = tenant.branding?.address || tenant.address;
  const phone = tenant.branding?.phone || tenant.phone;
  const email = tenant.branding?.email || tenant.email;
  const primaryColor = tenant.branding?.primaryColor || '#0055a5';
  const secondaryColor = tenant.branding?.secondaryColor || '#0f172a';
  const accentColor = tenant.branding?.accentColor || '#e11d48';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible !important;
          }
          #printable-receipt {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            border-width: 2px !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl text-white print:border-0 print:p-0 print:bg-white print:shadow-none print:max-w-none">
        {/* Actions bar (Hidden when printing) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" style={{ color: primaryColor }} />
            <h3 className="font-bold text-sm text-white">Comprobante Oficial Emitido</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>

        {/* PRINTABLE RECEIPT TEMPLATE (StandaloneReceiptTemplate) */}
        <div
          id="printable-receipt"
          className="bg-white text-slate-900 p-8 rounded-2xl space-y-6 font-sans border-4"
          style={{ borderColor: primaryColor }}
        >
          {/* Header section with Club Identity */}
          <div className="flex items-start justify-between border-b-2 pb-6" style={{ borderColor: `${primaryColor}40` }}>
            <div className="flex items-center gap-4">
              {shieldUrl ? (
                <img src={shieldUrl} alt="Escudo Institucional" className="w-16 h-16 object-contain rounded-lg" />
              ) : logoUrl ? (
                <img src={logoUrl} alt="Logo Institucional" className="w-16 h-16 object-contain rounded-lg" />
              ) : (
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  {clubName.charAt(0)}
                </div>
              )}

              <div>
                <h1 className="text-xl font-black tracking-tight" style={{ color: primaryColor }}>
                  {clubName}
                </h1>
                {address && <p className="text-xs text-slate-600 mt-0.5">{address}</p>}
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-1">
                  {phone && <span>Tel: {phone}</span>}
                  {email && <span>Email: {email}</span>}
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: primaryColor }}>
                Recibo de Pago
              </span>
              <p className="text-xs font-mono font-bold text-slate-700 block mt-1">{receiptNumber}</p>
              <p className="text-[10px] text-slate-500 font-mono">Fecha: {new Date().toLocaleDateString('es-AR')}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold">Socio / Beneficiario</span>
              <p className="font-bold text-slate-900 text-sm">{fee?.memberName || 'Socio Institucional'}</p>
              <p className="text-slate-600">{fee?.memberNumber || 'SOC-ACTIVO'}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold">Concepto Abonado</span>
              <p className="font-bold text-slate-900 text-sm">{fee?.concept || `Cuota Social ${fee?.period || ''}`}</p>
              <p className="text-slate-600">Período: {fee?.period || new Date().toISOString().slice(0, 7)}</p>
            </div>
          </div>

          {/* Payment breakdown */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 font-bold text-slate-600 uppercase text-[10px]" style={{ borderColor: primaryColor }}>
                <th className="py-2">Descripción</th>
                <th className="py-2 text-center">Forma de Pago</th>
                <th className="py-2 text-right">Monto Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3 font-semibold text-slate-800">
                  Cuota Social Institucional — {clubName}
                </td>
                <td className="py-3 text-center text-slate-600 uppercase font-mono">
                  {fee?.paymentMethod || 'EFECTIVO (CAJA)'}
                </td>
                <td className="py-3 text-right font-mono font-black text-sm" style={{ color: primaryColor }}>
                  ${(fee?.amount || 12500).toLocaleString('es-AR')} ARS
                </td>
              </tr>
            </tbody>
          </table>

          {/* Institutional Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>Comprobante válido como constancia de pago oficial de {clubName}.</span>
            </div>
            <span className="font-mono text-slate-400">Emisión Electrónica • {clubName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const StandaloneReceiptTemplate = ReceiptPDF;
