import React from 'react'
import { TouchableWithoutFeedback, Animated } from "react-native";
import {FontAwesome} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function RatingStars(props) {

    


    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@UserStars', jsonValue)
        } catch (e) {
          // saving error
        }
      }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@UserStars')
            return jsonValue;
          } catch(e) {
            // error reading value
          }
      }

      


    const star = (filled) =>   <FontAwesome name= {filled === true? "star" : "star-o"} color = {filled === true? "blue" : "#999999"} size={30}  style ={{marginVertical:10}} />
  
    const [review, setReview] = React.useState(0);

    let stars = []
    


    for(let x = 1 ; x <= 5; x++)
    {
        stars.push(
            < TouchableWithoutFeedback key ={x}
               onPress = {() => {

                props.setCountRatings(x)

                props.customPress()
                
               }}
            >
                <Animated.View>
                     {star( x <=  props.countRatings ? true: false)}
                </Animated.View>
                
            </ TouchableWithoutFeedback>
        )
    }

    return (

         stars
    )


}



export default RatingStars