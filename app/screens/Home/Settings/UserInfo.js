import {React,} from "react";
import { View,  StyleSheet, TextInput } from "react-native";
import {Text} from 'react-native-paper';
import fonts from "../../../config/fonts";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';





function UserInfo(props) {


        return(
            <View style={styles.container}>
                <View style={styles.rowElements}>
                <MaterialIcons name="arrow-back" size={25} style={{marginTop : 27, marginLeft: 20}} onPress={() => props.navigation.goBack(null)}/>
                <Text style={{marginTop : 27, marginLeft :68, fontWeight:"600", fontSize: 17,  textAlign: 'center', color:'black'}}>User information</Text>
                </View>

                <View style={(styles.address, { marginTop: 37 })}>
                    <Text
                    style={[
                        fonts.fontStyles.text,
                        fonts.fontStyles.subtext,
                        fonts.fontSizes.heading5,
                        {marginLeft: 20, fontWeight:"600"},
                    ]}
                    >
                    Name
                    </Text>
                    <TextInput  
                    style={[{height: 40, width:335, backgroundColor: 'white', fontSize: 13},styles.textInput]}  
                    placeholder={props.settings['name']} 
                    placeholderTextColor="#000"  
                    editable = {false}
                      
                /> 
                </View>
                <View style={(styles.address, { marginTop: 20 })}>
                    <Text
                    style={[
                        fonts.fontStyles.text,
                        fonts.fontStyles.subtext,
                        fonts.fontSizes.heading5,
                        {marginLeft: 20, fontWeight:"600"},
                    ]}
                    >
                    Phone number
                    </Text>
                    <TextInput  
                    style={[{height: 40, width:335, fontSize: 13},styles.textInput]}  
                    editable = {false}
                    placeholder={props.settings["phone"]} 
                    placeholderTextColor="#000"
                      
                    /> 
                    
                   
                </View>


            </View>
        )

    }


const styles = StyleSheet.create({
 
  container: {
      flex: 1,
      marginTop:34,
      backgroundColor: '#fff'
  },
  rowElements:{
    flexDirection: 'row',
   
},

address: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 20,
    marginBottom: 8,
  },

textInput: {
    justifyContent: "center",
    alignItems: "stretch",
    borderRightWidth: 1,
    borderBottomWidth:1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "rgba(228, 228, 228, 0.6)",
    marginTop:8,
    marginLeft: 20,
  }

});

export default UserInfo;