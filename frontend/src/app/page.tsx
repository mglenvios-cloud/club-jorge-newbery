'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeroOverlay from '@/components/landing/HeroOverlay';
import CinematicTransition from '@/components/landing/CinematicTransition';
import Customizer3DPanel, {
  MainObject3DType,
} from '@/components/3d/Customizer3DPanel';
import { defaultJorgeNewberyBranding } from '@/config/tenantBranding';
import { PRESET_CLUBS, TeamConfig } from '@/config/teamPresets';

// Dynamically import StadiumScene3D with ssr: false for Babylon.js WebGL compatibility
const StadiumScene3D = dynamic(() => import('@/components/3d/StadiumScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-red-500 text-sm font-semibold animate-pulse">
      Cargando Render 3D Interactivo...
    </div>
  ),
});

const getPlatformModules = (team: TeamConfig) => {
  return [
    {
      icon: '⚽',
      title: 'Gestión Deportiva',
      desc: 'Control unificado de disciplinas, categorías, planteles, entrenadores y cuerpo técnico.',
      href: '/dashboard/sports',
    },
    {
      icon: '📺',
      title: 'Club TV',
      desc: 'Centro multimedia oficial con videos HD, pre-roll/post-roll de sponsors y resúmenes IA.',
      href: '/tv',
    },
    {
      icon: '🏆',
      title: 'Futsal Profesional',
      desc: 'Sistema especializado en torneos de Futsal AFA, crónicas de partidos y eventos en vivo.',
      href: '/dashboard/sports/tournaments',
    },
    {
      icon: '👥',
      title: 'Portal Socio',
      desc: 'Autogestión de socios, cobro online de cuotas sociales, reservas y control parental.',
      href: '/portal',
    },
    {
      icon: '📊',
      title: 'Estadísticas',
      desc: 'Panel administrativo comercial, control de morosidad, ingresos por sponsoreo y reportes.',
      href: '/dashboard/sports/stats',
    },
    {
      icon: '🤖',
      title: 'Inteligencia Artificial',
      desc: 'Crónicas redactadas al instante, chat de soporte y automatización de cronogramas.',
      href: '/dashboard/media-center',
    },
    {
      icon: '📸',
      title: 'Multimedia',
      desc: 'Galerías interactivas con filtros avanzados por jugador, temporada, rival y competencia.',
      href: '/dashboard/media-center/photos',
    },
    {
      icon: '💰',
      title: 'Sponsors',
      desc: 'Módulo comercial publicitario con rotación inteligente de banners y reportes de efectividad.',
      href: '/dashboard/media-center',
    },
    {
      icon: '📅',
      title: 'Calendario Deportivo',
      desc: 'Agenda integrada de partidos, entrenamientos de todas las categorías y eventos sociales.',
      href: '/dashboard/sports',
    },
  ];
};

const getInstitutionalBadges = (team: TeamConfig) => {
  return [
    { value: 'Sede Central', label: 'Gestión de Sede' },
    { value: 'Primera AFA', label: 'Deporte Profesional' },
    { value: 'QR Dinámico', label: 'Carnet Digital' },
    { value: '100% HD', label: 'Club TV Streaming' },
  ];
};

