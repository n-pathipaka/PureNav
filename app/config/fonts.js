import { StyleSheet } from "react-native";

const fontSizes = {
  primaryHeading: { fontSize: 45 },
  heading1: {fontSize: 36, fontWeight: "600" },
  heading5: { fontSize: 17 },
  heading6: {fontSize: 15},
  heading4: {fontSize: 20, fontWeight: "600" },
};

const fontStyle = {
  heading5: {
    fontSize: 17,
    fontWeight: "600",
  },
  heading3:{
    fontSize:22, 
    fontWeight: "600",
  }
  }
//styleName: Headings/Heading 5 - 17px - SB;




const fontStyles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 28,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 22,
  },
  normaltext: {
    fontSize: 13,
  },
  light_text: {
    fontWeight: "400",
  },
});

export default {
  fontSizes,
  fontStyles,
  fontStyle,
};
