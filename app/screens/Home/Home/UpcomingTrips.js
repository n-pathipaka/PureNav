/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from "react" ;
import {ActivityIndicator, View, Text, Image, ScrollView, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Arrow from 'react-native-vector-icons/AntDesign'
import colors from "../../../config/colors";
import axios from 'axios';
import { getDifference } from "../../../components/Custom/time";
import AppContext from "../../../../AppContext";
import { formatAddress } from "../../../components/Custom/time";
import fonts from "../../../config/fonts";
import CountDownTimer from "./CountDownTimer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderData = (item) => {
    
    return (
        <View>
            <Card style={[style.cardStyle]} mode = 'outlined'>
                <Card.Content>
                <View style={style.rowElements}>
                    <View style={style.cardStart}>
                        <View style={style.rowElements}>
                            <Icon name='access-time' color={item.color} size={16} />
                            <Text style={{ color: item.color, fontSize: 12 }}> {item.status}</Text>
                        </View>
                        <CountDownTimer time = {item.suggested_start_time} timeStatus= {true} />
                        {/* <View>
                            <Text style={{ fontSize: 12, color: "rgba(153, 153, 153, 1)", fontWeight: '400' }}> In  {item.start_time}</Text>
                        </View> */}
                    </View>
                    <View style={style.verticleLine}></View>
                    <View style={style.cardMiddle}>
                        <View style={style.rowElements}>
                            <Text style={style.travelText}>{!item.src.tags?  item.src.place_name: item.src.tags[0]}</Text>
                            <Arrow style={{ marginLeft:8, marginRight:8 }} name='arrowright' color="rgba(153, 153, 153, 1)" size={20} />
                            <Text style={style.travelText}>{!item.dst.tags? item.dst.place_name : item.dst.tags }</Text>
                            
                        </View>
                    </View>
                </View>
                </Card.Content>
            </Card>
        </View>
        
    )

}

const renderEmpty = () => {
    let trips = []

    for(let i = 0; i < 4; i++){
        trips.push(

            <View key = {i}> 
            <Card style={[style.cardStyle]} mode = 'outlined'>
                <Card.Content>
                    <View style={{alignContent:'center', justifyContent:'center', alignItems:'center', flex:1}}>
                    <ActivityIndicator  size="small" color="#999999"/>
                    </View>
                </Card.Content>
            </Card>
        </View>
        )
        }
    return trips

}




