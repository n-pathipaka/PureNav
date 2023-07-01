import {React, useState, useEffect, useContext} from "react";
import { StyleSheet} from "react-native";
import colors from "../../../config/colors";
import UserInfo from "./UserInfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen2 from "./SettingsScreen2";
import AlertScreen from "./AlertScreen";
import TravelScreen from "./TravelScreen";
import axios from 'axios';
import AppContext from "../../../../AppContext";


function SettingsScreen(props) {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const Stack = createNativeStackNavigator();
  const [settings, setSettings] = useState([]);
  const appContext = useContext(AppContext);
 
  const toggleDrawer = props.navigation.toggleDrawer

  const getSettings = (controller) => {

        axios.post("http://"+appContext.serverUrl+"/user/settings/get", {
                        
                  "user_id": appContext.user,
                   signal : controller.signal
            })
            .then( function(response){

               setSettings(response['data']['Item'])
            } )
            .catch(function (error) {
              if(!controller.signal.aborted)
                  console.log(error)

            });  
  }

   
  useEffect(() => {

        let settingsController = new AbortController();
        getSettings(settingsController);
        return () => {
            settingsController.abort();
        }
   
    } , [settings])
   


  return (
    
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={SettingsScreen2}
                style={{ backgroundColor: "white" }}
                screenProps={{
                  props: props,
                 }} 
                >
                <Stack.Screen
                    name="Settings"
                >
                {props =>  <SettingsScreen2  {...props} toggleDrawer={toggleDrawer} />}
                </Stack.Screen>
                <Stack.Screen
                    name="UserInfo"
                    
                    >
                    {props =>  <UserInfo  {...props} settings={settings} setSettings={setSettings}/>}

                    </Stack.Screen>
                <Stack.Screen
                    name="AlertScreen"
                   >
                    {props =>  <AlertScreen  {...props} settings={settings} setSettings={setSettings}/>}

                </Stack.Screen>
                <Stack.Screen
                    name="TravelScreen"
                    >
                    {props =>  <TravelScreen  {...props} settings={settings} setSettings={setSettings}/>}
                    </Stack.Screen>
            </Stack.Navigator>
      </NavigationContainer>
    
 
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

export default SettingsScreen;
