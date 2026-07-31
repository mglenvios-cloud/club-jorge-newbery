import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ClubTVScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Club TV</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transmisión en Vivo</Text>
        <View style={styles.videoPlayerPlaceholder}>
          <Text style={styles.videoText}>[Reproductor de Video]</Text>
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>EN VIVO</Text>
          </View>
        </View>
        <Text style={styles.videoTitle}>Final Torneo de Verano</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Videos Recientes</Text>
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.thumbnailText}>Resumen del Partido</Text>
        </View>
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.thumbnailText}>Entrevista al DT</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  videoPlayerPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  videoText: {
    color: '#ffffff',
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  videoTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 16,
    marginBottom: 12,
  },
  thumbnailText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});
