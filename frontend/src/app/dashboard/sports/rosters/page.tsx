'use client';

import React, { useState } from 'react';
import { AthleteProfile } from '@club-digital-pro/shared';
import { Users, Search, Plus, CheckCircle2, AlertTriangle, ShieldCheck, HeartPulse, Phone } from 'lucide-react';

const mockAthletesList: AthleteProfile[] = [
  {
    id: 'ath-001',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Fútbol Masculino',
    categoryId: 'cat-1',
    categoryName: 'Primera División',
    firstName: 'Emiliano',
    lastName: 'Ríos',
    dni: '38.990.120',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    heightCm: 182,
    weightKg: 78,
    preferredFoot: 'DIESTRO',
    position: 'Delantero Centro',
    jerseyNumber: 9,
    medicalValid: true,
    medicalExpires: '2026-12-31',
    emergencyContactName: 'Carlos Ríos',
    emergencyContactPhone: '+54 9 11 4455-6677',
    stats: { goals: 12, assists: 4, yellowCards: 2, redCards: 0, minutesPlayed: 1080, matchesPlayed: 14 },
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'ath-002',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-2',
    disciplineName: 'Básquet',
    categoryId: 'cat-2',
    categoryName: 'Sub 20',
    firstName: 'Lucas',
    lastName: 'Valenzuela',
    dni: '44.120.330',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
    heightCm: 195,
    weightKg: 85,
    preferredFoot: 'DIESTRO',
    position: 'Base / Alero',
    jerseyNumber: 7,
    medicalValid: false,
    medicalExpires: '2026-06-30',
    emergencyContactName: 'Laura Valenzuela',
    emergencyContactPhone: '+54 9 11 8899-0011',
    stats: { goals: 84, assists: 22, yellowCards: 1, redCards: 0, minutesPlayed: 450, matchesPlayed: 10 },
    createdAt: new Date('2024-02-15'),
  },
];

export default function RostersPage() {
  const [athletes, setAthletes] = useState<AthleteProfile[]>(mockAthletesList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteProfile | null>(null);

  const filteredAthletes = athletes.filter(
    (a) =>
      a.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.dni.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Planteles & Fichas Médicas de Deportistas</h1>
          <p className="text-slate-400 text-xs mt-0.5">Control de aptos físicos, posición, dorsales y staff técnico.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Athletes List */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 overflow-hidden space-y-4">
          <div className="p-4 border-b border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por Nombre, DNI o Posición..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="p-4">Deportista</th>
                <th className="p-4">Disciplina</th>
                <th className="p-4">Posición / Dorsal</th>
                <th className="p-4">Apto Físico</th>
                <th className="p-4 text-right">Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAthletes.map((a) => (
                <tr key={a.id} className="hover:bg-slate-900/40">
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <img src={a.avatarUrl} alt={a.firstName} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                    <div>
                      <span>{a.firstName} {a.lastName}</span>
                      <span className="block text-[10px] text-slate-500 font-mono">DNI: {a.dni}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-300">{a.disciplineName}</span>
                    <span className="block text-[10px] text-blue-400 font-mono">{a.categoryName}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-300 font-semibold">{a.position}</span>
                    <span className="block text-[10px] text-emerald-400 font-mono font-bold">N° {a.jerseyNumber}</span>
                  </td>
                  <td className="p-4">
                    {a.medicalValid ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> APTO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> VENCIDO
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedAthlete(a)}
                      className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-all text-xs"
                    >
                      Ver Ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Selected Athlete Profile Card */}
        {selectedAthlete ? (
          <div className="glass-card p-6 rounded-3xl border border-blue-500/30 space-y-4 animate-in fade-in">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img src={selectedAthlete.avatarUrl} alt="Avatar" className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/40" />
              <div>
                <h3 className="font-extrabold text-white text-base">{selectedAthlete.firstName} {selectedAthlete.lastName}</h3>
                <span className="text-xs text-blue-400 font-bold">{selectedAthlete.disciplineName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Altura / Peso</span>
                <span className="font-bold text-white font-mono">{selectedAthlete.heightCm} cm / {selectedAthlete.weightKg} kg</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Pie Hábil</span>
                <span className="font-bold text-slate-200">{selectedAthlete.preferredFoot}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>Vigencia Certificado Médico</span>
              </span>
              <p className="font-mono text-slate-300">Vence: {selectedAthlete.medicalExpires}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contacto de Emergencia</span>
              </span>
              <p className="text-slate-300 font-semibold">{selectedAthlete.emergencyContactName}</p>
              <p className="text-slate-400 font-mono text-[11px]">{selectedAthlete.emergencyContactPhone}</p>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center py-12 text-slate-400 text-xs">
            Seleccione un deportista para ver su ficha técnica deportiva y médica.
          </div>
        )}
      </div>
    </div>
  );
}
