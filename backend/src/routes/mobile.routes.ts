import { Router, Response } from 'express';
import { TenantRequest, tenantMiddleware } from '../middleware/tenant.middleware';
import { authenticateJwt } from '../middleware/auth.middleware';
import {
  MobileHomeData,
  DigitalCard,
  MobileNotification,
  Payment,
  MediaContent,
  TvStream
} from '@club-digital-pro/shared';

const router = Router();

// Middleware that applies both tenant extraction and auth for mobile API
router.use(tenantMiddleware);
router.use(authenticateJwt);

router.get('/home', async (req: TenantRequest, res: Response) => {
  const tenantId = req.tenantId;
  const userId = (req as any).user?.userId;

  // Mocked data for mobile home
  const homeData: MobileHomeData = {
    clubInfo: {
      name: 'Club Digital Pro Demo',
      shieldUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop'
    },
    memberStatus: 'ACTIVE',
    nextMatch: {
      opponent: 'Deportivo Central',
      date: '2026-07-25',
      time: '16:00',
      location: 'Estadio Principal'
    },
    recentNews: [
      { id: '1', title: 'Nueva App Oficial', date: '2026-07-21' },
      { id: '2', title: 'Inscripciones abiertas', date: '2026-07-20' }
    ],
    latestVideos: [
      { id: 'v1', title: 'Resumen de la Fecha', thumbnailUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=100&fit=crop' }
    ]
  };

  res.json({ success: true, data: homeData });
});

router.get('/profile', async (req: TenantRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      firstName: 'Usuario',
      lastName: 'Mobile',
      email: 'mobile@club.com',
      role: 'SOCIO'
    }
  });
});

router.get('/card', async (req: TenantRequest, res: Response) => {
  const digitalCard: DigitalCard = {
    memberId: 'mem-123',
    tenantId: req.tenantId || 'demo',
    firstName: 'Usuario',
    lastName: 'Mobile',
    memberNumber: 'SOC-2026',
    category: 'ACTIVO',
    status: 'ACTIVE',
    qrCodeToken: 'mock-qr-token-999',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
  };

  res.json({ success: true, data: digitalCard });
});

router.get('/payments', async (req: TenantRequest, res: Response) => {
  const payments: Payment[] = [
    {
      id: 'pay-m-1',
      tenantId: req.tenantId || 'demo',
      memberId: 'mem-123',
      amount: 12500,
      currency: 'ARS',
      method: 'MERCADOPAGO',
      status: 'PAID',
      createdAt: new Date(),
      paidAt: new Date()
    }
  ];

  res.json({ success: true, data: payments });
});

router.get('/news', async (req: TenantRequest, res: Response) => {
  res.json({ success: true, data: [] });
});

router.get('/tv', async (req: TenantRequest, res: Response) => {
  res.json({ success: true, data: [] });
});

router.get('/calendar', async (req: TenantRequest, res: Response) => {
  res.json({ success: true, data: [] });
});

export default router;
