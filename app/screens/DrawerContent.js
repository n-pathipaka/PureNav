import React, {useContext} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerIcon from 'react-native-vector-icons/Ionicons';
import VideoIcon from 'react-native-vector-icons/Feather';
import fonts from '../config/fonts';
import auth from '../aws-apis/auth';
import AppContext from '../../AppContext';
import * as Linking from 'expo-linking';


export function DrawerContent(props) {

    const paperTheme = useTheme();
    const appContext =  useContext(AppContext);

    const signOut = async () => {
       
        let userSignOut=  auth.signout( handleError => Alert(handleError.message))
      
        userSignOut.then(() => {
            
            appContext.setUser(null)
        })
        
        return userSignOut
    }

    const handleError = (e) => {
        Alert.alert(e.message)
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} keyboardShouldPersistTaps='always'>
                    <View style = {styles.logo}>
                        <Image source = {require('../assets/Drawer_logo.png')}
                                style = {{height:40, width:100, resizeMode:'contain'}}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                    <TouchableOpacity  onPress={() => {props.navigation.navigate('DrawerHome')}}  style={styles.buttonStyle}>
                        <View style = {styles.buttonData}>
                        <VideoIcon name = 'home' color = 'black' size={20} />
                            <Text style={styles.buttonText}> Home </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => {props.navigation.navigate('AboutScreen')}}  style={styles.buttonStyle}>
                        <View style = {styles.buttonData}>
                        <DrawerIcon name = 'people-outline' color = 'black' size={20} />
                            <Text style={styles.buttonText}> About us </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {Linking.openURL('https://drive.google.com/file/d/1ejMD6rGGq_izjY8ARMhR3-io4lWztO_8/view?usp=sharing')}} style={styles.buttonStyle}>
                        <View style = {styles.buttonData}>
                            <VideoIcon name = 'video' color = 'black' size={20} />
                            <Text style={styles.buttonText}> How to use app </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {props.navigation.navigate('ContactScreen')}} style={styles.buttonStyle}>
                        <View style = {styles.buttonData}>
                        <VideoIcon name = 'headphones' color = 'black' size={20} />
                            <Text style={styles.buttonText}> Contact us </Text>
                        </View>
                    </TouchableOpacity>
                    </View> 
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({

    buttonStyle:{width:'70%',padding:12, backgroundColor: '#F4F4F4', borderRadius: 12, margin:10 },

    buttonText:{
        color:'black',
        textAlign:'center',
        fontWeight:'400',
        fontSize:17,
    },
    buttonData:
    {
        flexDirection:'row'
    },


    logo:{
        height:150,
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 100
    },
    drawerContent: {
      flex: 1,
    },
    
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
   
  });