'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Member, MemberCategory, MemberStatus } from '@club-digital-pro/shared';
import {
  Users,
  Search,
  Plus,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  UserX,
  CreditCard,
  Eye,
  FileSpreadsheet,
} from 'lucide-react';

const mockMembersData: Member[] = [
  {
    id: 'mem-001',
    tenantId: 'tenant-default-001',
    memberNumber: 'SOC-1001',
    firstName: 'Martín',
    lastName: 'González',
    dni: '38.450.120',
    email: 'martin.gonzalez@email.com',
    phone: '+54 9 11 4455-8899',
    birthDate: '1994-05-12',
    gender: 'Masculino',
    address: 'Av. Corrientes 2450, 4B',
    city: 'Buenos Aires',
    category: 'ACTIVO',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    qrCodeToken: 'QR-TOKEN-SOC-1001-SECURE',
    joinedAt: new Date('2023-03-15'),
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date(),
  },
  {
    id: 'mem-002',
    tenantId: 'tenant-default-001',
    memberNumber: 'SOC-1002',
    firstName: 'Lucía',
    lastName: 'Fernández',
    dni: '42.110.890',
    email: 'lucia.f@email.com',
    phone: '+54 9 11 9988-1122',
    birthDate: '1999-11-20',
    gender: 'Femenino',
    address: 'Calle Santa Fe 1120',
    city: 'Buenos Aires',
    category: 'ACTIVO',
    status: 'DEFAULTER',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    qrCodeToken: 'QR-TOKEN-SOC-1002-SECURE',
    joinedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date(),
  },
  {
    id: 'mem-003',
    tenantId: 'tenant-default-001',
    memberNumber: 'SOC-1003',
    firstName: 'Mateo',
    lastName: 'Gómez',
    dni: '54.200.310',
    email: 'tutor.gomez@email.com',
    phone: '+54 9 11 5566-7788',
    birthDate: '2015-08-04',
    gender: 'Masculino',
    address: 'Av. Belgrano 450',
    city: 'Buenos Aires',
    category: 'INFANTIL',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&h=200&fit=crop',
    tutorInfo: {
      name: 'Roberto Gómez',
      relationship: 'Padre',
      dni: '30.120.440',
      phone: '+54 9 11 5566-7788',
    },
    qrCodeToken: 'QR-TOKEN-SOC-1003-SECURE',
    joinedAt: new Date('2025-02-01'),
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date(),
  },
];

export default function MembersDirectoryPage() {
  const [members, setMembers] = useState<Member[]>(mockMembersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredMembers = members.filter((m) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      m.firstName.toLowerCase().includes(q) ||
      m.lastName.toLowerCase().includes(q) ||
      m.dni.includes(q) ||
      m.memberNumber.toLowerCase().includes(q);

    const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || m.status === statusStatusMapper(statusFilter);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  function statusStatusMapper(filter: string): MemberStatus {
    return filter as MemberStatus;
  }

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Numero,Nombre,Apellido,DNI,Email,Categoria,Estado\n' +
      filteredMembers
        .map(
          (m) =>
            `${m.memberNumber},${m.firstName},${m.lastName},${m.dni},${m.email},${m.category},${m.status}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `padrón_socios_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Centro de Socios — Padrón General</h1>
          <p className="text-slate-400 text-xs mt-1">
            Administración completa de afiliados, emisión de carnets digitales QR y auditoría de morosidad.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center gap-2 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Exportar CSV</span>
          </button>

          <Link
            href="/dashboard/members/new"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Nuevo Socio</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Socios Registrados</span>
          <div className="text-2xl font-black text-white">{members.length}</div>
          <span className="text-[10px] text-blue-400 font-mono">Padrón activo</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Socios Al Día</span>
          <div className="text-2xl font-black text-emerald-400">
            {members.filter((m) => m.status === 'ACTIVE').length}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Con derecho a ingresar</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Socios Morosos</span>
          <div className="text-2xl font-black text-rose-400">
            {members.filter((m) => m.status === 'DEFAULTER').length}
          </div>
          <span className="text-[10px] text-rose-400 font-mono">Restringidos en molinetes</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Menores con Tutor</span>
          <div className="text-2xl font-black text-sky-400">
            {members.filter((m) => m.category === 'INFANTIL' || m.category === 'CADETE').length}
          </div>
          <span className="text-[10px] text-sky-400 font-mono">Vínculos de tutores verificados</span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Nombre, Apellido, DNI o N° Socio..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todas las Categorías</option>
            <option value="ACTIVO">Activo</option>
            <option value="CADETE">Cadete</option>
            <option value="INFANTIL">Infantil</option>
            <option value="VITALICIO">Vitalicio</option>
            <option value="HONORARIO">Honorario</option>
            <option value="FAMILIAR">Grupo Familiar</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="ACTIVE">Al Día (Activo)</option>
            <option value="DEFAULTER">Moroso</option>
            <option value="INACTIVE">Inactivo</option>
            <option value="SUSPENDED">Suspendido</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="p-4">Socio / Nombre</th>
                <th className="p-4">N° Socio</th>
                <th className="p-4">DNI</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Tutor Vínculo</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Carnet & Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <img
                      src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
                      alt={m.firstName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <span className="block text-white font-bold">{m.firstName} {m.lastName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{m.email}</span>
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-blue-400">{m.memberNumber}</td>
                  <td className="p-4 font-mono text-slate-300">{m.dni}</td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {m.category}
                    </span>
                  </td>

                  <td className="p-4 text-slate-400">
                    {m.tutorInfo ? (
                      <div>
                        <span className="text-slate-200 font-semibold block">{m.tutorInfo.name}</span>
                        <span className="text-[10px] text-slate-500">({m.tutorInfo.relationship})</span>
                      </div>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>

                  <td className="p-4">
                    {m.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> AL DÍA
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <AlertTriangle className="w-3 h-3" /> MOROSO
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <Link
                      href={`/dashboard/members/${m.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-all text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Ficha</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
