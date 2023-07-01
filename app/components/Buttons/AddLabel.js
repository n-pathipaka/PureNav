import React from "react";
import {StyleSheet, View, TextInput} from "react-native";
import colors from "../../config/colors";

/**
 * Button to Add Place
 * @param {*} props OnPress function to be passed
 * @return {*} Pressable Button
 */
function AddLabel(props) {


  return (
    <View style={styles.container}  >
       <TextInput 
            style={{borderWidth:1, borderColor: colors.grey, height:100}}
            placeholder='+ Add Label'
            onChangeText = { text => console.log(text)}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
       
    marginLeft: 10,
    borderRadius: 30,
    borderColor: colors.primary,
    height: 24,
    backgroundColor: colors.primary
}
})


export default AddLabel;
