import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, SafeAreaView, ScrollView, Alert} from 'react-native'
import LongButton from '../../components/Buttons/LongButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import auth from '../../aws-apis/auth'
import KeyBoardWrapper from '../../components/Custom/KeyBoardWrapper';
import * as Linking from 'expo-linking';

function LoginScreenPhone({navigation}) {
    
    const [phoneNumber, setPhoneNumber] = useState('')    
    const [disabled, setDisabled]  = useState(false)
    
    const onPressLogin = async () => {

        setDisabled(true)

        //normalize format
        const normalizedPhoneNumber = normalizePhoneFormat(phoneNumber)
        setPhoneNumber(normalizedPhoneNumber)

        // First tr  y to login
        let user = await attemptLogin(normalizedPhoneNumber)
        const isNewUser = user == null

        // If user does not exist signup
        if(isNewUser){
            user = await attemptSignup(normalizedPhoneNumber)   
        }

        // if either succeede go to verification 
        if (user) {
            navigation.navigate('verification screen', {
                isNsNewUser : isNewUser,
                user: user,
                phoneNumber: normalizedPhoneNumber
            })
        }
        setDisabled(false)
    }

    const normalizePhoneFormat = (number) => {
        if (number.length == 10) {
            return "+1" + number
        }

        return number
    }

    const attemptSignup = async (number) => {
        return await auth.signup(number, (e) => console.log(e.message))
    }

    const attemptLogin = async (number) => {
        return await auth.signin(number, handleError)
    }

    const handleError = (e) => {
        Alert.alert(e.message)
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
                        Enter your mobile number to login </Text>
                    <CustomTextInput placeholder={'Mobile Number'} value={phoneNumber} setValue={setPhoneNumber}
                    imageSource={require('../../assets/Vectorsmart_phone.png')} keyboardType="numeric"></CustomTextInput>
                    <Text style={{fontSize:16, marginBottom:10}}>
                    By Creating an account you agree to the {" "}
                    <Text style={{fontSize:16, color: 'red'}} onPress={() => {Linking.openURL('https://docs.google.com/document/d/187pj6RNqBnuaQsGdx2XXGo1E5SixFNlsgK7jJzKso5E/edit?usp=sharing')} }>
                     terms and condiitons of the App.
                    </Text>
                   </Text>
                    <View style={{flex:1, justifyContent:'flex-end', marginBottom: 20}}>
                    <LongButton disabled={disabled} title={'Login'} onPress={onPressLogin}></LongButton>
                    </View>
                </View>

            
                
                
           
            
            </ScrollView>
        </KeyBoardWrapper>

       
           
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    alignContent: "center",
    justifyContent:"center",
    flex: 1,
  },
  textView: {
    color: "black",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
  },
  subViewLogo: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: '50%'
    
  },
  subViewEntry: {
    paddingLeft: 25,
    paddingRight: 25,
    
  },
});

export default LoginScreenPhone;
