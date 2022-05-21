/* eslint-disable prettier/prettier */
import React, { useState } from "react" ;
import { View , Text , Image , ScrollView , StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native" ; 
import {Button, Card} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather'
import Icon from  'react-native-vector-icons/MaterialIcons'
import Arrow from 'react-native-vector-icons/AntDesign'


//<Text style = {{fontSize: 18}}> {item.starts_at[0]}</Text>



const renderData = (item) => {
    //console.log(item.ends_at[0])

    return (
        <View>
            <TouchableOpacity style = {style.cardSearch}>
            <Card style = {[style.cardStyle]}>
                <View style = {style.cardHeader}>
                    <View style = {style.cardHeaderLeft}>
                        <Icon name = 'access-time' color = '#32cd32' size={16} />
                        <Text style={{color:'#00C48C', fontSize: 12}}> ON-TIME</Text>
                    </View>
                    <View>
                        <Text style = {{fontSize: 12, color:"rgba(153, 153, 153, 1)", fontWeight:'400'}}> Go in  {item.start_time}</Text>
                    </View>
                </View>
                <View style = {style.cardMiddle}>
                    <Text style= {style.travelText}>{item.starts_at[0]}</Text>
                    <Arrow style={{padding:10, alignSelf:"center"}} name = 'arrowright' color = "rgba(153, 153, 153, 1)" size = {20} />
                    <Text style= {style.travelText}>{item.ends_at[0]}</Text>
                </View>
                <View style = {style.cardEnd}>
                    <View style = {style.endText}>
                        <Text> Trip Duration</Text>
                        <Text style= {style.endText}> {item.duration}</Text>
                    </View>
                    <View style = {style.endText}>
                        <Text> Road Quality</Text>
                        <Text style = {style.endText}> {item.quality}</Text>
                    </View>
                    <TouchableOpacity style= {style.button}>
                        <Text style={style.buttonText}> Go Now </Text>
                    </TouchableOpacity>
                    
                </View>  
            </Card>
            </TouchableOpacity>
        </View>
    )

}
//cardstyle:{position : "absolute" , left : 32.85714285714283 , top : 224.9285714285714 , width : 335 , height : 176 , borderRadius : 4 , shadowColor : "rgba(50, 50, 71, 0.08)" , shadowOpacity : 0.25 , shadowBlur : 32 , shadowOffset : { width: 0, height: 24 } , borderWidth : 1 , borderColor : "rgba(228, 228, 228, 0.6)" , backgroundColor : "rgba(255, 255, 255, 0.9)"},

export default function Frame139() 
{ 

    const currentTrip = [
        { starts_at: ['Home', '90.756', '-102.304'], ends_at: ['Work', '90.756', '-102.304'], start_time: '02:34:10', duration:'30 mins', quality: '20-Bad'},
    ]

    const upcomingTrip =
    [
        { starts_at: ['Work', '90.756', '-102.304'], ends_at: ['Kids School', '90.756', '-102.304'], start_time: '04:30'},
        { starts_at: ['Grocery', '90.756', '-102.304'], ends_at: ['Home', '90.756', '-102.304'], start_time: '5.30'}
    ]

    return ( 
     <View style = { style.container} > 

        

        <FlatList
            data = {currentTrip}
            renderItem = {({item}) => {
                
                return renderData(item)
                
            }}     
            // keyExtractor = {item => `${item.question_id}`}
        
        />
        
     </ View > 
        );
 } 

 const style = StyleSheet.create({ 
    container:{
        position : "relative" , 
        width : Dimensions.get("window").width ,
        //height : 983 , 
        backgroundColor : "rgba(255, 255, 255, 1)"},
    cardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingBottom:40
    },
    cardHeaderLeft:{
        flexDirection:'row',
        alignItems:"center"
    },
    cardMiddle:{
        alignItems:"center",
        paddingLeft:60,
        flexDirection:'row'
    },
    travelText:{fontSize:28, color:"#4169e1", alignSelf:'center', fontWeight:'bold'},
    cardEnd:{
        marginTop: 15,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    endText:{
        fontWeight:'bold',
        color:'black'
    },
    button:{
        backgroundColor:'#4169e1',
        paddingLeft: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    buttonText:{
        margin:10,
        color:'#fff',
        textAlign:'center'
    },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      cardStyle : {
        margin:10,
        borderRadius : 4 ,
        paddingVertical: 7,
        paddingHorizontal: 15,
        width: '90%',
        marginVertical: 10,
        borderWidth : 1 , borderColor : "rgba(228, 228, 228, 0.6)" , 
        backgroundColor : "rgba(255, 255, 255, 0.9)",
        flexDirection:'column'

    },
    cardSearch:{
        shadowColor: '#222',
        shadowOffset: {width: 0, height: 24},
        shadowOpacity: 0.8,
        shadowRadius: 32,
        backgroundColor: '#323247',
        elevation:3

    }
  
 })