export default function UpcomingTrips() {

    const appContext = useContext(AppContext);
    const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    const [upcomingTrips, setUpcomingTrips] = useState([]);

    const callUpcoming = (controller) => {

    if(appContext.currentLocation != undefined){

        axios.post("http://"+appContext.serverUrl+"/trip/upcoming", {
                 
                    "user_id": appContext.user,
                    "src": null,
                    "src_lat": appContext.currentLocation.lattitude,
                    "src_lon": appContext.currentLocation.longitude,
                    "src_addr": (appContext.currentLocation.description),
                    "interval": 7,
                    signal : controller.signal
            
            })
            .then( function(response){
               
                let c = response['data']['Count']
                let upcomingTrips = []

                for(let i = 0; i < c; i++){ 
                  let trip = response['data']['Items'][i]

                  if(trip['dst'] != null){
                    let starts_at = {}

                    if(trip['src'] != null)
                        starts_at = trip['src']
                    else
                        {
                            let src = {}
                            src.address  = appContext.currentLocation.description//trip['src_addr']
                            src.lat =  appContext.currentLocation.lattitude//trip['src_lat']
                            src.lng = appContext.currentLocation.description//trip['src_long']
                            
                            if(trip['src_tags'] != null)
                                src.place_name = trip['src_addr'].split(",")[0]
                            else
                                src.place_name = null
                            
                            
                            src.place_name = trip['src_addr'] != null ? trip['src_addr'].split(",")[0] : "null"
                            src.tags = [trip['src_addr'].split(",")[0]]
                            
                            starts_at = src
                        }
                    upcomingTrips.push( {"id": trip['id'], "src": starts_at, "dst": trip['dst'], "status" : "Longer",  "start_time" : getDifference(trip['suggested_start_time']) , "duration": trip['estimated_duration'], "suggested_start_time": trip['suggested_start_time']})
                
                  }
                }

                updateUpcomingsView(upcomingTrips)
                setIsUpcomingLoading(false)
               
              } )
            .catch(function (error) {
                if(!controller.signal.aborted)
                  console.log(error)
                
              });
            }
    }

const setUpLoad = (setupController) => {
    let key =  '@'+ appContext.user + '_upcoming_trips';
    (async () => {
        try {
        const savedSetup = await AsyncStorage.getItem(key);
        if(setupController){
            if (savedSetup !== null) {
                let upcomingTrips = JSON.parse(savedSetup)
                setUpcomingTrips(upcomingTrips)
                setIsUpcomingLoading(false)

            }
            else{
                console.log("No saved upcoming trips")
                setUpcomingTrips([])
                
            }
        }
        } catch (err) {
            console.log(err);
        }
    })();
};

    useEffect(() => {
            let upComingController = new AbortController();
            //let setupController    = new AbortController();
            let setupController = true
            
            setUpLoad(setupController);
            // call Upocming trips after one second.
            setTimeout(() => {callUpcoming(upComingController)}, 1000)
            
                
            return()=> {
                upComingController.abort()
                //setupController.abort()
                setupController = false
            }
            
    } , [])

    useEffect(() => {
        let upComingController = new AbortController();
        
        setTimeout(() => {callUpcoming(upComingController)} , 2000)

        return () => upComingController.abort()
    }, [appContext.dataChanged, appContext.user])

    
    const updateUpcomingsView = (upcomingTrips) => {
        setUpcomingTrips(upcomingTrips);
        let key =  '@'+ appContext.user + '_upcoming_trips';
    
        (async () => {
          try {
             await AsyncStorage.setItem(key, JSON.stringify(upcomingTrips));
          }
           catch (e) {
             console.log(e);
           }
        })();
      };
    

    return (
          <>
            <View style = {style.Trip}>
                <Text style={[
                            fonts.fontSizes.heading5, {fontWeight:'600'}
                        ]} >  Upcoming Trips </Text>
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}><Text style={{fontSize: 12, color:"rgba(153, 153, 153, 1)", fontWeight:'400'}}>{showDetails ? "Show less" : "Show All"}</Text></TouchableOpacity>
            </View>
           { isUpcomingLoading ? renderEmpty() : ( 
                <>
                <FlatList
                data={showDetails ? upcomingTrips : upcomingTrips.slice(0,3)}
                listKey = {(item, index) => 'U' + index.toString()}
                keyExtractor = {item => `${item.id}`}
                renderItem={({ item }) => {

                    if (item.status === 'ON TIME')
                        item = { ...item, color: colors.onTime }
                    else
                        item = { ...item, color: colors.Longer }

                    return renderData(item)

                }}
                ListFooterComponent = {() => <View style={{height: 80}}></View>}

               />

                
               
               </>
            )
          
        }
        </>
       
    );
}

const style = StyleSheet.create({
    container: {
        position: "relative",
        width: Dimensions.get("window").width,
        backgroundColor: "rgba(255, 255, 255, 1)"
    },
    cardStyle: {
        marginVertical: 12,
        alignItems:'center',
        borderRadius: 4,
        width: '100%',
        borderWidth: 1, borderColor: "rgba(228, 228, 228, 0.6)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        flexDirection: 'column',
    },
    rowElements: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardStart: {
        padding: 0,
        margin: 0,
        borderWidth: 0,
        elevation: 0,
        width: '40%',
        alignSelf:'center'
    },
    rowElements: {
        flexDirection: 'row',
        alignItems: "center"
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: 'rgba(153, 153, 153, 1)',

    },
    cardMiddle: {
        borderWidth: 0,
        elevation: 0,
        width: '60%',
        paddingHorizontal:16,
        alignContent:"flex-start"
    },
    travelText: { flex:1, fontSize: 15, color: "rgba(153, 153, 153, 1)", alignSelf: 'center', fontWeight: '400' , flexWrap: 'wrap'},
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    Trip:{
        position : "relative" , 
        alignItems:'flex-start',
        flexDirection: 'row',
        width: '100%',
        height : 22,
        flexWrap: 'wrap',
        justifyContent:'space-between',
        marginBottom:12
    },



})