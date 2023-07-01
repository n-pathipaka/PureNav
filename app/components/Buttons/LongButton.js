import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../../config/colors";
/**
 * Return a long button component
 * @param {*} props
 * @return {*} Pressable button
 */
function LongButton(props) {
 
  return (
    <TouchableOpacity
      disabled={props.disabled !== undefined ? props.disabled : false}
      onPress={props.onPress}
      style={[styles.container, props.style ? props.style : null,  props.disabled !== undefined ? ( !props.disabled ?  {backgroundColor: "#6979F8"}: {backgroundColor: colors.grey}) : (null)]}
    >
      <Text style={[styles.text, props.textStyle ? props.textStyle : null]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

LongButton.propTypes = {
  onPress: PropTypes.any,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#6979F8",

    width: "100%",
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

export default LongButton;
