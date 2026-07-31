'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationsPopover } from './NotificationsPopover';
import { useTheme } from '../providers/ThemeProvider';
import { useAuth } from '../providers/AuthProvider';
import { Search, Sun, Moon, ShieldCheck, LogOut, UserCheck } from 'lucide-react';

export function SuperAdminHeader() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-4">
          <Breadcrumbs />
        </div>

        {/* Right: Search, Notifications, Theme, Profile */}
        <div className="flex items-center gap-3">
          {/* Global Search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs hover:border-slate-700 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span>Buscar en la plataforma...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono">
              Ctrl+K
            </kbd>
          </button>

          <NotificationsPopover />

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
            title="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="h-4 w-px bg-slate-800"></div>

          {/* Super Admin Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-blue-500/20">
                SA
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{user?.firstName} {user?.lastName}</span>
                  <UserCheck className="w-3 h-3 text-blue-400" />
                </p>
                <p className="text-[10px] text-blue-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" /> SUPER_ADMIN
                </p>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">Super Admin Corporativo</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="p-1 space-y-1">
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
