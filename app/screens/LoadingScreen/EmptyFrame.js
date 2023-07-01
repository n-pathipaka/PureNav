import React, { useState, useEffect } from "react" ;
import { ActivityIndicator, Modal, View , Text , Image , ScrollView , StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native" ; 
import {Button, Card} from 'react-native-paper';


export default function EmptyFrame(props) 
{
    return (
        <View>
            <View style = {styles.cardSearch}>
                <Card style = {[styles.cardStyle]}>
                    <View style={{alignContent:'center', justifyContent:'center', alignItems:'center', flex:1}}>
                        <ActivityIndicator  size="large" color="#999999"/>
                    </View>
                </Card>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    cardStyle : {
        height: 176,
        borderRadius : 2 ,
        alignSelf:'stretch',
        borderWidth : 5 , 
        backgroundColor: "#FFFF",
        flexDirection:'column',
        marginBottom:8,
        marginRight:5,
        marginLeft:3,
        marginTop:8

    },
    cardSearch:{
        shadowColor: '#222',
        shadowOffset: {width: 0, height: 24},
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation:3,

    },
});