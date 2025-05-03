import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'


import TabNavigator from './TabNavigator'
import MathScreen from '../screens/MathScreen'
import PortugueseScreen from '../screens/PortugueseScreen'
import InfoTecScreen from '../screens/InfoTecScreen'
import AtuLegisScreen from '../screens/AtuLegisScreen'
import GeneralScreen from '../screens/GeneralScreen'
import EnglishScreen from '../screens/EnglishScreen'


const Stack = createStackNavigator()

const StackNavigator = () => {
  return ( 
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>        

       
      <Stack.Screen name="Tabs" component={TabNavigator} />    
      <Stack.Screen name="Math" component={MathScreen} />
      <Stack.Screen name="portuguese" component={PortugueseScreen} />
      <Stack.Screen name="Info" component={InfoTecScreen} />
      <Stack.Screen name="AtuLegis" component={AtuLegisScreen} />
      <Stack.Screen name="General" component={GeneralScreen} />
      <Stack.Screen name='English' component={EnglishScreen} />
   
    </Stack.Navigator>
    </NavigationContainer>

  )
}

export default StackNavigator