import React, {useState} from "react";
import { View, Text, TextInput } from "react-native";
import fonts from "../../config/fonts";
import colors from "../../config/colors";

function RoundedText(props, myKey) {
  //let key = props.key;
  const [text, onChangeText] = useState('+ Add Label');
  return (
    <View>
      <TextInput
        style={{
            borderWidth: 1,
            borderColor: colors.grey,
            justifyContent: "center",
            alignItems: "center",
            color: colors.primary,
            ...props.textStyle,
            ...props.style,
          }} 
      >
        onChangeText={onChangeText}
        value={text}
      </TextInput>
    </View>
  );
}

export default RoundedText;
