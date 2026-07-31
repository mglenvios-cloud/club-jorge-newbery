'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Sparkles, ArrowRight, Tv, UserCheck, Trophy } from 'lucide-react';
import { TenantBranding, defaultJorgeNewberyBranding } from '@/config/tenantBranding';

interface HeroOverlayProps {
  branding?: TenantBranding;
  onEnterClick: () => void;
  isTransitioning?: boolean;
}

export default function HeroOverlay({
  branding = defaultJorgeNewberyBranding,
  onEnterClick,
  isTransitioning = false,
}: HeroOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-12 overflow-hidden">
      {/* Top Header / Brand Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -20 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="pointer-events-auto flex items-center justify-between max-w-7xl mx-auto w-full"
      >
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-red-600/40 p-1 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform overflow-hidden">
            <img src="/shield.png" alt="Escudo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-white font-extrabold text-sm md:text-base tracking-tight flex items-center gap-2">
              {branding.name}
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-600/20 text-red-400 border border-red-500/30 uppercase">
                Futsal AFA
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-mono tracking-wide">
              {branding.location}
            </p>
          </div>
        </Link>

        {/* Quick Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <Link href="/portal" className="hover:text-red-400 transition-colors">
            Portal Socios
          </Link>
          <Link href="/portal/carnet" className="hover:text-red-400 transition-colors">
            Carnet Digital
          </Link>
          <Link href="/dashboard/sports/tournaments" className="hover:text-red-400 transition-colors">
            Futsal AFA
          </Link>
          <Link href="/tv" className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-red-400">
            <Tv className="w-3.5 h-3.5" />
            <span>Newbery TV</span>
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-all font-bold"
          >
            Ingresar →
          </Link>
        </div>
      </motion.header>

      {/* Hero Center Message & Call To Action */}
      <div className="my-auto text-center max-w-4xl mx-auto w-full px-4">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 0.9 : 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold mb-6 backdrop-blur-md shadow-xl shadow-red-950/50 uppercase tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>Futsal Primera AFA • Inferiores & Semillero</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -30 : 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl"
        >
          Bienvenido al <br />
          <span className="bg-gradient-to-r from-red-500 via-rose-300 to-slate-100 bg-clip-text text-transparent">
            {branding.name}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow"
        >
          {branding.tagline}. Carnet digital QR, gestión de socios, reservas deportivas y transmisiones HD de Newbery TV.
        </motion.p>

        {/* Primary Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 30 : 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(220, 38, 38, 0.6)' }}
            whileTap={{ scale: 0.96 }}
            onClick={onEnterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-rose-500 text-white font-black text-lg tracking-wide shadow-2xl shadow-red-600/40 border border-red-400/40 flex items-center justify-center gap-3 transition-all cursor-pointer group"
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>ENTRAR AL CLUB DIGITAL</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <Link
            href="/portal"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-base border border-slate-700/80 backdrop-blur-md transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-red-400" />
            <span>Portal Socios</span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Footer Info */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full text-slate-400 text-xs gap-4 border-t border-slate-800/60 pt-4"
      >
        <span>© 2026 {branding.name}. Villa Devoto, CABA.</span>
        <div className="flex items-center gap-6 font-semibold">
          <Link href="/portal" className="hover:text-white transition-colors">
            Carnet QR
          </Link>
          <Link href="/dashboard/sports/tournaments" className="hover:text-white transition-colors">
            Posiciones Futsal
          </Link>
          <Link href="/tv" className="hover:text-white transition-colors">
            Ver TV
          </Link>
        </div>
      </motion.footer>
    </div>
  );
}
