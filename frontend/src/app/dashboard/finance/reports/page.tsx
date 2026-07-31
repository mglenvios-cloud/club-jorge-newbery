'use client';

import React, { useState } from 'react';
import { BarChart3, Sparkles, FileSpreadsheet, Download, RefreshCw } from 'lucide-react';

export default function FinanceReportsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<{
    summary: string;
    metrics: { revenueGrowthPct: number; sportsExpensePct: number; delinquencyPct: number };
    recommendations: string[];
  }>({
    summary: 'Informe Financiero de Gestión: El balance neto mensual asciende a $162,000 ARS. Los ingresos consolidados superan la estructura de costos fijos, observando una tasa de cobrabilidad del 92.8%.',
    metrics: { revenueGrowthPct: 15.2, sportsExpensePct: 42, delinquencyPct: 7.2 },
    recommendations: [
      'La morosidad actual se sitúa en 7.2%. Se sugiere enviar recordatorios automáticos por WhatsApp desde el Portal de Socios.',
      'Los gastos deportivos representan aproximadamente el 42% del presupuesto operativo.',
      'Se recomienda evaluar la renovación y actualización del valor de cuota para el próximo trimestre.',
    ],
  });

  const handleRunAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Mes,Ingresos,Gastos,BalanceNeto,TasaCobroPct\n' +
      'Julio 2026,225000,63000,162000,92.8\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `balance_financiero_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Reportes Financieros Consolidados & IA Analysis</h1>
          <p className="text-slate-400 text-xs mt-0.5">Análisis ejecutivo automatizado de balances, flujo de fondos y morosidad.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAI}
            disabled={isAnalyzing}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAnalyzing ? 'Ejecutando Análisis...' : 'Actualizar Informe IA'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Exportar Balance (CSV)</span>
          </button>
        </div>
      </div>

      {/* AI Analysis Report Card */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 space-y-4 bg-gradient-to-b from-blue-950/20 to-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="font-extrabold text-white text-base">Informe Auditor Financiero IA</h3>
          </div>
          <span className="text-[10px] text-blue-400 font-mono font-bold bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
            Engine Active
          </span>
        </div>

        <p className="text-slate-200 text-xs leading-relaxed">{report.summary}</p>

        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-bold text-white block">Recomendaciones Estratégicas:</span>
          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
            {report.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
