/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
// Import FontAwesome Component
// parseIconFromClassName to parse any fa fa-icon into fontawesome
//import FontAwesomeIcon from 'react-native-fontawesome';


import { MainStackNavigator, ContactStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',


      },
      barStyle:[{ marginLeft:10, marginRight:10  }],
      headerTintColor: 'white',
    }}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Places" component={ContactStackNavigator} />
      <Tab.Screen name="Trips" component={ContactStackNavigator} />
      <Tab.Screen name="Settings" component={ContactStackNavigator} />
    </Tab.Navigator>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
export default BottomTabNavigator;
