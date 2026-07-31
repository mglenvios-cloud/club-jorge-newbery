'use client';

import React from 'react';
import { Video, Film, Eye } from 'lucide-react';

export default function MediaVideosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Videoteca Oficial & Resúmenes</h1>
          <p className="text-slate-400 text-xs mt-0.5">Archivo de piezas audiovisuales organizados por temporada y disciplina.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: '1', title: 'Resumen Semanal de Goles', season: 'Temporada 2026', views: 5400, img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop' },
          { id: '2', title: 'Entrevista Exclusiva con el Entrenador', season: 'Temporada 2026', views: 2100, img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop' },
        ].map((v) => (
          <div key={v.id} className="glass-card rounded-3xl border border-slate-800 overflow-hidden space-y-3">
            <div className="relative aspect-video bg-slate-950">
              <img src={v.img} alt={v.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 text-white text-[10px] font-mono font-bold">
                {v.season}
              </div>
            </div>
            <div className="p-4 pt-0 space-y-1">
              <h3 className="font-bold text-white text-sm">{v.title}</h3>
              <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {v.views.toLocaleString()} reproducciones
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
