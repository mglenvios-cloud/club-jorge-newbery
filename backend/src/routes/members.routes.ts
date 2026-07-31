import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/tenant.middleware';
import { authenticateJwt } from '../middleware/auth.middleware';
import { Member, MemberCategory, MemberStatus } from '@club-digital-pro/shared';

const router = Router();

// Mock Member Directory per Tenant for Phase 5 Decoupled Module
const mockMembersDb: Member[] = [
  {
    id: 'mem-001',
    tenantId: 'tenant-default-001',
    memberNumber: 'SOC-1001',
    firstName: 'Martín',
    lastName: 'González',
    dni: '38.450.120',
    email: 'martin.gonzalez@email.com',
    phone: '+54 9 11 4455-8899',
    birthDate: '1994-05-12',
    gender: 'Masculino',
    address: 'Av. Corrientes 2450, 4B',
    city: 'Buenos Aires',
    category: 'ACTIVO',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    qrCodeToken: 'QR-TOKEN-SOC-1001-SECURE',
    joinedAt: new Date('2023-03-15'),
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date(),
  },
  {
    id: 'mem-002',
    tenantId: 'tenant-default-001',
    memberNumber: 'SOC-1002',
    firstName: 'Lucía',
    lastName: 'Fernández',
    dni: '42.110.890',
    email: 'lucia.f@email.com',
    phone: '+54 9 11 9988-1122',
    birthDate: '1999-11-20',
    gender: 'Femenino',
    address: 'Calle Santa Fe 1120',
    city: 'Buenos Aires',
    category: 'ACTIVO',
    status: 'DEFAULTER',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    qrCodeToken: 'QR-TOKEN-SOC-1002-SECURE',
    joinedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date(),
  },
  {
    id: 'mem-003',
    tenantId: 'tenant-default-001',
    memberNumber: 'SOC-1003',
    firstName: 'Mateo',
    lastName: 'Gómez',
    dni: '54.200.310',
    email: 'tutor.gomez@email.com',
    phone: '+54 9 11 5566-7788',
    birthDate: '2015-08-04',
    gender: 'Masculino',
    address: 'Av. Belgrano 450',
    city: 'Buenos Aires',
    category: 'INFANTIL',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&h=200&fit=crop',
    tutorInfo: {
      name: 'Roberto Gómez',
      relationship: 'Padre',
      dni: '30.120.440',
      phone: '+54 9 11 5566-7788',
    },
    qrCodeToken: 'QR-TOKEN-SOC-1003-SECURE',
    joinedAt: new Date('2025-02-01'),
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date(),
  },
];

// GET /api/tenant/members - List members with search & category filters
router.get('/', authenticateJwt, (req: TenantRequest, res: Response) => {
  const { query, category, status } = req.query;

  let filtered = mockMembersDb;

  if (query) {
    const q = (query as string).toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        m.dni.includes(q) ||
        m.memberNumber.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'ALL') {
    filtered = filtered.filter((m) => m.category === category);
  }

  if (status && status !== 'ALL') {
    filtered = filtered.filter((m) => m.status === status);
  }

  return res.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
});

// POST /api/tenant/members - Create new member
router.post('/', authenticateJwt, (req: TenantRequest, res: Response) => {
  const body = req.body;

  if (!body.firstName || !body.lastName || !body.dni) {
    return res.status(400).json({
      success: false,
      error: 'Nombre, Apellido y DNI son campos requeridos.',
    });
  }

  const newMember: Member = {
    id: `mem-${Date.now()}`,
    tenantId: req.tenantId || 'tenant-default-001',
    memberNumber: `SOC-${Math.floor(1000 + Math.random() * 9000)}`,
    firstName: body.firstName,
    lastName: body.lastName,
    dni: body.dni,
    email: body.email || '',
    phone: body.phone || '',
    birthDate: body.birthDate || '2000-01-01',
    gender: body.gender || 'Otro',
    address: body.address || '',
    city: body.city || '',
    category: body.category || 'ACTIVO',
    status: body.status || 'ACTIVE',
    avatarUrl: body.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    tutorInfo: body.tutorInfo,
    qrCodeToken: `QR-TOKEN-${Date.now()}`,
    joinedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockMembersDb.unshift(newMember);

  return res.status(201).json({
    success: true,
    message: 'Socio registrado exitosamente.',
    data: newMember,
  });
});

// GET /api/tenant/members/:id - Get single member
router.get('/:id', authenticateJwt, (req: TenantRequest, res: Response) => {
  const member = mockMembersDb.find((m) => m.id === req.params.id);
  if (!member) {
    return res.status(404).json({ success: false, error: 'Socio no encontrado.' });
  }

  return res.json({ success: true, data: member });
});

export default router;
