'use client';
import { useState } from 'react';

const mockClubs = [
  {
    id: 'club-001', name: 'Club Atlético San Martín', slug: 'sanmartin',
    domain: 'sanmartin.clubdigitalpro.com', status: 'ACTIVE', plan: 'Enterprise',
    activeModules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'MARKETING'],
    totalMembers: 3200, monthlyRevenue: 75000, adminEmail: 'admin@sanmartin.org',
    createdAt: '2025-01-15',
  },
  {
    id: 'club-002', name: 'Club Deportivo Rivadavia', slug: 'rivadavia',
    domain: 'rivadavia.clubdigitalpro.com', status: 'TRIAL', plan: 'Professional',
    activeModules: ['SOCIOS', 'FINANZAS'],
    totalMembers: 820, monthlyRevenue: 35000, adminEmail: 'admin@rivadavia.org.ar',
    createdAt: '2026-07-01',
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: '#10b981', TRIAL: '#f59e0b', SUSPENDED: '#ef4444', INACTIVE: '#64748b',
};

const planColors: Record<string, string> = {
  Starter: '#64748b', Professional: '#6366f1', Enterprise: '#8b5cf6', 'White Label': '#ec4899',
};

export default function SuperAdminClubs() {
  const [clubs, setClubs] = useState(mockClubs);
  const [search, setSearch] = useState('');

  const filtered = clubs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setClubs((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      return { ...c, status: c.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' };
    }));
  };

  return (
    <div style={{ color: '#e2e8f0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>🏟️ Gestión de Clubes</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
            {clubs.length} clubes registrados en la plataforma
          </p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', border: 'none', borderRadius: 10,
          padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
        }}>
          + Nuevo Club
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Buscar club por nombre o slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px',
            background: 'rgba(30,41,59,0.8)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 10, color: '#fff', fontSize: 14,
            outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Clubs Table */}
      <div style={{ background: 'rgba(15,23,42,0.8)', borderRadius: 16, border: '1px solid rgba(99,102,241,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
              {['Club', 'Plan', 'Estado', 'Socios', 'MRR', 'Módulos', 'Acciones'].map((h) => (
                <th key={h} style={{
                  padding: '14px 20px', textAlign: 'left',
                  color: '#64748b', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                }}>
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((club) => (
              <tr key={club.id} style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{club.name}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{club.domain}</div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    color: planColors[club.plan] || '#94a3b8',
                    background: `${planColors[club.plan]}22`,
                    padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  }}>
                    {club.plan}
                  </span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    color: statusColors[club.status],
                    background: `${statusColors[club.status]}22`,
                    padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  }}>
                    {club.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: 14 }}>
                  {club.totalMembers.toLocaleString()}
                </td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 700, fontSize: 14 }}>
                  ${club.monthlyRevenue.toLocaleString()}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {club.activeModules.slice(0, 3).map((m) => (
                      <span key={m} style={{
                        background: 'rgba(99,102,241,0.15)', color: '#a5b4fc',
                        padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                      }}>
                        {m}
                      </span>
                    ))}
                    {club.activeModules.length > 3 && (
                      <span style={{ color: '#64748b', fontSize: 10 }}>+{club.activeModules.length - 3}</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <button
                    onClick={() => toggleStatus(club.id)}
                    style={{
                      background: club.status === 'ACTIVE' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                      color: club.status === 'ACTIVE' ? '#ef4444' : '#10b981',
                      border: `1px solid ${club.status === 'ACTIVE' ? '#ef4444' : '#10b981'}44`,
                      borderRadius: 6, padding: '6px 12px',
                      cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    }}
                  >
                    {club.status === 'ACTIVE' ? 'Suspender' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
