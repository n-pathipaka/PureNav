import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import fonts from "../../../config/fonts";
import SmallButton from "../../Buttons/SmallButton";
import TextBox from "../../TextInputs/TextBox";

function PlaceTitleQuestion(props) {
  const placeHolder = "Work, School, Kids School, etc ..";
  const [placeTitle, setPlaceTitle] = useState(placeHolder);

  const [isMandatory, setIsMandatory] = useState(false);


  return (
    <View style={styles.container}>
      <Text style={fonts.fontStyle.heading3}>What do you want to call it?</Text>
      <TextBox
        style={styles.textbox}
        placeholder= {placeHolder}
        setText={setPlaceTitle}
      ></TextBox>
      {isMandatory && <Text style={{color:'red'}}> Set a tag, if the place is a regular destination for better use.</Text>}
     
      <SmallButton
        style={styles.button}
        title={"Next"}
        onPress={() => {
         
          const response = props.responses

          if(placeTitle != null || isMandatory){

            response.tags = placeTitle;

            props.setResponses(response);
        
            
            props.navigation.navigate("TransportTypeQuestion")
          }
          else
          {
            setIsMandatory(true)
          }

        }}
      ></SmallButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  button: {
    
    alignSelf: "flex-end",
    marginTop: 20,
  },
  textbox: {
    marginTop: 10,
  },
});
export default PlaceTitleQuestion;
