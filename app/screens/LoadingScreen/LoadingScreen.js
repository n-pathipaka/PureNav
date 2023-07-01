import React , {useState, useContext, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppContext from "../../../AppContext";
import { formatAddress } from "../../components/Custom/time";
import { processNextTripDetails, asyncSet } from "../../components/Custom/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";




function LoadingScreen(props)  {

const [isLoading, setIsLoading] = useState(true);

const appContext = useContext(AppContext);

const postSettings = () => {
   axios.post("http://"+appContext.serverUrl+"/user/settings/add", {
       "user_id": appContext.user,
       "setup": true
    })
}





const getNextTrip = (controller) => {
   
    // fetch data whenever the current location got set 
    if(appContext.currentLocation != undefined )
    {
    
    
     axios.post("http://"+appContext.serverUrl+"/trip/next", {
         
               "user_id":appContext.user,
               "src": null,
               "src_lat": appContext.currentLocation.latitude,
               "src_lon": appContext.currentLocation.longitude,
               "src_addr":  formatAddress(appContext.currentLocation.description),
               "interval": 0,
               signal : controller.signal
     
     })
     .then( function(response){
         
         let c= response['data']['Count']
         // process the next trip details 
         let currentTrip = processNextTripDetails(response, appContext.currentLocation.latitude,appContext.currentLocation.longitude, appContext.currentLocation.description)

         console.log("setting current trip from home screen")
         
         // set the current trip details in async storage before setting up the screen.
         asyncSet('@'+ appContext.user + '_currentTrip', JSON.stringify(currentTrip))

         
       } ) .catch( function(error){
           if(!controller.signal.aborted)
           {
               console.log(error)        
           }
       }
     )
   }
 }



useEffect( () => {
  let locController = new AbortController();

  postSettings();
  //  fetch the current trip and store in async storage while the home screen sets up.
  getNextTrip(locController);

  setTimeout(() => {
    setIsLoading(false);
    props.navigation.navigate("HomeScreen");
  }, 3000);

  return () => {
    locController.abort();
  }
}, []);


return (
 
  <View style={styles.container}>
  <ActivityIndicator  size="large" color="#999999"/>
     <Text style={{marginVertical: 10, fontSize: 20, lineHeight: 25, fontWeight: '400'}}>Setting up your home screen</Text>
  </View>

  )
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  
});

export default LoadingScreen