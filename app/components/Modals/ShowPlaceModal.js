import axios from "axios";
import {React, useContext, useState} from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import {Portal, Modal} from 'react-native-paper';
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import LongButton from "../Buttons/LongButton";
import AddressBar from "../TextInputs/AddressBar";
import AppContext from "../../../AppContext";
import { ScrollView } from "react-native-gesture-handler";


function ShowPlaceModal(props) {

   
  // filter the place from props.places with id 24.
  const state = props.places.filter(place => place.id === props.placeIndex)[0];
  const appContext = useContext(AppContext);

  const [disabled, setDisabled] = useState(false)

  const showEmoji = (item) => {

    let x = String.fromCodePoint(parseInt(item.split("+")[1],16))

    return <Text style = {{fontSize: 28}}>{x}</Text>

  }

  const deletePlace = (placeId) => {
    axios.post("http://"+appContext.serverUrl+"/place/remove", { 
        id: placeId
  }).then(res => {
      appContext.setDataChanged(!appContext.dataChanged)

  }).catch(err => {
    console.log(err)
  }
  )
}
  return (
    <Portal>
    <Modal
       visible={props.isModalVisible} 
       animationType="slide"
       contentContainerStyle={styles.modal}
       onDismiss={() => {
           props.setModalVisible("clear");
           }}
      >
      { state != undefined ? (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> 
                            {
                                props.setModalVisible("clear")}}>
        <Image
          source={require("../../assets/pull_down_rectangle.png")}
          style={{ marginTop: 20, alignSelf: "center" }}
        ></Image>
        </TouchableOpacity>
        <ScrollView  style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
        <View style={styles.heading}>
          { state.emoji && showEmoji(state.emoji)}
          <Text style={[fonts.fontStyles.text, { color: colors.primary }]}>
            {state.tags}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={[
              fonts.fontStyles.text,
              fonts.fontStyles.subtext,
              fonts.fontSizes.heading5,
              { marginBottom: 8 },
            ]}
          >
            {state.name + " " + "Address"}
          </Text>
          <Text
            style={[
              fonts.fontStyles.text,
              fonts.fontStyles.subtext,
              fonts.fontStyles.light_text,
              fonts.fontSizes.heading6,
            ]}
          >
            {state.address}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={[
              fonts.fontStyles.text,
              fonts.fontStyles.subtext,
              fonts.fontSizes.heading5,
              { marginBottom: 8 },
            ]}
          >
            {"I go mostly by "}
          </Text>
          <Text
            style={[
              fonts.fontStyles.text,
              fonts.fontStyles.subtext,
              fonts.fontStyles.light_text,
              fonts.fontSizes.heading6,
            ]}
          >
            {state.medium}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={[
              fonts.fontStyles.text,
              fonts.fontStyles.subtext,
              fonts.fontSizes.heading5,
              { marginBottom: 8 },
            ]}
          >
            {"I have to be there on"}
          </Text>
          <ScrollView
            style={styles.schedule}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='always'
          >
          <>
          {Object.keys(state.days_of_week).map((key) => (<AddressBar
          imageSource={require("../../assets/Vectorclock.png")}
          value={key + " before " + state.days_of_week[key].join(",")}
          key={state.id}
          />))}
          </>
            
          </ScrollView>
        </View>

        <LongButton
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: "white",
          }}
          textStyle={[
            { color: colors.primary },
            fonts.fontStyles.light_text,
            fonts.fontSizes.heading5,
          ]}
          title={"Edit"}
          onPress={() => {
            props.editPlace();
          }}
        ></LongButton>
        <LongButton
          style={{
            marginTop: 20,
            marginBottom: '20%',
            borderWidth: 1,
            borderColor: colors.red,
            backgroundColor: "white",
          }}
          textStyle={[
            { color: colors.red },
            fonts.fontStyles.light_text,
            fonts.fontSizes.heading5,
          ]}
          backgroundColor={"white"}
          title={"Delete"}
          onPress={() => {
            //setDisabled(true)
            let newPlaces = props.places.filter(place => place.id !== props.placeIndex);
            props.updatePlaces(newPlaces);
            console.log("Deleted Places")

            deletePlace(state.id)
            setTimeout(() => {
              props.setModalVisible("clear");
            }, 1000);

           // setDisabled(false)  
            
          }}
        ></LongButton>
        </ScrollView>
      </View>
      ) : ( null )}
    </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal:{
    height: '100%',
    justifyContent: 'flex-end',
    marginBottom: -80

  },
  // modal: {
  //   flex:1,
  //   flexGrow: 1,
  //   justifyContent: "flex-end",
  //   marginBottom: -100,
  // },
  container: {
    height: '90%',
    width: "100%",
    backgroundColor: "white",
    //marginBottom: -50,
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 27,

    //justifyContent: "center",
    //alignItems: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // marginTop: 5,
  },
  schedule: {
    width: "100%",
    height: "20%",
  },
  scroll: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    paddingBottom: 10,
  },
});

export default ShowPlaceModal;
