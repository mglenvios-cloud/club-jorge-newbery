'use client';

import React from 'react';
import { Users, Shield, Plus, Mail } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Gestión de Usuarios & Privilegios</h1>
          <p className="text-slate-400 text-xs mt-1">Administradores del Centro Corporativo y administradores designados por club.</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30">
          <Plus className="w-4 h-4" />
          <span>Crear Usuario Admin</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Usuario / Nombre</th>
              <th className="p-4">Correo Electrónico</th>
              <th className="p-4">Rol del Sistema</th>
              <th className="p-4">Asignación de Tenant</th>
              <th className="p-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { name: 'Administrador SaaS', email: 'admin@clubdigitalpro.com', role: 'SUPER_ADMIN', tenant: 'GLOBAL PLATFORM', status: 'ACTIVE' },
              { name: 'Juan Pérez', email: 'admin@sanmartin.org', role: 'TENANT_ADMIN', tenant: 'Club Atlético San Martín', status: 'ACTIVE' },
              { name: 'Marco Rossi', email: 'gestion@clubitaliano.com', role: 'TENANT_ADMIN', tenant: 'Club Italiano', status: 'ACTIVE' },
            ].map((u, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    {u.name.charAt(0)}
                  </div>
                  <span>{u.name}</span>
                </td>
                <td className="p-4 font-mono text-slate-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{u.email}</span>
                </td>
                <td className="p-4 font-semibold text-blue-400">{u.role}</td>
                <td className="p-4 text-slate-300">{u.tenant}</td>
                <td className="p-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400">
                    {u.status}
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
