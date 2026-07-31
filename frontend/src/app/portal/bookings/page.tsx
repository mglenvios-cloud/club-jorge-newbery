'use client';

import React, { useEffect, useState } from 'react';
import { Facility, CourtBooking } from '@club-digital-pro/shared';
import { CalendarCheck, Clock, CheckCircle2, AlertCircle, Building2, Shield, DollarSign } from 'lucide-react';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00'
];

export default function MemberBookingsPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [existingBookings, setExistingBookings] = useState<CourtBooking[]>([]);
  const [myBookings, setMyBookings] = useState<CourtBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      fetchBookingsForFacility(selectedFacility.id, selectedDate);
    }
  }, [selectedFacility, selectedDate]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tenant/facilities');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setFacilities(data.data);
        if (data.data.length > 0) {
          setSelectedFacility(data.data[0]);
        }
      }
    } catch (error) {
      console.error('Error al cargar canchas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingsForFacility = async (facilityId: string, date: string) => {
    try {
      const res = await fetch(`/api/tenant/facilities/bookings?facilityId=${facilityId}&date=${date}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setExistingBookings(data.data);
      }
    } catch (error) {
      console.error('Error al consultar disponibilidad:', error);
    }
  };

  const handleBookingSubmit = async () => {
    if (!selectedFacility || !selectedTime) return;
    setReserving(true);
    setMessage(null);

    // Calculate end time (+1h)
    const [h, m] = selectedTime.split(':').map(Number);
    const endH = (h + 1).toString().padStart(2, '0');
    const endTime = `${endH}:${m.toString().padStart(2, '0')}`;

    try {
      const res = await fetch('/api/tenant/facilities/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facilityId: selectedFacility.id,
          memberId: 'member-current',
          memberName: 'Socio Club Jorge Newbery',
          memberDni: '38.990.120',
          date: selectedDate,
          startTime: selectedTime,
          endTime,
          totalPrice: selectedFacility.pricePerHour,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: `¡Reserva confirmada con éxito para el ${selectedDate} a las ${selectedTime} hs!` });
        setMyBookings([data.data, ...myBookings]);
        setSelectedTime(null);
        fetchBookingsForFacility(selectedFacility.id, selectedDate);
      } else {
        setMessage({ type: 'error', text: data.error || 'No se pudo procesar la reserva' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Error al comunicarse con el servidor' });
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-500" />
          <span>Reserva de Canchas & Instalaciones</span>
        </h1>
        <p className="text-slate-400 text-xs mt-0.5">
          Reservá tu turno para Pádel, Fútbol, Tenis y más en el Club Atlético Jorge Newbery.
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
          message.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500 text-sm">Cargando instalaciones disponibles...</div>
      ) : facilities.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
          Actualmente no hay instalaciones habilitadas para reservas en el club.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Facility Selector */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Seleccioná una Instalación</h2>
            <div className="space-y-2">
              {facilities.map(fac => (
                <button
                  key={fac.id}
                  onClick={() => { setSelectedFacility(fac); setSelectedTime(null); }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedFacility?.id === fac.id
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-600/10'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                    {fac.sport}
                  </span>
                  <div className="font-extrabold text-sm mt-1">{fac.name}</div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/60">
                    <span>${fac.pricePerHour.toLocaleString()} ARS / hr</span>
                    <span className="text-[10px] text-slate-500">{fac.openingHours}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Shift Picker */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Seleccioná Fecha y Horario</h2>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Fecha de la Reserva</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => { setSelectedDate(e.target.value); setSelectedTime(null); }}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Turnos Disponibles</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map(slot => {
                    const isTaken = existingBookings.some(b => b.startTime === slot && b.status === 'CONFIRMED');
                    const isSelected = selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        disabled={isTaken}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                          isTaken
                            ? 'bg-slate-950 border border-slate-900 text-slate-600 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-blue-500/50 hover:text-white'
                        }`}
                      >
                        {slot} hs
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checkout Summary */}
              {selectedFacility && selectedTime && (
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">Resumen del Turno:</div>
                    <div className="font-extrabold text-white text-sm">
                      {selectedFacility.name} — {selectedDate} a las {selectedTime} hs
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      Total a abonar: ${selectedFacility.pricePerHour.toLocaleString()} ARS
                    </div>
                  </div>

                  <button
                    onClick={handleBookingSubmit}
                    disabled={reserving}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {reserving ? 'Confirmando...' : 'Confirmar Reserva Ahora'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
