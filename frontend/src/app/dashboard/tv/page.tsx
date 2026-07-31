'use client';

import React, { useState } from 'react';
import { TvStream, StreamSourceType } from '@club-digital-pro/shared';
import { Radio, Plus, Eye, Play, StopCircle, Video, CheckCircle2 } from 'lucide-react';

const mockStreamsList: TvStream[] = [
  {
    id: 'stream-1',
    tenantId: 'tenant-default-001',
    title: 'Gran Clásico Interclubes — Primera División',
    description: 'Transmisión en vivo con relatos oficiales y estadísticas en tiempo real.',
    sourceType: 'OBS',
    streamUrl: 'https://www.youtube.com/watch?v=live-demo-1',
    embedUrl: 'https://www.youtube.com/embed/live-demo-1',
    status: 'LIVE',
    viewerCount: 1420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    category: 'Deportes',
    createdAt: new Date(),
  },
  {
    id: 'stream-2',
    tenantId: 'tenant-default-001',
    title: 'Conferencia de Prensa & Lanzamiento de la Temporada',
    description: 'Presentación de nuevos refuerzos y renovaciones del plantel.',
    sourceType: 'YOUTUBE',
    streamUrl: 'https://www.youtube.com/watch?v=press-demo-2',
    embedUrl: 'https://www.youtube.com/embed/press-demo-2',
    status: 'FINISHED',
    viewerCount: 3890,
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    category: 'Institucional',
    createdAt: new Date('2026-07-15'),
  },
];

export default function TvStudioPage() {
  const [streams, setStreams] = useState<TvStream[]>(mockStreamsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [sourceType, setSourceType] = useState<StreamSourceType>('OBS');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !streamUrl) return;

    const created: TvStream = {
      id: `stream-${Date.now()}`,
      tenantId: 'tenant-default-001',
      title,
      description: 'Transmisión iniciada desde Live Studio.',
      sourceType,
      streamUrl,
      embedUrl: streamUrl,
      status: 'LIVE',
      viewerCount: 12,
      thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
      category: 'Deportes',
      createdAt: new Date(),
    };

    setStreams([created, ...streams]);
    setTitle('');
    setStreamUrl('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Transmisiones & Control en Vivo</h1>
          <p className="text-slate-400 text-xs mt-0.5">Conecte señales mediante RTMP, OBS Studio, YouTube o Vimeo.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Iniciar Transmisión Live</span>
        </button>
      </div>

      {/* Stream Modal Form */}
      {isModalOpen && (
        <form onSubmit={handleCreate} className="glass-card p-6 rounded-2xl border border-red-500/30 space-y-4 animate-in fade-in">
          <h3 className="font-bold text-white text-sm">Configurar Señal de Transmisión</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-semibold text-slate-300">Título de la Transmisión</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Final Torneo de Básquet Sub 20"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Origen de la Señal</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as StreamSourceType)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="OBS">OBS Studio / RTMP</option>
                <option value="YOUTUBE">YouTube Live</option>
                <option value="VIMEO">Vimeo Stream</option>
                <option value="LIGA_PRO_STUDIO">Liga Pro Studio</option>
              </select>
            </div>
            <div className="space-y-1.5 sm:col-span-3">
              <label className="font-semibold text-slate-300">URL / Clave de Transmisión Embed</label>
              <input
                type="text"
                required
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5" /> Salir al Aire
            </button>
          </div>
        </form>
      )}

      {/* Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {streams.map((st) => (
          <div key={st.id} className="glass-card rounded-3xl border border-slate-800 overflow-hidden space-y-4">
            <div className="relative aspect-video bg-slate-950">
              <img src={st.thumbnailUrl} alt={st.title} className="w-full h-full object-cover" />
              {st.status === 'LIVE' ? (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg animate-pulse">
                  <Radio className="w-3 h-3" /> EN VIVO • {st.viewerCount} espectadores
                </div>
              ) : (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                  FINALIZADO
                </div>
              )}
            </div>

            <div className="p-6 pt-0 space-y-2">
              <h3 className="font-extrabold text-white text-base">{st.title}</h3>
              <p className="text-slate-400 text-xs line-clamp-2">{st.description}</p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Fuente: {st.sourceType}</span>
                <span>Vistas: {st.viewerCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
