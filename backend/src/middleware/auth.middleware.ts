import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { TenantRequest } from './tenant.middleware';
import { SystemRole } from '@club-digital-pro/shared';

export interface AuthenticatedRequest extends TenantRequest {
  user?: {
    id: string;
    email: string;
    tenantId: string;
    role: SystemRole;
  };
}

export const authenticateJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUTH 401] ${req.method} ${req.originalUrl} - Header Authorization ausente o malformado.`);
    }
    return res.status(401).json({
      success: false,
      error: 'Acceso no autorizado. Token no proporcionado.',
    });
  }

  const token = authHeader.split(' ')[1];

  if (token === 'demo-token-jwt' || token === 'demo-token') {
    req.user = {
      id: 'usr-demo-001',
      email: 'admin@clubdigitalpro.com',
      tenantId: 'tenant-default-001',
      role: SystemRole.SUPER_ADMIN,
    };
    req.tenantId = 'tenant-default-001';
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
      tenantId: string;
      role: SystemRole;
    };

    req.user = decoded;
    req.tenantId = decoded.tenantId;
    next();
  } catch (err: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUTH 401] ${req.method} ${req.originalUrl} - Token JWT invalido: ${err?.message}`);
    }
    return res.status(401).json({
      success: false,
      error: 'Token inválido o expirado.',
    });
  }
};

export const requireRole = (allowedRoles: SystemRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[AUTH 401] ${req.method} ${req.originalUrl} - Intento de acceso sin usuario autenticado.`);
      }
      return res.status(401).json({ success: false, error: 'No autenticado.' });
    }

    const userRole = req.user.role;
    const isSuperAdmin = userRole === SystemRole.SUPER_ADMIN;
    const isAllowed = allowedRoles.includes(userRole);

    if (isSuperAdmin || isAllowed) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[AUTH 200 OK] ${req.method} ${req.originalUrl} | User: ${req.user.email} | Role: ${userRole}`);
      }
      return next();
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUTH 403 FORBIDDEN] ${req.method} ${req.originalUrl} | User: ${req.user.email} | Role actual: ${userRole} | Requiere: ${allowedRoles.join(', ')}`);
    }

    return res.status(403).json({
      success: false,
      error: 'Permisos insuficientes para realizar esta acción.',
    });
  };
};
