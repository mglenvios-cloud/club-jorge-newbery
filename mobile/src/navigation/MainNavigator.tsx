import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DigitalCardScreen from '../screens/DigitalCardScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import ClubTVScreen from '../screens/ClubTVScreen';
import NewsScreen from '../screens/NewsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import FamilyScreen from '../screens/FamilyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingsScreen from '../screens/BookingsScreen';


export default function MainNavigator() {
  // In a real app this would be a BottomTabNavigator or DrawerNavigator
  // from @react-navigation/bottom-tabs
  return (
    <View style={styles.container}>
      <Text style={styles.navBar}>Navegación (Mock)</Text>
      <View style={{ flex: 1, width: '100%' }}>
        {/* We just render Home for structural completeness in this architecture setup */}
        <HomeScreen />
      </View>
      <View style={styles.tabBar}>
        <Text style={styles.tabItem}>Home</Text>
        <Text style={styles.tabItem}>Carnet</Text>
        <Text style={styles.tabItem}>TV</Text>
        <Text style={styles.tabItem}>Perfil</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  navBar: {
    height: 40,
    backgroundColor: '#1e293b',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    color: '#94a3b8',
    fontSize: 12,
  }
});
