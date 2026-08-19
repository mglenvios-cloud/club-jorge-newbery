'use client';

import React, { useState, useEffect } from 'react';
import { AthleteProfile } from '@club-digital-pro/shared';
import {
  Users,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Phone,
  X,
  UserPlus,
  Check,
  Trophy,
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import UniversalMediaUploader from '@/components/common/UniversalMediaUploader';

const mockAthletesList: AthleteProfile[] = [
  {
    id: 'ath-001',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Futsal AFA',
    categoryId: 'cat-1',
    categoryName: 'Primera',
    firstName: 'Belen',
    lastName: 'Méndez',
    dni: '41.890.120',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    heightCm: 168,
    weightKg: 60,
    preferredFoot: 'DIESTRO',
    position: 'Pivot',
    jerseyNumber: 7,
    medicalValid: true,
    medicalExpires: '2026-12-31',
    emergencyContactName: 'Beto Méndez',
    emergencyContactPhone: '+54 9 11 4455-6677',
    stats: { goals: 10, assists: 5, yellowCards: 0, redCards: 0, minutesPlayed: 1080, matchesPlayed: 14 },
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'ath-002',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Futsal AFA',
    categoryId: 'cat-1',
    categoryName: 'Primera',
    firstName: 'Camila',
    lastName: 'Gómez',
    dni: '43.120.330',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    heightCm: 165,
    weightKg: 58,
    preferredFoot: 'ZURDO',
    position: 'Ala',
    jerseyNumber: 10,
    medicalValid: true,
    medicalExpires: '2026-11-30',
    emergencyContactName: 'Laura Gómez',
    emergencyContactPhone: '+54 9 11 8899-0011',
    stats: { goals: 18, assists: 9, yellowCards: 0, redCards: 0, minutesPlayed: 1200, matchesPlayed: 14 },
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'ath-003',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Futsal AFA',
    categoryId: 'cat-1',
    categoryName: 'Primera',
    firstName: 'Diego',
    lastName: 'Martínez',
    dni: '42.550.880',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    heightCm: 178,
    weightKg: 74,
    preferredFoot: 'DIESTRO',
    position: 'Pivot',
    jerseyNumber: 9,
    medicalValid: false,
    medicalExpires: '2026-05-15',
    emergencyContactName: 'Mariana Martínez',
    emergencyContactPhone: '+54 9 11 3344-5566',
    stats: { goals: 12, assists: 4, yellowCards: 2, redCards: 0, minutesPlayed: 1350, matchesPlayed: 19 },
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'ath-004',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Futsal AFA',
    categoryId: 'cat-1',
    categoryName: 'Primera',
    firstName: 'Florencia',
    lastName: 'Russo',
    dni: '42.990.111',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    heightCm: 172,
    weightKg: 65,
    preferredFoot: 'DIESTRO',
    position: 'Arquero',
    jerseyNumber: 1,
    medicalValid: true,
    medicalExpires: '2026-12-31',
    emergencyContactName: 'Jorge Russo',
    emergencyContactPhone: '+54 9 11 6677-8899',
    stats: { goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 1080, matchesPlayed: 12 },
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'ath-005',
    tenantId: 'tenant-default-001',
    disciplineId: 'disc-1',
    disciplineName: 'Futsal AFA',
    categoryId: 'cat-1',
    categoryName: 'Primera',
    firstName: 'Gabriel',
    lastName: 'Peralta',
    dni: '43.880.222',
    staffRole: 'JUGADOR',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    heightCm: 176,
    weightKg: 71,
    preferredFoot: 'ZURDO',
    position: 'Ala',
    jerseyNumber: 8,
    medicalValid: true,
    medicalExpires: '2026-10-31',
    emergencyContactName: 'Ana Peralta',
    emergencyContactPhone: '+54 9 11 9900-1122',
    stats: { goals: 7, assists: 6, yellowCards: 3, redCards: 0, minutesPlayed: 900, matchesPlayed: 15 },
    createdAt: new Date('2024-04-01'),
  },
];

export default function AdminGestionDeportivaPage() {
  const { token } = useAuth();
  const [athletes, setAthletes] = useState<AthleteProfile[]>(mockAthletesList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteProfile | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('Primera');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaTab, setMediaTab] = useState<'upload' | 'url' | 'camera' | 'library'>('upload');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [urlInput, setUrlInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [newPlayerData, setNewPlayerData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    birthDate: '2002-05-14',
    heightCm: 175,
    weightKg: 70,
    position: 'Ala',
    jerseyNumber: 10,
    preferredFoot: 'DIESTRO',
    categoryName: 'Primera',
    emergencyContactName: '',
    emergencyContactPhone: '',
    notes: '',
  });

  // Load stored athletes on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cjp_futsal_athletes');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Conservar todas las fotos reales de los atletas (Base64 o URL) sin sobreescribir con Unsplash
          setAthletes(parsed);
        }
      }
    } catch {
      try { localStorage.removeItem('cjp_futsal_athletes'); } catch {}
    }
  }, []);

  const safeSaveAthletes = (updatedList: AthleteProfile[]) => {
    let current = [...updatedList];
    let attempts = 0;
    while (attempts < 5) {
      try {
        localStorage.setItem('cjp_futsal_athletes', JSON.stringify(current));
        return;
      } catch {
        attempts++;
        if (current.length > 1) {
          current.pop();
        } else {
          break;
        }
      }
    }
  };

  const handleSavePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerData.firstName || !newPlayerData.lastName) {
      setNotification({ type: 'error', text: 'Por favor ingrese Nombre y Apellido del jugador.' });
      return;
    }

    setIsSaving(true);
    const avatar = photoPreview || urlInput || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';

    const createdAthlete: AthleteProfile = {
      id: `ath-${Date.now()}`,
      tenantId: 'tenant-default-001',
      disciplineId: 'disc-1',
      disciplineName: 'Futsal AFA',
      categoryId: 'cat-1',
      categoryName: newPlayerData.categoryName || 'Primera',
      firstName: newPlayerData.firstName,
      lastName: newPlayerData.lastName,
      dni: newPlayerData.dni || 'S/D',
      staffRole: 'JUGADOR',
      avatarUrl: avatar,
      heightCm: Number(newPlayerData.heightCm),
      weightKg: Number(newPlayerData.weightKg),
      preferredFoot: newPlayerData.preferredFoot as any,
      position: newPlayerData.position,
      jerseyNumber: Number(newPlayerData.jerseyNumber),
      medicalValid: true,
      medicalExpires: '2026-12-31',
      emergencyContactName: newPlayerData.emergencyContactName || 'Familiar',
      emergencyContactPhone: newPlayerData.emergencyContactPhone || '+5491100000000',
      stats: { goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, matchesPlayed: 0 },
      createdAt: new Date(),
    };

    // 1. Instant local update
    const updated = [createdAthlete, ...athletes];
    setAthletes(updated);
    safeSaveAthletes(updated);

    // 2. Non-blocking background API sync
    try {
      fetch('/api/tenant/sports/athletes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || 'demo-token-jwt'}`,
        },
        body: JSON.stringify(createdAthlete),
      }).catch(() => {});
    } catch {
      // Offline fallback
    }

    setIsSaving(false);
    setIsModalOpen(false);
    setPhotoPreview('');
    setUrlInput('');
    setNewPlayerData({
      firstName: '',
      lastName: '',
      dni: '',
      birthDate: '2002-05-14',
      heightCm: 175,
      weightKg: 70,
      position: 'Ala',
      jerseyNumber: 10,
      preferredFoot: 'DIESTRO',
      categoryName: 'Primera',
      emergencyContactName: '',
      emergencyContactPhone: '',
      notes: '',
    });

    setNotification({ type: 'success', text: `¡Jugador ${createdAthlete.firstName} ${createdAthlete.lastName} registrado con foto exitosamente!` });
    setTimeout(() => setNotification(null), 5000);
  };

  const filteredAthletes = athletes.filter((a) => {
    const matchesCategory = categoryFilter === 'Todos' || a.categoryName === categoryFilter;
    const matchesQuery =
      a.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.dni.includes(searchTerm);
    return matchesCategory && matchesQuery;
  });

  const activeCount = athletes.filter((a) => a.medicalValid).length;
  const injuredCount = athletes.filter((a) => !a.medicalValid).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification.text}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-1 border border-blue-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>Futsal AFA · Club Atlético Jorge Newbery</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Gestión Deportiva & Futsal AFA</h1>
          <p className="text-slate-400 text-xs mt-0.5">Control de planteles, cuerpo técnico, fichas médicas y fotos oficiales.</p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Jugador</span>
        </button>
      </div>

      {/* Category Tabs & Stats Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['Primera', 'Reserva', '3ra', '4ta', '5ta', '6ta', '7ma', '8va', 'Escuelita', 'Todos'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all font-semibold ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-400">
            Total: <strong className="text-white">{athletes.length}</strong>
          </span>
          <span className="text-emerald-400">
            Activos: <strong>{activeCount}</strong>
          </span>
          <span className="text-amber-400">
            Lesionados: <strong>{injuredCount}</strong>
          </span>
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
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="p-4">Deportista</th>
                <th className="p-4">Disciplina / Cat.</th>
                <th className="p-4">Posición / Dorsal</th>
                <th className="p-4">Apto Físico</th>
                <th className="p-4 text-right">Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAthletes.map((a) => (
                <tr key={a.id} className="hover:bg-slate-900/40">
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <img src={a.avatarUrl} alt={a.firstName} className="w-9 h-9 rounded-full object-cover border border-slate-700 shadow-sm" />
                    <div>
                      <span>
                        {a.lastName.toUpperCase()}, {a.firstName}
                      </span>
                      <span className="block text-[10px] text-slate-500 font-mono">DNI: {a.dni}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-300">{a.disciplineName}</span>
                    <span className="block text-[10px] text-blue-400 font-mono font-bold">{a.categoryName}</span>
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
                        <AlertTriangle className="w-3 h-3" /> LESIONADO
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
              <img src={selectedAthlete.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/40 shadow-lg" />
              <div>
                <h3 className="font-extrabold text-white text-base">
                  {selectedAthlete.firstName} {selectedAthlete.lastName}
                </h3>
                <span className="text-xs text-blue-400 font-bold">
                  {selectedAthlete.disciplineName} ({selectedAthlete.categoryName})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Altura / Peso</span>
                <span className="font-bold text-white font-mono">
                  {selectedAthlete.heightCm} cm / {selectedAthlete.weightKg} kg
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Pie Hábil</span>
                <span className="font-bold text-slate-200">{selectedAthlete.preferredFoot}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>Vigencia Aptitud Médica</span>
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

      {/* ============================================================ */}
      {/* MODAL: NUEVO JUGADOR & GESTOR MULTIMEDIA UNIVERSAL           */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-2xl rounded-3xl border border-slate-800 p-6 space-y-6 relative animate-in fade-in zoom-in-95 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <UserPlus className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="font-extrabold text-white text-lg">Nuevo Jugador — Futsal AFA</h2>
                  <p className="text-xs text-slate-400">Complete los datos e ingrese o suba la foto desde su PC.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePlayer} className="space-y-6">
              <UniversalMediaUploader
                value={photoPreview}
                onChange={setPhotoPreview}
                label="Subir o Buscar Foto — Gestor Multimedia Universal"
              />

              {/* SECTION: FORM FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={newPlayerData.firstName}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, firstName: e.target.value })}
                    placeholder="Ej: Belen"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Apellido *</label>
                  <input
                    type="text"
                    required
                    value={newPlayerData.lastName}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, lastName: e.target.value })}
                    placeholder="Ej: Méndez"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">DNI / Pasaporte</label>
                  <input
                    type="text"
                    value={newPlayerData.dni}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, dni: e.target.value })}
                    placeholder="Ej: 41.890.120"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Categoría Futsal</label>
                  <select
                    value={newPlayerData.categoryName}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, categoryName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"
                  >
                    <option value="Primera">Primera</option>
                    <option value="Reserva">Reserva</option>
                    <option value="3ra">3ra</option>
                    <option value="4ta">4ta</option>
                    <option value="5ta">5ta</option>
                    <option value="6ta">6ta</option>
                    <option value="7ma">7ma</option>
                    <option value="8va">8va</option>
                    <option value="Escuelita">Escuelita</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Posición en Cancha</label>
                  <select
                    value={newPlayerData.position}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, position: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"
                  >
                    <option value="Pivot">Pivot</option>
                    <option value="Ala">Ala</option>
                    <option value="Cierre">Cierre</option>
                    <option value="Arquero">Arquero</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Dorsal / Camiseta N°</label>
                  <input
                    type="number"
                    value={newPlayerData.jerseyNumber}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, jerseyNumber: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Altura (cm)</label>
                  <input
                    type="number"
                    value={newPlayerData.heightCm}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, heightCm: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Peso (kg)</label>
                  <input
                    type="number"
                    value={newPlayerData.weightKg}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, weightKg: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-transform hover:scale-105"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSaving ? 'Guardando Jugador...' : 'Guardar Jugador'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
