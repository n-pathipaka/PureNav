import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import { getDifference } from '../../../components/Custom/time';

/**
 * gets the difference between the current time and the time of the trip and sets the timer.
 * @param {*} props 
 * @returns 
 */

function CountDownTimer(props) {

    const [time, setTime] = useState(getDifference(props.time));
  
    useEffect(() => {
        let interval = setInterval(() => {
            
            setTime(getDifference(props.time));
        }, 1000);

        return () => clearInterval(interval);
    })

    return (
        <View>
            <Text style = {{fontSize: 12, color:"rgba(153, 153, 153, 1)", fontWeight:'400'}}>  {props.timeStatus === true ? 'Go in ': 'Delayed by'} {time}</Text>
        </View>

    )

}

export default CountDownTimer