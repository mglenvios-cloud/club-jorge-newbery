import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Club Atlético Jorge Newbery | Plataforma Oficial de Gestión',
  description:
    'Plataforma digital oficial del Club Atlético Jorge Newbery: Gestión de socios, carnet digital, finanzas, reservas de canchas, torneos y Newbery TV.',
  keywords: ['Club Atlético Jorge Newbery', 'Jorge Newbery', 'Socios', 'Carnet Digital', 'Deportes', 'Reservas'],
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
