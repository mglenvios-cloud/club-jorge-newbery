'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cpu, ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { SystemRole } from '@club-digital-pro/shared';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@jorgenewbery.org.ar');
  const [password, setPassword] = useState('••••••••••••');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        id: 'usr-admin-001',
        email,
        firstName: 'Administrador',
        lastName: 'Newbery',
        role: SystemRole.SUPER_ADMIN,
        tenantId: 'tenant-jorge-newbery',
        permissions: [
          'tenant:read',
          'tenant:write',
          'user:read',
          'user:write',
          'dashboard:read',
          'settings:manage',
        ],
        isActive: true,
        createdAt: new Date(),
      },
      'demo-jwt-token'
    );
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 text-xl font-black">
              ⚽
            </div>
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-white">
            CLUB ATLÉTICO <span className="text-blue-500">JORGE NEWBERY</span>
          </h1>
          <p className="text-slate-400 text-xs mt-2">Plataforma Institucional Digital — Portal del Socio</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="usuario@club.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Iniciar Sesión en Consola</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] text-center text-slate-500 pt-2">
            Acceso seguro protegido por cifrado JWT y scoping por Tenant ID.
          </p>
        </form>
      </div>
    </div>
  );
}
