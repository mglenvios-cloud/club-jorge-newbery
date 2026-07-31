'use client';

const metrics = {
  totalClubs: 2, activeClubs: 1, trialClubs: 1, suspendedClubs: 0,
  monthlyRecurringRevenue: 110000, annualRecurringRevenue: 1320000,
  totalSubscriptions: 2, activeSubscriptions: 1,
  totalModuleInstallations: 9, monthlyGrowth: 12.5,
  topModules: [
    { code: 'SOCIOS', name: 'Centro de Socios', installations: 2 },
    { code: 'FINANZAS', name: 'Finance Pro', installations: 2 },
    { code: 'DEPORTES', name: 'Gestión Deportiva', installations: 1 },
    { code: 'MARKETING', name: 'Marketing & Email', installations: 1 },
  ],
  revenueByPlan: [
    { plan: 'Enterprise', revenue: 75000, clubs: 1 },
    { plan: 'Professional', revenue: 35000, clubs: 1 },
    { plan: 'Starter', revenue: 0, clubs: 0 },
    { plan: 'White Label', revenue: 0, clubs: 0 },
  ],
  monthlyData: [
    { month: 'Feb', revenue: 0, clubs: 0 },
    { month: 'Mar', revenue: 0, clubs: 0 },
    { month: 'Abr', revenue: 35000, clubs: 1 },
    { month: 'May', revenue: 35000, clubs: 1 },
    { month: 'Jun', revenue: 75000, clubs: 1 },
    { month: 'Jul', revenue: 110000, clubs: 2 },
  ],
};

const maxRevenue = Math.max(...metrics.monthlyData.map((m) => m.revenue));

export default function SuperAdminAnalytics() {
  return (
    <div style={{ color: '#e2e8f0' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>📈 Métricas SaaS</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
          Análisis de crecimiento y rendimiento de la plataforma
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'MRR', value: `$${metrics.monthlyRecurringRevenue.toLocaleString()}`, sub: 'ARS/mes', color: '#10b981', icon: '💰' },
          { label: 'ARR Proyectado', value: `$${metrics.annualRecurringRevenue.toLocaleString()}`, sub: 'ARS/año', color: '#6366f1', icon: '🚀' },
          { label: 'Crecimiento', value: `+${metrics.monthlyGrowth}%`, sub: 'mensual', color: '#f59e0b', icon: '📈' },
          { label: 'Clubes Totales', value: metrics.totalClubs, sub: `${metrics.activeClubs} activos`, color: '#8b5cf6', icon: '🏟️' },
        ].map((kpi) => (
          <div key={kpi.label} style={{
            background: 'rgba(30,41,59,0.6)', borderRadius: 14, padding: '20px',
            border: `1px solid ${kpi.color}22`,
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{kpi.icon}</div>
            <div style={{ color: kpi.color, fontSize: 24, fontWeight: 800, marginBottom: 2 }}>{kpi.value}</div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{kpi.label}</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Revenue Chart (bar chart visualization) */}
        <div style={{ background: 'rgba(15,23,42,0.9)', borderRadius: 16, padding: 24, border: '1px solid rgba(99,102,241,0.1)' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 24px' }}>
            💰 Evolución del MRR
          </h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
            {metrics.monthlyData.map((d) => {
              const height = maxRevenue > 0 ? (d.revenue / maxRevenue) * 140 : 4;
              return (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#10b981', fontSize: 10, fontWeight: 600 }}>
                    {d.revenue > 0 ? `$${(d.revenue / 1000).toFixed(0)}k` : ''}
                  </span>
                  <div style={{
                    width: '100%', height: Math.max(height, 4),
                    background: d.revenue > 0
                      ? 'linear-gradient(180deg,#6366f1,#8b5cf6)'
                      : 'rgba(99,102,241,0.1)',
                    borderRadius: '4px 4px 0 0',
                  }} />
                  <span style={{ color: '#64748b', fontSize: 11 }}>{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue by Plan */}
        <div style={{ background: 'rgba(15,23,42,0.9)', borderRadius: 16, padding: 24, border: '1px solid rgba(99,102,241,0.1)' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 20px' }}>
            💎 Revenue por Plan
          </h2>
          {metrics.revenueByPlan.map((p, i) => {
            const colors = ['#8b5cf6', '#6366f1', '#64748b', '#ec4899'];
            const pct = metrics.monthlyRecurringRevenue > 0 ? (p.revenue / metrics.monthlyRecurringRevenue) * 100 : 0;
            return (
              <div key={p.plan} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{p.plan}</span>
                  <span style={{ color: '#10b981', fontSize: 13, fontWeight: 600 }}>
                    ${p.revenue.toLocaleString()}
                  </span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                  <div style={{
                    height: '100%', width: `${pct}%`,
                    background: colors[i], borderRadius: 3,
                    transition: 'width 0.5s',
                  }} />
                </div>
                <div style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>{p.clubs} clubes</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Modules */}
      <div style={{ background: 'rgba(15,23,42,0.9)', borderRadius: 16, padding: 24, border: '1px solid rgba(99,102,241,0.1)' }}>
        <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 20px' }}>
          🧩 Módulos Más Utilizados
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {metrics.topModules.map((mod, i) => {
            const colors = ['#10b981', '#6366f1', '#f59e0b', '#8b5cf6'];
            return (
              <div key={mod.code} style={{
                background: `${colors[i]}11`, borderRadius: 12, padding: 16,
                border: `1px solid ${colors[i]}22`,
              }}>
                <div style={{ color: colors[i], fontSize: 24, fontWeight: 800 }}>{mod.installations}</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{mod.name}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{mod.code}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
