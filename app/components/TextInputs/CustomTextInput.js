import React from 'react';
import { TextInput, StyleSheet, View, Image } from 'react-native';

function CustomTextInput({value, setValue, placeholder, imageSource, keyboardType}) {

    return (
        <View style={styles.container}>
            <Image source={imageSource} 
            style={styles.image}></Image>
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
            style={styles.text}
            ></TextInput>
        </View>

    ); 
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',

        borderColor: '#E4E4E4',
        borderWidth: 1,
        borderRadius: 3, 

        marginTop: '5%',
        marginBottom: '5%',

        height: 50, 
        flexDirection: 'row',    
        
        alignContent: 'center',
        justifyContent: 'center'
    },image:{
        margin: 15
    },
    text:{
        flex: 1,
        fontSize: 13,
        textDecorationColor: 'black',
        fontWeight: '300'
    }
})

export default CustomTextInput;