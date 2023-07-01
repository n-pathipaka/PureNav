import React, {useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import {Portal,  Modal} from 'react-native-paper';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import fonts from "../../config/fonts";
import DaysOfTravelQuestion from "../TabViews/OnBoardingQuestionaire/DaysOfTravelQuestion";
import NewAddressQuestion from "../TabViews/OnBoardingQuestionaire/NewAddressQuestion";
import PlaceTitleQuestion from "../TabViews/OnBoardingQuestionaire/PlaceTitleQuestion";
import TimeOfTravelQuestion from "../TabViews/OnBoardingQuestionaire/TimeOfTravelQuestoin";
import TransportTypeQuestion from "../TabViews/OnBoardingQuestionaire/TransportTypeQuestion";
import { ScrollView } from "react-native-gesture-handler";
/**
 * Modal to add a place by the user
 * @param {*} props
 * @returns AddplaceModal
 */
function AddPlaceModal(props) {
  
const [responses, setResponses] = useState({});
const Stack = createNativeStackNavigator();
  

const setModalVisible = props.setModalVisible;
const places = props.places;
const updatePlaces = props.updatePlaces;
const from = props.from;
const setPlacesChanged = props.setPlacesChanged;



  return (
  
    <Portal>
    <Modal
     visible={props.isModalVisible} 
     animationType="slide"
     contentContainerStyle={styles.modal}
     onDismiss={() => {
       if(props.from == "places")
         props.setModalVisible("clear");
       else
         props.setModalVisible(false)
     }}
    >
     
      <View style={styles.container}>
        <View style={styles.heading}>
            <TouchableOpacity onPress={()=> 
                      {
                        if(props.from == "places")
                          props.setModalVisible("clear");
                        else
                          props.setModalVisible(false)
                          
                      }}>
              <Image
                source={require("../../assets/pull_down_rectangle.png")}
                style={{ marginTop: 2, alignSelf: "center" }}
              ></Image>
            </TouchableOpacity>

            <Text style={[fonts.fontStyle.heading5, { marginTop :21 }]}>
                Setup new place
            </Text>
        </View>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            style={{ backgroundColor: "white" }}
            initialRouteName="NewAddressQuestion"
            screenProps={{
              props: props,
            }}
          >
            <Stack.Screen
              name="NewAddressQuestion"
            >
              {props =>  <NewAddressQuestion  {...props} responses={responses} setResponses={setResponses}/>}
            </Stack.Screen>
            
            <Stack.Screen
              name="PlaceTitleQuestion"
            >
              {props => <PlaceTitleQuestion {...props} responses={responses} setResponses={setResponses}/>}
            </Stack.Screen>

            <Stack.Screen
              name="TransportTypeQuestion"
            >
              {props => <TransportTypeQuestion  {...props} responses={responses} setResponses={setResponses}/>}
            </Stack.Screen>

            <Stack.Screen
              name="DaysOfTravelQuestion"
              >
              {props => <DaysOfTravelQuestion {...props} responses={responses} setResponses={setResponses} />}
              </Stack.Screen>

            <Stack.Screen
              name="TimeOfTravelQuestion"
              
            >
              {props => <TimeOfTravelQuestion {...props} setModalVisible={setModalVisible} responses={responses} setResponses={setResponses} places = {places} updatePlaces={updatePlaces} setPlacesChanged = {setPlacesChanged} from={from} />}
             
            </Stack.Screen>
            
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Modal>
    </Portal>
   
  );
}

const styles = StyleSheet.create({
  modal: {
    // flex:1,
    height: "100%",
    justifyContent: 'flex-end',
    marginBottom: -100,
    
  },
  container: {
    height: "90%",
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    
  },
  heading: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "black",
    width: "100%",
    height: "80%",
    marginTop: 37,
  },
});
export default AddPlaceModal;
