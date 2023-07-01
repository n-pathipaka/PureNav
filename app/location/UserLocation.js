import React, {useState} from 'react'
import { View } from "react-native";
import * as Location from "expo-location";

export  async function  UserLocation(){

  const [address, setAddress] = useState('');

      try {
        let { status } =  await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        let loc =  await Location.getCurrentPositionAsync({});

       

        loc.then(x => {  console.log("checking location", x) })

        // getAddress(loc.coords.latitude, loc.coords.longitude).then(res => {
        //   setAddress(res);
          
        // })

        //console.log("checking res", res)

        return loc



  
      } catch (error) {
        console.log(error);
      }
}