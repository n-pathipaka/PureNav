import React, { useState , useContext, useEffect} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {Portal,Modal} from "react-native-paper";
import { CheckBox } from "react-native-elements";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import ScheduleTabView from "../TabViews/ScheduleTabView";
import LongButton from "../Buttons/LongButton";
import TextBox from "../TextInputs/TextBox";
import AutoCompleteBar from "../AutoComplete/AutoCompleteBar";
import axios from "axios";
import AppContext from "../../../AppContext";
import {ShowEmoji} from "../Custom/ShowEmoji";
import { ScrollView } from "react-native-gesture-handler";

/**
 * edit the details of a place in the user places screen
 * @param {*} props
 * @returns modal/view with edit options
 *
 * TODO:
 * - Add emoji list and emoji handling
 * - Handle place details update
 * - Add address selection modal
 * - add logic to update time and also logic to which scheduling is used
 * - add logic to update all the preferences
 */

function EditPlaceModal(props) {

  
 
  const place = props.places.filter(place => place.id === props.placeIndex)[0];
  const [responses, setResponses] = useState({});
  const appContext = useContext(AppContext);
  const [selectEmoji, setSelectEmoji] = useState([])
  const [placeTag, setPlaceTag] = useState(place!=undefined? place.tags : "");
  const [emoji, setEmoji] = useState([]);
  const [userEmoji, setUserEmoji] = useState([]);
  const [schedules, updateSchedules] = useState({})
  const mode = { 'car' : false, 'bus' : false, 'bike' : false, 'walk' : false}
  const [checked, setChecked] = useState(mode);

  const [disabled, setDisabled] = useState(false)


  useEffect(() => {

    if(place!=undefined){

      console.log("checking medium")
   
    if(place.medium == "Car")
      setChecked({...checked, car : true})
    else if(place.medium == "Bus")
    setChecked({...checked, bus: true})
    else if(place.medium == "Bike")
      setChecked({...checked, bike: true})
    else if(place.medium == "Walk")
      setChecked({...checked, walk: true})
    else if(place.medium == "")
      setChecked({...checked, walk: true})
    }
    
    getEmoji()
    
  },[])

  const getEmoji = () => {

    axios.post("http://"+appContext.serverUrl+"/emojis/get")
    .then( function(response){
      
      // process the data now that it's been fetched
      let c = response['data']['Count']
      let emojis = [] 
      for(let i = 0; i < c; i++){
        let emoji = response['data']['Items'][i] 
        emojis.push(emoji)
      }
      setEmoji(emojis)
    })
    .catch( function(error){
      console.log(error)
    })
  }

  const updatePlace = (schedules, place) => {
         setDisabled(true)      

         Object.keys(schedules).map((key, index1) => {

           place.days_of_week =  schedules[key]

         })
          if(placeTag != " ")
            place.tags = placeTag 

          if(appContext.currentLocation != undefined)
          {
           
            place.address = appContext.currentLocation.description
            place.lat = appContext.currentLocation.latitude
            place.lng = appContext.currentLocation.longitude
            place.name = appContext.currentLocation.description.split(",")[0]

          }

          place.user_id = appContext.user
          place.medium = Object.keys(checked).filter(key => checked[key] === true)
          place.dst = place.id
          place.emoji = userEmoji.length > 0 ? userEmoji : "U+1F3EB"

          let currentPlaces = props.places

          currentPlaces.splice(currentPlaces.findIndex(x => x.id === place.id), 1, place)

          props.updatePlaces(currentPlaces)

      

    axios.post("http://"+appContext.serverUrl+"/place/add", place)
    .then( function(response){
      } ) 
      .catch( function(error){
        console.log("add place failed")
      }
    )

    // update the schedules.

    axios.post("http://"+appContext.serverUrl+"/addRoutePreference", place)
    .then( function(response){
         // update the data change state.
         appContext.setDataChanged(!appContext.dataChanged)
         props.setModalVisible("clear");
      } ) 
      .catch( function(error){
        console.log(error)
    }
    )
    // Enabling the button again
    setDisabled(false)  
  }

  return (
    <Portal>
    <Modal
       visible={props.isModalVisible} 
       animationType="slide"
       contentContainerStyle={styles.modal}
       onDismiss={() => {
           props.setModalVisible("clear");
           //props.setModalVisible(false);
      }}
    >
      {place != undefined ? (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> 
                            {
                                props.setModalVisible("clear")}}>
          <Image
            source={require("../../assets/pull_down_rectangle.png")}
            style={{ marginTop: "1%", alignSelf: "center" }}
          ></Image>
        </TouchableOpacity>
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
          {/* Heading */}
          <View style={(styles.address, { marginTop: 5 })}>
            <Text
              style={[
                fonts.fontStyles.text,
                fonts.fontStyles.subtext,
                fonts.fontSizes.heading5,
              ]}
            >
              Place Name
            </Text>
            <TextBox
              style={styles.textbox}
              placeholder= {!place.tags? place.name: place.tags}
              setText={setPlaceTag}
            ></TextBox>
          </View>

          {/* Emojie Scroll View */}
          <View style={[styles.address, { marginTop: "5%" }]}>
            <Text
              style={[
                fonts.fontStyles.text,
                fonts.fontStyles.subtext,
                fonts.fontSizes.heading5,
              ]}
            >
             Emojies
            </Text>
            {/* //{showEmoji(emoji)} */}
              <ShowEmoji emoji = {emoji}  setUserEmoji = {setUserEmoji} />
            <ScrollView
              styles={styles.scroll}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyboardShouldPersistTaps='always'
            ></ScrollView>
          </View>

          {/* Address Space */}
          <View style={styles.address}>
            <Text
              style={[
                fonts.fontStyles.text,
                fonts.fontStyles.subtext,
                fonts.fontSizes.heading5,
              ]}
            >
              Address
            </Text>
            <AutoCompleteBar address = {place.address}/>
          </View>

          {/* Check boxes - How do you go to work*/}
          <View style={styles.checkbox}>
            <Text
              style={[
                fonts.fontStyles.text,
                fonts.fontStyles.normaltext,
                fonts.fontSizes.heading5,
                { marginBottom: 1, marginTop: 3 },
              ]}
            >
              How often do you go to work
            </Text>
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
         
           
            <View style={styles.schedule}>
              <Text
                style={[
                  fonts.fontStyles.text,
                  fonts.fontStyles.normaltext,
                  { marginBottom: 5 },
                ]}
              >
                You have to be there at
              </Text>
                <ScheduleTabView place={place} schedule = {schedules} updateSchedules = {updateSchedules}/>
            </View> 
         
          
          <LongButton disabled = {disabled} title="Update Preferences" style = {{marginBottom: '20%'}} onPress={() => updatePlace(schedules, place)}></LongButton>
          
        
        </ScrollView>
      </View>
      ) : ( null )}
    </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    //justifyContent: "flex-end",
    height:'100%',
    marginBottom: -100
  },

  container: {
    flex:0,
    height: "90%",
    width: "100%",
    backgroundColor: "white",
    marginBottom: -50 ,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  address: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  schedule: {
    marginTop: 10,
  },
  emojieBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.grey,

    width: 46,
    height: 41,
    alignItems: "center",
    justifyContent: "center",

    margin: 5,
  },
  image: {
    width: 13,
    height: 19,
  },
  scroll: {
    width: "100%",
    height: "50%",
  },
  textbox: {
    marginTop: 10,
  },
});
export default EditPlaceModal;
