import {React, useState} from "react";
import { View, StyleSheet, Text} from "react-native";
 import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
 import KeyBoardWrapper from "../../../../components/Custom/KeyBoardWrapper";
 import colors from "../../../../config/colors";


 export default function UserBadLabels(props){


    const [isSelectedBadLabels, setSelectedBadReview] = useState(false)

    const [selectedBadLabels, setSelectecdBadLabel] = useState([])

    const handleBadLabelsOnPress = (item) => {

        if(selectedBadLabels.some(x => x.thing === item.thing))
        {
            const newSelected = selectedBadLabels.filter((badLabel)=> badLabel.thing != item.thing)
            return setSelectecdBadLabel(newSelected)
        }
        
        setSelectecdBadLabel([...selectedBadLabels, item])
        

    }

    const isSelectedBadLabel = (item) =>
    {
        //return selectedGoodThings.includes(item)

        return selectedBadLabels.some(x => x.thing === item.thing)
    }
   

        return(
            <View>
                <View style= {{flexDirection:'row', flexWrap:'wrap'}}>
                {props.badLabels.map((item, index) => {
                    return(
                        < TouchableOpacity key ={index}
                            onPress = {() => {
                                    // item.selected = !item.selected
                                    // setSelectecd(selected[index] = true)
                                
                                    handleBadLabelsOnPress(item)
                                    
                            }}
                        >
                        <View>
                            <View style = {[{borderWidth:1,justifyContent:'center', alignItems:'center', backgroundColor: isSelectedBadLabel(item) ?'blue':'#CDD2FD'}, styles.goodThings]}>
                                <Text style={styles.goodThingsText}> {item.thing} </Text>
                            </View>
                        </View>

                        

                        </ TouchableOpacity>
                        
                    )
                })}

                </View>
        </View>
    )
    

 }

 const styles = StyleSheet.create({

    goodThings: {
        marginTop: 16,
        marginBottom: 5,
        marginRight: 12,
        borderRadius: 40,
        padding:10,
        borderColor: colors.primary,
        
    
    },
    goodThingsText: {
        color: "#6979F8",
        textAlign:'center',
        fontSize: 13,
    },

 })