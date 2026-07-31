'use client';

import React, { useState } from 'react';
import { MediaItem } from '@club-digital-pro/shared';
import { Film, Image as ImageIcon, FileText, Music, Eye, Plus, Search } from 'lucide-react';

const mockMediaList: MediaItem[] = [
  {
    id: 'med-1',
    tenantId: 'tenant-default-001',
    title: 'Resumen Semanal de Goles y Mejores Jugadas',
    description: 'Los momentos más destacados del fin de semana deportivo.',
    fileType: 'VIDEO',
    fileUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    category: 'Resúmenes',
    tags: ['Fútbol', 'Goles', 'Primera'],
    views: 5400,
    createdAt: new Date('2026-07-19'),
  },
  {
    id: 'med-2',
    tenantId: 'tenant-default-001',
    title: 'Galería Fotográfica Inauguración Canchas de Pádel',
    description: 'Cobertura fotográfica en alta definición.',
    fileType: 'PHOTO',
    fileUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    category: 'Galerías',
    tags: ['Pádel', 'Obras'],
    views: 1200,
    createdAt: new Date('2026-07-10'),
  },
];

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>(mockMediaList);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filtered = items.filter((item) => filterType === 'ALL' || item.fileType === filterType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Biblioteca Multimedia & Editor</h1>
          <p className="text-slate-400 text-xs mt-0.5">Gestión de videos, álbumes fotográficos, comunicados PDF y audios.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none"
          >
            <option value="ALL">Todos los Archivos</option>
            <option value="VIDEO">Videos</option>
            <option value="PHOTO">Fotografías</option>
            <option value="PDF">Documentos PDF</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="glass-card rounded-3xl border border-slate-800 overflow-hidden space-y-3">
            <div className="relative aspect-video bg-slate-950">
              <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-slate-900/80 text-white text-[10px] font-mono font-bold border border-slate-700">
                {item.fileType}
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <h3 className="font-extrabold text-white text-sm">{item.title}</h3>
              <p className="text-slate-400 text-xs line-clamp-2">{item.description}</p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Vistas: {item.views.toLocaleString()}</span>
                <span className="text-blue-400 font-bold">Editar Metadatos</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
