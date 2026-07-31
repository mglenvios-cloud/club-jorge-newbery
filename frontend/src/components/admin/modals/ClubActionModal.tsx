'use client';

import React, { useState } from 'react';
import { X, Building2, CreditCard, Palette, Blocks, UserCheck, ShieldAlert, Check } from 'lucide-react';
import { ClubTenantOverview, SubscriptionPlan, TenantStatus } from '@club-digital-pro/shared';

type ActionType = 'EDIT' | 'PLAN' | 'BRANDING' | 'MODULES' | 'STATUS' | 'IMPERSONATE' | null;

interface ClubActionModalProps {
  club: ClubTenantOverview | null;
  actionType: ActionType;
  onClose: () => void;
  onSuccess: (updatedClub: Partial<ClubTenantOverview>) => void;
}

const availableModulesList = [
  { code: 'SOCIOS', name: 'Gestión Integral de Socios & Carnets' },
  { code: 'FINANZAS', name: 'Tesorería, Cuotas & Cobros Online' },
  { code: 'DEPORTES', name: 'Gestión Deportiva & Canchas' },
  { code: 'MARKETING', name: 'Campañas de E-Mail & Comunicados' },
  { code: 'TV', name: 'Streaming & Eventos en Vivo' },
  { code: 'RFID_ACCESO', name: 'Control de Molinetes & RFID' },
];

export function ClubActionModal({ club, actionType, onClose, onSuccess }: ClubActionModalProps) {
  if (!club || !actionType) return null;

  // Local state for actions
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | 'WHITE_LABEL'>(club.plan);
  const [primaryColor, setPrimaryColor] = useState(club.branding?.primaryColor || '#2563eb');
  const [secondaryColor, setSecondaryColor] = useState(club.branding?.secondaryColor || '#0f172a');
  const [selectedModules, setSelectedModules] = useState<string[]>(club.activeModules || []);
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);

  const toggleModule = (code: string) => {
    if (selectedModules.includes(code)) {
      setSelectedModules(selectedModules.filter((m) => m !== code));
    } else {
      setSelectedModules([...selectedModules, code]);
    }
  };

  const handleSave = () => {
    let payload: Partial<ClubTenantOverview> = {};

    if (actionType === 'PLAN') {
      payload = { plan: selectedPlan };
    } else if (actionType === 'BRANDING') {
      payload = {
        branding: {
          ...club.branding,
          primaryColor,
          secondaryColor,
        },
      };
    } else if (actionType === 'MODULES') {
      payload = { activeModules: selectedModules };
    } else if (actionType === 'STATUS') {
      payload = {
        status: club.status === TenantStatus.ACTIVE ? TenantStatus.SUSPENDED : TenantStatus.ACTIVE,
      };
    }

    setIsSuccessMsg(true);
    setTimeout(() => {
      onSuccess(payload);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-extrabold text-white text-base">{club.name}</h3>
              <p className="text-[10px] text-slate-400 font-mono">ID: {club.id} | Slug: {club.slug}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Type: PLAN */}
        {actionType === 'PLAN' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>Cambiar Plan Comercial SaaS</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[SubscriptionPlan.STARTER, SubscriptionPlan.PROFESSIONAL, SubscriptionPlan.ENTERPRISE, 'WHITE_LABEL' as const].map((plan) => (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selectedPlan === plan
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-xs">{plan}</span>
                  {selectedPlan === plan && <Check className="w-4 h-4 text-blue-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Type: BRANDING */}
        {actionType === 'BRANDING' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Palette className="w-4 h-4 text-sky-400" />
              <span>Personalizar Paleta del Club</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-300">Color Primario</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-slate-950 border border-slate-800"
                  />
                  <span className="text-xs font-mono text-slate-400">{primaryColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300">Color Secundario</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-slate-950 border border-slate-800"
                  />
                  <span className="text-xs font-mono text-slate-400">{secondaryColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Type: MODULES */}
        {actionType === 'MODULES' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Blocks className="w-4 h-4 text-emerald-400" />
              <span>Activar / Desactivar Módulos para este Club</span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableModulesList.map((mod) => {
                const active = selectedModules.includes(mod.code);
                return (
                  <button
                    key={mod.code}
                    type="button"
                    onClick={() => toggleModule(mod.code)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      active
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block text-white">{mod.code}</span>
                      <span className="text-[10px] text-slate-400">{mod.name}</span>
                    </div>
                    {active && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Type: STATUS */}
        {actionType === 'STATUS' && (
          <div className="space-y-4 text-center py-4">
            <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">
              ¿Desea {club.status === TenantStatus.ACTIVE ? 'Suspender' : 'Reactivar'} este Club?
            </h4>
            <p className="text-xs text-slate-400">
              {club.status === TenantStatus.ACTIVE
                ? 'El acceso de los administradores y socios quedará restringido temporalmente.'
                : 'Se restablecerá el acceso inmediato a la consola del club.'}
            </p>
          </div>
        )}

        {/* Action Type: IMPERSONATE */}
        {actionType === 'IMPERSONATE' && (
          <div className="space-y-4 text-center py-4">
            <UserCheck className="w-12 h-12 text-blue-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Modo Impersonate Administrador</h4>
            <p className="text-xs text-slate-400">
              Ingresará a la consola del club <strong className="text-white">{club.name}</strong> con privilegios de Administrador Institucional.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            {isSuccessMsg ? <Check className="w-4 h-4" /> : null}
            <span>{isSuccessMsg ? 'Aplicado' : 'Confirmar Cambios'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
