'use client';

import React from 'react';
import { Shield, Bell, User, Sun, Moon, Sparkles } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { useTenant } from '../providers/TenantProvider';
import { useTheme } from '../providers/ThemeProvider';

export function Header() {
  const { user } = useAuth();
  const { tenant } = useTenant();
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Tenant: <strong className="text-white">{tenant?.name}</strong></span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
          title="Cambiar tema"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        <div className="h-4 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-semibold text-xs shadow-md shadow-blue-500/20">
            {user?.firstName?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] text-blue-400 font-mono flex items-center gap-1">
              <Shield className="w-2.5 h-2.5" /> {user?.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
