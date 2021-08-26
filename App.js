import React from 'react';
import {Home} from "./src/pages/Home"
import {Details} from "./src/pages/GifDetails"
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    //NAVIGATION PAGES
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false, 
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
        
      <Stack.Screen
          name="Home"
          component={Home}
          screenOptions={{
            headerShown: false}}/>
            
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


