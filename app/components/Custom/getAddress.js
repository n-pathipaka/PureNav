import React from 'react'
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAP_KEY } from '../../constants/GoogleApiKey';

 
export const getAddress =  (latitude, longitude) => {
    Geocoder.init(GOOGLE_MAP_KEY);
    return  Geocoder.from(latitude, longitude)
        .then(json => {
            
        var addressComponent = json.results[0].address_components;
        var formattedAddress = json.results[0].formatted_address;
        // var address = "";
        // for (var i = 0; i < addressComponent.length; i++) {
        //     if (addressComponent[i].types[0] === "locality") {
        //     address = addressComponent[i].long_name;
        //     break;
        //     }
        // }

        //console.log(latitude, longitude, formattedAddress)
       
        return  formattedAddress;
        })
        .catch(error => {
        console.log(error);
        });
}