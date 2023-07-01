import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../config/colors";
import SmallButton from "./SmallButton";
SmallButton;
function AddPlace(props) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          styles.subtext,
          { color: colors.primary, width: 193, marginHorizontal: 10 },
        ]}
      >
        Work
      </Text>
      <SmallButton
        title={"Setup"}
        onPress={props.onPress}
        style={{
          width: 90,
          height: 44,
        }}
      ></SmallButton>
    </View>
  );
}

export default AddPlace;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 16,
    height: 76,

    alignItems: "center",
    padding: 16,

    borderRadius: 4,
    shadowOpacity: 0.1,
    elevation: 0.1,
  },
  text: {
    color: "black",
    fontSize: 28,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 22,
    marginBottom: 16,
  },
});
