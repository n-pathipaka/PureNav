import React, {useContext} from 'react'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { GOOGLE_MAP_KEY } from "../../constants/GoogleApiKey";
import AppContext from '../../../AppContext';


function AutoCompleteBar(props) {

  const appContext = useContext(AppContext);
  return (
         
         <GooglePlacesAutocomplete
              placeholder={ !props.address ? 'Address' : props.address}
              fetchDetails={true}  
              styles={{
                container: {
                  flex:0,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#ddd',
                  marginVertical: 10,
                  width: '100%'
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
                
               appContext.setCurrentLocation({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  description: data.description
               })

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

export default AutoCompleteBar