'use client';

import React from 'react';
import { BarChart2, Trophy, FileSpreadsheet, Medal } from 'lucide-react';

export default function SportsStatsPage() {
  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Jugador,Disciplina,Categoria,Goles,Asistencias,TarjetasAmarillas,TarjetasRojas,MinutosJugados\n' +
      'Emiliano Ríos,Fútbol Masculino,Primera División,12,4,2,0,1080\n' +
      'Lucas Valenzuela,Básquet,Sub 20,84,22,1,0,450\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `estadisticas_deportivas_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Estadísticas & Líderes de Rendimiento</h1>
          <p className="text-slate-400 text-xs mt-0.5">Tabla de goleadores, asistencias, tarjetas y minutos disputados.</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Exportar Estadísticas (CSV)</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Deportista</th>
              <th className="p-4">Disciplina</th>
              <th className="p-4 text-center">Partidos</th>
              <th className="p-4 text-center">Goles / Ptos</th>
              <th className="p-4 text-center">Asistencias</th>
              <th className="p-4 text-center">Amarillas / Rojas</th>
              <th className="p-4 text-right">Minutos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            <tr>
              <td className="p-4 font-sans font-bold text-white">Emiliano Ríos</td>
              <td className="p-4 font-sans text-slate-300">Fútbol Masculino</td>
              <td className="p-4 text-center text-slate-300">14</td>
              <td className="p-4 text-center text-emerald-400 font-bold">12</td>
              <td className="p-4 text-center text-sky-400 font-bold">4</td>
              <td className="p-4 text-center text-amber-400">2 / 0</td>
              <td className="p-4 text-right text-slate-300">1,080'</td>
            </tr>
            <tr>
              <td className="p-4 font-sans font-bold text-white">Lucas Valenzuela</td>
              <td className="p-4 font-sans text-slate-300">Básquet</td>
              <td className="p-4 text-center text-slate-300">10</td>
              <td className="p-4 text-center text-emerald-400 font-bold">84</td>
              <td className="p-4 text-center text-sky-400 font-bold">22</td>
              <td className="p-4 text-center text-amber-400">1 / 0</td>
              <td className="p-4 text-right text-slate-300">450'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
