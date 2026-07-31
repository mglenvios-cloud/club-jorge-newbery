'use client';

import React from 'react';
import { Newspaper, Sparkles, Plus, Search } from 'lucide-react';

export default function MediaNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Noticias & Artículos Institucionales</h1>
          <p className="text-slate-400 text-xs mt-0.5">Gestión de publicaciones periodísticas e institucionales del club.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Título de la Noticia</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Origen</th>
              <th className="p-4">Fecha</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { id: '1', title: 'Victoria Histórica en el Clásico Interclubes', category: 'Deportes', ai: true, date: '2026-07-20' },
              { id: '2', title: 'Inauguración de Nuevas Canchas de Pádel', category: 'Obras', ai: false, date: '2026-07-10' },
            ].map((n) => (
              <tr key={n.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-blue-400" />
                  <span>{n.title}</span>
                </td>
                <td className="p-4 text-slate-300">{n.category}</td>
                <td className="p-4">
                  {n.ai ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Generado por IA
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">Manual</span>
                  )}
                </td>
                <td className="p-4 font-mono text-slate-400">{n.date}</td>
                <td className="p-4 text-right">
                  <button className="text-blue-400 hover:underline font-bold text-xs">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
