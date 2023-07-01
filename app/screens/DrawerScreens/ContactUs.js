import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import fonts from '../../config/fonts';
import colors from '../../config/colors';
import Menu from 'react-native-vector-icons/Feather'
import * as Linking from 'expo-linking';

//<Button onPress={() => props.navigation.toggleDrawer()}></Button>

export default function ContactUs(props) {
    return (
      <View style={{flex:1, marginTop:34, backgroundColor: '#fff'}}>
      <View style={{flex:1, marginLeft: 10, marginRight: 10, marginTop:10}}>
               {/* About US code */}
               <View style={{display:'flex', alignItems:'flex-start', marginBottom:10}}>
               <TouchableOpacity onPress= {() => props.navigation.toggleDrawer()}>
               <Menu name = 'menu' size ={28} color = {colors.dark_grey} style = {{paddingBottom:4}}/>
               </TouchableOpacity>
                    <View style={{flexDirection:'row', marginBottom: 20,  width:'100%',backgroundColor:'white'}}>
                        <Text
                            style={[
                            fonts.fontSizes.heading1,
                            ]}
                        >
                            Contact Us
                        </Text>
                    </View> 
                    <View style={{marginBottom:20}}>
                      <Text
                          style={[
                          fonts.fontSizes.heading5,
                          ]}
                      >
                            If you have any questions or concerns, please contact us
                      </Text>
                            
                    </View>
                    <View>
                        <TouchableOpacity  onPress={()=> Linking.openURL('https://www.sjeqdenver.com/contact-us')} style= {styles.button}>
                                <Text style={styles.buttonText}> ContactUs </Text>
                        </TouchableOpacity> 
                        <View style={{flexDirection:'row'}}>
                          <Text style={[
                            fonts.fontSizes.heading5,
                            ]}> Email </Text>
                          <Text style={[
                            fonts.fontSizes.heading5,
                            {color: colors.Unknown}]}
                            > (sjeq.denver@gmail.com) </Text>
                        </View>
                    </View>


               </View>
      </View>
        
      </View>
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  button:{
    backgroundColor:'#4169e1',
    width:'100%',
    paddingVertical:11,
    paddingHorizontal:8,
    marginBottom:10,
    borderRadius: 6,
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      fontSize:16
  }
});