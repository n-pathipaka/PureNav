/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Frame139 from './Frame139';
import UpcomingTrips from './UpcomingTrips';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Menu from 'react-native-vector-icons/Feather'


 export default function Home(props) {

    //<RadioButton data={emotions} onSelect={(value) => setOption(value)} />


    // <FlatList
    //      data = {currentTrip}
    //      renderItem = {({item}) => {
             
    //          return renderData(item)
             
    //      }}     
    //     // keyExtractor = {item => `${item.question_id}`}
     
    //    />
    
    //<Frame139/>
    // <View style ={style.menuStyle}>
    //             <Menu name = 'menu' color = "rgba(153, 153, 153, 1)"  size ={23}/>
    //         </View>

    return ( 
        
        <View style = {style.container} >
            <View style = {style.screenTop} >
                <Icon name = 'home' color = '#008b8b' size={26} />
                <Text style = {style.label}>  At Home</Text>
            </View>
            <View style = {style.Trip}> 
            < Text style = { style.heading } > Next Trip </ Text > 
            </View>
            <View >
                <Frame139/>
            </View>
            <View style = {style.Trip}>
                <Text style = {style.heading} >  Upcoming Trips </Text>
                <Text style = {{fontSize: 12, color:"rgba(153, 153, 153, 1)", fontWeight:'400'}} >  Show All </Text>
            </View>
            <View>
                <UpcomingTrips/>
            </View>
       </View>
    );
  }

  const style = StyleSheet.create({
        heading: {
        color : "#151522" , 
        fontSize : 16 , 
        fontFamily : "SF Pro Text" , 
        letterSpacing : 0 , 
        fontStyle : "normal" , 
        fontWeight : 'bold' , 
        textAlign : "left" 
        },
        Trip:{
            position : "static" , 
            flexDirection: 'row',
            width: 355,
            height : 22,
            left: 5,
            flexWrap: 'wrap',
            justifyContent:'space-between'
        },
        container:{
            flex:1,
            marginTop:10,
            backgroundColor:'#ffff'
        },
        label:{
            marginBottom: 20,
            fontSize: 24,
            color:'black',
            fontWeight: '900',
        },
        screenTop:{
            left: 10,
            flexDirection:'row',
        },
        menuStyle:{
           paddingLeft:10,
           paddingBottom:15
        }
  })