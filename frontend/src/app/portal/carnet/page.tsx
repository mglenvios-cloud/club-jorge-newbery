'use client';

import React, { useState } from 'react';
import { MemberCardDigital } from '@/components/members/MemberCardDigital';
import { QrCode, ShieldCheck, RefreshCw, Smartphone, CheckCircle2, Copy } from 'lucide-react';

const mockPortalMember = {
  id: 'mem-portal-001',
  tenantId: 'tenant-default-001',
  memberNumber: 'SOC-2026-88',
  firstName: 'Santiago',
  lastName: 'Alvarez',
  dni: '39.880.140',
  email: 'santiago.alvarez@email.com',
  phone: '+54 9 11 3344-5566',
  birthDate: '1995-09-14',
  gender: 'Masculino',
  address: 'Av. Libertador 2200, 8A',
  city: 'Buenos Aires',
  category: 'ACTIVO' as const,
  status: 'ACTIVE' as const,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
  qrCodeToken: 'CDP-QR-SECURE-8840-2026',
  joinedAt: new Date('2023-01-10'),
  createdAt: new Date('2023-01-10'),
  updatedAt: new Date(),
};

export default function DedicatedCarnetPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockPortalMember.qrCodeToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Validación QR Dinámica para Molinetes & RFID</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Carnet Digital Oficial</h1>
        <p className="text-slate-400 text-xs mt-1">
          Presente esta pantalla en los lectores ópticos de las sedes o molinetes automáticos para ingresar.
        </p>
      </div>

      {/* Carnet Component */}
      <div className="flex flex-col items-center">
        <MemberCardDigital member={mockPortalMember} />
      </div>

      {/* Security Token Details */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 max-w-sm mx-auto">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold">Token de Molinete:</span>
          <button
            onClick={handleCopy}
            className="text-blue-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
          >
            {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copiado' : 'Copiar Token'}</span>
          </button>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 break-all">
          {mockPortalMember.qrCodeToken}
        </div>
        <p className="text-[10px] text-slate-500">
          El código se actualiza automáticamente para prevenir duplicación o uso no autorizado.
        </p>
      </div>
    </div>
  );
}
