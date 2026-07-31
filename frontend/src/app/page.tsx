'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeroOverlay from '@/components/landing/HeroOverlay';
import CinematicTransition from '@/components/landing/CinematicTransition';
import { defaultJorgeNewberyBranding } from '@/config/tenantBranding';

// Dynamically import StadiumScene3D with ssr: false for Babylon.js WebGL compatibility
const StadiumScene3D = dynamic(() => import('@/components/3d/StadiumScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-red-500 text-sm font-semibold animate-pulse">
      Cargando Estadio 3D Nocturno...
    </div>
  ),
});

const newberyModules = [
  { icon: '🪪', title: 'Portal del Socio', desc: 'Padrón de afiliados, consulta de estado de cuota, trámites online y grupo familiar.', href: '/portal' },
  { icon: '📲', title: 'Carnet Digital QR', desc: 'Carnet oficial dinámico con código QR para validación rápida en molinetes y accesos.', href: '/portal/carnet' },
  { icon: '🏆', title: 'Centro de Gestión Deportiva', desc: 'Control de planteles, disciplinas, entrenamientos, horarios y aptitudes médicas.', href: '/dashboard/sports' },
  { icon: '⚽', title: 'Futsal Primera AFA', desc: 'Fixture, resultados en vivo, tabla de posiciones y seguimiento del primer equipo en AFA.', href: '/dashboard/sports/tournaments' },
  { icon: '🌱', title: 'El Semillero & Inferiores', desc: 'Desarrollo de divisiones inferiores, formación de juveniles y captación de talentos.', href: '/dashboard/sports/rosters' },
  { icon: '👕', title: 'Planteles & Juegos', desc: 'Fichas individuales, estadísticas de rendimiento, convocatorias y juegos.', href: '/dashboard/sports/stats' },
  { icon: '📺', title: 'Newbery TV', desc: 'Transmisiones en directo de partidos, resúmenes, conferencias y videoteca institucional.', href: '/tv' },
  { icon: '💵', title: 'Finanzas del Club', desc: 'Tesorería, cobro de cuotas, recaudación, presupuesto y balances contables.', href: '/dashboard/finance' },
  { icon: '🏛️', title: 'Administración Institucional', desc: 'Gestión directiva, actas de comisión, auditoría y control de sedes e instalaciones.', href: '/dashboard' },
];

const institutionalBadges = [
  { value: 'Villa Devoto', label: 'Sede Central' },
  { value: 'Primera AFA', label: 'Futsal Profesional' },
  { value: 'QR Dinámico', label: 'Carnet Digital' },
  { value: '100% HD', label: 'Newbery TV Streaming' },
];

export default function LandingPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/dashboard/sports');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Cinematic Fullscreen 3D Stadium & Hero Overlay Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <StadiumScene3D
          branding={defaultJorgeNewberyBranding}
          onBallClick={handleEnterClick}
          isTransitioning={isTransitioning}
        />
        <HeroOverlay
          branding={defaultJorgeNewberyBranding}
          onEnterClick={handleEnterClick}
          isTransitioning={isTransitioning}
        />
      </section>

      {/* Cinematic Transition Component */}
      <CinematicTransition isActive={isTransitioning} branding={defaultJorgeNewberyBranding} />

      {/* Institutional Badges Bar */}
      <section className="py-12 px-6 border-y border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {institutionalBadges.map((badge) => (
            <div key={badge.label} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <div className="text-2xl md:text-3xl font-black text-red-500 mb-1 tracking-tight">
                {badge.value}
              </div>
              <div className="text-xs text-slate-400 font-semibold">{badge.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Modules & Ecosystem Services */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Servicios e Instalaciones del Club
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Ecosistema digital unificado para la comunidad del Club Atlético Jorge Newbery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newberyModules.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-6 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-red-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">{item.desc}</p>
              </div>
              <span className="text-xs font-bold text-red-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ingresar →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action Footer Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 border-t border-slate-800/60">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Plataforma Institucional Oficial
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Accedé con tus credenciales de socio o administración (<strong>admin</strong> / <strong>admin</strong>) para verificar carnet QR, estado de cuenta y gestión deportiva.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleEnterClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-rose-500 text-white font-black text-base shadow-xl shadow-red-600/30 hover:scale-105 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>Ingresar al Centro de Gestión Deportiva →</span>
            </button>
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 border border-red-500/40 text-red-400 font-bold text-base hover:bg-red-600 hover:text-white transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Acceso Consola (admin / admin)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800/80 bg-slate-950 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <span>© 2026 Club Atlético Jorge Newbery. Todos los derechos reservados.</span>
        <div className="flex items-center gap-6">
          <Link href="/portal" className="hover:text-slate-300 transition-colors">
            Portal Socios
          </Link>
          <Link href="/dashboard/sports" className="hover:text-slate-300 transition-colors">
            Gestión Deportiva
          </Link>
          <Link href="/tv" className="hover:text-slate-300 transition-colors">
            Newbery TV
          </Link>
          <Link href="/login" className="hover:text-slate-300 transition-colors">
            Ingresar (admin / admin)
          </Link>
        </div>
      </footer>
    </div>
  );
}
