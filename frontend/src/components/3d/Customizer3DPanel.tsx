'use client';

import React, { useRef } from 'react';
import {
  Palette,
  Upload,
  Link as LinkIcon,
  Shield,
  Circle,
  Trophy,
  Sparkles,
  X,
  Check,
  Building2,
  Hexagon,
  Square,
  Star,
  Award,
  Diamond,
  Type,
  Users,
  Sliders,
} from 'lucide-react';
import { PRESET_CLUBS, TeamConfig } from '@/config/teamPresets';

export type MainObject3DType = 'ball' | 'shield' | 'trophy' | 'stadium';

export type ShieldShape3DType =
  | 'classic'
  | 'round'
  | 'crest'
  | 'diamond'
  | 'octagon'
  | 'hexagon'
  | 'star'
  | 'badge';

interface Customizer3DPanelProps {
  isOpen: boolean;
  onClose: () => void;

  // Active Multi-Team State
  activeTeamId?: 'team1' | 'team2';
  onSelectActiveTeam?: (teamId: 'team1' | 'team2') => void;
  team1Config?: TeamConfig;
  team2Config?: TeamConfig;
  onUpdateTeamConfig?: (teamId: 'team1' | 'team2', updated: Partial<TeamConfig>) => void;
  onSelectPresetClub?: (preset: TeamConfig) => void;

  // Active Direct Controls (Fallback / Current Selected Team)
  teamName?: string;
  onTeamNameChange?: (name: string) => void;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
  selectedObject: MainObject3DType;
  onSelectObject: (obj: MainObject3DType) => void;
  shieldShape: ShieldShape3DType;
  onSelectShieldShape: (shape: ShieldShape3DType) => void;
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  primaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  secondaryColor: string;
  onSecondaryColorChange: (color: string) => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  backgroundColor?: string;
  onBackgroundColorChange?: (color: string) => void;
  objectScale?: number;
  onObjectScaleChange?: (scale: number) => void;
}

export const shieldShapesList: { id: ShieldShape3DType; name: string; icon: React.ElementType }[] = [
  { id: 'classic', name: 'Clásico', icon: Shield },
  { id: 'round', name: 'Redondo', icon: Circle },
  { id: 'crest', name: 'Ojival / Cresta', icon: Award },
  { id: 'diamond', name: 'Diamante', icon: Diamond },
  { id: 'octagon', name: 'Octágono', icon: Square },
  { id: 'hexagon', name: 'Hexágono', icon: Hexagon },
  { id: 'star', name: 'Estrella', icon: Star },
  { id: 'badge', name: 'Placa', icon: Shield },
];

