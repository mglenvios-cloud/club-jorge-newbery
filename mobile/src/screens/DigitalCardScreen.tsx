import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DigitalCardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carnet Digital</Text>
      <View style={styles.card}>
        <View style={styles.photoPlaceholder} />
        <Text style={styles.name}>Usuario Mobile</Text>
        <Text style={styles.details}>SOC-2026 | ACTIVO</Text>
        <View style={styles.qrPlaceholder}>
          <Text style={styles.qrText}>[QR Dinámico]</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#334155',
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3b82f6',
    marginBottom: 16,
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 24,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  qrText: {
    color: '#000000',
    fontWeight: 'bold',
  }
});