export default function LandingPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Multi-Team & 3D Customizer State (Open by default)
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(true);
  const [activeTeamId, setActiveTeamId] = useState<'team1' | 'team2'>('team1');

  const [team1Config, setTeam1Config] = useState<TeamConfig>(PRESET_CLUBS[0]); // Pinocho
  const [team2Config, setTeam2Config] = useState<TeamConfig>(PRESET_CLUBS[1]); // Newbery

  const [selectedObject, setSelectedObject] = useState<MainObject3DType>('ball');

  const activeTeam = activeTeamId === 'team1' ? team1Config : team2Config;

  const updateActiveTeam = (updated: Partial<TeamConfig>) => {
    if (activeTeamId === 'team1') {
      setTeam1Config((prev) => ({ ...prev, ...updated }));
    } else {
      setTeam2Config((prev) => ({ ...prev, ...updated }));
    }
  };

  const handleSelectPresetClub = (preset: TeamConfig) => {
    updateActiveTeam({
      name: preset.name,
      shortName: preset.shortName,
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor,
      fontSize: preset.fontSize,
      shieldUrl: preset.shieldUrl,
      shieldShape: preset.shieldShape,
    });
  };

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
          teamName={activeTeam.name}
          fontSize={activeTeam.fontSize}
          selectedObject={selectedObject}
          shieldShape={activeTeam.shieldShape}
          customImageUrl={activeTeam.shieldUrl}
          primaryColor={activeTeam.primaryColor}
          secondaryColor={activeTeam.secondaryColor}
          accentColor={activeTeam.accentColor}
          onBallClick={handleEnterClick}
          isTransitioning={isTransitioning}
        />

        <HeroOverlay
          branding={{
            ...defaultJorgeNewberyBranding,
            name: activeTeam.name,
            shortName: activeTeam.shortName,
          }}
          onEnterClick={handleEnterClick}
          isTransitioning={isTransitioning}
          onToggleCustomizer={() => setIsCustomizerOpen(!isCustomizerOpen)}
          isCustomizerOpen={isCustomizerOpen}
        />

        {/* Floating 3D Customizer Studio Panel */}
        <Customizer3DPanel
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          activeTeamId={activeTeamId}
          onSelectActiveTeam={setActiveTeamId}
          team1Config={team1Config}
          team2Config={team2Config}
          onUpdateTeamConfig={(tId, updated) => {
            if (tId === 'team1') setTeam1Config((prev) => ({ ...prev, ...updated }));
            else setTeam2Config((prev) => ({ ...prev, ...updated }));
          }}
          onSelectPresetClub={handleSelectPresetClub}
          teamName={activeTeam.name}
          onTeamNameChange={(name) => updateActiveTeam({ name, shortName: name })}
          fontSize={activeTeam.fontSize}
          onFontSizeChange={(fontSize) => updateActiveTeam({ fontSize })}
          selectedObject={selectedObject}
          onSelectObject={setSelectedObject}
          shieldShape={activeTeam.shieldShape}
          onSelectShieldShape={(shieldShape) => updateActiveTeam({ shieldShape })}
          imageUrl={activeTeam.shieldUrl}
          onImageUrlChange={(shieldUrl) => updateActiveTeam({ shieldUrl })}
          primaryColor={activeTeam.primaryColor}
          onPrimaryColorChange={(primaryColor) => updateActiveTeam({ primaryColor })}
          secondaryColor={activeTeam.secondaryColor}
          onSecondaryColorChange={(secondaryColor) => updateActiveTeam({ secondaryColor })}
          accentColor={activeTeam.accentColor}
          onAccentColorChange={(accentColor) => updateActiveTeam({ accentColor })}
        />
      </section>

      {/* Cinematic Transition Component */}
      <CinematicTransition isActive={isTransitioning} branding={defaultJorgeNewberyBranding} />

      {/* Institutional Badges Bar */}
      <section className="py-12 px-6 border-y border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {getInstitutionalBadges(activeTeam).map((badge) => (
            <div key={badge.label} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <div className="text-2xl md:text-3xl font-black text-red-500 mb-1 tracking-tight">
                {badge.value}
              </div>
              <div className="text-xs text-slate-400 font-semibold">{badge.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Modules Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Módulos de la Plataforma
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto font-medium">
            Toda la tecnología necesaria para el éxito institucional de tu club.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getPlatformModules(activeTeam).map((item) => (
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
                Saber más →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Caso de Éxito de Referencia */}
      <section className="py-16 px-6 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              Caso de Éxito de Referencia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Implementado en {activeTeam.name}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              La plataforma digital de {activeTeam.name} sirve como modelo operativo real, demostrando la integración comercial para el Futsal AFA, la automatización del portal socio y la gestión deportiva integral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span className="text-red-400 font-bold">✓</span> Plataforma Digital de Marca Propia
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span className="text-red-400 font-bold">✓</span> Futsal AFA Oficial Integrado
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span className="text-red-400 font-bold">✓</span> Gestión Deportiva Multi-disciplina
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span className="text-red-400 font-bold">✓</span> Multimedia Premium con CLUB TV
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span className="text-red-400 font-bold">✓</span> Portal de Socios y Cobros Sociales Automáticos
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pt-4">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-3xl font-black text-red-500 mb-1">5000+</div>
              <div className="text-xs text-slate-400 font-semibold">Socios Activos</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-3xl font-black text-red-500 mb-1">12+</div>
              <div className="text-xs text-slate-400 font-semibold">Categorías</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-3xl font-black text-red-500 mb-1">100%</div>
              <div className="text-xs text-slate-400 font-semibold">Cobro Automatizado</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-3xl font-black text-red-500 mb-1">IA</div>
              <div className="text-xs text-slate-400 font-semibold">Crónica Automática</div>
            </div>
          </div>
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
        <span>© 2026 {activeTeam.name}. Todos los derechos reservados.</span>
        <div className="flex items-center gap-6">
          <Link href="/portal" className="hover:text-slate-300 transition-colors">
            Portal Socios
          </Link>
          <Link href="/dashboard/sports" className="hover:text-slate-300 transition-colors">
            Gestión Deportiva
          </Link>
          <Link href="/tv" className="hover:text-slate-300 transition-colors">
            Club TV
          </Link>
          <Link href="/login" className="hover:text-slate-300 transition-colors">
            Ingresar (admin / admin)
          </Link>
        </div>
      </footer>
    </div>
  );
}
