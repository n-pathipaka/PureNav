import {React, useState, useEffect, useContext} from "react";
import { View, TouchableOpacity, StyleSheet , Alert} from "react-native";
import {Text} from 'react-native-paper';
import { ButtonGroup, color } from '@rneui/base';
import colors from "../../../config/colors";
import fonts from "../../../config/fonts";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from "react-native-elements";
import axios from "axios";
import AppContext from "../../../../AppContext";
import { ScrollView } from "react-native-gesture-handler";



function TravelScreen(props) {

    const mode = { 'car' : false, 'bus' : false, 'bike' : false, 'walk' : false}
    const [checked, setChecked] = useState(mode);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const appContext = useContext(AppContext);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        

        if(props.settings['medium']=="DRIVING")
        {
            setChecked({...checked, car : true})
        }else if(props.settings['medium']=="Bus"){
            setChecked({...checked, bus : true})
        }else if(props.settings['medium']=="Biking"){
            setChecked({...checked, bike : true})
        }else if(props.settings['medium']=="Walking"){
            setChecked({...checked, walk : true})
        }
        if (props.settings['preferred_route']=="FASTEST"){
            setSelectedIndex(0);
        }else{
            setSelectedIndex(1);
        }


        } , [])

        const updateTravel = () => {

            setDisabled(true);

            let med = " ";
            if(checked['car']==true){
                med = "DRIVING"
            }else if(checked['bus']== true){
                med = "Bus"
            }else if(checked['walk']== true){
                med = "Walking"
            }else if(checked['bike']== true){
                med = "Biking"
            }

           
            return(
                axios.post("http://"+appContext.serverUrl+"/user/settings/add", {
                        
                     "user_id": props.settings['user_id'],
                     "name" : props.settings['name'],
                     "phone": props.settings['phone'],
                     "alert_time"   : props.settings['alert_time'],
                     "medium"   : med,
                     "preferred_route" : {selectedIndex : 0 ? "FASTEST" : "SAFEST"},
                   

        
        })
        .then( function(response){
            setDisabled(false);

    })
            .catch(function (error) {
                console.log(error);
                setDisabled(false);
                alert("Error Occured please Update Again");
                if (error.response) {
                  // Request made and server responded
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
            
              })

            )
        }


    return(
        <View style={styles.container}>
            <View style={styles.rowElements}>
                <MaterialIcons name="arrow-back" size={25} style={{marginTop : 27,marginLeft:20}} onPress={() => props.navigation.goBack(null)}/>
                <Text style={{marginTop : 27, marginLeft :68, fontWeight:"600", fontSize: 17,  textAlign: 'center', color:'black'}}>Travel</Text>
            </View>
        <ScrollView>
            <View style={{marginTop:37, marginLeft:20}}>
                <Text style={[fonts.fontSizes.heading6,{color:'black', fontWeight:"600"}]}>Default Transportation method</Text>
                <Text style={[fonts.fontStyles.light_text,{ color:'#999999', marginRight:30, marginTop:4 }]}>What is  your first option when you commute through the community</Text>

            </View>
        {/* Check boxes */}
                <View style={styles.checkbox}>
                    <CheckBox
                    title="Car"
                    checkedColor={colors.primary}
                    checked={checked['car']}
                    onPress={() => setChecked({...mode, car : !checked['car']})}
                    containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                        width: "20%",
                    }}
                    ></CheckBox>
                    <CheckBox
                    title="Bus"
                    checkedColor={colors.primary}
                    checked={checked['bus']}
                    onPress={() => setChecked({...mode, bus : !checked['bus']})}
                    containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                        margin: -15,
                        width: "20%",
                    }}
                    ></CheckBox>
                    <CheckBox
                    title="Biking"
                    checkedColor={colors.primary}
                    checked={checked['bike']}
                    onPress={() => setChecked({...mode, bike : !checked['bike']})}
                    containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                       
                        width: "40%",
                    }}
                    ></CheckBox>
                    <CheckBox
                    title="Walking"
                    checkedColor={colors.primary}
                    checked={checked['walk']}
                    onPress={() => setChecked({...mode, walk : !checked['walk']})}
                    containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                        margin:-15,
                        width: "40%",
                    }}
                    ></CheckBox>
                </View>
                <View style={{borderBottomColor: '#E4E4E4', borderBottomWidth: 1, marginVertical:20, marginLeft:20, marginRight:20}}/>
                <View style={{marginLeft:20}}>
                    <Text style={[fonts.fontSizes.heading6,{color:'black', fontWeight:"600"}]}>Preferred route option</Text>
                    <Text style={[fonts.fontStyles.light_text,{ color:'#999999', marginRight:30, marginTop:4 }]}>What do you prefer in terms of routing</Text>
                    
                </View>
                <ButtonGroup
                        buttons={['Fastest Route', 'Safest Route']}
                        selectedIndex={selectedIndex}
                        onPress={(value) => setSelectedIndex(value)}
                        buttonStyle={[styles.btnStyle,]}
                        selectedButtonStyle={styles.selectedButtonStyle}
                        containerStyle={styles.containerStyle}
                        />

                <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <TouchableOpacity style= {[styles.button, ] } disabled={disabled}
                        onPress={() =>updateTravel() }>
                        <View style={{flexDirection:'row', justifyContent:'space-around' }}>
                            <Text style={styles.buttonText}> Update </Text>
                        </View>
                    </TouchableOpacity> 
                </View>
            </ScrollView>
        </View>

    )



}

const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        marginTop:34,
        backgroundColor: "white"
        
    },
    rowElements:{
      flexDirection: 'row',
     
  },
  containerStyle:{ 
    marginTop:16,
    marginLeft:20,
    padding: 2, 
    backgroundColor: colors.grey, 
    borderRadius: 4,
    width: 335,
    height: 47,
    
},

button:{
    backgroundColor:'#4169e1',
    width:'30%',
    paddingVertical:11,
   
    marginTop:60,
    paddingHorizontal:8,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      fontSize:16
  }
  
  
  
  });
  
  export default TravelScreen