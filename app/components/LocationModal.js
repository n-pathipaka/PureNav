import React, {useContext, useState} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Modal , Portal} from 'react-native-paper';
import fonts from "../config/fonts";
import AutoCompleteBar from "./AutoComplete/AutoCompleteBar";
import Map from "./Map";
import LongButton from "./Buttons/LongButton";
import AppContext from "../../AppContext";
import axios from 'axios';




//<CustomTextInput placeholder={"Search or enter an address"} />
//<TouchableOpacity onPress={props.setModalVisible(false)}>

function LocationModal(props) {
  
  const [homeAddress, setHomeAddress] = useState([])
  const [disabled, setDisabled] = useState(false)
  const appContext = useContext(AppContext);


  const postDetails = () => {

    axios.post("http://"+appContext.serverUrl+"/place/add", homeAddress) // add place to database
    .then( function(response){
        console.log("succesfully added home")
    })
    .catch( function(error) {
        console.log(error)
    })
 }


  const onLocationOnPress = () => {
    setDisabled(true)

    setHomeAddress({ user_id : appContext.user,
          lat: appContext.currentLocation.latitude,
          lon: appContext.currentLocation.longitude,
          address: appContext.currentLocation.description,
          tags: "Home" })

    postDetails();

    setDisabled(false)

    props.setModalVisible(false);


  };
  return (
    <Portal>
    <Modal
      visible={props.isModalVisible} 
      animationType="slide"
      contentContainerStyle={styles.modal}
      onDismiss={() => {
          props.setModalVisible(false);
      }}
     >
      <View style={styles.container}>
        <Image source={require("../assets/pull_down_rectangle.png")}></Image>
        <Text style={[fonts.fontStyle.heading5, {marginVertical: 10}]}>
           Send Location
        </Text>
        <AutoCompleteBar />
        {<Map />}
        <Text style = {{fontSize: 17, marginBottom: 30}}>{appContext.currentLocation == undefined ? "Current Location" : appContext.currentLocation.description}</Text>
        <LongButton
          disabled={disabled}
          title={"Set location"}
          onPress={onLocationOnPress}
        ></LongButton>
      </View>
    </Modal>
    </Portal>
  );
}

export default LocationModal;

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    backgroundColor: "white",

    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    
    marginBottom: -100,
},
  map: {
    width: "100%",
    height: "35%",

    borderRadius: 13,
    marginBottom: 13,
  },
});
