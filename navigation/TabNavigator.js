import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/SettingsScreen';

const Tab = createBottomTabNavigator();

const getIconName = (routeName) => {
  switch (routeName) {
    case 'Inicio':
      return 'home';
    case 'Configurações':
      return 'people'; 
      default:
        return 'help-outline'; 
  }
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={getIconName(route.name)} size={size} color={color} />
        ),
        tabBarLabel: () => null,
        tabBarActiveTintColor: '#d3af37', // Cor dos ícones ativos
        tabBarInactiveTintColor: 'white', // Cor dos ícones inativos
        tabBarStyle: {
          backgroundColor: '#343434', // Cor de fundo da barra de abas
          borderTopColor: 'gray', // Remove a bordadura superior
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Configurações" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;