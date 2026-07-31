import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Noticias Oficiales</Text>

      <View style={styles.newsCard}>
        <View style={styles.newsImagePlaceholder}>
          <Text style={styles.newsImageText}>[Imagen]</Text>
        </View>
        <View style={styles.newsContent}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Generado por IA</Text>
          </View>
          <Text style={styles.newsTitle}>Gran victoria clásica con asistencia de la IA</Text>
          <Text style={styles.newsDate}>21 Jul 2026</Text>
        </View>
      </View>
      
      <View style={styles.newsCard}>
        <View style={styles.newsImagePlaceholder}>
          <Text style={styles.newsImageText}>[Imagen]</Text>
        </View>
        <View style={styles.newsContent}>
          <View style={[styles.badgeContainer, { backgroundColor: '#3b82f6' }]}>
            <Text style={styles.badgeText}>Institucional</Text>
          </View>
          <Text style={styles.newsTitle}>Inauguración de nuevas obras en la sede central</Text>
          <Text style={styles.newsDate}>15 Jul 2026</Text>
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
  newsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  newsImagePlaceholder: {
    height: 150,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsImageText: {
    color: '#94a3b8',
  },
  newsContent: {
    padding: 16,
  },
  badgeContainer: {
    backgroundColor: '#8b5cf6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newsTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDate: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 8,
  }
});
