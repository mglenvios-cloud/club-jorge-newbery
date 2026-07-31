'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Nuevo Club Registrado',
    message: 'Club Náutico del Este completó el asistente de onboarding.',
    timestamp: 'Hace 10 min',
    type: 'SUCCESS',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Alerta de Licencia por Vencer',
    message: 'La suscripción del Club Italiano vence en 5 días.',
    timestamp: 'Hace 1 hora',
    type: 'WARNING',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Evento de Auditoría Crítico',
    message: 'Intento de login fallido repetido desde IP no confiable.',
    timestamp: 'Hace 3 horas',
    type: 'CRITICAL',
    read: true,
  },
];

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all relative"
        title="Notificaciones Corporativas"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white">Notificaciones</h4>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-blue-500/20 text-blue-400">
                  {unreadCount} nuevas
                </span>
              )}
            </div>
            <button
              onClick={markAllRead}
              className="text-[10px] text-blue-400 hover:underline font-medium"
            >
              Marcar leídas
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-xl border transition-colors ${
                  n.read ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-800/50 border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {n.type === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                  {n.type === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                  {n.type === 'CRITICAL' && <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                  {n.type === 'INFO' && <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                  <div>
                    <h5 className="text-xs font-semibold text-white">{n.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                    <span className="text-[9px] text-slate-500 block mt-1">{n.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
