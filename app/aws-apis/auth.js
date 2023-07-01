import { Auth } from 'aws-amplify';
import { Alert } from 'react-native';
const password = "12345678" // just a placeholder because we require MFA always

export default {
    async signup(phoneNumber, errorHandler) {
        try {
            const response = await Auth.signUp({
                username: phoneNumber, 
                password: password,
                attributes:{
                    phone_number:phoneNumber
                }
            })
            return response
        } catch (e) {
            errorHandler(e)
            return null
        }
    },
    async signin(phoneNumber, errorHandler) {
        try{
            const response = await Auth.signIn(phoneNumber,password)
            return response
        }catch(e){
            errorHandler(e)
            return null
        }
    },
    async confirmSignin(user,verficationCode,errorHandler){
        try {
            const response = await Auth.confirmSignIn(user,verficationCode)
            return response
        } catch (e) {
            errorHandler(e)
            return null
        }
    },
    async confirmSignup(phoneNumber, verficationCode, errorHandler){
        try {
            const response = await Auth.confirmSignUp(phoneNumber,verficationCode)
            return response
        } catch (e) {
            errorHandler(e)
            return null
        }
    },
    async signout(errorHandler){
        try {
            const response = await Auth.signOut()
            return response
        }catch(e){
            errorHandler(e)
            return null
        }
    }
}