'use client';

import React from 'react';
import { Member } from '@club-digital-pro/shared';
import { useTenant } from '../providers/TenantProvider';
import { ShieldCheck, QrCode, Sparkles } from 'lucide-react';

interface MemberCardDigitalProps {
  member: Member;
}

export function MemberCardDigital({ member }: MemberCardDigitalProps) {
  const { tenant } = useTenant();

  const primary = tenant?.branding?.primaryColor || '#2563eb';
  const secondary = tenant?.branding?.secondaryColor || '#0f172a';
  const accent = tenant?.branding?.accentColor || '#38bdf8';

  return (
    <div
      className="w-full max-w-sm rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white transition-all hover:scale-[1.02] border border-white/10"
      style={{
        background: `linear-gradient(135deg, ${secondary} 0%, #0b0f17 100%)`,
      }}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-2xl opacity-40 pointer-events-none"
        style={{ backgroundColor: primary }}
      />

      {/* Card Header: Tenant Name & Shield */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {tenant?.branding?.logoUrl ? (
            <img src={tenant.branding.logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover" />
          ) : (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-md"
              style={{ backgroundColor: primary }}
            >
              {tenant?.name?.charAt(0) || 'C'}
            </div>
          )}
          <div>
            <h4 className="font-extrabold text-sm tracking-tight text-white">{tenant?.name}</h4>
            <span className="text-[9px] text-slate-400 uppercase font-mono tracking-widest block">Carnet Oficial de Socio</span>
          </div>
        </div>

        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm"
          style={{ backgroundColor: `${primary}33`, color: accent, border: `1px solid ${primary}66` }}
        >
          {member.category}
        </span>
      </div>

      {/* Member Details */}
      <div className="flex items-start gap-4 relative z-10">
        <img
          src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
          alt={`${member.firstName} ${member.lastName}`}
          className="w-20 h-24 object-cover rounded-2xl border-2 border-white/20 shadow-lg shrink-0"
        />

        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="font-black text-base text-white truncate">
            {member.firstName} {member.lastName}
          </h3>
          <div className="text-[11px] text-slate-300 font-mono space-y-0.5">
            <p><span className="text-slate-500">N° Socio:</span> <strong className="text-white">{member.memberNumber}</strong></p>
            <p><span className="text-slate-500">DNI:</span> <strong className="text-slate-200">{member.dni}</strong></p>
            <p><span className="text-slate-500">Estado:</span>{' '}
              <span className={`font-bold ${member.status === 'ACTIVE' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {member.status === 'ACTIVE' ? 'AL DÍA' : 'MOROSO'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Section & Security Verification */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Validación QR Acceso Físico</span>
          </div>
          <p className="text-[9px] text-slate-400 font-mono">ID: {member.qrCodeToken.slice(0, 16)}...</p>
        </div>

        <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-lg flex items-center justify-center shrink-0">
          {/* Simulated QR Code matrix */}
          <div className="w-full h-full bg-slate-950 rounded flex items-center justify-center text-white">
            <QrCode className="w-10 h-10 text-slate-900 bg-white p-0.5 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
