import {React, useEffect, useState} from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableWithoutFeedback, Animated, 
    Button,  TextInput, Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Platform

 } from "react-native";
 import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
 import KeyBoardWrapper from "../../../../components/Custom/KeyBoardWrapper";
 import colors from "../../../../config/colors";


 export default function UserGoodLabels(props){

    const handleOnPress = (item) => {

        if(selectedGoodThings.some(x => x.thing === item.thing))
        {
            const newSelected = selectedGoodThings.filter((goodItem)=> goodItem.thing != item.thing)
            return setSelectecd(newSelected)
        }
        
        setSelectecd([...selectedGoodThings, item])
        

    }

    const isSelected = (item) =>
    {
        //return selectedGoodThings.includes(item)

        return selectedGoodThings.some(x => x.thing === item.thing)
    }

    return(
        <View>
            <View style= {{flexDirection:'row', flexWrap:'wrap'}}>
               {props.goodLabels.map((item, index) => {
                   return(
                       < TouchableOpacity key ={index}
                           onPress = {() => {
                                 // item.selected = !item.selected
                                // setSelectecd(selected[index] = true)
                               
                                handleOnPress(item)
                                
                           }}
                       >
                       <View>
                           <View style = {[{borderWidth:1,justifyContent:'center', alignItems:'center', backgroundColor: isSelected(item) ?'blue':'#CDD2FD'}, styles.goodThings]}>
                               <Text style={styles.goodThingsText}> {item.thing} </Text>
                           </View>
                      </View>

                       

                       </ TouchableOpacity>
                      
                   )
               })}

            </View>
       </View>
       )


 }

 const styles = StyleSheet.create({

    goodThings: {
        marginTop: 16,
        marginBottom: 5,
        marginRight: 12,
        borderRadius: 40,
        padding:10,
        borderColor: colors.primary,
        
    
    },
    goodThingsText: {
        color: "#6979F8",
        textAlign:'center',
        fontSize: 13,
    },

 })