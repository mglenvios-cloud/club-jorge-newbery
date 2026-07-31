import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactá con el equipo de Club Digital Pro. Asesoramiento sin compromiso para tu club.',
};

export default function ContactPage() {
  return (
    <div style={{ background: '#050a14', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', padding: '80px 40px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>Contactanos</h1>
          <p style={{ color: '#94a3b8', fontSize: 18 }}>
            Nuestro equipo está disponible para asesorarte sin compromiso.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Contact Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { icon: '📧', title: 'Email', value: 'hola@clubdigitalpro.com' },
                { icon: '💬', title: 'WhatsApp', value: '+54 9 11 XXXX XXXX' },
                { icon: '🌐', title: 'Web', value: 'www.clubdigitalpro.com' },
                { icon: '🕐', title: 'Horario de atención', value: 'Lun-Vie 9:00–18:00 (Argentina)' },
              ].map((item) => (
                <div key={item.title} style={{
                  background: 'rgba(15,23,42,0.9)', borderRadius: 14, padding: '20px 24px',
                  border: '1px solid rgba(99,102,241,0.12)',
                  display: 'flex', gap: 16, alignItems: 'center',
                }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'rgba(15,23,42,0.9)', borderRadius: 16, padding: 32, border: '1px solid rgba(99,102,241,0.12)' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nombre *</label>
                <input type="text" placeholder="Tu nombre completo" style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(30,41,59,0.8)',
                  border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, color: '#fff', fontSize: 14,
                  outline: 'none', boxSizing: 'border-box',
                }} />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Email *</label>
                <input type="email" placeholder="tu@email.com" style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(30,41,59,0.8)',
                  border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, color: '#fff', fontSize: 14,
                  outline: 'none', boxSizing: 'border-box',
                }} />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Mensaje *</label>
                <textarea rows={4} placeholder="Contanos sobre tu club y cómo podemos ayudarte..." style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(30,41,59,0.8)',
                  border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, color: '#fff', fontSize: 14,
                  outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                }} />
              </div>
              <button type="submit" style={{
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff', border: 'none', borderRadius: 10,
                padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
              }}>
                Enviar mensaje →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
