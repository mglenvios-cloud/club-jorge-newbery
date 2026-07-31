'use client';
import Link from 'next/link';

const realModules = [
  { icon: '🪪', title: 'Portal de Socios', desc: 'Padrón de afiliados, consulta de estado de cuota, datos personales y gestión del grupo familiar.', href: '/portal' },
  { icon: '📲', title: 'Carnet Digital', desc: 'Carnet oficial dinámico con código QR para validación rápida en molinetes y accesos.', href: '/portal/carnet' },
  { icon: '🏆', title: 'Centro de Gestión Deportiva', desc: 'Control de planteles, disciplinas, entrenamientos, horarios y aptitudes médicas.', href: '/dashboard/sports' },
  { icon: '⚽', title: 'Futsal AFA & Torneos', desc: 'Fixture, resultados en vivo, tabla de posiciones y goleadores del certamen oficial.', href: '/dashboard/sports/tournaments' },
  { icon: '📺', title: 'Newbery TV', desc: 'Transmisiones en directo de partidos, resúmenes, entrevistas y videoteca a la carta.', href: '/tv' },
  { icon: '⚙️', title: 'Administración del Club', desc: 'Tesorería, cobro de cuotas, caja diaria, proveedores y reportes institucionales.', href: '/dashboard' },
];

const stats = [
  { value: 'Devoto', label: 'Sede Institucional' },
  { value: 'AFA', label: 'Futsal Oficial' },
  { value: 'QR', label: 'Carnet Digital' },
  { value: 'Live', label: 'Newbery TV Streaming' },
];

const navLinks = [
  { href: '/portal', label: 'Portal Socios' },
  { href: '/portal/bookings', label: 'Reservas' },
  { href: '/dashboard/sports/tournaments', label: 'Torneos' },
  { href: '/tv', label: 'Newbery TV' },
];

export default function LandingPage() {
  return (
    <div style={{ background: '#050a14', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      <style>{`
        .nav-link { color: #94a3b8; text-decoration: none; font-size: 15px; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .feature-card { background: rgba(15,23,42,0.8); border-radius: 16px; padding: 28px; border: 1px solid rgba(0,85,165,0.25); transition: all 0.3s; text-decoration: none; display: block; color: inherit; }
        .feature-card:hover { border-color: rgba(0,85,165,0.6); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,85,165,0.15); }
        .btn-primary { background: linear-gradient(135deg,#0055a5,#003366); color: #fff; text-decoration: none; padding: 16px 36px; border-radius: 12px; font-weight: 700; font-size: 18px; box-shadow: 0 0 40px rgba(0,85,165,0.4); display: inline-block; }
        .btn-secondary { border: 1px solid rgba(0,85,165,0.4); color: #93c5fd; text-decoration: none; padding: 16px 36px; border-radius: 12px; font-weight: 600; font-size: 18px; background: rgba(0,85,165,0.1); display: inline-block; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(0,85,165,0.2)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(5,10,20,0.92)',
        padding: '16px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            background: 'linear-gradient(135deg,#0055a5,#002244)',
            borderRadius: 10, padding: '6px 12px',
            fontWeight: 900, color: '#fff', fontSize: 16,
            boxShadow: '0 0 15px rgba(0,85,165,0.4)'
          }}>⚽ CAJN</span>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
            Club Atlético Jorge Newbery
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="/login" className="nav-link" style={{ marginLeft: 8 }}>Ingresar</a>
          <a href="/login" style={{
            background: 'linear-gradient(135deg,#0055a5,#003366)',
            color: '#fff', textDecoration: 'none',
            padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 15,
            boxShadow: '0 4px 14px rgba(0,85,165,0.3)',
          }}>
            Acceso Socios →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        textAlign: 'center', padding: '100px 40px 80px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,85,165,0.2) 0%, transparent 70%)',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,85,165,0.15)', border: '1px solid rgba(0,85,165,0.35)',
          borderRadius: 100, padding: '6px 20px', marginBottom: 24,
          color: '#93c5fd', fontSize: 14, fontWeight: 700,
        }}>
          ⚽ Institución Deportiva y Social — Fundada en Villa Devoto
        </div>
        <h1 style={{
          fontSize: 'clamp(38px,5vw,68px)', fontWeight: 900,
          lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg,#fff 40%,#93c5fd)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Club Atlético Jorge Newbery<br />Plataforma Oficial de Gestión
        </h1>
        <p style={{
          fontSize: 19, color: '#94a3b8', maxWidth: 680,
          margin: '0 auto 40px', lineHeight: 1.6,
        }}>
          Accedé a tu carnet digital, gestioná tus cuotas sociales, reservá instalaciones, seguí las posiciones del Futsal AFA y disfrutá las transmisiones de Newbery TV.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/portal" className="btn-primary">Ingresar al Portal Socios →</a>
          <a href="/tv" className="btn-secondary">Ver Newbery TV</a>
        </div>
      </section>

      {/* STATS / INSTITUTIONAL BADGES */}
      <section style={{ padding: '36px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,23,42,0.4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#3b82f6', marginBottom: 4, letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REAL MODULES */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Servicios y Módulos de la Plataforma
          </h2>
          <p style={{ color: '#64748b', fontSize: 17 }}>Gestión integral digital para socios, deportistas y administración</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {realModules.map((f) => (
            <Link key={f.title} href={f.href} className="feature-card">
              <div style={{ fontSize: 38, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>{f.desc}</p>
              <span style={{ color: '#60a5fa', fontSize: 13, fontWeight: 700 }}>Acceder al módulo →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{
        textAlign: 'center', padding: '80px 40px',
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,85,165,0.15) 0%, transparent 70%)',
      }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Bienvenido al Club Atlético Jorge Newbery
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 18, margin: '0 0 40px', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Ingresá con tu cuenta de socio para consultar tus cuotas, carnet QR, reservas de canchas y beneficios institucionales.
        </p>
        <a href="/login" className="btn-primary" style={{ fontSize: 18, padding: '16px 40px' }}>
          Ingresar al Portal del Socio →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: '#64748b', fontSize: 14,
      }}>
        <span>© 2026 Club Atlético Jorge Newbery. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="/portal" className="nav-link">Portal Socios</a>
          <a href="/portal/bookings" className="nav-link">Reservas</a>
          <a href="/tv" className="nav-link">Newbery TV</a>
          <a href="/login" className="nav-link">Ingresar</a>
        </div>
      </footer>
    </div>
  );
}
