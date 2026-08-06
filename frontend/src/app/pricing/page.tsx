import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cuotas Sociales y Categorías',
  description: 'Categorías de afiliados y cuotas sociales del Club Atlético Jorge Newbery. Acceso a instalaciones, carnet digital y disciplinas deportivas.',
};

const memberCategories = [
  {
    id: 'cat-001', name: 'Socio Activo', price: 12000, highlighted: true,
    description: 'Para mayores de 18 años con pleno acceso a las instalaciones y voz en asambleas.',
    features: ['Carnet Digital con QR dinámico', 'Acceso a instalaciones deportivas', 'Reserva de canchas y gimnasio', 'Descuento en entradas de partidos', 'Acceso a Club TV'],
    color: '#0055a5',
  },
  {
    id: 'cat-002', name: 'Socio Cadete', price: 8500, highlighted: false,
    description: 'Jóvenes de 12 a 17 años integrados a las actividades deportivas y recreativas.',
    features: ['Carnet Digital QR', 'Participación en torneos de El Semillero', 'Acceso a entrenamientos y disciplinas', 'Uso de áreas sociales'],
    color: '#3b82f6',
  },
  {
    id: 'cat-003', name: 'Socio Infantil', price: 6000, highlighted: false,
    description: 'Niños de hasta 11 años inscritos en las escuelitas deportivas del club.',
    features: ['Carnet Digital infantil', 'Inscripción a escuelitas formativas', 'Acceso a actividades recreativas', 'Carnet vinculado al grupo familiar'],
    color: '#10b981',
  },
  {
    id: 'cat-004', name: 'Grupo Familiar', price: 28000, highlighted: false,
    description: 'Plan integral para titular, cónyuge e hijos menores de 18 años con beneficios exclusivos.',
    features: ['Carnets individuales para todos los integrantes', 'Descuento en alquiler de instalaciones', 'Acceso prioritario a eventos institucionales', 'Descuentos en indumentaria oficial'],
    color: '#8b5cf6',
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: '#050a14', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', padding: '80px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,85,165,0.15)', border: '1px solid rgba(0,85,165,0.35)',
          borderRadius: 100, padding: '6px 22px', marginBottom: 20,
          color: '#93c5fd', fontSize: 14, fontWeight: 700,
        }}>
          ⚽ Club Atlético Jorge Newbery — Villa Devoto
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Categorías y Cuotas Sociales
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
          Sumate a la gran familia del Club Atlético Jorge Newbery. Asociate de forma digital y disfrutá de todas nuestras instalaciones y disciplinas.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
        {memberCategories.map((plan) => (
          <div key={plan.id} style={{
            background: plan.highlighted ? `linear-gradient(180deg,rgba(0,85,165,0.2) 0%,rgba(15,23,42,0.95) 30%)` : 'rgba(15,23,42,0.9)',
            borderRadius: 20, padding: 28,
            border: `1px solid ${plan.highlighted ? plan.color : 'rgba(255,255,255,0.08)'}`,
            position: 'relative',
          }}>
            {plan.highlighted && (
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg,#0055a5,#003366)',
                color: '#fff', padding: '5px 20px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>
                CATEGORÍA PRINCIPAL
              </div>
            )}

            <h2 style={{ color: plan.color, fontWeight: 800, fontSize: 22, margin: '0 0 8px' }}>{plan.name}</h2>
            <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 20px', lineHeight: 1.5 }}>{plan.description}</p>

            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: '#fff' }}>${plan.price.toLocaleString()}</span>
              <span style={{ color: '#64748b', fontSize: 14 }}> ARS/mes</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
              {plan.features.map((f) => (
                <li key={f} style={{
                  padding: '8px 0', color: '#cbd5e1', fontSize: 13,
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ color: plan.color, flexShrink: 0, fontWeight: 700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/portal" style={{
              display: 'block', textAlign: 'center', textDecoration: 'none',
              background: plan.highlighted ? `linear-gradient(135deg,#0055a5,#003366)` : `${plan.color}22`,
              color: plan.highlighted ? '#fff' : plan.color,
              border: `1px solid ${plan.color}44`,
              padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 15,
            }}>
              Asociarse →
            </Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 60, color: '#64748b' }}>
        <p style={{ fontSize: 15 }}>
          ¿Consultas sobre inscripciones o secretaría? <Link href="/contact" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Contactá a Administración</Link>
        </p>
      </div>
    </div>
  );
}
