'use client';
import { useState } from 'react';

const mockPlans = [
  {
    id: 'plan-001', name: 'Starter', price: 15000, billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'PORTAL_SOCIO'], maxMembers: 200, maxStorage: 5,
    supportLevel: 'EMAIL', active: true, highlighted: false, clubs: 0,
    description: 'Ideal para clubes pequeños que comienzan su digitalización.',
  },
  {
    id: 'plan-002', name: 'Professional', price: 35000, billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV'],
    maxMembers: 1000, maxStorage: 50,
    supportLevel: 'PRIORITY_EMAIL', active: true, highlighted: true, clubs: 1,
    description: 'Solución completa para clubes medianos con todas las herramientas esenciales.',
  },
  {
    id: 'plan-003', name: 'Enterprise', price: 75000, billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV', 'MEDIA_CENTER', 'MARKETING', 'MOBILE'],
    maxMembers: 10000, maxStorage: 500,
    supportLevel: 'DEDICATED', active: true, highlighted: false, clubs: 1,
    description: 'Para grandes instituciones que requieren todos los módulos y soporte dedicado.',
  },
  {
    id: 'plan-004', name: 'White Label', price: 150000, billingPeriod: 'MONTHLY',
    modules: ['SOCIOS', 'FINANZAS', 'DEPORTES', 'PORTAL_SOCIO', 'TV', 'MEDIA_CENTER', 'MARKETING', 'MOBILE', 'LIGA_PRO', 'CRM', 'RFID_ACCESO'],
    maxMembers: -1, maxStorage: -1,
    supportLevel: 'WHITE_GLOVE', active: true, highlighted: false, clubs: 0,
    description: 'Plataforma completa con marca propia y dominio exclusivo para revendedores.',
  },
];

const planAccentColors = ['#64748b', '#6366f1', '#8b5cf6', '#ec4899'];

export default function SuperAdminPlans() {
  const [plans] = useState(mockPlans);

  return (
    <div style={{ color: '#e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>💎 Planes SaaS</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
            Configurar planes de suscripción de la plataforma
          </p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', border: 'none', borderRadius: 10,
          padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
        }}>
          + Nuevo Plan
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {plans.map((plan, idx) => (
          <div key={plan.id} style={{
            background: 'rgba(15,23,42,0.9)',
            borderRadius: 20,
            padding: 28,
            border: `1px solid ${planAccentColors[idx]}44`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {plan.highlighted && (
              <div style={{
                position: 'absolute', top: 16, right: 16,
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff', fontSize: 10, fontWeight: 700,
                padding: '3px 10px', borderRadius: 20,
              }}>
                POPULAR
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <h2 style={{ color: planAccentColors[idx], fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>
                {plan.name}
              </h2>
              <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>{plan.description}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <span style={{ color: '#fff', fontSize: 36, fontWeight: 800 }}>
                ${plan.price.toLocaleString()}
              </span>
              <span style={{ color: '#64748b', fontSize: 14 }}> ARS/mes</span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {plan.modules.map((m) => (
                  <span key={m} style={{
                    background: `${planAccentColors[idx]}18`,
                    color: planAccentColors[idx],
                    padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                  }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: 'rgba(30,41,59,0.5)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
                  {plan.maxMembers === -1 ? '∞' : plan.maxMembers.toLocaleString()}
                </div>
                <div style={{ color: '#64748b', fontSize: 11 }}>Socios</div>
              </div>
              <div style={{ background: 'rgba(30,41,59,0.5)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
                  {plan.maxStorage === -1 ? '∞' : `${plan.maxStorage}GB`}
                </div>
                <div style={{ color: '#64748b', fontSize: 11 }}>Storage</div>
              </div>
              <div style={{ background: 'rgba(30,41,59,0.5)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: 14 }}>{plan.clubs}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>Clubes</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                flex: 1, background: `${planAccentColors[idx]}22`,
                color: planAccentColors[idx], border: `1px solid ${planAccentColors[idx]}44`,
                borderRadius: 8, padding: '8px', cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>
                ✏️ Editar
              </button>
              <button style={{
                background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13,
              }}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
