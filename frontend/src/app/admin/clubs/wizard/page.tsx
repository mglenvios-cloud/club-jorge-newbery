'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Image as ImageIcon,
  Palette,
  CreditCard,
  Blocks,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Globe,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  UploadCloud,
  Eye,
} from 'lucide-react';
import { SubscriptionPlan, CreateClubWizardInput } from '@club-digital-pro/shared';
import { useTenant } from '@/components/providers/TenantProvider';

const allModulesCatalog = [
  { code: 'SOCIOS', name: 'Gestión de Socios & Padrón', desc: 'Control de miembros, categorías, carnets digitales y estados.' },
  { code: 'FINANZAS', name: 'Tesorería & Cobros Online', desc: 'Cuotas sociales, facturación electrónica, pasarelas de pago.' },
  { code: 'DEPORTES', name: 'Gestión Deportiva & Canchas', desc: 'Reserva de turnos, disciplinas, profesores y fixtures.' },
  { code: 'MARKETING', name: 'Campañas & Mailer Masivo', desc: 'Comunicaciones masivas vía email y fidelización.' },
  { code: 'TV', name: 'Streaming Multi-Cámara TV', desc: 'Transmisiones en vivo de partidos y eventos.' },
  { code: 'RFID_ACCESO', name: 'Control de Molinetes & RFID', desc: 'Molinetes físicos y control de acceso peatonal en sedes.' },
];

