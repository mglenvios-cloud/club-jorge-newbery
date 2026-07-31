'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tenant, DEFAULT_BRANDING, TenantStatus, SubscriptionPlan } from '@club-digital-pro/shared';

interface TenantContextType {
  tenant: Tenant | null;
  isLoading: boolean;
  updateBranding: (branding: Partial<typeof DEFAULT_BRANDING>) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>({
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
      primaryColor: '#0055a5',
      secondaryColor: '#0f172a',
      accentColor: '#e11d48',
      logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
      shieldUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
      address: 'Alpatacal 3026, Villa Devoto, Ciudad Autónoma de Buenos Aires',
      phone: '+54 11 4501-0000',
      email: 'contacto@jorgenewbery.org.ar',
      website: 'https://jorgenewbery.org.ar',
      shortName: 'Jorge Newbery',
      sigla: 'JN',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tenant?.branding) {
      const root = document.documentElement;
      root.style.setProperty('--brand-primary', tenant.branding.primaryColor);
      root.style.setProperty('--brand-secondary', tenant.branding.secondaryColor);
      root.style.setProperty('--brand-accent', tenant.branding.accentColor);
    }
  }, [tenant]);

  const updateBranding = (newBranding: Partial<typeof DEFAULT_BRANDING>) => {
    if (!tenant) return;
    setTenant({
      ...tenant,
      branding: {
        ...tenant.branding,
        ...newBranding,
      },
    });
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
