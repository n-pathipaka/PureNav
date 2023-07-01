import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import PropTypes from "prop-types";

/**
 * Button to Add Place
 * @param {*} props OnPress function to be passed
 * @return {*} Pressable Button
 */
function AddPlaceButton(props) {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Text
        style={[
          fonts.fontStyles.text,
          fonts.fontStyles.light_text,
          { color: colors.secondary, fontSize: 16 },
        ]}
      >
        + Add Another Place
      </Text>
    </Pressable>
  );
}

AddPlaceButton.propTypes = {
  onPress: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    height: 64,
    width: "100%",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondary,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
    shadowOpacity: 0.05,
  },
});

export default AddPlaceButton;
