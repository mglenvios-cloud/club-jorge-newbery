'use client';

import React from 'react';
import { SponsorAd } from '@club-digital-pro/shared';
import { Megaphone, Plus, Eye, MousePointer } from 'lucide-react';

const mockAdsList: SponsorAd[] = [
  {
    id: 'ad-1',
    tenantId: 'tenant-default-001',
    sponsorName: 'Banco Macro Pro',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=100&fit=crop',
    position: 'BANNER',
    targetUrl: 'https://banco.example.com',
    impressions: 14500,
    clicks: 680,
    isActive: true,
  },
  {
    id: 'ad-2',
    tenantId: 'tenant-default-001',
    sponsorName: 'SportWear Argentina',
    logoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=100&fit=crop',
    position: 'PREROLL',
    targetUrl: 'https://sportwear.example.com',
    impressions: 8900,
    clicks: 410,
    isActive: true,
  },
];

export default function SponsorsAdsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Sponsors & Monetización Publicitaria</h1>
          <p className="text-slate-400 text-xs mt-0.5">Gestión de campañas de anunciantes, banners, spots Pre-roll y Mid-roll.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAdsList.map((ad) => (
          <div key={ad.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {ad.position}
              </span>
              <span className="text-xs text-emerald-400 font-bold">Activo</span>
            </div>

            <div className="flex items-center gap-4">
              <img src={ad.logoUrl} alt={ad.sponsorName} className="w-20 h-14 object-cover rounded-xl border border-slate-800 shrink-0" />
              <div>
                <h3 className="font-extrabold text-white text-base">{ad.sponsorName}</h3>
                <p className="text-xs text-slate-400 font-mono">{ad.targetUrl}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-blue-400" /> {ad.impressions.toLocaleString()} Impresiones</span>
              <span className="flex items-center gap-1"><MousePointer className="w-3.5 h-3.5 text-emerald-400" /> {ad.clicks.toLocaleString()} Clicks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
