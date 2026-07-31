import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FamilyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Modo Familia</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hijos Asociados</Text>
        
        <View style={styles.childCard}>
          <View style={styles.childHeader}>
            <View style={styles.avatarPlaceholder} />
            <View>
              <Text style={styles.childName}>Tomás Mobile</Text>
              <Text style={styles.childCategory}>Cat. Infantil - Fútbol</Text>
            </View>
          </View>
          
          <View style={styles.childDetails}>
            <Text style={styles.detailText}>Próx. Entrenamiento: Hoy 17:30</Text>
            <Text style={styles.detailText}>Cuota Deportiva: Pagada</Text>
          </View>
        </View>

      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comunicados del Entrenador</Text>
        <View style={styles.messageCard}>
          <Text style={styles.messageAuthor}>Prof. Carlos (Fútbol Infantil)</Text>
          <Text style={styles.messageText}>Recordar traer canilleras y botines para césped sintético este jueves.</Text>
          <Text style={styles.messageDate}>Ayer</Text>
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
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  childCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 16,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    marginRight: 16,
  },
  childName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  childCategory: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  childDetails: {
    gap: 8,
  },
  detailText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  messageCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  messageAuthor: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messageText: {
    color: '#cbd5e1',
    lineHeight: 20,
  },
  messageDate: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
  }
});