export default function Customizer3DPanel({
  isOpen,
  onClose,
  activeTeamId = 'team1',
  onSelectActiveTeam,
  team1Config,
  team2Config,
  onUpdateTeamConfig,
  onSelectPresetClub,
  teamName = '',
  onTeamNameChange,
  fontSize = 34,
  onFontSizeChange,
  selectedObject,
  onSelectObject,
  shieldShape,
  onSelectShieldShape,
  imageUrl,
  onImageUrlChange,
  primaryColor,
  onPrimaryColorChange,
  secondaryColor,
  onSecondaryColorChange,
  accentColor,
  onAccentColorChange,
  backgroundColor = '#040406',
  onBackgroundColorChange,
  objectScale = 1.0,
  onObjectScaleChange,
}: Customizer3DPanelProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onImageUrlChange(result);
        if (onUpdateTeamConfig) {
          onUpdateTeamConfig(activeTeamId, { shieldUrl: result });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const currentTeamName = teamName || (activeTeamId === 'team1' ? team1Config?.name : team2Config?.name) || 'Club Atlético Pinocho';
  const currentFontSize = fontSize || (activeTeamId === 'team1' ? team1Config?.fontSize : team2Config?.fontSize) || 34;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl z-50 p-6 overflow-y-auto text-slate-100 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
            <h2 className="text-lg font-black text-white tracking-tight">Estudio 3D Multi-Equipo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. SELECTOR MULTI-EQUIPO (Equipo 1 / Local vs Equipo 2 / Visitante) */}
        {onSelectActiveTeam && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-red-400" />
                1. Selección de Equipo Activo
              </span>
              <span className="text-[10px] text-red-400 font-semibold">Multi-Equipo</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectActiveTeam('team1')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-start transition-all ${
                  activeTeamId === 'team1'
                    ? 'bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] text-red-400 uppercase tracking-wider">Equipo 1</span>
                  {activeTeamId === 'team1' && <Check className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <span className="text-sm font-black truncate w-full text-left">
                  {team1Config?.shortName || 'PINOCHO'}
                </span>
              </button>

              <button
                onClick={() => onSelectActiveTeam('team2')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-start transition-all ${
                  activeTeamId === 'team2'
                    ? 'bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] text-red-400 uppercase tracking-wider">Equipo 2</span>
                  {activeTeamId === 'team2' && <Check className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <span className="text-sm font-black truncate w-full text-left">
                  {team2Config?.shortName || 'NEWBERY'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 2. PLANTILLAS / CLUBES RÁPIDOS (Pinocho, Newbery, 17 de Agosto, Kimberley, CASLA) */}
        <div className="space-y-2.5 pt-1">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            2. Cargar Club Preset (Escudo & Tri-Color)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_CLUBS.map((club) => (
              <button
                key={club.id}
                onClick={() => {
                  if (onSelectPresetClub) {
                    onSelectPresetClub(club);
                  } else {
                    if (onTeamNameChange) onTeamNameChange(club.name);
                    if (onPrimaryColorChange) onPrimaryColorChange(club.primaryColor);
                    if (onSecondaryColorChange) onSecondaryColorChange(club.secondaryColor);
                    if (onAccentColorChange) onAccentColorChange(club.accentColor);
                    if (onFontSizeChange) onFontSizeChange(club.fontSize);
                    if (onImageUrlChange) onImageUrlChange(club.shieldUrl);
                    if (onSelectShieldShape) onSelectShieldShape(club.shieldShape);
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/50 hover:bg-slate-850 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-slate-600 inline-block"
                  style={{ backgroundColor: club.primaryColor }}
                />
                <span>{club.shortName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. NOMBRE DEL EQUIPO Y TAMAÑO DE TIPOGRAFÍA */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-2">
            <Type className="w-4 h-4 text-red-500" />
            <span>3. Nombre de Equipo & Tipografía 3D</span>
          </label>

          {/* Input Nombre del Equipo */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400">Nombre Oficial del Equipo</span>
            <input
              type="text"
              value={currentTeamName}
              onChange={(e) => {
                const val = e.target.value;
                if (onTeamNameChange) onTeamNameChange(val);
                if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { name: val, shortName: val });
              }}
              placeholder="Ej: Club Atlético Pinocho"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-red-500 placeholder:text-slate-600"
            />
          </div>

          {/* Slider Tamaño de Tipografía */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-red-400" />
                Tamaño de Tipografía (3D Dynamic Font)
              </span>
              <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
                {currentFontSize} px
              </span>
            </div>
            <input
              type="range"
              min="16"
              max="64"
              step="2"
              value={currentFontSize}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (onFontSizeChange) onFontSizeChange(val);
                if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { fontSize: val });
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Pequeña (16px)</span>
              <span>Mediana (34px)</span>
              <span>Grande (64px)</span>
            </div>
          </div>

          {/* Slider Tamaño Manual del Objeto 3D (Pelota / Escudo) */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Circle className="w-3.5 h-3.5 text-emerald-400" />
                Tamaño del Objeto 3D (Escala Pelota/Escudo)
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                {Math.round(objectScale * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={objectScale}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (onObjectScaleChange) onObjectScaleChange(val);
                if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { objectScale: val });
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>50% (Pequeño)</span>
              <span>100% (Estándar)</span>
              <span>250% (Gigante)</span>
            </div>
          </div>
        </div>

        {/* 4. PALETA DE TRI-COLORES */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-red-500" />
              4. Paleta de Tri-Colores
            </span>
            <span className="text-[10px] text-slate-400 font-mono">3 Colores</span>
          </label>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Primario */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 font-bold block">1° Primario</span>
              <div className="flex items-center justify-center py-1">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => {
                    onPrimaryColorChange(e.target.value);
                    if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { primaryColor: e.target.value });
                  }}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>
              <span className="text-[10px] font-mono text-slate-300 block uppercase">{primaryColor}</span>
            </div>

            {/* Secundario */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 font-bold block">2° Secundario</span>
              <div className="flex items-center justify-center py-1">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => {
                    onSecondaryColorChange(e.target.value);
                    if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { secondaryColor: e.target.value });
                  }}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>
              <span className="text-[10px] font-mono text-slate-300 block uppercase">{secondaryColor}</span>
            </div>

            {/* Acento / Tercero */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 font-bold block">3° Acento</span>
              <div className="flex items-center justify-center py-1">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => {
                    onAccentColorChange(e.target.value);
                    if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { accentColor: e.target.value });
                  }}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>
              <span className="text-[10px] font-mono text-slate-300 block uppercase">{accentColor}</span>
            </div>
          </div>
        </div>

        {/* 4.5 PALETA DE FONDOS DE LA PLATAFORMA & VISOR 3D */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              Fondos de Página & Escena 3D
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Personalizado</span>
          </label>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { name: 'Noche', hex: '#040406' },
              { name: 'Azul Noche', hex: '#070a12' },
              { name: 'Verde Noche', hex: '#05120a' },
              { name: 'Granate', hex: '#140505' },
              { name: 'Carbón', hex: '#111111' },
              { name: 'Negro OLED', hex: '#000000' },
            ].map((preset) => {
              const isSelected = backgroundColor === preset.hex;
              return (
                <button
                  key={preset.hex}
                  onClick={() => {
                    if (onBackgroundColorChange) onBackgroundColorChange(preset.hex);
                    if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { backgroundColor: preset.hex });
                  }}
                  className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full border border-slate-700 shadow-sm" style={{ backgroundColor: preset.hex }} />
                  <span className="text-[9px] truncate">{preset.name}</span>
                </button>
              );
            })}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-300 font-bold">Color de Fondo Libre Picker:</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => {
                  if (onBackgroundColorChange) onBackgroundColorChange(e.target.value);
                  if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { backgroundColor: e.target.value });
                }}
                className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">{backgroundColor}</span>
            </div>
          </div>
        </div>

        {/* 5. SUBIR ESCUDO / FOTO DESDE COMPUTADORA */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            5. Escudo de Clubes (Pinocho, etc.)
          </label>

          {/* Subir archivo desde la Computadora */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-700/30 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Subir Foto / Escudo de tu Club</span>
            </button>
          </div>

          {/* Input de URL */}
          <div className="space-y-1.5">
            <div className="relative">
              <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Pegar Link / URL de Escudo..."
                value={imageUrl}
                onChange={(e) => {
                  onImageUrlChange(e.target.value);
                  if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { shieldUrl: e.target.value });
                }}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-red-500 placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Vista previa miniatura */}
          {imageUrl && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <img
                src={imageUrl}
                alt="Vista previa escudo"
                className="w-9 h-9 object-contain rounded-lg bg-slate-950 p-1 border border-slate-700 shrink-0"
              />
              <div className="flex-1 overflow-hidden">
                <span className="text-[11px] font-bold text-white block truncate">Escudo Aplicado 3D</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3" /> Texturizado en Babylon 3D
                </span>
              </div>
              <button
                onClick={() => {
                  onImageUrlChange('');
                  if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { shieldUrl: '' });
                }}
                className="text-slate-500 hover:text-red-400 text-xs p-1"
                title="Quitar imagen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* 6. OBJETO 3D PRINCIPAL & GEOMETRÍA */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            6. Objeto 3D Principal
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'ball', label: 'Pelota 3D', icon: Circle },
              { id: 'shield', label: 'Escudo 3D', icon: Shield },
              { id: 'trophy', label: 'Trofeo 3D', icon: Trophy },
              { id: 'stadium', label: 'Estadio', icon: Building2 },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedObject === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectObject(item.id as MainObject3DType)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-red-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Formas Geométricas de Escudos 3D */}
          {selectedObject === 'shield' && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 block">Forma Geométrica del Escudo</span>
              <div className="grid grid-cols-2 gap-2">
                {shieldShapesList.map((shape) => {
                  const Icon = shape.icon;
                  const isSelected = shieldShape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => {
                        onSelectShieldShape(shape.id);
                        if (onUpdateTeamConfig) onUpdateTeamConfig(activeTeamId, { shieldShape: shape.id });
                      }}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-red-600/20 border-red-500 text-white font-bold'
                          : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-red-400' : 'text-slate-500'}`} />
                      <span className="truncate">{shape.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 text-center">
        <p className="text-[10px] text-slate-500">
          Babylon.js WebGL 3D • Render de Alta Fidelidad en Tiempo Real
        </p>
      </div>
    </div>
  );
}
