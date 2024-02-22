import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screen/Splash';

import Login from '../screen/Login';


import Home from '../screen/Home';
import DrawerScreen from '../drawer/DrawerScreen';
import ModalVehicle from '../components/ModalVehicle';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        />

       
          <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
            <Stack.Screen
          name={'Home'}
          component={Home}
          options={{headerShown: false}}
        />
            <Stack.Screen
          name={'DrawerScreen'}
          component={DrawerScreen}
          options={{headerShown: false}}
        />
            
            <Stack.Screen
          name={'ModalVehicle'}
          component={ModalVehicle}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
