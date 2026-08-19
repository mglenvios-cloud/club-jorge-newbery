'use client';

import React, { useState } from 'react';
import { UploadCloud, Link as LinkIcon, Folder, X, Check, Image as ImageIcon, Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { compressImage } from '@/utils/imageCompressor';

interface UniversalMediaUploaderProps {
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  presetImages?: string[];
  maxDimension?: number;
  quality?: number;
}

const defaultPresets = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
];

export default function UniversalMediaUploader({
  value,
  onChange,
  label = 'Fotografía Oficial',
  presetImages = defaultPresets,
  maxDimension = 250,
  quality = 0.8,
}: UniversalMediaUploaderProps) {
  const [tab, setTab] = useState<'upload' | 'url' | 'library'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor seleccione un archivo de imagen válido (JPG, JPEG, PNG, WEBP).');
      return;
    }

    setUploadError(null);
    setIsCompressing(true);

    try {
      const compressedBase64 = await compressImage(file, maxDimension, quality);
      onChange(compressedBase64);
    } catch (err: any) {
      setUploadError('Error al procesar la imagen: ' + (err?.message || 'Formato no compatible'));
    } finally {
      setIsCompressing(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput('');
  };

  const isBase64 = typeof value === 'string' && value.startsWith('data:image/');
  const isUrl = typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  const hasValue = Boolean(value && value.trim());

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>{label}</span>
        </span>
        {hasValue && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            {isBase64 ? '✓ Subida desde PC (Comprimida 250px)' : isUrl ? '✓ URL Externa' : '✓ Seleccionada'}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2.5">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
            tab === 'upload'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Subir de PC</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('url')}
          className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
            tab === 'url'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Pegar URL</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('library')}
          className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
            tab === 'library'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Folder className="w-3.5 h-3.5" />
          <span>Biblioteca</span>
        </button>
      </div>

      {/* Content 1: Upload from PC */}
      {tab === 'upload' && (
        <div className="space-y-2">
          <label className="border-2 border-dashed border-blue-500/30 hover:border-blue-500/70 rounded-2xl p-5 text-center block cursor-pointer transition-all bg-blue-500/5 hover:bg-blue-500/10">
            {isCompressing ? (
              <div className="py-2 flex flex-col items-center gap-2">
                <Loader2 className="w-7 h-7 text-blue-400 animate-spin" />
                <span className="font-bold text-blue-300 text-xs">Comprimiendo imagen (250×250 px JPEG 0.8)...</span>
              </div>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-blue-400 mx-auto mb-1.5" />
                <span className="font-bold text-white block">📁 Seleccionar foto desde la PC</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Formatos: JPG, JPEG, PNG, WEBP (Autocompresión optimizada)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </label>
        </div>
      )}

      {/* Content 2: URL */}
      {tab === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://ejemplo.com/foto.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleUrlSubmit();
                }
              }}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Content 3: Library Presets */}
      {tab === 'library' && (
        <div className="grid grid-cols-5 gap-2">
          {presetImages.map((imgUrl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(imgUrl)}
              className={`rounded-xl overflow-hidden border-2 transition-all relative aspect-square ${
                value === imgUrl ? 'border-blue-500 shadow-md shadow-blue-500/30 ring-2 ring-blue-500/50' : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              <img src={imgUrl} alt={`Preset ${i}`} className="w-full h-full object-cover" />
              {value === imgUrl && (
                <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white font-bold" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-semibold flex items-center justify-between">
          <span>{uploadError}</span>
          <button type="button" onClick={() => setUploadError(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Preview & Action Box */}
      {hasValue && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={value}
              alt="Vista Previa"
              className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-400/80 shadow-md bg-slate-950"
            />
            <div>
              <span className="font-bold text-white block text-xs">✓ Vista previa cargada</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Listo para guardar en el perfil</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors" title="Cambiar foto">
              <RefreshCw className="w-3.5 h-3.5" />
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
              title="Eliminar foto"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
