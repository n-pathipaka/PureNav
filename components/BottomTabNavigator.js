import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';


const Tab = createBottomTabNavigator();

const Blank = () => {
  return <View/>
}


export default function BottomTabNavigator()
{
    const screenOptions = ({route}) => ({
    
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          
    
          if (route.name === 'Home') {
            return <Entypo name='home' size={size} color={color} />;
          } else if (route.name === 'Places') {
            return <Feather name='map-pin' size={size} color={color} />;
          } else if (route.name === 'Trips') {
            return <Entypo name='direction' size={size} color={color} />;
          } else if (route.name === 'Settings') {
            return <Feather name='settings' size={size} color={color} />;
          }
    
      
          
        },
      });


      return (
          <Tab.Navigator
            screenOptions={screenOptions}
            tabBarOptions={{
              activeTintColor: '#4169e1',
              inactiveTintColor: '#464962',
              style:{
                backgroundColor:'#464962'
              }
            }}
            
            >
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Tab.Screen name="Places" component={Blank} />
            <Tab.Screen name="Trips" component={Blank} />
            <Tab.Screen name="Settings" component={Blank} />
          </Tab.Navigator>
       
      );
}