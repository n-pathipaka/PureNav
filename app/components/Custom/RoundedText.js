import React from "react";
import { View, Text } from "react-native";
import fonts from "../../config/fonts";
import colors from "../../config/colors";

function RoundedText(props, myKey) {
  //let key = props.key;
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.grey,
        justifyContent: "center",
        alignItems: "center",
        ...props.style,
      }} 
    >
      <Text
        style={
        [
            fonts.fontStyles.normaltext,
            {
            color: colors.primary,
            },
            { 
                padding: 4,
                ...props.textStyle
            }
        ]}
      >
        {props.text}
      </Text>
    </View>
  );
}

export default RoundedText;
