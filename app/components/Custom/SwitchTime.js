import React, {useState } from "react";
import { Switch, View, StyleSheet} from "react-native";
import colors from "../../config/colors";
import TimePickerModal from "../Modals/TimePickerModal";
import AddressBar from "../TextInputs/AddressBar";

function SwitchTime(props) {
  const [value, setValue] = useState(props.checked);
  const [isTimePickerShow, setTimePickerShow] = useState(false);
  const [time, setTime] = useState();

  const getTime = () => {
    setTimePickerShow(true);
  };

  const updateTime = (value)=> {
    setTime(value);
    props.setTime(value);
  }

  if (!props.isSwitchEnabled) {
    return (
      <View style={styles.container}>
        <AddressBar
          imageSource={require("../../assets/Vectorclock.png")}
          value={time == null ? props.placeholder : props.placeholder.split(" ")[0] +" "+ time}
          onPress={() => {
            console.log("Pressing the modL")
            getTime();
          }}
        ></AddressBar>
        <TimePickerModal
          isModalVisible={isTimePickerShow}
          setModalVisible={setTimePickerShow}
          onSetTime={updateTime}
        ></TimePickerModal>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Switch
          style={{
            backgroundColor: "white",
            marginTop: "2%",
            backfaceVisibility: "hidden",
          }}
          value={value}
          onValueChange={() => {
            setValue(!value);
          }}
          thumbColor={value ? colors.primary : colors.grey}
        ></Switch>
        <AddressBar
          imageSource={require("../../assets/Vectorclock.png")}
          value={time == null ? props.placeholder : time}
          style={[
            props.isSwitchEnabled ? { width: "80%" } : null,
            props.isSwitchEnabled & value
              ? null
              : { backgroundColor: colors.grey },
          ]}
          textStyle={
            props.isSwitchEnabled & value ? null : { color: colors.dark_grey }
          }
          onPress={() => {
            props.isSwitchEnabled & value ? getTime() : null;
          }}
        ></AddressBar>
        <TimePickerModal
          isModalVisible={isTimePickerShow}
          setModalVisible={setTimePickerShow}
          onSetTime={updateTime}
        ></TimePickerModal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default SwitchTime;
