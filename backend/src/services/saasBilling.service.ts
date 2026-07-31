/**
 * SaaS Billing Service — Club Digital Pro
 * Handles SaaS subscriptions, Mercado Pago integration, and webhook processing.
 */

import { SaaSSubscriptionStatus } from '@club-digital-pro/shared';

// In production, load from process.env.SAAS_MP_ACCESS_TOKEN
const SAAS_MP_ACCESS_TOKEN = process.env.SAAS_MP_ACCESS_TOKEN || '';

export interface CreateSubscriptionInput {
  tenantId: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  payerEmail: string;
}

export interface SubscriptionResult {
  success: boolean;
  externalSubId?: string;
  initPoint?: string;
  message: string;
}

export class SaasBillingService {
  /**
   * Creates a new subscription preference in Mercado Pago.
   * Returns the init_point URL for payment redirect.
   */
  static async createSubscription(input: CreateSubscriptionInput): Promise<SubscriptionResult> {
    try {
      // Production integration point:
      // const response = await fetch('https://api.mercadopago.com/preapproval', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${SAAS_MP_ACCESS_TOKEN}`,
      //   },
      //   body: JSON.stringify({
      //     reason: `Club Digital Pro — Plan ${input.planName}`,
      //     auto_recurring: {
      //       frequency: 1,
      //       frequency_type: 'months',
      //       transaction_amount: input.amount,
      //       currency_id: input.currency,
      //     },
      //     payer_email: input.payerEmail,
      //     back_url: `${process.env.FRONTEND_URL}/super-admin/subscriptions`,
      //     status: 'pending',
      //   }),
      // });
      // const data = await response.json();
      // return { success: true, externalSubId: data.id, initPoint: data.init_point, message: 'Suscripción creada.' };

      // Stub for build-time validity:
      return {
        success: true,
        externalSubId: `mp_sub_${Date.now()}`,
        initPoint: `https://www.mercadopago.com.ar/subscriptions/stub`,
        message: `Suscripción creada para ${input.planName}.`,
      };
    } catch (error) {
      return { success: false, message: 'Error al crear suscripción en MercadoPago.' };
    }
  }

  /**
   * Processes incoming Mercado Pago subscription webhooks.
   */
  static async processWebhook(payload: Record<string, unknown>): Promise<{
    tenantId?: string;
    status: SaaSSubscriptionStatus;
    externalSubId: string;
  }> {
    const type = payload.type as string;
    const data = payload.data as Record<string, unknown>;

    // Map MP status to internal SaaSSubscriptionStatus
    let internalStatus: SaaSSubscriptionStatus = 'ACTIVE';
    if (type === 'preapproval') {
      const mpStatus = (data?.status as string) || 'authorized';
      if (mpStatus === 'authorized') internalStatus = 'ACTIVE';
      else if (mpStatus === 'paused') internalStatus = 'PAUSED';
      else if (mpStatus === 'cancelled') internalStatus = 'CANCELLED';
      else if (mpStatus === 'pending') internalStatus = 'TRIAL';
      else if (mpStatus === 'charge_back') internalStatus = 'PAST_DUE';
    }

    return {
      externalSubId: data?.id as string ?? '',
      status: internalStatus,
    };
  }

  /**
   * Checks subscription status against Mercado Pago API.
   */
  static async checkSubscriptionStatus(externalSubId: string): Promise<SaaSSubscriptionStatus> {
    try {
      // Production:
      // const response = await fetch(`https://api.mercadopago.com/preapproval/${externalSubId}`, {
      //   headers: { Authorization: `Bearer ${SAAS_MP_ACCESS_TOKEN}` },
      // });
      // const data = await response.json();
      // return data.status === 'authorized' ? 'ACTIVE' : 'CANCELLED';

      // Stub:
      return 'ACTIVE';
    } catch {
      return 'PAST_DUE';
    }
  }
}
