import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PaymentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Pagos</Text>
      
      <View style={styles.card}>
        <Text style={styles.planTitle}>Plan Socio Activo</Text>
        <Text style={styles.planPrice}>$12,500 ARS / mes</Text>
        <Text style={styles.planDetails}>Próximo vencimiento: 10 Ago 2026</Text>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pagar cuota con Mercado Pago</Text>
      </TouchableOpacity>

      <View style={styles.history}>
        <Text style={styles.historyTitle}>Historial de Pagos</Text>
        <View style={styles.historyItem}>
          <Text style={styles.historyItemText}>Julio 2026</Text>
          <Text style={styles.historyItemStatus}>Pagado</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyItemText}>Junio 2026</Text>
          <Text style={styles.historyItemStatus}>Pagado</Text>
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
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  planTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    color: '#10b981',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  planDetails: {
    color: '#94a3b8',
    fontSize: 14,
  },
  payButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  history: {
    marginTop: 16,
  },
  historyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyItemText: {
    color: '#ffffff',
    fontSize: 16,
  },
  historyItemStatus: {
    color: '#10b981',
    fontWeight: 'bold',
  }
});
