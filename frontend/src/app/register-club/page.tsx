'use client';
import { useState } from 'react';
import Link from 'next/link';

const plans = [
  { id: 'STARTER', name: 'Starter', price: 15000 },
  { id: 'PROFESSIONAL', name: 'Professional', price: 35000 },
  { id: 'ENTERPRISE', name: 'Enterprise', price: 75000 },
  { id: 'WHITE_LABEL', name: 'White Label', price: 150000 },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function RegisterClubPage() {
  const [form, setForm] = useState({
    clubName: '', contactName: '', email: '', phone: '',
    country: 'Argentina', city: '', selectedPlan: 'PROFESSIONAL',
  });
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    setError('');

    try {
      const res = await fetch('/api/onboarding/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error || 'Error al registrar.'); setState('error'); return; }
      setState('success');
    } catch {
      setError('Error de conexión. Intentá nuevamente.');
      setState('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(30,41,59,0.8)',
    border: '1px solid rgba(99,102,241,0.2)',
    borderRadius: 10, color: '#fff', fontSize: 15,
    outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    color: '#94a3b8', fontSize: 13, fontWeight: 600,
    display: 'block', marginBottom: 6,
  };

  if (state === 'success') {
    return (
      <div style={{ background: '#050a14', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
          <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
            ¡Solicitud recibida!
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
            Recibimos los datos de <strong style={{ color: '#fff' }}>{form.clubName}</strong>. Nuestro equipo se contactará dentro de las próximas 24 horas hábiles para activar tu período de prueba gratuito.
          </p>
          <Link href="/" style={{
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff', textDecoration: 'none',
            padding: '12px 28px', borderRadius: 10, fontWeight: 600,
          }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#050a14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#e2e8f0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
        {/* Left — Branding */}
        <div style={{
          background: 'linear-gradient(160deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)',
          padding: '60px 56px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderRight: '1px solid rgba(99,102,241,0.15)',
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <span style={{ background: 'linear-gradient(135deg,#0055a5,#003366)', borderRadius: 10, padding: '6px 10px', fontWeight: 800, color: '#fff', fontSize: 16 }}>⚽</span>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Club Atlético Jorge Newbery</span>
          </Link>

          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
            Registrá tu club en minutos
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            Completá el formulario y en las próximas 24 horas tendrás acceso completo a tu instancia con 14 días de prueba gratuita.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              '✅ 14 días de prueba gratis',
              '✅ Sin tarjeta de crédito',
              '✅ Configuración personalizada',
              '✅ Soporte en español',
              '✅ Cancelá cuando quieras',
            ].map((item) => (
              <div key={item} style={{ color: '#cbd5e1', fontSize: 15 }}>{item}</div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div style={{ padding: '60px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>Solicitar acceso</h2>
          <p style={{ color: '#64748b', margin: '0 0 32px', fontSize: 15 }}>Completá los datos de tu club para comenzar.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Nombre del club *</label>
                <input
                  type="text" required
                  placeholder="ej: Club Atlético Independiente"
                  value={form.clubName}
                  onChange={(e) => setForm((f) => ({ ...f, clubName: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Nombre y apellido del responsable *</label>
                <input
                  type="text" required
                  placeholder="ej: Juan García"
                  value={form.contactName}
                  onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email" required
                    placeholder="admin@miclub.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp / Teléfono</label>
                  <input
                    type="text"
                    placeholder="+54 9 11 XXXX XXXX"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>País</label>
                  <input
                    type="text" value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Ciudad</label>
                  <input
                    type="text" placeholder="ej: Buenos Aires"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Plan de interés *</label>
                <select
                  value={form.selectedPlan}
                  onChange={(e) => setForm((f) => ({ ...f, selectedPlan: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id} style={{ background: '#1e293b' }}>
                      {p.name} — ${p.price.toLocaleString()} ARS/mes
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', color: '#ef4444', fontSize: 14 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={state === 'submitting'}
                style={{
                  width: '100%',
                  background: state === 'submitting' ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff', border: 'none', borderRadius: 10,
                  padding: '14px', fontWeight: 700, fontSize: 16, cursor: state === 'submitting' ? 'not-allowed' : 'pointer',
                }}
              >
                {state === 'submitting' ? 'Enviando...' : 'Solicitar acceso gratuito →'}
              </button>

              <p style={{ color: '#64748b', fontSize: 13, textAlign: 'center', margin: 0 }}>
                Al registrarte aceptás los <a href="/terms" style={{ color: '#a5b4fc', textDecoration: 'none' }}>Términos y Condiciones</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
