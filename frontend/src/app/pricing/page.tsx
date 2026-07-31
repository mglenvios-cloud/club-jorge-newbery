import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planes y Precios',
  description: 'Elegí el plan ideal para tu club. Desde Starter hasta Enterprise y White Label. 14 días de prueba gratuita.',
};

const plans = [
  {
    id: 'plan-001', name: 'Starter', price: 15000, highlighted: false,
    description: 'Ideal para clubes pequeños que comienzan su digitalización.',
    features: ['Hasta 200 socios', 'Portal web del socio', 'Carnet Digital QR', 'Soporte por email'],
    modules: ['Socios', 'Portal del Socio'],
    color: '#64748b',
  },
  {
    id: 'plan-002', name: 'Professional', price: 35000, highlighted: true,
    description: 'Solución completa para clubes medianos con todas las herramientas esenciales.',
    features: ['Hasta 1.000 socios', 'Finance Pro + Cuotas', 'Gestión Deportiva', 'Club TV Streaming', 'Portal del Socio', 'Soporte prioritario'],
    modules: ['Socios', 'Finanzas', 'Deportes', 'Portal', 'Club TV'],
    color: '#6366f1',
  },
  {
    id: 'plan-003', name: 'Enterprise', price: 75000, highlighted: false,
    description: 'Para grandes instituciones con todos los módulos y soporte dedicado.',
    features: ['Hasta 10.000 socios', 'Todos los módulos', 'Media Center + IA', 'App Móvil nativa', 'Marketing masivo', 'Soporte dedicado 24/7'],
    modules: ['Socios', 'Finanzas', 'Deportes', 'Portal', 'TV', 'Media Center IA', 'Marketing', 'Mobile App'],
    color: '#8b5cf6',
  },
  {
    id: 'plan-004', name: 'White Label', price: 150000, highlighted: false,
    description: 'Plataforma completa con marca propia y dominio exclusivo.',
    features: ['Socios ilimitados', 'Storage ilimitado', 'Dominio y marca propios', 'Control RFID', 'Liga Pro Studio', 'CRM completo'],
    modules: ['Todo + CRM + RFID + Liga Pro'],
    color: '#ec4899',
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: '#050a14', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', padding: '80px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 100, padding: '6px 20px', marginBottom: 20,
          color: '#a5b4fc', fontSize: 14, fontWeight: 600,
        }}>
          14 días de prueba gratuita en todos los planes
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>
          Planes y Precios
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 18 }}>
          Sin permanencia. Cancelá cuando quieras. Soporte en español.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
        {plans.map((plan) => (
          <div key={plan.id} style={{
            background: plan.highlighted ? `linear-gradient(180deg,rgba(99,102,241,0.15) 0%,rgba(15,23,42,0.95) 30%)` : 'rgba(15,23,42,0.9)',
            borderRadius: 20, padding: 28,
            border: `1px solid ${plan.highlighted ? plan.color : 'rgba(255,255,255,0.08)'}`,
            position: 'relative',
          }}>
            {plan.highlighted && (
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff', padding: '5px 20px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>
                MÁS POPULAR
              </div>
            )}

            <h2 style={{ color: plan.color, fontWeight: 800, fontSize: 22, margin: '0 0 8px' }}>{plan.name}</h2>
            <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 20px', lineHeight: 1.5 }}>{plan.description}</p>

            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 40, fontWeight: 900, color: '#fff' }}>${plan.price.toLocaleString()}</span>
              <span style={{ color: '#64748b', fontSize: 14 }}> ARS/mes</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
              {plan.features.map((f) => (
                <li key={f} style={{
                  padding: '8px 0', color: '#cbd5e1', fontSize: 14,
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ color: plan.color, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href="/register-club" style={{
              display: 'block', textAlign: 'center', textDecoration: 'none',
              background: plan.highlighted ? `linear-gradient(135deg,#6366f1,#8b5cf6)` : `${plan.color}22`,
              color: plan.highlighted ? '#fff' : plan.color,
              border: `1px solid ${plan.color}44`,
              padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 15,
            }}>
              Empezar con {plan.name} →
            </a>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 60, color: '#64748b' }}>
        <p style={{ fontSize: 15 }}>
          ¿Tenés dudas? <a href="/contact" style={{ color: '#a5b4fc', textDecoration: 'none' }}>Contactanos</a> y te asesoramos sin compromiso.
        </p>
      </div>
    </div>
  );
}
