import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";





export default function App (){

  return (
    <View  style= {styles.SplashRoot}>
      <View style= {styles.Splash}>
        <Image style = {styles.Nime} src={require('./assets/splash.png')} />
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  SplashRoot:{
  backgroundColor : '#6979f8' , 
  flexDirection : 'row' ,
  justifyContent: 'flex-start',
  alignItems:'flex-start',
  margin : 'auto' ,
  },
  Splash:{
    width: 375,
    height: 667,
    backgroundColor: '#6979f8',
    overflow: 'hidden',
    position:'relative',
  },
  Nime:{
    width: 148,
    height: 57.2,
    position: 'absolute',
    top: 304.85,
    left: 115,
  }

})
