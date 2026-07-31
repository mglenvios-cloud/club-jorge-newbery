import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CalendarScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agenda Deportiva</Text>

      <View style={styles.dateHeader}>
        <Text style={styles.dateHeaderText}>Sábado 25 de Julio</Text>
      </View>

      <View style={styles.eventCard}>
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>16:00</Text>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>Partido vs Deportivo Central</Text>
          <Text style={styles.eventSubtitle}>Fútbol 11 - Primera División</Text>
          <Text style={styles.eventLocation}>Estadio Principal</Text>
        </View>
      </View>

      <View style={styles.dateHeader}>
        <Text style={styles.dateHeaderText}>Martes 28 de Julio</Text>
      </View>

      <View style={styles.eventCard}>
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>19:30</Text>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>Entrenamiento Táctico</Text>
          <Text style={styles.eventSubtitle}>Fútbol 11 - Primera División</Text>
          <Text style={styles.eventLocation}>Cancha Auxiliar 1</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 40,
  },
  dateHeader: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: 16,
  },
  dateHeaderText: {
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  timeColumn: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: '#334155',
    justifyContent: 'center',
  },
  timeText: {
    color: '#38bdf8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventDetails: {
    flex: 1,
    paddingLeft: 16,
  },
  eventTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  eventLocation: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  }
});
