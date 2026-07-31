import { Router, Request, Response } from 'express';
import { authenticateJwt, requireRole } from '../middleware/auth.middleware';
import { SystemRole } from '@club-digital-pro/shared';
import {
  SaaSPlan,
  TenantSubscription,
  TenantConfig,
  SaaSMetrics,
} from '@club-digital-pro/shared';
import { SaasBillingService } from '../services/saasBilling.service';

const router = Router();

// ============================================================
// AUTH: Only SUPER_ADMIN can access these routes
// ============================================================
router.use(authenticateJwt);
router.use(requireRole([SystemRole.SUPER_ADMIN]));

// ============================================================
// SEED DATA — Replaced at runtime by Prisma queries in prod
// ============================================================
const saasPlans: SaaSPlan[] = [
  {
    id: 'plan-001',
    name: 'Starter',
    description: 'Ideal para clubes pequeños que comienzan su digitalización.',
    price: 15000,
    billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'PORTAL_SOCIO'],
    maxMembers: 200,
    maxStorage: 5,
    supportLevel: 'EMAIL',
    active: true,
    highlighted: false,
    sortOrder: 1,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 'plan-002',
    name: 'Professional',
    description: 'Solución completa para clubes medianos con todas las herramientas esenciales.',
    price: 35000,
    billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV'],
    maxMembers: 1000,
    maxStorage: 50,
    supportLevel: 'PRIORITY_EMAIL',
    active: true,
    highlighted: true,
    sortOrder: 2,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 'plan-003',
    name: 'Enterprise',
    description: 'Para grandes instituciones que requieren todos los módulos y soporte dedicado.',
    price: 75000,
    billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV', 'MEDIA_CENTER', 'MARKETING', 'MOBILE'],
    maxMembers: 10000,
    maxStorage: 500,
    supportLevel: 'DEDICATED',
    active: true,
    highlighted: false,
    sortOrder: 3,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 'plan-004',
    name: 'White Label',
    description: 'Plataforma completa con marca propia y dominio exclusivo para revendedores.',
    price: 150000,
    billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV', 'MEDIA_CENTER', 'MARKETING', 'MOBILE', 'LIGA_PRO', 'CRM', 'RFID_ACCESO'],
    maxMembers: -1,
    maxStorage: -1,
    supportLevel: 'WHITE_GLOVE',
    active: true,
    highlighted: false,
    sortOrder: 4,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  },
];

const tenantSubscriptions: TenantSubscription[] = [
  {
    id: 'sub-001',
    tenantId: 'club-001',
    planId: 'plan-003',
    status: 'ACTIVE',
    startDate: new Date('2026-01-15'),
    nextBillingDate: new Date('2026-08-15'),
    paymentProvider: 'MERCADOPAGO',
    externalSubId: 'mp_sub_demo_001',
    amount: 75000,
    currency: 'ARS',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date(),
  },
  {
    id: 'sub-002',
    tenantId: 'club-002',
    planId: 'plan-002',
    status: 'TRIAL',
    startDate: new Date('2026-07-01'),
    nextBillingDate: new Date('2026-08-01'),
    trialEndsAt: new Date('2026-07-31'),
    paymentProvider: 'MERCADOPAGO',
    amount: 35000,
    currency: 'ARS',
    createdAt: new Date('2026-07-01'),
    updatedAt: new Date(),
  },
];

// ============================================================
// GET /api/admin/plans — List all SaaS plans
// ============================================================
router.get('/plans', (_req: Request, res: Response) => {
  res.json({ success: true, data: saasPlans });
});

// ============================================================
// POST /api/admin/plans — Create a new SaaS plan
// ============================================================
router.post('/plans', (req: Request, res: Response) => {
  const { name, description, price, billingPeriod, modules, maxMembers, maxStorage, supportLevel } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, error: 'Nombre y precio son obligatorios.' });
  }

  const newPlan: SaaSPlan = {
    id: `plan-${Date.now()}`,
    name,
    description: description || '',
    price: Number(price),
    billingPeriod: billingPeriod || 'MONTHLY',
    modules: modules || [],
    maxMembers: maxMembers || 500,
    maxStorage: maxStorage || 10,
    supportLevel: supportLevel || 'EMAIL',
    active: true,
    highlighted: false,
    sortOrder: saasPlans.length + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  saasPlans.push(newPlan);
  return res.status(201).json({ success: true, data: newPlan });
});

// ============================================================
// PUT /api/admin/plans/:id — Update a SaaS plan
// ============================================================
router.put('/plans/:id', (req: Request, res: Response) => {
  const plan = saasPlans.find((p) => p.id === req.params.id);
  if (!plan) return res.status(404).json({ success: false, error: 'Plan no encontrado.' });

  Object.assign(plan, { ...req.body, updatedAt: new Date() });
  return res.json({ success: true, data: plan });
});

// ============================================================
// GET /api/admin/subscriptions — List all tenant subscriptions
// ============================================================
router.get('/subscriptions', (_req: Request, res: Response) => {
  res.json({ success: true, data: tenantSubscriptions });
});

