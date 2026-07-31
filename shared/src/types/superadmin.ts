import { TenantStatus, SubscriptionPlan } from './tenant';
import { TenantBranding } from './branding';
import { SystemRole } from './auth';

export interface SaaSModule {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'CORE' | 'FINANCE' | 'SPORTS' | 'COMMUNICATION' | 'MARKETING' | 'INTEGRATION';
  icon: string;
  isIncludedInPlans: SubscriptionPlan[];
  monthlyPrice: number;
  isActive: boolean;
}

export interface ClubTenantOverview {
  id: string;
  name: string;
  shortName?: string;
  slug: string;
  domain?: string;
  subdomain?: string;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  shieldUrl?: string;
  logoUrl?: string;
  bannerPrincipalUrl?: string;
  bannerLoginUrl?: string;
  bannerDashboardUrl?: string;
  faviconUrl?: string;
  status: TenantStatus;
  plan: SubscriptionPlan | 'WHITE_LABEL';
  branding: TenantBranding;
  activeModules: string[]; // Module codes
  totalMembers: number;
  totalRevenue: number;
  adminEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClubWizardInput {
  // Step 1: Basic Info & Contact
  name: string;
  shortName: string;
  slug: string;
  domain: string;
  subdomain: string;
  country: string;
  province: string;
  city: string;
  address: string;
  email: string;
  whatsapp: string;
  website: string;

  // Step 2: Assets & Identity
  shieldUrl?: string;
  logoUrl?: string;
  bannerPrincipalUrl?: string;
  bannerLoginUrl?: string;
  bannerDashboardUrl?: string;
  faviconUrl?: string;

  // Step 3: Branding Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor?: string;
  textColor?: string;

  // Step 4: Plan
  plan: SubscriptionPlan | 'WHITE_LABEL';

  // Step 5: Modules
  modules: string[];

  // Step 6: Admin User
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
}

export interface ExecutiveKPIs {
  totalTenants: number;
  activeTenants: number;
  suspendedTenants: number;
  monthlyRecurringRevenue: number;
  totalActiveMembers: number;
  systemHealthScore: number;
  activeLicenses: number;
  auditEventsToday: number;
}

export interface LicenseKey {
  id: string;
  tenantId: string;
  tenantName: string;
  key: string;
  plan: SubscriptionPlan | 'WHITE_LABEL';
  issuedAt: Date;
  expiresAt: Date;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
}

export interface BillingInvoice {
  id: string;
  tenantId: string;
  tenantName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'FAILED';
  issuedDate: Date;
  dueDate: Date;
}

export interface SystemAuditEntry {
  id: string;
  tenantId?: string;
  tenantName?: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  timestamp: Date;
  ipAddress: string;
}

export type SaaSSubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'TRIAL' | 'PAST_DUE';
export type BillingPeriod = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

export interface SaaSPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: BillingPeriod;
  modules: string[];
  maxMembers: number;
  maxStorage: number;
  supportLevel: string;
  active: boolean;
  highlighted: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSubscription {
  id: string;
  tenantId: string;
  planId: string;
  status: SaaSSubscriptionStatus;
  startDate: Date;
  nextBillingDate: Date;
  trialEndsAt?: Date;
  cancelledAt?: Date;
  paymentProvider: string;
  externalSubId?: string;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantConfig {
  id: string;
  tenantId: string;
  timezone: string;
  currency: string;
  language: string;
  allowMobileApp: boolean;
  allowPublicPortal: boolean;
  maxAdmins: number;
  maxStaff: number;
  customDomain?: string;
  metaTitle?: string;
  metaDescription?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaaSMetrics {
  totalClubs: number;
  activeClubs: number;
  trialClubs: number;
  suspendedClubs: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalModuleInstallations: number;
  topModules: Array<{ code: string; name: string; installations: number }>;
  revenueByPlan: Array<{ plan: string; revenue: number; clubs: number }>;
  monthlyGrowth: number;
}
