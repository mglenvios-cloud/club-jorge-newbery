'use client';

import React, { useEffect, useState } from 'react';
import { Tournament, TournamentStanding } from '@club-digital-pro/shared';
import { Trophy, Plus, Shield, Award, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

export default function TournamentsDashboardPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TournamentStanding | null>(null);

  // New Tournament Form
  const [name, setName] = useState('');
  const [sport, setSport] = useState('Fútbol 11');
  const [season, setSeason] = useState('2026');
  const [category, setCategory] = useState('Primera División');
  const [teamsText, setTeamsText] = useState('Jorge Newbery A, Jorge Newbery B, Rivadavia, Juventud Unida');

  // Edit Standing Form
  const [played, setPlayed] = useState('0');
  const [won, setWon] = useState('0');
  const [drawn, setDrawn] = useState('0');
  const [lost, setLost] = useState('0');
  const [goalsFor, setGoalsFor] = useState('0');
  const [goalsAgainst, setGoalsAgainst] = useState('0');

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tenant/sports/tournaments');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTournaments(data.data);
        if (data.data.length > 0) {
          setSelectedTournament(data.data[0]);
        }
      }
    } catch (error) {
      console.error('Error al cargar torneos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sport) return;

    const teams = teamsText.split(',').map(t => t.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/tenant/sports/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          sport,
          season,
          category,
          teams,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTournaments([data.data, ...tournaments]);
        setSelectedTournament(data.data);
        setShowModal(false);
        setName('');
      }
    } catch (error) {
      console.error('Error al crear torneo:', error);
    }
  };

  const handleOpenEditStanding = (standing: TournamentStanding) => {
    setEditingTeam(standing);
    setPlayed(standing.played.toString());
    setWon(standing.won.toString());
    setDrawn(standing.drawn.toString());
    setLost(standing.lost.toString());
    setGoalsFor(standing.goalsFor.toString());
    setGoalsAgainst(standing.goalsAgainst.toString());
  };

  const handleSaveStanding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournament || !editingTeam) return;

    try {
      const res = await fetch(`/api/tenant/sports/tournaments/${selectedTournament.id}/standings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: editingTeam.teamName,
          played: parseInt(played) || 0,
          won: parseInt(won) || 0,
          drawn: parseInt(drawn) || 0,
          lost: parseInt(lost) || 0,
          goalsFor: parseInt(goalsFor) || 0,
          goalsAgainst: parseInt(goalsAgainst) || 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSelectedTournament(data.data);
        setTournaments(tournaments.map(t => (t.id === data.data.id ? data.data : t)));
        setEditingTeam(null);
      }
    } catch (error) {
      console.error('Error al actualizar tabla:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>Torneos & Tabla de Posiciones</span>
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Gestión de competencias oficiales del Club Atlético Jorge Newbery.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Torneo</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500 text-sm">Cargando torneos oficiales...</div>
      ) : tournaments.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
          No hay torneos registrados. Haz clic en "Nuevo Torneo" para dar de alta una liga o torneo.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tournament List Sidebar */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Torneos Activos</h2>
            {tournaments.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTournament(t)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedTournament?.id === t.id
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 uppercase">
                    {t.sport}
                  </span>
                  <span className="text-[10px] text-slate-500">{t.season}</span>
                </div>
                <div className="font-extrabold text-sm mt-1">{t.name}</div>
                <div className="text-xs text-slate-400">{t.category}</div>
              </button>
            ))}
          </div>

          {/* Standings Table */}
          <div className="lg:col-span-3 space-y-4">
            {selectedTournament && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-white">{selectedTournament.name}</h2>
                    <p className="text-xs text-slate-400">{selectedTournament.sport} • {selectedTournament.category} • Temporada {selectedTournament.season}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    LIGA EN CURSO
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                        <th className="p-3 text-center">Pos</th>
                        <th className="p-3">Equipo</th>
                        <th className="p-3 text-center">PJ</th>
                        <th className="p-3 text-center">PG</th>
                        <th className="p-3 text-center">PE</th>
                        <th className="p-3 text-center">PP</th>
                        <th className="p-3 text-center">GF</th>
                        <th className="p-3 text-center">GC</th>
                        <th className="p-3 text-center">DIF</th>
                        <th className="p-3 text-center font-extrabold text-white">PTS</th>
                        <th className="p-3 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {selectedTournament.standings && selectedTournament.standings.length > 0 ? (
                        selectedTournament.standings.map((st, idx) => (
                          <tr key={st.id} className="hover:bg-slate-800/40">
                            <td className="p-3 text-center font-bold text-slate-400">{idx + 1}</td>
                            <td className="p-3 font-bold text-white flex items-center gap-2">
                              <Shield className="w-3.5 h-3.5 text-blue-400" />
                              <span>{st.teamName}</span>
                            </td>
                            <td className="p-3 text-center">{st.played}</td>
                            <td className="p-3 text-center text-emerald-400">{st.won}</td>
                            <td className="p-3 text-center text-amber-400">{st.drawn}</td>
                            <td className="p-3 text-center text-rose-400">{st.lost}</td>
                            <td className="p-3 text-center">{st.goalsFor}</td>
                            <td className="p-3 text-center">{st.goalsAgainst}</td>
                            <td className="p-3 text-center font-mono">{st.goalDiff > 0 ? `+${st.goalDiff}` : st.goalDiff}</td>
                            <td className="p-3 text-center font-black text-amber-400 text-sm">{st.points}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleOpenEditStanding(st)}
                                className="p-1 text-slate-400 hover:text-blue-400 rounded transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={11} className="p-6 text-center text-slate-500">
                            No hay equipos en la tabla de posiciones.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Tournament Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Alta de Torneo Oficial</h3>
            <form onSubmit={handleCreateTournament} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nombre del Torneo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Copa Apertura Jorge Newbery"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Deporte</label>
                  <input
                    type="text"
                    value={sport}
                    onChange={e => setSport(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Temporada</label>
                  <input
                    type="text"
                    value={season}
                    onChange={e => setSeason(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Categoría</label>
                <input
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Equipos Participantes (separados por coma)</label>
                <textarea
                  value={teamsText}
                  onChange={e => setTeamsText(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Crear Torneo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Standing Modal */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white">Editar Puntuación: {editingTeam.teamName}</h3>
            <form onSubmit={handleSaveStanding} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block">PJ</label>
                  <input type="number" value={played} onChange={e => setPlayed(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">PG</label>
                  <input type="number" value={won} onChange={e => setWon(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">PE</label>
                  <input type="number" value={drawn} onChange={e => setDrawn(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">PP</label>
                  <input type="number" value={lost} onChange={e => setLost(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">GF</label>
                  <input type="number" value={goalsFor} onChange={e => setGoalsFor(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">GC</label>
                  <input type="number" value={goalsAgainst} onChange={e => setGoalsAgainst(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setEditingTeam(null)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300">
                  Cancelar
                </button>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-bold text-white">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
