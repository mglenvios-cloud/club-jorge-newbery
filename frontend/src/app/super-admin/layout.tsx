'use client';
import Link from 'next/link';

const navItems = [
  { href: '/super-admin', label: '🚀 Dashboard', icon: '📊' },
  { href: '/super-admin/clubs', label: 'Clubes', icon: '🏟️' },
  { href: '/super-admin/leads', label: 'CRM Leads', icon: '📋' },
  { href: '/super-admin/modules', label: 'Módulos', icon: '🧩' },
  { href: '/super-admin/plans', label: 'Planes', icon: '💎' },
  { href: '/super-admin/subscriptions', label: 'Suscripciones', icon: '🔄' },
  { href: '/super-admin/analytics', label: 'Métricas', icon: '📈' },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050a14', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 260,
        background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)',
        borderRight: '1px solid rgba(99,102,241,0.15)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}>
        {/* Brand */}
        <div style={{ padding: '0 24px 24px', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 12, padding: '10px 14px',
          }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Club Atlético Jorge Newbery</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Administración Oficial</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, marginBottom: 4,
              color: '#94a3b8', textDecoration: 'none', fontSize: 14,
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.12)';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
          <Link href="/admin" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: '#64748b', textDecoration: 'none', fontSize: 12,
          }}>
            <span>←</span>
            <span>Volver al Panel Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 260, flex: 1, padding: '32px 40px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
