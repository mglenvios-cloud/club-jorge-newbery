'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { TenantBranding, defaultJorgeNewberyBranding } from '@/config/tenantBranding';

interface CinematicTransitionProps {
  isActive: boolean;
  branding?: TenantBranding;
}

export default function CinematicTransition({
  isActive,
  branding = defaultJorgeNewberyBranding,
}: CinematicTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 pointer-events-auto flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* Radial Light Pulse Energy */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600 blur-3xl"
          />

          {/* Central Logo & Loading Spinner */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center gap-4 text-center px-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 animate-bounce">
              <Cpu className="w-9 h-9" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {branding.name}
              </h2>
              <p className="text-xs text-blue-400 font-mono tracking-wider mt-1">
                INICIANDO EXPERIENCIA PRO DIGITAL...
              </p>
            </div>

            <div className="w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mt-2">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
