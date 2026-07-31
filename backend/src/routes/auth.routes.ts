import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { SystemRole } from '@club-digital-pro/shared';

const router = Router();

// POST /api/auth/login - Stub for Phase 1 infrastructure
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Por favor ingrese email y contraseña.',
    });
  }

  // Base payload for initial setup verification
  const user = {
    id: 'usr-admin-001',
    email,
    firstName: 'Admin',
    lastName: 'Pro',
    role: SystemRole.SUPER_ADMIN,
    tenantId: 'tenant-demo-001',
    permissions: [
      'tenant:read',
      'tenant:write',
      'user:read',
      'user:write',
      'dashboard:read',
      'settings:manage',
    ],
  };

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    data: {
      user,
      token,
    },
  });
});

export default router;
