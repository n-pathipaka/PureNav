import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Platform } from "react-native";
import {Modal, Portal} from 'react-native-paper';
//import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
//import DatePicker from 'react-native-date-picker';
import colors from "../../config/colors";
import moment from "moment";
import LongButton from "../Buttons/LongButton";
import fonts from "../../config/fonts";
function TimePickerModal(props) {
  const [date, setDate] = useState(new moment());
  //const [date, setDate] = useState(new Date());

  const onChange = (event, value) => {
    setDate(moment(value, "HH:mm"));
    props.onSetTime(date.format(moment.HTML5_FMT.TIME));
    if( Platform.OS === 'android'){
        props.onSetTime(date.format(moment.HTML5_FMT.TIME));
        props.setModalVisible(false);
    }
  };

  const onClose = (event, value) => {
    setDate(moment(value, "HH:mm"));
    console.log(Platform.OS)
    if( Platform.OS === 'android'){
        props.onSetTime(date.format(moment.HTML5_FMT.TIME));
        props.setModalVisible(false);
    }
    else{
        props.setModalVisible(false);
    }

  }

  return (
    <Portal>
    <Modal
       visible={props.isModalVisible} 
       animationType="slide"
       contentContainerStyle={styles.modal}
       onDismiss={() => {
           props.setModalVisible(false)
           
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          props.setModalVisible(false)
        
        }}>
        <Image
          source={require("../../assets/pull_down_rectangle.png")}
          style={{ marginTop: 15, marginBottom: 15, alignSelf: "center" }}
        ></Image>
        </TouchableOpacity>
        <Text style={[fonts.fontStyles.text, fonts.fontStyles.subtext]}>
          Select a time
        </Text>
        <DateTimePicker
          mode="time"
          display={Platform.OS === 'android' ? "clock" : "spinner"}
          value={date == undefined ? new Date() : date.toDate()}
          maximumDate={new Date(2300, 10, 20)}
          is24Hour={true}
          onChange={onChange}
          onClose={onClose}
          //onError={props.setModalVisible(false)}
          themeVariant="Dark"
          style={{
            backgroundColor: colors.grey,
            marginTop: 25,
            marginBottom: 25,
            borderRadius: 10,
            borderWidth: 0,
           
          }}
         />
        <LongButton
          style={{
            alignSelf: "center",
          }}
          disabled={false}
          onPress={() => {
            props.onSetTime(date.format(moment.HTML5_FMT.TIME));
            props.setModalVisible(false);
          }}
          title={"Choose Time"}
        ></LongButton>
      </View>
    </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: { alignItems: "center", justifyContent: "flex-end", margin: 0 },
  container: {
    width: "100%",
    backgroundColor: "white",
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 10,
    justifyContent: "flex-end",

    padding: 15,
  },
  datePicker: { flex: 1, display: "flex" },
});

export default TimePickerModal;
