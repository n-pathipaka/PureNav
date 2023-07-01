import React, {useState , useContext} from "react";
import {StyleSheet, Text } from "react-native";
import {ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import fonts from "../../../config/fonts";
import SmallButton from "../../Buttons/SmallButton";
import SwitchTime from "../../Custom/SwitchTime";
import axios from "axios";
import { setResponses } from "../../../slices/navSlice";
import AppContext from "../../../../AppContext";
import {convertTime, getUniqueId}  from "../../Custom/time";
import AsyncStorage from '@react-native-async-storage/async-storage';



function TimeOfTravelQuestion(props) {
  const appContext = useContext(AppContext);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  //travel times are to be updated based on the props
 

  const postDetails = () => {
    
    
    axios.post("http://"+appContext.serverUrl+"/place/add", props.responses) // add place to database
    .then( function(response){
        
        const addDst = props.responses
        addDst.dst = response["data"]["id"]
        setResponses(addDst)
        axios.post("http://"+appContext.serverUrl+"/addRoutePreference", props.responses)
        .then( function(response)
        {
          //change the data state, so that we can load in upcoming trips.
          
          appContext.setDataChanged(!appContext.dataChanged)
        })

    } )
}
const addPlaces = (places) => {
  let key =  '@'+ appContext.user + '_places';
  (async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(places));
    }
    catch (e) {
      console.log(e);
    }
  })();
}
  
  const [travelTimes, setTravelTimes] = useState(!props.responses.days? null : props.responses.days );
  const [schedule, setSchedule] = useState({})

  const updateTravelTime = (time, day) => {
    schedule[day] = [time]
    //schedule[time].push(day)
    setSchedule(schedule)
  };
  function daysOfTravel(travelDays) {
    if (travelTimes == null) {
      return (
        <SwitchTime
          placeholder={"Everyday before"}
          isSwitchEnabled={false}
          setTime={(time) => {
            var updatedTimes = days.map(() => convertTime(time));
            setTravelTimes([...updatedTimes]);
          }}
        ></SwitchTime>
      );
    }
    else {
    return travelDays
      .map((x, index) => {
        return (
          <SwitchTime
            key = {index}
            placeholder={
                x + " before " 
            }
            isSwitchEnabled={false} // travelTimes[index] == null propogating forward for filter condition
            setTime={(time) => {
               updateTravelTime(convertTime(time), x);
            }}
          ></SwitchTime>
        );
      })
      // .filter(function (x) {
      //   if (!x.props.isSwitchEnabled) {
      //     // filtering all the disabled functions
      //     return x;
      //   }
      // });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={fonts.fontStyle.heading3}>
        You have to be there before what time?
      </Text>
      <ScrollView keyboardShouldPersistTaps='always'>
       
        {daysOfTravel(travelTimes)}
      </ScrollView>
      <SmallButton
        style={styles.button}
        title={"Done"}
        onPress={() => {
          var Obj = props.responses;
          Obj.days_of_week = schedule;
          Obj.user_id = appContext.user
          //Obj.id = getUniqueId()
          props.setResponses(Obj);

          


          {postDetails()}
          
          

          if(props.from == "places")
          {
            let pl = props.places;
            pl.push(Obj)
            
            
            setTimeout(() => {
              props.setModalVisible("clear")
              props.updatePlaces(pl)
              
            }, 100);
            //props.setPlacesChanged(true)
          }
          else
          {
            addPlaces(Obj)
            props.setModalVisible(false)
          }

          

        }}
      ></SmallButton>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom:20,
  },
  textbox: {
    marginTop: 10,
  },
});
export default TimeOfTravelQuestion;
