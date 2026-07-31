import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function BookingsScreen() {
  const [selectedSport, setSelectedSport] = useState('Pádel');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);

  const sports = ['Pádel', 'Fútbol 5', 'Tenis', 'Básquet'];
  const times = ['18:00', '19:00', '20:00', '21:00', '22:00'];

  const handleBooking = () => {
    if (!selectedTime) return;
    setConfirmedMessage(`¡Reserva confirmada de ${selectedSport} para hoy a las ${selectedTime} hs!`);
    setSelectedTime(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reserva de Canchas</Text>
        <Text style={styles.subtitle}>Club Atlético Jorge Newbery</Text>
      </View>

      {confirmedMessage && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{confirmedMessage}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Seleccionar Deporte</Text>
        <View style={styles.row}>
          {sports.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.chip, selectedSport === s && styles.chipActive]}
              onPress={() => { setSelectedSport(s); setSelectedTime(null); }}
            >
              <Text style={[styles.chipText, selectedSport === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Turnos Disponibles Hoy</Text>
        <View style={styles.grid}>
          {times.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.timeCard, selectedTime === t && styles.timeCardActive]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.timeText, selectedTime === t && styles.timeTextActive]}>{t} hs</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedTime && (
        <TouchableOpacity style={styles.btnConfirm} onPress={handleBooking}>
          <Text style={styles.btnText}>Confirmar Reserva</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  header: { marginTop: 40, marginBottom: 24 },
  title: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#38bdf8', fontSize: 13, marginTop: 2 },
  section: { marginBottom: 24 },
  label: { color: '#94a3b8', fontSize: 13, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#1e293b', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  chipActive: { backgroundColor: '#2563eb' },
  chipText: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold' },
  chipTextActive: { color: '#ffffff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeCard: { backgroundColor: '#1e293b', padding: 14, borderRadius: 12, minWidth: '30%', alignItems: 'center' },
  timeCardActive: { backgroundColor: '#2563eb' },
  timeText: { color: '#94a3b8', fontSize: 14, fontWeight: 'bold' },
  timeTextActive: { color: '#ffffff' },
  btnConfirm: { backgroundColor: '#10b981', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  banner: { backgroundColor: 'rgba(16,185,129,0.2)', borderColor: '#10b981', borderWidth: 1, padding: 12, borderRadius: 12, marginBottom: 16 },
  bannerText: { color: '#10b981', fontSize: 13, fontWeight: 'bold', textAlign: 'center' },
});
