import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { authenticateJwt } from '../middleware/auth.middleware';
import {
  Member,
  PortalNotification,
  PortalPayment,
  ClubNewsItem,
  UpdateMemberProfileInput,
} from '@club-digital-pro/shared';

const router = Router();

// Mock Member Session Data for Portal del Socio
const mockMemberPortalSession: Member = {
  id: 'mem-portal-001',
  tenantId: 'tenant-default-001',
  memberNumber: 'SOC-2026-88',
  firstName: 'Santiago',
  lastName: 'Alvarez',
  dni: '39.880.140',
  email: 'santiago.alvarez@email.com',
  phone: '+54 9 11 3344-5566',
  birthDate: '1995-09-14',
  gender: 'Masculino',
  address: 'Av. Libertador 2200, 8A',
  city: 'Buenos Aires',
  category: 'ACTIVO',
  status: 'ACTIVE',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
  qrCodeToken: 'CDP-QR-SECURE-8840-2026',
  joinedAt: new Date('2023-01-10'),
  createdAt: new Date('2023-01-10'),
  updatedAt: new Date(),
};

const mockNotifications: PortalNotification[] = [
  {
    id: 'n-1',
    title: 'Cuota Social de Julio Disponible',
    message: 'Su recibo de pago de cuota social correspondiente a Julio 2026 ya está generado.',
    date: '2026-07-01',
    read: false,
    type: 'PAYMENT',
  },
  {
    id: 'n-2',
    title: 'Torneo Interclubes de Basquet',
    message: 'Este fin de semana se disputan las semifinales en el gimnasio principal.',
    date: '2026-07-15',
    read: false,
    type: 'EVENT',
  },
  {
    id: 'n-3',
    title: 'Mantenimiento en Natatorio',
    message: 'El natatorio permanecerá cerrado el próximo lunes por limpieza profunda.',
    date: '2026-07-18',
    read: true,
    type: 'INFO',
  },
];

const mockPayments: PortalPayment[] = [
  {
    id: 'pay-001',
    concept: 'Cuota Social Julio 2026',
    period: '2026-07',
    amount: 12500,
    dueDate: '2026-07-10',
    paidDate: '2026-07-05',
    status: 'PAID',
    invoiceUrl: '#',
  },
  {
    id: 'pay-002',
    concept: 'Cuota Social Agosto 2026',
    period: '2026-08',
    amount: 12500,
    dueDate: '2026-08-10',
    status: 'PENDING',
  },
  {
    id: 'pay-003',
    concept: 'Arancel Disciplina Tenis',
    period: '2026-07',
    amount: 4500,
    dueDate: '2026-07-15',
    paidDate: '2026-07-12',
    status: 'PAID',
  },
];

const mockNews: ClubNewsItem[] = [
  {
    id: 'news-1',
    title: 'Inauguración de Nuevas Canchas de Pádel',
    excerpt: 'Quedaron habilitadas las dos nuevas canchas sintéticas con iluminación LED.',
    date: '2026-07-10',
    category: 'Infraestructura',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop',
  },
  {
    id: 'news-2',
    title: 'Gran Asado de Fin de Temporada',
    excerpt: 'Reunión de socios y familias para celebrar los triunfos del semestre.',
    date: '2026-07-02',
    category: 'Social',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=300&fit=crop',
  },
];

// GET /api/portal/dashboard - Full portal state
router.get('/dashboard', authenticateJwt, (req: TenantRequest, res: Response) => {
  return res.json({
    success: true,
    data: {
      member: mockMemberPortalSession,
      notifications: mockNotifications,
      payments: mockPayments,
      news: mockNews,
      emergencyContact: {
        name: 'María Álvarez',
        relationship: 'Esposa',
        phone: '+54 9 11 8877-6655',
      },
    },
  });
});

// PUT /api/portal/profile - Update profile
router.put('/profile', authenticateJwt, (req: TenantRequest, res: Response) => {
  const input: UpdateMemberProfileInput = req.body;

  if (input.email) mockMemberPortalSession.email = input.email;
  if (input.phone) mockMemberPortalSession.phone = input.phone;
  if (input.address) mockMemberPortalSession.address = input.address;
  if (input.avatarUrl) mockMemberPortalSession.avatarUrl = input.avatarUrl;

  return res.json({
    success: true,
    message: 'Perfil actualizado correctamente.',
    data: mockMemberPortalSession,
  });
});

export default router;
