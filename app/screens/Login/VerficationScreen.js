import React, {useState, useContext, Platform, useEffect} from 'react';
import AppContext from "../../../AppContext";
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import LongButton from '../../components/Buttons/LongButton';
import auth from '../../aws-apis/auth';
import { nav } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import KeyBoardWrapper from '../../components/Custom/KeyBoardWrapper';
import axios from 'axios';
import {asyncSet} from '../../components/Custom/functions'


function VerficationScreen({route}) {

    //app context 
    const appContext = useContext(AppContext)

    //states 
    const [verficationCode, setVerificationCode] = useState('');
    const {isNewUser, user, phoneNumber} = route.params;
    const navigation = useNavigation();


    const InitialSetup = () => {

        let key = '@'+ appContext.user + '_loggedIn'
        asyncSet(key, 'true')

        addSettings()
    }

    const addSettings = () => {
        axios.post("http://"+appContext.serverUrl+"/user/settings/add", {
            "user_id": user.username,
            "phone": phoneNumber
    }).then( function(response){
        
    }
    )}


    const confirmPressed = async () => {
   
        if (isNewUser) {

            // confirm signup
            const response = await auth.confirmSignup(phoneNumber,verficationCode, (e) => {
                Alert.alert(e.message)

                setTimeout(()=>{
                    navigation.navigate('login screen');
                }, 500)
            })
            if(!response){return}

        }else{

            //login MFA
            const response = await auth.confirmSignin(user,verficationCode,(e) => {
                Alert.alert(e.message)
                
                setTimeout(()=>{
                    navigation.navigate('login screen');
                }, 500)
            })
            if(!response){return}
        }
        
        appContext.setUser(user.username)   
        
        InitialSetup()
        
         
    }

    return (
        <SafeAreaView style={styles.mainView}>
            <KeyBoardWrapper>
                <ScrollView>
                <View style={styles.subViewLogo}>
                    <Image source={require('../../assets/Drawer_logo.png')}/>
                </View>
                <View style={styles.subViewEntry}>
                    <Text style={styles.textView}>
                        Type the code that was {'\n'}sent to {phoneNumber} </Text>
                    <CustomTextInput placeholder={'Verfication code'} value={verficationCode} 
                    setValue={setVerificationCode}
                    imageSource={require('../../assets/message_vector.png')} keyboardType="numeric"></CustomTextInput>
                    <LongButton disabled={false} title={'Login'} onPress={confirmPressed}></LongButton>
                </View>
                </ScrollView>
            </KeyBoardWrapper>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    mainView:{        
        backgroundColor: 'white',
        flex: 1,
        alignContent: "center",
        justifyContent:"center"
    },
    textView:{
        color: 'black',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 10
    },
    subViewLogo: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: '50%'
      },
    subViewEntry:{
        justifyContent: "center",
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: '10%'
    }
})
export default VerficationScreen;