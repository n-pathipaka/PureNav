import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function SmallButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.style != null ? props.style : null]}
    >
      <Text
        style={[styles.text, props.textStyle != null ? props.textStyle : null]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6979F8",

    width: 146,
    height: 50,

    borderRadius: 5,

    alignItems: "center",
    justifyContent: "center",

    opacity: 10,
  },
  text: {
    color: "white",
    textDecorationStyle: "solid",
    fontWeight: "300",
  },
});

export default SmallButton;
