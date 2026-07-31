'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, ArrowRight } from 'lucide-react';

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight text-white">
              CLUB DIGITAL <span className="text-blue-500">PRO</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              SaaS Platform
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Plataforma</a>
          <a href="#multitenant" className="hover:text-white transition-colors">Multi-Tenant</a>
          <a href="#pricing" className="hover:text-white transition-colors">Planes SaaS</a>
          <a href="#docs" className="hover:text-white transition-colors">Infraestructura</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2 group"
          >
            <span>Acceso Demo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
}