// ============================================================
// POST /api/admin/subscriptions — Create subscription for a tenant
// ============================================================
router.post('/subscriptions', async (req: Request, res: Response) => {
  const { tenantId, planId, payerEmail } = req.body;

  const plan = saasPlans.find((p) => p.id === planId);
  if (!plan) return res.status(404).json({ success: false, error: 'Plan no encontrado.' });

  const result = await SaasBillingService.createSubscription({
    tenantId,
    planId,
    planName: plan.name,
    amount: plan.price,
    currency: 'ARS',
    payerEmail: payerEmail || 'admin@club.com',
  });

  if (!result.success) {
    return res.status(500).json({ success: false, error: result.message });
  }

  const newSub: TenantSubscription = {
    id: `sub-${Date.now()}`,
    tenantId,
    planId,
    status: 'TRIAL',
    startDate: new Date(),
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    paymentProvider: 'MERCADOPAGO',
    externalSubId: result.externalSubId,
    amount: plan.price,
    currency: 'ARS',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tenantSubscriptions.push(newSub);
  return res.status(201).json({ success: true, data: { subscription: newSub, initPoint: result.initPoint } });
});

// ============================================================
// PATCH /api/admin/subscriptions/:id/status — Change subscription status
// ============================================================
router.patch('/subscriptions/:id/status', (req: Request, res: Response) => {
  const sub = tenantSubscriptions.find((s) => s.id === req.params.id);
  if (!sub) return res.status(404).json({ success: false, error: 'Suscripción no encontrada.' });

  const { status } = req.body;
  const validStatuses = ['ACTIVE', 'PAUSED', 'CANCELLED', 'TRIAL', 'PAST_DUE'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Estado inválido.' });
  }

  sub.status = status;
  sub.updatedAt = new Date();
  if (status === 'CANCELLED') sub.cancelledAt = new Date();

  return res.json({ success: true, data: sub });
});

// ============================================================
// POST /api/admin/subscriptions/webhook — Mercado Pago webhook
// ============================================================
router.post('/subscriptions/webhook', async (req: Request, res: Response) => {
  try {
    const result = await SaasBillingService.processWebhook(req.body);
    const sub = tenantSubscriptions.find((s) => s.externalSubId === result.externalSubId);
    if (sub) {
      sub.status = result.status;
      sub.updatedAt = new Date();
    }
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ success: false, error: 'Error procesando webhook.' });
  }
});

// ============================================================
// GET /api/admin/clubs — List all clubs/tenants (Super Admin view)
// ============================================================
router.get('/clubs', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: 'club-001',
        name: 'Club Atlético San Martín',
        slug: 'sanmartin',
        domain: 'sanmartin.clubdigitalpro.com',
        status: 'ACTIVE',
        plan: 'Enterprise',
        activeModules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'MARKETING'],
        totalMembers: 3200,
        monthlyRevenue: 75000,
        adminEmail: 'admin@sanmartin.org',
        createdAt: new Date('2025-01-15'),
      },
      {
        id: 'club-002',
        name: 'Club Deportivo Rivadavia',
        slug: 'rivadavia',
        domain: 'rivadavia.clubdigitalpro.com',
        status: 'TRIAL',
        plan: 'Professional',
        activeModules: ['SOCIOS', 'FINANZAS'],
        totalMembers: 820,
        monthlyRevenue: 35000,
        adminEmail: 'admin@rivadavia.org.ar',
        createdAt: new Date('2026-07-01'),
      },
    ],
  });
});

// ============================================================
// PATCH /api/admin/clubs/:id/status — Suspend / Activate a club
// ============================================================
router.patch('/clubs/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const validStatuses = ['ACTIVE', 'TRIAL', 'SUSPENDED', 'INACTIVE'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Estado de club inválido.' });
  }
  // In production: prisma.tenant.update(...)
  return res.json({ success: true, message: `Club ${req.params.id} actualizado a estado ${status}.` });
});

// ============================================================
// GET /api/admin/modules — Catalog of available marketplace modules
// ============================================================
router.get('/modules', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 'mod-001', code: 'SOCIOS', name: 'Centro de Socios', icon: 'Users', price: 0, active: true },
      { id: 'mod-002', code: 'FINANZAS', name: 'Finance Pro', icon: 'DollarSign', price: 49, active: true },
      { id: 'mod-003', code: 'DEPORTES', name: 'Gestión Deportiva', icon: 'Trophy', price: 39, active: true },
      { id: 'mod-004', code: 'MARKETING', name: 'Marketing & Email', icon: 'Send', price: 29, active: true },
      { id: 'mod-005', code: 'TV', name: 'Club TV', icon: 'Tv', price: 79, active: true },
      { id: 'mod-006', code: 'MEDIA_CENTER', name: 'Media Center IA', icon: 'Film', price: 59, active: true },
      { id: 'mod-007', code: 'MOBILE', name: 'App Mobile', icon: 'Smartphone', price: 89, active: true },
      { id: 'mod-008', code: 'LIGA_PRO', name: 'Liga Pro Studio', icon: 'Shield', price: 69, active: true },
      { id: 'mod-009', code: 'CRM', name: 'CRM Captación', icon: 'PieChart', price: 35, active: true },
      { id: 'mod-010', code: 'RFID_ACCESO', name: 'Control RFID', icon: 'Key', price: 89, active: true },
    ],
  });
});

// ============================================================
// GET /api/admin/analytics — SaaS Metrics Dashboard
// ============================================================
router.get('/analytics', (_req: Request, res: Response) => {
  const metrics: SaaSMetrics = {
    totalClubs: 2,
    activeClubs: 1,
    trialClubs: 1,
    suspendedClubs: 0,
    monthlyRecurringRevenue: 110000,
    annualRecurringRevenue: 1320000,
    totalSubscriptions: 2,
    activeSubscriptions: 1,
    totalModuleInstallations: 9,
    topModules: [
      { code: 'SOCIOS', name: 'Centro de Socios', installations: 2 },
      { code: 'FINANZAS', name: 'Finance Pro', installations: 2 },
      { code: 'DEPORTES', name: 'Gestión Deportiva', installations: 1 },
    ],
    revenueByPlan: [
      { plan: 'Enterprise', revenue: 75000, clubs: 1 },
      { plan: 'Professional', revenue: 35000, clubs: 1 },
    ],
    monthlyGrowth: 12.5,
  };

  res.json({ success: true, data: metrics });
});

export default router;
