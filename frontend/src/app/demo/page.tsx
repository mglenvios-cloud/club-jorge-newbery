import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo en Vivo',
  description: 'Explorá la plataforma digital en acción. Dashboard completo con socios, finanzas, Club TV, gestión deportiva y más.',
};

const demoModules = [
  { icon: '👥', title: 'Centro de Socios', desc: 'Padrón completo, carnet QR, estados y auditoría', href: '/dashboard/members' },
  { icon: '💰', title: 'Finance Pro', desc: 'Cuotas, cobranza, tesorería y reportes', href: '/dashboard/finance' },
  { icon: '📺', title: 'Club TV', desc: 'Streaming, videoteca y programación', href: '/dashboard/tv' },
  { icon: '🏆', title: 'Gestión Deportiva', desc: 'Planteles, partidos y estadísticas', href: '/dashboard/sports' },
  { icon: '🎬', title: 'Media Center IA', desc: 'Noticias, videos y contenido con IA', href: '/dashboard/media-center' },
  { icon: '⚙️', title: 'Panel Admin', desc: 'Marketplace, módulos y configuración', href: '/admin' },
];

export default function DemoPage() {
  return (
    <div style={{
      background: '#050a14', color: '#e2e8f0',
      fontFamily: 'Inter, system-ui, sans-serif',
      minHeight: '100vh', padding: '80px 40px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 60, maxWidth: 700, margin: '0 auto 60px' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 100, padding: '6px 20px', marginBottom: 20,
          color: '#6ee7b7', fontSize: 14, fontWeight: 600,
        }}>
          🟢 Acceso directo a la plataforma
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
          Club Atlético Jorge Newbery en acción
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
          Explorá todos los módulos del sistema con datos de demostración. No se requiere registro.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 1100, margin: '0 auto 60px' }}>
        {demoModules.map((mod) => (
          <a key={mod.title} href={mod.href} style={{
            background: 'rgba(15,23,42,0.9)',
            borderRadius: 16, padding: 28,
            border: '1px solid rgba(99,102,241,0.2)',
            textDecoration: 'none', color: 'inherit',
            display: 'block',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{mod.icon}</div>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>{mod.title}</h3>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.5, margin: '0 0 16px' }}>{mod.desc}</p>
            <span style={{ color: '#6366f1', fontSize: 14, fontWeight: 600 }}>Explorar módulo →</span>
          </a>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        background: 'rgba(15,23,42,0.8)',
        borderRadius: 16, padding: '40px',
        border: '1px solid rgba(99,102,241,0.15)',
        maxWidth: 640, margin: '0 auto',
      }}>
        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 24, margin: '0 0 12px' }}>
          ¿Listo para implementarlo en tu club?
        </h2>
        <p style={{ color: '#94a3b8', margin: '0 0 24px', fontSize: 16 }}>
          Comenzá tu prueba gratuita de 14 días sin tarjeta de crédito.
        </p>
        <a href="/register-club" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', textDecoration: 'none',
          padding: '14px 32px', borderRadius: 10, fontWeight: 700, fontSize: 16,
        }}>
          Registrar mi club gratis →
        </a>
      </div>
    </div>
  );
}
