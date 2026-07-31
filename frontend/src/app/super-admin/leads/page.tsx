'use client';
import { useState } from 'react';

const mockLeads = [
  {
    id: 'lead-001', clubName: 'Club Atlético Belgrano', contactName: 'Martín López',
    email: 'mlopez@belgrano.com', phone: '+54 9 11 1234-5678',
    country: 'Argentina', city: 'Córdoba', selectedPlan: 'PROFESSIONAL',
    status: 'NEW', source: 'LANDING', createdAt: '2026-07-21T10:30:00',
  },
  {
    id: 'lead-002', clubName: 'Club de Natación Mar del Plata', contactName: 'Ana Suárez',
    email: 'asuarez@natacionmdp.com.ar', phone: '+54 9 223 456-7890',
    country: 'Argentina', city: 'Mar del Plata', selectedPlan: 'STARTER',
    status: 'CONTACTED', source: 'LANDING', createdAt: '2026-07-20T14:00:00',
  },
  {
    id: 'lead-003', clubName: 'Sociedad Árabe Argentina de Deportes', contactName: 'Carlos Neme',
    email: 'cneme@saad.org.ar', phone: '+54 9 11 9876-5432',
    country: 'Argentina', city: 'Buenos Aires', selectedPlan: 'ENTERPRISE',
    status: 'TRIAL', source: 'REFERIDO', createdAt: '2026-07-18T09:15:00',
  },
];

const statusColors: Record<string, string> = {
  NEW: '#38bdf8', CONTACTED: '#f59e0b', TRIAL: '#8b5cf6', CONVERTED: '#10b981', LOST: '#ef4444',
};

const statusLabels: Record<string, string> = {
  NEW: 'Nuevo', CONTACTED: 'Contactado', TRIAL: 'En Trial', CONVERTED: 'Convertido', LOST: 'Perdido',
};

export default function SuperAdminLeads() {
  const [leads, setLeads] = useState(mockLeads);
  const [selected, setSelected] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState('');

  const updateStatus = (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setSelected(null);
  };

  const summary = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'NEW').length,
    trial: leads.filter((l) => l.status === 'TRIAL').length,
    converted: leads.filter((l) => l.status === 'CONVERTED').length,
  };

  return (
    <div style={{ color: '#e2e8f0' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>📋 CRM de Leads</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
          Interesados registrados desde la landing comercial
        </p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Leads', value: summary.total, color: '#6366f1' },
          { label: 'Nuevos', value: summary.new, color: '#38bdf8' },
          { label: 'En Trial', value: summary.trial, color: '#8b5cf6' },
          { label: 'Convertidos', value: summary.converted, color: '#10b981' },
        ].map((card) => (
          <div key={card.label} style={{
            background: 'rgba(30,41,59,0.6)', borderRadius: 12, padding: '18px 20px',
            border: `1px solid ${card.color}22`,
          }}>
            <div style={{ color: card.color, fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div style={{ background: 'rgba(15,23,42,0.8)', borderRadius: 16, border: '1px solid rgba(99,102,241,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
              {['Club', 'Contacto', 'Plan', 'Estado', 'Origen', 'Fecha', 'Acciones'].map((h) => (
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
            {leads.map((lead) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{lead.clubName}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{lead.city}, {lead.country}</div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{lead.contactName}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{lead.email}</div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    color: '#a5b4fc', background: 'rgba(99,102,241,0.15)',
                    padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  }}>
                    {lead.selectedPlan}
                  </span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    color: statusColors[lead.status],
                    background: `${statusColors[lead.status]}22`,
                    padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  }}>
                    {statusLabels[lead.status]}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b', fontSize: 12 }}>{lead.source}</td>
                <td style={{ padding: '16px 20px', color: '#64748b', fontSize: 12 }}>
                  {new Date(lead.createdAt).toLocaleDateString('es-AR')}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <select
                      value=""
                      onChange={(e) => { if (e.target.value) updateStatus(lead.id, e.target.value); }}
                      style={{
                        background: 'rgba(30,41,59,0.8)', color: '#94a3b8',
                        border: '1px solid rgba(99,102,241,0.2)', borderRadius: 6,
                        padding: '5px 8px', fontSize: 12, cursor: 'pointer',
                      }}
                    >
                      <option value="">Cambiar estado...</option>
                      {['NEW', 'CONTACTED', 'TRIAL', 'CONVERTED', 'LOST'].map((s) => (
                        <option key={s} value={s} style={{ background: '#1e293b' }}>{statusLabels[s]}</option>
                      ))}
                    </select>
                    <button style={{
                      background: 'rgba(16,185,129,0.1)', color: '#10b981',
                      border: '1px solid rgba(16,185,129,0.2)',
                      borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    }}
                      onClick={() => updateStatus(lead.id, 'CONVERTED')}
                    >
                      ✓ Convertir
                    </button>
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
