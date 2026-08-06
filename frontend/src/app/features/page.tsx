import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funcionalidades',
  description: 'Todas las funcionalidades de la plataforma: Socios, Finanzas, Deportes, Club TV, Media Center IA, App Mobile y más.',
};

const categories = [
  {
    title: 'Centro de Socios & Carnet Digital', icon: '👥', color: '#10b981',
    features: [
      'Padrón completo de afiliados', 'Carnet Digital con QR dinámico', 'Categorías y estados de morosidad',
      'Gestión de tutores y familias', 'Búsquedas y filtros avanzados', 'Exportación a Excel / PDF',
      'Auditoría de cambios', 'Fotos de perfil', 'Portal del socio web',
    ],
  },
  {
    title: 'Finance Pro — Tesorería & Finanzas', icon: '💰', color: '#6366f1',
    features: [
      'Cuotas sociales automáticas', 'Cobranza online con Mercado Pago', 'Tesorería y libro diario',
      'Ingresos y gastos categorizados', 'Caja diaria apertura/cierre', 'Facturación electrónica',
      'Reportes y gráficos financieros', 'Exportación contable', 'Historial de pagos',
    ],
  },
  {
    title: 'Gestión Deportiva', icon: '🏆', color: '#f59e0b',
    features: [
      'Disciplinas ilimitadas', 'Categorías y edades', 'Planteles y cuerpo técnico',
      'Partidos y fixture', 'Estadísticas de jugadores', 'Planillas de entrenamientos',
      'Convocatorias', 'Control médico y aptitudes', 'Historial completo',
    ],
  },
  {
    title: 'Club TV & Streaming', icon: '📺', color: '#8b5cf6',
    features: [
      'Transmisión en vivo (YouTube, Vimeo, RTMP)', 'Videoteca por categoría', 'Programación de contenido',
      'Banners de sponsors', 'Estadísticas de visualizaciones', 'Player embebido',
      'Transmisiones programadas', 'OBS Studio compatible', 'Canal en vivo del club',
    ],
  },
  {
    title: 'Media Center + IA', icon: '🤖', color: '#ec4899',
    features: [
      'Generación de noticias con IA', 'Galería multimedia', 'Gestión documental',
      'Historial institucional', 'Videos y fotos organizadas', 'Etiquetado automático',
      'Contenido por disciplina', 'Publicación multicanal', 'Analytics de contenido',
    ],
  },
  {
    title: 'App Móvil para Socios', icon: '📱', color: '#38bdf8',
    features: [
      'Dashboard del socio', 'Carnet digital en el celular', 'Pago de cuotas online',
      'Club TV en el móvil', 'Noticias y novedades', 'Agenda deportiva',
      'Modo familia', 'Perfil y configuración', 'Notificaciones push',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div style={{ background: '#050a14', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', padding: '80px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>Funcionalidades</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
          Todo lo que necesita tu club en una sola plataforma, integrada y multi-tenant.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {categories.map((cat) => (
          <div key={cat.title} style={{
            background: 'rgba(15,23,42,0.9)', borderRadius: 20, padding: 32,
            border: `1px solid ${cat.color}22`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${cat.color}1a`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>
                {cat.icon}
              </div>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: 0 }}>{cat.title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {cat.features.map((f) => (
                <div key={f} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  color: '#cbd5e1', fontSize: 14,
                }}>
                  <span style={{ color: cat.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <a href="/register-club" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', textDecoration: 'none',
          padding: '16px 40px', borderRadius: 12, fontWeight: 700, fontSize: 18,
          boxShadow: '0 0 40px rgba(99,102,241,0.3)',
        }}>
          Probar todo gratis por 14 días →
        </a>
      </div>
    </div>
  );
}
