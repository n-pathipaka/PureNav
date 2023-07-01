/* eslint-disable prettier/prettier */
import React, { useState} from "react" ;
import {View , Text , StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native" ; 
import {ActivityIndicator, Card} from 'react-native-paper';
import Icon from  'react-native-vector-icons/MaterialIcons'
import Arrow from 'react-native-vector-icons/AntDesign'
import colors from "../../../config/colors";
import HomeLocationModal from "../../../components/Modals/HomeLocationModal";
import HomeStopTripModal from "../../../components/Modals/HomeStopTripModal";
import HomeRateTripModal from "../../../components/Modals/HomeRateTripModal";
import HomeRatingModal from "../../../components/Modals/HomeRatingModal";
import axios from 'axios';
import AppContext from "../../../../AppContext";
import { getCurrentTime, formatAddress, getDifference, getDuration} from "../../../components/Custom/time";
import CountDownTimer from "./CountDownTimer";





export default function Frame139(props) 
{ 

    const [isModalVisible, setModalVisible] = useState(false);
    const [isStopTripModalVisible,setStopTripModal]= useState(false);
    const [isHomeRateTripVisible, setHomeRateTripModal] =useState(false);
    const [isHomeRatingVisible, setHomeRatingModal] =useState(false);
    const [fetchLocation, setFetchLocation] = useState(false);
    const [selected, setSelected] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const places = [{id: 1, place: 'Sunset Blvd', maneuver : 'left'}, {id: 2, place: 'Canyon Blvd', maneuver : 'right'}, {id: 3, place: 'Colorado Ave' , maneuver : 'left'}, {id: 4, place: 'Arapahoe Ave', maneuver : 'right'}];

    const appContext = React.useContext(AppContext);



   
    const onNext = () => {
       
        setModalVisible(true);     
       
    }


    const startTrip = () => {


        axios.post('http://'+appContext.serverUrl+'/trip/start', {
            
            "id": props.trip[0].id,
            "src_lat": appContext.currentLocation.latitude,
            "src_lon": appContext.currentLocation.longitude,
            "src_addr":  formatAddress(appContext.currentLocation.description),
            "started": startTime
        }).
        then( function(response){
           
        })
        .catch( function(error){
            console.log(error)
        })

    }

    //{!item.starts_at.tags? item.starts_at.place_name: item.starts_at.tags}
    const renderData = (item) => { 
    return (
        <View>
            <View style = {style.cardSearch}>
            <Card style = {[style.cardStyle]}>
                <View style={{margin:16}}>
                    <View style = {style.cardHeader}>
                        <View style = {style.cardHeaderLeft}>
                            <Icon name = 'access-time' color = {item.status === 'ON-TIME'? colors.onTime : colors.Longer} size={16} />
                            <Text style={{color: item.status === 'ON-TIME'? colors.onTime : colors.Longer, fontSize: 12}}> {item.status}</Text>
                        </View>
                        <CountDownTimer time = {item.suggested_start_time} timeStatus = {item.status === 'ON-TIME' ? true : false} />
                        {/* <View>
                            <Text style = {{fontSize: 12, color:"rgba(153, 153, 153, 1)", fontWeight:'400'}}> Go in  {timer(item.suggested_start_time)}</Text>
                        </View> */}
                    </View>
                    <View style = {style.cardMiddle}>
                        <Text style= {style.travelText}>{!item.starts_at.tags? item.starts_at.place_name: item.starts_at.tags}</Text>
                         {props.isLoading && <ActivityIndicator  style={{position: 'absolute', justifyContent:'center', alignContent:'center'}} size="large" color="#999999"/>}
                        <Arrow style={{padding:8, alignSelf:"center"}} name = 'arrowright' color = "rgba(153, 153, 153, 1)" size = {22} />
                        <Text style= {style.travelText}>{!item.ends_at.tags? item.ends_at.place_name: item.ends_at.tags}</Text>
                    </View>
                    <View style = {style.cardEnd}>
                        <View style = {{flexDirection:'row'}}>
                            <View style = {[style.endText, {marginRight:16}]}>
                                <Text style={{color: colors.dark_grey}}> Trip Duration</Text>
                                <Text style= {style.endText}> {item.duration}</Text>
                            </View>
                            <View style = {[style.endText]}>
                                <Text style={{color:colors.dark_grey}}> Road Quality</Text>
                                <Text style = {style.endText}> {item.quality}</Text>
                            </View>
                        </View>
                        <TouchableOpacity  onPress={onNext}    style= {style.button}>
                            <Text style={style.buttonText}> Go Now </Text>
                        </TouchableOpacity> 
                           
                    </View> 
                    </View>
                </Card>
                </View>
            </View>
        )
    
    }


    return ( 
        <View>
        {props.trip.length != 0 ? (
        <>
        
        <FlatList
            data = {props.trip}
            listKey = {(item, index) => 'C' + index.toString()}
            keyExtractor = {item => `${item.id}`}
            renderItem = {({item}) => {
                return renderData(item)
                
            }}   
        /> 
           
        <HomeRatingModal isModalVisible={isHomeRatingVisible}
            setModalVisible={setHomeRatingModal} 
            trip_data={props.trip}
            countRatings={props.countRatings}
            setCountRatings={props.setCountRatings}
            from = {"Home"}
        ></HomeRatingModal>  

        <HomeRateTripModal isModalVisible={isHomeRateTripVisible}
            setModalVisible={setHomeRateTripModal}
            selected={selected} 
            setSelected={setSelected}
            trip_data={props.trip}
            place_data={places}
            timeTaken={endTime}
            feedbackTrip={() => {
                setHomeRateTripModal(false);
                // Timeout is required - issue with react-native modal 
                // (https://github.com/react-native-modal/react-native-modal/issues/30)
                setTimeout(() => {
                  setHomeRatingModal(true);
                }, 500);
              }}
        ></HomeRateTripModal>
        
        
       
        <HomeLocationModal isModalVisible={isModalVisible} 
            setModalVisible={setModalVisible} trip_data={props.trip} 
            stopTrip={(index) => {
                setModalVisible(false);
                setFetchLocation(true);
                //call the start trip API.
                setSelected(index);
                setStartTime(getCurrentTime());
                startTrip()
                // Timeout is required - issue with react-native modal 
                // (https://github.com/react-native-modal/react-native-modal/issues/30)
                setTimeout(() => {
                  setStopTripModal(true);
                }, 500);
              }}>
        </HomeLocationModal>

        <HomeStopTripModal isModalVisible={isStopTripModalVisible} 
            setModalVisible={setStopTripModal} trip_data={props.trip} place_data={places} selected={selected} setSelected={setSelected} fetchLocation={fetchLocation} setFetchLocation={setFetchLocation}
            rateTrip={() => {
                setStopTripModal(false);
                // convert start time to string.
                // Timeout is required - issue with react-native modal 
                // (https://github.com/react-native-modal/react-native-modal/issues/30)
                setEndTime(getDuration(startTime))
                setTimeout(() => {
                  setHomeRateTripModal(true);
                }, 500);
              }}
        ></HomeStopTripModal>
        </>

        ) : (
            <>
             <ActivityIndicator  style={{position: 'absolute', justifyContent:'center', alignContent:'center'}} size="large" color="#999999"/>
            </>
        )}
       
        
        </View>
        
        );
 } 

 const style = StyleSheet.create({ 
    cardStyle : {
        borderRadius : 2 ,
        alignSelf:'stretch',
        borderWidth : 5 , 
        backgroundColor: "#FFFF",
        flexDirection:'column',
        marginBottom:8,
        marginRight:5,
        marginLeft:3,
        marginTop:8
    },
    cardSearch:{
        shadowColor: '#222',
        shadowOffset: {width: 0, height: 24},
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation:3,
    },

    container:{
        position : "relative" , 
        width : Dimensions.get("window").width ,
        backgroundColor : "rgba(255, 255, 255, 1)"
    },
    cardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    cardHeaderLeft:{
        flexDirection:'row',
        alignItems:"center"
    },
    cardMiddle:{
        alignItems:"center",
        justifyContent:"center",
        marginVertical:16,
        paddingVertical:10,
        flexDirection:'row'
    },
    travelText:{
        flex: 1,
        flexDirection:"column",
        fontSize:22,
        color:"#4169e1", 
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center', 
        fontWeight:'bold', 
        flexWrap: 'wrap',
    },
    cardEnd:{
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'space-between'
    },
    endText:{
        fontWeight:'bold',
        color:'black'
    },
    button:{
        backgroundColor:'#4169e1',
        height:40,
        width:91,
        borderRadius: 6,
    },
    buttonText:{
        margin:10,
        color:'#fff',
        textAlign:'center'
    },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }
     
  
 })