import { Request, Response, NextFunction } from 'express';

export interface TenantRequest extends Request {
  tenantId?: string;
  tenantSlug?: string;
}

export const tenantMiddleware = (req: TenantRequest, res: Response, next: NextFunction) => {
  // Extract tenant from headers (e.g. x-tenant-id or x-tenant-slug) or hostname
  const headerTenantId = req.headers['x-tenant-id'] as string;
  const headerTenantSlug = req.headers['x-tenant-slug'] as string;

  if (headerTenantId) {
    req.tenantId = headerTenantId;
  }

  if (headerTenantSlug) {
    req.tenantSlug = headerTenantSlug;
  }

  next();
};
