import React from 'react';
import { SuperAdminSidebar } from '@/components/admin/SuperAdminSidebar';
import { SuperAdminHeader } from '@/components/admin/SuperAdminHeader';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <SuperAdminHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-950">{children}</main>
      </div>
    </div>
  );
}
