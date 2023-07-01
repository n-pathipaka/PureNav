import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import fonts from "../../../config/fonts";
import SmallButton from "../../Buttons/SmallButton";
import colors from "../../../config/colors";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {ScrollView, scrollView} from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
function DaysOfTravelQuestion(props) {

  

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [
    daysOfWeek, setDaysOfWeek] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const setDaysOfWeekChecked = (day) => {
    const days = daysOfWeek;
    days[day] = !daysOfWeek[day];
    setDaysOfWeek([...days]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={fonts.fontStyle.heading3}>
        What specific days do you go there?
      </Text>
      <View style={{ width: "100%", height: "100%" }}>
        <CheckBox
          title="Monday"
          checkedColor={colors.primary}
          checked={daysOfWeek[0]}
          onPress={() => setDaysOfWeekChecked(0)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="Tuesday"
          checkedColor={colors.primary}
          checked={daysOfWeek[1]}
          onPress={() => setDaysOfWeekChecked(1)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="Wednesday"
          checkedColor={colors.primary}
          checked={daysOfWeek[2]}
          onPress={() => setDaysOfWeekChecked(2)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="Thursday"
          checkedColor={colors.primary}
          checked={daysOfWeek[3]}
          onPress={() => setDaysOfWeekChecked(3)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="Friday"
          checkedColor={colors.primary}
          checked={daysOfWeek[4]}
          onPress={() => setDaysOfWeekChecked(4)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="Saturday"
          checkedColor={colors.primary}
          checked={daysOfWeek[5]}
          onPress={() => setDaysOfWeekChecked(5)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
        <CheckBox
          title="Sunday"
          checkedColor={colors.primary}
          checked={daysOfWeek[6]}
          onPress={() => setDaysOfWeekChecked(6)}
          containerStyle={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        ></CheckBox>
      


      <SmallButton
        style={styles.button}
        title={"NEXT"}
        onPress={() => {
          const travels = daysOfWeek
            .map((x, index) => {
              return x ? days[index] : null;
            })
            .filter(function (val) {
              if (val != null) return val;
            });
          var Obj = props.responses;
          

          //Obj.days_of_week = travels;
          // convert travels to json.
          Obj.days = travels;
          // check obj.days_of_week is null or not.

          props.setResponses(Obj);

          // traverse days_of_week and set "9:00PM" to each key.
          // let r = {}
          // r[Obj.days_of_week[0]] = ["9:00PM"];
          // // append "10;00PM" to Obj.days_of_week[0]
          // r[Obj.days_of_week[0]].push("10:00PM");
          
          props.navigation.navigate("TimeOfTravelQuestion");
        }}
      ></SmallButton>

      </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  textbox: {
    marginTop: 10,
  },
});
export default DaysOfTravelQuestion;
