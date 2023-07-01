import React, { useState , useContext} from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import fonts from "../../../config/fonts";
import SmallButton from "../../Buttons/SmallButton";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { GOOGLE_MAP_KEY } from "../../../constants/GoogleApiKey"; 


import Map from "../../Map";

import AppContext from "../../../../AppContext";
import { ScrollView } from "react-native-gesture-handler";


 
function NewAddressQuestion(props) {

  const appContext = useContext(AppContext);
  const [isMandatory, setIsMandatory] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const showPlaceAutoComplete = () => {

    return (

     
      <GooglePlacesAutocomplete
            placeholder='Address' 
            fetchDetails={true}  
            styles={{
              container: {
                flex:0,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ddd',
                marginVertical: 10
              },
              textInput:{
                fontSize: 16 ,
                
              },

              textInputContainer:{
                paddingHorizontal: 10,
                paddingBottom:0,
                
              }
              
            }} 
            
            
            onPress={(data, details =  null) => {
              // 'details' is provided when fetchDetails = true

              
              setIsSet(true)
            
              // appContext.setCurrentLocation({
              //   latitude: details.geometry.location.lat,
              //   longitude: details.geometry.location.lng,
              //   description: data.description
              //  })

              const response = props.responses

              response.location = details.geometry.location;
              response.lat = details.geometry.location.lat;
              response.lon = details.geometry.location.lng;
              response.address = data.description;
              response.name = details.name;

              
    
              props.setResponses(response);
              

            }
            } 
           
            enablePoweredByContainer={false}
            textInputProps={{
              placeholderTextColor: '#151522',
              
            }}
            returnKeyType={'search'}
          
            minLength={2}
            query={{
              key: GOOGLE_MAP_KEY,
              language: "en",
              components: "country:us", 
              
              
            }}
            debounce={200}
          />
 
       

    )


  }

  console.log("New Address Question")

  return (

    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <Text style={fonts.fontStyle.heading3}>
        What is the address of the new place?
      </Text>
     
      {showPlaceAutoComplete()}
      {isMandatory && <Text style={{color:'red'}}>This is a mandatory field, please select the location.</Text>}
      
      {appContext.currentLocation != undefined && <Map /> }
     
    
      <SmallButton
        style={styles.button}
        title={"Next"}
        onPress={() => {
          if(isSet){
            console.log("naviagting to other screen")
            props.navigation.navigate("PlaceTitleQuestion");
          }
          else{
            setIsMandatory(true)
            
          }
          //props.navigation.navigate("PlaceTitleQuestion");
          
        }}
      ></SmallButton>
     {/* </ScrollView> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    backgroundColor: "white",
    // padding: 16,
    // paddingTop: 25,
  },
  button: {
    marginTop: 10,
    alignSelf: "flex-end",
    //width: 100,
  },
});
export default NewAddressQuestion;
