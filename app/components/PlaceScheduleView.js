import React from "react";
import { View, Text } from "react-native";
import fonts from "../config/fonts";
import colors from "../config/colors";
function ScheduleView(props) {
  //const key = props;
  return (
    <View
      style={{
        height: 38,
        borderRadius: 40,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginRight: 10,
      }}
    >
      <Text
        style={[
          fonts.fontStyles.text,
          fonts.fontStyles.light_text,
          fonts.fontStyles.normaltext,
          {
            color: colors.primary,
          },
        ]}
      >
        {props.schedule}
      </Text>
    </View>
  );
}

export default ScheduleView;
