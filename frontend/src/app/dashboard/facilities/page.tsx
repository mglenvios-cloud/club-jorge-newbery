'use client';

import React, { useEffect, useState } from 'react';
import { Facility, CourtBooking } from '@club-digital-pro/shared';
import { CalendarCheck, Plus, Building2, Clock, DollarSign, Lightbulb, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FacilitiesDashboardPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [bookings, setBookings] = useState<CourtBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'facilities' | 'bookings'>('facilities');
  const [showModal, setShowModal] = useState(false);

  // New facility form
  const [name, setName] = useState('');
  const [sport, setSport] = useState('Pádel');
  const [surface, setSurface] = useState('Césped Sintético');
  const [pricePerHour, setPricePerHour] = useState('4500');
  const [isLightingAvailable, setIsLightingAvailable] = useState(true);
  const [lightingPriceExtra, setLightingPriceExtra] = useState('800');
  const [openingHours, setOpeningHours] = useState('08:00 - 23:00');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [facRes, bookRes] = await Promise.all([
        fetch('/api/tenant/facilities').then(r => r.json()),
        fetch('/api/tenant/facilities/bookings').then(r => r.json()),
      ]);

      if (facRes.success && Array.isArray(facRes.data)) {
        setFacilities(facRes.data);
      }
      if (bookRes.success && Array.isArray(bookRes.data)) {
        setBookings(bookRes.data);
      }
    } catch (error) {
      console.error('Error al cargar instalaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sport) return;

    try {
      const res = await fetch('/api/tenant/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          sport,
          surface,
          pricePerHour: parseFloat(pricePerHour) || 0,
          isLightingAvailable,
          lightingPriceExtra: parseFloat(lightingPriceExtra) || 0,
          openingHours,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFacilities([data.data, ...facilities]);
        setShowModal(false);
        setName('');
      }
    } catch (error) {
      console.error('Error al crear instalación:', error);
    }
  };

  const handleDeleteFacility = async (id: string) => {
    if (!confirm('¿Desea eliminar esta instalación?')) return;
    try {
      const res = await fetch(`/api/tenant/facilities/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFacilities(facilities.filter(f => f.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-500" />
            <span>Gestión de Instalaciones & Canchas</span>
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Administración de espacios deportivos, turnos de reserva y tarifas del Club Atlético Jorge Newbery.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Instalación</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('facilities')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'facilities' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Instalaciones ({facilities.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Reservas Activas ({bookings.length})
        </button>
      </div>

      {/* Facilities Tab */}
      {activeTab === 'facilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-sm">Cargando instalaciones...</div>
          ) : facilities.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
              No hay instalaciones registradas en el club. Haz clic en "Nueva Instalación" para dar de alta un espacio.
            </div>
          ) : (
            facilities.map(fac => (
              <div key={fac.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                      {fac.sport}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{fac.name}</h3>
                    <p className="text-xs text-slate-400">{fac.surface || 'Superficie Estándar'}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteFacility(fac.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Tarifa por Hora</span>
                    <span className="font-extrabold text-emerald-400">${fac.pricePerHour.toLocaleString()} ARS</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Horario Atencion</span>
                    <span className="font-semibold text-slate-300">{fac.openingHours}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Lightbulb className={`w-3.5 h-3.5 ${fac.isLightingAvailable ? 'text-amber-400' : 'text-slate-600'}`} />
                    {fac.isLightingAvailable ? `Iluminación (+ $${fac.lightingPriceExtra})` : 'Sin Luz Artificial'}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] rounded font-bold bg-emerald-500/20 text-emerald-400">
                    ACTIVA
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="p-4">Instalación</th>
                  <th className="p-4">Socio</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Horario</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No hay reservas registradas en el sistema.
                    </td>
                  </tr>
                ) : (
                  bookings.map(book => (
                    <tr key={book.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-white">{book.facility?.name || 'Cancha'}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-200">{book.memberName}</div>
                        <div className="text-[10px] text-slate-500">DNI: {book.memberDni}</div>
                      </td>
                      <td className="p-4">{book.date}</td>
                      <td className="p-4 font-mono text-blue-400">{book.startTime} - {book.endTime} hs</td>
                      <td className="p-4 font-bold text-emerald-400">${book.totalPrice.toLocaleString()} ARS</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold ${
                          book.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {book.status === 'CONFIRMED' ? 'CONFIRMADA' : 'CANCELADA'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Creating Facility */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Alta de Instalación / Cancha</h3>
            <form onSubmit={handleCreateFacility} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nombre de la Cancha / Espacio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cancha de Pádel 1"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Deporte</label>
                  <select
                    value={sport}
                    onChange={e => setSport(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Pádel">Pádel</option>
                    <option value="Fútbol 5">Fútbol 5</option>
                    <option value="Fútbol 11">Fútbol 11</option>
                    <option value="Tenis">Tenis</option>
                    <option value="Básquet">Básquet</option>
                    <option value="Multiespacio">Multiespacio</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Superficie</label>
                  <input
                    type="text"
                    placeholder="Ej: Césped Sintético"
                    value={surface}
                    onChange={e => setSurface(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Precio por Hora ($)</label>
                  <input
                    type="number"
                    value={pricePerHour}
                    onChange={e => setPricePerHour(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Cargo Luz ($ Extra)</label>
                  <input
                    type="number"
                    value={lightingPriceExtra}
                    onChange={e => setLightingPriceExtra(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Horario de Funcionamiento</label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={e => setOpeningHours(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="lighting"
                  checked={isLightingAvailable}
                  onChange={e => setIsLightingAvailable(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600"
                />
                <label htmlFor="lighting" className="text-xs text-slate-300 cursor-pointer">
                  Dispone de Iluminación Nocturna
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                >
                  Guardar Instalación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
