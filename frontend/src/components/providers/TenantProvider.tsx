'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tenant, DEFAULT_BRANDING, TenantStatus, SubscriptionPlan } from '@club-digital-pro/shared';

export interface CustomBranding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: string;
  ballColor: string;
}

export interface UpdateBrandingParams extends Partial<typeof DEFAULT_BRANDING>, Partial<CustomBranding> {
  name?: string;
}

interface ExtendedTenant extends Omit<Tenant, 'branding'> {
  branding: typeof DEFAULT_BRANDING & CustomBranding;
}

interface TenantContextType {
  tenant: ExtendedTenant | null;
  isLoading: boolean;
  updateBranding: (params: UpdateBrandingParams) => void;
}

const STORAGE_KEY = 'jorge_newbery_live_branding_v1';

const defaultTenantData: ExtendedTenant = {
  id: 'tenant-jorge-newbery',
  name: 'Club Atlético Jorge Newbery',
  slug: 'jorge-newbery',
  domain: 'jorgenewbery.org.ar',
  status: TenantStatus.ACTIVE,
  plan: SubscriptionPlan.ENTERPRISE,
  shortName: 'Jorge Newbery',
  sigla: 'JN',
  address: 'Alpatacal 3026, Villa Devoto, Ciudad Autónoma de Buenos Aires',
  phone: '+54 11 4501-0000',
  email: 'contacto@jorgenewbery.org.ar',
  website: 'https://jorgenewbery.org.ar',
  branding: {
    ...DEFAULT_BRANDING,
    primaryColor: '#dc2626',
    secondaryColor: '#0a0a0a',
    accentColor: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    ballColor: '#dc2626',
    logoUrl: '/logo.png',
    shieldUrl: '/shield.png',
    address: 'Alpatacal 3026, Villa Devoto, Ciudad Autónoma de Buenos Aires',
    phone: '+54 11 4501-0000',
    email: 'contacto@jorgenewbery.org.ar',
    website: 'https://jorgenewbery.org.ar',
    shortName: 'Jorge Newbery',
    sigla: 'JN',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

function hexToRgb(hex: string): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return isNaN(num) ? '220, 38, 38' : `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<ExtendedTenant | null>(defaultTenantData);
  const [isLoading, setIsLoading] = useState(false);

  // Read saved state from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTenant(prev => ({
          ...prev!,
          name: parsed.name || prev!.name,
          branding: {
            ...prev!.branding,
            ...parsed.branding,
          },
        }));
      }
    } catch (e) {
      console.warn('Could not read saved branding state:', e);
    }
  }, []);

  // Update root CSS variables when branding changes
  useEffect(() => {
    if (tenant?.branding) {
      const root = document.documentElement;
      const primary = tenant.branding.primaryColor || '#dc2626';
      const secondary = tenant.branding.secondaryColor || '#0a0a0a';
      const accent = tenant.branding.accentColor || '#ffffff';
      const font = tenant.branding.fontFamily || "'Inter', sans-serif";
      const size = tenant.branding.fontSize || '16px';

      root.style.setProperty('--brand-primary', primary);
      root.style.setProperty('--brand-secondary', secondary);
      root.style.setProperty('--brand-accent', accent);
      root.style.setProperty('--brand-primary-rgb', hexToRgb(primary));
      root.style.setProperty('--brand-secondary-rgb', hexToRgb(secondary));
      root.style.setProperty('--font-inter', font);
      root.style.fontSize = size;
    }
  }, [tenant]);

  const updateBranding = (params: UpdateBrandingParams) => {
    if (!tenant) return;
    const { name, ...brandingFields } = params;

    const updated: ExtendedTenant = {
      ...tenant,
      name: name !== undefined ? name : tenant.name,
      branding: {
        ...tenant.branding,
        ...brandingFields,
      },
    };

    setTenant(updated);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: updated.name,
          branding: updated.branding,
        })
      );
    } catch (e) {
      console.warn('Could not save branding state to localStorage:', e);
    }
  };

  return (
    <TenantContext.Provider value={{ tenant, isLoading, updateBranding }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant debe usarse dentro de un TenantProvider');
  }
  return context;
}

