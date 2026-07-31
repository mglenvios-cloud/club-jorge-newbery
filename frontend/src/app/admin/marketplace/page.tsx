'use client';

import React, { useState } from 'react';
import { MarketplaceModule, ModuleCategory } from '@club-digital-pro/shared';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Download,
  Trash2,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Blocks,
  Users,
  DollarSign,
  Trophy,
  Send,
  Tv,
  Globe,
  UserCheck,
  Shield,
  PieChart,
  Key,
  Info,
  Sparkles,
} from 'lucide-react';
import { ModuleDetailModal } from '@/components/admin/marketplace/ModuleDetailModal';

const initialMarketplaceCatalog: MarketplaceModule[] = [
  {
    id: 'mod-001',
    code: 'SOCIOS',
    name: 'Centro de Socios & Carnet Digital',
    description: 'Administración integral de padrón de afiliados, familias, estados de morosidad, categorías y carnet digital QR.',
    category: 'CORE',
    version: '1.2.0',
    latestVersion: '1.2.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'Users',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.2.0', date: '2026-06-15', changes: ['Carnet digital interactivo con QR dinámico.'] },
    ],
    dependencies: [],
    permissions: ['member:read', 'member:write', 'member:delete'],
    license: 'Commercial Core',
    compatibility: '>= 1.0.0',
    monthlyPrice: 0,
    isInstalled: true,
    isEnabled: true,
    hasUpdate: false,
    installedAt: new Date('2026-01-10'),
  },
  {
    id: 'mod-002',
    code: 'FINANZAS',
    name: 'Finanzas, Tesorería & Cobros',
    description: 'Gestión contable, cuotas sociales, facturación electrónica y recaudación automática por tarjeta.',
    category: 'FINANCE',
    version: '2.1.0',
    latestVersion: '2.1.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'DollarSign',
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '2.1.0', date: '2026-07-01', changes: ['Integración MercadoPago y Stripe.'] },
    ],
    dependencies: ['SOCIOS'],
    permissions: ['finance:read', 'finance:write'],
    license: 'Commercial SaaS',
    compatibility: '>= 1.0.0',
    monthlyPrice: 49,
    isInstalled: true,
    isEnabled: true,
    hasUpdate: false,
    installedAt: new Date('2026-01-12'),
  },
  {
    id: 'mod-003',
    code: 'DEPORTES',
    name: 'Gestión Deportiva & Canchas',
    description: 'Reserva de turnos en tiempo real para canchas, inscripciones a disciplinas, torneos y profesores.',
    category: 'SPORTS',
    version: '1.4.0',
    latestVersion: '1.5.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'Trophy',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.5.0', date: '2026-07-20', changes: ['Reservas concurrentes y fixture automático.'] },
    ],
    dependencies: ['SOCIOS'],
    permissions: ['sports:read', 'sports:write'],
    license: 'Commercial SaaS',
    compatibility: '>= 1.0.0',
    monthlyPrice: 39,
    isInstalled: true,
    isEnabled: true,
    hasUpdate: true,
    installedAt: new Date('2026-02-01'),
  },
  {
    id: 'mod-004',
    code: 'MARKETING',
    name: 'Marketing & Comunicados Masivos',
    description: 'Plataforma para campañas por correo electrónico, notificaciones push a la app de socios y segmentación.',
    category: 'COMMUNICATION',
    version: '1.1.0',
    latestVersion: '1.1.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'Send',
    images: [
      'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.1.0', date: '2026-05-18', changes: ['Plantillas HTML para correo institucional.'] },
    ],
    dependencies: [],
    permissions: ['marketing:read', 'marketing:write'],
    license: 'Commercial SaaS',
    compatibility: '>= 1.0.0',
    monthlyPrice: 29,
    isInstalled: false,
    isEnabled: false,
    hasUpdate: false,
  },
  {
    id: 'mod-005',
    code: 'TV',
    name: 'Club TV & Transmisiones Streaming',
    description: 'Plataforma de video en vivo y bajo demanda para transmitir partidos de distintas disciplinas a los socios.',
    category: 'MEDIA',
    version: '2.0.0',
    latestVersion: '2.0.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'Tv',
    images: [
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '2.0.0', date: '2026-06-01', changes: ['Streaming HD multi-cámara.'] },
    ],
    dependencies: [],
    permissions: ['tv:read', 'tv:write'],
    license: 'Commercial SaaS',
    compatibility: '>= 1.0.0',
    monthlyPrice: 79,
    isInstalled: false,
    isEnabled: false,
    hasUpdate: false,
  },
  {
    id: 'mod-006',
    code: 'PORTAL_PUBLICO',
    name: 'Portal Institucional Público',
    description: 'Sitio web institucional autoadministrable con noticias, historia, directorio y formulario de contacto.',
    category: 'PORTAL',
    version: '1.0.0',
    latestVersion: '1.0.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'Globe',
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.0.0', date: '2026-03-01', changes: ['CMS autoadministrable.'] },
    ],
    dependencies: [],
    permissions: ['portal:read', 'portal:write'],
    license: 'Commercial Core',
    compatibility: '>= 1.0.0',
    monthlyPrice: 19,
    isInstalled: true,
    isEnabled: true,
    hasUpdate: false,
    installedAt: new Date('2026-03-01'),
  },
  {
    id: 'mod-007',
    code: 'PORTAL_SOCIO',
    name: 'Portal del Socio (Web & Mobile)',
    description: 'Consola privada para que el socio consulte su estado de cuenta, pague cuotas y reserve turnos.',
    category: 'PORTAL',
    version: '1.3.0',
    latestVersion: '1.3.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'UserCheck',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.3.0', date: '2026-06-25', changes: ['Web App PWA optimizada.'] },
    ],
    dependencies: ['SOCIOS'],
    permissions: ['member_portal:access'],
    license: 'Commercial Core',
    compatibility: '>= 1.0.0',
    monthlyPrice: 0,
    isInstalled: true,
    isEnabled: true,
    hasUpdate: false,
    installedAt: new Date('2026-01-15'),
  },
  {
    id: 'mod-008',
    code: 'LIGA_PRO',
    name: 'Liga Pro Studio & Competiciones',
    description: 'Gestión de ligas deportivas interclubes, tablas de posiciones, sanciones y estadísticas avanzadas.',
    category: 'LEAGUE',
    version: '1.0.0',
    latestVersion: '1.0.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'Shield',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.0.0', date: '2026-04-01', changes: ['Gestión de ligas interclubes.'] },
    ],
    dependencies: ['DEPORTES'],
    permissions: ['league:manage'],
    license: 'Commercial SaaS',
    compatibility: '>= 1.0.0',
    monthlyPrice: 69,
    isInstalled: false,
    isEnabled: false,
    hasUpdate: false,
  },
  {
    id: 'mod-009',
    code: 'CRM',
    name: 'CRM de Captación de Socios',
    description: 'Seguimiento de prospectos, embudos de conversión y automatización de llamadas de ventas.',
    category: 'CRM',
    version: '1.0.1',
    latestVersion: '1.0.1',
    author: 'Club Atlético Jorge Newbery',
    icon: 'PieChart',
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.0.1', date: '2026-05-01', changes: ['Formularios de prospección.'] },
    ],
    dependencies: [],
    permissions: ['crm:read', 'crm:write'],
    license: 'Commercial SaaS',
    compatibility: '>= 1.0.0',
    monthlyPrice: 35,
    isInstalled: false,
    isEnabled: false,
    hasUpdate: false,
  },
  {
    id: 'mod-010',
    code: 'RFID_ACCESO',
    name: 'Control de Molinetes & RFID Hardware',
    description: 'Sincronización directa con torniquetes y molinetes para validación de cuota al día por RFID/NFC.',
    category: 'ACCESS',
    version: '2.0.0',
    latestVersion: '2.0.0',
    author: 'Club Atlético Jorge Newbery',
    icon: 'Key',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '2.0.0', date: '2026-07-10', changes: ['Soporte molinetes Hikvision/Dahua.'] },
    ],
    dependencies: ['SOCIOS', 'FINANZAS'],
    permissions: ['access:read', 'access:manage'],
    license: 'Commercial SaaS',
    compatibility: '>= 1.0.0',
    monthlyPrice: 89,
    isInstalled: false,
    isEnabled: false,
    hasUpdate: false,
  },
];

