'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-white">
              CLUB ATLÉTICO <span className="text-blue-500">JORGE NEWBERY</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed mb-4">
            Plataforma digital oficial para la gestión integral del Club Atlético Jorge Newbery.
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            © {new Date().getFullYear()} Club Atlético Jorge Newbery. Todos los derechos reservados.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[11px]">Plataforma Base</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-white">Multi-Tenancy</a></li>
            <li><a href="#features" className="hover:text-white">Sistema de Branding</a></li>
            <li><a href="#features" className="hover:text-white">Autenticación & Permisos</a></li>
            <li><a href="#pricing" className="hover:text-white">Planes Comerciales</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[11px]">Tecnología</h4>
          <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
            <li>Next.js 14 App Router</li>
            <li>Express & Node.js API</li>
            <li>TypeScript Core</li>
            <li>Prisma ORM & PostgreSQL</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
