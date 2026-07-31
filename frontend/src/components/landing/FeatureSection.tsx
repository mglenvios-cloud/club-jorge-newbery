'use client';

import React from 'react';
import { Database, Palette, Lock, Cpu, Globe, Activity } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Aislamiento de Datos por Tenant',
    description:
      'Garantía de privacidad estricta. La arquitectura multi-tenant asegura la separación de información para cada entidad deportiva registradora.',
  },
  {
    icon: Palette,
    title: 'Sistema de Branding Dinámico',
    description:
      'Cada club personaliza automáticamente la paleta de colores, imagotipo, tipografías y tema del panel de administración y sus portales.',
  },
  {
    icon: Lock,
    title: 'Matriz de Permisos & Seguridad',
    description:
      'Control de acceso con jerarquías para administradores SaaS, administradores del club, personal administrativo, instructores y socios.',
  },
  {
    icon: Globe,
    title: 'Infraestructura Multidominio',
    description:
      'Soporte nativo para subdominios institucionales o dominios propios personalizados (ej: clubname.clubdigitalpro.com).',
  },
  {
    icon: Cpu,
    title: 'Motor de API Enterprise',
    description:
      'Backend Express + TypeScript optimizado con ORM Prisma, preparado para soportar miles de consultas concurrentes.',
  },
  {
    icon: Activity,
    title: 'Monitor de Salud & Telemetría',
    description:
      'Supervisión del rendimiento del sistema, logs de auditoría por tenant y monitoreo en vivo de estado operativo.',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-24 bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
            Infraestructura Tecnológica Base
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Diseñado para la Escala Comercial SaaS
          </h3>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Club Digital Pro proporciona la base sólida y modular necesaria para desplegar la gestión digital de cualquier institución deportiva o social.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