const iconMap: Record<string, any> = {
  Users,
  DollarSign,
  Trophy,
  Send,
  Tv,
  Globe,
  UserCheck,
  Shield,
  PieChart,
  Key,
};

export default function FunctionalMarketplacePage() {
  const [modules, setModules] = useState<MarketplaceModule[]>(initialMarketplaceCatalog);
  const [tabFilter, setTabFilter] = useState<'ALL' | 'INSTALLED' | 'AVAILABLE' | 'UPDATES'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<MarketplaceModule | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredModules = modules.filter((mod) => {
    const matchesSearch =
      mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || mod.category === categoryFilter;

    let matchesTab = true;
    if (tabFilter === 'INSTALLED') matchesTab = mod.isInstalled;
    if (tabFilter === 'AVAILABLE') matchesTab = !mod.isInstalled;
    if (tabFilter === 'UPDATES') matchesTab = mod.isInstalled && mod.hasUpdate;

    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleModuleAction = (
    moduleCode: string,
    action: 'INSTALL' | 'UNINSTALL' | 'ENABLE' | 'DISABLE' | 'UPDATE'
  ) => {
    setModules(
      modules.map((m) => {
        if (m.code !== moduleCode) return m;

        if (action === 'INSTALL') {
          showNotification(`Módulo '${m.name}' instalado. Menú dinámico, permisos y configuración cargados.`);
          return { ...m, isInstalled: true, isEnabled: true, installedAt: new Date() };
        }
        if (action === 'UNINSTALL') {
          showNotification(`Módulo '${m.name}' desinstalado correctamente.`);
          return { ...m, isInstalled: false, isEnabled: false };
        }
        if (action === 'ENABLE') {
          showNotification(`Módulo '${m.name}' habilitado.`);
          return { ...m, isEnabled: true };
        }
        if (action === 'DISABLE') {
          showNotification(`Módulo '${m.name}' deshabilitado.`);
          return { ...m, isEnabled: false };
        }
        if (action === 'UPDATE') {
          showNotification(`Módulo '${m.name}' actualizado a v${m.latestVersion}.`);
          return { ...m, version: m.latestVersion || m.version, hasUpdate: false };
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Catálogo Modular Extensible</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Marketplace de Módulos & Integraciones
          </h1>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl">
            Active o instale funciones avanzadas directamente en el ecosistema del Club Atlético Jorge Newbery sin modificar el núcleo de la plataforma.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'ALL', label: 'Todos los Módulos' },
            { id: 'INSTALLED', label: 'Instalados' },
            { id: 'AVAILABLE', label: 'Disponibles' },
            { id: 'UPDATES', label: 'Actualizaciones' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
                tabFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por módulo..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todas las Categorías</option>
            <option value="CORE">Core</option>
            <option value="FINANCE">Finanzas</option>
            <option value="SPORTS">Deportes</option>
            <option value="COMMUNICATION">Comunicación</option>
            <option value="MEDIA">Media / TV</option>
            <option value="PORTAL">Portales</option>
            <option value="ACCESS">Accesos RFID</option>
            <option value="LEAGUE">Liga Pro</option>
            <option value="CRM">CRM</option>
          </select>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((mod) => {
          const IconComponent = iconMap[mod.icon] || Blocks;

          return (
            <div
              key={mod.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between transition-all hover:-translate-y-1 ${
                mod.isInstalled
                  ? 'glass-card border-slate-800'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-blue-500/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {mod.isInstalled ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {mod.isEnabled ? 'Instalado & Habilitado' : 'Deshabilitado'}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                        Disponible
                      </span>
                    )}

                    {mod.hasUpdate && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 animate-pulse">
                        Actualización v{mod.latestVersion}
                      </span>
                    )}
                  </div>
                </div>

                <div className="cursor-pointer" onClick={() => setSelectedModule(mod)}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-base hover:text-blue-400 transition-colors">
                      {mod.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">v{mod.version}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Suscripción</span>
                  <span className="font-bold text-emerald-400 text-sm font-mono">
                    {mod.monthlyPrice === 0 ? 'Incluido' : `$${mod.monthlyPrice}/mo`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedModule(mod)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Detalles
                  </button>

                  {mod.isInstalled ? (
                    <button
                      onClick={() => handleModuleAction(mod.code, mod.isEnabled ? 'DISABLE' : 'ENABLE')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        mod.isEnabled
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {mod.isEnabled ? 'Deshabilitar' : 'Habilitar'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleModuleAction(mod.code, 'INSTALL')}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Instalar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Detail Modal */}
      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onAction={handleModuleAction}
      />
    </div>
  );
}
