import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import fonts from "../../../config/fonts";
import SmallButton from "../../Buttons/SmallButton";
import colors from "../../../config/colors";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";

function CommonTimeQuestion(props) {
  const [isEveryDay, setEveryDay] = useState(false);
  const [isDifferentDays, setDifferentDays] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={fonts.fontStyle.heading3}>
        Is there a common time where you have to be there for the selected days?
      </Text>
      <View style={{ width: "100%", height: "50%" }}>
        <CheckBox
          title="Yes"
          checkedColor={colors.primary}
          checked={isEveryDay}
          onPress={() => setEveryDay(!isEveryDay)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="No, everyday is different"
          checkedColor={colors.primary}
          checked={isDifferentDays}
          onPress={() => setDifferentDays(!isDifferentDays)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
            margin: -15,
          }}
        ></CheckBox>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SmallButton
          style={styles.button}
          title={"Back"}
          onPress={() => {
            props.nextQuestion(1);
          }}
        ></SmallButton>
        <SmallButton
          style={styles.button}
          title={"Next"}
          onPress={() => {
            props.nextQuestion(1);
          }}
        ></SmallButton>
      </View>
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
export default CommonTimeQuestion;
