import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { DEFAULT_BRANDING, TenantStatus, SubscriptionPlan } from '@club-digital-pro/shared';

const router = Router();

// GET /api/tenants/current - Get active tenant information & dynamic branding
router.get('/current', (req: TenantRequest, res: Response) => {
  const slug = req.tenantSlug || 'demo';

  // Base mock multi-tenant metadata resolution for Phase 1
  return res.json({
    success: true,
    data: {
      id: req.tenantId || 'tenant-demo-001',
      name: 'Club Demo Digital Pro',
      slug,
      status: TenantStatus.ACTIVE,
      plan: SubscriptionPlan.PROFESSIONAL,
      branding: DEFAULT_BRANDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
});

export default router;
