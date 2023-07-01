import {React, useState} from "react";
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Image } from "react-native";
import {Text} from 'react-native-paper';
import { ButtonGroup, color } from '@rneui/base';
import Menu from 'react-native-vector-icons/Feather';
import colors from "../../../config/colors";
import fonts from "../../../config/fonts";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


function SettingsScreen2(props) {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const Stack = createNativeStackNavigator();
  

  return (
 
    
    <SafeAreaView style={styles.container}>
    <View style={{flex:1, marginLeft: 20, marginRight: 20, marginTop:10, margin : 20}}>
        {/* header code in Home */}
        <View style={{display:'flex', flexDirection:"column", alignItems:'flex-start', width:'100%', marginBottom:20, }}>
            <TouchableOpacity onPress= {() => props.toggleDrawer()}>
                <Menu name = 'menu' size ={28} color = {colors.dark_grey} style = {{paddingBottom:4}}/>
            </TouchableOpacity>
             <View style={{ width:'100%',backgroundColor:'white'}}>
                <Text
                     style={[
                     fonts.fontSizes.heading1,
                     {marginBottom:20, color:'black'}]}
                 >
                     Settings
                </Text>
                <TouchableOpacity    style={styles.buttonStyle} onPress={() => props.navigation.navigate("UserInfo")}>
                    <View style = {styles.buttonData}>
                        <Text style={styles.buttonText}> User Information </Text>
                    </View>
                    <EvilIcons name = 'chevron-right' color = 'black' size={40}  />
                </TouchableOpacity>
                <TouchableOpacity    style={styles.buttonStyle} onPress={() => props.navigation.navigate("AlertScreen")}>
                    <View style = {styles.buttonData}>
                        <Text style={styles.buttonText}> Alerts </Text>
                    </View>
                    <EvilIcons name = 'chevron-right' color = 'black' size={40}  />
                </TouchableOpacity>

                <TouchableOpacity  style={[styles.buttonStyle]} onPress={() => props.navigation.navigate("TravelScreen")}>
                    <View style = {styles.buttonData}>
                        <Text style={styles.buttonText}> Travel </Text>
                    </View>
                    <EvilIcons name = 'chevron-right' color = 'black' size={40}  />
                </TouchableOpacity>
                <Text style={[ {marginVertical:12, fontWeight:'400',fontSize:17,color: 'black'}]}> Preferred App Language </Text>
                <ButtonGroup
                buttons={['System', 'English', 'Spanish']}
                selectedIndex={selectedIndex}
                onPress={(value) => setSelectedIndex(value)}
                buttonStyle={styles.btnStyle}
                selectedButtonStyle={styles.selectedButtonStyle}
                containerStyle={styles.containerStyle}
            />
              </View>
        </View>
    </View>

    
  </SafeAreaView>
 
  )
}

const styles = StyleSheet.create({
 
  container: {
      flex: 1,
      marginTop:34,
      backgroundColor: '#fff'
  },
  buttonStyle:{
    width:'100%',
    padding:12, 
    backgroundColor: '#F4F4F4', 
    borderRadius: 12,  
    marginRight: 10, 
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

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
    selectedButtonStyle: {
      backgroundColor: colors.primary,
      borderRadius: 3
  },
  btnStyle: {
      backgroundColor: colors.grey,
      borderRadius: 4,
      borderWidth: 0,
      fontWeight: '400',
      fontSize: 13,
      width: 109,
      height: 38,
      
  },
  containerStyle:{ 
      margin: 10,
      padding: 2, 
      backgroundColor: colors.grey, 
      borderRadius: 4,
      width: 335,
      height: 47,
      
  },

});

export default SettingsScreen2;
