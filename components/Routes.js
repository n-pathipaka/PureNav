/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { createDrawerNavigator } from "@react-navigation/drawer";

import { NavigationContainer } from '@react-navigation/native';

import { ContactStackNavigator } from '/Users/khanna/Documents/navi/navigation/StackNavigator'
import TabNavigator from '/Users/khanna/Documents/navi/navigation/TabNavigator';


//import BottomTabNavigator from './BottomTabNavigator';

//import Home from './Home';

const Drawer = createDrawerNavigator();

const Blank = () => {
    return <View/>
  }

//   <NavigationContainer>
//             <Drawer.Navigator>
//                 <Drawer.Screen name="Home" component={Home} />  
//             </Drawer.Navigator>
//         </NavigationContainer>

export default function Routes()
{

    return(

        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={TabNavigator} />
                <Drawer.Screen name="Contact" component={ContactStackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });