import React, {useRef, useEffect , useContext} from 'react'
import {StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";
import AppContext from '../../AppContext';

function Map() {

    const mapRef = useRef(null);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if(appContext.currentLocation == undefined)
        {

          return
        };

        mapRef.current.fitToSuppliedMarkers(["currentLocation"],
         {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
         }
        ); 

    }, [appContext.currentLocation])
 
  return (
    
        <MapView style={styles.map}
            ref={mapRef}
            mapType="mutedStandard" 
            initialRegion={{
                latitude: appContext.currentLocation.latitude,
                longitude: appContext.currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
                }}
        > 

        <Marker
            coordinate={{
                latitude: appContext.currentLocation.latitude,
                longitude: appContext.currentLocation.longitude
            }}
            draggable={true} 
            onDragEnd={(e) => {
                appContext.setCurrentLocation({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                })
              }}  
            title="current location"
            identifier="currentLocation" 
        /> 
               
        </MapView> 
        
   
  )
}

export default Map

const styles = StyleSheet.create({

    map: {
      width: "100%",
      height: '40%',
      borderRadius: 13,
      marginBottom: 13,
    },
  });
  