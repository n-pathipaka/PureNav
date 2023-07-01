import {Portal, Modal} from 'react-native-paper';
import {React, useState, useRef, useEffect, useContext} from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, Dimensions, Pressable,  } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../../config/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ButtonGroup } from '@rneui/base';
import FeatherIcons from 'react-native-vector-icons/Feather';
import RoundedText from '../Custom/RoundedText';
import MapView from "react-native-maps";
import { GOOGLE_MAP_KEY } from '../../constants/GoogleApiKey';
import MapViewDirections from 'react-native-maps-directions';
import AppContext from '../../../AppContext';
import { ScrollView } from 'react-native-gesture-handler';
import { getStreetName } from '../Custom/time';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';


//import Geocoder from 'react-native-geocoder';

const SCREEN_HEIGHT = Dimensions.get('window').height;


const CustomAlert = (props) => {

   
    const [iOSDefaults, setIOSDefaults] = useState({
      container: {
        backgroundColor: (props.ios && props.ios.container && props.ios.container.backgroundColor) || '#F8F8F8',
      },
      title: {
        color: (props.ios && props.ios.title && props.ios.title.color) || '#000000',
        fontSize: (props.ios && props.ios.title && props.ios.title.fontSize) || 17,
        fontWeight: (props.ios && props.ios.title && props.ios.title.fontWeight) || '600',
      },
     
      button: {
        color: '#387ef5',
       
        fontSize: 17,
        fontWeight: '500',
        textTransform: 'none',
        backgroundColor: 'transparent',
      },
    });
    
    const IOSButtonBox = () => {
      const buttonProps = props.buttons && props.buttons.length > 0 ? props.buttons : [{}]
      const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(buttonProps.length === 2 ? 1 : 0);
  
  
      return (
        <View style={[styles.iOSButtonGroup, {
          flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
        }]} onLayout={(e) => {
          if(e.nativeEvent.layout.height > 60)
            setButtonLayoutHorizontal(0);
        }}>
          {
            buttonProps.map((item, index) => {
                
                return (
                  <View style={[styles.iOSButton, ]} key={index}>
                    <Pressable onPress={() => {
                        
                      props.setAlertModalVisible(false)
                      if(item.func && typeof(item.func) === 'function')
                        item.func();
                    }}>
                      <View style={[styles.iOSButtonInner, {backgroundColor: (item.styles && item.styles.backgroundColor) || iOSDefaults.button.backgroundColor}]}>
                        <Text
                          style={{
                            color: (item.styles && item.styles.color) || iOSDefaults.button.color,
                            fontSize: (item.styles && item.styles.fontSize) || iOSDefaults.button.fontSize,
                            fontWeight: (item.styles && item.styles.fontWeight) || singleButtonWeight,
                            textTransform: (item.styles && item.styles.textTransform) || iOSDefaults.button.textTransform,
                            textAlign: 'center'
                          }}
                        >{item.text}</Text>
                      </View>
                    </Pressable>
                  </View>
                )
              })
  
          }
        </View>
      );
    }
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={props.alertModalVisible}
          onRequestClose={() => {
            props.setAlertModalVisible(false);
          }}
        >
          <Pressable style={[styles.iOSBackdrop , styles.backdrop]} onPress={() => props.setAlertModalVisible(false)} />
          <View style={styles.alertBox}>
         
            <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
              <Text style={[styles.iOSTitle, iOSDefaults.title]}>{props.title || 'Message'}</Text>
              <Text style={[styles.iOSMessage, iOSDefaults.message]}>{props.message || ''}</Text>
              <IOSButtonBox />
            </View>
           
          </View>
        </Modal>
    )
  }

