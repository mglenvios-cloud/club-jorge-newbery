import { MobileUser, DigitalCard, MobileHomeData, Payment } from '@club-digital-pro/shared';

// Base URL would be configured via env
const BASE_URL = 'http://localhost:4000/api';

export class MobileApiService {
  private static tenantId: string = 'demo';
  private static token: string | null = null;

  static setTenant(tenantId: string) {
    this.tenantId = tenantId;
  }

  static setToken(token: string) {
    this.token = token;
  }

  private static async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'X-Tenant-Id': this.tenantId,
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'API Error');
    }

    return data.data;
  }

  static async getHomeData(): Promise<MobileHomeData> {
    return this.fetchWithAuth('/mobile/home');
  }

  static async getProfile(): Promise<MobileUser> {
    return this.fetchWithAuth('/mobile/profile');
  }

  static async getDigitalCard(): Promise<DigitalCard> {
    return this.fetchWithAuth('/mobile/card');
  }

  static async getPayments(): Promise<Payment[]> {
    return this.fetchWithAuth('/mobile/payments');
  }
}
