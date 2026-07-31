import { Router, Request, Response } from 'express';
import { EmailService } from '../services/email.service';
import { OnboardingService } from '../services/onboarding.service';
import { authenticateJwt, requireRole } from '../middleware/auth.middleware';
import { SystemRole } from '@club-digital-pro/shared';

const router = Router();

// ─── IN-MEMORY LEADS STORE (Prisma in production) ───────────────────────────
const leads: Array<{
  id: string; clubName: string; contactName: string; email: string;
  phone?: string; country: string; city?: string; selectedPlan: string;
  status: string; notes?: string; convertedTenantId?: string;
  source: string; createdAt: Date; updatedAt: Date;
}> = [];

// ─── PUBLIC: Register a new club lead ────────────────────────────────────────
router.post('/register', async (req: Request, res: Response) => {
  const { clubName, contactName, email, phone, country, city, selectedPlan } = req.body;

  if (!clubName || !contactName || !email || !selectedPlan) {
    return res.status(400).json({
      success: false,
      error: 'Nombre del club, contacto, email y plan son obligatorios.',
    });
  }

  const existing = leads.find((l) => l.email === email);
  if (existing) {
    return res.status(409).json({
      success: false,
      error: 'Ya existe un registro con ese email.',
    });
  }

  const lead = {
    id: `lead-${Date.now()}`,
    clubName,
    contactName,
    email,
    phone,
    country: country || 'Argentina',
    city,
    selectedPlan: selectedPlan || 'PROFESSIONAL',
    status: 'NEW',
    source: 'LANDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  leads.push(lead);

  // Send registration received email
  await EmailService.sendRegistrationReceived(email, clubName, contactName);

  return res.status(201).json({
    success: true,
    data: { id: lead.id },
    message: '¡Solicitud recibida! Te contactaremos a la brevedad.',
  });
});

// ─── PUBLIC: Get pricing plans ────────────────────────────────────────────────
router.get('/plans', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: 'plan-001', name: 'Starter', price: 15000, billingPeriod: 'MONTHLY',
        modules: ['Socios', 'Portal del Socio'],
        maxMembers: 200, maxStorage: 5, supportLevel: 'Email',
        highlighted: false,
        description: 'Ideal para clubes pequeños que comienzan su digitalización.',
        features: ['Gestión de hasta 200 socios', 'Portal web del socio', 'Carnet Digital QR', 'Soporte por email'],
      },
      {
        id: 'plan-002', name: 'Professional', price: 35000, billingPeriod: 'MONTHLY',
        modules: ['Socios', 'Finanzas', 'Deportes', 'Portal', 'Club TV'],
        maxMembers: 1000, maxStorage: 50, supportLevel: 'Email prioritario',
        highlighted: true,
        description: 'Solución completa para clubes medianos con todas las herramientas esenciales.',
        features: ['Hasta 1.000 socios', 'Finance Pro + Cuotas', 'Gestión Deportiva', 'Club TV Streaming', 'Portal del Socio', 'Soporte prioritario'],
      },
      {
        id: 'plan-003', name: 'Enterprise', price: 75000, billingPeriod: 'MONTHLY',
        modules: ['Socios', 'Finanzas', 'Deportes', 'Portal', 'TV', 'Media Center IA', 'Marketing', 'Mobile App'],
        maxMembers: 10000, maxStorage: 500, supportLevel: 'Soporte dedicado',
        highlighted: false,
        description: 'Para grandes instituciones que requieren todos los módulos y soporte dedicado.',
        features: ['Hasta 10.000 socios', 'Todos los módulos', 'Media Center + IA', 'App Móvil nativa', 'Marketing masivo', 'Soporte dedicado 24/7'],
      },
      {
        id: 'plan-004', name: 'White Label', price: 150000, billingPeriod: 'MONTHLY',
        modules: ['Todo incluido + CRM + RFID'],
        maxMembers: -1, maxStorage: -1, supportLevel: 'White glove',
        highlighted: false,
        description: 'Plataforma completa con marca propia y dominio exclusivo.',
        features: ['Socios ilimitados', 'Storage ilimitado', 'Dominio y marca propios', 'Control de acceso RFID', 'Liga Pro Studio', 'CRM completo'],
      },
    ],
  });
});

