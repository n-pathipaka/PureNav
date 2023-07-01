import React from "react";
import {View, Text} from "react-native";
import colors from "../../config/colors";

import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";


function CheckBoxes(props){
    
    const mode  = { 'car' : false, 'bus' : false, 'bike' : false, 'walk' : false}

    // update mode of car to true.
    const updateMode = (mode, medium) => {
        mode[medium] = !mode[medium]
    }



    return (
     
        <View>

        {Object.keys(mode).map((medium) => {
             <CheckBox
             title={medium}
             checkedColor={colors.primary}
             checked={mode[medium]}
             onPress={() => setChecked({...mode, car : !mode[medium]})}
             containerStyle={{
                 backgroundColor: "white",
                 borderColor: "white",
                 width: "20%",
             }}
             ></CheckBox>
        }
        )}

        </View>

    )


            // <CheckBox
            //         title="Car"
            //         checkedColor={colors.primary}
            //         checked={checked['car']}
            //         onPress={() => setChecked({...mode, car : !checked['car']})}
            //         containerStyle={{
            //             backgroundColor: "white",
            //             borderColor: "white",
            //             width: "20%",
            //         }}
            //         ></CheckBox>
            //         <CheckBox
            //         title="Bus"
            //         checkedColor={colors.primary}
            //         checked={checked['bus']}
            //         onPress={() => setChecked({...mode, bus : !checked['bus']})}
            //         containerStyle={{
            //             backgroundColor: "white",
            //             borderColor: "white",
            //             margin: -15,
            //             width: "20%",
            //         }}
            //         ></CheckBox>
            //         <CheckBox
            //         title="Biking"
            //         checkedColor={colors.primary}
            //         checked={checked['bike']}
            //         onPress={() => setChecked({...mode, bike : !checked['bike']})}
            //         containerStyle={{
            //             backgroundColor: "white",
            //             borderColor: "white",
                       
            //             width: "40%",
            //         }}
            //         ></CheckBox>
            //         <CheckBox
            //         title="Walking"
            //         checkedColor={colors.primary}
            //         checked={checked['walk']}
            //         onPress={() => setChecked({...mode, walk : !checked['walk']})}
            //         containerStyle={{
            //             backgroundColor: "white",
            //             borderColor: "white",
            //             margin:-15,
            //             width: "40%",
            //         }}
            //         ></CheckBox>

            

    
    
}


export default CheckBoxes;