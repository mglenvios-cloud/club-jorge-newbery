'use client';

import React, { useState } from 'react';
import { ClubTenantOverview, TenantStatus, SubscriptionPlan } from '@club-digital-pro/shared';
import {
  Building2,
  MoreVertical,
  Edit3,
  CreditCard,
  Palette,
  Blocks,
  ShieldAlert,
  UserCheck,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { ClubActionModal } from './modals/ClubActionModal';
import Link from 'next/link';

const mockClubs: ClubTenantOverview[] = [
  {
    id: 'club-001',
    name: 'Club Atlético San Martín',
    slug: 'sanmartin',
    domain: 'sanmartin.clubdigitalpro.com',
    email: 'contacto@sanmartin.org',
    status: TenantStatus.ACTIVE,
    plan: SubscriptionPlan.ENTERPRISE,
    branding: { primaryColor: '#dc2626', secondaryColor: '#0f172a', accentColor: '#f87171' },
    activeModules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'MARKETING'],
    totalMembers: 3200,
    totalRevenue: 4500,
    adminEmail: 'admin@sanmartin.org',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date(),
  },
  {
    id: 'club-002',
    name: 'Club Social y Deportivo Italiano',
    slug: 'italiano',
    domain: 'italiano.clubdigitalpro.com',
    email: 'info@clubitaliano.com',
    status: TenantStatus.ACTIVE,
    plan: SubscriptionPlan.PROFESSIONAL,
    branding: { primaryColor: '#16a34a', secondaryColor: '#0f172a', accentColor: '#4ade80' },
    activeModules: ['SOCIOS', 'FINANZAS', 'DEPORTES'],
    totalMembers: 1850,
    totalRevenue: 2200,
    adminEmail: 'gestion@clubitaliano.com',
    createdAt: new Date('2025-02-10'),
    updatedAt: new Date(),
  },
  {
    id: 'club-003',
    name: 'Club Náutico del Este',
    slug: 'nautico-este',
    domain: 'nautico.clubdigitalpro.com',
    email: 'contacto@nauticoeste.com',
    status: TenantStatus.SUSPENDED,
    plan: SubscriptionPlan.STARTER,
    branding: { primaryColor: '#0284c7', secondaryColor: '#0f172a', accentColor: '#38bdf8' },
    activeModules: ['SOCIOS'],
    totalMembers: 420,
    totalRevenue: 490,
    adminEmail: 'contacto@nauticoeste.com',
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date(),
  },
  {
    id: 'club-004',
    name: 'Club Regatas & Náutica',
    slug: 'regatas',
    domain: 'regatas.clubdigitalpro.com',
    email: 'contacto@regatas.org',
    status: TenantStatus.ACTIVE,
    plan: SubscriptionPlan.ENTERPRISE,
    branding: { primaryColor: '#2563eb', secondaryColor: '#0f172a', accentColor: '#60a5fa' },
    activeModules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'MARKETING', 'TV'],
    totalMembers: 5100,
    totalRevenue: 6800,
    adminEmail: 'admin@regatas.org',
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date(),
  },
];

export function ClubTable() {
  const [clubs, setClubs] = useState<ClubTenantOverview[]>(mockClubs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal State
  const [selectedClub, setSelectedClub] = useState<ClubTenantOverview | null>(null);
  const [activeModal, setActiveModal] = useState<
    'EDIT' | 'PLAN' | 'BRANDING' | 'MODULES' | 'STATUS' | 'IMPERSONATE' | null
  >(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const filteredClubs = clubs.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.adminEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAction = (
    club: ClubTenantOverview,
    action: 'EDIT' | 'PLAN' | 'BRANDING' | 'MODULES' | 'STATUS' | 'IMPERSONATE'
  ) => {
    setSelectedClub(club);
    setActiveModal(action);
    setOpenDropdownId(null);
  };

  const handleSuccessAction = (updatedData: Partial<ClubTenantOverview>) => {
    if (!selectedClub) return;
    setClubs(
      clubs.map((c) => (c.id === selectedClub.id ? { ...c, ...updatedData } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Filters & Creation CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, slug o email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="ACTIVE">Activos</option>
            <option value="SUSPENDED">Suspendidos</option>
          </select>
        </div>

        <Link
          href="/admin/clubs/wizard"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nuevo Club (Wizard)</span>
        </Link>
      </div>

      {/* Main Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Club / Institución</th>
                <th className="p-4">Plan Comercial</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Módulos Activos</th>
                <th className="p-4">Socios</th>
                <th className="p-4">Ingresos MRR</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredClubs.map((club) => (
                <tr key={club.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md"
                        style={{ backgroundColor: club.branding?.primaryColor || '#2563eb' }}
                      >
                        {club.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{club.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{club.domain}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-slate-300">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {club.plan}
                    </span>
                  </td>

                  <td className="p-4">
                    {club.status === TenantStatus.ACTIVE ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle className="w-3 h-3" /> SUSPENDIDO
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {club.activeModules.map((m) => (
                        <span key={m} className="px-1.5 py-0.5 text-[9px] font-semibold bg-slate-800 text-slate-300 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-white">
                    {club.totalMembers.toLocaleString()}
                  </td>

                  <td className="p-4 font-mono font-bold text-emerald-400">
                    ${club.totalRevenue.toLocaleString()} /mo
                  </td>

                  <td className="p-4 text-right relative">
                    <button
                      onClick={() => setOpenDropdownId(openDropdownId === club.id ? null : club.id)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {openDropdownId === club.id && (
                      <div className="absolute right-4 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-30 text-left space-y-1 animate-in fade-in zoom-in-95 duration-150">
                        <button
                          onClick={() => handleOpenAction(club, 'IMPERSONATE')}
                          className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-blue-400 hover:bg-blue-500/10 flex items-center gap-2"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Impersonate Admin</span>
                        </button>
                        <button
                          onClick={() => handleOpenAction(club, 'PLAN')}
                          className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                          <span>Cambiar Plan</span>
                        </button>
                        <button
                          onClick={() => handleOpenAction(club, 'BRANDING')}
                          className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                        >
                          <Palette className="w-3.5 h-3.5 text-sky-400" />
                          <span>Cambiar Branding</span>
                        </button>
                        <button
                          onClick={() => handleOpenAction(club, 'MODULES')}
                          className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                        >
                          <Blocks className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Activar Módulos</span>
                        </button>
                        <div className="h-px bg-slate-800 my-1"></div>
                        <button
                          onClick={() => handleOpenAction(club, 'STATUS')}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                            club.status === TenantStatus.ACTIVE
                              ? 'text-rose-400 hover:bg-rose-500/10'
                              : 'text-emerald-400 hover:bg-emerald-500/10'
                          }`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>{club.status === TenantStatus.ACTIVE ? 'Suspender Club' : 'Reactivar Club'}</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      <ClubActionModal
        club={selectedClub}
        actionType={activeModal}
        onClose={() => setActiveModal(null)}
        onSuccess={handleSuccessAction}
      />
    </div>
  );
}
