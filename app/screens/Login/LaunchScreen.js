import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../../AppContext';
import {asyncGet} from '../../components/Custom/functions'

function LaunchScreen(props) {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    const firstTimeUser = () => {
        asyncGet('@'+ appContext.user + '_loggedIn').then((value) => {
            if(value == 'true'){
                navigation.navigate('login screen')
            }else{
                navigation.navigate('get started')
            }
        })
    }

    setTimeout(()=>{
        firstTimeUser()
    }, 1000)
    return (
        <View style={launchScreenStyles.background}>
            <View style={launchScreenStyles.upper}>
                <Image source={require('../../assets/app-logo.png')}/>
            </View>
        </View>
        
    );
}

const launchScreenStyles = StyleSheet.create({
    background:{
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 20
    },
    upper:{
        alignItems: "center",
        justifyContent:"center",
        flex:1
    }
})

export default LaunchScreen;