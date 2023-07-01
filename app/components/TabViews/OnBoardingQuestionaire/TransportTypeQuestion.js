import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import fonts from "../../../config/fonts";
import SmallButton from "../../Buttons/SmallButton";
import colors from "../../../config/colors";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";

function TransportTypeQuestion(props) {
  const [isCarChecked, setCarChecked] = useState(false);
  const [isBusChecked, setBusChecked] = useState(false);
    

  return (
    <View style={styles.container}>
      <Text style={fonts.fontStyle.heading3}>How do you often go to {props.responses.tags} ?</Text>
      <View style={{ width: "100%" }}>
        <CheckBox
          title="Car"
          checkedColor={colors.primary}
          checked={isCarChecked}
          onPress={() => setCarChecked(!isCarChecked)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="Bus"
          checkedColor={colors.primary}
          checked={isBusChecked}
          onPress={() => setBusChecked(!isBusChecked)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
            margin: -15,
          }}
        ></CheckBox>
      </View>
      <SmallButton
        style={styles.button}
        title={"Next"}
        onPress={() => {
          var Obj = props.responses;
          Obj.medium = [
            isCarChecked ? "Car" : null,
            isBusChecked ? "Bus" : null,
          ].filter(function (val) {
            if (val != null) return val;
          });
          props.setResponses(Obj);

         
          
          props.navigation.navigate("DaysOfTravelQuestion");
        }}
      ></SmallButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
  textbox: {
    marginTop: 10,
  },
});
export default TransportTypeQuestion;
