import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Club Digital Pro | Plataforma SaaS para Clubes Deportivos y Sociales',
  description:
    'Solución tecnológica cloud multi-tenant de alto rendimiento para la administración integral de instituciones deportivas y sociales.',
  keywords: ['SaaS', 'Clubes Deportivos', 'Gestión Multi-Tenant', 'Club Digital Pro'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
