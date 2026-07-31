'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="h-12 border-t border-slate-800 bg-slate-950/80 px-6 flex items-center justify-between text-[11px] text-slate-500">
      <p>© {new Date().getFullYear()} Club Digital Pro SaaS Platform. Todos los derechos reservados.</p>
      <div className="flex items-center gap-4">
        <span>Fase 1: Infraestructura Base</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
        <span className="text-emerald-400 font-medium">Estado: En Línea</span>
      </div>
    </footer>
  );
}
