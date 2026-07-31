/**
 * Onboarding Service — Club Digital Pro
 * Orchestrates new club creation: Tenant, Admin User, Modules, Trial Subscription.
 */
import * as crypto from 'crypto';
import { EmailService } from './email.service';

// Default modules assigned per plan
const PLAN_MODULES: Record<string, string[]> = {
  STARTER: ['SOCIOS', 'PORTAL_SOCIO'],
  PROFESSIONAL: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV'],
  ENTERPRISE: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV', 'MEDIA_CENTER', 'MARKETING', 'MOBILE'],
  WHITE_LABEL: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV', 'MEDIA_CENTER', 'MARKETING', 'MOBILE', 'LIGA_PRO', 'CRM', 'RFID_ACCESO'],
};

const TRIAL_DAYS = 14;

export interface OnboardingInput {
  clubName: string;
  slug: string;
  country: string;
  city?: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  selectedPlan: string;
  primaryColor?: string;
}

export interface OnboardingResult {
  success: boolean;
  tenantId?: string;
  adminUserId?: string;
  trialEndsAt?: Date;
  message: string;
  error?: string;
}

export class OnboardingService {
  /**
   * Full onboarding flow: Tenant → Admin User → Modules → Trial
   * In production, each step uses Prisma. Architecture stubs provided.
   */
  static async createTenant(input: OnboardingInput): Promise<{ id: string; slug: string }> {
    // Production:
    // return await prisma.tenant.create({
    //   data: {
    //     name: input.clubName,
    //     slug: input.slug,
    //     country: input.country,
    //     city: input.city,
    //     status: 'ACTIVE',
    //     plan: input.selectedPlan as any,
    //     primaryColor: input.primaryColor || '#6366f1',
    //   }
    // });
    return { id: `tenant-${Date.now()}`, slug: input.slug };
  }

  static async createAdminUser(tenantId: string, input: OnboardingInput): Promise<{ id: string }> {
    const passwordHash = crypto.createHash('sha256').update(input.adminPassword).digest('hex');
    // Production:
    // return await prisma.user.create({
    //   data: {
    //     tenantId,
    //     email: input.adminEmail,
    //     passwordHash,
    //     firstName: input.adminFirstName,
    //     lastName: input.adminLastName,
    //     role: 'TENANT_ADMIN',
    //     isActive: true,
    //   }
    // });
    return { id: `user-${Date.now()}` };
  }

  static async assignDefaultModules(tenantId: string, plan: string): Promise<string[]> {
    const modules = PLAN_MODULES[plan.toUpperCase()] || PLAN_MODULES.STARTER;
    // Production:
    // await prisma.tenantModule.createMany({
    //   data: modules.map(code => ({ tenantId, moduleCode: code, isInstalled: true, isEnabled: true }))
    // });
    return modules;
  }

  static async createTrialSubscription(tenantId: string, planId: string, amount: number): Promise<{ trialEndsAt: Date }> {
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS);

    // Production:
    // await prisma.tenantSubscription.create({
    //   data: {
    //     tenantId,
    //     planId,
    //     status: 'TRIAL',
    //     startDate: new Date(),
    //     nextBillingDate: trialEndsAt,
    //     trialEndsAt,
    //     amount,
    //     currency: 'ARS',
    //     paymentProvider: 'MERCADOPAGO',
    //   }
    // });
    return { trialEndsAt };
  }

  static async createTenantConfig(tenantId: string): Promise<void> {
    // Production:
    // await prisma.tenantConfig.create({
    //   data: { tenantId, timezone: 'America/Argentina/Buenos_Aires', currency: 'ARS', language: 'es' }
    // });
  }

  /**
   * Main orchestrator — runs the complete onboarding sequence
   */
  static async run(input: OnboardingInput): Promise<OnboardingResult> {
    try {
      // Step 1: Create Tenant
      const tenant = await this.createTenant(input);

      // Step 2: Create Admin User
      const adminUser = await this.createAdminUser(tenant.id, input);

      // Step 3: Assign modules based on plan
      await this.assignDefaultModules(tenant.id, input.selectedPlan);

      // Step 4: Create trial subscription
      const { trialEndsAt } = await this.createTrialSubscription(tenant.id, `plan-${input.selectedPlan.toLowerCase()}`, 0);

      // Step 5: Default config
      await this.createTenantConfig(tenant.id);

      // Step 6: Send welcome email
      const loginUrl = `https://${input.slug}.clubdigitalpro.com/login`;
      await EmailService.sendWelcome(input.adminEmail, input.clubName, input.adminFirstName, loginUrl, input.adminPassword);
      await EmailService.sendTrialStarted(input.adminEmail, input.clubName, TRIAL_DAYS, trialEndsAt);

      return {
        success: true,
        tenantId: tenant.id,
        adminUserId: adminUser.id,
        trialEndsAt,
        message: `Club "${input.clubName}" creado exitosamente. Trial de ${TRIAL_DAYS} días activado.`,
      };
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Error inesperado durante el onboarding.';
      return { success: false, message: 'Error durante el onboarding.', error };
    }
  }
}
