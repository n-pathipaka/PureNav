import React, {useContext, useEffect} from 'react';
import AppContext from '../../../AppContext';
import {SafeAreaView, StyleSheet, Text, Image, View, Alert} from 'react-native'
import LongButton from '../../components/Buttons/LongButton';
import { useNavigation } from '@react-navigation/native';
import * as Location from "expo-location";
import { getAddress } from '../../components/Custom/getAddress';



function WelcomeScreen(props) {

    const appContext = useContext(AppContext);

    const navigation = useNavigation();
    const getStarted = () =>{
        navigation.navigate('onboarding screen one')
    }

    const setAddrees = (address, lat , long) => {

        appContext.setCurrentLocation({
            latitude: lat,
            longitude: long,
            description: address,
         })
    }

    const getLocation = async (locController) => {

        try {

            if(appContext.setLocationServiceEnabled && appContext.currentLocation != null){
                // fetch the current location

                if(locController)
                {
                    getAddress(appContext.currentLocation.latitude, appContext.currentLocation.longitude)
                    .then( res =>  {
                        setAddrees(res, appContext.currentLocation.latitude, appContext.currentLocation.longitude)
                    })
    
                }
            }
      
          } catch (error) {
            console.log(error);
          }
    }  


    useEffect(() => {
        let locController = true;
        
        getLocation(locController) 

        return () => {
            locController = false;
        };
        
    }, [])

    //{appContext.user.phone_number}

    return (
        <SafeAreaView 
        style={styles.container}>

            <View style={styles.view}>
                <Image source={require('../../assets/wave.png')} 
                style={
                        {
                            alignSelf: 'center',
                            marginBottom: '25%'
                        }
                    }></Image>
                <Text style={styles.welcomeText}>Welcome </Text>
                <Text style={styles.text}>Lets start by setting up the app to your preferences</Text>
                <LongButton disabled={false} title='Get Started' onPress={getStarted}/>
            </View>
        </SafeAreaView>
    );
   
}

export default WelcomeScreen ;
const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }, 
    view:{
      flex: 1,
      justifyContent: 'center',
      padding: 25,

      width: '100%',
    },
    text:{
        color: 'black',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: '10%',
    },
    welcomeText:{
        color: 'black',
        fontSize: 34,
        fontWeight: '600',
        marginBottom: '10%',
    }
    
})