'use client';

import React from 'react';
import { History, Medal, Trophy, Landmark } from 'lucide-react';

export default function MediaHistoricalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Archivo Histórico & Museo Digital del Club</h1>
        <p className="text-slate-400 text-xs mt-0.5">Patrimonio digitalizado, copas históricas, actas fundacionales y leyendas del club.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: '1', title: 'Equipo Campeón del Año 1978', year: '1978', desc: 'Plantel legendario que conquistó el primer título oficial.', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop' },
          { id: '2', title: 'Acta de Fundación de la Sede Central', year: '1945', desc: 'Manuscrito original del acta constitutiva redactada por los fundadores.', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop' },
        ].map((item) => (
          <div key={item.id} className="glass-card rounded-3xl border border-slate-800 overflow-hidden space-y-4 p-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                Año {item.year}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-white text-base">{item.title}</h3>
              <p className="text-slate-400 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
