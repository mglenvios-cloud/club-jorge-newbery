import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.name}>Usuario Mobile</Text>
        <Text style={styles.email}>mobile@club.com</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>SOCIO</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Personales</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Club</Text>
            <Text style={styles.infoValue}>Club Atlético Jorge Newbery</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Categoría</Text>
            <Text style={styles.infoValue}>Activo</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nº Socio</Text>
            <Text style={styles.infoValue}>SOC-2026</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ajustes y Preferencias</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Notificaciones Push</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarPlaceholder: {
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
  email: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  roleBadge: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 12,
  },
  roleText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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
  infoCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  infoLabel: {
    color: '#94a3b8',
  },
  infoValue: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#450a0a',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  logoutButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
