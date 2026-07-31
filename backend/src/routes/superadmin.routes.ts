import { Router, Request, Response } from 'express';
import { authenticateJwt, requireRole } from '../middleware/auth.middleware';
import { SystemRole, TenantStatus, SubscriptionPlan, CreateClubWizardInput, MarketplaceModule } from '@club-digital-pro/shared';

const router = Router();

// Apply Auth & SuperAdmin Role Check Middleware
router.use(authenticateJwt);
router.use(requireRole([SystemRole.SUPER_ADMIN]));

// Mock Marketplace Modules Catalog (All 10 requested core modules prepared)
const marketplaceModulesList: MarketplaceModule[] = [
  {
    id: 'mod-001',
    code: 'SOCIOS',
    name: 'Centro de Socios & Carnet Digital',
    description: 'Administración integral de padrón de afiliados, familias, estados de morosidad, categorías y carnet digital QR.',
    category: 'CORE',
    version: '1.2.0',
    latestVersion: '1.2.0',
    author: 'Club Digital Pro Core',
    icon: 'Users',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.2.0', date: '2026-06-15', changes: ['Agregado soporte para carnets digitales con QR dinámico anti-fraude.'] },
      { version: '1.0.0', date: '2026-01-10', changes: ['Lanzamiento inicial de gestión de padrón de socios.'] },
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
    name: 'Tesorería, Cuotas & Cobros Online',
    description: 'Gestión contable, débito automático, facturación electrónica y liquidaciones masivas de cuotas sociales.',
    category: 'FINANCE',
    version: '2.1.0',
    latestVersion: '2.1.0',
    author: 'Club Digital Pro Finance',
    icon: 'DollarSign',
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '2.1.0', date: '2026-07-01', changes: ['Conexión nativa con pasarela MercadoPago y Stripe.'] },
    ],
    dependencies: ['SOCIOS'],
    permissions: ['finance:read', 'finance:write', 'invoice:manage'],
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
    author: 'Club Digital Pro Sports',
    icon: 'Trophy',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.5.0', date: '2026-07-20', changes: ['Nuevo motor de reservas concurrentes y fixture automático.'] },
      { version: '1.4.0', date: '2026-04-10', changes: ['Soporte para múltiples sedes deportivas.'] },
    ],
    dependencies: ['SOCIOS'],
    permissions: ['sports:read', 'sports:write', 'booking:manage'],
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
    author: 'Club Digital Pro Media',
    icon: 'Send',
    images: [
      'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.1.0', date: '2026-05-18', changes: ['Inclusión de plantillas HTML institucionales.'] },
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
    author: 'Club Digital Pro Media',
    icon: 'Tv',
    images: [
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '2.0.0', date: '2026-06-01', changes: ['Soporte para transmisión multi-cámara HD.'] },
    ],
    dependencies: [],
    permissions: ['tv:read', 'tv:write', 'stream:manage'],
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
    author: 'Club Digital Pro Core',
    icon: 'Globe',
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.0.0', date: '2026-03-01', changes: ['Lanzamiento del CMS público para el club.'] },
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
    author: 'Club Digital Pro Core',
    icon: 'UserCheck',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.3.0', date: '2026-06-25', changes: ['Optimización PWA móvil.'] },
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
    author: 'Club Digital Pro League',
    icon: 'Shield',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.0.0', date: '2026-04-01', changes: ['Motor inicial de torneos interclubes.'] },
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
    author: 'Club Digital Pro Sales',
    icon: 'PieChart',
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '1.0.1', date: '2026-05-01', changes: ['Integración con formularios de prospección.'] },
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
    author: 'Club Digital Pro Hardware',
    icon: 'Key',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=400&fit=crop',
    ],
    changelog: [
      { version: '2.0.0', date: '2026-07-10', changes: ['Protocolo UDP ultra rápido para molinetes Hikvision y Dahua.'] },
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

// GET /api/superadmin/kpis - Dashboard Ejecutivo KPIs
router.get('/kpis', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      totalTenants: 24,
      activeTenants: 21,
      suspendedTenants: 3,
      monthlyRecurringRevenue: 18450,
      totalActiveMembers: 14200,
      systemHealthScore: 99.8,
      activeLicenses: 28,
      auditEventsToday: 142,
    },
  });
});

// GET /api/superadmin/clubs - List all clubs/tenants
router.get('/clubs', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: 'club-001',
        name: 'Club Atlético San Martín',
        shortName: 'San Martín',
        slug: 'sanmartin',
        domain: 'sanmartin.clubdigitalpro.com',
        status: TenantStatus.ACTIVE,
        plan: SubscriptionPlan.ENTERPRISE,
        branding: {
          primaryColor: '#dc2626',
          secondaryColor: '#0f172a',
          accentColor: '#f87171',
        },
        activeModules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'MARKETING'],
        totalMembers: 3200,
        totalRevenue: 4500,
        adminEmail: 'admin@sanmartin.org',
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date(),
      },
    ],
  });
});

// GET /api/superadmin/marketplace/modules - Get full marketplace modules catalog
router.get('/marketplace/modules', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: marketplaceModulesList,
  });
});

// POST /api/superadmin/marketplace/action - Module action (install, uninstall, toggle, update)
router.post('/marketplace/action', (req: Request, res: Response) => {
  const { moduleCode, action } = req.body;

  const targetMod = marketplaceModulesList.find((m) => m.code === moduleCode);
  if (!targetMod) {
    return res.status(404).json({ success: false, error: 'Módulo no encontrado.' });
  }

  if (action === 'INSTALL') {
    targetMod.isInstalled = true;
    targetMod.isEnabled = true;
    targetMod.installedAt = new Date();
  } else if (action === 'UNINSTALL') {
    targetMod.isInstalled = false;
    targetMod.isEnabled = false;
  } else if (action === 'ENABLE') {
    targetMod.isEnabled = true;
  } else if (action === 'DISABLE') {
    targetMod.isEnabled = false;
  } else if (action === 'UPDATE') {
    targetMod.version = targetMod.latestVersion || targetMod.version;
    targetMod.hasUpdate = false;
  }

  return res.json({
    success: true,
    message: `Acción '${action}' ejecutada correctamente sobre el módulo ${targetMod.name}.`,
    data: targetMod,
  });
});

export default router;
