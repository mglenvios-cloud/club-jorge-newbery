'use client';

import React from 'react';
import { ClubTable } from '@/components/admin/ClubTable';

export default function SuperAdminClubsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Directorio de Clubes Registrados</h1>
        <p className="text-slate-400 text-xs mt-1">
          Gestión centralizada de tenants, asignación de planes, cambio de branding, módulos y control de acceso.
        </p>
      </div>

      <ClubTable />
    </div>
  );
}
