import {React, useState, useEffect, useContext} from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {Text} from 'react-native-paper';
import colors from "../../../config/colors";
import fonts from "../../../config/fonts";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Switch } from "react-native";
import axios from 'axios';
import AppContext from "../../../../AppContext";
import { ScrollView } from "react-native-gesture-handler";




function AlertScreen(props) {

    const bgcolor = { textColor1:'white',textColor2:colors.primary,textColor3:colors.primary,textColor4:colors.primary,backgroundColor1: '#6979F8', backgroundColor2: '#CDD2FD',backgroundColor3: '#CDD2FD',backgroundColor4: '#CDD2FD', };
    const alerts = { 'alert_time': "On Time",'alert_time_bool': false, 'trip_duration' : false, 'road_closure': false, 'air_pollution': false};
    const [value, setValue] = useState(alerts);
    const [selected, setSelected] = useState(bgcolor);
    const [disabled, setDisabled] = useState(false);
    const appContext = useContext(AppContext);

    useEffect(() => {

        axios.post("http://"+appContext.serverUrl+"/user/settings/get", {
                        
                     "user_id": props.settings['user_id'],        
        
        })
        .then( function(response){
            // setValue({...value, alert_time_bool : response['data']['alert_time_bool']});
            // setValue({...value, trip_duration : response['data']['trip_duration']});
            // setValue({...value, road_closure : response['data']['road_closure']});
            // setValue({...value, air_pollution : response['data']['air_pollution']});
            
            let alert_time = response['data']['Item']['alert_time'];
            alert_time != null || alert_time != undefined ? setValue({...value, alert_time : alert_time}) : null;
           
          
            alert_time != null || alert_time != undefined ?  changeColor(alert_time) : null;

            

            
        } )
            .catch(function (error) {
                console.log(error);
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
            
              });  
        } , [])

    const updateSettings = () => {
        setDisabled(true);
       
        return(
        axios.post("http://"+appContext.serverUrl+"/user/settings/add", {
                        
                     "user_id": props.settings['user_id'],
                     "name" : props.settings['name'],
                     "phone": props.settings['phone'],
                     "alert_time"   : value['alert_time'],
                     "medium"   : props.settings['medium'],
                     "preferred_route" : props.settings['preferred_route'],
                    //  "alert_time_bool"  : value['alert_time_bool'],
                    //  "trip_duration"    : value['trip_duration'],
                    //  "air_pollution"    : value['air_pollution'],
                    //  "road_closure" : value['road_closure'],

        
        })
        .then( function(response){
            //console.log(response['data'],"data in alert screen");
            setDisabled(false);

    })
            .catch(function (error) {
                alert("Error Occured please Update Again");
                setDisabled(false);
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

        const changeColor = (index) => {
            if(index == "On Time" ){
                setSelected({...selected, backgroundColor1: '#6979F8', backgroundColor2: '#CDD2FD',backgroundColor3: '#CDD2FD',backgroundColor4: '#CDD2FD', textColor1:'white',textColor2:colors.primary,textColor3:colors.primary,textColor4:colors.primary});
            }else if (index == "5" ){
                setSelected({...selected, backgroundColor1: '#CDD2FD', backgroundColor2: '#6979F8', backgroundColor3: '#CDD2FD',backgroundColor4: '#CDD2FD', textColor1:colors.primary,textColor2:'white',textColor3:colors.primary,textColor4:colors.primary});
            } else if(index == "10" ){
                setSelected({...selected, backgroundColor1: '#CDD2FD', backgroundColor2: '#CDD2FD', backgroundColor3: '#6979F8',backgroundColor4: '#CDD2FD', textColor1:colors.primary,textColor2:colors.primary,textColor3:'white',textColor4:colors.primary});
            } else if(index == "15" ){
                setSelected({...selected, backgroundColor1: '#CDD2FD', backgroundColor2: '#CDD2FD', backgroundColor3: '#CDD2FD',backgroundColor4: '#6979F8', textColor1:colors.primary,textColor2:colors.primary,textColor3:colors.primary,textColor4:'white'});
            }
            setValue({...value, alert_time : index});
            
            

        }
    

    

    return(

        <View style={styles.container}>
                <View style={styles.rowElements}>
                    <MaterialIcons name="arrow-back" size={25} style={{marginTop : 27,marginLeft:20}} onPress={() => props.navigation.goBack(null)}/>
                    <Text style={{marginTop : 27, marginLeft :68, fontWeight:"600", fontSize: 17, alignItems: 'center', color:'black', }}>Alerts</Text>
                </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginTop:37}}>
                    <Text style={[fonts.fontStyles.subtext,{fontWeight:'600', color:'black', marginLeft:20, marginRight:20 }]}>When do you want the app to send you an alert?</Text>
                </View>
                <View style={{borderBottomColor: '#999999', borderBottomWidth: 1, marginVertical:20, marginHorizontal: 20}}/>
                    <Text style={[fonts.fontStyles.heading6,{marginLeft:20, color:'black', fontWeight:"600"}]}>Time to go</Text>
                    {/* <View style={[styles.rowElements,{marginLeft:20, marginRight:22, justifyContent:'space-between'}]}> */}
                    <View style={[styles.rowCustomize,{marginLeft:20, marginRight: 22}]}>
                        <Text style={[fonts.fontStyles.light_text,{ color:'#999999',  width: '70%', flexWrap:'wrap'}]}>Get alerted when before it is time to leave by the your preferred number of minutes</Text>
                        <Switch
                            style={{
                                marginTop: "2%",
                                backfaceVisibility: "hidden",
                                
                            }}
                            value={value['alert_time_bool']}
                            onValueChange={() => {
                                setValue({...value, alert_time_bool : !value['alert_time_bool']});
                                
                            }}
                            
                            thumbColor={value['alert_time_bool'] ? colors.grey : colors.grey}
                        ></Switch>
                    </View>
                    <View style={[styles.rowElements,{marginLeft:20, marginRight:22, marginTop:16}]}>
                        <TouchableOpacity onPress={()=> {changeColor("On Time"); }} >
                        <View style={{borderWidth: 1,borderColor: colors.grey,justifyContent: "center",alignItems: "center", backgroundColor: selected.backgroundColor1, borderRadius:40, height:38, width:68, marginLeft: 8}}>
                            <Text style={[fonts.fontStyles.normaltext,{color: selected.textColor1,},{ padding: 4,}]}>On Time</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {changeColor("5"); }}>
                        <View style={{borderWidth: 1,borderColor: colors.grey,justifyContent: "center",alignItems: "center", backgroundColor: selected.backgroundColor2, borderRadius:40, height:38, width:81, marginLeft: 8}}>
                            <Text style={[fonts.fontStyles.normaltext,{color: selected.textColor2,},{ padding: 4,}]}>5 minutes</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> changeColor("10")}>
                        <View style={{borderWidth: 1,borderColor: colors.grey,justifyContent: "center",alignItems: "center", backgroundColor: selected.backgroundColor3, borderRadius:40, height:38, width:87, marginLeft: 8}}>
                            <Text style={[fonts.fontStyles.normaltext,{color: selected.textColor3,},{ padding: 4,}]}>10 minutes</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> changeColor("15")}>
                        <View style={{borderWidth: 1,borderColor: colors.grey,justifyContent: "center",alignItems: "center", backgroundColor: selected.backgroundColor4, borderRadius:40, height:38, width:87, marginLeft: 8}}>
                            <Text style={[fonts.fontStyles.normaltext,{color: selected.textColor4,},{ padding: 4,}]}>15 minutes</Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                <View style={{borderBottomColor: '#E4E4E4', borderBottomWidth: 1, marginVertical:20, marginLeft:20, marginRight:20}}/>
                <Text style={[fonts.fontStyles.heading6,{marginLeft:20, color:'black', fontWeight:"600"}]}>Trip duration changed</Text>
                <View style={[styles.rowElements,{marginLeft:20,marginRight:22, justifyContent:'space-between'}]}>
                    <Text style={[fonts.fontStyles.light_text,{ color:'#999999', }]}>Get alerted when a trip duration has{"\n"}changed</Text>
                  
                    <Switch
                        style={{
                            marginTop: "2%",
                            backfaceVisibility: "hidden",
                            
                        }}
                        value={value['trip_duration']}
                        onValueChange={() => {
                            setValue({...value, trip_duration : !value['trip_duration']});
                            
                        }}
                        thumbColor={value['trip_duration'] ? colors.grey : colors.grey}
                        ></Switch>
                        
                </View>
                <View style={{borderBottomColor: '#E4E4E4', borderBottomWidth: 1, marginVertical:20, marginLeft:20, marginRight:20}}/>
                <Text style={[fonts.fontStyles.heading6,{marginLeft:20, color:'black', fontWeight:"600"}]}>Road closure ahead</Text>
                <View style={[styles.rowElements,{marginLeft:20,marginRight:22, justifyContent:'space-between'}]}>
                    
                    <Text style={[fonts.fontStyles.light_text,{ color:'#999999', }]}>When there is road closure ahead of you{"\n"}when you are in a trip</Text>
                  
                    <Switch
                        style={{
                            marginTop: "2%",
                            backfaceVisibility: "hidden",
                            
                        }}
                        value={value['road_closure']}
                        onValueChange={() => {
                            setValue({...value, road_closure : !value['road_closure']});
                           
                        }}
                        thumbColor={value['road_closure'] ? colors.grey : colors.grey}
                        ></Switch>
                        
                </View>
                <View style={{borderBottomColor: '#E4E4E4', borderBottomWidth: 1, marginVertical:20, marginLeft:20, marginRight:20}}/>
                <Text style={[fonts.fontStyles.heading6,{marginLeft:20, color:'black', fontWeight:"600"}]}>Road Air Pollution changed</Text>
                <View style={[styles.rowElements,{marginLeft:20,marginRight:22, justifyContent:'space-between'}]}>
                    
                    <Text style={[fonts.fontStyles.light_text,{ color:'#999999', }]}>when the road of upcoming trip air quailt{"\n"}changed</Text>
                  
                    <Switch
                        style={{
                            marginTop: "2%",
                            backfaceVisibility: "hidden",
                            
                        }}
                        value={value['air_pollution']}
                        onValueChange={() => {
                            setValue({...value, air_pollution : !value['air_pollution']});
                            
                        }}
                        thumbColor={value['air_pollution'] ? colors.grey : colors.grey}
                        ></Switch>
                        
                </View>

                <View style={{justifyContent:'center', alignItems: 'center', marginBottom : 10}}>
                <TouchableOpacity style= {[styles.button, ]} disabled={disabled}
                    onPress={() => updateSettings()}>
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
      },
      rowCustomize:{
        position : "relative" , 
        alignItems:'flex-start',
        flexDirection: 'row',
        width: '90%',
        //flexWrap: 'wrap',
        justifyContent:'space-between',
     },
  
  });
  
  export default AlertScreen