import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import PlaceView from "../../../components/PlaceView";
import Menu from 'react-native-vector-icons/Feather';
import AddPlaceButton from "../../../components/Buttons/AddPlaceButton";
import EditPlaceModal from "../../../components/Modals/EditPlaceModal";
import ShowPlaceModal from "../../../components/Modals/ShowPlaceModal";
import AddPlaceModal from "../../../components/Modals/AddPlaceModal";
import fonts from "../../../config/fonts";
import axios from "axios";
import AppContext from "../../../../AppContext";
import colors from "../../../config/colors";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Screen to display all the places that are registered for the user
 * @param {*} props
 * @returns view with scrollable view of all the places
 */
function MyPlacesScreen(props) {
  const [isEditPlaceModalVisible, setEditPlaceModalVisible] = useState(false);
  const [isShowPlaceModalVisible, setShowPlaceModalVisible] = useState(false);
  const [isAddPlaceModalVisible, setAddPlaceModalVisible] = useState(false);
  const [isLoading, setLoading]  = useState(true)
  const [internalLoading, setInternalLoading] = useState(false)
  const [modal, setModal] = useState("clear");

  
  const [placeIndex, setPlaceIndex] = useState(0);
  const [places, updatePlaces] = useState([]);
  const [placesChanged, setPlacesChanged] = useState(false);

  const appContext = useContext(AppContext);


  const getPlaces = (controller) => {

    axios.post("http://"+appContext.serverUrl+"/place/all", {
         
              "user_id": appContext.user,
              signal : controller.signal
    })
    .then( function(response){
        // process the data now that it's been fetched
        let c = response['data']['Count']
        let userPlaces = [] 
        

        for(let i = 0; i < c; i++){
            
              let place = response['data']['Items'][i]  
              let id = place['id']
              let name = place['place_name']
              let address = place['address']
              let icon = require("../../../assets/home_icon.png")
              let days_of_week = []
              let medium = ""
              if(place['route_preference'].length > 0){
                days_of_week = place['route_preference'][0]['days_of_week']
                medium = place['route_preference'][0]['medium'][0]
              }
              let tags =  place['tags']
              let emoji = place['emoji']

              userPlaces.push({id: id, name: name, address: address, icon: icon, days_of_week: days_of_week, medium: medium, tags : tags, emoji: emoji})
             
        }
        
        
        updatePlacesView(userPlaces)
        setLoading(false)
       
      } )
      .catch(function(error){
        if(!controller.signal.aborted)
           console.log(error)
      })
    } 

    const setUpLoad = async () => {
      let key =  '@'+ appContext.user + '_places';
      try {
        const savedSetup = await AsyncStorage.getItem(key);
        if (savedSetup !== null) {
            let storedPlaces = JSON.parse(savedSetup)
            updatePlaces(storedPlaces);
            setLoading(false)
        }
        else{
            console.log("Unable to load places")
            
        }
        } catch (err) {
            console.log(err);
        }
    };

  {/* for initial fetch */}
  useEffect(() => {
    let placesController = new AbortController();
    console.log("isLoading:", isLoading)
    setLoading(true)
    setUpLoad();
    getPlaces(placesController)
    return () => {
        placesController.abort()
    }
  }, []);

  {/* for places update */}
  useEffect(() => {
    let placesController = new AbortController();
    getPlaces(placesController)
    return () => {
        placesController.abort()
    }
  }, [appContext.dataChanged]);

  useEffect(() => {
    let placesController = new AbortController();
    setLoading(false)
    console.log("Checking Places whenever user logs in or out")
    getPlaces(placesController)
    return () => {
        placesController.abort()
    }
 }, [appContext.user]);

 /**
  *  Places controller, adds new place, edit and delete the places..
  */

  useEffect(() => {
    let placesController = new AbortController();
    switch (modal) {
      case "clear": //All the modals arent invisible
        setTimeout(() => { getPlaces( placesController)}, 1000);
        
        setEditPlaceModalVisible(false);
        setAddPlaceModalVisible(false);
        setShowPlaceModalVisible(false);
       
        break;
      case "show_place": //show place modal is visible
        setEditPlaceModalVisible(false);
        setAddPlaceModalVisible(false);
        setTimeout(() => {
          setShowPlaceModalVisible(true);
        }, 500);
        break;
      case "edit_place": //edit place modal is visible
        setAddPlaceModalVisible(false);
        setShowPlaceModalVisible(false);
        setTimeout(() => {
          setEditPlaceModalVisible(true);
        }, 500);
        break;
      case "add_place": // add place modal is visible
        setEditPlaceModalVisible(false);
        setShowPlaceModalVisible(false);
        setTimeout(() => {
          setAddPlaceModalVisible(true);
        }, 500);
        break;
    }
    return () =>{
      placesController.abort()
    }
  }, [modal]);

  /**
   * PlaceObject
   * {
   *    place: "Home", # name of this place
   *    icon: "emoji option", #emoji chosen for the given place
   *    address: "220 Summit Blvd, Apt 222, Broomfield Co 80021", # address of the place
   *    schedules: [('day-of-week',time), ('day-of-week',time)],
   *    transport: 'car',
   *
   * }
   *
   */


  const onSelect = (index) => {
    setPlaceIndex(index);
    setModal("show_place");
  };

  const updatePlacesView = (places) => {
    updatePlaces(places);
    let key =  '@'+ appContext.user + '_places';
    (async () => {
      try {
         await AsyncStorage.setItem(key, JSON.stringify(places));
      }
       catch (e) {
         console.log(e);
       }
    })();
  };

  function placeList(places) {

    
    if (places == null) {
      return null;
    }
    return places.map((x, index) => (
      <PlaceView
        id = {x.id}
        place={!x.tags? x.name: x.tags}
        icon={x.icon}
        emoji={x.emoji  ==  undefined? "U+1F3EB" : x.emoji}
        address={x.address}
        schedules={x.days_of_week}
        key={index}
        onPress={() => {
          onSelect(x.id);
        }}
      ></PlaceView>
   ));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, margin:10 }}>
          <View style={{ width: "100%" }}>
            <TouchableOpacity onPress= {() => props.navigation.toggleDrawer()}>
             <Menu name = 'menu' size ={28} color = {colors.dark_grey} style = {{paddingBottom:4}}/>
            </TouchableOpacity>
            <Text
              style={[
                fonts.fontSizes.heading1,
                {marginBottom: 20 },
              ]}
            >
              My Places
            </Text>
          </View>
        {isLoading ? (
          <View style = {{ justifyContent:"center", alignItems: "center"}}>
            <ActivityIndicator  size="large" color="#999999"/>
          </View>
        ) : (
         <>
        {places.length > 0 ? (
          <>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
          {placeList(places)}
          <AddPlaceButton
            onPress={() => 
              setModal("add_place")
            }
          ></AddPlaceButton>
          </ScrollView>

         <ShowPlaceModal
          modal={"show_place"}
          places={places}
          updatePlaces={updatePlacesView}
          placeIndex={placeIndex}
          isModalVisible={isShowPlaceModalVisible}
          setModalVisible={setModal}
          setPlacesChanged={setPlacesChanged}
          editPlace={() => {
            setModal("edit_place");
          }}
        ></ShowPlaceModal>

        <EditPlaceModal
          modal={"edit_place"}
          places={places}
          placeIndex={placeIndex}
          isModalVisible={isEditPlaceModalVisible}
          setModalVisible={setModal}
          updatePlaces={updatePlacesView}
        ></EditPlaceModal>

       
        <AddPlaceModal
          isModalVisible={isAddPlaceModalVisible}
          setModalVisible={setModal}
          places={places}
          updatePlaces={updatePlacesView}
          setPlacesChanged={setPlacesChanged}
          from={"places"}
          modal={"add_place"}
        ></AddPlaceModal>
        </>
        ) : (  
           <View style={{justifyContent: "center", alignItems: "center", height: '8%'}}>
            <AddPlaceButton
              onPress={() => 
                setModal("add_place")
              }
            ></AddPlaceButton>

            <AddPlaceModal
              isModalVisible={isAddPlaceModalVisible}
              setModalVisible={setModal}
              places={places}
              updatePlaces={updatePlacesView}
              from={"places"}
              modal={"add_place"}
            ></AddPlaceModal>

         </View>)}
         </>
          )}
      
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:34,
    backgroundColor: '#fff'
  },
  scroll: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    paddingBottom: 10,
  },
});
export default MyPlacesScreen;
