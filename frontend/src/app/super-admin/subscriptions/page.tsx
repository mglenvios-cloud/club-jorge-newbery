'use client';
import { useState } from 'react';

const mockSubs = [
  {
    id: 'sub-001', tenantName: 'Club Atlético San Martín', plan: 'Enterprise',
    status: 'ACTIVE', amount: 75000, currency: 'ARS',
    startDate: '2026-01-15', nextBillingDate: '2026-08-15',
    paymentProvider: 'MERCADOPAGO', externalSubId: 'mp_sub_demo_001',
  },
  {
    id: 'sub-002', tenantName: 'Club Deportivo Rivadavia', plan: 'Professional',
    status: 'TRIAL', amount: 35000, currency: 'ARS',
    startDate: '2026-07-01', nextBillingDate: '2026-08-01',
    trialEndsAt: '2026-07-31', paymentProvider: 'MERCADOPAGO',
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: '#10b981', TRIAL: '#f59e0b', PAUSED: '#94a3b8',
  CANCELLED: '#ef4444', PAST_DUE: '#f97316',
};

export default function SuperAdminSubscriptions() {
  const [subs, setSubs] = useState(mockSubs);

  const updateStatus = (id: string, newStatus: string) => {
    setSubs((prev) => prev.map((s) => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <div style={{ color: '#e2e8f0' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>📋 Suscripciones SaaS</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
          {subs.length} suscripciones activas en la plataforma
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Suscripciones', value: subs.length, color: '#6366f1' },
          { label: 'Activas', value: subs.filter((s) => s.status === 'ACTIVE').length, color: '#10b981' },
          { label: 'En Trial', value: subs.filter((s) => s.status === 'TRIAL').length, color: '#f59e0b' },
          { label: 'MRR Total', value: `$${subs.reduce((a, b) => a + b.amount, 0).toLocaleString()}`, color: '#8b5cf6' },
        ].map((card) => (
          <div key={card.label} style={{
            background: 'rgba(30,41,59,0.6)',
            borderRadius: 12, padding: '18px 20px',
            border: `1px solid ${card.color}22`,
          }}>
            <div style={{ color: card.color, fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
              {card.value}
            </div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'rgba(15,23,42,0.8)', borderRadius: 16, border: '1px solid rgba(99,102,241,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
              {['Club', 'Plan', 'Estado', 'Monto', 'Próx. Factura', 'Proveedor', 'Acciones'].map((h) => (
                <th key={h} style={{
                  padding: '14px 20px', textAlign: 'left',
                  color: '#64748b', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subs.map((sub) => (
              <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '16px 20px', color: '#fff', fontWeight: 600, fontSize: 14 }}>
                  {sub.tenantName}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    color: '#a5b4fc', background: 'rgba(99,102,241,0.15)',
                    padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  }}>{sub.plan}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    color: statusColors[sub.status],
                    background: `${statusColors[sub.status]}22`,
                    padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  }}>
                    {sub.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 700, fontSize: 14 }}>
                  ${sub.amount.toLocaleString()} {sub.currency}
                </td>
                <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: 13 }}>
                  {sub.nextBillingDate}
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b', fontSize: 12 }}>
                  {sub.paymentProvider}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {sub.status === 'ACTIVE' && (
                      <button onClick={() => updateStatus(sub.id, 'PAUSED')} style={{
                        background: 'rgba(148,163,184,0.1)', color: '#94a3b8',
                        border: '1px solid rgba(148,163,184,0.2)',
                        borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 12,
                      }}>Pausar</button>
                    )}
                    {sub.status === 'PAUSED' && (
                      <button onClick={() => updateStatus(sub.id, 'ACTIVE')} style={{
                        background: 'rgba(16,185,129,0.1)', color: '#10b981',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 12,
                      }}>Reactivar</button>
                    )}
                    {sub.status === 'TRIAL' && (
                      <button onClick={() => updateStatus(sub.id, 'ACTIVE')} style={{
                        background: 'rgba(99,102,241,0.1)', color: '#a5b4fc',
                        border: '1px solid rgba(99,102,241,0.2)',
                        borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 12,
                      }}>Activar</button>
                    )}
                    <button onClick={() => updateStatus(sub.id, 'CANCELLED')} style={{
                      background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 12,
                    }}>Cancelar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
