import React, {useState} from "react";
import {
     View, Text, TouchableOpacity
  } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import colors from "../../config/colors";
import fonts from "../../config/fonts";


export function ShowEmoji(props) {
 

const [selectEmoji, setSelectEmoji] = useState([])


const selectedEmoji = (emoji) => {
    //  if(selectEmoji.some(e => e.id === emoji.id)){
    //   setSelectEmoji(selectEmoji.filter(e => e.value !== emoji.value))
    // }
    // else{
    setSelectEmoji([...[], emoji])
    
}

const isSelectedEmoji = (emoji) => {
  return selectEmoji.some(e => e.id === emoji.id)
}


const userEmoji = (item) => {
    

    let x = String.fromCodePoint(parseInt(item.value.split("+")[1],16))


    return (
    <View 
      style={{
        borderWidth : 2,
        borderColor : isSelectedEmoji(item) ? colors.primary : colors.grey,
        borderRadius : 8,
        padding : 10,
        margin : 10,
        alignItems : "center",
        justifyContent : "center"
      }}
    >
      <Text style = {{fontSize:16}}>{x}</Text>

    </View>
    )

  }


return (
    <FlatList
    data={props.emoji}
    horizontal={true}
    renderItem={({ item }) => (
        <TouchableOpacity onPress={() =>  {selectedEmoji(item)
          props.setUserEmoji(item.value)
        
        }}>
        {userEmoji(item)}
        </TouchableOpacity>
    )}
    keyExtractor={item => item.id}
    />
)


}