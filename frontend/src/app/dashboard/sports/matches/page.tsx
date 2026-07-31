'use client';

import React from 'react';
import { Medal, Calendar, MapPin, Trophy, CheckCircle2 } from 'lucide-react';

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Fixture de Partidos & Resultados</h1>
        <p className="text-slate-400 text-xs mt-0.5">Programación oficial de encuentros interclubes, convocatorias y cómputos.</p>
      </div>

      <div className="space-y-4">
        {[
          { id: '1', disc: 'Fútbol Masculino', category: 'Primera División', vs: 'Atlético Deportivo Norte', location: 'Estadio Principal (LOCAL)', date: '2026-07-25', time: '15:30', status: 'SCHEDULED', referee: 'Marcos Maidana' },
          { id: '2', disc: 'Básquet', category: 'Sub 20', vs: 'Sportivo Italiano', location: 'Gimnasio Visitante (VISITANTE)', date: '2026-07-18', time: '19:00', score: '78 - 82', status: 'FINISHED' },
        ].map((m) => (
          <div key={m.id} className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-blue-400 font-mono font-bold uppercase">{m.disc} • {m.category}</span>
              <h3 className="font-extrabold text-white text-base">vs {m.vs}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {m.date} - {m.time} hs</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {m.location}</span>
              </p>
            </div>

            <div className="text-right">
              {m.status === 'FINISHED' ? (
                <div>
                  <span className="text-xl font-black text-emerald-400 font-mono block">{m.score}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">VICTORIA</span>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  PROGRAMADO
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
