'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Layers, Server } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden bg-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8">
          <Zap className="w-3.5 h-3.5" />
          <span>La Solución SaaS Integral para Instituciones Deportivas & Sociales</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Transforme la Gestión de su Club con Tecnologías{' '}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Multi-Tenant de Última Generación
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
          <strong className="text-slate-200">Club Digital Pro</strong> es la plataforma digital oficial diseñada para gestionar la administración integral del club, carnet digital, reservas de instalaciones, torneos y Club TV.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Explorar Consola Base</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#multitenant"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-all text-center"
          >
            Ver Arquitectura SaaS
          </a>
        </div>

        {/* Stats / Value Highlights */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="glass-panel p-6 rounded-2xl">
            <Layers className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-2xl font-bold text-white">Multi-Tenant</h3>
            <p className="text-xs text-slate-400 mt-1">Aislamiento lógico de datos y dominios dinámicos.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <Zap className="w-8 h-8 text-sky-400 mb-3" />
            <h3 className="text-2xl font-bold text-white">Custom Branding</h3>
            <p className="text-xs text-slate-400 mt-1">Identidad visual personalizable en tiempo real.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="text-2xl font-bold text-white">RBAC Avanzado</h3>
            <p className="text-xs text-slate-400 mt-1">Control granular de accesos por roles y permisos.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <Server className="w-8 h-8 text-indigo-400 mb-3" />
            <h3 className="text-2xl font-bold text-white">Cloud Ready</h3>
            <p className="text-xs text-slate-400 mt-1">Stack moderno Next.js, Express, Prisma & Postgres.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
