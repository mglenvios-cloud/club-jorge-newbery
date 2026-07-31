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
    return res.status(401).json({
      success: false,
      error: 'Acceso no autorizado. Token no proporcionado.',
    });
  }

  const token = authHeader.split(' ')[1];

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
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido o expirado.',
    });
  }
};

export const requireRole = (allowedRoles: SystemRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'No autenticado.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Permisos insuficientes para realizar esta acción.',
      });
    }

    next();
  };
};
