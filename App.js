import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VehicleListScreen from './src/screens/VehicleListScreen';
import VehicleDetailScreen from './src/screens/VehicleDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="Vehicles"
          component={VehicleListScreen}
        />
        <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