function HomeLocationModal(props){

    
    
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [safestStreet, setSafestStreet] = useState([]);
    const [fastestStreet, setFastestStreet] = useState([]);
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE =  Number(props.trip_data[0]["starts_at"]["lat"]);
    const LONGITUDE = Number(props.trip_data[0]["starts_at"]["lng"]);
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const coordinates = [
        {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
        {
          latitude: Number(props.trip_data[0]["ends_at"]["lat"]),
          longitude: Number(props.trip_data[0]["ends_at"]["lon"]),
        },
      ];
    const [coord, setCoord]= useState(coordinates);
    const [safest, setSafest] = useState([]);
    const [fastest, setFastest] = useState([]);
    const mapView = useRef(null);
    const appContext = useContext(AppContext);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    
    const onMapPress = (e) => {
        setCoord({
          coordinates: [
            ...coordinates,
            e.nativeEvent.coordinate,
          ],
        });
      }
    const roadSteps =
        [
            {'departure_time': { 'text' :'5:03 PM'}, 'duration':{ 'text' : '30 mins'} , 'steps': [ 'left', 'right', 'left', 'right' ]}
        ];
    
    const places = [{id: 1, place: 'Sunset Blvd', maneuver : 'left'}, {id: 2, place: 'Canyon Blvd', maneuver : 'right'}, {id: 3, place: 'Colorado Ave' , maneuver : 'left'}, {id: 4, place: 'Arapahoe Ave', maneuver : 'right'}];
    const places1 = [{id: 1, place: 'Sun Blvd'}, {id: 2, place: 'Canyon Blvd'}, {id: 3, place: 'Colorado Ave'}, {id: 4, place: 'Arapahoe Ave'}];
    
    
    

    

    

    useEffect(() => {
        
        let safestController = new AbortController();
        let fastestController = new AbortController();
        /* TODO */
        /* Change the medium to the correct medium */
        let medium="";
       
        if(props.trip_data[0]['medium']=="Car")
        {
            medium= "driving"
        }else if(props.trip_data[0]['medium']=="Bus"){
            medium= "walking"
        }else if(props.trip_data[0]['medium']=="Biking"){
            medium = "bicycling"
        }else if(props.trip_data[0]['medium']=="Walking"){
            medium = "walking"
        }
        
        
        getRoutes(props.trip_data[0].starts_at.address, props.trip_data[0].ends_at.address, "FASTEST", medium, fastestController, setFastest, setFastestStreet)

        setTimeout(() => {
        getRoutes(props.trip_data[0].starts_at.address, props.trip_data[0].ends_at.address, "SAFEST",  medium, safestController, setSafest, setSafestStreet) }, 2000);

        return () => {
            safestController.abort();
            fastestController.abort();
        }

    }, [props.trip_data, props.setModalVisible]);


    const updateRoutes = (routes, setRoute, route_type) => {
        setRoute(routes);
        let key =  '@'+ appContext.user + '_' + route_type + '_routes';
        let key1 =  '@'+ appContext.user + '_' + route_type + '_routes_street';

        let streets = route_type == "SAFEST" ? safestStreet : fastestStreet;
    
        (async () => {
          try {
             await AsyncStorage.multiSet([[key, JSON.stringify(routes)], [key1, JSON.stringify(streets)]]);
          }
           catch (e) {
             console.log(e);
           }
        })();
      };

    const getRoutes = (src, dst , route_type, medium, controller, setRoute, setStreet) => {

        axios.post("http://"+appContext.serverUrl+"/routes", {
            "src": src,
            "dst": dst,
            "route_type":  route_type,
            "medium": medium,
            signal : controller.signal
        
        })
        .then(function(response){
    
            let street_array = [];
                let step_len = response.data[0].legs[0].steps.length
                
                response.data[0].legs[0].steps.map((item,index) => {
                    getStreetName(item.start_location.lat,item.start_location.lng).then(
                       stName => {
                           if(index+1 == step_len){
                               street_array.push({id: index, name: stName});
                               setStreet(street_array);
                               if(route_type == "SAFEST"){
                                   setSafestStreet(street_array);
                                   setSafest(response.data[0].legs[0].steps);

                               }
                               else{
                                      setFastestStreet(street_array);
                                      setFastest(response.data[0].legs[0].steps);
                                }
                           }
                           else{     
                         
                             street_array.push({id: index, name: stName})
                           }
                          
                       }
                     ) 
       
               })
               console.log("checking how much time does it take to get the resposne from routes")
    
               
               updateRoutes(response.data[0].legs[0].steps, setRoute, route_type);
    
           }) .catch( function(error){
            if(!controller.signal.aborted){
              console.log("Fetch failed in getting routes")
               console.log(error)
             }
            }
        );
    }

    
    const renderCardData = (place,index) => { 
                                return (<RoundedText 
                                style={styles.places} 
                                key={index}
                                myKey={index}
                                textStyle={styles.placesText} 
                                text={place}
                                
                                />)}
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

    const renderShowDetails = () => {

            if(selectedIndex==0){
                return (
                    <View style={{height:120}}>
                        <ScrollView>
                            
                        {/* Map the data steps and call renderDetailsData method */}

                        <View style={{flex:1, }}>
                            {fastest.map((step, index) => {
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
            } else{
                return(
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
        
    }

    const getMap = () => {
        return (  
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
                    console.log(`Started routing between in home location"${params.origin}" and "${params.destination}"`);
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
        )
            
    }

    const renderMap = (duration,quality) => {
        if (selectedIndex == 0){
            return (
            <View>
            {getMap()}
            <View>
                <View style = {[styles.cardEnd]}>
                    <View style = {{flexDirection:'row'}}>
                        <View style = {[styles.endText, {marginRight:16}]}>
                            <Text style={{color: colors.dark_grey}}> Trip Duration</Text>
                            <Text style= {styles.endText}> {duration}</Text>
                        </View>
                        <View style = {[styles.endText]}>
                            <Text style={{color:colors.dark_grey}}> Road Quality</Text>
                            <Text style = {styles.endText}> {quality}</Text>
                        </View>
                    </View>
                    <TouchableOpacity  style= {styles.button}  onPress={() => {props.stopTrip(selectedIndex);}} >
                        <Text style={styles.buttonText}> Go Now </Text>
                    </TouchableOpacity>
                </View>
                        
                        
                <TouchableOpacity  
                    style= {[styles.button1, {marginTop: 2}]} 
                    onPress={() => setAlertModalVisible(true)}  >
                        <Text style={styles.buttonText1}> Cancel Trip </Text>
                </TouchableOpacity>

                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:80}}></View>
                 <View style={{marginTop:40}}></View>

                
                <View style={styles.centeredView}>
                    <CustomAlert 
                        alertModalVisible={alertModalVisible} 
                        setAlertModalVisible={setAlertModalVisible}
                        title={'Are you sure you want to cancel this trip ? This is a reccurring trip.'}
                        ios={{
                            container: {
                            backgroundColor: '#f2f2f2'
                            },
                            title: {
                            color: '#000000',
                            fontSize: 13,
                            fontWeight: '400',
                            },
                            
                        }}
                        buttons={[{
                            text: 'Cancel This Trip Only',
                            styles: {
                            color: '#FF647C',
                            fontSize: 17,
                            fontWeight: '400',
                            alignItems: 'center',
                            textTransform: 'none',
                            
                            }
                        },{
                            text: 'Change Preferences for future  trips',
                            func: () => {},
                            styles: {
                            color: '#6979F8',
                            fontSize: 17,
                            fontWeight: '400',
                            textTransform: 'none',
                            
                            }
                        }, 
                        {
                            text: 'Do not cancel',
                            func: () => {},
                            styles: {
                            color: '#6979F8',
                            fontSize: 17,
                            fontWeight: '400',
                            textTransform: 'none',
                            
                            }
                        }]}
                    />
                </View>
            </View>
        </View>  
            )
        } else {
            return (
                <View>
            {getMap()}
            <View>
            <View style = {[styles.cardEnd]}>
                        <View style = {{flexDirection:'row'}}>
                            <View style = {[styles.endText, {marginRight:16}]}>
                                <Text style={{color: colors.dark_grey}}> Trip Duration</Text>
                                <Text style= {styles.endText}> {duration}</Text>
                            </View>
                            <View style = {[styles.endText]}>
                                <Text style={{color:colors.dark_grey}}> Road Quality</Text>
                                <Text style = {styles.endText}> {quality}</Text>
                            </View>
                        </View>
                        <TouchableOpacity  style= {styles.button}  onPress={() => {props.stopTrip(selectedIndex);}} >
                            <Text style={styles.buttonText}> Go Now </Text>
                        </TouchableOpacity>
                        </View>
                        
                        
                        <TouchableOpacity  
                            style= {[styles.button1, {marginTop: 2}]} 
                            onPress={() => setAlertModalVisible(true)}  >
                                <Text style={styles.buttonText1}> Cancel Trip </Text>
                            </TouchableOpacity>
                        
                            <View style={styles.centeredView}>
                        <CustomAlert 
                            alertModalVisible={alertModalVisible} 
                            setAlertModalVisible={setAlertModalVisible}
                            title={'Are you sure you want to cancel this trip ? This is a reccurring trip.'}
                            ios={{
                                container: {
                                backgroundColor: '#f2f2f2'
                                },
                                title: {
                                color: '#000000',
                                fontSize: 13,
                                fontWeight: '400',
                                },
                                
                            }}
                            buttons={[{
                                text: 'Cancel This Trip Only',
                                styles: {
                                color: '#FF647C',
                                fontSize: 17,
                                fontWeight: '400',
                                alignItems: 'center',
                                textTransform: 'none',
                                
                                }
                            },{
                                text: 'Change Preferences for future  trips',
                                func: () => {},
                                styles: {
                                color: '#6979F8',
                                fontSize: 17,
                                fontWeight: '400',
                                textTransform: 'none',
                                
                                }
                            }, 
                            {
                                text: 'Do not cancel',
                                func: () => {},
                                styles: {
                                color: '#6979F8',
                                fontSize: 17,
                                fontWeight: '400',
                                textTransform: 'none',
                                
                                }
                            }]}
                        />
                        
                        </View>
                    </View>
                    
                    
                    
                        </View>
                    
                
            )
        }
    }

        

       
       
       

    const renderTripData = () => {
        if (selectedIndex == 0){
            return (
                // <FlatList
                //     horizontal={true}
                //     data={street}
                //     keyExtractor={(item) => `${item.id}`}
                //     renderItem={({ item }) => {
                //         console.log(item.name)
                //        renderCardData(item.name, item.id)
                        
                //     } } 
                // />
                // street.map(item => {
                //     console.log("inside map", item)
                // })
                <ScrollView horizontal={true}>
                {
                    fastestStreet.map((item, index) =>{return renderCardData(item.name, index)})
                }
                </ScrollView>

                    // <Text>"hello"</Text>
                
                
            )
        }else {
            return (
                <ScrollView horizontal={true}>
                    {
                        safestStreet.map((item, index) =>{return renderCardData(item.name, index)})
                    }
                    </ScrollView>

            )
        }
    
    }

    const renderData = (item) => {


        return (
            
            <Portal>
                <Modal 
                    visible={props.isModalVisible} 
                    propagateSwipe={true}
                    animationType="slide"
                    transparent={true}
                    contentContainerStyle={styles.modal}
                    onDismiss={() => {
                        props.setModalVisible(false);
                        }}
                    style={{margin:0}}>
                        
                    
                <View style={styles.container}>
                    <TouchableOpacity onPress={()=> 
                        {
                            props.setModalVisible(false)}
                        }>
                        <Image
                            source={require("../../assets/pull_down_rectangle.png")}
                            style={{ marginTop: 15, alignSelf: "center" }}
                            >
                        </Image>
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                        {/* Heading of the card */}
                        <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', marginTop:20 }}>
                            <Text style={[styles.topText,{textAlign: 'center'}]}> {!item.starts_at.tags? item.starts_at.place_name: item.starts_at.tags} </Text>
                            <View style={{paddingHorizontal:10}}>
                            <Ionicons name="arrow-forward" size={20} color = "rgba(153, 153, 153, 1)" ></Ionicons>
                            </View>
                            <Text style={[styles.topText]}> {!item.ends_at.tags? item.ends_at.place_name: item.ends_at.tags} </Text>

                        </View>
                        
                        <View style={[styles.rowElements, styles.centerAlign]}>
                            <Icon name='access-time' color={item.color} size={16} />
                            <Text style={{ color: item.color, fontSize: 12 }}> {item.status}</Text>
                            <Text style={{ fontSize: 12 , color : "rgba(153, 153, 153, 1)"}}> in {item.start_time}</Text>
                            
                        </View> 
                        <View>
                            <ButtonGroup
                                    buttons={['Fastest', 'Safest']}
                                    selectedIndex={selectedIndex}
                                    onPress={(value) => setSelectedIndex(value)}
                                    buttonStyle={styles.buttonStyle}
                                    selectedButtonStyle={styles.selectedButtonStyle}
                                    containerStyle={styles.containerStyle}
                                    style={{marginTop:30}}
                                />
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
                        null)}
                        </View>
                        
                        
                        {
                            !showDetails ? (
                                null
                                            ): (
                        <View >
                            
                            <View style={{marginLeft:8}}>
                                {renderShowDetails()}</View>
                                    
                        </View>)}
                        
                        
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
                listKey = {(item, index) => 'L' + index.toString()}
                keyExtractor = {item => `${item.id}`}
                renderItem = {({item}) => {
                    if (item.status === 'ON-TIME')
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

    centerAlign: {
        alignSelf: 'center',
        alignItems:"center",
    },
   
    modal: {
        marginBottom: -80,
        margin: 0,
        flex : 1,
        height : SCREEN_HEIGHT ,
        top: SCREEN_HEIGHT/600,
    },

     container: {
        width: "100%",
        marginTop: '10%',
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "85%",
        marginBottom: 0,
    },

    // modal:{
    //     height: '100%',
    //     justifyContent: 'flex-end',
    // },
    // container: {
    //     height: "90%",
    //     width: "100%",
    //     backgroundColor: "white",
    //     padding: 25,
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    // },

    // topText: {
    //     justifyContent: 'center',
    //     fontSize: 20,
    //     color: colors.primary,
    //     padding: 10,
    //     fontWeight: 'bold',
    //     flexWrap: 'wrap',
        
    // },
    topText: {
        flex: 1,
        fontSize:20,
        color: colors.primary,
        fontWeight:'bold', 
        flexWrap: 'wrap',
    },
   
    rowElements:{
        flexDirection: 'row',
    },
    rowHeader:{
        flexDirection: 'row',
        alignItems:'center',
    },
    rowCustomize:{
        position : "relative" , 
        alignItems:'flex-start',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent:'space-between',
    },
    selectedButtonStyle: {
        backgroundColor: colors.primary,
        borderRadius: 3
    },
    buttonStyle: {
        backgroundColor: colors.grey,
        borderRadius: 3,
        borderWidth: 0,
    },
    containerStyle:{ 
        margin: 10,
        padding: 2, 
        backgroundColor: colors.grey, 
        borderRadius: 3
    },
    places: {
        marginTop: 17,
        borderRadius: 40,
        backgroundColor: colors.grey,
        height: 24,
        marginLeft: 8
    }, 
    placesText: {
        textAlign: "center",
        color: colors.black
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
    cardEnd:{
        flexDirection:'row',
        marginVertical: 13,
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
    button1:{
        backgroundColor:'#FF647C',
        width: '100%',
        height: 53,
        borderRadius: 6,
    },
    buttonText1:{
        margin:15,
        color:'#fff',
        textAlign:'center'
    },
    showdetails:{
        marginLeft: 8,
        marginTop: 13,
    },
    showDetailsText:{
        
        color: colors.dark_grey,
        fontSize: 12,
        textAlign: "right",
    },
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    gridItem: {
        margin:5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 0,
        marginBottom:0,
      },
      iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
      },
      
      backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      alertBox: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom:30,
      },
      iOSAlertBox: {
        maxWidth: 330,
        height: 250,
        width: '100%',
        zIndex: 10,
        borderRadius: 14,
      },
      iOSTitle: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 7,
        paddingLeft: 16,
        marginTop: 8,
        textAlign: "center",
      },
      iOSMessage: {
        paddingTop: 0,
        paddingRight: 16,
        paddingBottom: 21,
        paddingLeft: 16,
        textAlign: "center"
      },
      iOSButtonGroup: {
        marginRight: -0.55
      },
      iOSButton: {
    
        borderTopColor: '#dbdbdf',
        borderTopWidth: 0.55,
        borderStyle: 'solid',
      },
      iOSButtonInner: {
        minHeight: 44,
        justifyContent: 'center'
      }
});

export default HomeLocationModal;

