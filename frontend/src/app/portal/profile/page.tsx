'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, ShieldCheck, Check } from 'lucide-react';
import UniversalMediaUploader from '@/components/common/UniversalMediaUploader';

export default function MemberProfilePage() {
  const [email, setEmail] = useState('santiago.alvarez@email.com');
  const [phone, setPhone] = useState('+54 9 11 3344-5566');
  const [address, setAddress] = useState('Av. Libertador 2200, 8A');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop');

  // Emergency contact
  const [emergencyName, setEmergencyName] = useState('María Álvarez');
  const [emergencyRelationship, setEmergencyRelationship] = useState('Esposa');
  const [emergencyPhone, setEmergencyPhone] = useState('+54 9 11 8877-6655');

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cjp_member_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.avatarUrl) setAvatarUrl(parsed.avatarUrl);
        if (parsed.emergencyName) setEmergencyName(parsed.emergencyName);
        if (parsed.emergencyRelationship) setEmergencyRelationship(parsed.emergencyRelationship);
        if (parsed.emergencyPhone) setEmergencyPhone(parsed.emergencyPhone);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = {
      email,
      phone,
      address,
      avatarUrl,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
    };
    try {
      localStorage.setItem('cjp_member_profile', JSON.stringify(profile));
    } catch {}

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Mi Perfil de Socio</h1>
        <p className="text-slate-400 text-xs mt-1">Actualice sus datos de contacto y persona responsable en caso de emergencias.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Información de Contacto</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Teléfono Móvil</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Dirección de Domicilio</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <UniversalMediaUploader
                value={avatarUrl}
                onChange={setAvatarUrl}
                label="Fotografía de Perfil (Subir de PC / Pegar URL / Biblioteca)"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-sky-400 text-sm border-b border-slate-800 pb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Contacto de Emergencia</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nombre del Contacto</label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Vínculo / Parentesco</label>
              <input
                type="text"
                value={emergencyRelationship}
                onChange={(e) => setEmergencyRelationship(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Teléfono de Emergencia</label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {saved ? (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>¡Perfil actualizado con éxito!</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500">Sus datos se guardan de forma segura.</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </form>
    </div>
  );
}
