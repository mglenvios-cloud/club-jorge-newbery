'use client';

import React from 'react';
import Link from 'next/link';
import { MemberCardDigital } from '@/components/members/MemberCardDigital';
import {
  CheckCircle2,
  QrCode,
  CreditCard,
  Calendar,
  Newspaper,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

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

export default function MemberPortalDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cuota de Julio Al Día (Acceso Habilitado)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¡Hola, {mockPortalMember.firstName}! 👋
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Bienvenido a su portal digital de socio. Consulte su carnet QR, estado de pagos y noticias institucionales.
          </p>
        </div>

        <Link
          href="/portal/carnet"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 shrink-0 transition-transform hover:scale-105"
        >
          <QrCode className="w-4 h-4" />
          <span>Ver Carnet QR Completo</span>
        </Link>
      </div>

      {/* Main Grid: Carnet & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Highlighted Carnet Card */}
        <div className="flex flex-col items-center space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Carnet Digital Habilitado</span>
          </span>
          <MemberCardDigital member={mockPortalMember} />
        </div>

        {/* Right: Quick Stats & Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link
              href="/portal/payments"
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all group"
            >
              <CreditCard className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white text-xs">Mis Pagos</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Historial y recibos</p>
            </Link>

            <Link
              href="/portal/carnet"
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all group"
            >
              <QrCode className="w-5 h-5 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white text-xs">Acceso QR</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Ingreso por molinete</p>
            </Link>

            <Link
              href="/portal/profile"
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all group"
            >
              <Zap className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white text-xs">Mi Perfil</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Editar contacto</p>
            </Link>
          </div>

          {/* Upcoming Events & Club News */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-400" />
                <span>Novedades del Club</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Actualizado hoy</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:bg-slate-900/60 transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop"
                  alt="Noticia"
                  className="w-20 h-16 object-cover rounded-xl shrink-0 border border-slate-700"
                />
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-400">
                    Infraestructura
                  </span>
                  <h4 className="font-bold text-white text-xs">Inauguración de Nuevas Canchas de Pádel</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    Quedaron habilitadas las dos nuevas canchas sintéticas con iluminación LED.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
