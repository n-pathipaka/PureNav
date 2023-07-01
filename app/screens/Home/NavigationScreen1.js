import React from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from '../../config/colors';
import HomeScreen1 from "./Home/HomeScreen1";
import HomeMain from "./Home/HomeMain";
import MyPlacesScreen from "./MyPlaces/MyPlacesScreen";
import SettingsScreen from "./Settings/SettingsScreen";
import MyTripsScreen from "./Trips/MyTripsScreen";

function NavigationScreen(props) {
  const Tab = createBottomTabNavigator();

  //Logic to change the color of TAB BAR ICON  

  const tabOptions = ({route}) => ({

    headerShown: false,

    tabBarIcon: ({focused, color, size}) => {
      
      if (route.name === 'Home') {
        return <Icon name="md-home-outline" size={19}  />;
      } else if (route.name === 'Places') {
        return <Icon name='md-location-outline' size={19}  />;
      } else if (route.name === 'Trips') {
        return <Icon name='md-paper-plane-outline' size={19}  />;
      } else if (route.name === 'Settings') {
        return <Icon name='md-settings-outline' size={19}  />;
      }
      
    },
    tabBarActiveTintColor: '#4169e1',
    tabBarInactiveTintColor: colors.dark_grey,
    style:{
        backgroundColor:'#464962'
        }

  });

  

  return (
      <>
      <Tab.Navigator 
        screenOptions={tabOptions}
      >
        <Tab.Screen name="Home"     component={HomeScreen1} />
        <Tab.Screen name="Places"   component={MyPlacesScreen}/>
        <Tab.Screen name="Trips"    component={MyTripsScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
      </>
  );
}

export default NavigationScreen;
