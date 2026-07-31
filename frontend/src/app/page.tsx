'use client';
import Link from 'next/link';

const features = [
  { icon: '👥', title: 'Gestión de Socios', desc: 'Padrón completo, carnet digital QR, categorías, estados y tutores.' },
  { icon: '💰', title: 'Finance Pro', desc: 'Cuotas sociales, cobranza online, tesorería y facturación electrónica.' },
  { icon: '📺', title: 'Club TV', desc: 'Streaming de partidos, videoteca y programación en vivo con múltiples fuentes.' },
  { icon: '🏆', title: 'Gestión Deportiva', desc: 'Disciplinas, categorías, planteles, partidos, estadísticas y entrenamientos.' },
  { icon: '🤖', title: 'Media Center IA', desc: 'Generación automática de noticias y contenido institucional con inteligencia artificial.' },
  { icon: '📱', title: 'App Móvil', desc: 'Aplicación nativa para socios, familias y administradores del club.' },
];

const stats = [
  { value: '500+', label: 'Clubes que confían' },
  { value: '180.000+', label: 'Socios gestionados' },
  { value: '99.9%', label: 'Uptime garantizado' },
  { value: '14 días', label: 'Trial gratuito' },
];

const navLinks = [
  { href: '/features', label: 'Funcionalidades' },
  { href: '/pricing', label: 'Precios' },
  { href: '/demo', label: 'Ver Demo' },
  { href: '/contact', label: 'Contacto' },
];

export default function LandingPage() {
  return (
    <div style={{ background: '#050a14', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      <style>{`
        .nav-link { color: #94a3b8; text-decoration: none; font-size: 15px; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .feature-card { background: rgba(15,23,42,0.8); border-radius: 16px; padding: 28px; border: 1px solid rgba(99,102,241,0.12); transition: all 0.3s; }
        .feature-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-4px); }
        .btn-primary { background: linear-gradient(135deg,#6366f1,#8b5cf6); color: #fff; text-decoration: none; padding: 16px 36px; border-radius: 12px; font-weight: 700; font-size: 18px; box-shadow: 0 0 40px rgba(99,102,241,0.4); }
        .btn-secondary { border: 1px solid rgba(99,102,241,0.4); color: #a5b4fc; text-decoration: none; padding: 16px 36px; border-radius: 12px; font-weight: 600; font-size: 18px; background: rgba(99,102,241,0.08); }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(99,102,241,0.15)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(5,10,20,0.9)',
        padding: '16px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 10, padding: '6px 10px',
            fontWeight: 800, color: '#fff', fontSize: 16,
          }}>⚡ CDP</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Club Digital Pro</span>
        </Link>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="/login" className="nav-link" style={{ marginLeft: 8 }}>Ingresar</a>
          <a href="/register-club" style={{
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff', textDecoration: 'none',
            padding: '10px 24px', borderRadius: 10, fontWeight: 600, fontSize: 15,
          }}>
            Comenzar gratis →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        textAlign: 'center', padding: '100px 40px 80px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 100, padding: '6px 20px', marginBottom: 24,
          color: '#a5b4fc', fontSize: 14, fontWeight: 600,
        }}>
          🚀 La plataforma SaaS líder para clubes deportivos
        </div>
        <h1 style={{
          fontSize: 'clamp(40px,5vw,72px)', fontWeight: 900,
          lineHeight: 1.1, margin: '0 0 24px',
          background: 'linear-gradient(135deg,#fff 40%,#a5b4fc)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Digitalizá tu club con<br />inteligencia artificial
        </h1>
        <p style={{
          fontSize: 20, color: '#94a3b8', maxWidth: 640,
          margin: '0 auto 40px', lineHeight: 1.6,
        }}>
          Socios, finanzas, deportes, Club TV, carnet digital y app móvil.
          Todo integrado, multi-tenant y listo para producción.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register-club" className="btn-primary">Probar 14 días gratis</a>
          <a href="/demo" className="btn-secondary">Ver Demo en vivo →</a>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '40px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#6366f1', marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
            Todo lo que tu club necesita
          </h2>
          <p style={{ color: '#64748b', fontSize: 18 }}>6 módulos profesionales en una sola plataforma</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center', padding: '80px 40px',
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)',
      }}>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>
          Empezá hoy sin riesgos
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 18, margin: '0 0 40px' }}>
          14 días de prueba gratuita. Sin tarjeta de crédito. Sin permanencia.
        </p>
        <a href="/register-club" style={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', textDecoration: 'none',
          padding: '18px 48px', borderRadius: 14, fontWeight: 700, fontSize: 20,
          boxShadow: '0 0 50px rgba(99,102,241,0.5)',
          display: 'inline-block',
        }}>
          Registrar mi club gratis →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: '#64748b', fontSize: 14,
      }}>
        <span>© 2026 Club Digital Pro. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="/pricing" className="nav-link">Precios</a>
          <a href="/contact" className="nav-link">Contacto</a>
          <a href="/login" className="nav-link">Ingresar</a>
        </div>
      </footer>
    </div>
  );
}
