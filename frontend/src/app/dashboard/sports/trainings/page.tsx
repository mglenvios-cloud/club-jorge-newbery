'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function TrainingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Calendario de Entrenamientos & Control de Asistencia</h1>
        <p className="text-slate-400 text-xs mt-0.5">Programación de turnos en campos de juego, natatorio y gimnasios.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: '1', disc: 'Fútbol Masculino', category: 'Primera División', title: 'Entrenamiento Táctico y Balón Parado', loc: 'Campo Principal Sede Central', date: '2026-07-22', time: '16:00 - 18:00', att: '22 / 24' },
          { id: '2', disc: 'Básquet', category: 'Sub 20', title: 'Acondicionamiento Físico y Tiro', loc: 'Gimnasio Cubierto Cancha 1', date: '2026-07-22', time: '18:30 - 20:30', att: '14 / 15' },
        ].map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-blue-400 font-mono font-bold uppercase block">{item.disc} • {item.category}</span>
                <h3 className="font-bold text-white text-sm mt-0.5">{item.title}</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Programado
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <p className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {item.date}</p>
              <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-blue-400" /> {item.time}</p>
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {item.loc}</p>
              <p className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-emerald-400" /> Asistencia: <strong className="text-white">{item.att}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
