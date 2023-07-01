import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";

function AddressBar(props) {

return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.container, props.style]}
    >
      <Image source={props.imageSource} style={styles.image}></Image>
      <Text style={[styles.text, props.textStyle]}>{props.value}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRadius: 3,

    marginTop: "3%",

    height: 50,
    flexDirection: "row",

    alignContent: "center",
    width: "100%",
  },
  image: {
    marginLeft: "10%",
    marginRight: "5%",
    alignSelf: "center",
  },
  text: {
    color: "#151522",
    fontWeight: "300",
    fontSize: 13,
    alignSelf: "center",
  },
});
export default AddressBar;
