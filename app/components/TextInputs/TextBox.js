import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../../config/colors";

function TextBox(props) {
  const [text, setText] = useState(" ");
  useEffect(() => {
    props.setText(text);
  }, [text]);
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={props.placeholder}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 40,

    borderRadius: 5,
    borderColor: colors.grey,
    borderWidth: 1,

    marginTop: "1%",
    justifyContent: "center",
    paddingLeft: "5%",
  },
});
export default TextBox;
