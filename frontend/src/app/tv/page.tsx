'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/components/providers/TenantProvider';
import { Tv, Radio, Play, MessageSquare, ThumbsUp, Heart, Share2, Eye, Sparkles } from 'lucide-react';

export default function PublicTvPortalPage() {
  const { tenant } = useTenant();
  const [likes, setLikes] = useState(148);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-red-600 selection:text-white">
      {/* Public Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {tenant?.branding?.logoUrl ? (
            <img src={tenant.branding.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold text-xs">
              TV
            </div>
          )}
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-tight">
              {tenant?.name} <span className="text-red-500 font-black">TV</span>
            </h1>
            <span className="text-[9px] text-slate-400 font-mono block">Canal Oficial de Transmisión Streaming</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <Radio className="w-3.5 h-3.5" /> EN VIVO AHORA
          </span>
        </div>
      </header>

      {/* Main Stream Player & Interactive Panel */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-8 space-y-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video bg-black rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/live_stream?channel=UC_DEMO"
                title="Transmisión Oficial en Vivo"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 uppercase font-mono">
                    Transmisión en Directo
                  </span>
                  <h2 className="text-xl font-extrabold text-white mt-1">Gran Clásico Interclubes — Primera División</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Relatos oficiales, comentarios en vivo y mejores jugadas de la jornada.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLikes(likes + 1)}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>{likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Chat & Sponsor Ads Banner */}
          <div className="space-y-6">
            {/* Sponsor Ad Banner */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/20 space-y-2">
              <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider block">Sponsor Oficial del Partido</span>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=100&fit=crop"
                  alt="Banco Macro Pro"
                  className="w-16 h-10 object-cover rounded-lg border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-white text-xs">Banco Macro Pro</h4>
                  <span className="text-[10px] text-blue-400 hover:underline cursor-pointer">Visitar sitio del auspiciante →</span>
                </div>
              </div>
            </div>

            {/* Live Chat Box */}
            <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-4 flex flex-col h-80">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <MessageSquare className="w-4 h-4 text-red-400" />
                <h3 className="font-bold text-white text-xs">Chat de la Hinchada</h3>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 text-xs pr-1 font-sans">
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                  <span className="font-bold text-blue-400 text-[11px]">Matías R.</span>
                  <p className="text-slate-300 text-[11px]">¡Vamos equipo! Gran comienzo del segundo tiempo 💪</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                  <span className="font-bold text-emerald-400 text-[11px]">Socio #4521</span>
                  <p className="text-slate-300 text-[11px]">Excelente la transmisión HD en el Portal TV 🔥</p>
                </div>
              </div>

              <input
                type="text"
                placeholder="Escribe tu mensaje en el chat..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {tenant?.name} — Todos los derechos reservados • Plataforma Club TV Multi-Tenant
      </footer>
    </div>
  );
}