export default function CompleteClubWizardPage() {
  const router = useRouter();
  const { updateBranding } = useTenant();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  // Form State across all 7 steps
  const [formData, setFormData] = useState<CreateClubWizardInput>({
    // Step 1: Basic Info
    name: '',
    shortName: '',
    slug: '',
    domain: '',
    subdomain: '',
    country: 'Argentina',
    province: 'Buenos Aires',
    city: 'CABA',
    address: 'Av. Libertador 1200',
    email: '',
    whatsapp: '+5491122334455',
    website: 'https://',

    // Step 2: Assets
    shieldUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
    bannerPrincipalUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&h=400&fit=crop',
    bannerLoginUrl: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1000&h=400&fit=crop',
    bannerDashboardUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&h=400&fit=crop',
    faviconUrl: '/favicon.ico',

    // Step 3: Colors
    primaryColor: '#2563eb',
    secondaryColor: '#0f172a',
    accentColor: '#38bdf8',
    backgroundColor: '#0b0f17',
    textColor: '#f8fafc',

    // Step 4: Plan
    plan: SubscriptionPlan.PROFESSIONAL,

    // Step 5: Modules
    modules: ['SOCIOS', 'FINANZAS', 'DEPORTES'],

    // Step 6: Admin User
    adminFirstName: 'Carlos',
    adminLastName: 'Gómez',
    adminEmail: 'admin@clubnuevo.com',
    adminPassword: 'PasswordSecret2026!',
  });

  // Auto generator for slug, subdomain, and domain
  const handleNameChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '-');
    setFormData((prev) => ({
      ...prev,
      name: val,
      shortName: prev.shortName || val.slice(0, 15),
      slug: generatedSlug,
      subdomain: generatedSlug,
      domain: `${generatedSlug}.clubdigitalpro.com`,
      adminEmail: prev.adminEmail || `admin@${generatedSlug}.com`,
    }));
  };

  // Live Theme Update for Step 3
  const handleColorChange = (key: keyof CreateClubWizardInput, color: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: color };
      if (key === 'primaryColor' || key === 'secondaryColor' || key === 'accentColor') {
        updateBranding({
          primaryColor: updated.primaryColor,
          secondaryColor: updated.secondaryColor,
          accentColor: updated.accentColor,
        });
      }
      return updated;
    });
  };

  const toggleModule = (code: string) => {
    setFormData((prev) => {
      const exists = prev.modules.includes(code);
      return {
        ...prev,
        modules: exists ? prev.modules.filter((m) => m !== code) : [...prev.modules, code],
      };
    });
  };

  const handleCreateClub = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate backend full initialization
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCreated(true);
      setTimeout(() => {
        router.push('/admin/clubs');
      }, 1800);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Alta Express de Institución SaaS (&lt; 5 Minutos)</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Club Wizard Completo</h1>
        <p className="text-slate-400 text-xs mt-1">
          Configure la identidad institucional, paleta cromática, plan comercial y administrador principal en 7 sencillos pasos.
        </p>
      </div>

      {/* 7-Step Navigation Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between overflow-x-auto gap-2">
        {[
          { num: 1, label: 'Datos', icon: Building2 },
          { num: 2, label: 'Identidad', icon: ImageIcon },
          { num: 3, label: 'Branding', icon: Palette },
          { num: 4, label: 'Plan', icon: CreditCard },
          { num: 5, label: 'Módulos', icon: Blocks },
          { num: 6, label: 'Admin', icon: UserCheck },
          { num: 7, label: 'Resumen', icon: CheckCircle2 },
        ].map((s) => {
          const Icon = s.icon;
          const active = step === s.num;
          const completed = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all shrink-0 ${
                active
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30'
                  : completed
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="w-5 h-5 rounded-lg flex items-center justify-center text-xs">
                {completed ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Multi-Step Form */}
      <form onSubmit={handleCreateClub} className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* PASO 1: DATOS DEL CLUB */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Building2 className="w-5 h-5 text-blue-400" />
              <h2 className="font-bold text-white text-base">Paso 1: Información & Contacto del Club</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre Oficial *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ej: Club Deportivo Central"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre Corto *</label>
                <input
                  type="text"
                  required
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  placeholder="Ej: Central"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Subdominio *</label>
                <input
                  type="text"
                  required
                  value={formData.subdomain}
                  onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Dominio Principal Asignado</label>
                <input
                  type="text"
                  required
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">País</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Provincia / Estado</label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Dirección Sede Principal</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email Oficial *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">WhatsApp / Teléfono</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* PASO 2: IDENTIDAD INSTITUCIONAL */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <ImageIcon className="w-5 h-5 text-sky-400" />
              <h2 className="font-bold text-white text-base">Paso 2: Identidad Institucional & Banners</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">URL Escudo Oficial</label>
                <input
                  type="text"
                  value={formData.shieldUrl}
                  onChange={(e) => setFormData({ ...formData, shieldUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">URL Logo de Marca</label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Banner Principal Landing</label>
                <input
                  type="text"
                  value={formData.bannerPrincipalUrl}
                  onChange={(e) => setFormData({ ...formData, bannerPrincipalUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Banner Pantalla de Login</label>
                <input
                  type="text"
                  value={formData.bannerLoginUrl}
                  onChange={(e) => setFormData({ ...formData, bannerLoginUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Favicon Icono Browser</label>
                <input
                  type="text"
                  value={formData.faviconUrl}
                  onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                />
              </div>
            </div>

            {/* Vista Previa Inmediata */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Vista Previa Inmediata de Assets</span>
              </span>

              <div className="flex items-center gap-6">
                {formData.shieldUrl && (
                  <div className="text-center space-y-1">
                    <img src={formData.shieldUrl} alt="Shield" className="w-16 h-16 object-cover rounded-xl border border-slate-700 shadow-md" />
                    <span className="text-[10px] text-slate-400">Escudo</span>
                  </div>
                )}
                {formData.bannerPrincipalUrl && (
                  <div className="flex-1 text-center space-y-1">
                    <img src={formData.bannerPrincipalUrl} alt="Banner" className="w-full h-16 object-cover rounded-xl border border-slate-700 shadow-md" />
                    <span className="text-[10px] text-slate-400">Banner Principal</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: BRANDING CROMÁTICO */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Palette className="w-5 h-5 text-emerald-400" />
              <h2 className="font-bold text-white text-base">Paso 3: Selector Visual de Colores (Branding)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Color Primario</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-slate-900 border border-slate-700"
                  />
                  <span className="font-mono text-xs text-white uppercase">{formData.primaryColor}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Color Secundario</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-slate-900 border border-slate-700"
                  />
                  <span className="font-mono text-xs text-white uppercase">{formData.secondaryColor}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Color de Acento</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-slate-900 border border-slate-700"
                  />
                  <span className="font-mono text-xs text-white uppercase">{formData.accentColor}</span>
                </div>
              </div>
            </div>

            {/* Preview Banner */}
            <div
              className="p-6 rounded-2xl border transition-all text-center space-y-2 shadow-xl"
              style={{
                backgroundColor: formData.secondaryColor,
                borderColor: formData.primaryColor,
              }}
            >
              <h3 className="font-black text-lg text-white">Prueba en Vivo del Dashboard del Club</h3>
              <p className="text-xs opacity-80" style={{ color: formData.accentColor }}>
                Así lucirá la interfaz institucional de {formData.name || 'su club'}.
              </p>
              <button
                type="button"
                className="px-6 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: formData.primaryColor }}
              >
                Botón Principal Personalizado
              </button>
            </div>
          </div>
        )}

        {/* PASO 4: SELECCIÓN DE PLAN */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <CreditCard className="w-5 h-5 text-purple-400" />
              <h2 className="font-bold text-white text-base">Paso 4: Plan Comercial SaaS & Comparación</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  plan: SubscriptionPlan.STARTER,
                  price: '$49',
                  desc: 'Clubes pequeños (< 500 socios).',
                  badge: 'Starter',
                },
                {
                  plan: SubscriptionPlan.PROFESSIONAL,
                  price: '$129',
                  desc: 'Socios ilimitados & branding completo.',
                  badge: 'Popular',
                },
                {
                  plan: SubscriptionPlan.ENTERPRISE,
                  price: '$299',
                  desc: 'Prioridad alta, SLA 99.9% & soporte.',
                  badge: 'Enterprise',
                },
                {
                  plan: 'WHITE_LABEL',
                  price: '$599',
                  desc: 'Dominio propio, app nativa & marca blanca.',
                  badge: 'White Label',
                },
              ].map((item) => (
                <button
                  key={item.plan}
                  type="button"
                  onClick={() => setFormData({ ...formData, plan: item.plan as any })}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    formData.plan === item.plan
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-xl shadow-blue-500/20 scale-105'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                      {item.badge}
                    </span>
                    <span className="font-black text-base text-white block mt-2">{item.plan}</span>
                    <span className="text-2xl font-black text-blue-400 my-1 block">{item.price}<span className="text-xs font-normal text-slate-400">/mo</span></span>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PASO 5: MÓDULOS ACTIVOS */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Blocks className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-white text-base">Paso 5: Módulos a Activar para la Institución</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allModulesCatalog.map((mod) => {
                const active = formData.modules.includes(mod.code);
                return (
                  <button
                    key={mod.code}
                    type="button"
                    onClick={() => toggleModule(mod.code)}
                    className={`p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                      active
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{mod.code}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{mod.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{mod.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-emerald-500 text-white' : 'bg-slate-800'}`}>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PASO 6: ADMINISTRADOR PRINCIPAL */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <UserCheck className="w-5 h-5 text-blue-400" />
              <h2 className="font-bold text-white text-base">Paso 6: Alta de Administrador Principal (TENANT_ADMIN)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre del Administrador *</label>
                <input
                  type="text"
                  required
                  value={formData.adminFirstName}
                  onChange={(e) => setFormData({ ...formData, adminFirstName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Apellido del Administrador *</label>
                <input
                  type="text"
                  required
                  value={formData.adminLastName}
                  onChange={(e) => setFormData({ ...formData, adminLastName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Email de Ingreso Institucional *</label>
                <input
                  type="email"
                  required
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Contraseña Inicial Asignada *</label>
                <input
                  type="password"
                  required
                  value={formData.adminPassword}
                  onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* PASO 7: RESUMEN & CONFIRMACIÓN */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="font-bold text-white text-base">Paso 7: Resumen del Registro de Club</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-blue-400 block">Identidad & Datos</span>
                <p className="text-white font-extrabold text-sm">{formData.name}</p>
                <p className="text-slate-400">Dominio: <span className="font-mono text-white">{formData.domain}</span></p>
                <p className="text-slate-400">Ubicación: {formData.city}, {formData.province}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-sky-400 block">Plan Comercial & Branding</span>
                <p className="text-white font-extrabold text-sm">{formData.plan}</p>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Colores:</span>
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.primaryColor }}></span>
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.secondaryColor }}></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">Administrador Designado</span>
                <p className="text-white font-bold">{formData.adminFirstName} {formData.adminLastName}</p>
                <p className="text-slate-400 font-mono">{formData.adminEmail}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block">Módulos a Habilitar ({formData.modules.length})</span>
                <div className="flex flex-wrap gap-1">
                  {formData.modules.map((m) => (
                    <span key={m} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Multi-Step Controls */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Paso Anterior</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 7 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-transform hover:scale-105"
            >
              <span>Siguiente Paso</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Creando Infraestructura del Club...' : isCreated ? '¡Club Creado con Éxito!' : 'CREAR CLUB'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
