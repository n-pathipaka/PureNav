import {Portal, Modal} from 'react-native-paper';
import {React, useState, useRef, useContext, useEffect} from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, Dimensions, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../../config/colors";
import FeatherIcons from 'react-native-vector-icons/Feather';
import RoundedText from '../Custom/RoundedText';
import MapView, { Marker, AnimatedRegion, Callout }  from "react-native-maps";
import { GOOGLE_MAP_KEY } from '../../constants/GoogleApiKey';
import MapViewDirections from 'react-native-maps-directions';
import AppContext from '../../../AppContext';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from "expo-location";
import imagePath from '../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { schedulePushNotification } from '../Custom/notification';





const SCREEN_HEIGHT = Dimensions.get('window').height;
function HomeStopTripModal(props){

    const [showDetails, setShowDetails] = useState(false);
    const appContext = useContext(AppContext);
    

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE = Number(props.trip_data[0]["starts_at"]["lat"]);
    const LONGITUDE = Number(props.trip_data[0]["starts_at"]["lng"]);
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    
    const coordinates = {
       startCoords: {
          latitude: Number(props.trip_data[0]["starts_at"]["lat"]),
          longitude: Number(props.trip_data[0]["starts_at"]["lng"]),
        },
        endCoords:{
          latitude:  Number(props.trip_data[0]["ends_at"]["lat"]),
          longitude: Number(props.trip_data[0]["ends_at"]["lon"]),
        },
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: Number(props.trip_data[0]["starts_at"]["lat"]),
            longitude: Number(props.trip_data[0]["starts_at"]["lng"]),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: -1,
        distance: -1,
        heading:0
        
    };
    const [coord, setCoord]= useState(coordinates);
    const { startCoords, endCoords, isLoading, time, distance,  coordinate, heading } = coord;
    const updateCoordinates = (data) => setCoord((state)    => ({...state, ...data}));
    const [modalClose, setModalClose] = useState(false);
    const checkModal = useRef(modalClose)
   

    const mapView = useRef(null);
    const markerRef = useRef();
    const onMapPress = (e) => {
        setCoord({
          coordinates: [
            ...coordinates,
            e.nativeEvent.coordinate,
          ],
        });
      }
    const [safest, setSafest] = useState([]);
    const [street, setStreet] = useState([]);

    const setUpLoad = async (route_type) => {
        let key =  '@'+ appContext.user + '_' + route_type + '_routes';
        let key1 =  '@'+ appContext.user + '_' + route_type + '_routes_street';
        try {
            const savedSetup = await AsyncStorage.multiGet([key, key1]);
            if (savedSetup !== null) {
                savedSetup.map((result, i, store) => {
                    

                if(i ==0){
                    let routes = JSON.parse(store[i][1])
                    setSafest(routes)
                }
                else{
                    let streetNames = JSON.parse(store[i][1])
                    setStreet(streetNames)
                }
               
            }
            )
            }
            else{
                console.log("Unable to load places")
                
            }
        } catch (err) {
            console.log(err);
    }};
    

    useEffect(() => {       

        let fastestController = new AbortController();
        let safestController  = new AbortController();
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

    
       {props.selected == 0 ? setUpLoad('FASTEST') : setUpLoad('SAFEST')}

       setCoord(coordinates)

    }, [props.trip_data, props.isModalVisible]) //calling whenever user changes any trip or presses go now.
    
  useEffect(() => {

      if(props.fetchLocation){
        console.log("calling Location")

        let locController = true;

        checkModal.current = false;

        const interval = setInterval(() => {
            getLiveLocation()
        }, 10000);


        const getLiveLocation = () => {
            let key =  '@'+ appContext.user + '_current_location';
            
            (async () => {
                try {
            
                let loc = await Location.getCurrentPositionAsync({});
                console.log("calling live location in setInterval")
    
                // if(locController)
                // {
                    console.log(loc.coords.latitude, loc.coords.longitude, loc.coords.heading,"TESTING");
    
                    let currentLocation = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    }
    
                    await AsyncStorage.setItem(key, JSON.stringify(currentLocation));
                    //console.log(appContext.user)
                    animate(loc.coords.latitude, loc.coords.longitude);
                    updateCoordinates({
                        
                        startCoords: { latitude:loc.coords.latitude, longitude:loc.coords.longitude },
                        heading:loc.coords.heading,
                        coordinate: new AnimatedRegion({
                            latitude: loc.coords.latitude,
                            longitude: loc.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        })
                    }) 
                    
                    if(appContext.appStateVisible != "active" || checkModal.current){
                        console.log("clearing the interval")
                        clearInterval(interval);
                        
                    }  
                }
                catch (err) {
                    console.log(err);
                }    
             
            })();    
    
        }

        props.setFetchLocation(false);

        
      }

    }, [props.fetchLocation])


    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }
    }

    const renderCardData = (place,index) => <RoundedText 
                                    style={styles.places} 
                                    textStyle={styles.placesText} 
                                    text={place}
                                    key={index}
                                    myKey={index}/>

    const renderDetailsData = (place, maneuver,i, dist) => {
          
                                return(
                                  
                                    
                                    <View style={{flexDirection:'row'}} key={i}>
                                         { console.log(dist,distance, "checking distance")}
                                    <View style={[{marginVertical: 8,flexDirection:'row'}, ]}>
                                        <FeatherIcons name={maneuver} size={20} color={colors.dark_grey} style={[{ marginLeft:0},{paddingRight:10}]}></FeatherIcons>
                                        <Text style={{paddingLeft:10}} >{place}</Text>
                                        
                                    </View>
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
                        
                        return renderDetailsData(step.html_instructions.split('<b>').join('').split('</b>').join('').split('/<wbr/>').join(' ').split('<div style=\"font-size:0.9em\">').join(' ').split('</div>').join(' '), maneuver, index, step.distance.text);
                    }
                    )}  
                    </View>
                    </ScrollView>
                    </View>
             
        )
                                    
    }

    const fetchValue = (t,d) => {
        updateCoordinates({
            distance:d,
            time:t
        })
    }

    const arrivedClicked = () => {
        // check modal is to stop the interval
        checkModal.current = true;
        props.rateTrip();
    }

    const stopTripClicked = () => {
        checkModal.current = true;
        props.setModalVisible(false);
    }

    const renderMap = (duration,quality) => {
        
            return (
            <View>
            <MapView
                    initialRegion={{
                    ...startCoords,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    }}
                
                    style={styles.map}
                    ref={mapView}
                    
                >
                
                <Marker.Animated
                        ref={markerRef}
                        coordinate={coordinate}
                >
                <Image
                    source={imagePath.icCar}
                    style={{
                        width: 40,
                        height: 40,
                        transform: [{rotate: `${heading}deg`}]
                        
                    }}
                    resizeMode="contain"
                />
                <Callout>
                    
                    {distance !== 0 && time !== 0 && (<View style={{width:120, height:40,alignItems:'center', alignSelf:'center', textAlign:'center'}}>
                        <Text style={{fontSize:12,fontWeight:'bold'}}>{`${time} mins left`}</Text>
                        <Text style={{fontSize:12,fontWeight:'bold'}}>{`${distance} mi. remaining`}</Text>
                    </View>)}
                </Callout>
            </Marker.Animated>
                    
                {Object.keys(endCoords).length > 0 && (<Marker
                    coordinate={endCoords}
                    image={imagePath.icGreenMarker}
                    
                />)}
                {Object.keys(endCoords).length > 0 && (
                    <MapViewDirections
                                origin={startCoords}
                                //waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): undefined}
                                destination={endCoords}
                                apikey={GOOGLE_MAP_KEY}
                                strokeWidth={6}
                                strokeColor="blue"
                                optimizeWaypoints={true}
                                onStart={(params) => {
                                    
                                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                } }
                                onReady={result => {
                                    console.log(`Duration: ${result.duration} min.`);
                                    fetchValue(result.duration, result.distance);

                                    mapView.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: (width / 20),
                                            bottom: (height / 20),
                                            left: (width / 20),
                                            top: (height / 20),
                                        }
                                    });
                                } }
                                onError={(errorMessage) => {
                                } } />
                                    
                    )}
                </MapView>
            <View style = {[styles.cardEnd]}>
                       
                            
                        
                        <TouchableOpacity  style= {styles.button}   onPress={() => {stopTripClicked()}}>
                            <Text style={styles.buttonText}> Stop Trip </Text>
                        </TouchableOpacity>
                        <View style={{marginTop:10}}></View>
                        <TouchableOpacity  style= {[styles.button,{backgroundColor: colors.primary}]}  onPress={() => {arrivedClicked()}} >
                            <Text style={styles.buttonText}> I have arrived </Text>
                        </TouchableOpacity>

                        <View style={{marginTop:80}}></View>
                        <View style={{marginTop:80}}></View>
                        <View style={{marginTop:80}}></View>
                        <View style={{marginTop:80}}></View>
                        <View style={{marginTop:40}}></View>

                        
                    </View>
            </View>
                
            )
    }

    const renderTripData = () => {
       
            return (
                // <ScrollView horizontal={true}>
                // {
                //     street.map((item,index) =>{
                    
                //     return renderCardData(item.name, index)
                //  }
                // </ScrollView>
                // )
                <FlatList
                        horizontal={true}
                        listKey = {(item, index) => 'stop' + index.toString()}
                        render
                        data={street}   
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item, index }) => {
                            return renderCardData(item.name, index)
                           
                        } } 
                />
                    
                )
       
    }
    
    const renderData = (item) => {
        return(
           
            <Portal>
                
                <Modal 
                    visible={props.isModalVisible} 
                    animationType="slide"
                    contentContainerStyle={[styles.modal]}
                    onDismiss={() => {
                        props.setModalVisible(false);
                        checkModal.current = true
                        // send a notification to user to rate the previous trip     

                        }}>
                             
                            
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() =>{
                            appContext.setPreviousTrip(item);
                            props.setModalVisible(false);
                            checkModal.current = true 

                            let body = 'Your trip has been completed. Please rate your previous trip';
                            let data = 'In-App Notification';
                        
                            (async () => {
                                await schedulePushNotification(body, data)
                                .then((res) => {
                                    
                                }
                            )
                            })() 
                        
                        }}        
                        >
                        <Image
                            source={require("../../assets/pull_down_rectangle.png")}
                            style={{ marginTop: 15, alignSelf: "center" }}>
                        </Image>
                        </TouchableOpacity>
                        <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Heading of the card */}
                        <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', marginTop:20 }}>
                            <Text style={[styles.topText,{textAlign: 'center'}]}> {!item.starts_at.tags? item.starts_at.place_name: item.starts_at.tags} </Text>
                            <View style={{paddingHorizontal:10}}>
                            <Ionicons  name="arrow-forward" size={20} color = "rgba(153, 153, 153, 1)" ></Ionicons>
                            </View>
                            <Text style={styles.topText}> {!item.ends_at.tags? item.ends_at.place_name: item.ends_at.tags} </Text>

                        </View>
                        <RoundedText style={styles.titlePrompt} textStyle={styles.titlePromptText} text={`on your way using ${props.selected ==0 ? 'fastest' : 'safest'} route`}></RoundedText>
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
                                                    <View >
                                                    <View style={{marginLeft:8}}>
                                                        {renderShowDetails()}
                                                    </View>
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

    return(

       
        <View>
        <FlatList
            data = {props.trip_data}
            listKey = {(item, index) => 'S' + index.toString()}
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
        width: "100%",
        marginTop: '10%',
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "85%",
    },
    rowElements:{
        flexDirection: 'row',
       
    },
    rowCustomize:{
        position : "relative" , 
        alignItems:'flex-start',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent:'space-between',
    },

    centerAlign: {
        alignSelf: 'center',
        alignItems:"center",
    },
   
    modal: {
        
        marginBottom: -80,
        margin: 0,
        flex : 1,
        height : SCREEN_HEIGHT ,
        
        top: SCREEN_HEIGHT/500,
        
        
    },
    topText: {
        flex: 1,
        fontSize:20,
        color: colors.primary,
        fontWeight:'bold', 
        flexWrap: 'wrap',
        
    },
    titlePrompt: {
        marginTop: 0,
        marginBottom: 15,
        marginLeft: 5,
        borderRadius: 40,
        borderColor: '#CDD2FD',
        height: 24,
        backgroundColor: '#CDD2FD',
        alignSelf: "center"
    },
    titlePromptText: {
        color: colors.primary
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
});

export default HomeStopTripModal;