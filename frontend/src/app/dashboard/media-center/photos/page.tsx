'use client';

import React from 'react';
import { Image as ImageIcon, Camera } from 'lucide-react';

export default function MediaPhotosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Galerías Fotográficas & Álbumes</h1>
        <p className="text-slate-400 text-xs mt-0.5">Cobertura fotográfica en alta definición de eventos e instalaciones.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: '1', title: 'Inauguración Canchas de Pádel', count: 48, img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop' },
          { id: '2', title: 'Torneo Nocturno de Natación', count: 32, img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop' },
        ].map((p) => (
          <div key={p.id} className="glass-card rounded-3xl border border-slate-800 overflow-hidden space-y-3">
            <div className="relative aspect-video bg-slate-950">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-[10px] font-mono font-bold flex items-center gap-1">
                <Camera className="w-3 h-3" /> {p.count} Fotos
              </div>
            </div>
            <div className="p-4 pt-0">
              <h3 className="font-bold text-white text-sm">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
