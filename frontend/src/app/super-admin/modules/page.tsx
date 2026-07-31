'use client';
import { useState } from 'react';

const mockModules = [
  { id: 'mod-001', code: 'SOCIOS', name: 'Centro de Socios', icon: '👥', category: 'CORE', price: 0, active: true, installations: 2 },
  { id: 'mod-002', code: 'FINANZAS', name: 'Finance Pro', icon: '💰', category: 'FINANCE', price: 49, active: true, installations: 2 },
  { id: 'mod-003', code: 'DEPORTES', name: 'Gestión Deportiva', icon: '🏆', category: 'SPORTS', price: 39, active: true, installations: 1 },
  { id: 'mod-004', code: 'MARKETING', name: 'Marketing & Email', icon: '📣', category: 'COMMUNICATION', price: 29, active: true, installations: 1 },
  { id: 'mod-005', code: 'TV', name: 'Club TV', icon: '📺', category: 'MEDIA', price: 79, active: true, installations: 0 },
  { id: 'mod-006', code: 'MEDIA_CENTER', name: 'Media Center IA', icon: '🎬', category: 'MEDIA', price: 59, active: true, installations: 0 },
  { id: 'mod-007', code: 'MOBILE', name: 'App Mobile', icon: '📱', category: 'MOBILE', price: 89, active: true, installations: 0 },
  { id: 'mod-008', code: 'LIGA_PRO', name: 'Liga Pro Studio', icon: '🛡️', category: 'LEAGUE', price: 69, active: false, installations: 0 },
  { id: 'mod-009', code: 'CRM', name: 'CRM Captación', icon: '📊', category: 'CRM', price: 35, active: true, installations: 0 },
  { id: 'mod-010', code: 'RFID_ACCESO', name: 'Control RFID', icon: '🔑', category: 'ACCESS', price: 89, active: false, installations: 0 },
];

const categoryColors: Record<string, string> = {
  CORE: '#10b981', FINANCE: '#6366f1', SPORTS: '#f59e0b', COMMUNICATION: '#38bdf8',
  MEDIA: '#8b5cf6', MOBILE: '#ec4899', LEAGUE: '#f97316', CRM: '#06b6d4', ACCESS: '#64748b',
};

export default function SuperAdminModules() {
  const [modules, setModules] = useState(mockModules);
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(mockModules.map((m) => m.category)))];
  const filtered = filter === 'ALL' ? modules : modules.filter((m) => m.category === filter);

  const toggleActive = (id: string) => {
    setModules((prev) => prev.map((m) => m.id === id ? { ...m, active: !m.active } : m));
  };

  return (
    <div style={{ color: '#e2e8f0' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>🧩 Marketplace Manager</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
          Gestionar módulos disponibles en la plataforma SaaS
        </p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Módulos', value: modules.length, color: '#6366f1' },
          { label: 'Activos', value: modules.filter((m) => m.active).length, color: '#10b981' },
          { label: 'Inactivos', value: modules.filter((m) => !m.active).length, color: '#ef4444' },
          { label: 'Instalaciones', value: modules.reduce((a, b) => a + b.installations, 0), color: '#8b5cf6' },
        ].map((card) => (
          <div key={card.label} style={{
            background: 'rgba(30,41,59,0.6)', borderRadius: 12, padding: '18px 20px',
            border: `1px solid ${card.color}22`,
          }}>
            <div style={{ color: card.color, fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            background: filter === cat ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(30,41,59,0.6)',
            color: filter === cat ? '#fff' : '#94a3b8',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filtered.map((mod) => (
          <div key={mod.id} style={{
            background: 'rgba(15,23,42,0.9)',
            borderRadius: 14, padding: 20,
            border: `1px solid ${mod.active ? categoryColors[mod.category] + '33' : 'rgba(255,255,255,0.05)'}`,
            opacity: mod.active ? 1 : 0.6,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 28 }}>{mod.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{mod.name}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{mod.code}</div>
                </div>
              </div>
              <span style={{
                background: `${categoryColors[mod.category]}22`,
                color: categoryColors[mod.category],
                padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
              }}>
                {mod.category}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: 16 }}>
                  {mod.price === 0 ? 'GRATIS' : `$${mod.price}/mes`}
                </span>
                <span style={{ color: '#64748b', fontSize: 12, marginLeft: 12 }}>
                  {mod.installations} instalaciones
                </span>
              </div>
              <button onClick={() => toggleActive(mod.id)} style={{
                background: mod.active ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: mod.active ? '#10b981' : '#ef4444',
                border: `1px solid ${mod.active ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
              }}>
                {mod.active ? '✅ Activo' : '❌ Inactivo'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
