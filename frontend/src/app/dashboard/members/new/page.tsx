'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, ArrowLeft, Save, CheckCircle2, ShieldCheck, Camera } from 'lucide-react';
import { MemberCategory, MemberStatus, CreateMemberInput } from '@club-digital-pro/shared';
import UniversalMediaUploader from '@/components/common/UniversalMediaUploader';

export default function CreateMemberPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateMemberInput>({
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
    birthDate: '1998-06-15',
    gender: 'Masculino',
    address: 'Av. Libertador 1500',
    city: 'Buenos Aires',
    category: 'ACTIVO',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    tutorInfo: {
      name: '',
      relationship: 'Padre',
      dni: '',
      phone: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard/members');
    }, 1200);
  };

  const isMinorCategory = formData.category === 'INFANTIL' || formData.category === 'CADETE';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Alta de Nuevo Socio</h1>
          <p className="text-slate-400 text-xs mt-1">Ingrese los datos personales, categoría y tutor si corresponde.</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Padrón</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Información Personal</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nombre *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Apellido *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">DNI / Documento *</label>
              <input
                type="text"
                required
                value={formData.dni}
                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Fecha de Nacimiento *</label>
              <input
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Correo Electrónico</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Teléfono Movil</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Category & Status */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Categoría Institucional & Fotografía</h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Categoría del Socio *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MemberCategory })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
              >
                <option value="ACTIVO">Activo (Mayor de 18 años)</option>
                <option value="CADETE">Cadete (14 a 17 años)</option>
                <option value="INFANTIL">Infantil (Menor de 14 años)</option>
                <option value="VITALICIO">Vitalicio</option>
                <option value="HONORARIO">Honorario</option>
                <option value="FAMILIAR">Grupo Familiar</option>
              </select>
            </div>

            <UniversalMediaUploader
              value={formData.avatarUrl || ''}
              onChange={(newUrl) => setFormData({ ...formData, avatarUrl: newUrl })}
              label="Fotografía para Carnet Digital (Subir de PC / Pegar URL / Biblioteca)"
            />
          </div>
        </div>

        {/* Tutor Details (conditional for minors) */}
        {isMinorCategory && (
          <div className="space-y-4 p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20">
            <h3 className="font-bold text-blue-400 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Datos del Tutor / Responsable Legal</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre Completo del Tutor</label>
                <input
                  type="text"
                  value={formData.tutorInfo?.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tutorInfo: { ...formData.tutorInfo!, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Vínculo / Parentesco</label>
                <select
                  value={formData.tutorInfo?.relationship}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tutorInfo: { ...formData.tutorInfo!, relationship: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                >
                  <option value="Padre">Padre</option>
                  <option value="Madre">Madre</option>
                  <option value="Tutor Legal">Tutor Legal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">DNI del Tutor</label>
                <input
                  type="text"
                  value={formData.tutorInfo?.dni}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tutorInfo: { ...formData.tutorInfo!, dni: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Teléfono Urgencia del Tutor</label>
                <input
                  type="text"
                  value={formData.tutorInfo?.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tutorInfo: { ...formData.tutorInfo!, phone: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Footer Action */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Registrando Socio...' : 'Guardar y Emitir Carnet Digital'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
