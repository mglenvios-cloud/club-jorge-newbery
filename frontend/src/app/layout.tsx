import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Club Digital Pro | Plataforma Oficial de Gestión Institucional',
  description:
    'Plataforma digital oficial de gestión institucional: Gestión de socios, carnet digital, finanzas, reservas de canchas, torneos y Club TV.',
  keywords: ['Club Digital Pro', 'Plataforma de Clubes', 'Socios', 'Carnet Digital', 'Deportes', 'Reservas', 'Club TV'],
};

import { ThemeProvider } from '@/components/ThemeContext';
import LiveThemeEditor from '@/components/LiveThemeEditor';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <ThemeProvider>
          <AppProviders>{children}</AppProviders>
          <LiveThemeEditor />
        </ThemeProvider>
      </body>
    </html>
  );
}
