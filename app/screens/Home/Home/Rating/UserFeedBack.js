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


 export default function UserFeedBack(props){


    return (

        
        <View>
                <TextInput 
                    style={{borderWidth:1, borderColor: colors.grey, height:100}}
                    placeholder='Your feedback.... '
                    multiline
                    numberOfLines={20}
                    onChangeText = { text => props.setUserFeedBack(text)}

                
                />
                
        </View>
        

    )


 }