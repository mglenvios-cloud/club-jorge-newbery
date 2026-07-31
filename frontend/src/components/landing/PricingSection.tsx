'use client';

import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    badge: 'Clubes Pequeños',
    price: '$49',
    period: '/mes',
    description: 'Para instituciones en etapa inicial que buscan digitalizar su gestión base.',
    features: [
      'Hasta 500 socios activos',
      'Infraestructura Multi-Tenant',
      'Personalización de colores de marca',
      'Soporte estándar por email',
      'Dominio asignado (club.clubdigitalpro.com)',
    ],
    highlight: false,
  },
  {
    name: 'Professional',
    badge: 'Popular',
    price: '$129',
    period: '/mes',
    description: 'Para clubes en crecimiento que requieren personalización completa.',
    features: [
      'Socios ilimitados',
      'Aislamiento de datos prioritario',
      'Branding completo & logotipo propio',
      'Subdominio o Dominio propio custom',
      'Consola con RBAC avanzado',
      'Soporte prioritario 24/7',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    badge: 'Grandes Instituciones',
    price: 'Custom',
    period: '',
    description: 'Para cadenas de clubes o federaciones con requerimientos a medida.',
    features: [
      'Base de datos dedicada',
      'SLA garantizado 99.9%',
      'Customización de infraestructura',
      'Auditoría y cumplimiento enterprise',
      'Asesor técnico asignado',
    ],
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
            Planes Comerciales SaaS
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Diseñados para Todo Tipo de Institución
          </h3>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Modelos de suscripción flexibles adaptados a la dimensión y necesidades tecnológicas de cada cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 relative flex flex-col justify-between transition-all ${
                plan.highlight
                  ? 'bg-gradient-to-b from-blue-900/40 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105'
                  : 'bg-slate-900/60 border border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-white">{plan.name}</span>
                  <span
                    className={`px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider ${
                      plan.highlight
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-slate-400 text-xs mb-6">{plan.description}</p>
                <div className="h-px bg-slate-800 w-full mb-6"></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  plan.highlight
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Seleccionar Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
