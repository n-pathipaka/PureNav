import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { GOOGLE_MAP_KEY } from "../../constants/GoogleApiKey";



function Test() {
    

        const details = () => {
    
        }
    
        return (
          
          
          
    
          <GooglePlacesAutocomplete
                placeholder='search'
                keepResultsAfterBlur={true}
                styles={{
                  container: {
                    paddingVertical: 100
                  },
                  textInput:{
                    fontSize: 16 ,
                  },
                  zIndex: 999,
                }} 
                listViewDisplayed={false}
                onPress={details}
               
                fetchDetails={true}
                enablePoweredByContainer={false}
                textInputProps={{
                  placeholderTextColor: '#151522',
                  
                }}
              
                
                query={{
                  key: 'AIzaSyBoBDraxeL4lK2Ds0fwqNRm-acp6_b1PzY',
                  language: "en",
                  components: "country:us",
                  
                  
                }}
                debounce={200}
              />
     
        
    
        )
    
    
    
}

export default Test