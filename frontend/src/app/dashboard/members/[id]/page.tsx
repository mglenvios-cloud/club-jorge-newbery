'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Member } from '@club-digital-pro/shared';
import { MemberCardDigital } from '@/components/members/MemberCardDigital';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, ShieldCheck, Printer, Download } from 'lucide-react';

const mockMemberDetail: Member = {
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
};

export default function MemberDetailPage() {
  const router = useRouter();
  const member = mockMemberDetail;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => router.back()}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Padrón</span>
          </button>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Ficha del Socio: {member.firstName} {member.lastName}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span>Imprimir Carnet</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid: Ficha Técnica & Carnet Digital */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-base">Datos Personales & Membresía</h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Socio Al Día
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Nombre Completo</span>
                </span>
                <p className="font-bold text-white text-sm">{member.firstName} {member.lastName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>DNI / Documento</span>
                </span>
                <p className="font-mono font-bold text-white text-sm">{member.dni}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Email</span>
                </span>
                <p className="font-mono text-slate-200">{member.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Teléfono</span>
                </span>
                <p className="font-mono text-slate-200">{member.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Domicilio</span>
                </span>
                <p className="text-slate-200">{member.address}, {member.city}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>Fecha de Ingreso</span>
                </span>
                <p className="font-mono text-slate-200">{new Date(member.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Carnet Digital Card */}
        <div className="space-y-4 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            Carnet Digital Institucional
          </span>
          <MemberCardDigital member={member} />
        </div>
      </div>
    </div>
  );
}