// ─── PUBLIC: Start onboarding after plan selection ───────────────────────────
router.post('/onboard', async (req: Request, res: Response) => {
  const { clubName, slug, country, city, adminFirstName, adminLastName, adminEmail, adminPassword, selectedPlan, primaryColor } = req.body;

  if (!clubName || !adminEmail || !adminPassword || !selectedPlan) {
    return res.status(400).json({ success: false, error: 'Faltan campos obligatorios.' });
  }

  const result = await OnboardingService.run({
    clubName, slug: slug || clubName.toLowerCase().replace(/\s+/g, '-'),
    country: country || 'Argentina', city,
    adminFirstName: adminFirstName || 'Administrador',
    adminLastName: adminLastName || 'Principal',
    adminEmail, adminPassword, selectedPlan,
    primaryColor,
  });

  if (!result.success) {
    return res.status(500).json({ success: false, error: result.error });
  }

  // Update lead status to TRIAL if found
  const lead = leads.find((l) => l.email === adminEmail);
  if (lead) { lead.status = 'TRIAL'; lead.updatedAt = new Date(); lead.convertedTenantId = result.tenantId; }

  return res.status(201).json({ success: true, data: result });
});

// ─── SUPER ADMIN: Get all leads ───────────────────────────────────────────────
router.get('/leads', authenticateJwt, requireRole([SystemRole.SUPER_ADMIN]), (_req: Request, res: Response) => {
  res.json({ success: true, data: leads });
});

// ─── SUPER ADMIN: Update lead status ─────────────────────────────────────────
router.patch('/leads/:id/status', authenticateJwt, requireRole([SystemRole.SUPER_ADMIN]), (req: Request, res: Response) => {
  const lead = leads.find((l) => l.id === req.params.id);
  if (!lead) return res.status(404).json({ success: false, error: 'Lead no encontrado.' });

  const { status, notes } = req.body;
  const validStatuses = ['NEW', 'CONTACTED', 'TRIAL', 'CONVERTED', 'LOST'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Estado inválido.' });
  }

  lead.status = status;
  lead.updatedAt = new Date();
  if (notes) lead.notes = notes;

  return res.json({ success: true, data: lead });
});

// ─── SUPER ADMIN: Convert lead to active club ─────────────────────────────────
router.post('/leads/:id/convert', authenticateJwt, requireRole([SystemRole.SUPER_ADMIN]), async (req: Request, res: Response) => {
  const lead = leads.find((l) => l.id === req.params.id);
  if (!lead) return res.status(404).json({ success: false, error: 'Lead no encontrado.' });

  if (lead.status === 'CONVERTED') {
    return res.status(409).json({ success: false, error: 'Este lead ya fue convertido.' });
  }

  const { adminPassword } = req.body;

  const result = await OnboardingService.run({
    clubName: lead.clubName,
    slug: lead.clubName.toLowerCase().replace(/\s+/g, '-'),
    country: lead.country,
    city: lead.city ?? undefined,
    adminFirstName: lead.contactName.split(' ')[0] || 'Administrador',
    adminLastName: lead.contactName.split(' ').slice(1).join(' ') || 'Principal',
    adminEmail: lead.email,
    adminPassword: adminPassword || `CDP${Date.now()}!`,
    selectedPlan: lead.selectedPlan,
  });

  if (!result.success) {
    return res.status(500).json({ success: false, error: result.error });
  }

  lead.status = 'CONVERTED';
  lead.convertedTenantId = result.tenantId;
  lead.updatedAt = new Date();

  return res.json({ success: true, data: result });
});

export default router;
