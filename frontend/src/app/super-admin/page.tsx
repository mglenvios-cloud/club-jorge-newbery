'use client';

const kpis = [
  { label: 'Clubes Activos', value: '1', sub: '+1 en trial', color: '#10b981', icon: '🏟️' },
  { label: 'Ingresos Mensuales', value: '$110.000', sub: 'ARS / mes', color: '#6366f1', icon: '💰' },
  { label: 'Suscripciones Activas', value: '2', sub: '1 trial, 1 activa', color: '#f59e0b', icon: '📋' },
  { label: 'Módulos Instalados', value: '9', sub: 'en 2 clubes', color: '#8b5cf6', icon: '🧩' },
  { label: 'Crecimiento Mensual', value: '+12.5%', sub: 'vs mes anterior', color: '#38bdf8', icon: '📈' },
  { label: 'Revenue Anual Proyectado', value: '$1.320.000', sub: 'ARR estimado', color: '#ec4899', icon: '🚀' },
];

const topModules = [
  { code: 'SOCIOS', name: 'Centro de Socios', installations: 2, color: '#10b981' },
  { code: 'FINANZAS', name: 'Finance Pro', installations: 2, color: '#6366f1' },
  { code: 'DEPORTES', name: 'Gestión Deportiva', installations: 1, color: '#f59e0b' },
];

const recentClubs = [
  { name: 'Club Atlético San Martín', plan: 'Enterprise', status: 'ACTIVE', mrr: '$75.000' },
  { name: 'Club Deportivo Rivadavia', plan: 'Professional', status: 'TRIAL', mrr: '$35.000' },
];

const statusColors: Record<string, string> = {
  ACTIVE: '#10b981',
  TRIAL: '#f59e0b',
  SUSPENDED: '#ef4444',
  INACTIVE: '#64748b',
};

export default function SuperAdminDashboard() {
  return (
    <div style={{ color: '#e2e8f0' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>⚡</span>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>
              Super Admin — Dashboard
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: 14 }}>
              Vista global del Club Atlético Jorge Newbery
            </p>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 36 }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} style={{
            background: 'rgba(30,41,59,0.6)',
            borderRadius: 16,
            padding: '24px',
            border: `1px solid ${kpi.color}22`,
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${kpi.color}1a`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>
                {kpi.icon}
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: kpi.color, marginBottom: 4 }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Two Column Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Top Modules */}
        <div style={{
          background: 'rgba(30,41,59,0.6)',
          borderRadius: 16,
          padding: 24,
          border: '1px solid rgba(99,102,241,0.15)',
        }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 20px' }}>
            🧩 Módulos Más Instalados
          </h2>
          {topModules.map((mod) => (
            <div key={mod.code} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{mod.name}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{mod.code}</div>
              </div>
              <div style={{
                background: `${mod.color}22`, color: mod.color,
                padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
              }}>
                {mod.installations} clubes
              </div>
            </div>
          ))}
        </div>

        {/* Recent Clubs */}
        <div style={{
          background: 'rgba(30,41,59,0.6)',
          borderRadius: 16,
          padding: 24,
          border: '1px solid rgba(99,102,241,0.15)',
        }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 20px' }}>
            🏟️ Clubes Recientes
          </h2>
          {recentClubs.map((club) => (
            <div key={club.name} style={{
              padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{club.name}</span>
                <span style={{
                  color: statusColors[club.status] || '#94a3b8',
                  fontSize: 11, fontWeight: 700,
                  background: `${statusColors[club.status]}22`,
                  padding: '2px 8px', borderRadius: 20,
                }}>
                  {club.status}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b', fontSize: 12 }}>{club.plan}</span>
                <span style={{ color: '#10b981', fontSize: 12, fontWeight: 600 }}>{club.mrr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
