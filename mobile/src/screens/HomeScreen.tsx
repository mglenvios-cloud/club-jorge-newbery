import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.clubName}>Club Atlético Jorge Newbery</Text>
        <Text style={styles.statusBadge}>Socio Activo</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximo Partido</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Deportivo Central vs Club Digital</Text>
          <Text style={styles.cardSubtext}>25 Jul 2026 - 16:00 | Estadio Principal</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Noticias Recientes</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Nueva App Oficial</Text>
          <Text style={styles.cardSubtext}>21 Jul 2026</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  clubName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
  },
  cardText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtext: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  }
});
