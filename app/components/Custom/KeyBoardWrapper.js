import {React, useEffect, useState} from "react";
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from "react-native";

 // <ScrollView keyboardShouldPersistTaps='always'>

const KeyBoardWrapper = ({children}) => {

        return(
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'position' : 'height'}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                     {children}
                </TouchableWithoutFeedback>
            
        </KeyboardAvoidingView>
        )

}

export default  KeyBoardWrapper;