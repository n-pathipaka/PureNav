/* eslint-disable prettier/prettier */


import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './components/BottomTabNavigator';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import VideoIcon from 'react-native-vector-icons/Feather';


import {Splash} from './components/Intro/Splash.js'

import Home from './components/Home';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawer } from './screens/CustomDrawer';


const Drawer = createDrawerNavigator();

const Blank = () => {
  return <View/>
}

   

function DrawerContent(props) {

  return (
    <View>
        <View style = {style.logo}>
           <Image source = {require('./src/images/Logo.jpeg')}
              style = {{height:70, width:130}}
           />
        </View>
        <View >
            <TouchableOpacity style={[{ width: "73%", paddingTop: 10, paddingBottom: 10, margin: 10, backgroundColor: '#F4F4F4', marginLeft: 30, borderRadius: 20 }]}>
                   <View style = {style.buttonData}>
                    <Icon name = 'people-outline' color = 'black' size={25} />
                    <Text style={style.buttonText}> About us </Text>
                  </View>
            </TouchableOpacity>
            <TouchableOpacity style={[{ width: "73%", paddingTop: 10, paddingBottom: 10, margin: 10, backgroundColor: '#F4F4F4', marginLeft: 30, borderRadius: 20 }]}>
                   <View style = {style.buttonData}>
                    <VideoIcon name = 'video' color = 'black' size={25} />
                    <Text style={style.buttonText}> How to use app </Text>
                  </View>
            </TouchableOpacity>

            <TouchableOpacity style={[{ width: "73%", paddingTop: 10, paddingBottom: 10, margin: 10, backgroundColor: '#F4F4F4', marginLeft: 30, borderRadius: 20 }]}>
                   <View style = {style.buttonData}>
                   <Icon name = 'people-outline' color = 'black' size={25} />
                    <Text style={style.buttonText}> Contact us </Text>
                  </View>
            </TouchableOpacity>
           
                 
        </View>
        <View>
            <TouchableOpacity>
                    <Text style={style.label}>Logout</Text>
            </TouchableOpacity>
        </View>
    </View>
    

  );

}


{/* <NavigationContainer>
      <Drawer.Navigator intialRouteName = 'Home'
        screenOptions={{headerShown: false}}
        drawerContent= {props => DrawerContent(props) }
         >
        <Drawer.Screen name="Home" component={BottomTabNavigator} /> 
      </Drawer.Navigator>
      
      </NavigationContainer> */}

//drawerContent={props => <DrawerContent {...props} />}
export default function App() {

  

  return (
     <Splash/>
     
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:'#4169e1',
    paddingHorizontal: 15,
    borderRadius: 15,
   },
   logo:{
      height:150,
      alignItems:'center',
      justifyContent:'center',
      marginBottom: 100

   },
   buttonText:{
    color:'black',
    textAlign:'center',
    fontWeight:'400',
    fontSize:20
  },
  buttonData:
  {
    flexDirection:'row',
    paddingLeft: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    top: Dimensions.get('window').height/3,
    paddingLeft: Dimensions.get('window').width/4,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
});

