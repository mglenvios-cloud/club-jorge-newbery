'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { TenantProvider } from './TenantProvider';
import { AuthProvider } from './AuthProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TenantProvider>
        <AuthProvider>{children}</AuthProvider>
      </TenantProvider>
    </ThemeProvider>
  );
}
