'use client';

import React, { useEffect, useState } from 'react';
import { AppNotification } from '@club-digital-pro/shared';
import { Bell, CreditCard, Calendar, Info, CheckCircle2 } from 'lucide-react';

export default function MemberNotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tenant/notifications');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/tenant/notifications/read-all', { method: 'POST' });
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error al marcar leídas:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-500" />
            <span>Centro de Notificaciones</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Avisos institucionales, vencimientos de cuota y novedades del Club Atlético Jorge Newbery.
          </p>
        </div>

        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 text-xs font-bold transition-all"
          >
            Marcar leídas
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500 text-sm">Cargando avisos...</div>
      ) : notifications.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl space-y-2">
          <Bell className="w-8 h-8 text-slate-600 mx-auto" />
          <p>No tienes notificaciones pendientes en este momento.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                item.isRead ? 'bg-slate-900/50 border-slate-800/80 opacity-80' : 'bg-slate-900 border-blue-500/40 shadow-lg shadow-blue-600/5'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                {item.type === 'PAYMENT' && <CreditCard className="w-5 h-5 text-blue-400" />}
                {item.type === 'EVENT' && <Calendar className="w-5 h-5 text-emerald-400" />}
                {item.type === 'INFO' && <Info className="w-5 h-5 text-sky-400" />}
                {!['PAYMENT', 'EVENT', 'INFO'].includes(item.type) && <Bell className="w-5 h-5 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-1">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
