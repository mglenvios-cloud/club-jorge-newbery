import { TenantBranding } from './branding';

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  TRIAL = 'TRIAL',
}

export enum SubscriptionPlan {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  status: TenantStatus;
  plan: SubscriptionPlan;
  branding: TenantBranding;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  shortName?: string;
  sigla?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantContextState {
  tenant: Tenant | null;
  isLoading: boolean;
  error: string | null;
  setTenant: (tenant: Tenant | null) => void;
}
