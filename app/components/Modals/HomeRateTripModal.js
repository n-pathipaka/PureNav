import {Portal, Modal} from 'react-native-paper';
import {React, useState, useRef, useEffect, useContext} from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../../config/colors";
import FeatherIcons from 'react-native-vector-icons/Feather';
import RoundedText from '../Custom/RoundedText';
import MapView from "react-native-maps";
import { GOOGLE_MAP_KEY } from '../../constants/GoogleApiKey';
import MapViewDirections from 'react-native-maps-directions';
import step from '../../constants/steps';
import { ScrollView } from 'react-native-gesture-handler';
import { getDate, getStreetName } from "../Custom/time";
import axios from 'axios';
import AppContext from '../../../AppContext';
import { schedulePushNotification } from '../Custom/notification';

const SCREEN_HEIGHT = Dimensions.get('window').height;
function HomeRateTripModal(props){

    const [showDetails, setShowDetails] = useState(false);
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const appContext = useContext(AppContext);
    const LATITUDE = Number(props.trip_data[0]["starts_at"]["lat"]);
    const LONGITUDE = Number(props.trip_data[0]["starts_at"]["lng"]);
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const coordinates = [
        {
          latitude: Number(props.trip_data[0]["starts_at"]["lat"]),
          longitude: Number(props.trip_data[0]["starts_at"]["lng"]),
        },
        {
          latitude: Number(props.trip_data[0]["ends_at"]["lat"]),
          longitude: Number(props.trip_data[0]["ends_at"]["lon"]),
        },
      ];
    const [coord, setCoord]= useState(coordinates);
    const [street, setStreet] = useState([]);
    const mapView = useRef(null);
    const onMapPress = (e) => {
        setCoord({
          coordinates: [
            ...coordinates,
            e.nativeEvent.coordinate,
          ],
        });
      }
      const [safest, setSafest] = useState([]);


      useEffect(() => {       
        /* TODO */
        /* Change the medium to the correct medium */
        let medium="";
       
        if(props.trip_data[0]['medium']=="Car")
        {
            medium= "DRIVING"
        }else if(props.trip_data[0]['medium']=="Bus"){
            medium= "TRANSIT"
        }else if(props.trip_data[0]['medium']=="Biking"){
            medium = "BICYCLING"
        }else if(props.trip_data[0]['medium']=="Walking"){
            medium = "WALKING"
        }
          let body = {
             
            "src": props.trip_data[0].starts_at.address,
            "dst": props.trip_data[0].ends_at.address,
            "route_type":  "fastest",
            "medium": medium,
        
        }
       
        let body1 = {
            "src": props.trip_data[0].starts_at.address,
            "dst": props.trip_data[0].ends_at.address,
            "route_type":  "safest",
            "medium": medium,
        
        }
       {props.selected == 0 ? getRoutes(body) : getRoutes(body1) }


    }, [])


    const getRoutes =(body) => {

        axios.post("http://"+appContext.serverUrl+"/routes", body)
        .then(function(response){
            
                
                //console.log(response.data[0].legs[0].steps, "steps")
                setSafest(response.data[0].legs[0].steps);
                let street_array = [];
                let step_len = response.data[0].legs[0].steps.length
                response.data[0].legs[0].steps.map((item,index) => {
                    getStreetName(item.start_location.lat,item.start_location.lng).then(
                       stName => {
                           if(index+1 == step_len){
                               street_array.push({id: index, name: stName});
                               setStreet(street_array);
                           }
                           else{
                         
                             street_array.push({id: index, name: stName})
                           }
                          
                       }
                     ) 
       
               })

            
            

        }) .catch( function(error){
        console.log("Fetch failed in getting routes")
        console.log(error)
            }
        );
    }


    

    

    const renderCardData = (place,index) =>{ return (<RoundedText 
                                    style={styles.places} 
                                    textStyle={styles.placesText} 
                                    text={place}
                                    key={index}
                                    myKey={index}/>)}

    const renderTripData = () => {
       
            return (
                // <ScrollView horizontal={true}>
                //     {
                //         street.map((item,index) =>{
                            
                //             return renderCardData(item.name, index)
                //         }
                        
                //     )
                // }
                // </ScrollView>
                <FlatList
                        horizontal={true}
                        listKey = {(item, index) => 'rate' + index.toString()}
                        data={street}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => {
                            return renderCardData(item.name, item.id)
                           
                        } } 
                />
            )
    }

    const renderDetailsData = (place, maneuver,i) => {

           
                                   
        return(
            <View style={{flexDirection:'row'}} key={i}>
            <View style={[{marginVertical: 8,flexDirection:'row'}, ]}>
                <FeatherIcons name={maneuver} size={20} color={colors.dark_grey} style={[{ marginLeft:0},{paddingRight:10}]}></FeatherIcons>
                <Text style={{paddingLeft:10}} >{place}</Text>
               
            </View>
            </View>
            )
        }

    const renderMap = (duration,quality) => {
        
        return (
        <View>
            <MapView
                    initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    }}
                
                    style={styles.map}
                    ref={mapView}
                    
                >{coordinates.map((coordinate, index) =>
                    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
                )}
                {(coordinates.length >= 2) && (
                    <MapViewDirections
                        origin={coordinates[0]}
                        waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): undefined}
                        destination={coordinates[coordinates.length-1]}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                        console.log(`Started routing between in rate trip"${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)

                        mapView.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                            right: (width / 20),
                            bottom: (height / 20),
                            left: (width / 20),
                            top: (height / 20),
                            }
                        });
                        }}
                        onError={(errorMessage) => {
                       
                        }}
                    />
                    )}
                </MapView>
            <View style = {[styles.cardEnd]}>
            <TouchableOpacity  style= {[styles.button,{backgroundColor: colors.primary}]}  onPress={() => {props.feedbackTrip();}} >
                <Text style={styles.buttonText}> Rate Trip </Text>
            </TouchableOpacity>
                        
            </View>
                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:40}}></View>
        </View>
            
        )
}

    const renderShowDetails = () => {

        return (
            <View style={{height:120}}>
                    <ScrollView>
                    
                    {/* Map the data steps and call renderDetailsData method */}

                    <View style={{flex:1, }}>
                    {safest.map((step, index) => {
                        let maneuver="";
                        if(step.maneuver== undefined || step.maneuver== "straight"){
                            maneuver="arrow-up"
                        }else if(step.maneuver=="merge"){
                            maneuver="git-merge"
                        }else if(step.maneuver.split("-")[1]=="left" || step.maneuver.split("-")[1]=="right"){
                            maneuver="corner-up-"+step.maneuver.split("-")[1];
                            
                        }

                        return renderDetailsData(step.html_instructions.split('<b>').join('').split('</b>').join('').split('/<wbr/>').join(' ').split('<div style=\"font-size:0.9em\">').join(' ').split('</div>').join(' '), maneuver, index);
                    }
                    )}  
                    </View>
                    </ScrollView>
                    </View>
            
        )
                                    
    }

    const renderData = (item) => {

        return(

            <Portal>
                <Modal 
                    visible={props.isModalVisible} 
                    animationType="slide"
                    contentContainerStyle={styles.modal}
                    onDismiss={() => {
                        props.setModalVisible(false);
                        }}>

                    <View style={styles.container}>
                    <TouchableOpacity onPress={() => 
                        {
                            props.setModalVisible(false);
                            // schedule a notification to rate the previous trip..

                            appContext.setPreviousTrip(item);
                            
                            let body = 'Your trip has been completed. Please rate your trip';
                            let data = 'In-App Notification';
                        
                            (async () => {
                                await schedulePushNotification(body, data)
                                .then((res) => {
                                   
                                }
                            )
                            })() 
                           
                            
                        }}>
                        <Image
                            source={require("../../assets/pull_down_rectangle.png")}
                            style={{ marginTop: 15, alignSelf: "center" }}>
                        </Image>
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Header code */}
                        <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', marginTop:20 }}>
                            <Text style={[styles.topText,{textAlign: 'center'}]}> {!item.starts_at.tags? item.starts_at.place_name: item.starts_at.tags} </Text>
                            <View style={{paddingHorizontal:10}}>
                            <Ionicons name="arrow-forward" size={20} color = "rgba(153, 153, 153, 1)" ></Ionicons>
                            </View>
                            <Text style={[styles.topText]}> {!item.ends_at.tags? item.ends_at.place_name: item.ends_at.tags} </Text>

                        </View>
                    <RoundedText style={styles.titlePrompt} textStyle={styles.titlePromptText} text={`Arrived on ${getDate()}`}></RoundedText>
                    <View style={styles.rowCustomize}>
                        <View style={styles.timeTaken} >
                            <Text style={styles.smallText}>Total Time</Text>
                            <Text style={styles.bigText}>{props.timeTaken}</Text>
                            <Text style={styles.smallText}>{`Saved 10 mins`}</Text>
                        </View>
                        <View style={styles.airQuality}>
                            <Text style={styles.smallText}>Road Air Quality</Text>
                            <Text style={styles.bigText}>Good</Text>
                            <Text style={styles.smallText}>10% better</Text>
                        </View>
                    </View>

                    <View style={styles.rowCustomize}>
                            <View><Text style={styles.textLeft}>Road Steps</Text></View>
                                <View style={styles.viewRight}>
                                    <TouchableOpacity onPress={() => setShowDetails(!showDetails)}><Text style={styles.textRight}>{showDetails ? "Show less" : "Show Details"}</Text></TouchableOpacity>
                                            
                                </View>
                        </View>
                        <View style={[styles.rowElements]}>

                                {
                                    !showDetails ? (
                                        <View style={{flexDirection:'row'}}>
                                        <FeatherIcons name="crosshair" size={20} color={colors.dark_grey} style={[{marginTop: 17, marginLeft:8},{paddingRight:10}]}></FeatherIcons>
                                            {renderTripData()}      
                                        </View>
                                                ): (
                                                <View style={{marginLeft:8}}>
                                                    {renderShowDetails()}
                                                </View>
                                                )
                                }
                        </View>
                                    
                                
                                    
                        {renderMap(item.duration,item.quality)} 
                        </ScrollView> 
                    </View>
                    
                </Modal>
            </Portal>
        )
    }

    return (
        <View>
            <FlatList
                data = {props.trip_data}
                keyExtractor = {item => `${item.id}`}
                renderItem = {({item}) => {
                    
                    if (item.status === 'ON TIME')
                                item = { ...item, color: '#32cd32' }
                            else
                                item = { ...item, color: 'orange' }
                                
                return renderData(item); 
                }}  
            />
        </View>

    );
        }


const styles = StyleSheet.create({

    container: {
        flex:1,
        height:'95%',
        marginBottom:0,
        width: "100%",
        marginTop: '10%',
        backgroundColor: "white",
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    rowElements:{
        flexDirection: 'row',
       
    },
    rowCustomize:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // position : "relative" , 
        // alignItems:'flex-start',
        // width: '100%',
        // flexWrap: 'wrap',
        // justifyContent:'space-around',
    },
    button:{
        backgroundColor:'#FF647C',
        width: '100%',
        height: 53,
        borderRadius: 6,
    },
    buttonText:{
        margin:15,
        color:'#fff',
        textAlign:'center'
    },
    modal: {
        justifyContent: "flex-end",
        marginBottom: -80,
        margin: 0,
        flex : 1,
        height : SCREEN_HEIGHT ,
        position: "absolute",
        top: SCREEN_HEIGHT/30,
    },
    centerAlign: {
        alignSelf: 'center'
    },
    topText: {
        flex: 1,
        fontSize:20,
        color: colors.primary,
        fontWeight:'bold', 
        flexWrap: 'wrap',
    },
    titleText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center"
    },
    smallText: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center"
    },
    bigText: {
        color: "white",
        fontSize: 34,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 4,
        marginBottom: 4
    },
    row:{
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    },
    card:{
        elevation: 0,
        shadowColor: '#111111',
        padding: 5,
        borderWidth: 1,
        margin: 17
    },
    places: {
        marginTop: 17,
        borderRadius: 40,
        backgroundColor: colors.white,
        height: 24,
        marginLeft: 8
    },  
    placesText: {
        textAlign: "center",
        color: colors.black
    },
    titlePrompt: {
        marginTop: 15,
        width: 160,
        marginBottom: 15,
        marginLeft: 5,
        borderRadius: 40,
        borderColor: colors.primary,
        height: 24,
        backgroundColor: colors.primary,
        alignSelf: "center"
    },
    titlePromptText: {
        color: colors.white
    },
    airQuality: {
        width: 161, 
        height: 113, 
        paddingLeft: 6, 
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 8, 
        marginRight: 20, 
        backgroundColor: colors.bgColorAirQuality,
        borderRadius: 4
    },
    timeTaken: {
        width: 161, 
        height: 113, 
        paddingLeft: 6, 
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 8, 
        marginRight: 13, 
        backgroundColor: colors.bgColorTripTime,
        borderRadius: 4
    },
    viewRight: {
        marginLeft: 164,
        padding: 2
    },
    textLeft: {
        marginTop:13,
        color: colors.black,
        padding: 2,
        fontWeight: "600",
    },
    textRight: {
        marginTop: 13,
        color: colors.dark_grey,
        fontSize: 12,
        textAlign: "right",
        fontWeight: "500",
    },
    map: {
        marginVertical:13,
        marginLeft:0,
        width: "100%",
        height: "40%",
        borderRadius: 13,
        
      },
});
export default HomeRateTripModal;
        