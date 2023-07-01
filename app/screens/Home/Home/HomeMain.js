import { useEffect, useState} from "react";
import { View, StyleSheet, Text, Image} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen1 from "./HomeScreen1";
import AddPlaceModal from "../../../components/Modals/AddPlaceModal";

import axios from 'axios';


function HomeMain(props) {

  const Stack = createNativeStackNavigator();


    

  return (

        <>

      <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            style={{ backgroundColor: "white" }}
            initialRouteName="HomeScreen1"
            
          >
            <Stack.Screen
              name="HomeScreen1"
              
            >
              {props =>  <HomeScreen1  {...props} toggleDrawer = {props.navigation.toggleDrawer()}/>}
            </Stack.Screen>
            
            <Stack.Screen
              name="addplace"
            >
              {props =>  <AddPlaceModal  {...props}/>}
            </Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
        
        </>

  )
}

export default HomeMain