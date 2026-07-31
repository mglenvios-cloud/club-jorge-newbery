'use client';

import React from 'react';
import { FileText, Download, FileCode } from 'lucide-react';

export default function MediaDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Biblioteca de Documentos PDF & Estatutos</h1>
        <p className="text-slate-400 text-xs mt-0.5">Archivo oficial de memorias, reglamentos, balances y reglamentaciones disciplinares.</p>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="p-4">Documento</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Formato</th>
              <th className="p-4">Fecha</th>
              <th className="p-4 text-right">Descargar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { id: '1', title: 'Estatuto Social Institucional', cat: 'Reglamentos', type: 'PDF', date: '2025-01-10' },
              { id: '2', title: 'Memoria y Balance Ejercicio 2025', cat: 'Asamblea', type: 'PDF', date: '2026-03-15' },
            ].map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{doc.title}</span>
                </td>
                <td className="p-4 text-slate-300">{doc.cat}</td>
                <td className="p-4 font-mono font-bold text-rose-400">{doc.type}</td>
                <td className="p-4 font-mono text-slate-400">{doc.date}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800" title="Descargar PDF">
                    <Download className="w-4 h-4 text-blue-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
