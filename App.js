import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




import StackNavigator from './navigation/StackNavigator';
import WelcomeScreen from './components/WelcomeScreen';

const App = () => {
  const [hasViewedWelcome, setHasViewedWelcome] = useState(null);

  useEffect(() => {
    const checkFirstRun = async () => {
      try {
        const viewedWelcome = await AsyncStorage.getItem('hasViewedWelcome');
        console.log('Has viewed welcome:', viewedWelcome);
        setHasViewedWelcome(viewedWelcome !== null);
      } catch (error) {
        console.error('Error checking first run:', error);
      }
    };
    checkFirstRun();
  }, []);

  const handleIntroComplete = async () => {
    try {
      await AsyncStorage.setItem('hasViewedWelcome', 'true');
      setHasViewedWelcome(true);
    } catch (error) {
      console.error('Error saving intro status:', error);
    }
  };

  if (hasViewedWelcome === null) {
    return  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#17202a',
    }}
  >
    <View
      style={{
        padding: 40,
        borderRadius: 10,
        backgroundColor: '#3e5670',
        borderRadius: 20,
      }}
    >
      <ActivityIndicator size="100" color="#fff" />
    </View>
  </View>
  }

  return (
    <View style={{ flex: 1 }}>
      {!hasViewedWelcome ? (
        <WelcomeScreen onComplete={handleIntroComplete} />
      ) : (
        <StackNavigator />
      )}
    </View>
  );
};

export default App;