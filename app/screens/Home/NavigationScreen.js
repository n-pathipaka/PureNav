import React from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from '../../config/colors';
import HomeScreen from "./Home/HomeScreen";
import MyPlacesScreen from "./MyPlaces/MyPlacesScreen";
import SettingsScreen from "./Settings/SettingsScreen";
import MyTripsScreen from "./Trips/MyTripsScreen";

function NavigationScreen(props) {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer
      independent={true}
    >
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: () => (<Button><Icon name="md-home-outline" size={19} color={colors.dark_grey} /></Button>)
          }} />
        <Tab.Screen 
          name="Places" 
          component={MyPlacesScreen}
          options={{
            tabBarIcon: () => (<Button><Icon name="md-location-outline" size={19} color={colors.dark_grey} /></Button>)
          }} />
        <Tab.Screen 
          name="Trips" 
          component={MyTripsScreen}
          options={{
            tabBarIcon: () => (<Button><Icon name="md-paper-plane-outline" size={19} color={colors.dark_grey} /></Button>)
          }} />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            tabBarIcon: () => (<Button><Icon name="md-settings-outline" size={19} color={colors.dark_grey} /></Button>)
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavigationScreen;
