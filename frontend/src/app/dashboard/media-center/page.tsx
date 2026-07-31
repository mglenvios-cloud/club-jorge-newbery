'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Newspaper, Video, Image as ImageIcon, FileText, ArrowRight } from 'lucide-react';

export default function MediaCenterGeneralPage() {
  return (
    <div className="space-y-6">
      {/* AI Creator Callout */}
      <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Motor IA Sports Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Generador Automático de Crónicas Deportivas</h2>
          <p className="text-slate-400 text-xs">
            Transforme datos de partidos y estadísticas en crónicas periodísticas profesionales y piezas para redes sociales en segundos.
          </p>
        </div>

        <Link
          href="/dashboard/media-center/ai-creator"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Abrir IA Creator</span>
        </Link>
      </div>

      {/* Grid Overview Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/media-center/news" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all group">
          <Newspaper className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Noticias & Artículos</h3>
          <p className="text-slate-400 text-xs mt-1">Crónicas institucionales y novedades.</p>
        </Link>

        <Link href="/dashboard/media-center/videos" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-red-500/40 transition-all group">
          <Video className="w-6 h-6 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Videoteca</h3>
          <p className="text-slate-400 text-xs mt-1">Resúmenes, jugadas y partidos.</p>
        </Link>

        <Link href="/dashboard/media-center/photos" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all group">
          <ImageIcon className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Galería Fotográfica</h3>
          <p className="text-slate-400 text-xs mt-1">Cobertura en alta resolución.</p>
        </Link>

        <Link href="/dashboard/media-center/historical" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all group">
          <FileText className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Museo Digital</h3>
          <p className="text-slate-400 text-xs mt-1">Archivo histórico del club.</p>
        </Link>
      </div>
    </div>
  );
}
