'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Newspaper, Video, Image as ImageIcon, FileText, Layout, Plus, Check } from 'lucide-react';

export default function MediaCenterGeneralPage() {
  const [sponsors, setSponsors] = useState([
    { id: 'sp-1', name: 'Sponsor Oficial Devoto', category: 'Banner Principal', status: 'Activo' },
    { id: 'sp-2', name: 'Indumentaria Oficial', category: 'Camiseta & Banners', status: 'Activo' },
    { id: 'sp-3', name: 'Transporte Oficial Futsal', category: 'Sponsor Institucional', status: 'Activo' },
  ]);

  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerCategory, setBannerCategory] = useState('Banner Principal');
  const [isEditing, setIsEditing] = useState(false);

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle) return;
    setSponsors([...sponsors, { id: `sp-${Date.now()}`, name: bannerTitle, category: bannerCategory, status: 'Activo' }]);
    setBannerTitle('');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Banner Editor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layout className="w-5 h-5 text-red-500" />
            <span>Media Center, Banners & Sponsors</span>
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Gestión de imágenes institucionales, banners de portada, marcas patrocinadoras y Newbery TV.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar / Editar Banner Sponsor</span>
        </button>
      </div>

      {/* Editing Form Modal */}
      {isEditing && (
        <form onSubmit={handleAddSponsor} className="glass-card p-6 rounded-2xl border border-red-500/30 space-y-4 animate-in fade-in">
          <h3 className="font-bold text-white text-sm">Crear / Modificar Banner Publicitario de Sponsor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Nombre del Sponsor / Marca</label>
              <input
                type="text"
                required
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                placeholder="Ej: Banco Oficial Villa Devoto"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Ubicación del Banner</label>
              <select
                value={bannerCategory}
                onChange={(e) => setBannerCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="Banner Principal Portada">Banner Principal Portada</option>
                <option value="Sponsor Camiseta Futsal">Sponsor Camiseta Futsal</option>
                <option value="Banner Newbery TV">Banner Newbery TV</option>
                <option value="Sponsor Canchas & Molinetes">Sponsor Canchas & Molinetes</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md"
            >
              Guardar Banner
            </button>
          </div>
        </form>
      )}

      {/* Active Sponsors Grid */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Layout className="w-4 h-4 text-red-500" />
          <span>Banners & Sponsors Oficiales Configurados</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sponsors.map((sp) => (
            <div key={sp.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                  {sp.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <Check className="w-3 h-3" /> Activo
                </span>
              </div>
              <div className="font-extrabold text-white text-sm">{sp.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Overview Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/media-center/news" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-red-500/40 transition-all group">
          <Newspaper className="w-6 h-6 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Noticias & Artículos</h3>
          <p className="text-slate-400 text-xs mt-1">Crónicas institucionales y novedades.</p>
        </Link>

        <Link href="/dashboard/tv" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-red-500/40 transition-all group">
          <Video className="w-6 h-6 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Newbery TV & En Vivos</h3>
          <p className="text-slate-400 text-xs mt-1">Transmisiones y videoteca.</p>
        </Link>

        <Link href="/dashboard/media-center/photos" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-red-500/40 transition-all group">
          <ImageIcon className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Galería Fotográfica</h3>
          <p className="text-slate-400 text-xs mt-1">Cobertura en alta resolución.</p>
        </Link>

        <Link href="/dashboard/media-center/historical" className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-red-500/40 transition-all group">
          <FileText className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-base">Museo Digital</h3>
          <p className="text-slate-400 text-xs mt-1">Archivo histórico del club.</p>
        </Link>
      </div>
    </div>
  );
}
