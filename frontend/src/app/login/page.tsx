'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, Lock, User } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { SystemRole } from '@club-digital-pro/shared';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        id: 'usr-admin-001',
        email: username === 'admin' ? 'admin@jorgenewbery.org.ar' : username,
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
    router.push('/dashboard/sports');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-red-600/40 p-2 flex items-center justify-center text-white shadow-xl shadow-red-600/30">
              <img src="/shield.png" alt="Escudo" className="w-full h-full object-contain" />
            </div>
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">
            CLUB ATLÉTICO <span className="text-red-500">JORGE NEWBERY</span>
          </h1>
          <p className="text-slate-400 text-xs">Futsal Primera AFA, Inferiores & Gestión Deportivo</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 text-center text-xs text-red-200 font-mono space-y-1">
            <div className="font-bold text-red-400 uppercase tracking-wider text-[10px]">Acceso Directo Consola</div>
            <div>Usuario: <strong className="text-white">admin</strong> | Contraseña: <strong className="text-white">admin</strong></div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Usuario o Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs focus:outline-none focus:border-red-500 transition-colors font-mono"
                placeholder="admin"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs focus:outline-none focus:border-red-500 transition-colors font-mono"
                placeholder="admin"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-rose-500 hover:from-red-600 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Ingresar al Sistema</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] text-center text-slate-500 pt-2">
            Acceso seguro a Consola Administrativa & Gestión Deportiva.
          </p>
        </form>
      </div>
    </div>
  );
}
